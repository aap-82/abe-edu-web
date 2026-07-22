---
verified: 2026-07-23
cadence: 90d
---

# Demand and revenue snapshot — what sells against what is searched

**Commercial data. Handle like `competitor-pricing-snapshot.md`.** Figures are ABE's own sales and
Google Search Console performance. The raw exports live under `data/` and are **gitignored on
purpose**; this file holds the derived findings only, because the conclusions are what content
decisions need and the row-level data is what should not be committed. **No customer-identifying
data appears here or ever should** — the transactions export contains names, and it was analysed
in aggregate only.

**Sources.** `data/LearnWorlds/2026-07-23_ExportProductRevenues.csv` (149 products with sales) and
`transactions-export--2026-07-23...csv` (2,143 successful payments, Dec 2022 - Jul 2026), crossed
with `data/GSC/abeeducation.edu.au-Performance-on-Search-2026-07-19.zip` (16 months, 1,000
queries, 2,256 clicks, 157,828 impressions).

> **⚠ Read `Filters.csv` before using any GSC export.** Two of the three zips in `data/GSC/` are
> filtered to a single page (`+/owner-builder-nsw-course` and `+/nsw-owner-builder-course`). Only
> the `...2026-07-19.zip` export is site-wide. Analysing a filtered export makes CPD look like it
> has no search demand at all, which is false and would invert the conclusion below.

---

## 1. The central finding — revenue and search capture are misaligned

| Segment | Revenue | Rev share | Clicks | Click share | Impressions | CTR |
|---|---|---|---|---|---|---|
| Owner Builder | A$239,019 | 54.1% | 1,631 | 72.3% | 72,098 | 2.26% |
| **CPD** | **A$179,205** | **40.6%** | **83** | **3.7%** | 15,968 | 0.52% |
| White Card | A$5,272 | 1.2% | 74 | 3.3% | 25,432 | 0.29% |

Total: A$441,763 across 149 selling products.

**CPD earns 40.6% of the revenue on 3.7% of the search clicks.** That revenue is not coming from
Google — it is direct, repeat or B2B. Meanwhile ~16,000 CPD impressions sit at **position 17-42**,
which is real demand ABE is visible for and captures almost none of. This is the largest
addressable gap in the data and it is what phase 2 is pointed at.

**White Card is the mirror image**: 16% of all site impressions, 1.2% of revenue, 0.29% CTR. The
sitemap gives it five pages. That ratio is worth re-examining before those are built.

Revenue is heavily concentrated: **12 products are 80% of it**, out of 149. 2026 is running
roughly 50% ahead of 2025 by monthly revenue.

## 2. Bundle revenue is hidden by version churn

Every CBOS re-approval spawns a new dated LearnWorlds product, so one commercial product appears
as several listings and its true size is understated in any per-product ranking.

| Family | Listings | Combined revenue |
|---|---|---|
| TAS Builder CPD | **5** | **A$92,821** |
| TAS Electrician CPD | 4 | A$20,153 |
| TAS Plumber CPD | 4 | A$14,290 |
| WA Real Estate CPD | 4 | A$9,247 |

Combined, TAS Builder CPD is the **#2 product on the site**, ahead of TAS Owner Builder
(A$64,914) and behind only WA Owner Builder (A$102,710). Read listing by listing it looks like
five mid-size products.

**This is the argument for the derived-points model.** One durable URL per bundle accumulates
equity while the LearnWorlds product churns underneath it, and the page's figures come from
`kb/register/cpd/tas-courses.json` rather than being retyped per version.

## 3. Which individual courses earn their own page

Register course topic against site-wide search demand. Used to answer "should this course be a
page or a row in the bundle table".

| Topic | Impressions | Best position | Verdict |
|---|---|---|---|
| Solar | 559 | **7.0** | Already ranking. ABE's strongest CPD topic. |
| Smart home / energy | 1,172 | 16.4 | Demand — but **ABE's course expired 04/04/2026**. Renewing has direct payback. |
| WHS compliance | 1,714 | 50.3 | Demand, ABE has the course, invisible. |
| AS/NZS 3000 wiring rules | 825 | 39.1 | Demand, ABE has the course, invisible. |
| Waterproofing, WELS, drones, fire risk | **0** | — | **Bundle filler. Never a page.** |

Cross-check against sales: single courses top out at ~20 sales each, against 583 bundle sales. So
a promoted course is written as a **guide that routes to the bundle**, never a competing product
page. Four candidates, and a hard no on the rest.

## 4. Asbestos and silica — large demand, wrong intent for the TAS CPD course

77 queries, **7,421 impressions**, positions 37-77, **one click in sixteen months**.

| Intent bucket | Queries | Impressions |
|---|---|---|
| Awareness / generic (national) | 35 | 4,614 |
| Other states, Melbourne-heavy | 25 | 1,552 |
| Removal / licensing (Class A/B) | 14 | 1,073 |
| **TAS-qualified** | **0** | **0** |
| **CPD-flavoured** | **0** | **0** |

**None of it is TAS and none of it is CPD-flavoured.** The CBOS asbestos CPD course does not
address this demand — a page for it would rank for nothing, because searchers want a nationally
recognised awareness credential. The **AlertForce resold courses do** match that intent, and are
national and nationally recognised (see `kb/rules/authority-model.md` § "Asbestos and Silica
Awareness"). Existing products have sold ~40 units for ~A$3,300 all-time against those 7,421
impressions, so capture is effectively zero.

Parked 23 July 2026, pending verification of the AlertForce course codes.

## 5. What this changes

- **Phase 2's target is the right one.** TAS CPD is 30% of revenue and the biggest search gap.
- **Do not build individual course pages by default.** Four topics have demand; the rest have none.
- **Re-examine the five planned White Card pages** against 1.2% of revenue.
- **Renew the expired Smart Home approval** — 1,172 impressions against a lapsed course.
- **Keep one URL per bundle** regardless of how many LearnWorlds versions exist beneath it.
