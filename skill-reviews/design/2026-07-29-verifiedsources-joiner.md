---
# Machine-readable block for a DESIGN review. Kept in skill-reviews/design/ so the flat
# skill-reviews/*.md build-run scans (system-health coverage, review-trends) never read it.
date: 2026-07-29
kind: design
subject: design/verifiedsources-joiner
graded_by: self
grade_reason: no fresh-subagent design grader exists yet; consistent with the other 2026-07 design reviews.
verdict: Green
shipped:
  - src/components/VerifiedSources.astro  # conditional joiner, v-against -> v-join
  - src/pages/styleguide.astro            # specimen now shows both branches
---

# Design review — the joiner that said "against" twice

## What was wrong

`VerifiedSources` appended ` against ` between the `facts` string and the source links,
unconditionally. But `facts` is authored copy, and the house phrasing for it is
"... fact-checked against the current guidance". So the page rendered the word twice:

> "Course requirement and the $11,000 permit threshold fact-checked against the current guidance
> **against** QBCC — Required courses for owner builders"

It read as a stutter, and it had rendered that way for as long as those pages had been live.

**Measured before: 39 doubled blocks across 7 built pages**, out of 69 that carry a joiner. The
component's own header comment documented the doubling as if it were the intended output, which is
how it survived this long.

## Why the component, and not 37 copy edits

This was found as F14 on `/white-card-wa` by an independent Stage 7 audit, fixed there by rewriting
two `facts` strings, and only then measured across the site. Fixing the remaining 37 the same way
was rejected with Andrey on 29 Jul: **the component owns its own joiner, so nothing but the
component can stop the next page reintroducing it.** 37 hand edits would have been 37 chances to
regress, in six pipeline artefacts a design session may not touch anyway.

## What shipped

```js
const joiner = facts && /\bagainst\b/i.test(facts) ? ' · ' : ' against ';
```

**A separator, not a deletion.** The obvious fix — drop the joiner when it would double — yields
"...the current guidance QBCC — Required courses": two noun phrases collided with no boundary, which
is worse than the stutter. `·` is the house separator already doing exactly this job in Hero
eyebrows, `Credentials`, `PartnerDisclosure` and the styleguide's own prop lists.

**The test is `\bagainst\b` anywhere in `facts`, not just at the end.** "checked against the register
and the regulator's guidance" is equally doubled, and the word boundary keeps it off words that
merely contain the letters.

**`v-against` renamed `v-join`.** The old name described one of the two things it can now hold. No
CSS rule targeted it — it was an unstyled span — so the rename cost nothing.

## Measured, after

| | Before | After |
|---|---|---|
| Doubled "against" in `dist/` | **39** | **0** |
| Blocks joined by `·` | 0 | 39 |
| Blocks joined by "against" | 69 | 33 |
| Total joiner blocks | 69 | 72 (the styleguide specimen went from 1 to 2, plus the new one) |

Per page after the change, `middot / against`: act 5/1 · nsw 6/1 · nsw-w 7/1 · qld 7/1 · tas-ob 8/0 ·
white-card-tas 4/2 · white-card-wa 0/9 · wa-ob 0/9 · cpd-building-tas 0/3 · cpd 0/2 · cpd-tas 0/3 ·
accreditation 1/0 · styleguide 1/1.

**The 33 blocks that already read correctly are untouched.** They still render "Deposit caps
fact-checked against QBCC Act 1991", which is the reading the ledger was designed for.

## The non-breaking space, which was measured rather than assumed

The first build used an ordinary space before the middot. At **375px**, one of the eight blocks on
`/qld-owner-builder-course` wrapped so that the middot **began a visual line** — a stray dot opening
a line, which reads as a typo rather than a separator.

Changed to a no-break space before the dot, ordinary space after, so the dot stays glued to the last
word of `facts` while the line may still break between the dot and the source.

| At 375px, `/qld-owner-builder-course` | Ordinary space | No-break space |
|---|---|---|
| Blocks with the joiner | 8 | 8 |
| **Joiners orphaned at a line start** | **1** | **0** |
| Block 3 height | 3 lines | 4 lines |

**The cost is stated, not hidden:** one block gained a line. In a 12px mono ledger at 18.6px line
height that is 18.6px, against a stray dot that reads as an error. Worth it.

**Overflow was bounded, not hoped for.** The longest word that can now be glued to the dot anywhere
in the build is `instruments` (11 chars) on `/act-owner-builder-course`; at 12px DM Mono that token
is roughly 94px of a 319px line, so the glue cannot push a line past its container.

## Design-register changes

**None.** No token values changed, no new CSS rule, no new class with styling. The only class change
is a rename of an unstyled span. **Rule 7 is not engaged.**

## Verification limits

Screenshots could not be captured: the Browser pane was not displayed, so the page was not
compositing frames and `computer{action:"screenshot"}` timed out. Everything above is therefore
measured from the DOM and from `dist/` rather than seen — line counts from
`getBoundingClientRect().height / lineHeight`, joiner positions from `getClientRects()`, and the
before/after counts by matching the rendered `v-join` spans in the built HTML. That is the stronger
evidence for this change in any case, since the defect is textual, but a human should glance at
`/qld-owner-builder-course` on a phone before the real-domain cutover.

The `\bagainst\b` test is a heuristic over authored prose. It cannot know that a `facts` string
saying "the case against the applicant" is not a source reference; such a string would get the
middot when "against" would have read better. No such string exists in the build today, and the
styleguide specimen now shows both branches so the behaviour is discoverable rather than surprising.

## Demand list

Tag every item: [skills] | [design] | [facts]

- [design] The `facts`/joiner contract is enforced by a regex at render time and by nothing at build
  time. If a page ever wants the literal word "against" inside a fact for a non-source reason, the
  component will silently pick the wrong joiner. One occurrence would justify moving the choice to an
  explicit prop; zero so far, so this is recorded, not built. Second occurrence is the trigger.
- [skills] `05-components.md` for `white-card-wa` now carries the "facts must not end in against ..."
  rule that this component change makes unnecessary. It is a page artefact a design session may not
  edit; a build or skills session should reduce it to a pointer at this review.
- [design] Both images on `/white-card-wa` use maroon line work decoratively, which DESIGN.md
  reserves for actions. Carried forward unresolved from `06-image-prompts.md`; now two instances on
  one page, which is this project's threshold for deciding rather than noting.
