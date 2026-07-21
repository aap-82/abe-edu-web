# ABE Education: Schema Implementation Guide

**Version:** 1.1
**Date:** 8 April 2026
**Purpose:** Copy-paste JSON-LD reference for every ABE Education page type.

---

## Table of Contents

1. Quick-reference: schema by page type
2. Provider decision tree
3. Global schema (homepage)
4. Template 1: White Card course (RTO-partnered)
5. Template 2: Owner Builder course (state-approved)
6. Template 3: CPD course (state-approved)
6a. Additional schema.org Course properties (optional but recommended)
7. Template 4: Bundle page
7a. Google Course structured data requirements
8. Template 5: Hub/listing page (ItemList)
9. Template 6: Expert profile (Person)
10. Template 7: VideoObject
11. Template 8: Government listing (isRelatedTo)
12. AggregateRating rules (updated with Google review-snippet compliance)
13. BreadcrumbList patterns
14. FAQ content rules
15. Deprecated schema
16. LearnWorlds injection checklist
17. Validation checklist
18. Technical rules summary

---

## 1. Quick-reference: schema by page type

| Page type | Required schema types | Rich result? | AI visibility? |
|---|---|---|---|
| **Homepage** | EducationalOrganization, WebSite, SiteNavigationElement (@graph) | Knowledge Panel (potential) | High — entity foundation |
| **White Card course** | Course, CourseInstance, Offer, Credential, AggregateRating, FAQPage, BreadcrumbList | Course List, star ratings | Very high |
| **Owner Builder course** | Course, CourseInstance, Offer, Credential, AggregateRating, FAQPage, BreadcrumbList | Course List, star ratings | Very high |
| **CPD course** | Course, CourseInstance, Offer, Credential, AggregateRating, FAQPage, BreadcrumbList | Course List, star ratings | Very high |
| **Bundle page** | Product, Offer, ItemList (courses), AggregateRating, FAQPage, BreadcrumbList | Product star ratings | High |
| **Hub page** | ItemList (Course), BreadcrumbList | Course List carousel | Medium |
| **Course catalogue** | ItemList (Course), BreadcrumbList | Course List carousel | Medium |
| **Expert profile** | ProfilePage, Person, BreadcrumbList | Knowledge Panel (potential) | Very high — 70% AI citation |
| **Accreditation page** | EducationalOrganization, BreadcrumbList | None | High — entity authority |
| **Reviews page** | AggregateRating, BreadcrumbList | Star ratings | Medium |
| **FAQ page** | FAQPage, BreadcrumbList | None (rich result deprecated May 2026) | Very high — 3.2x AI lift |
| **Contact page** | ContactPoint (via Org @id), BreadcrumbList | None | Low |
| **Legal pages** | BreadcrumbList only | None | None |

---

## 2. Provider decision tree

```
Is this an ASQA-accredited course (White Card, Asbestos, Silica)?
├── YES → provider = Blue Dog Training (RTO 31193) or AlertForce (RTO 91826)
│         recognizedBy = ASQA
│         credentialCategory = "Statement of Attainment"
│         ASQA disclaimer required on page
│
└── NO → Is this an Owner Builder permit course?
         ├── YES → provider = ABE Education
         │         recognizedBy = state regulator (see lookup table)
         │         credentialCategory = "Certificate of Completion"
         │
         └── NO → This is a CPD course
                   provider = ABE Education
                   recognizedBy = state regulator (see lookup table)
                   credentialCategory = "CPD Points"
```

**Golden rule:** ABE Education is NEVER the RTO. The `hasCredential` with RTO registration lives on Blue Dog Training or AlertForce entities only.

---

## 3. Global schema (homepage — inject via global head slot)

Place via LearnWorlds global "Before </head>" slot (logged-out tab). Establishes ABE entity identity.

Key entities in the @graph:
- `WebSite` with @id `/#website`
- `EducationalOrganization` with @id `/#organization` — ABE Education
- RTO partner `Organization` nodes — Blue Dog Training (31193), AlertForce (91826), Upskill Institute (45708), each with its own `hasCredential` and `recognizedBy` (ASQA), referenced from `Course.provider`. **Never linked to ABE by `parentOrganization` or `subOrganization`.**

