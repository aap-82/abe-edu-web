# Archetype 5 — Expert-authority profile

A named person who develops or reviews ABE content. The page exists to make E-E-A-T verifiable rather
than asserted, and to give every course page a real destination behind its reviewer line.

## 1 · Reader and arrival state

Two readers, and the page must serve both. A prospective student following the reviewer link to check
the course is credible. A search engine or AI answer engine resolving whether ABE's content has
demonstrable expertise behind it.

**Already settled:** nothing is being bought here.

**Actually unresolved:** is this person real, are they qualified in this specific subject, what is
their connection to ABE, and what on this site did they actually touch.

**The failure mode is a bio that could describe anyone.** Unverifiable credentials are worth less than
no credentials, because they invite doubt about everything else.

## 2 · Decision order

1. **Who they are** — name, role, current position, one-line summary.
2. **Verifiable credentials** — licence numbers, registrations, qualifications, years in the field.
3. **Their connection to ABE** — developer, reviewer, subject matter expert, and since when.
4. **What they contributed** — the specific pages, linked. This is the part usually missing.
5. **Independent presence** — LinkedIn and any professional register, as `sameAs`.
6. **Contact or further reading**, where appropriate.

## 3 · Required sections

| Section | Why |
|---|---|
| Identity and role | Named person, real photograph, current role. |
| Verifiable credentials | Specific and checkable. Licence numbers where they exist. |
| Relationship to ABE | Stated plainly, including independence where the person is an independent reviewer. |
| Contributions | Linked list of what they developed or reviewed. Makes the claim checkable. |
| External profiles | `sameAs` links, LinkedIn at minimum. |

## 4 · Forbidden carry-overs

- **Any course-page furniture** — no price, no enrolment CTA, no eligibility, no answer capsule
  written as a sales opening.
- **Stock photography.** Real photographs only. A stock headshot destroys the page's only job.
- **Vague seniority claims** ("industry veteran", "widely respected") with nothing checkable behind them.
- **Implying an independent reviewer is an ABE employee, or the reverse.** Independence is the value.

## 5 · Schema and frontmatter

`Person` + `ProfilePage` + `BreadcrumbList`, with `sameAs`, `jobTitle`, `worksFor` or `affiliation`,
and `knowsAbout`. **No `Course` node and no price** — the current build guardrail requires both and
will fail this page until the required-node set is made archetype-aware.

## 6 · Component defaults

Credentials for the bio and qualifications. A plain linked list for contributions. TrustBand only if
there is a verifiable claim to carry. No PriceCard, no CTABand.

## 7 · Worked section brief

```
Section: Credentials
Position: 2
Claim: [Name] holds [qualification/licence number] and has worked in [field]
       for [N] years.
Reader arrives: from a course page's reviewer line, checking whether the review
       means anything.
Objection defused: "This 'expert' is probably a marketing invention."
Facts: [licence/registration number — internal, confirmed with the person]
       [qualifications — confirmed]
Distinctive material (Stage 2): competitor course pages name reviewers but have
       no profile pages at all. A checkable profile is the gap.
Carrier: Credentials
Fails if: nothing on the page could be independently verified by a reader.
```

## 8 · Worked copy

Written from the brief above. Note that the `experts` collection enforces per-person prohibited claims
in Zod: the role is "Compliance & Currency Reviewer" and never "Content Reviewer", the organisation is
"Corporate Development Resource Group (CDRG)" and never "CDR Group", the scope is legislative currency
and regulatory accuracy rather than factual accuracy, and no building qualification may be claimed.
The copy below is written to those constraints, which is why it is specific rather than flattering.

> ### Credentials
>
> Warwick Smith is ABE Education's independent Compliance & Currency Reviewer. He reviews published
> course pages for legislative currency and regulatory accuracy, checking that the legislation, fees
> and regulator references on each page still match the source at the date of review.
>
> He holds an Associate Diploma in Business Management (Hospitality) and has [N] years in [field].
> He is not an ABE employee, and he did not develop the course material he reviews. That separation is
> the point of the role.
>
> Pages he has reviewed carry his name and the review date beside the breadcrumbs, so every claim on
> this page can be checked against the page it refers to.

**What to notice.** Every sentence is checkable. There is no "industry veteran", no "widely respected",
no seniority claim without something behind it, because an unverifiable credential on a credibility
page devalues everything near it. Naming what he does *not* do — employment, course development —
is what makes independence mean something.

The role is described precisely rather than expansively. A reviewer credited with more than he does
is a liability on a page whose only job is being believable.

**Do not transfer.** No price, no CTA, no answer capsule written as a sales opening, no eligibility.
This page sells nothing and any course-page furniture on it reads as a mismatch.
