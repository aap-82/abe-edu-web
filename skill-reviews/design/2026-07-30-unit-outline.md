---
date: 2026-07-30
skill: design-session
subject: unit-outline
verdict: Green
graded_by: self
---

# Design review — `UnitOutline`, a syllabus component for accredited units, 2026-07-30

## Verdict

**Green.** A new component, chosen from rendered variants, wired into the one page that needs it, with
every regulated string preserved and asserted programmatically. Two real defects were found by
measuring rather than by looking, and one of them I would not have caught by eye at all.

## The component already existed, and it was the wrong one

`ModuleRows` is this project's syllabus component. It ships on all six **ABE-developed** owner-builder
pages. Neither asqa-accredited page uses it — both fell back to `BulletList`. So the gap was real, but
extending `ModuleRows` would have been wrong on two counts:

- Its rail carries **module numbers and ranges**. A unit of competency has neither; it has one national
  code and a fixed set of elements.
- Its payoff kicker is **"You will be able to"**. On an asqa page the course is developed and owned by
  the RTO partner, so framing the RTO's element wording as an ABE Education outcome is an
  authority-model error, not a styling choice (`kb/rules/authority-model.md` §6).

And `BulletList`, the incumbent, loses the thing that matters most on an accredited page: the unit's
**identity**. The code, and whether it is still current. That is the reader's first question, and four
bullets cannot answer it.

**This is the second time today that "does a component already exist?" changed the answer.** The first
time the answer was yes and I nearly built a duplicate. This time the answer was "yes, and it is for a
different content model" — which is a different finding and took reading `ModuleRows`' own header
comment to establish. Checking is cheap; both checks paid.

## What was chosen, and by whom

Three variants were rendered as real HTML against the real tokens and fonts, and Andrey picked
**variant C's table with variant B's plate**. That combination was not one of the three I offered — the
sheet's job was to make the parts separable enough to recombine, and it did.

| Variant | What it was | Outcome |
|---|---|---|
| A | `ModuleRows`' grammar retuned for elements | not chosen |
| B | `--paper` identity plate, code as a figure, elements as rows | **plate chosen** |
| C | Register-extract `<table>` with a header row | **table chosen** |

The plate answers *"is this real and current?"*; the table answers *"what is in it?"* — in that order,
which is the order an accredited-course reader asks in.

`<table>` over styled rows is a documented exception, not an oversight: `DESIGN.md` §7 assigns tables to
"compare values across items" and a syllabus to rows. The authority signal outranks the taxonomy here,
and `scope="col"` / `scope="row"` tell a screen reader the four rows are the same kind of thing without
relying on visual rhythm. Recorded in the component so the next reader meets the reasoning.

## The release line came out, and that is the best part of this change

Andrey's call, mid-session: replace "Release 2 · usage recommendation Current" with the register link.

That is a stronger authority position than the one I had built. A release number and a currency status
are **government facts with a shelf life**. Asserting them undated on a page puts the page on a
re-verification cadence nobody owns, and makes a stale page an *inaccurate* one rather than merely an
old one. A link cannot decay.

Both figures remain on the page **with their date**, in the section's `VerifiedSources` ledger — which
is the only place a decaying figure belongs. Measured: `Release 2` appears exactly once in the built
page, in the ledger. Nothing was lost; an undated duplicate was.

The link is typed as an **invitation to act** per `DESIGN.md` §7, so it carries `target="_blank"`,
`rel="noopener"` and the mandatory `.sr-only` cue. The ledger's link to the same URL is **provenance**
and correctly takes neither. Two links, one URL, two different reader jobs — this is the pair §7 exists
to distinguish, so it is deliberate rather than the duplication I have been fixing all day.

## Two defects, both found by measuring

Neither was visible to me at a glance, and the second is worth carrying forward.

**1. The table sprawled to 138 characters per line.** Left to fill its section at 1352px, the element
sentences ran to a measured 138 CPL, against this project's 85 CPL hard rule and its 480px `.measure`
for body copy (~62 CPL). Fixed with `max-width: 780px` on the block — the width at which the plate can
still carry the code and the link side by side — plus a separate cap on the prose, because capping the
block alone still left the cells too wide.

**2. `70ch` is not 70 characters.** My first prose cap was `max-width: 70ch`, copied from
`ModuleRows`' `.mr-body`. It rendered **91 CPL**, still over the rule. `ch` is the advance of the "0"
glyph, which in DM Sans measures **10.03px** against an **average character advance of 7.72px** at
15px — so `ch` overstates a real line by about 30%. `58ch` lands at 595px and **77 CPL**.

| | width | measured CPL |
|---|---|---|
| Table filling the section | 1066px | **138** |
| `max-width: 70ch` | 702px | **91** |
| `max-width: 58ch` | 595px | **77** ✓ |
| At 375px | 260px | 34 |

**`ModuleRows` has the same gap** — its `.mr-body { max-width: 70ch }` is also rendering ~91 CPL on six
pages. I did not change it: it is not this component's to move and it ships on six pages. Filed below.
This is the sort of thing a CPL rule stated in `ch` will keep producing, and it is worth stating once
that the two units are not interchangeable.

