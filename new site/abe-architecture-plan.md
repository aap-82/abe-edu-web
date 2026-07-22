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
  (GSC exports in `data/gsc/`, Ubersuggest), so copy is built from demand, not habit.
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

```
abe-web/                          (the existing repo — one home)
├── kb/                           SHARED LIBRARY — data + rules, single owner
│   ├── register/                 F1: state-fees, eligibility, legislation-{state},
│   │                                 penalties, online-delivery, regulator-roles,
│   │                                 cbos-tas … (moved OUT of the engine, not copied)
│   ├── authority-model.md        F6: one text, referenced by skills AND by guardrails
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
skill, unsplit**, with its Stage 1 pointed at the new `kb/` paths. Uninstall the superseded skills
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
