import { Link } from 'react-router-dom'

export default function LegalNav() {
  return (
    <nav className="nav-legal">
      <Link to="/" className="nav-brand">
        <img src="/icon.png" alt="Divine Learning" />
        <span>Divine Learning</span>
      </Link>
      <Link to="/" className="nav-back">
        <i className="fa-solid fa-arrow-left"></i> Back to Home
      </Link>
    </nav>
  )
}
