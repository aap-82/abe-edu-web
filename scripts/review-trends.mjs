#!/usr/bin/env node
/**
 * Skill-review trend report.
 *
 * Stage 9 records three trend metrics every run. Recording them is not the same as knowing
 * whether the system is improving: a directory of markdown files does not show a trend until
 * something computes one. This does that, so "are we getting better" is a number before it is
 * an opinion.
 *
 * Also answers the question the reviews were built to answer and nothing was reading: which
 * deployed pages are due their 4-week or 12-week outcome review today.
 *
 * Reads the frontmatter block in skill-reviews/*.md. Reporting only — always exits 0.
 */

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'skill-reviews';
if (!existsSync(DIR)) { console.log('No skill-reviews/ directory yet — nothing to trend.'); process.exit(0); }

/** Deliberately small YAML reader: flat keys, one nesting level, scalars and inline arrays. */
function parseFrontmatter(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const out = {};
  let section = null;
  for (const raw of m[1].split(/\r?\n/)) {
    const line = raw.replace(/\s+#.*$/, '');
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const top = line.match(/^(\w+):\s*(.*)$/);
    const nested = line.match(/^\s+(\w+):\s*(.*)$/);
    if (top) { section = top[2].trim() === '' ? (out[top[1]] = {}, top[1]) : (out[top[1]] = coerce(top[2]), null); }
    else if (nested && section) out[section][nested[1]] = coerce(nested[2]);
  }
  return out;
}
const coerce = (v) => {
  v = v.trim().replace(/^["']|["']$/g, '');
  if (v === '' || v === '[]') return null;
  return /^-?\d+$/.test(v) ? Number(v) : v;
};

const runs = readdirSync(DIR)
  .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
  .map((f) => ({ f, fm: parseFrontmatter(readFileSync(join(DIR, f), 'utf8')) }))
  .filter((r) => r.fm?.date && /^\d{4}-\d{2}-\d{2}$/.test(String(r.fm.date)))
  .sort((a, b) => String(a.fm.date).localeCompare(String(b.fm.date)));

if (!runs.length) { console.log('No graded runs yet — nothing to trend.'); process.exit(0); }

const M = ['turns_to_passed_audit', 'manual_fix_passes', 'gate_fails_after_handoff'];
const num = (r, k) => (typeof r.fm.metrics?.[k] === 'number' ? r.fm.metrics[k] : null);

console.log(`\nSkill-review trends — ${runs.length} graded run(s)\n`);
console.log('  date        subject                    verdict  grader        turns  fixes  late-fails');
for (const r of runs) {
  const g = r.fm.graded_by === 'independent' ? 'independent' : 'SELF-GRADED';
  console.log(
    `  ${String(r.fm.date).padEnd(11)} ${String(r.fm.subject ?? '?').slice(0, 25).padEnd(26)} ` +
    `${String(r.fm.verdict ?? '?').padEnd(8)} ${g.padEnd(13)} ` +
    M.map((k) => String(num(r, k) ?? '-').padStart(5)).join('  ')
  );
}

// Direction: mean of the most recent third against the mean of the earliest third.
if (runs.length >= 3) {
  const n = Math.max(1, Math.floor(runs.length / 3));
  const mean = (set, k) => { const v = set.map((r) => num(r, k)).filter((x) => x !== null); return v.length ? v.reduce((a, b) => a + b) / v.length : null; };
  console.log('\n  Direction (recent third vs earliest third — lower is better):');
  for (const k of M) {
    const early = mean(runs.slice(0, n), k), recent = mean(runs.slice(-n), k);
    if (early === null || recent === null) { console.log(`    ${k}: not enough data`); continue; }
    const d = recent - early;
    const verdict = Math.abs(d) < 0.05 ? 'flat' : d < 0 ? `improving (${d.toFixed(1)})` : `WORSENING (+${d.toFixed(1)})`;
    console.log(`    ${k.padEnd(26)} ${early.toFixed(1)} -> ${recent.toFixed(1)}  ${verdict}`);
  }
} else {
  console.log(`\n  Direction needs 3+ runs (have ${runs.length}).`);
}

// The veto, and grader honesty.
const vetoed = runs.filter((r) => r.fm.scores?.correct_and_safe === 'red');
if (vetoed.length) console.log(`\n  ${vetoed.length} run(s) RED on correct-and-safe — the veto: ${vetoed.map((r) => r.fm.subject).join(', ')}`);
const selfGraded = runs.filter((r) => r.fm.graded_by !== 'independent');
if (selfGraded.length) console.log(`  ${selfGraded.length} of ${runs.length} run(s) self-graded — treat those scores as weaker evidence.`);

// Outcome reviews that have come due. Nothing else reads these dates.
const today = new Date().toISOString().slice(0, 10);
const due = [];
for (const r of runs) {
  const o = r.fm.outcome; if (!o) continue;
  for (const [k, res, label] of [['review_4week', 'result_4week', '4-week'], ['review_12week', 'result_12week', '12-week']]) {
    const d = String(o[k] ?? '');
    if (/^\d{4}-\d{2}-\d{2}$/.test(d) && d <= today && !o[res]) due.push(`${label} review due for ${r.fm.subject} (was ${d}) — keyword "${o.primary_keyword ?? '?'}"`);
  }
}
console.log(due.length ? `\n  Outcome reviews due:\n${due.map((d) => `    - ${d}`).join('\n')}` : '\n  No outcome reviews due.');

// Consolidation trigger for the usability split (see references/usability-map.md).
console.log('\n  Reminder: if a run needed all three usability sources to answer one layout question,');
console.log('  note it in the demand list — that is the trigger to merge them into the content skill.\n');
