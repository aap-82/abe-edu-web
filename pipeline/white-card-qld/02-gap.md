# 02 · Keyword grounding + competitor content gap — /white-card-qld

**Sources, in the order the skill requires:**
1. **GSC, page-filtered by proxy** — no QLD-specific page-filtered export exists (there is no QLD
   White Card page to filter to). `business data/GSC/abeeducation.edu.au-Performance-on-Search-2026-08-01.zip`,
   `Filters.csv` → `Page: +white-card`, 16-month window, is the same per-page export the 2 Aug position
   assessment used for the hub. Its `Pages.csv` confirms **zero legacy QLD White Card URL exists at
   all** — this is genuinely new-demand capture, not equity protection. Its `Queries.csv` was
   full-text-searched for `qld`/`queensland` for the scraps ABE's other pages already pick up.
2. **Neil Patel connector (Ubersuggest)** — `match_keywords`, national (no `locId` needed for the
   `match_keywords` endpoint; `location_suggest` resolved Brisbane to locId 1000339 for future
   `serp_analysis` calls, but that endpoint returned a server-side schema error today — null titles in
   two SERP rows broke the tool's own response validation. Recorded as a tool defect, not a data gap;
   worked around with a direct web search for the competitor set instead.
3. **Competitor pages** — read directly (WebFetch) rather than via the broken `serp_analysis` call,
   3 Aug 2026.

---

## 1 · Demand — this is uncontested new-demand capture, not a ranking fight

**No legacy URL exists.** Unlike WA (`/white-card-wa-online`, 41,586 impr) and TAS
(`/tas-online-white-card`, 7,873 impr), QLD carries **zero inherited equity**. `Pages.csv` for the
`+white-card` filter shows exactly three ABE URLs and none is QLD. This page starts from nothing.

**But real demand exists, and it is larger than ABE's own GSC data can currently show** — GSC only
reflects impressions on pages ABE already has, so a page-less state shows almost nothing there. The
Neil Patel connector (which measures demand independent of ABE's current rankings) tells the real
story:

| Keyword | Volume | Page Difficulty | Competition | Note |
|---|---|---|---|---|
| **white card qld** | **5,400** | 73 | 0.73 | The head term. Highly competitive — established RTOs have owned this for years. |
| **white card online qld** | **2,400** | 73 | 0.73 | |
| **online white card qld** | **2,400** | 73 | 0.73 | Same intent, reordered — Google treats these near-identically |
| **blue dog training white card qld** | **2,400** | **20** | 0.2 | **The opportunity.** Branded, low competition — ABE's actual RTO partner, and almost nobody else can legitimately rank here |
| how to get a white card qld | 480 | 69 | 0.69 | |
| construction white card qld | 480 | 67 | 0.67 | |
| white card qld online | 390 | 73 | 0.73 | |
| white card qld online course | 260 | 75 | 0.75 | |

**GSC's own scraps corroborate the pattern**, all currently going to whatever page happens to rank
(the hub, the QLD owner builder page, or nothing):

| Query | Impressions | Position | Clicks |
|---|---|---|---|
| master builders white card qld | 31 | 10.16 | 0 |
| do i need a white card for owner builder permit qld? | 14 | 12.71 | 0 |
| white card training online qld | 11 | 52 | 0 |
| white card construction qld online | 4 | 35.75 | 0 |
| white card online qld | 3 | 28.67 | 0 |
| worksafe qld white card | 3 | 58.33 | 0 |
| bluedog white card qld | 2 | 51 | 0 |
| qld white card online | 1 | 1 | 0 |

That last row — "qld white card online" at **position 1, 1 impression, 0 clicks** — is a single
low-volume query, not evidence of ranking strength; it is included because it is the only query in the
whole export where ABE's site (almost certainly the owner builder page or hub, mentioning White Card in
passing) already sits at the very top, and it shows the intent exists even at the long tail.

**Primary keyword: "white card qld"** — the H1 target, matching the head term and the pattern set by
`white-card-wa` (H1 "White Card WA", not "White Card WA Online", even though online is the whole
differentiator). "Online" carries the hero subhead and the `#online` section instead.
**Secondary: "blue dog training"** — the low-competition branded opportunity, which argues for naming
Blue Dog early and prominently (same lesson `white-card-wa`'s `01-source-map.md` already drew from its
own branded-query CTR data).

---

## 2 · Competitor coverage matrix

Two organic competitors read in full (WebFetch), 3 Aug 2026, both ranking for CRTD-shaped QLD queries:

| | **whitecardwebinars.com.au** (RTO 46244) | **noc.edu.au** (National Online Courses, RTO 41072) | **ABE (this page)** |
|---|---|---|---|
| Price | $139 | $120 | **$99** — cheapest of the three |
| Duration | "5-6.5 hrs (most of a full day)" | 5 hrs (one FAQ says ~6 incl. assessment) | 4.5 hrs minimum stated as the regulator's floor, not a fixed number |
| Delivery mode named | "Connected Real-Time Delivery (CRTD) via Zoom" | "live, instructor-led virtual classroom" | CRTD, WHSQ's own term, explained as **WHSQ's own definition of face-to-face** |
| Location test wording | **"reside in Queensland"** — residency language | **"physically located in Queensland during the course"** — matches the regulator | **"physically located in Queensland"** — matches the regulator, never "resident" |
| CRTD-approval gate explained | Names that WorkSafe QLD approves "selected RTOs" but not that it is a **separate, second approval** on top of base registration | Not mentioned at all | **Explicit**: CRTD needs its own two-step WHSQ approval; 13 of 226 GCIT RTOs hold it; Blue Dog is one, named with its approval date |
| The stale rural/100km claim | **Repeats it, muddled with CRTD**: "WHS QLD does not allow purely online White Cards except for some rural and remote locations (100kms from nearest White Card RTO classroom). Instead, Queensland allows... CRTD." This conflates a **superseded 2019 exception** (gone since the Nov 2022 CRTD regime) with the actual, distance-independent CRTD rule | Not mentioned | **Not repeated.** ABE's page states CRTD is available to anyone physically in Queensland, full stop — no remoteness test, because the Nov 2022 regime replaced the old one |
| PPE requirement detail | Not itemised | 4 items: safety glasses, earplugs, hard hat, hi-vis | **5 items, sourced to the actual condition**: eye protection, hearing protection, hard hat, hi-vis, **and a copy of the WHS Act 2011 (Qld)** — the fifth item every competitor read here omits |
| 15:1 ratio cap mentioned | No | No | **Yes** — a genuine compliance detail neither competitor states |
| 24-hour WHSQ notification mentioned | No | No | Not planned as page copy (too operational/RTO-internal for a reader), but known and available if a "how strict is this" doubt needs defusing |
| Assessment mandated by regulator, not RTO | No | No | **Yes** — cond. 36, a trust signal neither competitor uses |
| RTO named clearly | Yes (RTO 46244) | Yes (RTO 41072) | Yes — Blue Dog Training, RTO 31193, **with the CRTD approval date**, which neither competitor's RTO discloses for itself |

## 3 · The gaps ABE wins, in priority order

1. **Accuracy on the one point competitors get wrong.** whitecardwebinars.com.au's "100km rural
   exception" framing is a real, live inaccuracy — the Nov 2022 CRTD regime superseded it, and CRTD's
   actual gate is a **per-RTO approval**, not distance. A reader who has seen that claim elsewhere and
   lives in metro Brisbane may wrongly conclude they don't qualify. Correcting this, sourced to the
   regulator's own conditions, is a genuine E-E-A-T win, not just a differentiator.
2. **"Ask if your provider is CRTD-approved, not just GCIT-registered."** Neither competitor states
   that CRTD needs a *separate* approval most RTOs do not hold. This is the strongest trust argument on
   the page — the same shape as `white-card-wa`'s "check RTO 31193 yourself" section, extended to a
   second, less obvious credential.
3. **Location, never residency.** noc.edu.au already gets this right; whitecardwebinars.com.au does
   not. Matching the regulator's own wording is the WA lesson repeated in a new state.
4. **Price.** $99 beats both competitors' $139 and $120 while including the same live trainer-led
   delivery — a genuine, statable advantage, not a race-to-the-bottom claim.
5. **The fifth PPE item.** The WHS Act 2011 (Qld) copy requirement (cond. 38) is specific, sourced, and
   omitted by every competitor read here — a small but real accuracy edge.

## 4 · What this page must not do

- Must not claim "approved by WHSQ" of **ABE Education** — the CRTD approval belongs to Blue Dog.
- Must not use "resident" anywhere the regulator says "physically located."
- Must not describe the 4.5-hour minimum as a fixed session length ("the course takes 4.5 hours") —
  it is the regulator's floor; Blue Dog's actual scheduled sessions may run longer (both competitors
  read here run 5-6.5 hrs), and no ABE-specific session length was confirmed this session.
- Must not repeat any rural/remoteness/100km framing, correct or muddled — it does not apply.
