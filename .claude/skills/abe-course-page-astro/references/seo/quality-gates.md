# Quality Gates & Cannibalisation Prevention
**Rules that block publication if violated**
**Source:** 10-unified-2026-seo-strategy, operational learnings

---

## Contents

1. Cannibalisation Prevention
2. The "Don't Do" List
3. Known Site-Wide Issues (Active)
4. Pre-Publication Enforcement Checklist (hard vs soft blockers)
5. Merge or Murder Policy (For Existing Pages)
6. Content Freshness and E-E-A-T Verification Rules — §6.1 five signals · §6.4 expert attribution · §6.6 inline verification notes · §6.7 source links + source tiers + Consolidated Sources list · §6.8 content review section

## 1. Cannibalisation Prevention

ABE has 615 existing pages with documented keyword cannibalisation. Every new page must pass these checks before publishing.

### Pre-writing cannibalisation check

Before writing any content, verify:

| Check | How to verify | Failure action |
|---|---|---|
| No other ABE page targets the same primary keyword | Search GSC or check existing page inventory | Merge with existing page or choose different primary keyword |
| No existing `/course/` URL covers the same topic | Check `web_fetch` for `/course/[topic]` pages | Ensure robots.txt blocks `/course/` and use clean URL |
| State-specific content is genuinely unique | Compare with other state versions of the same course | Rewrite with state-specific regulator, legislation, fees, process |
| Bundle page doesn't duplicate individual course descriptions | Compare bundle section with individual course page | Summarise in bundle; link to individual for detail |
| Hub page doesn't compete with its own child pages | Check keyword targets of hub vs spoke pages | Hub targets broad keyword; spokes target long-tail + state |

### Internal linking direction rules

```
Hub pages (broad keyword)
    ↓ links DOWN to
Course/spoke pages (specific keyword)
    ↑ links UP to
Hub pages

❌ Never link sideways between competing pages at the same level
✅ Cross-category links OK when non-competing
```

**Examples:**
- ✅ White Card NSW page links UP to White Card Hub
- ✅ White Card Hub links DOWN to White Card NSW page
- ❌ White Card NSW page links sideways to White Card QLD page
- ✅ White Card NSW page links to Owner Builder NSW page (different category)
- ✅ Individual CPD course links UP to CPD Trade Hub (primary) and CPD State Hub (secondary)

### State content uniqueness requirements

Every state page MUST include genuinely state-specific content for:

| Element | Must be state-specific |
|---|---|
| Regulator name | ✅ (SafeWork NSW ≠ WorkSafe TAS ≠ WHSQ) |
| Regulator URL | ✅ (link to correct .gov.au page) |
| Government fees | ✅ (different per state) |
| Application process | ✅ (different forms, lodgement methods) |
| Legislation references | ✅ (different Acts per state) |
| Eligibility rules | ✅ (age requirements, residency, etc.) |
| Delivery method variations | ✅ if different (e.g., QLD requires Zoom assessment) |

**Generic content with state name swapped = cannibalisation risk and thin content signal.** Google detects near-duplicate content across URL variants.

---

## 2. The "Don't Do" List

### ❌ Never do these

1. **Noindex bundles** — they are revenue drivers, not duplicates
2. **Mass-publish thin pages** — quality always beats quantity
3. **Copy compliance language into marketing fluff** — maintain accuracy
4. **Index LearnWorlds system pages** — dashboard, checkout, `/course/`, `/program/`
5. **Reuse generic copy across states** — each state must be genuinely unique
6. **Chase keywords without intent** — must match search purpose
7. **Link sideways between competing pages** — only if non-competing
8. **Skip schema validation** — zero errors is the standard
9. **Ignore mobile performance** — it is an indexing factor
10. **Auto-publish without review** — every page needs pre-production assessment
11. **Use passive generic CTAs** — "Enrol now" / "Enrol today" are banned
12. **Say "comprehensive"** — user preference: never use this word
13. **Claim ABE is an RTO** — hard regulatory and SEO failure
14. **Place CTAs inside answer blocks or FAQ answers** — prevents AI extraction
15. **Use "verified" alongside Trustpilot references** — Blue Dog has active solicitation flag
16. **Display review data as "7,000+"** in schema — schema requires exact integer; visible copy uses rounded-floor ("7,000+")
17. **Use `inLanguage` on EducationalOrganization** — invalid; use on Course entities only
18. **Put schema in logged-in tab** — Google's crawler won't see it; use logged-out tab
19. **Use H6 tags for cosmetic labels** — creates WCAG 1.3.1 violations; use styled paragraphs

