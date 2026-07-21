# Stage 7 — Pre-deploy verification

Run these on the **built HTML** (`dist/{slug}/index.html`) after Stage 6 and before the Stage 8 deploy.
Fix FAILs by correcting the content or data, never by watering down the components. These mirror the
project "Proof" step: a page does not ship until it passes.

---

## 1. Pre-production audit (`references/seo/audit-workflow.md`)  — applies to the built page

### 1a · Structure & schema
- **One `<h1>`**, carrying the target/GSC primary keyword; every other heading H2/H3. No H6 for
  cosmetic labels (use styled paragraphs — an H6 label is a WCAG 1.3.1 violation).
- **JSON-LD present and valid, zero errors**, server-rendered (not JS-injected): `Course` +
  `EducationalOccupationalCredential` + `BreadcrumbList` + `Person` x2. Schema must be in the
  logged-out DOM (Google's crawler won't see a logged-in tab).
- **`recognizedBy` matches the authority model:** the regulator for state-approved-direct (QLD/QBCC,
  TAS/CBOS); **absent** for knowledge-requirement states (WA/Form 75 — ABE `issuedBy` only). A
  `recognizedBy` on a WA page is a FAIL.
- **`Course.offers.price` equals the on-page price** (and the Hero/PriceCard figure).
- **AggregateRating:** schema uses the exact integer review count; visible copy uses the rounded-floor
  ("7,000+"). No `inLanguage` on an `EducationalOrganization` entity (invalid — Course entities only).
- **Meta**: title <= ~60 chars, description present, `canonical` set, `lang="en-AU"`, breadcrumb
  renders visually and as schema.

### 1b · Authority language (hard regulatory + SEO rule)
- No "RTO", "nationally recognised", "accredited", "Statement of Attainment"; for WA no "approved
  course/provider" and no "permit"/"licence" for the owner-builder step.
- **ASQA disclosure** complete (all required locations) where an accredited course is referenced.

### 1c · E-E-A-T & freshness signals (quality-gates §6)
- **Breadcrumb freshness line present and crawlable HTML** (not in a `<style>` block, comment, or
  schema): `Reviewed by [Name] · DD Mon YYYY` on pages with expert attribution (name anchors to
  `#content-review`), else `Last updated: Month YYYY`.
- **Per-section verification block** on any section citing government facts — one consolidated block
  before the micro-CTA: `✓ VERIFIED · DD Month YYYY …` then `🔗 SOURCES [Authority — page](URL) · …`.
- **Content-review section** (`id="content-review"`) on course/CPD/FAQ/regulatory pages, with named
  developer + reviewer whose `/experts/{name}` profiles exist (Person schema). An attribution without a
  real profile is worse than none.
- **"Last verified: DD Mon YYYY"** beside every trust badge / government-listing reference, within cadence.

### 1d · Government-source citation gate (hard)
- **Every government/legislative/regulatory claim on the rendered page carries a visible citation** —
  fees, penalties, permit thresholds, eligibility, regulator identity, statutory requirements. Internal
  verification is not enough; the source must be visible to the reader.
