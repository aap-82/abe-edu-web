---
verified: 2026-07-22
cadence: 365d
---

<!-- Dated 22 Jul 2026, the first time this file has carried a verified date: it was inherited
     undated from 14-government-listings-template.

     `partial` is deliberately NOT set. The state it guards against is a row ASSERTING a listing
     without a date, and there is no longer one — every ✅ row below was checked first-hand on
     22 Jul 2026 and carries both its verified date and the regulator page's own last-updated
     date. The rows still marked 🔍 (Access Canberra, other regulators) assert nothing; they are
     backlog, and their marker is the warning. Setting `partial` for them would leave this file
     permanently flagged, because "other regulators — to search" can never be closed.

     Set `partial: true` the moment a ✅ row appears without a date. -->

<!-- Checked 22 Jul 2026 via the in-app browser, not WebFetch: cbos.tas.gov.au and
     consumerprotection.wa.gov.au both return 403 to automated fetches, so a plain
     WebFetch/curl re-verification will fail and is not evidence the listing is gone. -->

<!-- Reading corrected 22 Jul 2026: a "listing" means the regulator names ABE on a page. WA's
     Form 75 pathway does not, and never did — it accepts ABE's certificate as evidence of
     knowledge. That row is now ❌, not ✅. Accepting evidence is not listing a provider, and the
     two carry different claims on a page. -->

# Government Listings: E-E-A-T Integration
**How to leverage official .gov.au recognition on ABE pages**
**Source:** 14-government-listings-template

---

## 1. What Is a Government Provider Listing?

A government website (.gov.au) that officially lists ABE Education as an approved or recognised training provider. This is the strongest possible E-E-A-T signal because:

- .gov.au authority (highest trust domain in Australia)
- Third-party verification (cannot be self-claimed)
- Trust signal for both users and Google
- Competitive differentiator
- Local SEO boost for state-specific searches

---

## 2. Known Listings

| Regulator | Course type | Listed? | URL |
|---|---|---|---|
| **Consumer Protection (LGIRS)** — WA | **Real estate CPD** | ✅ **Verified 22 Jul 2026** — **ABE Education Pty Ltd** appears on the Approved CPD training providers list. Industries: Real Estate and Business Agents, **and Settlement Agents**. Subjects: Legal Requirements; Ethics or Professional Responsibility; Professional Skills. Delivery: Online. Regulator page last updated 17 Jun 2026. **ABE may say "approved CPD training provider" in WA.** ⚠ The page's intro calls its listed providers "registered training organisations" — that is the regulator's loose label, **not** an ASQA registration. Never restate it: ABE is not an RTO. | `https://www.consumerprotection.wa.gov.au/approved-cpd-training-providers` |
| CBOS Tasmania | Owner Builder training | ✅ **Verified 22 Jul 2026** — **ABE Education Pty Ltd** is named on "Owner builder training courses", delivery On-line, alongside Absolute Education Pty Ltd and Whetstone Pty Ltd. The page states "Only Tasmanian approved courses are accepted for applicants wanting to be an owner builder." Regulator page last updated **11 Aug 2023** (stable, not archived). | `https://www.cbos.tas.gov.au/topics/licensing-and-registration/licensed-occupations/owner-builder-permit/training-courses` |
| LGIRS (Building and Energy) — WA Form 75 | Owner Builder training | ❌ **No listing exists, and none can** — corrected 22 Jul 2026. WA runs the knowledge-requirement model: approval issues only where the applicant has "sufficient knowledge", evidenced by a **White Card** plus either WA building-practitioner/architect/surveyor/engineer registration **or** "owner-builder training with Western Australian specific content within the previous 24 months". The regulator page contains no approved-provider list — zero occurrences of "approved provider", "registered training" or "ABE". Previously recorded here as "✅ Listed", which was wrong: ABE's certificate is **accepted as evidence**, it is not a listing. Say "supports your Form 75", never "listed by" or "approved provider". Page last updated 9 Jul 2026. | `https://www.wa.gov.au/organisation/service-delivery/owner-builder-approval` |
| CBOS Tasmania | **CPD** (building, plumbing, electrical) | ✅ Listed as a CPD provider, each course individually approved for points — per `cpd-tas.astro` sources, verified 16 Jul 2026 | `https://www.cbos.tas.gov.au/topics/licensing-and-registration/cpd/additional-training-resources` |
| Building Commission NSW | Building CPD | ❌ **No listing exists, and none can.** NSW runs self-declaration plus audit; the regulator "cannot and does not endorse any provider of training and/or CPD". Do not seek or claim one. Verified 22 Jul 2026 | `https://www.nsw.gov.au/business-and-economy/licences-and-credentials/building-and-trade-licences-and-registrations/continuing-professional-development/for-builders-and-swimming-pool-builders` |
| ACT — City and Environment Directorate (Planning) | Owner Builder (ACT) | ✅ **Verified 22 Jul 2026** — under "Owner-builder licence courses": "You can find approved owner-builder licence courses at: **Access Building Education** / Absolute Owner Builder Online". **⚠ Two wrinkles, both material.** (1) **ABE is listed under the wrong name.** "Access Building Education" is not ABE's legal name (ABE Education Pty Ltd) and not its trading style. It is ABE — the link resolves to `abeeducation.edu.au` — but a reader sent to verify the listing will not find "ABE Education" on the page, which blunts the E-E-A-T value. Worth asking the Directorate to correct. (2) **The link points at a legacy URL:** `abeeducation.edu.au/training-courses/owner-builder-courses/act-owner-builder-course.cfm`. See the cutover note below. Note the listing is on **planning.act.gov.au**, not Access Canberra — the old Access Canberra owner-builder page now 404s after a site restructure. | `https://www.planning.act.gov.au/professionals/regulation-and-responsibilities/construction-licences` |
| Other regulators | Various | 🔍 To search | — |

