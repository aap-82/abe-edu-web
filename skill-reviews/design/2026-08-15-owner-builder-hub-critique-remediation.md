---
date: 2026-08-15
skill: design-session
subject: /owner-builder-courses critique remediation — mobile comparison table, dark-ground footer, four-card hub grid, and the coming-soon card's real contrast
verdict: Amber
graded_by: self
reason_for_self_grade: There is no fresh-subagent design grader (rule 9). Every claim below is a
  measured value from a live page, and the two that reversed the brief's own instruction are shown
  with the measurement that reversed them.
---

# Design review — /owner-builder-courses critique remediation, 2026-08-15

## Verdict

**Amber.** Four of the six action items shipped and verify; two did not ship and are routed to
`build` because they are page copy, which a design session does not write. Amber rather than Green
for one reason that matters more than the count: **item 6 as specified would have shipped doing
nothing.** It asked for a token swap on a figure that was never the rendered figure. Fixing the
actual defect meant changing a different rule and leaving the named token alone, which is a
divergence from the brief and is recorded as one below.

Build green. `node scripts/system-health.mjs` after all changes: **0 failing, 38 warning, 84 ok**.
`check-design-register` inside it still reports 21/21 colours, 9/9 spacing steps and all four radius
steps matching, with no off-scale literal radii — nothing here introduced a token or a register
change, so rule 7 is not engaged.

## Scope

Andrey set it explicitly: **"everything but P0. images are coming"**, and chose the mobile table as
the priority. The P0 (missing page imagery) is therefore deliberately untouched, not missed.

## What shipped

### Item 1 — the comparison table was unreachable and unannounced on a phone

`ComparisonTable.astro`, `global.css`. `.cmp` carries `min-width:560px`, so the table scrolls on any
phone. It had no `tabindex`, which means a keyboard user could not scroll it at all (WCAG 2.1.1), and
nothing told anyone there was more to the right.

| Measured at 390px on `/owner-builder-courses` | Before | After |
|---|---|---|
| Content hidden off-screen | 226px | 226px (unchanged — this is the fact, not the bug) |
| Keyboard-reachable scroller | no `tabindex` | `tabindex="0"`, `role="region"`, named |
| First column while scrolled | scrolls away | `position:sticky` on `tbody th` **and** `thead th.cmp-corner` |
| Scroll affordance | none | cue shown at rest, **hidden once scrolled to the end** |

The cue is script-driven, not a media query, because "does this scroll" depends on the container and
this component has five consumers with different column counts. It degrades to `display:none` with
no JS. Deliberately a DM Mono uppercase label rather than the usual gradient edge-fade: gradients are
on this project's anti-reference list, and it would have been the only soft edge in a flat system.

### Item 2 — partial. `#sources` anchor added, and it is not the fix

`SourcesFooter.astro`. Page copy already said "the verification dates in the Sources block below"
with nothing to point at, so following that instruction meant scrolling ~4,000px on a phone. The `id`
is now there (verified present, 5 links). **The underlying problem is untouched and should not be
read as closed**: the comparison table's figures still carry no provenance where they are read. That
needs a per-fact `VerifiedSources` block, which is authored content — this hub's five sources carry
four different verification dates plus one that is not a verification date at all
("Board-approved 10 Sep 2024"), so there is no single honest date a layout could derive. Routed to
`build` below. The reasoning is also written into the component's own frontmatter, so the next reader
of that `id` does not mistake it for the remedy.

### Item 3 — the footer's focus ring and tap targets on the dark ground

`global.css`. The maroon focus ring is invisible on the dark footer, and the source links were under
the 24px minimum.

| Measured on the live footer | Before | After |
|---|---|---|
| `.srclist` link box height | 23px | **25px** (`padding-block:4px`) — WCAG 2.5.8 needs 24px |
| Focus ring contrast on the footer ground | maroon, ~1.6:1 | **7.86:1** (`--gold`, 2px, offset 3px) — 1.4.11 needs 3:1 |
| Link text on footer ground | — | 17.4:1 |

**The tap-target arithmetic was wrong the first time and the measurement caught it.** Predicted
18+3+3 = 24px; measured 23px, because the line box for 13px DM Sans is 17px, not 18px. The fix is
sized from the measured 25px, not the predicted 24px.

**The focus ring could not be verified the obvious way.** Programmatic `.focus()` does not set
`:focus-visible`, so the first reading returned the browser default ring and looked like the rule had
failed. The number above comes from **34 real `Tab` presses** driven by Playwright — the browser pane
will not deliver `Tab` to the document.

