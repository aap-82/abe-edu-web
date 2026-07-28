# 02 · Keyword grounding + competitor content gap — /white-card-wa

**Sources, in the order the skill requires:**
1. **GSC, page-filtered — the primary source.**
   `business data/GSC/white card wa abeeducation.edu.au-Performance-on-Search-2026-07-28.zip`,
   filtered to `+https://www.abeeducation.edu.au/white-card-wa-online`, last 16 months, supplied by
   Andrey and read 28 Jul 2026. **479 queries attributed to this page.**
2. **GSC, site-wide** — `…2026-07-19.zip`, used for cross-page context (the hub, TAS) only.
3. **Neil Patel connector (Ubersuggest)** — `keyword_suggestions` + `serp_analysis`, locId 1000676
   (Perth), data updated 27 Jul 2026. Perth is a city-level figure, so volumes are read as relative
   priority, never as national volume.
4. **Competitor pricing** — `kb/register/competitor-pricing-snapshot.md` §2, snapshot 27 May 2026,
   plus live SERP titles read 28 Jul 2026.

> **Limitation closed.** An earlier draft of this file recorded that no per-page query breakdown
> existed, so the parity gate could only use "WA-marked queries" as a proxy. Andrey supplied the
> page-filtered export mid-run. **§6 is now the mechanical R4 gate it is supposed to be**, and every
> figure below is attributed to this page rather than inferred from the site-wide set. Where the two
> exports differ slightly, the page-filtered one (9 days newer) is used.

---

## 1 · Page-level demand (GSC, 16 months)

| URL | Clicks | Impressions | CTR | Position | Source |
|---|---|---|---|---|---|
| `/white-card-wa-online` | **131** | **39,960** | **0.33%** | **9.04** | page-filtered, 28 Jul |
| `/white-card` (hub) | 38 | 10,902 | 0.35% | 19.92 | site-wide, 19 Jul |
| `/tas-online-white-card` | 33 | 7,092 | 0.47% | 11.81 | site-wide, 19 Jul |
| `/payment?product_id=white-card-wa-enrol&type=course` | 0 | 102 | 0% | 63.42 | site-wide, 19 Jul |

`/white-card-wa-online` is the largest White Card asset ABE has and the third-largest page on the
site. The last row is a checkout endpoint that should not be indexable at all — see `01` §C-1.

---

## 2 · The finding that matters most: this is a click problem, not a ranking problem

**The page ranks on page one and is not clicked.** 0.33% CTR at position 9.04. Published CTR curves
put position 9 at roughly 1.5% to 2.5%. At 2%, 39,960 impressions would return about 800 clicks
against an actual 131 — a gap of roughly six times, or about 670 clicks over the 16 months.

The page-filtered query rows make it far sharper. Filtering this page's own queries to **top-ten
position, at least 80 impressions, and zero clicks** returns ten rows totalling **2,455 impressions
and not one click**:

| Query | Impressions | Position | Clicks |
|---|---|---|---|
| bluedog white card | 1,116 | 6.67 | **0** |
| wa white card online | 341 | 8.83 | **0** |
| worksafe wa white card online | 232 | 6.08 | **0** |
| how to pass the wa white card online course and assessment? | 154 | 7.91 | **0** |
| blue dog training white card wa | 153 | 5.60 | **0** |
| white card blue dog | 124 | 7.40 | **0** |
| blue dog training white card online | 90 | 7.19 | **0** |
| bluedog white card training | 83 | 5.83 | **0** |
| white card check wa | 82 | 9.17 | **0** |
| white card blue dog training | 80 | 7.44 | **0** |

A page that ranks sixth and is never clicked is not being out-ranked, it is being **out-answered in
the snippet**.

**The Blue Dog brand cluster is the single largest wasted asset on the page.** Eight queries carrying
the RTO partner's name — bluedog white card, blue dog training white card, blue dog white card, blue
dog training white card wa, white card blue dog, blue dog training white card online, bluedog white
card training, white card blue dog training — total **2,460 impressions and 2 clicks at an average
position around 6.5**. That is a **CTR of 0.08%** on the name of the organisation that actually
delivers the course.

People are searching for Blue Dog, finding ABE in the top ten, and not clicking, because nothing in
the snippet tells them ABE has anything to do with Blue Dog. Naming the RTO partner in the title, the
meta description and the first section is therefore not only the archetype's trust requirement and an
ASQA obligation — it is the highest-value SEO change available on this page. It is the evidence behind
moving `partnerRto` to `after-hero` in `03-briefs.md`.

