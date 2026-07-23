#!/usr/bin/env node
/**
 * Pipeline conformance check.
 *
 * WHY THIS EXISTS. On the cpd-building-tas run a section was briefed at Stage 3, written at Stage 4
 * with its own H2, and then lost on the way to the page, ending up as a stray paragraph inside a
 * neighbouring section. Nothing noticed. The build was green, the guardrails passed, `check-claims`
 * reported 150/150, and an independent grader read the artefacts without catching it either. The
 * defect was found by a person reading the page, weeks of work later.
 *
 * The cause was a missing artefact rather than a missing rule: `05-components.md` is the only thing
 * that maps briefs onto sections, and it had never been written. So this script asserts the two
 * things that would have caught it mechanically:
 *
 *   1. ARTEFACT COMPLETENESS. pipeline/{slug}/ holds 01 through 07. A missing file is a stage that
 *      did not happen, whatever the page looks like.
 *   2. SECTION CONFORMANCE. Every section id in 05-components.md's table appears in
 *      dist/{slug}/index.html, and every section in the built page appears in the table. A merge or
 *      a reorder is fine; a section that exists in one and not the other is drift.
 *
 * Both directions matter. A missing section is content the reader was promised and did not get; an
 * unlisted section is content nobody planned, which is how a page grows shapes the briefs never
 * asked for.
 *
 * SCOPE. Only pages that have a pipeline directory are checked. Pages built before the pipeline
 * existed are skipped rather than reported, because a check that cries wolf gets scrolled past.
 *
 * Exit 0 unless --strict. Prints FAIL/WARN/OK in the house format so system-health can aggregate.
 */

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

const PIPELINE = 'pipeline';
const DIST = 'dist';
const STRICT = process.argv.includes('--strict');

/** The artefact set. Keyed by prefix so a renamed suffix still matches. */
const REQUIRED = [
  ['01', 'source map + fact ledger'],
  ['02', 'keyword and gap analysis'],
  ['03', 'section briefs'],
  ['04', 'extended content'],
  ['05', 'section plan / brief-to-section map'],
  ['06', 'image-generation prompts'],
  ['07', 'pre-deploy verification'],
];

const fails = [];
const warns = [];
const oks = [];

if (!existsSync(PIPELINE)) {
  console.log('No pipeline/ directory. Nothing to check.');
  process.exit(0);
}

