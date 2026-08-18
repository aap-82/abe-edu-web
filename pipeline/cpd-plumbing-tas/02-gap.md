# 02 — Keyword and gap analysis — /cpd-plumbing-tas

**Run 18 August 2026.** Supersedes the "Not run, and why" version of this file, which recorded a
deliberate skip and named the condition for closing it: *"This must run before `noindex` comes off."*
That condition is now met. The page is still `noindex` and still blocked on one hero image, so
nothing here has been applied — this artefact is findings and recommendations only.

## Data sources, and what each can and cannot say

| Source | Status | Covers |
|---|---|---|
| GSC per-page export, `+tas-cpd-plumber-courses`, 16 months | **obtained 18 Aug 2026** | ABE Education's actual demand on the legacy URL that 301s here |
| Neil Patel connector (`match_keywords`, `serp_analysis`) | **partial** | modelled volume, CPC, live SERP |
| `location_suggest` | **UNAVAILABLE** — HTTP 429 on every attempt | AU city `locId` |

**The R4 gate is satisfied**: a per-page export exists and its `Filters.csv` was read first
(`Page,+tas-cpd-plumber-courses`). The four older exports in `business data/GSC/` were each checked
the same way — only the 2026-07-19 one is site-wide; the rest are filtered to NSW owner builder,
white card and white-card-wa, and none covers this URL.

**Mode B is PARTIAL, and the limitation is named rather than hidden.** `match_keywords` and
`serp_analysis` returned data, but `location_suggest` was rate-limited throughout, so no Australian
city `locId` was obtainable and every connector figure below is the backend default (US-weighted;
`serp_analysis` self-reports `"location":"United States"`). **Treat connector volumes as relative
priority only, never as Australian search volume.** The SERP composition is still informative
because the ranking domains are almost all `.au` and the regulator ranks first, but the ordering is
indicative. No volume figure has been invented to fill the gap.

## Finding 1 — the impressions are a mirage. 79% are for products ABE Education does not sell

The legacy URL earns **38 clicks and 1,407 impressions** at average position 24.88. That looks like
equity worth capturing. Classifying all 84 visible queries by intent says otherwise:

| Intent | Queries | Impressions | Share | Typical position |
|---|---|---|---|---|
| **A · become-a-plumber TRAINING** | 55 | 296 | **54%** | 40–70 |
| **B · plumber BUSINESS training** | 5 | 137 | **25%** | 67–94 |
| C · CPD, the actual product | 12 | 61 | 11% | 1–48 |
| Brand | 6 | 40 | 7% | 1–12 |
| E · TAS local / other | 7 | 17 | 3% | 13–78 |
| | **84** | **551** | | |

**Every one of the 84 visible queries has zero clicks.** The 38 clicks in `Pages.csv` come entirely
from queries GSC anonymised below its visibility threshold.

Group A is people wanting to *become* a plumber or obtain a plumbing qualification: "online plumbing
courses" (67 impressions), "online plumbing certification" (26), "plumber certification online"
(23), "free plumbing courses" (3). Group B wants business training: "plumber business course" (59),
"plumber business training" (35). **ABE Education sells neither.** Its product is CPD for plumbers
who already hold an occupational licence.

So the 1,407 impressions are not equity `/cpd-plumbing-tas` should try to preserve. Chasing them is
what produced an average position of 24.88 in the first place.

## Finding 2 — the average position is a blend artefact, and it hides the real story

Split by intent, the same page ranks in two completely different places:

| Query | Impressions | Position |
|---|---|---|
| plumbing cpd points online | 1 | **1** |
| cpd points plumbing | 5 | **2.4** |
| cpd plumbing | 15 | **8** |
| plumber continuing education | 1 | 10 |
| | | |
| plumber certification online | 23 | 48.65 |
| online plumbing certification | 26 | 64.96 |
| plumber business course | 59 | 67.37 |
| plumber business program | 5 | 94.4 |

