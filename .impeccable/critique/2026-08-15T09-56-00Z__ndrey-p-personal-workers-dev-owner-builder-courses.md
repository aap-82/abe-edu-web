---
target: "https://abe-edu-web.andrey-p-personal.workers.dev/owner-builder-courses"
total_score: 27
max_score: 36
na_heuristics: 9
p0_count: 1
p1_count: 3
timestamp: 2026-08-15T09-56-00Z
slug: ndrey-p-personal-workers-dev-owner-builder-courses
---
Method: dual-agent (A: design review · B: detector + browser evidence, run isolated and in parallel)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Scrollspy works and clears the 114px sticky chrome exactly; no `aria-current`, and the mobile table gives no sign 40% is off-screen |
| 2 | Match System / Real World | 4 | Four states, four correct legal nouns (approval / permit / permit / licence), held distinct everywhere. `NONACCABE` ships unglossed |
| 3 | User Control and Freedom | 3 | Native `<details>`, no modals, back-safe. NSW visitors hit a dead end with no notify-me |
| 4 | Consistency and Standards | 4 | 64px section rhythm, eyebrow→H2→capsule→content every time, no heading skips |
| 5 | Error Prevention | 3 | Excellent on the expensive error (wrong state) and the expensive surprise (government fees). WA card lead risks the opposite error |
| 6 | Recognition Rather Than Recall | 2 | Weakest. Mobile table hides ACT+NSW and scrolls its row labels away; wayfinder shows 2 of 4 links; four identical "View course" names |
| 7 | Flexibility and Efficiency | 3 | Two genuine routes (browse cards / compare table) plus a wayfinder — but the table route is ~60% broken on mobile |
| 8 | Aesthetic and Minimalist Design | 2 | Live FPO placeholder at 499×399; 3+1 grid with a 754px void; a sixth of the table spent on en-dashes |
| 9 | Error Recovery | n/a | No forms, inputs, validation or failure states on this page |
| 10 | Help and Documentation | 3 | FAQ + 5 dated sources + disclaimer is real documentation, but the authority question is collapsed at 7-of-7 |
| **Total** | | **27/36** | **Good (75%)** |

## Design Specificity Verdict

**Authored on the content layer. Borrowed on the composition layer.** That gap is the whole review.

**Authored.** The comparison table's rows only make sense for a product where a *regulator, not the buyer*, decides whether the purchase worked: `What you apply for` / `Course completed within` / `Course status` / `Government fee`. A marketplace would show price, duration, rating, enrolments. This names four regulators, four different legal instruments, four different currency windows, and refuses to flatten them.

**Borrowed.** The shell is a stock hub: hero with right-hand image well, three-up cards, alternating bands at a metronomic 64px, cross-sell pair, table, accordion, CTA band, fat footer. The image well is *empty* — a dashed FPO placeholder — which is the tell: the layout was chosen before anyone asked what this page has to show. And the one device the design system invented for exactly this product, the Verified Source Line, appears **zero times**.

A competitor could not ship this page's words. It could ship its shell tomorrow.

