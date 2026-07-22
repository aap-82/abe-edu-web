---
name: abe-course-page-astro
description: >-
  End-to-end builder for any ABE Education page: select the archetype, research the government
  sources, run a competitor keyword and content-gap analysis, write section briefs and copy, hand
  off as components, then build a static Astro site and deploy to Cloudflare Workers. Ten
  archetypes: state-approval course, nationally recognised course, CPD, CPD bundle, expert profile,
  hub, info guide, blog post, insurance type, about. Use whenever the user wants to create, research,
  outline, write, componentise, build, or deploy an ABE page (owner builder, White Card, CPD, expert,
  hub, guide, any Australian state), e.g. "start the NSW owner builder page", "build the CPD Tasmania
  hub", "write the expert profile", "keyword gap for the WA course", or "spin up another state page
  from the QLD one", even when the user names one stage or does not say Astro/Cloudflare. Covers
  archetype selection, gov-source map, competitor gap, section briefs, content craft, component
  handover, authority/SEO/E-E-A-T guardrails, and the deploy.
---

# ABE Course Page — research to content to components to build to deploy

The full pipeline for an ABE course landing page, from government research to a live Astro site on
Cloudflare. It carries a proven Astro template (the QLD Owner Builder page + its component library)
and worked examples of every research/content artefact, so a new page follows a known-good path
rather than being invented each time.

Australian English throughout. Never the word "comprehensive". No em dashes in body copy. Every
government fact carries an official source + a verified date; ABE-controlled facts (price, pass mark,
bundle, reviewer date, modules) are confirmed against LearnWorlds / Notion, never guessed. Apply the
authority model in `kb/rules/authority-and-seo-rules.md` from Stage 1 — state-approved courses
carry no RTO / "accredited" / "Statement of Attainment" claims, and knowledge-requirement states
(WA) carry no "approved course/provider" claim and no `recognizedBy` in schema.

Enter at whatever stage the user asks for; the stages are ordered but independently useful. Show the
output of each stage and get a go-ahead before starting the next when the user is walking through it.

**Stage outputs are files, not chat.** Write each stage's artefact to `pipeline/{slug}/` —
`01-source-map.md`, `02-gap.md`, `03-briefs.md`, `04-content.md`, and so on. A later stage, a grader,
or a resumed session reads them from there. Anything that exists only in the conversation cannot be
audited, resumed, or graded independently.

## Checking the system, not just the page
`guardrails.ts` checks one page at build. These check the system:
- **`node scripts/system-health.mjs`** — run before planning work. Register freshness, dangling
  references, Stage-9 review coverage, trend direction, repeat risks, claim drift, figure
  contradictions. FAIL blocks page-building; WARN is work to schedule.
- **`node scripts/check-claims.mjs`** — what the docs *assert* about the build, checked against
  `content.config.ts` and `guardrails.ts`, plus every dollar figure on a page matched against
  `kb/register/`. A superseded figure is a FAIL.
- **`node scripts/check-freshness.mjs`** — register staleness. Wired into `prebuild`.
- **`node scripts/review-trends.mjs`** — after filing a Stage-9 review.

**When you change a claim about the build, add it to `CLAIMS` in `check-claims.mjs`.** Documentation
drifting from code is this system's most-recorded repeat risk; a claim nothing checks is a claim that
quietly stops being true.

## Ask, don't assume

A wrong assumption on this pipeline is expensive: it reaches a published page carrying a regulatory
claim. The default is to ask, and the cost of asking is a few seconds.

**Ask when:**
- The request forks into **materially different outputs** — a different archetype, a different state,
  a different authority model. Guessing produces a page that has to be rebuilt, not tweaked.
- A constraint you need is **missing and cannot be inferred** from the brief, the artefacts in
  `pipeline/{slug}/`, or `kb/`.
- An **internal fact** is unknown: price, pass mark, points, attempts, modules, completion time,
  bundle, reviewer and date. These are unresearchable — no amount of searching produces ABE's pass
  mark. This is the Stage 1 unknowns gate, and it closes before content is written.

**Don't ask when:**
- The answer is already in the conversation, the brief, the artefacts, or `kb/`. **Look first.**
  Re-asking for something on disk is the failure the Stage-9 "low rework" score measures.
