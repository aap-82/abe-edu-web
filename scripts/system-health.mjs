#!/usr/bin/env node
/**
 * System health — one command, whole-system view.
 *
 * Five mechanisms existed before this and each answered a different question at a different
 * moment: guardrails at build, freshness at prebuild, trends after a review, typecheck on demand,
 * mistakes-log by hand. Nothing answered "is the system as a whole in good shape", so nothing did.
 *
 * Adds two checks nothing else performs:
 *   - DANGLING REFERENCES, in two populations counted separately. Every path a skill points at must
 *     resolve; so must every path the GOVERNANCE DOCUMENTS point at (CLAUDE.md, SYSTEM.md,
 *     ROADMAP.md, DESIGN.md, README.md, handover/**), which had no reader at all until 29 Jul 2026
 *     and were carrying six dead pointers through clean runs. This is the drift the mistakes log has
 *     now recorded ten times: assets/ that never installed, a review template that did not exist,
 *     content-model.md describing a superseded architecture, and finally the rule documents
 *     themselves. Documentation that points at nothing is the failure mode of this system, so it
 *     gets a check of its own — and the document stating that rule is not exempt from it.
 *   - REVIEW COVERAGE. A page that shipped without a Stage-9 review is a run the learning loop
 *     never saw. Nothing else notices, because the missing artefact is the evidence.
 *
 * Reporting only — always exits 0. Run it before planning work, not just before shipping.
 *
 * HISTORY. Each run appends one JSON object, on one line, to data/health-log.jsonl. The scorecard
 * alone answers "is the system healthy now" and can never answer "is it getting healthier", because
 * nothing survives the run. Four properties make that history usable:
 *
 *   - Append-only, one object per line. Never rewritten, never truncated, never pretty-printed.
 *     A merge conflict here resolves by KEEPING BOTH LINES in timestamp order - the lines are
 *     independent observations, so neither side is ever the loser.
 *   - Committed, despite living under data/. See the exception in .gitignore: the log is counts
 *     only, and a history that exists on one machine is not a history.
 *   - null, never 0, for anything a run could not determine. A skipped sub-check recorded as zero
 *     becomes a dip in a future chart that never happened, and the time is then spent debugging
 *     the data instead of the system.
 *   - Logging can never break the check. The write is wrapped; a failure warns and the run still
 *     exits 0. A health check that dies because it could not write its own log is worse than one
 *     that does not log at all.
 *
 * The numbers are taken from what the run already computed. Nothing is re-run to populate a record.
 */

