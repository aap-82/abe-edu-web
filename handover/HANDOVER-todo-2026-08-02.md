# HANDOVER — prioritised to-do list, 2 August 2026

## Status: OPEN — 14 items, none started

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

- [ ] **1. `[build]` Fix the NSW nationally-recognised claim on `/owner-builder-courses` — P0**
  The biggest equity asset on the site (59.9k impressions) renders `index,follow` and asserts NSW
  nationally recognised training in **three** places, measured in
  `dist/owner-builder-courses/index.html`: the hero intro capsule, the NSW spoke blurb, and a third
  body passage. NSW Owner Builder is ⛔ on hold on two independent grounds — the partnership is
  unsigned **and** the five required units are not on RTO 45708's scope — so this is exactly the
  claim `kb/rules/authority-model.md` forbids. The hub also links its NSW column to
  `/owner-builder-nsw-course`, which PR #103 noindexed, so an indexable page points at a page ABE
  deliberately hid.
  Not an incident today (production still serves the legacy site; `workers.dev` is
  `X-Robots-Tag: noindex`), but it **publishes at cutover and no gate can see it**.
  Decide what the NSW column does: `soon: true`, or a link to the pre-launch page once it exists.
  ROADMAP already holds the full pre-launch decision set — do not re-litigate it.

- [ ] **2. `[facts]` Read the TAS delivery row at WorkSafe Tasmania**
  Highest-risk unchecked row. `/white-card-tas` is **live and indexable** and advertises self-paced
  online completion on 2026 industry-guide sourcing alone. Of the two rows since checked against a
  regulator, one was wrong in the permissive direction (NSW) and one was right for the wrong reason
  (QLD). Close with a facts review per CLAUDE.md rule 11.

- [ ] **7. `[build]` Build `/white-card-qld` (W3-3)** — unblocked 2 Aug 2026
  WHSQ defines CRTD (live video) **as** a form of face-to-face, and Blue Dog Training (RTO 31193)
  holds CRTD approval, so this can be a genuinely online page. Four mandatory copy constraints:
  student **physically located in Queensland** (never "resident"), **minimum four and a half hours**,
  **nothing self-paced or pre-recorded**, and **PPE to hand for the assessment**. Attribute the CRTD
  approval to Blue Dog, **never** to ABE Education. Read `online-delivery-policy-by-state.md` §2C
  before Stage 1. Use the per-page GSC export as the R4 input — it exists, nobody needs to ask.

- [ ] **5. `[skills]` Build a `check-positions` guardrail**
  `check-claims` reconciles **figures** (150/150 page figures match the register). Nothing reconciles
  **positions** — delivery mode, authority model, "nationally recognised" status. Three defects on
  disk proved the gap and all three survived a green build, 21/21 guardrails, `check-claims` 0
  failing and an independent Stage-7 audit. Past ROADMAP rule 3's threshold.
  Minimum viable: a `POSITIONS` table mapping `(page, claim-kind) → register assertion`, failing the
  build when a page contradicts the register. Same shape as the superseded-unit-code and company-name
  checks. This is also the answer to "a fact reversal must fan out to every owner in one pass" — the
  build fails until every copy agrees, rather than adding a new session type.
  **DoD: the check fails on a known instance *before* the copy is fixed.**

- [ ] **3. `[facts]` Read the ACT delivery row at WorkSafe ACT**
  Gates item 8. The current position (AlertForce delivers in a classroom) was confirmed with the
  **partner**, never the **regulator** — the same sourcing gap that produced the NSW error. Add the
  UNVERIFIED AlertForce asbestos and silica course codes in the same session (browser, not WebFetch —
  `training.gov.au` is a client-rendered SPA).

- [ ] **4. `[facts]` Read the WA delivery row at WorkSafe WA**
  Backs `/white-card-wa`, 39.9k impressions, live and indexable. §2B corrected WA *eligibility* at
  source on 1 Aug; the *delivery* row still rests on guides.

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

- [ ] **9. `[skills]` Add a Stage-0 provenance gate to the build recipe**
  Second occurrence — the trigger has fired. NSW cost a complete page built on a fact that reversed
  at Stage 9; QLD cost a fraction because the reading came first. The register now labels rows by
  provenance, so Recipe A step 1 becomes: open the ledger **and** confirm every row it will publish
  is regulator-sourced; any industry-guide row goes to a facts session before Stage 3.

- [ ] **10. `[skills]` Assign the three unowned paths in the session-types table**
  `src/integrations/guardrails.ts` and `src/layouts/**` were both filed on 1 Aug by sessions that
  edited them anyway. **`.gitignore`** was found on 2 Aug: it protects `new site/reference/` against
  `*.pdf`, `*.docx` and `*.doc` but **not `*.xlsx`**, on a public repo whose own gitignore comment
  records that a blanket `git add -A` already swept those documents in once. Verified with
  `git check-ignore`. One line; consider `*.xlsx`, `*.xls` and `*.csv` together.

- [ ] **11. `[skills]` Stop the demand backlog outgrowing its readers**
  92 open skills items across 39 reviews. `demand-split` reports "Trigger met by exact match: None"
  on every destination and explains this is the normal case on this corpus — so **ROADMAP rule 3 is
  currently unenforceable mechanically**. Cap what a review may file (rank and file the top N, keep
  the rest in review prose); canonicalise item wording at filing time, or accept the grouped output
  as the trigger and stop reporting "None". Filed twice and still open: the header counts its two
  halves in different units, so `N open · M closed` invites a subtraction that does not hold.

## Blocked — deliberately

- [ ] **15. `[build]` Build the `/white-card` hub with QLD and ACT as "Coming soon"** — blocked on 2 and 4 only
  **Deliberately not blocked on the QLD or ACT spokes.** ROADMAP says the hub is Zod-gated on all
  five; half true. `spokes` is `z.array(...)` with **no minimum length**, and `comparison.columns[]`
  already carries a `soon: z.boolean()` flag that `ComparisonTable.astro:35` renders as a non-linked
  "Coming soon" cell. The hub was designed for partial coverage.
  It is worth more than the spokes gating it. From the per-page GSC export
  (`business data/GSC/…2026-08-01.zip`, `Filters.csv` → `Page: +white-card`):
  `/white-card-wa-online` 141 clicks / 41,586 impr / pos 9.01 · **`/white-card` 41 / 11,227 / 19.74**
  · `/tas-online-white-card` 35 / 7,873 / 11.95. There is **no legacy URL at all** for White Card
  QLD, NSW or ACT — the two remaining spokes carry **zero** inherited equity, while the hub is a
  `rebuild` row in `redirects.csv` and already ranks for the queries those spokes would target
  ("white card act" 1,152 impr at 14.61; "white card tasmania" 1,223 at 21.13).
  Blocked only because the hub restates the TAS and WA delivery positions.

- [ ] **8. `[build]` Build `/white-card-act` (W3-5)** — blocked on 3
  Zero legacy equity. The hub currently absorbs the "white card act" query, so this page's job is to
  take that over rather than protect an existing asset. Sequence it after the hub, not before.

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
