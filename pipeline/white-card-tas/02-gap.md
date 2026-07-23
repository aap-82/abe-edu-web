# 02 · Keyword + content-gap analysis — /white-card-tas

**Demand source:** GSC site-wide export `data/GSC/…2026-07-19.zip` (Queries.csv, Pages.csv).
**Competitor source:** live SERP for "white card tasmania" via the Neil Patel connector
(Ubersuggest engine, Hobart locId 1000480, updated 22 Jul 2026), **plus** the Blue Dog Training TAS
page read directly (the delivering RTO). Google's own SERP was bot-blocked, but the connector — which
IS authenticated in this session (free tier) — supplied the ranked set, so section D is **read, not
inferred**. `match_keywords` returned no expansions on free tier, so city-level volume estimates are
unavailable; GSC impressions (§A) are the demand spine instead.

---

## A · Demand (GSC, ABE's own impressions)

### TAS White Card terms — real impressions, page 2–3 positions, almost no clicks

| Query | Clicks | Impr | CTR | Avg pos |
|---|---|---|---|---|
| **white card tasmania** | 2 | **1029** | 0.19% | 22.53 |
| white card tas | 0 | 427 | 0% | 28.52 |
| white card tasmania online | 1 | 231 | 0.43% | 12.03 |
| white card tas online | 0 | 217 | 0% | 21.94 |
| cpd… (excluded, not WC) | — | — | — | — |
| white card course tasmania | 0 | 92 | 0% | 24.13 |
| white card training tasmania | 0 | 90 | 0% | 19.68 |
| white card online tasmania | 0 | 47 | 0% | 10.81 |
| tasmania white card | 0 | 41 | 0% | 15.95 |
| tasmanian white card | 0 | 33 | 0% | 30.45 |
| tasmania white card online | 0 | 29 | 0% | 11.10 |
| online white card tasmania | 1 | 13 | 7.69% | 8.62 |

**≈ 2,250 TAS-specific White Card impressions, positions 9–29, near-zero clicks.** That is the
opportunity in one line: real demand, ABE ranking on page 2–3 with no dedicated canonical page.

### Brand-adjacent (Blue Dog) — the RTO partner's name is a query

| Query | Clicks | Impr | Avg pos |
|---|---|---|---|
| bluedog white card | 0 | 1121 | 6.59 |
| blue dog white card | 1 | 533 | 8.12 |
| blue dog training white card | 1 | 440 | 7.13 |
| + "replacement" / "answers" / "online" variants | — | ~300 combined | 5–12 |

The page **names Blue Dog Training (RTO 31193)** anyway — the ASQA model requires it — so this is
aligned, not a conflict. Naming the RTO is both compliant and on-demand.

### Cost + cross-sell intent

- Cost intent is live on the sibling state ("white card wa cost", "white card cost wa"). No TAS page
  answers total cost.
- **"white card and owner builder course"** — 89 impr, **5.62% CTR** (high intent). ABE's strongest
  TAS page is `/tas-owner-builder-course` (394 clicks, 14,219 impr). Cross-sell pathway is real.

---

## B · Primary + secondary keywords

- **Primary (H1, verbatim):** **white card tasmania** — highest TAS-specific volume (1029 impr),
  worst position of the big terms (22.53), so the most headroom.
- **Secondary:** white card tas · white card tasmania online / online white card tasmania · white card
  course tasmania · white card training tasmania · tasmania white card.
- **Body-natural / brand:** Blue Dog Training, RTO 31193, CPCWHS1001, construction induction card.

---

## C · Cannibalisation + migration (must handle at build/cutover)

ABE already ranks two pages on these terms:

| Existing page | Clicks | Impr | Avg pos | Disposition |
|---|---|---|---|---|
| `/tas-online-white-card` | 33 | 7,092 | 11.81 | **Legacy TAS WC page. 301 → `/white-card-tas` at cutover.** |
| `/white-card` (national hub) | 38 | 10,902 | 19.92 | Hub. New page links **up** to it, not sideways. |

**Consequences for this run:**
1. `/white-card-tas` is the canonical W3-4 slug; `/tas-online-white-card` is the equity it inherits.
   A redirect `/tas-online-white-card` → `/white-card-tas` is a cutover redirect-map item (flag for
   `generate-redirects.mjs` / `check-redirect-targets.mjs`). **Not built in this run** — the page
   ships noindex, so it cannot compete with the legacy page yet regardless.
2. Link **up** to `/white-card` and **across-and-down** to `/tas-owner-builder-course` (cross-sell),
   never sideways to WA/other-state WC pages.

---

## D · Live SERP — "white card tasmania" (Hobart, connector, 22 Jul 2026)

