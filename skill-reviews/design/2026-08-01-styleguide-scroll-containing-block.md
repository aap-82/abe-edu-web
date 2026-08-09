---
date: 2026-08-01
skill: design-session
subject: styleguide-scroll-containing-block
verdict: Green
graded_by: self
---

# Design review — a scroll wrapper that was not a containing block, 2026-08-01

Self-graded: there is no fresh-subagent design grader (CLAUDE.md session-types rule 9).

## Verdict

**Green.** One two-word CSS change, `position:relative` on two wrappers, removing horizontal scroll
from `/styleguide` at both mobile widths. Cause was proven in the browser before the source was
touched, the fix was measured across all 17 pages that could be affected rather than the one that
showed the symptom, and the accessibility side-effect was checked because the fix works by clipping
screen-reader text.

## The session started on a false premise, and that is the more useful finding

**I opened this session to fix the `PartnerDisclosure` overflow defect. It was already fixed, and I
had been told so.** The item at `2026-07-28-abe-readability-audit-white-card-wa.md:143` was struck
at 20:29 in **#107**, with a dated re-measurement note.

Two errors compounded:

1. **I checked the wrong artefact.** Preparing a handover briefing earlier, I ran
   `grep -n "overflow-wrap" src/components/PartnerDisclosure.astro`, got nothing, and reported the
   defect live. The fix lives in `global.css:655` — `.pl-frow dd{min-width:0;overflow-wrap:anywhere}`
   — because the component has no scoped styles for that row. **Grepping the component for a fix
   that a global stylesheet owns proves nothing**, and it returns a confident zero either way.
2. **I then repeated the stale conclusion hours later without re-checking**, after #107 had closed
   it. The briefing was accurate when written and wrong when quoted.

This is the same shape as the `robots.txt` withdrawal error made earlier the same day: **an absence
observed in one place, read as a fact about the whole repo.** The lesson that generalises is not
"check harder" — it is that *where a fix would live* is a question to answer before concluding it is
absent, and *when a claim was last verified* is part of the claim.

**What saved it was verifying before fixing.** The first act of the session was to measure the
current state rather than apply the filed remedy. Had I applied `overflow-wrap:anywhere` to the
component on the strength of the item, I would have shipped a duplicate of an existing global rule,
measured nothing, and closed an already-closed item.

## What was actually wrong

Sweeping all 17 pages that render a partner card, at 320px and 375px, found **one** page overflowing:
`/styleguide`, by **237px at 320** and **182px at 375** — `scrollWidth` 557 at both widths, so a
fixed floor rather than a fluid squeeze.

The diagnosis took three passes, and the wrong turns are worth recording:

| pass | found | why it was wrong |
|---|---|---|
| 1 | `table.cpd` and `table.cmp`, both `min-width:560px` | they sit in `overflow-x:auto` wrappers and scroll internally — wide, but not overflowing |
| 2 | filtered to elements with an unclipped ancestor chain | returned **empty**, while the document still scrolled |
| 3 | `document.body.scrollWidth` = **320**, `documentElement.scrollWidth` = **557** | the overflow was not in body's flow at all |

That last reading is the whole diagnosis. **An absolutely-positioned element does not affect its
parent's layout, so `body.scrollWidth` stays clean while the document's scroll area grows.** Any
check measuring `body` would report this page as fine.

The cause: three `.sr-only` spans (`.cpd-dash`'s "Not offered yet") sitting at right **557 / 454 /
350** inside `table.cpd`. `position:absolute` resolves against the nearest **positioned** ancestor,
and `.cpd-wrap` was `static` — so their containing block was the initial one, outside the scroll
container, and **`overflow-x:auto` does not clip a descendant whose containing block is outside it.**
They took their static position at the table's real 560px width and dragged the document with them.

## Measured

Cause proven **before** editing source, by toggling the property in the live page and reverting:

| | `documentElement.scrollWidth` @ 320px |
|---|---|
| as shipped | **557** |
| wrappers set to `position:relative` in-browser | **320** |
| reverted (source still untouched) | **557** |

Then the fix in `global.css`, rebuilt, and re-swept — the same 34 checks, not just the page that
showed the symptom:

| | pages overflowing / 34 checks |
|---|---|
| before | **2** (`/styleguide` at 320 and 375) |
| after | **0** |

Intended behaviour preserved, checked rather than assumed: both wrappers still compute
`overflow-x:auto`, still hold a 560px table in a 214px box, and `stillScrollsInternally` is `true` —
the tables scroll, they just no longer leak.

**Accessibility, checked because the fix works by clipping screen-reader text.** All 4 `.sr-only`
spans inside the wrappers remain in the accessibility tree: `display:block`, `visibility:visible`,
no `aria-hidden` ancestor, text intact, clipped to 1px by the standard recipe. The 3 visible dashes
they annotate still render. Clipping an already-clipped element changes nothing a screen reader sees.

Other gates after the change: `npm run build` exit 0 (21 pages, guardrails pass), `check-claims`
0 failing, `system-health` 0 failing, `prose-lint` 11 files pass.

## Why no gate caught this

`/styleguide` is the component library — the page a designer opens to judge every component, and the
one page in the repo whose whole purpose is being looked at. It has been horizontally scrolling on a
phone for as long as the comparison tables have existed, through a green build, passing guardrails,
`check-claims` 0 failing and an independent readability audit.

ROADMAP already carries **"Headless width check over `dist/`"** as an authorised, unbuilt candidate
at two occurrences. **This is the third**, and it sharpens the specification: such a check must read
`documentElement.scrollWidth`, not `body.scrollWidth`, or it would have reported this page clean. The
17-page × 2-width sweep used here is about fifteen lines of page-context JavaScript and is reproduced
in this session's transcript; it is most of the candidate already.

## Demand list

Tag every item: [skills] | [design] | [facts] | [build]

- [skills] **The headless width check must measure `documentElement`, not `body` — and this is its
  third occurrence.** ROADMAP lists it authorised at two. The defect found today is invisible to the
  obvious implementation: `body.scrollWidth` read **320** on a page whose document scrolled to
  **557**, because absolutely-positioned descendants do not affect their parent's layout. Specify
  `documentElement.scrollWidth - documentElement.clientWidth` at 320px and 375px over every page in
  `dist/`. Note it needs no new dependency if run through the existing browser tooling — the sweep in
  this review took one page-context call, not playwright, which was the blocker recorded when the
  candidate was raised.
- [design] **`.sr-only` is safe only inside a positioned ancestor, and nothing says so.** Two
  wrappers are fixed; the pattern is repo-wide, and any future `overflow:auto` container holding
  `.sr-only` will reproduce this exactly. The rule belongs next to `.sr-only` in `global.css:582`
  where the next reader will meet it, not only in the two call sites that were bitten — the same
  argument that put the R1 reasoning into `robots.txt` rather than leaving it in the risk audit.
- ~~[design] **`/styleguide` demos white cards on a white ground.** Carried forward from
  `2026-08-01-modulerows-faq-parity.md`, still open, and it is the same page as this defect. `.sg-demo`
  computes `rgb(255,255,255)`, so every `--paper` component sits invisibly on it. Worth doing in the
  same pass as any other styleguide work rather than as its own visit.~~ **Closed 10 Aug 2026.**
  `.sg-demo` moved from `--paper` to `--ground`; measured `rgb(255,255,255)` → `rgb(251,249,245)`,
  so a `--paper` card now sits on the ground colour a real page uses instead of on itself.
