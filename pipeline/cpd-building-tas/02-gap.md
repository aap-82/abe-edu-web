# Stage 2 — demand and content gap

**Page:** `/cpd-building-tas` · **Run:** Phase 2 evidence run, 23 July 2026

Sources in the skill's order: GSC site-wide export first
(`data/GSC/...2026-07-19.zip`, 16 months, the only unfiltered export of the three), then the
Neil Patel connector for demand ABE does not yet rank for, then competitors.

---

## 1 · The finding that should shape this page

**This is ABE's largest CPD product and it has almost no search demand to capture.**

| Evidence | Figure |
|---|---|
| Revenue, TAS Builder CPD family (5 listings) | **A$92,821** — the #2 product on the site |
| GSC: `builder cpd tasmania` | **no impressions in 16 months** |
| Connector (Hobart, `locId` 1000480): `builder cpd tasmania` | **volume 0**, SD 12 |
| Connector: `cpd points tasmania` | volume 10, SD 21, CPC A$6.24 |
| Connector: `electrical cpd points tasmania` | volume 10, SD 10 |

The trade-qualified pattern demonstrably exists in Tasmania — `electrical cpd points tasmania` earns
113 impressions and 6 clicks at position 7.7 — but **the builder equivalent does not appear at all.**
Either the demand is not there, or ABE has never surfaced for it.

**So this page is built to convert, not to rank.** That is consistent with
`kb/register/demand-and-revenue-snapshot.md`: CPD earns 40.6% of revenue on 3.7% of search clicks.
The traffic arrives from the hub, from email and direct, and the page's job is the arithmetic, not
the acquisition.

## 2 · The page it replaces is dead, and the product page is beating it

| URL | Clicks | Impressions | Position |
|---|---|---|---|
| `/tas-builder-practitioners-cpd` — the current marketing page | **0** | 347 | **67.0** |
| `/program/tas-builder-cpd-bundle-01092025` — the raw LearnWorlds product | 6 | 638 | 29.1 |
| `/tas-cpd-electrician-courses` — the sibling that works | 83 | 2,734 | 12.5 |
| `/tas-cpd-index` | 73 | 5,850 | 17.4 |
| `/tas-cpd-courses` | 51 | 4,190 | 23.0 |

**The LearnWorlds program page outranks and outperforms the marketing page built to sell it** — twice
the impressions, six clicks against zero, and 38 positions better. And `/program/*` is robots-blocked
at cutover (`abe-new-site-sitemap.md`), so those 638 impressions disappear and the page inheriting
them is currently at position 67 with no clicks.

`redirects.csv` already folds `/tas-builder-practitioners-cpd` into `/cpd-building-tas`. There is
nothing to lose in the redirect and the sibling electrician page shows the ceiling: position 12.5 and
83 clicks is achievable for a TAS CPD trade page.

## 3 · Keywords

**Primary: "builder CPD Tasmania."** No GSC impressions and zero connector volume, so it is chosen on
descriptor accuracy and low difficulty (SD 12) rather than on measured demand. Stated plainly because
pretending otherwise would put a number on this page that no export supports.

**Deliberately NOT the primary: "cpd points tasmania"** (131 impressions, position 15.8, zero clicks).
It is the highest-impression TAS CPD term, and it is trade-agnostic, so it belongs to the state hub
`/cpd-tas`. Targeting it here would cannibalise the hub — the exact failure the Stage 7 check looks
for, and the one the NSW dual-URL consolidation had to undo.

**Secondary, supporting:** `12 point cpd bundle`, `cpd points for builders` (511i, pos 10.9, national),
`builders cpd online` (824i, pos 17.5, national), `builder cpd package` (74i, pos 3.9).

**Intent worth knowing about:** `free cpd points tasmania` earns 121 impressions and 7 clicks at
position 4.6 — the strongest-converting TAS CPD term ABE has, and it wants something ABE does not
sell. Do not chase it and do not imply the bundle is free.

## 4 · Content gaps this page can win

Ranked by what the evidence supports, not by what is easy to write.

1. **The countable-points gap.** CBOS caps WHS at 4 points a year (`cbos-tas-reference` A3). A twelve
   course bundle heavy in safety content does not necessarily discharge twelve countable points, and
   a practitioner is audited on the split. Nobody states this. It is the strongest differentiator on
   the page and it comes from a regulator fact, not a marketing angle.
2. **The multi-licence rule.** Holding two licences means the **highest single** requirement, not the
   sum (A2). A builder-and-designer needs 20, not 32. This is, in the register's own words,
   "frequently mis-stated".
3. **Approval is course-specific.** Being a listed provider does not make every course approved (A4).
   ABE can name the approval per course; the member table already carries approval dates.
4. **Expiry transparency.** Every member course carries a CBOS approval that lapses after two years,
   and the page derives its list from that register. Two members expire 2026-12-05. No competitor
   shows this, because no competitor has the data plumbed to the page.
5. **Honest arithmetic on time.** About 10 hours, measured, against a 12-point requirement.

## 5 · Deviations and gaps in this stage

- **Competitor pages were not fetched.** `kb/register/competitor-pricing-snapshot.md` puts CPD pricing
  explicitly out of scope ("highly variable by hours and registration class"), so there is no
  competitor CPD data on disk and none was gathered live. The coverage matrix the stage asks for is
  therefore **not present**. Recorded as a gap rather than filled with inference. Pointsbuild is the
  named comparator in the register (A4) and is the obvious starting point for a later pass.
- **Connector volume is Hobart city-level**, per the skill's own warning about AU geography. Treated
  as relative priority, not national volume.
