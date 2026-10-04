/**
 * Fails loudly while the two association files still carry placeholders.
 * ───────────────────────────────────────────────────────────────────────────────
 * A placeholder here is worse than an absent file. iOS fetches
 * `apple-app-site-association` at install time and **caches the result**, so a
 * deploy carrying `REPLACE_WITH_…` teaches every device that this domain has no
 * valid app association — and the fix does not take effect until the OS next
 * refreshes it, which is not something you can trigger from a phone. Android
 * re-verifies more readily but reports only `legacy_failure`, which says nothing
 * about why.
 *
 * Run with `npm run check:links`. It is advisory on `npm run build` rather than
 * fatal: the marketing site should still deploy while these are outstanding —
 * the share pages work without them, they simply open in a browser instead of
 * the app.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const WELL_KNOWN = join(dirname(fileURLToPath(import.meta.url)), '../public/.well-known');

const CHECKS = [
  {
    file: 'apple-app-site-association',
    placeholder: 'REPLACE_WITH_APPLE_TEAM_ID',
    fix: 'Apple Developer → Membership → Team ID (or `eas credentials`, iOS).\n' +
         '     Replace the prefix so it reads TEAMID.com.justanothersupremesoul.divinelearning',
  },
  {
    file: 'assetlinks.json',
    placeholder: 'REPLACE_WITH_PLAY_APP_SIGNING_SHA256',
    fix: 'Play Console → Release → Setup → App signing → App signing key certificate.\n' +
         '     Use the SHA-256 of the key that signs the SHIPPED build, not your local debug key.',
  },
];

let outstanding = 0;

for (const { file, placeholder, fix } of CHECKS) {
  const raw = readFileSync(join(WELL_KNOWN, file), 'utf8');
  JSON.parse(raw); // malformed JSON is silently ignored by both platforms
  if (raw.includes(placeholder)) {
    outstanding++;
    console.error(`\n  ✗ ${file} still has ${placeholder}`);
    console.error(`     ${fix}`);
  } else {
    console.log(`  ✓ ${file}`);
  }
}

if (outstanding) {
  console.error(
    `\n  ${outstanding} placeholder(s) outstanding — shared links will open in a browser,\n` +
    `  not in the app. Everything else works. See CLAUDE.md › Deep links.\n`,
  );
  process.exit(process.env.STRICT_APP_LINKS ? 1 : 0);
} else {
  console.log('\n  Both association files are filled in.\n');
}
