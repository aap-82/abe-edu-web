---
date: 2026-08-10
skill: design-session
subject: clear all 35 CPL breaches; scope the fix after a caught regression
verdict: Green
graded_by: self
---

# Design review — CPL breaches cleared, 2026-08-10

## Verdict

**Green.** All 35 measured CPL breaches cleared, `CPL_BUDGET` emptied the same day it was created,
and the fix's own first draft caused a 307-element regression that this session caught and scoped
away before commit. The regression is the most useful thing in this review, because **the CPL check
written this morning passed it**.

## Pre-flight

`node scripts/system-health.mjs` — **0 failing**, 34 warning, 66 ok.

## What the 35 breaches actually were

The demand item read as 35 separate defects across 11 pages. Measured with a parent-chain analysis
rather than fixed page by page, they were **three causes**:

| Cause | Count | Worst | Where |
|---|---|---|---|
| `.step p` had a size and a colour but **no width at all**, so a step body ran the full section | **13** | **162 CPL** | `Stepper`, on 8 pages |
| Prose written straight into a section, with no `.measure` wrapper | **14** | **152 CPL** | `/owner-builder-insurance`, `/cpd-building-tas` |
| Inline `style="max-width:62ch"` / `64ch` overriding `.measure`'s 480px | **7** | **95 CPL** | `/cpd.astro` x1, `/cpd-tas.astro` x3 |

The third is **the `ch` unit bug in its third location**, after `.capsule`/`.trust-lede` and
`.unit-eb` earlier the same day. Someone wrote `64ch` meaning 64 characters and got 91-95, because
`1ch` is the advance of the "0" glyph, not of an average character. Deleting the four overrides
restores `.measure`'s own 480px and needs no replacement value.

## What shipped

- **`.step p { max-width: 480px }`** — matching `.measure`, because a step body *is* body copy.
  `Stepper`'s own `maxWidth` prop still narrows the container where a page asks; this is the floor
  under the pages that never passed one.
- **`.sec>.wrap>p:not([class]) { max-width: 480px }`** — the same cap for prose nobody gave a
  component to. See the regression below for why both the `>` and the `:not([class])` are
  load-bearing.
- **Four inline `ch` overrides deleted** from `cpd.astro` and `cpd-tas.astro`.

Measured on `/cpd-building-tas`, the worst page on the site:

| Element | Before | After |
|---|---|---|
| `.step p` | **162 CPL** | **64** |
| bare prose | **152 CPL** | **60** |
| `.capsule` | 66 (set 10 Aug) | **66, unchanged** |
| mobile, 375px | — | 33-42 CPL, inside the 30-45 band, 0px overflow |

Sitewide after: **0 prose elements over the 85 rule across 44 page/viewport combinations.**

## The regression this session caused, and how it was caught

**The first draft of the selector was `.sec>.wrap>p`, without `:not([class])`.** It matched every
paragraph a component renders as a direct child of `.wrap`, and flattened **307 of them to 480px**:

| Component | Was | Became |
|---|---|---|
| `.capsule` | 600px | 480px |
| `.waynext` | 1144px | 480px |
| `.mc` (CTA microcopy) | 1144px | 480px |
| `.attest` | 594px | 480px |
| `.capsule.on-dark` | 560px | 480px |
| `.trust-lede` | 520px | 480px |
| `.lede`, `.howline`, `.member-lead`, `.cmp-tablenum` | various | 480px |

It would have silently undone the `.capsule` measure work committed earlier the same day.

**Every gate passed it.** Build 25/25, typecheck clean, `system-health` 0 failing — and, most
importantly, **`check-reflow` reported 0 CPL breaches**, because 480px is *narrower* and a narrower
line never breaches an upper bound. A guard with only a ceiling cannot see a floor being violated.

What caught it was a **before/after width diff over all 1,142 paragraphs on 22 pages**, taken by
stashing the change, rebuilding, snapshotting, and un-stashing. After scoping with `:not([class])`:

| | first draft | after scoping |
|---|---|---|
| paragraphs changed | **354** | **47** |
| widened | 0 | 0 |
| components touched | **9 classes, 307 elements** | **none** |
| unchanged | 788 | **1,095** |

A classless `<p>` is prose nobody gave a component to, which is exactly the set that breached — all
14 of the wrapper-less breaches measured with `own class: (none)`.

## Disclosed session-type crossings

