---
# Machine-readable block for a DESIGN review. Kept in skill-reviews/design/ so the flat
# skill-reviews/*.md build-run scans (system-health coverage, review-trends) never read it.
date: 2026-07-27
kind: design
subject: design/cancant-header-seam
graded_by: self
grade_reason: no fresh-subagent design grader exists yet; consistent with the 2026-07-25 design review.
verdict: Green
shipped:                             # this commit, pushed direct to origin/main (rebased onto 645b4e7)
  - src/styles/global.css            # CanCant .can-h header seam
  - src/components/ModuleRows.astro  # pre-staged .mr-olist bullet-list CSS (dormant)
---

# Design review — CanCant column header reads as part of the table

Session type: **design**. Worktree-isolated on `worktree-design+component-css-polish` because a
concurrent session holds the shared checkout; that working tree was never touched. Changes are built,
verified, and shipped to `origin/main` via rebase-and-push (rebased onto `645b4e7`); review filed at
ship per session-types Rule 9. Two design changes:
the CanCant header fix, and pre-staged (dormant) CSS for a module-outcome bullet list. The
content + markup half of that second item was routed to a build session, not done here.

## The problem (from a live element selection on /qld-owner-builder-course#accredited)
`.can-h` filled with `--paper-alt` (`#f7f4ec`). Since the 25 Jul ramp widening set `--paper-alt` to
exactly the `.bg-alt` section-band token, the one tinted strip on an otherwise white (`--paper`) card
matched the field **behind** the card. On a `bg-alt` section the header fill and the section band were
byte-identical, so the header blurred into the section and read as detached from the white rows below.
This was a latent coupling: the ramp move changed what `--paper-alt` *is*, and the header kept
referencing it.

## What shipped, with measured values (not ticks)
One global rule in `src/styles/global.css` (`.can-h`), so every CanCant instance is fixed at once
(accreditation, cpd-tas, course pages via Credentials, styleguide). Verified on the **built** page via
computed styles (`getComputedStyle`), not eyeballed:

- Header fill `--paper-alt #f7f4ec` → `--paper #ffffff`.
- Divider `--rule #e5e7eb` → `--rule-strong #d4d6da` (the seam carries the header/body boundary now
  that there is no tonal step).
- Header-vs-section-band lift (the "blurs into the section" defect):
  - `bg-alt` (the reported page): **1.00 → 1.10**. Was identical to the band; now lifts with the card.
  - `ground` (default): header was **darker** than the section (0.907 vs 0.949, a faint inverted band)
    → now **1.05** above it.
  - `bg-warm`: **1.03 → 1.13**.
- Header-vs-card-body: now **1.000** — header and rows are one continuous `--paper` surface, which is
  the "reads as part of the table" fix. Header still reads as a header via the mono/caps/tracked label
  and the `--rule-strong` seam (depth from the hairline, per the DESIGN.md rule).
- Column identity preserved: can header `--maroon #800000`, cant header `--slate`; ticks unchanged.

Rejected alternative: **B · Inset shelf** (`--paper-inset #f0e9db`, the token engineered off the
section ramp). Also fixes the blend, but keeps a distinct header band; Andrey chose **A · Seam** as the
more direct answer to "feels separate from the table."

### Pre-staged: module-outcome bullet list (dormant)
`ModuleRows.astro`'s scoped `<style>` gains `.mr-olist` rules: neutral `--slate` disc markers (not
maroon — "actions only", and "you will be able to" outcomes inform rather than tick a box), items
inheriting the `.mr-outcome` size/colour/measure. Nothing renders it yet, so it is invisible until a
build session changes `ModuleGroup.outcome` `string → string[]` and emits
`<div class="mr-outcome">…<ul class="mr-olist">…</ul></div>` (a `<div>`, since a `<p>` cannot contain a
`<ul>`; the `<ul>` must live in this component to inherit the scope hash). Build stays green with the
dormant selector present. The correct 3-way split of the QLD sample was shown to Andrey as a mock —
split by "and"-clause, never by comma (a comma-split breaks "document every decision, variation and
agreement in writing").

## Honest notes
- **No token / design-register change.** Rule 7 is NOT triggered: no token value was added or changed;
  `.can-h` was re-pointed from one existing token to two others (`--paper`, `--rule-strong`). This is a
  pure component-CSS change, so mixing it in a session with other design discussion is within bounds.
- **Not committed.** The change is built + type-checked + guardrail-clean on the worktree branch but
  uncommitted; deploy/commit is human-triggered.
- **Verification path was atypical.** The project `astro` CLI is a singleton dev-server wrapper and the
  other session held port 4321, so a clean worktree dev preview was impossible without disrupting it.
  Verified instead by `npm run build` → static-serving `dist/` on an isolated port → reading computed
  styles. Screenshots were unavailable (Browser pane not displayed); measured luminance stands in.

## Demand list
Tag every item: [skills] | [design] | [facts]
- [design] `.mr-outcome` bullet-list CSS (`.mr-olist`) is now **pre-staged and dormant** in
  `ModuleRows.astro`. The build session (`task_2ee20866`) must supply the other half: `outcome`
  `string → string[]`, author each state's items, and change the `<p class="mr-outcome">` to a
  `<div>` emitting `<ul class="mr-olist">` — the class + `p→div` are load-bearing for the CSS to
  attach. They must land together.
- [design] Latent-coupling watch: other components may still reference `--paper-alt` as a *fill* and so
  match a `bg-alt` section the same way `.can-h` did. Worth a sweep for `background:var(--paper-alt)` on
  elevated surfaces the next design session.
- [skills] none.
- [facts] none.

## Gate
`npm run build` green (guardrails **19/19**), `npm run check` **0 errors / 0 warnings**, `system-health`
**0 failing** at session start. Change verified on the rendered/built page via computed styles and
hand-computed luminance ratios. Shipped direct to `origin/main` (rebased onto `645b4e7`, no force).
