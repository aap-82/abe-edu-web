# Stage 3 — archetype and section briefs

**Page:** `/cpd-building-tas` · **Run:** Phase 2 evidence run, 23 July 2026

## 3a · Archetype

**Archetype 4 — CPD bundle.** Confirmed against `_selector.md` by what the reader arrived to do: a
licensed practitioner with a renewal cycle closing and a shortfall of known size. They have already
decided to buy something. They are doing subtraction, not evaluating courses.

**Authority model: `state-approved-direct`.** CBOS approves each course. So: "approved by CBOS",
certificate of completion, `recognizedBy` the regulator in schema. **No** RTO, **no** "nationally
recognised", **no** Statement of Attainment. Archetype and authority model are independent axes —
this shares its model with the QLD owner builder page and almost none of its shape.

**Decision order** (archetype 4 §2), which the sections below follow:
totals → does it discharge my obligation → what is in it → value against buying separately → time →
act → proof.

**Forbidden carry-overs** (§4), checked at the cold reread:
selling each course individually · inflated value claims · manufactured urgency · implying the
bundle satisfies an obligation it only partly satisfies.

---

## 3b · Section briefs

### H1 + hero
**Primary keyword verbatim: "builder CPD Tasmania."** One H1. Chosen on descriptor accuracy and low
difficulty, not measured demand — see `02-gap.md` §3.

---

### S1 · What this bundle covers
| Field | |
|---|---|
| **Claim** | Twelve CBOS-approved courses, twelve points, $499, about ten hours. |
| **Reader arrives** | Knowing they need points and roughly how many. Already decided to buy. Wants the total in one glance. |
| **Objection defused** | "Will this actually finish my year, or leave me short?" |
| **Facts** | 12 points — derived, live members only [register] · $499 [internal, 23 Jul] · ~10 hrs [measured, 10 of 12 courses] · builder requirement 12/yr [A1, verified 2026-07-12] |
| **Distinctive material** | The count is derived from ABE's CBOS approval register at build, not typed. It cannot drift from what is actually approved. |
| **Carrier** | AnswerCapsule + FactGrid |
| **Fails if** | The reader cannot subtract this from their obligation in one read. |

### S2 · Does this cover your whole year?
| Field | |
|---|---|
| **Claim** | Twelve points meets a builder's full annual requirement. It does not meet a surveyor's or an engineer's, and holding two licences does not double what you owe. |
| **Reader arrives** | Possibly holding more than one licence, and unsure whether the requirements add up. |
| **Objection defused** | "I hold two licences — do I need 32 points?" |
| **Facts** | Builder 12 · Designer/Architect 20 · Surveyor/Engineer 30 [A1] · multi-licence = **highest single, not the sum** [A2, "frequently mis-stated"] |
| **Distinctive material** | Stage-2 gap 2. The register itself flags this as frequently mis-stated, and no competitor addresses it. |
| **Carrier** | AnswerCapsule + FactGrid + VerifiedSources |
| **Fails if** | A multi-licence holder leaves believing they must add their requirements together. |

### S3 · How many of these points actually count
| Field | |
|---|---|
| **Claim** | CBOS counts at most four WHS points a year, so the category mix matters as much as the total. |
| **Reader arrives** | Assuming twelve approved points equals twelve countable points. |
| **Objection defused** | "Could I do all twelve and still be short at audit?" |
| **Facts** | WHS capped at **4 points per renewal year** [A3, verified 2026-07-12] · CPD counted should relate to licensed work [A3] |
| **Distinctive material** | **Stage-2 gap 1, the strongest on the page.** Competitors sell bundles without stating the category split, which is what practitioners are audited on. Leading with it is the differentiator. |
| **Carrier** | AnswerCapsule + Note (`variant="caution"`) + VerifiedSources |
| **Fails if** | It reads as a disclaimer rather than as the thing that protects them at audit. |
| **Constraint** | The WHS classification is not yet imported, so the page states the **cap and the principle**, never a countable number for this bundle. Stating "10 of 12 count" without the classification would be inventing a figure. |

