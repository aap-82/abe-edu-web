# HANDOVER — CPD bundle build-out (TAS Electrical + Plumbing, then NSW/WA)

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
2. **TAS Plumbing — 12 points, but 13 live courses tagged.** `system-health` warns: *"13 live courses
   against a 12-point cap, so 1 is surplus and the sold set is ambiguous."* **Prune the surplus course
   in the source doc** so the sold set is exactly 12 and unambiguous, before the page derives from it.
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
