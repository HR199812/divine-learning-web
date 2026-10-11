/**
 * Every screen — a staggered wall of real app screenshots.
 *
 * ─── NO CARDS ───
 * Each screenshot used to sit inside its own white bento card: the phone small,
 * the card large, most of every tile empty, and the labels clipped by the phone
 * above them. The screenshots are already self-contained surfaces with their own
 * rounded corners, so a card around them is a frame around a frame. They now
 * stand directly on the sandalwood ground with a soft warm lift, the way a
 * product page shows its screens.
 *
 * ─── A WALL OF COLUMNS, NOT A GRID OF ROWS ───
 * Thirteen screens do not fill a row grid evenly, and a ragged last row reads as
 * something missing. Five columns, with the 2nd and 4th dropped by a step, make
 * uneven column lengths look deliberate. Screens are dealt into columns in reading
 * order (round-robin), so the order below is the order a visitor meets them.
 *
 * On a phone the wall becomes one horizontal, snap-scrolling row in that same order.
 */

const SCREENS = [
  { src: '/images/home-panchang.png', label: 'Home · Panchang' },
  { src: '/images/sun-muhurat.png', label: 'Sun & Muhurat' },
  { src: '/images/panchang-calendar.png', label: 'Panchang Calendar' },
  { src: '/images/festivals.png', label: 'Festivals & Vrats' },
  { src: '/images/recitation.png', label: 'Recitation' },
  { src: '/images/mala.png', label: 'Mala Jaap' },
  { src: '/images/ai-guide.png', label: 'AI Guide' },
  { src: '/images/library.png', label: 'Sacred Library' },
  { src: '/images/chalisa-reader.png', label: 'Chalisa Reader' },
  { src: '/images/temple-map.png', label: 'Temple Map' },
  { src: '/images/home-gita.png', label: 'Mood · Gita' },
  { src: '/images/activity.png', label: 'Your Activity' },
  { src: '/images/tools.png', label: 'Jyotish Tools' },
]

const COLUMNS = 5

function Shot({ s }) {
  return (
    <figure className="shot">
      <img src={s.src} alt={`${s.label} screen in the Aradhana Kit app`} loading="lazy" width="440" height="952" />
      <figcaption>{s.label}</figcaption>
    </figure>
  )
}

export default function GallerySection() {
  const columns = Array.from({ length: COLUMNS }, (_, c) => SCREENS.filter((_, i) => i % COLUMNS === c))

  return (
    <section className="gallery-section">
      <div className="gallery-header">
        <div className="section-eyebrow"><i className="fa-solid fa-mobile-screen"></i> The App</div>
        <h2 className="section-title">Every screen,<br /><em>crafted with care</em></h2>
      </div>

      {/* Desktop and tablet: the staggered wall. */}
      <div className="screen-wall" aria-hidden="false">
        {columns.map((col, c) => (
          <div key={c} className="screen-col">
            {col.map((s) => <Shot key={s.src} s={s} />)}
          </div>
        ))}
      </div>

      {/* Phone: one swipeable row, in reading order. */}
      <div className="screen-rail">
        {SCREENS.map((s) => <Shot key={s.src} s={s} />)}
      </div>
    </section>
  )
}
