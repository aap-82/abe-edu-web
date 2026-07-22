# Handover — Phase 2: the evidence run

For Claude Code in `C:\dev\abe-web` on `main`. Self-contained. This is a long session — plan for it.

Read `ROADMAP.md` first if it is in the repo.

---

## What this is, and why it is different from every previous handover

Every handover so far has been a task list. **This one is an experiment.**

Phase 1 put a content pipeline in the repo: ten archetypes, seven-field section briefs, a writing
craft standard, an independent grader, four check scripts. None of it has ever built a page. It is
all designed and unexercised, which means some of it is right and some of it is a guess, and nobody
knows which parts are which.

Phase 2 finds out by building **one** page end to end, exactly as specified, and recording what hurt.

**The page is not the deliverable. The Stage-9 review is.** Specifically its demand list — what was
painful, what flooded context, what wanted isolating, what failed silently. That list is the
specification for phase 3. Everything phase 3 might build (skill splits, subagents, hooks,
token-lint, archetype-aware guardrails) is currently a guess, and stays unbuilt until this run
produces evidence for it.

### The one instruction that matters most

**Run the process as specified, not as improved.**

If a stage feels wrong, redundant, or badly ordered — complete it as written, then record that
judgement in the demand list. Do not silently fix the process while running it. A run that quietly
improves the pipeline as it goes produces a good page and no evidence, which is the one outcome that
makes this session worthless.

The same applies to shortcuts. If Stage 3 wants seven fields per section and that feels like
overkill for a short page, write the seven fields anyway and say it felt like overkill.

---

## Before you start

Work on a new branch. **Do not deploy.** Stage 8 is a human gate; you build and verify, Andrey
deploys.

### Preliminary — make `system-health` keep a history

`system-health.mjs` prints its scorecard and forgets it. That is fine for a single check and useless
for a trend: nothing can show whether the system is getting healthier over weeks, because no run
leaves a trace. A dashboard is planned once there are real runs to display, and it will need history
that starts before phase 2 rather than after it.

Add append-only logging to `scripts/system-health.mjs`. After the scorecard prints, append **one
line** of JSON to `data/health-log.jsonl`:

```json
{"ts":"2026-07-22T04:14:58Z","fail":0,"warn":8,"ok":3,
 "register":{"current":14,"total":15,"partial":0,"recheckDue":0,"noDate":1},
 "skillRefs":{"resolve":59,"total":59},
 "claims":{"verified":6,"total":6},
 "figures":{"matched":150,"total":158,"excluded":89},
 "totals":{"reconcile":6,"checked":6},
 "reviews":{"graded":0,"pages":7},
 "mistakes":{"active":3,"hot":1}}
```

Rules for it:

- **Append only.** Never rewrite or truncate the file. One JSON object per line, no trailing commas,
  no pretty-printing — the format has to stay trivially parseable and merge-friendly.
- **Never let logging break the check.** Wrap the write so a failure prints a warning and the script
  still exits normally. A health check that dies because it could not write its own log is worse than
  one that does not log.
- **Derive the numbers from what the script already computed** — do not re-run the sub-checks to
  populate the record.
- **Commit the file.** The history is the point, and it is worthless if it only exists on one machine.
  It is append-only and line-based, so a merge conflict resolves by keeping both lines in timestamp
  order. Say so in a comment at the top of the script.
- If a field cannot be determined on a given run (a sub-check was skipped, a file was missing), write
  `null` for it rather than omitting the key or guessing a zero. A zero and an unknown must not look
  the same later.

Then run it twice and confirm two lines land, with the second reflecting any change.

### Baseline

```powershell
node scripts/system-health.mjs
```

Expect 0 FAIL. If anything fails, fix it or stop and report — the run's own audit depends on these
checks being trustworthy. Note the warning count so you can compare afterwards; this baseline line in
`health-log.jsonl` is the "before" for the whole of phase 2.

---

## The page

**`/cpd-building-tas`** — a CPD compliance course for Tasmanian building practitioners.

Chosen because CBOS Tasmania is the best-understood regulator in the register, its fees were verified
on 22 July 2026, and there is an existing hand-built `/cpd-tas.astro` to compare against — so "is
this better than what we had" is answerable rather than a matter of taste.

### What this page exercises for the first time

| Thing | Status before this run |
|---|---|
| Archetype 3 (CPD compliance) | Written, never used to build anything |
| The `cpd:` object in `content.config.ts` | Wired up, currently unused |
| Patch 01's `placement` field (after-hero / after-body) | Applied, never exercised on a real page |
| Seven-field section briefs | Specified, never written for a real page |
| The independent Stage-9 grader | Never graded a run |

Existing CPD pages (`/cpd.astro`, `/cpd-tas.astro`) are hand-built on `BaseLayout`, not
`CourseLayout`, and are **not** collection entries. Do not modify them in this session. If the new
page makes one of them redundant, note it and move on — consolidating CPD routing is separate work.

---

## The run

Follow the skill's nine stages. Notes on the ones with traps:

**Stage 0 — pre-flight.** Already done above.

