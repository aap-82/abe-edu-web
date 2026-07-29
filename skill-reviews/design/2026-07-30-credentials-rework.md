---
date: 2026-07-30
skill: design-session
subject: credentials-rework
verdict: Amber
graded_by: self
---

# Design review — reworking the Credentials cards onto one anatomy, 2026-07-30

## Verdict

**Amber.** The result is right and Andrey drove it there, but the path was not: this session **reversed
three removals I had made earlier the same day**, and the guardrails stopped the build **twice** on
defects I introduced. Correct-and-safe is green — every regulated string is intact and word-preservation
was asserted programmatically rather than eyeballed. The Amber is that a morning of subtraction had to
be undone in the afternoon, and the reason is worth recording.

## What I got wrong in the morning

Three separate sessions that day removed things from the `Credentials` org card: the blurb, the role
line, and the contact details. Each removal was defensible on its own — each was a verbatim duplicate
of something in `PartnerDisclosure`. Together they hollowed the card out, and I never re-read it whole.
I even filed that risk myself (*"nobody has re-read the card as a whole since"*) and then did not act on
it.

**The error was treating duplication as the only variable.** `PartnerDisclosure` sits roughly eight
screens above this card. At that distance a second copy is reinforcement for a reader who lands in the
E-E-A-T section, not repetition — which is what Andrey said, and he is right. Distance changes what
duplication means, and I had been measuring only whether two strings matched.

## The process that fixed it

Three variants were **rendered as real HTML against the real tokens** (the harness has no native image
generation, so the variant sheet was the mock) and compared side by side:

- **A** — label/value table for the RTO only; person keeps achievement lines.
- **B** — labelled throughout, both cards literally the same table. **Chosen.**
- **C** — B plus a captioned header row per block.

**The render killed my own recommendation.** I had proposed A on the argument that identical borders
and row heights would make the two cards read as siblings. They did not. The borders are byte-identical
(`1px #e5e7eb` on both, measured) and the person's rows still read as paragraphs. **The aligned label
column is what makes rows read as a table, not the rules.** A was under-delivering on the one thing the
brief asked for, and only rendering it showed that.

The table itself is not new: `PartnerDisclosure` already had `.pl-frow`, a 104px mono label column
beside a 15px value. Reusing its metrics means the two components now agree as well as the three cards.

## What shipped

All three card types — RTO, developer, reviewer — now share one anatomy:
**visual → name → role → facts table → prose → contact table → one action → dated check.**

| | Before | After |
|---|---|---|
| Facts presentation | run-on line, bold split at the first comma | **104px mono label column + value** |
| `fxrow`s per ASQA page | 0 | **10** (6 org, 4 reviewer) |
| Role line on the org card | removed that morning | **restored** |
| Blurb / contact | removed that morning | **restored, duplication deliberate** |
| Multi-item values | comma-run ("QLD, WA and TAS") | **bulleted**, 2 lists per ASQA page |
| RTO number | a row in the table | **eyebrow over a 21px display figure**, in the visual column |
| Website / LinkedIn | links in a row | **labelled contact rows** |
| Links row | baseline row of two | **stacked**, one action per card |
| Dated check | body-copy `<p>` | **dashed top rule, 11px mono uppercase** |
| Visual column | maroon monogram badge | **logo slot** with a labelled placeholder |
| Regulated notes | 1 paragraph each | **4 bullets each**, no word changed |

Verified in the browser at desktop and 375px: no sideways scroll, label column intact at mobile
(104px + 199px), markers 5×5px at 50% radius in `--rule-strong`.

## The guardrails caught three defects, all mine

This is the most useful part of the session.

1. **`.org-rto` as a class name stopped the build with 15 hard-blockers** across five non-ASQA pages.
   Scoped CSS inlines into every page, and RTO language is a forbidden claim on state-approved-direct
   and knowledge-requirement pages. The visible text was fine (it only renders where `rtoNumber`
   exists); the class name leaked everywhere. Renamed to `.org-reg` rather than narrowing the check.
   **This is mistakes-log #7/#8 — *anything a machine scans for, do not quote* — landing on a CSS
   identifier rather than on prose,** which is a surface those rows never anticipated.
2. **A naive `/[^.]+\./` sentence split broke the ASQA disclosure mid-URL** — `training.gov` /
   `au using RTO Code 31193` — turning four sentences into six bullets. The build stopped. A regex that
   splits on every period breaks every URL in regulated copy. Replaced with a boundary requiring a
   period, whitespace, then a capital.
