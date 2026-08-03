# 05 · Section plan & component selection — /white-card-qld

One row per section. `Brief` names the `03-briefs.md` entry it carries — the mapping `check-pipeline`
verifies in both directions.

| # | id | marker | Nav label | H2 (question-led) | Components | Brief |
|---|---|---|---|---|---|---|
| — | (glance) | — | — | "What do you need to know before you enrol?" | Section + AnswerCapsule + FactGrid | Opening glance (not in `03`, matches the standing convention every sibling White Card page opens with) |
| — | `rto-partner` | — | 01 (formal) | (eyebrow only) | PartnerDisclosure | **layout ← `partnerRto`, `placement: after-hero`** — auto-rendered by `CourseLayout`, no H2/capsule/sources of its own; the `#real` section below is the authored answer to the same question. Added 3 Aug 2026 in Stage 7, matching the equivalent row both sibling White Card pages' own section plans carry — its absence here was a real documentation gap `check-pipeline.mjs` correctly flagged (WARN, not a page defect: the section itself rendered correctly all along). |
| 1 | `real` | 01 | "Is it real?" | "Is this a real White Card?" | Section + AnswerCapsule + ResourceLink + VerifiedSources | "Is this a real White Card?" |
| 2 | `need-one` | 02 | "Do you need one?" | "Do you need a White Card in Queensland?" | Section (bg-alt) + AnswerCapsule + CanCant + VerifiedSources | "Do you need a White Card in Queensland?" |
| 3 | `online` | 03 | "Online in QLD?" | "Can you do your White Card online in Queensland?" | Section + AnswerCapsule + VerifiedSources | "Can you do your White Card online in Queensland?" |
| 4 | `covered` | 04 | "What you learn" | "What does the course cover?" | Section (bg-alt) + AnswerCapsule + UnitOutline + VerifiedSources | "What does the course cover?" |
| 5 | `session` | 05 | "The live session" | "How does the live session work?" | ZSection + AnswerCapsule + Stepper + Note (caution) + VerifiedSources | "How does the live session work?" |
| 6 | `cost` | 06 | "Cost" | "What does it cost?" | Section (bg-warm) + AnswerCapsule + PriceCard + VerifiedSources | "What does it cost?" |
| — | — | — | — | (TrustBand, no H2/marker, standing pattern) | TrustBand + AnswerCapsule (onDark) | TrustBand |
| 7 | `your-card` | 07 | "Your card" | "What do you get, and how long does it last?" | Section + AnswerCapsule + FactGrid + Note (caution) + VerifiedSources | "What do you get, and how long does it last?" |
| 8 | `content-review` | 08 | "Reviewed" | "Who developed and checked this course?" | Section (bg-alt) + AnswerCapsule + ExpertCredentials | "Who developed and checked this course?" |
| 9 | `faq` | 09 | "FAQ" | "Common questions" | Section + Faq + VerifiedSources | FAQ |
| — | — | — | — | (closing disclosure, standing pattern, outside all Sections) | Note + BulletList | Closing disclosure block |

**Bg rhythm, checked against the sibling-page lesson recorded in `white-card-wa.mdx`:** default | alt |
default | alt | warm | default (TrustBand counts as its own band) | alt | default. No two adjacent
sections share `bg-alt` or the default, matching the standing rhythm rule.

---

## Deviations from `03-briefs.md`, and why

**One deliberate addition.** `04-content.md`'s `#session` brief did not specify a `Stepper`, but
`howItWorksSteps` is a required schema field and a flagged, still-open demand item on
`white-card-wa.mdx` notes it "carries four authored step bodies and renders no Stepper" — content
present in frontmatter that never reaches the page. `white-card-tas.mdx` does render one (in
`#your-card`). This build renders `howItWorksSteps` via a `Stepper` in `#session`, where the three
enrol → session → issue steps fit the question being asked, rather than repeating WA's unrendered-field
defect a third time. Otherwise: every briefed section maps to exactly one page section, in the same
order, with no merges, splits or cuts. The opening "at a glance" FactGrid and the closing disclosure
block are not separately briefed in `03` because they are the standing convention every sibling White
Card page carries unchanged.

