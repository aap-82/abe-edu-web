# Stage 3 — Archetype selection + section briefs — `/white-card-act`

## 3a — Archetype

**2, nationally recognised course** (`references/archetypes/02-nationally-recognised-course.md`) —
identical to WA/TAS/NSW/QLD White Card. ABE is not the issuing body; AlertForce (RTO 91826) develops,
delivers and assesses the unit. Authority model: asqa-accredited. 1 Person node (Warwick Smith, the
independent reviewer); AlertForce credited via `Course.creator`, never as an ABE "developer" person.

## 3b — Section briefs

Decision order per archetype 2 §2: is this real? -> accepted/delivery mode? -> what do I get, how
fast? -> price -> how it works -> act -> proof/FAQ. Both halves of the RTO-trust requirement are
built: `partnerRto` frontmatter (the disclosure `CourseLayout` renders automatically) and an authored
`#real` section answering the reader's actual question (archetype 2 §3's "most-missed requirement").

```
Section: Is this a real White Card?
Position: 1 (marker 01)
Claim: The course is delivered and assessed by AlertForce, RTO 91826, and you receive a
       nationally recognised Statement of Attainment for CPCWHS1001.
Reader arrives: warned about fake certificates, scanning for a real RTO number before
       reading anything else.
Objection defused: "Is this one of the dodgy ones?"
Facts: AlertForce RTO 91826, confirmed on CPCWHS1001 scope with ACT in its delivery
       notification (training.gov.au, 4 Aug 2026, internal + regulatory).
Distinctive material (Stage 2): CIT (Canberra Institute of Technology) is the strongest
       local-authority competitor in the SERP (position 4) — a private national RTO page
       has to answer "why AlertForce, not the local TAFE" directly rather than ignore it;
       inviting independent verification on training.gov.au does that without naming CIT.
Carrier: AnswerCapsule + authored section (the disclosure card alone does not answer this).
Fails if: the RTO number is not visible without scrolling.
```

```
Section: Will it be accepted, and can I do it online?
Position: 2 (marker 02)
Claim: Nationally recognised the moment it's issued, accepted anywhere in Australia — but
       in the ACT this course is delivered face-to-face in a classroom, not online.
Reader arrives: about 100/mo of Stage-2 demand searches an "online" variant of this exact
       query ("white card online canberra/act"); a real fraction of readers expect an
       online option here.
Objection defused: "Can I just do this online like some other providers seem to offer?"
Facts: face-to-face delivery is AlertForce's own arrangement, not a WorkSafe ACT
       requirement — the WHS Regulation 2011 (ACT) imposes no delivery-mode restriction at
       all (`01-source-map.md`, load-bearing caution: never attribute this to the
       regulator).
Distinctive material (Stage 2): two competitors (whitecardwebinars.com.au,
       trainingaid.edu.au) advertise online ACT/Canberra delivery in the same SERP. Say
       the unhelpful thing plainly rather than let a reader discover the mismatch after
       paying — this is the section where the Stage 2 finding must visibly change the
       copy, per content-craft.md's delete test.
Carrier: AnswerCapsule + prose. No CanCant "can/cannot" framing (there is no eligibility
       gate to state, unlike WA/TAS's online-delivery tests) — this is a delivery-mode
       fact, not an eligibility one.
Fails if: the section reads as though WorkSafe ACT restricts delivery mode, or omits that
       other providers may offer online ACT training the reader could seek elsewhere.
```

```
Section: What do you get, and how do you get your card?
Position: 3 (marker 03)
Claim: Passing gives a Statement of Attainment, not the physical card. You apply for the
       card yourself, online via an ACT Digital Account, within 60 days.
Reader arrives: not yet aware the card is a separate step from the course, same doubt
       WA/TAS/NSW/QLD readers arrive with.
Objection defused: "I thought passing the course WAS getting the card."
Facts: Statement of Attainment issued by AlertForce; applicant applies online via an ACT
       Digital Account within 60 days of the certificate; receipt + certificate lets the
       worker start while assessed (up to ~1 month); card posted ~2 weeks after approval;
       does not expire (`01-source-map.md`, Access Canberra, verified 22 Jul 2026).
Distinctive material (Stage 2): none of the ranking competitors state the 60-day window or
       the ACT Digital Account mechanic in their snippets — genuine process transparency.
Carrier: Stepper (enrol/attend -> AlertForce issues the Statement -> apply online within 60
       days -> card posted).
Fails if: it implies the card arrives automatically, or omits the 60-day window.
```

```
Section: What does an ACT White Card cost in total?
Position: 4 (marker 04)
Claim: $137 to ABE Education. $47.00 to Access Canberra when you apply for the card ($44.00
       if you're replacing one). $184.00 to a card in hand.
Reader arrives: price-comparing across near-identical offers (archetype 2 §1's "arrives
       already price-shopping").
Objection defused: "What's the real total, not just the headline price?"
Facts: $137 ABE price (internal, Andrey, 4 Aug 2026); $47.00/$44.00 Access Canberra,
       current FY26-27 (`01-source-map.md`).
Distinctive material (Stage 2): no ranking competitor states the government fee figure at
       all — the same transparency gap ABE already wins on WA/TAS.
Carrier: PriceCard (course fee row, government fee row, isTotal row).
Fails if: the total doesn't reconcile (course + government fee), or the government fee is
       stated without its own source line.
```

```
Section: How does the course work?
Position: 5 (marker 05)
Claim: A face-to-face classroom session with AlertForce, covering the training and your
       assessment.
Reader arrives: wants to know what a day/session actually involves before booking.
Objection defused: "What am I actually walking into?"
Facts: face-to-face classroom delivery, AlertForce's own arrangement (`01-source-map.md`).
       Session-booking specifics (frequency, venue) are NOT sourced this run and are
       deliberately not invented — see the unknowns-gate note in 01-source-map.md.
Distinctive material (Stage 2): none specific to this section — the delivery-mode finding
       is already spent in the #accepted section above; repeating it here would restate,
       not add.
Carrier: Section + prose, kept short rather than padded with unconfirmed specifics.
Fails if: it states a booking process, venue or session length AlertForce has not
       confirmed to ABE.
```

```
Section: Who develops the course, and who checks this page?
Position: 6 (marker 06)
Claim: Developed, owned and delivered by AlertForce, RTO 91826. Independently reviewed by
       Warwick Smith.
Reader arrives: post-purchase-decision, checking E-E-A-T signals.
Objection defused: none new — a trust confirmation, not an argument.
Facts: AlertForce RTO 91826 (internal); Warwick Smith reviewer (internal, matches every
       other White Card spoke).
Distinctive material (Stage 2): none.
Carrier: ExpertCredentials (experts=[warwick-smith], developerRto=91826).
Fails if: a second Person node appears, or either credit is titled "developer" for an ABE
       person (asqa hard rule).
```

```
Section: FAQ
Position: 7 (marker 07)
Claim: Answers the doubts the sections above can't fully resolve in one pass.
Reader arrives: mostly resolved, holding one of: "which state's course," "can I do it
       online" (again, in case they skimmed past #accepted), "does it expire," "is ABE the
       RTO," "what if I lose my card."
Objection defused: each question names one of the above verbatim.
Facts: same as their respective sections above — no new facts introduced.
Distinctive material (Stage 2): the online-delivery doubt is worth a second, FAQ-level
       answer even after #accepted covers it — Stage 2 found it's a real ~100/mo intent,
       not a one-line aside.
Carrier: Faq.
Fails if: a question restates a neighbouring section's capsule verbatim (the "swap test"
       from content-craft.md) rather than answering a genuinely distinct doubt.
```
