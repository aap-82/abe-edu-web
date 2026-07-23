# ABE Content System — Architecture

Verified against code.claude.com/docs (July 2026). Australian English. Describes the system as
built and delivered on 21 July 2026, and the order in which the remaining phases land.

## 1 · The system

A repo-first content pipeline for abeeducation.edu.au. The Astro repo (`C:\dev\abe-web`, deployed
to Cloudflare Workers) is the single home: the skill that runs the pipeline, the fact library it
draws on, the checks that police it, and the reviews that improve it all live in the repo as plain
files under version control. Claude Code is the working surface; claude.ai remains usable through
`.skill` bundles generated *from* the repo. Facts exist once, every reference is a path, and every
recorded field has a reader.

What it does, end to end:

- **Verifies regulatory facts** against official `.gov.au` sources and stores each exactly once in
  `kb/register/`, dated, with a re-verification cadence per file (fees reset each 1 July).
- **Researches each page**: government source map and fact ledger, competitor and keyword gap
  (GSC exports in `data/GSC/`, Ubersuggest), so copy is built from demand, not habit.
- **Selects the page shape** from ten archetypes — state-approval course, nationally recognised
  course, CPD, CPD bundle, expert profile, hub, info guide, blog post, insurance type, about — each
  with its reader model, decision order, required sections, forbidden carry-overs and worked copy.
- **Briefs every section** in seven fields (claim, reader state, objection, facts with provenance,
  distinctive material, carrier, fails-if) before a word of copy is written.
- **Writes to a craft standard**: translate facts rather than restate them, spend the distinctive
  research, name the objection, pass the delete test.
- **Builds the page in Astro** from the component library and design tokens, with schema, meta,
  alt text and crawl controls applied per archetype; new components allowed via the SG_PENDING
  draft path.
- **Enforces correctness at build** through `guardrails.ts`: single H1, required JSON-LD nodes,
  price parity, MDX hygiene, styleguide specimens, hub bijection, orphan detection.
- **Checks the system, not just the page**: register freshness (`check-freshness`), doc-vs-code
  claim drift and page-figure-vs-register contradictions (`check-claims`), trend direction and
  outcome reviews due (`review-trends`), and a one-command aggregate (`system-health`) covering
  all of it plus dangling references and review coverage.
- **Deploys to Cloudflare Workers on a human trigger only** — no agent or hook ever deploys
  production.
- **Grades every run independently**: a fresh subagent scores the run from its `pipeline/{slug}/`
  artefacts and built output, files a machine-readable Stage-9 review, and a red on correct-and-safe
  vetoes the run.
- **Learns**: repeat risks in `kb/mistakes-log.md` (archived after ten clean runs), trends computed
  across reviews, 4- and 12-week rank checks against each page's outcome targets, and an
  improvement pass that proposes skill edits as diffs — propose-only, guardrails out of scope.
- **Asks rather than assumes**: material forks and unknown internal facts go to the person (closed
  questions via the interactive widget, open ones in prose); regulatory facts are never defaulted —
  verified or marked UNVERIFIED.

The nine functions underneath, and where each lives as built:

| # | Function | Nature | Lives now |
|---|---|---|---|
| F1 | Verified regulatory register (fees, eligibility, legislation, per state, on cadence) | **Data** | `kb/register/` — single owner |
| F2 | Research: gov source map, fact ledger, competitor gap, GSC + Ubersuggest demand | Know-how | skill stages 1-2 |
| F3 | Page shape: archetypes, decision orders, section briefs | Know-how | `references/archetypes/` |
| F4 | Writing craft: fact translation, spending research, voice | Know-how | `references/content-craft.md` |
| F5 | SEO: meta, schema, keywords, cannibalisation, freshness | Know-how | `references/seo/` |
| F6 | Authority model: what ABE may claim, per jurisdiction | **Rules** | `kb/rules/`, enforced by `guardrails.ts` |
| F7 | Build: collections, components, guardrails | Know-how + **code** | the repo itself |
| F8 | Deploy: Cloudflare Workers | Know-how | `references/deploy-cloudflare.md`, human-gated |
| F9 | Verification + learning loop: audits, reviews, trends, mistakes-log | Know-how + process | Stage 9 + `skill-reviews/` + `scripts/` |

