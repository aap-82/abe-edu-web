# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

First-time **owner builders** in Australia. They are homeowners about to take on the licensed
builder's role on their own home, not construction professionals. Owner builder course pages are
built for QLD, WA, TAS and ACT; **NSW owner builder is on hold** and must not be built (see
Capabilities and Constraints). Secondary audiences: tradespeople needing CPD, and workers needing a
White Card, which is built for all five states.

Their context matters more than their demographics. They arrive from a Google search
("owner builder course QLD") already uneasy about a regulatory step they do not fully understand,
usually **on a phone**, and they make a **single-session decision**. They scan; they do not read.
They are asking four questions in order:

1. Do I actually need this?
2. Will my regulator accept *this* course?
3. What will it really cost me, all in?
4. Can I start now and be done today?

**The job to be done:** *"Get me the training my state regulator requires, prove it will be accepted,
and let me get on with my build."*

**After purchase they become a second kind of user: an enrolled student** working through a
self-paced online course on LearnWorlds, wanting the certificate in hand so they can lodge their
regulator application. The same person, a different job, on a property this repo does not build.
See Operating Context.

## Product Purpose

ABE Education sells training that unlocks a **government permit**. The site's job is to convert an
anxious, under-informed searcher into an enrolment by removing doubt: state exactly what the
regulator requires, prove the course satisfies it, price it honestly (including the government fees
ABE Education never receives), and evidence every government claim with a dated, linked source.

**Success looks like:** the reader enrols without phoning anyone, and a compliance reviewer could
audit any factual claim on the page and find its source.

**The governing constraint:** this is YMYL-adjacent, regulated content. **ABE Education is not an
RTO.** Authority differs per jurisdiction (state-approved-direct, knowledge-requirement,
ASQA-accredited via a named RTO partner). Overclaiming here is not a marketing sin, it is a
regulatory one, and the build blocks it.

## Positioning

Four mechanisms, all confirmed 13 Aug 2026. They are ordered by how hard they are to copy, not by
how loudly they are said. None of them is ever stated as a boast; each one is shown.

1. **Regulator-granted approval, named precisely.** QBCC and CBOS have approved ABE Education
   directly. A competitor cannot assert this without going and obtaining its own approval. The proof
   that the claim is real is the precision of the language around it: "approved by" is not
   "accredited", a certificate is not a licence, and WA is a knowledge requirement rather than an
   approved course. Every QLD approval claim carries the QBCC course code. `kb/rules/authority-model.md`
   owns the per-jurisdiction wording.
2. **An auditable paper trail.** Every government fact on a page carries a dated, linked source, and
   every figure traces to a single row in `kb/register/`. A competitor can copy the visual format of
   a source line in an afternoon. What is not copyable is the standing discipline behind it: one
   register owns each figure, no figure enters it without a source read in that session, and an
   unresolved government fact blocks publication.
3. **Named, accountable experts.** Dominic Ogburn develops the ABE Education courses and Warwick
   Smith independently reviews them for compliance and currency. Both are real people with real
   photographs, LinkedIn profiles cited in schema, and a dated last-reviewed line on the pages they
   cover. Most of the category publishes anonymously. On ASQA-accredited courses the developer is
   the RTO partner, not ABE Education, and the site says so rather than borrowing the credit.
4. **Honest all-in pricing.** Pages show the government fees ABE Education never receives alongside
   its own, split explicitly into "pay us" and "paid separately", so the reader is not ambushed at
   the regulator's checkout. The competitive temptation is to quote only the course price; the
   position is that the reader's real question is what the whole thing costs.

## Operating Context

**The product spans two properties, and only one of them is this repo.** Scope confirmed
13 Aug 2026: PRODUCT.md describes the whole ABE Education product, so the enrolment and learning
experience is in scope for design thinking even though it is not built here.

| Property | What it is | Who builds it |
|---|---|---|
| `www.abeeducation.edu.au` | The marketing site. Static Astro, served from Cloudflare Workers. Every page a searcher lands on. | This repo |
| `learn.abeeducation.edu.au` | LearnWorlds. Checkout, the course player, assessment, certificates, and the student login in the site header. | LearnWorlds, configured outside this repo |

