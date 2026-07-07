# ABE — QLD Owner Builder Course (Astro)

The QLD Owner Builder course page, refactored from `page-homepage-style.html` into reusable Astro components. Same content, structure and styling; the monolithic HTML is now a component tree driven by data and props.

## Run

```bash
npm install
npm run dev      # http://localhost:4321/qld-owner-builder-course
npm run build    # static output to ./dist
npm run check    # astro check (type + template check)
```

> Note: the components were authored to Astro conventions and statically reviewed (balanced tags, imports, fragments, props). A full `astro build` was not run in the authoring sandbox (offline install limit), so run `npm run check && npm run build` once locally to confirm.

## Structure

```
src/
  styles/global.css        # tokens + all component CSS, extracted verbatim from the HTML
  types/course.ts          # shared prop types
  data/modules.ts          # 18 modules (6 groups) + wider-obligation cards
  data/faqs.ts             # 8 FAQ items
  layouts/BaseLayout.astro  # <head>, JSON-LD schema, fonts, WayfinderNav, StickyCta, client scripts
  pages/qld-owner-builder-course.astro  # composes the page from content + components
  components/*.astro        # the component library (below)
```

## Component library

| Component | Renders |
|---|---|
| `Hero` | above-the-fold statement (eyebrow, H1, ticks, CTA, proof, how-it-works, artefact) |
| `WayfinderNav` | sticky on-page jump index + small CTA (active-state via layout script) |
| `Section` | standard `<section>` wrapper: marker + eyebrow + H2 + slot |
| `ZSplit` | image + body split (course, how-it-works) |
| `AnswerCapsule` | 40–60 word answer-first block (`onDark` variant for the trust band) |
| `FactGrid` | "at a glance" 4-fact bento |
| `CanCant` | two-column can / cannot comparison |
| `TopicGrid` | card grid (18 grouped modules; wider obligations) |
| `Stepper` | numbered timeline |
| `PriceCard` | two-payer pricing (course vs QBCC fee) |
| `Note` | note / callout (`maroon` variant) |
| `VerifiedSources` | `✓ VERIFIED · 🔗 SOURCES`, dashed top rule |
| `Credentials` | two-profile E-E-A-T block (developer + reviewer) |
| `Faq` | native `<details>` accordion, first open |
| `SectionWayfinder` | end-of-section "Next: … →" scent link |
| `CtaBand` | closing action band |
| `SourcesFooter` | citations + authority disclaimers |
| `StickyCta` | mobile bottom CTA bar (reveal-on-scroll) |
| `Placeholder` | FPO image (replace before publish) |

## Data-driven bits (edit copy without touching components)

- **Modules** → `src/data/modules.ts` (`moduleGroups`, `obligationCards`). Consider migrating to an Astro **content collection**.
- **FAQ** → `src/data/faqs.ts`.
- **Experts, sources, schema, price rows, steps, glance facts** → the frontmatter of `pages/qld-owner-builder-course.astro`.

## Palette swap

`global.css` is token-driven (`:root` custom properties). To switch to the institutional palette, replace the token values (maroon / navy / slate) — see `page-homepage-institutional.html` for the mapped values. No component changes needed.

## Before publish

- Replace all `<Placeholder>` FPO blocks with real images; content-image `alt` ≥ 80 chars, en-AU; headshots grayscale.
- Confirm Warwick Smith's QLD review attribution + headshot with the live Notion Experts DB (fallback flags both). If the headshot is missing, keep the placeholder and do **not** add `image` to his `Person` schema.
- Wire the CTA (`#enrol`) to the real enrolment/checkout URL and the insurance link to the InsuranceTek referral.
- Re-verify the `$477.47` QBCC fee on the 1 July indexation cadence; confirm NCC 2022 currency.
- Keep the authority model: no RTO number, no "nationally recognised/accredited", no "Statement of Attainment", in content or schema.
