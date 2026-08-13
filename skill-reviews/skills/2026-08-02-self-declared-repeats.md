---
date: 2026-08-02
skill: skills-session
subject: self-declared-repeats
verdict: Green
graded_by: self
---

# Skills review — a repeat the filing session already counted, 2026-08-02

Self-graded: there is no fresh-subagent skills grader yet (CLAUDE.md session-types rule 10).

## Verdict

**Green.** `demand-split` reported **0 triggers on every destination** while the SiteHeader ownership
complaint had been filed three times and its second filing opened with the literal words "SECOND
SIGHTING". It now reports 9 fired triggers across the four destinations, including that one, with no
review re-worded to make it fire. Three false positives were found during the work and eliminated
before shipping, and the recall they cost is surfaced as questions rather than dropped.

Green rather than Amber because the DoD was met in the strict order it was set: the check fires on a
known instance **before** the source items were touched, so nothing was tuned to its own answer.

## What the item asked for, and where it was wrong

To-do item 11 said "cap what a review may file" and that "ROADMAP rule 3 is currently unenforceable
mechanically". Both were checked against the code first, and both are wrong.

**Capping is the wrong fix.** The largest single review filed 9 items; the median is 3. Capping saves
almost nothing, and it suppresses evidence at the source, which CLAUDE.md rule 2 exists to preserve.
The 95 skills items are ten days of accumulation — 14 still open from 23 Jul, 25 from 30 Jul — not
any one review being verbose. Not built.

**Rule 3 was never unenforceable.** `demand-split.mjs:292` computes triggers live, and the near-miss
logic deliberately surfaces-without-promoting, with a written rationale at `:317-322`: guessing at the
exact gate is where guessing is most expensive. That is a design decision, not a gap, and it was left
intact. The real defect was narrower and worse: the tool could not see a count a human had already
written down in plain English.

## What shipped

**`scripts/demand-split.mjs`** — a filing that states its own recurrence is taken at its word.

- `declarationIn()` matches ordinal + `sighting|occurrence|filing|instance`, plus `filed|seen|raised|
  reported|hit` + `again|twice`. `time` is deliberately not a matched noun: "the second time the page
  shipped" is about the page, not the filing.
- `selfDeclaredCount()` applies it to the first **200 characters** only.
- A cluster holding a self-declared item is promoted whole, because its other members are the
  occasions being counted. A self-declared item with no cluster fires alone.
- `bodyDeclaredCount()` finds the same phrases below the lead and prints them under a new heading,
  *Declared a repeat further down the item — confirm or reject*. Not counted, not grouped.

**`CLAUDE.md` §Demand-list format** — two filing rules: lead with the identifier in backticks, and put
a repeat in the opening line. **The four worked examples were rewritten to obey both.** They
previously demonstrated neither, and a worked example that contradicts the rule beside it is how 21
banned CTAs shipped in July — the rule is not the thing that gets copied.

## Measured, before and after

Like for like: the same 41-review corpus, before and after, with **no source review edited** — the
point of the DoD was that the trigger fires on the corpus as it stood, not on one tuned to produce it.

| Destination | Triggers before | Triggers after | Body-declared questions | Clusters left as maybes |
|---|---|---|---|---|
| skills | 0 | **8** | 9 | 4 |
| design | 0 | 0 | 2 | 1 |
| facts | 0 | 0 | 0 | 0 |
| build | 0 | **1** | 0 | 1 |

Filing this review makes it 42 and moves the numbers again — skills to 10 promoted and 100 open,
design to 45 — because two of its own items joined existing clusters. That is the identifier rule
working rather than noise, and it is recorded here so the table above is not read as the current
state. It is the measurement of the change, not of the backlog.

The target case, verified in output before any re-wording:

```
- **Self-declared repeat — `siteheader.astro`**
  - declared 2x by the filing session; 2 related item(s) grouped here
    - **SECOND SIGHTING — a build session must edit design-owned `SiteHeader.astro` ...** (2026-08-01)
    - **Session types: a build session must edit design-owned `SiteHeader.astro` ...**    (2026-07-28)
```

`--strict` exits 0, unrouted stays 0 (167 tagged items), all four reports generate, build green at
21/21 guardrails, `system-health` 0 failing.

## The three false positives, and why the window is a window

Matching the whole item promoted three things that were not repeats. All three sat **below** the lead:

