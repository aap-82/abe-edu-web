---
# Machine-readable block. scripts/review-trends.mjs parses this, so keep the keys and
# shapes exactly as they are — prose belongs below the frontmatter, not inside it.
date: 2026-07-28
skill: abe-readability-audit
subject: white-card-wa
archetype: 2 — Nationally recognised course
verdict: Amber
graded_by: self
scores:                            # green | amber | red
  correct_and_safe: green          # NON-NEGOTIABLE. red here fails the whole run.
  passed_gates_first_time: red
  inside_effort_budget: green
  low_rework: green
  taught_us_something: green
metrics:
  turns_to_passed_audit: 4         # assistant turns from start to a clean audit
  manual_fix_passes: 0             # fixes needed after the skill said "done"
  gate_fails_after_handoff: 1      # checks that failed only after handover
---

# Readability audit: /white-card-wa

**Page type:** course (archetype 2, nationally recognised) · **Audited:** 28 July 2026
**Method:** measured in a real browser at 375px and 320px against a static server on `dist/`.
`audit_static.py` and `audit_render.py` were **not** run: Python is not installed on this machine,
and per CLAUDE.md those scripts target the design-rules `.t-*` register, which this build does not
use. Every value below is a live measurement from `getComputedStyle`, `getClientRects` and a
WCAG-formula contrast calculation, not an estimate.

**`graded_by: self`** — there is no fresh-subagent grader for a readability sub-audit, and the run
that authored the page also measured it. Stated so the bias is on the record.

## Verdict

**Amber.** Typography is sound on every dimension measured: 17px prose at 1.65 leading, 8.43:1
contrast, and 32 to 35 characters per line on mobile, which is inside the 30 to 45 target. The page
fails one hard rule, and it fails it badly: **it scrolls sideways, by 35px at 375px and 90px at
320px.** The single most important fix is a component CSS change, not a page change.

## Scorecard

| Dimension | Verdict | Measured |
|---|---|---|
| Line length (measure) | **Pass** | **35 CPL** at 375px, **32 CPL** at 320px (10 and 11 line boxes over a 348-character paragraph). Target 30-45 mobile. |
| Font size and smallest text | **Fail** | Prose **17px**, capsule **18px** — both above the 16px floor. But the smallest rendered text is **9px** ("Soon" badges in the nav megamenu), below the 12px floor. |
| Line spacing and rhythm | Pass | Prose `28.05px / 17px` = **1.65**. Capsule `27.9px / 18px` = **1.55**. Target 1.4-1.6. |
| Hierarchy and type roles | Flag | Levels are visibly distinct, but the DOM order is **H1 → H3 → H2**: `PartnerDisclosure` at `after-hero` emits an H3 before the first H2. |
| Typeface and character legibility | Pass | DM Sans body, DM Mono for figures. Low stroke contrast, unambiguous numerals in the price tally. |
| Columns, grids, Gestalt grouping | Pass | Running prose single-column throughout (`.measure`, 319px at 375). Grids stack. |
| Alignment and paragraph structure | Pass | Left-aligned, ragged right. **No justified text**, no multi-column prose. |
| Contrast and colour | **Fail** | Prose **8.43:1**, capsule **11.88:1**, both well above AA. But the 9px "Soon" badge measures **2.81:1**, below the 4.5:1 floor. Ground `rgb(251,249,245)` and ink `rgb(74,74,74)` respect the no-pure-white / no-pure-black rule. |
| Scanning, chunking, answer-first | Pass | Eight question-led H2s, every section opens on a 43-55 word answer capsule. |
| Progressive disclosure | Pass | Only the FAQ is collapsible, and no load-bearing fact is hidden inside it. |
| Conversion-element placement | Pass | One primary CTA per view, repeated at hero, mid-page and CtaBand, plus a sticky bar. Primary CTA measures **81px tall × 264px** at 320px, comfortably above the 44px target. Trust sits beside the claim (`rto-partner` after-hero, TrustBand before `your-card`). |
| Mobile, reflow, page weight | **Fail** | **Sideways scroll: 410px document in a 375px viewport (35px over), and 90px over at 320px.** Hard rule 7. |
| Wayfinding and information scent | Pass | Eight-item in-page nav in a horizontal scroller, plus per-section "next" wayfinders forming an unbroken chain. |
| Accessibility | Flag | Reflow fails (above). Two secondary tap targets under 44px: the `#real` micro-CTA at **26px** and a 40×20 chrome link. Primary CTAs all pass. |

## Top fixes, ranked by impact

1. **Let the RTO partner's email wrap.** `overflow-wrap: anywhere` (or `word-break: break-word`) on
   the `PartnerDisclosure` contact cell. **This is the whole overflow.** `admin@bluedogtraining.com.au`
   is 28 characters with no break opportunity, and it forces the document to 410px.
   **[component change — `src/components/PartnerDisclosure.astro`, design-owned]**
2. **Raise the "Soon" badge to 12px and darken it to at least 4.5:1.** Currently 9px at 2.81:1,
   failing both the size floor and AA. Sitewide nav chrome, so it affects every page.
   **[component change — `SiteHeader.astro`, design-owned]**
3. **Give `PartnerDisclosure` a heading-level prop** so `after-hero` placement emits an H2 rather
   than an H3 and the H1 → H3 → H2 skip disappears (WCAG 1.3.1). **[component change]**
4. **Raise the `.btn-link` micro-CTA to a 44px target.** Currently 26px tall. **[component change]**

Nothing in the top four is a page-copy fix. The page's own typography needs no change.

