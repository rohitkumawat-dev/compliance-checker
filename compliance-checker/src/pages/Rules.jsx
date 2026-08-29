import Navbar from '../components/Navbar'

function Rules() {
  return (
    <>
      <Navbar />

      <div className="info-page">
        <h1>Rules & Requirements</h1>

        <p>
          The Compliance Checker evaluates packaged commodity labels against
          the configured Legal Metrology requirements.
        </p>

        <div className="rules-list">
          <div className="info-card">
            <h2>Manufacturer / Packer Details</h2>
            <p>
              The required manufacturer, packer or importer information should
              be declared on the package.
            </p>
          </div>

          <div className="info-card">
            <h2>Net Quantity</h2>
            <p>
              The declared net quantity of the packaged commodity should be
              clearly mentioned.
            </p>
          </div>

          <div className="info-card">
            <h2>MRP</h2>
            <p>
              The maximum retail price should be displayed on the package.
            </p>
          </div>

          <div className="info-card">
            <h2>Date Information</h2>
            <p>
              Applicable manufacturing, packing, expiry or best-before
              information should be declared as required.
            </p>
          </div>

          <div className="info-card">
            <h2>Consumer Information</h2>
            <p>
              Required consumer-care or contact information should be
              available where applicable.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Rules
