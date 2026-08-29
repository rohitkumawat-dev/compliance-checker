from rules import RULES
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import easyocr
import numpy as np
import io
import re

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

reader = easyocr.Reader(["en"], gpu=False)
def validate_mrp(value):
    if not value:
        return False, "MRP not detected."

    match = re.search(r"\d+(?:\.\d{1,2})?", value)

    if match:
        return True, "MRP detected."

    return False, "MRP value could not be verified."


def validate_quantity(value):
    if not value:
        return False, "Net quantity not detected."

    match = re.search(
        r"\d+(?:\.\d+)?\s*(kg|g|gm|ml|l|ltr|litre|litres)",
        value,
        re.IGNORECASE
    )

    if match:
        return True, "Net quantity and unit detected."

    return False, "Quantity unit could not be verified."


def validate_date(value):
    if not value:
        return False, "Manufacturing / packing date not detected."

    match = re.search(
        r"\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\d{1,2}[/-]\d{2,4}",
        value
    )

    if match:
        return True, "Date format detected."

    return False, "Date was detected but its format needs review."

def run_compliance_checks(fields):
    results = []

    for rule in RULES:

        field = rule["field"]
        value = fields.get(field)

        # Missing from OCR
        if not value:
            results.append({
                "id": rule["id"],
                "label": rule["label"],
                "rule": rule["rule"],
                "status": "needs_review",
                "message": "Declaration could not be detected from the image.",
                "detected_value": None
            })
            continue

        # Specific validation
        if field == "mrp":
            valid, message = validate_mrp(value)

        elif field == "net_quantity":
            valid, message = validate_quantity(value)

        elif field == "manufacturing_date":
            valid, message = validate_date(value)

        else:
            valid = True
            message = "Declaration detected."

        results.append({
            "id": rule["id"],
            "label": rule["label"],
            "rule": rule["rule"],
            "status": "detected" if valid else "needs_review",
            "message": message,
            "detected_value": value
        })

    return results

def extract_fields(text_lines):
    text = "\n".join(text_lines)

    fields = {
        "product_name": None,
        "manufacturer": None,
        "net_quantity": None,
        "mrp": None,
        "batch_number": None,
        "manufacturing_date": None,
        "expiry_date": None,
        "consumer_care": None,
    }

    # MRP
    mrp_match = re.search(
        r"(?:MRP|M\.R\.P)[\s:₹Rs.]*(\d+(?:\.\d{1,2})?)",
        text,
        re.IGNORECASE
    )

    if mrp_match:
        fields["mrp"] = "₹" + mrp_match.group(1)

    # Net quantity
    quantity_match = re.search(
        r"(?:NET\s*(?:WT|WEIGHT|QTY|QUANTITY)?|NET)\s*[:.]?\s*(\d+(?:\.\d+)?)\s*(kg|g|gm|ml|l|ltr|litre|litres)",
        text,
        re.IGNORECASE
    )

    if quantity_match:
        fields["net_quantity"] = (
            quantity_match.group(1) + " " + quantity_match.group(2)
        )

    # Batch number
    batch_match = re.search(
        r"(?:BATCH|LOT)\s*(?:NO|NUMBER)?[\s:.-]*([A-Z0-9/-]+)",
        text,
        re.IGNORECASE
    )

    if batch_match:
        fields["batch_number"] = batch_match.group(1)

    # Manufacturing date
    manufacturing_match = re.search(
        r"(?:MFG|MFD|MANUFACTURED|PKD|PACKED)[\s:.-]*(\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\d{1,2}[/-]\d{2,4})",
        text,
        re.IGNORECASE
    )

    if manufacturing_match:
        fields["manufacturing_date"] = manufacturing_match.group(1)

    # Expiry
    expiry_match = re.search(
        r"(?:EXP|EXPIRY|USE\s*BY|BEST\s*BEFORE)[\s:.-]*(.*)",
        text,
        re.IGNORECASE
    )

    if expiry_match:
        fields["expiry_date"] = expiry_match.group(1).strip()

    # Consumer care
    phone_match = re.search(
        r"(?:CUSTOMER\s*CARE|CONSUMER\s*CARE|HELPLINE|CONTACT).*?(\+?\d[\d\s-]{8,})",
        text,
        re.IGNORECASE
    )

    if phone_match:
        fields["consumer_care"] = phone_match.group(1).strip()

    # Try to identify manufacturer
    for line in text_lines:
        if re.search(
            r"(manufactured by|manufactured|marketed by|packed by)",
            line,
            re.IGNORECASE
        ):
            fields["manufacturer"] = line.strip()
            break

    # First reasonably long line as possible product name
    if text_lines:
        for line in text_lines:
            clean_line = line.strip()

            if len(clean_line) >= 3:
                fields["product_name"] = clean_line
                break

    return fields

def check_compliance(fields):
    checks = []

    def check_field(name, label, required=True):
        value = fields.get(name)

        if value:
            checks.append({
                "label": label,
                "status": "compliant",
                "message": f"{label} detected"
            })
        elif required:
            checks.append({
                "label": label,
                "status": "violation",
                "message": f"{label} not detected"
            })

    check_field(
        "manufacturer",
        "Manufacturer / Packer Details"
    )

    check_field(
        "net_quantity",
        "Net Quantity"
    )

    check_field(
        "mrp",
        "Maximum Retail Price (MRP)"
    )

    check_field(
        "batch_number",
        "Batch / Lot Number"
    )

    check_field(
        "consumer_care",
        "Consumer Care Details"
    )

    check_field(
        "manufacturing_date",
        "Manufacturing / Packing Date"
    )

    return checks

@app.get("/")
def home():
    return {
        "message": "CompliCheck backend is running"
    }


@app.post("/api/analyze")
async def analyze_product(file: UploadFile = File(...)):

    image_bytes = await file.read()

    image = Image.open(
        io.BytesIO(image_bytes)
    ).convert("RGB")

    image_array = np.array(image)

    results = reader.readtext(image_array)

    text_lines = []

    for result in results:
        text = result[1]
        confidence = result[2]

        if confidence >= 0.30:
            text_lines.append(text)

    fields = extract_fields(text_lines)
    compliance = run_compliance_checks(fields)
    

    return {
    "filename": file.filename,
    "status": "success",
    "fields": fields,
    "compliance": compliance,
    "raw_text": text_lines,
}