# Component selection — pick the right shape, avoid the wrong instinct

`component-library.md` says **how** to use each component (its props); this says **when** to pick it
and **what not to do**. Use it in Stage 4 (splitting prose into shapes) and Stage 5 (component
handover). It is content/component logic only — no colour or type tokens; those live in the design
register. The rule underneath all of it: **match the component to what the content is doing**, and
don't flatten every section into the same card. That contrast is what reads as editorial, not SaaS.

## Content type → component → what to avoid

| The content is doing this | Use | Avoid (the wrong instinct) |
|---|---|---|
| Stating the outcome (hero) | `Hero` — outcome H1, one support line, facts strip, one CTA | A slideshow, a floating device mockup, or a logo wall |
| Giving the at-a-glance facts | `FactGrid` — one featured number + a quiet key/value table | Dressing it as a second hero with gradient and icons |
| Answering "what is this / who needs it" | `AnswerCapsule` then `Prose` — answer first, then explanation | Burying the answer under two paragraphs of throat-clearing |
| Arguing "why choose us" | Airy claim stack **or** a flat `TopicGrid`/card row — use the grid only for genuinely parallel, equal-weight claims | Raised/shadowed SaaS cards, an icon on every card, equal-weight cards where the claims aren't equal |
| Listing the syllabus | `ModuleGroups` — dense, numbered, one line each, scanned not read | Expanding each module into its own padded card with a heading |
| Showing an ordered process | `Stepper`/`ProcessTrack` — numbered timeline ending in the outcome | Numbering things that aren't actually sequential |
| Listing eligibility/criteria | `BulletList` — tight parallel set, quiet marker | Dressing each criterion as a tick-badge |
| Comparing values (pricing, fees) | `PriceTable`/`ComparisonTable` — split "what you pay us" from "paid separately" | Three pricing cards with a "most popular" middle or a per-month figure |
| Offering a genuine cross-sell | `BundleOffer` — one honest line, one inline link, name the separate delivery | A pricing-card upsell or a pre-ticked add-on |
| Handling worries (FAQ) | `FAQAccordion` — scent-carrying question labels, most-reassuring one open | Hiding the core legitimacy claim only inside a closed accordion |
| Confronting one pointed doubt | An open `Callout`/`Note` block — name the doubt, answer with the authority model | An alarm-styled box; keep it calm and factual |
| Showing who made/checked it | `ExpertCard`/`Credentials` — restrained bios, role + creds | Quotation-mark testimonial cards or a carousel |
| Stating the legitimacy claim | `TrustBand` — the verified word + a link to the official source | A badge wall or "trusted by thousands" |
| A compact proof line | `TrustStats` — ≤3 items (rating, since 2007, student count) | A logo wall, a row of shield icons, or a padded card |
| Real reviews + rating | Native quoted reviews + an honest `AggregateRating` that matches schema exactly | A rotating carousel, five-star clip art, or any invented/mismatched rating |
| Repeating or closing the action | `CTABand` — lead line, one support line, the same primary CTA | A second, different primary action here |
| The sources footer | `SourcesFooter` — descriptive links, regulator contact, "last verified" date | Naked URLs, "click here", or a source you didn't verify |

## Choosing the element by the reader's job

When the treatment isn't obvious, pick by what the reader is trying to do in that moment (maps to
NN/g, GOV.UK, NHS guidance):

| Reader's job in the moment | Best element | Avoid |
|---|---|---|
| Grasp one must-not-miss fact | A `Callout`, typed by severity, one per section | Stacking callouts; a callout for general info |
| Take in several equal, unordered points | A `BulletList` with a lead-in line | Numbering them |
| Follow a process in order | A `Stepper` (or numbered list) | Bulleting steps; a diagram for a linear flow |
| Compare values across items | A table, few columns on mobile | Cards |
| Browse or choose between entry points | Cards | Cards for a comparison |
| Dip into a few of many short, non-critical sections | An accordion (4+ sections) | Hiding eligibility, cost, or requirements |
| Understand branching / decision logic | A diagram paired with text | A diagram for simple linear steps |

## Element rules that follow

- **Callouts: one per section, matched to severity.** Emphasis is a budget — stacking callouts
  dilutes them all. Ladder: **Warning** for a serious/legal consequence or a disqualifier (ineligibility,
  fines, deadlines); **Info/Note** for a helpful condition or clarification; **Tip** for an optional
  pointer; **Legal** for a regulatory caveat (fees may change). A second boxed point in one section is
  almost always body text or a bullet instead.
- **Lists: lead-in, parallel, capped.** Introduce every list with a stem line ending in a colon; keep
  items parallel and roughly equal length; cap around seven. Bullets for unordered sets; numbers only
  for a true sequence. Never number choices/options — readers assume a numbered list must be completed
  in full.
- **Tables vs cards.** Tables for comparing or looking up values (few columns on mobile, no horizontal
  scroll); cards for browsing heterogeneous entry points. Never put a comparison in cards — the eye has
  to reorient for each item, which makes comparison slow.
- **Accordions vs disclosure.** Accordions only for four or more short, non-essential sections the
  reader dips into (the FAQ). Never hide decision-critical content (eligibility, cost, requirements,
  what you can build) in an accordion. For a single optional block, use a lighter details disclosure.
- **Diagrams.** Prefer a `Stepper` for a linear process; reserve a diagram for genuinely branching or
  decision logic, always paired with a text equivalent, never decorative. The linear owner-builder
  journey is a stepper, not a diagram.

## Recurring micro-patterns (style once, reuse)

- **Answer capsule:** `AnswerCapsule`, answer first, offset by a hairline.
- **Verified line:** `VerifiedSources` — the date and the named source, one verification tick.
- **Warning vs Info/Note:** the amber warning is for a real consequence; the Info/Note is a cool,
  un-alarmed aside for a useful clarification (e.g. that applying for the permit is a separate step).
  Keep them distinct — don't use a warning for general information.
- **Legal fine print:** the smallest footnote register, muted.
- **Cross-reference / MicroCTA:** one inline link, a single action, never a second CTA competing with
  the section's primary.
