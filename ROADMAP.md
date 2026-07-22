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

The post-merge fixes landed in PR #29 (merged 22 July): `check-claims` went from ~93 warnings to 8,
derived totals reconcile and FAIL on
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

## CPD Stage A — done 23 July 2026 (prerequisite for phase 2)

CPD did not fit the one-course-one-state shape the site was built around, so the data model had to
land before the evidence run could be honest. Delivered:

- `kb/register/cpd/tas-courses.json` — generated projection of ABE's operational CPD register
  (Superhuman Docs), refreshed by `npm run sync:cpd`. Owns per-course points, approval and expiry
  dates, bundle membership and status.
- `scripts/lib/cpd-derive.mjs` — the counting rules, in **one** place, imported by both the check
  scripts and the bundle pages so a page cannot disagree with the check policing it.
- **Expiry is a build-blocker.** `check-freshness` fails, without `--strict`, on a course marked
  live, past its CBOS expiry, and still sold. **The WHS cap warns and never blocks** — it is CBOS's
  judgement about content, not a date that has passed.
- `cpdBundles` collection + `CpdBundleLayout` + `/cpd-building-tas` as a **noindex stub**, so Phase
  2 builds the real page rather than editing one someone already shaped.
- Bundles renamed to the register's category axis: Building, Electrical, Plumbing.

**Three findings the register surfaced, all corrected on `/cpd-tas`:** Electrical was advertising 12
points with one course expired since April (now 11, with a shortfall note); Plumbing was selling 11
for $449 against 13 live approved courses (now 12 at $499); and expired courses stay tagged to their
bundles in the source doc, so any unfiltered count overstates every bundle.

**Open, non-blocking:** the WHS classification is not imported, so the 4-point cap is unchecked —
by title the Building bundle may hold ~6 WHS courses, which would make it 10 countable points, not
12. One surplus plumbing course needs pruning in the source doc, and the LearnWorlds Plumbing
program still sells 11 for $449 and must be updated before `/cpd-tas` goes public.

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

## Queued — NSW Owner Builder pre-launch page (decided 22 Jul 2026, builds after phase 2)

Rather than 301 `/owner-builder-nsw-course` away while the course is on hold, keep the URL live
as a **pre-launch information page**. It holds far more of the NSW equity (pos 9.7, page one)
than a redirect to the hub would, and it has a real product to convert to today.

**Sequencing: after phase 2.** Andrey's call, 22 July. The CPD TAS evidence run goes first, so
this gets built with a proven process. Nothing is at risk meanwhile — both NSW pages are
pre-cutover and noindexed. **But see the cutover race below.**

**Decisions already made** (do not re-litigate; ask only if something has changed):

- **Base:** merge the best of both existing NSW pages — v1's structure plus the `-w` variant's
  deeper research (insurance, resale disclosure, licensed work, the two separate warranty
  clocks). Result lands on the equity slug `/owner-builder-nsw-course`.
- **Primary CTA is the NSW White Card, not the email box.** A White Card is mandatory on every
  NSW owner-builder permit application, and ABE sells it today through a partnership that *is*
  in force. This is what makes the page convert rather than just park.
- **Secondary CTA: an outbound link to a third-party form (Fillout or similar)** for "notify me
  when the course is live". A **link, not an embed** — that keeps every third-party script off
  the page, so the GA4 + Google Ads CWV policy and the CSP are untouched and no Worker endpoint
  is needed. Costs a click; worth it. Flag to Andrey whether the privacy page needs to name the
  form processor (legal pages are placed, never drafted).
- **Schema changes shape, it does not just lose a field.** No `Course`, no
  `EducationalOccupationalCredential`, no `offers` — asserting a purchasable product that does
  not exist is the same class of error as the RTO claim. Use `WebPage`/`Article` + `FAQPage` +
  `BreadcrumbList` + `Person`.
- **"Coming soon" must not appear in the title tag.** It signals unavailability in the SERP and
  kills CTR on transactional queries. Title stays informational and authoritative; the launch
  notice sits in the body, below the answer capsule.
- **No RTO named, anywhere, in any form.** The whole point of the page is that there is not one.
- **Expect gradual ranking decay** and set a review date. An info page satisfies transactional
  intent less well than a course page, so position will drift over months. It holds much more
  than a redirect, not everything.

**⛔ Cutover race — the one thing that can go wrong.** `redirects.csv` marks
`/owner-builder-nsw-course` as `rebuild`, and `/nsw-owner-builder-course` 301s *into* it. If
cutover happens before this page is built, both NSW URLs funnel into a page carrying the false
RTO claim. The row is annotated BLOCKED, but **if cutover is scheduled before phase 2 finishes,
this page jumps the queue** — or the URL needs an interim destination.

**Archetype: extract it on the second one, not this one.** A pre-launch archetype generalises
well (SA/VIC have no products; other courses will go on hold), but building it now is phase 3
work arriving ahead of the demand list. Build the page, then let a second pre-launch page prove
what the archetype needs. Trigger to watch in the phase 3 table: "a non-course page is needed
next".

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