### Item 4 — the four-card hub tiled 3+1

`global.css`. Three pages share `.hub-grid` with different card counts, so one flat column count is
right for two of them and wrong for the third.

Measured at the `.wrap` cap of 1144px, so these cover every viewport ≥1200:

| Layout | rows | card W×H | grid height | trailing void | blurb CPL |
|---|---|---|---|---|---|
| 3-up (before) | 2 | 365×336 | 652px | **779px** | 42 |
| **2×2 (shipped)** | 2 | 560×292 | **587px** | **0px** | ~74 |
| 4×1 (rejected) | 1 | 268×432 | 432px | 0px | ~30 |

4-across is shortest and orphan-free and was still rejected: at ~30 CPL the two-sentence blurb ragged
badly, and at the 1101px floor the cards are 240×472, a 1:2 column. 2×2 removes the orphan with the
blurb inside the 45–75 band and matches what the same page already does just below 1101px, so nothing
reflows across that breakpoint.

**Scoped by card count, and proved scoped.** `.hub-grid:has(> :nth-child(4):last-child)` inside
`@media(min-width:1101px)`.

| Page | cards | selector matches | before | after |
|---|---|---|---|---|
| `/cpd` | 3 | **0** | 3col, 287px, void 0 | 3col, 287px, void 0 — identical |
| `/owner-builder-courses` | 4 | **1** | 3col, 652px, void 779px | 2col, 587px, void 0 |
| `/white-card` | 5 | **0** | 3col, 784px, void 389px | 3col, 784px, void 389px — identical |

Two traps this codebase has hit before were checked explicitly rather than reasoned about:

1. **The shared-component regression.** Verified across 3 pages × 8 breakpoints (1600/1280/1101/1100/
   900/721/720/375). The two pages I was not fixing are unchanged at every one.
2. **Specificity beating the mobile collapse.** `:has()` scores (0,2,0) and both the `max-width:1100`
   two-column rule and the `max-width:720` single-column rule score (0,1,0). Unbounded, my selector
   would have **won the mobile collapse and pinned the four-card hub at 2-up on a phone.** The
   `min-width:1101px` bound makes the ranges mutually exclusive. Measured: 1+1+1+1 at both 720 and
   375.

Verified that all three grids contain nothing but `.hub-card` children, so child index is card index
and `:nth-child(4):last-child` genuinely means "exactly four".

### Item 6 — the part that was specified wrong

**Specified:** `.hc-soon` `--slate-light` → `--slate`, 2.81:1 → ~4.85:1.
**Shipped:** `.hub-card.is-soon` no longer uses `opacity:.55`. `--slate-light` was left alone.

Two things were wrong with the item, and both were only visible by measuring the rendered page:

**First, `--slate-light` on `.hc-soon` is not drift.** `global.css:128` documents it as RESTRICTED
with exactly one permitted use, and names hub-card "Soon" states as that use, on the WCAG 1.4.3
inactive-component exemption. Swapping it would have quietly reversed a written decision.

**Second, and worse, 2.81:1 was never what rendered.** `.hub-card.is-soon` carried `opacity:.55`,
which composites the whole card over the section ground. `getComputedStyle` does not show it, so
every figure anyone had quoted for this card — the critique's *and the token comment's own* — was the
authored value.

| /cpd, inside a soon card | authored | actually rendered | after |
|---|---|---|---|
| `.hc-state` (`--maroon`) | 10.95 | **3.70** | **4.59** ✓ |
| `.hc-title` (`--ink`) | 17.40 | **4.00** | **15.67** ✓ |
| `.hc-desc` (`--ink-3`) | 8.86 | **2.80** | **7.98** ✓ |
| `.hc-soon` (`--slate-light`) | 2.81 | **1.69** | 2.53 — still sub-AA, see below |

So the card's **title and description were failing AA**, using tokens under no restriction at all —
and the specified fix touched neither. Had I made the swap under the old opacity, `.hc-soon` would
have landed at ~2.4:1, still failing, with `.hc-desc` left exactly where it was.

The fix recedes the card by **surface** instead: `background:var(--paper-grey)`, the file's one
neutral surface, plus `.hc-state` maroon → `--slate` because maroon is the action accent and the
unavailable card is the one card with no action. Same shape as `BundleCard.astro:202`, which had this
right already. No new token, no register change. The unavailable read never rested on the dimming: a
soon card is a `<div>` not an `<a>`, so it has no hover lift and no pointer, and it shows
"Coming soon" where the arrow disc would be. Blast radius is 2 pages (`/cpd`, `/styleguide`).

