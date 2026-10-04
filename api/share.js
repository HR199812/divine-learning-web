import { createRequire } from 'node:module';

/**
 * `createRequire` rather than `import … with { type: 'json' }`.
 *
 * Both work on modern Node, but Vercel's bundler traces a `require()` of a JSON
 * file unconditionally, whereas import-attribute support depends on the runtime
 * version configured for the function. If the index fails to bundle the failure
 * is a 500 on every share link, so this picks the spelling with no version
 * question attached.
 */
const require = createRequire(import.meta.url);
const INDEX = require('./_share-index.json');

/**
 * `/s/<collection>/<id>` — the destination of every share the app sends.
 * ───────────────────────────────────────────────────────────────────────────────
 *
 * ─── WHY THIS IS A SERVERLESS FUNCTION AND NOT A REACT ROUTE ───
 * This site is a Vite SPA: the HTML Vercel serves is an empty `<div id="root">`
 * and React fills it in the browser. **Crawlers do not run JavaScript.** WhatsApp,
 * iMessage, Telegram and Slack fetch the URL, read the markup that came back, and
 * render a card from its Open Graph tags — so a `<Route path="/s/...">` that sets
 * tags with `useEffect` produces exactly the preview the app has now: none. The
 * tags have to be in the bytes of the first response, which means rendering them
 * on the server.
 *
 * ─── THIS PAGE IS THE *FALLBACK*, NOT THE HAPPY PATH ───
 * When the app is installed, iOS and Android hand the URL straight to it and this
 * page is never drawn — that is what `/.well-known/apple-app-site-association` and
 * `/.well-known/assetlinks.json` buy. So everyone who actually sees this screen
 * does **not** have the app. It is written for them: say what was shared, then
 * offer the stores.
 *
 * ─── IT DOES NOT AUTO-REDIRECT INTO THE APP SCHEME ───
 * The usual trick — bouncing to `divinelearning://…` on load — is deliberately
 * absent. Universal links already cover the installed case before this page
 * exists, so a redirect here can only fire for someone *without* the app, where
 * iOS shows a "Cannot open page" dialog and Android does nothing. It also breaks
 * desktop entirely. There is a button instead, which the few people who need it
 * can press.
 */

const SITE = 'https://aradhana-kit.vercel.app';
const IOS_STORE = 'https://apps.apple.com/in/app/aradhana-kit/id6781756782';
const PLAY_STORE =
  'https://play.google.com/store/apps/details?id=com.justanothersupremesoul.divinelearning';

/** Must match `utils/share-links.ts` in the app. */
const COLLECTIONS = {
  aartis: 'Aarti',
  chalisas: 'Chalisa',
  bhajans: 'Bhajan',
  mantras: 'Mantra',
  kathas: 'Katha',
};

const TAGLINE =
  'Every aarti, mantra, bhajan, chalisa and sacred text — in one app.';

/**
 * Escapes for *attribute* context, which is where every interpolation below
 * lands (`content="…"`). Titles are Devanagari and carry no markup today, but a
 * title is data from a content pipeline, and an unescaped quote would break out
 * of the attribute and silently corrupt every tag after it.
 */
function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function lookup(collection, id) {
  const entry = INDEX[collection]?.[id];
  if (!entry) return null;
  const [hindi, english] = entry;
  return { hindi: hindi || english, english: english || '' };
}

function page({ title, subtitle, description, canonical, appUrl }) {
  // `og:image` must be absolute and publicly reachable — a relative path renders
  // as a card with a blank thumbnail in every client.
  const image = `${SITE}/icon.png`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(title)} — Aradhana Kit</title>
<meta name="description" content="${esc(description)}" />
<link rel="canonical" href="${esc(canonical)}" />
<link rel="icon" href="/icon.png" />

<meta property="og:type" content="article" />
<meta property="og:site_name" content="Aradhana Kit" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(description)}" />
<meta property="og:image" content="${image}" />
<meta property="og:url" content="${esc(canonical)}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(title)}" />
<meta name="twitter:description" content="${esc(description)}" />
<meta name="twitter:image" content="${image}" />

<!-- Smart App Banner: Safari offers the app at the top of the page. Costs one
     tag and covers iOS visitors who arrived before installing. -->
