import Navbar from '../components/Navbar'

function HowItWorks() {
  return (
    <>
      <Navbar />

      <div className="info-page">
        <h1>How It Works</h1>
        <p>
          Our Compliance Checker uses image processing and OCR technology
          to analyze packaged commodity labels and check important
          compliance requirements.
        </p>

        <div className="steps">
          <div className="info-card">
            <span>01</span>
            <h2>Upload Product Image</h2>
            <p>Upload a clear image of the product or its label.</p>
          </div>

          <div className="info-card">
            <span>02</span>
            <h2>OCR Analysis</h2>
            <p>The system extracts text from the uploaded label using OCR.</p>
          </div>

          <div className="info-card">
            <span>03</span>
            <h2>Compliance Check</h2>
            <p>The extracted information is checked against the configured compliance rules.</p>
          </div>

          <div className="info-card">
            <span>04</span>
            <h2>View Results</h2>
            <p>The system shows which required declarations are found or missing.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default HowItWorks