- A sensible default plus a stated assumption would do. Proceed, and **flag the assumption inline**
  so it can be corrected — do not bury it.

**Never default a regulatory fact.** Fees, thresholds, eligibility, legislation, regulator names,
approval status: verify against the `.gov.au` source or `kb/register/`, or mark it explicitly
UNVERIFIED. A plausible-looking figure is worse than a visible gap, because nothing downstream can
tell it is wrong. This rule has no exception and no "reasonable estimate".

**Match the format to the question:**
- **Closed** — either/or, pick-from-a-set, confirm-or-correct (price, pass mark, attempts, delivery
  format, which archetype, which state) → use the **interactive question tool**
  (`AskUserQuestion` in Claude Code, the clickable widget in claude.ai). Offer the sibling-state or
  most-likely value as one option so it can be confirmed in one tap. Never assume the sibling value
  silently.
- **Open** — anything needing explanation or description (the module list, why a fact differs from
  another state, curriculum status) → **plain prose**. Do not force an open answer into buttons.
- **Already measured** — check the platform before asking a person. LearnWorlds gives real completion
  time, average score, students and certificates issued. Use the measured figure.

Batch questions rather than drip-feeding them: one interaction with three questions beats three
interactions. One question is often enough; three is a ceiling.

**Subagents cannot ask.** `AskUserQuestion` is unavailable inside a subagent. A subagent that hits an
unknown **stops and reports it** to the main session, which asks. A subagent that guesses instead has
produced an artefact nobody can trust, and the grader has no way to tell.

## The 9 stages

### 1 · Government resource map + fact ledger
Collect and describe every authoritative `.gov.au` page behind the course (regulator, permit/approval,
fees, eligibility, required courses, responsibilities, WHS, levy, home warranty, pinned legislation).
**Read the internal verified register first, then go live.** The repo's `kb/` library holds
verified state/regulatory facts — start at its index, `kb/content-source-map.md`, which maps
each fact to its source file (`kb/register/state-fees-register.md`, `kb/register/eligibility-by-state.md`,
`kb/register/regulator-roles-by-state.md`, `kb/register/legislation-references-{state}.md`,
`kb/register/online-delivery-policy-by-state.md`, `kb/register/penalties-by-state.md`, `kb/register/cbos-tas-reference.md`, and the rest).
Load only the file the fact needs. Use the register's figure and its verified date where current; go to
the live `.gov.au` page only to fill what the register does not cover, or to re-verify a fact whose
cadence has lapsed (indexed fees reset ~1 July). Write any newly verified fact back to the register so
the next page does not re-chase it. Each entry: live URL, what it contains, and whether it is a primary
fact / structure / background, with a verified date. This is the fact spine. Method + format:
`references/content-pipeline.md` section 1.

**Then build the fact ledger, and close it before Stage 2.** Every fact the page will state gets a row:
what it is, its value, its class, and its provenance. There are exactly two classes, and they have two
different mechanisms. Nothing is defaulted, and nothing is guessed.

| Class | Examples | Mechanism | Never |
|---|---|---|---|
| **Regulatory** | permit fee, monetary threshold, eligibility, legislation, regulator name, approval status, permit limits | verify against the `.gov.au` source (or the register above); record the URL + verified date | never ask the user, never default |
| **Internal** | course price, pass mark, attempts, module list, completion time, certificate validity, RTO partner, who reviewed the page and when | **ask the user, interactively, now** | never default, never infer from a sibling state's page, never leave a marker |

**The unknowns gate.** List every internal fact you do not have, then ask for it before writing a word
of content. A missing internal fact is not researchable — no amount of searching will produce ABE's
pass mark — so carrying it forward as a placeholder guarantees it leaks into the page.

Ask in the format the question deserves:
- **Closed** (price, pass mark, attempts, delivery format, whether a page is reviewed) → the interactive
  clickable widget, with the sibling-state value offered as one option so the user can confirm or correct
  it in one tap. Never assume the sibling value silently.
- **Open** (the module list, why a fact differs from another state, curriculum status) → plain prose.
  Ask for a screenshot of the LearnWorlds table of contents or the course-overview stats panel where
  that is the fastest route to the truth.
