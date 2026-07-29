---
date: 2026-07-30
skill: design-session
subject: eyebrow-rows-and-markers
verdict: Green
graded_by: self
---

# Design review — eyebrow fact rows, inverted list markers, 2026-07-30

## Verdict

**Green.** Three requested changes, all measured, no guardrail failure that reached a commit. This
review **partly reverses** the one filed hours earlier in
[`2026-07-30-credentials-rework.md`](2026-07-30-credentials-rework.md), and the reason that is not a
defect is the interesting part.

## What shipped

### 1. Fact labels became eyebrows, in both components

`Credentials`' `.fxrow` and `PartnerDisclosure`' `.pl-frow` both dropped their fixed label column.
The label now sits **above** its value in the row's full width.

| At 375px | Before | After |
|---|---|---|
| `.fxrow` value width | 215px (375 − 104px track − gaps) | **319px** (+48%) |
| `.pl-frow` value width | ~145px (108px track) | **253px** (+74%) |
| `admin@bluedogtraining.com.au` | wrapped | **1 line** |
| "Australian Skills Quality Authority (ASQA)" | wrapped | **1 line** |
| Horizontal scroll | 375 = 375 | **375 = 375** (unchanged, still none) |
| `dt` metrics | 11px/.1em (`fxrow`), 11px/.13em (`pl-frow`) | **10.5px/.14em in both** |

That last row is the point. `.fxrow dt` is now the **same declaration** as `.org-reg-k`, the eyebrow
over the RTO number. The card previously carried two label styles differing by 0.5px and .04em —
close enough to look like a mistake, far enough to be one.

`.fxrow.wide` was **deleted**, not kept. It existed to let an unlabelled credential span the label
column; with no column beside the value there is nothing to span.

### 2. The maroon dash is gone; the grey dot is the default

`BulletList`'s default marker is now a 5×5px `--rule-strong` dot. `marker="accent"` puts the same dot
in `--maroon` for a set that has earned the lift. Measured in the built CSS:

| | geometry | colour |
|---|---|---|
| default | 5×5px, radius 50% | `rgb(212,214,218)` = `--rule-strong` |
| `marker="accent"` | 5×5px, radius 50% | `rgb(128,0,0)` = `--maroon` |
| `ordered` | unchanged | unchanged |

`marker="dash"` and `.blist-items--dot` are **removed, not deprecated** — 0 occurrences of
`blist-items--dot` in the built CSS, and `blist-items--accent` appears on exactly one page
(`/styleguide`), which is correct: nothing in production has yet earned the accent.

The argument for inverting it: a default that applies the accent to *every* list means no list can be
emphasised relative to another. Everything was lifted, so nothing was — and DESIGN.md reserves maroon
for actions, which every body-copy list was quietly spending. Five call sites existed, all reviewed.

### 3. The ABE-side disclosure paragraph left the E-E-A-T card

`Credentials` now renders `slice(0, 1)` of the org blurb — group 1, what the RTO does. Group 2
(ABE Education's role and the "does not deliver training, conduct assessment or issue qualifications"
line) stays where it belongs.

| `does not deliver training` | Before | After |
|---|---|---|
| `/white-card-wa` | 3 | **2** (location 6 blurb + an FAQ answer) |
| `/white-card-tas` | 2 | **1** (location 6 blurb) |

**Checked before removing, not after:** `CourseLayout` renders `PartnerDisclosure` — the `#rto-partner`
section, which *is* ASQA disclosure location 6 — on every asqa page, measured as 4 `.pl-frow` rows on
both pages. The sitewide footer's "is not a Registered Training Organisation" is present once on each
page too. So the removal dropped a duplicate, never the last copy.

### 4. The logo frame was overflowing its column (found by Andrey, mid-session)

`.org-mark`'s implicit grid track was sized `auto`, which resolves to the **larger** of the container
width and its content's min-content width. `Placeholder`'s caption has a min-content of ~197px, so:

| `.org-mark` child | Before | After |
|---|---|---|
| Logo frame width | **197px in a 140px column** (+57px) | **140px** |
| Matches the reviewer's portrait width | no | **yes**, exactly |
| Overlaps the text column | **yes** | **no** |

Fixed with `grid-template-columns: minmax(0, 1fr)`. This is the same `min-width: auto` trap that
`global.css` already documents on `.pl-frow dd` — hit here on a **track** rather than a cell, which is
why the existing note did not stop me writing it. Two sightings, one stylesheet.

Shipped in the same PR because it is the component this session was already changing, and it was a
visible defect on `/styleguide` and on both asqa pages.

**Not changed:** the logo keeps the portrait `r45` frame. A logo wants a landscape frame, but `r54` is
the only other ratio and it carries `max-width:520px; margin:0 auto` at ≤720px, so switching would need
three further global rules to stop a 132px box centring itself on mobile. No logo asset exists yet, so
that is risk taken for something no reader can see. Filed as the decision to make when the asset lands.

## Why reversing this morning's decision is not a defect

The credentials-rework review recorded a real finding from the variant sheet: **identical borders alone
did not make rows read as a table; the label is what does it.** That finding is intact and this change
keeps every label.

What the sheet never tested, and what I wrongly carried forward from it, is that the label had to sit
**beside** the value. The variants compared *labelled vs unlabelled*, not *beside vs above*. I read a
result about the presence of labels as a result about their position. Those are different claims and
only one of them was measured.

Worth naming as a pattern: a variant sheet licenses conclusions about the axis it varied, and nothing
else. This is the second time in one day that this rework produced a confident claim the evidence did
not cover — the first was the Variant A recommendation the render killed.

## Both components changed together, deliberately

