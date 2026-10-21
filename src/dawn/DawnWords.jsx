import { useRef, useState } from 'react'
import { useScrollProgress } from './useScrollProgress'

const LINE = 'Read the chalisa. Hear the shloka. Count the mala. Know the hour. Keep the fast. Find the temple. Ask anything.'
const WORDS = LINE.split(' ')

/** A pinned line that lights word by word as you scroll. The full sentence is in the DOM for screen readers. */
export default function DawnWords() {
  const ref = useRef(null)
  const [lit, setLit] = useState(0)
  useScrollProgress(ref, (p, reduced) => setLit(reduced ? WORDS.length : Math.floor(p * (WORDS.length + 2))))

  return (
    <section ref={ref} className="dn-words" data-tone="dark" aria-label={LINE}>
      <div className="dn-words-pin">
        <p className="dn-words-line" aria-hidden="true">
          {WORDS.map((w, i) => (
            <span key={i} className={i < lit ? (w.endsWith('.') ? 'is-lit is-end' : 'is-lit') : undefined}>{w} </span>
          ))}
        </p>
      </div>
    </section>
  )
}
