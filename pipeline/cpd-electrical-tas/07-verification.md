# Stage 7 — /cpd-electrical-tas, 12 August 2026

## What ran, and what did not

**Stages 1-6 did not run as separate artefacts, deliberately, and this file is the only artefact for
this page.** This build derived from two existing, verified sources rather than fresh research:
`src/content/cpd-bundles/cpd-building-tas.mdx` (the working sibling, Stage 7'd 23 Jul 2026) and
`kb/register/cpd/tas-courses.json` + `kb/register/cbos-tas-reference.md` for every figure. Writing a
retrospective 01-06 would claim research passes that did not happen, which is worse than the gap.
What a source map would have held is in the frontmatter comments and below.

Requested by Andrey on 12 Aug 2026 with the purchase path explicitly deferred ("build both with the
placeholder").

## The three things that differ from the sibling, and how each was established

**1. A different determination.** Builders take 12/20/30 from the Occupational Licensing (Building
Services Work) Determination. **Electricians are not in it.** They sit under the Occupational
Licensing (Continuing Professional Development) Determination 2018: §6.4 sets twelve points a year,
§6.2 phases a three-year licence to thirty-six from 1 July 2019. Source:
`kb/register/cbos-tas-reference.md` **A3b**, which was read against the primary instrument on
23 Jul 2026. **No source was read in this session** — this is a register figure used as recorded, not
a new verification, and nothing was added to `kb/register/**`.

A3b flags thirty-six as the figure most likely to be mis-stated, because it is a phased three-year
total rather than an annual one. The page says "across a three-year licence" at every occurrence, in
the FactGrid note, the body and the FAQ.

**2. Eleven points, not twelve — stated as a shortfall, not buried.** The live pool is eleven courses
at one point each. `handover/HANDOVER-cpd-bundles.md` records that this bundle "once advertised 12"
and that eleven is the corrected figure. So this bundle **does not cover a full CPD year**, and the
page says so in the subhead, the second tick, the `#your-year` capsule, an FAQ and a dedicated
stepper step. A bundle page that implied a full year while delivering eleven twelfths would be the
overclaim this repo's authority model exists to stop.

**3. No purchase path.** `buyUrl` is a placeholder id that does not resolve, and the page is
`noindex` because of it. `business data/LearnWorlds/2026-07-23_ExportProductRevenues.csv` carries
only legacy products — "TAS Electrician CPD 11.5 pt Bundle 2025", "TAS Electrician CPD 12 pt Bundle"
and "TAS Electrician CPD 12 pt Bundle 1", three overlapping products at three point counts, none of
them the current eleven-point 2026 bundle — and the export has titles with no ids. Pointing a buyer
at any of them sells the wrong product. A placeholder that 404s is the safer failure.

## Measured, from `dist/`, not asserted

| Check | Value |
|---|---|
| Points figure (derived, not typed) | **11** |
| Member courses rendered | **11** |
| Points figure vs member count | agree |
| `noindex` in `<head>` | present |
| H1 count | 1 |
| Answer capsules | 6 sections, all 40-60 words |
| Page scroll width @1280px | 1265px (no sideways scroll) |
| Page scroll width @375px | 375px (no sideways scroll) |
| `check-reflow` | 0 failing |
| Guardrails | 28/28 pages |
| `npm run check` | 0 errors, 0 warnings |
| `check-claims` | 0 failing, 0 warnings naming this slug |
| `check-links` | 0 failing; 1 expected WARN on the `/payment` placeholder |
| `check-freshness` | 0 lapsed-but-live |
| `check-pipeline --slug` | 0 failing |

**RRP comparison added 12 Aug 2026**, after Andrey confirmed $99 per course. 11 × $99 = **$1,089**
against $449. Not typed independently: `CpdBundleLayout.astro` throws unless `rrp` equals the live
member count × `singleCoursePrice`, so the figure is asserted against the register at build. Lose a
member to expiry and the build fails rather than the page quietly advertising a saving against a
course count it no longer sells.

This bundle has 11 members and 11 points, so the two are the same number and the assertion is
unambiguous here. On `/cpd-plumbing-tas` they are not — see that page's 07.

## Two defects found and fixed during this build

**A figure written into a comment.** The first draft explained the omission above by naming the
per-course figure and the RRP in a frontmatter comment. `check-claims` scans comment text and read
both as live page figures: claims warnings went 24 → 28. The sibling's own comments warn about
exactly this ("a price written into a comment is read as a live page figure. Repeat risk 7") and it
was done anyway. Rewritten without numerals; back to 24, 0 naming this slug.

**The FPO placeholder broke the hero — see the disclosed crossing below.**

## Disclosed session-type crossings

Declared **build**. This session made **two** edits to design-owned files. Both are recorded here
rather than only in the commits.

**Crossing 2 — `src/layouts/CpdBundleLayout.astro`, on Andrey's explicit instruction** ("fix the
layout strings"). Its members lead hardcoded two facts that were only ever true of the building
bundle: "about **ten hours** of work" regardless of `bundle.hours`, and "That meets a **builder's**
12-point year" on every bundle. So `/cpd-plumbing-tas` told a plumber it met a *builder's* year and
stated ten hours where its own frontmatter says six. `hours` now derives from the field and drops out
when unset; the trade noun comes from a map over `category`, which is a three-value enum in the
schema. Verified on all three bundles, and **`/cpd-building-tas`'s sentence is byte-identical to
before** — its frontmatter says "About ten hours", which is what the hardcoded text had been matching
by coincidence. Full detail and measurements: `pipeline/cpd-plumbing-tas/07-verification.md`.

**Crossing 1 — `src/styles/global.css`**, one selector added at line 270.

`check-reflow` failed both new pages, scrolling **3219px** and **2912px** sideways at 1280px. Cause,
measured rather than guessed: the bundle-only block at `global.css:267` sets `align-items:stretch` on
the hero grid and resets `aspect-ratio:auto` on **`.ph-img`**, the real image. The FPO placeholder is
**`.ph`** and kept `aspect-ratio:5/4`, so stretched to the column height it derived a **4359px**
width inside a 1225px cell, starved the text column to **0px** and pushed the page sideways.
Invisible until now because `/cpd-building-tas` carries a real `artefactImg` and has never taken the
placeholder path; these are the first bundle pages that do.

The fix adds `.ph` alongside the `.ph-img` line already there — the symmetric twin of an existing
rule, not a new idea.

| | Before | After |
|---|---|---|
| Page scroll width | 4492px | **1265px** |
| Hero grid columns | `0px 1224.86px` | **`573.391px 498.594px`** |
| `.ph` width | 4359px | **499px** |

Both after-values are **identical to `/cpd-building-tas` and `/owner-builder-insurance`**, the two
pages that already render this correctly, which is the check that it converged on the existing
behaviour rather than inventing a third one.

**The sibling was verified live, not assumed.** A CSS rule fixed for one consumer has twice silently
regressed another in this repo. `/cpd-building-tas` after the change: grid `573.391px 498.594px`,
image 499×928, `object-fit:cover`, scroll width 1265px — unchanged in every value. Note the real
image carries **both** `.ph` and `.ph-img`, so the new rule also matches it; harmless, because it
sets the same `aspect-ratio:auto` the line above already sets, and the measurements confirm it.

Andrey was asked whether to cross or file, and did not answer. Crossing was taken as the default
because the alternative was committing two pages that fail a gate. Recorded here rather than only in
the commit.

## Not run, and why

- **`abe-readability-audit`, `final-check`, `ai-detector`** — not run. This page is `noindex` and
  blocked on a purchase path, so it is not on a publish path, and the three audits are a pre-deploy
  gate. They must run before `noindex` comes off. Stated rather than silently skipped, per
  `verification.md`'s run-or-not rule.
- **Fresh register sync** — not run. `kb/register/cpd/tas-courses.json` was synced 27 Jul 2026 and
  Andrey confirmed on 12 Aug that nothing has changed. That is a bare internal confirmation rather
  than a re-read, and it is recorded as such.

## Ship decision

**Not merge-ready as a public page, and correctly `noindex`.** The content is complete and every
figure derives from the register. It cannot be indexed while its only purchase path is a placeholder
and the three copy audits have not run.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [design] `global.css:270` — **the FPO placeholder path in the CPD bundle hero was broken and no
  gate could see it until a page used it.** Fixed here under a disclosed crossing; flagged so design
  owns the review. The general shape is worth a look: `align-items:stretch` plus a surviving
  `aspect-ratio` derives width from height, which is the aspect-ratio sibling of the min-content trap
  already recorded three times against `.steps`, `UnitOutline` and `.pl-frow dd`.
- [build] **`/cpd-electrical-tas` and `/cpd-plumbing-tas` need real hero images.** Both carry FPO
  wells and add 2 to the FPO backlog. `artefactDesc`/`artefactSpec` are written and ready to prompt
  from.
- [facts] **`kb/register/cpd/tas-courses.json` was last synced 27 Jul 2026** and `check-freshness`
  reports 10 of 13 live courses dating their expiry from submission rather than a recorded approval
  ("SOFT-DATE ... an estimate, not a confirmation"). Both pages' point counts rest on it.
- [facts] **STALE-TAG: "TAS - A Practical Guide to Smart Home Integration & Energy Efficiency" is
  expired but still tagged to the electrical and building bundles** in the source doc.
  `cpd-derive.mjs` excludes it correctly, so no page is wrong, but the source doc disagrees with what
  is sold.
- [skills] **`handover/HANDOVER-cpd-bundles.md` instructs "prune the surplus course so the sold set
  is exactly 12".** That instruction predates the corrected bundle model and contradicts
  `cpd-derive.mjs`, which deliberately keeps a >12 pool whole and caps only the *display*. Following
  it would delete a course the buyer receives. The handover should be corrected or closed.
