export default function Navbar() {
  return (
    <nav className="nav-home">
      <a href="#" className="nav-brand">
        <img src="/icon.png" alt="Aradhana Kit" />
        Aradhana Kit
      </a>
      <ul className="nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#temples">Temples</a></li>
        <li><a href="#languages">Languages</a></li>
        <li><a href="#tools">Tools</a></li>
      </ul>
      <a href="#download" className="nav-cta">
        <i className="fa-solid fa-download"></i> Download
      </a>
    </nav>
  )
}