### ⚠️ Be cautious with

1. **Blog content** — only if answering specific questions, not news
2. **Comparison pages** — must add genuine value
3. **Testimonials** — must be verifiable, not generic
4. **Discount language** — avoid exaggerated claims ("Best in Australia")
5. **Outdated content** — update or remove; never leave stale

---

## 2a. Non-HTML cannibalisation sweep (added 20 July 2026)

**The gap:** cannibalisation checks in this skill assume the competitors are other HTML pages. They aren't
necessarily. Google indexes the text of most document formats — **PDF, DOC/DOCX, XLS/XLSX, PPT/PPTX, ODT/ODS/ODP,
RTF, EPUB, TXT, CSV, XML and SVG**. A course handbook, fee guide, checklist or sample certificate published as a
PDF is a competing indexable document targeting the same query as the page written for it, and it usually wins on
nothing while diluting the page that should rank.

**Run these in Google, not a tool** (they read the live index directly):

```
site:abeeducation.edu.au filetype:pdf
site:abeeducation.edu.au filetype:docx
site:abeeducation.edu.au filetype:xlsx
site:abeeducation.edu.au inurl:.cfm      ← also diagnoses the legacy .cfm issue below
```

**Triage for anything returned:**
- **Duplicates a page's content** → `noindex` via `X-Robots-Tag` HTTP header (a `<meta>` robots tag cannot be set
  on a PDF), or 301 to the HTML page if the file has inbound links. **Leave the file crawlable.** If it is also
  disallowed in robots.txt, Google never fetches it, never sees the `noindex`, and it can stay indexed — the two
  controls cancel out. Alternatively canonicalise it to the HTML page with a `rel="canonical"` HTTP header, which
  is the only canonical method available for non-HTML files. See `crawl-index-controls.md` §3.
- **Genuinely useful standalone** (a lodgement checklist a student prints) → keep indexed, but make sure the HTML
  page covers the same ground so the PDF isn't the only route in.
- **Superseded or undated** → remove. An undated regulatory PDF is the same trust failure as an undated on-page
  claim, and it's harder to spot because nobody re-reads PDFs during a content refresh.

**Note on freshness:** documents fall outside every date-integrity check in this skill. A PDF stating last year's
fee stays wrong indefinitely. If a fee or eligibility rule lives in a downloadable, it needs an entry in the
freshness registry like any other regulatory fact.

**Serving note (Astro / Cloudflare):** Google determines file type from the **`Content-Type` HTTP header**, falling
back to the extension only when the header is missing or wrong. A Worker serving documents with a generic or
incorrect `Content-Type` can cause mis-parsing — worth checking if a document is indexed with garbled text.

---

## 3. Known Site-Wide Issues (Active)

Flag these in pre-production if the content references affected areas:

| Issue | Impact | Status |
|---|---|---|
| `/about-us` returning 404 across ~36 pages | Broken link in global header/footer nav | Unresolved — sitewide broken link |
| Legacy `.cfm` pages still indexed | Cannibalising LearnWorlds pages | Unresolved — need removal/redirect |
| `/program/` pages "Crawled, not indexed" in GSC | Wasted crawl budget, diluted authority | Unresolved — higher priority SEO issue |
| Homepage at `/home` not `/` | Canonical workaround in place | Managed — canonical tag + sitemap alignment |
| No state-specific White Card pages for ACT, QLD, NSW | Major gap — NSW is highest volume | NSW now live via Upskill Institute (RTO 45708); ACT/QLD templates exist |
| LinkedIn company page unclaimed | Missing E-E-A-T signal | Unresolved |
| Indexable **non-HTML files** on the domain (PDF, DOCX, XLSX, PPTX, RTF, TXT, CSV) | Can cannibalise the HTML page written for the same query | **Unaudited — run the `filetype:` sweep below** |
| Trailing slash inconsistency (sitemap vs canonical) | Minor mixed signal | Flagged for alignment |

