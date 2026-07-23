# 02 · Keyword + content-gap analysis — /wa-owner-builder-course

**Demand:** GSC site-wide export `data/GSC/…2026-07-19.zip`. **SERP + competitor:** Neil Patel connector
(Perth, locId 1000676, updated 23 Jul 2026) plus a direct read of the top commercial competitor.
**Run type:** audit of a LIVE, high-performing page — this is optimisation, not a greenfield build.

---

## A · The page is ABE's strongest performer

| Page | Clicks | Impressions | CTR | Avg pos |
|---|---|---|---|---|
| **`/wa-owner-builder-course`** | **883** | **35,358** | 2.5% | **10.59** |
| (for scale) `/tas-owner-builder-course` | 394 | 14,219 | 2.77% | 12.19 |

Twice the TAS page's traffic. Any change here carries more risk and more upside than anything else in
the repo, which is the argument for auditing it rather than rebuilding it.

**Legacy URLs still bleeding impressions** (LearnWorlds-era, `/course/` + `/bundle/` + `/program/`):
`/course/wa-owner-builder-education-course` 2,167 impr @ pos 39, three `/bundle/…` URLs ~3,800 impr
combined, `/program/…` 1,048 impr. Per CLAUDE.md these paths should be robots-blocked; they are
competing with the canonical page for the same intent. **Redirect/robots item, not a content item.**

---

## B · Demand (GSC)

### The money cluster — already strong, little headroom

| Query | Clicks | Impr | CTR | Pos |
|---|---|---|---|---|
| **owner builder course wa** | **346** | 6,672 | 5.19% | **3.38** |
| owner builder course wa online | 55 | 874 | 6.29% | 5.83 |
| wa owner builder course | 31 | 445 | 6.97% | 4.20 |
| owner builder course perth | 22 | 570 | 3.86% | 4.36 |
| owner builders course wa | 20 | 594 | 3.37% | 5.65 |
| owner builder course western australia | 14 | 325 | 4.31% | 10.39 |
| best online owner builder course wa | 9 | 189 | 4.76% | 2.05 |

### The real opportunity — the "wrong word" cluster, ~1,000 impressions at ~0% CTR

| Query | Clicks | Impr | CTR | Pos |
|---|---|---|---|---|
| owner builder licence wa | 3 | **644** | **0.47%** | 8.61 |
| owner builder permit wa | **0** | 289 | **0%** | 9.53 |
| owner builder application wa | **0** | 216 | 0% | 12.28 |
| **form 75 owner builder** | **0** | 110 | **0%** | 9.23 |
| owner builder license wa / owner builders licence wa | 0 | 91 | 0% | ~7 |
| owner builder wa regulations | 0 | 73 | 0% | 13.64 |
| owner builder wa (head term) | 9 | 653 | 1.38% | 11.85 |

**This is the finding.** The page already has a dedicated `#licence` section titled *"Is it a licence, a
permit, or an approval?"* — built precisely for this cluster — and it converts at roughly **half a
percent**. And `form 75 owner builder` gets **zero clicks at position 9** on a page whose `<title>`
literally reads *"Form 75 Ready"*.

So the content exists and the ranking exists; **the snippet is not winning the click**. That is a
title/meta/structured-answer problem, not a "write more content" problem — a materially different
conclusion from a normal gap analysis, and only visible because GSC shows impressions against a page
that already ranks.

### Smaller, real intents the page does not serve
- `owner builder course wa tafe` (82) — people checking whether TAFE is the route.
- `owner builder course wa online free` (72) — free-seekers.
- `owner builder course wa reviews` (51, **7.84% CTR** — the highest on the list) — reviews intent.
- `owner builder insurance wa` (61 @ pos 20.8) — the page has an InsurancePartner block, ranking poorly.

---

## C · Live SERP — "owner builder course wa" (Perth, 23 Jul 2026)

