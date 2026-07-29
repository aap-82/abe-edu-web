# 05 · Section plan + component map — /white-card-wa

The brief-to-section map. Every briefed section in `03-briefs.md` maps to a page section here, and
every page section traces back to a brief. `check-pipeline.mjs` checks both directions against this
table, so the "From brief" column is the load-bearing part of the file.

**Build shape:** one MDX file `src/content/courses/white-card-wa.mdx`, `authorityModel:
asqa-accredited`, **no `noindex`** (the buyUrl resolves — unlike `/white-card-tas`). Rendered by
`CourseLayout` via `src/pages/[slug]/index.astro`. FAQ data in `src/data/faqs-white-card-wa.ts`.

---

## Section map

| # | Page section (id) | Marker | From brief | H2 (question-led) | Components | Layout or authored |
|---|---|---|---|---|---|---|
| — | Hero | — | Hero | H1 "White Card WA" | Hero (ticks incl. **ASQA loc 1**, proof ×3, priced CTA) | layout ← `frontmatter.hero` |
| — | `rto-partner` | — | 01 (formal) | (eyebrow only) | PartnerDisclosure | **layout ← `partnerRto`, `placement: after-hero`** |
| — | At a glance | — | (01/05 facts) | "What do you need to know before you enrol?" | Section(bg-alt) + AnswerCapsule + FactGrid(glance) | authored |
| 01 | `real` | 01 | **01** | "Is this a real White Card?" | Section + AnswerCapsule + prose + VerifiedSources + SectionWayfinder | authored |
| 02 | `need-one` | 02 | **02** | "Do you actually need a White Card in Western Australia?" | Section(bg-alt) + AnswerCapsule + CanCant + prose + VerifiedSources | authored |
| 03 | `online` | 03 | **03** | "Can you do your White Card online in Western Australia?" | Section + AnswerCapsule + prose(list ×6) + VerifiedSources | authored |
| 04 | `covered` | 04 | **09** | "What does the White Card course actually cover?" | Section(**bg-alt**) + AnswerCapsule + BulletList(4) + prose + VerifiedSources + SectionWayfinder | authored — **added 28 Jul 2026** |
| 05 | `assessment` | 05 | **04** | "What happens in the live assessment, and how do you pass it?" | **ZSection** + AnswerCapsule + prose + Note(caution) + VerifiedSources | authored |
| 06 | `cost` | 06 | **05** | "What does a White Card cost in Western Australia?" | Section(bg-warm) + AnswerCapsule + PriceCard(priceRows) + VerifiedSources | authored |
| — | TrustBand | — | (proof) | "Nationally recognised, delivered by an RTO" | TrustBand + TrustStats + AnswerCapsule(**onDark**) | authored |
| 07 | `your-card` | 07 | **06** | "What do you get, and how long does it last?" | Section + AnswerCapsule + FactGrid + prose + Note(caution) + VerifiedSources | authored |
| 08 | `content-review` | 08 | **07** | "Who developed and checked this course?" | Section(bg-alt) + AnswerCapsule + ExpertCredentials(**developerRto**) | authored |
| 09 | `faq` | 09 | **08** | "Common questions" | Section + Faq(items) — incl. **ASQA loc 5** (3 Qs) | authored ← data file |
| — | ASQA disclosure (loc 2) | — | CTA band | — | Note (full CTA template, single line) | authored (last body block) |
| — | CtaBand | — | CTA band | "Get your Western Australian White Card" | CtaBand | layout ← `frontmatter.ctaBand` |
| — | Footer | — | Sources / ASQA loc 3, 4, 7 | — | SourcesFooter | layout |

**Every brief is placed.** Hero → frontmatter. 01 → `#real` (+ the formal `#rto-partner` card,
layout). 02 → `#need-one`. 03 → `#online`. **09 → `#covered`** (added 28 Jul 2026).
04 → `#assessment`. 05 → `#cost`. 06 → `#your-card`. 07 → `#content-review`. 08 → `#faq`.
CTA band → frontmatter + the loc-2 Note. **No brief dropped, no section without a brief.**

**Markers run 01 to 09, sequential, one mechanism** (the `marker` prop). Background alternates
bg-alt / default / bg-alt / default / ZSection / bg-warm / TrustBand / default / bg-alt / default.

---

## Deviations from the briefs (recorded, per skill Stage 5)

