export default function FeaturesSection() {
  return (
    <section id="features" className="section">
      <div className="container">
        <div className="section-eyebrow"><i className="fa-solid fa-sparkles"></i> Features</div>
        <h2 className="section-title">Everything for your<br /><em>Sadhana</em></h2>
        <p className="section-sub">From the first bead to the final mantra — one app for your entire spiritual day.</p>

        <div className="bento">

          <div className="bento-item bento-wide">
            <div className="bento-icon"><i className="fa-solid fa-circle-dot"></i></div>
            <div className="bento-label">Japa Mala Counter</div>
            <div className="bento-desc">Count your chants with a beautiful digital mala. Track 108-bead rounds, lifetime Jaap count, and daily streaks — even without an account.</div>
            <div className="bento-tags">
              <span className="bento-tag"><i className="fa-solid fa-wifi-slash"></i> Works Offline</span>
              <span className="bento-tag"><i className="fa-solid fa-fire"></i> Streak Tracking</span>
              <span className="bento-tag"><i className="fa-solid fa-rotate"></i> 108 Beads</span>
            </div>
            <div className="bento-deco">108</div>
            <svg className="mala-ring" viewBox="0 0 180 180" aria-hidden="true">
              <circle cx="90" cy="90" r="70" />
              <circle cx="90" cy="90" r="50" />
              <circle cx="90" cy="90" r="30" />
            </svg>
          </div>

          <div className="bento-item">
            <div className="bento-icon"><i className="fa-solid fa-book-open"></i></div>
            <div className="bento-label">Sacred Text Library</div>
            <div className="bento-desc">Complete Aartis, Chalisas, Bhajans, Mantras, and Kathas — with Hindi text and English transliteration.</div>
            <div className="bento-tags">
              <span className="bento-tag">Aartis</span>
              <span className="bento-tag">Chalisas</span>
              <span className="bento-tag">Bhajans</span>
              <span className="bento-tag">Mantras</span>
            </div>
          </div>

          <div className="bento-item">
            <div className="bento-icon"><i className="fa-solid fa-map-location-dot"></i></div>
            <div className="bento-label">Temple Map</div>
            <div className="bento-desc">195+ sacred temples — Jyotirlingas, Shakti Peethas, Dhams — with history, directions, and timings in your language.</div>
            <div className="bento-deco" style={{ fontSize: '56px', right: '24px', bottom: '20px', color: 'rgba(255,107,0,0.08)' }}>195+</div>
          </div>

          <div className="bento-item">
            <div className="bento-icon"><i className="fa-solid fa-book-open-reader"></i></div>
            <div className="bento-label">Daily Bhagavad Gita</div>
            <div className="bento-desc">A fresh shloka every morning with Sanskrit, Hindi, and English meaning. Listen with natural TTS recitation.</div>
          </div>

          <div className="bento-item">
            <div className="bento-icon"><i className="fa-solid fa-moon"></i></div>
            <div className="bento-label">Panchang & Muhurat</div>
            <div className="bento-desc">Live daily Panchang — Tithi, Nakshatra, Yoga, Karana — based on your location. Brahma Muhurta and Rahu Kaal included.</div>
          </div>

          <div className="bento-item bento-wide">
            <div className="bento-icon"><i className="fa-solid fa-wand-magic-sparkles"></i></div>
            <div className="bento-label">AI Spiritual Guide</div>
            <div className="bento-desc">Ask about mantras, rituals, or scripture. Get grounded, thoughtful answers powered by AI — in your language, rooted in tradition.</div>
            <div className="bento-tags">
              <span className="bento-tag"><i className="fa-solid fa-comments"></i> Contextual Chat</span>
              <span className="bento-tag"><i className="fa-solid fa-face-smile-beam"></i> Mood-based Gita</span>
              <span className="bento-tag"><i className="fa-solid fa-language"></i> 10 Languages</span>
            </div>
          </div>

          <div className="bento-item">
            <div className="bento-icon"><i className="fa-solid fa-bullseye"></i></div>
            <div className="bento-label">Sankalpa Tracker</div>
            <div className="bento-desc">Set a sacred vow with a daily Mala target and duration. Honour your commitment, one day at a time.</div>
          </div>

          <div className="bento-item">
            <div className="bento-icon"><i className="fa-solid fa-diagram-project"></i></div>
            <div className="bento-label">Kundli & Guna Milan</div>
            <div className="bento-desc">Vedic birth chart generation and 36-point Guna Milan compatibility — powered by VedAstro.</div>
          </div>

          <div className="bento-item bento-wide">
            <div className="bento-icon"><i className="fa-solid fa-calendar-days"></i></div>
            <div className="bento-label">Festival Calendar</div>
            <div className="bento-desc">80+ Hindu festivals from 2026 to 2030 with countdown timers, descriptions, and associated deities. Never miss a sacred day.</div>
            <div className="bento-deco" style={{ fontSize: '54px', right: '24px', bottom: '20px', color: 'rgba(255,107,0,0.07)' }}>2026–2030</div>
          </div>

        </div>
      </div>
    </section>
  )
}
