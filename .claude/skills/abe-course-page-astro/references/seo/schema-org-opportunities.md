# Schema.org Opportunities for ABE Education

**Date:** 8 April 2026
**Version:** 1.1 — updated after cross-referencing Google's Search Gallery (developers.google.com/search/docs/appearance/structured-data/search-gallery)
**Source:** schema.org/Course, schema.org/docs/full.html, Google Search Central structured data documentation, Google Search Gallery
**Purpose:** Additional schema.org types and properties ABE could implement beyond the current schema-implementation-guide, prioritised by impact on machine readability (Google, ChatGPT, Perplexity, Gemini).

**Important distinction:** This document separates types that produce **Google rich results** (visible search features) from types that are **schema.org-only** (no Google rich result, but valuable for AI crawlers like ChatGPT, Perplexity, and Gemini). Both matter, but Google rich results have direct, measurable CTR impact.

---

## Contents

- High Priority — Implement First
- Medium Priority — Follow Up
- Lower Priority — Nice to Have
- AI/LLM Readability Principles from Schema.org
- Recommended Implementation Sequence
- Google Search Gallery Audit — Types ABE Could Add (with Rich Results)
- Summary: What ABE currently uses vs. what's available

## High Priority — Implement First

### 0. Course info (Course + CourseInstance) — new finding, largely already implemented, never named

**Found 20 July 2026 during the freshness audit.** Google runs **two separate Course rich-result features on the
same `Course` type** — a distinction this file never made:

- **Course list** — lists courses from one site. This is what the skill has documented and targeted throughout.
- **Course info** — a richer carousel showing pricing, ratings, enrolment numbers, syllabus and outcomes,
  sourced **across multiple sites**. Launched November 2023, still live and fully documented; Google states
  explicitly that adding it doesn't affect Course list eligibility — a page can qualify for both.

**Cross-checked against `schema-implementation-guide.md` §6/§6a: ABE's templates already carry most of what
Course info wants** — `CourseInstance`, `Offer`, `AggregateRating`, `totalHistoricalEnrollment`,
`educationalLevel`, `teaches` are all already in the White Card / Owner Builder / CPD templates. The gap isn't
implementation — it's that **the feature was never named, so nobody has checked eligibility for it specifically**
in Rich Results Test, and two properties genuinely used by Course info are absent from the current property set:

| Property | Present in ABE templates? | Notes |
|---|---|---|
| `syllabusSections` | ❌ Missing | Structured breakdown of course modules/topics — ABE course pages already describe this in prose; worth adding as structured data |
| `financialAidEligible` | ❌ Missing | Only relevant if a course qualifies for a funding/subsidy scheme (state training subsidies) — verify eligibility before adding, don't add speculatively |
| `availableLanguage` | ❌ Missing | Low priority — ABE delivers English-only; add only if this changes |
| `CourseInstance`, `Offer`, `AggregateRating`, `totalHistoricalEnrollment`, `educationalLevel`, `teaches` | ✅ Already present | No action needed |

**Action:** run existing course pages through Rich Results Test checking specifically for **course info**
eligibility (not just course list), not assumed from property presence alone. Add `syllabusSections` where the
page already has a module breakdown in prose. Leave `financialAidEligible` for later — it's a factual claim, not
a schema nicety, and needs the same source-verification discipline as any regulatory fact.

### 1. EducationalOccupationalProgram

ABE currently marks up individual courses with `Course`, but schema.org has a dedicated type for structured training programs with occupational outcomes.

**What it does:** Represents a complete training pathway (not just a single course) that leads to a credential or occupation.

**Google rich result support:** NO — Google does not currently list EducationalOccupationalProgram in its Search Gallery and does not produce a rich result for it. However, this type is valuable for AI crawlers (ChatGPT, Perplexity, Gemini) that parse schema.org markup to understand training-to-career pathways. It also future-proofs the markup if Google adds support later.

**Properties ABE should use:**

