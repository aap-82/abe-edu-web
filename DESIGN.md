---
name: ABE Education, Course Pages
description: Static Astro marketing site for Australian owner-builder and trades courses; editorial, sourced, print-like.
colors:
  maroon: "#800000"
  maroon-dark: "#5a0000"
  verify-blue: "#2f5d8c"
  verify-deep: "#1e3d5c"
  ok-green: "#2e7d5b"
  gold: "#d4a843"
  ink: "#1a1a1a"
  ink-2: "#2a2a2a"
  ink-3: "#4a4a4a"
  slate: "#6e6e6e"
  slate-light: "#9a9a9a"
  ground: "#fbf9f5"
  paper: "#ffffff"
  paper-alt: "#f7f4ec"
  paper-warm: "#f5f1e8"
  paper-inset: "#f0e9db"
  paper-chrome: "#fbf9f5"
  paper-grey: "#f2f3f4"
  paper-grey-soft: "#f8f9fa"
  rule: "#e5e7eb"
  rule-strong: "#d4d6da"
typography:
  figure:
    fontFamily: "Archivo, Archivo Fallback, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(48px, 7vw, 84px)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.03em"
  display:
    fontFamily: "Archivo, Archivo Fallback, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(34px, 4.6vw, 56px)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Archivo, Archivo Fallback, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(30px, 3.6vw, 42px)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Archivo, Archivo Fallback, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "DM Sans, DM Sans Fallback, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "DM Mono, DM Mono Fallback, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.18em"
rounded:
  xs: "3px"
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
- One maroon accent, spent at 10% or less, so it always signifies. Line art may use it; fills never may.
- Two verify blues, deep and mid, that appear only on sourced, dated facts.
- Monospace uppercase for all micro-type: eyebrows, keys, captions, source lines.
- Generous vertical rhythm (up to 112px section padding) and tabular figures on every number.

## 2. Colors

A warm, near-monochrome paper system with one authoritative maroon and a small set of functional signal colours. Neutrals do most of the work; accents are rationed.

### Primary
- **Regulator Maroon** (`#800000`): the sole brand accent. It marks the eyebrow dash, hero tick glyphs, active nav underlines, link and button hover states, section keys, the small brand tile, and the strokes of a line-art illustration. Deployed on 10% or less of any screen. Its scarcity is the point.
- **Maroon Dark** (`#5a0000`): pressed and hover-on-dark states of the maroon only. Never a fill.

### Secondary (functional signals, never decorative)
- **Verify Deep** (`#1e3d5c`): the attestation mark. The tick glyph and the word `VERIFIED` beside it, and nothing else. The two together are one signature, so they carry one colour.
- **Verify Blue** (`#2f5d8c`): the same trust colour, one step lighter. The verification **date**, and citation links on hover. If something is blue, it has been sourced and dated; the deeper blue signs it, the lighter one dates and cites it.
- **Verified Green** (`#2e7d5b`): **retired 20 Jul 2026**, and currently unused. It was the tick glyph. The tick joined the `VERIFIED` label in Verify Deep because a green glyph beside a grey word read as two unrelated things rather than one mark. The token remains defined but is referenced nowhere; give it a job or delete it, do not reintroduce it decoratively.

### Tertiary
- **Attestation Gold** (`#d4a843`): the on-dark accent. Used only inside ink-grounded sections (trust band, dark capsule border, dark wayfinder link) where maroon would go muddy.

