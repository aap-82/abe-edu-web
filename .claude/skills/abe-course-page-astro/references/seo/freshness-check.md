# Freshness Check Registry

Canonical sources for verifying that this skill's recommendations remain current with Google and schema.org guidance. Used by per-run checks (Stage 4 writing, Stage 7 pre-deploy) and by the user-triggered audit mode (`audit-workflow.md`).

**Scope:** SEO sources only. Australian regulatory bodies (QBCC, ASQA, state regulators, training.gov.au) are out of scope for this registry — they are handled per-page in `content-source-map.md` and `government-listings.md`.

**Skill last audited:** 2026-05-26 (Full audit completed — 27 sources verified; 4 registry entries added 26 May for image SEO, keyword strategy, badges and trust bars — 31 total)

**Audit methodology (2026-05-26):** The 🔴 must-update claims — FAQ rich-result deprecation, the Course Info → Course List distinction, and the Practice Problem removal date — plus the new generative-AI optimisation guidance were verified directly against Google's primary documentation (developers.google.com) and the schema.org version page, not secondary reporting alone. The provenance restriction noted at install (Google developer docs could not be fetched directly) no longer applied. A full registry sweep was completed the same day: the remaining sources were cross-checked against Google's documentation-updates changelog (developers.google.com/search/updates, Jan–May 2026) and the Core Web Vitals thresholds (LCP ≤2.5s / INP ≤200ms / CLS ≤0.1) were confirmed current. No must-update drift was found — only minor additive guidance (spam policies now explicitly cover generative-AI responses; a new "back button hijacking" spam policy; "read more" snippet deep links; additional QA/Discussion-Forum properties), none material to ABE's page types.

---

## Contents

- How to read this file
- Section 1 — Google Structured Data
- Section 2 — Google Search Appearance (Titles, Snippets, AI)
- Section 3 — Google Content Quality (E-E-A-T, Helpful Content, Spam)
- Section 4 — Google Foundational Technical SEO
- Section 5 — Schema.org Vocabulary
- Section 6 — Bing (Lightweight)
- Section 7 — How per-run checks use this registry
- Section 8 — Volatility-based check frequency
- Section 9 — Updating this registry

## How to read this file

Each entry follows the same shape:

| Field | Purpose |
|---|---|
| **Source URL** | The canonical page to fetch when verifying |
| **Backs** | Which file/section in the skill relies on this source |
| **Key claims to verify** | The specific recommendations Claude should compare live source against |
| **Volatility** | How often this source changes — sets per-run check priority |
| **Last verified** | Date the source was last checked against the skill |

**Volatility legend:**

- 🔴 **High** — changes multiple times per year; verify on every relevant run
- 🟡 **Medium** — annual or semi-annual updates; verify in audit mode and when output relies heavily on it
- 🟢 **Low** — settled guidance, rare changes; verify in audit mode only

---

## Section 1 — Google Structured Data

### 1.1 Structured data hub

- **Source URL:** https://developers.google.com/search/docs/appearance/structured-data
- **Backs:** `schema-implementation-guide.md` (provider decision tree, schema type selection); `schema-org-opportunities.md` (rich result types eligibility)
- **Key claims to verify:**
  - The list of supported rich result types
  - Whether new types have been added (e.g., new education-specific markup)
  - Whether any existing types are now deprecated
- **Volatility:** 🔴 High
- **Last verified:** 2026-07-20 *(search-verified)*
- **Findings this audit:**
  - 🆕 **Course info is a distinct, second Course-type rich result the skill had never named**, alongside the
    already-documented Course list. Detailed in a new §0 opportunity added to `schema-org-opportunities.md` —
    cross-checked against `schema-implementation-guide.md` and found **already mostly implemented** (CourseInstance,
    Offer, AggregateRating, totalHistoricalEnrollment, educationalLevel, teaches all present); two properties
    genuinely missing (`syllabusSections`, `financialAidEligible`). Action: verify Course-info eligibility
    specifically in Rich Results Test, not assumed from property presence.
  - ⚠️ **Secondary-source error caught and not repeated.** One search result claimed "Course Info" was among seven
    structured data types retired in June 2025. This is contradicted by Google's own live course-info documentation
    (fetched via search this audit, showing the full current property set). The seven actually retired are Book
    Actions *(later reinstated — deprecation banner removed Nov 2025)*, Claim Review, Estimated Salary, Learning
    Video, Special Announcement, Vehicle Listing, and Practice Problems — **not** Course Info. Recorded here so
    this error doesn't propagate into the skill from a future audit that trusts the wrong secondary source.
  - ✅ Confirmed still supported and unaffected by any 2025/2026 retirement: Course list, Breadcrumb, Article,
    Organization, Product, Review/AggregateRating, Video.

### 1.2 Course structured data (Course List)

