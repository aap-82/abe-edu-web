#!/usr/bin/env node
/**
 * Reports indexable pages in dist/ that ship without a social share card.
 *
 * WARNS, NEVER FAILS, and that is the design. `BaseLayout` only emits `og:image` when the card file
 * exists, so a missing card degrades to the behaviour every page had before 16 Aug 2026 - a text
 * card - rather than shipping a 404 image. Nothing is broken by the gap, so nothing needs blocking;
 * what is needed is for the gap to be VISIBLE, because the failure mode of a generated asset is
 * that a page is added months later and nobody remembers the generator exists.
 *
 * The inverse is reported too: a card whose page is gone or has been noindexed is dead weight in
 * public/ and in the deploy, and it is the half nobody goes looking for.
 *
 * Run by hand or after a build. To close the gap:
 *   npm run build && node scripts/generate-og-cards.mjs
 */
import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const CARDS = join('public', 'og');

if (!existsSync(DIST)) {
  console.log('check-og-cards: no dist/ - run `npm run build` first. Skipping.');
  process.exit(0);
}

const entries = await readdir(DIST, { withFileTypes: true });
const slugs = entries
  .filter((d) => d.isDirectory() && existsSync(join(DIST, d.name, 'index.html')))
  .map((d) => d.name)
  .sort();

const indexable = [];
for (const slug of slugs) {
  const html = await readFile(join(DIST, slug, 'index.html'), 'utf8');
  const robots = html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i)?.[1] ?? '';
  if (!/noindex/i.test(robots)) indexable.push(slug);
}

const missing = indexable.filter((s) => !existsSync(join(CARDS, `${s}.png`)));
const have = existsSync(CARDS)
  ? (await readdir(CARDS)).filter((f) => f.endsWith('.png')).map((f) => f.replace(/\.png$/, ''))
  : [];
const orphan = have.filter((s) => !indexable.includes(s));

console.log('\n=== Social share cards ===\n');

for (const s of missing) {
  console.log(`  WARN  /${s} is indexable but has no card at public/og/${s}.png — it ships a text-only share. Run: node scripts/generate-og-cards.mjs`);
}
for (const s of orphan) {
  console.log(`  WARN  public/og/${s}.png has no indexable page — the page was removed or noindexed. Delete the card.`);
}

const ok = indexable.length - missing.length;
if (!missing.length && !orphan.length) {
  console.log(`  OK    ${ok}/${indexable.length} indexable page(s) carry a 1200x630 share card`);
} else {
  console.log(`\n  ${ok}/${indexable.length} indexable page(s) carry a card`);
}

console.log(`\n  0 failing, ${missing.length + orphan.length} warning\n`);
process.exit(0);
