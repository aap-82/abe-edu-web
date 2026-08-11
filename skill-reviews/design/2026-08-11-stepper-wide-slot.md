---
date: 2026-08-11
skill: design-session
subject: ZSection wide slot + Stepper columns prop
verdict: Green
graded_by: self
---

# Design review — the wide slot and the Stepper's columns prop, 2026-08-11

## Verdict

**Green.** The requested outcome shipped — a stepper that ran 917px tall in half a column now sits
two-up at 439px — and the two regressions on the way there were caught by the repo's own newest
check before anything was committed.

## Pre-flight

`node scripts/system-health.mjs` — **0 failing**, 39 warning, 70 ok.

## The request, and what was actually wrong

Andrey selected the `.step` element in `/white-card-qld`'s `#session` and asked for the steps to use
the whole width rather than one column.

Measured before touching anything: `.zsplit` renders `536px 536px`, so the stepper had **536px of a
1144px wrap**, four steps stacked **917px tall**, with the image column beside it empty for most of
that height. The page's own `maxWidth="560px"` was not even binding — the split was the constraint.

**The single-column layout is not an oversight, and that mattered.** Every one of the 19 steppers on
the site sets an explicit `maxWidth` — 480, 560, 640, 880px — a decision applied consistently across
18 call sites. So the fix had to deliver the requested outcome **without silently reversing that
sitewide**, which is why it ended up opt-in.

## What shipped

| Change | File | Owner |
|---|---|---|
| `wide` named slot, rendered below the split inside `.wrap` | `ZSection.astro` | design |
| `columns?: 1 \| 2` prop, `.steps-2` above 1100px | `Stepper.astro` | design |
| `slot="wide"`, cap removed, `columns={2}` | `white-card-qld.mdx` | **content — disclosed below** |

Measured on `/white-card-qld` in a live browser:

| | Before | After |
|---|---|---|
| Stepper width | 536px | **1144px** |
| Columns × rows | 1 × 4 | **2 × 2** |
| Height | 917px | **439px** (−52%) |
| Other steppers changed | — | **0 of 18** |
| Page overflow, 1280px / 375px | 0 | **0** |

Reading order verified rather than assumed: DOM order and visual left-to-right, top-to-bottom order
match, so the sequence still reads 1-2-3-4.

## The two regressions, both mine, both caught pre-commit

**Attempt 1 — a global `auto-fit` rule, `minmax(460px, 1fr)` on `.steps`.** Correct on desktop and
**it broke five pages at 375px**, scrolling 7 to 186px sideways. `.z-body` is a grid child with the
default `min-width: auto`, so it never shrinks below its content's min-content width — and the
460px track floor *became* that width, pushing the split, and the page, past the viewport. This is
the same min-content trap `UnitOutline.astro` already records against `minmax(0, 1fr)` and
`global.css` records against `.pl-frow dd`. **Third sighting of one trap.**

**Attempt 2 — `min(460px, 100%)`.** Fixed the steps' own overflow and not the push, because the
circular sizing resolves against a container the floor is already inflating. It measured clean on
the element and left the page still scrolling.

**Both were caught by `check-reflow`**, built 10 Aug for exactly this class of defect, which reported
**9 failing** on attempt 1. That is the check paying for itself six days after it was written: a
sideways scroll at 375px is precisely what nothing in this repo could see before it existed.

**The resolution is the finding.** A stylesheet cannot tell a 536px split column from a 1144px wrap,
so any width-triggered rule is guessing. The call site knows. Two columns became an explicit
`columns={2}` prop, and the breakpoint sits at 1100px — above the point a ZSection stops splitting —
so it cannot apply inside a half-width column even if someone opts in there by mistake.

## An enumeration error worth recording

Mid-change I claimed "18 of the 19 steppers are unchanged" in a code comment. It was wrong:
`/cpd-building-tas` also went multi-column, because it sets no `maxWidth` and my grep had covered
`src/content/courses/**` and `src/pages/**` while silently omitting `src/content/cpd-bundles/**`.
The comment was corrected, and then the opt-in redesign made it moot — `/cpd-building-tas` is back
to unchanged because it never asks for two columns.

**Second time in two days** a claim rested on a set-scoped grep that looked complete and was not
(the other: the FPO count, where a text match missed every well overriding its label). The final
figures here come from reading the computed `grid-template-columns` of all 19 steppers in a browser.

## Disclosed session-type crossing

Declared **design**. `white-card-qld.mdx` is build-owned content, and this session edited it — three
attributes on one line (`slot`, `maxWidth` removed, `columns`). The change is unusable without it:
the slot and the prop are both opt-in by design, so the component work alone would have shipped
dormant. No copy, fact, figure or claim was touched. Same shape as the crossings disclosed on 9 and
10 Aug.

## Design-register changes

**None.** No token, colour, radius, border or type step changed. `.steps` keeps its default
single-column layout; the second column is a component-level opt-in.

## Gates

| Check | Result |
|---|---|
| `npm run build` | 26/26 guardrails |
| `npm run check` | 0 errors, 0 warnings |
| `system-health` | **0 failing** |
| `check-claims` / `check-links` | 0 failing |
| `check-reflow` | **0 failing** (was 9 mid-change) |
| All 19 steppers | 1 multi-column, 18 unchanged, 0 pages overflowing |

## What worked

Measuring the container before proposing a fix. `.zsplit` reporting `536px 536px` made it obvious
the `maxWidth="560px"` was a red herring and the split was the real constraint — which is what
turned this from "widen the stepper" into "give ZSection a full-width slot".

## What didn't

Two wrong attempts before the right one, both of which measured clean at the viewport I checked
first. Desktop-only verification is how both survived to a build, and mobile is where both died.
The lesson is not new, which is why the third sighting of the min-content trap is recorded above
rather than just fixed.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [design] **The min-content trap has now been hit three times** — `minmax(0, 1fr)` on
  `UnitOutline`'s text track, `.pl-frow dd`, and `.steps` today. Each time the symptom is a grid
  child refusing to shrink and pushing its parent past the viewport, and each time it was found by
  eye or by a browser check rather than by a rule. Worth a short named entry in `DESIGN.md` §7 so
  it is a documented shape rather than three comments in three files. Register edit, exclusive
  session (rule 7).
- [design] **17 other steppers are still capped at 480-640px inside split columns.** This session
  deliberately did not reverse that sitewide, because the caps are a consistent existing decision
  and only one section was raised. If the two-up treatment is wanted more widely, it is now one
  prop per call site. Andrey's call, not a defect.
- ~~[build] `/cpd-building-tas` sets no `maxWidth` on its stepper and is the only other uncapped call
  site. It renders single-column at full width, which is the "not using the whole length" shape
  Andrey raised here. Noindex, so not urgent; `columns={2}` would fix it in one word.~~ **Closed
  11 Aug 2026, same day**, on Andrey's instruction. It needed the prop alone and no `wide` slot,
  because unlike `/white-card-qld` it already sat in a plain `<Section>` at the full wrap: 5 steps
  went 1 × 5 to 2 × 3, block height ~1,000px → **481px**, reading order verified 01 → 05,
  `check-reflow` 0 failing. Stage 7 re-verification appended in the same commit. **Two of 19
  steppers are now two-column, both opted in explicitly; the other 17 are untouched.**

## Grader note

`graded_by: self` — no fresh-subagent design grader (rule 9). Mitigated by every figure coming from
in-browser measurement at two viewports, and by both failed attempts being recorded with the
measurements that killed them rather than only the version that shipped.
