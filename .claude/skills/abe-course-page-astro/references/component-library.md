# QLD Owner Builder — Astro Component Props

Prop contracts for the components in `qld-owner-builder-designer-handover.md`. TypeScript / Astro `Props` convention: no `?` = **required**, `?` = optional. Put shared types in `src/types/course.ts` and import.

> When authoring or altering a component, verify Astro syntax (props/`Astro.props`, slots, `set:html`,
> `astro:assets`, client directives) against the connected **Astro docs MCP** rather than memory. These
> prop contracts are ABE's; the Astro mechanics are the docs'.

## Quick reference — required props per component

| Component | Required props |
|---|---|
| `<Hero>` | `eyebrow, h1, subhead, ticks, cta, price, artefact` |
| `<AnswerCapsule>` | `text` |
| `<FactGrid>` | `items` |
| `<Prose>` | *(none — content via slot)* |
| `<BulletList>` | `items` |
| `<CanCant>` | `canTitle, can, cantTitle, cant` |
| `<ComparisonTable>` | `columns, rows` |
| `<Stepper>` | `steps` |
| `<ModuleGroups>` | `groups` |
| `<PriceTable>` | `rows` |
| `<BundleOffer>` | `title, price, body` |
| `<Callout>` | `type` *(body via slot)* |
| `<VerifiedSources>` | `date, sources` |
| `<ExpertCard>` | `name, role, creds, bio, linkedin` |
| `<FAQAccordion>` | `items` |
| `<CTABand>` | `lead, cta` |
| `<SectionWayfinder>` | `nextLabel, nextHref` |
| `<SourcesFooter>` | `sources, disclaimers` |
| `<WayfinderNav>` | `items, cta` |
| `<StickyCTA>` | `label, price, cta` |

---

## Shared types (`src/types/course.ts`)

```ts
export interface CTA {
  label: string;
  href: string;
  microcopy?: string;
}

export interface Img {
  src: string;
  alt: string;        // content images: >= 80 chars, course-referenced, en-AU
}

export interface Source {
  label: string;      // descriptive anchor, never a naked URL
  href: string;
  verified?: string;  // e.g. "24 Jun 2026"
}

export interface Fact {
  key: string;        // "Price"
  value: string;      // "$179"
  note?: string;      // "GST-free. The QBCC permit fee is separate."
}

export interface Step {
  title: string;
  body: string;
}

export interface Module {
  code: string;       // "M1"
  title: string;      // exact module title from the copy draft
  desc?: string;
}

export interface ModuleGroup {
  title: string;      // "Legal & safety obligations"
  modules: Module[];
}

export interface PriceRow {
  label: string;      // "Course fee"
  sub?: string;       // "study + certificate, GST-free"
  payer?: string;     // "ABE Education" | "QBCC"
  amount: string;     // "$179.00"
  isTotal?: boolean;
}

export interface FAQItem {
  q: string;
  a: string;
  open?: boolean;     // first item true
}

export interface NavItem {
  label: string;      // "The course"
  href: string;       // "#course"
  sectionId: string;  // "course" (for active-state highlight)
}
```

---

## Component props

```ts
// <Hero>  — above-the-fold statement
export interface Props {
  eyebrow: string;                 // "QLD Owner Builder · QBCC-approved"
  h1: string;                      // the single H1
  subhead: string;
  ticks: string[];                 // 3–4; trim to 3 on mobile
  cta: CTA;                        // primary action + microcopy
  price: string;                   // "$179" (must equal Course.offers.price)
  artefact: Img;                   // certificate on a device
  proof?: string[];                // <=3, text only, no unverified star rating
  howItWorks?: string[];           // ["Enrol","Complete online","Get your certificate","Apply to the QBCC"]
}
```

```ts
// <AnswerCapsule>  — 40–60 word answer-first block
export interface Props {
  text: string;
  tone?: 'default' | 'onDark';     // onDark for the trust band
}
```

```ts
// <FactGrid>  — "at a glance" bento
export interface Props {
  items: Fact[];                   // exactly 4
}
```

```ts
// <Prose>  — measure-capped body copy (content via <slot/>)
export interface Props {
  measureCap?: boolean;            // default true (~60–66 CPL)
}
```

```ts
// <BulletList>  — lead-in + parallel items
export interface Props {
  items: string[];                 // parallel, capped ~7
  leadIn?: string;                 // stem line ending in a colon
  ordered?: boolean;               // false = bullets; true only for a true sequence
}
```

