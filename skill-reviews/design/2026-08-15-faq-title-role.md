---
subject: faq-title-role
date: 2026-08-15
session_type: design
graded_by: self
exclusive: true
---

# Design review — the FAQ summary joins the Title role

**Exclusive session (CLAUDE.md rule 7).** This is a design-register change, so it is the only thing
this session did. `graded_by: self` — there is no fresh-subagent design grader (rule 9). Mitigated by
every value below being read from `getComputedStyle` in a real browser rather than from the
declaration I edited, which is the failure mode this repo has paid for before: a CSS fix that lost a
specificity contest and shipped doing nothing.

## What the defect actually was

Filed three times (11 Aug, 12 Aug, and again by the 15 Aug audit) as "`.faq summary` is the only
remaining holder of the undocumented Archivo 600 18px". That framing is not quite right, and the
correct one changes what the fix should be.

**The defect was a contradiction inside `DESIGN.md`.** §3 has always named the Title role as covering
*"card and sub-section H3s; FAQ and price figures share this weight"* — 22px, tracking -0.01em. §5's
FAQ paragraph said the summary is *"Archivo 600 18px"*. The register described one element two ways,
in one document, and both halves are internally consistent, which is why neither
`check-design-register` nor a reader of §3 alone would catch it. The check compares declared roles
against their rendering rule; nothing asks whether a component paragraph contradicts a role paragraph.

That reframing settles the open either/or the item carried — add an 18px step to §3, or move the
element. **Rule 7 says the locked system opens when it cannot express what is needed, not when a page
would look better.** §3 already expressed this exactly, and named the FAQ while doing it. So the
element moves and no step is added; the register did not need to grow, it needed to be obeyed.

The sibling accordion had already made the identical move for the identical reason. `.mr-title` went
18px → 22px "for register conformance", and its comment records the cost it accepted (+6% section
height, two titles going from two lines to three) and the ratio argument: against a 15px row body,
18px was a 1.2 step, "under" the 1.25 the scale asks for. That argument transfers unchanged — against
the FAQ's 16px `.ans`, 18px was **1.125** and 22px is **1.375**.

## Measured, before and after

`getComputedStyle` in headless chromium, `/qld-owner-builder-course`, dev server.

| | Before | After |
|---|---|---|
| `font-size` | 18px | **22px** |
| `line-height` | 29.7px (1.65, inherited from body) | **27.5px** (1.25, declared) |
| `letter-spacing` | `normal` | **-0.22px** (-0.01em) |
| family / weight | Archivo 600 | Archivo 600 (unchanged) |
| step against 16px `.ans` | 1.125 | **1.375** |

Layout cost, same page:

| | Before | After | Δ |
|---|---|---|---|
| FAQ block, 375px | 971px | 993px | **+22px, +2.3%** |
| FAQ block, 1280px | 684px | 666px | **−18px, −2.6%** |
| Rows wrapping, 375px | 7 of 8 at 2 lines, 1 at 1 line | 7 at 2 lines, 1 at 3 lines | one row deeper |
| Row heights, 1280px | 70px × 8 | 68px × 8 | tighter leading beats bigger type |
| Smallest tap target | 70px (desktop) / 99px (mobile) | 68px / 95px | still ≫ the 44px floor |
| Horizontal overflow, 375px | none | none | — |

The desktop block getting **shorter** while the type gets bigger is the declared 1.25 line-height
doing more work than the four extra pixels, on rows that do not wrap. The mobile cost is +2.3%,
against the +6% `.mr-title` accepted for the same trade.

**Parity, measured on a page carrying both accordions** (`/act-owner-builder-course`, 375px):
`.faq summary` and `.mr-title` are now identical on all five compared properties — family, weight,
size, line-height, letter-spacing. The type half of the "one accordion, not two" claim in
`ModuleRows.astro` is true again. Its other half is not: ModuleRows still uses `--paper-grey` for
hover and tints its open state while the FAQ does neither. That remains open and is not this
session's to take.

