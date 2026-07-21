#!/usr/bin/env node
/**
 * System health — one command, whole-system view.
 *
 * Five mechanisms existed before this and each answered a different question at a different
 * moment: guardrails at build, freshness at prebuild, trends after a review, typecheck on demand,
 * mistakes-log by hand. Nothing answered "is the system as a whole in good shape", so nothing did.
 *
 * Adds two checks nothing else performs:
 *   - DANGLING REFERENCES. Every path a skill points at must resolve. This is the drift the
 *     mistakes log has recorded three times: assets/ that never installed, a review template that
 *     did not exist, content-model.md describing a superseded architecture. Documentation that
 *     points at nothing is the failure mode of this system, so it gets a check of its own.
 *   - REVIEW COVERAGE. A page that shipped without a Stage-9 review is a run the learning loop
 *     never saw. Nothing else notices, because the missing artefact is the evidence.
 *
 * Reporting only — always exits 0. Run it before planning work, not just before shipping.
 */

import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';
import { execFileSync } from 'node:child_process';

const findings = { fail: [], warn: [], ok: [] };
const F = (m) => findings.fail.push(m), W = (m) => findings.warn.push(m), OK = (m) => findings.ok.push(m);

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
  const bad = (out.match(/^\s+(LAPSED|PARTIAL|NO-DATE|NO-CADENCE)/gm) ?? []).length;
  if (m) (bad ? W : OK)(`Register: ${m[1]}/${m[2]} current${bad ? `, ${bad} need attention` : ''}`);
  for (const l of out.split('\n').filter((l) => /^\s+(LAPSED|PARTIAL)/.test(l))) F(`Register ${l.trim()}`);
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
if (existsSync('scripts/check-claims.mjs')) {
  const out = run('check-claims.mjs');
  for (const l of out.split('\n')) {
    const t = l.trim();
    if (t.startsWith('FAIL')) F(t.replace(/^FAIL\s+/, ''));
    else if (t.startsWith('WARN') && !/skipped|not found here/.test(t)) W(t.replace(/^WARN\s+/, ''));
    else if (t.startsWith('OK')) OK(t.replace(/^OK\s+/, ''));
  }
} else W('scripts/check-claims.mjs missing — claim drift and figure contradictions are unchecked');

// 5 - repeat risks
if (existsSync('kb/mistakes-log.md')) {
  const rows = readFileSync('kb/mistakes-log.md', 'utf8').split('\n').filter((l) => /^\|\s*\d+\s*\|/.test(l));
  const hot = rows.map((r) => r.split('|').map((c) => c.trim())).filter((c) => Number(c[3]) >= 3);
  (hot.length ? W : OK)(`Mistakes log: ${rows.length} active risk(s)${hot.length ? `, ${hot.length} seen 3+ times` : ''}`);
  for (const c of hot) W(`Repeat risk seen ${c[3]}x: ${c[2]}`);
}

// 6 - build + typecheck are the existing per-page gates; report whether they were run
OK('Per-page correctness is enforced by guardrails.ts at build — run `npm run build` for that layer');

for (const [label, list] of [['FAIL', findings.fail], ['WARN', findings.warn], ['OK', findings.ok]])
  for (const m of list) console.log(`  ${label.padEnd(5)} ${m}`);

console.log(`\n  ${findings.fail.length} failing, ${findings.warn.length} warning, ${findings.ok.length} ok`);
console.log(findings.fail.length
  ? '  Fix the failures before building a page. Every one is either a wrong fact or a broken pointer.\n'
  : '  No failures. Warnings are work to schedule, not blockers.\n');
