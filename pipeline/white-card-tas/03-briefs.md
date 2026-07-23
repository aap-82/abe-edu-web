# 03 · Archetype + section briefs — /white-card-tas

## 3a · Archetype

**Archetype 2 — Nationally recognised course.** The credential is a unit of competency (CPCWHS1001)
delivered and assessed through an RTO partner (Blue Dog Training, RTO 31193) producing a Statement of
Attainment; ABE is the publisher, never the issuing body. That is the definition of archetype 2
(`_selector.md` §"State-approval vs nationally recognised"). **Authority model: asqa-accredited** —
independent axis, confirmed against `authority-and-seo-rules.md` and the schema superRefine.

**Reader (archetype §1):** a worker who needs the card to be allowed on site, time-pressured,
comparison-shopping near-identical offers. Settled: they need the card. Unresolved: which providers are
real, whether it is accepted in TAS, how fast, what arrives and when, whether online is allowed for
them. **The fear is buying a worthless certificate** — so the RTO number is the strongest trust signal
and goes high, verbatim.

**Decision order (archetype §2):** 1 is-this-real → 2 accepted-where-I-work → 3 how-fast-what-do-I-get
→ 4 price → 5 how-it-works → 6 act → 7 proof/FAQ. This reader decides fast; keep the page tight, depth
goes to linked pages.

**Drift found in the exemplar and schema — NOT fixed mid-run, logged for Stage 9 (condition 1):**
- Archetype worked copy (`02-…md:90`) uses **CPCCWHS1001** (superseded).
- `content.config.ts:37` comment claims TAS/QLD use CPCCWHS1001, only WA CPCWHS1001 — **wrong**.
- `abe-new-site-sitemap.md:36` carries CPCCWHS1001.
- The current code is **CPCWHS1001** for all states (register verified 26 May 2026; Blue Dog scope
  confirmed at training.gov.au 23 Jul 2026). Only `kb/register/` has it right. **This page uses
  CPCWHS1001.** Three doc copies drifted from one correct register — risk #1, a clean systemic
  instance.
- Archetype §5 says frontmatter carries singular `unitCode`; the real schema is `partnerRto.units[]`
  (a list). Stale archetype doc; the page uses the list shape.

**TAS-specific structural fact the generic archetype does not know:** "What you receive" is
**two-stage** — Blue Dog issues the Statement of Attainment, then the applicant lodges it **in person
at Service Tasmania within 60 days** and **WorkSafe Tasmania** issues the physical card. Most competitors
(and the archetype template) collapse this to "you get a card". Surfacing it is the page's biggest win.

---

## 3b · Section briefs

Laid down in archetype-2 decision order, with Stage-2 gaps mapped on. Primary keyword **white card
tasmania** carried verbatim in the H1. One H1 only.

### Hero (H1)
- **Claim:** You can get a nationally recognised White Card for Tasmania, online, for $59, delivered
  with RTO partner Blue Dog Training (RTO 31193).
- **Reader arrives:** scanning for a real provider and a price; will bounce if it looks like a
  content farm or hides who delivers the training.
- **Objection defused:** "Is this a real White Card, or another lookalike?"
- **Facts:** unit CPCWHS1001 [internal/register, verified]; Blue Dog RTO 31193 [verified at TGA
  23 Jul 2026]; price $59 [internal, confirmed]; self-paced online, TAS residents [register, 26 May].
- **Distinctive material:** competitors lead with a slogan (Blue Dog: "By tradies, for tradies").
  Lead with the RTO number and the price — the two things this reader is actually scanning for.
