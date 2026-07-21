# Trust Bar Guidelines for ABE Education
## Course Pages & Homepage — Evidence-Based Rules for 2026

**Version:** 1.0
**Date:** March 2026
**Applies to:** Homepage, White Card state pages, Owner Builder state pages, CPD course pages, bundle pages
**Platform:** LearnWorlds

---

## Contents

1. How to Use This Document
2. Part 1: Universal Trust Bar Rules (All Pages)
3. Part 2: Homepage Trust Bar Rules
4. Part 3: Course Page Trust Bar Rules
5. Part 4: Bundle Page Trust Bar Rules
6. Part 5: Technical Implementation (LearnWorlds-Specific)
7. Part 6: Trust Bar Audit Checklist
8. Quick Reference: Trust Elements by Page Type
9. Sources

## How to Use This Document

These rules govern every trust bar, badge strip, and credibility section across ABE Education's website. Each rule is tagged with its evidence source and whether it affects SEO, conversion, or both. Rules are grouped by page type with specific element selections, placement instructions, and technical requirements.

**Priority key:**
- 🔴 **Must** — non-negotiable for compliance, SEO, or proven conversion impact
- 🟡 **Should** — strong evidence supports inclusion; omit only with good reason
- 🟢 **Test** — evidence is promising but context-dependent; A/B test before committing

---

## Part 1: Universal Trust Bar Rules (All Pages)

These rules apply site-wide — homepage, course pages, hub pages, and bundle pages.

### Rule U1 — Maximum Badge Density 🔴

Display no more than **4–5 distinct trust elements per page section**. Never exceed 6 across any single horizontal strip.

**Why:** Reducing badge count from 17 to 6 produced a 62% conversion increase in documented A/B testing. CXL's aggregated data shows that exceeding 3–4 badge types per section decreases conversion by 5–8% due to perceived desperation. More badges ≠ more trust.

**ABE application:** Each trust bar section (hero strip, mid-page bar, pre-CTA bar) gets a maximum of 4 elements. The page as a whole may contain more trust signals, but they must be distributed across distinct sections with different purposes.

---

### Rule U2 — Every Badge Must Be Verifiable 🔴

Every trust badge must link to its verification source. Badges that don't link anywhere — or link to 404 pages — actively destroy trust.

**Why:** Baymard Institute's usability testing shows increasingly savvy users click badges to investigate. Broken verification links signal the business can't maintain basic quality control.

**ABE application:**
- RTO badge → links to training.gov.au listing for Blue Dog Training (RTO 31193)
- CBOS badge → links to CBOS Tasmania approved providers page
- ASQA reference → links to asqa.gov.au
- Review stars → link to the `/reviews` page or external review platform
- Government approval badges → link to the specific .gov.au listing page

**Rule:** If you cannot link a badge to a verification page, do not display it.

---

### Rule U3 — Crawlable Text, Never Image-Only 🔴

All trust signal text must be rendered as **crawlable HTML text**, not embedded in images. Logos may be images, but accompanying text (RTO numbers, ratings, customer counts) must be real text.

**Why:** Google's mobile-first indexing reads HTML text only. Image-embedded text is invisible to Googlebot, AI crawlers (GPTBot, ClaudeBot, PerplexityBot), and screen readers. This also violates WCAG accessibility requirements.

**ABE application:** The phrase "Delivered in partnership with Blue Dog Training (RTO 31193)" must always be HTML text, never part of a logo image. Star ratings and review counts must be text with appropriate `aria-label` attributes.

---

### Rule U4 — Schema Markup Must Match Visible Trust Elements 🔴

Every trust signal displayed visually on the page must have a corresponding schema markup entry. Google's December 2025 Core Update penalises structured data that doesn't match visible page content.

**Why:** 81% of web pages receiving AI citations include schema markup. Pages with properly structured data show 73% higher AI Overview selection rates. Mismatched schema is now actively penalised.

**ABE application:**
- Visible review stars → `AggregateRating` in `Course` schema (rating value and count must match exactly)
- RTO partnership statement → `provider` array in `Course` schema
- Government approval badge → `recognizedBy` in organisation schema
- Expert reviewer name → `Person` schema linked via `author` or `reviewer`

---

### Rule U5 — Performance Budget for Trust Bars 🔴

