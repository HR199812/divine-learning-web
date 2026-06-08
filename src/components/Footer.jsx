import { useState } from 'react'
import { Link } from 'react-router-dom'

function ContactButton() {
  const [copied, setCopied] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText('admin@canvadb.com').then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <a href="mailto:admin@canvadb.com" onClick={handleClick}>
        <i className="fa-solid fa-envelope"></i> Contact
      </a>
      {copied && (
        <span style={{
          position: 'absolute', bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)',
          background: '#FF6B00', color: '#fff', fontSize: '11px', fontWeight: 600,
          whiteSpace: 'nowrap', padding: '4px 10px', borderRadius: '100px', pointerEvents: 'none',
        }}>
          Email copied!
        </span>
      )}
    </span>
  )
}

export default function Footer() {
  return (
    <footer>
      <div className="footer-brand">
        <img src="/icon.png" alt="Aradhana" />
        <span>Aradhana</span>
      </div>
      <div className="footer-copy">
        © 2026 Aradhana · Free for everyone, always.
        <br />
        <span style={{ fontSize: '12px' }}>
          Made with devotion by{' '}
          <a
            href="https://www.linkedin.com/in/hritwik-agarwal-99a5a0102/"
            target="_blank"
            rel="noreferrer"
            style={{ color: '#FF6B00', textDecoration: 'none', fontWeight: 500 }}
          >
            Hritwik Agarwal
          </a>
        </span>
      </div>
      <div className="footer-links">
        <a href="#features"><i className="fa-solid fa-star"></i> Features</a>
        <a href="#download"><i className="fa-solid fa-download"></i> Download</a>
        <Link to="/support"><i className="fa-solid fa-circle-question"></i> Support</Link>
        <Link to="/privacy-policy"><i className="fa-solid fa-shield-halved"></i> Privacy</Link>
        <Link to="/terms"><i className="fa-solid fa-file-contract"></i> Terms</Link>
        <ContactButton />
      </div>
    </footer>
  )
}
