# ABE Education — Image Alt Text Guidelines
**Actionable rules for writing, reviewing, and checking alt text across abeeducation.edu.au**
**Version 1.0 — March 2026**

Derived from: Alt Text SEO for Australian Training Providers 2026 research report

---

## Table of Contents

1. Core rules
2. Alt text by image type (8 types)
3. ABE-specific examples
4. Keyword strategy across page images
5. Technical requirements
6. Schema integration (ImageObject)
7. WCAG and legal compliance
8. E-E-A-T signals via images
9. AI Overview optimisation
10. Common mistakes checklist

---

## 1. Core Rules

**CR1. Always include an alt attribute on every `<img>` element.**
Omitting it causes screen readers to announce the raw filename.

**CR2. Length: 80–125 characters.** No hard technical limit exists, but this range balances screen reader comfort, descriptive space, and SEO value.

**CR3. End with a full stop.** Creates a natural pause for screen readers.

**CR4. Never start with "Image of…" or "Photo of…"** Screen readers already announce the element as an image. Wastes character space.

**CR5. Describe what is depicted + why it matters + relevant context.**
Include qualification names, locations, or activity descriptions where natural.

**CR6. No keyword stuffing.** Google explicitly warns this "may cause your site to be seen as spam."

**CR7. Unique alt text per image.** Never copy the same alt across multiple images.

**CR8. Don't duplicate surrounding text.** If the caption already describes the image, add new information in alt text or use `alt=""`.

**CR9. Context-dependent: the same image needs different alt text on different pages.**
A classroom photo on a White Card page should reference White Card training. The same photo on an Asbestos Awareness page should reference asbestos training. Alt text describes the image's purpose *on this page*, not the image in isolation.

**CR10. Decorative images must use `alt=""` (empty, no space between quotes).**
Background patterns, dividers, purely aesthetic stock photos. Still include the attribute — omitting it causes screen readers to read the filename.

**CR11. Australian English throughout.** Organisation, centre, recognised, enrolment — never American spellings in alt text. No SEO penalty; Australian users notice.

---

## 2. Alt Text by Image Type

### Course hero images
Describe the activity + qualification name + location context.
```
alt="Construction workers reviewing site safety plans during CPCWHS1001 White Card training with ABE Education."
```

### Instructor / staff photos
Include person's name + role + relevant context. For action shots, describe the activity.
```
alt="Warwick Smith, RTO Compliance Consultant, reviewing White Card course materials for ABE Education."
```

### Certificates and accreditation badges
Reproduce any visible text on the image + RTO code. When functioning as links, describe the destination.
```
alt="Statement of Attainment for CPCWHS1001 issued by Blue Dog Training (RTO 31193)."
```
As a link:
```
alt="Verify Blue Dog Training RTO 31193 on training.gov.au."
```

### NRT logo
```
alt="Nationally Recognised Training (NRT) logo for Australian vocational qualifications."
```

### ASQA badge (via partner)
```
alt="Australian Skills Quality Authority (ASQA) — our RTO partner Blue Dog Training (RTO 31193) is ASQA registered."
```

### Infographics and data visualisations
Brief summary in alt + full text equivalent nearby (HTML table or description).
```
alt="Infographic: ABE Education course completion rates by state, 2024–2025. Full data table below."
```
Always provide a complete text equivalent adjacent to the image (WCAG requirement for complex images).

### Diagrams and flowcharts
Summarise the process in alt + provide detailed steps nearby.
```
alt="Flowchart showing the 5-step White Card enrolment process from registration to card issuance. Full steps detailed below."
```

### Course screenshots
Describe interface purpose and key content, not every pixel.
```
alt="ABE Education student dashboard showing enrolled courses, progress bars, and upcoming assessment dates."
```

### Hero images with text overlay
If all key information appears in HTML text overlaid on the image, the background image can use `alt=""`. If the image itself conveys meaning beyond the overlay (campus, training environment, students), provide descriptive alt text.

### Decorative images
Background patterns, dividers, aesthetic stock photos: `alt=""` always. Implement via CSS where possible instead of `<img>`.

---

## 3. ABE-Specific Examples

| Image | Alt text |
|---|---|
| White Card hero (TAS) | `alt="Construction worker demonstrating correct PPE use during CPCWHS1001 White Card training with ABE Education."` |
| Owner Builder hero (WA) | `alt="Homeowner reviewing building plans for WA owner builder permit course with ABE Education."` |
| CPD hero (TAS plumbing) | `alt="Licensed plumber inspecting pipe installation during CBOS-approved CPD training with ABE Education."` |
| Blue Dog Training logo | `alt="Blue Dog Training — Registered Training Organisation (RTO 31193)."` |
| CBOS badge | `alt="CBOS Tasmania approved training provider for owner builder permit education."` |
| Warwick Smith headshot | `alt="Warwick Smith, RTO Compliance Consultant (TAE50116), expert course reviewer for ABE Education."` |
| Review stars graphic | `alt="ABE Education rated 4.8 out of 5 from 7,000+ student reviews."` |
| Secure checkout badge | `alt=""` (decorative — the text "Secure checkout" should be in HTML) |
| Payment method icons | `alt="Accepted payment methods: Visa, Mastercard, PayPal, Afterpay."` |
| Background pattern | `alt=""` |

---

## 4. Keyword Strategy Across Page Images

**Don't concentrate all keywords in one image.** Distribute intent naturally across a page's images:

- Hero image → primary keyword + qualification name
- Instructor photo → expertise + credential area
- Facilities/environment → location + training context
- Badge/certificate → RTO + accreditation terms

**Target 30–70% keyphrase coverage** across a page's images. More than 70% flags over-optimisation (Yoast threshold). Less than 30% misses the opportunity.