**So the primary job of this rebuild is the SERP snippet and the answer capsules, not the ranking.**
That reframes the usual priority order and should survive into Stage 3.

---

## 3 · Target keywords

**Primary: `white card wa`** — **5,154 impressions**, the highest-impression query this page holds,
transactional, matches the target slug. Connector: 2,400/mo (Perth), SD 34, CPC ~$2.97. Currently
position 10.68 at 0.19% CTR. Goes in the H1 verbatim.

**Secondary, each mapped to a section rather than sprinkled** (all figures page-attributed):

| Keyword cluster | Impr | Pos | Where it is answered |
|---|---|---|---|
| **blue dog cluster** (8 queries, see §2) | **2,460** | ~6.5 | `#real` + PartnerDisclosure **after-hero** |
| white card wa online / online white card wa / wa white card online | 2,989 / 413 / 341 | 8.6-9.1 | `#online` |
| white card online (generic, WA-qualified only) | 1,345 | 8.75 | hero |
| wa white card | 855 | 15.37 | H1 variant |
| white card online wa | 878 | 8.78 | `#online` |
| best online white card course wa / best white card course wa | 694 / 127 | 6.13 / 9.28 | `#assessment` |
| white card wa check / white card check wa | 259 / 82 | 15.28 / 9.17 | `#your-card` |
| worksafe wa white card online | 232 | 6.08 | `#online` (the regulator's rules, sourced) |
| white card perth / perth online / online perth / course perth | 200 / 308 / 182 / 74 | 29.4 / 8.8 / 9.8 / 52.1 | locality, in context |
| white card western australia / whitecard wa / online western australia | 181 / 169 / 113 | 11-13 | H1 + intro variants |
| how to pass the wa white card online course and assessment? | 154 | 7.91 | `#assessment` |
| how to get a white card wa / how to get white card wa / apply for white card wa | 144 / 52 / 32 | 9-12 | `#your-card` + hero howItWorks |
| white card wa cost / white card cost wa | 131 / 112 | 6.05 / 5.89 | `#cost` |
| white card wa online course requirements and ppe list | 104 | 11.88 | `#assessment` (PPE) |

**Perth is materially under-served.** The connector puts "white card perth" at 1,900/mo — nearly the
size of "white card wa" at 2,400/mo — and ABE sits at **position 30.25** on it with 178 impressions.
The current URL carries no Perth token and the copy carries no WA locality. Regional terms exist too
(Bunbury, Mandurah). This is a genuine, legitimate gap: name the places the audience is in, in
context, without stuffing.

**Cannibalisation gate.** `/white-card` (the hub, 10,902 impressions at 19.92) owns generic "white
card" and "white card online". This page owns WA and must not target the generic terms. Links go up
to the hub and to `/accreditation`, never sideways to another state.

---

## 4 · The SERP ABE is actually competing in

`serp_analysis`, "white card wa", Perth, 27 Jul 2026. **ABE does not appear in the top 15 of the
Perth-localised SERP** despite a 9.07 national average position.

| Pos | Result | Type | Clicks | DA |
|---|---|---|---|---|
| 1, 9 | eot.edu.au — "White Card WA - Western Australia - **Official** Online Course" | paid | — | — |
| 2 | workforcetraining.com.au — "White Card Course **Perth**" | paid | — | — |
| 3 | inscope.edu.au | paid | — | — |
| 5 | **eot.edu.au** — same title | **organic** | **831** | 33 |
| 6 | **aveling.com.au** — "White Card - Western Australia (**CPCWHS1001** Prepare to ...)" | organic | 107 | 30 |
| 8 | **worksafe.wa.gov.au/construction-induction** | organic | 49 | 45 |
| 10 | performtraining.com.au — "White Card Western Australia \| **$69** Accredited Online Course" | paid | — | — |
| 12 | northregionaltafe.wa.edu.au | organic | 33 | 28 |
| 13 | inscope.edu.au/courses/whitecard-wa | organic | 32 | 16 |
| 14 | tcptraining.com/courses/white-card-course-**perth** | organic | 25 | — |
| 15 | qpts.com.au — "What Happens If You **Work Without** a White Card in WA?" | organic | 20 | — |

**Three title patterns ABE lacks and every leader has:** an authority word ("Official"), the unit code
in the title (Aveling), or the price ($69). Two of the top organic results and two paid results carry
**Perth** in the title.

The regulator ranking eighth is worth noting: a meaningful share of this query set wants the *rules*,
not a course. That is the gap in §5.4 and §5.6.

---

## 5 · The commercial reality, stated plainly

**ABE is $99. The recorded WA online band is $39 to $60.**

| Provider | WA price | Mode |
|---|---|---|
| Urban E-Learning | **$43.90** | self-paced |
| Express Online Training (the SERP leader, 831 clicks) | **$44**, pay-after-pass, sometimes a $39 special | self-paced |
| Perform Training (SERP title today) | **$69** | self-paced online |
| Eclipse Education | from $99 | self-paced in WA |
| WhiteCardWebinars | from $129 | — |
| **ABE Education** | **$99** | **self-paced theory + live Zoom assessment** |

ABE is about **2.25 times the SERP leader** and 65% above the top of the register's recorded WA band.
At position 9 against a $44 "Official Online Course", an unclicked listing is a rational outcome, and
no amount of copy makes $99 look like $44.

**But the products are not the same product, and the register already says why.** The
$39–$60 WA band is explained in `competitor-pricing-snapshot.md` §3 as commodity pricing *because the
regulator allows fully self-paced online*. The same file attributes the **$99–$150** QLD/ACT band to
**live-trainer delivery**. ABE's WA course carries a live 15-to-30-minute practical assessment with a
Blue Dog trainer. By the register's own logic — "compare ABE within its delivery-mode peer set, not
across modes" — ABE's WA offering sits in the live-trainer peer set at $99, which is the *bottom* of
that band, not the top of the self-paced one.

**What this means for the page, and it is the central editorial constraint:**

- The page **cannot win on price** and must not try. No "affordable", no "great value".
- The live assessment is the entire justification for the premium, so it must be **made legible as a
  benefit, early**, not buried as a scheduling hurdle.
- **It must never imply a competitor's self-paced card is invalid.** Self-paced online is lawful in WA
  and those cards are issued by RTOs under the same rules. Any suggestion otherwise is a false claim
  and an authority-model breach. The honest line is what the buyer *gets*, not what others lack.
- The strongest honest framings available: the PPE demonstration is done **with a trainer watching**,
  a real person answers when you are stuck, and **$99 is the whole cost** — WA charges no government
  card fee, so there is no second payment and no counter visit.

> **Flagged for Andrey, not decided here.** A 2.25× premium against the SERP leader on a
> price-sensitive commodity query is a commercial position, not a copy problem. The page will be
> written to justify $99 honestly. Whether $99 is the right number in WA is a pricing call that sits
> outside this build, and it is the most likely single cause of the CTR gap in §2.

---

## 6 · Query-coverage parity gate (R4)

**Mechanical, from the page-filtered export.** Every query `/white-card-wa-online` won at least one
click on, all 26 of them. Each must be explicitly covered by a heading, an answer capsule or body
copy on the rebuild. Confirm at ship (Stage 7).

| # | Query | Clicks | Impr | Pos | Covered by |
|---|---|---|---|---|---|
| 1 | white card wa online | 11 | 2,989 | 8.61 | H1 + `#online` |
| 2 | white card wa | 10 | 5,154 | 10.68 | **H1 verbatim** |
| 3 | best online white card course wa | 9 | 694 | 6.13 | `#assessment` |
| 4 | white card perth online | 5 | 308 | 8.81 | `#online` + locality |
| 5 | white card online wa | 5 | 878 | 8.78 | `#online` |
| 6 | white card online | 4 | 1,345 | 8.75 | hero, WA-qualified |
| 7 | white card online perth | 2 | 182 | 9.77 | `#online` + locality |
| 8 | white card western australia online | 1 | 117 | 8.80 | H1 variant + `#online` |
| 9 | white card wa online course | 1 | 55 | 8.00 | `#online` |
| 10 | white card wa cost | 1 | 131 | 6.05 | `#cost` |
| 11 | white card perth | 1 | 200 | 29.36 | locality |
| 12 | white card online course | 1 | 28 | 11.61 | `#online` |
| 13 | white card cost wa | 1 | 112 | 5.89 | `#cost` |
| 14 | western australia | 1 | 7 | 6.71 | H1 + hero |
| 15 | western australia white card | 1 | 65 | 16.95 | H1 variant |
| 16 | online | 1 | 23 | 5.48 | hero |
| 17 | online white card wa | 1 | 413 | 9.07 | `#online` |
| 18 | online white card training | 1 | 8 | 11.00 | `#online` |
| 19 | online white card course | 1 | 14 | 5.86 | `#online` |
| 20 | online white card course wa | 1 | 80 | 8.38 | `#online` |
| 21 | i don't mind | 1 | 1 | 3.00 | — (junk query, no coverage possible) |
| 22 | how to get white card wa | 1 | 52 | 9.13 | `#your-card` + hero howItWorks |
| 23 | blue dog white card | 1 | 348 | 6.37 | `#real` + PartnerDisclosure |
| 24 | blue dog training white card | 1 | 466 | 7.17 | `#real` + PartnerDisclosure |
| 25 | best white card course wa | 1 | 127 | 9.28 | `#assessment` |
| 26 | apply for white card wa | 1 | 32 | 10.69 | `#your-card` + CTA |

**Coverage: 25 of 26.** Row 21 ("i don't mind", 1 impression) is a junk query no page can or should
target; recorded rather than quietly dropped so the count reconciles.

Two rows deserve care. **Row 6, "white card online"** (1,345 impressions) is a generic term the
`/white-card` hub should own — but this page won clicks on it, so R4 requires coverage. Resolution:
covered in the hero as a **WA-qualified** phrase, never as a standalone target, which satisfies parity
without competing with the hub. **Row 11, "white card perth"** sits at position 29.36 against a
connector volume of 1,900/mo — parity coverage and the biggest single ranking upside on the page are
the same fix.

---

## 7 · Content gaps, ranked by what ABE can actually win

Ranked by (demand × ABE's ability to answer it better than the SERP set).

0. **Say that Blue Dog delivers it, where a searcher can see it.** **2,460 impressions, 2 clicks,
   average position ~6.5** across eight queries carrying the RTO partner's name (§2). Not a content
   gap in the usual sense — the fix is putting "Blue Dog Training (RTO 31193)" in the title tag, the
   meta description and the first section, which the ASQA framework requires anyway. **Highest-value
   change on the page, and close to free.** Listed at zero because it outranks everything below it.
1. **What the assessment is, and how to pass it.** "how to pass the wa white card online course and
   assessment?" (154 impressions, position 7.91, **0 clicks**) and "white card wa online course
   requirements and ppe list" (104, **0 clicks**) — 258 impressions of explicit assessment anxiety,
   nothing captured. ABE's differentiator *is* the answer to these queries: a live 15-to-30-minute
   Zoom assessment with a trainer, including the PPE demonstration. No competitor in the set describes
   a live assessment because none of them runs one. **The best-matched content gap on the page, and
   the section that has to carry the $99.**
2. **Whether you can legally do it online, with the actual evidence list.** WorkSafe's six accepted
   items and the "located in WA **at the time of the assessment**" test (`01` S5). Competitors say
   "WA residents only"; none publishes the list. Removes the largest pre-purchase doubt.
3. **Cost, in full.** WA has **no government card fee**, so $99 is the whole cost. 243 impressions of
   explicit cost intent at positions 6.05 and 5.89 with two clicks between them. Being the page that
   states the total plainly is a real answer even though it does not close the price gap.
4. **Whether you need one at all.** WHS (General) Regulations 2022 **r. 289** — deliberately broad,
   and includes maintenance, fit-out, excavation and *landscaping as site preparation*. Serves the
   owner-builder crossover (215 impressions at position 5.4) and cross-links to
   `/wa-owner-builder-course`, where a white card is one of the Form 75 knowledge-pathway
   requirements.
5. **Checking or replacing a card.** The WorkSafe card database. "white card wa check" (259
   impressions, position 15.28) plus "white card check wa" (82, position 9.17) — **341 impressions,
   zero clicks between them** — and "white card number wa" and "white card replacement perth" from the
   connector. **No competitor in the top 15 targets this**, and linking the official lookup is the
   sort of thing that earns the click a sales page does not.
6. **Blue card versus white card.** WorkSafe changed the design in 2009 on harmonisation and **both
   remain accepted**. Distinctive, sourced, and directly useful to older WA workers. Absent from every
   competitor page in the set.
7. **Interstate recognition.** An interstate cardholder does not need to redo WA training. Costs ABE a
   sale it was never going to keep and buys the trust that makes the other sales.
8. **Perth and the regions, in context.** Position 30 on a 1,900/mo term. Legitimate locality signal,
   not stuffing.

**Gaps deliberately not taken:** the "work without a white card" penalty angle (qpts.com.au, position
15). `kb/register/penalties-by-state.md` could source it, but fear-led copy on a page whose job is a
$99 purchase decision reads as pressure, and the archetype's reassurance-first rule points away from
it. Recorded as a candidate for an info guide, not this page.
