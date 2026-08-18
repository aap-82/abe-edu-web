# HANDOVER — session close, 18 August 2026 (facts: TAS CPD approvals)

## Status: OPEN — start here

Supersedes `HANDOVER-2026-08-16-session-close.md` as the start-here note. That file stays open for
its own unfinished items; nothing in it is contradicted here.

Everything below is on `main` and deployed. Merged this session: **PR #143, #147, #148**. Working
tree clean, `system-health --strict` **0 failing**, `npm run build` green, no open PRs.

```bash
node scripts/system-health.mjs
```

---

## ⚠️ Read this first: an indexed page makes a claim we can now prove is wrong

**`/cpd-building-tas` is indexed. It promises a builder twelve claimable CPD points and delivers
eleven.**

`AS/NZS 3000:2018 Wiring Rules` is approved **for electricians and restricted electrical licence
holders only** — CBOS email of 12 Dec 2024, read in full this session, quoted verbatim in
`kb/register/cbos-tas-reference.md` **A4g**. It is still a member of the builder bundle.

A builder completes the bundle, claims eleven, and finds out at licence renewal. That is the reader
consequence, and it is why this leads the note.

**Why it was not fixed here.** It is not a copy edit. The twelve is asserted in roughly a dozen
places in `cpd-building-tas.mdx` — `description` (:55), `intro` (:91), `h1Html` (:111), `subhead`
(:116), proof row (:127), CTA sub (:152), price comparison (:166, :174), FAQ (:188), section H2 and
capsule (:218, :219) — and `CpdBundleLayout.astro` throws unless `rrp === points x singleCoursePrice`.
Changing it is a decision about what the bundle **is**, which is commercial, not a facts call.

**Three routes, and there is no spare course.** All 17 register rows were checked: every live
building-approved course is already in the bundle.

1. ~~**The `Silica Awareness Course` letter, 12 Dec 2024** — reported approved for exactly the set
   Wiring Rules excludes. The cheapest fix.~~ **⛔ CLOSED 18 Aug 2026 — THIS ROUTE DOES NOT EXIST.**
   Andrey: the course **is not approved**, and CBOS is not the next gate — **it needs SafeWork Tasmania
   approval first**. The register's `refused` was right all along. Two mailbox summaries said approved
   and both are wrong; it is the only claim in the entire reconciliation that failed. **Do not go
   looking for that letter — it cannot exist yet.** See `A4i`.
2. **Re-approve *Compliance, Solutions and Driving Innovation For Wet Area Waterproofing*** (expired
   22 Feb 2026). It is also the only genuinely builder-technical course in the catalogue, so this
   would answer A4e's composition guidance at the same time.
3. **Restate the bundle as eleven points**, `rrp` $1,089, and rewrite the dozen strings.

**With route 1 closed, only 2 and 3 remain** — one needs a regulator, the other needs a decision.

> **Do not "fix" it by leaving Wiring Rules in place to keep the number at twelve.** The count would
> hold and the claim would still be false.

---

## What is now true, and how strong each part is

**Do not flatten these tiers.** The register looks uniform; the evidence behind it is not.

| Tier | Courses |
|---|---|
| **Approval letter read in session** | Cyber Risks 15 Aug 2025 · WHS Compliance 10 Sep 2025 · Plumbing Essentials 12 Sep 2025 (**plumbers + gas-fitters only**) · Fire Risk 20 Nov 2025 · Wiring Rules 12 Dec 2024 (**electricians + REL only**) |
| **Already held, corroborated** | The Role of Drones 19 Feb 2025 · Effective Email Management 20 Mar 2025 |
| **Approved on Andrey's confirmation, NO letter, date unknown** | Workplace Asbestos Basics · Understanding Water Efficiency Labelling WELS · Safe Work Method Statement (SWMS) |
| **No record at all, in either direction** | **Solar Energy** |

The third tier stays `expiryBasis: submission` on purpose. **A confirmation establishes *that* a
course is approved, not *when*.** `A4h` says so explicitly for SWMS, which is the weakest row in the
register and labelled as such.

**Bundles as they now stand:**

