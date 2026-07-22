#!/usr/bin/env node
/**
 * Drop the last health-log record if it is identical to the one before it apart from its
 * timestamp.
 *
 * WHY THIS EXISTS. `system-health` appends one record per run, and CI runs it on every push to
 * main. Twenty pushes that change no counts would otherwise produce twenty identical lines, and
 * a trend line made mostly of duplicates is harder to read than one made of changes. The series
 * this protects answers "is the system degrading, and since when" — duplicates add nothing to
 * that and actively obscure the "since when".
 *
 * WHY IT IS NOT IN system-health.mjs. That script is a check, and this is CI wiring. Keeping the
 * dedupe out here means a local run always records what it saw, so someone watching a figure move
 * during a session still gets every data point.
 *
 * SAFETY. This only ever removes the final line, and only when it is provably redundant. Anything
 * unparseable, missing or short-circuits to "leave it alone" — losing history is much worse than
 * keeping a duplicate.
 *
 * Exit 0 always. Prints what it did, for the CI run summary.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const LOG = 'data/health-log.jsonl';

if (!existsSync(LOG)) {
  console.log('health-log-dedupe: no log yet, nothing to do.');
  process.exit(0);
}

const raw = readFileSync(LOG, 'utf8');
const lines = raw.split('\n').filter((l) => l.trim());

if (lines.length < 2) {
  console.log(`health-log-dedupe: ${lines.length} record(s), nothing to compare.`);
  process.exit(0);
}

/** Compare everything except the timestamp. Keys are sorted so field order cannot masquerade as
 *  a change. */
function fingerprint(line) {
  const obj = JSON.parse(line);
  delete obj.ts;
  const canonical = (v) => {
    if (Array.isArray(v)) return `[${v.map(canonical).join(',')}]`;
    if (v && typeof v === 'object') {
      return `{${Object.keys(v).sort().map((k) => `${JSON.stringify(k)}:${canonical(v[k])}`).join(',')}}`;
    }
    return JSON.stringify(v ?? null);
  };
  return canonical(obj);
}

let last, prev;
try {
  last = fingerprint(lines[lines.length - 1]);
  prev = fingerprint(lines[lines.length - 2]);
} catch (err) {
  console.log(`health-log-dedupe: could not parse the last two records, leaving the log untouched (${err.message}).`);
  process.exit(0);
}

if (last !== prev) {
  console.log('health-log-dedupe: counts changed since the previous run, keeping the new record.');
  process.exit(0);
}

writeFileSync(LOG, lines.slice(0, -1).join('\n') + '\n', 'utf8');
console.log(`health-log-dedupe: new record was identical to the previous one apart from its timestamp, dropped it. ${lines.length - 1} record(s) remain.`);
