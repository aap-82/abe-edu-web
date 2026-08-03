#!/usr/bin/env node
/**
 * Position cross-check — the gap check-claims.mjs's figure reconciliation cannot close.
 *
 * check-claims.mjs reconciles FIGURES: a dollar amount on a page must exist in kb/register/, or
 * it is reported. Nothing reconciled POSITIONS — a page's claim about delivery mode, authority
 * model or "nationally recognised" status can drift from the register that is supposed to govern
 * it, and nothing noticed. Three defects proved the gap, each surviving a green build, 21/21
 * guardrails, `check-claims` 0 failing and an independent Stage-7 audit:
 *
 *   - `/white-card-nsw` shipped "SafeWork NSW's live general conditions define connected delivery
 *     and permit it" — the regulator's own published GIT conditions do not grant that (cl. 1(q)
 *     prohibits distance/on-line learning outright). Closed 2 Aug 2026 as a recorded business
 *     exemption, not a copy correction — the delivery mode is now stated as the RTO's own, never
 *     SafeWork NSW's. See kb/register/online-delivery-policy-by-state.md §2A / §2A-1.
 *   - `SiteHeader.astro`'s NSW Owner Builder nav card said "Nationally recognised, with our RTO
 *     partner" for a product on an authority hold, on 17 built pages at once, 13 of them
 *     index,follow. Closed 2 Aug 2026 (skill-reviews/design/2026-08-02-siteheader-nsw-claim.md) —
 *     the review that named this check, because nothing else could have caught it: guardrails.ts
 *     deliberately excises the whole `<header>` from every page it audits, to avoid flagging the
 *     White Card group's TRUE claim when it renders on an Owner Builder page. That means it can
 *     structurally never see a WRONG claim IN the header's own source either.
 *   - `/white-card-tas` (plus its FAQ, plus its OWN SiteHeader nav card, plus two comparison
 *     mentions on `/white-card-nsw`) states the self-paced option is open to "Tasmanian residents
 *     only" — unsourced. WorkSafe Tasmania's own words are "completed in Tasmania" (a location
 *     condition, not a residency test) and the WHS Regulations 2022 (Tas) impose no delivery-mode
 *     restriction at all. See kb/register/online-delivery-policy-by-state.md §2D / §3.
 *     **Still live at the time this check was written — this is the instance that proves it.**
 *
 * Two mechanisms, both source-level, reporting only (never edits kb/register/, kb/rules/ or
 * src/content/** — those are facts- and build-owned):
 *
 * 1. POSITIONS — hand-curated banned-phrase entries, same shape as check-claims.mjs's superseded
 *    White Card unit code and bare-"ABE" checks: a literal to watch for, the register assertion it
 *    contradicts, and why. Scanned across every reader-facing source tree, INCLUDING
 *    src/components — deliberately wider than guardrails.ts's own authority check (see above).
 *
 * 2. SiteHeader nav authority parity — guardrails.ts's FORBIDDEN_BY_AUTHORITY, re-applied to
 *    SiteHeader.astro's own nav data by authority model, for the one place that check structurally
 *    cannot reach. Duplicated rather than imported: guardrails.ts audits built HTML as an Astro
 *    integration; this is a plain source scan, and the two banned-phrase sets drifting apart is a
 *    smaller risk than coupling a skills-owned script to a file the session-types table has not
 *    assigned (ROADMAP's unassigned-path list).
 *
 * Both mechanisms skip HTML/JS/TS comment lines: a line explaining a banned position (a rule
 * doc's worked "don't", a code comment recording why a fix landed) is not the position itself.
 * check-claims.mjs's RETIRED_UNIT and BANNED_CTAS checks earn the same allowance a different way
 * (an explanatory-window regex); a straight comment-line exemption is enough here because every
 * false positive found while drafting this check was a whole comment line, not prose that both
 * asserts and explains in the same breath.
 *
 * Reporting only — exits 0 unless --strict, same contract as check-claims.mjs.
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { slugArg, bySlug, slugNote } from './lib/slug-filter.mjs';

const STRICT = process.argv.includes('--strict');
const SLUG = slugArg();
const fails = [], warns = [], oks = [];

const walk = (d, ext, out = []) => {
  if (!existsSync(d)) return out;
  for (const e of readdirSync(d)) {
    const p = join(d, e);
    statSync(p).isDirectory() ? walk(p, ext, out) : (e.endsWith(ext) && out.push(p));
  }
  return out;
};
const isComment = (l) => /^\s*(\/\/|\*|\/\*|#|<!--)/.test(l);

/* ---- 1. Delivery-mode positions, hand-curated --------------------------- */
/* Add an entry whenever a facts session re-verifies a state's delivery-mode row and the register
   records a wrong or unsourced framing that reader-facing copy could repeat. Each `banned` pattern
   was checked against every current occurrence in src/ before being written, specifically to rule
   out the negated/explanatory form: WA and NSW's own pages both correctly say what the test is
   NOT ("Being a Western Australian resident is not the test", "There is no public [confirmation]
   that SafeWork NSW accepts... live video as face-to-face"), and a pattern that fired on those
   would be exactly the false positive that makes a check stop being read. */