### ⚠ Cutover risk — a .gov.au inbound link the redirect map does not cover

Found 22 Jul 2026. The ACT listing above links to:

```
https://abeeducation.edu.au/training-courses/owner-builder-courses/act-owner-builder-course.cfm
```

`redirects.csv` contains **no** rule for that path — no `.cfm` row, no `/training-courses/*` row, and
none of the six wildcards in `public/_redirects` (`/course/*`, `/program/*`, `/bundle/*`, `/payment*`,
`/signin*`, `/access-request-*`) matches it. **At cutover this government link 404s.**

This is the one link class this file calls "the strongest possible E-E-A-T signal... cannot be
self-claimed", so losing it costs more than its click volume suggests. The redirect map was scoped
from GSC equity data, which ranks by impressions and clicks — a government citation earning almost no
clicks is exactly the URL that scoping method misses.

**Not fixed here.** `public/_redirects` is generated and must never be hand-edited; the signed-off
source is `redirects.csv` (W1-6, 19 Jul 2026), and adding to a signed-off map is a decision, not a
tidy-up. The proposed row:

```csv
/training-courses/owner-builder-courses/act-owner-builder-course.cfm,redirect,/act-owner-builder-course,Inbound .gov.au link from planning.act.gov.au construction-licences (ACT owner-builder course list). Verified 22 Jul 2026.
```

Before adding it, sweep the rest of the legacy `.cfm` tree the same way: if the ACT listing points at
one, the TAS/QLD/WA/NSW equivalents very likely do too, from their own regulator pages, and each is
the same silent loss.

---

## 3. Verification Checklist (Before Using on Page)

Before displaying a government listing reference, verify all five:

- [ ] ABE Education is mentioned by name on the page
- [ ] The page is on an official .gov.au domain
- [ ] The page is current (not archived)
- [ ] The page specifically approves/lists the relevant course
- [ ] A screenshot has been taken as proof (with URL bar and date)

**If any check fails:** Do not display. Document why. Contact regulator to get listed.

---

## 4. On-Page Integration Template

### Course page integration (e.g., `/tas-owner-builder-course`)

**Visual badge/callout:**
```html
<div class="gov-listing-badge">
  <img src="tas-gov-crest.svg" alt="" aria-hidden="true" width="40" height="40">
  <div>
    <strong>Listed on CBOS Tasmania website</strong>
    <p>ABE Education is listed as an approved Owner Builder training provider by 
    Consumer, Building and Occupational Services Tasmania.</p>
    <a href="[gov URL]" target="_blank" rel="noopener">
      View our listing on cbos.tas.gov.au →
    </a>
    <small>Last verified: [date]</small>
  </div>
</div>
```

**Key rules:**
- Government logo/crest must be used respectfully (check usage guidelines)
- Link opens in new tab with `rel="noopener"`
- "Last verified" date must be present and recent
- Badge text must be crawlable HTML (not image-embedded)
- Never claim "endorsed by" — use "listed by" or "approved by"

### Placement options (choose based on page layout)

1. **Hero trust strip** — maximum visibility, ideal for money pages
2. **Accreditation section** — dedicated section with full details
3. **Pre-CTA micro trust bar** — reinforces trust just before conversion
4. **FAQ answer** — "How can I verify this course?" → link to gov listing

### Schema integration

```json
{
  "@type": "Course",
  "name": "Owner Builder TAS",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "ABE Education"
  },
  "recognizedBy": {
    "@type": "Organization",
    "name": "Consumer, Building and Occupational Services Tasmania",
    "alternateName": "CBOS Tasmania",
    "url": "https://cbos.tas.gov.au/"
  },
  "isRelatedTo": {
    "@type": "GovernmentService",
    "name": "Owner Builder Permit Training Providers",
    "serviceOperator": {
      "@type": "GovernmentOrganization",
      "name": "Consumer, Building and Occupational Services Tasmania",
      "url": "https://cbos.tas.gov.au/"
    },
    "url": "[specific listing page URL]"
  }
}
```

---

## 5. Content Wording by Listing Type

### Direct approval listing (ABE named on gov page)

> "ABE Education is listed as an approved training provider on the [Regulator] website. You can verify our listing directly at [gov URL]."

### Accepted provider (gov page accepts ABE's certificate)

> "ABE Education's Certificate of Completion is accepted by [Regulator] for [purpose, e.g., Form 75 applications]. Verify requirements at [gov URL]."

### Partner RTO listed (Blue Dog Training listed, not ABE)

> "Blue Dog Training (RTO 31193) is registered with ASQA and can be verified on training.gov.au. ABE Education facilitates enrolment for Blue Dog Training's nationally recognised courses."

**Important:** Never claim ABE is listed when only the RTO partner is listed. The distinction matters for both compliance and trust.

---

## 6. Ongoing Maintenance

| Task | Frequency |
|---|---|
| Re-verify all government listing URLs still work | Monthly |
| Update "Last verified" dates | After each verification |
| Screenshot updated listing pages | After each verification |
| Check for new listing opportunities | Quarterly |
| Search for ABE on newly relevant gov sites | When entering new states/markets |

---

## 7. Missing Listings to Pursue

When a government listing does not exist but should:

1. Identify the regulator and their approved provider page
2. Check application requirements
3. Prepare submission with: ABE Education details, course specifications, compliance evidence
4. Flag in Notion tasks database with priority

**Priority for new listings:**
- HIGH: States where ABE actively sells courses but has no gov listing
- MEDIUM: States being planned for expansion
- LOW: Nice-to-have for E-E-A-T but not commercially critical
