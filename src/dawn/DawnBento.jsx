import { useRef } from 'react'
import { useScrollProgress } from './useScrollProgress'

/** Cards rise in, staggered by their `--i`, as the grid enters the window. */
export default function DawnBento() {
  const ref = useRef(null)
  useScrollProgress(ref, (p, reduced) => ref.current.style.setProperty('--b', reduced ? '1' : p.toFixed(4)), { mode: 'enter' })

  return (
    <section ref={ref} className="dn-bento" data-tone="light">
      <div className="dn-bento-inner">
        <h2 className="dn-bento-title">Everything a practice needs. <em>Nothing it doesn't.</em></h2>
        <div className="dn-bento-grid">
          <article className="dn-card dn-card--wide dn-card--tall" style={{ '--i': 0 }}>
            <div className="dn-card-copy">
              <h3>3,300+ texts</h3>
              <p>Chalisas, aartis, bhajans, mantras and kathas — inside the app, ready offline.</p>
            </div>
            <div className="dn-card-phone dn-card-phone--library">
              <img src="/images/library.png" alt="The Library, with its collections" loading="lazy" width="440" height="952" />
            </div>
          </article>
          <article className="dn-card dn-card--sand" style={{ '--i': 1 }}>
            <p className="dn-card-scripts" lang="hi">हिन्दी বাংলা<br />मराठी தமிழ்</p>
            <p>Ten languages, including English.</p>
          </article>
          <article className="dn-card" style={{ '--i': 2 }}>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#A84200" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 2l20 20" /><path d="M8.5 16.5a5 5 0 0 1 7 0" /><path d="M5 12.9a10 10 0 0 1 5.2-2.7" /><path d="M12 20h.01" /></svg>
            <h3>Works with no signal.</h3>
          </article>
          <article className="dn-card dn-card--ink" style={{ '--i': 3 }}>
            <h3>Free.<br />No ads. Ever.</h3>
            <p>Nothing interrupts a recitation.</p>
          </article>
          <article className="dn-card dn-card--wide" style={{ '--i': 4 }}>
            <div className="dn-card-copy dn-card-copy--narrow">
              <h3>Every sacred door.</h3>
              <p>Jyotirlingas, Char Dham, Shakti Peethas — with each temple's story and directions.</p>
            </div>
            <div className="dn-card-phone dn-card-phone--map">
              <img src="/images/temple-map.png" alt="The temple map" loading="lazy" width="440" height="952" />
            </div>
          </article>
          <article className="dn-card dn-card--warm" style={{ '--i': 5 }}>
            <h3>Never miss a vrat.</h3>
            <p>An alert the evening before every fast, and a Panchang note each morning.</p>
          </article>
          <article className="dn-card" style={{ '--i': 6 }}>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#A84200" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
            <h3>Your chats stay on your phone.</h3>
          </article>
        </div>
      </div>
    </section>
  )
}
