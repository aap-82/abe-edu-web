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

Checks run at six moments, and the moment is part of what each one is for. A check that runs at
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
bijection, orphans, superseded course codes, and banned generic CTAs. Never weakened to make a
page pass.

The banned-CTA check is a **ratchet**, not a flat assertion, and it is the only one here that is:
each page carries its measured count as a budget and the build fails if the count rises **or** if
it falls without the budget following it down. That shape exists because the rule was breached on
four live pages before it was mechanised, and a flat FAIL from a skills session would have handed
every build session a red build it was not permitted to fix. A ratchet converts standing debt into
something that can only shrink; `INLINE_STYLE_BUDGET` does the same for inline styles.

**At postbuild** — **`check-redirect-targets`**, asserting every internal redirect target resolves
to a real page in `dist/`. A rule can redirect in one hop and still land the reader on a 404; those
are two different assertions over two different columns of the same CSV.

**In CI, on every pull request and on every push to `main`** — `astro check` for types in `.astro`
frontmatter and inline scripts, Lighthouse CI against the performance budget, **`prose-lint`** for
an em dash or "comprehensive" in `src/content` prose, and a diff gate proving the generated
`public/_redirects` matches the CSV it comes from.

The push trigger was added 13 Aug 2026 and the workflow had been `pull_request`-only, which meant
**all four of those were absent from every commit that reached `main` directly** — the normal path
in a trunk-based repo. Demonstrated rather than argued: the three commits pushed that day have zero
runs of the workflow between them, and one of them changed `global.css` and auto-deployed to
production. The gate was not failing, it was not running, and its green board was being read as
though it had. A `paths` filter was deliberately not added at the same time; a path filter is the
same class of defect as the missing trigger, a gate that silently does not run.

**Nightly, against the DEPLOYED host** — Lighthouse again, on the real origin rather than a build
served from localhost on the runner. It exists because the pull-request gate is blind to any defect
whose trigger is network delivery, and one of those is live: a reproducible ~0.0752 CLS on the
deployed host that passes the localhost gate green against its own 0.02 budget. The config is
derived from `.lighthouserc.json` by **`lhci-deployed-config`** rather than copied, so the two gates
cannot drift apart on their budgets — a second copy of twelve numbers is the same failure as
`DESIGN.md` and `global.css` disagreeing for three weeks, and harder to see in a nightly nobody
watches. Deterministic assertions (CLS, byte budget, blocking-resource count) are **errors**;
timing assertions (performance score, LCP, TBT) are **warnings** until there is a runner baseline to
set them from. Measured 13 Aug 2026, three runs of one unchanged page gave LCP 3967 / 3617 / 2447ms
against an 1800ms budget: that spread is the measuring machine, not the site, and shipping it as an
error would mean a nightly red from night one on numbers nobody can defend. The promotion trigger is
in the script's header and is a real one: two weeks of runner p95, not a someday.

**At pre-flight, and on every push to `main`** — **`system-health`**, the whole system in one
command. Run it before planning work. It adds dangling-reference detection and review coverage of
its own, and runs six checks beyond `check-freshness`.

Dangling-reference detection covers **two populations, counted separately**: the paths the skill
points at, and the paths *this document and its peers* point at (`CLAUDE.md`, `ROADMAP.md`,
`DESIGN.md`, `README.md`, `handover/**`). The second was added on 29 July 2026, after an audit found
six dead pointers across the governance documents surviving clean runs — the documents stating §2's
"every path resolves, or it does not exist" were the ones exempt from it. A reference that escapes the
repo (`../anything`) fails on sight, resolvable or not, because §2's "One home" makes the repo the
single source. Three prefixes are exempt with their reason recorded in the script: `reports/`,
`business data/` and the superseded `data/GSC/` — the first two are correct paths that are
deliberately never committed, the third is named only in historical records. The six checks:
- **`check-claims`** — four things nothing else sees: whether what the docs *say* about the build
  still matches the source, whether every dollar figure on a page exists in the register with a
  superseded figure failing, whether the skill's own worked examples demonstrate a phrase the skill
  bans, and whether this section still names every check that exists. The worked-example guard
  reads the *source of the copy* rather than the copy: `guardrails.ts` reads `dist/`, and a
  reference doc is never built, so a skill that taught what it forbade was invisible to every gate.
- **`check-positions`** — a page's claim about *delivery mode* or *authority model* must not
  contradict `kb/register/`, the same reconciliation `check-claims` performs for dollar figures.
  Scans `src/content`, `src/data`, `src/components` and `src/pages` for hand-curated banned
  phrasings, each citing the register assertion it contradicts, and separately re-applies
  `guardrails.ts`'s `FORBIDDEN_BY_AUTHORITY` list to `src/data/nav.ts`'s nav content — the one
  place that check cannot reach, because it deliberately excises the whole `<header>` from every
  page it audits (to avoid flagging the White Card group's TRUE claim rendering on an Owner Builder
  page), which means it can never see a WRONG claim IN the header's own source either. Repointed
  from `SiteHeader.astro` on 4 Aug 2026 when the nav data moved into its own build-owned file (see
  the component gotcha in `CLAUDE.md`) — the check would otherwise have kept reading a file with no
  nav literals left in it and reported a false clean OK forever after. Built 3 Aug 2026 after three
  defects survived a green build this way: `/white-card-nsw`'s now-corrected delivery-mode
  misattribution, the NSW Owner Builder nav card's authority claim (closed 2 Aug 2026), and
  `/white-card-tas`'s unsourced "Tasmanian residents only" framing, which
  this check still FAILs on at the time it was written — a real, already-filed `[build]` item, not
  a defect in the check.
