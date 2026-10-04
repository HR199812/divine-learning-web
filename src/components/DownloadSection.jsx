export default function DownloadSection() {
  return (
    <section id="download" className="cta-section">
      <div className="cta-glow"></div>
      <div className="cta-content">
        <div className="section-eyebrow" style={{ justifyContent: 'center', marginBottom: '18px' }}>
          <i className="fa-solid fa-om"></i> Begin Your Journey
        </div>
        <h2 className="cta-title">Start your Aradhana Kit<br /><em>today. Free.</em></h2>
        <p className="cta-sub">No subscriptions. No ads. Built with devotion for every Hindu, everywhere.</p>
        <div className="store-buttons">
          <a href="https://apps.apple.com/in/app/aradhana-kit/id6781756782" className="store-btn">
            <i className="fa-brands fa-apple"></i>
            <div className="store-text">
              <span>Download on the</span>
              <strong>App Store</strong>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