**Corrected 20 July 2026 — `parentOrganization` removed. Confirmed with Andrey that Blue Dog Training is not ABE's parent company.**

The original intent was right: the RTO credential must never sit on ABE's node. The mechanism was wrong. `parentOrganization` asserts **corporate ownership** — it told Google that ABE is a subsidiary of an RTO, which is precisely the overclaim `authority-model.md` exists to prevent, and it did so in the most prominent schema block on the site. It was also wrong on its own terms: ABE has **three** RTO partners (Blue Dog 31193, AlertForce 91826, Upskill 45708), so elevating one of them to parent misrepresents the other two as well.

**Correct pattern — no organisation-level hierarchy claim at all:**

- ABE's `EducationalOrganization` node carries **no** `parentOrganization` and **no** `subOrganization`. Do not substitute `subOrganization` — it makes the same ownership claim in reverse.
- Each RTO partner is a **standalone `Organization` node** in the graph with its own `@id`, carrying its own `hasCredential` (the RTO number) and `recognizedBy` (ASQA). The credential still never touches ABE.
- The relationship is expressed **where it actually exists — at course level**, via `Course.provider` referencing the partner's `@id` per the provider decision tree. That is accurate: the RTO provides the course, it does not own the company.
- schema.org has no clean "delivery partner" predicate. Don't reach for `memberOf` or `affiliation` as a substitute — leaving the org-level relationship unstated is correct, because the course-level `provider` already carries it truthfully.

**This is a live-site issue, not just a skill fix.** Wherever this @graph is already deployed via the LearnWorlds global head slot, the published markup is making the ownership claim right now and should be corrected at the source.
- `SiteNavigationElement` via `ItemList`

Critical properties: `contactPoint`, `areaServed` (5 states), `identifier` (PropertyValue for RTO), `sameAs` (social profiles + training.gov.au).

**Organization spec notes (20 Jul 2026).** There are **no required properties** — add what applies. Google recommends placing this on the homepage or a single About page, **not on every page**; ABE's global-head injection is fine because it renders once per site section, but don't duplicate it into page templates. Use the **most specific subtype** — `EducationalOrganization` is correct for ABE.

On identifiers: `vatID` and `naics` are EU/North-American schemes and do **not** apply to an Australian business. The realistic Australian identifier is **`taxID` carrying the ABN**; `iso6523Code` only helps if ABE actually holds a DUNS (`0060:`), GLN (`0088:`) or LEI (`0199:`) — do not invent one. `numberOfEmployees`, `foundingDate`, `legalName` and `alternateName` are all cheap, honest additions.

Full JSON-LD template: see the complete homepage @graph block in the source document. Key placeholders: telephone (+61297985000), address (Summer Hill NSW 2130), social URLs.

---

## 4. Template 1: White Card course (RTO-partnered)

**Applies to:** All White Card state pages. **Provider:** Blue Dog Training (RTO 31193).

Three separate JSON-LD blocks per page:

### Block 1: Course + Instance + Credential + Rating

Key properties and placeholders:
- `name`: "[State] White Card Training Online — CPCWHS1001"
- `courseCode`: "CPCWHS1001"
- `educationalLevel`: "Beginner"
- `teaches`: [hazard identification, PPE, WHS rights, risk control, incident reporting]
- `provider`: Blue Dog Training with PropertyValue identifier (RTO 31193)
- `offers`: price must match on-page exactly, `priceCurrency: "AUD"`
- `hasCourseInstance`: courseMode "online", courseWorkload "PT6H"
- `educationalCredentialAwarded`: Statement of Attainment, validIn Australia, recognizedBy ASQA
- `aggregateRating`: must match visible rating exactly
- `areaServed`: specific state (AdministrativeArea)
- `isPartOf`: @id reference to /#website
- `publisher`: @id reference to /#organization

### Block 2: BreadcrumbList

Path: Home > White Card Training > [State] White Card
Final item omits `item` URL per Google spec. Always absolute URLs.

### Block 3: FAQPage (3-10 Q&A pairs)

