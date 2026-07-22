# ROADMAP — where this system is, and what comes next

For Claude Code. Read this before starting any phase work. It is the orientation document: it says
what is already true, what is being worked on now, and — importantly — what must **not** be built
yet and why.

Last updated: 22 July 2026.

---

## How to use this file

- **Before starting work**, read the Current state section and run `node scripts/system-health.mjs`.
  If the two disagree, the script is right and this file is stale — say so.
- **Do not build ahead of the current phase.** Each phase is gated on evidence from the one before.
  Phase 3 in particular is a list of *candidates*, not a plan. Building a candidate before the
  evidence asks for it is the specific failure this sequencing exists to prevent.
- **At the end of a phase**, update the Current state section and mark the phase done. A roadmap that
  describes an earlier version of the repo is worse than none.

---

## Current state (22 July 2026)

- **Phase 1 is complete and merged to `main`.** The pipeline lives in the repo: `kb/` owns the
  regulatory register and authority rules, the skill is in `.claude/skills/abe-course-page-astro/`,
  four check scripts are in `scripts/`, and `skill-reviews/` has its template.
- **All FY26-27 government fees are verified** (22 July 2026). One caveat: WA rests on confirmation
  rather than a published 2026-27 source label — LGIRS has not republished its schedule. See the WA
  row in `kb/register/state-fees-register.md`.
- **The superseded claude.ai skills are uninstalled** (`abe-seo-content-engine`,
  `abe-research-to-webpage`, `seo-content-2026`). The repo is the only home.
- **Health**: 0 FAIL, skill references resolve, code claims verified, 17 pages build with guardrails
  green.
- **No page has yet been built through the pipeline.** Everything in the skill — the archetypes, the
  section briefs, the craft method, the independent grader — is designed but unexercised.

### Outstanding right now (before phase 2)

**Nothing blocks phase 2. The gate is clear.** Handovers now live in `handover/`.

**One standing product blocker, parallel to the phases — ⛔ NSW Owner Builder is on hold.**
Confirmed by Andrey 22 July 2026: the Upskill Institute partnership intended for that course is
still in negotiation and temporarily on hold, so ABE has no delivering RTO for it. Separately,
none of the five units NSW requires is on RTO 45708's scope, so closing the deal is necessary
but not sufficient. `src/content/courses/owner-builder-nsw-course.mdx` and its `-w` variant
still carry the full nationally-recognised claim; both are pre-cutover and noindexed, and
**neither may ship at cutover in its current form.** The reference set was walked back on 22 July
so a pipeline run cannot read the partnership as settled. **NSW White Card is unaffected and
remains live** — that partnership is in force and CPCWHS1001 *is* on 45708's scope, so the White
Card wave is not gated by this. Canonical status: `kb/rules/authority-model.md` → "NSW Owner
Builder".

The post-merge fixes landed in PR #29 (merged 22 July): the TAS course price was wrong at $185 and
is now $195, `check-claims` went from ~93 warnings to 8, derived totals reconcile and FAIL on
mismatch, and the register hygiene is done. The small-fixes pass then took `check-claims` to **0
warnings** by giving every remaining figure an owner — bundle offers reconcile, and the WA $50,000
Class 10a threshold is verified rather than published unsourced.

That gate existed because stage 7 of a run calls `check-claims`, and an acceptance test whose own
audit is unreliable proves nothing. The audit is now trustworthy, so phase 2 can start.
See `handover/HANDOVER-phase-2.md`; its preliminary (append-only health history) is done and the
baseline line is in `data/health-log.jsonl`.

---

## Phase 1 — the library ✅ done

Moved the pipeline into the repo and made facts single-owner.

Delivered: `kb/register/` (15 files) and `kb/rules/` (3), `kb/content-source-map.md` as the index,
`kb/mistakes-log.md`, `CLAUDE.md` constants, `data/gsc/`, the reworked skill with 12 archetypes and
the craft method, `skill-reviews/_TEMPLATE.md`, and four scripts — `check-freshness`, `check-claims`,
`review-trends`, `system-health`.

---

## Phase 2 — the evidence run ⬅ next

**Build one CPD course page end to end through the skill.** Recommended: `/cpd-building-tas` — CBOS
Tasmania is the best-understood regulator, its fees are verified, and an existing hand-built
`/cpd-tas.astro` gives a comparison baseline.

**Gate:** the post-merge fixes above must be done first.

