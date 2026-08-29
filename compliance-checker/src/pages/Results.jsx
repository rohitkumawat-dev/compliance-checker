import { Link, useLocation } from 'react-router-dom'

function Results() {
  const location = useLocation()

  const ocrData = location.state?.ocrData
  const image = location.state?.image

  const fields = ocrData?.fields || {}
  const compliance = ocrData?.compliance || []

  const compliantCount = compliance.filter(
    (item) => item.status === 'compliant'
  ).length

  const violationCount = compliance.filter(
    (item) => item.status === 'violation'
  ).length

  const totalChecks = compliance.length

  const score =
    totalChecks > 0
      ? Math.round((compliantCount / totalChecks) * 100)
      : 0

  return (
    <div className="min-h-screen bg-[#080808] text-white">

      {/* Navbar */}
      <nav className="flex h-[72px] items-center border-b border-white/10 px-6 sm:px-10">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black">
            ⚖
          </div>

          <span className="text-[17px] font-semibold">
            CompliCheck
          </span>
        </Link>
      </nav>


      <main className="mx-auto max-w-[1150px] px-6 py-14">

        {/* Header */}
        <div className="mb-10">

          <p className="font-mono text-xs tracking-[0.22em] text-white/35">
            COMPLIANCE ANALYSIS
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Scan results
          </h1>

          <p className="mt-4 text-white/45">
            Here's what we detected from your product label.
          </p>

        </div>


        {/* Score */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/40">
              Compliance score
            </p>

            <p className="mt-3 text-4xl font-bold">
              {score}%
            </p>
          </div>


          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/40">
              Requirements found
            </p>

            <p className="mt-3 text-4xl font-bold">
              {compliantCount}
            </p>
          </div>


          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/40">
              Potential violations
            </p>

            <p className="mt-3 text-4xl font-bold">
              {violationCount}
            </p>
          </div>

        </div>


        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">

          {/* Product image */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">

            <p className="mb-4 text-sm font-medium text-white/60">
              Scanned label
            </p>

            {image ? (
              <div className="overflow-hidden rounded-2xl bg-black">
                <img
                  src={image}
                  alt="Scanned product"
                  className="max-h-[550px] w-full object-contain"
                />
              </div>
            ) : (
              <div className="flex h-[400px] items-center justify-center rounded-2xl border border-white/10 text-white/30">
                Image unavailable
              </div>
            )}

          </div>


          {/* Extracted information */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">

            <p className="text-sm font-medium text-white/60">
              Extracted information
            </p>

            <div className="mt-5 space-y-3">

              <InfoRow
                label="Product name"
                value={fields.product_name}
              />

              <InfoRow
                label="Manufacturer / Packer"
                value={fields.manufacturer}
              />

              <InfoRow
                label="Net quantity"
                value={fields.net_quantity}
              />

              <InfoRow
                label="Maximum Retail Price"
                value={fields.mrp}
              />

              <InfoRow
                label="Batch / Lot number"
                value={fields.batch_number}
              />

              <InfoRow
                label="Manufacturing / Packing date"
                value={fields.manufacturing_date}
              />

              <InfoRow
                label="Expiry / Best before"
                value={fields.expiry_date}
              />

              <InfoRow
                label="Consumer care"
                value={fields.consumer_care}
              />

            </div>

          </div>

        </div>


        {/* Compliance */}
        <section className="mt-8">

          <div className="mb-5">
            <p className="font-mono text-xs tracking-[0.18em] text-white/30">
              REQUIREMENT CHECK
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Declaration analysis
            </h2>
          </div>


          <div className="grid gap-3">

            {compliance.length > 0 ? (
              compliance.map((item, index) => (
                <ComplianceRow
                  key={index}
                  label={item.label}
                  status={item.status}
                  message={item.message}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-white/10 p-6 text-white/40">
                No compliance checks available.
              </div>
            )}

          </div>

        </section>


        {/* Raw OCR */}
        <section className="mt-10">

          <details className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">

            <summary className="cursor-pointer text-sm font-medium text-white/60">
              View raw OCR output
            </summary>

            <div className="mt-5 space-y-2">

              {ocrData?.raw_text?.map((text, index) => (
                <p
                  key={index}
                  className="rounded-xl bg-black/30 px-4 py-3 text-sm text-white/50"
                >
                  {text}
                </p>
              ))}

            </div>

          </details>

        </section>


        {/* Actions */}
        <div className="mt-10 flex flex-wrap gap-3">

          <Link
            to="/scanner"
            className="rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition hover:bg-white/85"
          >
            Scan another product
          </Link>

          <Link
            to="/"
            className="rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium transition hover:bg-white/10"
          >
            Back to home
          </Link>

        </div>

      </main>

    </div>
  )
}


/* Information row */
function InfoRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-5 rounded-2xl border border-white/10 bg-black/20 p-4">

      <span className="text-sm text-white/40">
        {label}
      </span>

      <span
        className={`max-w-[55%] text-right text-sm ${
          value
            ? 'text-white/80'
            : 'text-white/25'
        }`}
      >
        {value || 'Not detected'}
      </span>

    </div>
  )
}


/* Compliance row */
function ComplianceRow({ label, status, message }) {

  const isCompliant = status === 'compliant'

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">

      <div className="flex items-center gap-4">

        <div
          className={`flex h-9 w-9 items-center justify-center rounded-full ${
            isCompliant
              ? 'bg-emerald-400/10 text-emerald-300'
              : 'bg-red-400/10 text-red-300'
          }`}
        >
          {isCompliant ? '✓' : '×'}
        </div>

        <div>
          <p className="text-sm font-medium">
            {label}
          </p>

          <p className="mt-1 text-xs text-white/35">
            {message}
          </p>
        </div>

      </div>


      <span
        className={`text-xs font-medium ${
          isCompliant
            ? 'text-emerald-300'
            : 'text-red-300'
        }`}
      >
        {isCompliant ? 'FOUND' : 'MISSING'}
      </span>

    </div>
  )
}

export default Results