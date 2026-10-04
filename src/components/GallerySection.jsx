// Layout: 4-col grid, 4 rows. Each item has explicit col/row placement.
//
//  Row 1: [Home ×2cols]        [Recitation] [AI Guide ×2rows]
//  Row 2: [Home ×2cols]        [Mala Jaap]  [AI Guide cont. ]
//  Row 3: [Library] [TempleMap×2rows] [Reader]  [Mood·Gita×2rows]
//  Row 4: [Activity][TempleMap cont.]  [Jyotish] [Mood·Gita cont.]

const SCREENS = [
  { src: '/images/home-panchang.png',  label: 'Home · Panchang', col: '1 / 3', row: '1 / 3', phone: 200 },
  { src: '/images/recitation.png',     label: 'Recitation',      col: '3',     row: '1',     phone: 126 },
  { src: '/images/ai-guide.png',       label: 'AI Guide',        col: '4',     row: '1 / 3', phone: 162 },
  { src: '/images/mala.png',           label: 'Mala Jaap',       col: '3',     row: '2',     phone: 126 },
  { src: '/images/library.png',        label: 'Sacred Library',  col: '1',     row: '3',     phone: 126 },
  { src: '/images/temple-map.png',     label: 'Temple Map',      col: '2',     row: '3 / 5', phone: 162 },
  { src: '/images/chalisa-reader.png', label: 'Chalisa Reader',  col: '3',     row: '3',     phone: 126 },
  { src: '/images/home-gita.png',      label: 'Mood · Gita',     col: '4',     row: '3 / 5', phone: 162 },
  { src: '/images/activity.png',       label: 'Your Activity',   col: '1',     row: '4',     phone: 126 },
  { src: '/images/tools.png',          label: 'Jyotish Tools',   col: '3',     row: '4',     phone: 126 },
]

export default function GallerySection() {
  return (
    <section className="gallery-section">
      <div className="gallery-header">
        <div className="section-eyebrow"><i className="fa-solid fa-mobile-screen"></i> The App</div>
        <h2 className="section-title">Every screen,<br /><em>crafted with care</em></h2>
      </div>
      <div className="screen-grid">
        {SCREENS.map((s, i) => (
          <div
            key={i}
            className="screen-card"
            style={{ gridColumn: s.col, gridRow: s.row }}
          >
            <div className="phone-frame" style={{ width: s.phone }}>
              <div className="phone-island"></div>
              <img src={s.src} alt={s.label} loading="lazy" />
            </div>
            <div className="screen-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