**What it exercises for the first time:**
- Archetype 3 (CPD compliance) — written, never used
- The `cpd:` object in `content.config.ts` — wired, currently unused; today's `/cpd.astro` and
  `/cpd-tas.astro` are hand-built on `BaseLayout`
- Patch 01's `placement` field (after-hero / after-body)
- The seven-field section brief discipline
- The independent Stage-9 grader

**Run it as specified, not as improved.** If a stage feels wrong, complete it and record that in the
demand list. Silently improving the process destroys the evidence the run exists to produce.

**Acceptance:**
- The page builds, guardrails pass, stage 7 audit passes
- Every stage left its artefact in `pipeline/cpd-building-tas/`
- A Stage-9 review exists in `skill-reviews/`, graded by a **fresh subagent** reading only the
  artefacts and built output — not the agent that did the run
- `node scripts/system-health.mjs` reports review coverage including this page

**The real output is the demand list.** Stage 9 records what was painful: files too large to hold,
context flooded by verbose output, steps that wanted isolation, checks that failed silently. That
list is the specification for phase 3. Without it, phase 3 has no basis.

---

## Phase 3 — structure on demand 🔒 blocked on phase 2's demand list

**Nothing in this section may be built until the demand list names it.** These are candidates
identified in design, not commitments. Each has a trigger.

| Candidate | Build only if the demand list shows |
|---|---|
| Splitting the skill into smaller skills | A file was too large to hold in context, or a description misfired |
| `fact-verifier` subagent | Fact verification flooded the main context or wanted isolation |
| `keyword-analyst` subagent | Keyword and SERP work flooded the main context |
| `page-auditor` subagent | The audit wanted its own context, or graded inconsistently |
| Hooks (legal-page edit block, register date validation) | A rule was violated that a hook would have caught |
| `token-lint` | The run created a component, or hardcoded a colour or spacing value |
| Archetype-aware guardrails + collections for archetypes 7-10 | A non-course page is needed next |
| Event-driven pre-flight verification in Stage 1 | Freshness was checked too late, or not at all |

**The usability split has its own trigger.** Layout knowledge lives in three places
(`component-selection.md`, `abe-readability-audit`, the design register). If a run had to read all
three to answer one layout question, record it. On the **second** occurrence, merge them.

---

## Phase 4 — outcomes and distribution 🔒 after phase 3

- **Outcome reviews acted on.** `review-trends` already surfaces 4- and 12-week review dates when
  they fall due. Phase 4 is running the rank-and-traffic check against each page's outcome-target
  block and filing the result.
- **The improvement pass.** Every fifth skill review, read the accumulated reviews and
  `kb/mistakes-log.md`, and propose skill edits as a git diff. **Propose only — a human merges.** It
  may never edit `guardrails.ts`, the hooks, or the human-gates section of `CLAUDE.md`.
- **`.skill` bundle packaging** from the repo for claude.ai, with register files carrying explicit
  expiry lines so a stale bundle cannot state a figure past its date.

---

## Standing rules — all phases

- **Never default a regulatory fact.** Verify it at the official source, or mark it UNVERIFIED and
  leave it visible. A plausible figure is worse than a visible gap.
- **`kb/register/` is the single owner of every government figure.** A second copy anywhere is a bug.
- **Never weaken a guardrail or a check to make something pass.** Fix the content or the data.
- **Production deploys are human-triggered, always.** No agent, hook or workflow deploys production.
- **Data with no reader quietly stops being true.** Every new field or assertion gets a reader — or a
  `CLAIMS` entry in `check-claims.mjs` — in the same change that creates it.
- **Ask, don't assume.** Material forks and unknown internal facts go to the person: closed questions
  via the interactive tool, open ones in prose. Subagents cannot ask — they stop and report upward.
- **ABE is not an RTO.** Australian English. No em dashes in body copy. Never "comprehensive".

---

## Why the phases are ordered this way

An earlier draft of this plan built all the structure first — skills split, subagents wired, hooks
installed — and built a page last. That repeated the mistake that produced every wrong assumption in
the rework: designing from descriptions rather than contact with reality. Guardrail behaviour, the
CPD model and the layout system were each described one way in documentation and worked another, and
each was corrected only when someone read the code.

So the order is: build the foundation, build one real page, then build only the structure that page
proves is missing. Phases 3 and 4 shrink to whatever phase 2 demands. If phase 2 shows the skill
works as one file with no subagents, that is a successful result, not a failure to build things.
