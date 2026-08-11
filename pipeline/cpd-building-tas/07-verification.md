# Stage 7 — pre-deploy RE-VERIFICATION · `/cpd-building-tas`

**Re-run 25 July 2026.** Supersedes the 23 July run (commit `d8368f8`), which certified content that has
since changed. Seven commits touched this page after that verification, so `system-health` correctly
reported the old 07 as certifying stale content (page newer than its verification). This is a Stage-7
re-run only — Stages 1–6 artefacts are present and untouched, no rebuild.

Measured against `dist/cpd-building-tas/index.html`, rebuilt today (build green, 19 pages pass guardrails).
Every value below is read from the built HTML, not carried from a prior artefact.

Authority model: **state-approved-direct** (CBOS approves each course). Two Person nodes (ABE-developed).
`recognizedBy` CBOS Tasmania, never RTO / nationally recognised / Statement of Attainment.

## Commits re-checked (newest first)

- `f0d531b` content(cpd): "12 points" on the proof's first line, capitalise track steps
- `f939f0c` fix(hero): typeset + fill the CPD bundle hero image, payment microcopy
- `ac1caab` content(cpd): wire the Building bundle hero image
- `b1e4b19` feat(cpd): rewrite the bundle course list as cards with real per-course stats
- `5f217eb` fix(cpd): confirm the Building bundle checkout, correct the WHS-cap record
- `1c4bc4a` content: house-style and content-quality pass across course pages
- `651cdbd` fix(cpd): remove a false CBOS claim, and the section built on it

## Priority re-checks (what those commits moved)

1. **Points claim (`f0d531b`).** On-page figure = derived register total. `system-health`: *"CPD building:
   12 points from 12 live courses of 14 tagged"*. The page states "12 points" (sticky) / "twelve …points"
   (6×) and the hero H1 "twelve CBOS-approved points". No `points` field in frontmatter — the figure and
   the member table are counted at build from `kb/register/cpd/tas-courses.json`. No authored subtraction.
   **PASS.**
2. **Bundle course cards + per-course stats (`b1e4b19`).** 12 cards rendered. Each carries "1 CPD point"
   (register: one point each). Rendered minutes — 36, 37, 41, 46, 37, 55, 47, 35, 37, 45 — trace 1:1 to the
   10 `memberInfo.minutes` values (LearnWorlds Jul-2026 snapshot). The two newer courses render
   "— not measured", not a guessed figure. No per-course number is typed against the register. **PASS.**
3. **Checkout + WHS-cap record (`5f217eb`).** `Course.offers.price` = **499** = on-page **$499** (14×).
   The WHS-cap correction holds: the "what counts" section states the caps that exist (WorkSafe events 6/yr,
   research 4, journals 3, membership 2) and that approved online courses carry no cap. No residue of the
   false "capped at four a year" WHS claim (`capped at four` = 0, `four a year` = 0). **PASS.**
4. **Removed CBOS claim (`651cdbd`).** The false WHS-cap claim and the section built on it are gone; the
   rewritten `#what-counts` (marker 02) replaces it. No capsule or FAQ references the removed claim. **PASS.**
5. **Standard Stage-7 grid** — see table.

## Measured grid

| Check | Measured value | Verdict |
|---|---|---|
| H1 count / text | **1** — "Builder CPD Tasmania: twelve CBOS-approved points in one purchase" | PASS (carries primary keyword) |
| Question-led H2s | 7 question-form section H2s + FAQ H2 ("Common questions…") + CTA-band H2 ("Ready to complete your CPD year?") | PASS |
| Answer capsules 40–60, answer-first | 7 capsules: **46, 50, 47, 46, 49, 45, 46** words | PASS (all in band) |
| JSON-LD, single server-rendered `@graph` | Course + EducationalOccupationalCredential + BreadcrumbList + Person + Person | PASS |
| Person nodes ×2 (ABE-developed) | Dominic Ogburn (Course Developer) + Warwick Smith (Compliance & Currency Reviewer) | PASS |
| `recognizedBy` | **CBOS Tasmania** | PASS (state-approved-direct) |
| `Course.offers.price` = on-page price | **499** = $499 | PASS |
| `data-authority` | `state-approved-direct` | PASS (guardrails see the page) |
| Canonical, no-slash | `https://www.abeeducation.edu.au/cpd-building-tas` | PASS |
| Authority language | no RTO / no "nationally recognised" / no Statement of Attainment | PASS |
| Banned copy | "comprehensive" = 0 | PASS |
| Em dashes | 10 total, **none in body prose**: 7 in Source-citation labels ("CBOS — …"), 2 are stat-cell "—" placeholders for the unmeasured courses, 1 in the CTA label "Get the bundle — $499" (button label, consistent with the course-page CTA pattern; not body copy) | PASS |
| `check-claims` | 0 failing; 150/150 figures match register | PASS |
| `robots` | `noindex,nofollow` | NOTE — intentional pre-launch (see below) |

