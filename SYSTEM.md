# SYSTEM — how the ABE content system is meant to work

The standing reference for `C:\dev\abe-web`. Not a plan and not a task list — those live in
`ROADMAP.md` and the handover files. This describes how the system is *supposed* to behave, so that
when something is unclear, or a new session is deciding what to do, there is a single place that says
what the design intends.

If this document and the code disagree, the code is what runs — but the disagreement is a finding.
Fix one to match the other and say which.

---

## 1. What the system is for

It turns a course name into a published page on abeeducation.edu.au that is accurate, well-written,
compliant, and traceable — and it improves at doing so over time. Accuracy and compliance come first
because ABE makes regulated claims: a wrong government fee or an overstated authority is not a typo,
it is a risk. Everything below serves that order of priorities: correct and safe first, then good,
then fast.

## 2. The six ideas everything else follows from

**One home.** The Astro repo is the single source. The pipeline that builds pages, the facts it
draws on, the checks that police it and the reviews that improve it all live here as plain files
under version control. There is no second place where any of it lives.

**One owner per fact.** Every government figure exists in exactly one file, in `kb/register/`, with a
source and a date. Pages, FAQs and components reference it; they never restate it. A figure in two
places is a bug, because the day one copy changes the other is wrong and nothing can tell.

**Every path resolves, or it does not exist.** A skill that points at a file expects that file to be
there. The pipeline was rebuilt around this after the old install method kept referencing files it
had never carried. Documentation that points at nothing is the failure mode this system is most
prone to, so a check exists solely to catch it.

**Every recorded thing has a reader.** Data nobody reads quietly stops being true. A verified date
with nothing checking it, a metric nothing computes, a caveat buried in a table cell — each looks
like coverage and provides none. So every field, every log line, every claim gets a reader in the
same change that creates it, or it does not get created.

**Evidence before structure.** The system is built by making one real thing, seeing what hurt, and
building only what the hurt demands. Its worst mistakes came from designing against descriptions
instead of contact with reality — guardrail behaviour, the CPD model and the layout system were each
documented one way and worked another. So structure is earned, never assumed.

**One session, one kind of work.** A session declares its type at the start and does only that: **build**
runs the pipeline for one page; **skills** acts on the demand list (skills, scripts, rules, memory);
**design** touches components, CSS and the styleguide; **facts** verify and record register figures.
Friction found mid-run is recorded on the Stage-9 demand list, never fixed in place, because a session
that quietly repairs the process destroys the evidence the run exists to produce. When the work changes
type, the session ends and the right one opens. The full table of what each type may and may not write
is in CLAUDE.md, "Session types" (added 25 July 2026, after this document's five original ideas).

## 3. The three kinds of thing in the repo

Every part of the system is one of three kinds, and the kind decides where it lives and how it is
treated.

**Data** — verified facts, on a cadence. `kb/register/`. Owned once. Re-verified on schedule (fees
each 1 July). Never guessed: a fact is verified at its official source, or marked UNVERIFIED and left
visible. A plausible figure is worse than a visible gap, because nothing downstream can tell a
plausible figure is wrong.

**Rules** — what ABE may claim. `kb/rules/`, enforced in code by `guardrails.ts`. The text of the
rule and the code that enforces it live beside each other so they cannot drift unseen.

**Know-how** — how to research, choose a page shape, write, build, audit. The skill and its
references. This is the only kind that tolerates modularity and revision; it is where the system
learns.

Code was always in the repo. What phase 1 did was bring the data, the rules and the know-how in
beside it, so the whole system is one version-controlled thing.

## 4. How a page gets built

Nine stages, each leaving a file in `pipeline/{slug}/` so the run is durable and resumable, and so
the run can be graded by reading what it produced rather than trusting its own account.

0. **Pre-flight** — `system-health` and `check-freshness`; a lapsed fee or a broken pointer is fixed
   before a page is started.
1. **Government research** — the source map and fact ledger, register first, live `.gov.au` only for
   gaps. Internal facts that cannot be researched (price, pass mark, points, modules) are asked here.
2. **Competitor and keyword gap** — what competitors cover, what they miss, what people actually
   search for; cannibalisation checked against existing pages.
3. **Archetype and section briefs** — the page shape is chosen, then every section is briefed in
   seven fields before a word of copy is written.
4. **Write** — translate facts rather than restate them, spend the distinctive research, name the
   objection, apply the delete test.
5. **Build** — the MDX entry, components, schema, meta and alt text per archetype; a missing
   component is built and registered as a draft.
6. **Guardrail check** — `npm run build`; every page-level rule must pass and none is ever weakened
   to make it.
7. **Pre-deploy audit** — readability, Australian English, AI patterns, SEO, schema, and figures
   against the register; a failure sends the run back to stage 4, not onward.
8. **Deploy — human gate** — guardrails green plus an explicit human go; the outcome targets are
   filed at this moment.
9. **Independent review** — a fresh agent grades the run from the artefacts and the built page, never
   the agent that did the work.

Two disciplines hold across every stage: **checkpoints** (each stage shows its output and waits for a
go-ahead, so a wrong turn costs one stage not nine), and **ask, don't assume** (material forks and
unknown internal facts go to the person; a regulatory fact is never defaulted).