---

## 4. Pre-Publication Enforcement Checklist

Run this after the full pre-production assessment (Step 6 of SKILL.md). These are binary pass/fail gates.

### Hard blockers (any failure = page cannot publish)

- [ ] **Authority model correct:** No prohibited claims about ABE's RTO status
- [ ] **ASQA disclosure complete:** All 7 locations present (if accredited course)
- [ ] **No cannibalisation:** Primary keyword not targeted by existing page
- [ ] **Regulatory facts verified:** All government fees, regulator names, and legislation references checked against primary sources
- [ ] **Government & legislative claims cited in the output:** Every government, legislative, or regulatory factual claim that appears in the rendered page — fees, penalties, permit thresholds, eligibility rules, the regulator's identity, statutory requirements — carries a visible citation: an inline source link to the instrument and/or a verification note naming the authority (§6.6–6.7). Internal verification is not enough — the source must be visible to the reader. A government or legislative claim with no visible source is a hard blocker.
- [ ] **Consolidated Sources section present:** Any page making government or legislative claims ends with a Sources list pairing each authority/instrument with its official URL and the date verified (§6.7, Consolidated Sources list).
- [ ] **Schema validates:** Zero errors in JSON-LD (test at schema.org validator)
- [ ] **No [TO VERIFY] tags remaining:** All facts resolved

### Soft blockers (flag for attention but do not block publication)

- [ ] Government listing reference available (if applicable)
- [ ] Expert profile linked (Warwick Smith page)
- [ ] AggregateRating data available and current
- [ ] All internal links resolve (no 404s)
- [ ] Image alt text complete for all images
- [ ] "Last verified" date present and within 3 months
- [ ] Mobile CTA visible in first screen (48×48px minimum tap target)
- [ ] Verification notes name the specific authority checked (not generic "government") — note: the *presence* of a citation on every government/legislative claim is enforced as a hard blocker above; these soft checks cover wording and styling quality only
- [ ] Content development and review section present (course pages, CPD, regulatory content)
- [ ] Source links use dotted-underline styling (not bold or italic)
- [ ] Micro-CTAs with directional arrows (↑↓) present at section ends

---

## 5. Merge or Murder Policy (For Existing Pages)

When auditing existing content, every page gets ONE action:

| Action | When to use | Implementation |
|---|---|---|
| **MERGE** | Thin course pages that duplicate hub content | 301 redirect to hub; consolidate content |
| **MURDER** | System pages, true duplicates, dead content | Noindex or 410 (Permanently Deleted) |
| **KEEP & OPTIMISE** | Money pages, support pages, hubs | Apply this skill's full workflow |

**Target:** 615 pages reduced to ~80–100 strategically indexed pages.

---

## 6. Content Freshness and E-E-A-T Verification Rules

### 6.1 Five distinct signals — do not confuse them