The classification is the design: **data and rules (F1, F6) exist exactly once** — a fee in two
places is wrong in one of them after 1 July. Know-how tolerates modularity and lives in the skill.
Code was always in the repo; now everything that describes the code lives beside it.

## 2 · Why repo-first

Skills in `.claude/skills/` are plain folders in git: edited like code, diffed, reviewed, no
packaging, no paste. `kb/` holds F1 and F6 once, and every skill, subagent, hook and the build
itself reference it by path — a shared library without bundling, natively. `guardrails.ts` and the
skills live beside each other, so documentation drift (three corrections' worth in the conversation
that produced this plan) becomes a diff someone sees, and now a check that fails. Claude.ai remains
a first-class surface: a `.skill` package generated from the repo is a build artefact, not a second
source. The alternatives assessed — one consolidated claude.ai skill, or small skills behind an
orchestrator — both left the register without a single owner or left the skills invisible to
version control; repo-first fixes both structurally rather than by discipline.

## 3 · Target architecture

> **Read §8 alongside this.** The evidence run of 23 July 2026 tested several of the structures
> proposed here. Some were confirmed, some were not reached, and one prediction about which
> subagents matter most turned out to be wrong. Nothing below has been edited to match the
> outcome — the predictions stand as written so they can be scored.

```
abe-web/                          (the existing repo — one home)
├── kb/                           SHARED LIBRARY — data + rules, single owner
│   ├── register/                 F1: state-fees, eligibility, legislation-{state},
│   │                                 penalties, online-delivery, regulator-roles,
│   │                                 cbos-tas … (moved OUT of the engine, not copied)
│   ├── rules/authority-model.md  F6: one text, referenced by skills AND by guardrails
│   ├── content-source-map.md     index: fact → file → cadence
│   └── mistakes-log.md           the learning loop's memory
├── .claude/
│   ├── skills/                   KNOW-HOW — five, not fifteen
│   │   ├── abe-pipeline/         thin conductor: stages, checkpoints, entry points,
│   │   │                             stage-9 review; delegates, never duplicates
│   │   ├── abe-research/         F2: source map, fact ledger, competitor/keyword gap
│   │   ├── abe-content/          F3+F4: archetypes, briefs, craft (the largest)
│   │   ├── abe-seo/              F5: meta, schema, freshness, cannibalisation
│   │   └── abe-build-deploy/     F7+F8: collections, components, guardrails, Cloudflare
│   ├── agents/                   CONTEXT ISOLATION — three, each earning its window
│   │   ├── fact-verifier.md      read-only + fetch; re-verifies register entries on
│   │   │                             cadence; verbose gov-page fetching stays out of
│   │   │                             the main context; memory: project
│   │   ├── keyword-analyst.md    Neil Patel MCP scoped via `mcpServers` — the server's
│   │   │                             tool descriptions never load in the main session
│   │   └── page-auditor.md       runs build + audits, returns a summary; memory:
│   │                                 project, accumulating recurring failures
│   ├── agent-memory/             per-agent knowledge, in git (project scope)
│   └── settings.json             hooks (below)
├── pipeline/{slug}/              STAGE ARTEFACTS as files: 01-source-map.md,
│                                     02-gap.md, 03-briefs.md, 04-content.md …
├── src/ …                        the site: collections, components, guardrails.ts
└── scripts/package-skills.mjs    generates .skill bundles for claude.ai from the repo
```

**Why stage artefacts move to files.** Subagents start with fresh context — they never see the
conversation. If the briefs live only in chat, no subagent can audit them. On disk, the pipeline's
state is inspectable, diffable, resumable across sessions, and exactly matches the
artefact-per-stage discipline the skill already follows. The conversation becomes the steering wheel,
not the filing cabinet.

**Why five skills, not fifteen.** Each extra skill adds a description competing for triggering, and
over-fragmentation recreates the cross-reference problem inside Claude Code. Five map cleanly to
"what am I doing right now": researching, shaping/writing, optimising, building, or running the whole
pipeline. The archetype files stay together inside abe-content because they are one decision.