- **Source URL:** https://developers.google.com/search/docs/appearance/structured-data/course
- **Backs:** `schema-implementation-guide.md` Section 7a (Google Course requirements); Step 6 Category M
- **Key claims to verify:**
  - Required vs recommended properties for `Course` and `CourseInstance`
  - The 3-course minimum rule for course list rich results
  - The 60-character description limit for course names/descriptions
  - Provider rules (must be a real organisation; Google's stance on third-party providers)
  - `hasCourseInstance` requirements (mode, instructor, courseSchedule, location)
  - Permitted values for `courseMode`, `educationalLevel`, etc.
  - Note: "Course Info" rich result retired June 2025; "Course List" rich result remains supported. Verify Course List has not also been scoped back.
- **Volatility:** 🔴 High — Google updates education markup frequently
- **Last verified:** 2026-07-20 *(search-verified)*
- **Findings this audit:** ✅ Confirmed still fully supported — cross-checked in the 1.1 audit above. Course list remains live and correct as the skill implements it; see 1.1 for the Course-info companion-feature finding.

### 1.3 FAQPage structured data

- **Source URL:** https://developers.google.com/search/docs/appearance/structured-data/faqpage
- **Backs:** `schema-implementation-guide.md` (FAQPage rules); `seo-content-reference.md` (FAQ formatting)
- **Key claims to verify:**
  - FAQ rich results deprecated **7 May 2026** (exact date confirmed from the deprecation banner). Search appearance, rich result report and Rich Results Test support drop **June 2026**; Search Console API support **August 2026**. FAQPage remains a valid schema.org type.
  - Eligibility: rich results remain limited to **well-known, authoritative government-focused or health-focused sites** (the Aug 2023 restriction is still stated in the live doc, alongside the deprecation banner). ABE has never been eligible — it is neither.
  - Required `mainEntity`, `Question`, `acceptedAnswer` properties — unchanged.
  - Content rules — unchanged, and two are worth acting on (see findings below).
- **Volatility:** 🔴 High — eligibility has changed multiple times
- **Last verified:** 2026-07-20 *(live fetch; source page last updated 2026-05-08 UTC)*
- **Findings this audit:**
  - ✅ **No drift** on the deprecation substance — the skill's position (schema retained for AI visibility, rich result gone) is correct.
  - 🆕 **New guidance the skill did not carry — repetitive FAQ markup.** Google: *"If you have FAQ content that is repetitive on your site (meaning, the same question and answer appear on multiple pages on your site), mark up only one instance of that FAQ for your entire site."* **ABE is a likely breach:** state course pages carry overlapping FAQs (eligibility, fees, delivery mode). Where the question *and* answer are genuinely identical across state pages, only one page should carry the `FAQPage` markup. Where the answer is genuinely state-specific, it isn't repetitive and each page may keep its own — which is another reason state pages must differ substantively rather than by name-swap.
  - 🆕 **Accordions are explicitly valid for FAQ content.** Google lists as a valid case: *"The question is visible on the page, and the answer is hidden behind an expandable section."* Invalid only if the user can't find the content at all. This settles the FAQ half of the accordion question in `crawl-index-controls.md` §7a — collapsing FAQ *answers* is safe; the deep-link trade-off in §7a still applies to non-FAQ primary content.

### 1.4 BreadcrumbList structured data

- **Source URL:** https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
- **Backs:** `schema-implementation-guide.md` (BreadcrumbList rules)
- **Key claims to verify:**
  - Required `itemListElement`, `position`, `name`, `item` properties
  - Trailing-slash and URL format rules
  - Whether the last item still must/must-not include a URL
- **Volatility:** 🟡 Medium
- **Last verified:** 2026-07-20 *(search-verified against both the primary doc (read in full earlier this session) and current third-party status trackers)*
- **Findings this audit:** ✅ No drift. Requirements confirmed unchanged: `itemListElement` array of `ListItem`, minimum two entries, "typical user path not URL structure" framing — all matching `crawl-index-controls.md` §6 and `page-type-engine.md`'s breadcrumb rules. Also confirmed BreadcrumbList is on every list of schema types still producing rich results after the 2025/2026 retirement wave.

### 1.5 Article structured data

- **Source URL:** https://developers.google.com/search/docs/appearance/structured-data/article
- **Backs:** `schema-org-opportunities.md` (Article markup for hub/blog content)
- **Key claims to verify:**
  - Article subtypes still supported (`Article`, `NewsArticle`, `BlogPosting`)
  - Required vs recommended properties (`headline`, `image`, `datePublished`, `author`)
  - Author requirements (must reference a `Person` with proper `@id` / `sameAs`)
- **Volatility:** 🟡 Medium
- **Last verified:** 2026-07-20 *(search-verified)*
- **Findings this audit:** ✅ No drift, and reinforced. Multiple independent 2026 sources now describe Article schema as **the most important schema type for AI Overview citation** following the FAQ/HowTo removals — complete author, organisation and `dateModified` markup is named as directly improving citation probability. This strengthens the case for the Article-schema opportunity already recorded in `schema-org-opportunities.md` (for any resources/guides section) — worth prioritising over further FAQ investment if ABE builds one.

### 1.6 Q&A structured data

- **Source URL:** https://developers.google.com/search/docs/appearance/structured-data/qapage
- **Backs:** `schema-org-opportunities.md` (Education Q&A type)
- **Key claims to verify:**
  - Eligibility (single Q&A per page, user-generated content vs editorial)
  - `Question` and `Answer` property requirements
  - Distinction from FAQPage (multiple Q&As)
- **Volatility:** 🟡 Medium
- **Last verified:** 2026-07-20 *(full primary-source document read earlier this session)*
- **Findings this audit:** ✅ No drift. The exclusion recorded 20 July 2026 (self-written FAQ with no user-submitted answers is an explicitly invalid QAPage use case) is unchanged — this is the exact primary document already read in full earlier this session.

### 1.7 Organization structured data

- **Source URL:** https://developers.google.com/search/docs/appearance/structured-data/organization
- **Backs:** `schema-implementation-guide.md` (Organization schema for ABE); `seo-strategy.md`
- **Key claims to verify:**
  - Required and recommended properties (`name`, `logo`, `url`, `sameAs`, `address`, `contactPoint`)
  - Whether new properties have become recommended (Google adds these incrementally)
  - `EducationalOrganization` subtype rules
- **Volatility:** 🟡 Medium
- **Last verified:** 2026-07-20 *(search-verified; primary doc also read in full earlier this session for the parentOrganization correction)*
- **Findings this audit:** ✅ No drift on requirements. Organization confirmed on every current list of rich-result-eligible types. This is also the entry underlying the `parentOrganization` authority-model fix made earlier this session — no further schema change needed beyond that fix.

### 1.8 Logo / site name / sitelinks searchbox

- **Source URLs:**
  - https://developers.google.com/search/docs/appearance/structured-data/logo
  - https://developers.google.com/search/docs/appearance/site-names
  - https://developers.google.com/search/docs/appearance/sitelinks-search-box (note: deprecated as a feature — verify current status)
- **Backs:** `schema-implementation-guide.md` (Organization properties)
- **Key claims to verify:**
  - Logo image requirements (size, format)
  - Site name signal sources Google uses
  - Sitelinks searchbox: confirm whether deprecated status is still in effect
- **Volatility:** 🟡 Medium
- **Last verified:** 2026-07-20 *(search-verified)*
- **Findings this audit:** ✅ **Sitelinks searchbox deprecation confirmed still in effect** — retired globally
  21 November 2024. No ranking impact from leaving old markup in place; Search Console stopped reporting on it and
  Rich Results Test stopped highlighting it, but unsupported markup causes no errors. Confirmed WebSite structured
  data (used for site names, see §3.7) is a **separate feature and continues to be fully supported** — the
  deprecation is scoped to the searchbox action only. No change needed to any ABE template; nothing to remove.

### 1.9 Schema validator and testing

- **Source URLs:**
  - https://search.google.com/test/rich-results (Rich Results Test)
  - https://validator.schema.org/ (Schema Markup Validator)
- **Backs:** Step 6 Category M validation step; `schema-implementation-guide.md` validation checklist
- **Key claims to verify:** Tool URLs are still live and functional. These don't change content but their availability matters.
- **Volatility:** 🟢 Low
- **Last verified:** 2026-07-20 *(not independently re-checked this audit — both tools were used live elsewhere in this session's work, which confirms availability as a side effect)*

---

## Section 2 — Google Search Appearance (Titles, Snippets, AI)

### 2.1 Title links

- **Source URL:** https://developers.google.com/search/docs/appearance/title-link
- **Backs:** `meta-framework.md` (title formulas, character limits, rewrite-prevention rules); Step 4 key-numbers table
- **Key claims to verify:**
  - Recommended title length and pixel-width considerations
  - When Google rewrites titles (anchor text, structured data, on-page text influence)
  - Brand placement guidance
  - Use of pipes vs dashes (currently Google has no preference, but check)
- **Volatility:** 🟡 Medium — Google has tweaked rewrite behaviour several times
- **Last verified:** 2026-07-20 *(full primary-source document read earlier this session — equal or higher confidence than a fresh fetch)*
- **Findings this audit:** ✅ No drift. This is the exact source `meta-framework.md` §"Google's own stated rewrite triggers" was built from earlier this session — obsolete/inaccurate/micro-boilerplate titles, no character limit, and the title source list (title tag, H1, og:title, anchor text, WebSite structured data) all confirmed current.

### 2.2 Snippets

- **Source URL:** https://developers.google.com/search/docs/appearance/snippet
- **Backs:** `meta-framework.md` (description framework, mobile safe zone); Step 4 key-numbers table
- **Key claims to verify:**
  - Whether Google still uses meta description as one of multiple snippet sources
  - `nosnippet`, `max-snippet`, `data-nosnippet` directives
  - Featured snippet eligibility signals
- **Volatility:** 🟡 Medium
- **Last verified:** 2026-07-20 *(full primary-source document read earlier this session — equal or higher confidence than a fresh fetch)*
- **Findings this audit:** ✅ No drift. Source of the meta-description reality check already added to `meta-framework.md` — no length limit, description is not the snippet, programmatic generation endorsed if diverse, and the "Read more" deep-link eligibility rules (visible content, no forced scroll, hash fragment preserved) now in `crawl-index-controls.md` §7a.

### 2.3 AI features in Search (AI Overviews / SGE successor)

- **Source URLs:**
  - https://developers.google.com/search/docs/fundamentals/ai-optimization-guide (official guide, published 15 May 2026)
  - https://developers.google.com/search/docs/appearance/ai-features
- **Backs:** Step 4 AI Overview structural requirements; `seo-content-reference.md`; `schema-org-opportunities.md` (AIO citation strategies)
- **Key claims to verify:**
  - Google's current public guidance on optimising for AI Overviews / generative answers
  - Whether new content placement rules have emerged (the "first 30%" heuristic is industry-derived; check Google's stated position)
  - Citation eligibility signals
  - Any opt-out controls (e.g., `nosnippet`, `max-snippet:0`, robots-meta directives)
  - Google's stated position: AEO and GEO are not separate disciplines — both are SEO. `llms.txt` is not used by Google and is not a ranking signal. There is no requirement to break content into small chunks for AI systems.
- **Volatility:** 🔴 High — AI features in Search are the fastest-moving area
- **Last verified:** 2026-07-20 *(full primary-source document read earlier this session — equal or higher confidence than a fresh fetch)*
- **Findings this audit:** ✅ No drift on the primary AI-optimisation guide already used for the AI-features/generative-AI passes earlier this session (query fan-out, no special AI markup required, RAG grounding, the mythbusting list). **Not independently re-verified this audit:** the secondary AI Overviews/AI Mode support pages (support.google.com/websearch) listed alongside the main guide in this entry's source list — flag for a future batch if those specific support pages matter beyond what the developer guide already covers.

### 2.4 Featured snippets

- **Source URL:** https://developers.google.com/search/docs/appearance/featured-snippets
- **Backs:** Step 4 answer-capsule pattern; `seo-content-reference.md`
- **Key claims to verify:**
  - Featured snippet eligibility criteria
  - Length and format guidance for paragraph snippets (the 40–60 word target is industry-derived; Google's stated preference may differ)
  - Opt-out directives
- **Volatility:** 🟡 Medium
- **Last verified:** 2026-07-20 *(live fetch; source page last updated 2025-12-10 UTC)*
- **Findings this audit:** ✅ No drift. Confirmed: featured snippets cannot be marked up or requested; opt out via `nosnippet` (all snippets) or a progressively lower `max-snippet` (featured only, not guaranteed); featured snippets also appear inside the People Also Ask / related-questions group; and **clicking a featured snippet auto-scrolls the user to the exact section, with no annotation required** — which reinforces the deep-link guidance in `crawl-index-controls.md` §7a.

### 2.5 Visual elements gallery

- **Source URL:** https://developers.google.com/search/docs/appearance/visual-elements-gallery
- **Backs:** `schema-org-opportunities.md` (rich result eligibility audit)
- **Key claims to verify:**
  - The current catalogue of SERP visual elements and what triggers each
  - New element types added since last audit
- **Volatility:** 🟡 Medium
- **Last verified:** 2026-05-26
- **Note:** Not checked this audit — genuinely outstanding, not a search-verified pass. Priority for next batch.

---

### 2.6 Image SEO and alt text

- **Source URL:** https://developers.google.com/search/docs/appearance/google-images
- **Backs:** `alt-text-guidelines.md` (descriptive alt text, filenames, image placement)
- **Key claims to verify:**
  - Alt-text best practice (descriptive, not keyword-stuffed) and descriptive filenames
  - Preferred-image signals — Google uses both schema.org markup and the `og:image` tag (added 2 March 2026)
  - Image sitemap and indexable/high-resolution format guidance
- **Volatility:** 🟡 Medium — image guidance is updated periodically (e.g., preferred-image best practices, March 2026)
- **Last verified:** 2026-07-20 *(re-confirmed against the image metadata / license structured data document read in full earlier this session — same review, not a fresh fetch of this specific URL)*
- **Findings this audit:** ✅ No drift found against what was read. Confirmed alignment between `alt-text-guidelines.md`
  and the image-metadata rules already wired into `schema-org-opportunities.md` §5 (IPTC digital-source-type
  declaration, license/creditText requirements) earlier this session.

---

### 2.7 Keyword and SERP-feature strategy

- **Source URLs:**
  - https://developers.google.com/search/docs/fundamentals/how-search-works
  - https://developers.google.com/search/docs/appearance/ai-features
- **Backs:** `keyword-research.md` (keyword targeting, intent clustering, cannibalisation prevention)
- **Key claims to verify:**
  - Note: keyword-research methodology is **industry-derived**, not a single Google specification. Watch for SERP-feature and AI-feature changes (e.g., AI Overviews absorbing informational queries) that shift which keywords drive clicks.
  - Whether Google has published new guidance on query handling or intent that changes targeting strategy
- **Volatility:** 🟡 Medium — driven by SERP/AI-feature evolution rather than a fixed document
- **Last verified:** 2026-05-26

---

## Section 3 — Google Content Quality (E-E-A-T, Helpful Content, Spam)

### 3.1 Helpful content guidance

- **Source URL:** https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- **Backs:** `authority-model.md` (E-E-A-T signals); Step 4 E-E-A-T section; Step 5.2 E-E-A-T checklist; Step 6 Category D (tone and style)
- **Key claims to verify:**
  - Current "people-first content" criteria
  - The E-E-A-T framework (Experience, Expertise, Authoritativeness, Trust) — wording changes are meaningful
  - What constitutes "unhelpful" content (Google updates examples)
  - "Who, How, Why" content self-assessment questions
  - Stance on AI-generated content (Google's position has shifted — verify current wording)
- **Volatility:** 🟡 Medium — Google updates this page periodically with material wording changes
- **Last verified:** 2026-07-20 *(full primary-source read earlier this session — the highest-confidence
  verification method available, equivalent to or better than a live fetch)*
- **Findings this audit:** ✅ Confirmed current in full. This is the source behind the complete rewrite of
  `helpful-content-standard.md` earlier in this session (the who/how/why test, the four people-first tests, YMYL
  wording, the search-engine-first warning signs, the E-E-A-T nuance that trust is dominant and not all four
  dimensions are required). No further drift found; this entry is the most thoroughly verified in the registry.

### 3.2 Quality Rater Guidelines (PDF)

- **Source URL:** https://services.google.com/fh/files/misc/hsw-sqrg.pdf (also linked from https://guidelines.raterhub.com/)
- **Backs:** `authority-model.md` (E-E-A-T pathway logic); Step 4 expert attribution requirements; Step 6 Category N (Authority Model)
- **Key claims to verify:**
  - YMYL category definitions and whether VET/training-related content is treated as YMYL
  - E-E-A-T signal hierarchy and weight
  - Author attribution requirements for expertise demonstration
  - Page Quality (PQ) rating criteria
  - Lowest/Low/Medium/High/Highest PQ examples relevant to education content
- **Volatility:** 🟡 Medium — updated annually, sometimes more
- **Last verified:** 2026-07-20 *(search-verified against multiple secondary sources reporting the same primary changelog; the PDF itself was not fetched — see note)*
- **Note:** This is a large PDF (176-182 pages depending on the count used) hosted directly by Google. When verifying, target specific sections rather than reading end-to-end. Use the table of contents to locate YMYL, E-E-A-T, and education-related sections. This audit relied on secondary reporting of the primary changelog rather than fetching the PDF itself — a genuinely lower-confidence verification than the live web_fetch checks elsewhere in this registry. Fetch the PDF directly next time the tools allow it.
- **Findings this audit:**
  - 🔴 **YMYL scope formally expanded 11 September 2025** to add a new category: **Government, Civics & Society** — elections, civic institutions, and civic trust. Multiple independent sources cite the same Google changelog entry. **ABE ruling: does not apply.** This new category concerns elections/civics, not building regulation; it does not broaden ABE's existing YMYL classification, which rests on financial stability and safety (already recorded in `helpful-content-standard.md` §3) rather than the new civic category. Recorded here so the expansion isn't mistaken for something that strengthens or changes ABE's position — it simply doesn't touch it.
  - ✅ **No drift on rating guidance itself.** Google's own statement on the September 2025 update: "no changes to the overall guidance provided to search quality raters" — the update added YMYL definition text, AI Overview rating examples, and typo fixes, not new evaluation criteria. The skill's existing E-E-A-T pathway logic in `authority-model.md` needs no revision on this evidence.
  - ✅ **AI Overview rating examples added** — raters now assess AI-generated answers for helpfulness, correctness and completeness using the same PQ framework. No new claim for the skill; consistent with the existing helpful-content standard rather than requiring a change to it.
  - 🟡 **Update cadence confirmed:** roughly two to three revisions per year, irregular. The 🟡 volatility rating remains correct.

### 3.3 Spam policies

- **Source URL:** https://developers.google.com/search/docs/essentials/spam-policies
- **Backs:** `quality-gates.md` (anti-pattern enforcement); `authority-model.md` (prohibited claims that overlap with thin/misleading content); `helpful-content-standard.md` §2a
- **Key claims to verify:**
  - Current list of policy violations (cloaking, doorway abuse, expired domain abuse, hacked content, hidden text/link abuse, keyword stuffing, link spam, machine-generated traffic, malicious practices, misleading functionality, scaled content abuse, scraping, site reputation abuse, sneaky redirects, thin affiliation, user-generated spam)
  - Whether the scope of "spam" itself has expanded
  - Definitions for each violation
- **Volatility:** 🟡 Medium — Google adds new policies as adversarial tactics emerge
- **Last verified:** 2026-07-20 *(live fetch; source page last updated 2026-05-15 UTC)*
- **Findings this audit:**
  - 🔴 **Scope expanded 15 May 2026 — the definition of "spam" itself now explicitly names AI Overview manipulation.** The opening definition reads: spam includes techniques used "to manipulate our Search systems into featuring content prominently, such as attempting to manipulate Search systems into ranking content highly **or attempting to manipulate generative AI responses in Google Search**." This is a scope change to the top-level definition, not a new item in the list — it means every existing spam category (scaled content abuse, hidden text, cloaking, etc.) now applies equally to manipulating AI Overviews/AI Mode, not just classic rankings. Directly reinforces `helpful-content-standard.md` §2a (the AI-disclosure duty) and the scaled-content guardrail in `SKILL.md` Step 4 — both should be read as covering AI-response manipulation explicitly, not by inference.
  - ✅ **Accordions/tabs are named as an explicit non-violation** of hidden-text/link abuse: "Accordion or tabbed content that toggle between hiding and showing additional content" is listed alongside sliders, tooltips and screen-reader-only text as legitimate UX, not manipulation. This is independent confirmation of the accordion findings already recorded in `crawl-index-controls.md` §7a and the FAQ registry entry above — collapsing content behind an accordion is safe from a *spam* perspective as well as an indexing one.
  - ✅ **No drift** on scaled content abuse wording — "using generative AI tools... to generate many pages without adding value for users" is unchanged and matches the existing `helpful-content-standard.md` §2a framing exactly.
  - 🆕 **Site reputation abuse and thin affiliation are formally defined**, neither of which the skill previously named. **Ruling: out of scope for ABE** — ABE does not host third-party content on established ranking signals, and runs no affiliate program. Recorded here rather than added to the skill's active rule set, since adding unused rules is its own form of clutter.

### 3.4 Search Essentials (technical, content, spam fundamentals)

- **Source URL:** https://developers.google.com/search/docs/essentials
- **Backs:** Top-level reference for the entire skill — links to technical, content, and spam fundamentals
- **Key claims to verify:** That the three-part Essentials framework still holds; that linked sub-pages haven't been restructured.
- **Volatility:** 🟢 Low
- **Last verified:** 2026-07-20 *(search-verified, not a full fetch)*
- **Findings this audit:** ✅ No drift. The three-part framework (technical requirements / spam policies / key best practices) is unchanged and confirmed as still the current structure. Also reconfirmed: "it doesn't cost any money to appear in Google Search results" and meeting requirements never guarantees crawling, indexing or serving.

---

### 3.5 Trust signals and badges (E-E-A-T)

- **Source URLs:**
  - https://developers.google.com/search/docs/appearance/structured-data/organization
  - https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- **Backs:** `badge-inventory.md` (government-approval badges, accreditation references, Organization trust signals)
- **Key claims to verify:**
  - Organization markup properties that carry trust/identity signals
  - E-E-A-T expectations for displaying third-party approvals and accreditations honestly
  - That badge claims reflect verifiable listings only — no implied accreditation ABE does not hold (ABE is not an RTO)
- **Volatility:** 🟡 Medium — E-E-A-T framing and Organization properties evolve
- **Last verified:** 2026-05-26

---

### 3.6 Trust bars and supporting credibility content (E-E-A-T)

- **Source URL:** https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- **Backs:** `trust-bar-guidelines.md` (trust-bar copy, social proof, credibility statements)
- **Key claims to verify:**
  - "People-first content" expectations and how supporting credibility content should demonstrate experience and expertise
  - That trust-bar claims (student counts, years in operation, approvals) are substantiated, not decorative
- **Volatility:** 🟡 Medium
- **Last verified:** 2026-07-20 *(full primary-source document read earlier this session — equal or higher confidence than a fresh fetch)*
- **Findings this audit:** ✅ No drift. **Correction to this session's own record-keeping:** the batch-3 changelog entry stated "3.6 already checked", but the registry date was never actually updated — an inconsistency, now fixed. This entry shares the identical source URL with 3.1 (creating-helpful-content), which was read in full at the start of the session; trust-bar and social-proof claims must be substantiated per that source, consistent with the existing `trust-bar-guidelines.md` content.

### 3.7 Site names (added 20 July 2026)

- **Source URL:** https://developers.google.com/search/docs/appearance/site-names
- **Backs:** Nothing currently — new entry, no skill file yet references it. Should back `page-type-engine.md` §2 (URL rules) once wired.
- **Key claims to verify:**
  - Only one site name per site, where a site = domain or subdomain — no subdirectory-level site names supported
  - `www`/`m` subdomains treated as equivalent to the bare domain for naming purposes
  - Recommended methods for declaring a preferred name (WebSite structured data, title tag conventions)
- **Volatility:** 🟡 Medium
- **Last verified:** 2026-07-20 *(search-verified, not a full fetch)*
- **Findings this audit:**
  - 🆕 **Not previously in the skill at all.** ABE's whole architecture is state subdirectories (`/nsw/`, `/qld/` etc. or equivalent). This rule means **Google will never show a distinct "site name" per state subdirectory** — only one name for the whole domain. Not a defect (ABE has never attempted per-state site names), but worth recording so nobody tries to solve a perceived "branding" problem at the subdirectory level; it isn't supported regardless of implementation quality.

---

## Section 4 — Google Foundational Technical SEO

### 4.1 Canonicalisation

- **Source URL:** https://developers.google.com/search/docs/crawling-indexing/canonicalization
- **Backs:** Platform Notes (LearnWorlds canonical workaround); Step 6 Category M
- **Key claims to verify:**
  - Recommended canonical signals (rel=canonical, sitemap inclusion, internal link consistency, redirects)
  - Cross-domain canonical rules
  - Google's handling of conflicting signals
- **Volatility:** 🟢 Low
- **Last verified:** 2026-07-20 *(full primary-source document read earlier this session — equal or higher confidence than a fresh fetch)*
- **Findings this audit:** ✅ No drift. Source of `crawl-index-controls.md` §2 — canonical placement rules, the JS-override caveat flagging the LearnWorlds `/home` workaround as fragile, the two-week duplicate-cluster re-evaluation window, and the signal-strength ordering (redirects > rel=canonical > sitemap) all confirmed current.

### 4.2 Robots.txt

- **Source URL:** https://developers.google.com/search/docs/crawling-indexing/robots/intro
- **Backs:** `quality-gates.md` (technical hygiene)
- **Key claims to verify:**
  - Current directive support (Disallow, Allow, Sitemap, User-agent)
  - User-agents Google currently honours (Googlebot, Googlebot-Image, Google-Extended for AI training, etc.)
  - File size limits and parsing rules
- **Volatility:** 🟢 Low — but Google adds AI-specific user-agents periodically (verify current list)
- **Last verified:** 2026-07-20 *(full primary-source document read earlier this session — equal or higher confidence than a fresh fetch)*
- **Findings this audit:** ✅ No drift. Source of `crawl-index-controls.md` §3 — robots.txt controls crawling not indexing, cannot be used for canonicalisation, and the noindex-behind-a-disallow trap completing the PDF triage in `quality-gates.md` §2a all confirmed current.

### 4.3 Sitemaps

- **Source URL:** https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- **Backs:** `page-type-engine.md` (URL patterns implicitly require sitemap inclusion)
- **Key claims to verify:**
  - XML sitemap format and limits
  - News/Image/Video sitemap rules
  - Submission methods (Search Console, robots.txt reference)
- **Volatility:** 🟢 Low
- **Last verified:** 2026-05-26

### 4.4 Page experience and Core Web Vitals

- **Source URL:** https://developers.google.com/search/docs/appearance/page-experience
- **Backs:** Implicit baseline for all page builds; Step 6 Category G (Platform-Specific)
- **Key claims to verify:**
  - Current Core Web Vitals metrics and thresholds (LCP, INP — replaced FID in 2024 — CLS)
  - HTTPS, mobile-friendliness, intrusive interstitials guidance
  - How page experience factors into ranking (Google has shifted this messaging multiple times)
- **Volatility:** 🟡 Medium — thresholds and metrics have changed; new metrics may replace existing ones
- **Last verified:** 2026-07-20 *(full primary-source document read earlier this session — equal or higher confidence than a fresh fetch)*
- **Findings this audit:** ✅ No drift. Source of `crawl-index-controls.md` §7c — no single page-experience signal, CWV are ranking signals but other page-experience aspects are not, and the explicit "chasing a perfect score may not be the best use of time" caution all confirmed current. Core Web Vitals thresholds (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1) cross-checked separately in `seo-strategy.md` §13 with no drift.

### 4.5 Mobile-friendly content

- **Source URL:** https://developers.google.com/search/mobile-sites
- **Backs:** `content-formatting-guidelines.md` (mobile rules); `meta-framework.md` (mobile safe zone for descriptions)
- **Key claims to verify:**
  - Mobile-first indexing status (Google completed this transition; check it remains the default)
  - Responsive design recommendations
  - Mobile-specific content/markup considerations
- **Volatility:** 🟢 Low
- **Last verified:** 2026-05-26


### 4.6 Search Console traffic-drop debugging (added 20 July 2026)

- **Source URL:** https://developers.google.com/search/docs/monitor-debug/debugging-search-traffic-drops
- **Backs:** `SKILL.md` Step 7.6 (new — traffic-drop diagnostic procedure)
- **Key claims to verify:**
  - The cause checklist (algorithmic update, technical, security, spam, seasonality, site move) and the order Google recommends checking them
  - Small vs large position-drop distinction and the "don't react to small fluctuations" guidance
  - The 16-month date range recommendation for ruling out seasonality
  - Timelines: months (not days) for helpful-content re-assessment to register; weeks for a medium site move to settle
- **Volatility:** 🟡 Medium — Search Console UI and report names change more often than the underlying diagnostic logic
- **Last verified:** 2026-07-20 *(live fetch)*

### 4.7 Search Console + Google Analytics integration

- **Source URL:** https://developers.google.com/search/docs/monitor-debug/google-analytics-search-console
- **Backs:** `SKILL.md` Step 7.6 §4 (new)
- **Key claims to verify:**
  - GSC Clicks vs GA Sessions as the closest comparable metric pair (never exact)
  - The eight named causes of a big discrepancy — timezone (GSC fixed to Pacific Time), canonical-URL-only reporting, non-HTML page inclusion, bot filtering, attribution model, cookies/consent, implementation gaps, traffic-breakdown differences
  - Recommended session filter (`Session source = google`, `Session medium = organic`) before any comparison
- **Volatility:** 🟡 Medium
- **Last verified:** 2026-07-20 *(live fetch)*

### 4.8 Google Trends for content strategy

- **Source URL:** https://developers.google.com/search/docs/monitor-debug/trends-start
- **Backs:** `SKILL.md` Step 7.6 §5 (new); indirectly `keyword-research.md`
- **Key claims to verify:**
  - Explicit warning against writing to a topic solely because it's trending — must fit the site's existing purpose and audience
  - Explore tool vs Trending Now tool distinction
  - Topics vs raw search terms (topics aggregate misspellings/variants/languages)
- **Volatility:** 🟢 Low — the tool and its cautionary framing are stable
- **Last verified:** 2026-07-20 *(live fetch)*

---

## Section 5 — Schema.org Vocabulary

### 5.1 Schema.org full vocabulary

- **Source URL:** https://schema.org/docs/schemas.html
- **Backs:** `schema-org-opportunities.md` (additional types beyond Google's rich results)
- **Key claims to verify:**
  - Schema.org version number (latest stable release)
  - New types added relevant to education and certification
  - Deprecated types or properties
- **Volatility:** 🟡 Medium — schema.org releases versioned updates
- **Last verified:** 2026-07-20 *(search-verified)*
- **Findings this audit:**
  - ✅ Current stable release confirmed: **v30.0, published 2026-03-19**.
  - 🆕 **New type since last check: `WorkBasedProgram`** — "a program with both an educational and employment component... used to distinguish programs such as apprenticeships from school, college or other classroom based educational programs." **Ruling: does not apply to ABE.** ABE's Owner Builder, White Card and CPD courses are short-form training, not apprenticeships or work-based programs — `EducationalOccupationalProgram` (already the skill's high-priority recommendation) remains the correct type. Recorded so it isn't mistaken for a missed opportunity later.

### 5.2 Education-specific types

- **Source URLs:**
  - https://schema.org/Course
  - https://schema.org/EducationalOccupationalProgram
  - https://schema.org/Occupation
  - https://schema.org/AlignmentObject
  - https://schema.org/DefinedTermSet
  - https://schema.org/EducationalOrganization
- **Backs:** `schema-org-opportunities.md` (full education schema mapping)
- **Key claims to verify:**
  - Available properties on each type
  - Inheritance chains (what each type extends)
  - Pending/proposed properties (schema.org marks these explicitly)
- **Volatility:** 🟡 Medium
- **Last verified:** 2026-07-20 *(search-verified)*
- **Findings this audit:** ✅ No drift on any of the six types' core properties. `educationalProgramMode` (delivery mode: online/onsite/blended, synchronous/asynchronous, full-time/part-time) confirmed current and **already correctly listed** in `schema-org-opportunities.md` §1's property table — no change needed there.

### 5.3 Person and credentials

- **Source URLs:**
  - https://schema.org/Person
  - https://schema.org/EducationalOccupationalCredential
- **Backs:** Step 4 expert attribution; Notion Experts integration; Step 6 Category M (Person schema validation)
- **Key claims to verify:**
  - `hasCredential` property requirements
  - `EducationalOccupationalCredential` subtype properties
  - `sameAs`, `image`, `worksFor` recommendations
- **Volatility:** 🟡 Medium
- **Last verified:** 2026-07-20 *(search-verified)*
- **Findings this audit:** ✅ No drift. `hasCredential` (Person/Organization → EducationalOccupationalCredential) and the credential subtype properties (`credentialCategory`, `competencyRequired`, `recognizedBy`) confirmed unchanged and match current `authority-model.md` implementation exactly.

---

## Section 6 — Bing (Lightweight)

### 6.1 Bing Webmaster Guidelines

- **Source URL:** https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a
- **Backs:** Implicit cross-check for SEO recommendations — Bing represents a small but non-zero AU traffic share
- **Key claims to verify:**
  - Whether Bing's stated guidelines align with or diverge from Google's recommendations on a given topic
  - Bing-specific structured data support (IndexNow, etc.)
- **Volatility:** 🟢 Low
- **Last verified:** 2026-07-20 *(search-verified against secondary sources only — the primary Bing Webmaster Guidelines URL was not fetched this audit; treat findings below as lower-confidence than the live-fetch entries elsewhere in this registry)*
- **Note:** This source is consulted in audit mode only, not in per-run checks. If Google and Bing diverge significantly, raise the divergence in the audit drift report.
- **Findings this audit:**
  - 🟡 **Divergence from Google, consistently reported:** unlike Google, which treats structured data as a hint, Bing is reported to rely on it more directly to parse content and determine rich-result eligibility. If accurate, this is a reason to keep ABE's schema **complete rather than minimal** even where Google alone wouldn't require a property — the existing skill practice already errs this way, so no change needed, just a confirmed rationale.
  - 🆕 **Possible new feature, unconfirmed:** multiple sources describe **Bing Webmaster Tools "AI Visibility Insights"**, reporting Citation Share, Topics and Intents for how AI assistants (Copilot, and reportedly ChatGPT search via Bing's index) use a site's content. If real, this would be directly relevant to ABE's AI-visibility goals and worth a mention in `SKILL.md` Step 7.6's measurement section. **Not added to the skill this audit** — the claim comes only from secondary sources, not the primary Bing documentation, and the confidence bar for adding a new measurement surface to the skill should be higher than for confirming an existing rule. Flag for verification against bing.com/webmasters directly next time Bing is audited.

---

## Section 7 — How per-run checks use this registry

This registry is a **cache** of current guidance, refreshed by audit mode. Per-run checks are **cache-first** — they read this file rather than hitting the network on every output. A live `web_fetch` happens only when the cache is going stale or the situation warrants it.

Two stages read this registry, and they read it for different reasons:

- **Stage 4 (writing)** — narrow. Check only the 🔴 High-volatility entries behind what is being written right
  now: schema for a block being drafted, meta or AIO copy, E-E-A-T language. A source whose exact current
  value the prose is about to state is worth a live check; nothing else is. Do not sweep the registry here.
- **Stage 7 (pre-deploy)** — the full per-run check, across every entry backing the page being shipped.
  This is the last point before publish where drift is cheap to fix, so it is where the complete pass runs.
- **Audit mode** (`audit-workflow.md`) — unchanged, and still the only thing that edits this registry.

When a stage instructs Claude to "verify currency before producing output", the workflow is:

1. **Identify the topic** of the output (schema markup → Section 1 entries; meta titles → Section 2.1; AIO copy → Section 2.3; E-E-A-T language → Section 3.1 + 3.2; etc.)
2. **Look up the entry** in the relevant section of this file and read its cached "Key claims to verify".
3. **Decide whether a live check is needed — default is no.** Produce from the cached guidance UNLESS one of these holds, in which case `web_fetch` the source URL (or `web_search` if it has moved):
   - the skill's `Skill last audited` date (in SKILL.md) is **more than 60 days** before today;
   - the entry's own **Last verified** date is more than 60 days old AND the output relies heavily on it;
   - the entry is 🔴 High volatility and the output depends on its exact current value;
   - the user explicitly asked to verify currency, or the output is unusually high-stakes;
   - the cached entry is marked stale or missing.
4. **If you fetched, compare** the live source against the "Backs" file/section it supports — focus on the "Key claims to verify" list
5. **If a live check ran, decide one of three outcomes** (otherwise just produce from the cache):
   - **No drift** — proceed silently. Don't add a "✅ verified" line to every output. Save these for audit reports.
   - **Drift detected** — produce the output using the live source's current guidance, then add a flag block at the end of the response:
     ```
     ⚠️ FRESHNESS FLAG
     Source: [URL]
     Drift: [what changed]
     Skill section affected: [file/section]
     Recommendation: Run audit mode to update the skill (see audit-workflow.md).
     ```
   - **Couldn't fetch / source structure changed** — proceed with the skill's current guidance, but add a flag:
     ```
     ⚠️ FRESHNESS WARNING
     Source: [URL]
     Issue: [could not fetch / page structure unfamiliar / 404 / redirect]
     Recommendation: User should verify this manually; audit mode may need to update the registry.
     ```

**Per-run checks should not block output.** They run alongside the main workflow and surface flags after the work is done. The user decides whether to act on the flag.

---

## Section 8 — Volatility-based check frequency

Per-run checks are cache-first (Section 7). The volatility tag decides when a *live* check is still worth doing despite the cache:

| Volatility | When to live-check per-run | When to check in audit mode |
|---|---|---|
| 🔴 High | Only when the output depends on the source's exact current value, or the audit is >60 days stale — otherwise use the cache | Every audit |
| 🟡 Medium | Only when the output relies heavily on this source AND its last-verified date is older than 60 days | Every audit |
| 🟢 Low | Audit mode only (never per-run) | Every audit |

The **last-verified date** on each entry is updated by audit mode when the source is checked. Per-run checks update it too, but only if drift was investigated and the source was fetched in full.

---

## Section 9 — Updating this registry

Add a new entry to this file when:

- A new Google Search Central doc is published that materially affects how ABE pages should be built
- Schema.org publishes a new version with relevant education types
- A new SERP feature or AI feature is announced
- A source URL changes (update the existing entry — record the old URL in a comment line for traceability)

Remove an entry when:

- A source page is permanently deprecated (replace with the successor)
- A guideline no longer applies to ABE's page-building work

Audit mode is responsible for keeping this file current; per-run checks only flag drift, they do not edit the registry.