- **Already measured** — check the platform before asking a person. LearnWorlds' course overview gives
  the real completion time, average score, students and certificates issued. Use the measured figure
  ("about five and a half hours", from a 322-minute average) rather than copying another state's prose.

The ledger is closed when every row has either a source + verified date, or an answer + the date it was
asked. Only then does Stage 2 begin.

### 2 · Competitor keyword / content-gap analysis
Ground the target keywords in real demand, then find where ABE can win. Source order:
1. **Google Search Console first (when an export exists)** — ABE's own actual demand: the primary
   keyword (highest-impression query), the locality variants, and the terms the market uses even when
   they are the wrong word (e.g. licence/permit when the term is approval). GSC stays the source of
   truth for pages ABE already ranks for.
2. **Neil Patel connector (Ubersuggest engine) for the gap** — now the default demand layer, run whether
   or not a GSC export exists, because it gives live volume / SEO difficulty (`sd`) / CPC for the terms
   ABE does *not* yet rank for (the demand a GSC export cannot see). Lead with `keyword_suggestions` /
   `match_keywords` for bulk metrics; `keyword_overview` is rate-limited (~3/day) so reserve it for trend
   on 2-3 key terms. AU is city-level only: use `location_suggest` for the state capital `locId`
   (e.g. Perth 1000676, searched as bare "Perth"), triangulate across capitals, and treat figures as
   relative priority — never a single city's number as national volume. Demand/competition only, never a
   `.gov.au` fact.
3. **Competitor inference only if the connector is unavailable** — infer keywords from the competitor
   pages and note it as a known gap.
Then fetch the organic-ranking competitor pages, extract their H1/H2 (H3 where the content sits), build a
coverage matrix (topic x competitor), and rank the gaps ABE can win (price transparency, eligibility,
obligations, E-E-A-T, guide intent, doubts competitors seed). Method:
`references/content-pipeline.md` section 2.

### 3 · Archetype selection, then section briefs
Two moves. The first decides everything after it, and skipping it is how every page ends up shaped
like the QLD owner builder page.

**3a — select the archetype.** Read `references/archetypes/_selector.md` and choose by what the reader
arrived to do, not by what the last page was. Then read that archetype's file and none of the others.
Ten archetypes: state-approval course, nationally recognised course, CPD, CPD bundle, expert profile,
hub, info guide, blog post, insurance type, about. **Name the archetype in the run**, because
everything downstream branches off it: required sections, decision order, forbidden carry-overs,
schema graph, component defaults.

**Archetype is not the authority model.** Independent axes. A CPD course is state-approved-direct,
the same model as a QLD owner builder page, so the same prohibitions apply — and its shape is nearly
the inverse. Matching the authority model never licenses copying the other page's structure.

Contact, terms, privacy and refund pages are not archetypes. They are build-only static templates
(`references/archetypes/_static-pages.md`) and this skill never drafts or rewrites their wording.

**3b — write section briefs, not a heading outline.** A heading with an intent label is not something
Stage 4 can write from. It has to invent the section's point, and invented points are where filler
comes from. Each section gets:

| Field | What it carries |
|---|---|
| Claim | the one thing this section convinces the reader of |
| Reader arrives | what they know, doubt and have already decided at this point |
| Objection defused | the doubt, in the reader's own words |
| Facts that prove it | each with provenance: source + verified date, or internal + confirmed |
| Distinctive material | the Stage-2 finding that should change how this section opens |
| Carrier | the component(s), by content shape |
| Fails if | the condition under which this section has not done its job |

Lay the archetype's required sections down in its decision order first, then map the competitor union
and the Stage-2 gaps onto that. A required section no competitor covers is a gap ABE wins by default,
not a section to cut. One H1 only, carrying the primary keyword verbatim (highest-impression GSC query
where an export exists, otherwise the strongest connector term).

Worked example: section 7 of any archetype file. Method: `references/content-pipeline.md` section 3.

### 4 · Extended content
Write one section at a time, from its brief. Do not write from the heading.

**Read two things first.** `references/content-craft.md` is the method — translate facts rather than
restate them, spend the distinctive material, write the capsule as an answer rather than an
introduction, name the objection out loud, and the voice rules. Then section 8 of your archetype file,
which is finished copy written from that archetype's own brief. Read the exemplar even when the rules
seem sufficient: a worked example shapes output far more strongly than a rule does, which is precisely
why ten worked examples of one archetype produced ten pages of one shape.

