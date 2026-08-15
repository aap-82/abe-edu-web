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


---

## Re-verification, 12 Aug 2026 — step bodies split into two-item lists

**Structural only. No word of copy changed on this page.**

The Stepper now renders a step body as a bordered card with the bullets removed and the FIRST list
item in `--ink` at 600, the rest in `--ink-3`. That emphasis can only apply where the body is an
array, because that is what renders as separate `<li>` elements; a single-string body renders as one
`<p>` with nothing to promote. 3 steps on this page carried two sentences in one
string and were split on the existing sentence boundary:

  - "Get the bundle"
  - "Work through them in any order"
  - "Find your twelfth point"

**The split is mechanical.** Each sentence became its own array item, character for character. No
sentence was rewritten, shortened, merged or added, and no figure, date, name, price, threshold or
regulator reference was touched. Verified by diff: the only changed characters are the quoting and
brackets that turn one string into two.

### Re-verified

| Check | Result |
|---|---|
| Copy text | unchanged word for word |
| Figures / dates / regulator names | none touched |
| Authority model | untouched |
| Guardrails | 28/28 |
| `npm run check` | 0 errors, 0 warnings |
| `check-claims` | 0 failing |
| `check-reflow` | 0 failing |

**Not re-run: the three mandated skill-audits** (`abe-readability-audit`, `final-check`,
`ai-detector`). Their input is the page's prose and the prose is identical; only its container
changed. Stated rather than silently skipped.

**Why this entry exists.** `check-pipeline` §4 fails a page whose source is committed later than its
Stage 7 artefact, on the rule that a verification predating the content it certifies has certified
nothing. That gate fired on this page for the split above, correctly, and this closes it in the same
commit as the change rather than afterwards.


---

## Re-verification, 12 Aug 2026 — step bodies rewritten as two-item lists (commit 1c26fab)

**This is a COPY REWRITE, not the mechanical split of 12 Aug's earlier commit.** The re-verification
entry added by `c7c6c43` certified that each sentence became its own array item "character for
character". That is **not** true of `1c26fab`, and this entry deliberately does not reuse that
wording. Sentences here were re-worded, re-ordered and in places lengthened to give the Stepper's
first-item emphasis a short lead line to promote.

3 step bodies in the "how it works" ladder changed on this page:

  - "Complete the assessment on each course"
  - "Download your certificate as you go"
  - "File them with your CPD record"

### What was checked

Every changed line was read against its predecessor in `git show 1c26fab`. The rewrites preserve
meaning and introduce no new assertion: no figure, price, date, threshold, pass mark, unit code,
licence class, RTO number or regulator name was added, removed or altered on this page.

### Re-verified

| Check | Result |
|---|---|
| Figures / dates / thresholds / unit codes | none touched |
| Regulator and RTO names and numbers | unchanged |
| Authority model | untouched |
| New regulatory claims introduced | **none on this page** |
| Guardrails | 28/28 pages passed |
| `astro check` | 0 errors, 0 warnings |
| `check-claims` | 0 failing |
| `check-reflow` | 0 failing |

**Not re-run: the three mandated skill-audits** (`abe-readability-audit`, `final-check`,
`ai-detector`). Their input is the page's prose, and the prose here was re-worded rather than
re-argued: no section was added, removed or re-ordered, and no claim changed. Stated rather than
silently skipped, per the standing rule that skipping is allowed and skipping silently is not.