**Hooks — deterministic where discipline failed before:**
- `PreToolUse` on Edit/Write matching `src/content/legal/**` → exit 2. "This skill never drafts legal
  wording" stops being an instruction and becomes physics.
- `PostToolUse` on edits under `kb/register/**` → validate the verified-date format, warn on lapsed
  cadence.
- `SubagentStop` on page-auditor → append its verdict line to the stage-9 review file, so the
  learning loop feeds itself.

**What stays put.** `guardrails.ts` remains the build-time enforcement layer — hooks complement it,
never replace it. The CBOS suite stays separate (different regulator workflow, different lifecycle).
`abe-readability-audit`, `final-check` and `ai-detector` keep working as-is initially; fold later
only if friction appears.

**What retires.** abe-seo-content-engine (contents split into `kb/` and abe-seo),
abe-research-to-webpage (abe-pipeline replaces it), seo-content-2026 (already superseded),
`references/content-model.md` (stale; the repo is the source of truth it failed to be).

## 4 · Claude.ai stays a first-class surface

`scripts/package-skills.mjs` zips a skill folder plus the `kb/` files it declares (a `manifest`
listing paths) into a `.skill`. The copy inside the bundle is a build artefact — regenerate after any
kb change, never edit it. Day-to-day: research and writing can happen in claude.ai with the packaged
abe-content skill; anything touching the repo happens in Claude Code. One source, two surfaces.

## 5 · Migration — evidence-first

The first draft built all the structure before building a single page, which repeats the pattern that
produced every wrong assumption in the rework: designing from descriptions instead of contact with
reality. Re-cut so a real page arrives second, and structure is justified by what that run surfaces.

**Phase 1 — the library.** Create `kb/`; move the register and authority-model out of the engine
(moved, never copied); GSC exports to `data/gsc/`; rewrite `content-source-map.md` as the index;
delete `content-model.md`. Drop the reworked abe-course-page-astro into `.claude/skills/` **as one
skill, unsplit**, with its Stage 1 pointed at the new `kb/` paths. GSC exports land at `data/GSC/`
(uppercase `GSC`, lowercase `data`). Uninstall the superseded skills
from claude.ai Settings (abe-seo-content-engine, abe-research-to-webpage, seo-content-2026) — they
keep triggering in chat until removed, "retire" is not a state, uninstalled is.

**Phase 2 — the evidence run.** Build one W4 CPD course page (e.g. `/cpd-building-tas`) end-to-end in
Claude Code with that one skill: archetype 3, section briefs, worked-copy exemplar, the `cpd:` object
patch 01 enabled, stage artefacts written to `pipeline/{slug}/`, existing human checkpoints kept. The
stage-9 review grades the run **and produces the demand list**: which files were too big, which
context got flooded, which steps wanted isolation, which checks failed silently. That list is the
specification for phase 3.

**Phase 3 — structure on demand.** Split skills only along seams the run exposed; add only the
subagents whose job the run actually performed painfully in main context (fact verification and the
keyword layer are the likely first two); add the hooks (legal-page block, register date validation)
and the archetype-aware guardrail table + token-lint if the run created components or non-course
pages. Verification becomes an event-driven pre-flight in Stage 1 — check register dates, re-verify
only what has lapsed — because Claude Code has no scheduler and cadence enforced by page-building is
cadence enforced when it matters.

**Phase 4 — outcomes and distribution.** The 4- and 12-week review *dates* are already surfaced by
`review-trends.mjs` the day they come due; phase 4 adds the *acting* — the keyword-analyst (or the
skill, if no agent proved necessary) runs the rank-and-traffic check against the run's
outcome-target block and files the result. The improvement
pass triggers on a countable event — every fifth skill-review — reads the reviews plus
`kb/mistakes-log.md`, and proposes skill edits as a git diff. **Propose-only, and guardrail files are
out of its scope**: a self-improvement loop must never edit the rules that constrain it. Packaging
script ships `.skill` bundles from the repo; any register file in a bundle carries an explicit expiry
line and the skill refuses to state a figure past it (a commit stamp makes drift visible; the expiry
makes it safe).

Each phase leaves the system working, and phases 3-4 shrink to whatever phase 2 proves necessary.

