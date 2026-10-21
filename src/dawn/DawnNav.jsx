import { useEffect, useState } from 'react'

/**
 * Floating pill nav. It reads the `data-tone` of whichever section sits under it and
 * flips between a dark glass pill (over night) and a light one (over morning), so it
 * stays legible across the page's night → dawn → night arc.
 */
export default function DawnNav() {
  const [tone, setTone] = useState('dark')

  useEffect(() => {
    let raf = 0
    const run = () => {
      raf = 0
      let t = 'dark'
      document.querySelectorAll('[data-tone]').forEach((s) => {
        const r = s.getBoundingClientRect()
        if (r.top <= 40 && r.bottom > 40) t = s.dataset.tone
      })
      setTone(t)
    }
    const schedule = () => { if (!raf) raf = requestAnimationFrame(run) }
    run()
    window.addEventListener('scroll', schedule, { passive: true })
    return () => { window.removeEventListener('scroll', schedule); if (raf) cancelAnimationFrame(raf) }
  }, [])

  return (
    <header className="dn-nav-wrap">
      <nav className={`dn-nav dn-nav--${tone}`} aria-label="Main">
        <a href="#top" className="dn-brand">
          <img src="/icon.png" alt="" width="26" height="26" />
          <span>Aradhana Kit</span>
        </a>
        <span className="dn-nav-links">
          <a href="#story" className="dn-nav-link">Inside the app</a>
          <a href="#panchang" className="dn-nav-link">Panchang</a>
          <a href="#get" className="dn-nav-cta">Get the app</a>
        </span>
      </nav>
    </header>
  )
}
