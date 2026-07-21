# Page Type Engine
**Auto-detect page type → select URL, breadcrumb, content structure, schema, and word count**
**Sources:** 01-navigation-architecture, 02-breadcrumb-patterns, 03-page-type-specifications, 04-url-structure-patterns

---

## Contents

1. Page Type Taxonomy (13 Types)
2. URL Rules
3. Content Structure Templates
4. Breadcrumb Technical Requirements
5. Navigation Context
6. Internal Link Map by Page Type

## 1. Page Type Taxonomy (13 Types)

### Hub Pages (8 types)

| Page type | URL pattern | Word count | Schema | Breadcrumb |
|---|---|---|---|---|
| White Card Hub | `/white-card` | 800–1,200 | ItemList + BreadcrumbList | Home › White Card Training |
| Owner Builder Hub | `/owner-builder-courses` | 800–1,200 | ItemList + BreadcrumbList | Home › Owner Builder Training |
| CPD Main Hub | `/cpd` | 1,200–1,500 | ItemList + BreadcrumbList | Home › CPD Courses |
| CPD State Hub | `/cpd-{state}` | 1,000–1,500 | ItemList + Organization + BreadcrumbList | Home › CPD Courses › {State} CPD |
| CPD Trade Hub | `/cpd-{trade}` | 800–1,200 | ItemList + BreadcrumbList | Home › CPD Courses › {Trade} CPD |
| Bundle Main Hub | `/cpd-bundles` | 1,000–1,500 | ItemList + BreadcrumbList | Home › CPD Bundles |
| Bundle State Hub | `/cpd-bundles/{state}` | 1,200–1,500 | ItemList + Organization + BreadcrumbList | Home › CPD Bundles › {State} Bundles |
| Insurance Hub | `/insurance` | 800–1,200 | ItemList + BreadcrumbList | Home › Owner Builder Training › Insurance Services |

### Course Pages (3 types)

| Page type | URL pattern | Word count | Schema | Breadcrumb |
|---|---|---|---|---|
| White Card State | `/white-card-{state}` | 1,500–2,000 | Course + Credential + AggregateRating + FAQPage + BreadcrumbList | Home › White Card Training › {State} White Card |
| Owner Builder State | `/{state}-owner-builder-course` | 1,500–2,000 | Course + Credential + AggregateRating + FAQPage + BreadcrumbList | Home › Owner Builder Training › {State} Owner Builder |
| Individual CPD | `/cpd-{trade}-{state}` | 1,200–1,800 | Course + Credential + AggregateRating + FAQPage + BreadcrumbList | Home › CPD Courses › {Trade} CPD › {State} {Trade} CPD |

### Bundle Pages (1 type)

| Page type | URL pattern | Word count | Schema | Breadcrumb |
|---|---|---|---|---|
| Bundle Page | `/cpd-bundles/{state}-{trade}-{points}-points` | 2,000–2,500 | Product + ItemList + AggregateRating + FAQPage + BreadcrumbList | Home › CPD Bundles › {State} Bundles › {Bundle Name} |

### Service Pages (1 type)

| Page type | URL pattern | Word count | Schema | Breadcrumb |
|---|---|---|---|---|
| Insurance Page | `/insurance/{type}` | 1,000–1,500 | Service + BreadcrumbList | Home › Owner Builder Training › Insurance Services › {Type} |

### Support Pages (10 types)

| Page type | URL | Word count | Schema |
|---|---|---|---|
| Course Catalogue | `/courses` | 300–500 | ItemList + Carousel + BreadcrumbList |
| About Us | `/about` | 800–1,200 | Organization + BreadcrumbList |
| Our Experts | `/experts` | 800–1,200 | Person (multiple) + BreadcrumbList |
| Accreditation | `/accreditation` | 600–800 | EducationalOrganization + BreadcrumbList |
| Student Reviews | `/reviews` | 500–800 | AggregateRating + BreadcrumbList |
| Contact Us | `/contact` | 300–500 | ContactPoint + BreadcrumbList |
| FAQ | `/faq` | 3,000–4,000 | FAQPage + BreadcrumbList |
| Help Centre | `/help` | 500–1,000 | BreadcrumbList |
| Legal Pages | `/terms`, `/privacy`, `/refunds` | 1,000–2,000 | BreadcrumbList only |
| Expert Profile | `/experts/{name}` | 600–1,000 | ProfilePage + Person + BreadcrumbList |

---

## 2. URL Rules

