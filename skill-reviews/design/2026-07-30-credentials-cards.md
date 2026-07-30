---
date: 2026-07-30
skill: design-session
subject: credentials-cards
verdict: Amber
graded_by: self
---

# Design review — the Credentials cards, live iteration, 2026-07-30

Covers the run of `Credentials` work driven by Andrey's live element-picks: the shared visual column,
chips, the headline figure, the spacing pass, and the partial underline. Rule 9's record for changes
that were already merged across PRs #98, #99 and #100 plus the fix in this session.

## Verdict

**Amber.** The result is right and every change was measured, but **one fix shipped doing nothing** and
Andrey found it by looking at the page. That is the defect this review exists to record.

## The failure worth the whole review

`border-bottom: 0` on `.mc-link` **lost a specificity contest and I certified it anyway.**

| | Specificity |
|---|---|
| `global.css` → `.person a.pl` | **(0,2,1)** — two classes + one element |
| scoped → `.mc-link[data-astro-cid-…]` | **(0,2,0)** — two classes |

The global rule won, so the anchor kept its full-width underline. Fixed with `.person .mc-link`, which
Astro stamps to `(0,4,0)`.

**The specificity arithmetic is not the lesson.** The lesson is what I verified. I checked the *markup* —
that `<span class="uu">` existed and wrapped the right words — and reported the change as shipped. I
never checked the *computed border*. So the assertion I made was true and irrelevant: the span was
present and the underline was still wrong.

This is the self-certification memory landing again, in a new place: not "I didn't measure" but **"I
measured the input instead of the outcome."** A markup assertion cannot prove a cascade outcome. The
correct check is one line and I now run it: `getComputedStyle(a).borderBottomWidth === '0px'`.

Measured after the fix, on both pages, all four links:

| Link | anchor bottom | underlined span | top hairline |
|---|---|---|---|
| Verify on **training.gov.au** → | 0px | 1px | 1px |
| See **full profile** → (×3) | 0px | 1px | 1px |

## What shipped across the run

| | Before | After |
|---|---|---|
| Visual column width | 140px | **210px**, equal on both cards |
| Card anatomy | portrait + text; link at the foot of the text column | **mark → headline figure → action → dated check** |
| Headline fact | third row of a table | **figure under the mark**, eyebrow + 21px display |
| Multi-item values | bulleted list | **chips**, matched to SiteHeader's `.mst` |
| Contact rows | 3 rules | **outer 2 only** — one united block |
| Prose block | unlabelled | **`About` eyebrow** on both cards |
| Off-scale spacing values | 7 (`3, 9, 6, 2, 14, 4, 10px`) | **0** — all on the 4/8/12/16/24/32 scale |
| Left-column rhythm | monotone 16px gap, 4 jobs | **12px + rule + 12px** per band |
| Label declarations | 3, differing by 0.5px and .04em | **1 grouped rule** |
| Reviewer date | none | **`Reviewed 28 Jul 2026`**, from the page's own frontmatter |
| Link underline | whole anchor | **destination noun only** |

## Decisions where I refused the obvious implementation

Three, and they are the useful part after the failure above.

- **The figure/qualifier split is authored, not parsed.** To get "27+ years" out of "27+ years in the
  VET sector", the obvious move is a regex for the leading quantity phrase. It turns Dominic's
  "Licensed NSW builder (Lic. 369417C)" into "Licensed NSW". There is no safe way to guess where a
  figure ends, so a record opts in with `|` and nothing else moves.
- **Which credential is promoted is positional, not by label.** Matching `"Experience"` would have been
  fragile in exactly the way this component already argues against for chips — and two labels had been
  reworded an hour earlier. Authored order is the record owner's lever.
- **The chips matched an existing badge.** `SiteHeader`'s `.mst` already styled a state code in a box.
  One deliberate difference: `.mst` is maroon because it sits inside a link; chips are data, so
  `--ink-2`. A maroon chip promises a destination that does not exist.

I also **over-engineered the chips first**, gating them behind a 24-character threshold. Andrey removed
the need for it. The threshold guarded against a problem `flex-wrap` already solves and could have
rendered the same kind of data two ways depending on wording.

## Two of my own calls that Andrey reversed, both correctly

- **The landscape logo frame.** I argued a logo is a wide object and letterboxes badly in `r45`. True,
  but it made the org card's mark a different size and shape from the portrait beside it, which cost
  more than the letterboxing saved. Matching frames is the better trade for a block whose whole point
  is that the cards are one object.
- **The release-and-currency line.** I had printed "Release 2 · usage recommendation Current" on the
  `UnitOutline` plate. Replacing it with the register link is the stronger position: a release number
  and a currency status are government facts with a shelf life, so stating them undated puts the page on
  a re-verification cadence nobody owns and makes a stale page an *inaccurate* one. The link cannot
  decay, and both figures remain dated in the `VerifiedSources` ledger.

## Boundaries

This run wrote `src/components/**` and `src/styles/**` (design), `src/content/**` (build) and
`src/types/course.ts` (unassigned). Andrey has chosen "one session does both" repeatedly; recorded
rather than left silent. Stage-7 delta notes were appended to `pipeline/white-card-wa/07-verification.md`
for every content change, including the two that added claims.

