> **This file is out of date above this line.** It describes a pure-HTML site on
> GitHub Pages with no build step. The repo is now a **Vite + React SPA deployed on
> Vercel** (`react-router-dom`, `src/pages/*.jsx`, `npm run build` → `dist/`). The
> design-system values below are still accurate; the stack and file-structure
> sections are not. The Deep links section at the foot was written against the
> current setup.

# Aradhana Kit — Web (GitHub Pages)

## Project Overview
Static landing page + legal docs for the **Aradhana Kit** app, hosted on GitHub Pages at `https://hr199812.github.io/divine-learning-web/`. Built as a portfolio project and App Store submission requirement.

## Tech Stack
- **Pure HTML/CSS/JS** — no build step, no framework, no bundler
- **Three.js** (`r155`) — animated sacred mandala particle system in hero section
- **Anime.js** (`3.2.2`) — scroll-triggered reveals, hero entrance, stat counter animations
- **Font Awesome 6** — all icons (no emojis)
- **Google Fonts** — Playfair Display (headings) + Inter (body)
- All libraries loaded via CDN — zero npm dependencies

## File Structure
```
docs/
  index.html          — Main landing page
  privacy-policy.html — App Store required: Privacy Policy
  terms.html          — App Store required: Terms & Conditions
  support.html        — App Store required: Support / FAQ page
  icon.png            — App icon (used as favicon + navbar logo)
  images/
    IMG_39xx.PNG      — 16 real app screenshots (iPhone)
```

## Design System
```
--saffron: #FF6B00      primary accent (all interactive elements)
--gold:    #FFB340      secondary (Three.js rings, stat labels)
--dark:    #060200      page background
--dark-card: #0E0400   bento card backgrounds
--border:  rgba(255,107,0,0.10)  default border
--text:    #FFF0E0      primary text
--muted:   rgba(255,240,224,0.50) secondary text
```
- **Playfair Display** (serif, italic) for all headings — creates warm editorial feel
- **Inter** for all body text
- Dark theme throughout — no light mode toggle on website

## Page Sections (index.html)

### Nav
Floating pill navbar (fixed, centered, glassmorphic). Contains app icon + name, 4 nav links, download CTA.

### Hero
- Full-screen with `<canvas id="hero-canvas">` behind content
- **Three.js mandala**: 7 concentric rings of `THREE.Points` in saffron/gold, counter-rotating at different speeds. Inner rings faster, outer slower. Mouse parallax via `camera.position` lerp.
- Hero text animates in via `anime.timeline()` on load

### Stats Strip
4 animated counters (195+ temples, 10 languages, 500+ texts, 100% free). Uses `IntersectionObserver` + `anime()` to count from 0 on scroll-in.

### Screenshot Gallery
Single-row infinite marquee of 12 phone mockups. Each phone is a CSS frame with dynamic island pill. Speed: 50s per cycle. Pauses on hover.

Key CSS:
```css
.phone-frame { width: 176px; border-radius: 40px; border: 1.5px solid rgba(255,107,0,0.15); }
.phone-island { width: 58px; height: 18px; background: #060100; border-radius: 12px; }
```

### Features Bento
3-column CSS Grid with varying `grid-column: span 2` for wide items (Mala, AI Guide, Festivals). Dark cards with saffron border glow on hover. Decorative muted numbers inside wide cards.

Bento items animate in with staggered `anime()` via `IntersectionObserver`.

### Temple Marquee
Two CSS marquee rows (`marquee-left` / `marquee-right` keyframes) scrolling in opposite directions. Temple name pills.

### Languages
Left: language list with native script labels. Right: 9 native scripts (हिंदी, বাংলা, etc.) positioned absolutely at different sizes/opacities. Each floats via CSS `@keyframes langFloat` with individual `--dur`, `--delay`, `--lift` CSS variables — no JS animation (avoids jank).

### Tools Bento
3-col grid of icon+text tool cards (streak, reminders, mood Gita, pooja guide, guest mode, theme).

### Download CTA
Dark gradient section with Om watermark and saffron radial glow. App Store + Google Play store buttons.

### Footer
Links to all legal pages + contact email.

---

## Legal Pages

### privacy-policy.html
Covers: OTP auth, chanting history, location (Panchang only, not stored), Kundli data (sent to VedAstro, not stored), AI chat, Expo push tokens, MongoDB Atlas, children's privacy (13+), data deletion rights.

### terms.html
Covers: service description, guest mode, prohibited conduct, spiritual content disclaimer, AI disclaimer (mirrors in-app warning), IP rights, warranty disclaimer, liability limitation (₹0 — free app), governing law (India).