**The handoff is a URL.** Enrol CTAs deep-link to a LearnWorlds checkout of the form
`/payment?product_id=...&type=learning_program`. That single string is the whole interface between
the two properties, which makes it the most fragile point in the journey and the reason for the
`buyUrl` discipline in Product Principles.

**The reader's end-to-end workflow**, which the marketing site only owns the first two steps of:
search on a phone, decide in one sitting, pay ABE Education, complete the course online at their own
pace, receive a Certificate of Completion, then lodge that certificate with their state regulator and
pay the government fee separately. The certificate is a means; the permit is the end. The site is
judged on whether it made the whole chain feel possible, not just the part it renders.

**Business evidence lives outside the repo tree, deliberately.** Search Console exports and the
LearnWorlds page export sit in `business data/` (note the space in the path) and are gitignored,
because this repo is public and git history is permanent. Unzip to a scratchpad, never into the tree.

**The site is pre-cutover.** The rebuild is a full swap on one date, not a page-by-page migration.
Until then the build lives on a `*.workers.dev` preview host that must never be indexable, and the
page inventory and redirect map are the highest-risk artefacts in the project.

## Capabilities and Constraints

**The hard one: ABE Education is not an RTO, and never claims to be.** Three authority models apply
per jurisdiction and must not be blurred into each other: state-approved-direct, knowledge-requirement,
and ASQA-accredited via a named RTO partner. `kb/rules/authority-model.md` is the owner; `CLAUDE.md`
carries the short form. Getting this wrong is a regulatory failure, not a copy failure.

**Product line-up, as at 13 Aug 2026.** This changes; treat `ROADMAP.md` and
`node scripts/page-status.mjs` as the live answer and this list as the shape.

- **Owner builder:** QLD, WA, TAS, ACT built. **NSW is on hold and must not be built**, blocked twice
  over: the partnership is unsigned and the required units are not on the RTO's scope.
- **White Card:** all five states built, delivered through named RTO partners.
- **CPD:** TAS Building is live. TAS Electrical and TAS Plumbing are built but **not publishable**.
  NSW Building CPD and WA Real Estate CPD are in scope with points, price, authority model and RTO
  all TBC. NSW Real Estate CPD is retired and never rebuilt.
- **Adjacent:** owner builder insurance and project advisory are built. SA and VIC have no products.
  `/saaustralia` is the Solar Association Australia partner page, not South Australia.

**Explicitly undecided, and not to be invented:**

- **Several products have no working checkout.** White Card ACT, TAS, QLD and NSW, and both new TAS
  CPD bundles, lack a LearnWorlds product id. Their CTAs point at in-page anchors rather than a
  guessed payment URL, and the pages say so in their own source comments.
- **AlertForce course codes are unverified.** They must be confirmed on the RTO's scope in a browser
  before any page states one.
- **The TAS CPD register records eligibility, not membership.** It knows which courses may count
  toward a category, never which twelve are sold in a bundle, which is why one bundle currently
  renders a row count the copy contradicts.

**Standing product rules that constrain any future design work:**

- **Reviews are never marked up as `AggregateRating`.** The 4.8 from 52 reviews is an off-site Google
  Business Profile score. Display it and link to it; never put it in structured data anywhere.
- **Third-party scripts are a closed set:** GA4 and Google Ads, routed through Cloudflare Zaraz.
  Anything else is a measured decision, not a default.
- **Legal pages are placed, never drafted or reworded.**
- **Production deploys are human-triggered, always.**

## Brand Commitments

- **The company is "ABE Education", never bare "ABE", anywhere a reader can see it.** The single
  exception is the logotype in the site header, where "ABE" is the mark and "Education" sits beside
  it. Enforced at build.
- **Australian English throughout.** No em dashes in body copy. Never the word "comprehensive".
- **"owner builder" is open, with no hyphen, in all prose.** Search Console shows searchers use the
  open form by roughly 215 to 5. The hyphen survives only inside URL slugs and when quoting a
  regulator's exact document title.
- **Durations are spelled out in prose** ("five years"), and set as numerals only in data cells,
  sticky bars, CTAs and schema.
