# HANDOVER — prioritised to-do list, 2 August 2026

## Status: IN PROGRESS — 11 of 14 addressed, all fully closed, 3 still open (12, 13, 14)

Closed 9 (item 1, in full — the claim it named turned out to be three separate defects across three
pages, not one; items 2, 3 and 4, the TAS/ACT/WA delivery-mode reads, commit `014287a`; item 7, the
QLD White Card build, commit `b36d8b4`; items 5, 9 and 10, a skills session's `check-positions`
guardrail, Stage-0 provenance gate and path-ownership fixes, commit `1b6ff50`/`9f15a90`, shipped and
deployed 4 Aug 2026; item 11, closed 4 Aug 2026 — one part evaluated and rejected on the code, one
part fixed same day as this line, its last remaining piece a staleness signal explicitly deferred,
not rejected, see below). Closing items 2-4 also unblocked items 8 and 15, which item 7's
build then left genuinely open (not built). The remaining 5 items (8, 12, 13, 14, 15) are untouched:
this file stays open.

**2-4 closed 3 Aug 2026, commit `014287a`.** All three delivery-mode reads landed in one facts session:
- **Item 2 (TAS):** `skill-reviews/facts/2026-08-03-tas-git-delivery.md`. WorkSafe Tasmania and the WHS
  Regulations 2022 (Tas) impose no delivery-mode restriction at all. `/white-card-tas`'s "Tasmanian
  residents only" wording is unsourced to either — **not fixed here** (facts session, `kb/register/**`
  only); filed as a `[build]` item in that review and still open below the fold in
  `reports/handover-build.md`.
- **Item 3 (ACT):** `skill-reviews/facts/2026-08-03-act-delivery-and-alertforce-scope.md`. Same finding
  as TAS. No page-copy fix needed — existing wording already attributes the mode to AlertForce, not the
  regulator. Also confirmed AlertForce's actual course codes: Asbestos Awareness (11084NAT) is national
  as CLAUDE.md assumes, but "Silica Awareness" doesn't exist as named — the real course (10830NAT) is
  **not** national either (missing WA/SA/NT). Filed as a `[skills]` item for CLAUDE.md/
  `authority-model.md` reconciliation.
- **Item 4 (WA):** `skill-reviews/facts/2026-08-03-wa-git-delivery.md`. Same regulation-silence pattern,
  but backed by a real (if decade-old) WorkSafe WA notice permitting online delivery. All five ABE
  White Card delivery-mode rows are now regulator-sourced. No page fix needed.

**7 closed 3 Aug 2026, commit `b36d8b4`.** `/white-card-qld` built end to end, all 9 stages, artefacts
in `pipeline/white-card-qld/`. Graded **Amber** by an independent Stage 9 subagent —
`skill-reviews/2026-08-03-abe-course-page-astro-white-card-qld.md`. Not Green for two process reasons,
neither a regulatory error reaching a reader: `check-claims.mjs` was never run at Stage 7 (fixed with an
addendum to `07-verification.md` once caught); and the build had to edit design-owned
`SiteHeader.astro` to satisfy the orphan-page guardrail — the **third sighting** of that exact
crossing, and the first not disclosed anywhere in the run's own artefacts until the grader found it via
`git status`. Both are filed below, tagged `[skills]`. Mid-build, the confirmed $99 price was
superseded by Andrey supplying Blue Dog's real timetable ($109 weekday / $169 Saturday); every
occurrence was found and corrected, confirmed zero stray `$99` in the built page. No `buyUrl`
confirmed — every CTA uses the in-page `#enrol` anchor, per the `/white-card-tas` precedent.

Additional work landed this session that is **not** on this list at all — three build-session
image-wiring commits and the full image-generation brief for the site's remaining FPO placeholders.
See `handover/HANDOVER-image-prompts-2026-08-02.md` and the session's own skill-reviews for that
track; it does not close anything below.

