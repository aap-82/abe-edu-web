# ROADMAP — where this system is, and what comes next

For Claude Code. Read this before starting any phase work. It is the orientation document: it says
what is already true, what is being worked on now, and — importantly — what must **not** be built
yet and why.

Last updated: 3 August 2026.

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

## Current state (4 August 2026)

**The short version.** Phase 1, CPD Stage A and Phase 2 are done, and the authority-model set is
closed. **Wave 3 is complete as of 4 Aug 2026: all five White Card spokes (WA, TAS, NSW, QLD, ACT)
and the `/white-card` hub are built**, the hub un-soon'd for ACT the same session `/white-card-act`
shipped. Phase 3 remains unbuilt, and a fifth trigger has fired (see the table) — the same
session-type crossing as the fourth, sighted a third time, from a `build` session.

- **Added 4 Aug 2026: `/white-card-act` (W3-5)**, the fifth and final White Card spoke — zero legacy
  equity, a genuinely new page. Full formal pipeline, `pipeline/white-card-act/01` through `07`,
  Stage 7 and Stage 9 both graded by independent fresh subagents. RTO partner AlertForce (RTO
  91826); the page's central fact — delivery is **face-to-face in a classroom**, AlertForce's own
  arrangement, never a WorkSafe ACT requirement — is stated correctly across all 8 ASQA disclosure
  locations, re-verified independently. $137 price, no `buyUrl` yet (`#enrol` anchor, same
  `/white-card-tas` precedent). Stage 2 found ~100/mo of "white card online canberra/act" demand
  this course cannot honestly serve; the page answers that directly rather than let a reader
  discover the mismatch after paying. One page-content bug (a duplicated `SectionWayfinder` link)
  caught by Stage 7 and fixed same session. Graded **Amber** — see
  `skill-reviews/2026-08-04-abe-course-page-astro-white-card-act.md`. **One real defect, not
  fixable from a build session:** `CourseLayout.astro`'s `hasCourseInstance.courseMode` is
  hardcoded `"online"` in every course page's JSON-LD — wrong for this page, the first of five
  White Card spokes where that's actually false. The Stage 9 grader also found Stage 7's own
  verification mischaracterised two already-settled design findings and missed a real one (FPO
  placeholders printing visible spec text on this indexable page, a fourth sighting of a known,
  unbuilt guard) — both filed `[skills]` against `verification.md` and the missing build guard.

- **Added 4 Aug 2026: the `/white-card` hub (W3-6), then rebuilt from scratch the same day** through
  the full formal `abe-course-page-astro` pipeline (Andrey's instruction, after an ad-hoc first pass
  had already shipped) — `pipeline/white-card/01` through `07`, Stage 7 and Stage 9 both graded by
  independent fresh subagents. 23/23 guardrails. Stage 2's connector/SERP research reframed the
  intro around delivery mode (the genuine hub-level differentiator no competitor states) and added a
  7th FAQ answering a process-intent gap the research found unanswered. **One real, previously-
  undetected defect, not fixable from a build session:** `HubLayout.astro` cannot tell
  `SourcesFooter` this hub's spokes are ASQA-accredited (the `hubs` schema has no `asqa` field), so
  the built page's sitewide compliance line wrongly states the state-approved-direct disclosure —
  filed `[skills]`+`[design]`. Also carried forward: `HubLayout.astro`'s `.capsule` at ~91 CPL, now
  at least a fifth recorded sighting (`[design]`), and `check-links.mjs`'s stale `/white-card`
  `PLANNED` entry (`[skills]`). Graded **Amber**. See
  `skill-reviews/2026-08-04-abe-course-page-astro-white-card-hub-rebuild.md` — the two earlier
  reviews of the ad-hoc build are marked superseded, not deleted.

- **Pages built and indexable:** QLD, WA, TAS, ACT owner builder, the `/owner-builder-courses` hub
  (59.9k impressions, the biggest single equity-protect page), **`/white-card-wa`** (39.9k
  impressions, the biggest White Card asset), `/white-card-nsw`, `/white-card-tas`, plus
  `/accreditation`, `/experts`, `/reviews`, `/cpd`, `/cpd-tas`.
