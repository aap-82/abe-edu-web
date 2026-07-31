---
date: 2026-07-31
skill: skills-session
subject: accordion-exception-and-step-schema
verdict: Green
graded_by: self
---

# Skills review — the accordion exception, and a step body that takes a list, 2026-07-31

## Verdict

**Green.** Two rule changes, both made because shipped code had already diverged from the documents,
and both scoped so they license exactly what shipped and nothing more. The second one is the smaller
change and the more interesting one, because the schema is where the "don't split prose with a regex"
lesson had to be written down to survive.

## Why this ran at all

A design session shipped `ModuleRows` as a disclosure list against PRODUCT.md and DESIGN.md, on
Andrey's call, and filed a `[skills]` item saying the documents and the code now disagreed. Leaving
that open is the repo's most-repeated recorded risk: **"Documentation describing the build drifted
from the code and was trusted over it", seen 10 times** in `kb/mistakes-log.md`. This closes it the
same day rather than adding an eleventh.

## Change 1 — accordions are no longer FAQ-only

**Before:** four separate places asserted it, and I found the fourth only by grepping after fixing
three.

| file | what it said |
|---|---|
| `PRODUCT.md` Accessibility | decision-critical content "(eligibility, cost, requirements, what the course actually is)" is never hidden; "Accordions are for FAQs only" |
| `DESIGN.md` §6 Don't list | "Accordions are for FAQs only" |
| `DESIGN.md` §7 reader's-job table | "An accordion (FAQ only)" |
| `DESIGN.md` §5 Accordion component | "Accordions are for FAQs only" |

**After:** all four name the module-group syllabus as the one non-FAQ accordion, and a new §7
subsection, "The syllabus accordion", carries the evidence in one place the other three point at.

Two things the amendment does that a looser edit would not:

- **It narrows the protected set rather than widening the exception.** "What the course actually is"
  came out of PRODUCT.md's protected list, because that phrase is what covered the syllabus. What
  stays protected is named concretely: eligibility, cost, requirements, the authority model. A reader
  of the rule can now tell whether a given thing is covered without interpreting a category.
- **It records the fallback.** Variant A (every group open, the control collapses what you have read)
  is named in DESIGN.md as what this reverts to. A rule change that cannot be reversed without
  re-deriving the alternative is a rule change that never gets reversed.

The evidence carried into §7 is measured, not asserted: the ACT syllabus is **39% shorter** at 390px
(1869px to 1141px), and collapsed content stays in `dist/` so nothing is lost to a crawler. Both are
reproducible from the design review.

**Scope check.** `grep -rn "FAQs only\|FAQ only\|FAQ-only"` across PRODUCT.md, DESIGN.md, CLAUDE.md,
SYSTEM.md and `.claude/skills/` now returns nothing. That grep is the check I should have run before
editing, not after: I fixed three places, then found the fourth.

## Change 2 — a step body takes prose or a list

`const step = z.object({ title: z.string(), body: z.string() })` became
`z.union([z.string(), z.array(z.string())])`, with `types/course.ts` widened to match.

The union is the whole point. The easy version of this change is "make body an array" and migrate
everything, and it would have been wrong: **7 of 56 step bodies are single indivisible statements**,
and a one-item bulleted list renders a sentence worse than the sentence does. Both forms are
supported so the author decides per step.

**What is written into the schema comment, and why it belongs there rather than in a review nobody
re-reads:** splitting must be authored by clause and never done mechanically in the component. The
evidence is concrete. `"And your White Card, if you will be on site."` is a clause continuing its own
heading; a regex splitting on sentence boundaries turns it into a standalone bullet that reads as a
fragment. It needed rewriting to `"Add your White Card too, if you will be on site."` This is the same
principle `src/data/modules.ts` already records for learning outcomes ("split by clause, never by
comma"), and the schema is now the third place it is stated, which is right for a rule that two
sessions have independently had to rediscover.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [skills] **A canonical claim should be greppable before it is edited, not after.** The FAQ-only rule
  lived in four places and I found the fourth by grep after amending three. Consider a check that
  fails when the same normative sentence appears in more than one canonical document without one of
  them being marked the owner, the way `SYSTEM.md` §5 already reconciles the check list.
- [skills] **"Heritage Maroon for actions only" still does not describe the code.** Three non-action
  marks in `ModuleRows` are maroon (module numbers, outcome discs, count figures) and the `Stepper`
  bullets now make a fourth. Register-exclusive work under rule 7, so it could not be done here.
  Third filing.
- [build] **`white-card-wa` carries four authored step bodies and renders no Stepper.** Either wire
  one in or delete the field. Recorded in its `07-verification.md`; carrying unrendered content is
  how the `becomeSteps: []` stub survived for weeks.
- [build] **ACT, TAS, WA and NSW still have no module `contents` or `outcome`**, so each disclosure
  on those pages reveals a single sentence. Carried from the design review; unchanged by this session.

## Output
- [x] **`PRODUCT.md`** — accordion rule amended, protected set narrowed and named.
- [x] **`DESIGN.md`** — three places amended plus a new §7 subsection carrying the evidence.
- [x] **`src/content.config.ts` and `src/types/course.ts`** — `step.body` widened to a union, with the
  authored-not-mechanical rule recorded on the schema.
- [x] **Verified** — build green at 20 pages, guardrails passed, `astro check` 0 errors,
  `check-claims` 0 failing / 0 warning / 11 ok, `prose-lint` 10 files, `check-pipeline` 0 failing,
  `demand-split --strict` exit 0, `system-health` 0 FAIL.
- [x] **Demand item closed** — the PRODUCT/DESIGN contradiction filed this morning in
  `skill-reviews/design/2026-07-31-module-accordion.md`.
- [ ] **Memory written** — not needed. Both rules now live in the documents they govern, which is the
  durable form; neither is a fact about how I should work across projects.

## Grader note

`graded_by: self` — there is no fresh-subagent skills grader. The reproducible claims are the grep
returning empty across all five canonical files, the 7-of-56 prose count, and the gate results above.
The judgement worth challenging is whether the exception should have been written at all rather than
the code reverting to variant A: I amended two canonical documents to match shipped code, which is
the correct direction only if the shipped decision was right. If a reviewer thinks it was not, the
fallback is named in DESIGN.md precisely so that argument can be had without re-deriving it.
