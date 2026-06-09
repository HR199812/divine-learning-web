// Layout: 4-col grid, 4 rows. Each item has explicit col/row placement.
//
//  Row 1: [Home ×2cols]        [Panchang]   [AI Guide ×2rows]
//  Row 2: [Home ×2cols]        [Mala Jaap]  [AI Guide cont. ]
//  Row 3: [Library] [Chalisas×2rows] [Reader]  [Mood·Gita×2rows]
//  Row 4: [Gita]   [Chalisas cont.] [Settings][Mood·Gita cont.]

const SCREENS = [
  { src: '/images/IMG_3963.PNG', label: 'Home',           col: '1 / 3', row: '1 / 3', phone: 200 },
  { src: '/images/IMG_3972.PNG', label: 'Panchang',       col: '3',     row: '1',     phone: 126 },
  { src: '/images/IMG_3948.PNG', label: 'AI Guide',       col: '4',     row: '1 / 3', phone: 162 },
  { src: '/images/IMG_3969.PNG', label: 'Mala Jaap',      col: '3',     row: '2',     phone: 126 },
  { src: '/images/IMG_3967.PNG', label: 'Sacred Library', col: '1',     row: '3',     phone: 126 },
  { src: '/images/IMG_3974.PNG', label: 'Chalisas',       col: '2',     row: '3 / 5', phone: 162 },
  { src: '/images/IMG_3976.PNG', label: 'Chalisa Reader', col: '3',     row: '3',     phone: 126 },
  { src: '/images/IMG_3964.PNG', label: 'Mood · Gita',    col: '4',     row: '3 / 5', phone: 162 },
  { src: '/images/IMG_3965.PNG', label: 'Daily Gita',     col: '1',     row: '4',     phone: 126 },
  { src: '/images/IMG_3970.PNG', label: 'Settings',       col: '3',     row: '4',     phone: 126 },
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