- Hyphens (-) to separate words, never underscores
- All lowercase
- No special characters (%, &, =, ?)
- Under 100 characters
- **No trailing slash.** LearnWorlds generates URLs without trailing slashes and the sitemap matches. All URLs use the no-slash form: `/contact` not `/contact`. Canonical tags, sitemap entries, schema URLs, breadcrumb `item` URLs, and internal links must all use the same no-slash form.
- State codes lowercase in URLs, uppercase in content
- Singular forms ("course" not "courses" except catalogue)
- Primary keyword included
- State/location first for geographic targeting

### Why these rules, and what they don't cover (added 20 July 2026, from Google's URL structure guidance)

- **Lowercase is a server rule, not just an authoring convention.** Google's URL handling is **case sensitive** —
  `/apple` and `/APPLE` are two distinct URLs with their own content. Authoring in lowercase isn't enough: if the
  server resolves both, Google may crawl both and split signals. Normalise case at the edge (Cloudflare redirect to
  the lowercase form), the same way `trailingSlash: 'never'` is enforced rather than assumed.
- **Tracking parameters are the live duplicate-URL risk.** The "no special characters" rule covers authored URLs,
  but ABE's paid traffic arrives on `?gclid=`, `?utm_source=` and similar. Google names referral parameters,
  sorting parameters and session IDs as causes of unnecessary URL proliferation. These must not become indexable
  duplicates — the self-referencing `rel=canonical` on every page is what handles it, so treat that canonical as
  load-bearing rather than boilerplate, and never let a campaign URL into a sitemap or an internal link.
- **Don't use fragments to change content.** Google generally does not support URL fragments as distinct content
  (`example.com/#/potatoes`); use the History API if JavaScript changes what's shown. Fragments as *anchors within
  one page* are fine, which is why hash-fragment schema `@id` values and Google's own all-in-one Course `ItemList`
  example (`/courses#course-name`) are both legitimate — those identify a node or a section, they don't serve
  different content.
- **Use root-relative links, never parent-relative.** A misplaced `../../` link on a page that doesn't return a
  proper 404 can generate infinite bogus URL spaces. Worth checking in Astro components where a relative path may
  resolve differently depending on the route depth it renders at.
- **ABE is not a multi-regional site.** State subdirectories are topical segmentation within one country, not
  geotargeting. Google's multi-regional URL guidance (country domains, `/de/` subdirectories) and `hreflang` do
  **not** apply here — don't reach for them because the site is organised by state.

### State code reference

| State | URL code | Content code | Regulator (White Card) | Regulator (Owner Builder) | Regulator (CPD) |
|---|---|---|---|---|---|
| New South Wales | `nsw` | NSW | SafeWork NSW | Building Commission NSW | Building Commission NSW |
| Queensland | `qld` | QLD | WHSQ | QBCC | QBCC |
| Western Australia | `wa` | WA | WorkSafe WA | LGIRS (Building and Energy) — Form 75 | — |
| Tasmania | `tas` | TAS | WorkSafe Tasmania | CBOS Tasmania | CBOS Tasmania |
| Australian Capital Territory | `act` | ACT | WorkSafe ACT | Access Canberra | Access Canberra |

**Critical:** SafeWork NSW (not "Worksafe"). WHSQ issues QLD White Card as GCIT Card. CBOS handles Owner Builder/CPD in TAS (not White Cards). WHS (not "WH&S").

### Course availability matrix (what ABE actually offers today)

| Course | NSW | QLD | WA | TAS | ACT | RTO Partner |
|---|---|---|---|---|---|---|
| **White Card** | ✅ | ✅ | ✅ | ✅ | ✅ | NSW: Upskill Institute (RTO 45708) · QLD/WA/TAS: Blue Dog Training (RTO 31193) · ACT: AlertForce (RTO 91826) |
| **Owner Builder** | ✅ | ✅ | ✅ | ✅ | ✅ | ABE Education (direct, state-approved) |
| **CPD Building** | ✅ | — | — | ✅ | — | ABE Education (direct) |
| **CPD Plumbing** | — | — | — | ✅ | — | ABE Education (direct) |
| **CPD Electrical** | — | — | — | ✅ | — | ABE Education (direct) |
| **CPD Real Estate** | — | — | ✅ | — | — | ABE Education (direct) |
| **Asbestos Awareness** | — | — | — | — | ✅ | AlertForce (RTO 91826) |
| **Silica Awareness** | — | — | — | — | ✅ | AlertForce (RTO 91826) |

**Rules:**
- ❌ means ABE does not currently offer this course in this state — do not create a landing page
- ✅ means actively sold — landing page should exist
- — means not applicable or not offered
- Check this matrix before creating any new state-specific page