- **Carrier:** Hero with `proof` stats (price / mode / recognition), a priced CTA, and **ASQA
  disclosure location 1** inline ("Training delivered by Blue Dog Training (RTO 31193) · Enrolled
  through ABE Education"). CTA carries **ASQA location 2** nearby.
- **Fails if:** the RTO number or the price is not visible without scrolling; or the H1 does not carry
  "White Card Tasmania".

### S1 · #rto-partner — Is this a real White Card? (decision 1)
- **Claim:** The course is delivered and assessed by Blue Dog Training (RTO 31193); you receive a
  nationally recognised Statement of Attainment for CPCWHS1001; ABE publishes and supports it and is
  not an RTO.
- **Reader arrives:** warned about fake certificates, looking for a verifiable RTO number before
  reading anything else.
- **Objection defused:** "Is this one of the dodgy ones?"
- **Facts:** Blue Dog RTO 31193, CPCWHS1001 on scope, "Deliver and assess", to 20 Mar 2030
  [TGA, 23 Jul 2026]; SoA issued by Blue Dog [register].
- **Distinctive material:** most competitors bury the RTO number in the footer; the SERP's top
  commercial results are templated. Put the number in the opening section and invite the reader to
  check it on training.gov.au.
- **Carrier:** AnswerCapsule + **PartnerDisclosure** (this is also **ASQA location 6**, "About Your
  Training Provider" — role separation). VerifiedSources line citing the TGA record.
- **Fails if:** the RTO number is not visible without scrolling, or ABE is implied to be the RTO.

### S2 · #accepted — Is it accepted, and can I do it online in Tasmania? (decision 2)
- **Claim:** The card is nationally recognised in every state once issued; and because you are in
  Tasmania you may complete the training fully online, self-paced.
- **Reader arrives:** unsure whether an online card "counts" and whether online is even allowed for
  them — the category's central doubt.
- **Objection defused:** "Will an online White Card actually be accepted on site?"
- **Facts:** nationally recognised once issued [register/TGA]; self-paced fully online permitted for
  **TAS residents only**, must evidence TAS residency [online-delivery-policy, 26 May]; other states
  differ [same].
- **Distinctive material:** aggregators either omit the delivery-mode rule or imply online is open to
  everyone. Stating plainly "online, if you live in Tasmania" is both compliant and reassuring, and it
  is a gap (§E.3).
- **Carrier:** AnswerCapsule + a short CanCant or Note (who can do it online vs who must attend). No
  sideways links to other states' pages.
- **Fails if:** the page implies self-paced online is available to non-TAS residents (compliance
  breach), or omits the residency condition.

### S3 · #your-card — What you get, and how to turn it into your card (decision 3)
- **Claim:** You finish with a Statement of Attainment from Blue Dog; to get the physical card you lodge
  it in person at Service Tasmania within 60 days, and WorkSafe Tasmania issues the card.
- **Reader arrives:** assumes the card just arrives; does not know TAS has a separate, time-limited
  lodgement step.
- **Objection defused:** "So after I pass, I've got the card, right?" (No — there is a step, and a
  deadline.)
- **Facts:** SoA from Blue Dog [register]; lodge **in person** at Service Tasmania within **60 days**
  of the SOA [card-lodgement-process-tas, S3 27 May]; card issued by **WorkSafe Tasmania** [S4];
  ID rules (one/two-doc A/B) [S3]; card has no expiry but voids after 2 yrs out of industry [S4].
- **Distinctive material:** the single biggest gap in the SERP — no competitor and only buried gov
  pages cover the 60-day window and the in-person lodgement. This is the page's strongest section.
- **Carrier:** AnswerCapsule + **Stepper** (finish training → receive SoA → lodge at Service Tas within
  60 days with ID + fee → WorkSafe Tas posts card). Note (caution) on the 60-day deadline.
  VerifiedSources citing Service Tas + WorkSafe Tas.
- **Fails if:** the 60-day window is not prominent, or the card is attributed to ABE/Blue Dog/CBOS
  instead of WorkSafe Tasmania.

### S4 · #cost — What it costs in total (decision 4)
- **Claim:** The course is $59 to ABE; the government charges a separate $13.72 card fee at Service
  Tasmania, so your total is $72.72.
- **Reader arrives:** price-shopping, assumes the course price is the whole cost.
- **Objection defused:** "Is $59 really all I pay?"
- **Facts:** course $59 [internal, confirmed 23 Jul]; government card fee **$13.72** [state-fees /
  Service Tas, 22 Jul 2026]; fee paid at lodgement [S3].
- **Distinctive material:** total-cost transparency is a clean win — no competitor states the $13.72
  (§E.1), and cost-intent queries are live.
- **Carrier:** FactGrid or PriceCard showing the two costs and the total, plus `Course.offers.price`
  = $59 (the product ABE sells). VerifiedSources on the government fee.
- **Fails if:** the $13.72 is omitted or blended into the $59; or `Course.offers.price` ≠ the on-page
  $59.

### S5 · #how-it-works — How the course and assessment work (decision 5)
- **Claim:** You complete it online at your own pace; assessment is a video demonstration plus online
  questions, and you need a USI and basic PPE to hand.
- **Reader arrives:** wants to know effort, what is required of them, and whether "online" means real
  assessment.
- **Objection defused:** "What do I actually have to do — and is an online assessment legitimate?"
- **Facts:** self-paced online [internal]; assessment = **video assessment + online questions**
  [internal, confirmed 23 Jul]; the video includes a supervised **PPE demonstration**, which is
  precisely why self-paced online is permitted post-2019 [online-delivery-policy §PPE, 26 May];
  USI required for nationally recognised training [Blue Dog page, corroborated]; PPE list (hard hat,
  eye + hearing protection, hi-vis) [Blue Dog page].
- **Distinctive material:** turn the compliance constraint into reassurance — the video/PPE demo is
  what makes an online White Card real, not a shortcut.
- **Carrier:** AnswerCapsule + FactGrid (mode / assessment / USI / PPE) or a short Stepper. No
  long-form.
- **Fails if:** it reads as long-form owner-builder explanation, or implies ABE conducts the
  assessment (Blue Dog does).

### CTA band (decision 6)
- **Claim:** Enrol now; here is exactly what you are buying and who delivers it.
- **Carrier:** CTA with the price and **ASQA disclosure location 2** (the full "recruits and markets
  on behalf of Blue Dog…" template) adjacent. buyUrl is TBC → the page is noindex and the CTA points
  at a placeholder until the URL resolves. No CTA inside answer or FAQ blocks.
- **Fails if:** a CTA sits inside an AnswerCapsule or FAQ; or a live-looking buy link ships while the
  URL is unconfirmed.

### S6 · #content-review — Who developed and checked this (decision 7, proof)
- **Claim:** The course content and this page were developed by a named person and independently
  reviewed for compliance, on a stated date.
- **Reader arrives:** final trust check before paying.
- **Objection defused:** "Who is behind this, and is it current?"
- **Facts:** Dominic Ogburn (developer), Warwick Smith (independent compliance reviewer) [internal,
  standing]; last-reviewed date.
- **Distinctive material:** no competitor names a person; E-E-A-T is an outright gap.
- **Carrier:** Credentials (two Person profiles, sameAs LinkedIn) + a dated last-reviewed line.
- **Fails if:** no named reviewer or no date.

### S7 · #faq — FAQ (decision 7)
- **Claim:** The remaining objections answered, including the three ASQA-mandatory questions.
- **Facts / required questions (ASQA location 5 — all three mandatory):**
  1. **Who delivers this training?** → Blue Dog Training, RTO 31193, ASQA-accredited.
  2. **Who do I contact about training issues?** → distinguish ABE (enrolment/payment/platform) from
     Blue Dog (training/assessment/certification).
  3. **How do I verify this RTO?** → training.gov.au, RTO code 31193.
  Plus: How long does it take? · Can I do it if I don't live in Tasmania? · I have a student visa —
  can I enrol? · When will my card arrive? · **Doing an owner builder permit too?** → cross-link to
  `/tas-owner-builder-course` (Stage-2 cross-sell, 5.62% CTR intent).
- **Carrier:** Faq. Visible Q&A; FAQPage schema optional (rich result retired May 2026).
- **Fails if:** any of the three ASQA questions is missing, or the cross-sell links sideways instead
  of to the OB page.

### Sources (required)
- **Carrier:** VerifiedSources per section + a page-foot Consolidated Sources block (primary/issuing
  sources only): training.gov.au (RTO 31193 + CPCWHS1001), Service Tasmania, WorkSafe Tasmania, WHS
  Act 2012 (Tas).
- **Fails if:** any government/legislative claim on the page is not traceable to this block.

---

## 3c · ASQA 7-location checklist (who owns each)

| # | Location | Owner |
|---|---|---|
| 1 | Hero inline short form | **author** (hero) |
| 2 | Near every CTA (full template) | **author** (hero CTA + CTA band) |
| 3 | Footer full legal disclosure | **layout** (`asqaDisclaimer`, auto) ✓ exists |
| 4 | Footer copyright bar (course code / RTO / ABE ABN) | **verify at build** — SourcesFooter; author if absent |
| 5 | FAQ 3 mandatory questions | **author** (#faq) |
| 6 | About Your Training Provider (role separation) | **author** (#rto-partner PartnerDisclosure) |
| 7 | T&Cs link | **verify at build** — layout/footer; add link if absent |

Sitewide `.f-asqa` "ABE is not an RTO" footer exists in SourcesFooter (separate from the 7). Locations
4 and 7 are the two to confirm at Stage 5-6 rather than assume.