**Context must match the page's intent.** If the page targets "White Card training Tasmania", at least one image should reference Tasmania in its alt text, but not all of them.

---

## 5. Technical Requirements

**T1. Descriptive filenames.** Use `white-card-training-ppe-check.jpg` not `IMG00023.jpg`. Google treats filenames as "very light clues" about content.

**T2. WebP or AVIF format preferred.** Optimal file size without quality loss. Supports Core Web Vitals.

**T3. Compress images for mobile.** Target under 100KB per image. Tradies on mobile data at job sites.

**T4. Submit images in XML sitemaps.** Critical for large course catalogues with CDN delivery or lazy loading.

**T5. Explicit width and height on all `<img>`.** Prevents CLS (must stay under 0.1).

**T6. Above-fold images: `loading="eager"` with `fetchpriority="high"`.** Below-fold: `loading="lazy"`.

---

## 6. Schema Integration (ImageObject)

Pair alt text with ImageObject schema for the multimodal citation multiplier. Pages with full multimodal integration see up to **317% more AI citations**.

```json
"image": {
  "@type": "ImageObject",
  "contentUrl": "https://abeeducation.edu.au/images/white-card-ppe.jpg",
  "caption": "Construction worker demonstrating correct PPE use during CPCWHS1001 White Card training with ABE Education.",
  "width": 1200,
  "height": 630,
  "inLanguage": "en-AU"
}
```

Rules:
- `caption` echoes or expands on HTML alt text — never contradicts it
- All image URLs must be crawlable and indexable
- Use `inLanguage: "en-AU"` for Australian content
- Add ImageObject to Course entities (hero images) and EducationalOrganization (logo)
- For linked badges: alt text describes destination; caption describes the badge itself

---

## 7. WCAG and Legal Compliance

### Applicable standards

- **WCAG 2.2 Level AA** — minimum standard for Australian websites (AHRC April 2025 update)
- **SC 1.1.1 Non-text Content (Level A):** All non-decorative images must have text alternatives
- **SC 1.4.5 Images of Text (Level AA):** Avoid baking text into images where possible
- **SC 2.4.4 Link Purpose (Level A):** Images used as links need alt text describing the destination, not the image
- **SC 1.4.11 Non-text Contrast (Level AA):** Graphical elements need 3:1 contrast ratio

### Legal context

- **Disability Discrimination Act 1992** applies to all Australian educational providers
- **Maguire v SOCOG (2000):** Inaccessible websites = discrimination under DDA ($20,000 penalty)
- **ASQA Standards for RTOs 2025:** Marketing materials must be "clear, accurate, accessible, current and sufficiently detailed"
- **94.8% of websites fail basic WCAG** (WebAIM 2026) — compliance is a genuine competitive differentiator

### The one tension point
WCAG requires `alt=""` for decorative images. SEO temptation is to stuff keywords into these. **Don't.** Negligible ranking benefit, risks spam classification, creates "audible clutter" for screen reader users.

---

## 8. E-E-A-T Signals via Images

| Signal | How alt text contributes |
|---|---|
| **Experience** | Original photography with descriptive alt referencing real training delivery. Stock photos with generic alt signal nothing. |
| **Expertise** | Technically precise alt on educational content — include unit codes, qualification names, regulatory frameworks. |
| **Authoritativeness** | Badge alt includes RTO code + awarding body. Accreditation image alt reproduces visible text. |
| **Trustworthiness** | WCAG compliance (proper alt text) is itself a quality signal. Google has "repeatedly emphasised accessibility as a ranking quality factor." |

96% of AI Overview citations come from pages with strong E-E-A-T signals.

---

## 9. AI Overview Optimisation

Alt text serves as the **disambiguation layer** for AI systems. Google's Gemini can visually interpret images, but alt text tells it *why* the image is on this specific page — distinguishing a "Certificate IV in Training and Assessment" document from a generic certificate.

**Practical strategies:**
- Reference visuals in body text ("As shown in Figure 1…")
- Place images adjacent to related text
- Implement ImageObject schema with captions
- Structure surrounding content with answer capsule pattern
- Keep content within last 2 years (85% of AI citations)

**Key stat:** Pages combining text + images + video + schema see **156% higher AI Overview selection rates**, rising to **317% with full multimodal integration**.

---

## 10. Common Mistakes Checklist

Use this as a quick scan during pre-production assessment:

| # | Mistake | Check |
|---|---|---|
| 1 | Missing alt attribute entirely | Scan all `<img>` for alt= |
| 2 | Starting with "Image of…" or "Photo of…" | Search for these phrases |
| 3 | Keyword-stuffed alt text | Flag any alt with 3+ repetitions of target keyword |
| 4 | Identical alt text on multiple images | Compare all alt values on page |
| 5 | Descriptive alt on decorative images | Check backgrounds, dividers, aesthetic stock |
| 6 | Generic alt on course photography | Flag any "students in classroom" without qualification name |
| 7 | Duplicating caption text in alt | Compare alt to adjacent text/captions |
| 8 | Over 125 characters without good reason | Length check |
| 9 | Under 30 characters (too brief for informational images) | Length check |
| 10 | Missing full stop at end | Scan for alt text not ending in period |
| 11 | American English spelling in alt | Check for organization, center, recognized |
| 12 | Linked image alt describes image, not destination | Check all `<a><img>` patterns |
| 13 | Complex image without adjacent text equivalent | Check infographics, diagrams, flowcharts |
| 14 | Filename is IMG00023.jpg or similar | Check `src` attributes |

---

*ABE Education Alt Text Guidelines v1.0 — March 2026*
*Derived from: Image Alt Text SEO for Australian Training Providers 2026*
