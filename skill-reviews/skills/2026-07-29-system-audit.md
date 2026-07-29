---
# Machine-readable block. scripts/demand-split.mjs routes the demand list below; review-trends.mjs
# deliberately does not read this subdirectory (no run metrics, no page graded). See CLAUDE.md rule 10.
date: 2026-07-29
skill: system-audit
subject: system-audit-documentation
archetype: n/a — skills session, whole-system audit
verdict: Amber
graded_by: self
scores:
  correct_and_safe: green
  passed_gates_first_time: amber
  inside_effort_budget: green
  low_rework: green
  taught_us_something: green
---

# Skills review — full system audit, 2026-07-29

## Verdict

**Amber.** Every mechanical layer was already green and stayed green; the audit's whole yield was in
the layer nothing read. Correct-and-safe is green — no regulatory fact, register figure or page claim
was touched. The Amber is `passed_gates_first_time`: the audit itself introduced one new standing FAIL
(a true positive, below), and it found that three of the system's own set-scoped tools were computing
over partial sets, which means several gates had been passing on incomplete evidence.

## What was audited

Whether the system behaves as `SYSTEM.md` describes it. Three parallel sweeps: every checkable claim in
`SYSTEM.md`/`ROADMAP.md`/`CLAUDE.md` against disk; the skill's full reference graph for broken pointers
and orphans; and the mistakes log plus every demand list for what was recorded and never done.

## What worked

The mechanical layer is in genuinely good shape, and this is worth stating because the findings below
could read as though it were not. Measured at pre-flight, before any change:

| Check | Pre-flight |
|---|---|
| `system-health` | 0 failing, 12 warning, 33 ok |
| `check-claims` | 0 failing, 0 warning, 11 ok |
| `check-pipeline` | 0 failing, 1 warning, 15 ok |
| Register freshness | 16/16 current |
| Skill references | 82/82 resolve |
| Figures against the register | 150/150 |

`check-claims` §7 — the reader given to `SYSTEM.md` §5 four days earlier — is the single best artefact
in the repo and is the direct model for what this audit built. It works because it constrains the set
in **both** directions.

## What didn't

**The three holes, all the same shape: a tool that could not see part of its own set.**

1. **`system-health`'s dangling-reference check read `.claude/skills/**` and nothing else.** The
   documents that *state* "every path resolves, or it does not exist" were the only ones exempt from
   it. Six dead pointers were surviving clean runs: `outputs/md/abe-page-design-rules.md`,
   `../MIGRATION.md`, `../abe-rebuild-plan-review.md`, a root `HANDOVER.md` in `worker/entry.js`, an
   unqualified `references/usability-map.md`, and `CLAUDE.md` telling the reader that
   `demand-split --write` regenerates `handover/` when it writes `reports/`.
2. **`demand-split` and `system-health`'s unrouted counter were non-recursive.** Ten design reviews and
   their demand items reached no handover note and were counted in no repeat tally. The
   second-occurrence rule that decides what gets built was being computed from a partial set, and the
   health log's `unrouted: 0` was a false clean — two items tagged `[build]` were invisible.
3. **The destination list carried three of the four session types.** `[build]` was not a valid tag, so
   page work filed by a design session had nowhere to go. This is row 1's eighth-sighting lesson —
   a claim about a set must constrain the whole set — landing on the routing table itself.

**One live doc-vs-code contradiction.** `CLAUDE.md` said `check-freshness` "warns without blocking".
True of register staleness, false in general: a live, expired, still-sold CPD course exits 1 without
`--strict` (`check-freshness.mjs:186`), and `ROADMAP.md:140` said so correctly. Two rule documents
disagreed and the code agreed with the less-read one.

**A seventh dead pointer, and the audit got it wrong first.** `CLAUDE.md` said GSC exports live in
`data/GSC/`. The exports moved to `business data/GSC/` (note the space) around 28 Jul, and `/data/*`
now holds only `health-log.jsonl` — a run following the documented path finds nothing and concludes no
export exists, which is what happened on the `white-card-wa` build until Andrey pointed at the new
location. The same stale path was in the skill's Stage 2 method, `HANDOVER-phase-2.md`, and
`.gitignore`'s own comment. All four corrected; `kb/register/demand-and-revenue-snapshot.md` is
facts-owned and routed.

