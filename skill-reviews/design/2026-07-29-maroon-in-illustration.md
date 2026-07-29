---
# Machine-readable block for a DESIGN review. Kept in skill-reviews/design/ so the flat
# skill-reviews/*.md build-run scans (system-health coverage, review-trends) never read it.
date: 2026-07-29
kind: design
subject: design/maroon-in-illustration
graded_by: self
grade_reason: no fresh-subagent design grader exists yet; consistent with the other 2026-07 design reviews.
verdict: Green
register_change: true
shipped:
  - DESIGN.md   # One Maroon Rule: line-art illustration admitted as a role, with three conditions
---

# Design review — maroon in illustration

**This session did nothing else.** Rule 7: a session that edits the design register edits the design
register. The two items queued alongside this one were shipped separately first (`#83`, the
`05-components` pointer) so this branch touches one file plus its review.

## The question, and why it was a real one

Two illustrations shipped on `/white-card-wa` on 29 July drawn in **maroon line work**. Both flagged
the conflict at the time rather than after: DESIGN.md's One Maroon Rule caps the accent at 10% of a
screen **and** lists its roles as "marks, ticks, hovers, and active states". An illustration is none
of those.

`06-image-prompts.md` recorded it as an open `[design]` question at Slot 1 and predicted it would
recur "the moment a second page takes the schematic option". It recurred faster than that — on the
same page, at Slot 2 — which is this project's own threshold for deciding rather than noting.

## Measured before deciding

| | Hero | Assessment drawing |
|---|---|---|
| Native | 1000 x 1250 | 928 x 1152 |
| Rendered at 375px | 319 x 399 | 319 x 399 |
| **Share of a 375px screen** | **41.8%** | **41.8%** |
| Pixels clearly darker than ground (L<128) | **5.2%** | **4.8%** |
| Soft antialias band (L 128-200) | 9.0% | 1.1% |
| **Upper-bound maroon on screen** | **~4%** | **~2%** |

The hero's antialias band is nine times the other's because AVIF leaves its finer architectural
strokes much softer. **~4% is the number to quote**, not the 2% that counting only hard pixels would
have given. Both are inside the 10% ceiling with room to spare.

**The measurement did not settle it, and saying so is the point.** Quantity was never the objection;
the role list was. Had the answer been "it is under 10%, therefore fine", the One Maroon Rule would
have been reduced to a percentage and every future large maroon element would clear it. So the
register admits illustration as **its own role**, with conditions, rather than letting it in under an
existing one.

## What shipped

`DESIGN.md`, five places, all consistent:

1. **Key Characteristics** (§1): "Line art may use it; fills never may."
2. **Regulator Maroon** (§2 Primary): "the strokes of a line-art illustration" added to the role list.
3. **The One Maroon Rule** (§2 Named Rules): role added inline, plus a new **Maroon in illustration**
   clause carrying the three conditions and the measurements.
4. **Do** list: strokes added to the enumerated permitted uses.
5. **Don't** list: "don't let an illustration FILL a shape with it. Strokes are permitted, areas are
   not."

### The three conditions, and what each is load-bearing against

1. **Strokes only** — no fills, shading, gradients or tinted areas. Without this the clause is a hole:
   a maroon-filled illustration is a large fill by another name, and large fills are what the rule
   exists to prevent.
2. **The 10% ceiling still applies, to the screen and not to the drawing.** Stated this way because
   the natural mistake is to measure the ink inside the image and stop. A 5% drawing at full-bleed is
   a different number from a 5% drawing at 41.8%.
3. **One visual language per page.** Carried over from `06-image-prompts.md`, which warned that a
   maroon hero above an ink diagram would be worse than either consistent answer. Now enforceable
   prose rather than a note in one page's artefact.

## Ink was the alternative, and why it lost

At `--ink` a line drawing sits at the **same value as body text on the same warm ground** and reads
as a generic technical diagram with nothing tying it to the site. That is recorded in DESIGN.md so
the next person choosing does not have to re-derive it.

Both shipped assets stay as they are. No regeneration, no image change in this session.

## Verification limits

**Nothing is rendered by this change**, so there is nothing to screenshot: DESIGN.md is a reference
document, not a stylesheet. The numbers in it come from `sharp` over the source AVIFs (raw pixel
luminance histograms) and from `getBoundingClientRect()` in the browser at a 375px viewport, both
recorded above so a reader can re-run them.

The pixel figures are **threshold-dependent**, which is why the review gives the histogram bands
rather than one number. A different threshold moves the hero between roughly 5% and 14% of the image.
The conclusion is not sensitive to that choice — even the 14% reading puts the hero at about 6% of the
screen — but a future reader quoting a single figure should quote the band it came from.

## Demand list

Tag every item: [skills] | [design] | [facts]

- [design] Only one page uses line-art illustration. The clause is written to generalise, but it has
  been tested against a sample of two images on one page. Re-read it the first time a second page
  takes the schematic option, which is when the "one visual language per page" condition will get its
  first real test.
- [skills] `06-image-prompts.md` for `white-card-wa` carries the open `[design]` question this review
  closes, in two places. A build session should reduce both to a pointer here, the same treatment
  `05-components.md` got in `#83`.
- [design] Nothing measures maroon coverage automatically. The 10% ceiling has always been a prose
  rule checked by eye, and this clause adds a case where eye-checking is hardest, since a drawing
  looks like more ink than it is. Not built: one occurrence, and a coverage checker is a large piece
  of tooling for a rule that has not yet been broken.