3. **A raw `<ul class="vlist">` in an MDX body failed the class-ownership check**, which told me to
   build a component with a specimen. **One already existed** — `BulletList`. It needed a marker
   *variant*, not a new shape. `marker="dot"` now sits beside the original maroon dash, the dash stays
   the default so no call site moves, and a specimen was added.

Three catches, three times the check was right and I was wrong. Worth saying plainly: the class-ownership
and forbidden-claim checks are doing work no reviewer would reliably do by eye.

## Decisions worth challenging

- **Dot over dash** is not only taste. A maroon dash reads as emphasis, and emphasis on four
  equal-weight compliance sentences flattens them while spending the accent colour DESIGN.md reserves
  for actions.
- **`deliversIn` is a real field, not a parse.** Two of three partner records read "… for QLD, WA and
  TAS", but Upskill's has no `for` clause at all, so any split would have been right twice and wrong
  once.
- **Upskill's `scopeNote` was left untouched.** It is the ⛔ on-hold NSW owner-builder partner and its
  scope wording is a facts question, not a design one.
- **`scopeNote` was trimmed to the course**, which would have silently removed the states from
  `/accreditation`; that page now renders `deliversIn` so nothing was lost.
- **No logo ships.** `logo` is optional and unset everywhere, so every RTO card renders a visible
  labelled placeholder — deliberate per PRODUCT.md. These are third-party trademarks and need the
  partner's supplied file, never a scrape.

## Boundaries crossed, on the standing instruction

This session wrote to `src/content.config.ts` (skills), `src/content/partners/**` and
`src/content/experts/**` and `src/content/courses/**` (build), and `src/pages/accreditation.astro`.
Andrey has chosen "one session does both" three times now; recorded rather than left silent. Editing the
course MDX tripped `check-pipeline` §4 again and a dated delta note was appended to
`pipeline/white-card-wa/07-verification.md`, as with the URL-casing change.

**`.vlist` moved to `global.css`** now that two components render it, carrying its "only `list-style`
marker in this stylesheet" note so the exception stays deliberate. No token value changed, so rule 7 is
not triggered.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- ~~[design] The two `PartnerDisclosure` / `Credentials` duplications are now **deliberate**, which means
  the pair should be reviewed together the next time either changes. They read the same partner record
  and nothing compares their output; three duplications were each found by eye on three separate days.~~
  discharged in `2026-07-30-eyebrow-rows-and-markers.md` — both components changed together, the blurb
  duplication was removed, and the standing comparator requirement was re-filed there.
- [skills] A check that flagged the same partner-record field rendering twice on one page would have
  found all three at once. **Second filing** of this shape.
- [skills] `mistakes-log` rows #7 and #8 are about control tokens in *prose*. This session hit the same
  class in a **CSS class name**, which neither row anticipates. Worth widening the guard's wording:
  anything a scanner reads includes identifiers, not just copy.
- [build] Blue Dog, AlertForce and Upskill each need a supplied logo asset in R2 plus a `logo:` line in
  their partner record. Until then every RTO card shows a placeholder.
- [build] Dominic's first credential reads `Accreditations: Licensed NSW builder (Lic. 369417C)`. The
  label was Andrey's call and the claim is verbatim, but "Accreditations" plural against one licence is
  worth a second look by whoever owns that record.
- [design] The `Credentials` org card and the reviewer card are no longer the same height now that the
  org card carries more rows. They were coincidentally equal before. Not a defect, but if the section
  should read as a matched pair, that is a grid decision nobody has made.

## Output
- [x] **Fix applied** — one anatomy across three card types, and every restoration Andrey asked for.
- [x] **Styleguide specimen** — `BulletList marker="dot"` added; the `Credentials + org` specimen
  updated to exercise `deliversIn`, `email`, `phone` and `url`, and its description corrected (it still
  described a "monogram badge").
- [x] **Design-register change** — `.vlist` and `.blist-items--dot` added to `global.css`. No token
  value changed; rule 7 not triggered.
- [ ] **Memory written** — not needed. The transferable lesson (distance changes what duplication
  means) is in the component comments where the next person to consider removing it will meet it.

## Grader note

`graded_by: self`, and this one deserves the discount more than most: I proposed the wrong variant, the
render corrected me, and the user corrected the three removals that made the rework necessary. The
reproducible parts are the variant sheet (still in the scratchpad), the measured counts above, and the
three build failures, which anyone can re-trigger by renaming the class back or reinstating the naive
split. The judgement call worth challenging is accepting two deliberate duplications: it trades a
tidy-diff virtue for a reader who does not have to scroll eight screens, and I now think that is the
right trade, having argued the opposite this morning.
