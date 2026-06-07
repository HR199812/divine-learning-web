# Divine Learning — Web

Landing page and legal docs for the **Divine Learning** app, hosted on GitHub Pages.

**Live site:** [hr199812.github.io/divine-learning-web](https://hr199812.github.io/divine-learning-web/)

---

## Pages

| Page | URL | Purpose |
|------|-----|---------|
| Landing | `/` | App marketing page |
| Privacy Policy | `/privacy-policy.html` | App Store required |
| Terms & Conditions | `/terms.html` | App Store required |
| Support / FAQ | `/support.html` | App Store required |

## Tech Stack

- Pure HTML / CSS / JS — no build step, no framework
- [Three.js](https://threejs.org/) `r155` — animated sacred mandala particle system in hero
- [Anime.js](https://animejs.com/) `3.2.2` — scroll-triggered reveals and stat counter animations
- [Font Awesome 6](https://fontawesome.com/) — all icons
- [Google Fonts](https://fonts.google.com/) — Playfair Display + Inter
- All libraries loaded via CDN — zero npm dependencies

## File Structure

```
docs/
  index.html            — Main landing page
  privacy-policy.html   — Privacy Policy
  terms.html            — Terms & Conditions
  support.html          — Support & FAQ
  icon.png              — App icon (favicon + navbar logo)
  images/
    IMG_39xx.PNG        — App screenshots (iPhone)
  CLAUDE.md             — AI assistant context for this project
  README.md             — This file
```

## Deployment

Hosted on **GitHub Pages** from the `main` branch root. No build step needed.

To deploy changes:

```bash
git add .
git commit -m "your message"
git push
```

Live in ~1–2 minutes after push.

## App Store URLs

| Field | URL |
|-------|-----|
| Privacy Policy | `https://hr199812.github.io/divine-learning-web/privacy-policy.html` |
| Support URL | `https://hr199812.github.io/divine-learning-web/support.html` |
| Marketing URL | `https://hr199812.github.io/divine-learning-web/` |

## Connected Repos

| Repo | Description |
|------|-------------|
| `divine-learning` | React Native / Expo mobile app (private) |
| `backend` | NestJS API (private) |

## Contact

**Email:** admin@canvadb.com