Every `name` must exactly match a visible H3 heading. Answers 30-80 words, plain text only, no CTAs.

---

## 5. Template 2: Owner Builder course (state-approved)

**Provider:** ABE Education (direct delivery). **recognizedBy:** state regulator.

Same 3-block structure as White Card, but:
- `provider` = ABE Education (@id reference to /#organization)
- `credentialCategory` = "Certificate of Completion"
- `validIn` = specific state (AdministrativeArea), not country
- `recognizedBy` = state regulator (see lookup table)

### Owner Builder state regulator lookup

| State | Regulator | @type | URL |
|---|---|---|---|
| TAS | CBOS Tasmania | GovernmentOrganization | https://cbos.tas.gov.au/ |
| WA | LGIRS (Department of Local Government, Industry Regulation and Safety) | GovernmentOrganization | https://www.lgirs.wa.gov.au |
| ACT | Access Canberra | GovernmentOrganization | https://www.accesscanberra.act.gov.au/ |
| QLD | QBCC | GovernmentOrganization | https://www.qbcc.qld.gov.au/ |
| NSW | Building Commission NSW | GovernmentOrganization | https://www.nsw.gov.au/departments-and-agencies/building-commission |

---

## 6. Template 3: CPD course (state-approved)

**Provider:** ABE Education. **recognizedBy:** state CPD regulator.

Same structure as Owner Builder, but:
- `credentialCategory` = "CPD Points"
- Name format: "[State] [Trade] CPD — [Points] Points"
- Add `courseCode` if CBOS assigns one

### CPD state regulator lookup

| State | Regulator | URL |
|---|---|---|
| TAS | CBOS Tasmania | https://cbos.tas.gov.au/ |
| Other states | To be confirmed as ABE expands | — |

---

## 6a. Additional schema.org Course properties (optional but recommended)

The following properties are defined directly on the Course type at schema.org/Course. They are not yet required by Google rich results but strengthen AI crawler understanding and future-proof the markup.

### Properties to add to all course pages where data is available

| Property | Type | Use for ABE | Example value |
|---|---|---|---|
| `totalHistoricalEnrollment` | Integer | Strong trust signal — add if ABE tracks total student numbers per course | `12500` |
| `numberOfCredits` | Integer or StructuredValue | CPD courses where points are awarded | `12` (for a 12-point CPD course) |
| `occupationalCredentialAwarded` | EducationalOccupationalCredential | White Card courses (credential leads to occupational outcome) | `{"@type": "EducationalOccupationalCredential", "credentialCategory": "Occupational Licence", "name": "White Card — General Construction Induction", "competencyRequired": "Safe work practices on construction sites"}` |
| `coursePrerequisites` | Text or Course | State any prerequisites, or explicitly "None" — answers a high-volume search query | `"No prerequisites. Open to all individuals aged 14 years and over."` |

### Implementation notes

- `totalHistoricalEnrollment` — use the exact integer, not rounded. Update quarterly. Only add when ABE has verified data. This is a strong trust signal for AI Overviews (answers "how many people have done this course")
- `numberOfCredits` — use alongside the existing `credentialCategory: "CPD Points"` for CPD courses. Provides a structured number that AI systems can extract directly
- `occupationalCredentialAwarded` — use in addition to `educationalCredentialAwarded` for White Card courses. The educational credential is the Statement of Attainment; the occupational credential is the White Card itself (the licence to work on construction sites)
- `coursePrerequisites` — set to text description for all courses. Even "None" is valuable because it answers a common user query and helps AI systems recommend courses to beginners

### areaServed — usage note

The current templates use `areaServed` on Course entities. This property is inherited from Service/Organization in schema.org — it is **not** in the Course hierarchy (Thing → CreativeWork → LearningResource → Course). Google's validator will not flag it as an error, but it may be ignored. For stronger geographic signals, also ensure the state is referenced in the `name`, `description`, and `CourseInstance` location or `availableLanguage` properties where applicable. Retain `areaServed` for now (it does no harm and some AI crawlers may read it) but do not rely on it as the sole geographic signal.

---

## 7. Template 4: Bundle page

Bundles use `Product` schema (not `Course`) with `hasPart` listing included courses.

Key differences from course pages:
- `@type`: "Product" not "Course"
- `brand`: ABE Education
- `hasPart`: array of Course objects with name, courseCode, url
- AggregateRating applies to the Product

---

## 7a. Google Course structured data requirements (developers.google.com/search/docs/appearance/structured-data/course)

### Required properties (Google)

**Corrected 20 July 2026 against the Course spec.** Google requires exactly **two** properties: `name` and `description`. **`provider` is *recommended*, not required** — this file previously listed it as required. ABE's templates supply all three and more, which is correct; the correction matters only so nobody treats a missing `provider` as a hard validation failure when triaging Rich Results Test output.

**Carousel markup is mandatory, not optional.** Google's technical guidelines state you must mark up at least three courses **and** must add Carousel (`ItemList`) markup to either a summary page or an all-in-one page. Course-list eligibility therefore *depends* on the hub-page ItemList — it is not a separate nice-to-have. (This supersedes the old claim in `schema-org-opportunities.md` that Carousel didn't apply to ABE.)

