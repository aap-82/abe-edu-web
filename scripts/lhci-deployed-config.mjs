#!/usr/bin/env node
/* lhci-deployed-config — derive a deployed-host Lighthouse config from .lighthouserc.json.
 *
 * WHY THIS EXISTS, AND WHY IT IS NOT A SECOND CONFIG FILE. The nightly CWV workflow measures the
 * DEPLOYED host; the PR gate measures a locally-served build. The two differ in exactly two
 * respects: where the URLs point, and whether lhci has to start a server. Everything that decides
 * pass or fail - the assert matrix, the budgets, the URL patterns - is identical and must stay
 * identical.
 *
 * The obvious implementation is `.lighthouserc.deployed.json`, and it is the wrong one. A copy of
 * twelve budget values in a second file is a second source of truth, and this repo has just spent
 * a session on what that costs: DESIGN.md and global.css disagreed about six token values for
 * three weeks behind a green board, because nothing read one against the other. Raising an LCP
 * budget in one Lighthouse config and not the other would fail the same way and be harder to see,
 * because a nightly nobody watches is exactly where a stale budget hides.
 *
 * So the budgets have one home, `.lighthouserc.json`, and this script rewrites only what genuinely
 * differs, in one visible block, with the measurement behind it.
 *
 * WHAT IT CHANGES:
 *   - collect.url            localhost origin -> the deployed origin, paths preserved exactly
 *   - collect.startServerCommand / startServerReadyPattern / startServerReadyTimeout: removed,
 *     there is no local server to start
 *   - collect.settings.budgetPath: made absolute, because lhci resolves it relative to cwd and the
 *     generated config is written to a temp path
 *   - assert: one documented numeric override (LCP). Severity is never touched.
 *
 * SEVERITY HISTORY, because the reasoning matters more than the current state.
 *
 * Built 13 Aug 2026 with the three timing assertions at `warn`, on the argument that they were
 * environment-bound and had no runner baseline: three runs of /qld-owner-builder-course had given
 * LCP 3967 / 3617 / 2447ms against an 1800ms budget. That argument was **substantially wrong, and
 * the data that showed it was wrong arrived the same day**. Most of that spread was not the
 * measuring machine, it was a real defect: `.hero-grid` collapsed its text column to zero width
 * below 1100px, and every one of those measurements was of a broken page.
 *
 * PROMOTED TO `error` 13 Aug 2026, on 12 post-fix page-runs from two nightly runs:
 *
 *     LCP   1151-1793ms   (localhost budget 1800 -> only 7ms of margin at the worst)
 *     TBT   0-20ms production, 52-60ms styleguide   (budgets 50 / 100)
 *     perf  0.99-1.00     (minScore 1)
 *
 * TBT and perf are promoted at the budgets .lighthouserc.json already declares: TBT has 60% headroom
 * on production and 40% on the styleguide, and perf passed both nightly runs. LCP is not - 7ms is
 * not a margin, it is a coin flip - so it carries the one override below.
 *
 * WHY `error` IS SAFE AT THESE NUMBERS: lhci aggregates OPTIMISTICALLY by default. With
 * numberOfRuns 3 the assertion takes the most favourable of the three, so it fails only when all
 * three breach. Verified from real output rather than assumed - `found: 2446.85` reported from
 * `all values: 3966.78, 3617.23, 2446.85`. A single slow run cannot redden the nightly; a genuine
 * regression, which moves all three, still does.
 *
 * The one to watch is `categories:performance` at minScore 1, which has the least room: one 0.99
 * has been observed. If anything here flaps first it will be that, and the response is a measured
 * budget in DEPLOYED_OVERRIDES, not a return to `warn`.
 *
 * Usage: node scripts/lhci-deployed-config.mjs <origin> [outPath]
 *   node scripts/lhci-deployed-config.mjs https://abe-edu-web.andrey-p-personal.workers.dev out.json
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const [origin, outPath = 'lhci-deployed.json'] = process.argv.slice(2);

if (!origin) {
  console.error('usage: node scripts/lhci-deployed-config.mjs <origin> [outPath]');
  process.exit(1);
}
let base;
try { base = new URL(origin); } catch { console.error(`Not a valid origin: ${origin}`); process.exit(1); }
if (!/^https?:$/.test(base.protocol)) { console.error(`Origin must be http or https: ${origin}`); process.exit(1); }
if (base.pathname !== '/' || base.search || base.hash) {
  console.error(`Origin must be a bare scheme+host, no path or query: ${origin}`);
  process.exit(1);
}

const src = JSON.parse(readFileSync('.lighthouserc.json', 'utf8'));
const out = JSON.parse(JSON.stringify(src));

/* Swap the origin, keep every path. Fails loudly rather than silently emitting a config that
   measures nothing: an empty or unchanged URL list would produce a green nightly that checked no
   pages, which is the "a zero is the least trustworthy output" failure this repo keeps meeting. */