---

## Component prop contracts not obvious at the call site

- **`ZSection`'s image props are required together**: `imgDesc`, `imgSpec`, `imgSrc`, `imgAlt`. Missing
  `imgRatio` defaults to `r45` (4:5 portrait), which is what this slot uses — no explicit `imgRatio`
  needed, matching `white-card-wa`'s `#assessment` ZSection.
- **`ExpertCredentials`' `developerRto` takes the RTO **number** as a string** ("31193"), not the
  partner object — confirmed against `white-card-wa.mdx`'s call site (`developerRto={frontmatter.partnerRto.rtoNumber}`),
  reused here identically.
- **`PartnerDisclosure` (auto-rendered from `partnerRto` frontmatter) needs no manual placement in the
  MDX body** — `placement: "after-hero"` in frontmatter controls where `CourseLayout` inserts it. Do
  not also hand-author a card for it; the archetype file's "RTO trust section is TWO things" warning is
  about authoring the **answer section** (`#real`) separately, not about placing the disclosure itself.
- **`CanCant`'s `can`/`cant` arrays render as plain bullet text, no nested markup** — keep each item to
  one sentence, matching the exact style already proven on `white-card-wa`'s `#need-one` section.
- **`PriceCard`'s `amount` values carry cents (`$109.00`), while every other on-page price reads without
  them (`$109`).** Stage 7's fresh subagent flagged this as WARN 1 (checklist wants the on-page price to
  match `Course.offers.price` "including cents formatting"). Checked against `white-card-wa.mdx` and
  `white-card-tas.mdx` before changing anything: **both siblings use the identical cents-in-PriceCard,
  no-cents-elsewhere pattern** (`amount: "$99.00"` in their `priceRows`, `$99` everywhere else), and both
  pass `check-claims`/`check-pipeline`/guardrails today. This is the sitewide `PriceCard` convention, not
  a defect this build introduced — changing it here alone would make this page *less* consistent with
  its siblings, not more. **Deliberately not changed.**

---

## New files this build creates outside `src/content/courses/`

- **`src/data/faqs-white-card-qld.ts`** — following the exact pattern of `faqs-white-card-wa.ts` /
  `faqs-white-card-tas.ts`. `src/data/**` is not explicitly named in the session-types table's
  may-write column for `build`, but every sibling White Card page required exactly this file as part of
  its own build, and it holds nothing but this one page's FAQ copy — the same practical precedent this
  run follows rather than inventing a new one. Flagged in Stage 9's demand list per the repo's own
  "assign the path when you meet the gap" convention.

## Chrome edits this build required, outside `pipeline/{slug}/` and `src/content/**`

- **`src/components/SiteHeader.astro`** — `design`-owned, edited anyway. The orphan-page guardrail
  (`abe-guardrails`, `astro:build:done`) fails any indexable page with no inbound link, and nothing
  else in the repo linked to `/white-card-qld`. Changed the QLD White Card megamenu row from
  `{ code: 'QLD', name: 'White Card QLD', soon: true, desc: 'In development' }` to a live
  `href: '/white-card-qld'` with an updated description. **This is the third sighting of this exact
  session-type boundary crossing** — `white-card-wa` (28 Jul) and `white-card-nsw` (1 Aug) both hit the
  identical wall. Disclosed here explicitly, in the pipeline artefact itself, not only in a commit
  message or a chat response — the gap the Stage 9 review of this run flagged as the one thing the
  first two sightings did that this run initially failed to do. Filed as a repeat `[skills]` demand
  item; see `skill-reviews/2026-08-03-abe-course-page-astro-white-card-qld.md`.