## 5a · Human gates (non-negotiable, stated once)

- **Production deploys are human-triggered, always.** No agent, hook or workflow runs
  `wrangler deploy` against production without an explicit go from Andrey in that session.
- **Stage checkpoints survive automation.** The show-output-and-get-a-go-ahead discipline from the
  current process carries into the agentic version at the same points.
- **The improvement pass proposes; a human merges.** And it cannot propose changes to
  `guardrails.ts`, the hooks, or this section.

## 5b · Memory and self-evaluation model

Six layers, each with one writer and a defined reader — memory nobody reads is a write-only log:

| Layer | Holds | Written by | Read by |
|---|---|---|---|
| `CLAUDE.md` | Never-forget constants: not an RTO, voice bans, human gates, kb/ and pipeline/ conventions, effort budget | Andrey (and merged improvement-pass diffs) | Every session and every custom subagent, automatically |
| `kb/mistakes-log.md` | Repeat risks, "times seen" counters | Stage 9 | Every run's pre-flight |
| `skill-reviews/` | Per-run verdict, five scores, trend metrics, outcome targets | The independent grader (below) | The improvement pass |
| `.claude/agent-memory/` | Per-agent learned patterns | Each agent, curating its own MEMORY.md as part of finishing | That agent, next run |
| `pipeline/{slug}/` | Stage artefacts — durable working memory | Each stage | Later stages, the grader, resumed sessions |
| Outcome-target blocks | Deploy-time predictions | Stage 9 | The 4/12-week outcome reviews |

CLAUDE.md is written in phase 1 and earns only rules whose violation is expensive — it is spent
context on every turn. Everything else belongs in skills or kb/.

**Grader independence.** The stage-9 review is filled by a fresh subagent that reads
`pipeline/{slug}/`, the built HTML and the audit output — never by the agent that did the run. It
grades what was produced, not what was intended. The artefacts-as-files design is what makes this
free.

**Trends are computed, not implied.** The improvement pass opens by computing the three trend
metrics across every review since the last pass, so "is the system improving" is a number before it
is an opinion.

**Hygiene.** A mistakes-log entry not seen in ten consecutive runs moves to an archive section,
counter intact, revivable. Agents curate their own MEMORY.md at task end per the platform's limits.
Un-curated memory is noise wearing a seatbelt.

## 5c · The check suite (as built, 21 July 2026)

> **Superseded in part by §8c.** The suite has grown to nine since this was written. The six below
> are all still in force and still accurate; the list is incomplete, not wrong.

Six mechanisms, each answering one question at one moment. Everything below phase 1 already exists
in the bundle and has been run against real inputs.