| Property | Use for ABE | Example |
|---|---|---|
| `educationalCredentialAwarded` | Link to EducationalOccupationalCredential | White Card Statement of Attainment |
| `occupationalCredentialAwarded` | Occupational licence gained | White Card (construction site access) |
| `occupationalCategory` | ANZSCO code for the target occupation | "721211" (Construction Worker — ANZSCO) |
| `programType` | Type of program | "Certificate program" |
| `educationalProgramMode` | Delivery mode | "online" |
| `programPrerequisites` | Entry requirements | "No prerequisites" or link to another Course |
| `salaryUponCompletion` | Median wage for target occupation (MonetaryAmountDistribution) | Strengthens AI Overviews that compare training ROI |
| `timeToComplete` | Total program duration (ISO 8601) | "PT6H" for White Card |
| `provider` | Same provider logic as Course | Blue Dog Training (RTO) or ABE Education |

**How to implement:** Add as a separate JSON-LD block alongside existing Course markup. A single page can have both `Course` (for Google Course rich results) and `EducationalOccupationalProgram` (for AI crawlers). Use `hasCourse` property to link the program to the course. Do NOT replace Course markup — keep both.

**Priority:** Medium-high. No Google rich result, but strong AI crawler value. Implement after all Google-rich-result types are fully optimised.

---

### 2. EducationalOccupationalCredential (expanded use)

ABE already uses this within `educationalCredentialAwarded` on Course objects, but it should be expanded into standalone entities that can be referenced across multiple pages.

**Additional properties to add:**

| Property | Use for ABE | Example |
|---|---|---|
| `validFor` | How long the credential remains valid | "P60M" (5 years for White Card in some states) |
| `validIn` | Geographic scope as AdministrativeArea | Specific state or "Australia" |
| `recognizedBy` | Regulatory body | ASQA, CBOS Tasmania, Building Commission NSW |
| `competencyRequired` | Skills needed to earn it | "Identify construction hazards, apply risk controls" |
| `educationalLevel` | Level of the credential | "Beginner", "Professional Development" |

**Implementation note:** Create standalone credential objects with `@id` references (e.g., `/#white-card-credential`) and reference them from both Course and EducationalOccupationalProgram entities. This avoids duplication and creates a linked data graph.

---

### 3. Occupation type

Create dedicated Occupation entities for the jobs ABE's training leads to. This directly answers AI Overview queries like "what qualifications do I need to work on a construction site in NSW?"

**Key properties:**

| Property | Use for ABE | Example |
|---|---|---|
| `name` | Job title | "Construction Worker", "Owner Builder", "Licensed Plumber" |
| `occupationalCategory` | ANZSCO code | "721211" |
| `educationRequirements` | Link to ABE courses/credentials | White Card + specific trade licence |
| `qualifications` | Required credentials | Link to EducationalOccupationalCredential |
| `skills` | Required competencies | "Hazard identification", "Working at heights safety" |
| `estimatedSalary` | Salary range (MonetaryAmountDistribution) | Median hourly/annual wage from ABS data |
| `relevantOccupation` | Related occupations | Site Supervisor, Safety Officer |

**Where to place:** On hub pages or dedicated "career pathways" pages. Reference via `@id` from course pages using `occupationCategory` or custom linking.

---

### 4. AlignmentObject for standards mapping

Maps ABE courses to external competency frameworks and regulatory standards. Critical for AI systems that evaluate training quality.

**Use cases for ABE:**

| Framework | alignmentType | Example targetName |
|---|---|---|
| ASQA Standards | "assesses" | "CPCWHS1001 — Prepare to Work Safely in the Construction Industry" |
| National Construction Code | "teaches" | "Volume One, Part A2 — Verification Methods" |
| State WHS legislation | "requires" | "Work Health and Safety Act 2011 (NSW)" |
| ANZSCO | "educationalSubject" | "Construction Trades Workers" |

**Implementation:** Add `educationalAlignment` property on Course entities, containing an array of AlignmentObject entries.

---

### 5. Organisation schema expansion

ABE's EducationalOrganization entity should include:

| Property | Value |
|---|---|
| `hasCertification` | Certification object linking to RTO accreditation |
| `hasCredential` | Credentials ABE holds (note: RTO credential stays on Blue Dog Training) |
| `legalName` | Official registered business name |
| `taxID` | ABN (if appropriate for public display) |
| `award` | Any industry recognition or awards |
| `publishingPrinciples` | Link to ABE's content standards or editorial policy |
| `alumni` | AlumniOrganization or count of graduates (strong trust signal) |

---

## Medium Priority — Follow Up

### 6. DefinedTermSet + DefinedTerm for competency taxonomies

Create a structured, machine-readable glossary of construction competencies that can be referenced across all courses.

**Example DefinedTermSet:** "ABE Construction Safety Competencies"

**Example DefinedTerms within it:**
- "Hazard Identification" — referenced by White Card `teaches`
- "Fall Prevention" — referenced by CPD courses `teaches`
- "WHS Legislation Compliance" — referenced by multiple courses
- "PPE Selection and Use" — referenced by White Card `teaches`

**Implementation:** Host as a JSON-LD block on a `/competencies/` page, reference individual terms via `@id` from course `teaches` and `assesses` properties. This creates a rich linked data graph that AI crawlers can traverse.

---

### 7. ContactPoint expansion

| contactType | Use |
|---|---|
| "admissions" | Enrolment inquiries |
| "technical support" | Platform/LMS help |
| "compliance" | RTO and regulatory queries |
| "customer service" | General support |

Add `hoursAvailable` (OpeningHoursSpecification) and `availableLanguage` to each.

---

### 8. Quiz and assessment markup

For courses with online assessments:

| Property | Use |
|---|---|
| `assesses` | Link to DefinedTerm competencies being evaluated |
| `educationalLevel` | Assessment difficulty |
| `numberOfQuestions` | Total question count |
| `timeRequired` | Time limit |

**Note:** Google deprecated Practice Problem rich results in November 2025, but the schema itself still aids AI crawlers understanding course rigour.

---

### 9. MonetaryAmountDistribution for salary data

Attach to EducationalOccupationalProgram's `salaryUponCompletion`:

```json
"salaryUponCompletion": {
  "@type": "MonetaryAmountDistribution",
  "currency": "AUD",
  "duration": "P1Y",
  "median": 72000,
  "percentile10": 52000,
  "percentile25": 60000,
  "percentile75": 85000,
  "percentile90": 105000
}
```

Source salary data from ABS (Australian Bureau of Statistics) for construction trades. This is a strong signal for AI Overviews comparing training options.

---

### 10. EducationalAudience refinement

| Property | Values for ABE |
|---|---|
| `educationalRole` | "tradesperson", "apprentice", "supervisor", "owner-builder", "career-changer" |
| `geographicArea` | Specific state AdministrativeArea |
| `audienceType` | "Working professionals", "New entrants to construction" |

Add as `audience` property on Course entities.

---

## Lower Priority — Nice to Have

### 11. JobPosting links

If ABE partners with employers or job boards, link courses to relevant job postings showing career outcomes. Use `qualifications` on JobPosting to reference ABE's credential objects.

### 12. alternateName on Course entities

Add common alternative names and acronyms:
- White Card: "Construction Induction Card", "General Induction Card", "Safety Card"
- Owner Builder: "Owner Builder Permit Course", "OB Permit Training"

This helps AI crawlers match varied search queries to the correct course.

### 13. Thing base property completeness

Ensure every schema entity includes:
- `identifier` — Course codes, RTO IDs as PropertyValue
- `sameAs` — Links to ASQA register, training.gov.au, government listings
- `mainEntityOfPage` — Canonical URL of the page this entity lives on
- `subjectOf` — Link to related blog posts, guides, or resources about this topic

---

## AI/LLM Readability Principles from Schema.org

These principles should guide all schema implementation decisions:

**Specificity over generality.** Use the most specific type available. `EducationalOccupationalProgram` beats generic `Course` for training that leads to a job. `DefinedTerm` beats plain text for competencies.

**Structured properties over description text.** AI crawlers extract structured properties far more reliably than parsing free-text descriptions. If information can be expressed as a typed property, use the property.

**Linked entity graphs over flat markup.** Use `@id` references to connect Course → Program → Credential → Occupation → Organisation. AI systems traverse these links to build understanding.

