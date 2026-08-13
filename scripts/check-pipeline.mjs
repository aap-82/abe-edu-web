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
import { slugArg, bySlug, slugNote } from './lib/slug-filter.mjs';

const PIPELINE = 'pipeline';
const DIST = 'dist';
const STRICT = process.argv.includes('--strict');
const SLUG = slugArg();

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

/** Slugs whose conformance checks were skipped because there is no built page to compare against.
 *  A Set, so a slug skipped by both loops counts once: the unit is pages, not loop iterations.
 *
 *  WHY THIS IS TRACKED AT ALL. Both loops below `continue` when `dist/{slug}/index.html` is absent,
 *  and until 13 Aug 2026 they did it in silence: the script still printed a summary line, so an
 *  environment where it compared NOTHING was indistinguishable from one where everything passed.
 *  `health.yml` ran `system-health` without building for weeks and 25 assertions quietly did not
 *  run — 18 OK and 7 WARN — and the only visible trace anywhere was that the CI health record never
 *  matched a local one. Nobody was going to notice that, and nobody did for weeks.
 *
 *  A zero from a set-scoped check is its least trustworthy output. This makes the check say how
 *  much of its own scope it actually covered. */
const noBuild = new Set();

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
  if (!existsSync(built)) noBuild.add(slug);
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
  if (!existsSync(built)) noBuild.add(slug);
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

// ---------------------------------------------------------------------------------------------
// 5 . VERIFICATION SCOPE. A verification's scope is part of what it certifies.
//
// Stage 7 mandates three sub-skill audits by name. On the cpd-building-tas run the fresh subagent
// did the structural, schema, authority and pipeline checks, silently omitted all three, and still
// certified GREEN; the omission surfaced only because the person asked, and running them then found
// a real page defect (an ASQA disclosure block at ~135 CPL). See kb/mistakes-log.md #14.
//
// It then recurred. The demand lists of cpd-building-tas, white-card-tas, white-card-wa and the WA
// readability review each filed it — FOUR occurrences, the most-repeated item in the whole review
// corpus — while #14's guard stayed prose, and prose is what row 18 of the same log says is not a
// method change. This is that item finally getting a mechanism.
//
// WHAT IS ASSERTED, and what deliberately is not. Only that each audit is NAMED in 07. That is the
// difference between an audit considered and an audit forgotten, and it is the whole of the failure:
// every 07 that names them dispositions them honestly, either with a section of measured findings or
// under a "Not run, and why" heading with a reason. Whether the reason is GOOD is a human judgement
// and is left to one - a check that tried to grade the reason would be guessing. What no human was
// reliably doing is noticing a name that is simply absent, which is mechanical, so that is the part
// mechanised. Absence of a check must be as loud as a failed one.
// ---------------------------------------------------------------------------------------------
const REQUIRED_AUDITS = ['abe-readability-audit', 'final-check', 'ai-detector'];

for (const slug of slugs) {
  const vdir = join(PIPELINE, slug);
  const ver = readdirSync(vdir).find((f) => f.startsWith('07-'));
  if (!ver) continue;                       // artefact completeness is check 1's job, not this one
  const src = readFileSync(join(vdir, ver), 'utf8');
  const missing = REQUIRED_AUDITS.filter((a) => !src.includes(a));
  if (missing.length) {
    fails.push(slug + ': 07 never names ' + missing.length + ' mandated audit(s): ' + missing.join(', ') +
      '. Stage 7 must report every required audit as run-or-not - a GREEN with one absent is a FAIL, not a pass. ' +
      'If it was deliberately skipped, say so and why under a "Not run, and why" heading; that is a disposition and it passes.');
  } else {
    oks.push(slug + ': 07 dispositions all ' + REQUIRED_AUDITS.length + ' mandated audits');
  }
}


/* Coverage, reported rather than assumed. Two distinct conditions, because they mean different
   things and want different responses:
     - no dist/ at all      the caller forgot to build, or is an environment that never does. Every
                            conformance assertion in this script is absent. This is the health.yml
                            case and it is the loud one.
     - dist/ but no page    a page in the pipeline that has not shipped yet. Normal and expected
                            mid-build; worth naming so the count is honest, not worth alarm. */
if (!existsSync(DIST)) {
  warns.push(
    `No ${DIST}/ directory, so NONE of the section- or capsule-conformance checks ran — only artefact ` +
    `presence and Stage-7 dispositions did, and this script's "0 failing" says nothing about ` +
    `brief-to-page drift. Run \`npm run build\` first. (${slugs.length} pipeline slug(s) uncovered.)`,
  );
} else if (noBuild.size) {
  warns.push(
    `${noBuild.size} pipeline slug(s) have no built page in ${DIST}/, so their section and capsule ` +
    `conformance was not checked: ${[...noBuild].sort().join(', ')}. Expected for a page still in ` +
    `progress; a surprise for one that has shipped.`,
  );
}

console.log('=== Pipeline conformance ===\n');
const shown = [bySlug(fails, SLUG), bySlug(warns, SLUG), bySlug(oks, SLUG)];
for (const f of shown[0]) console.log(`  FAIL  ${f}`);
for (const w of shown[1]) console.log(`  WARN  ${w}`);
for (const o of shown[2]) console.log(`  OK    ${o}`);
if (SLUG) console.log(slugNote(SLUG, shown.flat().length, fails.length + warns.length + oks.length));
console.log(`\n  ${fails.length} failing, ${warns.length} warning, ${oks.length} ok`);

if (fails.length && STRICT) process.exit(1);