## 5. How the system knows it is working

Checks run at five moments, and the moment is part of what each one is for. A check that runs at
prebuild stops a bad page from being built; the same check run by hand stops nothing.

**At prebuild**, before Astro starts:
- **`check-assets`** — every image a page points at is tracked in git, not merely present on disk.
  An untracked hero passed every other check and shipped a 404.
- **`check-freshness`** — the register's verified dates. In date, lapsed, partial, or undated.

**At build** — **`guardrails.ts`**, one page at a time, and the only check that reads the rendered
HTML. Correctness: exactly one H1, answer capsules that answer the question their heading asks, the
JSON-LD node set with Person counts and `recognizedBy` conditional on authority model, claims
forbidden per model, price parity between schema and page, alt-text length, in-page anchors,
unresolved `[confirm:]` markers, MDX hygiene and class ownership, styleguide specimens, hub
bijection, orphans, and superseded course codes. Never weakened to make a page pass.

**At postbuild** — **`check-redirect-targets`**, asserting every internal redirect target resolves
to a real page in `dist/`. A rule can redirect in one hop and still land the reader on a 404; those
are two different assertions over two different columns of the same CSV.

**In CI, on every pull request** — `astro check` for types in `.astro` frontmatter and inline
scripts, Lighthouse CI against the performance budget, **`prose-lint`** for an em dash or
"comprehensive" in `src/content` prose, and a diff gate proving the generated `public/_redirects`
matches the CSV it comes from.

**At pre-flight, and on every push to `main`** — **`system-health`**, the whole system in one
command. Run it before planning work. It adds dangling-reference detection and review coverage of
its own, and runs four checks beyond `check-freshness`:
- **`check-claims`** — three things nothing else sees: whether what the docs *say* about the build
  still matches the source, whether every dollar figure on a page exists in the register with a
  superseded figure failing, and whether this section still names every check that exists.
- **`check-pipeline`** — brief-to-page conformance. A section briefed at Stage 3 and written at
  Stage 4 still exists as its own section on the page, rather than dissolving into a neighbour.
- **`check-shipped`** — work on this branch can still reach `main`. A merged PR does not pick up
  later pushes, so correct work can sit on a branch, green and invisible.
- **`review-trends`** — the run history. Whether things are improving, which runs were self-graded,
  which outcome reviews have come due.

The health workflow reports and never blocks: it has no `pull_request` trigger and cannot gate a
merge even in principle.

**By hand only** — **`check-links`**, every same-origin link in `dist/` resolving to something that
exists. Run it after `npm run build`; the skill's Stage 7 pre-deploy audit instructs it, and names
it among the checks whose WARNs must be quoted rather than counted. No *automation* invokes it,
which was decided rather than overlooked on 28 July 2026: wiring it into `system-health` as a FAIL
would halt build sessions over a chrome defect, and `system-health` is the pre-flight, so it runs
when `dist/` may be absent or stale. Postbuild is where it would belong. Revisit if a dead link
ships again.

