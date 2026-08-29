import Navbar from '../components/Navbar'

function About() {
  return (
    <>
      <Navbar />

      <div className="info-page">
        <h1>About Us</h1>

        <p>
          We developed this Compliance Checker as a technology-based solution
          for checking important declarations present on packaged commodity
          labels.
        </p>

        <div className="info-card">
          <h2>Our Project</h2>
          <p>
            The system combines image processing, OCR and rule-based
            compliance checking to help identify required information on
            product labels.
          </p>
        </div>

        <div className="info-card">
          <h2>Our Goal</h2>
          <p>
            Our goal is to make preliminary label compliance checking faster,
            simpler and easier to understand.
          </p>
        </div>

        <div className="info-card">
          <h2>Technology</h2>
          <p>
            React, Vite, FastAPI, Python, EasyOCR and rule-based validation
            are used in the project.
          </p>
        </div>
      </div>
    </>
  )
}

export default About