#!/usr/bin/env node
// Generates public/_redirects from redirects.csv (W0-7). The CSV stays the single
// source of truth; this script is the only thing that writes public/_redirects, so
// never hand-edit that file.
//
// redirects.csv holds the full signed-off map (W1-6, 19 Jul 2026), not the Wave 0 spike
// sample this comment used to describe. Both W0-9 CONFIRM flags are resolved.
//
// This runs automatically as npm `prebuild`, so public/_redirects cannot drift from the
// CSV just because someone forgot to regenerate it. `postbuild` then runs
// scripts/check-redirect-targets.mjs, which asserts every internal target actually
// resolves to a page - a separate assertion from the map being well-formed.
//
// Canonical URL form is no-slash (CLAUDE.md "Canonical URL form"). Rules:
//   redirect / retire  -> emit BOTH the no-slash and the /slash legacy variant, each a
//                          direct 301 to the no-slash target, so every legacy form is
//                          one hop.
//   redirect-to-learnworlds -> emit the row's legacy_path and target as-is: they are
//                          already in Cloudflare's wildcard/:splat _redirects syntax.
//   rebuild (same slug)     -> no rule at all. drop-trailing-slash already serves the
//                          no-slash equity URL as a direct 200; that is the whole point
//                          of the no-slash decision (R2), not something to redirect.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const CSV_PATH = join(ROOT, 'redirects.csv');
const OUT_PATH = join(ROOT, 'public/_redirects');

// Minimal CSV line parser: handles double-quoted fields with embedded commas, no
// embedded newlines (redirects.csv rows are always single-line).
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
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      fields.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  fields.push(cur);
  return fields;
}

const lines = readFileSync(CSV_PATH, 'utf8').split('\n').filter((l) => l.trim());
const [header, ...rows] = lines.map(parseCsvLine);
const col = (row, name) => row[header.indexOf(name)];

const out = [
  '# GENERATED FILE - do not hand-edit. Source of truth is redirects.csv at the repo',
  '# root; run `node scripts/generate-redirects.mjs` to regenerate.',
  '',
];

for (const row of rows) {
  const legacyPath = col(row, 'legacy_path');
  const action = col(row, 'action');
  const target = col(row, 'target');
  const notes = col(row, 'notes');

  out.push(`# ${legacyPath} -> ${target} (${action}) - ${notes}`);

  if (action === 'redirect' || action === 'retire') {
    out.push(`${legacyPath} ${target} 301`);
    out.push(`${legacyPath}/ ${target} 301`);
  } else if (action === 'redirect-to-learnworlds') {
    out.push(`${legacyPath} ${target} 301`);
  } else if (action === 'rebuild') {
    out.push(`# no rule: same-slug rebuild, drop-trailing-slash serves it 200 unchanged`);
  } else {
    throw new Error(`redirects.csv: unknown action "${action}" for ${legacyPath}`);
  }
  out.push('');
}

writeFileSync(OUT_PATH, out.join('\n'));
console.log(`Wrote ${OUT_PATH} from ${rows.length} row(s) in redirects.csv.`);
