---
date: 2026-08-06
skill: design
subject: White Card hub redesign (HubCard spoke cards + ComparisonTable), then reverted to match /owner-builder-courses exactly
verdict: Amber
graded_by: self
---

# Design review — White Card hub redesign, then OB-hub match, 2026-08-06

## Scope

A long, iterative design-session stretch on `/white-card`'s spoke cards and comparison table,
picking up after the 4 Aug 2026 emphasis-row/Regulator-row review
(`skill-reviews/design/2026-08-04-comparison-table-redesign.md`, which this one does not
duplicate). Two phases:

1. **HubCard.astro redesign** — spoke blurbs converted to bullet-point fact lines ("Issued by",
   "Accepted", WA-only "Required for"), state badges expanded to full names, a footer "Cost"
   label added and aligned to the fact list's own column, a decorative corner arrow button added
   to every card (`.hc-go`, `aria-hidden`, no href of its own — the card itself is already the
   link).
2. **ComparisonTable.astro exploration, then reversion** — the table was transposed to a
   row-per-state shape with mono-caps headers, per-column `width`, a `#600000` accent on the
   per-row action link, a button-vs-text-link trial, then **transposed back to items-as-columns
   on Andrey's own call** ("make table in the White Card hub exactly the same as the table on the
   Owner Builder hub") — see the comment trail in `white-card.mdx`'s `comparison` block. The
   row-action orientation code stays in the component (a live second shape, not White-card-only),
   just unexercised by either table now.

## What shipped (final state, not the intermediate exploration)

- **`src/components/HubCard.astro`** — `desc` bullet items get a two-column grid when they open
  with `<b>`/`<strong>` (`isFact()` tests the raw string, not `:has(b)` on the rendered DOM — the
  earlier `:has(b)` version mis-fired on OB hub's own mid-sentence bold words, caught and fixed
  before this review). Footer gained a `<span class="hc-price-wrap">` (label + price) and a
  decorative `.hc-go` arrow button.
- **`src/components/ComparisonTable.astro`** — `Column.width` (replaced an earlier boolean
  `narrow`), a `<colgroup>` for the row-action orientation, `cmp--mono-head` table modifier class.
  All of this is currently inert for both live tables (neither sets `href`/`soon` on `columns`
  in the row shape) — confirmed by re-reading `white-card.mdx`'s and `owner-builder-courses.mdx`'s
  `comparison` blocks, not assumed.
- **`src/styles/global.css`** — `.cmp` rules extended for the row-action shape (now unused),
  `.hc-fact`/`.hc-price-wrap` grid, `.hc-go`, plus **two shared-rule regressions found and fixed
  in this same session, before merge** (see below).
- **`src/content/hubs/white-card.mdx`** — comparison table transposed back to items-as-columns,
  `columns[]` matches OB hub's own shape (no `emphasis`, no `width` — deliberately, to match
  "exactly"). Spoke blurbs carry the new fact-bullet format. Regulator/Training-provider/Delivery
  figures unchanged from their already-sourced values; only the axes and a few labels moved
  ("Government card fee" → "Government fee" in the transposed table, since reverted with it).
- **`src/content/hubs/owner-builder-courses.mdx`** — untouched in content this session; its
  rendering changed only because it shares `HubCard.astro`/`ComparisonTable.astro`/`global.css`
  with White Card (confirmed: `git diff` on this file this session is empty beyond what the 4 Aug
  review already covers).

## Two regressions found and fixed before this review (the actual "what didn't work")

Both are the same shape: **a rule written for one table orientation, added to a *shared* CSS
selector, silently changed the other hub's table too.** Caught by the user reporting real visual
defects on `/owner-builder-courses` (a rearranged row-label column, then overflowing cells), not
by any check in this pipeline — worth naming as a repeat pattern, not two unrelated bugs:

1. `.cmp thead th.cmp-corner{width:200px}` — sized for White Card's short state-code row labels
   (WA/TAS/NSW/QLD/ACT), added to the *shared* corner-cell rule. OB hub's own row labels ("Course
   completed within", "What you apply for") got squeezed into the *remaining* width instead of an
   even six-way split, and `Regulator`/`What you apply for`/`Course status` cells overflowed.
   Fixed by removing the fixed width entirely (the row-action orientation's own `<colgroup>`
   already sets 130px there independently and wins regardless, so the shared rule needed none).
2. `.cmp tbody th{white-space:nowrap}` plus the mono-caps/uppercase/tracked treatment (a
   deliberate, still-current choice, not reverted) made OB hub's longest row label ("Course
   completed within", 24 characters) wider than its old sentence-case rendering, and it started
   overflowing even after fix #1 restored the even column split. Fixed by switching to
   `white-space:normal` (wraps to two lines instead of overflowing) — costs nothing on White
   Card's own short labels, which never wrap.

**Repeat-risk candidate for `kb/mistakes-log.md`** (design sessions may not write there
themselves): *a style change built for one orientation of a shared component, added to an
unscoped selector, regresses the other orientation silently* — this is the second time in one
session a fix for White Card's own shape leaked into OB hub's unrelated shape before being
caught live. Filed as a demand-list item below rather than added directly.

