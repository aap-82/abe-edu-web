# ABE content pipeline — one-page reference

## What it is

A repo-first pipeline in `C:\dev\abe-web` that turns a course name into a researched, written,
built, audited and graded page on abeeducation.edu.au — with every regulatory fact owned once in
`kb/`, every stage leaving a file, and every run graded by an agent that did not do the work.

## Commands

| Command | What it does |
|---|---|
| `node scripts/system-health.mjs` | One-command scorecard — freshness, dangling references, review coverage, trends, repeat risks, claims; run before planning work. |
| `node scripts/check-freshness.mjs` | Reports which register files are in date, lapsed, partial or undated; wired into `prebuild`. |
| `node scripts/check-claims.mjs` | Checks what the docs assert about the build against the real source, and every page dollar figure against `kb/register/`. |
| `node scripts/review-trends.mjs` | Computes whether runs are improving, flags self-graded runs and vetoes, lists outcome reviews now due. |
| `npm run build` | Builds the site and runs `guardrails.ts` — the per-page correctness gate. |
| *(in Claude Code)* "build the {slug} page" | Invokes the skill and runs stages 1-9. |

Add `--strict` to `check-freshness` or `check-claims` to make failures exit non-zero for a gate.

## Skills

| Skill | Role |
|---|---|
| `abe-course-page-astro` | The pipeline itself — the nine stages, archetypes, craft method and SEO references. |
| `abe-readability-audit` | Measures readability, layout, typography and CTA placement at stage 7. |
| `final-check` | Australian English, AI-writing patterns, contradictions and grouping at stage 7. |
| `ai-detector` | Flags AI-writing tells in finished copy at stage 7. |

## Agents

| Agent | Role |
|---|---|
| Stage-9 grader | A fresh subagent that scores the run from artefacts and built output only, never the agent that did the work. |
| *(phase 3, if the evidence run demands them)* fact-verifier, keyword-analyst, page-auditor | Isolate fact verification, keyword work and auditing into their own context windows. |

## References

**Foundation — `kb/`**

| File | Holds |
|---|---|
| `kb/README.md` | The single-owner rule: a figure lives here or nowhere. |
| `kb/content-source-map.md` | The index — which fact lives in which register file, and its cadence. |
| `kb/mistakes-log.md` | Repeat risks with a times-seen counter, archived after ten clean runs. |
| `kb/register/state-fees-register.md` | Every government fee by state, dated (QLD verified; four states currently unverified). |
| `kb/register/eligibility-by-state.md` | Who may apply for each permit or card, by jurisdiction. |
| `kb/register/legislation-references-{act,nsw,qld,tas,wa}.md` | The Acts, regulations and sections cited per state. |
| `kb/register/regulator-roles-by-state.md` | Which body does what in each jurisdiction. |
| `kb/register/online-delivery-policy-by-state.md` | Whether and how each state permits online delivery. |
| `kb/register/penalties-by-state.md` | Penalties and enforcement positions per state. |
| `kb/register/ppe-requirements.md` | PPE requirements referenced in White Card content. |
| `kb/register/cbos-tas-reference.md` | CBOS Tasmania CPD rules and approval positions. |
| `kb/register/card-lodgement-process-tas.md` | The Tasmanian card lodgement steps and fee. |
| `kb/register/government-listings.md` | Where ABE and its courses appear on government sites. |
| `kb/register/competitor-pricing-snapshot.md` | Competitor prices at a point in time, on a 90-day cadence. |
| `kb/rules/authority-and-seo-rules.md` | The ship-blockers — what may never be claimed or published. |
| `kb/rules/authority-model.md` | Which authority model each course runs under and what it licenses ABE to say. |
| `kb/rules/asqa-disclosure-framework.md` | Required ASQA and RTO-partner disclosure wording. |

**Authoring — `.claude/skills/abe-course-page-astro/references/`**

