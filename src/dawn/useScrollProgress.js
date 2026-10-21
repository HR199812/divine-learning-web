import { useEffect, useRef } from 'react'

/**
 * Calls `onFrame(progress, reduced)` as a section scrolls, at most once per frame.
 *
 * - `mode: 'pin'` — a tall section whose first child is `position: sticky`. Progress
 *   runs 0 → 1 while the sticky child is held, i.e. over (section height − sticky height).
 * - `mode: 'enter'` — progress runs 0 → 1 as the section's top rises through the
 *   bottom 80% of the window.
 *
 * Continuous effects should write CSS variables from `onFrame` (no React render per
 * frame); discrete ones (which word, which chapter) can setState — React bails out
 * when the value is unchanged.
 *
 * `reduced` is true when the visitor asked for reduced motion; components then show
 * their finished state instead of animating towards it.
 */
export function useScrollProgress(ref, onFrame, { mode = 'pin' } = {}) {
  const cb = useRef(onFrame)
  useEffect(() => { cb.current = onFrame })

  useEffect(() => {
    const motion = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    let raf = 0
    const run = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      let p
      if (mode === 'pin') {
        const sticky = el.firstElementChild
        const held = Math.max(1, r.height - (sticky ? sticky.offsetHeight : vh))
        p = -r.top / held
      } else {
        p = (vh - r.top) / (vh * 0.8)
      }
      cb.current(Math.min(1, Math.max(0, p)), !!motion?.matches)
    }
    const schedule = () => { if (!raf) raf = requestAnimationFrame(run) }
    run()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    motion?.addEventListener?.('change', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      motion?.removeEventListener?.('change', schedule)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [ref, mode])
}

export const easeOut = (t) => 1 - Math.pow(1 - t, 3)
