# Archetype 3 — CPD / recurring compliance

A single CPD course sold to a licensed practitioner who must accrue points or hours within a cycle.
For a packaged set sold to discharge a whole cycle, use `04-cpd-bundle.md` instead.

**Authority model: state-approved direct.** Same prohibitions as archetype 1 — no RTO number, no
"nationally recognised", no "nationally accredited", no Statement of Attainment, no accredited-course
code. Use the regulator's approval wording and "Certificate of Completion". The shape below differs
sharply from archetype 1; the authority language does not.

## 1 · Reader and arrival state

A licensed builder, plumber or trade practitioner who has held a licence for years. They are not
evaluating whether training is worthwhile; they have an obligation with a deadline attached, and
often a partly filled record they need to top up.

**Already settled before they arrive:** what CPD is, that they need it, that online delivery is
normal, that ABE-type providers exist. Do not spend the page's opening explaining any of this.

**Actually unresolved:** does this specific course count towards my obligation, under which category,
for how many points or hours, will my regulator accept it, does it suit my licence class, when does
my cycle close, and how is completion recorded and evidenced if I am audited.

**The fear is not legitimacy, it is rejection.** They are afraid of doing the course and having it
not count. Every reassurance on this page should aim at that, not at "why choose us".

## 2 · Decision order

Ask the reader's questions in the reader's order:

1. **Does this count?** — category, points/hours, regulator acceptance. First, above the fold.
2. **Does it count for *me*?** — licence class, jurisdiction, cycle timing.
3. **What is it about?** — content and outcomes, briefly. This is a check, not a sell.
4. **How is it evidenced?** — completion record, certificate, what to keep for audit.
5. **What does it cost and how long does it take?** — time is the real currency here.
6. **How do I do it now?** — enrol.
7. **Who stands behind it?** — E-E-A-T, reviewer, sources.
8. **FAQ** — the residual edge cases.

**Contrast with archetype 1 (state-approval), and do not import its order.** There, "is it legit"
sits at position two because the reader has never bought this before and suspects the category. Here,
legitimacy is a box to tick, not a doubt to defuse, and putting it early spends the reader's attention
on a question they have already answered. Conversely "does it count for me" barely exists in
archetype 1 and is decisive here.

## 3 · Required sections

| Section | Why it is required |
|---|---|
| Points/hours and category statement | The single fact the reader came for. Above the fold, in the H1 region or immediately under it. |
| Regulator acceptance | Names the regulator and the basis on which the course counts. Verified, sourced, dated. |
| Who it applies to | Licence classes and jurisdictions covered — and, explicitly, who it does not cover. |
| Cycle and timing | When the obligation falls due and how late enrolment interacts with it. |
| Content outline | What is covered, scannable. Modules, not prose. |
| Evidence of completion | What the practitioner receives and what to retain if audited. |
| Price and time to complete | Both. Time is weighted at least as heavily as price for this reader. |
| Who developed and reviewed it | Named people, dated. |
| Sources | Every regulatory claim on the page. |

## 4 · Forbidden carry-overs

- **"What is CPD?" explainers.** Condescending to a licensed practitioner and it delays the answer.
  If a definition is genuinely needed, it belongs in an info guide that this page links to.
- **Eligibility framed as gatekeeping** ("you must be over 18…"). The relevant question is licence
  class coverage, not personal eligibility.
- **The owner-builder legitimacy block** ("is this course recognised / approved / real"). Replace it
  with the narrower, sharper acceptance statement.
- **Enrolment urgency invented by ABE.** The deadline is the regulator's cycle, which is real and
  worth stating plainly. Manufactured scarcity on top of a genuine statutory deadline reads as
  distrustful and undercuts the compliance framing.
- **Beginner-pitched benefits copy** ("advance your career", "stand out"). This reader is maintaining
  a licence, not building one.

## 5 · Schema and frontmatter

`Course` + `Organization`/provider + `BreadcrumbList` + `Person` x2 (developer, reviewer).
Where the course carries a formal CPD designation, model that as an `EducationalOccupationalCredential`
only if it genuinely is one — set `recognizedBy` to the regulator where the regulator approves the course directly, per
`authority-and-seo-rules.md`. Points/hours belong in visible copy and in frontmatter as their own fields, not smuggled
into a description string.

Frontmatter beyond the shared course set: `cpdPoints`, `cpdCategory`, `licenceClasses`,
`cycleBasis`, `regulator`.

## 6 · Component defaults

FactGrid for the points/category/hours/price at-a-glance. AnswerCapsule opening "does this count".
A table (not cards) for licence-class coverage — it is a lookup, so the reader needs to scan for
their own class. Note (`variant="caution"`) for the classes explicitly not covered. ModuleGroups for
content. Stepper only if enrolment-to-evidence genuinely has ordered steps. VerifiedSources under any
section stating a regulatory fact.

## 7 · Worked section brief

This is the Stage 3 output shape. Stage 4 writes from this, not from a heading.

```
Section: Does this course count towards my CPD?
Position: 1 (immediately after hero)
Claim: This course counts towards [regulator]'s CPD requirement, in the
       [category] category, for [N] points.
Reader arrives: knowing they need points, not knowing if this one qualifies;
       mildly sceptical because some providers are vague about it.
Objection defused: "I'll do it and then find out it doesn't count."
Facts that prove it: [regulator CPD requirement — .gov.au source + verified date]
       [category assignment — source + date]
       [points value — internal, confirmed with LearnWorlds/Notion]
Distinctive material (from Stage 2): competitors state points but none state the
       category, and the category is what practitioners are actually audited on.
       Lead with category, which is the gap.
Carrier: AnswerCapsule + FactGrid + VerifiedSources
Fails if: the answer is not complete within the capsule, or the category is
       stated without its source.
```

Note what the brief carries that a heading cannot: the claim, the objection, the specific research
finding that should change how the section opens, and the condition under which the section has
failed. That is the payload Stage 4 needs and the current pipeline drops.

## 8 · Worked copy

Written from the brief above. Points, category and regulator wording are placeholders; verify against
the regulator's listing at Stage 1 and confirm the points figure internally.

> ### Does this course count towards my CPD?
>
> This course counts as [category] under [regulator]'s CPD requirement and carries [N] points.
> [Category] is the category most practitioners come up short on at audit, because it is the hardest
> to accumulate incidentally on the job.
>
> It applies to [licence classes]. If you hold [excluded class], this one does not count towards your
> requirement, and the [alternative] course is the one you want.
>
> Your completion is recorded against your licence number and the certificate is issued immediately,
> so you have the evidence on file if you are audited.
>
> ✓ VERIFIED · 🔗 SOURCES — [regulator] CPD requirements. Verified [date].

**What to notice.** No definition of CPD, no explanation of why professional development matters, no
legitimacy section. This reader settled all of that years ago. The section opens on category rather
than points because category is the competitive gap, and it states who the course does *not* cover in
the second paragraph, which is the same trust move as archetype 1 in a different register.

Audit is named twice. The fear here is not being ripped off, it is doing the work and having it not
count, so every reassurance points at that.

**Do not transfer.** Archetype 1's "do I need this / is it legitimate" opening wastes this reader's
attention on questions they arrived having answered.
