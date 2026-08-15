#!/usr/bin/env node
// Asserts that every internal redirect TARGET in redirects.csv resolves to a real page
// in dist/. Run after `astro build`.
//
// Why this exists as a separate check from the redirect map itself: the cutover gate in
// the runbook (R7) verifies every LEGACY URL redirects in a single hop to its mapped
// target. It says nothing about whether that target exists. A rule can pass R7 and still
// land the user on a 404 - the two are different assertions over different columns of the
// same CSV, and both have to hold. This is the second one.
//
// The map was finalised in W1-6 ahead of most of the pages it points at, which is correct
// sequencing (the map had to be signed off before content could be built against it) but
// means a plain "every target must exist" gate would fail today. So targets are allowed to
// be pending, explicitly and individually, and the list is self-cleaning:
//
//   missing + not pending  -> FAIL. A genuinely broken rule, or a typo in the CSV.
//   missing + pending      -> ok. Known unbuilt page; the pass that builds it is named.
//   exists  + still pending -> FAIL. The page landed; delete its line below.
//
// That last case is what stops this file rotting into a permanent allowlist that silently
// excuses everything. When PENDING is empty, delete the mechanism and make the gate
// absolute - that is the cutover state.
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const CSV_PATH = join(ROOT, 'redirects.csv');
const DIST = join(ROOT, 'dist');

// Every entry must name the pass that builds it, so this reads as a work list rather than
// a list of exceptions. Sourced from the migration plan's remaining passes.
const PENDING = new Map([
  // /white-card-wa removed 28 Jul 2026: the W3-1 build landed on main and the page now resolves,
  // so the self-cleaning "exists + still pending -> FAIL" rule fired on the merge, exactly as
  // intended. This is the mechanism working, not an exception being made.
  // /white-card-tas removed 28 Jul 2026: commit 8a53973 published the page and dropped its noindex,
  // so `resolves()` now returns true and the "exists + still pending -> FAIL" rule fired. That is
  // the self-cleaning mechanism doing its job, and the 301 from /tas-online-white-card can now
  // carry equity into a page that is actually indexable, which is the whole point of the gate.
  ['/cpd-building-nsw', 'B3 - CPD building NSW'],
  ['/cpd-plumbing-tas', 'B3 - CPD plumbing TAS'],
  ['/cpd-electrical-tas', 'B3 - CPD electrical TAS'],
  ['/cpd-real-estate-wa', 'B3 - CPD real estate WA'],
  ['/cpd-nsw', 'B3 - CPD NSW state hub'],
  // /cpd-bundles-tas was REMOVED from this list on 28 Jul 2026, not built. It had been dropped
  // from the IA (the bundle IS the product at /cpd-{category}-{state}; there is no TAS bundle
  // hub - see references/archetypes/04-cpd-bundle.md and new site/abe-new-site-sitemap.md), so
  // it could never resolve and PENDING could never empty, which would have left the "when PENDING
  // is empty, make the gate absolute" cutover state permanently unreachable. The two legacy URLs
  // that pointed at it (/special-tas-electrician-cpd-bundle, /special-tas-plumber-cpd-bundle) now
  // 301 to /cpd-electrical-tas and /cpd-plumbing-tas, both already pending above.
  // /cpd-building-tas REMOVED from this list 16 Aug 2026, and its three gates are worth recording
  // because the entry outlived two of them. (1) The buyUrl path was corrected 24 Jul 2026 - the
  // product id was always current, only the path was wrong. (2) Stage 7 was re-verified; the page
  // comment went on naming it as the live gate for weeks after it cleared, and a build session
  // acted on that stale instruction on 16 Aug (kb/mistakes-log.md row 1, 5th sighting). (3) The
  // standing external blocker the buyUrl inherits - whether /payment survives on the apex at
  // cutover - was CONFIRMED RESOLVED by Andrey on 16 Aug 2026: the LearnWorlds `learn.` subdomain
  // ticket is settled and the payment path is not a blocker. All three closed, so the entry and
  // the page's noindex flag were removed together, in the same change, as this comment required.
  // Added 1 Aug 2026, and it records an open decision rather than a build step.
  //
  // The page was ALWAYS a noindex-worthy dead end for equity; it just did not say so. Until this
  // date it rendered `index,follow` while CLAUDE.md and ROADMAP both stated it was noindexed, so
  // `resolves()` returned true and this gate stayed quiet. Setting the noindex flag made the gate
  // tell the truth: /nsw-owner-builder-course (151 clicks, 12,988 impressions, position 16.53)
  // 301s here, and a 301 into a noindexed page discards that ranking rather than moving it.
  //
  // So this entry is NOT "a page we are about to build". NSW Owner Builder is on hold: the Upskill
  // partnership is unsigned and the five required units are not on RTO 45708's scope, so there is
  // no product behind either URL. The real question is what those two URLs should DO at cutover,
  // and it is a commercial call, not a build step - retire both into a live hub, hold one as the
  // pre-launch info page ROADMAP describes, or 301 both somewhere that converts. Filed as a [build]
  // demand item on the white-card-nsw Stage-9 review with the equity figures.
  //
  // Remove this line when that decision lands. Do NOT remove it by dropping the noindex flag: that
  // would restore a page carrying a nationally-recognised claim ABE Education cannot support to the
  // index, linked twice from every page, which is the risk the flag was added to close.
  ['/owner-builder-nsw-course', 'ON HOLD, noindexed; the cutover fate of both NSW OB URLs is an open commercial decision'],
  ['/about', 'B4 - about page'],
  ['/guides', 'B5 - content hub index'],
]);