Trust bar images must not degrade Core Web Vitals. Budget per trust bar section:
- Total image weight: **under 40KB** for the entire strip
- Individual badge/logo: **under 8KB each**
- Format: **SVG preferred** (resolution-independent, typically 2KB vs 26KB for equivalent JPG); WebP as fallback for photographic elements
- Every image must have explicit `width` and `height` attributes to prevent CLS

**Why:** Trust bar images without pre-allocated space are a documented cause of CLS violations. One audit found a CLS score of 0.28 caused primarily by a lazy-loaded logo bar. Sites passing all Core Web Vitals thresholds see 24% lower bounce rates.

**ABE application (LearnWorlds-specific):**
- Never lazy-load above-fold trust bar images
- Use CSS `filter: grayscale(100%); opacity: 0.6` for partner logo strips — reduces visual competition and file size
- Full-colour hover reveal via CSS transition (not JavaScript) — target parent `a` wrapper, not `img` directly, due to LearnWorlds transform constraints
- Place trust bar CSS inline or in the page-level custom CSS block to avoid render-blocking

---

### Rule U6 — Mobile Trust Bar Reduction 🔴

Mobile trust bars must display **fewer, larger** elements than desktop. Never compress a 5-element desktop strip into a cramped mobile row.

**Why:** Mobile cart abandonment sits at 80.2%. Trust signals must be legible at default zoom on iPhone SE (375px width). Cramming badges makes them unreadable and signals poor design quality — which Nielsen Norman Group identifies as the #1 trust factor.

**ABE application:**
- Desktop: up to 5 elements in a horizontal strip
- Mobile (< 768px): maximum 3 elements, stacked vertically or in a 1×3 grid
- Minimum touch target: 48×48px for any clickable badge
- Star ratings: use text "★ 4.9/5 (2,347 reviews)" rather than tiny star icons on mobile

---

### Rule U7 — No Promotional CTAs Inside Trust Elements 🔴

Trust bars and trust sections must never contain enrolment CTAs, pricing, or promotional language within the trust element containers themselves.

**Why:** Google's guidelines for FAQPage schema (which extends to trust-adjacent structured content) penalise promotional CTAs within answer/trust containers. This also violates the principle that trust signals should reduce anxiety, not create sales pressure. Mixing the two reduces effectiveness of both.

**ABE application:** The ASQA disclaimer section, the "Delivered in partnership with..." badge, the review star strip, and the government approval badge must be free of "Enrol Now" buttons or pricing. CTAs belong in their own dedicated sections adjacent to — but separate from — trust elements.

---

### Rule U8 — "Last Verified" Dates on Government and Regulatory Claims 🟡

Every government approval badge and regulatory claim must include a "Last verified: [Month Year]" date.

**Why:** Stale dates (or no dates) undermine the timeliness signal that Google's Quality Raters look for. A "Last verified: March 2026" badge tells both humans and AI that the claim is current and maintained.

**ABE application:**
- CBOS approval badge: "Last verified: [Month Year]"
- RTO partnership claim: "Last verified: [Month Year]"
- Update these dates as part of the monthly monitoring checklist (1st of each month)
- Format: `<time datetime="2026-03-01">March 2026</time>` for machine readability

---

## Part 2: Homepage Trust Bar Rules

The homepage serves exploratory and brand-awareness intent. Trust signals here must establish who ABE Education is, why they're credible, and what makes them different — in under 3 seconds of scanning.

### Rule H1 — Hero Section: One Proof Line Only 🔴

The hero section gets exactly **one trust proof line** beneath the subheading, before the CTA button. This line must combine a quantitative claim with a qualitative signal.

**Format:** `★ 4.9/5 | XX,000+ students certified | Nationally recognised`

**Why:** First impressions form in approximately 50 milliseconds. Loading the hero with multiple badge rows pushes the CTA below the fold on mobile and creates visual noise. One strong line outperforms a cluttered badge strip at the hero level.

**ABE application:**
```
★ 4.9/5 | 50,000+ certified | Nationally recognised training
```

**Rules for this line:**
- Star rating must match `AggregateRating` in homepage schema exactly
- Student count must be verifiable (round down, never up)
- "Nationally recognised" is factually accurate (delivered via RTO partnership)
- Never use "ASQA Approved" — ABE is not itself an RTO
- Do not add logos here — text only, for speed and clarity

---

### Rule H2 — Below-Hero Partner Logo Bar 🔴

