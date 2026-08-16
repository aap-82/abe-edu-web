# Evaluations — `abe-course-page-astro`

## Contents
- What these are, and what they are not
- Why each one exists (the failure it is derived from)
- How to run one
- The five evaluations
- Adding a sixth

## What these are, and what they are not

Five scenarios that test whether this skill prevents the failures it was written to prevent.

**Every one is derived from a defect that actually shipped or nearly shipped in this repo**, with the
`kb/mistakes-log.md` row or the dated review that recorded it. None is hypothetical. That is
deliberate: the authoring guidance is to identify real gaps first and write instructions against
them, rather than anticipate requirements that never materialise.

**There is no built-in runner.** Anthropic's Skills guidance ships this JSON shape without an
execution harness, so these are run by hand or by whatever harness you bring. The value is not
automation — it is that the pass conditions are written down before the next run, so "the skill
worked" becomes a measurement rather than an impression.

**These files are never read during a page-building run.** They are for a `skills` session auditing
the skill, the same standing as `references/seo/changelog.md`. Nothing in the pipeline opens them.

## Why each one exists

| Eval | Failure it is derived from | Recorded in |
|---|---|---|
| `01-asqa-authority-model.json` | An ABE person credited as developer of an RTO-developed accredited course, in copy and JSON-LD | mistakes-log row 16 |
| `02-unverified-regulatory-fact.json` | "Below that threshold, no approval is required" — an exemption invented from a requirement | ROADMAP 12 Aug; handover 2026-08-12 |
| `03-archetype-selection.json` | Every page shaped like the QLD owner builder page; `/project-advisory` fitting no archetype | SKILL.md Stage 3a; 10 Aug review |
| `04-answer-capsule-shape.json` | A capsule answering a question its own heading did not ask | mistakes-log row 20 |
| `05-stage7-same-commit.json` | Content committed without its `07-verification.md`, four times in one day, twice reaching `main` | mistakes-log row 19 (6 sightings) |

## How to run one

1. Start a session with the skill available and **nothing else from this repo pre-loaded** — the
   point is to test the skill, not the operator's memory.
2. Give the `query` verbatim. Supply any `files`.
3. Score each `expected_behavior` line as met / not met. **A line that is partly met is not met** —
   these are written so that a partial pass is the interesting result.
4. Record failures with the specific output, not a summary. A failing eval is the input to the next
   revision of the skill, and "it seemed vague" cannot be acted on.

**Baseline matters.** Before changing the skill in response to a failure, check whether the failure
reproduces without the skill loaded. If it does not, the skill is causing it rather than missing it.

## Adding a sixth

Only add one that a real defect earned. The test: name the commit, review or mistakes-log row that
records the failure. If you cannot, you are anticipating rather than measuring, and the guidance this
skill is audited against says not to.
