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
  ['/nsw-owner-builder-course', 'A5 - NSW owner builder, first ASQA page'],
  ['/white-card-wa', 'B2 - White Card WA'],
  ['/white-card-tas', 'B2 - White Card TAS'],
  ['/cpd-building-nsw', 'B3 - CPD building NSW'],
  ['/cpd-building-tas', 'B3 - CPD building TAS'],
  ['/cpd-plumbing-tas', 'B3 - CPD plumbing TAS'],
  ['/cpd-electrical-tas', 'B3 - CPD electrical TAS'],
  ['/cpd-real-estate-wa', 'B3 - CPD real estate WA'],
  ['/cpd-nsw', 'B3 - CPD NSW state hub'],
  ['/cpd-bundles-tas', 'B3 - TAS bundle hub'],
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
const resolves = (p) =>
  existsSync(join(DIST, p, 'index.html')) || existsSync(join(DIST, `${p}.html`));

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