### S4 · What is in the bundle
| Field | |
|---|---|
| **Claim** | Every course, its point, and the date its CBOS approval runs to. |
| **Reader arrives** | Wanting to scan the list and check nothing is a repeat of last year. |
| **Objection defused** | "Is this padded with filler, and is it all still approved?" |
| **Facts** | 12 courses, 1 point each, with approval expiry dates — all derived from the register at build |
| **Distinctive material** | Stage-2 gaps 3 and 4. Approval is course-specific, and showing per-course approval dates is something no competitor can do without the data plumbed to the page. |
| **Carrier** | member table (derived, in `CpdBundleLayout`) |
| **Fails if** | It re-sells the individual courses — archetype 4 §4 forbids it. The list is for scanning, not for choosing. |

### S5 · What it costs, against buying separately
| Field | |
|---|---|
| **Claim** | $499 for twelve, against $1,188 bought one at a time. |
| **Reader arrives** | Wanting to know the saving is real and not manufactured. |
| **Objection defused** | "Is the 'saving' just an inflated list price?" |
| **Facts** | $499 · $99 per single course · $1,188 = 12 × $99 · saving derived from price vs rrp, not authored [internal, 23 Jul] |
| **Distinctive material** | The arithmetic is plain and checkable in one click on ABE's own site, so it is stated plainly. Archetype 4 §4: honest arithmetic or none. |
| **Carrier** | PriceCard |
| **Fails if** | The saving is stated as a percentage or a headline rather than as the two numbers and their difference. |

### S6 · How long it takes
| Field | |
|---|---|
| **Claim** | About ten hours for the twelve, self-paced. |
| **Reader arrives** | With a renewal deadline, working out whether they can finish in the time left. |
| **Objection defused** | "Can I get this done before my licence renews?" |
| **Facts** | ~10 hrs, from LearnWorlds study time per starter across the ten measured members [measured, Jul 2026] |
| **Distinctive material** | It is a measured figure, not a nominal one. Two of the twelve are unmeasured, so it under-states rather than over-claims. |
| **Carrier** | prose in S1's FactGrid + a line here |
| **Fails if** | It states a precision the measurement does not support. |

### S7 · How it works
| Field | |
|---|---|
| **Claim** | Enrol once, work through at your own pace, assessment on each course, certificate as you finish each one, keep the certificates for your own record. |
| **Reader arrives** | Wanting to know what happens after payment. |
| **Objection defused** | "What do I actually get, and what do I have to keep?" |
| **Facts** | online self-paced [internal] · assessed [internal, confirmed 23 Jul] · certificate per course [internal] · **record-keeping sits with the licence holder** [A5, verified 2026-07-12] |
| **Distinctive material** | A5 — the licence holder is responsible for the record, retained and portable. Useful and almost never said. |
| **Carrier** | Stepper |
| **Fails if** | It states a pass mark or attempt limit. **Not known, deliberately not stated** — the owner builder figures are not carried across. |

### S8 · Who wrote and reviewed this
| Field | |
|---|---|
| **Claim** | Named developer and independent reviewer, dated. |
| **Reader arrives** | Deciding whether to trust the compliance claims. |
| **Objection defused** | "Who stands behind this?" |
| **Facts** | Dominic Ogburn (developer) · Warwick Smith (independent reviewer) · last reviewed date [assumed from site pattern — flagged at Stage 1] |
| **Carrier** | Credentials |
| **Fails if** | Either person is unnamed or undated. |

### S9 · FAQ
Questions drawn from A5 and the Stage-2 intents: how do I record my CPD · are these really CBOS
approved · I hold two licences, do I need double · does this cover a building surveyor · what happens
when an approval expires. No answer capsule (archetype rule). No CTA inside the block.

### S10 · Sources
Consolidated Sources block: the three CBOS pages from `01-source-map.md`, each with its verified
date, plus the *Occupational Licensing Act 2005*.

---

## Mapping check

| Archetype 4 required section | Covered by |
|---|---|
| Bundle totals | S1 |
| Obligation mapping | S2 + S3 |
| Course list | S4 |
| Value comparison | S5 |
| Total time | S6 (+ S1 glance) |
| Who developed and reviewed | S8 |
| Sources | S10 |

Nothing required is missing. S3 and S7 are additions the Stage-2 gaps earned; both are grounded in
register facts rather than invented angles.