- **`check-design-register`** — `DESIGN.md`'s frontmatter against `src/styles/global.css`, in both
  directions. `DESIGN.md` is canonical for tokens and **nothing in the repo reads it**: Astro does
  not import it, `guardrails.ts` does not parse it, and `check-claims` verifies prose claims about
  the build rather than token values. So the one document a generator or a fresh session trusts for
  "what colour is the page" could disagree with the stylesheet indefinitely behind a green board,
  and did. Built 13 Aug 2026 after six values were found wrong by hand, the worst being `--ground`:
  absent from the register entirely while being the background of every page on the site, for three
  weeks after the ground/paper split. Asserts colours, spacing, the typography roles' declared
  properties against the rule that renders each one, radius-scale use, and that every
  `{group.token}` reference in `components` resolves. **The reverse direction is the point** — a
  token added to the stylesheet and never recorded is what the forward check cannot see, and is
  exactly how `--ground` was missed. Colour, spacing and typography disagreements FAIL, because two
  files stating different values for one fact is not a judgement call and the session type that owns
  `DESIGN.md` owns `global.css` too; off-scale radii WARN, because a one-off radius may be
  deliberate. Verified by a falsification harness rather than by passing: each of eleven
  reintroduced drifts was confirmed to trip it.
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

**By hand only, and for a different reason** — **`check-reflow`**, the only check that RENDERS a page
rather than reading it as text. `npm run check:reflow`, after `npm run build`. It serves `dist/` on
an ephemeral port, drives headless chromium at 375px and 1280px, and measures two things nothing
else in this repo can see: whether the document scrolls sideways, and how many characters per line
the reading copy actually renders at.

It exists because both defects it covers were paid for. A 90px sideways scroll at 320px survived a
green build, 20/20 guardrails and an independent Stage 7 audit on every page rendering
`PartnerDisclosure`. And `.capsule` rendered 92 CPL against an 85 rule and was filed **six times
across five sessions** without being fixed, because the cap read `max-width: 66ch` and 66 looks
correct — `1ch` is the advance of "0" (12.42px in DM Sans 18px), not of an average character
(8.41px), so 66ch bought 92 characters. Five sessions re-derived the same wrong answer from the same
wrong unit because nothing could measure the rendered line.

Out of `system-health` deliberately, on the same reasoning as `check-links` plus one more: it needs
a browser and a current `dist/`, and `system-health` is the pre-flight, which runs when `dist/` may
be absent or stale. It also takes seconds per page rather than milliseconds. **It skips rather than
fails when playwright or its browser is missing**, exiting 0 with the install command — the contract
`check-shipped` uses for a missing `gh`, because a check that fails over a missing tool teaches
people to ignore it.

Its CPL half is a **ratchet**, not a flat FAIL: 35 breaches across eleven live pages existed the day
it was written, in page content and `src/styles/**`, which a skills session may not fix. Each page
carries its count as a budget that can only go down, and the budget FAILs when it rises *and* when
it falls without the number following — the same shape as `BANNED_CTA_BUDGET`. The reflow half has
no budget because it was already clean.

Six scripts in `scripts/` are not checks and are exempt from the list above: `generate-redirects`
(the only writer of `public/_redirects`, at prebuild), `demand-split` (derives handover notes),
`health-log-dedupe` (collapses identical health records), `sync-cpd-register` (manual by design,
kept out of `prebuild` so the build stays hermetic), and the status-board pair — `page-status`
(reads `dist/` and emits per-page build status as JSON) and `status-board` (renders that JSON into
`reports/status-board.html`). The pair is split measure-from-present on purpose: the measurement is
the half worth trusting and re-running, and keeping it free of markup lets its output feed anything
else later. Both are recording-policy layer 3 derived views, both gate nothing, both always exit 0,
and both write into gitignored `reports/` — a derived view that is committed is the duplication the
four-layer policy exists to prevent. Refresh procedure: `handover/HANDOVER-status-board.md`.

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
edits as a diff — which a human merges. It may never edit `guardrails.ts`, the human gates, or any
Claude Code hook. A loop that can rewrite the rules constraining it cannot be audited afterwards, so
that boundary is absolute. (No hooks exist yet; the clause binds the day one is added. Stating it as
though they were present is the drift this document's §2 warns about, and it was doing exactly that
until 29 July 2026.)

## 7. Where the humans are, non-negotiably

- **Production deploys are human-triggered, always.** No agent, hook or workflow deploys production.
- **Stage checkpoints survive automation.** The show-and-confirm discipline is not removed by making
  the pipeline more autonomous.
- **The improvement pass proposes; a human merges** — and cannot touch the guardrails, this section, or
  any hook that may later exist.
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