---

## 3. Content Structure Templates

### Template A: Course Landing Page (White Card / Owner Builder / CPD)

```
META BLOCK
  Title: [51–60 chars, keyword in first 40–45, dashes not pipes]
  Description: [150–160 chars, mobile safe zone first 120, outcome CTA]
  Slug: [from URL pattern]

H1: [Course Name] — [Qualifier] [50–60 chars]
[Breadcrumb bar contains: Reviewed by [Name] · DD Mon YYYY — right-aligned]

SECTION 1: What is [course] and who needs one?
  📌 Answer capsule (40–60 words)
  📖 Body (expanded detail)
  H3: [Specific sub-question]

SECTION 2: How does the [course] work?
  H3: Step 1 — [action]
  H3: Step 2 — [action]
  H3: Step 3 — [action]

SECTION 3: What will you learn?
  📋 List: learning outcomes (max 7 items)
  📊 Table: units of competency (if applicable)

SECTION 4: Course requirements and eligibility
  📌 Answer capsule
  📖 Body

SECTION 5: How much does the course cost?
  💰 Pricing table (training fee + government fee if applicable)
  ⚖️ Legal: fee disclaimers

SECTION 6: Frequently asked questions
  H3: [Question 1] → 30–80 word answer 🚫 No CTA
  H3: [Question 2] → 30–80 word answer 🚫 No CTA
  [6–10 Q&A pairs]
  If ASQA course: 3 mandatory questions (Who delivers? Who to contact? How to verify?)

SECTION 7: Why choose ABE Education?
  Trust signals (from badge inventory for this page type)
  Topic cards: differentiators (Access Canberra approved, 100% online, real-world content, etc.)
  🗣️ CTA with outcome-focused language
  NOTE: Expert attribution has moved to Section 8 (Content Development & Review)

SECTION 8: How is the course content developed and reviewed?
  📌 Answer capsule: explain the two-stage process (expert development + independent compliance review)
  📖 Body: name the stages and what each verifies against (legislation, building codes, RTO Standards)
  👤 Expert card: Course Developer — name, title, credentials, date
  👤 Expert card: Content Reviewer — name, title, credentials, date
  ⚓ Section ID: content-review (anchor target for breadcrumb reviewer link)
  NOTE: This replaces the inline 🎓 Expert attribution from Section 7.
        Section 7 keeps trust signals and CTA. Section 8 owns the E-E-A-T expert evidence.

SCHEMA BLOCK
  [JSON-LD per Page Identity Card]

BREADCRUMB
  [HTML + schema per Page Identity Card]
```

### Template B: Hub Page (White Card / Owner Builder / CPD / Bundle)

```
META BLOCK

H1: [Hub topic] [50–60 chars]
[Breadcrumb bar contains freshness signal — see quality-gates.md Section 6.2 for variant]

SECTION 1: Introduction
  📌 Answer capsule (40–60 words)
  📖 Body (1–2 paragraphs)

SECTION 2: Choose Your [State/Trade/Bundle]
  [Card grid linking to child pages]
  Each card: Name, Price, Key benefit, [Learn More] link

SECTION 3: Why Choose ABE Education?
  📋 List: 4–6 differentiators (max 7)
  Trust bar (page-type appropriate)

SECTION 4: [Comparison table if applicable]
  📊 Table: state-by-state or bundle-by-bundle

SECTION 5: Frequently Asked Questions
  [5–8 Q&A pairs, 30–80 words each]

SCHEMA: ItemList + BreadcrumbList
```

### Template C: Bundle Page

```
META BLOCK

H1: [Bundle Name] — [Points] CPD Points [50–60 chars]
[Breadcrumb bar contains freshness signal — see quality-gates.md Section 6.2 for variant]

SECTION 1: What's included in this bundle?
  📌 Answer capsule
  📋 List: included courses with individual point values
  💰 Pricing: bundle price vs individual total (savings highlighted)

SECTION 2: Who needs this bundle?
  📌 Answer capsule
  📖 Body: licence type, renewal cycle, regulator

SECTION 3: How the bundle works
  H3: Step 1–3 process

SECTION 4: Individual courses in this bundle
  [Brief description of each course, linking to individual pages]

SECTION 5: FAQ
  [5–8 Q&A pairs]

SECTION 6: CTA
  🗣️ Outcome-focused

SCHEMA: Product + ItemList + AggregateRating + FAQPage + BreadcrumbList
```

### Template D: Expert Profile Page