Immediately below the hero section, display a "Delivered in Partnership With" logo bar containing **3–4 elements maximum**.

**Elements (in order):**
1. Blue Dog Training logo + "RTO 31193" text
2. Nationally Recognised Training (NRT) logo
3. ASQA logo or reference (linked to asqa.gov.au)
4. State regulator reference (if applicable to primary audience)

**Design rules:**
- Greyscale logos, full-colour on hover
- Heading text: "Delivered in Partnership With" (not "Trusted By" — accuracy matters for ASQA compliance)
- Each logo links to its verification page
- Alt text describes the destination per WCAG 2.4.4: e.g., "Blue Dog Training – verify RTO 31193 on training.gov.au"

**Why:** This is the highest-value trust bar position after the hero proof line. It answers the immediate question for education buyers: "Is this qualification legitimate?" The partnership disclosure is also an ASQA compliance requirement.

---

### Rule H3 — Mid-Page Social Proof Section 🟡

Between the course category cards and the FAQ section, include a social proof section with **3 elements**:

1. **Review aggregate** — "Rated 4.9/5 from 2,347+ reviews" with link to `/reviews`
2. **Outcome statistic** — "95% first-attempt pass rate" (or equivalent verifiable metric)
3. **Operating history** — "Trusted since 2007 | ABN 64 125 455 272"

**Why:** The Spiegel Research Center's research shows reviews are the #1 conversion driver (270% lift with just 5 reviews). Operating history addresses the "Is this a real business?" anxiety. The outcome statistic is the education-specific equivalent of a money-back guarantee — it addresses "Will this actually work?"

**Design rules:**
- Horizontal strip on desktop, vertical stack on mobile
- Icons optional but must be SVG (checkmark, star, shield)
- Numbers must be real and verifiable — never round up
- "Since 2007" claim must match ABN registration date

---

### Rule H4 — Homepage Must Not Display Course-Level Trust Signals 🔴

The homepage must not show White Card–specific badges, state-specific regulator logos, or individual course review counts. These belong on course pages only.

**Why:** Homepage trust signals establish organisational credibility. Mixing in course-level specifics (e.g., "CBOS Tasmania Approved") confuses the entity signal for AI systems and dilutes the top-of-funnel message. Google's Centerpiece Annotation system determines what a page is "about" — course-specific badges on the homepage muddy that signal.

**Exception:** If ABE runs a single hero promotion for a specific course, the promoted course's trust signals may appear within that promotion block only — not in the site-wide trust bar.

---

### Rule H5 — Homepage Government Listing References 🟡

If ABE Education appears on any .gov.au approved provider lists, reference them on the homepage via text links in the trust section — not as a logo bar.

**Format:** A single line reading:
> "Listed as an approved provider by [CBOS Tasmania](link) | [Access Canberra](link)"

**Why:** .gov.au backlinks are the strongest E-E-A-T signal available (third-party verification that cannot be self-claimed). However, displaying government logos without explicit permission creates legal risk. Text links with verification URLs are safer and equally effective for SEO.

---

## Part 3: Course Page Trust Bar Rules

Course pages serve transactional intent. Trust signals here must address three anxieties: "Is this qualification real?", "Will I pass?", and "Is my payment safe?"

### Rule C1 — Hero Trust Strip: 3 Elements Maximum 🔴

Every course page hero section includes a trust strip beneath the price/CTA area with exactly **3 elements**:

1. **Review aggregate** — "★ 4.9/5 (2,347 reviews)"
2. **Outcome metric** — "95% pass rate" or "Same-day certification"
3. **RTO partnership** — "Delivered with Blue Dog Training (RTO 31193)"

**Why:** The course hero is the highest-conversion real estate on the page. Three elements provide credibility without pushing the CTA below the fold. More than three creates decision paralysis at the exact moment the user should be clicking "Enrol Now."

**Design rules:**
- Inline with hero content, not a separate section
- Text-based (no large logo images in the hero)
- Star rating links to the reviews section lower on the page (smooth scroll anchor `#reviews`)
- RTO text links to training.gov.au verification

---

### Rule C2 — Government Approval Badge Section (After Hero) 🔴

For courses with verified government listing, display a **Government Approval Badge** immediately after the hero section, before "What You'll Learn."

