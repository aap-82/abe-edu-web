# Archetype 1 — State-approval course

A course the state regulator approves directly, or accepts as satisfying a knowledge requirement,
before the reader may do something they are otherwise not permitted to do. QLD/QBCC, TAS/CBOS and
ACT/Access Canberra owner builder sit here; WA/Form 75 sits here as the knowledge-requirement variant.

For QLD specifically there is **no accredited version of the course** — only the QBCC-approved course
is accepted, and whether a provider is an RTO does not change what the QBCC accepts. That is
SME-confirmed and it is the answer to the "is it accredited?" objection, so state it plainly rather
than deflecting.

## 1 · Reader and arrival state

A homeowner, not a tradesperson, about to build or renovate. They have discovered a legal obstacle
between them and their project. They have never bought training like this and have no way to judge
providers.

**Already settled:** that they want to build; that some approval is involved.

**Actually unresolved:** whether they truly need this, whether this provider is real, what the whole
process is, what it costs in total, what they take on legally by doing it themselves.

**The fear is being ripped off or getting it wrong.** They cannot tell an approved course from a
convincing website. Legitimacy is the page's second job and it must be discharged early and plainly.

## 2 · Decision order

1. **Do I need this?** — the trigger, the threshold, who is exempt.
2. **Is this legitimate?** — approval by the named regulator, stated with its source. Early.
3. **What is it and what does it cost?** — content, time, price, all visible.
4. **What am I taking on?** — obligations, liability, insurance, supervision duties.
5. **What is the full path?** — course, then application, then permit. Ordered.
6. **Proof** — who developed and reviewed it.
7. **FAQ.**
8. **Act.**

**The knowledge-requirement variant (WA) changes step 2, not the order.** WA prescribes no course and
runs no approved-provider scheme. The reader applies for owner-builder **approval** (Form 75) from the
Building Services Board, which accepts a WA-specific course completed within two years plus a White
Card as evidence of sufficient knowledge. Position the course as supporting that application, never as
approved or recognised. Read `authority-and-seo-rules.md` before writing a word of it.

## 3 · Required sections

| Section | Why |
|---|---|
| Do I need this / threshold | The disqualifying question. Answer it before selling. |
| Approval statement | The legitimacy claim, sourced and dated, in the regulator's own terms. |
| What the course covers | Scannable. |
| Price and time | Both visible, price equal to schema. |
| Owner-builder obligations | The reader underestimates these. Stating them plainly builds trust and reduces refunds. |
| The full path to approval | Course is one step. Show the whole sequence, including the fee ABE does not charge. |
| Who developed and reviewed it | Named, dated. |
| Sources | Every regulatory claim. |

## 4 · Forbidden carry-overs

- **CPD's points-and-category framing.** This reader has no cycle and no points.
- **Assuming prior knowledge.** They do not know the regulator's name or what a permit is.
- **Burying the total cost.** Naming only ABE's price when a government fee follows reads as a trap.
- **Any RTO / accredited / Statement of Attainment language.** Authority-model breach and a ship-blocker.
- **For WA: "approved course", "approved provider", "licence", "permit" for the owner-builder step
  (it is an *approval*), or `recognizedBy` in schema.**

## 5 · Schema and frontmatter

`Course` + `EducationalOccupationalCredential` + `BreadcrumbList` + `Person` x2, `recognizedBy` the
regulator for the approved-direct states, **absent** for the knowledge-requirement variant.
Confirm the exact node set against the template's guardrails integration before building.

## 6 · Component defaults

ProcessTrack or Stepper for the path to approval. CanCant for what an owner builder may and may not
do. PriceCard split into what ABE charges and what the regulator charges. TrustBand for the approval
statement. Note (`variant="caution"`) for the obligations that carry legal consequence.

## 7 · Worked section brief

```
Section: Do I need an owner builder approval?
Position: 1
Claim: You need [regulator]'s owner builder approval if your project's value
       exceeds [threshold] and you are not using a licensed builder.
Reader arrives: mid-project-planning, unsure the rule applies to them at all.
Objection defused: "This probably doesn't apply to a job my size."
Facts: [threshold — .gov.au source + verified date]
       [exemptions — source + date]
Distinctive material (Stage 2): competitors state the threshold but not the
       exemptions, so readers below it enrol unnecessarily and refund. Stating
       who does NOT need it is the gap and it builds trust.
Carrier: AnswerCapsule + FactGrid + VerifiedSources
Fails if: a reader who does not need the course cannot tell from this section.
```

## 8 · Worked copy

Written from the brief above. Facts are drawn from ABE's verified QLD artefacts (verified 24 Jun 2026);
re-verify before reuse, and never carry them to another state.

> ### Do I need an owner builder approval?
>
> You need a QBCC owner builder permit if the residential building work is valued at more than $11,000
> including GST and you are not using a licensed builder. The value is what a licensed contractor would
> charge for the work, even if you are doing it yourself. For a genuine farm building the threshold is
> higher, up to $27,500.
>
> Under that figure you do not need a permit, and you do not need this course. Most small renovations
> and repairs sit below it, so it is worth pricing the job properly before you enrol.
>
> A few limits are worth knowing early. The QBCC generally issues one owner builder permit per person
> every six years, and a notification of the work stays on the property title for seven years.
>
> ✓ VERIFIED · 🔗 SOURCES — QBCC, About owner-building. Verified 24 Jun 2026.

**What to notice.** The second paragraph tells a reader they do not need the product. That is the
archetype's defining move: this reader cannot judge providers, so the fastest route to trust is
demonstrably not selling to someone who does not need it. It also cuts refunds. The threshold is
translated ("what a licensed contractor would charge") rather than restated, because the raw number
is useless to someone who has never priced building work.

**Do not transfer.** The eligibility-and-threshold opening is wrong for archetype 3, where the reader's
obligation is already settled, and meaningless for archetypes 5 to 10.
