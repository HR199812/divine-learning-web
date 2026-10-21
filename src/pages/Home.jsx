import '../styles/dawn.css'
import DawnNav from '../dawn/DawnNav'
import DawnHero from '../dawn/DawnHero'
import DawnWords from '../dawn/DawnWords'
import DawnReel from '../dawn/DawnReel'
import DawnSun from '../dawn/DawnSun'
import DawnBento from '../dawn/DawnBento'
import DawnClose from '../dawn/DawnClose'
import PanchangSection from '../components/PanchangSection'

/**
 * The homepage is one morning: it opens at night, the sun rises over the app's story,
 * and it closes back in the dark. Each section reads its own scroll progress — see
 * src/dawn/useScrollProgress.js. `data-tone` on a section tells the floating nav
 * whether it is over night or day.
 *
 * The live Panchang calendar (computed in the browser, as the app does on the phone)
 * follows the sun-arc moment, where its claim is made.
 */
export default function Home() {
  return (
    <main className="dawn">
      <DawnNav />
      <DawnHero />
      <DawnWords />
      <div className="dn-dawnband" aria-hidden="true" />
      <DawnReel />
      <DawnSun />
      <div className="dn-live" data-tone="light">
        <PanchangSection />
      </div>
      <DawnBento />
      <DawnClose />
    </main>
  )
}
