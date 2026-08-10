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

- ~~[skills] **PRODUCT.md and DESIGN.md section 7 now contradict the shipped code.** Both say
  accordions are FAQ-only and that "what the course actually is" is never hidden; `ModuleRows` hides
  it on six pages. Either write the syllabus exception into both, or the decision reverts to variant
  A. A rule the code ignores in silence is worse than either being wrong alone, and "documentation
  drifted from the code and was trusted over it" is this repo's most-repeated recorded risk (seen
  10x).~~ **Closed same day, on Andrey's instruction.** Both documents now carry the syllabus
  exception with its measurement and its scope, in all four places the FAQ-only claim appeared:
  PRODUCT.md's Accessibility section, DESIGN.md's Don't list, the section 7 reader's-job table, and
  the Accordion entry in the section 5 component list. A new section 7 subsection, "The syllabus
  accordion", carries the evidence and names variant A as the recorded fallback.
- [skills] **"Heritage Maroon for actions only" needs a figures clause, or three reverts.** Third
  filing of this shape today. Register-exclusive work under rule 7, so it cannot be done inside a
  session that also ships components.
- [build] **Author `contents` and `outcome` for ACT, TAS, WA and NSW.** Until then those four pages
  put one sentence behind each disclosure and show no module list at all. `src/data/modules.ts` is the
  worked example; the source is each course's own material, so it is a build-session job per page with
  a real source read.
- ~~[design] **`UnitOutline`'s `.unit-eb { max-width: 58ch }` renders 89 CPL** on `/white-card-wa`,
  1 of 4 elements over the 85 rule. Carried forward from this morning's review, still open.~~
  **Closed 10 Aug 2026**, 58ch → 460px; 84.5 → 65.5 CPL median, 0 of 4 over 85.
- ~~[design] **`.mr-title` is 18px, which is not a step in DESIGN.md section 3.** Canon Title is Archivo
  600 22px. Raising it is a section-level hierarchy call, because ACT renders twelve group titles and
  at 22px the list stops reading as an index. Either adopt 22px, or add 18px to the documented scale
  as a "list heading" step so the component stops carrying an undocumented size. Andrey's call.~~
  **Closed 11 Aug 2026 — Andrey chose 22px.** The index-reading worry was measured rather than
  argued and does not materialise at desktop: on ACT, the twelve-title worst case, **nothing wraps
  at 1280px at either size**, so the one-line-per-row rhythm survives. See
  `skill-reviews/design/2026-08-11-mr-title-22px.md`.
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

## Second pass, same day: states, docs and the Stepper

Four further changes after the accordion shipped, all Andrey's direction.

**Hover and open backgrounds on `ModuleRows`.** Both go LIGHTER than the section ground, and the
direction was forced by measurement rather than taste: the row carries `--slate` on its eyebrows,
count and marker, and `--slate` is 4.52:1 on `--paper-warm` against a 4.50 AA floor, so one step
darker fails the quietest text in the component. Measured on `#learn` (`--paper-alt`, `#f7f4ec`):

**Superseded — see "Hover left the surface entirely" below.** Kept because the measurements are what
ruled the surface out.

| state | colour | luminance vs ground | `--slate` |
|---|---|---|---|
| rest | `#f7f4ec` | 1.000 | 4.64:1 |
| hover (withdrawn) | `#f5f1e8` (`--paper-warm`) | 0.974 | **4.52:1** |
| open | `#ffffff` (`--paper`) | 1.105 | 5.10:1 |

**Revised twice on Andrey's direction, and the second revision is the one worth recording.** Hover
started as a white wash on the whole row at a 1.036 step. It is now `--paper-warm` on the **summary
only**: the panel stays transparent, because the summary is what you click and lighting the whole row
answers a gesture aimed at one line of it. The two states also now move in opposite directions, hover
warming and open lifting to `--paper`, so they read as two meanings rather than two degrees.

