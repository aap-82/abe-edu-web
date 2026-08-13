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
 *   - assert: the three TIMING assertions drop from `error` to `warn`. See below. The numeric
 *     budgets are NOT changed, so the report still shows the delta; only the severity moves.
 *
 * WHY THE TIMING ASSERTIONS WARN RATHER THAN FAIL, and why that is not a gate refusing to gate.
 * The split is between what is a property of the ARTEFACT and what is a property of the
 * ENVIRONMENT measuring it.
 *
 *   error, deterministic: cumulative-layout-shift, performance-budget, render-blocking-resources.
 *     Layout shift, byte weight (script <= 50KB) and blocking-resource count are the same for the
 *     same build whoever measures it. CLS is also the exact defect class this nightly exists for:
 *     a reproducible ~0.0752 on the deployed host that the localhost gate cannot see, and that
 *     passed the localhost gate green.
 *
 *   warn, environment-bound: categories:performance, largest-contentful-paint,
 *     total-blocking-time. Measured against the deployed host on 13 Aug 2026, three runs of
 *     /qld-owner-builder-course gave LCP 3967 / 3617 / 2447ms against an 1800ms budget, and
 *     performance 0.78 / 0.82 / 0.97 against minScore 1. A 1.5x spread across three runs of one
 *     unchanged page is the measuring machine talking, not the site. There is no runner baseline
 *     for the deployed host yet, so any number set here would be invented, and this repo has
 *     already twice had to raise a budget that flapped on the runner (styleguide LCP 1800 -> 2200,
 *     TBT 50 -> 100), both times AFTER it had blocked merges without catching a defect.
 *
 * Shipping these three as `error` would mean a nightly that is red from night one on numbers
 * nobody can defend, which trains readers to ignore it - the same failure as the permanent false
 * ✘ that `_comment_tbt` printed for weeks. Warn keeps the numbers visible and accumulating.
 *
 * TO PROMOTE THEM TO `error`: collect two weeks of nightly runs, take the p95 per URL from the
 * runner (not from a dev machine), set the budget above it, and move the assertion out of
 * TIMING_ASSERTIONS below. That is a real trigger, not a someday.
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

/* The environment-bound three. Everything NOT listed here keeps whatever severity
   .lighthouserc.json gives it, so adding a new deterministic assertion there needs no change
   here, while a new timing one has to be added deliberately. See the header for the measurement
   and for what promoting one back to `error` requires. */
const TIMING_ASSERTIONS = new Set([
  'categories:performance',
  'largest-contentful-paint',
  'total-blocking-time',
]);

let softened = 0, kept = 0;
for (const entry of out.ci.assert.assertMatrix) {
  for (const [audit, rule] of Object.entries(entry.assertions)) {
    if (!Array.isArray(rule)) continue;             // shorthand form, leave alone
    if (TIMING_ASSERTIONS.has(audit)) { rule[0] = 'warn'; softened++; }
    else kept++;
  }
}

/* The numeric budgets must survive untouched: only severity moves. Compare the two configs with
   every level blanked out, so a stray edit to a maxNumericValue fails here rather than shipping a
   nightly quietly holding the deployed host to different numbers than the PR gate. */
const levelsBlanked = (a) => JSON.stringify(a, (k, v) =>
  (Array.isArray(v) && (v[0] === 'error' || v[0] === 'warn' || v[0] === 'off')) ? ['_', v[1]] : v);
if (levelsBlanked(out.ci.assert) !== levelsBlanked(src.ci.assert)) {
  console.error('Generation changed an assertion budget, not just its severity. Refusing to write.');
  process.exit(1);
}
if (softened === 0) {
  console.error('No timing assertion was found to soften. TIMING_ASSERTIONS is out of step with .lighthouserc.json.');
  process.exit(1);
}

writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log(`Wrote ${outPath}`);
console.log(`  origin:     ${base.origin}`);
console.log(`  urls:       ${out.ci.collect.url.length}`);
for (const u of out.ci.collect.url) console.log(`              ${u}`);
console.log(`  runs/url:   ${out.ci.collect.numberOfRuns ?? 1}`);
console.log(`  assertions: budgets identical to .lighthouserc.json; ${kept} enforced as error, ${softened} timing assertion(s) softened to warn`);
console.log(`              error: everything deterministic (CLS, byte budget, blocking-resource count)`);
console.log(`              warn:  ${[...TIMING_ASSERTIONS].join(', ')}`);
