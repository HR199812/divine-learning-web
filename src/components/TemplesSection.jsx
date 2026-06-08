const ROW1 = [
  'Kashi Vishwanath', 'Kedarnath', 'Somnath', 'Tirupati Balaji',
  'Meenakshi Amman', 'Rameshwaram', 'Badrinath', 'Dwarka',
  'Jagannath Puri', 'Siddhivinayak', 'Vaishno Devi', 'Amarnath',
]

const ROW2 = [
  'Padmanabhaswamy', 'Lingaraja Temple', 'Brihadeeswarar', 'Akshardham Delhi',
  'Shirdi Sai Baba', 'Trimbakeshwar', 'Omkareshwar', 'Kalighat Kali',
  'Vrindavan ISKCON', 'Udupi Krishna', 'Khajuraho', 'Konark Sun Temple',
]

function Pill({ name }) {
  return (
    <>
      <div className="marquee-pill">
        <i className="fa-solid fa-place-of-worship"></i> {name}
      </div>
      <div className="marquee-dot"></div>
    </>
  )
}

export default function TemplesSection() {
  const row1 = [...ROW1, ...ROW1]
  const row2 = [...ROW2, ...ROW2]

  return (
    <section id="temples" className="temples-section">
      <div className="temples-header">
        <div>
          <div className="section-eyebrow"><i className="fa-solid fa-place-of-worship"></i> Sacred Map of India</div>
          <div className="temples-big-num"><span>195</span>+<br />Temples</div>
        </div>
        <div style={{ maxWidth: '320px' }}>
          <p className="section-sub">Every Jyotirlinga, Char Dham, Shakti Peetha, and heritage temple — fully translated, with directions and visiting info.</p>
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <span className="bento-tag"><i className="fa-solid fa-om"></i> Jyotirlinga</span>
            <span className="bento-tag"><i className="fa-solid fa-route"></i> Char Dham</span>
            <span className="bento-tag"><i className="fa-solid fa-circle-nodes"></i> Shakti Peetha</span>
            <span className="bento-tag"><i className="fa-solid fa-landmark"></i> Heritage</span>
          </div>
        </div>
      </div>

      <div className="marquee-row" style={{ overflow: 'hidden' }}>
        <div className="marquee-track">
          {row1.map((name, i) => <Pill key={i} name={name} />)}
        </div>
      </div>

      <div className="marquee-row" style={{ overflow: 'hidden', marginTop: '16px' }}>
        <div className="marquee-track-r">
          {row2.map((name, i) => <Pill key={i} name={name} />)}
        </div>
      </div>
    </section>
  )
}
