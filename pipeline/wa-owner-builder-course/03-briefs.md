# 03 · Archetype + section briefs — /wa-owner-builder-course

## 3a · Archetype

**Archetype 1 — State-approval course, knowledge-requirement variant.** Named explicitly in the
archetype file: *"WA/Form 75 sits here as the knowledge-requirement variant."* The variant **changes
step 2 of the decision order, not the order**: WA prescribes no course and runs no approved-provider
scheme, so the legitimacy step is "the Board accepts a WA-specific course completed within two years
plus a white/blue card as evidence of sufficient knowledge", never "approved".

**Reader (archetype §1):** a homeowner, not a tradesperson, who has hit a legal obstacle between them
and their project. Settled: they want to build, and some approval is involved. Unresolved: whether they
truly need this, whether the provider is real, the whole process, the total cost, and what they take on
legally. **The fear is being ripped off or getting it wrong.**

**Decision order:** need it → legitimate? → what/cost → what am I taking on → full path → proof → FAQ → act.

**This is an AUDIT of a live, high-performing page** (883 clicks, 35,358 impr, pos 10.59), not a
greenfield build. So the briefs below cover only the sections the audit (01) and the gap analysis (02)
implicate. Every other section is recorded as audited-and-unchanged with its reason, which is itself
the brief-to-section record for this run.

---

## 3b · Briefs — SHIPPED this run (fixes already live, commit 17f89e3)

### S1 · `need` — the six-year limit
- **Claim:** you need approval over $20,000, and the six-year limit runs from the building permit, not
  from the approval.
- **Reader arrives:** checking whether they qualify at all; may have held an approval before.
- **Objection defused:** "I got an approval years ago, am I barred?"
- **Facts:** $20,000 trigger [Building Act 2011]; six years from **building permit granted**, unused
  approval does not bar reapplying, Form 76 waiver [**Form 75 p1**, verified 23 Jul 2026].
- **Distinctive material:** the live page overstated the restriction. No competitor covers it at all.
- **Carrier:** prose in `.measure` + CanCant + VerifiedSources.
- **Fails if:** a reader who never used an approval believes they are barred. ✅ **fixed**

### S2 · `course` — the four knowledge pathways
- **Claim:** four pathways satisfy the knowledge requirement; this course is one of them, and some
  readers need none of it.
- **Reader arrives:** assumes a course is compulsory.
- **Objection defused:** "do I have to buy a course?"
- **Facts:** four pathways under s43(2)(b)(ii) [**Form 75 p5**]; pathway 1 = WA course ≤2 years + white/
  blue card; pathways 2-4 = current/previous registration.
- **Distinctive material:** **no competitor states this.** The house principle is to tell the reader who
  does not need the course that they do not.
- **Carrier:** prose in `.measure` + VerifiedSources citing Form 75 p5.
- **Fails if:** a registered practitioner buys a course they did not need. ✅ **fixed**

### S3 · `become` — approval validity and processing
- **Claim:** the approval can lapse, and the processing time is approximate, not promised.
- **Facts:** expires 6 months if no permit applied for; on refusal if refused; when the building is
  complete if the permit issues [**Form 75 p2** — the form's wording beats the guidance page's];
  "approximately within six weeks" with the source's variability caveat [guidance page].
- **Distinctive material:** the lapse rule appears on no competitor page.
- **Carrier:** Stepper + caution Note + VerifiedSources.
- **Fails if:** the page promises a timeframe the regulator does not. ✅ **fixed**

---

## 3c · Briefs — the click-recovery work (NOT yet done; this is Stage 4's job)

The gap analysis found ~1,000 impressions converting at ~0% on content **the page already has**. These
briefs are therefore about making existing answers *liftable*, not about new content.

### S4 · Meta description — the only safe snippet lever
- **Claim:** this page answers both "is it a licence or an approval?" and "what is Form 75?", and sells
  the course that supports it.
- **Reader arrives:** scanning a SERP where wa.gov.au sits at position 3 answering the regulatory
  question, and ABE's snippet currently only sells a course.
- **Objection defused:** "this is a sales page, the government one will actually tell me."
- **Facts:** it is an **approval**, not a licence or permit; you lodge **Form 75**; course $179.
- **Distinctive material:** GSC — `owner builder licence wa` 644 impr / 0.47% CTR,
  `owner builder permit wa` 289 / 0%, `form 75 owner builder` 110 / 0%. The answers exist on the page.
- **Carrier:** `description` frontmatter only. **The `title` is NOT touched** — it converts 5.19% at
  pos 3.38 on the primary term and must not be risked for a lower-position cluster.
- **Fails if:** the primary term's CTR drops. Measure before/after.

### S5 · `licence` + `faq` — make the answers quotable
- **Claim:** the first sentence of each answer is a complete answer on its own.
- **Reader arrives:** via People Also Ask or an AI Overview, not via the page.
- **Objection defused:** (mechanical) an answer that opens with a lead-in cannot be lifted.
- **Facts:** the FAQ already carries the query wording verbatim — *"Is it a licence, a permit, or an
  approval?"* and *"Is the certificate accepted for my Form 75 owner-builder approval?"*. FAQPage rich
  results were retired May 2026, so the lift route is PAA / AI Overview, which quote prose.
- **Distinctive material:** the content exists and ranks; only the opening sentences need to stand alone.
- **Carrier:** `Faq` items in `src/data/faqs-wa.ts` + the `#licence` AnswerCapsule. Copy edit only.
- **Fails if:** an answer's first sentence still needs the question to make sense.

### S6 · Perth locality (small, real)
- **Claim:** the page serves Perth readers explicitly.
- **Facts:** `owner builder course perth` 570 impr @ pos 4.36; `owner builder perth` 119 @ 15.38.
- **Carrier:** natural mention in existing copy. **No new section** — a locality page would cannibalise.
- **Fails if:** it reads as keyword stuffing rather than a genuine statement.

---

## 3d · Audited and deliberately UNCHANGED

Recorded so a later reader can tell a considered no-change from an oversight (the run-1 lesson).

| Section | Why unchanged |
|---|---|
| `hero` / title | Converting at 5.19% on the primary term. Do not touch. |
| `licence` (structure) | Correct and well-built; only the opening sentence is in scope (S5). |
| `responsibilities` | Accurate against WHS Act 2020 and the Act; no audit finding. |
| `learn` | Module content is internal and current (v2.0); not a regulatory surface. |
| `how` | Three-step flow accurate; price and pass mark verified internal facts. |
| `cost` | Figures correct; provenance label already refreshed this run. |
| `obligations` | Insurance and resale facts sourced; Form 75 p2 corroborates the seven-year clock. |
| `content-review` | Reviewer date corrected to 20 Jun 2026 on Andrey's answer. ⏳ Note: still 7 days before the "v2.0, 27 Jun 2026" module label — flagged, his call. |
| Authority language | **Exemplary throughout** (01 §A). The knowledge-requirement model is stated correctly everywhere; nothing to change. |

---

## 3e · Run note

The audit's value here was **not** the archetype or the authority model, both of which were already
right. It was (a) two published facts that misstated a restriction or a rule, found by reading Form 75
rather than the guidance page, and (b) a demand finding that the page's problem is conversion of
impressions it already holds, not missing content. Stage 4 writes only S4-S6.