```
META BLOCK

H1: [Name] — [Role/Title]
[Breadcrumb bar contains freshness signal — see quality-gates.md Section 6.2 for variant]

SECTION 1: About [Name]
  📖 Body: qualifications, experience, expertise areas
  🎓 Expert credentials

SECTION 2: Courses [Name] contributes to
  📋 List: linked course names

SECTION 3: [Name]'s approach to training
  📖 Body: teaching philosophy, industry experience

SCHEMA: ProfilePage + Person + BreadcrumbList
```

---

## 4. Breadcrumb Technical Requirements

### Visual format
```
Home › Level 2 › Level 3 › Current Page
 ↑        ↑         ↑          ↑
Link    Link      Link     Not clickable
```

### HTML structure
```html
<nav aria-label="Breadcrumb" class="breadcrumb-container">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/">Home</a></li>
    <li class="breadcrumb-item"><a href="/white-card">White Card Training</a></li>
    <li class="breadcrumb-item active" aria-current="page">NSW White Card</li>
  </ol>
</nav>
```

### Rules
- Separator: `›` (U+203A)
- Font size: 14px
- Link colour: #666; current page: #333
- Current page: not clickable, `aria-current="page"`
- Container: `<nav aria-label="Breadcrumb">`
- Final item in schema omits `item` URL; all others use absolute URLs
- Multi-parent pages: ONE canonical breadcrumb path (trade hub is primary for CPD)
- All URLs use `https://www.abeeducation.edu.au` prefix

---

## 5. Navigation Context

### Header structure (logged-out)
```
[LOGO] ABE Education
[White Card ▼] [Owner Builder ▼] [CPD Courses ▼] [CPD Bundles ▼]
[About ▼] [FAQ]                           [Contact] [Student Login]
```

- Dropdown headers are clickable (go to hub page)
- Arrow/hover opens dropdown menu
- No "Compare All States" links (removed — users need one state, not comparison)
- Owner Builder dropdown includes Project Advisory Pack and Insurance Services below separator

### Internal linking rules

**Direction rules:**
- Spokes link UP to hubs (course → hub)
- Hubs link DOWN to spokes (hub → courses)
- Never link sideways between competing pages at the same level
- Cross-category links only when non-competing (e.g., White Card page → Owner Builder page is fine)

**Anchor text rules:**
- Use descriptive, keyword-rich anchor text — never "click here" or "learn more"
- Vary anchor text across links to the same target (avoid exact-match repetition)
- Include state name in anchor text for state-specific links (e.g., "TAS Building CPD" not just "Building CPD")
- CTA buttons are not internal links for SEO purposes — body text links carry more weight

**Link density:**
- Minimum 2 internal links per page (in body content, not navigation)
- Target 3–5 internal links on course pages (1,500–2,000 words)
- Target 5–8 internal links on hub pages (linking to all children)
- Bundle pages: link to every individual course included in the bundle
- Never exceed 1 internal link per 150 words (avoids over-optimisation signal)

---

## 6. Internal Link Map by Page Type

### White Card Hub (`/white-card`)

| Links to (DOWN) | Anchor text pattern |
|---|---|
| `/white-card-nsw` | "NSW White Card" or "White Card training for New South Wales" |
| `/white-card-qld` | "QLD White Card" |
| `/white-card-wa` | "WA White Card" |
| `/white-card-tas` | "TAS White Card" |
| `/white-card-act` | "ACT White Card" |

| Cross-links (non-competing) | Purpose |
|---|---|
| `/faq` (White Card section) | "See all White Card FAQs" |
| `/accreditation` | "Verify our accreditation" |
| `/experts` | "Meet our experts" |

### White Card State Page (e.g., `/white-card-nsw`)

| Links to (UP) | Anchor text pattern |
|---|---|
| `/white-card` | "View all White Card states" or "White Card training" |

| Cross-links (non-competing) | Purpose |
|---|---|
| `/nsw-owner-builder-course` | "Also need an Owner Builder permit for NSW?" |
| `/faq` | "Frequently asked questions about White Card" |
| `/experts` or `/experts/{name}` | "Meet our experts" |
| `/reviews` | "Read student reviews" |
| `/accreditation` | "Verify Blue Dog Training's registration" |

| ❌ Do NOT link to | Why |
|---|---|
| `/white-card-qld` or other state White Card pages | Sideways link between competing pages |

### Owner Builder Hub (`/owner-builder-courses`)

