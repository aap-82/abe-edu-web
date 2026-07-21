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
| CBOS Tasmania | Owner Builder training | ✅ Verified | `https://www.cbos.tas.gov.au/topics/licensing-and-registration/licensed-occupations/owner-builder-permit/training-courses` |
| LGIRS (Building and Energy) — WA Form 75 | Owner Builder training | ✅ Verified — ABE's Certificate of Completion supports the Form 75 owner-builder approval application | lgirs.wa.gov.au |
| Access Canberra | Owner Builder (ACT) | 🔍 To verify | accesscanberra.act.gov.au |
| Other regulators | Various | 🔍 To search | — |

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