| Signal | Purpose | Where it goes | Format | Who needs it |
|---|---|---|---|---|
| **Breadcrumb reviewer line** | Combined freshness + E-E-A-T — tells Google and users both *when* and *by whom* the page was reviewed | Right-aligned in the breadcrumb bar, visible HTML | `Reviewed by [Name] · DD Mon YYYY` (name links to `#content-review`) | Every page with expert attribution (course, CPD, FAQ, regulatory) |
| **Breadcrumb date-only** | Content freshness for pages without expert attribution | Right-aligned in the breadcrumb bar, visible HTML | `Last updated: Month YYYY` | Pages without expert attribution (Contact, About, simple support) |
| **Last verified** | Trust badge verification — proves a specific gov listing or registration was recently checked | Next to the specific trust badge, government listing reference, or verification link | `Last verified: DD Month YYYY` | Any page displaying a verifiable badge or gov listing reference |
| **Inline verification note** | Proves a specific government-sourced figure was recently checked against the authoritative source | Directly below the claim (fee, penalty, eligibility rule) | `[What] verified against [Authority] on DD Month YYYY` | Any section citing government figures |
| **Source link** | Cites the specific legislation or regulatory document a claim is based on | Below body text referencing legislation | `Source: [Document Name]` with dotted underline | Any section making claims based on specific legislation |
| **Content review section** | Closes the E-E-A-T loop — provides evidence for the breadcrumb reviewer attribution | Dedicated section near page bottom with `id="content-review"` | H2 + answer capsule + expert cards with credentials and dates | Course pages, CPD pages, FAQ, regulatory content |

### 6.2 Breadcrumb-bar freshness signal (replaces standalone "Last updated")

- **MANDATORY on every page** — no exceptions
- Place right-aligned in the breadcrumb bar as visible HTML text
- Must be **crawlable HTML** — Google reads it, AI systems use it for citation decisions
- Style: 12px, ash colour (`#9b9b9b`), does not compete with navigation
- Update the date whenever meaningful content changes are made to the page
- 85% of AI Overview citations come from content updated within the last 2 years

**Two variants:**

| Page has expert attribution? | Breadcrumb-bar format | Example |
|---|---|---|
| ✅ Yes | `Reviewed by [Name] · DD Mon YYYY` (name is anchor link to `#content-review`) | `Reviewed by Warwick Smith · 10 Mar 2026` |
| ❌ No | `Last updated: Month YYYY` | `Last updated: March 2026` |

**CSS:**
```css
.breadcrumb-bar .inner-wide {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.breadcrumb-reviewer {
  font-size: 12px;
  color: var(--ash);
}
.breadcrumb-reviewer a {
  color: var(--ash);
  text-decoration: underline;
  text-underline-offset: 2px;
}
```

**When auditing a live page:** Verify the signal is in the **visible breadcrumb bar**, not hidden in source code. Check by searching the rendered text. A timestamp inside a `<style>` block, HTML comment, or JSON-LD schema does NOT count.

### 6.3 "Last verified" rules (trust badge verification)

- Required on any badge, government listing reference, or third-party verification link
- Must reflect the actual date someone checked the source still exists and is current — not the page publication date
- Format: "Last verified: DD Mon YYYY" (e.g., "Last verified: 06 Mar 2026")
- Frequency: re-verify all government listing URLs monthly; update date after each check
- If a badge verification link is broken or the listing has been removed, remove the badge immediately

**Applies to:**
- CBOS Tasmania approved provider listing
- Blue Dog Training training.gov.au registration
- Access Canberra approved provider listing
- WA LGIRS Form 75 — knowledge model (no approved-provider listing to verify)
- Any ProductReview or external review reference

### 6.4 "Reviewed by" rules (E-E-A-T expert attribution)

Not every page needs a named reviewer. Use this table:

| Page type | Expert attribution needed? | Why |
|---|---|---|
| White Card course pages | ✅ Yes | Regulatory content — name the compliance expert who verified accuracy |
| Owner Builder course pages | ✅ Yes | State-specific legislation and fees — needs qualified verification |
| CPD course pages | ✅ Yes | CBOS/regulator-approved content — link to expert profile |
| Bundle pages | 🟡 Optional | If the bundle includes regulatory courses, attribute |
| Hub pages | 🟡 Optional | If the hub makes regulatory claims, attribute |
| Contact page | ❌ No | Credibility comes from accurate contact info and authority model disclosure |
| FAQ page | ✅ Yes | Regulatory and compliance answers need expert backing |
| About / Trainers / Accreditation | ✅ Yes | These ARE the E-E-A-T pages — expert profiles are the content |

