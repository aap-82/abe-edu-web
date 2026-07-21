# Authority, SEO, E-E-A-T & readability rules

These are the ship-blockers. Fix the content to satisfy them; do not water the components down.

## Authority model (per jurisdiction — the single most important rule)
- **State-approved direct** (Owner Builder QLD / TAS / ACT, CPD): ABE delivers under the state
  regulator's approval. **Prohibited:** RTO number, "nationally recognised", "nationally accredited",
  "Statement of Attainment", accredited-course code. **Use:** "Approved by [QBCC / CBOS Tasmania /
  Access Canberra]", "Certificate of Completion". For QLD owner builder specifically: there is **no
  accredited version**; only the QBCC-approved course is accepted; providers differ only by whether
  they are an RTO, which does not change what the QBCC accepts (SME-confirmed).
- **Knowledge-requirement** (Owner Builder **WA**): the state prescribes **no** course and runs **no**
  approved-provider scheme. You apply for owner-builder **approval (Form 75)** from the Building
  Services Board (Building and Energy / LGIRS); the Board accepts a WA-specific course completed
  within 2 years + a White Card as evidence of sufficient knowledge. **Use:** "supports your Form 75
  owner-builder approval". **Prohibited:** "WA-approved course/provider", "permit"/"licence" for the
  owner-builder step (it is an *approval*), RTO/accredited. No `recognizedBy` in schema (see below).
- **ASQA-accredited** (White Card all states, NSW Owner Builder, Asbestos, Silica): name the **RTO
  partner + number** ("in partnership with Blue Dog 31193 / AlertForce 91826"), "nationally
  recognised" is accurate, issue a Statement of Attainment, carry ASQA disclosure in the required
  locations.
- **Never** claim ABE is an RTO, in content or in schema. **Never** put an RTO number as "ABE (RTO …)".

## Section-treatment vocabulary (what renders what)
Statement hero · Overview grid (at-a-glance bento) · AnswerCapsuleSection (definition/orientation) ·
Objection block (is-it-accredited) · Reference/syllabus (modules) · Sequence (how it works, how to
become) · Tabular (pricing, two payers split) · Add-on (bundle) · Credentials (two profiles) ·
Trust/authority band · FAQ accordion · Verified-sources line · Wayfinders (sticky jump nav + end-of-
section "next"). Match the treatment to what the content is doing; do not flatten to one component.

## Answer capsule
Opens every section except the FAQ. 40–60 words, answer first, then the supporting prose. Question-led
H2 above it. This is the highest-value AI-Overview pattern; keep ~120–180 words between headings.

## Verified-with-sources
Every section that states a government fact ends with a `✓ VERIFIED · 🔗 SOURCES` line (dashed top
rule), before the section wayfinder. Full source list also columned in the footer, descriptive
anchors only. Re-verify indexed government fees on cadence (QBCC resets ~1 July); confirm code
currency (NCC) before publish. An unresolved government fact is a publish hard-blocker.

## E-E-A-T
Two named profiles: the course **developer** and an independent **reviewer**, titled exactly (the
reviewer is not given a building qualification). Person schema + `sameAs` LinkedIn, ideally a
`/experts/{slug}` author page. Grayscale real headshots; if one is missing, keep the FPO placeholder
and do **not** add `image` to that Person's schema.

## Hard readability / accessibility rules
- One `<h1>` (the hero). Question-led sentence-case H2s.
- Measure ~60–66 CPL; body ≥ 16px; no justified text; tap targets ≥ 44px; respect reduced-motion.
- Price visible without a click and equal to `Course.offers.price` in schema.
- Every content image: descriptive, course-referenced alt ≥ 80 chars, en-AU; decorative → aria-hidden + empty alt.
- Australian English; **no em dashes** in body copy (commas/full stops/colons); never "comprehensive".

## Discoverability (shipped by the template)
`BaseLayout.astro` emits `<meta name="robots" content="index,follow">` plus Open Graph (`og:type/site_name/locale/title/description/url`) and Twitter card tags on every page, driven by the same `title`/`description`/`canonical` props. Pass an optional **`ogImage`** (absolute URL) to upgrade the Twitter card to `summary_large_image` and add `og:image`; omit it to ship text-only cards (no broken image). `@astrojs/sitemap` is wired in `astro.config.mjs` (needs `site` set), so the build writes `sitemap-index.xml` + `sitemap-0.xml`; `public/robots.txt` points crawlers at the sitemap. Nothing to do per page beyond an optional `ogImage`.

## Palette swap (restyle without touching components)
The stylesheet is token-driven (`:root` custom properties in `src/styles/global.css`). To change the
look, remap the token *values* only — e.g. the institutional palette: maroon `#800000` action/brand,
navy `#003366` verification (`--verify`), slate tertiary for `--ink*`/`--rule*`, cool `#f8fafc` /
`#ebf1f8` grounds, on-dark accent `#5c84b5`. No component or markup changes.

## Schema (JSON-LD, server-rendered, never JS-injected)
Course + EducationalOccupationalCredential (Certificate of Completion) + BreadcrumbList + Person ×2.
**`recognizedBy` depends on the authority model:** for **state-approved-direct** courses where the
regulator approves the course (QLD/QBCC, TAS/CBOS), set `recognizedBy` to the regulator. For
**knowledge-requirement** jurisdictions where the state prescribes NO course and approves no provider
(WA: Form 75, Building Services Board), the credential names ABE as `issuedBy` only and carries **no
`recognizedBy`** — claiming government recognition of the course would breach the authority model.
`Course.offers.price` must equal the on-page price. FAQPage schema optional only (rich result retired
May 2026 — keep the visible Q&A). No RTO anywhere.