**Feature availability:** the course list rich result is **English-only**, in all regions where Google Search runs. No constraint for ABE, but do not expect it to carry to any non-English content.

### Course definition — eligibility check

Google defines a course as "a series or unit of curriculum that contains lectures, lessons, or modules in a particular subject and/or topic" that requires: explicit educational outcomes in knowledge/skill development, leadership by one or more instructors, and an established roster of students. ABE's courses qualify (structured modules, learning outcomes, enrolled students), but pages should make this evident — mention the course structure, instructor involvement, and student enrolment where possible.

**Invalid course examples** (do NOT mark up as Course): general public events (e.g., "Astronomy Day"), short individual videos (e.g., 2-minute tutorials), single webinars without a curriculum.

### Course name restrictions

Google prohibits promotional language in course `name` values: no "Best school in the world", no pricing information, no discount offers, no non-course descriptors. ABE's naming convention ("[State] [Course Type] Training Online — [Course Code]") complies with this.

### Description display limit

Google truncates course descriptions at approximately **60 characters** in rich results. Front-load the most important information (state, course type, key outcome) in the first 60 characters of the `description` value. The full description can be longer for AI crawler consumption, but the visible rich result snippet will be cut.

### Course List minimum

A minimum of **3 courses** must be marked up for Course List rich result eligibility. Hub and catalogue pages must contain at least 3 ListItem entries. This is a Google hard requirement, not a recommendation.

---

## 8. Template 5: Hub/listing page (ItemList)

For `/white-card`, `/owner-builder-courses`, `/cpd`, `/courses`.

`ItemList` with `ListItem` entries wrapping `Course` objects. Minimum 3 courses required for Course List rich result eligibility (Google hard requirement — see section 7a).

Each ListItem needs: position, url, and item (Course with name, description, provider).

Provider per item follows the decision tree: Blue Dog Training for White Card courses, ABE Education for Owner Builder and CPD.

---

## 9. Template 6: Expert profile (Person)

For `/experts/warwick-smith/` and future expert pages.

Use `ProfilePage` wrapping `Person` as `mainEntity`. Required properties: name, jobTitle, worksFor, hasCredential, knowsAbout, sameAs (LinkedIn).

On course pages, reference via @id instead of duplicating:
```json
"reviewedBy": {"@id": "https://www.abeeducation.edu.au/experts/warwick-smith/#person"}
```

70.4% of ChatGPT-cited sources include Person schema — highest-impact type for AI citation.

---

## 10. Template 7: VideoObject

For pages with course preview videos. Only 18% of organisations implement this.

