---
date: 2026-07-31
skill: design-session
subject: module-accordion
verdict: Amber
graded_by: self
---

# Design review — `ModuleRows` becomes a disclosure list, 2026-07-31

## Verdict

**Amber, and the colour is the point.** The work is sound, measured and verified on all six pages.
It also ships a component that contradicts two canonical documents, on Andrey's explicit call with the
trade-off in front of him. A green verdict would file that away as if it had not happened.

## What shipped

`ModuleRows` was six always-visible rows. It is now a native `<details>` disclosure list: the first
group open, the rest on click. Chosen from **six rendered variants** built on the real QLD data
(`/styleguide`, since deleted), which differed on how much is hidden rather than on decoration:

| | what it was | outcome |
|---|---|---|
| A | every group open, control collapses what you have read | rule kept, not chosen |
| B | module names stay visible, only outcomes collapse | rule bent, not chosen |
| **C** | **first open, rest closed** | **chosen** |
| D | three columns, no accordion | rule kept, not chosen |
| E | two-up cards | not chosen |
| F | bento, cells sized by content weight | not chosen |

C shipped after two rounds of Andrey's direction: the `--paper` plate was removed (so the only line
inside a group is the dotted column divider), the group key stepped 14px → 12px, module numbers went
right- to left-aligned, the outcome discs and the count figures went `--slate` → `--maroon`, and the
title was pulled left onto the column's edge.

## The rule it breaks

**PRODUCT.md, Accessibility and Inclusion:** *"Decision-critical content (eligibility, cost,
requirements, what the course actually is) stays fully visible and is never hidden behind an
accordion. Accordions are for FAQs only."* **DESIGN.md section 7** says it twice more, in the
reader's-job table and in the rules under it.

The syllabus is what the course actually is, and the section's own H2 asks what the modules cover. On
`/act-owner-builder-course` that H2 is now answered on load by **11 titles and one sentence**.

This is recorded, not smoothed over. Variant A was built, measured and offered as the version that
keeps the rule and still gives the reader a control; C was chosen over it knowingly. The exception is
Andrey's to make. What is **not** acceptable is the code and the canonical docs disagreeing in
silence, so a `[skills]` item below asks for them to be reconciled: either PRODUCT.md gains a stated
exception for the syllabus, or this comes back to A.

## Measured, on the built pages

Height, `/act-owner-builder-course` at 390px, the largest syllabus on the site (12 groups):

| state | section height |
|---|---|
| every group open (what shipped before, in effect) | 1869px |
| **first open, rest closed (shipped)** | **1141px, 39% shorter** |
| all collapsed | 1053px |

So the accordion buys 728px on the page that needed it most. That is the case for C, and it is real.

Measure, unchanged or better everywhere (85 CPL hard rule, 65-75 band):

| page | what | worst CPL | median | over 85 |
|---|---|---|---|---|
| QLD | outcomes, two columns | 62 | 43 | 0 |
| QLD | module names | 34 | 6 | 0 |
| ACT | body prose | 72 | 61 | 0 |

The 480px caps this session put on `.mr-body` and the outcome block earlier today survive the rework;
nothing regressed against the measure fix that opened the session.

Alignment, `/qld-owner-builder-course`: title, `MODULES` eyebrow and the first module number all land
on **x 303**, with the group key alone at 153 in its rail. The rail track is `calc(150px - var(--s-md))`
so that the gap puts the title exactly where the panel starts; a bare 150px left every panel 24px left
of its own title.

Accessibility and crawlability:

- Summary is focusable, toggles on activate, and carries a 2px `--ink` focus ring inset 3px.
- Minimum summary height **64px** on desktop, and every summary clears 44px at 390px (WCAG 2.5.5).
- The `<h3>` moved inside `<summary>`; heading level is unchanged, so the outline did not move.
- **Collapsed content is still in `dist/`** — grepped a QLD outcome sentence and an ACT body sentence
  out of the built HTML, both present. A crawler reads what a reader has not opened.
- No JS. Native `<details>`, the same mechanism `Faq.astro` uses, so the site has one accordion.
- No horizontal overflow at 390px, 0 elements past the client width.

## The thing I nearly shipped without noticing

