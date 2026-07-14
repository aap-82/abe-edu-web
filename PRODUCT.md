# Product

## Register

brand

## Users

First-time **owner-builders** in Australia (QLD, WA and TAS live; NSW and ACT rolling out). They are
homeowners about to take on the licensed builder's role on their own home, not construction
professionals. Secondary audiences: tradespeople needing CPD, and workers needing a White Card.

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

## Product Purpose

ABE Education sells training that unlocks a **government permit**. The site's job is to convert an
anxious, under-informed searcher into an enrolment by removing doubt: state exactly what the
regulator requires, prove the course satisfies it, price it honestly (including the government fees
ABE never receives), and evidence every government claim with a dated, linked source.

**Success looks like:** the reader enrols without phoning anyone, and a compliance reviewer could
audit any factual claim on the page and find its source.

**The governing constraint:** this is YMYL-adjacent, regulated content. **ABE Education is not an
RTO.** Authority differs per jurisdiction (state-approved-direct, knowledge-requirement,
ASQA-accredited via a named RTO partner). Overclaiming here is not a marketing sin, it is a
regulatory one, and the build blocks it.

## Brand Personality

**Authoritative. Evidenced. Unhurried.**

The voice is a quality Australian broadsheet, not a sales page. Australian English, short declarative
sentences, no hype, no manufactured urgency. It answers the question first and then shows its
working. House style: no em dashes, never the word "comprehensive".

**Emotional goal: relief, then confidence.** "I finally understand what's required, and I trust these
people to get me through it." The reader should feel briefed, not sold to.

## Anti-references

- **SaaS marketing gloss.** Gradient hero blocks, glassy cards, soft drop shadows, rounded pastel
  everything, hero-metric stat rows, countdown urgency. The course-marketplace look.
- **Cold govtech**, the opposite trap. Dense grey compliance pages, form-first layouts, no warmth,
  nothing a human would choose to read.
- **Ed-tech friendliness.** Blob illustrations, mascots, exclamation marks, "Let's get started!"
- **Stock-photo cliché and AI imagery.** Hard hats pointing at clipboards. Expert headshots are real
  photographs of real people, never generated.
- Anything that reads as an **advertisement** rather than a **document**.

## Design Principles

1. **Show the paper trail.** Every government fact carries a dated, linked source *on the page*.
   Trust is earned by exposing the evidence, not by asserting authority.
2. **Answer first, sell second.** Every section opens with a direct 40 to 60 word answer to the
   question the reader actually typed. The CTA waits until they believe you.
3. **Say exactly what the regulator says.** Authority language is per-jurisdiction and never rounded
   up. "Approved" is not "accredited"; a certificate is not a licence. Precision *is* the product.
4. **Price the whole truth.** Show the government fees ABE never receives alongside its own, so the
   reader is never ambushed at the regulator's checkout.
5. **Restraint signals competence.** One accent, no shadows, no urgency theatre. The page should feel
   sub-edited, not art-directed.

## Accessibility & Inclusion

- **Target: WCAG 2.1 AA.**
- **Mobile-first by necessity.** Readers are phone-heavy and decide in one sitting. Decision-critical
  content (eligibility, cost, requirements, what the course actually is) stays fully visible and is
  never hidden behind an accordion. Accordions are for FAQs only.
- **Alt text is a build gate.** Content images carry descriptive alt of at least 80 characters in
  Australian English; decorative images take `alt=""`. Enforced by the `abe-guardrails` integration.
- **Plain language.** Reading level around Grade 6 to 8; body measure capped at roughly 65 to 75ch;
  paragraphs under 75 words; sentences under 20.
- **Reduced motion respected.** The only motion of consequence (the fly-in arrow on links) disables
  under `prefers-reduced-motion`.
- **Colour never carries meaning alone.** The verify-blue date and green tick are always accompanied
  by the word VERIFIED and a date, so the signal survives colour blindness and greyscale.
