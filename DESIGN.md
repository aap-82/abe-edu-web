---
name: ABE Education, Course Pages
description: Static Astro marketing site for Australian owner-builder and trades courses; editorial, sourced, print-like.
colors:
  maroon: "#800000"
  maroon-dark: "#5a0000"
  verify-blue: "#2f5d8c"
  ok-green: "#2e7d5b"
  gold: "#d4a843"
  ink: "#1a1a1a"
  ink-2: "#2a2a2a"
  ink-3: "#4a4a4a"
  slate: "#6e6e6e"
  slate-light: "#9a9a9a"
  paper: "#ffffff"
  paper-alt: "#fafafa"
  paper-warm: "#f7f4ef"
  paper-chrome: "#ffffff"
  rule: "#e5e7eb"
  rule-strong: "#d4d6da"
typography:
  display:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(40px, 6.2vw, 72px)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(30px, 3.6vw, 42px)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "DM Sans, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "DM Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.18em"
rounded:
  sm: "5px"
  md: "6px"
  lg: "8px"
spacing:
  "3xs": "4px"
  "2xs": "8px"
  xs: "12px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  "2xl": "72px"
  "3xl": "112px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "14px 26px"
  button-primary-hover:
    backgroundColor: "{colors.maroon}"
    textColor: "{colors.paper}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "13px 24px"
  eyebrow:
    textColor: "{colors.slate}"
    typography: "{typography.label}"
  card-glance:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "32px"
  card-topic:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "32px"
  price-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
  bundle-offer:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "40px"
  trust-band:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  faq:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
---

# Design System: ABE Education, Course Pages

## 1. Overview

**Creative North Star: "The Regulator's Broadsheet"**

This is a quality Australian broadsheet rebuilt for the web: authoritative, editorial, and evidence-led. Every claim reads like it was sub-edited and fact-checked, because it was. The system carries its trust in the open, with monospace captions, dated source lines, and named expert bylines, the way a serious newspaper carries a masthead and a corrections column. It never shouts. It earns belief through restraint, precision, and the visible paper trail behind each government fact.

Structurally it is flat and print-like. Depth comes from hairline rules and tonal paper grounds, not from shadows or gloss. One deep maroon does all the accent work and is spent sparingly, so it always means something. A separate steel blue is reserved for one job only, marking a fact as sourced and verified. Type is a three-voice pairing: Archivo for headlines and figures, DM Sans for reading, and DM Mono in wide-tracked uppercase for every label, key, and caption, the small print that signals a document you can trust.

It explicitly rejects the SaaS-marketing look: no soft drop shadows, no gradient hero blocks, no glassy cards, no rounded pastel everything. It also rejects the opposite trap of cold govtech. The warm paper ground and generous air keep it human and readable, an authority you would actually want to read.

**The system is enforced, not merely documented.** Thirty components live in `src/components`, every one of them rendered live at `/styleguide` with the real tokens. The `abe-guardrails` build integration fails the build on an inline style or a structural class in a page body, because both mean the same thing: a component is missing. Read the styleguide before choosing a component. It is the vocabulary.

**Key Characteristics:**
- Flat by default: 1px hairline rules and tonal grounds carry structure, never shadow.
- One maroon accent, spent at 10% or less, so it always signifies.
- A dedicated verify-blue that appears only on sourced, dated facts.
- Monospace uppercase for all micro-type: eyebrows, keys, captions, source lines.
- Generous vertical rhythm (up to 112px section padding) and tabular figures on every number.

## 2. Colors

A warm, near-monochrome paper system with one authoritative maroon and a small set of functional signal colours. Neutrals do most of the work; accents are rationed.

### Primary
- **Regulator Maroon** (`#800000`): the sole brand accent. It marks the eyebrow dash, hero tick glyphs, active nav underlines, link and button hover states, section keys, and the small brand tile. Deployed on 10% or less of any screen. Its scarcity is the point.
- **Maroon Dark** (`#5a0000`): pressed and hover-on-dark states of the maroon only. Never a fill.

### Secondary (functional signals, never decorative)
- **Verify Blue** (`#2f5d8c`): a trust colour. It appears only on the verified-source line's date and its citation links on hover. If something is blue, it has been sourced and dated.
- **Verified Green** (`#2e7d5b`): the tick glyph in the verified-source line, and nothing else. It is the single "this checks out" mark in the system.