const POSITIONS = [
  {
    id: 'tas-online-residency',
    registerSource: 'kb/register/online-delivery-policy-by-state.md §2D (and §3, "apply this")',
    correction: 'WorkSafe Tasmania\'s own wording is that GCIT must be "completed in Tasmania" — a '
      + 'location condition, not a residency test — and the WHS Regulations 2022 (Tas) impose no '
      + 'delivery-mode restriction on top of that at all. No regulator source supports a '
      + 'Tasmanian-residency test for the self-paced online option, on this page or as a comparison '
      + 'point on another state\'s.',
    banned: [/Tasmanian\s+residents?\b/i, /resident\s+of\s+Tasmania\b/i, /evidence\s+(?:your|of)\s+residency\b/i],
  },
  {
    id: 'wa-online-residency-shorthand',
    registerSource: 'kb/register/online-delivery-policy-by-state.md §2B',
    correction: 'WorkSafe WA\'s own condition is that the candidate be "located in Western Australia '
      + 'at the time of the assessment" — a presence-and-nexus test (a WA postal address alone '
      + 'satisfies it; a WA resident sitting the assessment interstate does not). The register '
      + 'carried the "WA residents" shorthand until 1 Aug 2026 — do not reintroduce it.',
    banned: [/\bWA residents?\b/i],
  },
  {
    id: 'nsw-online-misattribution',
    registerSource: 'kb/register/online-delivery-policy-by-state.md §2A / §2A-1',
    correction: 'SafeWork NSW\'s published GIT conditions (cl. 1(q)) prohibit distance and on-line '
      + 'learning; its General Conditions permit Connected delivery only where the Specific '
      + 'Conditions provide for it, which they do not for GIT. ABE\'s NSW course is delivered as a '
      + 'trainer-led virtual classroom by Upskill Institute under a recorded business exemption '
      + '(§2A-1) — state the mode as the RTO\'s own, and never attribute it to SafeWork NSW.',
    banned: [/SafeWork NSW\b[^.]{0,100}\b(?:permit|permits|allow|allows|accept|accepts|provide for|provides for|define[sd]?)\b[^.]{0,80}\b(?:online|connected|distance|virtual|self-paced)\b/i],
  },
];

const SCAN_DIRS = ['src/content', 'src/data', 'src/components', 'src/pages'];
const SCAN_EXT = ['.md', '.mdx', '.ts', '.astro'];

for (const pos of POSITIONS) {
  const hits = [];
  for (const dir of SCAN_DIRS) for (const ext of SCAN_EXT) for (const f of walk(dir, ext)) {
    readFileSync(f, 'utf8').split('\n').forEach((line, i) => {
      if (isComment(line)) return;
      if (pos.banned.some((re) => re.test(line))) hits.push(`${f}:${i + 1}`);
    });
  }
  if (hits.length) {
    fails.push(`POSITION CONTRADICTS REGISTER (${pos.id}) in ${hits.length} place(s): ${hits.slice(0, 8).join(', ')}${hits.length > 8 ? ' ...' : ''}. ${pos.registerSource} — ${pos.correction}`);
  } else {
    oks.push(`Position ${pos.id}: no contradiction of ${pos.registerSource} found`);
  }
}

