# 05 — Section plan and component map — /cpd-plumbing-tas

**This stage did run.** Components were chosen by content shape, following the sibling.

| # | id | Components | From brief |
|---|---|---|---|
| 01 | `#your-year` | AnswerCapsule, FactGrid (`requirementRows`), prose, Note, VerifiedSources | inherited S1 |
| 02 | `#what-counts` | AnswerCapsule, prose, Note, VerifiedSources | inherited S2 |
| 03 | `#cost` | AnswerCapsule, PriceCard (`priceRows`), prose | inherited S3 |
| 04 | `#how-long` | AnswerCapsule, prose | inherited S4 |
| 05 | `#how` | AnswerCapsule, Stepper with `columns={2}`, Note, VerifiedSources | inherited S5 |
| 06 | `#content-review` | AnswerCapsule, ExpertCredentials | inherited S6 |
| — | `#faq` | Faq | inherited |

**Deviations from the sibling, and why**

- **`PriceCard` carries ONE row, not a comparison.** The sibling shows "bought individually" against
  "this bundle". The per-course figure that arithmetic needs is unanswered (see 01), so the card
  states the price charged and compares nothing. `rrp` and `singleCoursePrice` are omitted, all
  three fields being optional in the schema.
- **The hero keeps its FPO placeholder** (`artefactImg` omitted). This is what exposed the
  `global.css` hero defect recorded in 07 — the sibling has a real image and never took that path.

**Prop contracts worth knowing at the call site:** `Stepper` takes `columns={2}` only above
1100px and only when the call site asks; the bundle hero derives its points figure from the register,
so there is no `points` prop and there must never be one.
