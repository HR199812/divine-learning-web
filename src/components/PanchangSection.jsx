import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Panchang Calendar & Festivals — the calendar itself, live and interactive in
 * the visitor's browser. (The app's screenshots of it live in the gallery,
 * "Every screen, crafted with care", with the rest of the app.)
 *
 * The same engine (@ishubhamx/panchangam-js) the app runs on the
 * phone works out each day's sunrise tithi, the Moon's phase, the nakshatra
 * and the festivals, here, for any month the visitor steps to. A screenshot is
 * stale the day after it is taken; this never is, and it is the honest
 * demonstration of the app's claim that the panchang is computed on the device.
 *
 * There is no "coming up" list on purpose. The app's Festivals screen is that
 * list; the page shows a day's festivals when a day is tapped, the way the
 * app's calendar does, and leaves the rest to the app.
 *
 * It returned with the app's Festivals screen. The festival calendar was taken
 * off the site (commit da8c29e) while the app had none.
 *
 * The engine is code-split and only fetched when the section nears the
 * viewport, so it costs the first paint nothing.
 */

const WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const pad = (n) => String(n).padStart(2, '0')
const keyOf = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`

/** The app's MoonGlyph: printed-almanac inks — the shadow is ink, the lit part paper. */
function Moon({ phase, size = 14 }) {
  const r = size / 2 - 0.75, c = size / 2, f = ((phase % 1) + 1) % 1
  const k = Math.cos(2 * Math.PI * f)
  const rx = Math.max(Math.abs(k) * r, 0.01)
  const top = `${c} ${c - r}`, bot = `${c} ${c + r}`
  const d = f < 0.5
    ? `M ${top} A ${r} ${r} 0 0 1 ${bot} A ${rx} ${r} 0 0 ${k > 0 ? 0 : 1} ${top} Z`
    : `M ${top} A ${r} ${r} 0 0 0 ${bot} A ${rx} ${r} 0 0 ${k > 0 ? 1 : 0} ${top} Z`
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle cx={c} cy={c} r={r} className="pc-moon-shade" />
      <path d={d} className="pc-moon-lit" />
      <circle cx={c} cy={c} r={r} className="pc-moon-rim" />
    </svg>
  )
}

export default function PanchangSection() {
  const ref = useRef(null)
  const engine = useRef(null)          // the lazily imported module
  const cache = useRef(new Map())      // 'y-m' -> days
  const now = new Date()
  const todayKey = keyOf(now.getFullYear(), now.getMonth(), now.getDate())

  const [visible, setVisible] = useState(false)
  const [{ y, m }, setYm] = useState({ y: now.getFullYear(), m: now.getMonth() })
  const [loaded, setLoaded] = useState({ id: '', days: null })
  const [failed, setFailed] = useState(false)
  const [selectedKey, setSelectedKey] = useState(todayKey)

  // Wake up only when the section is near the screen.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); io.disconnect() }
    }, { rootMargin: '400px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Compute (or recall) the month on screen.
  useEffect(() => {
    if (!visible) return
    const id = `${y}-${m}`
    let cancelled = false
    const hit = cache.current.get(id)
    if (hit) { setLoaded({ id, days: hit }); return }
    ;(async () => {
      try {
        engine.current ??= await import('../lib/panchang.js')
        const days = await engine.current.getMonth(y, m)
        cache.current.set(id, days)
        if (!cancelled) setLoaded({ id, days })
      } catch {
        if (!cancelled) setFailed(true)
      }
    })()
    return () => { cancelled = true }
  }, [visible, y, m])

  const step = useCallback((n) => {
    const d = new Date(y, m + n, 1)
    setYm({ y: d.getFullYear(), m: d.getMonth() })
    // Land on today when stepping back into this month, else the 1st — the panel
    // must always describe a day that is on screen.
    setSelectedKey(d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
      ? todayKey : keyOf(d.getFullYear(), d.getMonth(), 1))
  }, [y, m, todayKey]) // eslint-disable-line react-hooks/exhaustive-deps

  const goToday = () => {
    setYm({ y: now.getFullYear(), m: now.getMonth() })
    setSelectedKey(todayKey)
  }

  const days = loaded.id === `${y}-${m}` ? loaded.days : null
  const isCurrent = y === now.getFullYear() && m === now.getMonth()
  const lead = new Date(y, m, 1).getDay()
  const count = new Date(y, m + 1, 0).getDate()
  const cells = [...Array(lead).fill(null), ...Array.from({ length: count }, (_, i) => days?.[i] ?? i + 1)]
  while (cells.length % 7) cells.push(null)
  const sel = days?.find((d) => d.key === selectedKey) ?? null
  const fmt = engine.current?.fmtTime ?? (() => '')

  // Arrow keys move the selection, as in a native calendar.
  const onKey = (e) => {
    if (!days || !sel) return
    const delta = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key]
    if (!delta) return
    e.preventDefault()
    const next = sel.day + delta
    if (next >= 1 && next <= count) setSelectedKey(keyOf(y, m, next))
  }

  return (
    <section id="panchang" className="section" ref={ref}>
      <div className="container">
        <div className="section-eyebrow">
          <i className="fa-solid fa-calendar-days"></i> Panchang Calendar &amp; Festivals
        </div>
        <h2 className="section-title">
          The month, as a<br /><em>panchang prints it</em>
        </h2>
        <p className="section-sub">
          Every day with the tithi that rose with the Sun and the Moon it rose under, and
          every festival and vrat marked — computed on your phone, so it works offline.
        </p>

        <div className="pc-try">
          <i className="fa-solid fa-hand-pointer"></i> Try it — this calendar is live. Step through
          the months and tap any day.
        </div>

        <div className="pc-layout">
          <div className="pc-card">
            <div className="pc-head">
              <button type="button" className="pc-step" onClick={() => step(-1)} aria-label="Previous month">
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <div className="pc-head-mid">
                <span className="pc-month">{MONTHS[m]} {y}</span>
                <span className="pc-place"><i className="fa-solid fa-location-dot"></i> New Delhi · IST</span>
              </div>
              <button type="button" className="pc-step" onClick={() => step(1)} aria-label="Next month">
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
            {!isCurrent ? (
              <button type="button" className="pc-today-btn" onClick={goToday}>
                <i className="fa-solid fa-calendar-day"></i> Back to today
              </button>
            ) : null}

            <div className="pc-week" aria-hidden="true">
              {WEEK.map((w) => <span key={w}>{w}</span>)}
            </div>
            <div className="pc-grid" role="grid" aria-label={`${MONTHS[m]} ${y}`} onKeyDown={onKey}>
              {cells.map((c, i) => {
                if (c == null) return <div key={`b${i}`} className="pc-cell pc-blank" />
                if (typeof c === 'number') {
                  // Not computed yet: the date is known, the panchang is not.
                  return (
                    <div key={`n${c}`} className="pc-cell">
                      <span className="pc-num pc-num-pending">{c}</span>
                      <span className="pc-skel" />
                    </div>
                  )
                }
                const isSel = c.key === selectedKey
                const marked = c.festivals.some((f) => f.chip)
                return (
                  <button
                    type="button"
                    key={c.key}
                    role="gridcell"
                    className={`pc-cell pc-day${c.key === todayKey ? ' pc-today' : ''}${isSel ? ' pc-selected' : ''}`}
                    aria-selected={isSel}
                    aria-label={`${c.day} ${MONTHS[m]}, ${c.paksha} ${c.tithi}${marked ? ', festival' : ''}`}
                    tabIndex={isSel ? 0 : -1}
                    onClick={() => setSelectedKey(c.key)}
                  >
                    <span className="pc-num">{c.day}</span>
                    <Moon phase={c.phase} />
                    <span className="pc-tithi">{c.tithi}</span>
                    {marked ? <i className="pc-dot" /> : null}
                  </button>
                )
              })}
            </div>
            {failed ? <p className="pc-error">The calendar could not be computed in this browser — it is all in the app.</p> : null}
          </div>

          {/* The selected day — the app's day panel. */}
          <div className="pc-card pc-panel" aria-live="polite">
            {sel ? (
              <>
                <div className="pc-panel-date">{sel.weekdayName}, {sel.day} {MONTHS[m]}</div>
                <div className="pc-panel-tithi">
                  <Moon phase={sel.phase} size={34} />
                  <div>
                    <div className="pc-panel-tithi-name">{sel.paksha} {sel.tithi}</div>
                    {sel.tithiEnd ? (
                      <div className="pc-panel-sub">
                        until {fmt(sel.tithiEnd)}
                        {sel.tithiEndKey && sel.tithiEndKey !== sel.key ? `, ${Number(sel.tithiEndKey.slice(8))} ${MONTHS[Number(sel.tithiEndKey.slice(5, 7)) - 1].slice(0, 3)}` : ''}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="pc-facts">
                  <div><span>Nakshatra</span><b>{sel.nakshatra}</b></div>
                  <div><span><i className="fa-solid fa-sun"></i> Sunrise</span><b>{fmt(sel.sunrise)}</b></div>
                  <div><span><i className="fa-solid fa-moon"></i> Sunset</span><b>{fmt(sel.sunset)}</b></div>
                </div>
                <div className="pc-panel-fests">
                  {sel.festivals.length ? sel.festivals.map((f) => (
                    <div key={f.name} className="pc-panel-fest">
                      <i className={`pc-fest-dot${f.chip ? '' : ' pc-fest-dot-minor'}`} />
                      <span className="pc-panel-fest-name">{f.name}</span>
                      {f.chip ? <span className="pc-chip">{f.chip}</span> : null}
                      {f.fasting ? <span className="pc-chip pc-chip-fast">Fast</span> : null}
                    </div>
                  )) : <p className="pc-panel-sub">No festival or vrat on this day.</p>}
                </div>
              </>
            ) : (
              <div className="pc-panel-loading" aria-hidden="true">
                <span className="pc-skel pc-skel-wide" />
                <span className="pc-skel pc-skel-wide" />
                <span className="pc-skel pc-skel-wide" />
              </div>
            )}
          </div>
        </div>

        <p className="jyotish-note">
          <i className="fa-solid fa-circle-info"></i>
          {' '}Shown for New Delhi. In the app it follows your location — sunrise, and with it
          the tithi and every muhurat, moves with where you are. Festival dates can vary by
          region and tradition.
        </p>
      </div>
    </section>
  )
}
