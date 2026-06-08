const SCREENS = [
  { src: '/images/IMG_3963.PNG', label: 'Home' },
  { src: '/images/IMG_3972.PNG', label: 'Panchang' },
  { src: '/images/IMG_3969.PNG', label: 'Mala Jaap' },
  { src: '/images/IMG_3967.PNG', label: 'Divine Library' },
  { src: '/images/IMG_3974.PNG', label: 'Chalisas' },
  { src: '/images/IMG_3976.PNG', label: 'Chalisa Reader' },
  { src: '/images/IMG_3965.PNG', label: 'Gita Recitation' },
  { src: '/images/IMG_3964.PNG', label: 'Mood · Gita' },
  { src: '/images/IMG_3948.PNG', label: 'AI Guide' },
  { src: '/images/IMG_3971.PNG', label: 'Home · Light' },
  { src: '/images/IMG_3975.PNG', label: 'Mala · Light' },
  { src: '/images/IMG_3970.PNG', label: 'Settings' },
]

function PhoneCard({ src, label }) {
  return (
    <div className="phone-wrap">
      <div className="phone-frame">
        <div className="phone-island"></div>
        <img src={src} alt={label} loading="lazy" />
      </div>
      <div className="phone-label">{label}</div>
    </div>
  )
}

export default function GallerySection() {
  const doubled = [...SCREENS, ...SCREENS]

  return (
    <section className="gallery-section">
      <div className="gallery-header">
        <div className="section-eyebrow"><i className="fa-solid fa-mobile-screen"></i> The App</div>
        <h2 className="section-title">Every screen,<br /><em>crafted with care</em></h2>
      </div>
      <div className="phone-row">
        <div className="phone-track-l">
          {doubled.map((s, i) => <PhoneCard key={i} {...s} />)}
        </div>
      </div>
    </section>
  )
}