**Deterministic scan.** 26 advisory findings, all `quality`, across three rules: `design-system-color` ×4, `design-system-radius` ×5, `design-system-font-size` ×17. Browser-engine run added `tiny-text` (`p.reviewed`, 11px), `all-caps-body` (`.hc-state`, 34 uppercase chars at 11px), `line-length` (footer disclaimer at 97.3 CPL against the repo's 85 rule, corroborated independently by canvas glyph measurement), and `kicker-above-heading` ×5.

Confirmed false positives: `marquee` and `gradient-text` (absent from live DOM, built HTML and every stylesheet — checked both), `cream-palette` (that is `--ground`, the deliberate 24 Jul palette split), the 17 font-size advisories (the rule fires on the entire type ramp, so it is measuring an unmatched DESIGN.md ramp definition rather than 17 defects), and `gpt-thin-border-wide-shadow` on a 0×0 hidden element.

Two detector findings are **not** false positives and the review reached them independently: `#e4dccf` is the banned placeholder gradient (P0 below), and `#00000017` / `#00000029` are the `.mega` and `.mnav` box-shadows, which DESIGN.md's Hairline Rule prohibits outright.

**Visual overlays.** Direct in-tab injection froze the renderer past the 45s CDP limit (the detector's autoScan does a full scroll sweep). Re-run under Playwright with `autoScan:false`, so the overlay findings are genuine browser-engine results — but **no user-visible overlay is available in your browser**; the live server was started, served `/detect.js`, and was stopped again.

## Overall Impression

This page is two products. The **copy** is genuinely excellent and does something almost no competitor can: it holds four jurisdictions apart with the correct legal noun for each, and it states government fees at 2.6–2.8× its own price rather than hiding them. The **design** does not carry any of that. It routes the reader through a generic hub shell whose most prominent element above the mobile fold is an unfinished placeholder, and it puts the strongest proof the business owns — five dated regulator citations — in 13px grey-on-ink at 80% scroll depth.

The single biggest opportunity: the page already contains the trust content. It just never *shows* it. One Verified Source Line under the comparison table would convert "some numbers" into "four regulators, checked on these dates."

## What's Working

**1. The Government fee row is the most credible thing on the site.** Four figures, two of them ($470.40 TAS, $493.59 QLD) at 2.6–2.8× the course fee, stated plainly with a caption confirming they are paid separately. It answers "what will it really cost" completely and makes ABE's own $179 look small. This is the anti-reference refuted in one table row.

**2. Four-jurisdiction vocabulary precision.** WA is never "approved" ("supports your Form 75 approval"); QLD carries the NONACCABE code; ACT is "accepted by"; TAS is "CBOS-approved". Four legal nouns, four states, held distinct across cards, table and FAQ.

**3. Craft in the places nobody checks.** `scroll-margin-top: 120px` against a measured 114px of sticky chrome, so every jump lands with 6px clearance. All 49 tabbable elements carry a 2px maroon focus ring at 10.4:1. One `<h1>`, ten headings, no skips. A full alpha-aware sweep of 59 colour combinations found exactly **one** AA failure.

## Priority Issues

**[P0] The hero ships a visible FPO placeholder on a 59.9k-impression page**
`.z-img` renders 499×399 on desktop — the entire right half of the hero — and 334×267 on mobile, entering the fold at y=705 so it is the last thing in the first screenful. It reads "IMAGE PLACEHOLDER / Hub artefact placeholder" over a `linear-gradient(165deg, #f0eae0, #e4dccf)`. The detector independently flagged that gradient colour, and the browser sweep found exactly **one** `<img>` on the entire page (the 32×32 logo).
*Why it matters:* a YMYL reader deciding whether to trust a stranger with a government application closes their first screen on visible unfinished work. The gradient is also on the anti-reference list.
*Fix:* a routing hub has no artefact to show. Remove `.z-img` for hubs and run the hero one-column with the process strip beneath — that lifts the four state cards ~700px up the page. Filling the slot is the weaker option.
*Suggested command:* `$impeccable layout`

**[P1] The mobile comparison table hides 40% of itself, and is keyboard-unreachable**
Both agents hit this from different directions. `.cmp-wrap` is 334px against a 560px table: **226px hidden at 390px, 296px at 320px**. ACT and NSW are entirely off-screen at rest; the last visible thing is TAS followed by a clean 26px gutter that reads as *the table ends here*. No fade, no chevron, no hint text. The first column is `position: static`, so swiping right to reach ACT deletes "Government fee" and "Course completed within" and leaves bare numbers. Separately, the detector found the container has **no `tabindex`, no `role` and no accessible name** — a scrollable region a keyboard user cannot reach at all (WCAG 2.1.1).
*Why it matters:* two of the four states ABE actually sells are invisible on the page's core comparison instrument, on the device most visitors use.
*Fix, in value order:* sticky first column with a `--paper` background; a right-edge fade that clears at max scroll; `tabindex="0"` + `role="region"` + an accessible name; and drop the NSW column below 768px — it is 94px, a third of the hidden width, and carries eight en-dashes.
*Suggested command:* `$impeccable adapt`

**[P1] No trust surface exists between an 11px byline and the dark footer**
Measured: **zero** verify-blue (`#2f5d8c`) or verify-deep (`#1e3d5c`) pixels anywhere in `<main>` or `<footer>`. `Hero` is called with `ticks={[]}` and `proof={[]}`; `trust` is undefined so `TrustBand` never renders. DESIGN.md calls the Verified Source Line "the trust device, and the most literal expression of the North Star" and states that *every government fact block ends in one*. This page states roughly twenty government facts and carries none. The only pointer is a 14px caption redirecting the reader 4,000px down to a dark footer to hand-match five links against four columns.
*Why it matters:* this is the reader's second question — "will my regulator accept *this* course" — answered perfectly by the copy and not at all by the design.
*Fix:* one Verified Source Line directly beneath the comparison table. Existing component, ~80px.
*Suggested command:* `$impeccable polish`

**[P1] The footer fails three separate accessibility floors**
Detector-only; the design review did not reach it. **18 footer links render 18px tall** — under even the WCAG 2.5.8 AA 24×24 floor, let alone 44×44 (27 of 49 interactive elements miss 44×44 overall). The focus ring measures **1.59:1 against the `#1a1a1a` footer**, failing WCAG 1.4.11's 3:1 for all 20 footer links, even though the same ring is 10.4:1 everywhere else. And the footer disclaimer runs **97.3 characters per line** against this repo's own documented 85 rule — the only block on the page over it.
*Why it matters:* the footer is where the five regulator citations live. It is the least usable region on the page and it holds the best evidence.
*Suggested command:* `$impeccable audit`

**[P2] The desktop spoke grid renders 3 + 1**
`repeat(3,1fr)` above 1100px puts ACT alone on row two with 754px of empty ground beside it. Below 1100px the same page gives a clean 2×2 — so it composes better on a tablet than a desktop.
*Fix, and this must be scoped:* the White Card hub has five spokes and would regress. Use a modifier class or `:has(> :nth-child(4):last-child)`, then verify `/white-card` live. This is the shared-component trap that has bitten this codebase before.
*Suggested command:* `$impeccable layout`

## Persona Red Flags

**Jordan (confused first-timer)**
- **The page never answers "do I actually need this?"** Only the QLD card names a trigger ($11,000 incl. GST). WA, TAS and ACT give currency windows but no threshold, and no section says "you need an owner builder course when…". That is the reader's *first* question and the hub skips to the second.
- **"No approved course in WA."** in bold is the first thing a Western Australian reads on the card built for them.
- **`NONACCABE`** ships raw on the card and in the table with no gloss.

**Casey (distracted, mobile)**
- The fold closes on "IMAGE PLACEHOLDER / Hub artefact placeholder."
- The sticky wayfinder shows **2 of 4** links; `Compare` sits at left:377 against a 374px container edge — zero pixels visible, no fade or partial bleed to suggest a swipe. 47px of permanent vertical space delivering half its function.
- **1,927px (2.3 viewports)** to the first state card without tapping the CTA.
- "Your certificate is emailed the moment you pass" — the most relieving sentence on the page — sits at y≈6,900 of 9,074. Casey never sees it.

**Riley (stress tester)**
- Asks *"who says?"* and finds no VERIFIED mark, no date and no source beside a single figure in the table.
- Asks *"are you an RTO?"* and finds it collapsed at FAQ 7 of 7.
- Reads the NSW column, finds **eight en-dashes**, and cannot tell "ABE has no NSW course" from "this page is broken".

## Minor Observations

- Intro capsule is **64 words** against the house 40–60 rule.
- Active wayfinder link is styled but carries no `aria-current="location"`.
- Whole-card anchors produce accessible names of **174–275 characters**.
- Four identical `View course` link names. `ComparisonTable` already accepts `ctaLabelTemplate` and this hub does not pass one — a one-line frontmatter fix.
- Footer is **1,815px on mobile**: 2.15 viewports, 20% of the page.
- CLS is **0.0065**, comfortably good; the single shift entry has byte-identical before/after rects, consistent with a font swap rather than a geometry move.
- `.mega` and `.mnav` carry box-shadows that DESIGN.md's Hairline Rule prohibits outright. Site chrome, not this page, but the mobile burger panel is the shadowed surface a phone user actually touches.
- **`check-design-register` has a blind spot this run exposed.** It reported "no off-scale literal radii" because it reads `global.css` only, where the scale is a clean 3/5/6/8. Component-scoped `<style>` blocks ship **7px ×4, plus 9, 4, 2, 12 and 10px** — which is exactly what the detector found in the built HTML. The check I wrote this morning cannot see component styles.

## Questions to Consider

1. **If you deleted the NSW column, what would the page lose?** It spends a sixth of the comparison surface, a third of the mobile table's hidden width, and one of seven FAQ slots on eight en-dashes — and a NSW visitor still leaves with nothing to do.
2. **This is a routing page. Why does it have a hero image slot at all?** The slot is empty because nothing obvious belongs there. Deleting it is a smaller change than filling it, and it lifts the state cards ~700px.
3. **The page's best asset is five dated regulator citations. Why are they 13px grey-on-ink below a CTA band, instead of under the table they authorise?**
4. **Which is the real primary action?** The page repeats "Choose your state" five times — hero, wayfinder link, wayfinder button, CTA band, sticky strip, all to `#spokes` — and never once names the action that earns money.