- **The footer carries the disclaimer** that ABE Education is not a Registered Training Organisation.
- **RTO partners are named with their numbers** wherever their courses are sold: Blue Dog Training
  RTO 31193, AlertForce RTO 91826.
- **Expert bylines carry a LinkedIn `sameAs` and a dated last-reviewed line.**

## Brand Personality

**Authoritative. Evidenced. Unhurried.**

The voice is a quality Australian broadsheet, not a sales page. Australian English, short declarative
sentences, no hype, no manufactured urgency. It answers the question first and then shows its
working. House style: no em dashes, never the word "comprehensive".

**Emotional goal: relief, then confidence.** "I finally understand what's required, and I trust these
people to get me through it." The reader should feel briefed, not sold to.

## Anti-references

- **SaaS marketing gloss.** Gradient hero blocks, glassy cards, soft drop shadows, rounded pastel
  everything, decorative metric tiles, countdown urgency. The course-marketplace look.
  **What this does not mean.** The hero's `proof` row is not a metric tile: it is three plain
  figures with mono labels, no card, no shadow, no accent fill, and every figure is one a buyer
  needs before deciding. Numbers in the hero are correct and expected. What is banned is the
  *tile treatment* and figures chosen for impact rather than use.
- **Cold govtech**, the opposite trap. Dense grey compliance pages, form-first layouts, no warmth,
  nothing a human would choose to read.
- **Ed-tech friendliness.** Blob illustrations, mascots, exclamation marks, "Let's get started!"
- **Stock-photo cliché.** Hard hats pointing at clipboards, handshakes, smiling models at laptops.
  The ban is on the *cliché*, not on the production method: the QLD and WA hero artefacts are
  commissioned images produced to a written brief, and every page carries an image slot that falls
  back to a labelled placeholder rather than shipping something generic.
  **Expert headshots are the hard exception: real photographs of real people, never generated.**
  A page with no image is a gap to fill, not restraint. If the artefact does not exist yet, leave
  the placeholder visible so it reads as unfinished rather than as a design choice.
- Anything that reads as an **advertisement** rather than a **document**.

## Evidence on Hand

**Real, and usable:**

- **`kb/register/`** is the single owner of every verified regulatory figure, currently 17 records
  covering fees, eligibility, penalties, legislation by state, regulator roles, online-delivery
  policy, card lodgement, PPE, competitor pricing and the TAS CPD course set. No second copy of any
  of these figures may exist anywhere in the repo.
- **Search Console, 16 months:** 4,642 clicks and 379k impressions across 298 URLs. Owner builder
  carries roughly two-thirds of all clicks. White Card WA is the largest impression pool at 36.7k
  with weak position. Exports live in `business data/GSC/`. The site-wide export does **not** cross
  queries with pages, so it cannot answer per-URL query coverage on its own; that needs a per-page
  export requested up front.
- **LearnWorlds page export**, 16 Jul 2026: 321 pages, of which 44 are public marketing pages. This
  is what the redirect map is built from.
- **Google Business Profile: 4.8 from 52 reviews**, confirmed 16 Jul 2026. Off-site, displayed and
  linked, never marked up.
- **Two expert profiles** with real photographs and LinkedIn, and **three partner records**
  (AlertForce, Blue Dog Training, Upskill Institute).
- **44 components**, every one rendered live at `/styleguide` with the real tokens. It is the
  vocabulary, and because it renders the real thing it cannot drift.
- **Commissioned hero imagery** on some pages, produced to written briefs.

**Absences that future work must not fabricate:**

- **No on-site reviews, testimonials, student quotes or case studies exist.** Collecting native
  reviews post-launch is the only honest path to an on-site rating, and until then there is nothing
  to quote. Do not write one.
- **No AlertForce course codes are confirmed.** Do not state one.
- **No checkout exists for several products.** Do not link to a payment URL that has not been given.
- **Roughly 10 pages and 23 image slots have no artefact yet.** The labelled placeholder is the
  correct output, not a stock photograph.
- **No benchmark, enrolment count, pass rate or completion statistic is on hand** beyond what is in
  the register. An invented proof number is the same failure as an invented fee.

## Product Principles

Five durable strategic commitments. They decide what the product does; the Design Principles below
decide how a page expresses them.

