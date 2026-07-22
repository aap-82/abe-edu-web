# Stage 1 — government source map + fact ledger

**Page:** `/cpd-building-tas` — TAS Building CPD bundle
**Archetype:** 4 (CPD bundle) — confirmed at Stage 3
**Authority model:** `state-approved-direct` (CBOS approves the course)
**Run:** ROADMAP Phase 2 evidence run, 23 July 2026

---

## 1 · Source map

Read from the register first per `kb/content-source-map.md`. Nothing here needed a live fetch: the
TAS CPD facts were verified 2026-07-12 on a 365-day cadence, so they are 11 days old and current.
`check-freshness` reports the register 16/16 current.

| Source | What it gives this page | Class |
|---|---|---|
| `kb/register/cbos-tas-reference.md` A1 | Minimum CPD points per licence category | primary fact |
| " A2 | Multi-licence rule: highest single requirement, not the sum | primary fact |
| " A3 | WHS category cap, max 4 points per renewal year | primary fact |
| " A4 | Course approval is course-specific, set by the Administrator | primary fact |
| " A5 | Record-keeping sits with the licence holder | structure / FAQ |
| " A6 | Asbestos CPD point is NOT an awareness card | prohibition |
| `kb/register/cpd/tas-courses.json` | Per-course points, approval + expiry dates, bundle membership, status | primary fact (derived at build) |
| `kb/register/legislation-references-tas.md` §3 | Occupational Licensing Act 2005; CPD Determination | background |
| `kb/register/regulator-roles-by-state.md` | CBOS handles OB and CPD in TAS; WorkSafe TAS handles WHS | prohibition guard |
| `kb/register/demand-and-revenue-snapshot.md` | Demand and revenue context for Stage 2 | evidence |

**Live `.gov.au` pages to cite in the Sources block** (from the register's own source list, re-verify
on cadence):

- CBOS — CPD: `cbos.tas.gov.au/topics/licensing-and-registration/cpd`
- CBOS — Achieving your CPD requirements (points tables, Determinations):
  `cbos.tas.gov.au/newsroom/tech-reg-news-technical-regulations/achieving-your-cpd-requirements`
- CBOS — CPD Determination list:
  `cbos.tas.gov.au/topics/resources-tools/occupational-licensing-determinations/cpd-determination-list`

---

## 2 · Fact ledger

### Regulatory — verified against the register, never asked, never defaulted

| Fact | Value | Source | Verified |
|---|---|---|---|
| Builder minimum CPD | 12 points/year | cbos-tas-reference A1 | 2026-07-12 |
| Building Designer, Architect, Civil Designer, Building Services Designer | 20 points/year | A1 | 2026-07-12 |
| Building Surveyor, Engineer | 30 points/year | A1 | 2026-07-12 |
| Multi-licence holders | meet the **highest single** requirement, not the sum | A2 | 2026-07-12 |
| WHS category cap | max **4** WHS points per renewal year | A3 | 2026-07-12 |
| Approval is course-specific | a provider being listed does not make every course approved | A4 | 2026-07-12 |
| Who records CPD | the licence holder, retained and portable | A5 | 2026-07-12 |
| CPD year | runs against the licence renewal cycle; confirmed at renewal | A1 | 2026-07-12 |
| Regulator | CBOS (Consumer, Building and Occupational Services) | regulator-roles-by-state | 2026-07-12 |
| Legislation | *Occupational Licensing Act 2005* (Tas) + CPD Determination | legislation-references-tas §3 | 2026-07-12 |
| CBOS approval life | two years from approval | cbos-tas-reference A4 note | 2026-07-23 |

### Derived — counted at build, never authored

| Fact | Value today | Mechanism |
|---|---|---|
| Bundle points | **12** | `bundlePoints()` — live members only, capped at 12 |
| Member courses | 12 of 14 tagged (2 expired, excluded) | `liveMembers()` |
| Per-course points | 1 each | register |
| Earliest member expiry | 2026-12-05 (two courses) | register |

### Internal — asked, never inferred from a sibling page

