# Archetype 9 — Single insurance type

A page explaining one type of cover — what it is, whether it is compulsory, who needs it and how it is
obtained. ABE refers rather than sells, so the page's credibility depends on being useful rather than
promotional.

## 1 · Reader and arrival state

Usually an owner builder or trade practitioner who has discovered an insurance obligation attached to
something else they are doing. Insurance is not their field and the terminology is unfamiliar.

**Actually unresolved:** is this compulsory or optional, what does it cover, when must I have it, what
happens if I do not, and how do I get it.

**The fear is being uninsured without realising it,** or buying the wrong cover.

## 2 · Decision order

1. **What this cover is,** in one plain sentence.
2. **Is it compulsory, and for whom** — the decisive question.
3. **What it covers and excludes.**
4. **When it must be in place** — usually tied to a stage of a project.
5. **What happens without it** — consequences, stated factually.
6. **How to obtain it** — the referral pathway, disclosed as such.
7. **Sources.**

## 3 · Required sections

| Section | Why |
|---|---|
| Plain-language definition | The reader does not know the terminology. |
| Compulsory or optional | The question they came for. Jurisdiction-specific. |
| Cover and exclusions | Exclusions matter more than inclusions here. |
| Timing | Insurance obligations attach to project stages. |
| Consequences of not holding it | Factual, sourced. Not scare copy. |
| How to obtain it | The referral relationship disclosed plainly. |
| Sources | Every regulatory claim. |

## 4 · Forbidden carry-overs

- **Selling a course.** If the page's main action becomes enrolment, it is the wrong archetype.
- **Undisclosed referral relationships.** Disclose the commercial relationship.
- **Advice framing.** ABE is not an insurance adviser. Describe the requirement; do not recommend a
  product or a level of cover.
- **Scare tactics** built on the consequences section. State the consequence and its source.

## 5 · Schema and frontmatter

`Article` or `Service` + `BreadcrumbList` + `Person` reviewer. **No `Course` node.** Frontmatter:
`jurisdictions`, `compulsoryIn`, `partner`, `lastVerified`.

## 6 · Component defaults

AnswerCapsule for the definition. A table for compulsory-by-jurisdiction. CanCant for covered versus
excluded. InsurancePartner for the referral, with the relationship stated. Note for the timing trap.

## 7 · Worked section brief

```
Section: Is [cover] compulsory?
Position: 2
Claim: [Cover] is compulsory in [jurisdictions] for [who], and optional
       elsewhere.
Reader arrives: having been told they "need insurance", unsure if that is true.
Objection defused: "Am I being upsold something I don't legally need?"
Facts: [requirement per jurisdiction — .gov.au source + verified date]
Distinctive material (Stage 2): broker pages imply cover is universally
       compulsory. Stating plainly where it is not is the trust-earning gap.
Carrier: AnswerCapsule + table + VerifiedSources
Fails if: the page cannot tell a reader in a non-compulsory jurisdiction that
       they are not obliged to buy.
```

## 8 · Worked copy

Written from the brief above. Jurisdictions and requirements are placeholders and must be verified per
state. ABE is not an insurance adviser; describe the requirement, never recommend a level of cover.

> ### Is [cover] compulsory?
>
> [Cover] is compulsory in [jurisdictions] for [who], and it is not compulsory in [other
> jurisdictions]. If you are building in [non-compulsory state], you are not legally required to hold
> it, whatever a broker's website implies.
>
> Where it is compulsory, it must be in place before [project stage], not before completion. That
> timing catches people out, because the obligation attaches earlier than most owner builders expect.
>
> [Cover] does not cover [common exclusion]. That is worth reading properly before you buy, because it
> is the gap people assume is covered.
>
> Cover is arranged through [partner], not by ABE Education. We receive a referral fee.
>
> ✓ VERIFIED · 🔗 SOURCES — [regulator]. Verified [date].

**What to notice.** The page tells a reader in a non-compulsory jurisdiction that they are not obliged
to buy, which is the fail condition in the brief and the entire reason this page is worth reading. The
referral relationship is disclosed plainly in the body rather than in a footer disclaimer.

Exclusions lead over inclusions, because the reader's actual risk is assuming they are covered when
they are not.

**Do not transfer.** No course CTA, no recommended level of cover, and no consequences section written
as scare copy. State the consequence, cite it, and stop.
