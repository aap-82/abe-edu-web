# Archetype 10 — About us / organisation authority

The page carrying ABE's organisation-level authority claim. Unusually load-bearing: ABE is not an RTO,
accredited delivery runs through partners, and this is where a sceptical reader resolves what ABE
actually is. It also feeds the `Organization` node every other page's schema graph references.

## 1 · Reader and arrival state

A prospective student checking the company is real before paying. A partner or regulator doing due
diligence. A journalist or link-builder. An answer engine resolving entity identity.

**Actually unresolved:** who runs this, how long they have existed, what they are and are not, who
delivers the accredited training, and where they are.

**The failure mode is generic company boilerplate.** Mission-and-values copy answers none of the above
and reads as concealment on a page whose job is disclosure.

## 2 · Decision order

1. **What ABE is,** stated precisely, including what it is not.
2. **How long, and at what scale** — since 2007, students, states covered.
3. **How accredited delivery works** — the RTO partner model, named.
4. **Who the people are** — links to the expert profiles.
5. **Where and how to reach them** — links to contact.
6. **Verifiable identifiers** — ABN, registered name.

## 3 · Required sections

| Section | Why |
|---|---|
| What ABE is and is not | The authority model at organisation level. The most important paragraph on the site. |
| History and scale | Since 2007, states, volume. Longevity is the strongest available trust signal. |
| The RTO partner model | Named partners with numbers. Explains how accredited delivery works without ABE being an RTO. |
| People | Links to the expert profiles, not repeated bios. |
| Verifiable identifiers | ABN, registered entity name. |

## 4 · Forbidden carry-overs

- **Mission and values boilerplate.** It answers nothing a sceptical reader asked.
- **Claiming or implying RTO status.** The single hardest ship-blocker on the site.
- **Vague scale claims** ("thousands of students") without a basis.
- **Duplicating expert bios** already on their own pages, which cannibalises them.
- **A price or an enrolment CTA.**

## 5 · Schema and frontmatter

`AboutPage` + `Organization` (the canonical node other pages reference) + `BreadcrumbList`.
`Organization` carries `foundingDate`, `sameAs`, `identifier` (ABN), `address`. **No `Course` node, no
price.** Frontmatter: `abn`, `foundingYear`, `rtoPartners`, `statesCovered`.

## 6 · Component defaults

Prose-led with TrustStats for the scale line. PartnerDisclosure for the RTO model. A linked list for
people. Restraint throughout — this page's credibility comes from specificity, not design.

## 7 · Worked section brief

```
Section: What ABE Education is
Position: 1
Claim: ABE Education is an Australian online training provider operating since
       2007. It is not a Registered Training Organisation; nationally recognised
       training is delivered through RTO partners, named below.
Reader arrives: about to pay, checking the company is legitimate; or a regulator
       checking the authority claims made elsewhere on the site.
Objection defused: "Is this a real company, and are they overstating what they
       are?"
Facts: [founding year — internal, confirmed]
       [RTO partners + numbers — internal, confirmed]
       [ABN — internal, confirmed]
Distinctive material (Stage 2): competitors are vague about whether they are the
       RTO. Stating the model plainly, unprompted, is the differentiator.
Carrier: Prose + PartnerDisclosure + TrustStats
Fails if: a reader finishes the section still unsure whether ABE is an RTO.
```

## 8 · Worked copy

Written from the brief above. Partner numbers are illustrative; confirm each against its
training.gov.au record, which is the crawlable proof the accreditation page links to.

> ### What ABE Education is
>
> ABE Education is an Australian online training provider. We have been training owner builders and
> construction workers since 2007, across [states].
>
> ABE Education is not a Registered Training Organisation. Nationally recognised training, including
> the White Card, is delivered with our RTO partners: Blue Dog Training (RTO 31193), AlertForce
> (RTO 91826) and Upskill Institute (RTO 45708). Each holds the qualification on its scope, issues the
> Statement of Attainment, and can be checked on training.gov.au.
>
> Our state-approved courses, including the QLD owner builder course, are approved directly by the
> state regulator rather than accredited nationally. Those are two different pathways, and we describe
> each one as what it is.
>
> ABN [number]. [Registered entity name].

**What to notice.** The disclosure comes second, unprompted, in plain words. On a page whose job is
resolving what ABE actually is, volunteering the limitation is what makes the rest believable, and it
is the thing competitors will not copy because they are vague about it on purpose.

Every partner is named with a checkable number. "We work with leading RTOs" would say nothing and
invite doubt about everything else on the page.

**Do not transfer.** No mission and values, no price, no enrolment CTA, and no repeated expert bios —
link to the profiles instead, or the About page cannibalises them in search.
