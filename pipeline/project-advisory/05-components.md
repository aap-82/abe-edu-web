# 05 · Section plan + component selection — `/project-advisory`

**Output target:** `src/pages/project-advisory.astro` — hand-built Recipe C page, the
`/owner-builder-insurance` and `/accreditation` pattern. Not an MDX collection entry: `courses`,
`hubs` and `cpdBundles` all demand course-shaped fields this product has no business carrying, and a
new collection means editing skills-owned `content.config.ts`.

## Section plan — one row per section, mapped to its brief

| # | `id` | marker | H2 | From brief | Components |
|---|---|---|---|---|---|
| — | `top` | — | (hero, single H1) | — | `Hero` |
| 1 | `what` | 01 | What is the Project Advisory Pack? | Brief 1 | `Section`, `AnswerCapsule`, `FactGrid` |
| 2 | `inside` | 02 | What is actually in it? | Brief 2 | `Section`, `AnswerCapsule`, `TopicGrid` |
| 3 | `why-paid` | 03 | Why not just use a free template? | Brief 3 | `Section`, `AnswerCapsule`, `CanCant` |
| 4 | `who` | 04 | Who is it for, and who is it not for? | Brief 4 | `Section`, `AnswerCapsule`, `Note` |
| 5 | `cost` | 05 | What does it cost? | Brief 5 | `Section`, `AnswerCapsule`, `PriceCard` |
| 6 | `content-review` | 06 | Who made it? | Brief 6 | `Section`, `AnswerCapsule` |
| — | — | — | (closing CTA + footer) | — | `CtaBand`, `SourcesFooter` |

Six numbered sections, so `Section total="6"`.

## Deviations from `03-briefs.md`

1. **Brief 6's carrier changed from `Credentials` to a capsule plus prose.** `Credentials` is the
   two-expert E-E-A-T block built for pages that state government facts and need a named compliance
   reviewer. This page states none. Rendering it here would import a claim of regulatory scrutiny the
   product has not had and does not need — which is the brief's own stated fail condition. The
   section still names the developer and links to the profiles; it just does not dress a product page
   as a compliance-reviewed one.
2. **No `VerifiedSources`, and no page-foot Sources block.** Every other content page in this repo
   has one. This page has zero government facts (`01-source-map.md` §C), so a Sources block would
   either be empty or padded with citations that support nothing. Recorded here because its absence
   will look like an omission to anyone who checks this page against the others.

## Component prop contracts that bite

- **`FactGrid` takes exactly 4 items** (`interface Props { items: Fact[] } // exactly 4`). Four are
  specified in `04-content.md`.
- **`Hero.cta.microcopy` must be set explicitly.** Unset it falls back to "Pay by card or 4
  interest-free payments with Afterpay" (`Hero.astro:36`), which is false here — this page has no
  working checkout from this origin (`01-source-map.md` §E). That exact default shipped on two live
  pages and was removed 8 Aug 2026.
- **`CanCant` requires `canTitle` and `cantTitle`.** Non-optional.
- **`PriceCard` rows** take `{ label, sub, amount, isTotal? }`.
- **A new `.astro` file starts at `INLINE_STYLE_BUDGET` 0**, so zero inline styles, every shape from
  an existing component.
- **`.sec>.wrap>p:not([class])` now caps bare prose at 480px** (added 10 Aug). Body paragraphs need no
  `.measure` wrapper on this page; they are capped by default. Do not add one.
- **The forbidden-claim scan will not run** — no `data-authority`. Every claim hand-checked, per
  `01-source-map.md` §B.

## Schema

`Product` + `Offer` + `BreadcrumbList`. **No `Course`, no `EducationalOccupationalCredential`, no
`recognizedBy`, no `Person` as developer-of-a-credential.** The migration plan's W2-7 row asks for
"light `Service`/`Product` schema"; `Product` is the right half of that pair because this is a
purchasable good with a price, not a service engagement.

`Offer.price` must equal the on-page price. `guardrails.ts`'s price-parity check keys on
`Course.offers.price` and so will not fire here — checked by hand at Stage 7 instead.

## Open item carried into Stage 6

**The CTA has no working destination from this origin.** The product sells at
`/course/project-advisory-pack`, a LearnWorlds path that dies at cutover, so CTAs use the in-page
`#enrol` anchor. Same standing as `/owner-builder-insurance` and `/white-card-tas`. **The microcopy
must not name a payment method**, and the CTA label should describe the destination honestly rather
than promise a checkout.