**Left deliberately:** `.hc-soon` at 2.53:1. It is the disabled-state label the documented exemption
actually covers, it improved from 1.69, and having just reversed one reading of that policy I am not
also quietly reversing the other in the same edit. Flagged for a deliberate call, not fixed.

**Also in item 6 — `aria-current` on the wayfinder.** The active section was a class only, so which
section you are in was information a sighted user got and a screen-reader user did not.
`aria-current="location"` is now set beside the class in `BaseLayout.astro` so the two cannot drift.
Verified across all four sections: exactly one `aria-current="location"` at all times, always the
highlighted link, never a stale token.

## What did not ship, and why

**Item 5 (`$impeccable clarify`) and the 64-word capsule trim in item 6 are page copy.** They live in
`src/content/hubs/owner-builder-courses.mdx` and `src/content/courses/qld-owner-builder-course.mdx`.
`src/content/**` is owned by `build`. A design session does not write page copy, so these are filed
below rather than done. This is a routing decision, not a judgement that they are unimportant — the
WA card leading with "No approved course in WA." is the weakest opening on the page.

## Observation, not a finding

Scrolling programmatically to `beyond` and `faq` leaves the previous wayfinder link highlighted; the
`rootMargin:'-45% 0px -50% 0px'` band is ~5% of the viewport and a short section centred by
`scrollIntoView` can miss it. **This is pre-existing class behaviour, unchanged by this session**, and
may be an artefact of programmatic scrolling rather than something a real reader hits. Recorded so it
is checked with real scrolling rather than asserted either way.

## Items closed in other reviews

**None — and this was checked, not assumed.** Three open items sit close enough to this session's
work to look like candidates and none of them is closed by it:

- `2026-08-06-white-card-hub-redesign-and-ob-match.md:123` — `ComparisonTable.astro`'s row-action
  orientation is unused by either live table. Still unused; this session touched the wrapper and the
  sticky column, not that shape. **Stays open.**
- `2026-07-28-reflow-spacing-and-tap-targets.md:155` — "nothing in the repo can see a horizontal
  scrollbar", asking for a headless width check over `dist/`. This session added a cue *inside* a
  deliberately scrollable container and added no gate. Different thing. **Stays open.**
- `2026-08-01-type-floor-and-tap-targets.md:192` — the `--head-h` / `--waynav-h` off-by-one. Not
  touched. **Stays open.**

## Demand list

Tag every item: [skills] | [design] | [facts] | [build]

- [build] `owner-builder-courses.mdx:60` — the WA hub card opens "No approved course in WA.", leading
  with the absence rather than what ABE Education offers. Reverse the lead so the card opens on the
  course that supports the Form 75 approval, keeping the no-approved-course fact as the second
  clause. Authority model is unchanged by this: it stays a knowledge-requirement course, never "WA-approved".
- [build] `owner-builder-courses.mdx:30` — the `intro` answer capsule is 64 words against the
  40–60 word house rule. Trim to band without dropping the state list.
- [build] `qld-owner-builder-course.mdx` — `NONACCABE` appears in five places with no gloss anywhere
  a reader meets it first. Gloss it once at first use.
- [build] `ComparisonTable` on `/owner-builder-courses` — the compared figures carry no provenance
  where they are read. Needs a per-fact `VerifiedSources` treatment; the five sources carry four
  different verification dates plus one non-verification date, so a layout cannot derive a single
  honest date and the dates have to be authored per fact. The `#sources` anchor added this session is
  a signpost, not this.
- [design] `.hc-soon` renders at 2.53:1 on `--paper-grey`. Covered by the documented WCAG 1.4.3
  inactive-component exemption at `global.css:128` and improved from 1.69:1 this session, but it is
  now the most explicit "this is unavailable" signal on a card that is no longer dimmed. Worth a
  deliberate decision on whether the exemption should still be taken here.
- [skills] `check-design-register.mjs` reads `global.css` only, so component-scoped `<style>` blocks
  are invisible to it — `BundleCard.astro:202`'s `.is-soon` surface rule is exactly the kind of thing
  it cannot see, and it was the precedent that should have been found by tooling rather than by grep.
- [skills] No check catches a contrast figure invalidated by an ancestor `opacity`. Four figures in
  this repo — one of them inside a token-policy comment relied on to authorise a colour — were
  authored values that never reached the screen. A checker that reads `getComputedStyle` alone
  reproduces the same error. See the `.hub-card.is-soon` table above for the shape.