The credentials-rework demand list said the `PartnerDisclosure` / `Credentials` pair *"should be
reviewed together the next time either changes."* That was this change, so both moved. Applying the
eyebrow to only the card the request pointed at would have re-opened the exact inconsistency the
morning's work closed, four hours after closing it.

`.pl-frow` lives in `global.css`; `.fxrow` is scoped in `Credentials.astro`. They are two declarations
that must not drift, and nothing mechanically enforces that — see the demand list.

## The guardrail caught one defect, mine again

`check-claims` failed on **bare "ABE" in a code comment I had just written** (`Credentials.astro:131`,
"…about the partner, not ABE"). Fixed to "ABE Education" before any commit.

This is **mistakes-log #7/#8 for the second time in one day on a non-prose surface** — yesterday a CSS
class name, today a code comment. Both times the visible page was correct and the scanner was right
anyway. The rows are still worded as if the risk lived in copy.

## Decisions worth challenging

- **`slice(0, 1)` rather than a new schema field.** The partner records document their two groups in a
  comment, and the person cards already slice `bio` the same way, so this reuses an existing
  convention. A `blurb` / `roleSeparation` field pair would be more explicit and is the better answer
  if a third component ever needs one group without the other.
- **Location 3's footer block omits the framework's denial sentence on both asqa pages.** Pre-existing,
  found while checking this change was safe, and left alone: regulated copy is not a design session's
  to edit. Filed below.
- **No accented list ships.** The variant exists with a specimen and zero production call sites. That
  is deliberate rather than incomplete — the point of making it opt-in is that a page has to argue for
  it.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [build] **ASQA disclosure location 3's per-course footer omits the denial sentence** the framework's
  template §3 calls for ("ABE Education does not deliver training, conduct assessments, or issue
  qualifications") on both `/white-card-wa` and `/white-card-tas`. The denial is carried by location 6
  and the sitewide footer, so the pages are not silent, but location 3's wording does not match its
  template. `kb/rules/asqa-disclosure-framework.md` §3 is the source. Not a design fix.
- [skills] **Nothing enforces that `.fxrow` and `.pl-frow` stay identical.** They are the same shape in
  two files, one scoped and one global, and both drifted apart once already (11px/.1em vs 11px/.13em,
  104px vs 108px) without anything noticing. A check comparing the two declarations would have caught
  that. **Second filing** of "two copies of one design decision with no comparator" — the first was the
  partner-record duplication.
- [skills] `mistakes-log` #7/#8 hit a **code comment** today and a **CSS class name** yesterday. Third
  sighting on a non-prose surface. The rows should say plainly that the rule covers everything in the
  repo a scanner reads, not just reader-facing copy.
- [design] **Decide the logo frame's aspect ratio when the first real asset lands.** `r45` (portrait) is
  what ships now; a logo usually wants landscape, and `r54` needs three extra global rules to behave
  inside the 140px column. Note also that the *placeholder* renders 247px tall against the portrait's
  201px, because its caption forces more height than 4:5 allows, so the two visual columns are currently
  unequal for placeholder reasons that a real image removes.
- [skills] The `min-width: auto` grid trap has now been hit **twice** in this stylesheet's territory —
  once on a cell (`.pl-frow dd`, already documented) and once on a track (`.org-mark`, this session).
  The existing note is written as a cell-level fix, so it did not generalise to tracks. **Second
  filing**, and the general form is worth stating once: any `auto`/`1fr` grid track holding text needs
  `minmax(0, …)` or the content sets the floor.
- [design] The org card is now visibly taller than the reviewer card, and this change widened the gap
  (the org card gained three eyebrow rows' worth of height while the reviewer gained one). Carried
  forward from the credentials-rework list, still nobody's decision.

## Closed in this session

- ~~[design] The two `PartnerDisclosure` / `Credentials` duplications are now **deliberate**, which
  means the pair should be reviewed together the next time either changes~~ — discharged: both changed
  together here, and the **blurb** duplication was removed outright. The remaining duplication is
  contact details (email/phone), still deliberate, and the standing requirement is re-filed above as
  the `.fxrow` / `.pl-frow` comparator item.

## Output
- [x] **Fix applied** — eyebrow rows in both components, markers inverted, disclosure duplicate removed.
- [x] **Styleguide specimen** — the `marker="dot"` specimen became `marker="accent"`, and the
  `BulletList` description now names the dot as the default; `marker?` added to its props line.
- [x] **Design-register change** — `.blist-items li::before` (default marker colour and shape) and
  `.pl-frow` / `.pl-frow dt` changed in `global.css`; `.blist-items--dot` deleted. No token *value*
  changed — the dot uses the existing `--rule-strong`, the accent the existing `--maroon` — so rule 7
  is not triggered.
- [x] **Verified** — `npm run build` green (20 pages, guardrails passed), `astro check` 0 errors,
  `check-claims` 0 failing / 0 warning / 11 ok, `prose-lint` 10 files passed, `check-pipeline` 0
  failing / 1 warning / 19 ok, `demand-split --strict` exit 0. Browser-measured at 1352px and 375px.
- [ ] **Memory written** — not needed. The transferable lesson (a variant sheet licenses conclusions
  only about the axis it varied) is recorded above in the review that earned it, and its general form
  is already stored as the self-certification memory.

## Grader note

`graded_by: self` — there is no fresh-subagent design grader yet. The reproducible claims are the
measured widths and colours above, all read from the built CSS and a live DOM rather than from the
source I had just written, and the disclosure counts, which are `grep -o` on `dist/`. The judgement
worth challenging is item 3: I removed a compliance-shaped paragraph from a page. The check that makes
that safe is in the review, but it is a check I ran myself on a page I had just edited, and a second
pair of eyes on "location 6 is satisfied elsewhere" would be worth more than my own.