**`--paper-warm` is the darkest value available, and that is measured rather than chosen.** One step
further, `#f2eee4`, drops `--slate` to **4.40:1** against a 4.50 floor, and `--slate` carries the count
in the hovered row. Asked to make the hover louder, the honest answer is that it cannot go louder in
this direction without failing the quietest text in the thing being hovered. (Written when the
disclosure marker was `--slate` as well; it is maroon now, see below, so the count is the binding
constraint on its own.) Verified with a live pointer, not a stylesheet read: the hovered summary computes
`rgb(245, 241, 232)` while its panel and its row both stay `rgba(0, 0, 0, 0)`.

The tint bleeds 16px either side (10px on mobile) via matched negative margin and padding on both the
row and the summary, so hover and open span the same width and neither moves the shared left edge.

**PRODUCT.md and DESIGN.md now carry the exception**, closing the item above. Four places.

**`Stepper` bodies became bulleted lists.** `body` widened to `string | string[]` in
`content.config.ts` and `types/course.ts`; an array renders as maroon discs matching the syllabus
outcomes, a string stays a paragraph. **49 of 56 bodies were converted, authored by clause, and 7
were deliberately left as prose** because they are single indivisible statements and a one-item list
is a worse rendering of a sentence than the sentence.

Two bodies needed rewriting rather than splitting, which is exactly why this was not done with a
regex: `"And your White Card, if you will be on site."` is a clause continuing its own heading and
reads wrong standing alone, so it became `"Add your White Card too, if you will be on site."` No
figure moved: `check-claims` is 0 failing / 0 warning across all 150 page figures.

**Boundaries crossed, on the standing instruction.** This session wrote `PRODUCT.md`, `DESIGN.md` and
`src/content.config.ts` (**skills**) and eight files under `src/content/courses/` (**build**) as well
as `src/components/**` (**design**). Andrey chose "one session does both" each time and the repo has
four prior instances of the same call. Recorded here rather than left to be discovered.

## Third pass: typeset against DESIGN.md section 3

Asked for consistency and proportion. Audited the rendered values rather than the source, against the
canonical Label style (DM Mono 500, 11px, .18em, uppercase) and the Mono Label Rule's .08em to .18em
band.

**Three of the findings were breaches, not preferences.** `.mr-count`, `.mr-range` and `.mr-mnum` sat
at **.04em, below the documented .08em floor**, at **weight 400** where every mono label on the site
is 500, and the count rendered **lowercase** where the rule says mono is always uppercase.

| | before | after |
|---|---|---|
| mono sizes | 12 / 11 / 10px | 11 / 10px |
| mono weights | 500 and 400 | **500 only** |
| mono tracking | .14 / .12 / **.04**em | .18em (key, eyebrow) / .1em (count, range, number) |
| mono case | uppercase and lowercase mixed | uppercase throughout |
| module name | 15px / 1.5 | **15px / 1.55** |
| outcome | **14px** / 1.55 | **15px / 1.55** |

Hierarchy inside the mono voice is now carried by **tracking rather than size**, which is what
"the wider the tracking, the smaller the type" already prescribes: .18em on the group key and the
10px column eyebrows, .1em on the supporting run.

The two column lists were 15px/1.5 against 14px/1.55 for no reason either recorded. They are peers,
side by side, holding the same kind of short statement, and a 15-against-14 step is precisely the
muddy hierarchy the typography reference names by example. Same size, same leading now; the
difference between the columns is carried by their eyebrows and by ink colour.

Uppercase is applied with `text-transform`, not authored, so `textContent` stays sentence case for
copy-paste and screen readers.

**Measured after:** outcome measure moves 62 to **58 CPL** worst at the same 480px cap, the expected
cost of the size bump and still inside the band with 27 characters of headroom under the 85 rule.
Module names unchanged at 34. Build green, guardrails 20 pages.

**Not changed: `.mr-title` at 18px**, the one size in the component that is not a documented step.
DESIGN.md's Title is 22px, which suits a card H3 but lands differently on ACT's twelve group titles,
where it stops being a scannable index and becomes twelve headings. That is a hierarchy decision
about the section, not a typographic tidy-up. Filed below.

## Fourth pass: spacing owned per block, and one accordion glyph

