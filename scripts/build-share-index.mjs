/**
 * Builds `api/_share-index.json` — the id → title map the share pages need.
 * ───────────────────────────────────────────────────────────────────────────────
 * Run from this repo with the app checked out beside it:
 *     node scripts/build-share-index.mjs
 *
 * ─── WHY A BUNDLED INDEX AND NOT AN API CALL ───
 * The share page's whole job is to answer a *crawler* — WhatsApp, iMessage,
 * Telegram — which fetches the URL once, waits a very short time, and renders
 * whatever Open Graph tags came back. A cold backend (Render free tier sleeps)
 * takes 30s+ to answer its first request, by which time the crawler has given up
 * and the share has no preview at all. The preview must not depend on another
 * service being awake at the exact moment someone pastes a link.
 *
 * Titles are also the only field the page needs, and they are ~487 KB for all
 * 3,275 documents — small enough to sit inside the serverless bundle, where the
 * lookup is a property access rather than a network round trip.
 *
 * Re-run this whenever the app's content snapshot is re-exported.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));

// The app repo sits beside this one; override with APP_DIR if it does not.
const APP = process.env.APP_DIR
  ?? resolve(HERE, '../../divine-knowledge-react-native');
const SNAPSHOT = join(APP, 'assets/content');

const COLLECTIONS = ['aartis', 'chalisas', 'bhajans', 'mantras', 'kathas'];

const index = {};
let total = 0;

for (const c of COLLECTIONS) {
  const docs = JSON.parse(readFileSync(join(SNAPSHOT, `${c}.cjson`), 'utf8'));
  index[c] = Object.fromEntries(
    docs.map((d) => [d._id, [d.titleHindi ?? '', d.titleEnglish ?? '']]),
  );
  total += docs.length;
  console.log(`  ${c.padEnd(9)} ${docs.length}`);
}

const out = join(HERE, '../api/_share-index.json');
writeFileSync(out, JSON.stringify(index));
const kb = (readFileSync(out).length / 1024).toFixed(0);
console.log(`\n${total} documents → api/_share-index.json (${kb} KB)`);
