---
# Machine-readable block for a DESIGN review. Kept in skill-reviews/design/ so the flat
# skill-reviews/*.md build-run scans (system-health coverage, review-trends) never read it.
date: 2026-07-28
kind: design
subject: design/footnote-component
graded_by: self
grade_reason: no fresh-subagent design grader exists yet; consistent with the other 2026-07 design reviews.
verdict: Green
shipped:
  - src/components/Footnote.astro     # new component
  - src/components/PriceCard.astro    # `foot` now renders through Footnote
  - src/styles/global.css             # .footnote rules; .price-foot kept as an alias
  - src/pages/styleguide.astro        # specimen (plain + rule variant)
---

# Design review — Footnote, fine print that does not compete

Session type: **design**, third change in this session. Requested from a live element selection on
`/white-card-tas#cost`: *"smaller than normal prose, different colour (some variation of grey),
required info that does not distract from the flow, like a terms and conditions footnote."* Built
through `/impeccable craft`; register **brand**.

## The gap, and the shape check

The treatment already existed **three times** and was reachable from none of them:

| Treatment | Spec | Locked inside | Reach |
|---|---|---|---|
| `.price-foot` | 14px `--slate`, 440px | `PriceCard`'s `foot` prop | 6+ pages |
| `.pl-disc` | 12px `--slate` + top rule | `PartnerDisclosure`, hardcoded | ASQA pages |
| `footer .f-auth` | 13px white-62% + top rule | `SourcesFooter` | every page |

There was **no way to write a footnote in an MDX body at all**. Three occurrences of one shape, none
available to prose.

**The shape was checked this time, not assumed.** That is the correction from earlier today, when the
ResourceLink migration item was withdrawn because "the same intent twice" had been mistaken for "the
same shape twice". Here all three are block-level small grey paragraphs of secondary information
trailing a main block with a capped measure. Same shape, genuinely. `.f-auth` is still excluded: it
sits on the ink ground with white text, which is a different contrast problem, not this one.

## The one real tension, settled by measurement

The request was for a quieter grey. There is none available, and the page proved it more sharply than
the argument did.

`--slate` `#6e6e6e` is the only AA-legal grey for readable text. `--slate-light` `#9a9a9a` measures
2.81:1 and DESIGN.md restricts it to inactive-component text and pure decoration, both WCAG-exempt.
Footnote copy is neither: the live example ends *"check the current amount before you lodge"*, an
instruction the reader is expected to act on, sitting beside a government fee.

Then the measurement. The footnote on `/white-card-tas` resolves against `--paper-warm` `#f5f1e8`,
the **darkest ground in the ramp**:

- measured contrast **4.52:1** against AA's 4.50 floor. It clears by **0.02**.

That is the tightest contrast margin in the system, and it is exactly the figure DESIGN.md cites as
the reason `--paper-warm` stops where it does. Any fading at all breaks it. So the component recedes
by **size only**, and the decision is now backed by a number rather than by reasoning.

## What shipped, with measured values (not ticks)

`.price-foot` renders on 6+ shipped pages, so the swap had to be provably invisible. Captured the
computed values **before** the change and diffed them after, on the built page:

| Property | Before (`.price-foot`) | After (`Footnote`) |
|---|---|---|
| font-size | 14px | 14px |
| line-height | 23.1px | 23.1px |
| color | `rgb(110,110,110)` | `rgb(110,110,110)` |
| max-width | 440px | 440px |
| margin-top | 24px | 24px |
| rendered width | 440px | 440px |
| lines / approx CPL | 4 / 52 | 4 / 52 |
| **tag** | **`P`** | **`DIV`** |

**Every value identical except the tag**, which is the deliberate change below. Six pages render
pixel-for-pixel as before.

Variants and states, measured on the specimen:

- plain: 14px, `#6e6e6e`, no border, no padding
- `rule`: 1px `#e5e7eb` top border, 24px padding-top
- link: inherits `#6e6e6e` and is **underlined**, so colour never carries the affordance alone
- responsive: desktop **52 CPL**, mobile at 375px **41 CPL** in 319px, no overflow. PRODUCT.md's
  standard is 45-75 desktop and 30-45 mobile; both land inside.

`line-height` is deliberately **not set**. It inherits 1.65, and small text wants more leading than
body, not less, so pinning it to the 1.6 band ceiling would have been backwards and would have
shifted six pages for nothing.

## The `<div>` decision

`Footnote` renders a `<div>`, not a `<p>`. MDX wraps multi-line children in their own `<p>`, and a
`<p>` inside a `<p>` is invalid, so the browser hoists the text out and strands it below an empty
element with a green build. That is mistakes-log #12, and `Note.astro` carries a "keep it on ONE
line" contract precisely because it renders a `<p>` and cannot survive it.

A `<div>` makes the nested `<p>` valid, so the failure mode is **eliminated rather than documented**.
Verified by injecting the exact MDX shape (`<div class="footnote"><p>…</p></div>`) into the built page
and measuring: the nested paragraph computes `margin: 0px`, 14px, `rgb(110,110,110)`, identical to the
plain form.

Cost: a semantic `<p>` becomes a `<div>` for this block. No accessibility regression, since it is
neither heading nor landmark and assistive tech treats both as text.

## Design-register changes

**No new tokens, no token values changed.** Rule 7 stays unengaged. `.price-foot` is retained as a
selector alias alongside `.footnote` so anything still writing the old class keeps its styling rather
than failing silently.

## Verification limits, stated

Screenshots were unavailable again (the Browser pane was not displayed, so compositing is off and
`computer screenshot` times out). All figures above are measured computed styles and element rects
read from the built page served out of `dist/`, which is the stronger evidence for this change anyway
since the whole claim is "nothing moved".

## Demand list

Tag every item: [skills] | [design] | [facts]

- ~~[design] `Note.astro` still renders a `<p>` and still carries the one-line MDX contract that caused
  mistakes-log #12. `Footnote` shows the fix is a one-character change to the wrapper element. Apply
  the same treatment to `Note`, and to any future slot-taking component.~~ fixed in #89
- [design] `.pl-disc` in `PartnerDisclosure` was left on its own 12px definition rather than folded
  onto `Footnote`'s `rule` variant, because it is regulated ASQA disclosure copy where the layout is
  part of the compliance record. Worth doing, worth doing deliberately.
- [design] The footnote clears AA by **0.02** on `--paper-warm`. Anything that darkens that token
  breaks this text first. If the ground ramp is ever revisited, re-measure this before shipping.
- ~~[design] Decide whether `VerifiedSources` and `SourcesFooter` citation links should open in a new
  tab (carried forward, unchanged, from the ResourceLink review).~~ decided in #94: citations stay same-tab; rule now in DESIGN.md §7