```ts
// <CanCant>  — two-column can / cannot comparison
export interface Props {
  canTitle: string;                // "What a permit lets you do"
  can: string[];
  cantTitle: string;               // "What it doesn't cover"
  cant: string[];
}
```

```ts
// <ComparisonTable>  — tabular values
export interface Column { header: string; align?: 'left' | 'right'; }
export interface Props {
  columns: Column[];
  rows: string[][];                // row cells align to columns
  caption?: string;
}
```

```ts
// <Stepper>  — ordered numbered timeline
export interface Props {
  steps: Step[];
  emphasiseLast?: boolean;         // maroon underline draw on the payoff step
}
```

```ts
// <ModuleGroups>  — grouped syllabus cards
export interface Props {
  groups: ModuleGroup[];           // 6 groups, 18 modules total
  outcome?: string;                // "What you will be able to do" line
}
```

```ts
// <PriceTable>  — two-payer pricing
export interface Props {
  rows: PriceRow[];                // course / permit / total
  foot?: string;                   // Afterpay + fee-cadence note
}
```

```ts
// <BundleOffer>  — scoped add-on
export interface Props {
  title: string;                   // "Course and White Card bundle"
  price: string;                   // "$303"
  body: string;
  cta?: CTA;                       // inline, secondary — never a second primary
}
```

```ts
// <Callout>  — one-per-point aside, typed by severity (body via <slot/>)
export interface Props {
  type: 'info' | 'warning' | 'legal' | 'tip';
  title?: string;
}
```

```ts
// <VerifiedSources>  — ✓ VERIFIED · 🔗 SOURCES block (dashed top rule)
export interface Props {
  date: string;                    // "24 Jun 2026"
  sources: Source[];
  facts?: string;                  // optional "what was verified" note
}
```

```ts
// <ExpertCard>  — E-E-A-T bio
export interface Props {
  name: string;
  role: string;                    // exact title; reviewer != builder
  creds: string[];
  bio: string;
  linkedin: string;                // Person schema sameAs
  profileHref?: string;            // /experts/{slug}
  headshot?: Img;                  // omit if missing -> FPO + no image in schema
  lastReviewed?: string;           // reviewer only, e.g. "2 June 2026"
}
```

```ts
// <FAQAccordion>  — native <details>, first item open
export interface Props {
  items: FAQItem[];
}
```

```ts
// <CTABand>  — mid / closing action band
export interface Props {
  lead: string;                    // styled lead line, not a heading
  cta: CTA;
  sub?: string;
  dark?: boolean;                  // the one optional dark band
}
```

```ts
// <SectionWayfinder>  — end-of-section "Next: … →"
export interface Props {
  nextLabel: string;               // "Is it accredited?"
  nextHref: string;                // "#accredited"
}
```

```ts
// <SourcesFooter>  — citations + authority disclaimers
export interface Props {
  sources: Source[];               // each with verified date
  disclaimers: string[];           // ["ABE is not an RTO…","Insurance via InsuranceTek…"]
  abn?: string;                    // "64 125 455 272"
  updated?: string;                // "July 2026"
}
```

```ts
// <WayfinderNav>  — sticky on-page jump index + small CTA (active-state island)
export interface Props {
  items: NavItem[];
  cta: CTA;
}
```

```ts
// <StickyCTA>  — mobile bottom bar (reveal-on-scroll island)
export interface Props {
  label: string;                   // "QLD Owner Builder"
  price: string;                   // "$179"
  cta: CTA;
}
```

---

## Page-level data (passed into the page/layout)

```ts
// Head / schema — server-rendered JSON-LD, never JS-injected
export interface CourseSchemaData {
  name: string;
  description: string;
  price: string;                   // must equal Hero.price and PriceTable course row
  priceCurrency: 'AUD';
  provider: 'ABE Education';
  credentialName: string;          // "Certificate of Completion — NONACCABE QBCC Owner Builder Course"
  recognizedBy: 'Queensland Building and Construction Commission (QBCC)';
  breadcrumb: NavItem[];
  experts: { name: string; sameAs: string; jobTitle: string }[];  // Dominic, Warwick
  // No RTO number, no "nationally recognised", no Statement of Attainment anywhere.
}
```

**Content collections** (Astro): store `modules` (18 items grouped) and `faqs` (8 items) as collections and pass to `<ModuleGroups>` / `<FAQAccordion>`, so copy edits do not touch component code.
