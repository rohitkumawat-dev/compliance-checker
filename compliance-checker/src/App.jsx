import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Scanner from './pages/Scanner'
import Results from './pages/Results'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App