/* ---- 2. Nav data authority parity ----------------------------------------- */
/* guardrails.ts's FORBIDDEN_BY_AUTHORITY, applied here to the one source it structurally excludes
   from its own scan. The White Card group is skipped outright: it is the asqa-accredited group,
   so "nationally recognised" / "RTO partner" is its TRUE claim (guardrails.ts's own comment says
   so), and mechanism 1 above already reaches the one wrong claim that group's TAS card carries.
   Everything else in the nav (Owner Builder, CPD Courses, CPD Bundles) is state-approved-direct or
   knowledge-requirement at best, never asqa-accredited, so none of it may claim RTO / nationally
   recognised / Statement of Attainment — and WA Owner Builder specifically may not claim an
   "approved course/provider" or a licence/permit, because no approved owner-builder course exists
   in WA at all (CLAUDE.md's authority model).

   Reads `src/data/nav.ts`, not `SiteHeader.astro` — repointed 4 Aug 2026 in the same commit that
   split the nav DATA out of the component (see that file's own header comment and
   `skill-reviews/skills/2026-08-04-siteheader-nav-split.md`). Before that split this constant
   pointed at the component directly; had this check not been repointed in the same change, it
   would have kept reading a file with no nav literals left in it and silently reported a clean
   0-hit OK forever after — a check that has stopped looking is worse than no check, because it
   still prints green. */
const NAV_DATA = 'src/data/nav.ts';
if (!existsSync(NAV_DATA)) {
  warns.push(`${NAV_DATA} not found — nav authority parity unchecked (run from the repo root)`);
} else {
  // Only WA is knowledge-requirement among today's Owner Builder codes; every other code in that
  // group (including one not yet built, like NSW) defaults to the state-approved-direct list below,
  // which is the safe default: it is a subset of the knowledge-requirement list, so a code this
  // map does not name is held to the STRICTER position, never a looser, assumed one.
  const OB_KNOWLEDGE_REQUIREMENT = new Set(['WA']);

  const CONSERVATIVE = [
    { re: /\bRTO\b(?!\s*partner)/i, why: 'bare "RTO" claim' },
    { re: /nationally recognised/i, why: '"nationally recognised" claim' },
    { re: /statement of attainment/i, why: '"Statement of Attainment" claim' },
  ];
  const KNOWLEDGE_EXTRA = [
    { re: /\bapproved (course|provider)\b/i, why: '"approved course/provider" claim — WA has no approved owner-builder course' },
    { re: /owner[- ]builder (licence|license|permit)/i, why: 'owner-builder "licence/permit" claim — WA\'s step is an approval, not a licence' },
  ];

  const lines = readFileSync(NAV_DATA, 'utf8').split('\n');
  let group = null;
  const hits = [];
  lines.forEach((line, i) => {
    // Only the group's OWN label is a standalone `label: '...'` line; the nested `hub: { label:
    // '...', ... }` line starts with `hub:`, so the anchor below cannot mistake one for the other.
    const g = line.match(/^\s*label:\s*'([^']+)',\s*$/);
    if (g) { group = g[1]; return; }
    if (group === 'White Card' || group === null) return;

    const item = line.match(/code:\s*'([A-Z]+)'.*?desc:\s*'([^']*)'/);
    const feat = !item && /feature:/.test(line) ? line.match(/body:\s*'([^']*)'/) : null;
    const text = item?.[2] ?? feat?.[1];
    if (text == null) return;

    const banned = group === 'Owner Builder' && OB_KNOWLEDGE_REQUIREMENT.has(item?.[1])
      ? [...CONSERVATIVE, ...KNOWLEDGE_EXTRA]
      : CONSERVATIVE;
    for (const b of banned) {
      if (b.re.test(text)) hits.push(`${NAV_DATA}:${i + 1} [${group}${item ? ' ' + item[1] : ' feature'}] ${b.why} — "${text}"`);
    }
  });

  if (hits.length) {
    fails.push(`Nav data asserts an authority claim outside the group that may make it — ${hits.length} place(s): ${hits.slice(0, 6).join('; ')}${hits.length > 6 ? ' ...' : ''}. kb/rules/authority-model.md — Owner Builder and CPD nav entries are state-approved-direct or knowledge-requirement products, never asqa-accredited, and guardrails.ts cannot see this because it excises <header> from every page it audits.`);
  } else {
    oks.push('Nav data: no Owner Builder/CPD entry claims RTO, nationally recognised, Statement of Attainment, an approved course/provider, or an owner-builder licence/permit');
  }
}

let slugShown = 0;
for (const [l, xs] of [['FAIL', fails], ['WARN', warns], ['OK', oks]]) {
  const keep = bySlug(xs, SLUG);
  slugShown += keep.length;
  for (const m of keep) console.log(`  ${l.padEnd(5)} ${m}`);
}
if (SLUG) console.log(slugNote(SLUG, slugShown, fails.length + warns.length + oks.length));

console.log(`\n  ${fails.length} failing, ${warns.length} warning, ${oks.length} ok`);
if (fails.length && STRICT) process.exit(1);
