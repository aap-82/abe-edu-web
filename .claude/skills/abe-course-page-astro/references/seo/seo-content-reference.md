# ABE Education SEO Content Reference 2026
**Condensed from v1.1 — all rules, numbers, and templates preserved. Evidence paragraphs removed for brevity.**
**Full document available from user on request.**

---

## Table of Contents

1. Quick reference numbers
2. Content structure and headings
3. Meta titles
4. Meta descriptions
5. CTAs
6. Image alt text
7. Schema markup
8. AI Overview optimisation
9. E-E-A-T signals
10. ABE-specific rules
11. Common mistakes

---

## 1. Quick Reference Numbers

| Element | Guideline |
|---|---|
| Meta title length | 51–60 characters (sweet spot: 51–55) |
| Meta title keyword position | Within first 40–45 characters |
| H1 length | 50–60 characters |
| H2/H3 length | Under 70 characters |
| Answer capsule length | 40–60 words |
| Meta description (desktop) | 150–160 characters |
| Meta description (mobile safe zone) | First 120 characters contain core message |
| Alt text length | 80–125 characters |
| FAQ answer length | 30–80 words |
| Hero headline length | 6–12 words |
| Minimum CTA tap target (mobile) | 48×48 px |
| Minimum CTA font size (mobile) | 16px |
| Core Web Vitals LCP target | ≤2.5 seconds |
| Core Web Vitals CLS target | ≤0.1 |
| Core Web Vitals INP target | ≤200ms |

> **Mirror, not source of truth.** The meta title / description / H1 figures in this table are owned by `meta-framework.md`; the readability limits (paragraph, sentence, list, headings, answer capsule, FAQ) by `content-formatting-guidelines.md`; alt-text length by `alt-text-guidelines.md`. Edit them in the owning file first, then update this table.

---

## 2. Content Structure and Headings

### Answer capsule pattern (highest priority for 2026)

1. Question-format H2 or H3 mirroring actual search queries
2. Immediately follow with 40–60 word plain-language direct answer
3. Expand with details, examples, supporting data below

Key stats (figures from industry studies, not Google requirements — see §8): Question-based queries trigger AI Overviews 99.2% of the time. 120–180 words between headings = 70% more AI citations. 44.2% of AI citations come from first 30% of text.

### Heading rules

- One H1 per page (50–60 chars), inside `<main>` not `<header>`
- Never skip heading levels (H1 → H2 → H3)
- H2s and H3s as natural questions ("How long does White Card training take?" not "Course Duration")
- H2/H3 length: under 70 characters
- Step-by-step H3s for process content ("Step 1 — Step 2 — Step 3")
- If a reader skims only H2s, they should understand the full page structure

### Standard heading template for course landing pages

```
H1: [Course Name] — [Unit Code] [Qualifier]
  H2: What is [course/credential] and who needs one?
    [Answer capsule]
    H3: [Specific sub-question]
  H2: How does the [course] work?
    H3: Step 1 — [First step]
    H3: Step 2 — [Second step]
  H2: What will you learn?
  H2: Course requirements and eligibility
  H2: How much does the course cost?
  H2: Frequently asked questions
    H3: [Question 1]
  H2: Why choose ABE Education?
    H3: Nationally recognised training with Blue Dog Training (RTO 31193)
    H3: What our students say
```

### Content formatting rules

- 2–4 sentences per paragraph
- Numbered lists for procedures (5–8 steps), tables for comparisons, bullets for pros/cons
- Entity names in first 100 words and headers
- Content within last 2 years (85% of AI citations from that window). Use visible update timestamps.
- Lead long-form with 50–70 word TL;DR summary
- **Never place CTAs inside answer blocks** — prevents AI extraction

---

## 3. Meta Titles

> **Canonical numbers live in `meta-framework.md`.** The length, keyword-position, separator, and rewrite-rate figures below mirror that file — edit them there first. This section keeps the ABE-specific application (price-in-title use, brand-name rewrite risk) that isn't duplicated elsewhere.

### Core rules

- Length: 51–60 characters (sweet spot 51–55, lowest rewrite rate ~40%)
- Front-load primary keyword within first 40–45 characters (the "mobile-safe zone")
- Use dashes (–) not pipes (|) — pipes rewritten 41% vs dashes 19.7%
- Avoid square brackets (stripped 32.9% of the time; parentheses are safer)
- Match meta title to H1 in meaning — single most effective anti-rewrite technique
- Include current year for freshness signal
- Include numbers ("7 Steps to…") — prevent rewrites, improve CTR
- Never keyword-stuff ("White Card | White Card Course | White Card Training Tasmania" triggers rewrites)

### How Google uses the title tag

