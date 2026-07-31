# 02 — Keyword grounding + content gap — `white-card-nsw`

Run 1 August 2026. Demand read in the order the skill mandates: **GSC first**, then the Ubersuggest
connector for the terms ABE does not yet rank for.

---

## 1. GSC — what ABE already earns (page-filtered export)

Source: `business data/GSC/abeeducation.edu.au-Performance-on-Search-2026-08-01.zip`.
`Filters.csv` read first: **Search type Web · Last 16 months · Page contains `white-card`**. This is a
page-filtered export, not site-wide, and it is the export that satisfies the R4 query-coverage gate for
the White Card set.

Pages inside the filter:

| URL | Clicks | Impressions | Position |
|---|---|---|---|
| `/white-card-wa-online` | 141 | 41,586 | 9.01 |
| `/white-card` | 41 | 11,227 | 19.74 |
| `/tas-online-white-card` | 35 | 7,873 | 11.95 |
| `/payment?product_id=white-card-wa-enrol&type=course` | 0 | 128 | 66.70 |

### The finding that justifies this page

ABE has **no NSW White Card page**, yet its existing White Card URLs already collect **NSW intent** —
roughly **350 impressions across ~28 NSW-flavoured queries, zero clicks, average position ~45**.

| Query | Impressions | Position |
|---|---|---|
| white card nsw online courses | 100 | 64.55 |
| white card training online nsw | 54 | 37.98 |
| nsw white card online course | 43 | 43.77 |
| nsw white card training | 29 | 41.14 |
| nsw white card course online | 15 | 49.13 |
| white card nsw | 13 | 39.00 |
| online white card training nsw | 11 | 32.91 |
| *(21 further NSW variants, 1-8 impressions each)* | ~85 | 28-90 |

Two things follow, and the second is the important one:

1. The demand is real and ABE is already visible for it, badly — nothing above position 28.
2. **The pages catching it cannot serve it.** `/white-card-wa-online` and `/tas-online-white-card` sell
   self-paced online delivery, which a NSW resident is not permitted to use. Every one of those
   impressions is currently an unservable click at best and a compliance-confusing one at worst. A
   dedicated NSW page is the correction, not an expansion.

Also present, and worth carrying into the FAQ rather than the body: `can you get a white card online in nsw`,
`what is white card nsw`, `how to get a white card nsw`, `white card online nsw review`.

**R4 query-coverage parity gate: not applicable to this build.** There is no legacy NSW White Card URL,
so no query set is inherited and nothing can be silently dropped. This page is category C — new URL, no
redirect required.

---

## 2. Ubersuggest — the demand ABE cannot see

Neil Patel connector, `locId 1000286` (Sydney, New South Wales, Australia). AU is city-level only, so
these are **relative priority**, not national volume.

| Keyword | Volume | SD | Competition | CPC |
|---|---|---|---|---|
| **white card nsw** | **3,600** | 37 | 0.75 | $2.78 |
| white card sydney | 1,300 | 42 | 0.96 | $4.44 |
| nsw white card | 720 | 28 | 0.48 | $3.07 |
| white card online nsw | 590 | 29 | 0.79 | $3.38 |
| white card course sydney | 320 | 30 | 0.83 | $3.80 |
| online white card course nsw | 210 | 28 | 0.74 | $4.21 |
| white card training online nsw | 210 | 28 | 0.74 | $4.21 |
| white card parramatta | 210 | 39 | 0.84 | $2.44 |

For orientation, the unqualified head term `white card` runs 6,600 with SD 41, and `white card online`
1,900 with SD 36.

**Target keywords for this page:**

- **Primary: `white card nsw`** — 3,600 volume, SD 37, and ABE already holds impressions on the exact
  term (13 impr, position 39). It goes in the H1 verbatim.
- **Secondary:** `nsw white card` (720, SD 28), `white card online nsw` (590, SD 29),
  `white card course sydney` (320, SD 30), `online white card course nsw` (210, SD 28).

Two deliberate exclusions:

- **`white card sydney` is not a target.** Volume is real at 1,300 but competition is 0.96 and CPC
  $4.44, and the SERP is dominated by physical training venues in Sydney suburbs (Parramatta,
  Bankstown, Lidcombe, Blacktown, Penrith all appear as their own query clusters). ABE runs a virtual
  classroom with no venue, so it cannot answer a "near me" intent honestly. Chasing it would produce
  exactly the location-page filler this site does not build.