**But the audit's first conclusion about it was wrong**, and this is the more useful half. Having
looked in `data/` and `C:\dev\` and found nothing, I wrote into `CLAUDE.md` that the zips were absent
from the machine and should be downloaded again. They were on disk the whole time, one directory away.
Caught only by reading a stored memory that recorded the move. **A negative result from an incomplete
search is not a finding** — mistakes-log #18, arrived at from a new direction: not a regex too narrow
to find the thing, but a search of two locations reported as a search of all of them. The fix was to
re-search from the artefact that would know, rather than from where the path said to look.

**A false positive worth recording.** The sweep flagged `public/llms.txt` as a broken reference in four
SEO docs. It is not: every mention is a *mythbusting* entry saying Google ignores `llms.txt` and ABE
should not build one. The file is correctly absent. An absence finding needs a second, differently
shaped check before it is believed — mistakes-log #18, avoided this time by reading the referring lines
rather than trusting the path scan.

## What shipped — measured before/after

| Change | Before | After |
|---|---|---|
| Governance-doc reference check | did not exist | **86/86 resolve**, `docRefs` logged separately from `skillRefs` |
| Dead pointers in governance docs | 7 | 0 |
| Demand items counted | **45** (flat scan) | **101** (recursive) |
| Valid destinations | 3 (`skills`/`design`/`facts`) | **4** (+`build`) |
| UNROUTED items | 0 — **false clean**, 2 unseen | 0, true; `--strict` exits 0 |
| `system-health` | 0 fail, 12 warn, 33 ok | **1 fail**, 12 warn, **37 ok** |
| `check-claims` CLAIMS entries | 8 | **11** |
| Stage-7 audit-scope check | did not exist | 4 slugs checked, **1 FAIL** (true positive) |
| `becomeSteps` | required; 2 pages stub it `[]` | optional |
| `--slug` filter | did not exist | on `check-claims`, `check-pipeline`, `check-links` |
| Skill reference count | 82/82 | 83/83 (`usability-map.md` anchored) |
| Orphaned files | `usability-map.md`, `PIPELINE-REFERENCE.md` | 0 |
| Build | 20 pages, guardrails green | 20 pages, guardrails green, 0 type errors |

**Every new check was tested in both directions**, per mistakes-log #20 and #23 — seen to FAIL on the
input that prompted it, and seen to PASS on the ordinary case:
- Governance refs: a scratch file with one in-repo miss and one `../` escape produced two FAILs and
  moved the count 85/85 → 86/88; removing it restored 85/85.
- The `reports/` CLAIM: repointing `OUT_DIR` to `'handover'` produced CLAIM DRIFT and 10/11.
- The `check-freshness` CLAIM: its first pattern, a bare `/process\.exit\(1\)/`, matched **both** exits
  and would have certified the claim even after the drift it exists to catch. Tightened to distinguish
  the `STRICT`-guarded exit from the unconditional one, then re-tested by making the expiry exit
  conditional — which correctly failed. **This is row 1's eighth-sighting trap caught in the act of
  being rebuilt**, in a check written to prevent it.
- Stage-7 scope: FAILs `white-card-wa` on real historical data, passes the other three.
- The recursive unrouted counter: a scratch review in `skill-reviews/design/` with an invalid tag moved
  it 0 → 1, which the flat version could not have seen at all.

**And the recursion fix was itself half-done for an hour.** `demand-split` was made recursive, `DEST`
in `system-health` gained `build` — and `system-health`'s own traversal was left flat. It kept
reporting `Unrouted demand items: 0 (45 tagged)` while `demand-split` saw 101, and the two numbers
disagreeing is the only reason it was caught, on the final verification run rather than in review. The
lesson generalises past this repo: **when the same set is traversed in two places, changing one and not
the other produces two confident numbers and no error.** Both now carry a comment saying which
traversal they must match and why.

## The new standing FAIL is a true positive

`check-pipeline` now FAILs `white-card-wa`: its `07-verification.md` names none of the three mandated
sub-skill audits. That is not a false alarm — the run's own review records the skip as the **third**
occurrence, and the demand item has now been filed four times. Same standing as the `cpd-building-tas`
gate-ordering FAIL when §4 shipped: an open backlog item, not noise. It does not block the build
(`check-pipeline` is not in `prebuild` and exits 0 without `--strict`), but it will stop a pre-flight
under rule 1, which is the intent. It is routed to `build` below.

## Deliberately not done

- **The headless 320px width check.** At two occurrences and ROADMAP-authorised, but it needs
  playwright or puppeteer in `package.json`. Confirmed with Andrey as a separate ask.
- **The SEO freshness audit.** The skill is 64 days past its own 60-day trigger and 26 days from the
  90-day recommendation. Recorded in `freshness-check.md` with the due date; wants live fetches and its
  own session.
- **Back-filling six missing Stage-9 reviews.** `Review coverage: 3/9` is a standing WARN. Six pages
  shipped without a review; that is six runs the learning loop never saw, and inventing reviews after
  the fact would produce exactly the false coverage the metric exists to detect.
- **Everything the session type forbids** — `src/components/**`, `src/styles/**`, `kb/register/**`,
  `src/content/**`. Routed below.

## Boundary note

`worker/entry.js` is assigned to **no** session type. This audit edited one comment in it — a pointer
at a `HANDOVER.md` that had moved — which is a judgement call at the boundary rather than a clean
entitlement. It is recorded in `CLAUDE.md` beside the session-types table rather than left to be
discovered. `SYSTEM.md` and `handover/**` were genuinely unassigned and are now assigned to skills, by
the same precedent that assigned `content.config.ts` on 25 Jul.

## Post-grading changes (29 Jul 2026, after PR #86 merged)

Scores above are unchanged; this is appended per the standing rule that a run's record closes after
the last change, not at grading. **A re-grade is warranted** — the Amber below is arguably generous.

Running `demand-split --write` on the merged code showed the output was **wrong in both directions**,
and I had shipped the traversal fix without checking what happened downstream of it. Four defects in
the repeat counter that ROADMAP rule 3 depends on:

1. **`- [skills] none.` was parsed as a demand item.** Six reviews write it, so "none." repeated
   across runs and was promoted to *"Trigger met — these have earned action"* in two destination
   notes. The tool was reporting the absence of work as the most-repeated work.
2. **Only the LEAD LINE of a wrapped item was read**, and the old comment called that "correct". A
   demand item wrapped at 100 columns lost everything after line one, so notes rendered half a
   sentence and the repeat key was a fragment. The dead-`Login`-anchor item truncated at *"is a
   dead"* — every discriminating word was on a line nothing read.
3. **`normalise()` stripped code spans before keying.** `SiteHeader.astro`, `Note.astro`,
   `--paper-alt` are the most identifying tokens an item has, and they were the part being thrown
   away; the varying prose was the part being kept.
4. **Consequence:** `design` reported *"No item in this destination has recurred yet"* while five
   items sat at two or three filings — the exact repeats this audit had found by hand-reading all
   sixteen reviews.

| | Before | After |
|---|---|---|
| Placeholder items counted as work | 4 | 0 |
| Known repeats detected mechanically | 0 of 5 | **5 of 5** |
| Near-miss pairs surfaced | n/a | 11, **11 genuine on inspection** |
| `system-health` tagged items | 101 (4 placeholders) | 97 |
| `check-claims` CLAIMS | 11 | **12** |

Fixed by: skipping placeholders (anchored narrowly — *"none outstanding; the bullet treatment is now
live"* carries a reason and is correctly **kept**), coalescing wrapped items, keying on identifiers
first, merging on either the new or the old key so a rekeying can only add pairings, and a
confirm-by-hand near-miss pass for items that name the same thing without keying identically.

**The near-miss threshold had to be retuned twice, and that is the lesson.** An absolute
shared-word count gave 4 pairs; coalescing wrapped items doubled the average item length and the
same threshold gave 26, without a single new repeat existing. A fixed count does not survive a
change in item length. It is now a ratio against the shorter item (35%, floor of 3 words), which
does — 11 pairs, all genuine. **A threshold tuned against one corpus is a measurement of that
corpus, not a rule**, so both numbers are printed with the output for the next reader to judge.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

**Triggered — two or more occurrences, and now visible to `demand-split` for the first time:**
- [design] `SiteHeader.astro:139` — `const studentPortal = { label: 'Login', href: '#' }` is a dead
  anchor in site chrome, on every page. Filed by the `white-card-wa` Stage 7 and again by
  `design/2026-07-28-reflow-spacing-and-tap-targets.md`. Needs a destination or removal.
- [design] The partner blurb renders twice on every ASQA page (`PartnerDisclosure` + the `Credentials`
  org card). **Three occurrences**, no decision recorded. Decide which component owns the description
  and suppress the other.
- [design] `VerifiedSources` / `SourcesFooter` citation links: new tab or not. **Two occurrences**,
  carried forward unchanged both times. This is a decision, not work — make it.
- [design] `prefers-reduced-motion` does not defeat the card lift. `global.css:774` kills the
  *transition* globally, so a `translateY(-2px)` still happens, instantly. Only `.reslink` has a real
  `transform:none` guard. **Two occurrences.**

**Recorded once — do not build yet:**
- [design] `Note.astro:11-22` still renders a bare `<p>` with its MDX contract in a header comment.
  This is mistakes-log **#12's exact shape, still live**, and the fix is stated to be one character.
- [design] The 28px gutter has no token and is hardcoded **11 times** in `global.css` (`global.css:395`
  says outright "there is no token for it"). The review that filed it counted two, so the real figure
  is five times worse than recorded.
- [build] Re-run Stage 7 for `white-card-wa` and disposition the three mandated audits in
  `07-verification.md`. This is the new standing FAIL. Skipping them is allowed; skipping them silently
  is what the check now catches.
- [build] Drop the `becomeSteps: []` stubs from `white-card-tas.mdx:102` and `white-card-wa.mdx:128`
  now the field is optional. `src/content/**` is build-owned, which is why the schema half shipped here
  and the content half did not.
- [build] `dist/` carries FPO image placeholders on **11 built pages**, including indexable
  `act-owner-builder-course`, `tas-owner-builder-course` and `owner-builder-courses`. Second sighting.
- [build] "Enrol now" is banned by name in `verification.md` §1f and `SKILL.md`, and is live on
  `act-owner-builder-course.mdx` (×4) and both NSW variants. A rule enforced only by a Stage-7 audit is
  a rule pages ship without — but this is its first occurrence as a *guardrail* candidate, so record it.
- [skills] `metrics.turns_to_passed_audit` is in `_TEMPLATE.md` and computed by `review-trends`, and
  **no review has ever filled it** — the direction line has read "not enough data" for six runs. A
  recorded field with no writer fails the same test as one with no reader. Fill it or retire it.
- [skills] `data/health-log.jsonl` lines are **out of timestamp order** and carry near-duplicates nine
  seconds apart that `health-log-dedupe` did not collapse. `system-health`'s own header specifies
  timestamp order. Either the dedupe window or the ordering assumption is wrong.
- [skills] `public/robots.txt` has no `Disallow` for `/course/` and `/program/`, both of which
  `check-links` reports as same-origin LearnWorlds paths.
- [skills] Ten of twelve archetype files carry **no date at all**, so the newest and most-routed layer
  of the skill is invisible to every freshness cadence.
- [skills] `seo-content-reference.md` (426 lines) is ~80% declared mirror of three files that own their
  numbers. It still has live inbound references, so it was not deleted this session; decide whether it
  becomes a pure index.
- [skills] The SEO freshness audit is **64 days** overdue against a 60-day trigger; full-audit
  recommendation due **24 Aug 2026**. Refresh `expert-fallback/` in the same pass (same 26 May vintage;
  the two expert files are dated 20 April).
- [facts] `kb/register/demand-and-revenue-snapshot.md` names `data/GSC/` twice. The exports moved to
  `business data/GSC/` around 28 Jul; every other live pointer was corrected this session, but
  `kb/register/**` is facts-owned. Path only — no figure in that file is in question.
- [facts] `kb/register/online-delivery-policy-by-state.md:23` says "WA residents"; the WA test is
  reportedly about being *located in WA at the time of assessment*. **Not verified by this audit** — a
  facts session must read the source.
- [facts] `kb/register/competitor-pricing-snapshot.md` §2, WA row, classes ABE's WA product as commodity
  self-paced despite a live trainer assessment. **Not verified by this audit.**

## Output
- [x] **Fix applied** — governance-doc drift corrected; three routing/reference holes closed; five
  mechanisms shipped; one orphan anchored; one dead doc deleted.
- [x] **Memory written** — `feedback_set_scoped_tools.md` added and `MEMORY.md` indexed; the recurring
  lesson is that a tool scoped to a set must be tested against the whole set.
- [x] **Skill-change spec for the improvement pass** — not needed as a separate artefact: the skill
  changes were made directly (this is a skills session, which owns them), and each is listed above with
  its before/after value.
- [x] **`kb/mistakes-log.md` entry added or incremented** — row 1 incremented to **10** with this
  audit as the tenth sighting; row 24 added for the set-scoped-tool class.

## Grader note

`graded_by: self`, and it should be read as weaker evidence. No fresh-subagent grader exists for a
skills session, and there is a specific reason to discount this one beyond the usual: the audit that
produced these findings and the review grading them are the same work. The three findings sweeps *were*
independent subagents given only the repo, which is where the evidence comes from; the grading of it is
not. The measured before/after values in the table above are reproducible by running the commands in
either column, which is the part that does not depend on my judgement — check those rather than the
verdict.