### Neutral
- **Ink** (`#1a1a1a`): primary text and the dark section / footer ground. Stands in for black; true black is never used.
- **Ink 2 / Ink 3** (`#2a2a2a` / `#4a4a4a`): emphasis text and standard body text on paper.
- **Slate / Slate Light** (`#6e6e6e` / `#9a9a9a`): captions, meta, muted keys, and the VERIFIED label itself.
- **Ground** (`#fbf9f5`): the page itself, and the full-width chrome that reads as its top and bottom edge. Split from Paper on 24 Jul 2026 and deliberately not re-merged: creaming one shared token would also have creamed every card and sunk it into the `.bg-warm` bands.
- **Paper** (`#ffffff`): the fill of an **elevated** surface, meaning cards, the megamenu and the mobile nav panel. Never the page.
- **Paper Alt / Paper Warm** (`#f7f4ec` / `#f5f1e8`): the second and third steps of the one warm ramp, `ground` to `paper-alt` to `paper-warm`, used to separate sections tonally instead of with borders or shadows. Ground to alt separates by 1.045 and alt to warm by 1.026, wide enough to read on a phone in daylight without becoming a hard SaaS stripe. The ramp stops at Paper Warm because Slate label text holds exactly 4.52:1 on it, against AA's 4.50 floor.
- **Paper Inset** (`#f0e9db`): deliberately **off** the section ramp and deeper than every band, so the answer capsule reads as a recessed inset on any section rather than as an elevated card.
- **Paper Chrome** (`= ground`): the ground shared by the site header and breadcrumb bar, so the page chrome reads as one continuous surface. The wayfinder bar is deliberately **not** on this token; it keeps its own cool grey so it reads as a separate stratum from the header above it.
- **Paper Grey / Paper Grey Soft** (`#f2f3f4` / `#f8f9fa`): the one cool neutral pair, promoted to tokens on 12 Aug 2026 from the wayfinder bar's own background rather than invented. They exist because the warm ramp cannot express "light grey", and Paper Grey is the only cool grey in the file that clears AA for Slate (4.59:1, where `--rule` fails at 4.12). Paper Grey Soft is one step lighter, for a surface sitting under a Paper Grey heading.
- **Rule / Rule Strong** (`#e5e7eb` / `#d4d6da`): the hairline dividers and card borders that carry all structure.

### Named Rules
**The One Maroon Rule.** Maroon is the only brand accent and never covers more than roughly 10% of a screen. It is for marks, ticks, hovers, active states, and the strokes of a line-art illustration, never for large fills or section backgrounds. Dark sections use Ink as the ground and Gold as the accent.

**Maroon in illustration** (added 29 Jul 2026). A line-art illustration may draw its strokes in maroon. Three conditions, and they are what keep this from being a hole in the rule above:

1. **Strokes only.** Single-weight line on a warm ground: no fills, no shading, no gradients, no tinted areas. The moment an illustration fills a shape with maroon it is a large fill and the rule bans it.
2. **The 10% ceiling still applies, to the screen and not to the drawing.** Measure it rather than assume it.
3. **One visual language per page.** If a page uses maroon line art, every illustration on that page does. A maroon hero above an ink diagram is worse than either consistent choice.

This was decided on measurement, not preference. Both illustrations on `/white-card-wa` render at 319x399 on a 375px viewport, which is **41.8% of the screen each**. Within the image, pixels clearly darker than the ground are **5.2%** (hero) and **4.8%** (the assessment drawing). Counting the soft antialias band as well — 9.0% of the hero, 1.1% of the assessment drawing, since AVIF leaves the hero's finer strokes much softer — the honest upper bound is **about 4% of the screen for the hero and about 2% for the other**. Both are inside the ceiling with room to spare, and the hero is the number to quote, not the flattering one.

What made this a question at all was the role list, not the quantity: an illustration is not a mark, tick, hover or active state. It is admitted as **its own role** rather than smuggled in under an existing one, because the alternative was reading the rule as "anything under 10% is fine", which would empty it.

Ink is the alternative and is deliberately not the default: at `--ink` a line drawing sits at the same value as body text on the same warm ground and reads as a generic technical diagram, with nothing tying it to the site.

**The Signal-Colour Rule.** Both verify blues are reserved exclusively for sourced-and-dated facts. They are forbidden as decorative or interface colours. Blue on this site is a promise that a claim is backed. It never carries meaning alone: it always sits beside the word VERIFIED and a date, so the signal survives greyscale and colour blindness. Both pass WCAG AA at the 12px this type is set in (Verify Deep 10.2:1, Verify Blue 6.24:1 on the warm ground).

## 3. Typography

**Display Font:** Archivo (with -apple-system, BlinkMacSystemFont, sans-serif)
**Body Font:** DM Sans (with -apple-system, BlinkMacSystemFont, sans-serif)
**Label / Mono Font:** DM Mono (with ui-monospace, monospace)

