#!/usr/bin/env node
/**
 * Register freshness check.
 *
 * Verified dates in kb/register/ are prose ("**Verified:** 27 May 2026"), which is readable
 * by a person and invisible to everything else. Before this script, staleness was caught only
 * if whoever was building a page happened to read the header and do the date arithmetic. On
 * 21 July 2026 the fee register was three weeks past its July re-verify point and every build
 * was green, because no check could see a date.
 *
 * Reads YAML frontmatter `verified:` / `cadence:` when present, and falls back to the prose
 * line so no register file has to be rewritten to be covered. Files with neither are reported
 * as unknown, which is a finding, not a pass.
 *
 * `recheck:` (with optional `recheck-reason:`) is a one-off date that fires independently of the
 * cadence, for a file that is in date but rests on something softer than its source label — a
 * figure current on someone's confirmation rather than a published schedule. Reported like
 * PARTIAL: visible, not fatal.
 *
 * Cadences: `annual-july` (indexed fees, reset 1 July), `<n>d`, or `none`. Set per file in
 * CADENCE below — a fee indexes each July, legislation does not, and applying the fee cadence
 * to everything produces fifteen alarms where one is real. A check that cries wolf gets
 * scrolled past, which is worse than no check.
 *
 * Exit 0 = all current. Exit 1 = something lapsed or unknown. Warns rather than blocks by
 * default so an unrelated build is not held hostage; pass --strict to make it fail.
 */

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const REGISTER = 'kb/register';
const STRICT = process.argv.includes('--strict');
/** Per-file cadence. Anything absent is reported as NO-CADENCE, not silently defaulted. */
const CADENCE = {
  'state-fees-register.md': 'annual-july',        // indexed 1 July, the real July case
  'competitor-pricing-snapshot.md': '90d',        // market data, moves without notice
  'eligibility-by-state.md': '365d',
  'online-delivery-policy-by-state.md': '365d',
  'penalties-by-state.md': '365d',
  'ppe-requirements.md': '365d',
  'regulator-roles-by-state.md': '365d',
  'government-listings.md': '365d',
  'card-lodgement-process-tas.md': '365d',
  'cbos-tas-reference.md': '365d',
  'legislation-references-act.md': '365d',        // changes when it changes; annual sweep
  'legislation-references-nsw.md': '365d',
  'legislation-references-qld.md': '365d',
  'legislation-references-tas.md': '365d',
  'legislation-references-wa.md': '365d',
};

const MONTHS = ['january','february','march','april','may','june','july','august','september','october','november','december'];

function parseVerified(src) {
  const fm = src.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (fm) {
    const v = fm[1].match(/^verified:\s*(\S+)/m);
    const c = fm[1].match(/^cadence:\s*(\S+)/m);
    const partial = /^partial:\s*true\b/m.test(fm[1]);
    const r = fm[1].match(/^recheck:\s*(\S+)/m);
    const reason = fm[1].match(/^recheck-reason:\s*(.+)$/m);
    if (v) return {
      date: new Date(v[1]), cadence: c?.[1] ?? null, partial, source: 'frontmatter',
      recheck: r ? new Date(r[1]) : null, recheckReason: reason?.[1].trim() ?? null,
    };
  }
  // Prose fallback: **Verified:** 27 May 2026
  const p = src.match(/\*\*Verified:?\*\*[^\n]*?(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
  if (p) {
    const m = MONTHS.indexOf(p[2].toLowerCase());
    if (m >= 0) return { date: new Date(Date.UTC(+p[3], m, +p[1])), cadence: null, source: 'prose' };
  }
  return null;
}

/** The date a fact verified on `d` stops being trustworthy. */
function expiresAt(d, cadence) {
  if (cadence === 'none') return null;
  const days = cadence.match(/^(\d+)d$/);
  if (days) return new Date(d.getTime() + +days[1] * 86_400_000);
  // annual-july: valid until the first 1 July after verification
  const july = Date.UTC(d.getUTCFullYear(), 6, 1);
  return new Date(d.getTime() < july ? july : Date.UTC(d.getUTCFullYear() + 1, 6, 1));
}

const today = new Date();
const rows = [];
for (const f of readdirSync(REGISTER).filter((x) => x.endsWith('.md') && x !== 'README.md')) {
  const parsed = parseVerified(readFileSync(join(REGISTER, f), 'utf8'));
  if (!parsed) { rows.push({ f, state: 'NO-DATE', detail: 'no verified date found — add frontmatter `verified:`' }); continue; }
  const cadence = parsed.cadence ?? CADENCE[f];
  if (!cadence) { rows.push({ f, state: 'NO-CADENCE', detail: 'not in CADENCE map — decide how often this needs re-verifying' }); continue; }
  const exp = expiresAt(parsed.date, cadence);
  const iso = (x) => x.toISOString().slice(0, 10);
  if (exp && today > exp) {
    const daysOver = Math.floor((today - exp) / 86_400_000);
    rows.push({ f, state: 'LAPSED', detail: `verified ${iso(parsed.date)}, due ${iso(exp)}, ${daysOver}d overdue` });
  } else if (parsed.recheck && today > parsed.recheck) {
    // Independent of the cadence. A file can be well inside its annual window and still rest on
    // something that needs looking at sooner — WA's FY26-27 figures are current on a person's
    // confirmation, not a source label, and that caveat lived only as prose in a table cell.
    rows.push({ f, state: 'RECHECK-DUE', detail: `verified ${iso(parsed.date)} and in date, but a re-check was set for ${iso(parsed.recheck)}${parsed.recheckReason ? ` — ${parsed.recheckReason}` : ''}` });
  } else if (parsed.partial) {
    // A file can be in date and still have unverified cells. Reporting it as ok would
    // hide exactly the figures most likely to be wrong.
    rows.push({ f, state: 'PARTIAL', detail: `verified ${iso(parsed.date)} but marked partial — some cells unverified, check the file` });
  } else {
    rows.push({ f, state: 'ok', detail: `verified ${iso(parsed.date)}${exp ? `, next ${iso(exp)}` : ''}` });
  }
}

const bad = rows.filter((r) => r.state !== 'ok');
for (const r of rows.filter((r) => r.state !== 'ok')) console.log(`  ${r.state.padEnd(7)} ${r.f} — ${r.detail}`);
console.log(`Register freshness: ${rows.length - bad.length}/${rows.length} current.`);

if (bad.length) {
  console.log(
    `\n${bad.length} register file(s) need attention. Re-verify against the official source, update the\n` +
    `figure and its verified date, then rebuild. Do not publish a figure from a lapsed file.`
  );
  if (STRICT) process.exit(1);
}