1. **Brief 01 splits into two page sections**, exactly as the TAS run found. `CourseLayout`
   auto-renders `rto-partner` (the PartnerDisclosure fact card) with no H2, capsule or sources, so
   the archetype's core trust copy — the capsule and the "check RTO 31193 yourself, we would rather
   you did" invitation — has to be authored as a separate `real` section. This is a deliberate split,
   not a dropped section. **FRICTION, second occurrence:** the built ASQA branch still under-renders
   archetype 2's core section. Recorded on the TAS run; recording it again is the trigger.
2. **partnerRto.placement is after-hero, where TAS used after-body.** Evidence-led, not
   preference: the Blue Dog brand cluster is 2,460 impressions and two clicks at position ~6.5
   (`02-gap.md` §2), and the schema's own comment says an ASQA page's RTO partner belongs after-hero
   "since [it] answer[s] the question the reader arrived with".
3. **`assessment` is a ZSection, not a Section.** It carries the page's one differentiating image and
   is the section that has to justify the price, so it gets the image treatment. TAS gave that to
   `your-card`, which in WA has no lodgement journey worth photographing.
4. **`your-card` is a Section + FactGrid, not a ZSection + Stepper.** WA has no lodgement sequence:
   the RTO issues and posts the card. The facts (credential, card, expiry, lapse) are parallel, not
   sequential, so FactGrid is the correct carrier and the Stepper has nothing to order.
5. **`howItWorksSteps` carries the enrolment-to-card flow** in the hero strip only, not a Stepper
   section: enrol → theory → book the live assessment → Blue Dog issues. Four steps, no government
   lodgement step, because WA has none.
6. **`becomeSteps: []`.** Required by the course schema, an owner-builder concept with no archetype-2
   meaning. **SECOND OCCURRENCE** — the TAS run already filed this. Per ROADMAP rule 3, two
   occurrences authorise the fix: make `becomeSteps` optional in `content.config.ts`. Routed
   `[skills]`; not fixable from a build session.
7. **`courseWorkload` is stated**, where TAS omitted it. WA has a measured figure (theory two to six
   hours). Nothing invented.
8. **No `priceRows` government row with a dollar figure above zero.** WA charges no card fee, so the
   row reads "Government card fee — none in Western Australia · $0.00". The row is kept rather than
   dropped so "no second payment" is structural. **Watch at Stage 7:** `check-claims` reconciles
   totals expecting one course-fee row, one government-fee row and an `isTotal` row. $99 + $0.00 =
   $99 reconciles arithmetically; confirm the checker accepts a zero government row rather than
   reading it as a missing one.

---

## Component prop contracts that bite (carried forward + new)

Carried from the TAS run, all still live:

- **`Note` slot must be ONE line.** MDX wraps a multi-line JSX child in its own `<p>`, which gets
  hoisted out of the Note's `<p>`, producing a silent empty callout (mistakes-log #12). Both Note uses
  here are single-line.
- **`AnswerCapsule` inside `TrustBand` needs `onDark`**, or the text is unreadable on the dark band.
- **`ExpertCredentials developerRto={frontmatter.partnerRto.rtoNumber}`** resolves the `partners`
  record into an **organisation** developer card. `experts:` holds Warwick Smith alone.
- **CSS classes must not contain the substring "rto".** The authority-language guardrail scans bundled
  CSS and matches "rto" as a forbidden RTO claim. The developer card's classes are `org-badge` /
  `org-verified` for exactly this reason.
- **`VerifiedSources`** takes `date`, `facts`, `sources=[{label, href}]`, not free prose. **Write
  `facts` however it reads best.** The component chooses its own joiner: a `facts` string containing
  "against" is joined to its sources with the house middot, anything else with the word "against".
  There is nothing here for an author to get wrong.
  - *This bullet has been wrong twice in two days, and the history is the useful part.* It first read
    "No literal em dashes", which was **withdrawn 29 Jul**: all nine built pages use an em dash in
    their source labels, 146 of them, including the most recently built page, so the rule described
    an aspiration no page implemented and applying it here alone would have made this the only page
    with a different separator. It was then rewritten as "`facts` must not end in against ...", which
    named the **real** defect — a doubled "against" rendering on 39 blocks across 7 pages — but put
    the fix in the wrong place. **A rule that lives in one page's artefact protects one page.** The
    joiner belongs to the component, and once it moved there the rule became unnecessary rather than
    merely unenforced. See `skill-reviews/design/2026-07-29-verifiedsources-joiner.md` for the
    measured before and after, and the reasoning for a separator rather than a deletion.
- **In-page nav `sectionId`s must match a rendered section id**, or guardrail 7 fails.
- **Image alt >= 80 characters**, or the build fails.

New, recorded this run:

- **`CanCant` takes `canTitle` / `can[]` / `cantTitle` / `cant[]` as plain strings**, not nodes. The
  `need-one` "you may not need one" side is genuinely a *negative recommendation* rather than a
  prohibition, which is a slightly different use from the TAS page's "you cannot use this course if".
  Wording chosen so it does not read as a restriction on the reader.
- **A `$0.00` row in `PriceCard`** has no precedent in this repo. Every existing page's government row
  carries a positive figure. Flagged for Stage 7 verification rather than assumed to render sensibly.

---

## ASQA 7-location resolution

| # | Location | Resolved |
|---|---|---|
| 1 | Hero inline short form | **authored** — hero tick 2: "Training delivered by Blue Dog Training (RTO 31193) · Enrolled through ABE Education" |
| 2 | Near CTA (full template) | **authored** — single-line Note at the end of the body, adjacent to the layout's CtaBand |
| 3 | Footer full legal disclosure | **layout** — `asqaDisclaimer`, auto-prepended to `disclaimersHtml` |
| 4 | Footer copyright bar | **authored into `disclaimersHtml`** — course / training provider / enrolment partner |
| 5 | FAQ 3 mandatory questions | **authored** — FAQ items 1 to 3 (delivers / contact / verify) |
| 6 | About Your Training Provider | **layout** — PartnerDisclosure `rto-partner`, now placed after-hero |
| 7 | T&Cs link | **layout** — SourcesFooter `legalLinks` emits `/terms` sitewide |

Sitewide `.f-asqa` "ABE Education is not an RTO" line is separate and present on every page.
**Re-verify all seven against the built HTML at Stage 7 rather than assuming the TAS resolution still
holds** — location 6 has moved, so at minimum that row is untested in this position.

---

## Image slots (input to Stage 6)

| Slot | Section | Ratio | Purpose |
|---|---|---|---|
| Hero artefact | hero | 4:5 | A WA construction worker holding a construction induction card on site |
| ZSection image | `assessment` | 4:5 | The live video assessment: someone demonstrating PPE to a trainer on a laptop call |

Two slots only. Expert headshots are real photographs and are never generated.

## Deviation log — 28 July 2026

**`covered` inserted at marker 04**, between `online` and `assessment`. Everything below it shifted
down one marker (`assessment` 04→05, `cost` 05→06, `your-card` 06→07, `content-review` 07→08,
`faq` 08→09). The **From brief** column is the thing to read here: it now runs 03, **09**, 04, 05,
06, 07, 08. That is not a mistake. A brief number is an identity the other artefacts cite; a marker
is a position on the page. The late brief kept its own number rather than renumbering 01-08 and
destroying the record of what the original run briefed.

Chain re-linked with it: `online`'s SectionWayfinder now points at `#covered` ("What the course
covers") instead of `#assessment`, and `covered`'s points at `#assessment`. A `nav` entry
("What you learn") was added between "Online in WA?" and "Assessment".

**Carrier choice.** `BulletList`, not `TopicGrid`. The four unit elements are a parallel equal-weight
set, which is BulletList's stated job, and it holds 3-7 items. `TopicGrid` renders a three-column
grid, so four cards would strand the fourth on its own row.

### Band correction, 29 July 2026

`#covered` was added at the default band, between `#online` and `#assessment` which are both default
too. That left **three adjacent default bands** and flattened the page's vertical rhythm.

No sibling page has even two adjacent defaults. Measured from `dist/`:

| Page | Band sequence |
|---|---|
| white-card-tas | d, alt, d, warm, d, alt, d, alt |
| qld-owner-builder-course | d, alt, d, alt, d, warm, d, alt, warm, d |
| tas-owner-builder-course | d, alt, d, alt, d, alt, warm, d, alt, d, warm, d |
| white-card-wa **before** | alt, d, alt, d, **d, d**, warm, d, alt, d |
| white-card-wa **after** | alt, d, alt, d, alt, d, warm, d, alt, d |

The covered section is now bg-alt. **Zero adjacent default pairs**, verified against the built HTML.

The independent Stage 7 audit flagged the two-in-a-row when this section landed, under section A
deviations. It was recorded and not acted on, and the third default made it worse. Noted because a
finding that is filed and not fixed reads the same as one that was never found.

**Note on the table above:** the page names in it are deliberately NOT in backticks.
`check-pipeline` reads every backticked lowercase token inside a table row in this file as a planned
**section id**, so backticking page names here made them phantom sections and failed section
conformance. This file is machine-parsed, not just read: keep backticks in tables for section ids
only.