**Format options:**
- Byline: `Reviewed by Warwick Smith, RTO Compliance Consultant` (below H1, near timestamp)
- Author card: Dedicated section with photo, name, title, qualifications, link to `/experts/{name}`
- Schema: `author` or `reviewedBy` property on the Course or Article entity, linking to Person schema

**Key rule:** The named expert must have a profile page on the site (`/experts/{name}`) with Person schema. An attribution without a verifiable profile is weaker than no attribution — it looks like a made-up name.

### 6.5 General freshness rules

- Date format for change logs and Notion entries: "DD Mon YYYY" (e.g., "06 Mar 2026")
- Review and update government fees at least quarterly (fees change without notice)
- Legislation references must be checked against current legislation database before publishing
- Review all "Last verified" dates monthly and update after each verification check

### 6.6 Inline verification notes (government figure verification)

Required on any section that cites specific government-sourced figures: fees, penalties, eligibility requirements, building class restrictions.

- Place directly below the claim or figure cluster
- Style: 12px, ash colour (`var(--ash)`), `margin-bottom: var(--sp-4)`
- Format: `[What] verified against [Authority] on DD Month YYYY`
- Use exact dates (day + month + year), not month-only
- Update at least quarterly for fees, after any legislative amendment for penalties/eligibility

**Standalone format** (no adjacent source link for this authority):
```html
<p style="font-size: 12px; color: var(--ash); margin-bottom: var(--sp-4);">
  Government fees verified against Access Canberra on 10 March 2026
</p>
```

**Combined format** (when a source link references the same authority):
```html
<p style="font-size: 12px; color: var(--ash); margin-bottom: var(--sp-4);">
  Penalty amounts verified against <a href="#" style="color: inherit; text-decoration: underline; text-decoration-style: dotted;">WorkSafe ACT — Mandatory Training of Apprentices</a> on 10 March 2026
</p>
```

**When to combine vs keep separate:**
- **Combine** when the verification note and a source link both reference the same authority/page. The authority name becomes the clickable link inside the verification line. This removes redundancy.
- **Keep separate** when the source link points to a different document (e.g., specific legislation) than the authority named in the verification note.

**Decision tree:**
```
Section cites government figures?
├── YES → Add inline verification note below the figures
│         Is there also a source link to the same authority?
│         ├── YES → Combine (authority name = link in verification line)
│         └── NO  → Standalone verification note
└── NO  → No inline verification note needed
```

### 6.7 Source links (legislation and regulatory document citations)

Required on any section that makes claims based on specific legislation or regulatory instruments. This applies to non-numeric regulatory facts too — permit thresholds, eligibility criteria, the identity of the regulator, and what an Act or determination requires — not only dollar figures. If a government or legislative fact is stated on the page, its source is cited on the page.

