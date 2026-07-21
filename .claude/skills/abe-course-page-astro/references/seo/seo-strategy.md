# 2026 SEO Strategy: Schema, Structured Data & Technical Implementation
**Condensed from v2.1 — all schema examples, rules, and implementation details preserved. Evidence paragraphs removed.**
**Full document available from user on request.**

---

## Table of Contents

1. Semantic HTML structure
2. Homepage @graph schema
3. Course page schema
4. FAQ schema
5. BreadcrumbList schema
6. ImageObject schema
7. Person schema
8. VideoObject schema
9. Bundle/Program schema
10. Australian RTO identifiers
11. Validation workflow
12. LearnWorlds implementation
13. Core Web Vitals
14. Deprecation timeline
15. Implementation roadmap

---

## 1. Semantic HTML Structure

```html
<header>
  <a href="#main" class="skip-link">Skip to main content</a>
  <a href="/" aria-label="ABE Education Home">
    <img src="/images/abe-education-logo.svg"
         alt="ABE Education – Online Construction Training Courses Australia"
         width="200" height="60" loading="eager" fetchpriority="high" />
  </a>
  <nav aria-label="Primary">...</nav>
</header>
<main id="main">
  <nav class="breadcrumb" aria-label="Breadcrumb">...</nav>
  <h1>...</h1>
</main>
<footer><nav aria-label="Footer">...</nav></footer>
```

Rules:
- One `<nav>` for desktop and mobile (CSS visibility only)
- H1 inside `<main>`, not `<header>`
- Skip-to-content link (WCAG 2.2)
- `aria-label` on navs (without word "navigation")
- `aria-current="page"` on active link
- Explicit `width`/`height` on logo (prevents CLS)

---

## 2. Homepage @graph Schema

Place via LearnWorlds global "Before `</head>`" slot. Combines WebSite + EducationalOrganization + SiteNavigationElement.

**Critical: the RTO `hasCredential` is placed on the RTO partner's own node, NEVER on ABE.**

**Corrected 20 July 2026 — `parentOrganization` removed.** Blue Dog Training is not ABE's parent company; the property asserted corporate ownership of ABE by an RTO. **Full explanation and the replacement pattern live in `schema-implementation-guide.md` §3** — do not restate them here. Summary: no org-level hierarchy on ABE's node, each RTO partner gets its own `Organization` node, and the relationship is expressed only at course level via `Course.provider`. Still a live-site issue wherever the @graph is deployed.

Key entities:
- `WebSite` with `@id: ".../#website"`
- `EducationalOrganization` with `@id: ".../#organization"` — ABE Education
- RTO partner `Organization` nodes — Blue Dog Training (31193), AlertForce (91826), Upskill Institute (45708), each with its own `hasCredential` and `recognizedBy` (ASQA), referenced from `Course.provider`. **Never linked to ABE by `parentOrganization` or `subOrganization`.**
- `SiteNavigationElement` via `ItemList`

