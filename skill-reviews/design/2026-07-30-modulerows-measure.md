---
date: 2026-07-30
skill: design-session
subject: modulerows-measure
verdict: Green
graded_by: self
---

# Design review — `ModuleRows` measure caps, 2026-07-30

## Verdict

**Green.** One demand item, filed twice, actioned. The item's own figure was an underestimate, the same
defect turned out to be in the component twice more, and the value chosen is one the repo had already
settled on for this exact reason rather than a fourth new number.

## What the item asked for, and what was actually there

The item read: `.mr-body { max-width: 70ch }` renders **~91 CPL**, over the 85 hard rule, on six
owner-builder pages. Measured on the built pages with `Range.getClientRects()` at 1520px, counting the
characters that actually land on each line box:

| | computed width | worst CPL | median | over 85 | over 75 |
|---|---|---|---|---|---|
| `.mr-body`, ACT, 12 paragraphs | 718.2px | **102** | 84 | 5 of 12 | 8 of 12 |
| `.mr-outcome`, QLD, 6 blocks | 670.3px | **93** | 79 | 1 of 6 | 4 of 6 |
| `.mr-mods-list`, QLD, 6 lists | **814px** | 40 | 34 | 0 | 0 |

Three corrections to the item, all of which change what the fix had to touch:

**1. 102 CPL, not 91.** 91 was the arithmetic estimate (70 × the ch-to-average-advance ratio). The real
number depends on the character mix of the specific sentence, so it varies per paragraph and runs above
the estimate on ACT's copy. Estimating the consequence of a proxy unit with a second proxy stays a proxy.

**2. It is not `.mr-body` on six pages. It is two selectors across six pages.** `.mr-body` renders on
five of them (ACT 12, TAS 9, NSW 5, NSW-w 5, WA 4) and **not on QLD at all** — QLD is the one page that
authors `outcome` instead of `body`, so its breach came through `.mr-outcome`, which carried its own
`70ch`. Fixing only the named selector would have left the worst-documented page untouched while every
gate went green. Counted with `grep -o 'class="mr-body"'` on `dist/`, which is also how the miscount in
the item was found: `grep -c` counts matching *lines*, and built HTML is a handful of very long lines.

**3. `.mr-mods-list`'s `70ch` was never a 15px measure.** `ch` resolves against the element's **own**
font, and that `<ul>` sets no `font-size` — so it inherited 17px and the cap computed to **814px**, while
the text it was meant to govern is the 15px inside its `<li>`s. Not a live breach (the longest module name
on any of the six pages is 40 CPL) but 814px of licence, and the same unit-versus-element mistake
`global.css` already records at `.verified .v-body`.

## The value: 480px, and it is not a new number

Trialled on ACT's twelve paragraphs, each value measured rather than reasoned about:

| cap | width | worst CPL | median | over 85 | over 75 |
|---|---|---|---|---|---|
| `70ch` (before) | 718px | 102 | 84 | 5 | 8 |
| `62ch` | 636px | 92 | 82 | 4 | 8 |
| `58ch` (the `UnitOutline` value) | 595px | 84 | 77 | 0 | 8 |
| `560px` | 560px | 80 | 76 | 0 | 7 |
| `520px` | 520px | 75 | 70 | 0 | 0 |
| **`480px`** | 480px | **72** | **64** | **0** | **0** |
| `440px` | 440px | 65 | 61 | 0 | 0 |

`58ch` — the sibling component's value, and the obvious consistency pick — passes with **one character**
of headroom under the hard rule. That is not a margin; it is a coincidence of today's copy.

**480px is what `global.css` already decided**, for this exact reason, at `.measure` (480px), `.note`
(480px) and `.price-foot` (440px). Its comment says the caps are in px and not `ch` deliberately, having
measured a `66ch` cap at 94-95 CPL. So this change is not a fourth number in a fourth unit: the syllabus
prose now caps at the same 480px text column as the section prose it sits beside, and the reader meets one
measure down the page instead of two. `.mr-mods-list` takes **584px** = the 88px number rail + the 16px
gap + that same 480px text column, so a long module name would wrap at the measure rather than at
whatever the layout happened to leave.

## After, on every page that renders it