**A build session was opened and closed cleanly mid-run** for the `becomeSteps` stubs, and when the next
request turned out to be component CSS, that session was ended rather than widened. That is the session
rule working as written.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [skills] **GitHub's server-side merge ignores `.gitattributes` merge drivers, so `data/health-log.jsonl`
  conflicts on GitHub even though it merges cleanly locally.** `.gitattributes` marks it `merge=union`,
  which local git honours; GitHub's merge does not, so every PR that spans a main advance is reported as
  conflicted on a file that has no real conflict. It happened on #102. The existing `.gitattributes`
  comment covers the *local checkout* hazard but not this one. Options worth weighing: stop committing
  the log (recording policy layer 2 would need a different home), commit it only on `main`, or accept the
  noise and document that the resolution is always "merge main in locally, then run
  `health-log-dedupe.mjs`". Currently every such PR costs a manual merge.
- [skills] **A push to a branch whose PR has already merged is silent.** It happened three times in one
  session (#98, #99, #100 each merged mid-flight), and each time the newest commit sat on `origin` but
  not on `main`. Detectable: compare the current branch's upstream PR state before pushing, or warn when
  `git push` targets a branch with a closed PR. This is mistakes-log row 22's mechanism, now seen three
  more times in one day.
- [skills] **Nothing checks that a unit code on a page is real.** A supplied `CPCWHS101` (one digit short
  of CPCWHS1001) was caught by eye during this run. `check-claims` guards the superseded `CPCCWHS1001`
  and the register figures, but no check confirms a unit code exists and is on the partner's scope. It is
  the identifier a reader takes to training.gov.au, so a near-miss resolves to nothing. **Highest-value
  check missing.**
- [design] **`ModuleRows`' `.mr-body { max-width: 70ch }` renders ~91 CPL**, over the 85 rule, on six
  owner-builder pages. Same `ch`-versus-character gap measured in `UnitOutline`. One line, six pages of
  visual diff, so it wants its own session.
- [skills] **The CPL rule should state its unit.** `ch` is the advance of the "0" glyph — 10.03px in
  DM Sans against a 7.72px average character — so a rule written in `ch` is ~30% looser than intended.
  Both `UnitOutline` and `ModuleRows` landed over the limit while looking compliant in source.
- [design] **Card prose runs at 39 CPL**, far under the 65–75 target, because `.people` is `1fr 1fr` and
  the visual column now takes 210px of each 536px card. Recommended keeping it (the bios are one
  sliced paragraph doing caption work, and the column's other content is tabular), but it is a real
  measured miss and nobody has decided it.
- [design] **A tick in a `FactGrid` glance cell was requested and not built.** `FactGrid` has no tick
  affordance and DESIGN.md gives the tick two jobs (hero glyphs; the Verify Deep tick that is one
  signature with `VERIFIED`). A third use is a design-register decision, not a content one.
- [build] **Only `/white-card-wa` passes `reviewed=`.** The other five course pages carry `reviewedBy`
  frontmatter but not the prop, so their reviewer cards show no date.
- [build] **Two dispatch qualifiers are unstated.** The card copy says next-business-day dispatch
  unconditionally. If it depends on a daily cut-off, or does not hold on weekends and public holidays,
  the note needs that. Both sentences are written as dispatch, not delivery, deliberately.
- [facts] **"Experience" and "Work experience" now sit as adjacent labels** on the reviewer card. They
  hold different things (years in sector vs past roles) but read as near-duplicates. Whoever owns that
  record should decide.

## Output
- [x] **Fix applied** — the specificity fix, and the full run of card changes.
- [x] **Styleguide specimen** — `UnitOutline` added; `BulletList`'s marker specimen updated to
  `marker="accent"` with the dot named as the default.
- [x] **Design-register change** — `.blist-items` default marker, `.pl-frow` eyebrow rows, `.vlist`
  retained for `BundleOffer` only; `.person .ph.r54` added then removed when the logo returned to `r45`.
  No token *value* changed, so rule 7 is not triggered.
- [x] **Verified** — build green at 20 pages, guardrails passed, `astro check` 0 errors, `check-claims`
  0 failing / 11 ok, `prose-lint` 10 files passed, `check-pipeline` 0 failing. Computed styles measured
  in-browser on both pages.
- [ ] **Memory written** — **needed, and this one earns it.** "Measure the outcome, not the input" is a
  distinct failure from the existing self-certification memory and it cost a user-visible defect. To be
  written as an update to `feedback_self_certification_fails.md` rather than a new file.

## Grader note

`graded_by: self` — no fresh-subagent design grader exists, and this review would benefit from one more
than most, because the defect it centres on is one I reported as fixed. Reproducible: revert
`.person .mc-link` to `.mc-link` and the computed `borderBottomWidth` returns to `1px` while the markup
stays identical, which is the whole point. The judgement worth challenging is keeping card prose at
39 CPL: I argued the column is doing caption work, and a reviewer would be right to say that a measured
miss of half the target is not answered by reframing what the text is for.
