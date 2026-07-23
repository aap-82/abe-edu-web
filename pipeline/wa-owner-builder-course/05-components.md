# 05 · Section plan + brief-to-section map — /wa-owner-builder-course

**Run type: AUDIT of a live page.** This map therefore does two jobs: it records where each audit brief
landed, and it records which sections were examined and deliberately left alone. The second job matters
as much as the first here, because on an audit most sections should not change, and a later reader must
be able to tell a considered no-change from an oversight.

Section ids below are the rendered ids, read from `dist/wa-owner-builder-course/index.html`.

---

## Section map (12 sections, markers 01-09 sequential, verified in dist)

| # | Section id | Marker | H2 | From brief | Change this run |
|---|---|---|---|---|---|
| — | `top` (hero) | — | H1: Owner Builder Course WA, ready for your Form 75 | — | **meta description only** (S4). Title and H1 untouched. |
| — | (at a glance) | — | The facts before you enrol | — | unchanged |
| 1 | `course` | 01 | Is this course accepted for WA owner-builder approval? | **S2** (four pathways) + **S6** (Perth) | ✅ pathways added; Perth sentence added; VerifiedSources → Form 75 p5, 23 Jul |
| 2 | `licence` | 02 | Is it a licence, a permit, or an approval? | **S5** | ❌ **no change — verified already quotable** |
| 3 | `need` | 03 | Do you need owner-builder approval, and this course? | **S1** (six-year rule) | ✅ six-year rule corrected; VerifiedSources → 23 Jul |
| 4 | `responsibilities` | 04 | Your responsibilities as a WA owner-builder | — | unchanged (accurate vs WHS Act 2020) |
| 5 | `learn` | 05 | Introduction plus 12 modules, written for WA | — | unchanged (internal content, not a regulatory surface) |
| 6 | `how` | 06 | Three steps to your certificate | — | unchanged |
| 7 | `cost` | 07 | Three costs, three payees, nothing hidden | **S-fee** | ✅ fee provenance label refreshed to FY26-27 |
| 8 | `obligations` | 08 | What else your WA project needs | — | unchanged (Form 75 p2 corroborates the 7-year clock) |
| 9 | `become` | 09 | How to become an owner-builder in Western Australia | **S3** (validity + processing) | ✅ validity Note enriched to the Form's 3 branches; processing caveat added; VerifiedSources → 23 Jul |
| — | `content-review` | — | Who develops and reviews this course | **S7** | ✅ review date 4 Jun → 20 Jun (and in `faqs-wa.ts`) |
| — | `faq` | — | Common questions | **S5**, **S7** | ✅ review date fixed in the data file; answers verified quotable, no rewrite |

**Every audit brief is placed.** S1→`need`, S2→`course`, S3→`become`, S4→hero meta, S5→`licence`+`faq`
(verified, no change), S6→`course`, S7→`content-review`+`faq`.

---

## Recorded decision — the 12 unmatched capsules in `check-pipeline`

`check-pipeline.mjs` reports: *"12 capsule(s) on the page with no close match in 04"*. **This is
expected and correct on this run, not drift.**

`04-content.md` contains only the three click-recovery items (S4 meta, S6 Perth, S7 date fix) plus the
S5 non-change. It deliberately does **not** restate the page's twelve existing answer capsules, because
this is an audit: those capsules were examined, found accurate, and left untouched. Re-drafting them
into 04 purely to satisfy a mechanical diff would mean rewriting live, working copy for the sake of a
checker, which is precisely backwards.

**The checker is right to flag it and I am right to leave it** — the warning correctly says "these page
capsules are not in your content artefact", and the answer is "because this run did not author them".
**Demand-list item:** `check-pipeline` has no notion of an *audit* run, where the expected relationship
between 04 and the page is partial by design. It should either take a run-type flag or treat
"page capsules not in 04" as INFO rather than WARN when 04 declares itself an audit.

---

## Component prop contracts encountered

- **`Note` slot must be ONE line.** The enriched validity Note in `become` is single-line for this
  reason (MDX wraps a multi-line child in its own `<p>`; a `<p>` inside `Note`'s `<p>` renders empty —
  mistakes-log #12).
- **`VerifiedSources`** takes `date`, `facts`, `sources[{label, href}]`. Three were updated to
  23 Jul 2026; each `facts` string now names what was actually re-verified, not a generic phrase.
- **Markers are sequential across `Section` and `ZSection` alike** — 01-09 here, with `content-review`
  and `faq` deliberately unmarked (they are proof/closing sections, matching the other course pages).
- **The review date lives in TWO files** — `wa-owner-builder-course.mdx` (3 places) and
  `src/data/faqs-wa.ts` (1). This is the contract that broke this run: changing it in one file leaves
  the page self-contradictory. **Any date change must be a repo-wide grep, not a per-file edit.**

---

## Deviations from the briefs

1. **S5 produced no edit.** The brief assumed the FAQ and `licence` answers needed rewriting to be
   liftable for People Also Ask; reading them showed they already open with complete standalone answers
   (*"An approval."*, *"Yes."*). Abandoned deliberately rather than making a change for its own sake.
   Recorded in `04-content.md` §S5.
2. **S4 was trimmed after measurement.** First draft ran 171 characters; measured from the built
   `<meta>` tag and cut to 149 so it will not truncate.
3. **No new sections, no new components.** An audit of a page ranking in position 3 for its money term
   should not restructure it. The only structural addition all run is one caution Note enrichment and
   two prose paragraphs, all inside existing sections.
