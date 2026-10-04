/**
 * Jyotish — Kundli, Horoscope, Matchmaking, Muhurat, Panchang.
 *
 * This replaced a single "Kundli & Guna Milan" tile in the features bento, which
 * was one line for what is actually five screens and the app's whole astrological
 * half. It is a section rather than more bento tiles because these features share
 * an input — your birth date, time and place — and that relationship is the thing
 * a visitor needs to understand before any individual feature means anything.
 *
 * Every claim here is one the app actually makes: North *and* South chart styles,
 * running Vimshottari dasha, 36-point Guna Milan, the six muhurat windows. Nothing
 * is aspirational — a landing page that oversells is the fastest way to a one-star
 * review that says "not as advertised".
 */

const CARDS = [
  {
    icon: 'fa-diagram-project',
    title: 'Birth Chart',
    desc:
      'A real Vedic kundli rendered from your exact birth moment — not a generic sun-sign ' +
      'readout. Switch between North and South Indian chart styles.',
    tags: ['North & South styles', 'Lahiri ayanamsa', 'D1 Rasi chart'],
  },
  {
    icon: 'fa-chart-line',
    title: 'Horoscope & Dasha',
    desc:
      'Your running Vimshottari dasha — Dasha, Bhukti and Antaram — with readings grouped ' +
      'by the areas of life they speak to.',
    tags: ['Dasha · Bhukti · Antaram', 'Readings by life area', '10 languages'],
  },
  {
    icon: 'fa-heart',
    title: 'Guna Milan',
    desc:
      'The classical 36-point compatibility score across all eight kootas, with the ' +
      'nakshatra and moon sign behind each one shown plainly.',
    tags: ['36 points', '8 kootas', 'Dosha check'],
  },
  {
    icon: 'fa-clock',
    title: 'Daily Muhurat',
    desc:
      'Brahma Muhurta, Abhijit, Rahu Kaal, the full Chaughadia table, plus Bhadra and ' +
      'Panchak — computed for where you actually are.',
    tags: ['6 window types', 'Your location', 'Share as a card'],
  },
  {
    icon: 'fa-sun',
    title: 'Panchang',
    desc:
      'All five limbs — Vara, Tithi, Nakshatra, Yoga and Karana — with sunrise, sunset ' +
      'and Rahu Kalam, for any date you choose.',
    tags: ['Any date', 'Amanta & Purnimanta', 'Vikram Samvat'],
  },
]

export default function JyotishSection() {
  return (
    <section id="jyotish" className="section">
      <div className="container">
        <div className="section-eyebrow">
          <i className="fa-solid fa-star-of-david"></i> Jyotish
        </div>
        <h2 className="section-title">
          Your chart,<br /><em>read properly</em>
        </h2>
        <p className="section-sub">
          Enter your birth date, time and place once. Every reading below is computed from
          that same moment — no sun-sign shortcuts, no generic horoscopes.
        </p>

        <div className="jyotish-grid">
          {CARDS.map((c) => (
            <div key={c.title} className="jyotish-card">
              <div className="bento-icon"><i className={`fa-solid ${c.icon}`}></i></div>
              <h3 className="jyotish-title">{c.title}</h3>
              <p className="jyotish-desc">{c.desc}</p>
              <div className="bento-tags">
                {c.tags.map((t) => (
                  <span key={t} className="bento-tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="jyotish-note">
          <i className="fa-solid fa-circle-info"></i>
          {' '}Charts and readings come from the classical corpus. Readings covering mortality
          and medical prognosis are deliberately withheld — see the in-app note.
        </p>
      </div>
    </section>
  )
}