1. `"...the stranded-work row rather than a fourth instance of it"` — a **negation**. The tool
   reported "declared 4x" from the one sentence in the corpus explicitly declaring it was not.
2. `"the same shape as mistakes-log #1's 4th sighting"` — counting a **different** thing.
3. `"A second null line was found..."` — counting lines of data, not filings.

A 200-character lead window removed all three. A negation blacklist was considered and rejected:
"rather than", "not a", "no longer", "instead of" is an open set, and the next phrasing to slip
through would do so silently.

The window costs recall, and the cost was measured rather than assumed. `demand-split`'s own
header-count item declares "as the second sighting" in its final clause, and its 30 Jul twin does not
cluster with it — so under a lead-only rule it would have been invisible to both mechanisms at once.
That is what the new questions section is for. The placement follows the rule this file already
argued at `:321`: an unseen repeat is worse than a flagged one, because the first is invisible and the
second is a question. *Trigger met* asserts and gets acted on, so it takes only high-confidence
matches; everything else goes with the other questions. 11 items are surfaced there that nothing
surfaced before.

## What this does not fix

The 95 remains 95. This session made recurrence **visible**, not smaller. Nothing ages out, nothing is
re-validated, and a 23 Jul item still sits beside today's with equal weight. Three of the four options
put to Andrey were left unbuilt by choice, and the staleness one is the one this review would file
again.

## Demand list

Tag every item: [skills] | [design] | [facts] | [build]

- ~~[skills] THIRD SIGHTING — `SiteHeader.astro` ownership is a fired trigger and is still unactioned.
  A build session must edit a design-owned file to ship any page. Rule 3 authorises restructuring:
  either split the nav data out of the component so build owns its own entries, or assign nav-data
  edits to build while design keeps markup and CSS. This is now the oldest fired trigger in the repo.~~
  Fixed 4 Aug 2026 — the first option, exactly: see
  `skill-reviews/skills/2026-08-04-siteheader-nav-split.md`.
- ~~[skills] `demand-split.mjs` has no staleness signal. Open items carry no age and nothing re-validates
  them, so 14 items from 23 Jul rank equally with today's. Report age, and flag items whose named file
  has changed since filing as candidates for re-checking or closing.~~ built 14 Aug 2026, and the
  cost of it having stayed open for twelve days is measurable: a facts session that same morning was
  sent at a `/white-card-tas` compliance risk that had been closed eleven days earlier, because five
  of twelve items in the derived handover were already done and unstruck. The check does what this
  item asked, and reports its own coverage: **86 items name a resolvable file and are checked, 132
  name none and cannot be**, so a clean run is never read as "nothing is stale". It found this item
  on its first run.
- [skills] `skill-reviews/build/` does not exist, so a build session correcting an existing page has
  nowhere to file a finding: `kb/mistakes-log.md` is skills-owned and a flat review would falsely
  satisfy `system-health.mjs:177`'s page-coverage check. Verified 2 Aug: `demand-split.mjs:226` walks
  recursively so items would route, and `:177` reads flat so coverage would stay honest.
- ~~[skills] THIRD FILING — `demand-split.mjs` counts its header halves in different units. `openCount`
  is deduped by key, `closedCount` is raw struck lines. Filed 30 Jul, again 1 Aug, recorded here as
  the third. The 1 Aug filing put its own declaration in its closing clause, where the new lead
  window cannot count it, so it is also the worked example of the recall gap above.~~ fixed 4 Aug 2026,
  commit `92f6571`/`f26d159` — see `skill-reviews/skills/2026-08-04-demand-split-header-units.md`.
- [skills] `demand-split.mjs`'s lead window cannot tell a declaration from a **description** of one.
  This review's own first draft opened an item with "...the 1 Aug filing declares itself a second
  sighting", inside the first 200 characters, and it promoted as though this session had declared it —
  right answer, wrong reason. Reworded rather than left as a demonstration. A reported-speech guard
  ("declares itself", "says it is", "calls it") would catch the shape, but it is the same open set the
  negation blacklist was rejected for, so it needs a second occurrence before it earns a rule.
- [design] `.cmp-soon` renders the only content in an inactive comparison column at 2.81:1. Permitted
  under `global.css:8-11` and WCAG 1.4.3, and verified correct on 2 Aug — recorded here so the next
  session to measure it does not re-open a closed question.