Every section except the FAQ opens with a 40 to 60 word answer capsule, answer first. Keep roughly 120
to 180 words between headings. Tag each heading with its level. A verified-with-sources line under
every section stating a government fact, and a page-foot Sources block. Split prose into the shapes the
carriers need, using `references/component-selection.md` — and pick the carrier for what the content is
doing, never to fill a component the last page used.

**Then the cold reread, before Stage 5 rather than after the build.** Run the seven checks at the foot
of `content-craft.md`: the brief's fail condition, the delete test on the research finding, the
first-sentence test, the anywhere test, fact-to-meaning, the archetype's forbidden carry-overs, and
sources. At Stage 7 a rewrite is expensive and the tooling is structural; here it costs nothing.

`[confirm: ...]` is for regulatory facts awaiting verification and nothing else. Internal facts were
asked at Stage 1 and are answered before a word is written. Method:
`references/content-pipeline.md` section 4.

### 5 · Section plan & component selection
Turn the extended content into a **section plan**: an ordered list of sections, each with an id, a nav
label, a marker, a question-led H2, and the **components** that carry its content. Choose each component
by the **shape** of the content, not by what the last page happened to use.

**The styleguide is the vocabulary, and it is live.** `/styleguide` renders every component from
`src/components` with real data and real tokens, so it cannot drift from production. Read it before
choosing; it is the source of truth, not a table in a markdown file.

| Content shape | Component |
|---|---|
| 40-60 word direct answer, opening a section | AnswerCapsule (`onDark` inside TrustBand) |
| permitted vs prohibited, is vs is-not | CanCant |
| ordered process | Stepper (in a section) / ProcessTrack (in the hero) |
| four parallel scannable facts | FactGrid |
| peer topics or module groups | TopicGrid |
| money + what is included | PriceCard |
| cross-sell pathway | BundleOffer |
| insurance through the partner | InsurancePartner |
| industry x state availability | CpdMatrix |
| RTO partner + unit + credential (ASQA model only) | PartnerDisclosure |
| caveat, exception, legal consequence | Note (`variant="caution"`) |
| question-and-answer pairs | Faq |
| named-person E-E-A-T proof | Credentials |
| government-fact provenance line | VerifiedSources |
| social proof + the authority-model attestation | TrustBand + TrustStats |
| a section that needs an image beside its body | **ZSection** |
| a section that does not | **Section** |

**Never hand-roll markup.** A raw `<section class="sec">`, an inline `style=`, or a structural class in
an MDX body all mean the same thing: **a component is missing.** The protocol, in order:
1. **Compose first** - most "new" shapes are existing components in combination.
2. **If it repeats, promote it.** The same shape twice, or across two state pages, is a component.
3. **If it is genuinely new, build it properly, in the same change:** `src/components/{Name}.astro` + a
   styleguide specimen + design tokens, no magic numbers. A one-off inline in a page becomes the next
   state page's copy-paste. That is exactly how the trust-stat row ended up hand-written 12 times and
   the insurance cross-sell copy-pasted across three pages.

The build enforces this: an inline style or a structural class in an MDX body fails, and the error names
the component that owns the markup. A component with no styleguide specimen fails too.

### 6 · Astro build
Work in the live repo. A course page is **one MDX file** in `src/content/courses/`; a hub is one MDX
file in `src/content/hubs/` with a page stub calling `getEntry('hubs', '<id>')`; an expert is one
**`.md`** file in `src/content/experts/` (the loader glob is `.md`, and an `.mdx` there is silently
ignored). Course frontmatter carries
the chrome and the JSON-LD inputs (title, canonical, `authorityModel`, price, nav, hero, sticky, experts,
sources, disclaimers), and the body composes components. `src/pages/[slug]/index.astro` renders any entry
in the collection through `CourseLayout`, which builds the JSON-LD graph and the chrome. There is no page
file to write and no component to import into the router.

