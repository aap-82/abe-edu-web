---
name: ABE Education — Course Pages
description: Static Astro marketing site for Australian owner-builder and trades courses; editorial, sourced, print-like.
colors:
  maroon: "#800000"
  maroon-deep: "#5a0000"
  verify-blue: "#2f5d8c"
  gold: "#d4a843"
  ink: "#1a1a1a"
  ink-2: "#2a2a2a"
  ink-3: "#4a4a4a"
  slate: "#6e6e6e"
  slate-light: "#9a9a9a"
  paper: "#ffffff"
  paper-alt: "#fafafa"
  paper-warm: "#f7f4ef"
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
  faq:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
---

# Design System: ABE Education — Course Pages

## 1. Overview

**Creative North Star: "The Regulator's Broadsheet"**

This is a quality Australian broadsheet rebuilt for the web: authoritative, editorial, and evidence-led. Every claim reads like it was sub-edited and fact-checked, because it was. The system carries its trust in the open, with monospace captions, dated source lines, and named expert bylines, the way a serious newspaper carries a masthead and a corrections column. It never shouts. It earns belief through restraint, precision, and the visible paper trail behind each government fact.

Structurally it is flat and print-like. Depth comes from hairline rules and tonal paper grounds, not from shadows or gloss. One deep maroon does all the accent work and is spent sparingly, so it always means something. A separate steel blue is reserved for one job only, marking a fact as sourced and verified. Type is a three-voice pairing: Archivo for headlines and figures, DM Sans for reading, and DM Mono in wide-tracked uppercase for every label, key, and caption, the small print that signals a document you can trust.

It explicitly rejects the SaaS-marketing look: no soft drop shadows, no gradient hero blocks, no glassy cards, no rounded pastel everything. It also rejects the opposite trap of cold govtech. The warm paper ground and generous air keep it human and readable, an authority you would actually want to read.

**Key Characteristics:**
- Flat by default: 1px hairline rules and tonal grounds carry structure, never shadow.
- One maroon accent, spent at 10% or less, so it always signifies.
- A dedicated verify-blue that appears only on sourced, dated facts.
- Monospace uppercase for all micro-type: eyebrows, keys, captions, source lines.
- Generous vertical rhythm (up to 112px section padding) and tabular figures on every number.

## 2. Colors

A warm, near-monochrome paper system with one authoritative maroon and a single trust-signalling blue. Neutrals do most of the work; accents are rationed.

### Primary
- **Regulator Maroon** (`#800000`): the sole brand accent. It marks the eyebrow dash, hero tick glyphs, active nav underlines, link and button hover states, section keys, and the small brand tile. Deployed on 10% or less of any screen. Its scarcity is the point.
- **Maroon Deep** (`#5a0000`): pressed and hover-on-dark states of the maroon only. Never a fill.

### Secondary
- **Verify Blue** (`#2f5d8c`): a functional trust colour, never decorative. It appears only on the verified-source line, its ticks, and its citation links. If something is blue, it has been sourced and dated.

### Tertiary
- **Attestation Gold** (`#d4a843`): the on-dark accent. Used only inside ink-grounded sections (trust band, dark capsule border, dark wayfinder link) where maroon would go muddy.

### Neutral
- **Ink** (`#1a1a1a`): primary text and the dark section / footer ground. Stands in for black; true black is never used.
- **Ink 2 / Ink 3** (`#2a2a2a` / `#4a4a4a`): emphasis text and standard body text on paper.
- **Slate / Slate Light** (`#6e6e6e` / `#9a9a9a`): captions, meta, and muted keys.
- **Paper / Paper Alt / Paper Warm** (`#ffffff` / `#fafafa` / `#f7f4ef`): the three-step ground ramp used to separate sections tonally instead of with borders or shadows.
- **Rule / Rule Strong** (`#e5e7eb` / `#d4d6da`): the hairline dividers and card borders that carry all structure.

### Named Rules
**The One Maroon Rule.** Maroon is the only brand accent and never covers more than roughly 10% of a screen. It is for marks, ticks, hovers, and active states, never for large fills or section backgrounds. Dark sections use Ink as the ground and Gold as the accent.

**The Verify-Blue Rule.** `#2f5d8c` is reserved exclusively for sourced-and-dated facts and their citations. It is forbidden as a decorative or interface colour. Blue on this site is a promise that a claim is backed.

## 3. Typography

**Display Font:** Archivo (with -apple-system, BlinkMacSystemFont, sans-serif)
**Body Font:** DM Sans (with -apple-system, BlinkMacSystemFont, sans-serif)
**Label / Mono Font:** DM Mono (with ui-monospace, monospace)

**Character:** A three-voice newsroom pairing. Archivo is the confident headline and figure face, set tight with negative tracking. DM Sans is the calm, legible reading voice. DM Mono, always uppercase and widely tracked, is the "small print" voice that signals captions, keys, and verified facts, the typographic tell of a trustworthy document.

### Hierarchy
- **Display** (Archivo 600, `clamp(40px, 6.2vw, 72px)`, line-height 1.02, tracking -0.03em): the single hero H1 per page.
- **Headline** (Archivo 600, `clamp(30px, 3.6vw, 42px)`, line-height 1.08, tracking -0.025em): section H2s, question-led.
- **Title** (Archivo 600, 22px, tracking -0.01em): card and sub-section H3s; FAQ and price figures share this weight.
- **Body** (DM Sans 400, 17px, line-height 1.65): reading copy. The lede steps up to 19px / line-height 1.55. Long-form answer copy is capped around 66–80ch.
- **Label** (DM Mono 500, 11px, tracking 0.18em, uppercase): eyebrows, stat keys, step keys, meta, and source lines. The wider the tracking, the smaller the type.