**Corrected 20 July 2026 against the Video spec.** Google requires only three properties: **`name`, `thumbnailUrl`, `uploadDate`** (ISO 8601, with timezone — otherwise Googlebot's timezone is assumed). `description`, `duration`, `contentUrl`, `embedUrl`, `expires`, `interactionStatistic` and the region properties are all **recommended**, not required. `publisher` is not a Google-supported `VideoObject` property — keep the `@id` reference if useful for the entity graph, but don't count it toward eligibility.

Prefer **`contentUrl`** (the actual video file bytes) over `embedUrl` — Google names it the most effective way to fetch video content. Neither may point at the page the video sits on. Self-hosted video captures more SEO value than YouTube embeds.

### Key moments (`Clip` / `SeekToAction`) — available to ABE, not yet used

Course preview and module videos can expose chapter-style navigation in search results. Two routes:

- **`Clip`** — you specify each segment's `name`, `startOffset` and a deep-link `url`; `endOffset` recommended. Use when you want to control the labels. Supported in all Search languages.
- **`SeekToAction`** — you tell Google the URL timestamp pattern and it identifies moments itself. Supported in a limited language set (English included).

**Gating conditions, all mandatory:** the video must be **at least 30 seconds** long; the URL must deep-link to a point other than the start (e.g. `?t=120`); the `VideoObject` must sit on a page where the video is actually watchable; and for `Clip`, **no two clips on the same video may share a start time**. Short promo clips under 30 seconds are ineligible — check duration before building this.

---

## 11. Template 8: Government listing (isRelatedTo)

**The strongest E-E-A-T signal available.** Only add when ABE is verifiably listed on a .gov.au page.

```json
"isRelatedTo": {
  "@type": "WebPage",
  "name": "[Government Page Title]",
  "url": "[EXACT .gov.au URL where ABE is listed]",
  "publisher": {
    "@type": "GovernmentOrganization",
    "name": "[Regulator Name]",
    "url": "[Regulator URL]"
  },
  "dateModified": "[YYYY-MM-DD last verified]"
}
```

Add inside the relevant Course schema block. Currently confirmed: CBOS Tasmania Owner Builder training providers page.

---

## 12. AggregateRating rules (updated with Google review-snippet compliance)

**Single highest CTR-impact schema type (20-35% improvement).**

### Google guidelines compliance (developers.google.com/search/docs/appearance/structured-data/review-snippet)

Seven compliance rules — violating any risks a manual action:

1. Rating values **must match visible on-page content exactly** — if page shows 4.8/5 from 7,142 reviews, schema must say the same
2. Reviews must be **genuine, user-generated** student reviews — never fabricated
3. **Never apply to Organization or EducationalOrganization** — only to Course or Product entities (penalised since 2019)
4. When using ProductReview as source, use "7,000+" in visible copy but **exact integer** in schema ratingCount
5. **Do not use "verified" alongside Trustpilot references** — Blue Dog Training has an active solicitation flag on Trustpilot
6. **Do not aggregate reviews or ratings from other websites** — Google explicitly prohibits this. If ratings originate from Trustpilot or Google Reviews, they must be collected and displayed natively on the ABE page (e.g., via an embedded widget or API that shows the reviews on-page), not just referenced in schema with no visible review content. The review content **must be immediately obvious to users** on the page
7. **Self-serving review restriction** — Google states: "If the entity that's being reviewed controls the reviews about itself, their pages that use LocalBusiness or any other type of Organization structured data are ineligible for star review feature." ABE's Course pages are eligible (Course is a CreativeWork subtype, not Organization), but this reinforces rule 3: never place AggregateRating on Organization entities

Always include both `ratingCount` (total ratings) and `reviewCount` (written reviews) when they differ. Include `bestRating` (default 5) and `worstRating` (default 1) as recommended properties.

---

## 13. BreadcrumbList patterns

### Full path reference

| Page type | Breadcrumb path | Levels |
|---|---|---|
| White Card hub | Home > White Card Training | 2 |
| White Card course | Home > White Card Training > [State] White Card | 3 |
| Owner Builder hub | Home > Owner Builder | 2 |
| Owner Builder course | Home > Owner Builder > [State] Owner Builder | 3 |
| CPD main hub | Home > CPD Courses | 2 |
| CPD state hub | Home > CPD Courses > [State] CPD | 3 |
| CPD trade hub | Home > CPD Courses > [Trade] CPD | 3 |
| CPD individual | Home > CPD Courses > [Trade] CPD > [State] [Trade] CPD | 4 |
| Bundle main hub | Home > CPD Bundles | 2 |
| Bundle state hub | Home > CPD Bundles > [State] Bundles | 3 |
| Individual bundle | Home > CPD Bundles > [State] Bundles > [Bundle Name] | 4 |
| Course catalogue | Home > All Courses | 2 |
| About | Home > About Us | 2 |
| Trainers | Home > About > Our Trainers | 3 |
| Accreditation | Home > About > RTO Accreditation | 3 |
| Reviews | Home > About > Student Reviews | 3 |
| Contact | Home > Contact Us | 2 |
| FAQ | Home > FAQ | 2 |
| Legal pages | Home > [Page Name] | 2 |

### Technical rules
- **Structured data must match the visible text on the page.** Named by Google in both the generative-AI guidance and the general structured-data policies. Never mark up a rating, price, date, credential or provider the reader cannot also see rendered — mismatch risks a manual action, and on YMYL pages it is a trust failure as well. This applies with extra force to auto-generated markup, where nothing on the page forces the two to agree.
- Always absolute URLs with `https://www.abeeducation.edu.au`
- Final item omits `item` URL per Google spec
- Maximum 4 levels, minimum 2
- **Multi-parent pages** (e.g., CPD course accessible via both state and trade hubs): choose ONE canonical breadcrumb path — trade hub is primary. **Note (20 Jul 2026):** Google *does* support multiple `BreadcrumbList` trails on one page, supplied as an array. ABE's one-path rule is a deliberate cannibalisation-control choice, not a platform limit — revisit it if hub attribution ever becomes the bigger problem.
- **Availability:** breadcrumb rich results are **desktop-only**, in all regions and languages. Don't expect them in mobile SERPs; the markup still helps Google categorise the page.
- Google recommends the trail reflect a **typical user path**, not the URL structure, and neither the domain root nor the page itself needs its own `ListItem`.

---

## 14. FAQ content rules

> **Verified live 20 July 2026. Two rules added from the primary source.**
>
> 1. **Repetitive FAQs — mark up only ONE instance sitewide.** Google: where the same question *and* answer appear
>    on multiple pages, mark up a single instance for the entire site. **ABE is a likely breach** — state course
>    pages carry overlapping FAQs on eligibility, fees and delivery mode. Audit before adding more `FAQPage`
>    blocks: if the answer is genuinely state-specific it isn't repetitive and each page may keep its own; if it is
>    word-for-word identical across states, only one page should carry the markup. A further reason state pages
>    must differ substantively rather than by name-swap.
> 2. **Collapsed answers are explicitly valid.** A question visible on the page with the answer behind an
>    expandable section is a *valid* use case. Invalid only where the user cannot find the content at all. This
>    settles the FAQ half of the accordion trade-off in `crawl-index-controls.md` §7a.
>
> Deprecation timing is precise: rich results ceased **7 May 2026**; reporting and Rich Results Test support drop
> June 2026; Search Console API August 2026. Rich results were in any case limited to authoritative
> **government or health** sites — ABE was never eligible, so nothing was lost. `FAQPage` markup is retained purely
> for AI/LLM visibility.


| Rule | Requirement |
|---|---|
| Word count | 30-80 words per answer |
| Format | Plain text only — no HTML, no links, no formatting |
| CTA | Never inside FAQ answer text or answer containers |
| Match | `name` must be exact text of visible H3 heading |
| Tone | Factual, concise, direct answer |
| Entity names | Include ABE Education, course code, state name where relevant |
| Minimum | 3 Q&A pairs per page |
| Maximum | 10 Q&A pairs per page |

---

## 15. Deprecated schema — do not implement

| Schema type | Status | Date |
|---|---|---|
| Course Info (rich results) | Deprecated | June 2025 |
| Learning Video | Deprecated | June 2025 |
| HowTo rich results | Deprecated | September 2023 |
| Practice Problem | Deprecated (removed from Search Console / Rich Results Test) | January 2026 |
| Sitelinks Search Box | Deprecated | November 2024 |
| FAQ rich results | Deprecated — no longer shown in Search; FAQPage schema still valid | May 2026 |
| AggregateRating on Organization | Penalised | Since 2019 |

---

## 16. LearnWorlds injection checklist

| Schema block | Location | Tab |
|---|---|---|
| Global @graph (Org + WebSite + Nav) | Settings > Custom Code > Before </head> | **Logged-out** |
| Course + Credential + Offers + Rating | Page Properties > SEO > Custom Code > Before </head> | **Logged-out** |
| BreadcrumbList | Same page-level slot | **Logged-out** |
| FAQPage | Same page-level slot | **Logged-out** |
| VideoObject | Same page-level slot (pages with video only) | **Logged-out** |

**Critical:** Always use the logged-out tab. Schema in the logged-in tab is invisible to Googlebot and all AI crawlers.

**LearnWorlds constraints:**
- No canonical URL field in Page Properties SEO — inject canonical tags via JavaScript in page-level logged-out custom code if needed
- No URL Redirects under Settings > Advanced
- LearnWorlds does not natively generate Course schema — all manual (this is an advantage: full control)

---

## 17. Validation checklist

### Step 1: Structural validation
**Tool:** Schema Markup Validator (validator.schema.org)
- Check for missing required properties, invalid types, syntax errors
- Use for EducationalOrganization (Rich Results Test won't surface it)

### Step 2: Google rich result eligibility
**Tool:** Google Rich Results Test (search.google.com/test/rich-results)
- Enter full page URL (renders JavaScript, reflects Googlebot)
- Check Course, FAQPage, BreadcrumbList, AggregateRating all detected

### Step 3: Ongoing monitoring
**Tool:** Google Search Console > Enhancements
- Check weekly for errors in Breadcrumbs, Courses, FAQPage, Organization
- Fix within 48 hours, request re-indexing

### Step 4: Monthly audit
- [ ] Spot-check 5 pages for schema presence (view source, search `application/ld+json`)
- [ ] No new validation errors in Search Console
- [ ] Review counts and ratings updated if changed
- [ ] New FAQ Q&A pairs added where relevant
- [ ] All regulator URLs still resolve (CBOS, ASQA, Access Canberra)
- [ ] No conflicting schema from LearnWorlds plugin updates
- [ ] Price in schema matches current on-page price

---

## 18. Technical rules summary

| Rule | Detail |
|---|---|
| Format | JSON-LD only. Never Microdata or RDFa. |
| Placement | `<script type="application/ld+json">` in `<head>`. Logged-out tab. |
| Block size | Under 50KB per block. Split if needed. |
| URLs | Always absolute. Always include `www`. `https://www.abeeducation.edu.au` |
| @id references | Hash-fragment identifiers (e.g., `/#organization`). Graph node IDs, not URLs. |
| Price | Must match on-page exactly. Always `"priceCurrency": "AUD"`. |
| Phone | International format: `+61297985000` |
| Dates | ISO 8601: `YYYY-MM-DD` for dates, `PTXH` for durations |
| inLanguage | Valid on Course (CreativeWork subtype). **INVALID on EducationalOrganization.** |
| Multiple blocks | Multiple JSON-LD blocks per page is fine and recommended |
| JavaScript | Never load schema via JS. AI crawlers cannot render it. |
| Server-side | All schema in initial HTML response — not client-side rendered |

---

*ABE Education Schema Implementation Guide v1.1 — 8 April 2026*

**v1.1 changelog:**
- Added Google review-snippet compliance rules (section 12): self-serving review restriction, prohibition on aggregating reviews from other websites, bestRating/worstRating recommended properties
- Added schema.org Course properties (section 6a): totalHistoricalEnrollment, numberOfCredits, occupationalCredentialAwarded, coursePrerequisites
- Added areaServed usage note (section 6a): property not in Course schema hierarchy, retain but do not rely on as sole geographic signal
- Added Google Course structured data requirements (section 7a): course definition eligibility, name restrictions, 60-character description display limit, 3-course minimum for Course List rich results
- Source references: developers.google.com/search/docs/appearance/structured-data/review-snippet, developers.google.com/search/docs/appearance/structured-data/course, schema.org/Course
