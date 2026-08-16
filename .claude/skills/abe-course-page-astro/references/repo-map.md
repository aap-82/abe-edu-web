# Where things live (repo-first)

## Contents
- What this skill draws on, and what it never draws on
- kb/ — the verified-fact library and its single-owner rule
- pipeline/ — per-run stage artefacts
- src/ — content collections, components, layouts
- scripts/ — the checks, and which stage each belongs to

**Reference material, read when you need to find something.** Lifted out of SKILL.md 17 Aug 2026.

This skill is **self-contained plus the repo's `kb/` library**. Nothing is drawn from another skill.

- **`kb/register/`** — verified regulatory facts on a cadence (fees, eligibility, legislation by
  state, penalties, delivery policy, regulator roles, TAS/CBOS). Stage 1 reads the index first,
  `kb/content-source-map.md`, and loads only the file a fact needs. Newly verified facts are written
  back here. **Single owner: this directory. Never keep a second copy of a figure.**
- **`kb/rules/`** — `authority-and-seo-rules.md` (the ship-blockers), `authority-model.md`,
  `asqa-disclosure-framework.md`. `guardrails.ts` enforces these at build time; the text lives here.
- **`kb/mistakes-log.md`** — repeat risks with "times seen". Read at pre-flight, written at Stage 9.
- **`references/seo/`** — the SEO method. Each file is now pointed to from the stage that needs it
  (Stage 2 keyword-research.md and seo-strategy.md; Stage 4 helpful-content-standard.md,
  meta-framework.md, trust-bar-guidelines.md, badge-inventory.md, course-page-structure.md,
  seo-content-reference.md, content-formatting-guidelines.md; Stage 6 schema-implementation-guide.md,
  schema-org-opportunities.md, page-type-engine.md, crawl-index-controls.md; Stage 7
  audit-workflow.md, and three that no stage anchors by full path, so they are unreachable from here
  without guessing the directory — `references/seo/quality-gates.md`,
  `references/seo/alt-text-guidelines.md` and `references/seo/freshness-check.md`) — do not add a new
  file here without also anchoring it at the stage that will actually open it, or it is unreachable
  from the pipeline even though it is "in the skill". **Anchor it by full path, not bare filename**:
  a bare name reads as prose and cannot be opened without guessing the directory, which is how those
  two ended up two hops from this file. `changelog.md` is the exception: a dated log of
  corrections already applied elsewhere, read by a human auditing the skill's own history, not by a
  page-building run.
- **`evaluations/`** — five scenarios that test whether this skill prevents the failures it was
  written to prevent, each derived from a defect that actually shipped or nearly shipped (the
  mistakes-log row or dated review is named in every file). **Never read during a page-building
  run**, same standing as `changelog.md` below: they are for a `skills` session auditing the skill.
  Read `evaluations/README.md` first for how to score one and why a partial pass counts as a fail.
- **`references/seo/expert-fallback/`** — a static snapshot of the Notion Experts database, used only
  if a live Notion query for expert data fails or is unreachable; read its own `README.md` for the
  fallback procedure before using it. **Known gap:** the README's own step references ("Step 4, Step
  6M, Step 7", a "Graceful degradation" section) describe a pre-Stage-numbering version of this skill
  and no longer match — flag to a `skills` session, do not guess the mapping mid-run.
- **`references/archetypes/`** — Stage 3's page shapes. **`references/content-craft.md`** — Stage 4.
- **The site itself** — `src/`, `content.config.ts`, `guardrails.ts`. Read the code for the current
  shape rather than any description of it, this file included.

Still separate skills, unchanged: `abe-readability-audit`, `final-check`, `ai-detector` (Stage 7),
and the CBOS suite (a different regulator workflow with its own lifecycle).