| page | selector | width | worst CPL | median | over 85 | over 75 |
|---|---|---|---|---|---|---|
| ACT | `.mr-body` × 12 | 480px | 72 | 64 | 0 | 0 |
| TAS | `.mr-body` × 9 | 480px | 68 | 65 | 0 | 0 |
| WA | `.mr-body` × 4 | 480px | 73 | 70 | 0 | 0 |
| NSW | `.mr-body` × 5 | 480px | 68 | 65 | 0 | 0 |
| NSW-w | `.mr-body` × 5 | 480px | 68 | 65 | 0 | 0 |
| QLD | `.mr-outcome` × 6 | 480px | 70 | 68 | 0 | 0 |
| QLD | `.mr-mods-list` × 6 | 584px | 40 | 34 | 0 | 0 |
| styleguide | `.mr-body` × 2 / `.mr-outcome` × 2 / `.mr-mods-list` | 480/480/584px | 68 / 60 / 35 | — | 0 | 0 |

Every page is inside the 65-75 band, not merely inside the 85 rule. The 584px cap introduced **no new
wrap**: QLD's longest module name still measures 40 CPL, unchanged.

**Geometry, since the outcome block carries a visible rule.** On QLD the content column offers 970px
(x 371 to 1341). The dotted rule now ends at x 851 on all six rows; the widest module name reaches x 752
and the widest outcome line x 851. Nothing overruns the rule, and it is the same length on every row.

**Mobile is provably untouched.** At 375px `.mr-body` renders 319px wide, so a 480px cap does not bind at
all — worst 47 CPL, median 44, `document.scrollWidth` 375 against a 375 viewport. Verified rather than
asserted, because "a max-width cannot make a narrow column narrower" is the kind of reasoning that has
been wrong here before.

## The fix I did not make, and why it matters more than the one I did

Measuring `.unit-eb` — `UnitOutline`'s 58ch cap, shipped this morning by the session that filed this
item — gives **89 CPL worst, 83 median, 1 of 4 elements over the 85 hard rule and 4 of 4 over 75**, on
`/white-card-wa`, which is indexable. Same method, same viewport, same fonts. That session recorded 77 CPL
for it.

So the `ch` fix that this item was filed *alongside* did not hold either, and the reason is the one the
open [skills] item is about: a `ch` cap converts to a different CPL for every piece of copy, so a value
verified against one component's sentences is unverified everywhere else. `58ch` measured 77 on four table
cells and 84 on ACT's syllabus prose.

Not fixed here, on the standing instruction that everything not on the actioned list is recorded rather
than actioned, and because it ships on a live page and deserves its own before/after. Filed below. It is
one line.

## Decisions worth challenging

- **480px over 520px.** 520px also cleared the band (worst 75) and keeps more of the row's width in use.
  I chose 480px for the match with `.measure`, i.e. for one measure on the page over a slightly fuller
  column. A reviewer could reasonably prefer 520px on the argument that a 970px content column capped at
  480px leaves half the row empty, and the syllabus rows are dense enough to carry more.
- **584px on `.mr-mods-list` is a stated intention, not a measured constraint.** No module name comes
  close to it, so it changes nothing today. It is there so the next one wraps at the measure instead of
  at 814px, and the arithmetic is in the comment.
- **The cap stays on `.mr-outcome`, not on `.mr-olist`.** The label, the dotted rule and the outcomes then
  end at one edge. Capping the list alone would have left the rule longer than the text under it.
- **`UnitOutline`'s comment was edited**, not just left. It said ModuleRows was deliberately not changed
  "because it ships on six pages", which stopped being true in this session. A stale pointer in a
  component comment is the repo's most-repeated recorded risk (mistakes log, seen 10×).

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- ~~[design] **`UnitOutline`'s `.unit-eb { max-width: 58ch }` renders 89 CPL** on `/white-card-wa` (median
  83, 1 of 4 over the 85 hard rule, 4 of 4 over 75), measured 30 Jul at 1520px. Convert to px on the
  `.measure` precedent, as `ModuleRows` now is. One line, one live indexable page, so it wants its own
  before/after.~~ **Closed 10 Aug 2026**, exactly as prescribed: converted to px on the `.measure`
  precedent. Measured on `/white-card-wa` at 1280px — before **82-88 CPL** (median 84.5, 1 of 4 over
  85), after **64-68 CPL** (median 65.5, 0 over 85). See
  `skill-reviews/design/2026-08-10-measure-in-px-and-styleguide-ground.md`.