**Which sources count — primary vs acceptable secondary (so the gate doesn't over-trigger).**
The citation gate is satisfied by either of two source tiers. It is *not* restricted to the Act itself, and citing a regulator's own explanatory page does not trip the gate:

- **Primary (preferred):** the Act, regulation, determination, or the regulator's official fee schedule / licence register. Use a primary source whenever the claim is a *specific statutory provision* (a section, a defined term, a prohibition) or an *exact figure* (a fee, a penalty unit, a threshold) — link the instrument, not a summary of it.
- **Acceptable secondary:** an explanatory page, guide, fact sheet, FAQ, or "how to apply" page **published by the issuing authority itself on its official domain** (e.g. a CBOS owner-builder guide, an Access Canberra licence page, a SafeWork NSW fact sheet). These satisfy the gate for plain-language regulatory facts — process steps, eligibility summaries, who regulates what — even though they are not the legislation. Where practical, pair a regulator guide with the underlying instrument, but a regulator-published page on its own is a valid citation.

**Still does not satisfy the gate:** third-party aggregators and directories (including government *index* sites such as ABLIS / business.gov.au that only point to the issuing agency), commercial blogs, competitor or RTO marketing pages, ABE's own pages, Wikipedia, and any archive/cache/mirror of the above. A government directory is a wayfinding aid, not the cited authority — follow it through to the issuing authority's page and cite that.

- Place below body text, after any inline verification note
- Use the `.source-link` class
- Multiple sources can be joined with ` · ` on one line

**Styling:**
```css
.source-link {
  font-size: 13px;
  margin-top: var(--sp-2);
  margin-bottom: var(--sp-1);
}
.source-link a {
  color: var(--slate-light);
  text-decoration: underline;
  text-decoration-style: dotted;
  text-decoration-color: var(--cool-border);
  text-underline-offset: 3px;
}
```

**Format examples:**
```html
<p class="source-link">Source: <a href="#">Construction Occupations (Licensing) Act 2004</a> · <a href="#">Building Act 2004</a></p>
<p class="source-link">Legislation: <a href="#">Construction Occupations (Licensing) (Qualifications) Declaration 2024</a></p>
```

**Consolidated Sources list (page-level) — required on any page that makes government or legislative claims.**

In addition to the inline citations above, end the page with a single consolidated Sources block so a reader — or an AI crawler deciding whether to cite the page — can see every authority behind the page in one place. Place it after the content-review section, before the trust counters/footer.

- One row per distinct authority or instrument cited on the page.
- Format: `[Authority or Instrument name](official URL) — verified DD Month YYYY`.
- Link to a primary or acceptable-secondary source per the hierarchy above (the instrument, the regulator's fee schedule / register, or a regulator-published guide on its official domain). Never aggregators or directories, blogs, competitor or ABE pages, or archives.
- Keep it crawlable HTML (heading + list) — not an image, accordion-hidden, or script-injected.

```html
<section class="page-sources">
  <h2>Sources</h2>
  <ul>
    <li><a href="https://www.legislation.act.gov.au/a/2004-12">Construction Occupations (Licensing) Act 2004</a> — verified 10 March 2026</li>
    <li><a href="https://www.accesscanberra.act.gov.au/">Access Canberra — owner-builder licence fees</a> — verified 10 March 2026</li>
  </ul>
</section>
```

This complements — does not replace — the inline verification notes and source links: inline citations sit with the claim, the Sources list aggregates them at page level. It is enforced by the §4 hard blocker "Consolidated Sources section present".

### 6.8 Content review section (E-E-A-T evidence section)

Required on course pages, CPD pages, FAQ pages, and regulatory content. Closes the E-E-A-T loop from the breadcrumb reviewer line.

- Place near the bottom of the page (after FAQ/testimonials, before trust counters)
- Must have `id="content-review"` so the breadcrumb reviewer link anchors to it
- Contains: H2, answer capsule (review process), body text (specific to this course), expert cards

**Structure:**
```html
<section class="section-white" id="content-review">
  <div class="inner">
    <h2>How is the course content developed and reviewed?</h2>
    <div class="answer-capsule">
      [Two-stage process description: development by industry expert + independent compliance review]
    </div>
    <p class="body-text">[Course-specific details: who wrote it, who reviewed it, what standards were checked]</p>

    <div class="expert-card">
      <div class="expert-avatar">📷</div>
      <div>
        <h4>[Developer Name]</h4>
        <p class="expert-title">[Role]</p>
        <p class="expert-creds">[Qualifications, experience, awards]</p>
        <p class="expert-date">Course content developed on [DD Month YYYY]</p>
      </div>
    </div>

    <div class="expert-card">
      <div class="expert-avatar">📷</div>
      <div>
        <h4>[Reviewer Name]</h4>
        <p class="expert-title">[Role]</p>
        <p class="expert-creds">[Qualifications]</p>
        <p class="expert-date">Content reviewed on [DD Month YYYY]</p>
      </div>
    </div>
  </div>
</section>
```

**Expert card dates:** Use exact format "on DD Month YYYY" — not month-only.

**Key rule:** The named experts must have profile pages at `/experts/{name}` with Person schema. An attribution without a verifiable profile is weaker than no attribution.