### Tertiary
- **Attestation Gold** (`#d4a843`): the on-dark accent. Used only inside ink-grounded sections (trust band, dark capsule border, dark wayfinder link) where maroon would go muddy.

### Neutral
- **Ink** (`#1a1a1a`): primary text and the dark section / footer ground. Stands in for black; true black is never used.
- **Ink 2 / Ink 3** (`#2a2a2a` / `#4a4a4a`): emphasis text and standard body text on paper.
- **Slate / Slate Light** (`#6e6e6e` / `#9a9a9a`): captions, meta, muted keys, and the VERIFIED label itself.
- **Paper / Paper Alt / Paper Warm** (`#ffffff` / `#fafafa` / `#f7f4ef`): the three-step ground ramp used to separate sections tonally instead of with borders or shadows.
- **Paper Chrome** (`= paper`): the ground shared by the site header, breadcrumb bar and wayfinder nav, so the page chrome reads as one continuous surface.
- **Rule / Rule Strong** (`#e5e7eb` / `#d4d6da`): the hairline dividers and card borders that carry all structure.

### Named Rules
**The One Maroon Rule.** Maroon is the only brand accent and never covers more than roughly 10% of a screen. It is for marks, ticks, hovers, and active states, never for large fills or section backgrounds. Dark sections use Ink as the ground and Gold as the accent.

**The Signal-Colour Rule.** Verify Blue and Verified Green are reserved exclusively for sourced-and-dated facts. They are forbidden as decorative or interface colours. Blue and green on this site are a promise that a claim is backed. Neither ever carries meaning alone: they always sit beside the word VERIFIED and a date, so the signal survives greyscale and colour blindness.

## 3. Typography

**Display Font:** Archivo (with -apple-system, BlinkMacSystemFont, sans-serif)
**Body Font:** DM Sans (with -apple-system, BlinkMacSystemFont, sans-serif)
**Label / Mono Font:** DM Mono (with ui-monospace, monospace)

**Character:** A three-voice newsroom pairing. Archivo is the confident headline and figure face, set tight with negative tracking. DM Sans is the calm, legible reading voice. DM Mono, always uppercase and widely tracked, is the "small print" voice that signals captions, keys, and verified facts, the typographic tell of a trustworthy document.

### Hierarchy
- **Display** (Archivo 600, `clamp(40px, 6.2vw, 72px)`, line-height 1.02, tracking -0.03em): the single hero H1 per page.
- **Headline** (Archivo 600, `clamp(30px, 3.6vw, 42px)`, line-height 1.08, tracking -0.025em): section H2s, question-led.
- **Title** (Archivo 600, 22px, tracking -0.01em): card and sub-section H3s; FAQ and price figures share this weight.
- **Body** (DM Sans 400, 17px, line-height 1.65): reading copy. The lede steps up to 19px / line-height 1.55. Long-form answer copy is capped around 66 to 80ch.
- **Label** (DM Mono 500, 11px, tracking 0.18em, uppercase): eyebrows, stat keys, step keys, meta, and source lines. The wider the tracking, the smaller the type.

### Named Rules
**The Mono Label Rule.** Every piece of micro-type, eyebrows, keys, captions, meta, verified lines, is DM Mono in uppercase with 0.08em to 0.18em tracking. Archivo and DM Sans are never used for labels; DM Mono is never used for reading copy.

**The Tabular Figure Rule.** Every price, statistic, and figure carries `font-variant-numeric: tabular-nums` (the `.num` class) so columns and repeated numbers align and never jitter.

## 4. Elevation

The system is flat. There is no shadow vocabulary at all. Depth is built three ways: 1px hairline rules (`--rule` / `--rule-strong`), a tonal ground ramp (`paper` to `paper-alt` to `paper-warm` to `ink`), and a single interaction lift. Interactive cards raise 2px on hover (`transform: translateY(-2px)`) with their border darkening to ink, which is the only elevation cue in the system. The one blur in the build is functional, not decorative: the sticky header and CTA strip use `backdrop-filter: saturate(140%) blur(8px)` purely so text stays legible over scrolling content beneath them.