**On genuine CPD intent this page is already a top-ten result. On everything else it is on page
five.** The 24.88 average is those two averaged together, and reading it as "this page ranks badly"
is wrong. It ranks well for the right thing and badly for things it should never have targeted.

## Finding 3 — the H1 carries a term nobody searches

Current H1: *"Plumber CPD Tasmania: a full twelve-point year in one purchase"*.

`plumber cpd tasmania` returns **zero impressions in sixteen months of GSC** and **zero modelled
volume** on the connector. Meanwhile the phrasing the page already ranks 1st, 2.4th and 8th for —
`cpd points plumbing`, `plumbing cpd points online`, `cpd plumbing` — appears nowhere in the H1.

Searchers in this niche use **"CPD points"**, not "CPD". The register's own product language agrees
(courses are approved *for points*), and so does the sibling evidence: `electrical cpd points
tasmania` is a real query at 113 impressions and position 7.66 site-wide.

## Finding 4 — connector calibration, and why the tiny numbers are trustworthy

Modelled volume for this niche is near zero, which would normally read as instrument failure. It was
calibrated against known-answer rows before being believed:

| Term | Connector volume | Known answer |
|---|---|---|
| white card | 49,500 | ABE Education's largest product line ✓ |
| cpd points | 14,800 | ✓ |
| builders cpd online | 90, CPC $7.64 | 824 GSC impressions ✓ |
| **electrical cpd points tasmania** | **10** | **113 GSC impressions / 16 months ≈ 7 per month ✓ agrees** |
| cpd tasmania | 10, CPC $4.57, competition 0.22 | — |
| plumber cpd tasmania | 0 | 0 GSC impressions ✓ agrees |
| plumber cpd / plumbing cpd course | 0 | — |

The instrument reads real demand where real demand exists, and agrees with GSC on the one row where
both have data. **The niche is genuinely tiny, and genuinely valuable**: CPC $4.57 on `cpd tasmania`
against competition 0.22 is high commercial intent with weak competition, for an audience legally
required to buy every year.

## Finding 5 — the niche is weakly defended, and domain authority is not the barrier

Live SERP for `cpd points tasmania` (indicative ordering, US-located):

| # | Domain | DA | What it is |
|---|---|---|---|
| 1, 7 | cbos.tas.gov.au | 44 | the regulator. Informational, not a competitor for a purchase |
| 2 | bem.pointsbuild.com.au | 30 | CPD marketplace — **NOT READ**, JS-rendered, WebFetch returned the title only |
| 3 | hia.com.au | 49 | industry association |
| 4 | lst.org.au | 37 | Law Society. Different profession, irrelevant |
| 5 | propertyagentsboard.com.au | 29 | real estate. Different |
| 6 | tasmanianelectricalcpdacademy.com.au | **7** | electrical only |
| 8 | tas.cpdtoolbox.com.au | **8** | free tracker |
| 9 | **abeeducation.edu.au/tas-cpd-index** | **8** | ABE Education's own legacy hub |
| 10 | mpatas.com.au | 19 | Master Plumbers Association Tasmania |

**ABE Education's DA of 8 equals CPD Toolbox and beats the electrical academy.** Authority is not
what is holding this page back.

Three of these already appear inside ABE Education's own query list, which confirms they are the
real competitive set rather than a modelled guess: `cpd toolbox` (5 impressions), `tasmanian cpd
academy` (1) and `master plumbers tasmania` (4).

## Finding 6 — the content gap: every direct competitor omits the commercial facts

Coverage matrix, read from the live pages:

| Topic | MPA Tas | CPD Toolbox | ABE `/cpd-plumbing-tas` |
|---|---|---|---|
| Who must do CPD | ✅ | — | ✅ |
| Annual point requirement (twelve) | ❌ | ❌ | ✅ |
| Points per course | ❌ | ❌ | ✅ |
| **Price** | ❌ | ❌ (free tracker, sells nothing) | ✅ $499 |
| Named course list | ❌ | ❌ ("E-learn training" only) | ✅ twelve named |
| Time to complete | ❌ | ❌ | ✅ |
| Renewal deadline | ❌ | ❌ | partial |
| Consequences of non-compliance | ❌ | ❌ | partial |
| Record-keeping | ❌ | ✅ (its whole product) | ✅ |