- **Consolidated Sources section** at page end pairs each authority/instrument with its official URL +
  date verified. Sources must be primary (the instrument / fee schedule / register) or acceptable
  secondary (a guide on the issuing authority's own `.gov.au` domain) — never aggregators/directories
  (incl. ABLIS, business.gov.au), blogs, competitor/RTO pages, ABE's own pages, or archives/caches.
- **No `[confirm: …]` / `[TO VERIFY]` tags left** on a publish path.

### 1e · Cannibalisation & indexation (quality-gates §1)
- **No other ABE page targets the same primary keyword** (GSC / inventory check).
- **`robots.txt` blocks `/course/` and `/program/`** system paths; `sitemap-index.xml` emitted.
- **Internal links point up (spoke→hub) and down (hub→spoke), never sideways** between competing
  same-level pages. Cross-category links to non-competing pages are fine.
- **State content is genuinely state-specific** — regulator name + URL, fees, application process,
  legislation, eligibility. Generic copy with the state name swapped is a thin-content / cannibalisation FAIL.

### 1f · Banned-copy checks (quality-gates §2)
- No the word **"comprehensive"** (user preference).
- No passive/generic CTAs — **"Enrol now" / "Enrol today" are banned**; use benefit-led first-person wording.
- **No CTA inside an answer capsule or FAQ answer** (blocks AI extraction).
- **No "verified" alongside a Trustpilot reference** (Blue Dog solicitation flag).
- **Images:** content images have descriptive alt >= 80 chars; decorative images `aria-hidden` + empty alt.
- **OG/Twitter meta** emitted (template default).

---

## 2. abe-readability-audit  (evidence-based targets)

Score against these; where a token or layout differs, that is a finding, not a precedent.

- **Measure:** 45–75 characters per line, **60–66 ideal**; flag anything consistently >75. Mobile 30–45 CPL.
- **Body size:** 16–18px, **16px is the floor**. Meaningful text >= 12px.
- **Leading:** 1.4–1.6× body (tighter 1.0–1.3 for large display); paragraph spacing ~2× font size.
- **Single column** for all running prose; grids stack to one column on mobile.
- **Left-aligned, unjustified** body — never justified, centred, or right-aligned running text.
- **Contrast (WCAG AA):** 4.5:1 normal / 3:1 large text; 3:1 for non-text/UI. Aim for an even, soft tone,
  not maximal contrast. **Off-black ink on off-white ground (ABE hard rule)** — pure `#000` text or pure
  `#fff` ground is a FAIL.
- **Chunk lists to ~7 items** (ABE hard rule); group/split longer flat runs.
- **Answer-first (inverted pyramid):** the direct answer leads the page and each section; question-led
  headings. Flag sections that bury the answer under preamble.
- **CTAs:** one primary CTA per view; repeated above the fold, after every 2–3 persuasive sections, and
  at the end; **sticky CTA on long/mobile pages**. Buttons >= 44px tap target and AA contrast.
- **Trust signals beside the claim and near the CTA** (ABE hard rule) — not only top or footer.
- **Accessibility (WCAG 2.2):** tap targets >= 24px AA (44–48px ideal on mobile); layout survives text
  spacing (line 1.5 / para 2× / letter 0.12em / word 0.16em); reflow at 320px with no horizontal scroll;
  200% resize; one H1, headings in order; visible focus ring; meaningful link text; reduced-motion honoured.

**Register caveat:** the audit's `audit_static.py` / `audit_render.py` were written for the design-rules
HTML register (`.t-*` tokens, Archivo/Public Sans/Source Serif). This template uses the homepage-style
component register, so those scripts will flag register/token differences that are **not** defects here.
Read them at the **principles** level (contrast, measure, hierarchy, placement), not as a token pass/fail.
`audit_render.py` needs Chromium; if unavailable, do the static + manual review. Use
`scripts/contrast_check.py` for AA ratios and the `--cpl` mode to convert a column width into CPL.

---

## 3. final-check (+ ai-detector)  — on the copy

Run all six `final-check` checks on the page copy:
1. **Contradictions** — no conflicting facts, dates, names, or claims.
2. **Duplicate/repeated information** — no redundant sections or restated facts (incl. eyebrow/heading/lede).
3. **Logical flow** — ideas progress; transitions clear; conclusions follow.
4. **Logical grouping** — related content clustered; nothing sitting in the wrong section.
5. **Australian English** — spelling and vocabulary (`-ise`, `defence`, `licence` noun / `license` verb,
   double-L, no American vocab).
6. **AI-writing patterns** — no "delve/leverage/comprehensive/robust", no formulaic openers, no robotic
   over-hedging; human voice.

Then **`ai-detector`** where human-authored content is required.

---

## Hard-blockers (do not deploy if any are true)
- No H1, more than one H1, or an H1 without the target keyword.
- Schema missing/invalid (non-zero errors), or `recognizedBy` present on a WA (knowledge-requirement) page.
- On-page price != `Course.offers.price`.
- Any RTO / "accredited" / (WA) "approved course" / "permit" authority-model breach.
- A government/legislative claim with **no visible source** on the page, or the **Consolidated Sources**
  section missing.
- An unresolved government fact, or a `[confirm: LW]` / `[TO VERIFY]` left open on a publish path.
- A government fee past its re-verify cadence (e.g. 1 July) not re-checked.
- The primary keyword is already targeted by an existing ABE page (cannibalisation).
- A banned CTA ("Enrol now/today"), a CTA inside an answer/FAQ block, or the word "comprehensive".
- Pure-black ink or pure-white ground; body text below AA contrast; a primary CTA button below 44px.