This session was declared **design**. It wrote to two paths outside that table, both forced by
ratchets and both disclosed here rather than only in the commit:

1. **`src/integrations/guardrails.ts`** (skills-owned) — `INLINE_STYLE_BUDGET` had to drop
   `cpd.astro` 3→2 and `cpd-tas.astro` 5→2, because deleting the four inline `ch` overrides paid
   down debt and the ratchet FAILs the build when a count falls without its budget following. The
   build stopped until it was lowered.
2. **`scripts/check-reflow.mjs`** (skills-owned) — `CPL_BUDGET` emptied for the same structural
   reason, on all eleven pages at once.

Also touched: **`src/pages/cpd.astro` and `cpd-tas.astro`**, which are on CLAUDE.md's unassigned
list. Four deletions, no wording changed.

**This is the second sighting of a structural problem, so the trigger has fired** (ROADMAP rule 3).
A ratcheted check couples the file holding the budget (always skills-owned) to the file holding the
debt (design or build), so **paying down debt is never doable inside one session type**. The same
thing happened on 9 Aug 2026 with `BANNED_CTA_BUDGET`: content is build-owned, the budget is
skills-owned, and the crossing was disclosed then too. Filed below.

## Gates

| Check | Result |
|---|---|
| `npm run build` | 25/25 guardrails, 24 pages |
| `npm run check` | 0 errors, 0 warnings |
| `system-health.mjs` | **0 failing** |
| `check-claims.mjs` | 0 failing |
| `check-reflow.mjs` | **0 failing**, 0 prose elements over the rule, no page scrolls sideways |
| Paragraph width diff, 1,142 elements | 47 narrowed, **0 widened**, 0 components affected |

## Design-register changes

**None.** `.measure` remains 480px and is unchanged; both new rules adopt it rather than introduce a
value. DESIGN.md untouched.

## What worked

Diffing every paragraph's width before and after, rather than trusting green gates. The regression
was invisible to all five checks including the one written specifically to catch measure defects,
and it would have shipped an hour after the work it silently reverted. Measuring the *outcome* over
the whole corpus, not the input, is the only thing that saw it.

Measuring the parent chain before choosing a selector also turned "35 defects on 11 pages" into
"three causes, two CSS rules and four deletions" — a page-by-page approach would have been far
longer and would have missed that the third cause was a known bug in a new place.

## What didn't

The first selector draft. `.sec>.wrap>p` was chosen precisely to *avoid* the unscoped-descendant
trap this repo has recorded twice — and it still hit the same class of failure one level down,
because components legitimately render bare `<p>` as direct children of `.wrap`. Being aware of a
failure mode is not the same as being immune to it; only the diff proved it.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [skills] **SECOND SIGHTING — a ratcheted budget structurally forces a session-type crossing.**
  The budget always lives in a skills-owned file (`guardrails.ts`, `check-reflow.mjs`) and the debt
  always lives in design- or build-owned files, and the ratchet FAILs when debt falls without its
  budget, so **paying down debt cannot be completed inside one session type**. Disclosed on
  9 Aug 2026 for `BANNED_CTA_BUDGET` and again today for `INLINE_STYLE_BUDGET` and `CPL_BUDGET`.
  Options worth weighing: move budgets to a data file any session may write; teach the ratchet to
  auto-lower and report rather than FAIL on a paid-down count; or name this exemption explicitly in
  the session-types table so it stops being a per-session judgement call.
- [skills] **`check-reflow` has a ceiling and no floor**, and passed a 307-element regression as a
  result. A cap that collapses to a narrower value is invisible to it. Worth considering a
  companion assertion — a committed width baseline per component, or a minimum-CPL check on
  elements that carry their own `max-width` — so a silent narrowing is caught by a script rather
  than by remembering to diff. The diff script that caught it is ad hoc and was thrown away.
- [design] `BundleOffer.astro` (`20ch`, `48ch`, `74ch`), `CpdBundleLayout.astro` (`60ch`),
  `styleguide.astro` (`72ch`), `404.astro` (`52ch`) and `global.css`'s `.hero .lede` (`32ch`) still
  cap in `ch`. None currently breaches the CPL rule, so none is urgent, but every one is the same
  latent unit bug that produced three separate defects today. Convert on next touch.

## Grader note

`graded_by: self` — no fresh-subagent design grader exists (rule 9). Mitigated by the central claim
being a 1,142-element before/after diff rather than an assertion, and by this review recording a
regression the session caused rather than only what it fixed.