| Pos | Domain | Page | DA | Type |
|---|---|---|---|---|
| 1 | service.tas.gov.au | Apply for a white card | 44 | gov (informational) |
| 2 | tastafe.tas.edu.au | White Card CPCWHS1001 | 37 | TAS TAFE |
| 3 | eot.edu.au | White Card TAS — Official Online Course | 33 | aggregator RTO |
| 4 | worksafe.tas.gov.au | White cards (construction induction) | 41 | gov (informational) |
| 5 | **bluedogtraining.com.au/white-card-tasmania** | White Card Tasmania | 29 | **the delivering RTO** |
| 5 | — | *AI Overview* | — | SERP feature |
| 6 | **abeeducation.edu.au/tas-online-white-card** | "White Card Tasmania — Site-Ready Online 2026" | **9** | **ABE legacy page** |
| 6 | — | *People Also Ask* | — | SERP feature |
| 7,10 | skillstrainingcollege.com.au | White Card Course Hobart — Same-Day | 31 | aggregator RTO |
| 8 | inscope.edu.au | Tasmania White Card | 16 | aggregator RTO |
| 9 | ablis.business.gov.au | GCIC (White Card) — Tasmania | 69 | gov (business listing) |
| 11 | service.tas.gov.au | Replacement white card | — | gov |
| 12 | trainingaid.edu.au | White Card TAS Online | — | aggregator RTO |

**What the SERP says:**
- **Gov-and-aggregator page.** 4 of 12 are `.gov.au` — they inform, they don't sell. The commercial
  slots are held by templated aggregators (eot, skillstrainingcollege, inscope, trainingaid) + Blue Dog.
- **ABE's legacy page already ranks #6 at DA 9**, above competitors at DA 16–33. Content/intent match
  is carrying it, not authority — so **depth wins here, not domain strength**. It also confirms the
  equity is real and the 301 (§C) matters.
- **AI Overview + People Also Ask + Related Searches all fire.** Answer-first capsules and a real FAQ
  are the route into those features — the archetype's default structure is on-strategy.
- tastafe ranks #2 with **CPCWHS1001 in the title** — the unit code is a live query qualifier, so
  the page states it (and confirms the sitemap's CPCCWHS1001 would have been a miss).

### Coverage matrix (BD read live; aggregators from SERP titles + category norms)

| Topic | Blue Dog (read) | Aggregators (eot/skills/inscope) | Gov (Service/WorkSafe TAS) | **ABE opportunity** |
|---|---|---|---|---|
| Price stated | ✅ $59.00 | mixed | n/a | Match ($59), add **total cost** |
| **$13.72 gov card fee** | ❌ | ❌ | ✅ (buried) | **WIN — two-cost structure, nobody surfaces it** |
| **60-day lodgement window** | ❌ | ❌ | ✅ (buried) | **WIN — the #1 failure point** |
| **In-person Service TAS lodgement** | ❌ | ❌ | ✅ | **WIN — TAS-specific, unknown to most** |
| Card issued by WorkSafe TAS | ✅ | ~ | ✅ | Match, state plainly |
| Self-paced online = TAS residents only | ~ (residency ID) | ❌ | ~ | **WIN — say who qualifies, plainly** |
| Video/PPE assessment explained | ~ (PPE list) | ❌ | n/a | **WIN — tie PPE demo to why online is allowed** |
| USI requirement | ✅ | ~ | n/a | Match — pre-course readiness |
| National recognition | ✅ | ✅ | ✅ | Match |
| Owner-builder cross-sell | ❌ | ❌ | n/a | **WIN — real intent, ABE has the OB page** |
| Named expert / reviewer (E-E-A-T) | ❌ | ❌ | n/a | **WIN — developer + independent reviewer** |
| Sourced/dated gov facts | ❌ | ❌ | ✅ | **WIN — VerifiedSources + Consolidated Sources** |

---

## E · Ranked gaps ABE wins

1. **Total-cost transparency** — $59 to ABE **+ $13.72** to Service Tasmania. Unique; answers live
   cost intent.
2. **Getting the card: the 60-day window + in-person Service Tasmania lodgement + ID docs.** The
   highest-value distinctive material, the most common failure point, surfaced by no competitor and
   only buried on gov pages.
3. **Residency clarity** — self-paced online is legitimately open to **TAS residents**; say so where
   the claim is made, don't imply it's open to everyone.
4. **Why online is allowed** — the supervised **video/PPE demonstration** is what makes self-paced
   compliant post-2019. Turns a compliance constraint into a reassurance.
5. **Owner-builder cross-sell** — 5.62% CTR intent; link to `/tas-owner-builder-course`.
6. **E-E-A-T + sourced facts** — named developer and independent reviewer, every gov fact dated and
   cited. No competitor does this.

**Residual gap:** free-tier `match_keywords` returned no volume/difficulty rows, so there is no
city-level volume estimate — GSC impressions (§A) stand in as the demand measure, which for a page ABE
already ranks on is the stronger signal anyway. The organic SERP is read (§D); the local map pack was
not separately pulled. Re-run a connector volume pass if a paid tier becomes available before launch.