- **Added 3 Aug 2026: `/white-card-qld`** (W3-3, commit `b36d8b4`) — built, indexable, delivered as a
  live Connected Real Time Delivery (CRTD) session, not self-paced, correcting a live competitor
  misconception (a superseded "100km rural exception" claim) with WHSQ's own Conditions of Agreement.
  Graded **Amber** by an independent Stage 9 subagent: authority model and regulatory facts are
  correct throughout, but the run had to edit design-owned `SiteHeader.astro` to satisfy the
  orphan-page guardrail (see the Phase 3 trigger table — third sighting, first undisclosed until the
  grader found it) and skipped `check-claims.mjs` at Stage 7 (fixed with an addendum once caught). No
  `buyUrl` confirmed; every CTA is the in-page `#enrol` anchor. Mid-build, an initially-confirmed $99
  price was superseded by the real Blue Dog timetable ($109 weekday / $169 Saturday) — every
  occurrence was corrected, confirmed clean in the built page.
- **All five ABE White Card delivery-mode rows are now regulator-sourced**, closed in one 3 Aug facts
  session: TAS and ACT (WHS Regulations silent on delivery mode entirely — no restriction, but also no
  affirmative permission, unlike WA which has a real, if dated, WorkSafe WA notice permitting online
  delivery) and WA's own delivery-mode column (previously only its eligibility test was source-read).
  `/white-card-tas`'s "Tasmanian residents only" wording is now known to be unsourced to either the
  regulator or the Regulations — flagged `[build]`, not yet fixed. The same session found AlertForce's
  "Silica Awareness" resell (named in CLAUDE.md) doesn't exist under that name and isn't national —
  flagged `[skills]`.