| File | Holds |
|---|---|
| `archetypes/_selector.md` | Decides which of the ten page shapes a request is. |
| `archetypes/01-state-approval-course.md` | State-approved courses (QLD/TAS/ACT, plus the WA knowledge-requirement variant). |
| `archetypes/02-nationally-recognised-course.md` | Nationally recognised training delivered through an RTO partner. |
| `archetypes/03-cpd-compliance.md` | CPD compliance courses. |
| `archetypes/04-cpd-bundle.md` | CPD bundles — a hub variant, not a course page. |
| `archetypes/05-expert-profile.md` | Expert profiles carrying E-E-A-T signals. |
| `archetypes/06-hub.md` | Hubs, including the CPD hierarchy and anti-cannibalisation rules. |
| `archetypes/07-info-guide.md` | Informational guides that answer rather than sell. |
| `archetypes/08-blog-post.md` | Blog posts. |
| `archetypes/09-insurance-type.md` | Insurance-type pages. |
| `archetypes/10-about.md` | The about page. |
| `archetypes/_static-pages.md` | Contact, terms, privacy and refund — placed, never drafted. |
| `content-craft.md` | The stage-4 writing method: translate, spend the research, name the objection, delete test. |
| `content-pipeline.md` | The stage-by-stage mechanics of a run. |
| `component-selection.md` | Which component carries which content, by the reader's job. |
| `component-library.md` | The available components and their props. |
| `usability-map.md` | Routes any layout question to exactly one source instead of three. |
| `verification.md` | How a fact is verified and recorded with provenance. |
| `image-prompts.md` | Image generation prompts and alt-text pairing. |
| `deploy-cloudflare.md` | The Cloudflare Workers deploy procedure. |

**SEO — `references/seo/`**

| File | Holds |
|---|---|
| `page-type-engine.md` | Detects page type and sets URL, breadcrumb and schema expectations. |
| `course-page-structure.md` | The section order and required elements of a course page. |
| `seo-strategy.md` | The overall search strategy the pages serve. |
| `seo-content-reference.md` | Working reference for on-page SEO decisions. |
| `keyword-research.md` | How keywords are researched and mapped without cannibalising. |
| `meta-framework.md` | Meta title and description patterns per page type. |
| `schema-implementation-guide.md` | How each JSON-LD node is built and validated. |
| `schema-org-opportunities.md` | Schema types worth adding beyond the required set. |
| `crawl-index-controls.md` | Noindex, canonical and crawl directives. |
| `helpful-content-standard.md` | The quality bar the copy is written against. |
| `content-formatting-guidelines.md` | Formatting conventions for scannable page copy. |
| `alt-text-guidelines.md` | How alt text is written for each image role. |
| `badge-inventory.md` | The approved badges and where each may appear. |
| `trust-bar-guidelines.md` | What the trust bar may claim and how it is built. |
| `quality-gates.md` | The pass/fail gates a page must clear before deploy. |
| `audit-workflow.md` | The pre-production audit procedure. |
| `freshness-check.md` | The registry of Google and schema.org sources and how often each is re-checked. |
| `expert-fallback/` | Expert-profile fallback content when a named expert is unavailable. |
| `changelog.md` | The history of changes to the SEO reference set. |

## Outputs

| Output | What it is |
|---|---|
| `pipeline/{slug}/01-source-map.md` | The government sources and fact ledger for this page. |
| `pipeline/{slug}/02-gap.md` | Competitor coverage, gaps and real search demand. |
| `pipeline/{slug}/03-briefs.md` | A seven-field brief for every section, before any copy exists. |
| `pipeline/{slug}/04-content.md` | The finished copy. |
| `pipeline/{slug}/07-audit.md` | The pre-deploy audit result and what was fixed. |
| `src/content/<collection>/{slug}.mdx` | The page itself, plus any new component and its styleguide specimen. |
| The live page | Deployed to Cloudflare Workers on an explicit human go. |
| `skill-reviews/YYYY-MM-DD-{slug}.md` | The graded review — verdict, five scores, three metrics, demand list, outcome targets. |
| `kb/mistakes-log.md` entry | A repeat risk recorded or incremented when a run scores Amber or Red. |

## Memory — six layers, each with one writer and a defined reader

Memory nobody reads is a write-only log, so every layer names both.

| Layer | Holds | Written by | Read by |
|---|---|---|---|
| `CLAUDE.md` | Never-forget constants: not an RTO, voice bans, human gates, path conventions, ask-don't-assume. | You, plus merged improvement-pass diffs | Every session and every subagent, automatically |
| `kb/register/` | Verified regulatory facts, dated, on a cadence. | Stage 1 and fee-verification sessions | Stage 1 of every run, and `check-claims` |
| `kb/mistakes-log.md` | Repeat risks with a times-seen counter. | Stage 9, on any Amber or Red | Pre-flight of every run |
| `skill-reviews/` | One graded review per run — verdict, scores, metrics, demand list, outcome targets. | The independent grader | `review-trends` and the improvement pass |
| `pipeline/{slug}/` | Stage artefacts — working memory made durable. | Each stage as it completes | Later stages, the grader, any resumed session |
| Outcome-target blocks | The rank and traffic prediction filed at deploy. | Stage 8 | The 4 and 12 week reviews |