### Named Rules
**The Hairline Rule.** Structure is carried by 1px rules and tonal grounds, never by drop shadows. A box-shadow on any surface reads as a foreign object and is prohibited. If a block needs to separate from its neighbour, change the ground tone or add a hairline, do not lift it with shadow.

## 5. Components

Thirty components, all rendered live at `/styleguide` with the real tokens. They are flat, bordered, and quietly rectangular (5 to 8px radii). Cards earn their borders; they are never stacked or nested.

**Component discipline (build-enforced).** If a page body needs structural markup, **a component is missing**. Compose from what exists first; if the shape repeats, promote it to a component; if it is genuinely new, build it properly (component + styleguide specimen + tokens, no magic numbers). An inline `style=` or a structural class in an MDX body fails the build, and the error names the component that should own the markup. A one-off inline in one page becomes the next state page's copy-paste, which is how the trust-stat row ended up hand-written twelve times before it became `TrustStats`.

### Buttons
- **Shape:** gently squared (6px radius).
- **Primary:** Ink ground (`#1a1a1a`), paper text, 14px/26px padding, DM Sans 600 at 16px. Hover fills Regulator Maroon.
- **Secondary:** transparent with a 1px `rule-strong` border and ink text; hover darkens the border to ink.
- **Link:** ink text with a trailing `ArrowRight`; hover turns maroon and the arrow flies out right and re-enters from the left, clipped to an 18px window (`arr-fly`). Disabled under `prefers-reduced-motion`.

### Sections and layout
- **`Section` / `ZSection`:** the two section shells. Both take the `marker` prop, which is the **single** marker mechanism (`01`, `02`, ...). `ZSection` is the image-split variant and owns the shell, marker, eyebrow, H2 and forward wayfinder.
- **`ZSplit`:** the image-and-body split. The two columns are **top-aligned**, so the image top always lines up with the eyebrow regardless of how tall the text column is.

### Eyebrow (signature)
The section-opening label: DM Mono uppercase, 11px, 0.18em tracking, slate, preceded by an 18px maroon hairline dash and the section marker. It opens nearly every section and is the clearest single tell of the register.

### Verified Source Line (signature)
The trust device, and the most literal expression of the North Star. A two-column mono ledger, top-aligned:

- **Left column:** the word `VERIFIED` in slate uppercase, preceded by a small **green tick**; the verification **date** sits beneath it in verify-blue.
- **Right column:** what was checked, then the linked authorities, reading as *"[fact] fact-checked against the current Act against [Source], [Source]"*.

Every government fact block ends in one, and they feed the page-foot Sources list.

### Trust band
`TrustBand` + `TrustStats`: the ink-grounded band carrying the proof numbers. Gold is the accent here; maroon is never used on ink.

### Cards and containers
- **Corner Style:** 6px for content cards (glance, topic, note), 8px for structural containers (price card, bundle offer, FAQ, TOC).
- **Background:** Paper; alternating sections sit on Paper Alt or Paper Warm.
- **Shadow Strategy:** none. See Elevation, the Hairline Rule.
- **Border:** 1px `--rule` on all four sides. Interactive cards (topic) darken the border to ink and lift 2px on hover.
- **Internal Padding:** 32px (`--s-lg`) for stat and topic cards.

### Price Card and Bundle Offer
`PriceCard` is an 8px bordered table; rows split by 1px rules, figures in Archivo with tabular numerals, and the total row inverts to an ink ground. `BundleOffer` is the cross-sell: a flat paper panel on the warm ground with a mono receipt-style tally and one primary CTA. It sells completeness, never a discount; the total is the exact sum of its parts.

### Insurance partner
`InsurancePartner`: the insurance cross-sell (a split, a secondary CTA and a note). It exists because the same markup had been copy-pasted across all three state pages.

### Placeholder (signature dev affordance)
The FPO image block: a warm paper gradient with a dashed inset border, a mono label and an Archivo description. Aspect is locked by `.r54` (5:4) or `.r45` (4:5). Omit the image `src` and this stays in place; drop a real image in and it swaps to an `<img>`.