`content.config.ts` validates the frontmatter with Zod at parse time; the `abe-guardrails` integration
audits the built HTML at `astro:build:done` and **fails the build** on any of:
- more than one H1, or a missing JSON-LD node (Course + Credential + BreadcrumbList + Person x2)
- `Course.offers.price` absent from the rendered page, or `priceNumber` not equal to `price`
- an **asserted** claim forbidden by the page's authority model (the check excises the chrome and looks
  for a negator, so "ABE Education is not an RTO" passes while "delivered by an RTO" fails)
- an in-page link to an id no element carries (a nav `sectionId` or a wayfinder target that was renamed)
- section markers out of sequence (there is one marker mechanism: the `marker` prop)
- image alt under 80 characters, or an unresolved `[confirm: ...]` marker
- an inline style, a structural class, or a component with no styleguide specimen (see Stage 5)

A red build is a publish hard-blocker. Fix the content - never the components, and never the checks.

Every image slot (Hero artefact, ZSection images, Placeholder cards) carries a description + aspect-ratio
spec; turn those into ready-to-paste **image-generation prompts for ChatGPT and Gemini**, one per slot,
with the target filename and the >= 80-char alt text. Expert headshots are excluded (real photos only).
Prompt template + guardrails: `references/image-prompts.md`.

Verify Astro mechanics against the connected **Astro docs MCP**, not memory: the content-collections
API (`getCollection`, `render(entry)`, `entry.id`), the `content.config.ts` schema and loader, the
`[slug]` dynamic route / `getStaticPaths`, MDX and slots, and the config all change between Astro
versions — the template uses the current forms, so confirm before altering them. It covers the Astro
layer only; ABE facts, authority model, SEO and copy stay with the skill's own references.

### 7 · Pre-deploy verification
Before deploying, run the checks on the built HTML (`dist/{slug}/index.html`) and fix FAILs by
correcting the content or data, never by watering down the components:
- **pre-production audit (`references/seo/audit-workflow.md`)** — (a) *structure & schema*: one H1 with the target
  keyword, valid server-rendered JSON-LD (Course + Credential + BreadcrumbList + Person x2, zero errors,
  logged-out DOM), `recognizedBy` matching the authority model (regulator for state-approved-direct,
  **none** for WA knowledge-requirement), `Course.offers.price` equal to the on-page price, meta
  title/description/canonical, alt text; (b) *authority language*: no RTO/accredited/"approved course"
  claim; (c) *E-E-A-T & freshness*: crawlable breadcrumb reviewer/updated line, per-section verification
  blocks, `#content-review` section, "Last verified" dates; (d) *citation gate*: every government/
  legislative claim visibly sourced + a Consolidated Sources list (primary or issuing-authority sources
  only); (e) *cannibalisation & indexation*: primary keyword not already targeted, `/course/` + `/program/`
  robots-blocked, links up/down not sideways, genuinely state-specific content; (f) *banned copy*: no
  "comprehensive", no "Enrol now/today", no CTA inside answer/FAQ blocks.
- **`abe-readability-audit`** — measure ~60–66 CPL (45–75; mobile 30–45), body >= 16px, leading 1.4–1.6,
  single-column left-aligned prose, off-black-on-off-white, ~7-item list chunking, answer-first, one
  primary CTA per view repeated + sticky on long/mobile, trust beside the claim/CTA, tap targets
  >= 44px, reflow at 320px, AA contrast. Its `audit_static.py`/`audit_render.py` scripts target the
  design-rules `.t-*` register; this template uses the homepage-style register, so read them at the
  principles level, not as a token pass/fail.
- **`final-check`** (contradictions, duplicates, logical flow, logical grouping, Australian English,
  AI-writing patterns) on the copy, and **`ai-detector`** where human-authored content is required.
A missing/duplicate H1, a price mismatch, an invalid schema or authority-model breach, an unsourced
government claim (or missing Consolidated Sources), a cannibalising primary keyword, a banned CTA, or an
unresolved government fact is a publish hard-blocker. Checklist: `references/verification.md`.
Post-publish, close the loop: register the page's primary + secondary keywords (from Stage 2) in the
Neil Patel connector for rank tracking, per `references/seo/audit-workflow.md` Step 7.5 — the same demand layer
that fed Stage 2 then measures whether the page actually moves (e.g. the WA White Card term stranded
around position 12).

