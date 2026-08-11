# 01 — Source map and fact ledger — /cpd-electrical-tas

Written 12 Aug 2026. **This stage did run**, as a read of existing verified records rather than a
fresh trawl of regulator sites. No .gov.au page was opened in this session and nothing was added to
`kb/register/**`.

| Fact on the page | Source | Read when |
|---|---|---|
| Twelve CPD points a year for an occupational licence | `kb/register/cbos-tas-reference.md` **A3b** — Occupational Licensing (CPD) Determination 2018 s6.4 | 23 Jul 2026, against the primary instrument |
| Thirty-six points across a three-year licence, phased from 1 Jul 2019 | same, s6.2 | 23 Jul 2026 |
| Builders, designers and surveyors are governed by a DIFFERENT determination | same, A3b | 23 Jul 2026 |
| Multi-licence rule: highest single requirement, never the sum | `cbos-tas-reference.md` **A2** | 12 Jul 2026 |
| Activity caps: WorkSafe 6/yr, journals 3/yr, research 4/yr, membership 2/yr | **A3**, s7.4 table | 23 Jul 2026 |
| Approved online courses carry NO annual cap | **A3**, s7.1(d) and s7.4 | 23 Jul 2026 |
| CBOS approves individual COURSES, not providers | **A4** | 23 Jul 2026 |
| Approvals run two years | **A4** | 23 Jul 2026 |
| Bundle membership and point count (11 live courses) | `kb/register/cpd/tas-courses.json`, the `bundles` array filtered to live status | synced 27 Jul 2026 |
| Completion time | `business data/LearnWorlds/tas-cpd-course-metrics-jul-2026.md` | Jul 2026 snapshot |
| Price $449 | Andrey, recorded in `handover/HANDOVER-cpd-bundles.md` | 25 Jul 2026 |

**Register currency.** `tas-courses.json` was synced 27 Jul 2026; Andrey confirmed on 12 Aug 2026
that nothing has changed. That is a bare internal confirmation, not a re-sync, and is recorded as
such. `check-freshness` reports 0 lapsed-but-live.

**Unresolved:** the LearnWorlds checkout product id, and the per-course price the sibling's RRP is
built from. Both asked 12 Aug 2026, neither answered. See 07.
