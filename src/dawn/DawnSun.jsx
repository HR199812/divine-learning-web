import { useRef, useState } from 'react'
import { useScrollProgress } from './useScrollProgress'

// The arc is a quadratic Bézier from the left horizon, over the top, to the right horizon.
const P0 = [40, 340], P1 = [500, -120], P2 = [960, 340]
const at = (t) => [
  (1 - t) ** 2 * P0[0] + 2 * (1 - t) * t * P1[0] + t ** 2 * P2[0],
  (1 - t) ** 2 * P0[1] + 2 * (1 - t) * t * P1[1] + t ** 2 * P2[1],
]
const MARKS = [
  { kind: 'Rises', name: 'Sunrise', t: 0.04 },
  { kind: 'Shubh', name: 'Abhijit Muhurat', t: 0.5 },
  { kind: 'Avoid', name: 'Rahu Kaal', t: 0.68 },
  { kind: 'Sets', name: 'Sunset', t: 0.96 },
]

/** The sun walks the day's arc as you scroll, lighting each window it passes. */
export default function DawnSun() {
  const ref = useRef(null)
  const sun = useRef(null)
  const halo = useRef(null)
  const trail = useRef(null)
  const [reached, setReached] = useState(0)

  useScrollProgress(ref, (p, reduced) => {
    const t = reduced ? 1 : Math.min(1, p * 1.15)
    const [x, y] = at(t)
    for (const c of [sun.current, halo.current]) { c.setAttribute('cx', x.toFixed(1)); c.setAttribute('cy', y.toFixed(1)) }
    trail.current.style.strokeDashoffset = String(1 - t)
    setReached(MARKS.filter((m) => t >= m.t - 0.02).length)
  })

  return (
    <section ref={ref} className="dn-sun" data-tone="light">
      <div className="dn-sun-pin">
        <p className="dn-eyebrow dn-eyebrow--day">The Panchang, computed on your phone</p>
        <h2 className="dn-sun-title">Sunrise at <em>your</em> door,<br />not Delhi's.</h2>
        <div className="dn-sun-stage">
          <svg viewBox="0 0 1000 380" className="dn-sun-svg" aria-hidden="true">
            <path d="M 40 340 Q 500 -120 960 340" fill="none" stroke="#D9C7B0" strokeWidth="2" strokeDasharray="4 8" />
            <path ref={trail} d="M 40 340 Q 500 -120 960 340" fill="none" stroke="#E58445" strokeWidth="3" strokeLinecap="round" pathLength="1" strokeDasharray="1" style={{ strokeDashoffset: 1 }} />
            <line x1="0" y1="340" x2="1000" y2="340" stroke="#94815E" strokeWidth="1" />
            <circle ref={halo} cx="40" cy="340" r="46" fill="#F3C98B" opacity="0.35" />
            <circle ref={sun} cx="40" cy="340" r="26" fill="#E58445" />
          </svg>
          <ol className="dn-sun-marks">
            {MARKS.map((m, i) => {
              const [x, y] = at(m.t)
              return (
                <li key={m.name} className={i < reached ? 'is-on' : undefined}
                  style={{ left: `${(x / 1000) * 100}%`, top: `${((y + (m.t === 0.5 ? -110 : 26)) / 380) * 100}%` }}>
                  <span className="dn-sun-kind">{m.kind}</span>
                  <span className="dn-sun-name">{m.name}</span>
                </li>
              )
            })}
          </ol>
        </div>
        <p className="dn-sun-note">Tithi, nakshatra, Rahu Kaal and every muhurat — for your exact location, accurate even without signal.</p>
      </div>
    </section>
  )
}