## Mobile

At 375px the first column is sized by the header word **"Element"**, not by "01" — it took 78px of a
319px block and left the sentence column 241px (~31 CPL). Tightening the header tracking and the
row-head padding recovered 19px: row head **78 → 59px**, prose **241 → 260px**, **31 → 34 CPL**. It
cannot go further without shortening the header text, and "Element" is the register's own word.

No page overflow at 375px (375 = 375), and the table does not scroll inside its wrapper, so the
`overflow-x: auto` is a safety net for a future longer unit rather than the layout.

## Boundaries crossed, on the standing instruction

This session wrote `src/content/courses/white-card-wa.mdx` (**build**) as well as
`src/components/**` and the styleguide (**design**). Andrey has chosen "one session does both" three
times, and "ship it as the default version" is a fourth; recorded rather than left silent. Editing the
course MDX tripped `check-pipeline` §4 for the third time today, and a dated delta note was appended to
`pipeline/white-card-wa/07-verification.md` recording the one claim that left the page body.

## Decisions worth challenging

- **`eyebrow` defaults to "Nationally recognised unit"**, which is true only of an asqa-accredited
  course. That is safe rather than risky: the guardrails fail a state-approved-direct or
  knowledge-requirement page that renders the phrase, so misuse stops the build instead of shipping a
  false claim. The component says so, and says not to "fix" such a failure by overriding the eyebrow.
- **Element data is authored inline in the MDX**, not in the content collection or `src/data/`. It
  matches how the `BulletList` items were authored, so the diff is reviewable. If a second unit page
  arrives, that is the moment to move it, not now.
- **No performance criteria.** The component has no slot for them. They are unverified government data
  and a facts session's work; adding an empty slot now would invite someone to fill it from memory.
- **`white-card-tas` was not changed.** It has no "what you learn" section, so there was nothing to
  convert. If one is written, this is the component for it.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- ~~[design] **`ModuleRows`' `.mr-body { max-width: 70ch }` renders ~91 CPL**, over the 85 rule, on six
  owner-builder pages. Same `ch`-versus-character gap measured here. One-line fix, six pages of visual
  diff, so it wants its own session and a look at each page rather than a blind find-and-replace.~~
  fixed in `2026-07-30-modulerows-measure.md` — measured at 102 CPL not 91, and it was two selectors
  (`.mr-outcome` carried the same cap and was the QLD breach), all now 480px on the `.measure` precedent.
- [skills] **The CPL rule should state its unit.** "85 CPL" written as a `ch` value is about 30% looser
  than intended in DM Sans, which is how both this component and `ModuleRows` ended up over it while
  looking compliant in the source. Either state the rule in px per breakpoint, or say explicitly that
  `ch` must be divided by ~1.3 for this typeface.
- [skills] **`DESIGN.md` §7 still assigns "Reference / syllabus" to `TopicGrid`.** `ModuleRows` was
  built specifically to correct that row and its own header comment says so, but the table was never
  updated — and now a third component (`UnitOutline`) belongs in that row too. A stale row in the
  canonical content-design table is worse than a missing one, because it is quoted as authority.
- [build] If a "what you learn" section is written for `white-card-tas`, use `UnitOutline`, not
  `BulletList`. Same unit, same partner, same argument.
- [facts] The four CPCWHS1001 elements are verified (28 Jul 2026) but **their performance criteria are
  not recorded anywhere**. If a page ever wants that depth, it needs a browser read of
  `training.gov.au/training/details/CPCWHS1001/unitdetails` in a facts session first.

## Output
- [x] **Component built** — `src/components/UnitOutline.astro`, with the reasoning for the `<table>`
  exception, the eyebrow guardrail interaction and the `ch` measurement recorded in the file.
- [x] **Wired in** — `/white-card-wa` section 04 now renders it; all four element sentences verified
  present exactly once each in `dist/`.
- [x] **Styleguide specimen** — added beside `ModuleRows`, and its description states plainly which
  component to reach for and why this one carries no release line.
- [x] **Design-register change** — none. No token added or changed, no `global.css` edit; every style
  is scoped to the component. Rule 7 not triggered.
- [x] **Verified** — build green at 20 pages, guardrails passed, `astro check` 0 errors,
  `check-claims` 0 failing / 0 warning / 11 ok, `prose-lint` 10 files passed, `check-pipeline` clears
  after the delta note is committed. Measured in-browser at 1352px and 375px.
- [ ] **Memory written** — not needed for the CPL finding: it is on the demand list as a rule change,
  which is the durable form. The `ch` measurement itself lives in the component comment.

## Grader note

`graded_by: self` — no fresh-subagent design grader exists. The reproducible claims are the CPL table
(each figure read from a live DOM with the font's actual average advance measured, not estimated), the
four `grep -o` counts on `dist/`, and the single `Release 2` occurrence. The judgement worth challenging
is the `<table>` against `DESIGN.md` §7's row assignment: I broke a documented rule on the argument that
the authority signal matters more here than the taxonomy, and Andrey chose that variant, but §7 is
canonical and a reviewer would be right to ask whether the rule or the exception should change.