**Character:** A three-voice newsroom pairing. Archivo is the confident headline and figure face, set tight with negative tracking. DM Sans is the calm, legible reading voice. DM Mono, always uppercase and widely tracked, is the "small print" voice that signals captions, keys, and verified facts, the typographic tell of a trustworthy document.

### Hierarchy
- **Figure** (Archivo 700, `clamp(48px, 7vw, 84px)`, line-height 1, tracking -0.03em): one arresting number standing alone, set by `.statblock-v` and rendered by `StatBlock`. The largest type in the system, above Display, and the only role that is not a heading. Always Ink, never maroon: a figure this size in maroon would spend the entire 10% accent budget in one element. **It currently has no production consumer** — `StatBlock` renders on `/styleguide` and nowhere else — so it is recorded here as an available shape rather than as something the site is using. Recorded because the register previously implied 56px was the ceiling, which a build session reading it would have believed.
- **Display** (Archivo 700, `clamp(34px, 4.6vw, 56px)`, line-height 1.04, tracking -0.03em): the single hero H1 per page, set by `h1.h1` and rendered by `Hero.astro`. It is the largest type any reader currently meets, and the one heading role that steps to weight 700; everything else in Archivo is 600.
- **Headline** (Archivo 600, `clamp(30px, 3.6vw, 42px)`, line-height 1.08, tracking -0.025em): section H2s, question-led.
- **Title** (Archivo 600, 22px, tracking -0.01em): card and sub-section H3s; FAQ and price figures share this weight.
- **Body** (DM Sans 400, 17px, line-height 1.65): reading copy. The lede steps up to 19px / line-height 1.55. Long-form answer copy is capped around 66 to 80ch.
- **Label** (DM Mono 500, 11px, tracking 0.18em, uppercase): eyebrows, stat keys, step keys, meta, and source lines. The wider the tracking, the smaller the type.

### Named Rules
**The Mono Label Rule.** Every piece of micro-type, eyebrows, keys, captions, meta, verified lines, is DM Mono in uppercase with 0.08em to 0.18em tracking. Archivo and DM Sans are never used for labels; DM Mono is never used for reading copy.

**The Tabular Figure Rule.** Every price, statistic, and figure carries `font-variant-numeric: tabular-nums` (the `.num` class) so columns and repeated numbers align and never jitter.

## 4. Elevation

The system is flat. There is no shadow vocabulary at all. Depth is built three ways: 1px hairline rules (`--rule` / `--rule-strong`), a tonal ground ramp (`ground` to `paper-alt` to `paper-warm` to `ink`), and a single interaction lift. Interactive cards raise 2px on hover (`transform: translateY(-2px)`) with their border darkening to ink, which is the only elevation cue in the system. The one blur in the build is functional, not decorative: the sticky header and CTA strip use `backdrop-filter: saturate(140%) blur(8px)` purely so text stays legible over scrolling content beneath them.

### Named Rules
**The Hairline Rule.** Structure is carried by 1px rules and tonal grounds, never by drop shadows. A box-shadow on any surface reads as a foreign object and is prohibited. If a block needs to separate from its neighbour, change the ground tone or add a hairline, do not lift it with shadow.

## 5. Components

Thirty components, all rendered live at `/styleguide` with the real tokens. They are flat, bordered, and quietly rectangular (3 to 8px radii). Cards earn their borders; they are never stacked or nested.

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

- **Left column:** the word `VERIFIED` in uppercase preceded by a small tick, both in **verify-deep** as a single mark; the verification **date** sits beneath it in the lighter **verify-blue**.
- **Right column:** what was checked, then the linked authorities, reading as *"[fact] fact-checked against the current Act against [Source], [Source]"*.

Every government fact block ends in one, and they feed the page-foot Sources list.

### Trust band
`TrustBand` + `TrustStats`: the ink-grounded band carrying the proof numbers. Gold is the accent here; maroon is never used on ink.