**Every consumer checked, not just the one I edited.** `.faq` renders on 14 course and bundle pages,
`/cpd`, `/cpd-tas`, the hub layout and `/styleguide`. Spot-measured on a course page, a hub
(`/white-card`, 7 rows, tap 95px, no overflow) and a page carrying both accordions; the systematic
guarantee is `check-reflow`, which measures **48 page/viewport combinations in a real browser** and
reports 0 elements over the CPL rule and no sideways scroll at 375px or 1280px.

Gates: build green, guardrails 28/28, `check-design-register` 5/5, `check-reflow` 0 failing,
`check-meta` 0 failing.

## Two corrections to the record

**1. The item's claim was false, and I had written it into `DESIGN.md` before checking it.** "The only
remaining holder of the undocumented Archivo 600 18px" is not true. `.h4` is Archivo 600 18px — family
and weight from the `h1,h2,h3,h4` rule, size at `global.css:235` — with a live consumer in
`TopicGrid.astro`, and the wordmark is Archivo 600 18px in two places. Measured across `global.css`,
the display face is set at **16, 17 (two weights), 18, 19, 22, 24, 28 and 36px plus two clamps**,
against the **six** roles §3 names. I had already committed the sentence "that was the last
off-register type value in the build" to the register before running the grep that disproves it.
Corrected in both `DESIGN.md` and the CSS comment. Filed below rather than fixed: it is a much larger
register decision, and rule 7 makes this session exclusive.

**2. I broke the stylesheet mid-session and the browser caught it.** Correcting that sentence with a
scoped edit closed the comment early, leaving four lines of prose and a stray `*/` as live CSS
directly above `.faq summary`. Repaired, then verified two ways: a brace and comment-delimiter balance
check over the whole file, and a re-read in the browser confirming the rules that sit *after* the
comment still apply — container border `1px solid rgb(229,231,235)`, radius 8px, plus-mark maroon
20px, `.ans` 16px with its max-width. Checking the property I edited would not have caught this; the
damage was downstream of it.

## Demand list

Tag every item: [skills] | [design] | [facts] | [build]

- [design] **The display face is set at eight sizes §3 does not name**, measured 15 Aug 2026: 16px
  (`.partner .p-name`), 17px/500 (`.ph .ph-d`), 17px/600 (`.rl-t`, `.hub-card .hc-price`), 18px
  (`.h4` via `TopicGrid`, plus the wordmark), 19px (`.hub-card .hc-title`, `.cmp` emphasis), 24px
  (`.price-row .p-v`), 28px (`.glance .g-v`), 36px (`.tstat .n`), and `clamp(15px,2.9cqw,19px)`
  (`.proof .n`). §3 names six roles. Either the register grows steps or those components move onto
  existing ones, and the wordmark is arguably a mark rather than type and outside the scale entirely.
  Exclusive session (rule 7). **This is the item the FAQ fix was a single instance of**, and it was
  invisible for three filings because each one looked at one selector.
- [design] `check-design-register` cannot see a contradiction between two paragraphs of `DESIGN.md`.
  It compares declared roles to their rendering rule, so a §5 component paragraph stating a different
  value from the §3 role it claims membership of passes silently — which is exactly how this defect
  survived. A cheap guard: assert that a size quoted in a §5 component paragraph matches the role that
  paragraph names.
- [skills] **`.impeccable/live/server.json` is runtime state and is not gitignored.** It was written
  by starting the dev-server preview during this session, alongside the tracked `.impeccable/design.json`
  which is real config. A machine-local server record is the kind of file that gets committed by an
  absent-minded `git add -A` and then confuses the next session about what is running. `.gitignore`
  and `.impeccable/**` are both skills-owned, so this session left it untracked rather than fixing it.
- [design] `.faq` and `.mrows` are now identical on type and still differ on hover and open-state
  tint. Carried from 12 Aug; the type half is closed, so either the FAQ adopts `--paper-grey` and the
  open tint, or `ModuleRows.astro`'s "one accordion, not two" comment is narrowed to say it means the
  type register only.
