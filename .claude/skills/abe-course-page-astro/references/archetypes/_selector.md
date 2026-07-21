# Archetype selector — choose the page shape before you outline

The page's shape is a decision, not a default. Ten archetypes are defined; each has its own reader,
its own decision order, its own required sections, its own schema graph and its own build rules.
**Select the archetype at the start of Stage 3, name it in the run, and read only that archetype's
file.** Everything downstream (outline, copy, components, frontmatter, guardrails) branches off it.

The failure this prevents: the state-approval owner-builder shape was the first one built, so it
became the implicit default for every page. Applied to CPD it answers questions the reader already
settled before arriving; applied to an expert profile it asks for a price and an eligibility section
that do not exist.

## Select by what the reader arrived to do

| # | Archetype | File | The reader arrived to… | Sells? |
|---|---|---|---|---|
| 1 | State-approval course | `01-state-approval-course.md` | satisfy a regulator's condition before they can build | yes, one-off |
| 2 | Nationally recognised course | `02-nationally-recognised-course.md` | get a ticket an employer or site will accept | yes, one-off |
| 3 | CPD / recurring compliance | `03-cpd-compliance.md` | keep a licence current before a cycle closes | yes, recurring |
| 4 | CPD bundle | `04-cpd-bundle.md` | clear a whole cycle's obligation in one purchase | yes, bundle |
| 5 | Expert-authority profile | `05-expert-profile.md` | work out who wrote this and whether to believe them | no |
| 6 | Hub | `06-hub.md` | find the right page among several | no, routes |
| 7 | Info guide | `07-info-guide.md` | understand a rule or process, not necessarily buy | no, earns trust |
| 8 | Blog post | `08-blog-post.md` | read something current, timely or explanatory | no |
| 9 | Single insurance type | `09-insurance-type.md` | work out what cover they need and whether it is compulsory | referral |
| 10 | About / organisation authority | `10-about.md` | work out who ABE is and whether to trust them | no |

**Not archetypes.** Contact, terms, privacy and refund pages are build-only static templates — see
`_static-pages.md`. This skill places their wording and never drafts or rewrites it.

## Disambiguating the near-misses

These are the pairs that get confused. Decide deliberately.

- **State-approval vs nationally recognised.** Not "which state" — *what the credential is*. If the
  regulator approves the course directly (QLD/QBCC, TAS/CBOS) it is 1. If the credential is a unit of
  competency delivered through an RTO partner (White Card, NSW OB) it is 2. WA sits in 1 with the
  knowledge-requirement variant. This choice sets the authority model, so getting it wrong is a
  compliance failure, not a style one. Confirm against `authority-and-seo-rules.md`.
- **CPD vs CPD bundle.** A single course with points attached is 3. A packaged set sold to discharge a
  whole cycle is 4 — different reader maths (total points and total cost against the obligation,
  not one course's merits).
- **Info guide vs blog post.** If it answers a durable question and will still be true next year, it is
  7 and it is maintained on a verification cadence. If it is tied to a change, a date or a season, it
  is 8 and it carries a published date and ages out. Do not file evergreen material as a blog post; it
  strands verified research on a page nobody updates.
- **Hub vs info guide.** A hub's job is to route — if you find yourself writing three paragraphs of
  explanation, it wants to be 7 with links, or the explanation belongs on the child pages.
- **About vs expert profile.** 10 is the organisation, 5 is a person. About carries the RTO-partner
  model and the `Organization` node other pages reference; it links to the profiles rather than
  repeating their bios.
- **Insurance vs course.** 9 never sells a course. If the page's main action is enrolment, it is a
  course archetype with an insurance mention, not an insurance page.

## Archetype is not the authority model

Two independent axes. **Archetype** = what the reader arrived to do, which sets the page's shape.
**Authority model** = what ABE may legally claim about the credential, which sets the page's language
and schema. Do not derive one from the other.

The clearest case: a CPD course (archetype 3) is **state-approved-direct** in authority terms — the
same model as a QLD owner builder course (archetype 1), so the same prohibitions apply (no RTO
number, no "nationally recognised", no Statement of Attainment). Its *shape*, however, is nearly the
inverse. Getting the archetype right does not excuse you from `authority-and-seo-rules.md`, and
matching the authority model does not license copying the other page's structure.

| Authority model | Applies to |
|---|---|
| State-approved direct | Owner builder QLD / TAS / ACT, and CPD |
| Knowledge-requirement | Owner builder WA (Form 75, Building Services Board) |
| ASQA-accredited | White Card all states, NSW owner builder, asbestos, silica |
| No credential claim | Archetypes 5, 6, 7, 8, 9, 10 and the static pages |

## What every archetype shares

Do not re-litigate these per archetype; they hold across all ten.

- Australian English. Never "comprehensive". No em dashes in body copy.
- Every government fact carries an official source and a verified date. An unresolved government fact
  is a publish hard-blocker. `[confirm: ...]` is for regulatory facts awaiting verification and
  nothing else.
- Internal facts (price, pass mark, points, modules, reviewer) are asked at Stage 1 and never defaulted
  from a sibling page.
- The authority model applies wherever a credential is named. ABE is never an RTO.
- One H1. Answer-first openings, ~120-180 words between headings. Image alt >= 80 characters, en-AU.
- `FAQPage` schema is optional only — the rich result was retired in May 2026. Keep the visible Q&A.
- Every page states who wrote or reviewed it and when.

## What each archetype file defines

Read the file for the shape; do not infer it from another archetype's page.

1. **Reader and arrival state** — what they know, what they fear, what they have already decided.
2. **Decision order** — the sequence of questions, in the order this reader asks them. This is the
   part that varies most and the part most often wrongly inherited.
3. **Required sections** — with the reason each is required. Sections absent from the list are not
   forbidden; sections in it are not cuttable for brevity.
4. **Forbidden carry-overs** — sections and moves imported from a neighbouring archetype that
   actively harm this one.
5. **Schema graph and frontmatter** — the JSON-LD node set the build expects, which differs per
   archetype and is enforced at `astro:build:done`.
6. **Component defaults** — the carriers this shape tends to need, as a starting point, not a rule.
7. **A worked section brief** — one section shown end to end, so Stage 4 has something to imitate.
