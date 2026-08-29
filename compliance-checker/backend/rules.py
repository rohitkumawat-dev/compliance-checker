RULES = [
    {
        "id": "manufacturer_details",
        "label": "Manufacturer / Packer / Importer Details",
        "field": "manufacturer",
        "rule": "Rule 6(1)(a)",
        "required": True,
    },
    {
        "id": "commodity_name",
        "label": "Common / Generic Name",
        "field": "product_name",
        "rule": "Rule 6(1)(b)",
        "required": True,
    },
    {
        "id": "net_quantity",
        "label": "Net Quantity",
        "field": "net_quantity",
        "rule": "Rule 6(1)(c)",
        "required": True,
    },
    {
        "id": "manufacturing_date",
        "label": "Month / Year of Manufacture or Pre-packing",
        "field": "manufacturing_date",
        "rule": "Rule 6(1)(d)",
        "required": True,
    },
    {
        "id": "mrp",
        "label": "Maximum Retail Price",
        "field": "mrp",
        "rule": "Rule 6",
        "required": True,
    },
    {
        "id": "consumer_care",
        "label": "Consumer Care Details",
        "field": "consumer_care",
        "rule": "Applicable requirement",
        "required": True,
    },
]