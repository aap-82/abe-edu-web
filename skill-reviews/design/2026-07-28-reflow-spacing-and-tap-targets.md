---
date: 2026-07-28
skill: design-session
subject: reflow, block spacing, tap targets and heading order
verdict: Green
graded_by: self
scores:
  correct_and_safe: green
  passed_gates_first_time: amber
  inside_effort_budget: green
  low_rework: amber
  taught_us_something: green
metrics:
  turns_to_passed_audit: 12
  manual_fix_passes: 3
  gate_fails_after_handoff: 0
---

# Design review — reflow, spacing, tap targets, heading order

**Session type:** design. **Wrote:** `src/components/**`, `src/styles/global.css`,
`skill-reviews/design/`. **Did not touch:** `kb/register/**`, `.claude/skills/**`, `pipeline/**`.
The `white-card-wa` build run's artefacts were closed before this session opened.

**Input:** the measured backlog produced by `abe-readability-audit` and the Stage 7 audit on
`/white-card-wa`, both filed 28 July. Every item below had a before-value already recorded, which is
why this session could go straight to fixes.

**`graded_by: self`** — there is no fresh-subagent design grader. Stated so the bias is on the record.

## Design register: NOT opened

Per rule 7, token and design-register changes are exclusive. **No token was added, removed or
changed.** Every fix uses an existing token (`--s-lg`, `--s-md`, `--slate`) or a structural property
(`min-width`, `overflow-wrap`, `min-height`, `flex-wrap`, `max-width`, padding inside a media query).
The locked system is untouched: radius 0, flat surfaces, 1px borders, Heritage Maroon for actions
only. This session was therefore free to do several things at once.

## What shipped, with measured before and after

| # | Fix | Before | After |
|---|---|---|---|
| 1 | **Horizontal reflow, sitewide** | 90px sideways scroll at 320px, 35px at 375px on ASQA pages; 4px on every other page | **0px across 14 pages × 320/375/390px — 42 checks, none overflowing** |
| 2 | `.measure` after a zero-margin block (`#need-one`, after CanCant) | **0px** | **32px** |
| 3 | `.measure` after a zero-margin block (`#your-card`, after a FactGrid) | **0px** | **32px** |
| 4 | `.measure` after `.price-foot` (`#cost`) | 16px | 32px |
| 5 | `.measure` after `.capsule` (`#real`, `#online`) | 32px | **32px, deliberately unchanged** |
| 6 | `.btn-link` tap target | **26px** | **44px** |
| 7 | Nav "Soon" badge size | **9px** | **11px** |
| 8 | Nav "Soon" badge contrast | **2.81:1** (fails AA) | **5.10:1** (passes AA) |
| 9 | Heading-order skips, `/white-card-wa` | **1** (H1 → H3) | **0** |
| 10 | Heading-order skips, `/white-card-tas` | 0 | **0** |
| 11 | `tel:` URI | `tel:(07)33316000` | `tel:+61733316000` |
| 12 | Second `.pl-lbl` in a column | no top margin (did not exist) | **24px** |

## The reflow fix had three causes, not one

The audit attributed the overflow to the partner card's email. That was the largest cause but not the
only one. Fixing it revealed the next, and so on.

**Cause 1 — a grid track that could not shrink (90px → 9px).** `.pl-frow` is
`grid-template-columns:108px 1fr`, and a `1fr` track defaults to `min-width:auto`, so it cannot go
below its content's min-content width. `admin@bluedogtraining.com.au` is 28 characters with no break
opportunity, so that one cell forced the whole document to 410px. **`min-width:0` is the fix;
`overflow-wrap:anywhere` alone would not have been**, because the track, not the text, was the
constraint. Isolated with a clean control: `/qld-owner-builder-course` has no partner card and
measured exactly 375 at a 375px viewport, while both pages that render the card measured 410.

**Cause 2 — an inline-flex eyebrow (9px → 4px).** `.eyebrow` is `display:inline-flex`, which sizes to
max-content and will not wrap. `White Card · Western Australia · CPCWHS1001` is the longest eyebrow on
the site. `max-width:100%` plus `flex-wrap:wrap` lets it wrap; it is a no-op wherever the eyebrow
already fits.

**Cause 3 — the header row (4px → 0px).** At 320px `.wrap` gives a 264px content box, while the brand
measures 220px and the burger 40px with an 18px gap: 278px. The header's side padding now trims to
16px below 360px, giving 288px. Scoped to `.site-head` so body copy keeps its 28px gutter, and to
360px so nothing changes on a normal phone.

