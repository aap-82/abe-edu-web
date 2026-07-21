#!/usr/bin/env node
/**
 * Claim and figure cross-check — the two gaps system-health could not close.
 *
 * 1. CODE-CLAIM DRIFT. system-health verifies that a path a skill points at exists. It cannot
 *    verify that what a skill SAYS about the build is true. A skill claiming guardrails require
 *    four JSON-LD nodes when they require three passes every check and misleads every run. This is
 *    the repeat risk the mistakes log has recorded three times, so a subset of the highest-value
 *    claims is checked literally: each CLAIM below names a string the docs assert and a pattern
 *    that must be present in the source for the assertion to hold.
 *
 * 2. FIGURE CONTRADICTION. A dollar figure on a page must exist in kb/register/. A page can state
 *    $477.47 while the register says $493.59 and nothing notices, because guardrails check price
 *    parity against frontmatter, not against the register. That is exactly how a superseded fee
 *    ships. Every figure in page content is matched against the register, and anything unmatched
 *    is reported.
 *
 * Both checks skip with a note when their source is absent (running outside the repo).
 * Reporting only — exits 0 unless --strict.
 */

import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const STRICT = process.argv.includes('--strict');
const fails = [], warns = [], oks = [];
const walk = (d, ext, out = []) => {
  if (!existsSync(d)) return out;
  for (const e of readdirSync(d)) {
    const p = join(d, e);
    statSync(p).isDirectory() ? walk(p, ext, out) : (e.endsWith(ext) && out.push(p));
  }
  return out;
};

/* ---- 1. Code-claim drift ------------------------------------------------ */
/* Each entry: what the docs assert, the file that proves or disproves it, and the pattern that
   must appear there. Add an entry whenever a skill starts asserting something about the code. */
const CLAIMS = [
  { claim: 'authorityModel enum has exactly these three values',
    source: 'content.config.ts',
    must: [/state-approved-direct/, /knowledge-requirement/, /asqa-accredited/] },
  { claim: 'four content collections are exported',
    source: 'content.config.ts',
    must: [/collections\s*=\s*\{[^}]*courses/, /experts/, /partners/, /hubs/] },
  { claim: 'experts collection loads .md, not .mdx',
    source: 'content.config.ts',
    must: [/experts['"]?\s*,?[\s\S]{0,200}pattern:\s*['"]\*\*\/\*\.md['"]/] },
  { claim: 'course pages require Course + EducationalOccupationalCredential + BreadcrumbList',
    source: 'guardrails.ts',
    must: [/'Course',\s*'EducationalOccupationalCredential',\s*'BreadcrumbList'/] },
  { claim: 'non-course pages require only BreadcrumbList',
    source: 'guardrails.ts',
    must: [/isCourse[\s\S]{0,400}BreadcrumbList/] },
  { claim: 'every component needs a styleguide specimen or an exemption',
    source: 'guardrails.ts',
    must: [/SG_EXEMPT/, /styleguide specimen/] },
];
const findSource = (name) => ['.', 'src', 'src/integrations', 'integrations', 'src/lib']
  .map((d) => join(d, name)).find((p) => existsSync(p));

let checked = 0;
for (const c of CLAIMS) {
  const path = findSource(c.source);
  if (!path) { warns.push(`Claim unchecked (${c.source} not found here): ${c.claim}`); continue; }
  const src = readFileSync(path, 'utf8');
  const missing = c.must.filter((re) => !re.test(src));
  checked++;
  if (missing.length) fails.push(`CLAIM DRIFT — docs assert "${c.claim}" but ${path} does not support it (${missing.length} pattern(s) absent). Read the source and correct the docs.`);
}
if (checked) oks.push(`Code claims: ${checked - fails.length}/${checked} verified against source`);

/* ---- 2. Figure contradiction -------------------------------------------- */
const REGISTER = 'kb/register';
if (!existsSync(REGISTER)) warns.push('kb/register not found — figure cross-check skipped');
else {
  const registerText = walk(REGISTER, '.md').map((f) => readFileSync(f, 'utf8')).join('\n');
  const registerFigures = new Set([...registerText.matchAll(/\$([\d,]+(?:\.\d{2})?)/g)].map((m) => m[1].replace(/,/g, '')));
  // Figures the register explicitly marks as superseded must never appear in content.
  const superseded = new Set([...registerText.matchAll(/supersedes?\s+\$([\d,]+(?:\.\d{2})?)|\$([\d,]+(?:\.\d{2})?)[^.\n]{0,80}must not be published/gi)]
    .map((m) => (m[1] ?? m[2] ?? '').replace(/,/g, '')).filter(Boolean));

  const contentFiles = [...walk('src/content', '.mdx'), ...walk('src/content', '.md')];
  if (!contentFiles.length) warns.push('No src/content pages found — figure cross-check skipped (run from the repo root)');
  else {
    let seen = 0, bad = 0;
    for (const f of contentFiles) {
      const src = readFileSync(f, 'utf8');
      for (const m of src.matchAll(/\$([\d,]+(?:\.\d{2})?)/g)) {
        const fig = m[1].replace(/,/g, '');
        if (Number(fig) < 20) continue;               // small numbers are rarely regulator fees
        seen++;
        if (superseded.has(fig)) { bad++; fails.push(`SUPERSEDED FIGURE $${m[1]} in ${f} — the register marks this as replaced. Do not publish it.`); }
        else if (!registerFigures.has(fig)) { bad++; warns.push(`Figure $${m[1]} in ${f} does not appear anywhere in kb/register/. Either it is an ABE price (fine, ignore) or it is an unverified government figure (not fine).`); }
      }
    }
    oks.push(`Figures: ${seen - bad}/${seen} page figures match the register`);
  }
}

for (const [l, xs] of [['FAIL', fails], ['WARN', warns], ['OK', oks]]) for (const m of xs) console.log(`  ${l.padEnd(5)} ${m}`);
console.log(`\n  ${fails.length} failing, ${warns.length} warning, ${oks.length} ok`);
if (fails.length && STRICT) process.exit(1);