| Fact | Value | Status |
|---|---|---|
| Bundle price | $499 | ✅ confirmed 23 Jul 2026 |
| RRP / bought separately | $1,188 (12 × $99) | ✅ confirmed 23 Jul 2026 |
| Single course price | $99 | ✅ confirmed 23 Jul 2026 |
| Applicable licence types | Builder, architect, building surveyor, building designer, building services designer, engineer, permit authority | ✅ register Category Description |
| Delivery | online, self-paced | ✅ `cpd-tas.astro`, consistent across CPD |
| Certificate | certificate of completion per course, as each is finished | ✅ `cpd-tas.astro` |
| Assessment exists | yes, text + assessment throughout | ✅ confirmed 23 Jul + metrics doc |
| Avg assessment score | 90–96% on nine of the twelve | ✅ metrics doc, Jul 2026 |
| Pass mark and attempt limit | **not stated on the page** | ✅ decided 23 Jul — assessment is named, never quantified. The owner builder figures are NOT carried across |
| Total completion time | **about 10 hours** | ✅ decided 23 Jul — from the measured ten (9 hr 45 min, study time per starter). Two members unmeasured, so it under-states slightly rather than over-claims |
| Course access period | not stated | **deliberately omitted** — unknown, and an invented access period is worse than none |
| **LearnWorlds buy URL currency** | `/program/tas-builder-cpd-bundle-01092025` | **pre-publish blocker** — Andrey to confirm; build with it, do not ship unverified |
| Named experts | Dominic Ogburn (developer) + Warwick Smith (reviewer) | assumed from precedent, flagged |

---

## ⚠ Stage 1 finding — the metrics snapshot measures a different bundle

`data/LearnWorlds/tas-cpd-course-metrics-jul-2026.md` covers twelve courses, but **not the twelve
that are in the bundle today.** Cross-checked against the register programmatically:

| | Course | Register status |
|---|---|---|
| In the metrics, **not** in the bundle | A Practical Guide to Smart Home Integration | **expired** 2026-04-04 |
| " | Compliance … For Wet Area Waterproofing | **expired** 2026-02-22 |
| In the bundle, **no metrics at all** | TAS CPD Solar Energy | live |
| " | TAS CPD AS/NZS 3000:2018 Wiring Rules | live |

**So neither headline figure describes the product.** The doc's 12 hr 46 min, and the 9 hr 11 min
quoted at the gate, are both totals for a set that contains two courses no longer sold and omits two
that are.

**What is actually measured.** Ten of the twelve live members have figures. On the doc's own
recommended basis — study time per starter, which it argues is more trustworthy than "avg time to
finish" — those ten total **585 min, 9 hr 45 min**, averaging 58.5 min each.

The two departed courses were the worst performers in the range (Waterproofing alone was 123 min per
starter and 16% of the old bundle), so the current bundle is **shorter and cleaner** than the
snapshot suggests, not longer.

**Two things follow that are not this page's problem but are Andrey's.** The doc records that
"avg time to finish" does not reconcile with total study time, and it raises CPD point defensibility
directly: nine of twelve courses average above 90% on assessment at roughly an hour of study, and it
recommends the relationship between study time, assessment rigour and the claimed point value be
checked before CBOS raises it. Neither belongs in page copy. Both are flagged upward.

---

## 3 · Unknowns gate — CLOSED 23 July 2026

Asked in two rounds. Round one closed time, assessment-exists and the buy link; reading the metrics
doc then reopened the time question, because the figures turned out to describe a different set.

**Decisions:**
- **Completion time: "about 10 hours."** From the ten measured live members (9 hr 45 min on study
  time per starter). Under-states rather than over-claims, which is the safe direction.
- **Pass mark: not stated.** The courses are assessed and the page says so, but no figure is given.
  The owner builder course's 80% and three attempts are **not** carried across — that is exactly the
  sibling-page inference the skill prohibits.
- **Access period: not stated.** Unknown, so omitted.
- **Buy link: pre-publish blocker.** Built with the existing URL; must be confirmed before ship.

Original gate, for the record:

1. **Total completion time for the 12-course bundle.** Archetype 4 §3 requires a realistic total,
   ideally measured from platform data. The ABE Courses doc shows 1 hour per course nominally, but a
   nominal figure is not a measured one and the skill is explicit that LearnWorlds' measured average
   is preferred over a copied figure.
2. **Whether CPD courses carry an assessment.** The owner builder course has an 80% pass mark and
   three attempts. `cpd-tas.astro` describes CPD as work-through-and-download-your-certificate with
   no assessment mentioned. These are materially different "how it works" sections and the difference
   cannot be inferred.
3. **Access period after purchase.** Not stated anywhere in the repo for CPD.
4. **Whether the LearnWorlds program URL is still current.** The slug carries a 2025 date and the
   register shows this bundle family has five listings across re-approvals, so a dated URL is
   exactly the thing likely to have moved.

**Assumption flagged, not asked:** the page carries Dominic Ogburn as developer and Warwick Smith as
independent reviewer, matching the site-wide E-E-A-T pattern of two named Person profiles. Correct at
Stage 3 if the CPD bundle should name someone else.

**Not needed for this page, deliberately:** the owner-builder permit threshold and liability
insurance figure both carry `[VERIFY AT BUILD]` in the register (B1, B4). They belong to the owner
builder page, not this one, so they are not chased here.