- **Added 1 Aug 2026: `/white-card-nsw`** (W3-2, PR #103) — built, indexable, **no purchase path**,
  the `/white-card-tas` pattern. There is no NSW White Card product in LearnWorlds at all, so every
  CTA is the in-page `#enrol` anchor. Both image slots are FPO.
  Two things this run changed outside its own page, both worth reading before the next one:
  **`/owner-builder-nsw-course` was noindexed** — it rendered `index,follow` while this file and
  CLAUDE.md both said it was noindexed, and only the `-w` variant ever was. That closed a cutover
  risk and opened a redirect one: `/nsw-owner-builder-course` now 301s into a noindexed page, so it
  sits in `check-redirect-targets`' PENDING list. Those two URLs carry **38,257 impressions** and
  their cutover fate is an open commercial decision, filed as a `[build]` demand item.
  The NSW **delivery-mode** position is now settled as a recorded exemption (2 Aug 2026,
  `online-delivery-policy-by-state.md` §2A-1) — do not reopen it.
- **Published with two standing warnings:** **`/white-card-tas`** — indexable since 28 Jul on
  Andrey's call. Both are **warnings, not blockers**: the page ships, and neither holds up cutover.
  1. **No purchase path.** TAS payment is not configured, so every CTA is the in-page `#enrol`
     anchor. Deliberate: the legacy URL holds real equity (7,092 impressions, position 11.81) and
     the page answers the query, so it earns its place ahead of the checkout. It is nonetheless the
     only live page that cannot be bought from — wire the buyUrl as soon as payment exists.
  2. **The page states $59; a live checkout charges A$39.** Downgraded from the blocker list on
     Andrey's call, 28 Jul. Evidence kept because it stays actionable:
     `/payment?product_id=white-card-tas&type=course` renders a working order at **A$39**, and
     LearnWorlds corroborates exactly (A$117 across 3 payments). WA was checked as a control first,
     since an average hides discounts — A$5,155 over 60 payments averages A$85.92 against a $99
     list — so the TAS figure was confirmed to be the **list price at checkout**, not an average.
     The cost section derives from it: $59 + $13.72 = $72.72 today, $52.72 at the real price. Either
     the $39 product is legacy and should be retired, or the page is wrong. Andrey's call, whenever
     he wants it.
- **Built but held back:** `/cpd-building-tas`, noindexed pending Andrey-only inputs.
  `/owner-builder-nsw-course` and its `-w` variant are built, noindexed, and ⛔ must not ship in
  their current form.
- **Not started:** W2-6 insurance, W2-7 Project Advisory, **`/white-card-act` (W3-5) and the
  `/white-card` hub (W3-6)** — both unblocked as of 3 Aug, neither built — eight of ten CPD tickets,
  and all of Waves 5 and 6.

**Everything that needs Andrey, in the order it bites:**
1. **W4-9 plus the Electrician 12-point bundle price** — blocks `/cpd-tas` shipping, which blocks
   five signed-off redirect rules.
2. **`/white-card-wa` cutover gates** — two generated images (prompts and exact filenames in
   `pipeline/white-card-wa/06-image-prompts.md`; both slots currently render FPO placeholders that
   print their own art direction as body text), and confirmation that **`/payment` is served at the
   deploy origin** — it is live on the legacy origin but absent from the Worker's asset set, so all
   four CTAs are dead on staging. Neither blocks staging; both block the real domain.
**`/white-card-tas` is no longer on this list.** Its two open items are **warnings, not blockers**,
and live with the page in the state list above. Three things previously tracked here as White Card
TAS blockers are simply done: the two photos landed in `src/assets/images/` on 27 Jul, and all three
RTO contacts carry a verified email and phone in `src/content/partners/`, checked at source 28 Jul.

**The `/white-card` hub is not fully gated on its spokes, and that was found 2 Aug 2026.** The
`hubs` schema types `spokes[].course` as a `reference('courses')`, which does fail Zod if a hub names
a page that doesn't exist — but `spokes` itself is `z.array(...)` with **no minimum length**, and
`comparison.columns[]` already carries a `soon: z.boolean()` flag `ComparisonTable.astro` renders as a
non-linked "Coming soon" cell. The hub was designed for partial coverage; it does not need all five
spokes built first, only the ones it names as built. As of 3 Aug it is blocked on nothing — build it
with ACT (W3-5) as the one remaining "Coming soon" column, in either order.

**No standing FAILs (3 Aug).** `system-health` reports 0 FAIL (beyond the expected, momentary
"07 not committed" a page carries between its Stage 9 review being written and its commit landing).
The session-types pre-flight rule governs this: a red pre-flight ends the session rather than being
repaired mid-run.

**Superseded the next day. 2 standing FAILs as of 4 Aug 2026, both tracked, neither a surprise.**
(1) The `manual_fix_passes` trend, worsening since the `/white-card-qld` Stage-9 review — already
routed as todo items 9 and 10 below (both now closed, see next paragraph). (2) A new, deliberate one:
`check-positions` (below) surfaces `/white-card-tas`'s unsourced "Tasmanian residents only" claim,
which was already a filed `[build]` item and simply had no mechanical check pointed at it until
today. `system-health` red at pre-flight still ends a session per rule 1 — the difference here is
that the red is informative rather than a defect in the check.

**A skills session closed three todo items 4 Aug 2026, none of them a page.** Commit `1b6ff50`
(merged `9f15a90`):
- **Item 5 — `check-positions.mjs` built.** Reconciles a page's claim about delivery mode or
  authority model against `kb/register/`, the same job `check-claims` does for dollar figures.
  Two mechanisms: a hand-curated `POSITIONS` table (delivery-mode banned phrasings, each citing the
  register assertion it contradicts) and a re-application of `guardrails.ts`'s
  `FORBIDDEN_BY_AUTHORITY` list to the nav data — the one place that check structurally cannot
  reach, since it excises the whole `<header>` from every page it audits. Wired into
  `system-health.mjs` as a fifth check, named in `SYSTEM.md` §5. DoD met on the first run: it FAILs
  on 12 locations across 5 files, 4 of which no prior session had named — including the header's own
  TAS nav card (at the time, `SiteHeader.astro`'s own; see 4 Aug below for where it lives now). See
  `skill-reviews/skills/2026-08-04-check-positions.md`.
- **Item 9 — Stage-0 provenance gate.** Added to Recipe A step 1
  (`new site/abe-migration-implementation-plan.md`) and mirrored into the skill's own Stage 1
  (`content-pipeline.md`): before Stage 3, every ledger row must be regulator-sourced against the
  register's own primary/secondary split; an industry-guide or `UNVERIFIED` row goes to a facts
  session first. Second occurrence of the risk (NSW built a full page on a row that reversed at
  Stage 9; QLD's equivalent row was read first).
- **Item 10 — four path-ownership assignments** in the session-types table (`CLAUDE.md`):
  `src/integrations/guardrails.ts` and `.gitignore` → skills, `src/layouts/**` → design, and the five
  top-level `new site/*.md` planning docs → skills (found while making the item 9 edit). The
  `.gitignore` gap itself is fixed — `new site/reference/**/*.xlsx`/`.xls`/`.csv`, recursive and
  scoped so `redirects.csv` stays tracked. See
  `skill-reviews/skills/2026-08-04-provenance-gate-and-path-ownership.md` for the two real defects
  the session caught in its own first pass at that fix (dropped `*.pdf`/`*.docx` rules, then a
  too-shallow `*.xlsx` pattern) before it shipped.

**A second skills session the same day, 4 Aug 2026, closed the repo's oldest fired trigger plus six
already-fixed demand items nobody had gone back to strike.** Commit `73b01d4` (merged `63a78a1`):
- **`demand-split.mjs`'s header-units mismatch, fixed.** `openCount` was deduplicated by near-miss
  key, `closedCount` was a raw sum of struck lines — third-plus sighting (filed 30 Jul, 1 Aug,
  2 Aug). A new `bucketItem()` helper applies the same dedup to both. Measured: `design` 39→38
  closed, `facts` 13→12, each exactly one genuine duplicate-closure pair. See
  `skill-reviews/skills/2026-08-04-demand-split-header-units.md`.
- **Six already-shipped fixes, closed in their source reviews for the first time**: the
  `guardrails.ts`/`src/layouts/**` ownership gaps (fixed by item 10 above, never struck),
  `check-positions`'s SiteHeader scope (built by item 5, never struck), and the Stage-0 gate /
  `.gitignore` items (built by item 9/10, never struck). Found by re-reading
  `reports/handover-skills.md` against current code rather than assuming the backlog was current.
- **`SiteHeader.astro`'s nav data split into `src/data/nav.ts` — the oldest fired trigger in the
  repo, filed four times since 28 Jul** ("a build session must edit design-owned `SiteHeader.astro`
  to ship any page"). `navGroups`, `utility` and `studentPortal` (plus their five type interfaces)
  moved into a new build-owned data file; the component keeps only render logic. Verified
  byte-identical `dist/index.html` before and after via `git stash`. `check-positions.mjs`'s
  SiteHeader mechanism repointed at the new file in the same change, or it would have silently
  stopped finding anything. **A disclosed session-type crossing**: this session was declared
  `skills`, whose table forbids `src/components/**` outright; done on Andrey's explicit instruction
  after the crossing was named and the alternative (leave it unbuilt) was offered. Graded **Amber**
  for the crossing, not the fix. See `skill-reviews/skills/2026-08-04-siteheader-nav-split.md`.
  `src/data/**` assigned to build in the same pass — a gap named twice before, made load-bearing by
  this split needing a file in it.

Skills backlog across both sessions: **111 → 99 open** (`reports/handover-skills.md`).

### Where this stood on 22 July (kept — the phase-1 close-out)

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
- **No page had yet been built through the pipeline** *(true on 22 Jul; superseded — three runs have
  since exercised the archetypes, the section briefs, the craft method and the independent grader).*

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

Delivered: `kb/register/` and `kb/rules/`, `kb/content-source-map.md` as the index,
`kb/mistakes-log.md`, `CLAUDE.md` constants, the GSC export folder (then `data/gsc/`, now
`business data/GSC/`), the reworked skill with 12 archetypes and
the craft method, `skill-reviews/_TEMPLATE.md`, and the first four scripts — `check-freshness`,
`check-claims`, `review-trends`, `system-health`. (File and script counts were written in here as
literals and both had gone stale by 29 Jul; counts belong in `system-health`'s output, which computes
them, not in a phase record nothing reads against disk.)

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

## Phase 2 — the evidence run ✅ done 23 July 2026, verdict Amber

`/cpd-building-tas` was built end to end through `abe-course-page-astro`. Artefacts in
`pipeline/cpd-building-tas/`. Review:
`skill-reviews/2026-07-23-abe-course-page-astro-cpd-building-tas.md`, graded by a fresh subagent that
saw only the artefacts and the built HTML.

**The run produced 01, 02, 03, 04 and 07 only.** 05 and 06 were written afterwards, and their absence
was not cosmetic: with no brief-to-section map, a section briefed at Stage 3 and written at Stage 4
was lost on the way to the page and sat undetected through the build, the guardrails, `check-claims`
and the independent grading. No image prompts were produced either. Both gaps are now closed, and
`check-pipeline.mjs` exists so the next run cannot repeat them.

**Verdict Amber. `correct_and_safe` amber, `passed_gates_first_time` red.** The page does not ship
yet: `buyUrl` is unverified, and the coverage claim needs either the WHS classification imported or
the headline capped at what is verifiable.

**What the run proved about the pipeline, which is the point:**
- **Self-certification does not work.** Stage 7 ticked five rows the built HTML fails, two of them
  defects introduced by fixes recorded on that same page as complete. The independent grader found
  them in twenty minutes from the artefacts alone.
- **The checks already fired and nobody read them.** `check-claims`, `check-freshness` and
  `system-health` all raised warnings naming this exact slug. None reached the verification table.
  The gap was unread signal, not missing signal.
- **A page can be invisible to its own guardrails.** No declared authority model meant the JSON-LD
  and authority-language checks never ran, and the build was green because the page had not said
  what it was.
- **Derivation worked exactly where it was wired**, and the typed "twelve" in title, meta, H1,
  sticky and intro is unprotected by it.

**The demand list is in the review** and is the input to phase 3. Five entries, each with evidence.

---

## Phase 2 — the evidence run (original brief, kept for reference)

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

## Evidence runs 2 and 3 — the authority-model set is closed ✅ 23 July 2026

Phase 2 exercised one authority model. Two more runs were added deliberately, chosen for **variance
over volume**: one page per remaining model, each verifying the fact that distinguishes it. The set
is now closed and there is no third thing to learn from a fourth run of the same shape.

| Run | Page | Model | What only this model could prove |
|---|---|---|---|
| 1 | `/cpd-building-tas` | state-approved-direct | regulator in `recognizedBy` |
| 2 | `/white-card-tas` | asqa-accredited | **RTO** in `recognizedBy`, and the RTO is the developer |
| 3 | `/wa-owner-builder-course` | knowledge-requirement | **no** `recognizedBy` at all |

Artefacts in `pipeline/{slug}/`, reviews in `skill-reviews/`. Both new runs graded **Amber**; run 3
scored **red on `passed_gates_first_time`**.

> **`/white-card-wa` (28 Jul) is not a fourth evidence run.** It is Wave 3 production work on an
> authority model run 2 already closed, and it is graded like any other page —
> `skill-reviews/2026-07-28-abe-course-page-astro-white-card-wa.md`, Amber, independent grader,
> **red on `passed_gates_first_time`**. Read it for the demand list, not for evidence about the
> archetype set. It did confirm one thing about the process: the independent Stage-7 auditor found
> four ship blockers the author had not, which is now 4/4 for independent grading over
> self-certification.

**Run 2 found an authority-model breach the guardrails could not see.** The page credited an ABE
person as developer of an RTO-developed accredited course — a real E-E-A-T and ASQA error — and every
check passed, because the guardrails tested "ABE is not an RTO" *language* and never asked **who
developed the course**. The shared expert record's own header comment already warned against it. Now
enforced: an asqa page carries exactly one Person (the reviewer), credits the RTO via `Course.creator`
+ `recognizedBy`, and a Person titled "developer" FAILS the build. Adding the guard immediately caught
the same breach on both NSW pages. Mistakes-log #16.

**Run 3's finding is about ordering, not content.** Stage 7 ran 45 minutes *after* two commits had
already deployed a live indexed page, so the gate gated nothing — and the defect it exists to catch
(a review date updated in the MDX but not in `src/data/faqs-wa.ts`, so the published page contradicted
itself) was live for ~54 minutes. `check-pipeline.mjs` §4 now compares commit times and FAILs a slug
whose page source is newer than its `07`. On its first run it caught a real historical case.
Mistakes-log #19.

**Run 3 also produced the session's most useful lesson, twice over.** Two audit findings asserted a
fact was *absent* from a regex structurally incapable of finding it — the second one proposed removing
correct, sourced content from a live page and wrote the falsehood into `kb/register/`. Caught by
Andrey, not by any check. The meta-lesson is the one that matters: writing "greps prove presence,
never absence" into an artefact did **not** prevent the repeat ninety minutes later. A lesson recorded
as prose is not a method change. Mistakes-log #18.

### What three runs decided about Phase 3

Three independent runs is enough signal to settle the candidate list rather than keep it open:

- **Keep artefacts-as-files and the independent grader.** Confirmed 3/3. The grader found in twenty
  minutes what self-certification missed every time.
- **Do not build `fact-verifier` or `keyword-analyst`.** Refuted 3/3 — neither flooded context in any
  run. Their triggers have now had three chances to fire and have not.
- **Do not split the skill.** Never triggered in three runs.

That leaves the three candidates whose triggers *did* fire, none of which is built yet (checked
24 Jul, not assumed): the `page-auditor` subagent, the per-slug warning filter, and the
fail-on-undeclared-authority guardrail. Stage 7 is run as a fresh subagent by convention, which is
the practice but not the mechanism.

**What did land instead, earned by the runs rather than planned:** the asqa Person/developer rule,
`check-pipeline.mjs` §4 gate-ordering, a superseded-unit-code check (`CPCCWHS1001` was live on two
indexed pages), and a company-name check ("ABE Education", never bare "ABE" — 133 occurrences were
live). Each exists because a run produced the failure it prevents, which is the sequencing this
roadmap was built to enforce.

---

## Phase 3 — structure on demand 🔓 unblocked 23 July 2026, five triggers have fired

Phase 2's demand list now exists, so the gate is open for **the candidates it names and no others**.
Five triggers have fired. The first three have evidence in
`skill-reviews/2026-07-23-abe-course-page-astro-cpd-building-tas.md`; the fourth was earned on
28 July and has already recurred; the fifth was earned on 1 August across three boundary crossings in
two sessions on the same day.

| Candidate | Trigger | Evidence |
|---|---|---|
| **`page-auditor` subagent** | "the audit wanted its own context, or graded inconsistently" | Stage 7 ticked five rows the built HTML fails. Runs as a fresh subagent given only `dist/{slug}/index.html`, and reports a **measured value per row**, never a tick. |
| **Per-slug warning filter** | not on the original candidate list; earned by the run | Three scripts raised warnings naming the slug; none was read. A `--slug` filter turns existing signal into used signal, with no new checks. |
| **Guardrail: fail on undeclared authority** | "a rule was violated that a hook would have caught" | A page in a course or bundle collection with no `authority` silently skips the checks that model triggers. |
| **Session-type path check** ⭐ **4 crossings, 3 sessions, two days — authorised, still unbuilt** | not on the original list; earned 1 Aug 2026, recurred 3 Aug | **Nothing compares a commit's touched paths against the declaring session's may-write list.** A design session committed `scripts/check-redirect-targets.mjs` via cherry-pick (`3d9cc44`) and never flagged it; the same session edited `.claude/launch.json`; a skills session edited `public/robots.txt`. Only the last two were flagged, and the `scripts/` one surfaced solely because Andrey asked, hours later, whether it was a design session. The cherry-pick is the instructive case: **an edit arriving via cherry-pick, merge, revert or rebase is still an edit by the session that runs it**, and that is the case the human eye skips, because the paths scroll past in tool output rather than being typed. **A fourth crossing, 3 Aug 2026: a `build` session edited design-owned `SiteHeader.astro`** to satisfy the orphan-page guardrail while shipping `/white-card-qld` — the identical crossing `white-card-wa` (28 Jul) and `white-card-nsw` (1 Aug) both made, each disclosed at the time. This one was not disclosed in any of the run's own pipeline artefacts and was found only when an independent Stage 9 grader ran `git status` — see `skill-reviews/2026-08-03-abe-course-page-astro-white-card-qld.md`. Mechanically trivial — given a session type and a commit range, diff touched paths against the table in `CLAUDE.md`. **Build it as advisory, not a flat FAIL:** several paths are deliberately unassigned (`worker/`, `wrangler.jsonc`, `astro.config.mjs`, `.github/**`, `package.json`), so an unassigned path must report differently from a wrong-owner path or the check goes red on work no session may fix — the ratchet lesson. Filed by `skill-reviews/design/2026-08-01-modulerows-faq-parity.md`, and now a fourth time by the QLD review above. |
| **Headless width check over `dist/`** ⭐ **2 occurrences — build it** | not on the original list; earned 28 Jul, recorded twice the same day | **Nothing in the repo can see a horizontal scrollbar.** A 90px sideways scroll at 320px survived a green build, 20/20 guardrails, `check-claims` 0 failing and an independent Stage 7 audit, on every page rendering `PartnerDisclosure`. It had **three** independent causes (a `1fr` grid track that could not shrink, an `inline-flex` eyebrow that could not wrap, and a header row 14px too wide), so a one-off fix would not have held. Filed by both `2026-07-28-abe-readability-audit-white-card-wa.md` and `skill-reviews/design/2026-07-28-reflow-spacing-and-tap-targets.md`. |

Not yet triggered, and still gated: splitting the skill, `fact-verifier`, `keyword-analyst`,
`token-lint`, event-driven Stage 1 verification.

**Still unbuilt after the 29 Jul system audit, deliberately** — re-checked against disk, not assumed:
the **`page-auditor` subagent** and the **fail-on-undeclared-authority guardrail** (both triggered, both
still candidates), and the **headless width check** — which is at two occurrences and authorised, but
needs playwright or puppeteer in `package.json`, so it was raised with Andrey and held as a separate
ask rather than folded into an audit session.

### Ready to build now, authorised by a second occurrence (ROADMAP rule 3) — ✅ both built 29 Jul 2026

- ✅ **`becomeSteps` is optional in `content.config.ts`.** An owner-builder-shaped required field with
  no archetype-2 meaning; every White Card page stubbed it `[]`. Filed by the `white-card-tas` run and
  again by `white-card-wa`. Built by the system audit (`content.config.ts` is skills-owned, so the
  build session that filed it could not). The two `[]` stubs are still in the two MDX files — that half
  is build-owned and is routed as a `[build]` item.
- ✅ **The `--slug` filter** — on `check-claims`, `check-pipeline` and `check-links`, sharing
  `scripts/lib/slug-filter.mjs`. Deliberately **not** on `check-freshness`: its unit is a register file,
  shared across pages, so a filter there could hide a lapsed fee from the page depending on it. A
  filtered run prints the repo-wide totals underneath, labelled, so it can never be mistaken for a
  whole one. Stage 7 now opens by running all three (`references/verification.md`).

### Ready to build now, authorised by a second occurrence (ROADMAP rule 3) — ✅ built 4 Aug 2026

- ✅ **`check-positions.mjs`.** `check-claims` reconciles figures (dollar amounts) against
  `kb/register/`; nothing reconciled positions (delivery mode, authority model, "nationally
  recognised" status) until now. Named directly in `handover/HANDOVER-todo-2026-08-02.md` item 5,
  citing three defects that each survived a green build, 21/21 guardrails and `check-claims` 0
  failing: `/white-card-nsw`'s now-corrected delivery-mode misattribution, the NSW Owner Builder nav
  card's authority claim, and `/white-card-tas`'s unsourced "Tasmanian residents only" framing — the
  last of which the check still FAILs on, by design (see Current state above). Full detail:
  `skill-reviews/skills/2026-08-04-check-positions.md`.

### Also built 29 Jul 2026, by the full system audit

Not on the candidate list; earned the same way the asqa Person rule and the superseded-unit check were.

- **Governance-doc dangling-reference check** (`system-health`). The check that enforces "every path
  resolves" read `.claude/skills/**` only, so the rule documents were the only files exempt from the
  rule they state. Six dead pointers were surviving clean runs. Counted separately from `skillRefs` so
  the existing health-log series keeps its meaning. See mistakes-log row 1, tenth sighting.
- **Demand routing made recursive, and `build` added as the fourth destination.** Ten design reviews
  and ~35 demand items were invisible to `demand-split` and to the unrouted counter, so the
  second-occurrence rule was being computed from a partial set — several items sat at two and three
  occurrences without surfacing. New mistakes-log **row 24** for the class.
- **Stage-7 verification scope** (`check-pipeline` §5). The three mandated sub-skill audits must be
  named in `07-verification.md`, run or not. Four occurrences on the demand list, guard prose-only
  until now (mistakes-log #14). It FAILs `white-card-wa` on real data — a true positive and an open
  `[build]` item, the same standing as the `cpd-building-tas` gate-ordering FAIL when §4 shipped.
- **Three `CLAIMS` entries** in `check-claims` (8 → 11), giving the corrected doc claims a reader.

### Also earned on 28 July, first occurrence only — record, do not build yet

- **`check-pipeline` conformance is capsules and section ids only.** A `BundleOffer`, an `h3`
  subhead, an inline link or a CTA microcopy string can differ between `04-content.md` and the page
  with every gate green. This is the phase-2 defect class inverted: phase 2 *lost* briefed content on
  the way to the page; `white-card-wa` *gained* content the artefact never recorded, and it was
  Andrey who noticed, not a check.
- **"Enrol now" is banned by name in `verification.md` §1f and `SKILL.md`, and shipped anyway** on
  four CTAs, and is still live on five other built pages. A rule enforced only by a Stage-7 audit is
  a rule pages ship without.

**Everything below remains a candidate list, not a plan.** These are candidates
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
  may never edit `guardrails.ts`, the human-gates section of `CLAUDE.md`, or any Claude Code hook —
  none of which exist yet, so that last limb binds forward rather than describing something present.
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
- **One session, one type.** Declared at the start, fixed for the session; each type has its own
  may-write scope and pre-flight. See `CLAUDE.md` → Session types.

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

---

## Preventing the phase-2 defect class

Every defect the phase-2 run produced **survived a green build**: a briefed section vanished, a
prop contract broke silently, a page skipped half its guardrails by not declaring what it was, and
an audit ticked five rows the built HTML fails. The gates checked structure; nothing checked
intent against output.

Three changes address that, in order of leverage.

1. **`check-pipeline.mjs` — built 23 July, wired into `system-health`.** Asserts every stage
   artefact exists, and that the section ids in `05-components.md` and the built page match in both
   directions. Verified against the real defect: removing `#how-long` from `dist/` produces
   `FAIL — section(s) planned in 05 but absent from dist`. This is the lesson made mechanical, and
   it is the only one that cannot be forgotten.
2. **Stage 7 runs as a fresh subagent reading only `dist/`, reporting measured values.** Specced in
   `SKILL.md`. A tick is a claim about output made from memory of intent; the author of the copy
   cannot see the copy.
3. **Warnings surfaced per slug.** `check-claims`, `check-freshness` and `system-health` all raised
   page-relevant warnings on the phase-2 page that never reached its audit. Zero failing is not
   zero findings.

**Still open, and worth doing:** make an undeclared authority model a build failure rather than a
silent skip (mistakes-log #10). Absence is currently the quiet state, which is the dangerous one.

**Two more members of the same class, found 28 July.** Both survived every gate:
- **Nothing renders the page**, so no check can see a horizontal scrollbar, a 9px badge or a 26px tap
  target. Now a Phase 3 candidate with two occurrences.
- **`check-pipeline` compares capsules and section ids, and nothing else**, so a component block
  added to a page after Stage 4 never has to appear in the artefact that supposedly records it.

**The principle underneath all of it:** a green check proves consistency, never correctness. Where a
check can only be satisfied by a human assertion, it is not a check.