**Sibling page NOT cleared.** `wa-owner-builder-course` was touched by the same commit and is
deliberately left failing: its rewrite added a new regulatory sentence ("Below that threshold, no
approval is required") that is not verified in `kb/register/`. That is a publish hard-blocker and
is not this page's to close. See the design review of 12 Aug 2026 for the full finding.

**Why this entry exists.** `check-pipeline` §4 fails a page whose source is committed later than
its Stage 7 artefact, on the rule that a verification predating the content it certifies has
certified nothing. That gate fired on this page for the rewrite above, correctly. The gate compares
git commit times, so this closes only once committed.

**Filed by a design session.** `pipeline/**` is build-owned; this was written on Andrey's direct
instruction after the crossing was named. Recorded here rather than only in the session transcript.


---

## Re-verification note, 13 August 2026 — hero `howItWorks` split

**What changed.** Commit `9946204` inserted `|` separators into this page's hero `howItWorks`
frontmatter string, so `ProcessTrack` can render each step as a two-line card (action on the first
line, detail on the second) instead of a one-line row in a vertical ledger.

```
before: Get the bundle → Work through in any order → Assessment on each course → Certificate as you finish
after:  Get|the bundle → Work through|in any order → Assessment|on each course → Certificate as you finish
```

**Why no re-audit.** This is a mechanical separator insertion and nothing else, proven rather than
asserted: the new string is byte-identical to the old one once each `|` is read back as the space it
replaced. No word was added, removed or re-ordered. The splits were applied from an explicit table,
and the steps that could not be split without inventing a second line — single words, and any step
leading with a proper noun — were deliberately left whole.

Nothing the three mandated audits read has changed. No section was added, removed or re-ordered; no
answer capsule, claim, figure, price or source line was touched; the page's prose is untouched. The
`howItWorks` prop is a hero label, not prose. So `abe-readability-audit`, `final-check` and
`ai-detector` were **not re-run**, and that is stated here rather than silently skipped, per the
standing rule that skipping is allowed and skipping silently is not.

**Why this entry exists.** `check-pipeline` §4 fails a page whose source is committed later than its
Stage 7 artefact, on the rule that a verification predating the content it certifies has certified
nothing. That gate fired correctly on this page for the commit above. It compares git commit times,
so this closes only once committed.

**Filed by a design session on Andrey's explicit instruction**, after the alternatives (a full Stage 7
re-run per page, or reverting the content split) were named and this one was chosen. `pipeline/**` is
build-owned; the crossing is recorded here rather than only in the session transcript.


---

## Re-verification note, 16 August 2026 — noindex comment corrected (commit 95360d5)

**What changed: one frontmatter COMMENT line, replaced by a longer one.** The blocker note above
`buyUrl` ended "REMOVE noindex ONLY when a real id lands here and Stage 7 has been re-run against
it" — two necessary conditions written as if they were sufficient. It now lists four, adding the
`learn.` subdomain decision (a real checkout id does not settle whether the `/payment` PATH survives
cutover) and the matching PENDING entry at `scripts/check-redirect-targets.mjs:42`, which fails the
build if the flag is removed without it.

Corrected because the identical wording on `cpd-building-tas.mdx` led a build session to remove that
page's flag on a cleared Stage 7 the same day; only the check stopped it.

**The flag itself is untouched.** `noindex: true` is unchanged, as is the placeholder `buyUrl` and
every reason it is a placeholder.

**Why no re-audit — measured, not asserted.** The page was built from this file's pre-change and
post-change versions and the rendered HTML compared:

| Page | `dist/` SHA-256 (first 16) before | after |
|---|---|---|
| `/cpd-electrical-tas` | `fa91f1c0bde848df` | `fa91f1c0bde848df` |

Byte-identical. No section, answer capsule, claim, figure, price or source line was touched; no prose
changed. The eleven-point figure and its shortfall wording (DIFFERENCE 2) are untouched. So
`abe-readability-audit`, `final-check` and `ai-detector` were **not re-run**, stated here rather than
silently skipped.

**Why this entry exists.** `check-pipeline` §4 compares git commit times and fired correctly on this
page for the commit above. It cannot know a diff was comment-only. Closes only once committed.


---

## Re-verification note, 16 August 2026 — subdomain confirmation recorded (commit f66a359)

**What changed: one frontmatter COMMENT condition, struck.** Condition 3 of the noindex list read
"The `learn.` subdomain decision. A real id does not settle this...". Andrey confirmed that ticket
resolved on 16 Aug 2026 and directed that the payment path is not to be treated as a blocker, so the
condition is struck and marked CLOSED, with a note that `check-links`' warning on this page's
`/payment` path is now expected rather than actionable.

**The flag and every remaining gate are untouched.** `noindex: true` stands, and so does the reason:
the `buyUrl` is still a `TBC-` placeholder that does not resolve, because the 2026 electrician
bundle's checkout id has not been supplied. That is a **different fact** from the one confirmed, and
the confirmation was deliberately not extended to it.

**Why no re-audit — measured.** Built from the pre-change and post-change frontmatter, rendered HTML
compared:

| Page | before | after |
|---|---|---|
| `/cpd-electrical-tas` | `fa91f1c0bde848df` | `fa91f1c0bde848df` |

Byte-identical, and identical to the value recorded in this file's 16 Aug comment-correction note —
so the page has not moved across either of today's two comment changes. The eleven-point figure and
its shortfall wording are untouched. `abe-readability-audit`, `final-check` and `ai-detector` were
**not re-run**, stated rather than silently skipped.

**Why this entry exists.** `check-pipeline` §4 fired on this page for commit `f66a359`, which shipped
the comment change without a matching note. **Third occurrence in one day of the same omission** —
a content file's comments were edited and its Stage 7 note was not written in the same commit. The
first two were caught before merge; this one reached `main`. The gate is working; the habit is not.
See `kb/mistakes-log.md` row 19, whose guard already says a content fix and its `07` update belong in
the SAME commit.

---

## Publish blockers MEASURED, not read — 16 August 2026

`handover/HANDOVER-2026-08-16-session-close.md` claimed one hero image was the only thing left
holding this page's `noindex`. That claim was **tested rather than trusted**, because the last two
sessions on these pages were both misled by prose that described a build which had moved.

**The experiment.** On branch `publish-cpd-electrical-plumbing-tas`, `noindex` was removed from this
file and from `cpd-plumbing-tas.mdx`, and both slugs' `PENDING` entries were removed from
`scripts/check-redirect-targets.mjs`, in the working tree only. Then `npm run build`.

**Result — exactly two hard-blockers, one per page, both the FPO well:**

```
[abe-guardrails] cpd-electrical-tas/index.html: 1 FPO image placeholder(s) on an indexable
page, budget 0. ... Do not raise the budget.
[abe-guardrails] cpd-plumbing-tas/index.html: 1 FPO image placeholder(s) on an indexable
page, budget 0. ... Do not raise the budget.
ABE guardrails: 2 publish hard-blocker(s). Build stopped.
```

Nothing else fired. The guardrail hook runs at `astro:build:done` and stops the build there, so the
postbuild checks were then run by hand against the `dist/` it had already written:
`check-redirect-targets.mjs` exit 0 ("15 distinct, 9 resolving, 6 pending"), `check-meta.mjs`
0 failing. So **removing the two `PENDING` entries is correct and required** once the flags go — the
two are coupled in both directions, exactly as this file's frontmatter comment states.

**One correction to the handover's instruction.** It says to "lower both `FPO_BUDGET` lines". There
are no lines to lower: neither slug has an entry in `FPO_BUDGET` in `src/integrations/guardrails.ts`,
the default is 0, and the check's own message says *do not raise the budget*. Supplying the image is
the whole fix; no guardrail edit is wanted or needed.

**The experiment was reverted in full.** `noindex` and both `PENDING` entries stand. Nothing in this
measurement was committed, because publishing behind a `TBC-` checkout id and an FPO well is not
something a build session decides.

### Remaining sequence, one commit

1. `src/assets/images/cpd-electrical-tas-hero.avif` (5:4 landscape, ~1250x1000) and
   `src/assets/images/cpd-plumbing-tas-hero.avif`. Prompts: `handover/HANDOVER-image-prompts-2026-08-02.md`
   § "PROMOTED 16 Aug 2026".
2. `hero.artefactImg` + `hero.artefactAlt` on each page, alt >= 80 chars, **written from the rendered
   image** rather than from the prompt.
3. Remove `noindex: true` from both files.
4. Remove both `PENDING` entries from `scripts/check-redirect-targets.mjs` (skills-owned: disclose
   the crossing in the commit message).
5. `src/pages/cpd-tas.astro` — repoint the Plumbing card CTA off
   `/program/tas-plumber-cpd-bundle-01092025`; add `price: '$449'`, `rrp: '$1,089'`,
   `perPoint: '$41'` and a CTA to the Electrical card; move ItemList positions 2 and 3 onto the
   pages. Each of those three sites carries a comment naming this step.
6. Re-run Stage 7 on both and commit the notes **in the same commit** (`kb/mistakes-log.md` row 19).

The `TBC-` checkout ids stay, waived by Andrey on 16 Aug 2026 as a publish blocker. They remain
wrong: both pages will publish with a Buy button that 404s.