Google uses the `<title>` element ~87% of the time (up from 80% after system refinements). In the remaining cases, it draws from the H1, other headings, prominent visible text, or OpenGraph tags. In 63% of modifications, Google removes the brand name entirely — a particular risk for ABE Education, which relies on brand recognition for trust. Writing one continuous sentence rather than segmented sections reduces this risk.

### Rewrite rates by length

| Length | Rewrite rate |
|---|---|
| <5 chars | ~96% |
| 51–55 chars (sweet spot) | ~40% |
| >70 chars | ~100% |

Titles of 40–60 characters achieve ~8.9% higher CTR (Backlinko, 5 million results).

### Price in titles

Including price in titles can be a powerful differentiator in competitive education markets. Real-world Australian White Card SERP analysis found titles like "White Card Course Tasmania | Fee Just $89.99" ranking in top positions. The price pre-qualifies traffic and reduces bounce rates. Use when ABE's pricing is competitive.

### Special characters

Checkmarks (✓) and stars (★) can improve visual distinction in SERPs, but overuse looks unprofessional. A single checkmark is defensible; a row of emojis is not. Numerical emojis have been shown to hurt performance — avoid them.

### Title formulas by page type

| Page type | Formula | ABE Example |
|---|---|---|
| Course detail | Course Name + Location — Brand | White Card Training Tasmania — ABE Education |
| Course + USP | Course Name + Location — USP — Brand | White Card Tasmania Online — 6-Hour Course — ABE Education |
| Course + Price | Course Name + Location — Price — Brand | White Card Tasmania — $77.37 Online Course — ABE Education |
| Category/landing | Broad keyword + Location + Year | Construction Training Courses Tasmania 2026 |
| Blog/guide | "How to" or question format | How to Get Your White Card in Tasmania — 2026 Guide |
| Location-specific | Service + Location (NOT Location + Service) | White Card Training Hobart — ABE Education |
| Homepage | Brand first | ABE Education — Online Construction Training Australia |

### Effective modifiers (ranked for education)

1. "Online" — signals delivery mode, high search volume
2. Location names (city or state) — critical for local search intent
3. Current year ("2026") — signals freshness
4. "Accredited" / "Nationally Recognised" — trust signal for Australian VET
5. "Certified" / "Certificate" — signals outcome, matches transactional intent
6. "Free" — only when genuinely applicable

### Mistakes to avoid

| ❌ Mistake | Why |
|---|---|
| Brand name first | Only acceptable for homepage or very high-recognition brands (TAFE). ABE should go last. |
| Unit codes without common names | Use "White Card (CPCWHS1001)" not just "CPCWHS1001" |
| Duplicate titles across location pages | Each state page must have a unique title |
| Generic titles | "Course Details — ABE Training" provides no keyword signals |
| Missing location on location-specific pages | "White Card Training Online" loses to "White Card Training Tasmania Online" |
| Intent mismatch | Don't use informational titles for transactional pages |
| Keyword stuffing | "White Card — White Card Course — White Card Training Tasmania" triggers rewrites |
| Using pipes (|) | Rewritten 41% of the time; use dashes (–) instead |
| Exceeding 60 characters | Titles over 70 chars are rewritten ~100% of the time |

---

## 4. Meta Descriptions

### Core rules

- Not a direct ranking factor, but pages with meta descriptions receive 5.8% more clicks
- Length: 150–160 chars total. Front-load the core message within first 120 chars (mobile safe zone — mobile shows only ~110–120 chars)
- Google rewrites 62–71% of meta descriptions — write them accurately and they still set the tone
- Include target keywords naturally — Google bolds matching keywords in snippets, improving CTR
- Unique per page. Duplicate descriptions trigger rewrites.
- Never keyword-stuff — this triggers rewrites
- High semantic relevance directly affects AI Overview citation probability (SE Ranking 2025: low-relevance descriptions averaged only 4.1 citations vs substantially more for high-relevance)
- Readability: Flesch-Kincaid Grade 6–8

### Formula by page type

| Page type | Pattern | ABE Example |
|---|---|---|
| Course detail | Course + location. Duration + mode. Outcome. Trust signal. CTA + price. | White Card Tasmania. 6-hour online course with live assessment. Get your construction induction card — valid in all states. RTO 31193. Start now — $77.37. |
| Category | Explore [X]+ [category] courses [location]. Qualification levels. Differentiator. CTA. | Explore construction training courses in Tasmania. White Card, Owner Builder, and CPD. Nationally recognised. Browse courses. |
| Blog/guide | Brief direct answer to query. What the guide covers. Read more. | A White Card costs $77.37 in Tasmania ($64 training + $13.37 government fee). This guide explains what's included and how to enrol. |
| Location page | Who we serve + location. Course types. Key trust signal. CTA. | Online construction training for Hobart and regional Tasmania. White Card, Owner Builder, Asbestos. RTO 31193 partnership. Enrol today. |

