import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Support from './pages/Support'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/support" element={<Support />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  )
}