**Authoritative external links.** `sameAs`, `recognizedBy`, `isRelatedTo` pointing to .gov.au domains and ASQA are the strongest trust signals for both Google and AI crawlers.

**Time-based properties for credential validity.** `validFor`, `validFrom`, `expires` help AI systems give current, accurate advice about whether a credential is still valid.

---

## Recommended Implementation Sequence

**Phase 1 — Foundation (high impact, moderate effort):**
1. Create standalone EducationalOccupationalCredential objects for White Card, Owner Builder Permit, CPD credentials
2. Add `occupationalCredentialAwarded` to White Card course pages
3. Expand Organisation entity with `hasCertification`, `legalName`, `alumni`
4. Add `alternateName` to all Course entities
5. Add `AlignmentObject` entries for ASQA unit codes on RTO-partnered courses

**Phase 2 — Occupational linking (high impact, higher effort):**
1. Implement EducationalOccupationalProgram wrapper on course pages
2. Create Occupation entities for target construction roles
3. Add salary data via MonetaryAmountDistribution (source from ABS)
4. Build DefinedTermSet for construction competencies

**Phase 3 — Refinement (moderate impact):**
1. ContactPoint expansion
2. EducationalAudience refinement
3. Assessment/Quiz markup
4. JobPosting links (if employer partnerships exist)

---

## Google Search Gallery Audit — Types ABE Could Add (with Rich Results)

Cross-referenced against developers.google.com/search/docs/appearance/structured-data/search-gallery — first audited 8 April 2026, **re-checked 20 July 2026 against the full gallery listing**. The gallery now lists **25** supported features, down from 31 in April; ABE currently uses 7 of them (Breadcrumb, Course list, Product, Profile page, Review snippet, Video, Organization-partial). **FAQ no longer appears in the gallery at all**, consistent with the rich result being withdrawn — keep `FAQPage` markup for AI/LLM visibility, but stop counting it as a rich-result feature. Below are the types ABE is NOT using that could produce visible Google rich results.

### Article / BlogPosting — HIGH VALUE if ABE publishes blog content

**Google rich result:** Enhanced titles, larger images, author info in search results and Google News.

**Eligibility:** Blog posts, educational articles, news/updates. Uses `Article`, `NewsArticle`, or `BlogPosting` types.

**Required properties:** None strictly required — Google says "add the properties that apply to your content." But recommended properties include: `headline`, `image` (min 50K pixels, 16:9/4:3/1:1 aspect ratios), `datePublished` (ISO 8601 with timezone), `dateModified`, and `author` (Person or Organization with name and URL).

**ABE implementation:** If ABE has or plans a blog/resources section (e.g., "How to get your White Card", "Owner Builder requirements by state"), add Article markup. Reference expert authors via `@id` to the existing Person entities. This reinforces E-E-A-T signals.

**Effort:** Low. No complex nesting required. **There are no required properties** — add what applies.

**Author markup best practices (from the Article spec, 20 Jul 2026).** These apply to every ABE `author` field, not just Article, and ABE's expert entities must follow them:

- **One author per `author` entry.** Never merge two names into one field.
- **`author.name` carries the name and nothing else** — no publisher name, no "posted by", no honorifics, and **no job title**. Job title goes in `jobTitle`, honorifics in `honorificPrefix` / `honorificSuffix`, publisher in `publisher`. Worth auditing ABE's existing Person entities for job titles smuggled into `name`.
- **Use `Person` for people and `Organization` for organisations** — never `Thing`, never the wrong one.
- **Always give `url` (or `sameAs`)** pointing at the author's profile page, and mark that page up with ProfilePage structured data — which ABE already does, so reference the existing expert `@id`.
- Every author shown on the page must appear in the markup.

---

### Education Q&A — MEDIUM VALUE for assessment/flashcard content

**Google rich result:** Flashcard carousel in search results, Google Assistant, Google Lens.

**Eligibility:** Pages with educational question-and-answer content in flashcard format. Currently limited to English, Portuguese, Spanish (Mexico), and Vietnamese.