1. **Precision is the product.** The reader is buying certainty that a regulator will accept
   something. Every gain from rounding a claim up is smaller than the loss when it turns out to be
   wrong, so authority language is exact, per-jurisdiction, and never flattered.
2. **Show the evidence, or say there is none.** A dated, linked source beside a fact, or a visible
   gap. Never a plausible figure. An unverified government fact blocks publication rather than
   shipping with a hedge, because a confident wrong number costs more than a missing one.
3. **Price the whole truth.** Quote what the reader will actually spend, including the money that
   goes to the regulator rather than to ABE Education. Being the site that told them about the fee
   is worth more than being the site with the lowest headline number.
4. **Answer before selling.** The reader typed a question. Answer that question, in their words,
   before asking for anything. A page that sells before it explains is competing on persuasion, which
   is the one axis where an anonymous competitor can match it.
5. **Never hand off to a path that does not exist.** The journey crosses into LearnWorlds on a single
   URL. Where that checkout is not configured, the page says so and points somewhere real, rather
   than guessing an id and sending a paying customer to a 404. A broken purchase path undoes every
   other principle on this list.

## Design Principles

1. **Show the paper trail.** Every government fact carries a dated, linked source *on the page*.
   Trust is earned by exposing the evidence, not by asserting authority.
2. **Answer first, sell second.** Every section opens with a direct 40 to 60 word answer to the
   question the reader actually typed. **Inside a section**, the CTA waits until the answer has
   landed: no CTA in an answer capsule, none in the FAQ block.
   **This is about section order, not about the hero.** The hero carries a priced CTA, and should,
   because a reader who already knows what they want must not have to hunt for the buy path. The
   shipped course heroes have done this since Wave 0 ("Get your certificate — $179"). A page whose
   only purchase path is below the fold is a defect, not restraint.
3. **Say exactly what the regulator says.** Authority language is per-jurisdiction and never rounded
   up. "Approved" is not "accredited"; a certificate is not a licence. Precision *is* the product.
4. **Price the whole truth.** Show the government fees ABE never receives alongside its own, so the
   reader is never ambushed at the regulator's checkout.
5. **Restraint signals competence.** One accent, no shadows, no urgency theatre. The page should feel
   sub-edited, not art-directed.

## Accessibility & Inclusion

- **Target: WCAG 2.1 AA.**
- **Mobile-first by necessity.** Readers are phone-heavy and decide in one sitting. Decision-critical
  content (eligibility, cost, requirements) stays fully visible and is never hidden behind an
  accordion. Accordions are for FAQs **and the module-group syllabus**.
  **The syllabus exception, added 31 Jul 2026 (Andrey).** `ModuleRows` is a disclosure list: the first
  group open, the rest on click. The rule previously read "what the course actually is" into the
  protected set and so covered the syllabus too. Two things changed the call. The section is long
  enough that hiding it earns real page: on `/act-owner-builder-course`, twelve groups, it is **39%
  shorter** at 390px (1869px to 1141px, measured). And a syllabus is browsing material rather than a
  decision input, unlike a fee or an eligibility threshold, which the reader must see to act. The
  answer capsule above it still states the scope in prose with nothing collapsed, so the section's
  question is answered before any disclosure is touched.
  **What the exception does not cover.** Eligibility, cost, requirements, the authority model and
  anything a reader needs in order to decide stay fully visible, on every page. This is one component
  on one section, not a licence to collapse.
  Collapsed content stays in the DOM and in `dist/`, so it remains crawlable and findable in-page.
- **Alt text is a build gate.** Content images carry descriptive alt of at least 80 characters in
  Australian English; decorative images take `alt=""`. Enforced by the `abe-guardrails` integration.
- **Plain language.** Reading level around Grade 6 to 8; body measure capped at roughly 65 to 75ch;
  paragraphs under 75 words; sentences under 20.
- **Reduced motion respected.** The only motion of consequence (the fly-in arrow on links) disables
  under `prefers-reduced-motion`.
- **Colour never carries meaning alone.** The verify-blue date and green tick are always accompanied
  by the word VERIFIED and a date, so the signal survives colour blindness and greyscale.