### 8 · Deploy to Cloudflare Workers
Static assets-only Worker: `npm run build` writes `dist/`, `wrangler.jsonc` serves it, `workers_dev:
true` gives the preview URL. `npx wrangler deploy`, or a git-connected build with build command
`npm run build`. Full steps, the `wrangler.jsonc`, the Node version pin, and the four common failures
(root directory, missing dist, no URLs enabled, corrupted node_modules in a synced folder):
`references/deploy-cloudflare.md`.

### 9 · File the per-run skill review
Before the run is done, one review file is written for it. This is how the pipeline measures whether
it is improving; it is not optional and not gated on the person asking.

**A fresh grader writes it, not you.** Spawn a subagent whose only inputs are the run's artefacts —
`pipeline/{slug}/` (source map, fact ledger, gap analysis, briefs, content), the built HTML in
`dist/{slug}/`, and the audit output. It must not receive your reasoning or your account of the run.
The agent that did the work knows what it meant to do, which is precisely the knowledge that inflates
a self-assessment. The grader scores what was produced. If subagents are unavailable in the current
surface, say so in the handoff and mark the review self-graded, so the bias is on the record rather
than hidden.

**Where.** `skill-reviews/YYYY-MM-DD-<skill>-<page-or-course>.md` in the repo, copied from
`skill-reviews/_TEMPLATE.md`. One file per gradeable run — re-grading updates it, never duplicates it.
**Keep the template's frontmatter block intact.** `scripts/review-trends.mjs` parses it, and a review
with hand-edited keys drops silently out of the trend report — the metrics stop being answerable
rather than becoming visibly wrong.

**Fill from the artefacts.** Every field comes from output this run actually produced. Do not
re-derive, estimate, or infer a score nobody measured.
- **Verdict** — Green / Amber / Red.
- **Five scores, in priority order** (a higher one beats a lower one):
  1. **Correct & safe** (non-negotiable) — every regulatory, fee and legislative fact verified
     against its official source with a current date; authority model right (ABE is **not** an RTO);
     no `kb/mistakes-log.md` entry recurred.
  2. **Passed its gates first time** — SEO/schema, readability, final-check, design register,
     Australian English, no "comprehensive".
  3. **Inside the effort budget** — turns to passed-audit and manual fix passes vs the budget.
  4. **Low rework / high autonomy** — didn't re-ask for anything already on disk; few unblocks.
  5. **Taught us something** — surfaced a reusable fact or a weakness in this skill.
- **Three trend metrics** — assistant turns to passed-audit; manual fix passes after the skill said
  "done"; gate-fails caught after handoff. Recording them is not the same as knowing whether the
  system is improving: **run `node scripts/review-trends.mjs` after filing the review** and read the
  direction. It also reports any run that was self-graded, any red on correct-and-safe, and any
  4- or 12-week outcome review that has come due.
- **What worked / what didn't.**
- **Output — every Amber or Red needs at least one:** a fix applied, a skill-change spec, or a
  `kb/mistakes-log.md` add/increment (increment "times seen"; never duplicate an entry).
- **The demand list** — what was painful: files too large to hold, context flooded by verbose output,
  steps that wanted isolation, checks that failed silently. This is the input to any future decision
  about splitting skills or adding subagents, so it is evidence, not opinion.

**Outcome target (deploy-bound builds).** Fill the outcome-target block so the post-live reviews have
a baseline: primary and secondary keywords, target ranking/traffic, deploy date, live URL, and the
**4-week** and **12-week** review dates (deploy + 28 and + 84 days). Blank the deploy date if it did
not ship, and say so.

**Verdict rule — correct-and-safe is a veto.** A **Red on "Correct & safe" fails the whole run**,
whatever scores 2 to 5 say. A fast, clean page carrying one wrong regulatory fact still fails.

## Guardrails (always — the ship-blockers)
Full detail in `kb/rules/authority-and-seo-rules.md`. In short:
- **Authority model per jurisdiction.** State-approved-direct (QLD/QBCC, TAS/CBOS): "Approved by
  [regulator]", Certificate of Completion, no RTO/accredited/Statement-of-Attainment, `recognizedBy`
  the regulator in schema. Knowledge-requirement (WA/Form 75): "supports your Form 75 owner-builder
  approval", no "WA-approved course/provider", no "permit"/"licence" for the owner-builder step, no
  `recognizedBy`. ASQA-accredited (White Card, NSW OB, asbestos/silica): name the RTO partner + number,
  "nationally recognised" is accurate, Statement of Attainment, ASQA disclosure. Never claim ABE is an RTO.
