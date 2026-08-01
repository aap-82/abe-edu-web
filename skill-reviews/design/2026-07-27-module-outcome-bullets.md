---
# Machine-readable block. Kept in skill-reviews/design/ so the flat skill-reviews/*.md build-run
# scans (system-health coverage, review-trends) never read it.
date: 2026-07-27
kind: coordinated            # cross-type: design (component) + build (data) + model (type)
subject: coordinated/module-outcome-bullets
graded_by: self
grade_reason: no fresh-subagent grader for a cross-type change; consistent with the day's other reviews.
verdict: Green
authorisation: owner-authorised cross-type session (Andrey), for one atomic feature that breaks if split.
shipped:                     # this commit, pushed via PR to origin/main
  - src/types/course.ts            # ModuleGroup.outcome string -> string[]
  - src/data/modules.ts            # QLD: 6 fused outcome sentences -> discrete arrays
  - src/components/ModuleRows.astro # <p> -> <div> + <ul class="mr-olist">; removed dead .mr-otext CSS
  - src/pages/styleguide.astro     # 2 ModuleRows specimens -> arrays
---

# Review — module learning outcomes as a bullet list (coordinated)

Follows the CanCant/`.mr-olist` design change earlier today, which pre-staged the (then dormant) bullet
CSS. This session supplies the other half and activates it.

## Why cross-type
The feature is one atomic change spread across three session-type boundaries: the **type** change
(`course.ts`) is model infra, the **data** re-authoring (`modules.ts`) is content/build, and the
**markup** change (`ModuleRows.astro`) is design. They are coupled: flipping `outcome` to `string[]`
breaks the build until the data and the component follow. Splitting them into three sessions would leave
a broken intermediate on every branch, so Andrey authorised one coordinated session. `content.config.ts`
(skills-owned) is **not** touched: it has no `outcome`/`modules` schema, so no skills boundary is crossed.

## What shipped, with measured values (not ticks)
Verified on the built QLD page (`/qld-owner-builder-course#modules`) via computed styles:
- Outcome container renders `<div>` (not `<p>`), so the `<ul>` is valid HTML.
- **6** outcome lists render (all QLD groups). Group 01 splits to exactly its 3 authored items.
- Markers: `content: "•"`, `color: rgb(110,110,110)` = `--slate` (neutral, not maroon). `list-style:none`,
  18px hang. Items inherit `.mr-outcome`: 14px, `rgb(42,42,42)` = `--ink-2`.
- The dead `.mr-otext` + `::first-letter` capitalisation rules were removed; items are now authored
  capitalised and end-stopped in source instead.

## Content fidelity
The 6 QLD outcomes were split **by clause, never by comma** (a comma sits inside single clauses, e.g.
"document every decision, variation and agreement in writing"). Where a clause was a 2-3 word stub it was
merged with its neighbour (e.g. "Estimate the build and carry a contingency") to keep 3-4 clean items per
group. Every regulatory figure is carried verbatim from the original sourced strings (7-star since
1 May 2024; GST/PAYG/QLeave; QBCC/QCAT) - no new facts introduced. Source of truth unchanged: the
NONACCABE QBCC course v2.0 Cover Sheet, already cited in `modules.ts`.

## Scope note
Only QLD had authored per-group outcomes; WA/TAS/ACT/NSW have none (the field is optional), so no other
state changed. When a state authors outcomes later, it authors an array and gets the list for free.

## Demand list
Tag every item: [skills] | [design] | [facts]
- [skills] none.
- [design] none.

  (Reworded 2026-08-01 from "none outstanding; the bullet treatment is now live and matches the
  pre-staged CSS." That sentence was a declaration of no findings, but `isPlaceholder` in
  `demand-split.mjs` anchors on `^none\b[\s.-]*$`, so the trailing clause made it parse as a real
  demand item and it routed to the design handover for five days. It is not closed — it was never
  open. The general fix, broadening the null match, is filed as a [skills] item.)
- [facts] none.

  (Reworded 2026-08-01 from "none - all figures carried verbatim from already-sourced course content."
  Same fault as the [design] line above, and missed when that one was fixed: the trailing clause after
  "none" defeats `isPlaceholder`'s `^none\b[\s.-]*$`, so this parsed as a real demand item and sat on the
  facts handover as a null entry. It is not closed — it was never open. Fixing one null line and not the
  one four lines below it is the set-scoped miss this repo keeps repeating; the broadening of the null
  match is still the [skills] item filed above.)

## Gate
`npm run build` green (guardrails **19/19**), `npm run check` **0 errors / 0 warnings**, rendered-page
verification via computed styles. No em dashes in added lines; no "comprehensive"; no RTO/WA-approved
claims (QLD content). Shipping to `origin/main` via PR.