## The finding that matters, and how it was isolated

The overflow is **pre-existing and sitewide on ASQA pages**, not a regression from this build. Isolated
by measuring three pages at 375px on the same server:

| Page | Carries `PartnerDisclosure`? | `scrollWidth` | Sideways? |
|---|---|---|---|
| `/qld-owner-builder-course` | no | **375** | no |
| `/white-card-tas` | yes | **410** | **yes** |
| `/white-card-wa` | yes | **410** | **yes** |

The clean control is QLD: same layout, same chrome, no partner card, no overflow. Both pages that
render the partner card land on exactly 410px, and in both the widest non-navigation element is the
same email address at `right: 410`.

**It will affect all five White Card state pages**, since every one is ASQA and renders this card.
Fixing it once fixes the wave.

## What this run found that the build did not

The build was green, `guardrails` passed 20 pages, `check-claims` reported 0 failing and the
independent Stage 7 audit returned a PASS after fixes. **None of them can see a horizontal scrollbar**,
because none of them renders the page. A 90px overflow at 320px is invisible to every gate in the
repo and obvious to any reader on a small phone.

That is the argument for running this audit as part of Stage 7 rather than after it, which is what
happened here: this ran only because it was asked for. Recorded as the `gate_fails_after_handoff`.

## Already working, leave alone

Genuinely sound and worth not touching: 17px prose at 1.65 leading is at the generous end of the
target; 8.43:1 and 11.88:1 contrast are far above AA; measure holds at 32-35 CPL on mobile without a
single justified or multi-column block; the primary CTA is 81px tall; question-led H2s every section
with answer-first capsules; and the ground/ink tokens respect the off-black-on-off-white rule exactly.

## What worked

Measuring in a real browser instead of reading CSS. Every finding here came from a rendered value,
and the two that matter (overflow, 9px badge) are invisible in the source.

The three-page control test turned "this page overflows" into "the partner card overflows, on every
page that renders it, and here is the clean control" in three measurements.

## What did not

**`passed_gates_first_time: red`** — the page ships a hard-rule Fail on reflow.

Two of my own measurements were wrong before they were right, and both would have been reported as
fact if not re-checked:
- CPL first measured as **348** because `getClientRects()` on a block element returns one rect, not
  one per line. Fixed with a `Range` over the text nodes: the real figure is 35.
- An earlier grep-based coverage check reported terms MISSING that appear 41 and 50 times on the
  page, because shell escaping corrupted the regex.

Same lesson twice in one session, and it is the mistakes-log #18 lesson in a new form: **a
measurement that reports an absence or an anomaly must be re-run by a second method before it is
believed.**

## Output

- **Fix applied:** none in this session. All four ranked fixes are component changes in
  `src/components/**`, which a build session may not write (CLAUDE.md session types). Routed, not
  bodged.
- **Handover:** the four fixes above, with measured before-values, are ready for a design session.

## Demand list

Tag every item: [skills] | [design] | [facts]

- ~~[design] `PartnerDisclosure` contact email forces 410px document width at a 375px viewport, and 90px
  of horizontal scroll at 320px. Add `overflow-wrap: anywhere` to the contact cell. **Affects every
  ASQA page — white-card-tas and white-card-wa today, all five White Card states by the end of Wave 3.**
  Control: `/qld-owner-builder-course` has no partner card and does not overflow.~~ fixed at
  `global.css:648-654` (`min-width:0` on the grid track plus `overflow-wrap:anywhere`). Re-measured
  2026-08-01 in a real browser: `documentElement.scrollWidth` is 375 at a 375px viewport and 320 at
  320px on BOTH `/white-card-wa` and `/white-card-tas` — zero horizontal scroll where the filing
  measured 35px and 90px.
- ~~[design] Nav "Soon" badges render at **9px** and **2.81:1** contrast, failing both the 12px floor
  and WCAG AA. Sitewide chrome.~~ fixed at `SiteHeader.astro:404`. Measured 2026-08-01 with the
  megamenu open: 11px, `--slate` on white at **5.10:1**, box 24.1x43.7px. 11px is DESIGN.md's Label
  token, not a breach — see the 12px-floor conflict filed as [skills] in the 2026-08-01 review.
- ~~[design] `PartnerDisclosure` at `placement: after-hero` emits an H3 as the first heading after the
  H1, skipping H2 (WCAG 1.3.1). Needs a heading-level prop. **Second occurrence — also filed by the
  Stage 7 audit on this same page (F1).**~~ fixed: headingLevel prop shipped; verified H1->H2 in dist
- ~~[design] `.btn-link` micro-CTA renders a 26px tap target, below the 44px minimum.~~ fixed at
  `global.css:123` (`min-height:44px` on an inline-flex link). Verified 2026-08-01: `.btn-link` does
  not appear in a sweep of every interactive element under 44x44 across all 20 built pages.
- [skills] The readability audit is specified as part of Stage 7 but is not enforced by anything, and
  has now been skipped on **three consecutive runs**. A green build, green guardrails and a passing
  Stage 7 audit cannot see a horizontal scrollbar. Either make it a required Stage 7 row that FAILs
  when absent, or add a headless render probe to the build.
- ~~[skills] The skill's `audit_static.py` / `audit_render.py` cannot run here: no Python on the
  machine, and they target the `.t-*` register this build does not use. Either port the checks to
  node against the real token set, or state plainly in the skill that they are unusable on this repo
  so a run does not waste a turn discovering it.~~ corrected 30 Jul 2026: py works (Python 3.14 + playwright); see references/verification.md