- **Every government fact sourced + dated**, re-verified on cadence (fees reset ~1 July). An unresolved
  government fact is a publish hard-blocker.
- **`[confirm: ...]` is for regulatory facts awaiting verification, and nothing else.** It is never an IOU
  for an internal fact — those are asked at Stage 1 (see the unknowns gate) and answered before content
  is written. A marker that reaches the built HTML is a publish hard-blocker, and the `abe-guardrails`
  build integration fails the build on one, so it cannot ship by accident. It has: the TAS page carried
  eight markers, including a live price rendered as "[price] — Indicative [confirm: LW]", until the
  build started refusing them. (The figure is deliberately not quoted here: this file is read before
  every run, and a price written into an anecdote gets picked up as though it were current.)
- **SEO / E-E-A-T:** one H1, question-led H2s, 40-60 word answer capsules, price visible and equal to
  `Course.offers.price`, two named Person profiles (developer + independent reviewer) with `sameAs`
  LinkedIn, image alt >= 80 chars. Sitemap + robots + OG/Twitter shipped by the template.
- **Voice:** Australian English; no em dashes in body copy; never "comprehensive".

## What the skill carries
- `references/archetypes/` — **read this first at Stage 3.** `_selector.md` (choose the archetype),
  `01`–`10` (one file per archetype: reader, decision order, required sections, forbidden
  carry-overs, schema, component defaults, a worked section brief, and finished worked copy), and
  `_static-pages.md` (contact and legal pages: build-only, never drafted).
- `references/content-craft.md` — **the Stage 4 method.** How a brief becomes prose: translate facts,
  spend the research, capsule as answer, name the objection, voice, and the cold-reread checks.
- `references/` — `content-pipeline.md` (stages 1-4 method), `component-selection.md` (content shape
  to component, and the wrong instinct to avoid), `component-library.md` (stage 5 props),
  `kb/rules/authority-and-seo-rules.md` (the ship-blockers), `deploy-cloudflare.md` (stage 8 deploy),
  `verification.md` (stage 7 pre-deploy checks), `image-prompts.md` (page visuals).
- **The Astro template is the repo, not this skill.** Work against the live project: four content
  collections (`courses` .mdx, `experts` .md, `hubs` .mdx, `partners` .md), `CourseLayout` and
  `HubLayout`, the `/styleguide` component library, and the `abe-guardrails` build integration. Read
  `content.config.ts` and `guardrails.ts` for the current shape rather than trusting any description
  of them, including this one. any description of the content model, this file included describes a superseded architecture and
  should not be relied on until it is rewritten.

## Where things live (repo-first)
This skill is **self-contained plus the repo's `kb/` library**. Nothing is drawn from another skill.

- **`kb/register/`** — verified regulatory facts on a cadence (fees, eligibility, legislation by
  state, penalties, delivery policy, regulator roles, TAS/CBOS). Stage 1 reads the index first,
  `kb/content-source-map.md`, and loads only the file a fact needs. Newly verified facts are written
  back here. **Single owner: this directory. Never keep a second copy of a figure.**
- **`kb/rules/`** — `authority-and-seo-rules.md` (the ship-blockers), `authority-model.md`,
  `asqa-disclosure-framework.md`. `guardrails.ts` enforces these at build time; the text lives here.
- **`kb/mistakes-log.md`** — repeat risks with "times seen". Read at pre-flight, written at Stage 9.
- **`references/seo/`** — the SEO method: page-type engine, course-page structure, meta, schema,
  keywords, crawl/index controls, quality gates, audit workflow, freshness check.
- **`references/archetypes/`** — Stage 3's page shapes. **`references/content-craft.md`** — Stage 4.
- **The site itself** — `src/`, `content.config.ts`, `guardrails.ts`. Read the code for the current
  shape rather than any description of it, this file included.

Still separate skills, unchanged: `abe-readability-audit`, `final-check`, `ai-detector` (Stage 7),
and the CBOS suite (a different regulator workflow with its own lifecycle).