### FAQ
A single 8px bordered container of `<details>` rows split by 1px rules. The summary is Archivo 600 18px; a maroon plus-mark rotates 45 degrees to a cross when open. Accordions are for FAQs only: decision-critical content is never hidden inside one.

### Navigation
Sticky site header (blurred paper, click-open megamenus) with the maroon brand tile; `PageBar` for breadcrumbs and the dated reviewer line; `WayfinderNav`, a sub-nav of mono uppercase jump-links whose active item carries a maroon underline; `SectionWayfinder`, the end-of-section forward-scent link (a mono NEXT kicker above the next section's title and the fly arrow); and, on mobile, a fixed bottom CTA strip that slides up into view.

## 6. Do's and Don'ts

### Do:
- **Do** build depth from 1px hairline rules (`--rule` `#e5e7eb`, `--rule-strong` `#d4d6da`) and the tonal ground ramp (`#ffffff` to `#fafafa` to `#f7f4ef` to `#1a1a1a`).
- **Do** set every label, key, caption, and source line in DM Mono uppercase, tracked 0.08em to 0.18em.
- **Do** keep Regulator Maroon (`#800000`) to 10% or less: eyebrow dash, ticks, hovers, active underlines, brand tile. Never a large fill.
- **Do** reserve Verify Blue (`#2f5d8c`) and Verified Green (`#2e7d5b`) strictly for sourced, dated facts, and always pair them with the word VERIFIED and a date.
- **Do** put `tabular-nums` on every price and statistic (the `.num` class).
- **Do** give sections room: up to 112px (`--s-3xl`) vertical padding, easing to 64px on mobile.
- **Do** use Ink (`#1a1a1a`) for text and dark grounds; on ink sections, switch the accent to Attestation Gold (`#d4a843`).
- **Do** read `/styleguide` before choosing a component. It renders the real thing, so it cannot drift.
- **Do** top-align the columns of any split. The image top lines up with the eyebrow, always.

### Don't:
- **Don't** use box-shadows for elevation anywhere. The system is flat; a drop shadow reads as a 2014 app and is prohibited.
- **Don't** hand-roll structural markup in a page body. An inline `style=` or a structural class means **a component is missing**, and the build will stop you. Compose, promote, or build it properly.
- **Don't** use the maroon left-stripe answer capsule (`border-left: 3px solid var(--maroon)`). A coloured side-stripe over 1px is a banned anti-pattern; rework it as a full 1px border, a background tint alone, or a leading mono marker.
- **Don't** set eyebrows or labels in Archivo or DM Sans. Micro-type is DM Mono only; DM Mono is never used for reading copy.
- **Don't** spend maroon on large surfaces or section backgrounds. Dark sections are Ink-grounded with Gold accents.
- **Don't** introduce pure `#000` or `#fff` for text or borders; use the Ink and Rule tokens.
- **Don't** use em dashes, or the word "comprehensive", in any copy (house style).
- **Don't** nest cards or stack borders. If a card needs internal grouping, use rules and spacing, not a second card.
- **Don't** hide eligibility, cost or requirements inside an accordion. Accordions are for FAQs only.

## 7. Content design and element selection

Sections 1 to 6 are the visual system (tokens, type, colour, components). This section sits above them: which treatment a section gets, and which element serves the reader's job. It is reconciled from `outputs/md/abe-page-design-rules.md`, the fuller content-design reference. Where that source doc conflicts with this build, this file wins (see Reconciliation at the end). The authority model and copy rules live in `CLAUDE.md`.

### Match the treatment to the content

Do not flatten every section into one repeated block. Match the grammar to what the content is doing, and build each from the real components in Section 5.

| Content type | Treatment | Live component(s) |
|---|---|---|
| Statement (hero) | Outcome H2, facts strip, one CTA, an artefact image | `Hero` |
| At-a-glance | One featured figure (Archivo `--font-display`) beside a quiet key/value table | `FactGrid` |
| Definition / orientation | Question H2, answer first, then body, then a verified line | `Section` + `AnswerCapsule` + `VerifiedSources` |
| Argument / persuasion | Airy typographic claims, or a flat parallel card grid (no shadow, no icon-blurb) | `TopicGrid` |
| Reference / syllabus | Dense, mono-numbered rows, scanned not read | `TopicGrid` |
| Sequence | Numbered timeline ending in the outcome | `Stepper` (hero inline flow: `ProcessTrack`) |
| Eligibility / criteria | Tight parallel checklist, no badges | list markup; `CanCant` for a can/cannot split |
| Tabular (pricing, fees) | Quiet editorial table; split "pay us" from "paid separately" | `PriceCard` |
| CPD industry by state | Accessible matrix, scrolls on mobile | `CpdMatrix` |
| Add-on / bundle | Honest cross-sell, explicit about separate delivery | `BundleOffer` / `InsurancePartner` / `PartnerDisclosure` |
| FAQ | Accordion, first item open, scent-carrying labels | `Faq` |
| Credentials | Restrained bios, grayscale headshots, not testimonials | `Credentials` |
| Trust band | Legitimacy statement, ink ground, gold accent | `TrustBand` / `TrustStats` |
| CTA band | One repeated action, lead line plus CTA | `CtaBand` |
| References | Descriptive source links with dated verified lines | `SourcesFooter` |
| Callout | One per section: `caution` (2px maroon top rule plus mono kicker) for legal or warning, `note` for neutral info | `Note` |

### Choose the element by the reader's job

When the treatment is not obvious, pick by what the reader is trying to do in the moment.

| Reader's job | Element | Avoid |
|---|---|---|
| Grasp one must-not-miss fact | A callout, typed by severity, one per section | Stacking callouts |
| Take in several equal points | A bulleted list with a lead-in line | Numbering them |
| Follow a process in order | A stepper | Bulleting steps; a diagram for a linear flow |
| Compare values across items | A table, few columns on mobile | Cards |
| Browse between entry points | Cards | Cards for comparison |
| Dip into a few of many short sections | An accordion (FAQ only) | Hiding eligibility, cost, or requirements |
| Understand branching logic | A diagram paired with text | A diagram for simple linear steps |

Rules that follow: one callout per section, matched to severity; lists take a lead-in colon, stay parallel, and cap around seven; tables compare and cards browse, never compare in cards; accordions are FAQ-only; a linear journey is a stepper, not a diagram.

### Imagery

An image must carry information or evidence, never decorate. Earns its place: the artefact (the certificate or the plan set, in the hero), real grayscale headshots (in `Credentials`), and an on-brand line-drawing or schematic motif. Ruled out: lifestyle and construction stock, an icon per feature, and anything purely atmospheric. Every content image carries course-referenced alt text of at least 80 characters in Australian English; decorative images get `aria-hidden` and empty alt. Images hold their aspect ratio (no layout shift), never sit under running text, and never force horizontal scroll on mobile. Any regulatory detail visible in an image (NCC, R-Codes, NatHERS, BASIX) is subject to the verification rule, or is captioned as illustrative.

### Reassurance-first (mandatory or compliance courses)

The buyer has already decided to enrol; the page is an answer desk, not a funnel. Front-load the three facts they came for (approved-by, duration, certificate timing) and keep them in the spec rail. Sell legitimacy with the authority model and provenance, not badges. Use question-led headings that mirror their real questions, answer-first capsules, an FAQ that handles "is it really accepted?", and one action repeated and sticky on mobile.

### Reconciliation (what to take, what to ignore)

Take from `abe-page-design-rules.md`: the section-treatment vocabulary, the reader's-job element table, and the imagery, copy, trust, and verification guidance. These are system-agnostic and match this build.

Do not import its concrete design system, which describes a different (partly reverted) direction and does not exist in this repo:

- its fonts, Public Sans (body) and Source Serif 4 (prose): this build is Archivo, DM Sans, and DM Mono, and the answer capsule is `AnswerCapsule` (DM Sans, warm-cream inset), not a serif.
- its `.t-display` / `.t-headline` / `.t-body` / `.t-prose` / `.t-label` classes: use the components above and the `--font-*` tokens.
- `abe-tokens.css` and its oklch values: tokens live in `global.css` as hex.
- its "cool only, no warm surfaces" rule: this build deliberately uses the warm ramp (`paper-warm #f7f4ef`) on the header and the answer capsule.
- `audit_static.py` and `audit_render.py`: not in this repo. The build itself (component discipline) is the enforcement backstop.