**Required HTML structure:**
```html
<section class="government-approval" aria-label="Government approval">
  <img src="/images/logos/[regulator]-logo.svg"
       alt="[Regulator name]"
       width="48" height="48"
       loading="eager" />
  <div>
    <p class="approval-heading">
      Official [Regulator] Approved Provider
    </p>
    <p class="approval-body">
      ABE Education is listed by [Regulator] as an approved
      training provider for [course type].
    </p>
    <a href="[gov.au URL]" target="_blank" rel="noopener">
      Verify on official [Regulator] website →
    </a>
    <p class="last-verified">
      <time datetime="2026-03-01">Last verified: March 2026</time>
    </p>
  </div>
</section>
```

**Why:** Government provider listings are the strongest E-E-A-T signal (10/10 in ABE's authority model scoring). Placing them immediately after the hero catches users at peak attention. The verification link is critical — it transforms a claim into proof.

**ABE application by course type:**
- TAS Owner Builder → CBOS Tasmania badge
- TAS CPD → CBOS Tasmania badge
- ACT Owner Builder → Access Canberra badge
- White Card (all states) → No government badge (use RTO partnership strip instead)

**Rule:** Only display a government badge if ABE is verifiably listed on the regulator's website. Never fabricate or imply government approval that doesn't exist.

---

### Rule C3 — ASQA Compliance Disclaimer Position 🔴

The ASQA partnership disclaimer must appear in **four locations** on every course page for RTO-partnered courses:

1. Hero subheading area (brief: "Delivered in partnership with Blue Dog Training (RTO 31193)")
2. Course Accreditation section (full disclosure paragraph)
3. Below the final enrolment CTA button
4. Footer (site-wide)

**Required language:** "This course is delivered in partnership with [RTO Name] (RTO [Number]), a nationally registered training organisation. Your Statement of Attainment will be issued by [RTO Name]."

**Why:** ASQA Standards for RTOs 2025 require this disclosure. ABE Education must never be described as an RTO. The "is not a Registered Training Organisation" statement is mandatory. Placement in four locations ensures no user can reach the enrolment button without seeing the disclosure.

**Critical:** This is a compliance requirement, not a design choice. It cannot be removed or reduced for aesthetic reasons.

---

### Rule C4 — Pre-CTA Trust Reinforcement Bar 🔴

Immediately above every enrolment CTA button (including mid-page CTAs and the sticky bottom bar), display a **3-element micro trust bar**:

1. **Guarantee** — "100% money-back guarantee" (if applicable)
2. **Security** — padlock icon + "Secure checkout" or payment method icons
3. **Speed** — "Same-day digital certificate" or "Instant access"

**Why:** Baymard Institute's 200,000+ hours of usability testing established that users' security perception peaks at the payment decision point. A money-back guarantee near the CTA produced a 32.57% sales increase for a digital course provider (Quran Academy test). Conversion Rate Experts achieved a 49% business growth by optimising guarantee placement near CTAs.

**Design rules:**
- Small, understated — icons + short text, not full badges
- Same visual weight as supporting text, not competing with the CTA button
- Payment icons (Visa, Mastercard, PayPal) in original colours for recognition
- Guarantee badge uses a shield or checkmark icon, not a seal that implies third-party certification

**Critical LearnWorlds note:** Dynamically injected CTAs (sticky bars) risk CLS violations. Use `position: fixed` with pre-allocated viewport space to prevent layout shift.

---

### Rule C5 — Expert Reviewer Section (Section 9 Pattern) 🟡

Course pages for White Card and Owner Builder courses should include a named expert reviewer section, following the TAS White Card benchmark.

**Required elements:**
1. Expert name and photo (or professional headshot placeholder)
2. Professional title and credentials (e.g., "RTO Compliance Consultant, TAE40116/TAE40122")
3. Experience summary (2–3 sentences)
4. Link to the expert's author page (`/experts/[name]/`)
5. Link to their LinkedIn profile

**Why:** Named expert reviewers are a direct E-E-A-T signal. 96% of AI Overview citations come from pages with strong E-E-A-T signals. The expert's author page creates an entity loop (LinkedIn ↔ employer ↔ author page ↔ course page) that strengthens knowledge graph connections.

**Schema:** Use `Person` schema with `hasCredential`, `worksFor`, and `sameAs` (LinkedIn URL). Link to the course via `author` or `reviewedBy` property.

**ABE application:** Warwick Smith is the current named expert. Outstanding actions: confirm TAE version, obtain permission for public bio use, get a genuine quote, build `/experts/warwick-smith/` author page.

---

### Rule C6 — Student Reviews Section 🟡

Every course page includes a reviews section with:
- Aggregate rating (matching schema exactly)
- 3–5 individual reviews with student name (or initial), star rating, and date
- Mix of ratings (include one 4-star review — perfection is suspicious; purchase likelihood peaks at 4.0–4.7 stars)

**Why:** The Spiegel Research Center found that products with reviews convert 270% better than those without, with the effect amplified for expensive products (380% increase). PowerReviews confirmed that 82% of shoppers actively seek negative reviews to establish credibility.

**Rules:**
- Reviews must be genuine (never fabricated)
- Include the review date — undated reviews lose credibility
- If using a third-party platform (Google Reviews, Trustpilot), embed or link rather than copying text
- Schema: `AggregateRating` on the `Course` type, with `ratingValue`, `reviewCount`, and `bestRating`

---

### Rule C7 — Competitor Comparison Table Trust Signal 🟢

For high-competition pages (White Card, Owner Builder), include a comparison table section showing ABE Education vs unnamed competitor categories.

**Columns:** Feature | ABE Education | Typical Online Provider | In-Person Provider
**Rows:** Price, Duration, Certificate delivery, RTO partnership, Government listing, Money-back guarantee, Expert review

**Why:** The TAS White Card page is the benchmark for this pattern. Comparison tables serve dual purpose: they're a strong conversion element (users can self-justify their decision) and they create structured data that AI Overviews favour for extraction.

**Rules:**
- Never name specific competitors
- Never make claims about competitors that can't be verified
- Use checkmarks (✓) and crosses (✗) for quick scanning
- Mark the "ABE Education" column visually (subtle background highlight)

---

### Rule C8 — No Trust Signal in FAQ Answers 🔴

FAQ sections must not contain trust badges, promotional language, or CTAs within answer text.

**Why:** FAQPage schema guidelines prohibit promotional content in answer containers. Trust badges in FAQ answers reduce AI citation likelihood and violate Google's structured data policies. FAQ answers must be factual and direct.

**ABE application:** FAQ questions like "Is this course nationally recognised?" should answer factually ("Yes, this course is delivered in partnership with Blue Dog Training (RTO 31193), a nationally registered training organisation...") without adding badge images or "Enrol Now" links inside the answer.

---

## Part 4: Bundle Page Trust Bar Rules

Bundle pages combine multiple courses. Trust signals must address an additional anxiety: "Am I getting good value?"

### Rule B1 — Bundle-Specific Value Proof 🟡

Bundle pages add one trust element not found on individual course pages:

**Savings calculation** — "Save $XX compared to individual courses" with a visible price breakdown showing individual vs bundle pricing.

**Why:** Bundle buyers need value justification. A transparent price comparison functions as a trust signal — it shows the business isn't hiding the maths.

**Rules:**
- Savings claim must be mathematically accurate (individual prices × quantity minus bundle price)
- Never overclaim bundle completeness — if other required courses exist outside the bundle, do not say "everything you need"
- Display individual course names with their standalone prices for transparency

---

### Rule B2 — Bundle Pages Inherit Course Trust Rules 🔴

All rules from Part 3 (Course Pages) apply to bundle pages. The hero trust strip, ASQA disclaimer, pre-CTA reinforcement, and government approval badge (where applicable) must all be present.

---

## Part 5: Technical Implementation (LearnWorlds-Specific)

### Rule T1 — Schema Injection Method 🔴

All trust-related schema markup must be injected via **LearnWorlds Settings → Website → Tracking & Integrations → Head Scripts** (for site-wide schema) or **page-level logged-out custom code** (for course-specific schema).

**Critical:** Schema must be saved and verified in the **logged-out** tab. Google's crawler sees the logged-out version only. Schema placed in logged-in custom code blocks is invisible to search engines.

---

### Rule T2 — Trust Bar CSS Implementation 🟡

Trust bar styling must account for LearnWorlds platform constraints:

- `transform` on `<img>` tags is unreliable — target the parent `a.js-linked-node` wrapper with `display: inline-block` for hover effects
- Inline styles in LearnWorlds `data-props` may prevent smooth CSS transitions due to specificity conflicts — use `!important` sparingly and only where LearnWorlds inline styles block intended behaviour
- Greyscale logo hover effect: apply `filter: grayscale(100%); opacity: 0.6; transition: all 0.3s ease` on the container, with `filter: grayscale(0%); opacity: 1` on hover
- Brand colours for trust elements: Safety Gold #E8B00F for checkmarks/highlights, Slate Navy #2B4570 for badge backgrounds, Heritage Maroon #800000 for hover accents

---

### Rule T3 — Image Format and Alt Text 🔴

- All badge and logo images: SVG format (resolution-independent, smallest file size)
- Fallback: WebP at 2x display resolution, under 8KB per image
- Alt text for linked badges must describe the **destination**, not the image (WCAG 2.4.4): e.g., "Verify Blue Dog Training RTO 31193 on training.gov.au"
- Alt text for decorative trust icons (checkmarks, shields): use `alt=""` (empty alt) to skip screen reader announcement
- Never use H6 tags for trust bar labels — use styled `<p>` or `<span>` elements to avoid WCAG 1.3.1 violations (skipped heading levels)

---

### Rule T4 — Canonical and Indexing 🟡

Trust bar content must not create duplicate content issues across state pages. The trust bar text (review counts, RTO partnership statement, guarantee wording) is intentionally repeated site-wide — this is navigation infrastructure, not content. Google's Centerpiece Annotation system already separates this from page-level content analysis.

However: review counts, ratings, and student numbers must be **page-specific where different** (e.g., if White Card TAS has different review counts from White Card QLD). If counts are site-wide aggregates, label them clearly: "ABE Education is rated 4.9/5 across all courses."

---

## Part 6: Trust Bar Audit Checklist

Use this checklist quarterly to verify all trust bars remain current and functional.

### Monthly (1st of each month)
- [ ] All government listing URLs still resolve (no 404s)
- [ ] ABE Education still appears on each listed regulator page
- [ ] Update "Last verified" dates on government badges
- [ ] Review star ratings match current platform data (update if changed)

### Quarterly
- [ ] Student count figures are current (update if materially changed)
- [ ] Pass rate claims are still accurate
- [ ] All badge images load correctly on mobile and desktop
- [ ] Core Web Vitals check — trust bars not causing CLS or LCP issues
- [ ] Schema validation via validator.schema.org (not Rich Results Test for EducationalOrganization)
- [ ] AggregateRating in schema matches visible rating on page

### Annually
- [ ] RTO partnership still active (Blue Dog Training, AlertForce)
- [ ] Review whether new trust elements should be added or old ones retired
- [ ] Check competitor trust bars for new patterns worth testing
- [ ] Verify ABN and business registration details are current

---

## Quick Reference: Trust Elements by Page Type

| Element | Homepage | Course Page | Bundle Page | Hub Page |
|---------|----------|-------------|-------------|----------|
| Hero proof line (★ + count + recognition) | ✓ | ✓ | ✓ | ✓ |
| Partner logo bar | ✓ | — | — | — |
| Government approval badge | — | ✓ (where listed) | ✓ (where listed) | — |
| ASQA disclaimer (4 locations) | — | ✓ | ✓ | — |
| Pre-CTA micro trust bar | — | ✓ | ✓ | — |
| Expert reviewer section | — | ✓ | — | — |
| Student reviews section | — | ✓ | ✓ | — |
| Comparison table | — | ✓ (high-competition) | — | — |
| Social proof stats (since 2007, student count) | ✓ | — | — | ✓ |
| Savings calculation | — | — | ✓ | — |
| Footer trust column (site-wide) | ✓ | ✓ | ✓ | ✓ |

---

## Sources

This document synthesises evidence from:
- Baymard Institute (200,000+ hours usability testing, checkout security research)
- CXL Institute (trust seal eye-tracking study, 340 participants)
- Spiegel Research Center, Northwestern University (review conversion study)
- Nielsen Norman Group (4 credibility factors, Pyramid of Trust model)
- Google Search Quality Rater Guidelines (E-E-A-T framework, December 2025 update)
- PowerReviews (1.5 million product page analysis)
- Conversion Rate Experts (guarantee optimisation, Mobal case study)
- ABE Education SEO Strategy documents v1.1, v2.1
- ABE Education Accreditation & Authority Model documentation
- ASQA Standards for RTOs 2025

---

*Australian English throughout. All claims require verifiable sources. Review quarterly.*