**Padding.** Three attempts, and the first two were wrong in instructive ways. A negative margin made
the tints overhang the row hairlines. Removing it left the text touching the tint edges. Padding on
the summary alone looked right until the two elements took different backgrounds, at which point the
summary's 24px sat *inside* the tinted band and the Modules eyebrow ended up flush against its lower
edge. **Padding that belongs to a block has to live on that block.** Both the summary and the panel
now carry 24px on all four sides (16px at 640px and below), measured: 0px tint overhang, 16px content
inset from the tint edges, a real 24px between the heading band and the eyebrow, and 24px under the
last outcome.

**The disclosure marker is now the FAQ's.** It was a pair of CSS-drawn `--slate` rules on the argument
that disclosure is navigation rather than an action and should not spend maroon. That was wrong twice:
DESIGN.md §5 documents the house accordion as *"a maroon plus-mark rotates 45 degrees to a cross when
open"*, so maroon here is the documented behaviour rather than an exception to the One Maroon Rule,
and a site should not have two accordions that disclose with different glyphs in different colours.
**Copying the declarations was not enough, and that is the part worth keeping.** With `color`,
`font-size`, `line-height` and `transition` all matching, the mark still moved differently, and
diffing the two computed styles on the same page found why: this one is a **grid** item and stretched
to its 20px track, so `transform-origin` resolved to 10px, the centre of the box, with a ~12.7px glyph
sitting at its left. It swung through an arc where the FAQ's spins in place, because `.faq summary
.pm` is a `flex:none` flex item and is therefore content-sized, giving it an origin of 6.37px. A
second difference came out of the same diff: `.faq summary` sets `--font-display` and `font-weight:
600`, so the FAQ's plus is semibold Archivo while this one had inherited regular DM Sans and was
drawing a different glyph at the same size.

Fixed with `justify-self:center` plus the face and weight. Verified after: all eleven compared
properties identical, and both markers report the same `matrix(0.707107, ...)` when open.

**The lesson is about how "same as X" gets verified.** Matching the source declarations looked done;
only comparing the two *computed* styles side by side showed the layout context changing the result.
Same-as claims want a diff, not a copy.

**This also shrinks the open maroon question.** Of the four non-action maroon marks filed earlier, the
marker is now covered by §5's own wording, so the demand item concerns three: the module numbers, the
outcome discs and the count figures.

## Fifth pass: hover left the surface entirely

Three surface treatments were tried and none was right, which was the signal. A wash lighter than the
ground reads as a weaker version of the open state, since open is already `--paper`. A step darker is
boxed in: `--paper-warm` is the last value with headroom, because one further (`#f2eee4`) drops
`--slate` to 4.40:1 against a 4.50 floor and `--slate` carries the count. **The surface could only
ever be quiet, in either direction, and Andrey did not want quiet.**

So hover moved off the surface: **the title goes ink to maroon**, and the background now means one
thing only, open or closed.

This is the site's existing language rather than a new idea. DESIGN.md's One Maroon Rule lists
**"hovers"** among the jobs maroon exists for, beside marks, ticks and active states, and every link
and button on the site already answers the pointer this way. Measured with a live pointer: the
hovered title computes `rgb(128, 0, 0)` at **9.96:1** on the section ground, against 15.83:1 as ink,
so it changes unmistakably while staying far clear of the floor. Neighbouring titles stay ink and both
the summary and panel backgrounds stay `rgba(0, 0, 0, 0)`.

**Worth noticing across passes 3 to 5:** three of the four things asked for here ended up resolved by
the documented palette rather than by a new value. The marker is maroon because §5 says the house
accordion's is; hover is maroon because the One Maroon Rule says hovers are; the count and eyebrow
tracking came from the Mono Label Rule's own band. The component had drifted from DESIGN.md in small
ways, and most of the fixes were returns rather than inventions.

## Grader note

`graded_by: self` — no fresh-subagent design grader exists. Reproducible claims: the height table
(toggle every `<details>` and read `.mrows` height at 390px), the CPL figures (`Range.getClientRects()`
per character, grouped by line box), the alignment x-values, and the two `grep` hits proving collapsed
content is in `dist/`. The judgement a reviewer should push on is the Amber itself: I shipped against
two canonical rules because the person who owns the rules told me to, and recorded it rather than
refusing. If that is the wrong call, the demand list is where it gets reversed.
