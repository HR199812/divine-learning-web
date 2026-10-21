import { useRef, useState } from 'react'
import { useScrollProgress } from './useScrollProgress'

const CHAPTERS = [
  { name: 'Recite', title: 'Every text, ready.', screen: '/images/chalisa-reader.png', alt: 'A chalisa open in the reader',
    body: 'Over 3,300 chalisas, aartis, bhajans, mantras and kathas in clear Devanagari, stored on your phone.',
    steps: ['Open the Library.', 'Bookmark your daily texts — they rise to the top.', 'Turn sideways for larger type.'] },
  { name: 'Listen', title: 'The shloka recites itself.', screen: '/images/recitation.png', alt: 'A Gita verse being recited',
    body: 'A new Gita verse each day, read aloud with its meaning — each word lights as it is spoken.',
    steps: ['Tap play on today’s verse.', 'Follow the lit word.', 'Stop, resume, or replay.'] },
  { name: 'Count', title: '108 beads, one tap.', screen: '/images/mala.png', alt: 'The mala counter',
    body: 'A mala that keeps count while your mind stays on the name. Streaks and a Sankalpa keep you steady.',
    steps: ['Choose your mantra.', 'Tap or pull the bead.', 'Finish a mala; your week fills.'] },
  { name: 'Know the day', title: 'What is auspicious, now.', screen: '/images/sun-muhurat.png', alt: 'The Sun and Muhurat screen',
    body: 'Sunrise, Rahu Kaal and every muhurat for where you are, with what is happening right now.',
    steps: ['Allow location once.', 'Glance at Home.', 'Open Sun & Muhurat.'] },
  { name: 'Celebrate', title: 'Every vrat, remembered.', screen: '/images/festivals.png', alt: 'Festivals and vrats for the month',
    body: 'Festivals, Ekadashis and vrats in one calendar — and a reminder the evening before.',
    steps: ['Open Festivals & Vrats.', 'Filter what you keep.', 'Turn on alerts.'] },
  { name: 'Visit', title: 'Every sacred door.', screen: '/images/temple-map.png', alt: 'The temple map',
    body: 'Jyotirlingas, Char Dham, Shakti Peethas — each with its story and the way there.',
    steps: ['Open the Temple Map.', 'Filter by region.', 'Tap for directions.'] },
  { name: 'Ask', title: 'A guide in your language.', screen: '/images/ai-guide.png', alt: 'The AI spiritual guide',
    body: 'Ask what a mantra means or how to begin a pooja. Conversations stay on your phone.',
    steps: ['Open Ask.', 'Type or speak.', 'Listen to the answer.'] },
]
const N = CHAPTERS.length

/**
 * One pinned phone; the screens slide through it like a reel. A single index drives
 * the phone, the chapter list and the copy, so the three can never disagree.
 */
export default function DawnReel() {
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  useScrollProgress(ref, (p) => {
    setActive(Math.min(N - 1, Math.floor(p * N)))
    ref.current.style.setProperty('--p', p.toFixed(4))
  })

  // Jump to the middle of a chapter's stretch of scroll.
  const go = (i) => {
    const el = ref.current
    const sticky = el.firstElementChild
    const held = el.offsetHeight - sticky.offsetHeight
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + held * ((i + 0.5) / N), behavior: 'smooth' })
  }

  return (
    <section id="story" ref={ref} className="dn-reel" data-tone="light" style={{ '--n': N }}>
      <div className="dn-reel-pin">
        <ol className="dn-reel-index" aria-label="Chapters">
          {CHAPTERS.map((c, i) => (
            <li key={c.name}>
              <button type="button" className={i === active ? 'is-on' : undefined} aria-current={i === active ? 'step' : undefined} onClick={() => go(i)}>
                <span className="dn-reel-num">{String(i + 1).padStart(2, '0')}</span>{c.name}
              </button>
            </li>
          ))}
        </ol>

        <div className="dn-reel-device">
          <div className="dn-phone dn-phone--day">
            <div className="dn-reel-window">
              <div className="dn-reel-strip" style={{ '--i': active }}>
                {CHAPTERS.map((c, i) => (
                  <img key={c.name} src={c.screen} alt={i === active ? c.alt : ''} width="440" height="952" loading={i < 2 ? 'eager' : 'lazy'} />
                ))}
              </div>
            </div>
          </div>
          <div className="dn-reel-progress" aria-hidden="true"><span /></div>
        </div>

        <div className="dn-reel-copy" aria-live="polite">
          {CHAPTERS.map((c, i) => (
            <div key={c.name} className={`dn-reel-chapter ${i === active ? 'is-on' : i < active ? 'is-past' : 'is-next'}`} aria-hidden={i !== active}>
              <p className="dn-reel-kicker">{String(i + 1).padStart(2, '0')} · {c.name}</p>
              <h2>{c.title}</h2>
              <p className="dn-reel-body">{c.body}</p>
              <ol className="dn-reel-steps">
                {c.steps.map((s, k) => <li key={k}><span>{k + 1}</span>{s}</li>)}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