### support.html
Expandable `<details>` FAQ covering: account/login, Mala Jaap, Panchang/Kundli, Temple Map, AI Guide, general. Three contact cards (email, in-app feedback, response time).

---

## App Store URLs
| Field | URL |
|-------|-----|
| Privacy Policy | `https://hr199812.github.io/divine-learning-web/privacy-policy.html` |
| Support URL | `https://hr199812.github.io/divine-learning-web/support.html` |
| Marketing URL | `https://hr199812.github.io/divine-learning-web/` |

## Deployment
Hosted on **GitHub Pages** — `main` branch root. No build step needed.

To update and deploy:
```bash
cd "/Users/hritwikagarwal/Documents/Code and FSD/hindu-worship/docs"
git add .
git commit -m "your message"
git push
```
Changes go live in ~1–2 minutes after push.

## Connected Projects
- **App** (`../divine-learning/`) — React Native / Expo app this site promotes
- **Backend** (`../backend/`) — NestJS API serving the app
- **App bundle ID**: `com.justanothersupremesoul.divinelearning`
- **GitHub**: `https://github.com/HR199812/divine-learning-web`


---

# Deep links & share pages

Shares sent from the app point at `https://aradhana-kit.vercel.app/s/<collection>/<id>`.
Three pieces make that work, and they fail independently.

## 1. `/s/*` is a serverless function, not a React route — and has to be

This site is an SPA: the HTML Vercel serves is an empty `<div id="root">` that React
fills **in the browser**. Crawlers do not run JavaScript. WhatsApp, iMessage, Telegram
and Slack fetch the URL, read the bytes that come back, and build their card from the
Open Graph tags in them — so a `<Route path="/s/...">` setting tags from `useEffect`
yields no preview at all. That is precisely the "the share URL doesn't show the app
preview" complaint.

`api/share.js` renders the tags server-side. `vercel.json` rewrites `/s/:collection/:id`
to it **before** the SPA catch-all, and the catch-all now excludes `api/`, `s/` and
`.well-known/` — it previously swallowed every path, including the association files.

- **It never 404s.** An unknown id still returns a 200 with a real page: a crawler that
  gets a 404 renders nothing, and the index is a build-time snapshot, so a text added
  since the last deploy legitimately lands there.
- **It does not bounce to `divinelearning://` on load.** Universal links already handle
  the installed case *before* this page is reached, so a redirect could only fire for
  someone **without** the app — where iOS shows "Cannot open page" and desktop breaks
  outright. There is a button instead.
- `og:image` is absolute. A relative path renders as a card with a blank thumbnail
  everywhere.

## 2. Titles are bundled, not fetched

`api/_share-index.json` (487 KB, 3,275 documents) is generated from the app's content
snapshot by `npm run build:share-index`, and the app repo must be checked out beside this
one (or `APP_DIR` set).

It is bundled rather than fetched **because the consumer is a crawler**: it waits a very
short time and renders whatever arrived. The backend sleeps on Render's free tier and
takes 30s+ to answer a cold request, by which point the preview is already lost. A
preview must not depend on another service being awake at the moment someone pastes a
link. Re-run the generator after any content re-export.

## 3. The two association files — currently placeholders

`public/.well-known/apple-app-site-association` and `assetlinks.json` are what make a
tapped link open the **app** instead of the browser. Both still contain
`REPLACE_WITH_…`; `npm run check:links` reports what is outstanding and where to find
each value, and runs on every `npm run build`.

It is **advisory, not fatal**, on purpose — the site and the share pages work without
them, they simply open in a browser. Set `STRICT_APP_LINKS=1` to make it fail a build.

**A placeholder is worse than an absent file.** iOS fetches the AASA at install time and
*caches the result*, so shipping one teaches every device that this domain has no valid
association, and the correction only lands when the OS next refreshes. Fill both in
before relying on app-opening behaviour.

Serve requirements, all handled in `vercel.json`: `application/json`, no redirect (iOS
follows none), no extension on the Apple file.

## Order of operations

1. **Deploy this repo** — `/s/...` pages go live and previews start working.
2. **Flip `CONTENT_PAGES_LIVE` to `true`** in the app's `utils/share-links.ts`. Until
   then shares carry the store link, because pointing them at pages that 404 is worse
   than not deep-linking at all.
3. **Fill the two placeholders**, redeploy, and rebuild the app (`associatedDomains` /
   `intentFilters` are native config — an OTA update will not move them). Links now open
   the app when it is installed.

Verify Android with
`adb shell pm get-app-links com.justanothersupremesoul.divinelearning` — `verified` is
the state you want.