### Named Rules
**The Mono Label Rule.** Every piece of micro-type, eyebrows, keys, captions, meta, verified lines, is DM Mono in uppercase with 0.08em to 0.18em tracking. Archivo and DM Sans are never used for labels; DM Mono is never used for reading copy.

**The Tabular Figure Rule.** Every price, statistic, and figure carries `font-variant-numeric: tabular-nums` (the `.num` class) so columns and repeated numbers align and never jitter.

## 4. Elevation

The system is flat. There is no shadow vocabulary at all. Depth is built three ways: 1px hairline rules (`--rule` / `--rule-strong`), a tonal ground ramp (`paper` to `paper-alt` to `paper-warm` to `ink`), and a single interaction lift. Interactive cards raise 2px on hover (`transform: translateY(-2px)`) with their border darkening to ink, which is the only elevation cue in the system. The one blur in the build is functional, not decorative: the sticky header and CTA strip use `backdrop-filter: saturate(140%) blur(8px)` purely so text stays legible over scrolling content beneath them.

### Named Rules
**The Hairline Rule.** Structure is carried by 1px rules and tonal grounds, never by drop shadows. A box-shadow on any surface reads as a foreign object and is prohibited. If a block needs to separate from its neighbour, change the ground tone or add a hairline, do not lift it with shadow.

## 5. Components

Components are flat, bordered, and quietly rectangular (5–8px radii). Cards earn their borders; they are never stacked or nested.

### Buttons
- **Shape:** gently squared (6px radius).
- **Primary:** Ink ground (`#1a1a1a`), paper text, 14px/26px padding, DM Sans 600 at 16px, with a 12px gap for a trailing arrow. Hover fills Regulator Maroon.
- **Secondary:** transparent with a 1px `rule-strong` border and ink text; hover darkens the border to ink.
- **Link:** ink text on a 1px underline; hover turns maroon and slides the trailing arrow 3px.
- **Mini:** the compact ink-to-maroon button used in the sticky nav and CTA strip.

### Cards / Containers
- **Corner Style:** 6px for content cards (glance, topic, note), 8px for structural containers (price card, FAQ, TOC).
- **Background:** Paper (`#ffffff`); alternating sections sit on Paper Alt or Paper Warm.
- **Shadow Strategy:** none. See Elevation, the Hairline Rule.
- **Border:** 1px `--rule` on all four sides. Interactive cards (topic) darken the border to ink and lift 2px on hover.
- **Internal Padding:** 32px (`--s-lg`) for stat and topic cards.

### Eyebrow (signature)
The section-opening label: DM Mono uppercase, 11px, 0.18em tracking, slate, preceded by an 18px maroon hairline dash. It opens nearly every section and is the clearest single tell of the register.

### Verified Source Line (signature)
The trust device. DM Mono 12px above a 1px dashed top rule, carrying verify-blue ticks and dated citation links. Every government fact block ends in one. It is what makes the North Star literal.

### Placeholder (signature dev affordance)
The FPO image block: a warm paper gradient (`#f0eae0` to `#e4dccf`) with a dashed inset border, a mono label, and an Archivo description. Aspect is locked by `.r54` (5:4) or `.r45` (4:5). Omit the image `src` and this stays in place; drop a real image in and it swaps to an `<img>`.

### FAQ
A single 8px bordered container of `<details>` rows split by 1px rules. The summary is Archivo 600 18px; a maroon plus-mark rotates 45 degrees to a cross when open.

### Price Card
An 8px bordered table; rows split by 1px rules, figures in Archivo with tabular numerals. The total row inverts to an ink ground with white text.

### Navigation
Sticky site header (blurred paper) with the maroon brand tile; a secondary wayfinder sub-nav of mono uppercase jump-links whose active item carries a maroon underline; and, on mobile, a fixed bottom CTA strip that slides up into view.

## 6. Do's and Don'ts

### Do:
- **Do** build depth from 1px hairline rules (`--rule` `#e5e7eb`, `--rule-strong` `#d4d6da`) and the tonal ground ramp (`#ffffff` to `#fafafa` to `#f7f4ef` to `#1a1a1a`).
- **Do** set every label, key, caption, and source line in DM Mono uppercase, tracked 0.08em to 0.18em.
- **Do** keep Regulator Maroon (`#800000`) to 10% or less: eyebrow dash, ticks, hovers, active underlines, brand tile. Never a large fill.
- **Do** reserve Verify Blue (`#2f5d8c`) strictly for sourced, dated facts and their citations.
- **Do** put `tabular-nums` on every price and statistic (the `.num` class).
- **Do** give sections room: up to 112px (`--s-3xl`) vertical padding, easing to 64px on mobile.
- **Do** use Ink (`#1a1a1a`) for text and dark grounds; on ink sections, switch the accent to Attestation Gold (`#d4a843`).

### Don't:
- **Don't** use box-shadows for elevation anywhere. The system is flat; a drop shadow reads as a 2014 app and is prohibited.
- **Don't** use the maroon left-stripe answer capsule (`border-left: 3px solid var(--maroon)`). A colored side-stripe over 1px is a banned anti-pattern; rework it as a full 1px border, a background tint alone, or a leading mono marker.
- **Don't** set eyebrows or labels in Archivo or DM Sans. Micro-type is DM Mono only; DM Mono is never used for reading copy.
- **Don't** spend maroon on large surfaces or section backgrounds. Dark sections are Ink-grounded with Gold accents.
- **Don't** introduce pure `#000` or `#fff` for text or borders; use the Ink and Rule tokens.
- **Don't** use em dashes, or the word "comprehensive", in any copy (house style).
- **Don't** nest cards or stack borders. If a card needs internal grouping, use rules and spacing, not a second card.