**MPA Tasmania, the one plumbing-specific competitor, states not a single figure.** No point total,
no cost, no course list, no deadline, no consequence. It describes the obligation and hands the
reader to CPD Toolbox. CPD Toolbox is a free *tracker*: it records points, does not sell courses,
and shows no prices and no point totals anywhere.

**Nobody in this SERP tells a Tasmanian plumber what CPD costs or what they get for it.** That is
the gap, it is ABE Education's by default, and `/cpd-plumbing-tas` already fills it.

## Recommendations

Ordered. None applied — Stage 2 scope was analysis only.

1. **Retarget the H1 onto "CPD points"**, the phrasing the page already ranks 1 to 8 for. Something
   carrying *plumber CPD points* and *Tasmania*, keeping the twelve-point promise. `plumber cpd
   tasmania` has zero measured demand and should not be the H1's keyword.
2. **Do not chase Groups A and B.** No "plumbing courses", "plumbing certification" or "plumber
   business" copy. 79% of the legacy page's impressions come from there and none of it can convert.
   The clean-URL page inheriting the 301 should deliberately shed them.
3. **Primary keyword: `plumber cpd points tasmania`** (cluster: `cpd points plumbing`, `cpd
   plumbing`, `plumbing cpd points online`). **Secondary:** `cbos cpd points`, `plumber continuing
   education tasmania`.
4. **`cpd points tasmania` belongs to `/cpd-tas`, not here.** It is the highest-impression
   right-intent query (19) and `/tas-cpd-index` already ranks 9th for it. Hub owns broad, spoke owns
   trade — 🟡 Adjacent, resolved to the hub. Keep the link direction up and down, never sideways.
5. **Close the two partial rows**, renewal deadline and consequences of non-compliance. Both are
   competitor-wide blanks, both are exactly what a licensed plumber is anxious about, and both are
   regulatory facts needing `kb/register/cbos-tas-reference.md` provenance before they are written.
6. **Re-read `bem.pointsbuild.com.au`** with a renderer. It is the second result and the only
   competitor that may actually sell TAS CPD with prices. Its coverage row above is unknown, not
   empty, and this analysis is not complete until it is read.

## Cannibalisation register

| Keyword | Flag | Owner | Note |
|---|---|---|---|
| cpd points tasmania | 🟡 Adjacent | `/cpd-tas` | hub broad vs spoke specific; different intent levels |
| plumber cpd points tasmania | 🟢 Clear | `/cpd-plumbing-tas` | no other ABE Education page targets it |
| cpd plumbing / cpd points plumbing | 🟢 Clear | `/cpd-plumbing-tas` | already ranks 8 and 2.4 |
| cbos cpd points | 🟡 Adjacent | `/cpd-tas` | state level; the spoke may support it |
| plumbing courses online | ⛔ Do not target | none | a product ABE Education does not sell |

Page hierarchy verified from `dist/`: `/cpd` (national) → `/cpd-tas` (state) → `/cpd-plumbing-tas`
(trade). Titles are distinct at each level. No conflict.

## What this analysis does NOT cover

- **AU-localised volume.** `location_suggest` was 429 throughout and no city `locId` was obtained.
  All connector figures are backend-default and US-weighted.
- **`bem.pointsbuild.com.au`**, the number two result. JS-rendered, not read. See recommendation 6.
- **`/tas-plumber-practitioner-cpd`**, the second legacy URL folding in here (10 clicks, 565
  impressions, position 17.79). No per-page export was pulled for it. Its better average position
  than the main legacy URL suggests a cleaner intent profile, and it is worth a look.
- **Post-publish rank tracking.** Registering the primary and secondary keywords in the connector is
  a Stage 7.5 step and happens once the page is indexable.