## Measured, not ticked

- **Both regressions confirmed fixed via `getComputedStyle`/`scrollWidth` vs `clientWidth` on the
  live built page**, at an explicit 1280×900 viewport (the automated browser's preset resize
  intermittently reported `innerWidth: 0` this session — a tooling artifact, worked around with an
  explicit width/height resize, not something the shipped code depends on).
- **`/owner-builder-courses`, all 8 rows, re-checked after both fixes**: zero `th`/`td` overflow
  on any row or header cell (was 3 data-cell overflows + 1 label overflow before the fixes).
- **`/white-card`, all 5 rows, re-checked**: zero overflow, all 5 "View course" buttons present
  and correctly hrefed, no stray "Cost" bullet on any of the 5 state cards (a genuine copy-paste
  gap in an earlier edit — the ACT spoke's blurb kept a `<b>Cost</b> $137.00.` line the other four
  states' edits removed; caught by re-reading the diff before shipping, not by any tool).
- **Mobile (375px), both hubs**: `document.documentElement.scrollWidth` = 375 on both, no
  page-level overflow.
- **Build**: 24/24 guardrails; `npm run check`: 0 errors, 0 warnings (one real hint fixed - an
  `ArrowRight` import left dead in `ComparisonTable.astro` by the button-vs-text-link trial,
  removed along with the doc comment that still described the old text-link-with-arrow shape).

## What worked

- The user's own live screenshots (with freehand annotations) caught both the double-border
  layout defect and the two regressions above faster than any automated check in this pipeline
  would have - none of the three were things `npm run build`/`check`/guardrails can see.
- Re-reading `white-card.mdx`'s own `comparison` block before assuming the row-action styling
  work was still live, rather than trusting my own memory of what I'd built earlier in a long
  session - it had already been transposed back, and the styling I was about to "fix" belonged
  to an unused code path.

## What didn't

- Two shared-selector regressions (above) - not caught before the user hit them live.
- The ACT spoke's stray "Cost" bullet, from an edit whose `old_string`/`new_string` didn't cover
  that course's full blurb block - caught only on a pre-ship diff read, not during the edit itself.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- ~~[skills] `kb/mistakes-log.md` - add or increment: a CSS rule built for one orientation/table of
  a shared component, added to an unscoped selector, silently regresses the other
  orientation/table (two occurrences this session: `.cmp-corner` width, `.cmp tbody th` wrap).~~
  Closed 6 Aug 2026 - added as row 25, `kb/mistakes-log.md`, commit `6f1fd37`.
- [design] `ComparisonTable.astro`'s row-action orientation (mono-head CSS, `.cmp-row-link`, the
  `<colgroup>` width mechanism) is unused by either live table - worth a look if the per-row-link
  work (state code + arrow in `#600000`, single-line CTAs) is wanted again, per the code comment
  already left there.

## Output
- Fixed: both shared-selector regressions, the dead `ArrowRight` import, the ACT stray "Cost" bullet.
- Demand list: one item closed (mistakes-log row 25), one still open (unused row-action code note).

## Post-review changes (6 Aug 2026)

Work continued after this review was filed, per mistakes-log row 17's own rule ("a run's record is
closed AFTER the last change, not at Stage 9"). Recorded here rather than left stale, original
verdict and scores untouched.

- **Both batches shipped**: commit `f10f166` (everything this review's main body covers - the
  `/white-card-act` build, the HubCard/ComparisonTable redesign, both regression fixes, the ACT
  "Cost" bullet fix, the dead-import cleanup) and commit `6f1fd37` (the mistakes-log entry below,
  plus the TrustBand fix that follows). Both pushed to `main`; Workers Builds deploys on push.
- **`kb/mistakes-log.md` row 25 added**, closing the one demand-list item this review had left
  open. Filed as its own `skills`-typed task per the session-type table (design sessions may not
  write that file), executed inline in this same continuous session on the user's direct request
  rather than spun off separately.
- **A separate, unrelated defect found and fixed the same session, disclosed as a crossing**: the
  user asked "why does this go 3 lines?" on `qld-owner-builder-course.mdx`'s TrustBand heading -
  `.trust .h2{max-width:18ch}` (a deliberate, pre-existing constraint, unchanged) wrapping
  "Trusted by Queensland owner builders since 2007" across 3 lines with an orphaned last line.
  Fixed by trimming the redundant ", since 2007" (the same block's own "19 | Years operating" stat
  already states it) on all five course pages using this exact phrase - QLD, TAS, ACT, and both
  NSW owner-builder variants (`noindex`'d, on hold, unaffected by a copy-length fix). **This
  touched `src/content/courses/*.mdx`, which is `build`-owned, not `design`-owned, per the
  session-type table** - a crossing, disclosed here per the pattern `CLAUDE.md`'s own "Disclosed
  crossing" sections use, rather than left unrecorded. No regulatory, price or authority-model
  claim was touched; the change is a five-word trim repeated identically five times, and every
  page was re-measured live (`getClientRects()` line count) after the fix, not assumed.