| Pos | Domain | Note | DA |
|---|---|---|---|
| 1 | abed.com.au | **paid** | — |
| 2 | ownerbuildercentre.com.au (a **QLD** page) | **paid**, bidding a QLD page on a WA term | — |
| 3 | **wa.gov.au** owner-builder approval | organic, **250 clicks** | 49 |
| 4 | ownerbuildercentre.com.au/wa-owner-builder-course | top commercial organic | 22 |
| **5** | **abeeducation.edu.au/wa-owner-builder-course** | **ABE** | **9** |
| 6 | homebaseperth.com.au | Perth local | 18 |
| 7, 8 | *People Also Ask*, *People Also Search* | SERP features fire | — |
| 9 | ownerbuildercourses.com | blog-style | 17 |
| 10 | wa.gov.au "Becoming an owner-builder" fact sheet (PDF) | second gov result | 49 |
| 11-14 | obtraining, ownerbuilderclub, ownerbuildercentre (+White Card), ownerbuilderinstitute | long tail | 1-22 |

**Reads:** the regulator owns the informational slot (250 clicks at pos 3) and cannot be outranked on
authority, but does not sell. Two paid ads sit above everything. ABE is at **DA 9, ranking 5th against
DA 18-49** — the same "depth beats authority" position as White Card TAS. People Also Ask fires, so
answer-first capsules are the route into it.

---

## D · Coverage matrix — ABE vs the top commercial competitor

Owner Builder Centre (DA 22, pos 4), read directly 23 Jul 2026:

| Topic | Owner Builder Centre | ABE | Verdict |
|---|---|---|---|
| **Price** | **$238** | **$179** | **ABE 25% cheaper** |
| **Course + White Card bundle** | **$364** | **$278** | **ABE $86 cheaper** |
| Says "Form 75" | ❌ **never mentions it** | ✅ title, H1, throughout | **ABE wins outright** |
| Correct WA terminology | ❌ calls it an *"Owner Builder Permit"* | ✅ approval, with a section explaining why | **ABE wins** |
| Government approval fee ($212/$467) | ❌ absent | ✅ PriceCard, three payees | **ABE wins** |
| Two-year currency | ✅ | ✅ | parity |
| Six-year limit | ❌ | ✅ (and now correctly, from the permit) | **ABE wins** |
| **Four knowledge pathways** | ❌ | ✅ **added this run** | **ABE only** |
| Approval validity / lapse | ❌ | ✅ | **ABE wins** |
| Named expert + dated review | ❌ | ✅ | **ABE wins** |

**ABE is cheaper and materially more accurate than the page ranking above it.** The competitor uses the
wrong regulatory word and never names the form the reader must lodge. This is a positioning problem
(the better page ranks 5th behind a worse one at 4th), not a content-quality problem.

---

## E · Keywords proposed

- **Primary:** `owner builder course wa` — 6,672 impressions, 346 clicks, pos 3.38. Already the H1's
  target; keep it verbatim.
- **Secondary:** `owner builder course wa online` · `wa owner builder course` · `owner builder course
  perth` · `owner builders course wa` · `owner builder course western australia` · `best online owner
  builder course wa`.
- **Recovery cluster (the priority):** `owner builder licence wa` · `owner builder permit wa` ·
  `owner builder application wa` · `form 75 owner builder` · `owner builder wa`. Roughly **1,000
  impressions converting at ~0%**, against content that already exists.

---

## F · Ranked gaps ABE can win

1. **Win the click on the licence/permit/Form-75 cluster.** The answer is already on the page; the
   snippet does not say so. Candidates: surface "licence, permit or approval" and "Form 75" in the
   meta description; make `#licence` and the Form 75 answer the kind of short, quotable answer PAA and
   AI Overviews lift. **Highest value, lowest effort, no new research.**
2. **The four pathways are unique** (added this run). No competitor tells a registered builder or
   architect they can skip the course. Strongest honesty differentiator on the page.
3. **Price is a live advantage that is invisible in the SERP** — $179 against the $238 ranking above it.
4. **Perth locality** — 570 impressions at pos 4.36 on `owner builder course perth`; check the page
   actually says Perth.
5. **Reviews intent** — highest CTR term on the list (7.84%) with no reviews content on the page.
6. **Legacy `/course/`, `/bundle/`, `/program/` URLs** are self-competing on ~7,000 impressions.
   Robots/redirect work, tracked outside this run.

**Not a gap:** content depth. This page is more accurate and more complete than everything ranking
around it. The problem to solve is conversion of impressions it already has.
