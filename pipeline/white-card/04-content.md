# Stage 4 — Extended content — `/white-card` hub

Written one section at a time from `03-briefs.md`. No `{placeholder}` in this hub: every figure
below is copied from a spoke's own already-verified frontmatter, not computed by `HubLayout` at
build time (same precedent as `/owner-builder-courses`) — so the artefact states the literal
figure, matching what the page will render.

## Hero

**H1:** White Card, by state.

**Subhead (one-line teaser only — the intro carries the explanation, so this must not duplicate it):**
Every state runs its own course. Here's how they differ, and what to pick.

## Orienting line (intro capsule)

**Answer capsule** (57 words)

> Every White Card is the same nationally recognised card once it's issued. How you get one is what
> changes: Western Australia and Tasmania let you finish the course online, at your own pace. New
> South Wales and Queensland both require a live session with a trainer. Pick your state below for
> the price and how it works.

**Revised 4 Aug 2026, after Stage 7's fresh check** measured the first draft at 65 words, 5 over the
40-60 target. Trimmed "wherever in Australia you complete the course" (the portability point the FAQ
already answers explicitly) and "whole" — meaning unchanged, length now in range.

**Cold reread:**
- Fail condition (brief: "reads as an explainer, or repeats the subhead"): three sentences, one
  new idea each, none repeating the subhead's wording. Met.
- Delete test: cut "How you get one is what changes... live session with a trainer" and the section
  is just a generic "cards differ by state" line — the delivery-mode finding is doing real work here.
  Spent.
- First-sentence test: answers "is a card from one state different from another" (no) before
  anything else. Answer first.
- Sources: no regulatory claim here — nationally-recognised-on-issue is shared context already
  verified on each spoke's own page, not re-asserted as new.

## Choose your state (spoke grid)

- **WA** — Work through the theory online at your own pace, then finish with a short live video
  assessment. $99, no government card fee.
- **TAS** — Complete the whole course online and self-paced. $59, plus a $13.72 government card fee
  paid separately to Service Tasmania when you lodge.
- **NSW** — One live online session with a trainer, six days a week. $129 all-inclusive, no separate
  government fee.
- **QLD** — A live online session with a real trainer, under WHSQ's Connected Real Time Delivery
  rules. $109 weekdays, no government fee.
- **ACT** — Coming soon (card, no link, no price, no RTO name — per Stage 1's gate, `/white-card-act`
  is not built).

**Cold reread:**
- Archetype test: each blurb is one differentiating line, not a restatement of the spoke's own
  page — no forbidden carry-over.
- Fact-to-meaning: TAS's fee line states the figure and where/when it's paid, not just the number.
- No residency or location qualifier on TAS, per the load-bearing caution in `01-source-map.md`.

## Compare (differentiator table)

Columns: WA / TAS / NSW / QLD / ACT (soon). Rows:

| | WA | TAS | NSW | QLD | ACT |
|---|---|---|---|---|---|
| Course fee | $99 | $59 | $129 | $109 (weekday; $169 Saturday) | – |
| Delivery | Online, self-paced | Online, self-paced | Live online with a trainer | Live online with a trainer | – |
| Government card fee | None | $13.72 | None | None | – |
| Training provider | Blue Dog Training | Blue Dog Training | Upskill Institute | Blue Dog Training | – |

Caption: Course fees are ABE Education's and GST-free. QLD's $109 is the weekday rate; Saturday
sessions are $169. Government card fees are set by each state's issuing authority and paid separately
where they apply. Figures are current at the verification dates on each state's own page.

**Cold reread:** every cell traces to `01-source-map.md`'s regulatory/internal facts tables — zero
new figures. Credential is not a fifth row (identical across all four/five, stated once in FAQ).

## FAQ

1. **Which state's White Card course do I need?**
   The one for the state where you'll be working, not where you live. If you live in Victoria and
   are working on a site in Tasmania, you need the Tasmanian course.

2. **How do I actually get my card once I finish the course?**
   Passing the course is the RTO's part, and that's the same everywhere. What happens next differs
   slightly by state: Western Australia, New South Wales and Queensland issue your card directly
   once you pass. Tasmania is the exception — you also lodge with Service Tasmania and pay the
   $13.72 card fee separately. Check your state's own page for the exact steps.

3. **Can I do the course online and self-paced?**
   Only in Western Australia and Tasmania. New South Wales and Queensland both require a live
   session with a trainer, so budget for a booked time rather than working through it whenever
   suits you.

4. **Is my White Card valid in other states once I have it?**
   Yes. The card is nationally recognised the moment it's issued and accepted on construction sites
   across Australia, regardless of which state's course you completed.

5. **Do you offer a White Card course in the ACT, Victoria, South Australia or the Northern Territory?**
   Not yet. An ACT course is coming soon. We don't currently offer a course for Victoria, South
   Australia or the Northern Territory, so use a provider licensed in your state for those.

6. **Is ABE Education a registered training organisation?**
   No. Each course is delivered and assessed by a registered training organisation: Blue Dog
   Training (RTO 31193) in Queensland, Western Australia and Tasmania, and Upskill Institute
   (RTO 45708) in New South Wales. ABE Education publishes the course and enrols you; the RTO
   delivers it and issues your nationally recognised Statement of Attainment.

7. **What does the government card fee pay for?**
   It's a separate charge from whichever state or territory authority issues the physical card, on
   top of the course fee you pay ABE Education. Tasmania charges $13.72. Western Australia, New
   South Wales and Queensland charge no separate fee at all, since the training provider issues the
   card directly.

**Cold reread:** Q2 is the Stage-2 process gap ("how to get white card," 3,600/mo) — new this
build. Q1 and Q2 do not collapse into each other: Q1 answers *which* state, Q2 answers *what
happens after* passing — different objections, checked against Move 3's "swap test." 7 questions,
at the readability rule-13 boundary ("beyond ~7" fails) but not over it — flagged for Stage 7 to
re-confirm rather than silently accepted.

## CTA band

Heading: Ready to get your White Card?
Sub: Pick your state below and enrol online. Your training provider issues a nationally recognised
Statement of Attainment the moment you pass.
CTA: Choose your state (→ spoke grid anchor)

**Cold reread:** no price, no offer language for the hub itself — archetype 6 §4 forbidden
carry-over avoided.

## Sources footer (unchanged from Stage 1, re-confirmed not re-verified)
- WorkSafe WA — Construction induction training (verified 28 Jul 2026)
- Service Tasmania — Apply for a white card (verified 22 Jul 2026, fee 1 Jul 2026)
- SafeWork NSW — White cards (verified 1 Aug 2026)
- Conditions of agreement for RTOs to issue GCIT cards in Queensland, V6.1 (verified 2 Aug 2026)