### Trust signals to include in descriptions

Pick 1–2 per description (don't cram all of them):

| Signal | Example phrasing |
|---|---|
| Student volume | "50,000+ trained" |
| Pass rate | "98% pass rate" |
| Rating | "Rated 4.8/5 by 7,000+ students" |
| Compliance | "Delivered by Blue Dog Training (RTO 31193)" |
| Government approval | "CBOS Tasmania approved" (Owner Builder only) |
| Price | "$77.37 total" — pre-qualifies traffic, reduces bounce |
| Speed | "Certificate next business day" |

### CTA options for descriptions

| CTA | Best for |
|---|---|
| "Enrol Now" | Transactional course pages (strongest) |
| "Book Your Spot" | Creates scarcity |
| "Get Certified" / "Get Your White Card" | Outcome-focused, ideal for vocational courses |
| "Start Learning Today" | Emphasises immediacy for online delivery |
| "Compare Courses" | Lower-commitment CTA for category pages |

### Worked examples — ABE pages

**White Card Tasmania (course detail):**
```
Title: White Card Tasmania Online — 6-Hour Course — ABE Education  [56 chars]
H1:    White Card Tasmania Online — CPCWHS1001 6-Hour Course       [53 chars]
Desc:  White Card Tasmania. 6-hour online course with live assessment. Get your construction induction card — valid in all states. RTO 31193. Start now — $77.37.  [154 chars]
```

**Owner Builder TAS (course detail):**
```
Title: TAS Owner Builder Course — CBOS Approved Online — ABE Education  [60 chars — at limit]
H1:    Tasmania Owner Builder Course — CBOS Approved Online Training     [58 chars]
Desc:  Tasmania Owner Builder course. CBOS-approved online training for your permit application. Covers legal obligations, insurance, and building standards. Enrol — $XX.  [157 chars]
```

**CPD Building TAS (course detail):**
```
Title: Building CPD Tasmania — CBOS Approved Online — ABE Education  [55 chars]
H1:    Building CPD Training Tasmania — CBOS Approved Courses           [53 chars]
Desc:  CBOS-approved building CPD courses for Tasmania. Meet your annual CPD requirements online. Certificate on completion. Rated 4.8/5 by 7,000+ students. Browse courses.  [160 chars]
```

**White Card Hub (category):**
```
Title: White Card Training Online — All Australian States — ABE Education  [62 chars — slightly over, trim brand]
H1:    White Card Training Online — All Australian States                   [50 chars]
Desc:  Get your White Card online with ABE Education. CPCWHS1001 construction induction training valid in WA, TAS, QLD, NSW, and ACT. Delivered by ABE's RTO partners.  [156 chars]
```

---

## 5. CTAs

### Placement

- Single CTA goal converts 32% better than competing CTAs
- Repeat at 2–3 positions: hero, mid-page after social proof, end of page
- 73% visibility above fold vs 44% below
- Sticky/floating CTAs convert 27% more on mobile
- Space CTAs every 500–700 words in long-form
- After FAQ blocks (high-intent users)

### Copy rules

- First-person wins: "Start my free trial" → 90% improvement
- 2–5 words, benefit-driven: "Get My Free Guide" > "Submit"
- Be specific: "Book Your White Card Course" > "Enrol Now" > "Submit"
- Specific CTAs increase conversions 161%

### Design rules

- High contrast (50% visibility improvement)
- ABE accent colour: Heritage Maroon #800000 for primary CTAs (10.95:1 contrast with white — passes AA/AAA)
- WCAG 4.5:1 contrast ratio minimum
- Trust badges near CTAs: +7–12% conversion
- Testimonials adjacent to CTAs: +34% conversion

### Mobile CTA rules

- 48–60px height, full-width on mobile
- 48×48px minimum tap target (44×44px = 3× error rate)
- 24px minimum spacing between interactive elements
- 16px minimum font size (prevents iOS auto-zoom)
- Sticky bottom bars preferred (natural thumb zone)
- `env(safe-area-inset-bottom)` padding for iPhone

### AI era CTA strategy

- Assume visitors are pre-qualified (AI answered basic questions)
- Offer deeper value: consultations, tools, gated resources
- 69% of transactional searches in AI Mode still click through
- Cited brands earn 35% more organic clicks, 91% more paid clicks

---

## 6. Image Alt Text

### Core rules

- Always include alt attribute on every `<img>`
- Never start with "Image of…" or "Photo of…"
- Describe what is depicted + why it matters + relevant qualification/location
- No keyword stuffing
- Unique alt text per image
- Decorative images: `alt=""` (empty)
- Do not duplicate surrounding caption text
- Length: 80–125 characters. End with full stop.

### Formula for RTO course photography

Who is shown + what they are doing + qualification name + location context.

### Alt text by image type

| Type | Approach |
|---|---|
| Course hero | Activity + qualification + location |
| Instructor photo | Name + role + context |
| Certificate/badge | Reproduce visible text + RTO code |
| NRT logo | "Nationally Recognised Training (NRT) logo for Australian vocational qualifications." |
| Infographic | Brief summary + "Full data table below" |
| Decorative | `alt=""` always |
| Hero with text overlay | Background can use `alt=""` if info is in HTML |

### Australian English in alt text

organisation, centre, recognised, enrolment — always Australian spelling.

---

## 7. Schema Markup

### Priority order

1. EducationalOrganization + WebSite + SiteNavigationElement (@graph, homepage)
2. BreadcrumbList (every page)
3. Course (every course page)
4. FAQPage (every course page, 3–5 questions minimum)
5. ItemList (catalogue/listing pages)
6. Person (instructor/author pages)
7. ImageObject (course images, accreditation badges)

### ABE-specific schema rules

- ABE = EducationalOrganization (correct)
- hasCredential with RTO = on Blue Dog Training entity, NEVER on ABE
- AggregateRating on Course entities, NOT on Organization (penalised since 2019)
- Price in schema must match on-page price exactly
- FAQ schema: questions as visible H3s matching schema `name` exactly; answers 30–80 words
- No CTAs inside FAQ answer blocks
- All JSON-LD in initial HTML `<head>` (not JavaScript-loaded)

### Key stats

- Pages with schema: 3× more likely in AI Overviews
- FAQPage markup: 3.2× AI citation rate
- AggregateRating: 20–35% CTR improvement
- 81% of AI-cited pages include schema
- Only 12.4% of websites implement structured data
- 71% of AU education sites lack schema

---

## 8. AI Overview Optimisation

- AI Overviews: 2 billion monthly users, ~16% of queries
- 92.36% of citations from top 10 organic pages
- 78% of AI responses use list-based formatting
- 85% of citations from content published in last 2 years
- Multimodal (text + images + video + schema): 156% higher citation rate; 317% with full integration
- Being cited: +80% CTR vs standard organic, +35% organic clicks, +91% paid clicks
- Organic CTR drops 61% when AI Overviews appear (for uncited pages)
- Google's official guidance — *Optimizing your website for generative AI features on Google Search* (developers.google.com/search/docs/fundamentals/ai-optimization-guide, 15 May 2026): AEO and GEO are simply SEO; `llms.txt` is not used by Google; content does not need to be chunked into small pieces. The answer-capsule pattern remains useful for clarity and featured snippets, but treat "120–180 words between headings" as an industry heuristic, not a Google requirement.

### Structural rules

- Answer capsule pattern (question H2 → 40–60 word answer)
- Best content in first 30% of page
- 120–180 words between headings
- 2–4 sentence paragraphs
- Server-side rendered content (AI crawlers can't render JS)
- Flesch-Kincaid Grade 6–8 readability

---

## 9. E-E-A-T Signals

- **Experience:** Original photography with descriptive alt text
- **Expertise:** Technically precise content, unit codes, regulatory references, named expert reviews
- **Authoritativeness:** Accreditation badges described properly, training.gov.au links, state regulator links
- **Trustworthiness:** WCAG compliance, proper alt text, semantic HTML, NAP consistency

Named expert attribution: dedicated author page + Person schema + sameAs to LinkedIn.

---

## 10. ABE-Specific Rules

- ABE is NOT an RTO — never claim RTO status anywhere
- Required attribution: "Delivered in partnership with Blue Dog Training (RTO 31193)"
- Disclaimer in: course page section 13, under enrolment buttons, footer, confirmation pages, emails
- .edu.au domain: ~90% belong to official educational institutions — protect this trust
- State-specific: unique titles, H1s, localised content per state
- Service + Location order: "White Card Training WA" not "WA White Card Training"
- WorkSafe Tasmania = White Card; CBOS Tasmania = Owner Builder permits only

---

## 11. Common Mistakes

1. Claiming RTO status in schema or content
2. Using deprecated Course Info schema (June 2025)
3. Loading schema via JavaScript
4. Keyword-stuffing footer text
5. Duplicate H1s across course pages
6. Inconsistent breadcrumbs (visible vs JSON-LD)
7. AggregateRating on Organization (not Course)
8. Separate desktop/mobile navigation HTML
9. Content behind JavaScript tabs/accordions
10. Missing price/currency in Course Offer schema
11. CTAs inside answer blocks or FAQ answers
12. Keyword-stuffing alt text on decorative images
13. Misattributing government authorities (WorkSafe vs CBOS)
14. Starting alt text with "Image of…"
15. Pipes (|) in meta titles

---

*Condensed from ABE Education SEO Content Reference 2026 v1.1 (March 2026)*
