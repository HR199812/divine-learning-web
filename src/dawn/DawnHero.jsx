import { useRef } from 'react'
import { useScrollProgress, easeOut } from './useScrollProgress'

/** The phone lies back in the dark and rises to meet you; a diya-glow brightens behind it. */
export default function DawnHero() {
  const ref = useRef(null)
  useScrollProgress(ref, (p, reduced) => {
    const h = reduced ? 1 : easeOut(Math.min(1, p * 1.6))
    ref.current.style.setProperty('--h', h.toFixed(4))
    ref.current.style.setProperty('--p', (reduced ? 0 : p).toFixed(4))
  })

  return (
    <section id="top" ref={ref} className="dn-hero" data-tone="dark">
      <div className="dn-hero-pin">
        <div className="dn-hero-glow" aria-hidden="true" />
        <p className="dn-hero-watermark" aria-hidden="true">आराधना</p>
        <div className="dn-hero-text">
          <p className="dn-eyebrow">Aradhana Kit · for Android and iPhone</p>
          <h1 className="dn-hero-title">Begin before<br /><em>the sun does.</em></h1>
        </div>
        <div className="dn-hero-phone">
          <div className="dn-phone dn-phone--night">
            <img src="/images/home-panchang.png" alt="Aradhana Kit home screen with today's Panchang" width="440" height="952" />
          </div>
        </div>
      </div>
    </section>
  )
}