<meta name="apple-itunes-app" content="app-id=6781756782" />

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#060200;color:#FFF0E0;font-family:Inter,system-ui,sans-serif;
       min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
  .card{max-width:520px;width:100%;text-align:center}
  .icon{width:84px;height:84px;border-radius:20px;margin:0 auto 26px;display:block}
  .kicker{font-size:12px;letter-spacing:.18em;text-transform:uppercase;
          color:#FF6B00;font-weight:600;margin-bottom:14px}
  h1{font-family:'Playfair Display',Georgia,serif;font-size:34px;line-height:1.25;
     font-weight:700;margin-bottom:10px}
  .sub{font-size:16px;color:rgba(255,240,224,.55);margin-bottom:28px}
  .tagline{font-size:15px;line-height:1.6;color:rgba(255,240,224,.72);
           margin-bottom:34px}
  .actions{display:flex;flex-direction:column;gap:12px;align-items:center}
  a.btn{display:block;width:100%;max-width:320px;padding:15px 22px;border-radius:14px;
        text-decoration:none;font-weight:600;font-size:15px}
  .primary{background:#FF6B00;color:#140A02}
  .ghost{border:1px solid rgba(255,107,0,.32);color:#FFF0E0}
  .open{font-size:13px;color:rgba(255,240,224,.45);margin-top:22px}
  .open a{color:#FF6B00}
  @media(max-width:420px){h1{font-size:27px}}
</style>
</head>
<body>
  <main class="card">
    <img class="icon" src="/icon.png" alt="Aradhana Kit" />
    <div class="kicker">${esc(subtitle)}</div>
    <h1>${esc(title)}</h1>
    <p class="sub">Shared from Aradhana Kit</p>
    <p class="tagline">${esc(TAGLINE)}</p>
    <div class="actions">
      <a class="btn primary" href="${IOS_STORE}">Download on the App Store</a>
      <a class="btn ghost" href="${PLAY_STORE}">Get it on Google Play</a>
    </div>
    <p class="open">Already have the app? <a href="${esc(appUrl)}">Open it here</a>.</p>
  </main>
</body>
</html>`;
}

export default function handler(req, res) {
  // Vercel gives the matched path; fall back to parsing the URL so the function
  // also works when hit directly during `vercel dev`.
  const path = (req.url || '').split('?')[0];
  const parts = path.replace(/^\/+/, '').split('/').filter(Boolean);

  // ["s", collection, id]  — or  ["s", "gita"]
  const [, collection, rawId] = parts;
  const id = rawId ? decodeURIComponent(rawId) : '';

  let body;

  if (collection === 'gita') {
    body = page({
      title: 'Today’s Bhagavad Gita verse',
      subtitle: 'Bhagavad Gita',
      description: `A verse for reflection, every day. ${TAGLINE}`,
      canonical: `${SITE}/s/gita`,
      appUrl: 'divinelearning://',
    });
  } else {
    const form = COLLECTIONS[collection];
    const found = form ? lookup(collection, id) : null;

    if (!found) {
      /**
       * An unknown collection, or an id this build does not know about.
       *
       * Still a 200 with a real page, **not** a 404: a crawler that gets a 404
       * renders no card at all, and the person tapping it should land on
       * something that offers the app rather than an error. The id can be
       * legitimately unknown — the index is a build-time snapshot, so a text
       * added since the last deploy lands here.
       */
      body = page({
        title: 'Aradhana Kit',
        subtitle: form ?? 'Sacred text',
        description: TAGLINE,
        canonical: `${SITE}/s/${collection ?? ''}`,
        appUrl: collection && id ? `divinelearning://${collection}/${id}` : 'divinelearning://',
      });
    } else {
      body = page({
        title: found.hindi,
        subtitle: form,
        description: found.english
          ? `${found.english} — ${TAGLINE}`
          : TAGLINE,
        canonical: `${SITE}/s/${collection}/${encodeURIComponent(id)}`,
        appUrl: `divinelearning://${collection}/${encodeURIComponent(id)}`,
      });
    }
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  // Cached hard at the edge: the content is a build-time snapshot, so every
  // request for a given id is byte-identical until the next deploy. This is also
  // what keeps a crawler's fetch fast enough to actually render a card.
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800');
  res.status(200).send(body);
}