**This is why cause 3 looked like a false positive and was not.** After fixing causes 1 and 2, every
page measured exactly 324px in a 320px viewport. A uniform number across pages that had previously
differed reads like a measurement artefact, and it was written off as an iframe scrollbar. A direct
top-level measurement returned the same 4px, and the offender was the burger button. **The uniformity
was the tell that it was real and sitewide, not that it was noise.** Recorded because the instinct
was exactly backwards.

## `.measure` was the only block without its own top margin

Every other block in the section vocabulary owns its top margin: `.capsule` 24, `.cancan` 32,
`.glance-grid` 32, `.price-card` 32, `.bundle` 72, `.note` 24, `.verified` 32, `.waynext` 48.
`.measure` had none and free-rode on whatever `margin-bottom` the previous block happened to carry.
After `.capsule` (32) that looked fine; after any block with `margin-bottom:0` it collapsed to
nothing.

`.wrap` is a block container, so adjacent margins collapse, which is what makes the fix safe: after
`.capsule` the gap stays 32 and nothing moves (row 5 above is the regression check). `:first-child`
is excluded so a `.measure` opening a column or a ZSection body is not pushed away from its heading.

## What did not ship, and why

**The partner blurb still renders twice** (`PartnerDisclosure` and the `Credentials` org card) —
Stage 7 F9. Both renders now match, because both split on the same blank-line convention, but they
are not de-duplicated. Not fixed here because it is not a spacing bug: the two cards serve different
jobs (ASQA disclosure location 6, and the "who developed this course" E-E-A-T card), and deciding
which one loses the description is a content-shape call, not a CSS one. Left open deliberately rather
than resolved unilaterally.

**`<a href="#">Login</a>`** in the header is still a dead anchor. It needs a destination, which is a
product decision, not a design one.

## What worked

Working from a backlog that already carried before-values. Every fix could be verified against a
number recorded before the session opened, so "did this work" never became a matter of opinion.

Sweeping 14 pages at three widths after each change, rather than checking the page that prompted the
fix. That is what caught causes 2 and 3, neither of which was in the original backlog.

## What did not

**`passed_gates_first_time: amber`, `manual_fix_passes: 3`.** Three self-inflicted build failures:

1. A `{/* … */}` comment placed **inside** a `{cond && ( … )}` expression, where only a single
   expression is valid. The compiler reported `Expected , or ) but found class` and pointed at the
   dynamic-heading line, which was correct code. The CLAUDE.md warning about the Astro 7 compiler
   lying about locations applies to more than nested template literals.
2. A `.split().join()` replacement that hit **both** `PartnerDisclosure` call sites when one was
   intended, silently giving the after-body branch a comment describing the after-hero case. Caught
   only by measuring the built TAS page and finding an unexpected H2. `String.replace` with a single
   match, or an indexed splice, is the right tool when two call sites are identical.
3. A comment block left unterminated while editing, which broke the stylesheet.

**A specificity miss.** The header padding rule was first written as `.site-head .wrap` (0,2,0) and
silently lost to the existing `.site-head .main .wrap` (0,3,0). The media query matched, the rule
was in the bundle, and the computed padding stayed at 28px. Verified by reading
`getComputedStyle().paddingLeft` rather than trusting that the rule had applied.

## Output

- **12 fixes applied**, all with measured before and after values.
- **Regression sweep:** 42 viewport checks across 14 pages, 0 overflowing. `guardrails` 20/20 pages.
  Styleguide renders both `PartnerDisclosure` specimens, with the heading defaulting to `h3` there,
  and has no overflow of its own.

## Demand list

Tag every item: [skills] | [design] | [facts]

- [design] The partner blurb renders twice per ASQA page (`PartnerDisclosure` + `Credentials` org
  card). Both renders now match, but neither is suppressed. Needs a decision on which card owns the
  description. **Third occurrence** — filed by the Stage 7 audit and the readability audit before this.
- ~~[design] `<a href="#">Login</a>` in the site header is a dead anchor. Needs a destination.~~ fixed in #89
- [design] `.eyebrow` was the second reflow cause and is a shared component; any eyebrow longer than
  `/white-card-wa`'s would have broken other pages the same way. Worth a max-length note in the
  content guidance rather than only a CSS guard.
- [skills] **Nothing in the repo can see a horizontal scrollbar.** A 90px sideways scroll at 320px
  survived a green build, 20/20 guardrails, `check-claims` 0 failing and an independent Stage 7 audit,
  because no gate renders the page. A headless width check over `dist/` at 320px would have caught all
  three causes. **Second occurrence** — the readability audit filed the same finding.
- [skills] The Astro 7 compiler reports a misplaced JSX comment at the wrong line, naming valid code.
  CLAUDE.md documents this for nested template literals only. Worth widening that note.
