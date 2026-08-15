# HANDOVER — CPD bundle build-out (TAS Electrical + Plumbing, then NSW/WA)

## Status: PARTLY DONE — both TAS bundles built 12 Aug 2026, neither publishable

**Update 16 Aug 2026 — two of the three blockers below are gone, and the one left is not the one
anyone expected.**

- ✅ **Plumbing's selected-twelve is recorded** (PR #131). *TAS CPD Solar Energy* untagged from the
  plumber bundle at source; the page renders 12 members, was 13. See the correction further down —
  the `bundleMembers` mechanism this note called for was never needed.
- ⚠️ **The checkout-id blocker is WAIVED, not fixed.** Andrey, 16 Aug: *"remove this blocker and use
  placeholder"*. Both `buyUrl`s remain `TBC-` placeholders that do not resolve. Recorded on both
  pages as a deliberate commercial trade-off.
- ⛔ **What actually keeps both pages `noindex` now is an unfilled FPO image well each.** Found by
  attempting the publish: `guardrails.ts` hard-blocks an FPO placeholder on an indexable page at
  `budget 0`, and its own message says do not raise the budget — unfilled, the well publishes its
  art direction as body copy. **One image each is the whole remaining gap.** Production prompts,
  with the real course lists as on-screen script, are in
  `handover/HANDOVER-image-prompts-2026-08-02.md` (PR #133).
- Also surfaced by that attempt, and easy to miss because `noindex` exempts both pages from the
  orphan check: **nothing links to `/cpd-electrical-tas` from anywhere**, and `/cpd-tas`'s plumbing
  card still points at the legacy `/program/` URL. Both must be wired in the same change that
  publishes, or the pages ship as orphans.

| Bundle | Outcome |
|---|---|
| TAS Building | Was already live |
| **TAS Electrical** | **Built** `e562d21` — 11 courses, 11 points, $449, RRP $1,089. `noindex` |
| **TAS Plumbing** | **Built** `e562d21` — 12 published points, $499, RRP $1,188. `noindex` |
| NSW Building / WA Real Estate | Still parked; points, price, authority model and RTO all TBC |

**Neither TAS page can be published, for two different reasons.** Both lack a LearnWorlds checkout id
(the revenue export carries only legacy electrician products at three different point counts, and no
2026 plumber bundle at all), so both `buyUrl`s are placeholders that 404. Plumbing has a **second,
independent blocker**: see below.

### One instruction in this note was followed, and one was not

**"Prune the surplus course so the sold set is exactly 12" — NOT done, and the reason changed twice.**
The build first refused it, on the belief that the bundle delivers the whole 13-course pool and
pruning would delete a course the buyer receives. Andrey corrected that on 12 Aug: **CBOS approves
courses individually, thirteen are approved for plumbers, and the bundle is twelve of them, selected
manually once before publication.** So the instruction is correct in intent.

~~It still was not executed, because the fix is not a prune. The register records which courses are
*eligible* for a category, never which twelve are *sold*, so there is nowhere to record the selection
even after removing one. `liveMembers()` renders all thirteen and the copy correctly says twelve.
**That gap is now the plumbing page's publish blocker** and needs a `bundleMembers` list or a
per-course `inBundle` flag — `[facts]` / `[skills]`, ranked first in
`handover/HANDOVER-2026-08-12-session-close.md`.~~

**EXECUTED 16 Aug 2026, PR #131 — and the paragraph above was wrong about why it could not be.**
The instruction was correct in intent AND executable as written: it *was* a prune, of exactly one
tag. The claim that "there is nowhere to record the selection" was mistaken — `Category` (CBOS
approval) and `Bundle` (what is sold together) are **already separate columns** in the source doc,
so removing a Bundle tag records the selection precisely without touching the course's approval.

Andrey named **TAS CPD Solar Energy** on 16 Aug. Its plumber Bundle tag was removed at source
(Builder and Electrician kept — it is sold in both, and both bundles are unchanged at 12 and 11),
then `npm run sync:cpd` regenerated the register. `/cpd-plumbing-tas` renders **12** members, was 13.
Solar Energy keeps its Plumbing *category*, so thirteen courses remain CBOS-approved for plumbers
and the page's "twelve of the thirteen approved" copy is now literally true.

**Worth carrying:** this note reasoned its way from a correct instruction to a wrong conclusion by
inspecting the generated projection instead of the source schema. `kb/register/cpd/tas-courses.json`
genuinely cannot express the distinction, and "so the model lacks it" followed naturally and was
false. Recorded in `ROADMAP.md` and `skill-reviews/facts/2026-08-16-plumbing-bundle-selection.md`.

**The facts-then-build routing in this note held.** No figure was taken from a source read outside a
facts session: every regulatory figure on both pages comes from `kb/register/cbos-tas-reference.md`
A3b (read against the primary instrument 23 Jul 2026), and the register was used as recorded rather
than re-derived. Andrey confirmed on 12 Aug that the 27 Jul sync is unchanged; that is recorded as a
bare confirmation, not a re-read.

Full detail: `pipeline/cpd-electrical-tas/07-verification.md` and
`pipeline/cpd-plumbing-tas/07-verification.md`.

---

**Drafted 25 July 2026** by a `skills` session (session-types install), at Andrey's direction.
This note routes work to the sessions that own it — it records **no register figure and builds no
page itself**. Two session types are involved: **facts** (points/composition into `kb/register/`)
and **build** (the bundle pages, via `abe-course-page-astro`, archetype 4 — CPD bundle).

## Live bundle line-up (confirmed by Andrey 25 Jul 2026)

| Bundle | Points | ABE price | Status today |
|---|---|---|---|
| TAS Building | 12 | $499 | ✅ built & live (`src/content/cpd-bundles/cpd-building-tas.mdx`) |
| **TAS Electrical** | **11** | **$449** | ⚠️ not built — this handover |
| **TAS Plumbing** | **12** | **$499** | ⚠️ not built — this handover |
| **NSW Building** | TBC | TBC | 🅿️ in scope (Andrey 25 Jul), gated — see §Parked |
| **WA Real Estate** | TBC | TBC | 🅿️ in scope (Andrey 25 Jul), gated — see §Parked |

**Scope decision to record (layer 1).** NSW Building CPD and WA Real Estate CPD are **new products**,
confirmed in scope by Andrey on 25 Jul 2026. This extends two standing decisions and MUST be recorded
so a later run does not read the old lines as still governing:
- NSW: the standing decision is *owner builder ⛔ on hold*; NSW Building **CPD** is a different product
  and is not the owner-builder course — do not conflate them.
- WA Real Estate: *"Real Estate CPD"* is the exact category **retired for NSW** (CLAUDE.md product
  scope). Record the WA-in-scope decision **next to** that retired line, dated and attributed, rather
  than editing the NSW retirement — they are different states.
Record this in CLAUDE.md's product-scope paragraph and/or `kb/rules/authority-model.md`. A skills
session may land it; a facts/build session that touches those files should not silently expand it.

---

## Task 1 (facts) — verify the two TAS bundle compositions

Owner: **facts** session. No figure enters `kb/register/` without a source read **in that session**.
Points are regulatory (CBOS-approved, per course); the $449/$499 prices are **ABE commercial** figures
(Andrey's word is the source) and live in the page frontmatter, not the register.

1. **TAS Electrical — 11 points.** Confirm the member courses in `kb/register/cpd/tas-courses.json`
   sum to 11 CBOS-approved points, each `studyArea`-tagged so the WHS cap can be computed. **11 is
   short of the 12 a 12-point licence year needs** — this is the same shortfall `system-health` already
   warns on, and it is a **mandatory disclosure** on the page (see Task 2). Note the code comment
   already on record: the Electrical bundle once *"advertised 12"* — 11 is the corrected figure, do not
   restore 12.
2. ~~**TAS Plumbing — 12 points, but 13 live courses tagged.** `system-health` warns: *"13 live courses
   against a 12-point cap, so 1 is surplus and the sold set is ambiguous."* **Prune the surplus course
   in the source doc** so the sold set is exactly 12 and unambiguous, before the page derives from it.~~
   **DONE 16 Aug 2026, PR #131** — *TAS CPD Solar Energy* untagged from the plumber bundle at source.
   Note the WARN quoted here no longer exists in that form: the check was rebuilt on 15 Aug after the
   "surplus / prune" framing was found to encode the wrong product model (ABE bundles any selection at
   any size). It now asks only whether the points CLAIMED on the page exceed the live pool, and reads
   *"CPD plumbing: publishes 12 pts within a live pool of 12 (of 13 tagged)"*.
3. Mark anything you could not confirm at source **UNVERIFIED** — do not carry a figure across from
   this note. This note is not a source.

## Task 2 (build) — the two bundle pages

Owner: **build** session, one page each, `abe-course-page-astro` archetype 4. Mirror
`cpd-building-tas.mdx` — it is the worked reference.

- **Derive points, never type them.** `CpdBundleLayout` imports `bundlePoints`/`liveMembers` from
  `scripts/lib/cpd-derive.mjs`; the S1 capsule, member table and `hasPart` all come from the derived
  set. The Building run's Amber was largely typed headline figures going stale — do not repeat it.
- **Electrical: cap the coverage claim at what is verifiable.** With 11 derived points, the H1, meta
  and hero must **not** imply a full 12-point year. State the shortfall where the claim is made
  (mistakes-log #9: an unknown/shortfall caps the headline, it does not decorate the body).
- **Price** is the commercial figure in frontmatter (`price`, `priceNumber`, CTA label, PriceCard) and
  must equal `Course.offers.price`: Electrical `$449`/`449`, Plumbing `$499`/`499`.
- **`buyUrl`** for each is likely still TBC (a LearnWorlds bundle URL) — if so, ship `noindex` with an
  honest interim CTA (→ `/cpd-tas`), exactly as `white-card-tas` does; the `buyUrl` swap and `noindex`
  removal are one coupled, human-triggered step.
- Authority model **state-approved-direct** (CBOS Tasmania), Certificate of Completion, `recognizedBy`
  CBOS, Person ×2 (Dominic developer + Warwick reviewer). No RTO / "nationally recognised".
- These likely hang off the **`/cpd-tas`** hub; ROADMAP also lists **W4-9** as blocking `/cpd-tas`
  shipping — check whether W4-9 is still outstanding before treating the hub as ready.
- **Stop at Stage 8.** Deploy is human-triggered. File a Stage-9 review (fresh grader) with a tagged
  demand list — the routing mechanism is now live (`scripts/demand-split.mjs`).

## Parked — NSW Building + WA Real Estate (in scope, but gated)

Confirmed in scope, but **nothing can be recorded or built** until each has, at minimum:
1. **Authority model** — which regulator, and which of the four models (state-approved-direct /
   knowledge-requirement / asqa-accredited). NSW Building CPD and WA Real Estate CPD each need this
   settled at source before any page or `recognizedBy` claim. Owner: `kb/rules/authority-model.md`.
2. **RTO / approval + number** if asqa-accredited, or the approving regulator if state-approved.
3. **Points composition** (facts, source read) and **ABE price** (Andrey).
4. **`buyUrl`.**

Guard against mistakes-log #4 (*a commercial arrangement recorded as settled fact site-wide on one
confirmation*): the 25 Jul "in scope" is a **dated status**, not a built product. Keep one canonical
owner for each and point other files at it. **Do not build either until §Task-1-style figures exist.**

## Report back (from the facts/build sessions)
1. Pre-flight `system-health` green before starting; the Electrical/Plumbing WARNs should resolve as
   the register composition is fixed.
2. Which figures were confirmed at source vs left UNVERIFIED.
3. Whether `buyUrl` and W4-9 are resolved, or the pages ship `noindex` interim.
4. Stage-9 review filed for each, demand list tagged.
