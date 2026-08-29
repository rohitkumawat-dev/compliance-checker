import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Scanner from './pages/Scanner'
import Results from './pages/Results'
import HowItWorks from './pages/HowItWorks'
import Rules from './pages/Rules'
import About from './pages/About'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/results" element={<Results />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App