### Cards and containers
- **Corner Style:** three steps, tightening as the block gets flatter. 3px for inset and rule-topped blocks (the answer capsule, the `caution` note, the placeholder's dashed inset), 6px for content cards (glance, topic, the neutral note), 8px for structural containers (price card, bundle offer, FAQ, TOC).
- **Background:** Paper, because a card is an elevated surface. The sections beneath them alternate across the ground ramp (Ground, Paper Alt, Paper Warm), which is what gives a Paper card its lift without a shadow.
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
A single 8px bordered container of `<details>` rows split by 1px rules. The summary is the **Title** role from §3 (Archivo 600, 22px, tracking -0.01em, line-height 1.25); a maroon plus-mark rotates 45 degrees to a cross when open.

It was Archivo 600 **18px** with the body's inherited 1.65 line-height until 15 Aug 2026. What made
that a defect was not the number but a contradiction inside this document: §3 has always named the
Title role as covering "card and sub-section H3s; FAQ and price figures share this weight", so the
register described this element as a Title while the element was not one. Neither the design-register
check nor a reader of §3 alone would catch that, because both halves are here and each is internally
consistent. `.mr-title` in `ModuleRows` had already made exactly this move for exactly this reason;
the FAQ was the leftover, and it was filed three times before it was fixed.

**It was not, however, the only off-register display size, and the demand item that said so was
wrong.** Measured across `global.css` on 15 Aug 2026, the display face is set at 16, 17 (two weights),
18, 19, 22, 24, 28 and 36px plus two clamps, against the six roles §3 names — `.h4` is Archivo 600
18px with a live consumer in `TopicGrid`, and the wordmark is Archivo 600 18px by its own right as a
mark rather than a type role. Whether §3 grows steps or those components move onto existing ones is a
separate register decision, filed rather than taken here. Accordions are for FAQs and the module-group syllabus (`ModuleRows`, see §7): decision-critical content, meaning eligibility, cost, requirements and the authority model, is never hidden inside one.

### Navigation
Sticky site header (blurred paper, click-open megamenus) with the maroon brand tile; `PageBar` for breadcrumbs and the dated reviewer line; `WayfinderNav`, a sub-nav of mono uppercase jump-links whose active item carries a maroon underline; `SectionWayfinder`, the end-of-section forward-scent link (a mono NEXT kicker above the next section's title and the fly arrow); and, on mobile, a fixed bottom CTA strip that slides up into view.

## 6. Do's and Don'ts

### Do:
- **Do** build depth from 1px hairline rules (`--rule` `#e5e7eb`, `--rule-strong` `#d4d6da`) and the tonal ground ramp (`#fbf9f5` to `#f7f4ec` to `#f5f1e8` to `#1a1a1a`).
- **Do** set every label, key, caption, and source line in DM Mono uppercase, tracked 0.08em to 0.18em.
- **Do** keep Regulator Maroon (`#800000`) to 10% or less: eyebrow dash, ticks, hovers, active underlines, brand tile, and line-art illustration strokes. Never a large fill.
- **Do** reserve Verify Deep (`#1e3d5c`) and Verify Blue (`#2f5d8c`) strictly for sourced, dated facts, and always pair them with the word VERIFIED and a date.
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
- **Don't** spend maroon on large surfaces or section backgrounds, and don't let an illustration FILL a shape with it. Strokes are permitted, areas are not. Dark sections are Ink-grounded with Gold accents.
- **Don't** introduce pure `#000` or `#fff` for text or borders; use the Ink and Rule tokens.
- **Don't** use em dashes, or the word "comprehensive", in any copy (house style).
- **Don't** nest cards or stack borders. If a card needs internal grouping, use rules and spacing, not a second card.
- **Don't** hide eligibility, cost or requirements inside an accordion. Accordions are for FAQs and the module-group syllabus (`ModuleRows`), and nothing else. See §7 for the exception and its evidence.

## 7. Content design and element selection

Sections 1 to 6 are the visual system (tokens, type, colour, components). This section sits above them: which treatment a section gets, and which element serves the reader's job. It is reconciled from `outputs/md/abe-page-design-rules.md`, the fuller content-design reference. Where that source doc conflicts with this build, this file wins (see Reconciliation at the end). The authority model and copy rules live in `CLAUDE.md`.

### Link targets — decided by the reader's job, not by the destination

**An external link that invites the reader to ACT opens in a new tab. An external link that is
PROVENANCE stays in the same tab.**

| The link is | Examples | Behaviour |
|---|---|---|
| An **invitation to act** — go and verify, go and look | `ResourceLink`, `PartnerDisclosure`'s "Verify on training.gov.au", `Credentials`' Website and LinkedIn | `target="_blank"` + `rel="noopener"` + a **mandatory** `.sr-only ", opens in a new tab"` |
| **Provenance** — proof a claim was checked | the citation ledger in `VerifiedSources`, the page-foot list in `SourcesFooter` | same tab, no `target`, no cue |

Why the split. Checking an RTO's registration is a verify-then-return errand, and sending the reader
off the page mid-decision loses them. A citation is not an errand: it is there so the claim is
checkable and crawlable, most readers never click it, and the browser already offers ctrl-click for
those who want a tab. `ResourceLink.astro` draws the same line from the other side, calling
`VerifiedSources` *"passive proof, past tense"* against its own *"invitation for the READER to go and
look."*

**The cue is not optional where a new tab is used.** An unannounced change of context fails WCAG 3.2.5.
Every `target="_blank"` on the site carries the `.sr-only` span; the one that did not (`PageBar`'s
reviewer link) was fixed on 30 July 2026 when this rule was written.

**Adjacent look-alikes must agree.** Two links sitting in the same baseline row do not split their
behaviour — that is a worse defect than the inconsistency it would fix. Where destinations genuinely
differ in kind (an internal profile beside an external one), the split is correct and should be
commented at the call site.

*Written 30 July 2026, after this question was filed five times and never decided. It kept recurring
because no rule existed to point at, so each session re-argued it from scratch. Two other files
predate this and prescribe `target="_blank"` for government citation links —
`kb/register/government-listings.md` and the skill's `references/seo/trust-bar-guidelines.md`. **This
section is the authority**; both are routed for correction and neither may be cited against it.*

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
| Dip into a few of many short sections | An accordion (FAQ, and the module-group syllabus) | Hiding eligibility, cost, or requirements |
| Understand branching logic | A diagram paired with text | A diagram for simple linear steps |

Rules that follow: one callout per section, matched to severity; lists take a lead-in colon, stay parallel, and cap around seven; tables compare and cards browse, never compare in cards; accordions are for FAQs and the module-group syllabus (below); a linear journey is a stepper, not a diagram.

### The syllabus accordion (added 31 July 2026)

**`ModuleRows` is a disclosure list: the first group open, the rest on click.** This is the one
non-FAQ accordion on the site, and it is a deliberate exception to the line above rather than an
oversight, decided by Andrey against six rendered variants.

Why it earns the exception:

- **It buys real page.** On `/act-owner-builder-course`, the largest syllabus at twelve groups, the
  section is **39% shorter** at 390px: 1869px to 1141px, measured on the built page.
- **A syllabus is browsing material, not a decision input.** The reader must see a fee or an
  eligibility threshold to act; they dip into module contents. That is the "dip into a few of many
  short sections" row of the table above, which is exactly what an accordion is for.
- **The question is answered before any disclosure.** The section's answer capsule states the scope
  in prose, uncollapsed, so the H2 is answered whether or not the reader opens a group.
- **Nothing is lost to a crawler.** Collapsed content stays in the DOM and in `dist/`.

The exception is scoped to this component and this content. Eligibility, cost, requirements and the
authority model stay fully visible everywhere. Two things to know if you touch it: the four states
other than QLD have no module contents or outcomes authored yet, so a disclosure there currently
reveals a single sentence, and variant A (every group open, control collapses what you have read) is
the recorded fallback if this is ever reversed. Evidence and measurements:
`skill-reviews/design/2026-07-31-module-accordion.md`.

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
- its "cool only, no warm surfaces" rule: this build deliberately uses the warm ramp (`paper-warm #f5f1e8`) on the header and the answer capsule.
- `audit_static.py` and `audit_render.py`: not in this repo. The build itself (component discipline) is the enforcement backstop.
