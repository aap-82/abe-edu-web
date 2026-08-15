# ROADMAP — where this system is, and what comes next

For Claude Code. Read this before starting any phase work. It is the orientation document: it says
what is already true, what is being worked on now, and — importantly — what must **not** be built
yet and why.

Last updated: 15 August 2026, when this file was also cut from 67KB to its current size under its
own recording policy ("Layer 1 is the only layer where bloat is real. Keep it small. Prune
actively"). Everything removed was dated history duplicating git — `git log` and `skill-reviews/`
hold it all; nothing removed was a rule.

---

## How to use this file

- **Before starting work**, read the Current state section and run `node scripts/system-health.mjs`.
  If the two disagree, the script is right and this file is stale — say so.
- **Do not build ahead of the current phase.** Each phase is gated on evidence from the one before.
  Phase 3 in particular is a list of *candidates*, not a plan. Building a candidate before the
  evidence asks for it is the specific failure this sequencing exists to prevent.
- **At the end of a phase**, update the Current state section and mark the phase done. A roadmap that
  describes an earlier version of the repo is worse than none.
- **What is built, per page, is never answered from this file** — run `node scripts/page-status.mjs`.
  Counts written here as prose are snapshots and rot; the script measures `dist/`.

## Current state (15 August 2026)

**The short version.** Phases 1 and 2, CPD Stage A and the authority-model set are closed; Waves 1
and 3 are complete (all five White Card spokes and the `/white-card` hub); Wave 2 is 8 of 10; Wave 4
has opened with `/cpd-electrical-tas` and `/cpd-plumbing-tas` built 12 Aug, **both `noindex` and
neither publishable** (blockers below). Of the Phase 3 candidates, the headless width check is built
(`check-reflow.mjs`); the session-type path check remains the oldest unbuilt one. A full-repo audit
on 15 Aug fixed its ten findings the same day (PR #121: head-signal reconciliation + `check-meta`,
every check wired to run automatically, claims gating merges in CI) — details in
`skill-reviews/skills/2026-08-15-full-repo-audit.md`.

**Neither new CPD bundle can be published, and as of 16 Aug 2026 ONE reason remains for each.** Both
lack a LearnWorlds checkout id, so their `buyUrl`s are placeholders that 404. That is now the whole
of it.

`/cpd-plumbing-tas`'s second, independent blocker is **CLOSED (16 Aug 2026)**. It read: the register
records which courses are *eligible* for a category, never which twelve are *sold*, so
`liveMembers()` rendered 13 rows for a 12-course bundle while the copy correctly said twelve.
**The fix this file predicted — a `bundleMembers` list or a per-course `inBundle` flag — was not
what closed it, and building it would have been a mechanism the model already had.** `Category`
(CBOS approval) and `Bundle` (what is sold together) are already separate columns in the source doc;
one row was simply tagged to a bundle it is not sold in. Andrey named it on 16 Aug — **TAS CPD Solar
Energy** — its Bundle tag was corrected at source, and `npm run sync:cpd` regenerated the register.
Measured after: 12 `bcard` members rendered, `system-health` reads "CPD plumbing: publishes 12 pts
within a live pool of 12 (of 13 tagged)", and the sibling bundles are unchanged at 12 and 11. The
page copy did not change and is now literally true: Solar Energy is still CBOS-approved for
plumbers, so thirteen live courses still carry the Plumbing category.
**Generalisable:** a missing-mechanism diagnosis should be checked against the source schema before
it is built, because a data error and a model gap look identical from inside a generated projection.
Full record: `pipeline/cpd-plumbing-tas/07-verification.md` and
`skill-reviews/facts/2026-08-16-plumbing-bundle-selection.md`.

**A standing caution from the 12 Aug session, kept because no gate can catch the class:** a
typographic edit introduced two regulatory claims not in the register (both since reverted). The
verification that certified it checked only that facts were not *lost*; it could not see a fact
*added*. No gate in this repo can read a sentence and ask whether it is true.

## Milestones — the ledger, not the story

The full narrative for every row lives in `skill-reviews/` and git (`git log -S` the thing you care
about). One line each here, newest first:

- **15 Aug 2026** — full-repo audit; all ten findings fixed and merged (#121); governance corpus cut.
- **12 Aug 2026** — Wave 4 opens: both TAS CPD bundle pages built, noindex, blocked as above.
- **10-11 Aug 2026** — `check-reflow.mjs` built (Phase 3 candidate closed); `page-status.mjs` +
  status board replace the sitemap tracker as the source of truth for progress.
- **9-10 Aug 2026** — `/owner-builder-insurance` and `/project-advisory` shipped (Wave 2 → 8/10).
- **8 Aug 2026** — Wave 3 complete: five White Card spokes + hub, hub redesigned.
- **4 Aug 2026** — `check-positions.mjs` built; `SiteHeader` nav data split to `src/data/nav.ts`.
- **29 Jul-3 Aug 2026** — full system audit (governance-ref check, recursive demand routing, Stage-7
  scope check); White Card QLD/ACT/NSW built; facts sessions source all five delivery-mode rows.
- **23-28 Jul 2026** — Phase 2 evidence runs (verdict Amber, authority-model set closed);
  White Card WA/TAS built; images to `astro:assets`; CPD Stage A.
- **18 Jul 2026** — Wave 0 platform close-out merged and live.

## Phase 3 — structure on demand 🔓 open; build only what the demand list authorises

Candidates triggered and authorised (rule 3: second occurrence), still unbuilt:

| Candidate | Trigger evidence | Notes for the builder |
|---|---|---|
| **Session-type path check** ⭐ oldest | 4 crossings, 3 sessions, 2 days (1-3 Aug); filed 4 times | Diff a commit's touched paths against the session-type table. **Advisory, not a flat FAIL**: deliberately-unassigned paths (`worker/`, `wrangler.jsonc`, `astro.config.mjs`, `.github/**`, `package.json`) must report differently from wrong-owner paths. The instructive case is an edit arriving via cherry-pick — still an edit by the session that runs it. |
| **`page-auditor` subagent** | Stage 7 ticked five rows the built HTML fails | Fresh subagent, given only `dist/{slug}/index.html`, reports a measured value per row, never a tick. |
| **Guardrail: fail on undeclared authority** | a page with no `authority` silently skips the checks that model triggers | Absence is currently the quiet state, which is the dangerous one (mistakes-log #10). |

**A structural finding under the session-type candidate, at two sightings (9 and 10 Aug):** a
ratcheted budget always lives in a **skills-owned** file while the debt it counts lives in design- or
build-owned files, so paying down debt cannot complete inside one session type — the ratchet FAILs
until someone crosses. Weigh before building: budgets in a data file any session may write; ratchet
auto-lowers and reports; or a named exemption in the session-types table.

**One caveat on `check-reflow`, recorded the day it shipped: it has a ceiling and no floor.** A CSS
change collapsed 307 paragraphs to 480px and it reported clean, because a narrower line never
breaches an upper bound. A companion floor assertion is filed `[skills]`. Do not read "check-reflow
is green" as "the measure is correct".

Candidates **not yet triggered** — record occurrences, do not build:

| Candidate | Build only if the demand list shows |
|---|---|
| Splitting the skill into smaller skills | A file was too large to hold in context, or a description misfired |
| `fact-verifier` subagent | Fact verification flooded the main context or wanted isolation |
| `keyword-analyst` subagent | Keyword and SERP work flooded the main context |
| Hooks (legal-page edit block, register date validation) | A rule was violated that a hook would have caught |
| `token-lint` | The run created a component, or hardcoded a colour or spacing value |
| Archetype-aware guardrails + collections for archetypes 7-10 | A non-course page is needed next |
| Event-driven pre-flight verification in Stage 1 | Freshness was checked too late, or not at all |

**The usability split has its own trigger.** Layout knowledge lives in three places
(`component-selection.md`, `abe-readability-audit`, the design register). If a run had to read all
three to answer one layout question, record it. On the **second** occurrence, merge them.

**First-occurrence records, not yet actionable:** `check-pipeline` conformance is capsules and
section ids only, so a component block, subhead or CTA string can differ from `04-content.md` with
every gate green (one sighting, `white-card-wa`).

---

## Phase 4 — outcomes and distribution 🔒 after phase 3

- **Outcome reviews acted on.** `review-trends` already surfaces 4- and 12-week review dates when
  they fall due. Phase 4 is running the rank-and-traffic check against each page's outcome-target
  block and filing the result.
- **The improvement pass.** Every fifth skill review, read the accumulated reviews and
  `kb/mistakes-log.md`, and propose skill edits as a git diff. **Propose only — a human merges.** It
  may never edit `guardrails.ts`, the human-gates section of `CLAUDE.md`, or any Claude Code hook —
  none of which exist yet, so that last limb binds forward rather than describing something present.
- **`.skill` bundle packaging** from the repo for claude.ai, with register files carrying explicit
  expiry lines so a stale bundle cannot state a figure past its date.

---

## Standing rules — all phases

- **Never default a regulatory fact.** Verify it at the official source, or mark it UNVERIFIED and
  leave it visible. A plausible figure is worse than a visible gap.
- **`kb/register/` is the single owner of every government figure.** A second copy anywhere is a bug.
  For CPD, `kb/register/cpd/tas-courses.json` is a generated projection (refresh:
  `npm run sync:cpd`); the counting rules live once, in `scripts/lib/cpd-derive.mjs`, imported by
  both the checks and the pages so a page cannot disagree with the check policing it.
- **Expiry is a build-blocker.** `check-freshness` fails, without `--strict`, on a course marked
  live, past its CBOS expiry, and still sold. The WHS cap warns and never blocks — it is CBOS's
  judgement about content, not a date that has passed.
- **Never weaken a guardrail or a check to make something pass.** Fix the content or the data.
- **Production deploys are human-triggered, always.** No agent, hook or workflow deploys production.
- **Data with no reader quietly stops being true.** Every new field or assertion gets a reader — or a
  `CLAIMS` entry in `check-claims.mjs` — in the same change that creates it.
- **Ask, don't assume.** Material forks and unknown internal facts go to the person: closed questions
  via the interactive tool, open ones in prose. Subagents cannot ask — they stop and report upward.
- **ABE is not an RTO.** Australian English. No em dashes in body copy. Never "comprehensive".
- **One session, one type.** Declared at the start, fixed for the session; each type has its own
  may-write scope and pre-flight. See `CLAUDE.md` → Session types — and its Operating mode section:
  in STUDIO mode (pre-cutover, decided 16 Aug 2026) the type is declared rather than policed, and
  only two walls are enforced: the register is facts-only, and deploys are human-triggered.

---

## Recording policy — what to record, and where

Four layers. Which layer a thing belongs to is decided by **who reads it**, not by how important it
feels.

**The governing idea: bloat is attention, not disk.** A 10,000-line JSONL file costs a megabyte and
is read only by a script. The `check-claims` output at 93 warnings cost nothing on disk and was
actively harmful, because it buried a real error in noise. Only one of those is bloat.

**Layer 0 — git.** Already records every change, diff, message and timestamp. This is the
record-everything layer and it is free. When you need to know why a figure changed or when a rule
appeared, `git log -p` answers it.
*Never duplicate git.* A log entry saying "updated the TAS fee" is strictly worse than the commit
that did it.

**Layer 1 — state files.** `CLAUDE.md`, `ROADMAP.md`, `kb/register/`, `kb/rules/`,
`kb/mistakes-log.md`. These answer **"what is true now."** Read by humans and by every run, so every
line costs attention on every run.
*This is the only layer where bloat is real.* Keep it small. Prune actively — the mistakes log's
ten-run archive rule is the model.

**Layer 2 — event logs.** `data/health-log.jsonl`, the frontmatter blocks in `skill-reviews/`. These
answer **"what changed over time."** Read only by scripts.
*Append freely.* Volume is nearly free here, and a trend you did not record cannot be reconstructed
later.

**Layer 3 — derived views.** The dashboard, `review-trends` output, the `system-health` scorecard.
Computed from layers 1 and 2 on demand, stored nowhere, deletable and regenerable at any time.
*Never treat a derived view as a source.* If it is not reproducible from layers 1 and 2, it is a
layer 2 record wearing the wrong clothes.

### The rules that follow

1. **If git captures it, do not log it.** Changes belong in commits. Only *measurements* belong in
   logs.
2. **Log an event only where you want a trend.** A trend needs three or more points and a decision
   hanging off it.
3. **Machine-readable or do not bother.** Numbers and enums survive and can be computed over. Prose
   logs are written once and never read again.
4. **Write `null`, never `0`, for something you could not determine.** A zero and an unknown must not
   look the same to a later reader.
5. **Every human-read line must earn its attention.** If adding a line to a layer 1 file does not
   change what someone would do, it belongs in layer 2 or nowhere.

### The test, before adding any record

**Name the decision it will inform.** Not "it might be useful" — an actual decision someone makes.

- Health counts over time → *is the system degrading, and since when?*
- Run metrics per review → *should the skill be split, or a subagent added?*
- Outcome results at 4 and 12 weeks → *did this page actually work?*

If you cannot name the decision, do not add the record. An unread record is worse than an absent one,
because it creates false confidence that something is covered.

### Currently recorded, and why

| What | Layer | Decision it informs |
|---|---|---|
| `kb/register/` figures + dates | 1 | May this figure be published today? |
| `kb/mistakes-log.md` | 1 | What should pre-flight check before this run? |
| `skill-reviews/` frontmatter | 2 | Is the pipeline improving? Should structure change? |
| `data/health-log.jsonl` | 2 | Is system health trending up or down? |
| Outcome-target blocks | 2 | Did the page achieve what was predicted? |
| `pipeline/{slug}/` artefacts | 2 | What did this run actually do, and can it be resumed or graded? |

Nothing else is logged deliberately. `check-freshness`, `check-claims` and `review-trends` are all
aggregated by `system-health`, so they do not log separately — one record per health run covers them.

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

**The principle under every gate:** a green check proves consistency, never correctness. Every
defect Phase 2 produced survived a green build; the fixes that hold are the ones that read the
built output (`check-pipeline`, the fresh-subagent Stage 7, `check-reflow`, `check-meta`), not the
intent. Where a check can only be satisfied by a human assertion, it is not a check.
