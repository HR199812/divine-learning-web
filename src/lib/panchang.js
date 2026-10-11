/**
 * The panchang, computed in the visitor's browser — the same engine the app runs
 * on the phone (@ishubhamx/panchangam-js on astronomy-engine). This is a trimmed
 * port of the app's utils/panchang.ts: a month of days and the upcoming
 * festivals, nothing else the landing page needs.
 *
 * Loaded only when the section scrolls near (see PanchangSection), so the
 * engine never weighs on the first paint.
 *
 * Deep imports, never the package root: the root re-exports a module that
 * requires `fs`.
 */
import { getPanchangam } from '@ishubhamx/panchangam-js/dist/core/panchangam'
import { findSankrantisInRange } from '@ishubhamx/panchangam-js/dist/core/sankranti'
import { Observer } from 'astronomy-engine'

export const IST = 330
const MIN = 60000
const DAY = 86400000

// New Delhi. A visitor on a website has given no location, and the app's own
// fallback is Delhi; the section says so in plain words.
export const DELHI = { name: 'New Delhi', lat: 28.6139, lng: 77.209 }

const TITHI = ['Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi', 'Saptami',
  'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi']
const tithiName = (i) => (i === 14 ? 'Purnima' : i === 29 ? 'Amavasya' : TITHI[i % 15])
const NAKSHATRA = ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya',
  'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha',
  'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishtha',
  'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati']
const WEEKDAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const RANK = { major: 0, ekadashi: 1, jayanti: 2, solar: 3, vrat: 4, pradosham: 5 }

/** The app's filter chips: Major, Ekadashi, Vrat, Solar. Null = minor. */
function chipOf(name, category) {
  if (category === 'ekadashi' || /Ekadashi Parana/i.test(name)) return 'Ekadashi'
  if (category === 'solar' || /Sankranti/i.test(name)) return 'Solar'
  if (category === 'vrat' || category === 'pradosham') return 'Vrat'
  if (category === 'major' || category === 'jayanti') return 'Major'
  return null
}

const civilNoon = (y, m, d) => new Date(Date.UTC(y, m, d, 12) - IST * MIN)
const istKey = (date) => {
  const s = new Date(date.getTime() + IST * MIN)
  return `${s.getUTCFullYear()}-${String(s.getUTCMonth() + 1).padStart(2, '0')}-${String(s.getUTCDate()).padStart(2, '0')}`
}

export function fmtTime(date) {
  if (!date) return ''
  const t = ((Math.round(date.getTime() / MIN) + IST) % 1440 + 1440) % 1440
  const h = Math.floor(t / 60), m = t % 60
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`
}

/**
 * Every day of a month. Async and yielding every few days: a month is ~30
 * engine calls, and doing them in one go would stall scrolling on a phone.
 */
export async function getMonth(y, m, place = DELHI) {
  const obs = new Observer(place.lat, place.lng, 0)
  const count = new Date(y, m + 1, 0).getDate()
  const first = civilNoon(y, m, 1)
  const sankranti = new Map(
    findSankrantisInRange(new Date(first.getTime() - DAY), new Date(first.getTime() + (count + 1) * DAY))
      .map((s) => [istKey(s.exactTime), s.name]),
  )
  const days = []
  for (let d = 1; d <= count; d++) {
    const p = getPanchangam(civilNoon(y, m, d), obs, { timezoneOffset: IST, calendarType: 'amanta' })
    const key = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const singles = p.festivals.filter((f) => f.type === 'single')
    let fests = p.festivals
      // the span copy of a day already named on its own ("Saptami (Day 7)")
      .filter((f) => f.type !== 'span' || !singles.some((s) => s.category !== 'ekadashi' && s.tithi === f.tithi && s.masa === f.masa))
      .map((f) => ({ name: f.name, chip: chipOf(f.name, f.category), rank: RANK[f.category] ?? 9, fasting: !!f.isFastingDay }))
    if (sankranti.has(key) && !fests.some((f) => /Sankranti/i.test(f.name))) {
      fests.push({ name: sankranti.get(key), chip: 'Solar', rank: 3, fasting: false })
    }
    fests = fests.sort((a, b) => a.rank - b.rank)
    const phase = ((p.planetaryPositions.moon.longitude - p.planetaryPositions.sun.longitude + 360) % 360) / 360
    days.push({
      key, day: d, weekday: p.vara, weekdayName: WEEKDAY[p.vara],
      tithi: tithiName(p.tithi), paksha: p.tithi < 15 ? 'Shukla' : 'Krishna',
      tithiEnd: p.tithiEndTime, tithiEndKey: p.tithiEndTime ? istKey(p.tithiEndTime) : null,
      nakshatra: NAKSHATRA[p.nakshatra], pada: p.nakshatraPada,
      phase, sunrise: p.sunrise, sunset: p.sunset, festivals: fests,
    })
    if (d % 4 === 0) await new Promise((r) => setTimeout(r, 0))
  }
  return days
}