const slugs = readdirSync(PIPELINE, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

for (const slug of slugs) {
  const dir = join(PIPELINE, slug);
  const files = readdirSync(dir);

  // 1 · artefact completeness
  const missing = REQUIRED.filter(([n]) => !files.some((f) => f.startsWith(`${n}-`)));
  if (missing.length) {
    fails.push(`${slug}: missing artefact(s) — ${missing.map(([n, what]) => `${n} (${what})`).join(', ')}`);
  } else {
    oks.push(`${slug}: all 7 artefacts present`);
  }

  // 2 · section conformance, only when both sides exist
  const plan = files.find((f) => f.startsWith('05-'));
  const built = join(DIST, slug, 'index.html');
  if (!plan || !existsSync(built)) continue;

  const planText = readFileSync(join(dir, plan), 'utf8');
  // Section ids in the plan are written as `id` in backticks inside the table. Take backticked
  // tokens that look like an anchor: lowercase, hyphens, no slashes or dots.
  const planIds = new Set(
    [...planText.matchAll(/`([a-z][a-z0-9-]{2,})`/g)]
      .map((m) => m[1])
      .filter((s) => !s.includes('.') && !s.endsWith('-md')),
  );

  const html = readFileSync(built, 'utf8');
  // `top` is the hero's anchor, emitted by Hero.astro as chrome rather than as a content section.
  // It is never planned in 05 and should not be reported as unplanned.
  const CHROME_IDS = new Set(['top']);
  const builtIds = [...html.matchAll(/<section[^>]*\sid="([^"]+)"/g)]
    .map((m) => m[1])
    .filter((id) => !CHROME_IDS.has(id));

  const notOnPage = [...planIds].filter((id) => builtIds.includes(id) === false && html.includes(`id="${id}"`) === false);
  const notInPlan = builtIds.filter((id) => !planIds.has(id));

  // Only report ids the plan clearly meant as sections: an id it names that the page does not have
  // at all. Backticked prose can produce false positives, so a token is only a finding when the
  // plan mentions it in a table row.
  const tableRows = planText.split('\n').filter((l) => l.trim().startsWith('|'));
  const rowIds = new Set(
    [...tableRows.join('\n').matchAll(/`([a-z][a-z0-9-]{2,})`/g)].map((m) => m[1]),
  );
  const realMissing = notOnPage.filter((id) => rowIds.has(id));

  if (realMissing.length) {
    fails.push(`${slug}: section(s) planned in 05 but absent from dist — ${realMissing.join(', ')}`);
  }
  if (notInPlan.length) {
    warns.push(`${slug}: section(s) on the page but not in the 05 plan — ${notInPlan.join(', ')}`);
  }
  if (!realMissing.length && !notInPlan.length) {
    oks.push(`${slug}: ${builtIds.length} section(s) match the plan`);
  }
}

// ---------------------------------------------------------------------------------------------
// 3 · CONTENT CONFORMANCE. Section ids matching is not enough: the page can carry the right
// sections and the wrong words. On cpd-building-tas an overclaim survived in the artefact after
// being corrected on the page, and a paragraph written in the artefact never reached the page at
// all. Both were found by a person reading, weeks of work later.
//
// Compared with figures normalised away, because the artefact writes `{points}` where the page
// renders `12`, and house style spells small numbers out in prose. Anything that is a figure on
// either side becomes the same token, so only the WORDS are compared.
//
// Reports, never fails. Copy legitimately changes after drafting - a compliance correction is a
// real reason for the two to differ - so this surfaces the difference and leaves the judgement to
// a person. That is the honest limit of a mechanical check here.
// ---------------------------------------------------------------------------------------------
const NUM_WORDS = 'one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|twenty|thirty';
const normalise = (s) => s
  .replace(/\{[a-zA-Z][a-zA-Z0-9]*\}/g, ' NUM ')            // artefact placeholders
  .replace(/\$?\d[\d,]*(\.\d+)?/g, ' NUM ')                  // digits and money
  .replace(new RegExp(`\\b(${NUM_WORDS})\\b`, 'gi'), ' NUM ') // spelled-out numbers
  .replace(/[’']/g, "'")
  .replace(/[^a-z0-9' ]/gi, ' ')
  .replace(/\s+/g, ' ')
  .trim()
  .toLowerCase();

for (const slug of slugs) {
  const dir = join(PIPELINE, slug);
  const files = readdirSync(dir);
  const contentFile = files.find((f) => f.startsWith('04-'));
  const built = join(DIST, slug, 'index.html');
  if (!contentFile || !existsSync(built)) continue;

  const md = readFileSync(join(dir, contentFile), 'utf8');
  const html = readFileSync(built, 'utf8');

  // Artefact capsules: the blockquote directly under an "Answer capsule" marker.
  // The marker line can carry trailing notes and wrap over several lines before the blockquote
  // starts, so allow prose between the two rather than requiring them adjacent.
  const mdCapsules = [...md.matchAll(/\*\*Answer capsule[\s\S]{0,500}?\n((?:>[^\n]*\n)+)/g)]
    .map((m) => normalise(m[1].replace(/^>\s?/gm, ' ')))
    .filter(Boolean);

  const pageCapsules = [...html.matchAll(/<p class="capsule[^"]*"[^>]*>([\s\S]*?)<\/p>/g)]
    .map((m) => normalise(m[1].replace(/<[^>]+>/g, ' ')))
    .filter(Boolean);

  // Match each artefact capsule to its closest page capsule by word overlap, then report any that
  // has no close counterpart. Order is not assumed: sections get reordered legitimately.
  const overlap = (a, b) => {
    const A = new Set(a.split(' ')), B = new Set(b.split(' '));
    const inter = [...A].filter((w) => B.has(w)).length;
    return inter / Math.max(A.size, B.size, 1);
  };

  const unmatched = mdCapsules.filter((c) => !pageCapsules.some((p) => overlap(c, p) >= 0.75));
  const orphanPage = pageCapsules.filter((p) => !mdCapsules.some((c) => overlap(c, p) >= 0.75));

  if (unmatched.length || orphanPage.length) {
    if (unmatched.length) {
      warns.push(`${slug}: ${unmatched.length} capsule(s) in 04 with no close match on the page — first: "${unmatched[0].slice(0, 70)}..."`);
    }
    if (orphanPage.length) {
      warns.push(`${slug}: ${orphanPage.length} capsule(s) on the page with no close match in 04 — first: "${orphanPage[0].slice(0, 70)}..."`);
    }
  } else if (mdCapsules.length) {
    oks.push(`${slug}: ${mdCapsules.length} capsule(s) match 04-content.md (figures normalised)`);
  }
}

// ---------------------------------------------------------------------------------------------
// 4 . GATE ORDERING. A verification that runs after the deploy is a report, not a gate.
//
// On the wa-owner-builder-course run, two commits changed a LIVE page and 07-verification.md was
// written 45 minutes after the second one, and was still untracked at grading. The defect the gate
// exists to catch (a review date updated in one file but not another, so the published page
// contradicted itself) reached production and sat live for ~54 minutes. Stage 7 was thorough and
// honest; it simply ran too late to prevent anything. See kb/mistakes-log.md #19.
//
// The invariant enforced here: CONTENT MUST NEVER OUTRUN ITS VERIFICATION.
//   - is 07 committed?                 else the gate is not in version control at all
//   - is the page source no newer?     else the page changed after it was last verified
//
// Commit times, not mtimes: a checkout rewrites mtimes and would make this lie.
// Known limit: only the page's own content file is compared. A change confined to an imported data
// file (src/data/faqs-{state}.ts) will not trip this, which is exactly how the WA review-date defect
// slipped through, so it is stated here rather than left implied.
// ---------------------------------------------------------------------------------------------
const gitTime = (f) => {
  try {
    const o = execSync('git log -1 --format=%ct -- "' + f + '"', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    return o ? parseInt(o, 10) : null;
  } catch { return null; }
};

for (const slug of slugs) {
  const vdir = join(PIPELINE, slug);
  const ver = readdirSync(vdir).find((f) => f.startsWith('07-'));
  if (!ver) continue;
  const verPath = join(vdir, ver);

  const pageFile = [
    join('src', 'content', 'courses', slug + '.mdx'),
    join('src', 'content', 'cpd-bundles', slug + '.mdx'),
    join('src', 'content', 'hubs', slug + '.mdx'),
  ].find((f) => existsSync(f));
  if (!pageFile) continue;

  const verTime = gitTime(verPath);
  const srcTime = gitTime(pageFile);

  if (verTime === null) {
    fails.push(slug + ': 07 is not committed while its page source is. The verification is not in version control, so nothing records that the gate ran before the page shipped.');
  } else if (srcTime !== null && srcTime > verTime) {
    const mins = Math.round((srcTime - verTime) / 60);
    fails.push(slug + ': the page changed ' + mins + ' minute(s) AFTER its last verification (' + pageFile + ' is newer than ' + verPath + '). Re-run Stage 7 before shipping again - a verification that predates the content it certifies has certified nothing.');
  } else {
    oks.push(slug + ': verification is current (07 is no older than the page source)');
  }
}


console.log('=== Pipeline conformance ===\n');
for (const f of fails) console.log(`  FAIL  ${f}`);
for (const w of warns) console.log(`  WARN  ${w}`);
for (const o of oks) console.log(`  OK    ${o}`);
console.log(`\n  ${fails.length} failing, ${warns.length} warning, ${oks.length} ok`);

if (fails.length && STRICT) process.exit(1);