| Bundle | Members | Claimable | State |
|---|---|---|---|
| Plumbing | 12 | **12** | fixed 18 Aug — Wiring Rules out, Solar Energy in (Andrey's call) |
| Electrical | 11 | **11** | always correct |
| Building | 12 | **11** | the open risk above |

---

## The mistake to avoid, because I made it

I was asked whether Wiring Rules was really electricians-only. The source doc's per-row
`Category Description` said Building/Electrical/Plumbing. **I calibrated that field first** — against
Plumbing Essentials, the one row whose CBOS scope was already known from a letter — and it matched
exactly. On that basis I judged the field reliable and told Andrey the contrary reports were weaker.

The letter then said "electricians and restricted electrical licence holders only".

**One hit in two testable rows is not a validated instrument.** And the deeper fault: that field is
populated from ABE's *application*, so it can only ever record what was **requested**, never what was
**granted**. The same PDF contains both — CBOS's reply on page one, ABE's submitted form ("Type or
category of licence", "Suggested CPD points") below it. Reading only the top gets the date right and
the scope wrong.

Recorded in full in `A4g` with every place that still carried the old position.

---

## Immediate next actions

- ~~**[facts]** Get the **Silica Awareness** letter (12 Dec 2024). It unblocks the builder bundle.~~
  **⛔ WITHDRAWN 18 Aug 2026 — there is no such letter and there cannot be one yet.** The course is not
  approved and needs **SafeWork Tasmania approval before CBOS**. See `A4i`. Getting the builder bundle
  to twelve is now a commercial or regulatory project, not a search of the mailbox.
- **[facts]** Get the **Solar Energy** letter — **now the only outstanding letter worth chasing.** It
  carries the plumber bundle's twelfth point on unverified scope, and its estimated expiry is
  **5 Dec 2026**; `check-freshness` fails the build on an expired course still in a bundle. Search
  `info@abeeducation.edu.au` **by sender or by the approval phrase, not by course name** — of the five
  letters obtained so far, two had no course name in the subject at all, and one arrived
  subject-tagged `**SUSPECTED SPAM**`, so check junk. Drop PDFs into `gov approvals/CBOS/` (gitignored
  by `*.pdf`; they are confidential and carry a named officer's direct contact details — do not commit
  them).
- **[build]** `cpd-plumbing-tas.mdx` — four pool-count claims now overstate by one (the live plumbing
  pool is **twelve**, not thirteen): `subhead` (:145), FAQ (:189, :190), individual-courses paragraph
  (:255). Page is `noindex`, so wrong-on-page rather than public. **Its header comments at :14-51 and
  :140 also still say Solar Energy is *out* of the plumber bundle** — now backwards, and exactly the
  imperative-comment-outlives-its-facts pattern the 16 Aug handover leads on.
- **[build]** `cpd-building-tas.mdx` — after the decision above.
- **[skills]** `check-claims.mjs` — **the check gap that hid all of this.** It reports "CPD building:
  publishes 12 pts within a live pool of 12" and passes, because the pool it counts is **bundle
  membership**, never **approved category**. Add a per-licence assertion: every live member's
  `categories` must include the bundle's category. Today nothing mechanical catches a course sold to a
  licence class it was not approved for.
- **[skills]** `sync-cpd-register.mjs` header — note that Coda writes are **asynchronous** (a read-back
  straight after a `PUT` returns the old value; two writes looked like failures for ~20s), and that the
  MCP table tool silently accepts an ISO date on a `DAY_MONTH_YEAR` column and writes **nothing**; only
  `dd/mm/yyyy` takes.

---

## Closed this session, so nobody re-opens it

- **`cbosName: null`** on Cyber Risks — the only live course without one. The bundle cards were
  publishing the internal LearnWorlds admin title, `TAS CPD: Cyber Risks and Workplace Safety (1 pt)`,
  on the indexed page and in its JSON-LD. Fixed, verified live: **0 occurrences**.
- **Register-wide date drift.** Every date was one calendar day early — 16 of 17 rows — because
  `isoDate()` round-tripped Coda's AEST midnight through `toISOString()`. Fixed; **39 date fields
  across 17 rows now match source exactly**.
- **`HANDOVER-facts-cpd-tas.md` Task A step 3**, filed 25 Jul 2026 as "not actionable — there is
  nothing to read". It was actionable; nobody had asked ABE for the letters. `SOFT-DATE` fell from 10
  live courses to 5.
- **The mailbox search's "rejected" reports** for Workplace Asbestos Basics and WELS — superseded by
  Andrey's confirmation, recorded in `A4f` and cross-referenced from `A6` so a later session meeting
  the rejection cold does not re-raise it. The asbestos rejection is best read as the same
  reject-revise-approve cycle the same document records for WHS Compliance.
- **CBOS's bundle-composition guidance** — classed a **recommendation, not a blocker**, by Andrey on
  17 Aug (`A4e`). Letters still quoted verbatim; only ABE's disposition changed.

---

## Where the record lives

- `kb/register/cbos-tas-reference.md` — **A4b** Cyber Risks name · **A4c** date drift (fixed) ·
  **A4d** the four letters · **A4e** bundling guidance (recommendation) · **A4f** mailbox
  reconciliation · **A4g** Wiring Rules scope + the open builder risk · **A4h** SWMS
- `skill-reviews/facts/2026-08-17-cbosname-null.md` and `2026-08-18-cbos-approval-reconciliation.md`
- Letters: `gov approvals/CBOS/` (gitignored, five PDFs)