**Stage 1 — government research.** CBOS Tasmania CPD requirements. Start at
`kb/content-source-map.md`, then `kb/register/cbos-tas-reference.md`. The register is the first
stop, live `.gov.au` only for what it does not cover. **The unknowns gate is real**: CPD points,
course price, pass mark, attempts, module list, completion time and reviewer are internal facts that
cannot be researched. Ask for them — closed questions via the interactive tool, open ones in prose.
Do not invent a plausible value and do not proceed past this stage with a `[confirm:]` on an internal
fact.

**Stage 2 — competitor and keyword gap.** GSC exports are in `data/gsc/`. Check cannibalisation
against the existing `/cpd-tas` and `/cpd` routes — this is a CPD hierarchy, and archetype 6 has the
anti-cannibalisation table.

**Stage 3 — archetype and section briefs.** Archetype 3. Seven fields per section, every section,
before any copy. This is the stage most likely to feel like overhead; write it fully and record the
judgement.

**Stage 4 — write.** `content-craft.md` plus archetype 3's worked copy in its section 8. The delete
test applies to every paragraph.

**Stage 5 — build.** A `courses` collection entry, `authorityModel: state-approved-direct`, using the
`cpd:` object. This is its first use — if the schema does not fit the content, **that is a finding**:
record exactly what did not fit rather than working around it silently. Zod is 4.4.3, so nested empty
defaults need `.prefault({})` not `.default({})`.

**Stage 6 — guardrails.** `npm run build`. Never weaken a guardrail to pass.

**Stage 7 — pre-deploy audit.** `abe-readability-audit`, `final-check`, `ai-detector`, plus
`node scripts/check-claims.mjs`. A failure sends the run back to Stage 4, not onward. Record every
round trip — the number of them is one of the three trend metrics.

**Stage 8 — deploy.** **Stop here.** Build and verify only. Report that the page is ready; Andrey
triggers the deploy. Fill in the outcome-target block (primary keyword, target, review dates) so it
is ready to file at deploy time.

**Stage 9 — the review.** See below. This is the actual deliverable.

---

## Stage 9 — the independent grader

**A fresh subagent grades this run. Not you.**

Launch a subagent with no context from the run. Give it only:
- the path `pipeline/cpd-building-tas/` (all stage artefacts)
- the built page output
- the Stage 7 audit output
- `skill-reviews/_TEMPLATE.md`

It grades what was produced, not what was intended — which is why it must not be the agent that
formed the intentions. Keep the template's frontmatter block intact; `scripts/review-trends.mjs`
parses it, and hand-edited keys drop the review silently out of the trend report.

If subagents are unavailable, you may self-grade — but you must set `graded_by: self` and explain
why in the Grader note section. A self-graded run is weaker evidence and the trend report marks it
as such. Do not quietly grade yourself and record it as independent.

### The demand list is the point

Under the demand-list heading, record concretely:
- Which files were too large to hold comfortably in context
- Where verbose tool output flooded the window
- Which steps you wanted to run in isolation and could not
- Which checks failed silently, or should have caught something and did not
- Anything you wanted to look up and could not find a path to
- Anything in the process that felt wrong, in your judgement, even if you followed it

Be specific. "Stage 2 was hard" is useless. "The SEO reference set is 18 files and I read 6 of them
looking for the schema rule, which is in `schema-implementation-guide.md`" is a phase-3 specification.

---

## Acceptance

- The page builds; guardrails pass; the Stage 7 audit passes
- Every stage left its artefact in `pipeline/cpd-building-tas/`
- A Stage-9 review exists in `skill-reviews/`, with an intact frontmatter block and a populated
  demand list
- `node scripts/system-health.mjs` shows the page in review coverage
- `node scripts/review-trends.mjs` parses the new review without error
- `data/health-log.jsonl` has at least two lines — the baseline taken before the run, and one after —
  and both parse as JSON
- The page is **not** deployed

## Constraints

- Run the process as specified. Record friction; do not fix it mid-run.
- Never default a regulatory fact. Verify it, or mark it UNVERIFIED and leave it visible.
- Never weaken a guardrail or a check to make something pass.
- `kb/register/` is the single owner of every government figure.
- Production deploys are human-triggered. You stop at Stage 8.
- Australian English. No em dashes in body copy. Never "comprehensive". ABE is not an RTO —
  Tasmanian CPD delivery runs under the state-approved-direct model, so do not attribute an RTO
  number to ABE anywhere on this page.
- Do not commit or push without asking.

## Report back

1. The page: route, archetype, what it covers.
2. Any internal facts you had to ask for, and any that are still open.
3. **The demand list, in full** — this is the most important part of your report.
4. The Stage-9 verdict and its five scores, and whether it was independently graded.
5. Number of Stage 7 → Stage 4 round trips.
6. Anything about the `cpd:` object or archetype 3 that did not fit the content.
7. Final output of `system-health` and `review-trends`, plus the before and after lines from
   `data/health-log.jsonl`.
8. Your comparison against the existing hand-built `/cpd-tas` page — better, worse, or different, and
   in what respect.