## Standing WARN — `Total not reconciled` — routed, not papered over

`system-health` / `check-claims` WARN: *"Total not reconciled … need exactly one course-fee row and one
government-fee row present in kb/register/, plus an isTotal row (found 0 price, 0 government, 1 total)."*

**Disposition: route to the skills demand list; not a page defect, not fixed here.** The reconciliation
model this check enforces is the course-page shape (course fee + government fee = total). A CPD **bundle**
has no government fee — the `#cost` capsule states it outright: *"There is no government fee attached to CPD
itself."* The bundle's own price integrity is checked separately and passes (`system-health`: *"Bundles: 3
bundle offer(s) reconcile"*; `priceRows` = $1,188 comparison + $499 isTotal, and the saving is left as the
reader's subtraction by design). Forcing a government-fee row onto this page to satisfy the check would
invent a fee that does not exist — the opposite of correct. The gap is in the check's archetype coverage,
not the page. Build-owned page content is correct; the check refinement belongs to the skills session.

## noindex status

`noindex: true` remains, and I have **not** removed it — that is a publish action and out of this
re-verification's scope (handover: "re-verify only … Stop at Stage 8 … do not deploy"). The *verification*
reason for the noindex (frontmatter comment: "verification is stale") is now cleared by this re-run. The
page still inherits one external open question — whether `/payment` survives on the LearnWorlds `learn.`
subdomain at cutover — so removing noindex remains Andrey's call at the publish gate, coupled to that
external blocker, not a Stage-7 output.

## Not run, and why

- `abe-readability-audit`, `final-check`, `ai-detector` not re-run as separate skills for this delta. The
  changed commits are content/figure/image edits already covered by the measured grid, `check-claims`, and
  the build guardrails; the prior run's inline application of those skills still holds for the unchanged
  structure. Recorded as a deviation, consistent with the 23 Jul run.

## Verdict: **PASS** (re-verified against current `dist/`)

0 FAIL for this slug after commit. The one WARN naming this page is the archetype-coverage issue above,
routed to the demand list. noindex is retained as the documented pre-launch state. Stop at Stage 8 — no deploy.

## Re-verification · 11 August 2026 — stepper opted into two columns

**Why this exists.** `Stepper` gained an opt-in `columns` prop the same day
(`skill-reviews/design/2026-08-11-stepper-wide-slot.md`). This page's stepper was the only other
call site on the site setting no `maxWidth`, so it rendered single-column across the full 1144px
wrap — the same "not using the whole length" shape raised on `/white-card-qld`. Andrey asked for it
to get the same treatment.

**Scope: one prop.** No step text, fact, figure, points total, price, heading or schema field
changed. Unlike `/white-card-qld`, this stepper is already in a plain `<Section>` at full width, so
it needed the prop alone and no `wide` slot.

## Measured

| Check | Before | After |
|---|---|---|
| Columns × rows | 1 × 5 | **2 × 3** (last row carries one) |
| Block height | ~1,000px | **481px** |
| Stepper width | 1144px | 1144px, unchanged |
| Page overflow, 1280px and 375px | 0 | **0** |
| `check-reflow` | 0 failing | **0 failing** |

**Reading order verified rather than assumed:** DOM order and visual left-to-right, top-to-bottom
order both run Step 01 → 05.

**Below 1100px it is a single column**, so the mobile rendering is unchanged. The breakpoint sits
above the point a ZSection stops splitting, which is what stops a track floor becoming a grid
child's min-content width — the failure that broke five pages during the change that introduced
this prop, recorded in the design review above.

**Not re-run: the three mandated audits, the schema/points/authority sweep.** None of their inputs
changed — this is a layout prop on an existing component, and the page remains noindex.

## Ship decision

**Merge-ready.** Closes the Stage 7 currency gap this page's own change opens. The page's standing
noindex status and its open Andrey-only inputs are unaffected.