@graph rules:
- Keep blocks under 50KB
- Hash-fragment `@id` values are graph node IDs only (don't need to resolve)
- One @graph per page; reference via `@id` on inner pages
- JSON-LD in `<head>`, never JavaScript-loaded

Inner page reference pattern:
```json
{
  "@type": "WebPage",
  "isPartOf": {"@id": "https://abeeducation.edu.au/#website"},
  "publisher": {"@id": "https://abeeducation.edu.au/#organization"}
}
```

---

## 3. Course Page Schema

Required on every course page: Course + CourseInstance + Offer + EducationalOccupationalCredential + BreadcrumbList + FAQPage.

Required Course properties: `name`, `description`, `courseCode`, `provider` (@id ref to ABE), `offers` (price in AUD, must match on-page), `hasCourseInstance` (courseMode: online, courseWorkload), `educationalCredentialAwarded`, `areaServed`.

AggregateRating rules:
- Place on Course, NOT Organization (penalised since 2019)
- Values must match visible on-page reviews exactly
- Include both `ratingCount` and `reviewCount` (different properties)
- Reviews must be genuine

Course listing pages: `ItemList` + `ListItem` wrapping `Course` objects. Minimum 3 courses.

---

## 4. FAQ Schema

- Structure FAQ questions as visible H3 headings matching schema `name` exactly
- Answers: 30–80 words
- No CTAs inside FAQ answer blocks
- Pages with FAQPage: 3.2× AI Overview citation rate
- FAQ schema kept supported (June 2025 deprecations); value = AI citation fuel

---

## 5. BreadcrumbList Schema

- Per-page JSON-LD
- Final item can omit `item` URL
- Absolute URLs always
- 3–5 levels deep
- Visual breadcrumbs below nav, above H1
- One case: 40% CTR drop when accidentally removed

---

## 6. ImageObject Schema

Add to Course entities for hero images and accreditation badges.

```json
"image": {
  "@type": "ImageObject",
  "contentUrl": "https://abeeducation.edu.au/images/...",
  "caption": "Description echoing/expanding alt text.",
  "width": 1200, "height": 630,
  "inLanguage": "en-AU"
}
```

Rules:
- `caption` echoes or expands HTML alt text (never contradicts)
- All image URLs must be crawlable
- Use `inLanguage: "en-AU"`
- Multimodal + schema = up to 317% more AI citations

---

## 7. Person Schema

For expert/author pages (e.g., Warwick Smith).

Required: `name`, `jobTitle`, `worksFor`, `hasCredential`, `knowsAbout`, `sameAs` (LinkedIn).

Wrap in `ProfilePage` on dedicated author pages. Entity loop: LinkedIn ↔ organisation ↔ author page ↔ course page.

70.4% of ChatGPT-cited sources include Person schema.

---

## 8. VideoObject Schema

For course preview videos. Only 18% of organisations use it despite 72.8% of first-page results having structured data.

Required: `name`, `description`, `thumbnailUrl`, `uploadDate`, `duration`, `contentUrl`, `publisher` (@id ref).

Self-hosted videos capture more SEO benefit than YouTube embeds.

---

## 9. Bundle/Program Schema

**EducationalOccupationalProgram** for course bundles:
- `timeToComplete`, `occupationalCategory`, `programPrerequisites`
- `hasCourse` linking to individual Course entities
- `offers` with AUD pricing

**LearningResource** for guides/blog posts:
- `learningResourceType`, `educationalLevel`, `teaches`
- `author` (@id ref to Person), `publisher` (@id ref to Org)

Neither generates rich results currently; value is AI citation context.

---

## 10. Australian RTO Identifiers

Use `PropertyValue` pattern for RTO codes:
```json
"identifier": [{
  "@type": "PropertyValue",
  "name": "RTO Code",
  "value": "31193",
  "url": "https://training.gov.au/Organisation/Details/31193"
}]
```

Course codes: `courseCode: "CPCWHS1001"`
AQF levels: `educationalLevel: "AQF Level 3 - Certificate III"`
All qualifications: `validIn: {"@type": "Country", "name": "Australia"}`

No AU government body mandates schema. 71% adoption gap = competitive opportunity.

---

## 11. Validation Workflow

Two-tool approach:
1. **Schema Markup Validator** (validator.schema.org) — structural Schema.org compliance
2. **Google Rich Results Test** (search.google.com/test/rich-results) — Google-specific eligibility + JS rendering

Ongoing: Google Search Console Enhancement Reports.
Audit tools: Sitebulb, Screaming Frog for cross-page validation.

---

## 12. LearnWorlds Implementation

- **Global "Before `</head>`":** Site-wide @graph (Org + WebSite + Nav)
- **Local "Before `</head>`" per course:** Course + BreadcrumbList + FAQPage
- LW does NOT generate Course schema natively — all manual
- JSON-LD in `<script type="application/ld+json">` — no external dependencies
- Schema in logged-out tab (Google sees logged-out only)

---

## 13. Core Web Vitals

| Metric | Target | Risk | Fix |
|---|---|---|---|
| LCP | ≤2.5s | Logo = LCP element on mobile | `fetchpriority="high"`, WebP/AVIF, explicit dims |
| CLS | ≤0.1 | Nav loading late, images no dims | width/height on images, min-height on nav |
| INP | ≤200ms | Hamburger animation, heavy JS | CSS-based toggle, defer non-critical JS |

Only 48% of mobile pages pass all three — competitive differentiator.

---

## 14. Deprecation Timeline (2023–2026)

| Deprecated | Date | ABE Impact |
|---|---|---|
| HowTo | Sep 2023 | Fully deprecated |
| FAQ rich results | Aug 2023 → May 2026 | restricted to government/health sites **Aug 2023**, then **fully deprecated May 2026** (Rich Results Test support removed June 2026; Search Console API Aug 2026). `FAQPage` schema remains valid and is retained for AI visibility — see `freshness-check.md` for the canonical record. |
| Sitelinks Search Box | Nov 2024 | Don't implement SearchAction |
| Course Info | Jun 2025 | Use Course List instead |
| Learning Video | Jun 2025 | VideoObject still supported |
| Practice Problem | Nov 2025 | No impact |
| Dataset | Jan 2026 | No impact |

**Still supported:** Course List, AggregateRating, VideoObject, BreadcrumbList, FAQPage, Education Q&A Carousel.

---

## 15. Implementation Roadmap

### Tier 1 — Immediate (Weeks 1–3)
1. @graph schema via global head injection
2. Course + CourseInstance + Offer per course page
3. ItemList Course List on catalogue pages (min 3 courses)
4. AggregateRating on course pages (20–35% CTR improvement)
5. BreadcrumbList on all pages
6. Audit/fix H1 tags (unique, 50–60 chars, aligned with title)
7. Fix semantic HTML (header/nav/main/footer, skip link, aria-labels)

### Tier 2 — Strategic (Weeks 4–6)
8. FAQPage on every course page (3.2× AI citation rate)
9. Answer capsule pattern on all headings
10. Person schema for experts (Warwick Smith priority)
11. VideoObject when video available
12. ImageObject on hero images and badges
13. Footer restructure (4-column, RTO disclosure, training.gov.au link)
14. NAP consistency audit
15. ContactPoint in Org schema

### Tier 3 — Structural (Weeks 7–10)
16. Full @graph entity architecture site-wide
17. EducationalOccupationalProgram for bundles
18. Core Web Vitals audit
19. Server-side rendering verification
20. ~~llms.txt file~~ — **struck 20 July 2026. Contradicted the mythbusting rule in `SKILL.md`.** Google Search does not use `llms.txt` and ignores it; creating one neither helps nor harms rankings. It survived here as a leftover roadmap item while the rule elsewhere said not to build it. Keep one only if a non-Google service consumes it — never as an SEO deliverable.
21. Dual validation workflow
22. Accreditation & Partnerships page
23. Footer legal links (ABN, Privacy, Terms, Refund, Complaints)

---

*Condensed from 2026 SEO Strategy for ABE Education v2.1 (March 2026)*