**Required properties:** `Quiz` parent with nested `Question` entries, each having `text`, `eduQuestionType` (must be "Flashcard"), and `acceptedAnswer`.

**Recommended:** `educationalAlignment` using `AlignmentObject` to link to educational standards or levels.

**ABE implementation:** If ABE creates study guide or revision pages for White Card training (e.g., "Test your knowledge: WHS hazard identification"), these could be marked up as Education Q&A. Each flashcard question must be visible on the page. Content goes through Google's "quality and pedagogical review" — inaccurate content can disqualify the page.

**Effort:** Medium. Requires dedicated flashcard-format content pages. May not suit current page structure but could work as supplementary study resources.

**Important restrictions:** Only `Flashcard` type is supported. User-submitted answers use different markup (`QAPage`). Minimum one Q&A pair per page.

---

### Organization (expanded properties) — HIGH VALUE

**Google rich result:** Knowledge Panel enhancement, merchant attribution.

ABE already has EducationalOrganization markup, but Google's current documentation supports additional properties not in ABE's schema:

| Property | Value for ABE | Currently used? |
|---|---|---|
| `name` | ABE Education | Yes |
| `legalName` | Official registered business name | **No — add** |
| `alternateName` | "ABE", "ABE Ed" | **No — add** |
| `description` | Organisation overview | **No — add** |
| `foundingDate` | ISO 8601 | **No — add** |
| `numberOfEmployees` | QuantitativeValue | **No — add if appropriate** |
| `iso6523Code` | ABN in ISO format | **No — add** |
| `naics` | Industry classification code | **No — add (ANZSIC equivalent)** |
| `logo` | Min 112x112px, white background compatible | Check current implementation |
| `email` | Contact email | **No — add** |

**Effort:** Low. Single update to the homepage @graph block.

---

### Image Metadata — LOW-MEDIUM VALUE for Google Images visibility

**Spec detail added 20 July 2026.** Required: **`contentUrl`**, plus **at least one** of `creator`, `creditText`, `copyrightNotice` or `license`. Once one is present the other three become recommended. `license` is **mandatory for the Licensable badge**, and `acquireLicensePage` should accompany it. Structured data must be repeated for **every instance of an image on every page**; IPTC metadata embedded in the file travels with the image and only needs doing once. Where the two disagree, **structured data wins**.

**The part that matters most for ABE — declaring AI-generated images.** Google reads the IPTC **Digital Source Type** field and supports `trainedAlgorithmicMedia` (model-generated), `algorithmicMedia` (purely formula-generated), `compositeSynthetic` and `compositeWithTrainedAlgorithmicMedia` (part-generated or in/out-painted). It also reads **C2PA** manifests and may surface creation/editing detail in "About this image". The equivalent on-page property is `digitalSourceType` with `TrainedAlgorithmicMediaDigitalSource`.

**Precision note (corrected 20 July 2026).** The obligation level differs by surface, and the distinction matters because this skill is a compliance tool. For **Merchant Center**, Google's policy is that AI-generated images **must** carry IPTC `DigitalSourceType` `TrainedAlgorithmicMedia`, and AI-generated product titles and descriptions must be specified separately and labelled as AI-generated. For **Google Search generally**, the guidance is softer — Google says to *consider* adding background on how content was created, including image metadata. ABE does not run Merchant Center feeds, so the strict form does not currently bind. Do not cite the Merchant Center "must" as a Search requirement.

**ABE ruling (house rule, stricter than Search requires):** this is the enforcement mechanism for two rules already in force. `helpful-content-standard.md` §5 requires a **genuine screenshot of the course environment, not a generated or stock image**, and §2a requires automation to be self-evident. So: real screenshots and real photography carry `creator` / `creditText` / `copyrightNotice` and no digital-source declaration; any decorative image that *is* AI-generated is declared with the matching IPTC value — ABE's own standard, adopted because §2a's disclosure duty is meaningless if the images quietly contradict it. **Never let a generated image stand in for the course-environment evidence, declared or not** — declaring it makes it honest, not sufficient. Note also that stripping metadata to save bytes may be unlawful in some jurisdictions; retain creator, credit line and copyright notice at minimum.