import { readdirSync, readFileSync, existsSync, statSync, appendFileSync, mkdirSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';
import { execFileSync } from 'node:child_process';

const findings = { fail: [], warn: [], ok: [] };
const F = (m) => findings.fail.push(m), W = (m) => findings.warn.push(m), OK = (m) => findings.ok.push(m);

// Every field starts null and is only filled by a sub-check that actually ran. A key left null
// means "not determined on this run", which is a different fact from a zero.
const rec = {
  ts: null, fail: null, warn: null, ok: null,
  register: null, skillRefs: null, docRefs: null, claims: null, figures: null,
  totals: null, bundles: null, reviews: null, mistakes: null, unrouted: null, positions: null,
};
const countOf = (out, label) => (out.match(new RegExp(`^\\s+${label}\\b`, 'gm')) ?? []).length;

const walk = (d, ext, out = []) => {
  if (!existsSync(d)) return out;
  for (const e of readdirSync(d)) {
    const p = join(d, e);
    statSync(p).isDirectory() ? walk(p, ext, out) : (e.endsWith(ext) && out.push(p));
  }
  return out;
};
const run = (script, args = []) => {
  try { return execFileSync('node', [join('scripts', script), ...args], { encoding: 'utf8' }); }
  catch (e) { return (e.stdout ?? '') + (e.stderr ?? ''); }
};

console.log('\n=== ABE system health ===\n');

// 1 - register freshness
if (existsSync('scripts/check-freshness.mjs')) {
  const out = run('check-freshness.mjs');
  const m = out.match(/Register freshness: (\d+)\/(\d+) current/);
  const bad = (out.match(/^\s+(LAPSED|PARTIAL|NO-DATE|NO-CADENCE|RECHECK-DUE)/gm) ?? []).length;
  if (m) (bad ? W : OK)(`Register: ${m[1]}/${m[2]} current${bad ? `, ${bad} need attention` : ''}`);
  if (m) rec.register = {
    current: +m[1], total: +m[2],
    partial: countOf(out, 'PARTIAL'), recheckDue: countOf(out, 'RECHECK-DUE'),
    noDate: countOf(out, 'NO-DATE'), lapsed: countOf(out, 'LAPSED'),
  };
  for (const l of out.split('\n').filter((l) => /^\s+(LAPSED|PARTIAL)/.test(l))) F(`Register ${l.trim()}`);
  // RECHECK-DUE is a scheduling signal, not a publish hazard: the file is in date, but something in
  // it rests on softer ground than its source label. Visible, never fatal — unlike LAPSED/PARTIAL,
  // it does not mean a figure on a page is untrustworthy today.
  for (const l of out.split('\n').filter((l) => /^\s+RECHECK-DUE/.test(l))) W(`Register ${l.trim()}`);
} else W('scripts/check-freshness.mjs missing — register staleness is unchecked');

// 2 - dangling references in skills. The drift class that has bitten three times.
const skillFiles = walk('.claude/skills', '.md');
let refs = 0, dangling = 0;
for (const f of skillFiles) {
  const src = readFileSync(f, 'utf8');
  // walk() builds paths with the platform separator, so split on both. On Windows this was
  // splitting on '/' alone, skillRoot came back as the whole file path, and every reference
  // resolved only by luck — 16 live files reported as dangling.
  const skillRoot = f.split(/[\\/]/).slice(0, 3).join('/');   // .claude/skills/<name>
  for (const m of src.matchAll(/`((?:kb|references|scripts|src|data|skill-reviews|pipeline)\/[A-Za-z0-9._\/-]+\.(?:md|ts|mjs|astro|json))`/g)) {
    const p = m[1];
    if (p.includes('{') || p.includes('*')) continue;      // templated paths are not literal
    // src/ paths point into the site. Outside the repo they cannot be checked, so skip rather
    // than cry wolf; inside the repo they are checked like anything else.
    if (p.startsWith('src/') && !existsSync('src')) continue;
    refs++;
    // Resolve three ways: literal from repo root, from the skill root, and as a sibling of the
    // referencing file (a file in references/seo/ writing `references/x.md` means its neighbour).
    const candidates = [p, join(skillRoot, p), join(dirname(f), p.replace(/^references\//, ''))];
    if (!candidates.some((c) => existsSync(c))) { dangling++; F(`Dangling reference in ${relative('.', f)}: \`${p}\``); }
  }
}
(dangling ? W : OK)(`Skill references: ${refs - dangling}/${refs} resolve`);
// No skill files at all means the check could not run, which is not the same as "zero references
// and all of them fine".
if (skillFiles.length) rec.skillRefs = { resolve: refs - dangling, total: refs };

/* 2b - dangling references in the GOVERNANCE DOCUMENTS.
 *
 * WHY THIS EXISTS. Check 2 above reads `.claude/skills/**` and nothing else. That left CLAUDE.md,
 * SYSTEM.md, ROADMAP.md, DESIGN.md and handover/ with no dangling-reference reader at all — the
 * documents that STATE the rule "every path resolves, or it does not exist" (SYSTEM.md §2) were the
 * ones exempt from it. On 29 July 2026 a full system audit found six dead pointers across them
 * (`outputs/md/abe-page-design-rules.md`, `../MIGRATION.md`, `../abe-rebuild-plan-review.md`, a
 * root `HANDOVER.md`, an unqualified `references/usability-map.md`, and `demand-split --write`
 * described as regenerating `handover/` when it writes `reports/`), every one of them through a
 * clean health run. This is mistakes-log row 1 — "documentation describing the build drifted from
 * the code and was trusted over it" — landing on the documents that describe the rules, which is
 * the tenth sighting of that row and the second in a row on a governance document.
 *
 * COUNTED SEPARATELY from skill references, deliberately. Folding these into `skillRefs` would
 * change what a logged field counts, and every earlier line in data/health-log.jsonl would silently
 * start meaning something different. Same discipline as "null, never 0": a reader must never be
 * able to compare two numbers that were computed over different sets.
 *
 * TWO RULES, because the failures had two shapes:
 *   in-repo   a prefixed path that does not resolve      the six above, minus the two `../` ones
 *   escaping  any `../` path, resolvable or not          SYSTEM.md §2's "One home" — the repo is
 *                                                        the single source, so a document that
 *                                                        points outside it is a finding even when
 *                                                        the file happens to exist on that machine
 */
const DOC_FILES = ['CLAUDE.md', 'SYSTEM.md', 'ROADMAP.md', 'DESIGN.md', 'README.md', ...walk('handover', '.md')];
/* Paths that are correct AND deliberately absent from a clean checkout. Exempt by prefix, with the
   reason stated, so the exception is visible rather than being a silent hole in the check. */
const DOC_REF_EXEMPT = new Map([
  ['reports/', 'derived view, gitignored — regenerated on demand by scripts/demand-split.mjs --write'],
  ['business data/', 'ABE commercial search and LearnWorlds data, deliberately never committed (see .gitignore)'],
  ['data/GSC/', 'the superseded GSC path — still named in historical records; exports moved to business data/GSC/ on ~28 Jul 2026'],
]);
let docRefs = 0, docDangling = 0;
for (const f of DOC_FILES.filter((x) => existsSync(x))) {
  const src = readFileSync(f, 'utf8');
  for (const m of src.matchAll(/`((?:\.\.\/|(?:kb|scripts|src|data|skill-reviews|pipeline|handover|public|worker|new site|\.claude|\.github)\/)[A-Za-z0-9 ._\/-]+\.(?:md|ts|mjs|js|astro|json|jsonl|csv|txt))`/g)) {
    const p = m[1];
    if (p.includes('{') || p.includes('*')) continue;              // templated paths are not literal
    if ([...DOC_REF_EXEMPT.keys()].some((k) => p.startsWith(k))) continue;
    docRefs++;
    if (p.startsWith('../')) {
      docDangling++;
      F(`Reference escaping the repo in ${f}: \`${p}\` — SYSTEM.md §2 "One home": the repo is the single source, so nothing may point outside it. Bring the file in, or drop the pointer.`);
    } else if (!existsSync(p)) {
      docDangling++;
      F(`Dangling reference in ${f}: \`${p}\``);
    }
  }
}
(docDangling ? W : OK)(`Governance-doc references: ${docRefs - docDangling}/${docRefs} resolve`);
if (docRefs) rec.docRefs = { resolve: docRefs - docDangling, total: docRefs };

// 3 - review coverage: every built page should have a Stage-9 review
const slugs = new Set();
for (const [dir, ext] of [['src/content/courses', '.mdx'], ['src/content/hubs', '.mdx']])
  for (const f of walk(dir, ext)) slugs.add(f.split(/[\\/]/).pop().replace(ext, ''));
const reviewed = new Set();
if (existsSync('skill-reviews'))
  for (const f of readdirSync('skill-reviews').filter((x) => x.endsWith('.md') && !x.startsWith('_'))) {
    const s = readFileSync(join('skill-reviews', f), 'utf8').match(/^subject:\s*(.+)$/m);
    if (s) reviewed.add(s[1].trim());
  }
if (slugs.size) {
  const missing = [...slugs].filter((s) => !reviewed.has(s));
  (missing.length ? W : OK)(`Review coverage: ${slugs.size - missing.length}/${slugs.size} pages graded`);
  rec.reviews = { graded: slugs.size - missing.length, pages: slugs.size };
  for (const s of missing) W(`No Stage-9 review for "${s}" — that run was never seen by the learning loop`);
} else W('No content collections found — run this from the repo root');

// 4 - trends
if (existsSync('scripts/review-trends.mjs')) {
  const out = run('review-trends.mjs');
  for (const l of out.split('\n')) {
    if (/WORSENING/.test(l)) F(`Trend ${l.trim()}`);
    else if (/improving|flat/.test(l)) OK(`Trend ${l.trim()}`);
    else if (/RED on correct-and-safe|self-graded/.test(l)) W(l.trim());
    else if (/review due for/.test(l)) W(`Outcome ${l.trim()}`);
  }
} else W('scripts/review-trends.mjs missing — trends are unchecked');

// 4b - claim drift and figure contradiction (the two checks paths-exist cannot make)
/* Can the last session's work still reach main? This is a pre-flight question, not a build one:
   twice on 29 Jul 2026 correct, verified, green work never shipped because it was pushed to a branch
   whose PR had already merged. Every other check reads the branch, where the work is present and
   passing, so none of them can see it. SKIP lines are dropped: this check cannot always know (no
   gh, no network, no remote) and saying so on every clean run would be noise. */
if (existsSync('scripts/check-shipped.mjs')) {
  for (const l of run('check-shipped.mjs').split('\n')) {
    const t = l.trim();
    if (t.startsWith('FAIL')) F(t.replace(/^FAIL\s+/, ''));
    else if (t.startsWith('WARN')) W(t.replace(/^WARN\s+/, ''));
    else if (t.startsWith('OK')) OK(t.replace(/^OK\s+/, ''));
  }
} else W('scripts/check-shipped.mjs missing — stranded work is unchecked');

if (existsSync('scripts/check-claims.mjs')) {
  const out = run('check-claims.mjs');
  for (const l of out.split('\n')) {
    const t = l.trim();
    if (t.startsWith('FAIL')) F(t.replace(/^FAIL\s+/, ''));
    else if (t.startsWith('WARN') && !/skipped|not found here/.test(t)) W(t.replace(/^WARN\s+/, ''));
    else if (t.startsWith('OK')) OK(t.replace(/^OK\s+/, ''));
  }
  // Parsed from the summary lines check-claims already printed, not by re-running it.
  const claims = out.match(/Code claims: (\d+)\/(\d+)/);
  if (claims) rec.claims = { verified: +claims[1], total: +claims[2] };
  const figures = out.match(/Figures: (\d+)\/(\d+)[^(]*\((\d+) excluded/);
  if (figures) rec.figures = { matched: +figures[1], total: +figures[2], excluded: +figures[3] };
  const totals = out.match(/Totals: (\d+) course page total/);
  if (totals) rec.totals = { reconcile: +totals[1], checked: +totals[1] };
  const bundles = out.match(/Bundles: (\d+) bundle offer/);
  if (bundles) rec.bundles = { reconcile: +bundles[1], checked: +bundles[1] };
} else W('scripts/check-claims.mjs missing — claim drift and figure contradictions are unchecked');

// 4b - pipeline conformance. Aggregated here rather than logged separately: one record per health
// run covers every check, per the recording policy in ROADMAP.md.
if (existsSync('scripts/check-pipeline.mjs')) {
  const out = run('check-pipeline.mjs');
  for (const l of out.split('\n')) {
    const t = l.trim();
    if (t.startsWith('FAIL')) F(t.replace(/^FAIL\s+/, ''));
    else if (t.startsWith('WARN')) W(t.replace(/^WARN\s+/, ''));
    else if (t.startsWith('OK')) OK(t.replace(/^OK\s+/, ''));
  }
  const m = out.match(/(\d+) failing, (\d+) warning, (\d+) ok/);
  if (m) rec.pipeline = { fail: +m[1], warn: +m[2], ok: +m[3] };
} else W('scripts/check-pipeline.mjs missing — brief-to-page drift is unchecked');

// 4c - position conformance. A page's claim about delivery mode or authority model must not
// contradict kb/register/ — the reconciliation check-claims.mjs performs for dollar figures, done
// here for positions instead. See scripts/check-positions.mjs's own header for the three defects
// that motivated it, one of which (TAS residency) this check is expected to still FAIL on until a
// build session fixes the copy — that is signal, not a regression this script introduced.
if (existsSync('scripts/check-positions.mjs')) {
  const out = run('check-positions.mjs');
  for (const l of out.split('\n')) {
    const t = l.trim();
    if (t.startsWith('FAIL')) F(t.replace(/^FAIL\s+/, ''));
    else if (t.startsWith('WARN')) W(t.replace(/^WARN\s+/, ''));
    else if (t.startsWith('OK')) OK(t.replace(/^OK\s+/, ''));
  }
  const m = out.match(/(\d+) failing, (\d+) warning, (\d+) ok/);
  if (m) rec.positions = { fail: +m[1], warn: +m[2], ok: +m[3] };
} else W('scripts/check-positions.mjs missing — delivery-mode and authority-model positions are unchecked');

// 5 - repeat risks
if (existsSync('kb/mistakes-log.md')) {
  const rows = readFileSync('kb/mistakes-log.md', 'utf8').split('\n').filter((l) => /^\|\s*\d+\s*\|/.test(l));
  const hot = rows.map((r) => r.split('|').map((c) => c.trim())).filter((c) => Number(c[3]) >= 3);
  (hot.length ? W : OK)(`Mistakes log: ${rows.length} active risk(s)${hot.length ? `, ${hot.length} seen 3+ times` : ''}`);
  rec.mistakes = { active: rows.length, hot: hot.length };
  for (const c of hot) W(`Repeat risk seen ${c[3]}x: ${c[2]}`);
}

// 5b - unrouted demand items. A demand-list item with no valid [destination] tag reaches no handover
// note (scripts/demand-split.mjs), which is the same failure class as a page shipped without a review:
// something the learning loop never sees. WARN, never FAIL. null (not 0) when there are no reviews yet.
const DEST = new Set(['skills', 'design', 'facts', 'build']);   // one per session type — keep in step with demand-split.mjs
if (existsSync('skill-reviews')) {
  /* RECURSIVE, like demand-split's traversal and unlike the review-coverage scan above. This counter
     must see exactly what demand-split routes, or it reports a clean number about a different set:
     it read `skill-reviews/` flat until 29 Jul 2026 and logged `unrouted: 0` into every health record
     while two `[build]`-tagged items sat unroutable in `skill-reviews/design/`. A subdirectory comes
     back from readdirSync as a bare name, which `.endsWith('.md')` drops silently. See mistakes-log
     row 24. Review COVERAGE above stays flat on purpose — it counts graded pages, and a design or
     skills review grades none. */
  const reviewFiles = walk('skill-reviews', '.md')
    .filter((p) => !p.split(/[\\/]/).pop().startsWith('_'));
  let unrouted = 0, tagged = 0;
  for (const f of reviewFiles) {
    const lines = readFileSync(f, 'utf8').split('\n');
    const start = lines.findIndex((l) => /^#{1,6}\s*demand list\b/i.test(l));
    if (start === -1) continue;
    for (const line of lines.slice(start + 1)) {
      if (/^#{1,6}\s/.test(line)) break;                          // next heading ends the section
      const m = line.match(/^\s*(?:[-*]|\d+[.)])\s*\[([^\]]*)\]\s*(\S.*)$/);   // a tagged demand item
      if (!m) continue;
      // `- [skills] none.` is the absence of an item. Counting it inflated this figure by 6 and,
      // in demand-split, promoted "none." to a twice-seen actionable item. Keep the two in step.
      if (/^(none|n\/?a|nil|nothing)\b[\s.—-]*$/i.test(m[2].replace(/\*+/g, '').trim())) continue;
      tagged++;
      if (!DEST.has(m[1].trim().toLowerCase())) unrouted++;
    }
  }
  // null, never 0, when no reviews exist — same convention as the JSONL log's undetermined fields.
  rec.unrouted = reviewFiles.length ? unrouted : null;
  if (reviewFiles.length)
    (unrouted ? W : OK)(`Unrouted demand items: ${unrouted}${unrouted
      ? ' — add a valid [skills|design|facts|build] tag; run scripts/demand-split.mjs'
      : ` (${tagged} tagged item(s) all route)`}`);
}

// 6 - build + typecheck are the existing per-page gates; report whether they were run
OK('Per-page correctness is enforced by guardrails.ts at build — run `npm run build` for that layer');

for (const [label, list] of [['FAIL', findings.fail], ['WARN', findings.warn], ['OK', findings.ok]])
  for (const m of list) console.log(`  ${label.padEnd(5)} ${m}`);

console.log(`\n  ${findings.fail.length} failing, ${findings.warn.length} warning, ${findings.ok.length} ok`);
console.log(findings.fail.length
  ? '  Fix the failures before building a page. Every one is either a wrong fact or a broken pointer.\n'
  : '  No failures. Warnings are work to schedule, not blockers.\n');

// History. Written last so a failure here cannot cost the reader the scorecard above.
rec.ts = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
rec.fail = findings.fail.length;
rec.warn = findings.warn.length;
rec.ok = findings.ok.length;

const LOG = join('data', 'health-log.jsonl');
try {
  mkdirSync('data', { recursive: true });
  appendFileSync(LOG, `${JSON.stringify(rec)}\n`);
  const undetermined = Object.entries(rec).filter(([, v]) => v === null).map(([k]) => k);
  console.log(`  Logged to ${LOG}${undetermined.length ? ` (undetermined this run: ${undetermined.join(', ')})` : ''}\n`);
} catch (e) {
  // Deliberately not a findings entry: the log failing says nothing about the system's health,
  // and letting it colour the scorecard would be the tail wagging the dog.
  console.log(`  NOTE  Could not append to ${LOG} (${e.code ?? e.message}). The check above is unaffected.\n`);
}