- **`cpccwhs1001` (70 volume, plus `cpccwhs1001 online`, `cpccwhs1001 nsw`) is not a target.** That is
  the **superseded** double-C unit code. Searchers still use it, but presenting it as current is a
  build failure that `system-health` explicitly checks for. Recorded here so the next run does not
  rediscover the volume and reach for it.

---

## 3. Competitor coverage matrix

Competitor set from the SERP for `white card nsw` / `white card online nsw`, plus the RTO partner's own
page (the closest possible comparison, since it sells the identical course).

| Topic | Upskill (direct) | Eclipse | WhiteCardWebinars | NWCC | Skillsify | **ABE gap?** |
|---|---|---|---|---|---|---|
| Price stated up front | ✅ $129 | ✅ from $99 | ✅ from $129 | ✅ from $99 | ✅ | no |
| Unit code named | ✅ | ✅ | ✅ | partial | ✅ | no |
| RTO number disclosed | ✅ | ✅ | ✅ | ✅ | partial | no |
| **Why NSW cannot be self-paced** | ✗ | ✗ | ✗ | ✗ | ✗ | **✅ open** |
| **What "connected delivery" actually means** | partial | ✗ | ✗ | ✗ | ✗ | **✅ open** |
| Session length stated | ✅ 7 hrs | partial | ✅ | ✅ | partial | no |
| PPE the student must bring | ✅ | ✗ | partial | ✗ | ✗ | **✅ open** |
| 100 points of ID / USI explained | ✅ | partial | partial | ✗ | ✗ | partial |
| **Who lodges the card application** | partial | ✗ | ✗ | ✗ | ✗ | **✅ open** |
| **60-day statement / 30-day card** | ✗ | ✗ | ✗ | ✗ | ✗ | **✅ open** |
| **Interstate card recognition in NSW** | ✗ | ✗ | ✗ | ✗ | ✗ | **✅ open** |
| **2-year lapse rule** | ✗ | ✗ | ✗ | ✗ | ✗ | **✅ open** |
| Digital card via Service NSW | ✗ | ✗ | ✗ | ✗ | ✗ | **✅ open** |
| Named expert reviewer, dated | ✗ | ✗ | ✗ | ✗ | ✗ | **✅ open** |
| Government sources cited | ✗ | ✗ | ✗ | ✗ | ✗ | **✅ open** |

---

## 4. The gaps ABE wins, ranked

1. **Answer "can I do this online in NSW?" honestly, and be the only page that does.** Every
   competitor either dodges it or implies self-paced availability. The true answer is specific and
   reassuring: yes, entirely online, but as a scheduled real-time session with a live trainer, because
   SafeWork NSW prohibits self-paced learning within connected delivery. This is the page's single
   distinctive asset and it should open the page, not sit in the FAQ. Directly serves
   `can you get a white card online in nsw`, `white card online nsw`, `online white card course nsw`.
2. **The card journey after the course.** Nobody explains that the RTO lodges the application, the
   statement covers 60 days, and the card takes about 30. This is the top post-purchase anxiety and it
   is entirely uncovered by the competitor set.
3. **Interstate recognition, both directions.** `qld white card in nsw` and `wa white card in nsw` are
   live query clusters, and SafeWork NSW answers them plainly. It also honestly deflects a reader who
   does not need to buy anything, which is the reassurance-first posture `DESIGN.md` §7 asks for.
4. **What you must have ready.** USI, 100 points of ID, your own PPE, a NSW location during the
   session, and an English-language assessment. Competitors bury or omit these, and each one is a
   failed enrolment.
5. **The 2-year lapse rule.** Answers `white card validity nsw` and creates a legitimate reason for a
   returning worker to re-enrol.
6. **E-E-A-T.** No competitor names a reviewer or cites the regulator. Standard ABE practice is a
   default win here.

---

## 5. Cannibalisation check

- Primary `white card nsw` is targeted by **no existing ABE page**. `/white-card-wa-online` targets WA
  terms, `/white-card-tas` TAS terms, `/white-card` is the hub.
- Links go **up** to `/white-card` (once W3-6 exists) and to `/accreditation` and `/experts`. **No
  sideways links** to the WA or TAS course pages — they are competing spokes, and in this case also
  legally wrong for a NSW reader.
- The `/white-card` breadcrumb must be omitted until W3-6 ships, exactly as `/white-card-wa` and
  `/white-card-tas` already do. `check-links` holds breadcrumbs stricter than `PLANNED`.