function parseCsvLine(line) {
  const fields = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; }
      else if (ch === '"') { inQuotes = false; }
      else { cur += ch; }
    } else if (ch === '"') { inQuotes = true; }
    else if (ch === ',') { fields.push(cur); cur = ''; }
    else { cur += ch; }
  }
  fields.push(cur);
  return fields;
}

if (!existsSync(DIST)) {
  console.error('dist/ not found. Run `npm run build` before this check.');
  process.exit(1);
}

const lines = readFileSync(CSV_PATH, 'utf8').split('\n').filter((l) => l.trim());
const [header, ...rows] = lines.map(parseCsvLine);
const col = (row, name) => row[header.indexOf(name)];

// `rebuild` rows emit no rule at all (drop-trailing-slash serves them 200), and
// `redirect-to-learnworlds` rows point off-host at a platform we do not build. Neither is
// this gate's business - it only covers targets we are responsible for rendering.
const targets = new Map();
for (const row of rows) {
  const action = col(row, 'action');
  if (action !== 'redirect' && action !== 'retire') continue;
  const target = col(row, 'target');
  if (!target?.startsWith('/')) continue;
  if (!targets.has(target)) targets.set(target, []);
  targets.get(target).push(col(row, 'legacy_path'));
}

// Astro builds with format:'directory', so `/foo` is `dist/foo/index.html`. The `.html`
// form is checked too so this does not silently break if that config ever changes.
const pageFile = (p) => {
  const dir = join(DIST, p, 'index.html');
  if (existsSync(dir)) return dir;
  const flat = join(DIST, `${p}.html`);
  return existsSync(flat) ? flat : null;
};

/**
 * A noindex page is NOT a resolved redirect target.
 *
 * Existing on disk is not the same as being a valid destination for equity: redirecting a
 * ranking URL into a noindexed page discards the ranking rather than moving it. Stub pages get
 * built during a wave long before they are written, so without this a stub would clear its own
 * PENDING entry and the redirect would look done while quietly pointing at a dead end.
 */
const resolves = (p) => {
  const f = pageFile(p);
  if (!f) return false;
  return !/<meta[^>]+name=["']robots["'][^>]*noindex/i.test(readFileSync(f, 'utf8'));
};

const fails = [];
const stale = [];
let pendingCount = 0;

for (const [target, sources] of [...targets].sort()) {
  const exists = target === '/' ? existsSync(join(DIST, 'index.html')) : resolves(target);
  const pending = PENDING.get(target);

  if (exists && pending) {
    stale.push(`  ${target} - built, but still listed as pending (${pending}). Remove it from PENDING in ${'scripts/check-redirect-targets.mjs'}.`);
  } else if (!exists && !pending) {
    const from = sources.length > 2 ? `${sources.slice(0, 2).join(', ')} +${sources.length - 2} more` : sources.join(', ');
    fails.push(`  ${target} - no page in dist/, and not listed as pending. ${sources.length} rule(s) redirect here (${from}).`);
  } else if (!exists) {
    pendingCount++;
  }
}

for (const line of stale) console.error(line);
for (const line of fails) console.error(line);

if (stale.length || fails.length) {
  console.error(`\nRedirect targets: ${fails.length} broken, ${stale.length} stale pending entr(y/ies).`);
  process.exit(1);
}

console.log(
  `Redirect targets: ${targets.size} distinct, ${targets.size - pendingCount} resolving, ${pendingCount} pending (see PENDING in scripts/check-redirect-targets.mjs).`
);