- [skills] **The CPL rule should state its unit — third filing, and the trigger has fired.** Recorded in
  `2026-07-30-unit-outline.md` and `2026-07-30-credentials-cards.md`, and now with the evidence that the
  `58ch` written *as that item's own fix* is itself over the rule. The two prior filings do not merge in
  `demand-split` because its key sorts code-span identifiers first and one names `UnitOutline` while the
  other does not — worth knowing before the counts are trusted. I have not re-worded them: rewriting two
  past runs' records to satisfy a key is a skills call, not a design one.
- ~~[skills] **`demand-split`'s header counts its two halves in different units.** `openCount` is
  `entries.length`, which is **deduped by key**, while `closedCount` is a count of **raw struck lines**
  (`demand-split.mjs:281` against `:527`). Striking the two filings of this item and filing one new one
  moved design from `36 open · 27 closed` to `36 open · 29 closed` — correct in both halves, and it reads
  as though nothing closed. A header written as `N open · M closed` invites subtraction; either count
  entries on both sides or say which is which.~~ fixed 4 Aug 2026, commit `92f6571`/`f26d159` — see
  `skill-reviews/skills/2026-08-04-demand-split-header-units.md`.
- [skills] **`global.css`'s own note at `.measure` lists unfinished work and nobody owns it.** It says
  "`.capsule` and footer `.f-auth` still use 66ch and are therefore looser than they read - worth
  revisiting on the same evidence". That is a demand item living in a code comment, where no tool counts
  it. `.capsule` is the answer capsule on every course page.

## Output
- [x] **Component changed** — `src/components/ModuleRows.astro`: `.mr-body` and `.mr-outcome` `70ch` →
  `480px`, `.mr-mods-list` `70ch` → `584px`, each with the measured before/after and the `.measure`
  precedent recorded in the file.
- [x] **Stale comment corrected** — `src/components/UnitOutline.astro`'s note that ModuleRows was left
  alone now records that it was fixed, and carries the two findings that bear on its own 58ch.
- [x] **Design-register change** — none. No token added or changed, no `global.css` edit. Rule 7 not
  triggered. Both new values are px literals matching numbers `global.css` already uses.
- [x] **Verified** — `npm run build` green, guardrails 20 pages, `check-claims` 0 failing / 0 warning /
  11 ok, `system-health` 0 FAIL / 13 WARN (identical to pre-flight, nothing new). CPL measured on all
  seven pages that render the component, at 1520px and at 375px.
- [x] **Demand items closed** — the `.mr-body` item struck through in both reviews that filed it.
- [x] ~~**Second piece of work in this session, not yet decided**~~ — decided 31 Jul: Andrey chose
  variant C, it is promoted into `ModuleRows.astro` on all six pages, and the variants file is
  deleted. See `2026-07-31-module-accordion.md`. Original entry kept below for the record.
  `src/components/ModuleGroupsVariants.astro`
  plus **four** specimens on `/styleguide#module-group-variants`: an accordion treatment of the group
  row with modules and outcomes in two columns, asked for after the measure fix landed. The first
  three differ on how much is hidden (open ledger / split disclosure / plate accordion), because the
  ask runs against PRODUCT.md's "accordions are for FAQs only" and DESIGN.md section 7's reader's-job
  table. **D was added 31 Jul on Andrey's direction**: no accordion at all, three columns, an eyebrow
  over each, group key down to 12px, and the outcome bullets changed from `--slate` to `--maroon`
  (#800000) — that last one overrides "Heritage Maroon for actions only" and is flagged in the file.
  Awaiting Andrey's pick; the winner gets promoted into `ModuleRows.astro` and the variants file
  deleted. **That change gets its own review** — it is a component decision, not this one.
- [ ] **Memory written** — not needed. The durable form of this finding is the px-not-ch precedent, which
  is now recorded in the two components and already in `global.css`; the rule change itself is on the
  demand list as a [skills] item.

## Grader note

`graded_by: self` — no fresh-subagent design grader exists. Everything numeric here is reproducible:
serve `dist/`, then count characters per line box with a `Range` per character grouped by `rect.top`.
That method, not an average-advance calculation, is what caught that the item's 91 was low and that
`58ch` is over the rule. The judgement worth challenging is 480px over 520px, and the scope call: I fixed
three caps in the component when the item named one, on the argument that `.mr-outcome` was the same
defect breaching the same rule in the same file, and left `UnitOutline`'s alone because it is a different
component on a live page.