**A second, later skills session on 4 Aug 2026 (after items 5, 9 and 10 above) closed the repo's
oldest fired trigger and six other already-fixed demand items, none of it on this list either.**
`demand-split.mjs`'s header-units mismatch (filed three times, closed for good this time); the
`guardrails.ts`/`src/layouts/**` ownership gaps; `check-positions`'s SiteHeader scope and the
Stage-0 gate/`.gitignore` items that were built but never struck in their source reviews; and the
main event — `SiteHeader.astro`'s nav data split into `src/data/nav.ts`, filed four separate times
since 28 Jul as "a build session must edit design-owned `SiteHeader.astro` to ship any page."
Verified byte-identical rendered output before/after. A disclosed session-type crossing
(`src/components/**` and `src/data/**`, both outside a skills session's table), done on explicit
instruction after being named. See `skill-reviews/skills/2026-08-04-demand-split-header-units.md`
and `skill-reviews/skills/2026-08-04-siteheader-nav-split.md`; skills backlog went 111 → 99 open
across the two sessions.

This is a hand-written note (a source, not a derived view). It is **not** a substitute for
`reports/handover-{skills,design,facts,build}.md`, which `demand-split` regenerates from the demand
lists and which remain the complete backlog. This file carries the two things a demand list cannot:
**an order**, and **the reasoning for that order**.

Close each item by striking it through here with its PR number, and close the file with a
`## Status:` line naming the SHAs when the last one lands.

**Provenance.** Derived from the position assessment of 2 Aug 2026, which was built from
`system-health` (0 FAIL / 14 WARN), a green `npm run build` (21 pages), `ROADMAP.md`,
`new site/abe-migration-implementation-plan.md` §9, the four regenerated `reports/handover-*.md`,
the 1 Aug facts and Stage-9 reviews, and direct reads of `dist/`. Facts stated about the build were
measured, not carried in.

**Three items from that assessment are already closed and are not repeated below:** the
`/white-card-nsw` page-versus-register conflict and the `authority-model.md` contradiction (PR #114,
settled as a recorded exemption), and the QLD delivery verification (PR #115, which came back
favourable and unblocked item 7).

**The ordering principle:** no build session starts on a fact the register itself flags as
UNVERIFIED. That is the direct lesson from the NSW run, which built a complete page, reached Stage 9,
and only then had the fact reverse underneath it.

---

## Do first — unblocked, in value order

- [x] ~~**1. `[build]` Fix the NSW nationally-recognised claim on `/owner-builder-courses` — P0**~~
  Closed `b67234e`, `e1ecd6b`, `bf12c24`. Bigger than scoped: the claim was in **eight** places on the
  hub alone, not three (including a frontmatter comment instructing future editors to keep asserting
  it), plus the same claim in `SiteHeader.astro`'s shared nav — 17 built pages, 13 `index,follow` —
  plus `src/content/partners/upskill-institute.md`'s blurb and `scopeNote`, live on two more indexable
  pages including `/white-card-nsw`. Each commit's own fix surfaced the next. NSW now renders as a
  `soon` column on the hub with no link and no data; the nav entry is inert; Upskill is credited with
  the White Card only. Zero indexable pages now carry the claim. Still on disk, unchanged, `noindex`,
  blocked on Andrey's call (item 14.2): `owner-builder-nsw-course.mdx`, its `-w` variant, and
  `src/data/nsw-w.ts`.

- [x] ~~**2. `[facts]` Read the TAS delivery row at WorkSafe Tasmania**~~
  Closed `014287a`. See `skill-reviews/facts/2026-08-03-tas-git-delivery.md` and the Status block above.

- [x] ~~**7. `[build]` Build `/white-card-qld` (W3-3)** — unblocked 2 Aug 2026~~
  Closed `b36d8b4`. See `skill-reviews/2026-08-03-abe-course-page-astro-white-card-qld.md` and the
  Status block above.

- [x] ~~**5. `[skills]` Build a `check-positions` guardrail**~~ Closed 4 Aug 2026, commit `1b6ff50`,
  merged `9f15a90`. `scripts/check-positions.mjs` — a `POSITIONS` table (delivery-mode banned phrasings, each citing
  the register assertion it contradicts) plus a second mechanism re-applying `guardrails.ts`'s
  `FORBIDDEN_BY_AUTHORITY` to `SiteHeader.astro`'s own nav data, the one place that check cannot
  reach (it excises `<header>` from every page it audits). Wired into `system-health.mjs` as a
  fifth check beyond `check-freshness`, and named in `SYSTEM.md` §5 so `check-claims`'s own
  claim-drift check does not immediately fail on it.
  **DoD met on the first run, not manufactured for the review:** it FAILs on `/white-card-tas`'s
  unsourced "Tasmanian residents only" framing, unfixed since the 3 Aug facts session — 12 places
  across 5 files, **one of which is new**: `SiteHeader.astro:64`'s own nav card carries the same
  wording, which the facts session's 7-location count never saw because it only read
  `white-card-tas.mdx` and its FAQ. See `skill-reviews/skills/2026-08-04-check-positions.md`.

- [x] ~~**3. `[facts]` Read the ACT delivery row at WorkSafe ACT**~~
  Closed `014287a`. See `skill-reviews/facts/2026-08-03-act-delivery-and-alertforce-scope.md`. Unblocks
  item 8, moved up below.

- [x] ~~**4. `[facts]` Read the WA delivery row at WorkSafe WA**~~
  Closed `014287a`. See `skill-reviews/facts/2026-08-03-wa-git-delivery.md`. Unblocks item 15, moved up
  below.

- [x] ~~**15. `[build]` Build the `/white-card` hub with QLD and ACT as "Coming soon"**~~ Closed
  4 Aug 2026, **committed `7ea0300`, pushed to `main` at `52b16b9`, Workers Builds deploy
  succeeded (`ed7a1391-d913-41b2-ae76-3342b4362b89`) — live.** **Rebuilt from scratch the same
  day**, through the full formal
  `abe-course-page-astro` pipeline (Andrey's explicit instruction, after the first pass below had
  already shipped ad-hoc) — artefacts `pipeline/white-card/01` through `07`, Stage 7 verified and
  Stage 9 graded by independent fresh subagents rather than self-graded. Built with **WA, TAS, NSW
  and QLD live**, four spokes as `reference('courses')`, ACT as a `soon: true` comparison column
  only, same treatment `/owner-builder-courses` gives NSW. `src/data/nav.ts`'s White Card Hub entry
  wired to `/white-card`; all four spoke pages' breadcrumbs restored to the 3-level form. Build
  23/23 guardrails. Stage 2's connector/SERP research changed Stage 3/4: reframed the intro around
  delivery mode as the genuine differentiator (no competitor surfaces it) and added a 7th FAQ
  answering the "how do I actually get my card" process intent Stage 2 found unanswered. See
  `skill-reviews/2026-08-04-abe-course-page-astro-white-card-hub-rebuild.md` (Amber, independently
  graded) — the two earlier reviews of the ad-hoc build are marked superseded, not deleted.
  **One real, previously-undetected defect surfaced, not fixable from a build session:** the `hubs`
  schema has no `asqa` field, so `HubLayout.astro` can never tell `SourcesFooter` this hub's spokes
  are ASQA-accredited — the built page's sitewide compliance line wrongly states the
  state-approved-direct disclosure, contradicting the same page's own FAQ and disclaimers. Filed
  `[skills]`+`[design]` in the rebuild review's demand list. Also carried forward: `check-links.mjs`'s
  stale `/white-card` `PLANNED` entry (`[skills]`) and `HubLayout.astro`'s `.capsule` at ~91 CPL,
  now at least a fifth recorded sighting (`[design]`).

- [x] ~~**8. `[build]` Build `/white-card-act` (W3-5)**~~ Closed 4 Aug 2026, not yet committed.
  Built end to end through the full formal pipeline, `pipeline/white-card-act/01` through `07`, both
  Stage 7 and Stage 9 graded by independent fresh subagents. Internal facts confirmed by Andrey in
  this session: price **$137**, no `buyUrl` yet — every CTA is the in-page `#enrol` anchor, same
  precedent as `/white-card-tas` before its payment was configured. RTO partner AlertForce (RTO
  91826), confirmed on CPCWHS1001 scope with ACT in its delivery notification (training.gov.au,
  4 Aug 2026). The page's central fact: delivery is **face-to-face in a classroom**, AlertForce's own
  arrangement, never a WorkSafe ACT requirement (`kb/register/online-delivery-policy-by-state.md`
  §2E) — stated correctly in all 8 ASQA disclosure locations, re-verified independently at Stage 9.
  Stage 2's connector research found ~100/mo of "white card online canberra/act" demand this course
  cannot honestly serve; the `#accepted` section and FAQ answer that directly rather than let a reader
  discover the mismatch after paying. One page-content bug (a duplicated `SectionWayfinder` link)
  was caught by Stage 7 and fixed the same session. Graded **Amber** — see
  `skill-reviews/2026-08-04-abe-course-page-astro-white-card-act.md`.
  **Hub un-soon'd in the same session**: `src/content/hubs/white-card.mdx` gained ACT as a fifth
  `reference('courses')` spoke (was `soon: true` with no data cells), and `src/data/nav.ts`'s White
  Card ACT entry now has a real `href`. The hub's intro, comparison table, FAQ answers and
  disclaimers were all rewritten to describe three delivery modes (online self-paced, live online,
  face-to-face) instead of two, and to credit AlertForce alongside Blue Dog Training and Upskill
  Institute.
  **One real defect found, not fixable from a build session:** `CourseLayout.astro`'s
  `hasCourseInstance.courseMode` is hardcoded `"online"` in every course page's JSON-LD — wrong for
  this page specifically, the first of five White Card spokes where that's actually false. Filed
  `[design]`/`[skills]`. The Stage 9 grader also found Stage 7's own verification mischaracterised two
  already-settled findings and missed a real one (FPO placeholders printing visible "Image
  placeholder" text on this indexable page — a fourth sighting of a known, still-unbuilt gap) — both
  filed as process findings against `verification.md` and the missing build guard, `[skills]`.

- [ ] **12. `[build]` Build W2-6 insurance and W2-7 Project Advisory**
  No regulatory dependency, unblocked by everything else here, and `/owner-builder-courses` already
  cross-links both — so they are **dead links on the site's most valuable page** today. Pair with
  item 1, which is already in that file.

- [ ] **13. `[design]` Clear the measured design backlog (44 open)**
  Parallel to everything above. Several are measured and specific: `UnitOutline` 89 CPL on a live
  page · `.sg-demo` renders white cards on white · `.mr-title` 18px off-register (two sightings) ·
  `.capsule` 91 CPL on every page's most prominent element · `/styleguide` scrolls 182px at 375px.
  Token and design-register changes are **exclusive sessions** (rule 7); close with **measured**
  before/after values, not ticks (rule 9).

## Process fixes — cheap, compounding

- [x] ~~**9. `[skills]` Add a Stage-0 provenance gate to the build recipe**~~ Closed 4 Aug 2026,
  commit `1b6ff50`, merged `9f15a90`. Added to `new site/abe-migration-implementation-plan.md`'s Recipe A step 1 and
  mirrored into `.claude/skills/abe-course-page-astro/references/content-pipeline.md`'s Stage 1
  (the document a build session actually executes against) — same wording in both: confirm every
  row is regulator-sourced against the register's own primary/secondary provenance split
  (`kb/register/online-delivery-policy-by-state.md` §4) before Stage 3; an industry-guide or
  `UNVERIFIED` row goes to a facts session first. See
  `skill-reviews/skills/2026-08-04-provenance-gate-and-path-ownership.md`.

- [x] ~~**10. `[skills]` Assign the three unowned paths in the session-types table**~~ Closed
  4 Aug 2026, commit `1b6ff50`, merged `9f15a90`. `src/integrations/guardrails.ts` and `.gitignore` → **skills**
  (same "infrastructure for the work" precedent as `public/**`); `src/layouts/**` → **design**
  (formalising what two design sessions already did in practice). The `.gitignore` gap itself is
  also fixed: `new site/reference/*.xlsx`, `*.xls` and `*.csv`, scoped to that folder rather than
  global so a repo-tracked CSV (`redirects.csv`, `new site/redirect-map-v1.csv`) is never at risk —
  verified with `git check-ignore`. A fourth path was found and assigned in the same pass: the five
  top-level `new site/*.md` planning documents (hit while making the Recipe A edit above) → skills.
  See `skill-reviews/skills/2026-08-04-provenance-gate-and-path-ownership.md`.

- [x] ~~**11. `[skills]` Stop the demand backlog outgrowing its readers**~~ — closed, one piece
  deliberately deferred, not rejected.
  Closed `9b1f5f2`, and the premise behind it was wrong on both counts, checked against the code before
  building anything. Rule 3 was never unenforceable: `demand-split.mjs:292` computes triggers live, and
  the near-miss caution is a deliberate design choice, not a gap. Capping what a review may file was
  **not built** — the largest review filed 9 items, the median is 3, so a cap saves almost nothing and
  suppresses the evidence rule 2 exists to preserve. The real defect was narrower: a filing that
  already states its own recurrence ("SECOND SIGHTING") was invisible to the counter, which read 0
  triggers everywhere while the `SiteHeader.astro` ownership complaint had been filed three times.
  Fixed — 0 triggers before, 8 in skills / 1 in build after, no source review re-worded. The backlog
  went 95 → 100 as a direct result of that fix, because it made recurrence visible rather than smaller.
  **The header-units defect this item also named (`N open · M closed` in different units) is now
  closed too — 4 Aug 2026**, third-plus sighting (filed 30 Jul, 1 Aug, 2 Aug), fixed by bucketing
  closed items with the same near-miss dedup `openCount` already used. Measured: `design` 39→38
  closed, `facts` 13→12, both exactly the one pair of same-complaint duplicate closures each carried.
  See `skill-reviews/skills/2026-08-04-demand-split-header-units.md`.
  **Genuinely still open, and explicitly out of scope for this pass on Andrey's instruction:** a
  staleness signal. A 23 Jul item still ranks equally with today's, and nothing re-validates an open
  item against whether its named file has changed since filing. Worth its own session, not a
  quick add.

## Blocked — deliberately

Nothing here now — both items formerly blocked (8, 15) closed their blockers 3 Aug 2026 and moved up
into "Do first". Section kept as a heading for whatever the next genuinely-blocked-and-deliberate item
is.

## Only Andrey can unblock these — in the order they bite

- [ ] **14. `[AP]`**
  1. **W4-9 plus the Electrician 12-point bundle price.** Unchanged since 22 Jul. Blocks `/cpd-tas`,
     which blocks five signed-off redirect rules. Oldest and most expensive.
  2. **The two NSW owner builder URLs, 38,257 impressions between them.**
     `/owner-builder-nsw-course` (25,269 impr, pos 9.69) is noindexed; `/nsw-owner-builder-course`
     (12,988 impr, pos 16.53) has no page at all, and the migration plan consolidates *to* that
     non-existent slug. Sits in `check-redirect-targets`' PENDING list meanwhile. Commercial call.
  3. **The LearnWorlds `learn.` subdomain ticket.** Longest-lead external blocker on cutover, and
     still not started as far as the repo records.
  4. **`/white-card-tas` states $59; a live checkout charges A$39** (corroborated by LearnWorlds at
     A$117 over 3 payments). Either the $39 product is legacy and should be retired, or the page is
     wrong. Carried as a warning since 28 Jul.
  5. **`/white-card-wa` cutover gates.** Two generated images (prompts in
     `pipeline/white-card-wa/06-image-prompts.md`; both slots currently render FPO placeholders that
     print their own art direction as body text), and confirmation that `/payment` is served at the
     deploy origin. Neither blocks staging; both block the real domain.

---

## Not on this list, and deliberately

**The NSW White Card delivery mode.** Settled 2 August 2026 as a recorded exemption —
`kb/register/online-delivery-policy-by-state.md` **§2A-1**. It had been re-argued in four consecutive
sessions. Do not file it, do not raise it as a blocker, and do not chase SafeWork NSW or Upskill for
written confirmation; those routes are recorded as unavailable from public sources and are explicitly
not open actions. The only live obligation is the page rule: state the mode as the RTO's own, carry
no verification link or badge over it, and never credit SafeWork NSW with it.
