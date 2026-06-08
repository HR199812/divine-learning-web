const LANGUAGES = [
  { name: 'English',   native: 'English' },
  { name: 'Hindi',     native: 'हिंदी' },
  { name: 'Bengali',   native: 'বাংলা' },
  { name: 'Marathi',   native: 'मराठी' },
  { name: 'Gujarati',  native: 'ગુજરાતી' },
  { name: 'Odia',      native: 'ଓଡ଼ିଆ' },
  { name: 'Tamil',     native: 'தமிழ்' },
  { name: 'Telugu',    native: 'తెలుగు' },
  { name: 'Kannada',   native: 'ಕನ್ನಡ' },
  { name: 'Malayalam', native: 'മലയാളം' },
]

const SCRIPTS = [
  { text: 'हिंदी',    style: { fontSize: '76px', top: '0',    left: '10px',  color: 'rgba(255,240,224,0.9)',  '--dur': '5.2s', '--delay': '0s',    '--lift': '-12px' } },
  { text: 'বাংলা',   style: { fontSize: '52px', top: '60px',  right: '0',    color: 'rgba(255,240,224,0.5)',  '--dur': '4.6s', '--delay': '-1.5s', '--lift': '-8px'  } },
  { text: 'मराठी',   style: { fontSize: '58px', top: '130px', left: '20px',  color: 'rgba(255,240,224,0.35)', '--dur': '6.1s', '--delay': '-2.8s', '--lift': '-10px' } },
  { text: 'ગુજરાતી', style: { fontSize: '44px', top: '185px', right: '20px', color: 'rgba(255,240,224,0.6)',  '--dur': '4.9s', '--delay': '-0.7s', '--lift': '-9px'  } },
  { text: 'தமிழ்',   style: { fontSize: '48px', top: '250px', left: '0',     color: 'rgba(255,240,224,0.4)',  '--dur': '5.7s', '--delay': '-3.4s', '--lift': '-11px' } },
  { text: 'తెలుగు',  style: { fontSize: '40px', top: '305px', right: '10px', color: 'rgba(255,240,224,0.45)', '--dur': '4.4s', '--delay': '-1.1s', '--lift': '-7px'  } },
  { text: 'ಕನ್ನಡ',   style: { fontSize: '42px', top: '350px', left: '30px',  color: 'rgba(255,240,224,0.3)',  '--dur': '6.3s', '--delay': '-4.0s', '--lift': '-10px' } },
  { text: 'മലയാളം',  style: { fontSize: '44px', bottom: '20px', right: '0',  color: 'rgba(255,240,224,0.55)', '--dur': '5.0s', '--delay': '-2.2s', '--lift': '-9px'  } },
  { text: 'ଓଡ଼ିଆ',   style: { fontSize: '36px', bottom: '5px',  left: '10px', color: 'rgba(255,107,0,0.45)',   '--dur': '4.7s', '--delay': '-0.4s', '--lift': '-8px'  } },
]

export default function LanguagesSection() {
  return (
    <section id="languages" className="section languages-section">
      <div className="container">
        <div className="lang-layout">
          <div>
            <div className="section-eyebrow"><i className="fa-solid fa-language"></i> Language</div>
            <h2 className="section-title">10 Languages.<br /><em>One Soul.</em></h2>
            <p className="section-sub">Temple info, UI, Panchang, AI responses — everything in the language of your heart.</p>
            <div className="lang-list">
              {LANGUAGES.map(l => (
                <div key={l.name} className="lang-row">
                  <i className="fa-solid fa-circle-dot lang-row-icon"></i>
                  <span className="lang-row-name">{l.name}</span>
                  <span className="lang-row-native">{l.native}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lang-scripts" aria-hidden="true">
            {SCRIPTS.map((s, i) => (
              <span key={i} className="lang-script-item" style={s.style}>{s.text}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
