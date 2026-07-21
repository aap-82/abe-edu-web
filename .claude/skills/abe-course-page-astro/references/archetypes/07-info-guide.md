# Archetype 7 — Info guide

An evergreen explanation of a rule, process or concept. It is not tied to a date and it is maintained
on a verification cadence. It earns trust and links; it does not sell.

## 1 · Reader and arrival state

Someone researching, often early, often not ready to buy and sometimes never going to. They may be a
professional checking a detail.

**Actually unresolved:** the substance of the question they typed.

**The failure mode is a guide that is a sales page in disguise.** The reader detects it immediately,
and so do answer engines. A guide that answers the question completely, including where the answer is
"you don't need our course", is the one that gets cited and linked.

## 2 · Decision order

1. **The direct answer,** in the first section. No preamble.
2. **The qualifications and exceptions** to that answer.
3. **The detail** — how it works, in the order it happens.
4. **Adjacent questions** the reader will have next.
5. **Where to go next** — one relevant link, not a sales push.

## 3 · Required sections

| Section | Why |
|---|---|
| Direct answer | Answer-first. This is what gets surfaced in AI answers. |
| Exceptions and edge cases | Completeness is the entire value proposition. |
| The detail | Ordered as the process happens. |
| Related questions | Captures the follow-up intent. |
| Sources | Every regulatory claim, with dates. |
| Last verified | Visible. Evergreen means maintained, not stale. |

## 4 · Forbidden carry-overs

- **Course-page CTAs throughout.** One contextual link where genuinely relevant.
- **Withholding the answer** to drive an enrolment. It fails the reader and the ranking.
- **Publishing it as a blog post.** It then ages out and nobody re-verifies it.
- **A price.**

## 5 · Schema and frontmatter

`Article` (or `FAQPage` where the shape genuinely is Q&A) + `BreadcrumbList` + `Person` author/reviewer.
**No `Course` node, no price.** Frontmatter: `lastVerified`, `verificationCadence`, `reviewer`.

## 6 · Component defaults

AnswerCapsule opening. Prose with Note blocks for exceptions. Faq for the related questions.
VerifiedSources per claim, SourcesFooter at the foot.

## 7 · Worked section brief

```
Section: Do you need a White Card to work on a residential site?
Position: 1
Claim: [Direct answer, complete within the capsule.]
Reader arrives: mid-search, wanting a yes or no.
Objection defused: none — this reader has no objection, only a question.
Facts: [requirement — .gov.au source + verified date]
Distinctive material (Stage 2): competitors answer only the general case and
       omit the exceptions, so the exception-holders bounce. Covering them is
       the gap and the link-earning move.
Carrier: AnswerCapsule + Note + VerifiedSources
Fails if: the reader has to visit a government site to complete the answer.
```

## 8 · Worked copy

Written from the brief above. The rule stated is a placeholder; verify against the WHS regulator for
the jurisdiction before use.

> ### Do you need a White Card to work on a residential site?
>
> Yes. Anyone carrying out construction work on a site in [state] needs a current White Card, including
> on residential builds and including owner builders doing the work themselves. It is required before
> you set foot on site, not before you finish.
>
> There are a few exceptions. [Exception A]. [Exception B]. If you hold a White Card issued in another
> state it is recognised in [state], because the unit is nationally recognised, and it does not expire.
>
> If you are supervising rather than carrying out the work, [rule]. That is the case most people get
> wrong, because supervision on a residential site usually involves being on it.
>
> ✓ VERIFIED · 🔗 SOURCES — [WHS regulator]. Verified [date].

**What to notice.** The answer is complete before any qualification arrives, and the exceptions are
given rather than gestured at. Completeness is the whole value proposition of this archetype: a guide
that sends the reader to the regulator to finish the answer has earned nothing and will not be cited.

The last paragraph names the common misunderstanding directly. That is the part that earns links.

**Do not transfer.** No CTA stack, no price, and no withholding the answer to drive an enrolment.
This page's job is to be the best answer available, and the enrolment follows from that or not at all.