**Google rich result:** Licensable badge, creator credit, and usage rights in Google Images.

**Required:** `contentUrl` (image URL) plus at least one of: `creator`, `creditText`, `copyrightNotice`, or `license`.

**ABE implementation:** Apply to course images, accreditation badge images, and expert profile photos. If ABE owns original photography or graphics, adding `license` enables the Licensable badge in Google Images. Even without licensing, `creator` and `creditText` provide attribution visibility.

**Effort:** Low per image, but needs to be applied across all image-heavy pages.

---

### Speakable — NOT RECOMMENDED for ABE currently

**Status:** Beta, US-only, English, Google Home devices only. Limited to news content answering topical queries. ABE's educational content does not qualify under current eligibility rules.

**Revisit:** If Google expands Speakable beyond news content to educational content, this becomes relevant for voice search optimisation.

---

### Types in the Gallery that are NOT relevant to ABE

These types appear in Google's gallery but do not apply to ABE's business: Dataset, Discussion Forum, Employer Rating (this is an employer-review feature inside Google's job search, not a course rating), Event (scheduled sessions belong in `CourseInstance`, which is already in every course template — do not double-mark them as `Event`), Job Posting (ABE doesn't post jobs), **Local Business** (ABE is online-only, and in-person / virtual-classroom White Card delivery happens at the RTO partner's venue — marking ABE as the venue is an **authority-model breach**, not just a schema error), Math Solver, Movie, Q&A (the spec names "an FAQ page written by the site itself with no way for users to submit alternative answers" as an **invalid use case** — this is ABE's exact situation, so the exclusion is confirmed, not assumed), Recipe, Software App, Subscription/Paywalled (ABE course pages are public marketing pages; the LearnWorlds login wall is not article paywalling), Vacation Rental.

> **Corrected 20 July 2026 — Carousel was previously listed here in error.** The entry read "Carousel (requires Recipe/Movie/Restaurant)". Google's gallery states the Carousel feature must be combined with one of Recipe, **Course list**, Restaurant or Movie — **Course list is an eligible pairing**, so Carousel *is* available to ABE. It also contradicted `schema-implementation-guide.md`, whose §1 quick-reference already lists "Course List carousel" as the rich result for hub and catalogue pages and whose §8 builds the qualifying `ItemList` + `Course` pattern. No new markup is needed — the carousel is the rendered form of the hub-page ItemList, subject to the **minimum three courses** rule in §7a. Treat hub/catalogue pages as carousel candidates and check them in Rich Results Test rather than assuming ineligibility.

---

## Summary: What ABE currently uses vs. what's available

| Google rich result type | ABE uses? | Action |
|---|---|---|
| Course List | Yes | Optimise per v1.1 guide |
| Breadcrumb | Yes | Complete |
| FAQ | Yes | Complete — restricted to government/health sites **Aug 2023**, then **fully deprecated May 2026** (Rich Results Test support removed June 2026; Search Console API Aug 2026). `FAQPage` schema remains valid and is retained for AI visibility — see `freshness-check.md` for the canonical record. |
| Review Snippet / AggregateRating | Yes | Updated in v1.1 with Google compliance rules |
| Profile Page | Yes | Complete |
| Product | Yes (bundles) | Complete |
| Video | Yes | Complete |
| Organization | Partial | **Expand with legalName, description, foundingDate, iso6523Code** |
| Article / BlogPosting | **No** | **Add if ABE publishes blog content** |
| Education Q&A | **No** | **Add if ABE creates flashcard/study content** |
| Image Metadata | **No** | **Add to course images and expert photos** |

| Schema.org-only type (no Google rich result) | ABE uses? | Value |
|---|---|---|
| EducationalOccupationalProgram | **No** | High for AI crawlers |
| EducationalOccupationalCredential (standalone) | Partial (inline only) | High for AI crawlers |
| Occupation | **No** | Medium for AI crawlers |
| AlignmentObject | **No** | Medium for AI crawlers |
| DefinedTermSet / DefinedTerm | **No** | Medium for AI crawlers |

---

*Schema.org Opportunities Report — ABE Education — v1.1 — 8 April 2026*