| Mechanism | Question it answers | When it runs |
|---|---|---|
| `guardrails.ts` | Is this page correct? (H1, JSON-LD, price parity, MDX hygiene, specimens, hub bijection, orphans) | Every build, blocking |
| `scripts/check-freshness.mjs` | Are the register's facts in date? (per-file cadences; `partial: true` reported, never hidden) | `prebuild`, warning; `--strict` for gates |
| `scripts/check-claims.mjs` | Is what the docs say about the build still true, and does every page figure exist in `kb/register/`? (superseded figures FAIL) | With system-health; before doc-sensitive work |
| `scripts/review-trends.mjs` | Is the system improving? (direction on the three metrics, self-graded runs flagged, correct-and-safe vetoes, 4/12-week outcome reviews due) | After filing each Stage-9 review |
| `scripts/system-health.mjs` | Is the whole system in good shape? (aggregates the above + dangling references + review coverage + repeat risks) | Before planning work |
| Stage-9 independent grader | Was this run good? (fresh subagent, artefacts only, never the run's own agent) | End of every gradeable run |

Standing rule: **data with no reader quietly stops being true.** Freshness, trends, outcome dates,
references, and code claims each existed as recorded data before they had a reader; every one had
already drifted when its reader was built. A new field or assertion gets a reader (or a CLAIMS
entry) in the same change that creates it.

Already banked from this suite: the QLD permit fee correction ($477.47 → $493.59, verified 21 July
2026 against QBCC's fees page, with the discrepancy against QBCC's own April 2026 fact sheet on the
record), and four dangling references caught in the bundle itself.

## 6 · Risks, stated plainly

- **Triggering changes.** Claude Code skill discovery differs from claude.ai; the five descriptions
  need tuning against real prompts in phase 2, and the pipeline skill must be pushy enough to catch
  "build me the X page".
- **Subagent blindness.** Agents don't see chat. Mitigated by artefacts-as-files, but every
  delegation prompt must name its input files explicitly.
- **Two-surface drift.** If someone edits a packaged bundle's kb copy, the fork returns. The
  packaging script should stamp bundles with a generated-from commit hash so drift is at least
  visible.
- **Sunk cost.** The INSTALL.md paste process and its confirm-string ritual retire. Nothing else from
  the last fortnight is lost: archetypes, craft, patches and worked copy all move intact.

## 7 · Standing amendments from the requirements assessment

Folded into the phases above where they belong; recorded here so their origin isn't lost:
token-lint and archetype-aware guardrails (phase 3, if the evidence run demands components or
non-course pages); freshness owned by the Stage-1 pre-flight and the audit mode; outcome reviews and
the propose-only improvement pass (phase 4); GSC exports at `data/gsc/` (phase 1).

One split left deliberately unresolved: usability knowledge lives in three places
(component-selection.md, abe-readability-audit, the design register). Consolidation trigger: the
first run that must read all three to answer one layout question merges them into abe-content.

One operational note: `pipeline/` artefact commits will trigger the git-connected Cloudflare build.
Harmless at ~1.3s builds, but add a paths filter (or watch only `src/`, `public/`, config) if the
noise annoys.

---

## 8 · Amendment: what the first evidence run showed (23 July 2026)

Phase 2 ran `/cpd-building-tas` end to end through `abe-course-page-astro`. Artefacts in
`pipeline/cpd-building-tas/`; review in
`skill-reviews/2026-07-23-abe-course-page-astro-cpd-building-tas.md`, graded by a fresh subagent
that saw only the artefacts and the built HTML. Verdict **Amber**.

**Nothing in sections 1-7 has been edited to match the outcome.** The predictions stand as written.
This section scores them. A plan that quietly rewrites its own forecasts stops being evidence that
the method works.

### 8a · How to read this section

Each observation carries an evidence counter, the same convention `kb/mistakes-log.md` already uses
for repeat risks:

> **`seen: 1`** — observed in one run, of one archetype, against one register.

**One run is a hypothesis, not a mandate.** Restructure on an observation confirmed across at least
two runs of *different* archetypes or *different* authority models. A single confirmation tells you
the run happened, not that the pattern generalises. Increment the counter when a later run repeats
it; strike the observation if a later run refutes it, and record that it was struck.

### 8b · Predictions the run scored

| Predicted in | Prediction | Outcome | seen |
|---|---|---|---|
| §3, §5b | **Stage artefacts as files make independent grading free.** | **Confirmed, and it was the plan's best call.** The grader found five defects in twenty minutes reading only `pipeline/{slug}/` and the built HTML. None of it needed the run's context. | 1 |
| §5, §3 | **`fact-verifier` and `keyword-analyst` are "the likely first two" subagents.** | **Refuted.** Neither trigger fired. The run's factual failure was that nobody opened the primary source, not that verification flooded the context, so a subagent would not have caught it. | 1 |
| §3 | **`page-auditor` earns its context window.** | **Confirmed, with the strongest evidence of the run.** Stage 7 self-certified five rows that the built HTML fails, two of them defects introduced by fixes recorded on that same page as complete. | 1 |
| §3, §5 | **Five skills, split along seams the run exposes.** | **Not reached.** The split trigger never fired: no file was too large to hold, no description misfired. Still one skill, correctly. | 0 |
| §6 | **Subagent blindness, mitigated by artefacts-as-files.** | **Confirmed as mitigated.** Every delegation named its input files and no subagent stalled for want of chat context. | 1 |
| §3 | **`PostToolUse` on `kb/register/**` validates the verified-date format.** | **Evidence arrived, but it reshapes the hook.** See 8c.3: a well-formed file-level date is exactly what the false claim hid behind. | 1 |

### 8c · Four things the architecture has no concept of

Each of these was needed to build one page and has no home in sections 1-7.

**1 · Generated-projection register files.** `kb/register/cpd/tas-courses.json` is synced from an
external operational source (Superhuman Docs) by `npm run sync:cpd`, committed, and never
hand-edited. §1's F1 assumes every register file is hand-maintained markdown with a human author and
a re-verification cadence. This is a different kind of file with a different failure mode: it goes
stale when the *upstream* changes, not when a date lapses, and it needs a checksum rather than a
cadence. The single-owner rule survives intact, because the repo file is a projection and not a
second author.

**2 · A derivation library shared between the checks and the pages.** `scripts/lib/cpd-derive.mjs`
holds the counting rules and is imported by both `check-claims` and `CpdBundleLayout.astro`. The
architecture has no notion of runtime logic shared across that boundary, and the sharing is
load-bearing: it is what makes it structurally impossible for a page to disagree with the check
policing it. Where derivation was wired, it held. Where it was not, which is the word "twelve" typed
into title, meta, H1, sticky bar and intro, it was unprotected, and that is where the run drifted.

**3 · Per-claim provenance, not per-file verified dates.** The run's largest error was a false
regulatory claim ("CBOS caps WHS points at 4 a year") that sat in `kb/register/` under a current,
well-formed, file-level verified date. The neighbouring claim A1 carried an inline citation to its
source instrument and was correct. That contrast is architectural rather than incidental: **a
file-level date certifies that someone looked at the file, not that anyone checked the claim.** §3's
proposed `kb/register/**` hook should validate that each claim carries its own source and date,
which the current format cannot express.

**4 · Register files that must be excluded from the figure corpus.** `competitor-pricing-snapshot.md`
and `demand-and-revenue-snapshot.md` live in `kb/register/` but are commercial evidence for deciding
what to build, never provenance for a published figure. `check-claims` needs the distinction, so
`kb/` holds at least two classes of file where the architecture describes one.

### 8d · The check suite has grown to nine

§5c lists six mechanisms, all still in force and still accurate. Three have been added since:

| Mechanism | Question it answers | When it runs |
|---|---|---|
| `scripts/check-pipeline.mjs` | Did this run actually produce every artefact, and does the page match the content that was signed off? (artefacts 01-07 present; section ids reconcile both ways against `05-components.md`; 04's capsules match the page with figures normalised) | With system-health; end of every run |
| `scripts/check-redirect-targets.mjs` | Does every redirect still land on an indexable page? | With system-health; before shipping redirects |
| `scripts/prose-lint.mjs` | Does the copy hold house style? (banned words, em dashes in body copy) | With the build |

Two further pieces sit alongside them: `scripts/sync-cpd-register.mjs` (the projection refresh, 8c.1)
and `scripts/health-log-dedupe.mjs` (maintenance for the append-only health history).

**One new standing rule, earned the hard way.** §5c already says *data with no reader quietly stops
being true*. The run added its converse: **a reader with no route to a decision is the same failure
wearing a badge.** `check-claims`, `check-freshness` and `system-health` each raised warnings naming
this exact slug during the run. All three were read. None reached the verification table, because
nothing routed a warning to the page it was about. The gap was unread signal, not missing signal,
and more checks would not have closed it.

### 8e · Not yet evidenced — do not build

Per §5 and `ROADMAP.md`, these remain candidates and their triggers have not fired:

- The five-skill split (8b).
- `fact-verifier` and `keyword-analyst` as subagents (8b), actively counter-indicated on current
  evidence.
- The `SubagentStop` hook on page-auditor, which presumes a page-auditor exists.
- `scripts/package-skills.mjs` and the claude.ai bundle surface (§4). Untested, so the two-surface
  drift risk in §6 is still entirely unmeasured.
- The §7 usability-consolidation trigger. The run read component-selection guidance and `DESIGN.md`
  but was not forced to read all three sources to answer one layout question. Close, not fired.

### 8f · Corrections applied in place

Small factual errors, fixed directly rather than amended, because they are not predictions:

- `data/gsc/` became **`data/GSC/`** (§1, phase 1). Lowercase `data`, uppercase `GSC`; the casing has
  caused trouble before.
- `kb/authority-model.md` became **`kb/rules/authority-model.md`** in the §3 tree.
- §3's `pipeline/{slug}/` listing ends "…04-content.md …". The ellipsis concealed **05-components.md,
  06-image-prompts.md and 07-verification.md, all of which are mandatory.** Their absence was not
  cosmetic: with no brief-to-section map, a section briefed at Stage 3 and written at Stage 4 was
  lost before the page and passed undetected through the build, the guardrails, `check-claims` and
  the independent grading.

### 8g · Run 2 update — white-card-tas (23 July 2026)

The second evidence run: a TAS White Card page (archetype 2, nationally-recognised-course;
authority model **asqa-accredited**), chosen for variance from run 1 (which was a CPD bundle,
state-approved-direct). Different archetype, different authority model, different regulator. Graded
independently, verdict **Amber** (`correct_and_safe` green; `passed_gates_first_time` amber). This
is the second data point the 8b counters were waiting for.

**The single number that matters.** `review-trends.mjs`, gate-fails-after-handoff: run 1 = **5**,
run 2 = **0**. Run 1's headline failure was five defects that slipped past its own verification;
run 2 shipped none into final `dist/`. The pipeline fixes held, measured, not asserted.

**8b predictions, re-scored:**

| Prediction | Run 1 | Run 2 | seen |
|---|---|---|---|
| Stage artefacts as files make independent grading free | confirmed | **confirmed** — the grader found the ASQA-branch and skipped-audit issues from artefacts + `dist/` alone | 2 |
| `fact-verifier` / `keyword-analyst` are the likely first two subagents | refuted | **refuted again** — the keyword layer (Neil Patel connector + GSC) and the load-bearing fact check (Blue Dog scope at training.gov.au, in a browser) were both done inline without flooding context. Neither wanted isolation | 2 |
| `page-auditor` earns its window | confirmed | **confirmed** — the Stage-7 verifier and the Stage-9 grader each found real defects; and the *second* verification caught the *first* one's incompleteness | 2 |
| Five skills, split along seams the run exposes | not reached | **not reached** — still one skill, no file too large, no description misfire | 0 |
| Subagent blindness, mitigated by artefacts-as-files | confirmed | **confirmed** — both subagents worked from named input files; neither stalled for want of chat | 2 |

Nothing flipped. The two-run picture: artefacts-as-files and an independent auditor are the load-
bearing calls; the five-skill split and the fact/keyword subagents remain unfired.

**Two new findings run 2 adds to 8c/8d:**

1. **An independent verifier certifies only the scope it was given.** Run 2's Stage-7 subagent ran
   the structural/schema/authority/pipeline checks honestly and returned GREEN, but silently omitted
   the three mandated skill-audits (`abe-readability-audit`, `final-check`, `ai-detector`) — a third
   of the checklist. The omission surfaced only because the person asked, and running them then found
   a real defect (an ASQA disclosure block at ~135 CPL). This refines "artefacts-as-files make grading
   free": grading is only as complete as the delegation prompt enumerates. A verification's *scope* is
   part of what it certifies, so the prompt must name every required check and the verifier must report
   each as run-or-not; a GREEN with any required check absent is a FAIL. (`mistakes-log.md` #14.)

2. **The asqa-accredited branch works but under-renders its archetype.** Run 2 is the first page to
   exercise the ASQA path (the branch the roadmap flagged "unproven"). Schema, `PartnerDisclosure`,
   the seven disclosure locations and `recognizedBy`-the-RTO all fired correctly. But the layout's
   auto-rendered `#rto-partner` section emits only the fact card — no H2, capsule or sources — so it
   cannot carry archetype 2's strongest move (the "verify the RTO yourself on training.gov.au"
   invitation). The run worked around it with a separate authored `#real` section. A built branch that
   has never been run against its archetype can pass every gate and still be shaped wrong.

**8d footnote.** `check-pipeline.mjs` (added after run 1) did its job on run 2: it caught a real
drift — an at-a-glance capsule present on the page but never written into `04-content.md` — and a
format mismatch that would have hidden the section map from the checker. The guard that run 1's
failure created earned its place on the next run.

**8g addendum — a third finding, surfaced after grading.** The independent grader gave run 2
`correct_and_safe` green, and it shipped an authority-model breach anyway: an ABE person credited as
the developer of an RTO-developed accredited course. Neither the build guardrails nor the grader
caught it, because both tested the authority model's *language* ("ABE is not an RTO") and not its
*authorship* (who developed the course). It took the human owner to see it. Two lessons compound
here: (1) an authority check is only as complete as the dimensions it enumerates — "not an RTO" and
"who developed it" are different claims, and a page can pass the first while failing the second; and
(2) `correct_and_safe` is the one score a fresh grader **cannot** fully stand in for when the check
suite itself has a blind spot — the grader re-measured the known checks faithfully and still missed
what no check named. The gap is now closed with a build guard (an asqa page fails on two Person nodes
or a Person titled "developer"), which immediately caught the same breach on two other pages — but the
standing point is that a new *kind* of claim needs a new check, and until it has one, neither
automation nor an independent grader will flag it.

### 8h · Run 3 update — wa-owner-builder-course (23 July 2026)

The third evidence run: an **audit-and-rebuild of a LIVE, indexed page** (archetype 1, state-approval
course — **knowledge-requirement** variant). This closes the authority-model set: run 1
state-approved-direct, run 2 asqa-accredited, run 3 knowledge-requirement. Graded independently,
verdict **Amber**, with a **RED on `passed_gates_first_time`**.

**8b predictions after three runs.** Nothing has flipped. Artefacts-as-files (seen 3), `page-auditor`
(seen 3) and subagent-blindness-mitigated (seen 3) are confirmed on every run. `fact-verifier` /
`keyword-analyst` are **refuted a third time** — the load-bearing research here was reading a PDF form
in the repo and a GSC export, neither of which wanted an isolated context. The five-skill split
remains **not reached** (seen 0). Three runs is the threshold §8a set for restructuring, and the
evidence says: keep artefacts-as-files and the independent auditor, do not build the other subagents,
do not split the skill.

**The new finding, and it is structural: a gate that runs after the deploy is not a gate.** Two commits
changed the live page (14:09, 15:03); `07-verification.md` was written at 15:48 and was still untracked
at grading. Stage 7 itself was the most rigorous of the three runs — it proved the absence of
`recognizedBy` by cross-checking the sibling pages rather than asserting it, and it caught two errors in
its own predecessor's numbers. It simply ran too late to prevent anything, and the defect it exists to
catch (a self-contradicting review date) sat live for ~54 minutes. **Verification quality and
verification timing are independent variables, and this system has been optimising only the first.**
(`mistakes-log` #19.)

**A second structural finding: absence is the claim this pipeline is worst at.** The run recorded
**four instances** of asserting something checkable without checking it — a fact called "missing" that
was present, a figure called "unsupported" that was sourced, answers called "not quotable" that were,
and a character count claimed that was wrong. Two reached a proposed change to a live page. Critically,
§H of the run's own source map **wrote the lesson down** ("greps prove presence, never absence") and §I
repeated the error ninety minutes later. **A lesson recorded as prose does not change behaviour; only a
required procedure does.** This is the strongest argument yet for encoding method as mechanism rather
than as guidance — the same conclusion §8g reached about enumerating a verifier's scope.

**Third: read the primary instrument.** Three of the run's errors came from reading *about* a
requirement (register, guidance page) rather than the instrument itself. Form 75 was in the repo at
`new site/reference/` the entire time; reading it settled the run's best finding, corrected the run's own
proposed wording, and produced the only finding no secondary source had (four knowledge pathways, so
some readers need no course at all). **Stage 1 should open with a primary-instrument inventory.**

**What run 3 proves about the trajectory.** Run 1's five gate-fails-after-handoff and its
invisible-guardrails failure are fixed and stayed fixed. Run 2's signature failure — a Stage-7 verifier
returning GREEN having skipped three mandated audits — is **fixed**: all three ran, with quoted output.
Verification *honesty* is now good across all three runs. What replaced it is verification *sequencing*.
The pipeline keeps solving the previous run's failure and surfacing the next layer of the same theme:
**can this system's claims about its own work be trusted, and at the moment they would have mattered?**