| Links to (DOWN) | Anchor text pattern |
|---|---|
| `/nsw-owner-builder-course` | "NSW Owner Builder Permit" |
| `/qld-owner-builder-course` | "QLD Owner Builder Course" |
| `/wa-owner-builder-course` | "WA Owner Builder Permit" |
| `/tas-owner-builder-course` | "TAS Owner Builder Permit" |
| `/act-owner-builder-course` | "ACT Owner Builder Course" |
| `/project-advisory` | "Project Advisory Pack" |
| `/insurance` | "Owner Builder Insurance" |

> **Owner Builder URL convention:** State landing pages are **state-first**: `/{state}-owner-builder-course` (matching the URL rule above). All five are self-canonical: `/nsw-owner-builder-course`, `/qld-owner-builder-course`, `/wa-owner-builder-course`, `/tas-owner-builder-course`, `/act-owner-builder-course`. The hub is `/owner-builder-courses`. Legacy alternate: NSW also resolves at `/owner-builder-nsw-course` (still indexed, but the canonical is the state-first form — use `/nsw-owner-builder-course`). The `/course/{state}-owner-builder-education…` LearnWorlds player URLs are separate enrolment pages, not the marketing landing pages governed here.

### Owner Builder State Page (e.g., `/tas-owner-builder-course`)

| Links to (UP) | Anchor text pattern |
|---|---|
| `/owner-builder-courses` | "View all Owner Builder states" |

| Cross-links (non-competing) | Purpose |
|---|---|
| `/white-card-wa` | "Need a White Card for WA construction?" |
| `/insurance` | "Owner Builder insurance options" |
| `/project-advisory` | "Get project advisory support" |
| Relevant gov URL (external) | "LGIRS — WA Owner Builder (Form 75) requirements" |

### CPD Main Hub (`/cpd`)

| Links to (DOWN) | Anchor text pattern |
|---|---|
| `/cpd-nsw`, `/cpd-tas`, `/cpd-wa` | State CPD hubs |
| `/cpd-building`, `/cpd-plumbing`, etc. | Trade CPD hubs |
| `/cpd-bundles` | "Save with CPD bundles" |

### CPD State Hub (e.g., `/cpd-tas`)

| Links to (UP) | Links to (DOWN) |
|---|---|
| `/cpd` — "All CPD courses" | Individual TAS CPD courses |
| | `/cpd-bundles/tas` — "TAS CPD bundles" |

| Cross-links | Purpose |
|---|---|
| `/tas-owner-builder-course` | "TAS Owner Builder training" (if relevant audience) |
| CBOS Tasmania (external) | Regulator reference |

### Individual CPD Course (e.g., `/cpd-building-tas`)

| Links to (UP) | Anchor text pattern |
|---|---|
| `/cpd-building` | "All Building CPD courses" (trade hub — primary parent) |
| `/cpd-tas` | "All TAS CPD courses" (state hub — secondary parent) |

| Cross-links / upsells | Purpose |
|---|---|
| Bundle page (e.g., `/cpd-bundles/tas-building-20-points`) | **Upsell box**: "Save with the TAS Building 20 Point Bundle" |
| Other TAS trade CPD courses | Only if non-competing (e.g., Building page → Plumbing page is OK) |
| `/cpd-bundles` | "View all CPD bundles" |

### Bundle Page (e.g., `/cpd-bundles/tas-building-20-points`)

| Links to (UP) | Anchor text pattern |
|---|---|
| `/cpd-bundles` | "All CPD bundles" |
| `/cpd-bundles/tas` | "TAS CPD bundles" |

| Links to (DOWN/related) | Purpose |
|---|---|
| Each individual course in the bundle | Full detail link per included course |

| Cross-links | Purpose |
|---|---|
| `/cpd-tas` | "View individual TAS CPD courses" |
| CBOS Tasmania (external) | Regulator verification |

### Support Pages

| Page | Key outbound links |
|---|---|
| `/accreditation` | training.gov.au (Blue Dog), CBOS, Access Canberra, ASQA — all external verification |
| `/experts` or `/experts/{name}` | Courses the expert contributes to |
| `/reviews` | External review platform, course pages |
| `/faq` | Relevant course and hub pages from within answers |
| `/contact` | `/faq` ("Check our FAQ first"), `/help` |

### Upsell box pattern (CPD course → bundle)

Every individual CPD course page should include a bundle upsell box:

```
┌─────────────────────────────────────────┐
│ 💡 Save with the [Bundle Name]         │
│                                         │
│ Get all [X] CPD points in one bundle.   │
│ Save $[amount] vs buying individually.  │
│                                         │
│ [View Bundle →]                         │
└─────────────────────────────────────────┘
```

Link target: the relevant bundle page. Anchor text: "View the [Bundle Name]" or "Save with the [State] [Trade] Bundle".