Four scripts in `scripts/` are not checks and are exempt from the list above: `generate-redirects`
(the only writer of `public/_redirects`, at prebuild), `demand-split` (derives handover notes),
`health-log-dedupe` (collapses identical health records) and `sync-cpd-register` (manual by design,
kept out of `prebuild` so the build stays hermetic).

A check exists to be read. When one produces more noise than signal — as the figure check did at 93
warnings — that is a defect in the check, because a check nobody reads confers false confidence. A
check that only a person remembers to run fails the same way more quietly, which is why
`check-links`' standing is written down here rather than left to be discovered.

## 6. How the system evaluates and improves itself

**Evaluation is independent.** The Stage-9 review is filled by a fresh agent reading only the run's
artefacts and output, never the agent that formed the intentions. It records a verdict, five scores,
three metrics, and a demand list. A red on *correct-and-safe* vetoes the whole run regardless of the
other scores. A self-graded run is permitted only when marked as such, and the trend report treats it
as weaker evidence rather than hiding it.

**Memory has one writer and one reader per layer.** `kb/mistakes-log.md` (written at review, read at
pre-flight, archived after ten clean runs); `skill-reviews/` (written by the grader, read by the
trend report and the improvement pass); `pipeline/{slug}/` (written by each stage, read by later
stages and the grader); outcome targets (filed at deploy, read at 4 and 12 weeks). Memory nobody
reads is not kept.

**Improvement is proposed, never imposed.** Trends turn recorded metrics into a direction. Outcome
reviews measure whether a page actually ranked, not just whether the run went smoothly. Every fifth
review, an improvement pass reads the accumulated reviews and the mistakes log and proposes skill
edits as a diff — which a human merges. It may never edit `guardrails.ts`, the hooks, or the human
gates. A loop that can rewrite the rules constraining it cannot be audited afterwards, so that
boundary is absolute.

## 7. Where the humans are, non-negotiably

- **Production deploys are human-triggered, always.** No agent, hook or workflow deploys production.
- **Stage checkpoints survive automation.** The show-and-confirm discipline is not removed by making
  the pipeline more autonomous.
- **The improvement pass proposes; a human merges** — and cannot touch the guardrails, the hooks, or
  this section.
- **Regulatory facts are verified by a human decision or an official source, never by a model's
  confidence.**

## 8. How the system records itself

Four layers, decided by who reads them, not by importance:

- **Git** records every change for free — never duplicate it; log *measurements*, not changes.
- **State files** (`CLAUDE.md`, `ROADMAP.md`, `kb/`) answer "what is true now", are read by every
  run, and are the only place bloat is real — keep them small and prune actively.
- **Event logs** (`data/health-log.jsonl`, review frontmatter) answer "what changed over time", are
  read only by scripts, and may grow freely.
- **Derived views** (the dashboard, the scorecards) compute from the layers above and store nothing.

The test before recording anything: **name the decision it will inform.** If you cannot, do not
record it — an unread record is worse than an absent one, because it looks like coverage.

## 9. How the system grows

`ROADMAP.md` holds the phases; this is only their shape. The foundation and the pipeline exist
(phase 1). One real page is built end to end to find out what actually hurts (phase 2). Structure —
skill splits, subagents, hooks, extra guardrails — is added only where that real run showed it was
needed (phase 3). Outcomes and the improvement loop are closed last (phase 4). Each phase shrinks to
whatever the one before it proved necessary. Building ahead of the evidence is the specific thing
this order exists to prevent.

## 10. The rules that hold everywhere

- Never default a regulatory fact — verify it, or mark it UNVERIFIED and leave it visible.
- `kb/register/` is the single owner of every government figure; a second copy is a bug.
- Never weaken a guardrail or a check to make something pass — fix the content or the data.
- Production deploys are human-triggered.
- Data with no reader quietly stops being true; every new field or claim gets a reader in the same
  change.
- Ask, don't assume; subagents that hit an unknown stop and report upward rather than guessing.
- ABE is not an RTO. Australian English. No em dashes in body copy. Never "comprehensive".
