# Archetype 2 — Nationally recognised course

## Contents
- 1 · Reader and arrival state
- 2 · Decision order
- 3 · Required sections
- 4 · Forbidden carry-overs
- 5 · Schema and frontmatter
- 6 · Component defaults
- 7 · Worked section brief
- 8 · Worked copy

A unit of competency delivered through an RTO partner, producing a Statement of Attainment. White
Card and NSW owner builder sit here. The defining feature is that ABE is not the issuing body, and
the page must say so accurately without undermining the credential.

## 1 · Reader and arrival state

Usually a worker who needs the ticket to be allowed on site, sometimes a career-changer, sometimes an
employer buying for staff. Time-pressured and often price-shopping across near-identical offers.

**Already settled:** that they need the card; that many providers offer it.

**Actually unresolved:** which providers are real, whether it is accepted in their state, how fast
they can have it, what arrives at the end and when, and whether online delivery is permitted where
they are.

**The fear is buying a worthless certificate,** and it is well founded — the category has known bad
actors. Naming the RTO partner and its number is the strongest single trust signal on the page.

## 2 · Decision order

1. **Is this the real thing?** — RTO partner named with number, unit code, Statement of Attainment.
2. **Will it be accepted where I work?** — state acceptance and delivery-mode rules.
3. **How fast, and what do I get?** — completion time, what issues, when.
4. **Price.**
5. **How it works** — delivery, assessment, what is required of them.
6. **Act.**
7. **Proof and FAQ.**

This reader decides faster and comparison-shops harder than any other. Front-load the differentiators
and keep the page tight; depth belongs in a linked info guide.

## 3 · Required sections

| Section | Why |
|---|---|
| RTO partner and unit | Partner name, RTO number, unit code. The core trust signal. ASQA disclosure. |
| What you receive | Statement of Attainment, who issues it, timeframe. |
| State acceptance and delivery mode | Online delivery is not permitted everywhere; state it per jurisdiction. |
| Price and time | Both visible. |
| How assessment works | Reduces refunds and support load. |
| Who developed and reviewed it | The **RTO develops and owns** the accredited course — credit the RTO (an Organization), never an ABE person. ABE names an independent **reviewer** only. `experts:` holds the reviewer alone; the build fails an asqa page with two Person nodes or a Person titled "developer". See `kb/rules/asqa-disclosure-framework.md`. |
| Sources | Every regulatory claim. |

### The RTO trust section is TWO things, and the layout only gives you one

**This is the archetype's most-missed requirement.** It has been filed as a defect twice, by
`white-card-tas` and again verbatim by `white-card-wa`, because nothing said so until now.

`CourseLayout` renders `#rto-partner` automatically from `partnerRto` frontmatter, positioned by
`placement` (`after-hero` or `after-body`). That block is a **`PartnerDisclosure` card**: partner name,
RTO number, unit, credential, the role-separation blurb and contact. It carries **no H2, no answer
capsule and no sources**, because it is a *disclosure*, not a section.

So archetype 2's defining question — *is this qualification real, and who stands behind it* — is not
answered by any section unless **you author one**. Both live pages do, and this is the prescribed
pattern:

```mdx
<Section id="real" marker="01" eyebrow="Is this real?" h2="Is this a real White Card?">
  <AnswerCapsule>Yes. The training is delivered and assessed by [RTO], RTO [number], and you
  receive a nationally recognised Statement of Attainment for [unit]. …</AnswerCapsule>
  …body, a ResourceLink to the register…
  <VerifiedSources date="…" facts="…" sources={[…]} />
</Section>
```

**Both are required, and they are not redundant.** The disclosure satisfies the ASQA framework; the
section answers the reader's question with a capsule the guardrails check and sources the audit checks.
A page with only the disclosure has no section on its own core claim, and `check-pipeline` will not
catch it because the brief and the page agree — the section was never briefed.

Do not try to make `#rto-partner` carry the H2 and capsule instead. It renders in two placements, on
pages whose heading order differs, and the split is what lets the disclosure sit high (compliance) while
the section sits where the reader asks the question (`#real`, usually marker 01).

## 4 · Forbidden carry-overs

- **Claiming ABE issues the credential.** Name the partner. ABE is never an RTO.
- **Owner-builder-style long-form explanation.** This reader will not read it.
- **Vagueness about delivery mode** where a state restricts online delivery.
- **Omitting the RTO number** because it complicates the sentence. It is the trust signal.

## 5 · Schema and frontmatter

`Course` + `EducationalOccupationalCredential` + `BreadcrumbList` + `Person` x2, with the RTO partner
modelled as the credential's recognising body. Frontmatter carries `rtoPartner`, `rtoNumber`,
`unitCode`. Confirm against the template's guardrails before building.

## 6 · Component defaults

PartnerDisclosure, high on the page. FactGrid for time/price/format/outcome. A table for state
acceptance. Faq for the objection set. Keep the page short.

## 7 · Worked section brief

```
Section: Who issues this White Card?
Position: 1
Claim: The course is delivered under [partner], RTO [number], and you receive a
       nationally recognised Statement of Attainment for [unit code].
Reader arrives: burned or warned about fake certificates, scanning for a real
       RTO number before reading anything else.
Objection defused: "Is this one of the dodgy ones?"
Facts: [RTO partner + number — internal, confirmed]
       [unit code — internal, confirmed]
Distinctive material (Stage 2): most competitors bury the RTO number in the
       footer. Putting it in the opening section is the gap.
Carrier: AnswerCapsule + PartnerDisclosure
Fails if: the RTO number is not visible without scrolling.
```

## 8 · Worked copy

Written from the brief above. Partner and unit details are illustrative; confirm against the live
partner record before reuse.

> ### Who issues this White Card?
>
> The course is delivered with our RTO partner Blue Dog Training, RTO 31193, and you receive a
> nationally recognised Statement of Attainment for CPCWHS1001 Prepare to work safely in the
> construction industry. Blue Dog issues the Statement of Attainment; ABE Education publishes and
> supports the course and is not a Registered Training Organisation.
>
> You can check RTO 31193 on training.gov.au, the national register, before you pay. We would rather
> you did.
>
> ✓ VERIFIED · 🔗 SOURCES — training.gov.au, RTO 31193 record. Verified [date].

**What to notice.** The RTO number appears in the first sentence, not the footer. This reader has
been warned about fake certificates, so the number is the product's proof and belongs where it is
seen first. Inviting the reader to verify it independently is stronger than any reassurance, and it is
only available to a provider whose record stands up.

The ABE-is-not-an-RTO line sits here rather than in a disclaimer, stated as a fact about who does
what, which is both accurate and more trustworthy than burying it.

**Do not transfer.** Archetype 1 has no RTO and must never carry this language. A state-approved page
using it is an authority-model breach and a ship-blocker.