The variant sheet only ever rendered **QLD** data, and QLD is the only page that has module contents
and learning outcomes. `modules-act.ts`, `-tas`, `-wa` and `-nsw` carry **zero** of both: one sentence
of prose per group. Variant C's two-column panel had data on one of the six pages it was about to ship
to.

Caught by counting the fields before promoting, not by looking at the variants. The component now
handles three data shapes (`contents` + `outcome` → two columns; `body` alone → prose; both → prose
above the columns), and Andrey chose all six pages with the consequence stated: on four states a click
reveals a single sentence. That is a thin reward for the gesture and the fix is content, not design —
filed as `[build]` below.

**A variant sheet that renders one page's data is a variant sheet that cannot show you this.** Next
time, render the sparsest real data beside the richest.

## Decisions worth challenging

- **First-open rather than all-open** is the whole of the difference between C and A now that the
  plate is gone. Both were rendered; a reviewer could reasonably say the 728px is not worth the
  eleven hidden groups on ACT.
- **Maroon is doing a second job.** Three non-action marks in this component are now maroon: the
  module numbers, the outcome discs and the count figures. Individually each was a call; together they
  are a pattern that says *figures*, and "Heritage Maroon for actions only" no longer describes the
  code. Register work, not this session's — filed.
- **`countParts` derives "2 modules · 3 outcomes" from array lengths**, so it cannot drift from the
  lists. It also means a group with neither renders no count at all, which is why it is conditional.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [skills] **PRODUCT.md and DESIGN.md section 7 now contradict the shipped code.** Both say accordions
  are FAQ-only and that "what the course actually is" is never hidden; `ModuleRows` hides it on six
  pages. Either write the syllabus exception into both, or the decision reverts to variant A. A rule
  the code ignores in silence is worse than either being wrong alone, and "documentation drifted from
  the code and was trusted over it" is this repo's most-repeated recorded risk (seen 10x).
- [skills] **"Heritage Maroon for actions only" needs a figures clause, or three reverts.** Third
  filing of this shape today. Register-exclusive work under rule 7, so it cannot be done inside a
  session that also ships components.
- [build] **Author `contents` and `outcome` for ACT, TAS, WA and NSW.** Until then those four pages
  put one sentence behind each disclosure and show no module list at all. `src/data/modules.ts` is the
  worked example; the source is each course's own material, so it is a build-session job per page with
  a real source read.
- [design] **`UnitOutline`'s `.unit-eb { max-width: 58ch }` renders 89 CPL** on `/white-card-wa`,
  1 of 4 elements over the 85 rule. Carried forward from this morning's review, still open.
- [design] **A variant sheet must render the sparsest real data, not just the richest.** Six variants
  were reviewed against QLD only, and the four prose-only states were invisible in every one of them.

## Output
- [x] **Component reworked** — `src/components/ModuleRows.astro`, three data shapes, the rule
  exception and every measured figure recorded in the file.
- [x] **Variant sheet deleted** — `ModuleGroupsVariants.astro` and its six styleguide specimens are
  gone; the `ModuleRows` specimen now describes the disclosure behaviour and names the exception.
- [x] **Design-register change** — none in tokens or `global.css`. The maroon usages are rule
  deviations, not token edits, and are filed for a register session. Rule 7 not triggered.
- [x] **Verified** — build green, guardrails 20 pages, `system-health` 0 FAIL. Measured on all six
  course pages plus the styleguide, at desktop and 390px, with keyboard and `dist/` checks above.
- [x] **Demand item closed** — the variants item in `2026-07-30-modulerows-measure.md`.
- [ ] **Memory written** — not needed. The durable forms are the two `[skills]` items (rule
  reconciliation) and the component comments; neither is a fact about how I should work.

## Grader note

`graded_by: self` — no fresh-subagent design grader exists. Reproducible claims: the height table
(toggle every `<details>` and read `.mrows` height at 390px), the CPL figures (`Range.getClientRects()`
per character, grouped by line box), the alignment x-values, and the two `grep` hits proving collapsed
content is in `dist/`. The judgement a reviewer should push on is the Amber itself: I shipped against
two canonical rules because the person who owns the rules told me to, and recorded it rather than
refusing. If that is the wrong call, the demand list is where it gets reversed.
