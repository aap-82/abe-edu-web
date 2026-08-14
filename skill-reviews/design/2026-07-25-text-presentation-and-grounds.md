---
# Machine-readable block for a DESIGN review. Kept in skill-reviews/design/ so the flat
# skill-reviews/*.md build-run scans (system-health coverage, review-trends) never read it.
date: 2026-07-25
kind: design
subject: design/text-presentation-and-grounds
graded_by: self
grade_reason: no fresh-subagent design grader exists yet; this is the first design review filed.
verdict: Green
shipped:                             # commits on main
  - eff99f9  # text-presentation components + styleguide-review polish
  - f2f1849  # widen the section-background ramp
  - 376fe09  # dedicated --paper-inset for the answer capsule
---

# Design review — text-presentation components + the warm ground ramp

Session type: **design**. First review filed under the convention added to CLAUDE.md this session
(session-types Rule 9). Everything below is committed and live on `origin/main`.

## What shipped, with measured values (not ticks)

**Part A of the handover — both items were already done before the session.** Verified against code
and git, not trusted from the demand list:
- `.note`/`.price-foot` `max-width` — fixed in `77f1545` (23 Jul); nothing to do.
- `CpdBundleLayout` marker double-count — never present (`git log -S 'marker="01"'` empty); the MDX
  already owns `01`–`06` of `06`. The demand view was seeded from reviews predating the fixes.

**Part B — five text-presentation components**, each with a `/styleguide` specimen, a
`component-selection.md` avoid-rule and a `component-library.md` prop contract:
`SectionHeading`, `DefinitionList`, `StatBlock`, `KeyTakeaway`, and `BulletList` (the fifth, which
Andrey named independently — its contract already existed in the docs but the component did not).
`DefinitionItem` added to `src/types/course.ts`. None wired into pages (authoring, not this session).

**Live styleguide-review polish (Andrey, on the running preview):**
- `ModuleRows` outcome lines capitalise their first letter at the presentation layer
  (`::first-letter`), so every state's authored outcome renders capitalised without editing source.
- FAQ answer top padding `0 → var(--s-sm)` so the open answer clears the summary's hover band.
- FactGrid key labels `--slate → --maroon`.
- Two copy-structure rules recorded in `component-selection.md`: lists hold 3–7 items; paragraphs
  carry one idea each. (Also saved to memory: `feedback_prose_authoring.md`.)

**Section-background ramp widened** (its own commit/branch): the `ground → paper-alt` section flip
measured **1.018** (imperceptible on mobile, the primary device). Deepened `--paper-alt`
`#f9f7f2 → #f7f4ec` and `--paper-warm` `#f7f4ef → #f5f1e8`; flip now **1.045**, `alt→warm` held at
1.026, card lift up to 1.099. Constraint that capped it: `--slate` label text holds **4.52:1** on the
darkest ground (AA floor 4.50). Contrast comments, DESIGN.md and the styleguide swatch mirror all
re-synced to the new values (DESIGN.md was two generations stale at `#fafafa`).

**Answer-capsule contrast** (its own commit/branch): the capsule reused `--paper-warm`, so it was
identical to a `bg-warm` ground (1.000) and near-identical on `bg-alt` (1.026) after the ramp moved.
New `--paper-inset` `#f0e9db`, deliberately off the section ramp, so the capsule reads as a warm
inset on every ground: `bg-alt` **1.026 → 1.099**, `bg-warm` **1.000 → 1.072**, default 1.149.

## Honest notes
- Acted on two **single-occurrence** Part-A items by choice (they turned out already-done, so no
  churn). Recorded here so the "second occurrence is the trigger" record stays truthful.
- Rule 7 (token/design-register changes are exclusive) tension: this one *session* did component work
  **and** two design-register changes (the ramp, `--paper-inset`). Each register change was isolated
  to its own branch and commit, and the ramp/inset were driven by Andrey's live findings, but a strict
  reading wants a token change to be its own session. Flagged, not hidden.

## Demand list
Tag every item: [skills] | [design] | [facts]
- ~~[skills] `scripts/demand-split.mjs` is missing — the handover and `system-health` reference it, and
  `reports/handover-design.md` cannot regenerate without it. Restore or retire it.~~ restored in `057a569`
  and extended since (#87, #90, #91); `reports/handover-design.md` regenerates, and `system-health`
  reports its unrouted count. Verified present 2026-08-01.
- ~~[skills] Another instance of the 6× "documentation drifted from the code and was trusted over it"
  risk: DESIGN.md cited `#fafafa` (two token generations stale) and the styleguide swatch mirror was
  stale too. Fixed in this session's commits; log the recurrence in `kb/mistakes-log.md`.~~ closed 14 Aug 2026 — the recurrence was logged, by commit "log(mistakes): 7th occurrence of docs-drift — DESIGN.md #fafafa two gens stale". That sighting is now the 7th row of the mistakes-log history section and belongs to row 27 after the 14 Aug split.
- [design] `SectionHeading` overlaps `Section.astro` (only new value: standalone use) and `StatBlock`
  overlaps `TrustStats`/`FactGrid`. Watch for redundancy before either is wired into a page; trim if a
  build never reaches for the standalone case.
- [facts] none.

## Gate
`npm run build` green (guardrails 19/19), `npm run check` 0 errors, `system-health` 0 failing, each
change verified on the rendered page (measured luminance ratios + mobile viewport where tonal).
