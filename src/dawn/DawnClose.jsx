import { Link } from 'react-router-dom'

const APP_STORE = 'https://apps.apple.com/in/app/aradhana-kit/id6781756782'
// The Play listing is in closed testing; flip this once it is public, and the button appears.
const PLAY_LIVE = false
const PLAY_STORE = 'https://play.google.com/store/apps/details?id=com.justanothersupremesoul.divinelearning'

/** Back into the night: the invocation, the call to begin, and the footer. */
export default function DawnClose() {
  return (
    <section id="get" className="dn-close" data-tone="dark">
      <div className="dn-close-inner">
        <p className="dn-close-invocation" lang="hi">॥ सीताराम ॥</p>
        <h2 className="dn-close-title">Tomorrow, begin before the sun.</h2>
        <p className="dn-close-sub">Free. No ads. No account needed to begin.</p>
        <div className="dn-close-stores">
          <a href={APP_STORE} className="dn-store dn-store--solid">
            <span className="dn-store-small">Download on the</span>
            <span className="dn-store-big">App Store</span>
          </a>
          {PLAY_LIVE ? (
            <a href={PLAY_STORE} className="dn-store dn-store--line">
              <span className="dn-store-small">Get it on</span>
              <span className="dn-store-big">Google Play</span>
            </a>
          ) : (
            <span className="dn-store dn-store--line dn-store--soon" aria-label="Google Play — coming soon">
              <span className="dn-store-small">Coming soon to</span>
              <span className="dn-store-big">Google Play</span>
            </span>
          )}
        </div>
      </div>
      <footer className="dn-footer">
        <span>© 2026 Aradhana Kit · Made with devotion</span>
        <span className="dn-footer-links">
          <Link to="/privacy-policy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/delete-account">Delete account</Link>
          <Link to="/support">Support</Link>
          <a href="mailto:admin@canvadb.com">Contact</a>
        </span>
      </footer>
    </section>
  )
}