const urls = src.ci?.collect?.url;
if (!Array.isArray(urls) || urls.length === 0) {
  console.error('.lighthouserc.json has no ci.collect.url array to rewrite.');
  process.exit(1);
}
out.ci.collect.url = urls.map((u) => {
  const parsed = new URL(u);
  return new URL(parsed.pathname + parsed.search, base).toString();
});
if (out.ci.collect.url.some((u) => !u.startsWith(base.origin))) {
  console.error('Rewrite produced a URL outside the target origin. Refusing to write.');
  process.exit(1);
}

delete out.ci.collect.startServerCommand;
delete out.ci.collect.startServerReadyPattern;
delete out.ci.collect.startServerReadyTimeout;

if (out.ci.collect.settings?.budgetPath) {
  out.ci.collect.settings.budgetPath = resolve(out.ci.collect.settings.budgetPath);
}

/* Deployed-host budget overrides. EVERY assertion runs at `error` here — the warn tier was removed
   on 13 Aug 2026 once there was post-fix data to size budgets from. What survives is a single
   numeric override, because one metric genuinely differs on a real network and the rest do not.
   Each entry must carry its measurement. An override with no number behind it is a guess. */
const DEPLOYED_OVERRIDES = new Map([
  ['largest-contentful-paint', {
    maxNumericValue: 2200,
    why: 'worst healthy deployed median 1793ms across 12 page-runs, vs the 1800ms localhost budget: '
       + '7ms of margin, which fails on any slow night. 2200 sits 23% above the worst healthy '
       + 'observation and still catches the defect class we know about - the broken hero measured '
       + '2447-3967ms, so this budget would have caught it. Same value the styleguide already uses.',
  }],
]);

let overridden = 0, unchanged = 0;
for (const entry of out.ci.assert.assertMatrix) {
  for (const [audit, rule] of Object.entries(entry.assertions)) {
    if (!Array.isArray(rule)) continue;                       // shorthand form, leave alone
    const o = DEPLOYED_OVERRIDES.get(audit);
    /* Only ever LOOSEN, and only where the source is stricter. If someone sets .lighthouserc.json
       to something looser than the override, the source wins: this file must never silently make a
       gate stricter than the one the author wrote, nor undo a deliberate relaxation. */
    if (o && typeof rule[1]?.maxNumericValue === 'number' && rule[1].maxNumericValue < o.maxNumericValue) {
      rule[1] = { ...rule[1], maxNumericValue: o.maxNumericValue };
      overridden++;
    } else unchanged++;
  }
}

/* Severity is never touched any more: if the source says error, the deployed run says error. Assert
   it, so a future edit that reaches for `warn` to quiet a failing nightly has to do it in
   .lighthouserc.json where a reader will see it, not in here where nobody looks. */
const levelsOf = (a) => JSON.stringify(a, (k, v) => (Array.isArray(v) && typeof v[0] === 'string' ? v[0] : v));
if (levelsOf(out.ci.assert) !== levelsOf(src.ci.assert)) {
  console.error('Generation changed an assertion severity. The deployed run enforces exactly what .lighthouserc.json declares.');
  process.exit(1);
}

/* Every budget difference must be one of the documented overrides, and nothing else may drift. */
for (const [i, entry] of out.ci.assert.assertMatrix.entries()) {
  for (const [audit, rule] of Object.entries(entry.assertions)) {
    const srcRule = src.ci.assert.assertMatrix[i].assertions[audit];
    if (JSON.stringify(rule) === JSON.stringify(srcRule)) continue;
    if (!DEPLOYED_OVERRIDES.has(audit)) {
      console.error(`Budget for "${audit}" differs from .lighthouserc.json but is not a documented override. Refusing to write.`);
      process.exit(1);
    }
  }
}

writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log(`Wrote ${outPath}`);
console.log(`  origin:     ${base.origin}`);
console.log(`  urls:       ${out.ci.collect.url.length}`);
for (const u of out.ci.collect.url) console.log(`              ${u}`);
console.log(`  runs/url:   ${out.ci.collect.numberOfRuns ?? 1}`);
console.log(`  assertions: ${overridden + unchanged} enforced, all at the severity .lighthouserc.json declares`);
console.log(`              ${unchanged} identical to source, ${overridden} with a documented deployed override`);
for (const [audit, o] of DEPLOYED_OVERRIDES) console.log(`              override ${audit} -> ${o.maxNumericValue}`);