Hygiene: a mistakes-log entry not seen in ten consecutive runs moves to an archive section with its
counter intact. Un-curated memory is noise wearing a seatbelt.

## Self-evaluation — the run grades itself honestly or not at all

| Mechanism | What it does |
|---|---|
| Independent grader | A fresh subagent scores the run from `pipeline/{slug}/` and the built output — never the agent that did the work, so it grades what was produced rather than what was intended. |
| Five scores | Correct-and-safe, passed-gates-first-time, inside-effort-budget, low-rework, taught-us-something. |
| The veto | Red on correct-and-safe fails the whole run regardless of the other four. |
| Three trend metrics | Turns to passed audit, manual fix passes after "done", gate-fails caught after handoff. |
| `graded_by` field | Records whether a review was independent or self-graded; `review-trends` flags self-graded runs as weaker evidence rather than hiding them. |
| The demand list | What was painful in this run — oversized files, flooded context, silent failures — which is the specification for any future structural change. |

## Self-checks — what catches drift without being asked

| Check | Catches |
|---|---|
| `guardrails.ts` | Per-page correctness at build: one H1, required JSON-LD, price parity, MDX hygiene, specimens, hub bijection, orphans. |
| `check-freshness` | Register facts past their cadence, files marked partial, and files carrying no verified date at all. |
| `check-claims` (part 1) | Documentation that asserts something about the build which the source no longer supports. |
| `check-claims` (part 2) | A dollar figure on a page that does not exist in `kb/register/`, or one the register marks superseded. |
| `system-health` — dangling references | A skill pointing at a file that does not exist, the drift class recorded three times in the mistakes log. |
| `system-health` — review coverage | A page that shipped without a Stage-9 review, a run the learning loop never saw. |
| `review-trends` | Metrics getting worse, vetoes, self-graded runs, and outcome reviews that have come due. |

Standing rule: **data with no reader quietly stops being true.** Every new field or assertion gets a
reader — or a CLAIMS entry — in the same change that creates it.

## Self-improvement — and its limits

| Mechanism | What it does |
|---|---|
| Mistakes log | Turns a one-off failure into a pre-flight check on every subsequent run. |
| Trend direction | Compares the most recent third of runs against the earliest, so "are we improving" is a number before it is an opinion. |
| Outcome reviews | At 4 and 12 weeks, measures rank and traffic against the target filed at deploy — did the page work, not just did the run go smoothly. |
| Improvement pass | Every fifth review, reads the accumulated reviews and mistakes log and proposes skill edits as a git diff. |
| Agent memory | Each agent curates its own learned patterns as part of finishing a task, not as a separate chore. |

**The limits are the point.** The improvement pass proposes only — a human merges. It may never edit
`guardrails.ts`, the hooks, or the human-gates section, because a loop that can rewrite the rules
constraining it cannot be audited afterwards. Production deploys stay human-triggered regardless of
how well the system is scoring.

## The full flow

| Stage | What happens |
|---|---|
| 0 · Pre-flight | Run `system-health`; a lapsed fee or broken pointer is fixed before the page is started. |
| 1 · Government research | Build the source map and fact ledger from `kb/register/` first, live `.gov.au` only for gaps — and ask for the internal facts nobody can research. |
| 2 · Competitor and keyword gap | Establish what competitors cover, what they miss, and what people actually search for. |
| 3 · Archetype and section briefs | Choose the page shape, then brief every section in seven fields before writing a word. |
| 4 · Write the copy | Translate the facts into the reader's terms, spend the distinctive material, name the objection. |
| 5 · Build in Astro | Create the MDX entry, apply components, schema, meta and alt text; build any missing component as a registered draft. |
| 6 · Component and guardrail check | `npm run build` — every page-level rule must pass, and no guardrail is ever weakened to make it. |
| 7 · Pre-deploy audit | Readability, Australian English, AI patterns, SEO, schema and figure-versus-register checks; a failure sends the run back to stage 4. |
| 8 · Deploy — human gate | Guardrails green plus an explicit go from you; the outcome targets are filed at this moment. |
| 9 · Independent review | A fresh subagent grades the run from the artefacts, files the review, and records any repeat risk. |
| After the run | Trends are computed, outcome reviews fall due at 4 and 12 weeks, and every fifth review triggers a propose-only improvement pass. |
