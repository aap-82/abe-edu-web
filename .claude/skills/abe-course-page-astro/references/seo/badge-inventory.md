# ABE Education Trust Badge Inventory
## What You Can Actually Use — Course by Course

**Version:** 1.0
**Date:** March 2026
**Purpose:** Map every verifiable trust badge to the specific courses and pages that can legitimately display it. No badge appears without a verification source.

---

## Contents

1. How This Document Works
2. Badge Group 1: RTO Partnership Badges
3. Badge Group 2: Government Regulator Badges
4. Badge Group 3: Industry & Standards Badges
5. Badge Group 4: Social Proof Badges
6. Badge Group 5: Security & Payment Badges
7. Badge Group 6: Expert & E-E-A-T Badges
8. Quick Reference: Badge × Course Matrix
9. Actions Required to Complete This Inventory

## How This Document Works

Each badge entry includes: what the badge says, where it can appear, the verification source that makes it legitimate, and the exact wording to use. Badges are grouped by authority type, then mapped to specific course pages.

**Status key:**
- ✅ **Verified** — verification source confirmed, ready to implement
- 🔍 **To verify** — likely available but needs confirmation before displaying
- ❌ **Cannot use** — would be inaccurate or non-compliant

---

## Badge Group 1: RTO Partnership Badges

### Badge 1.1: Blue Dog Training Partnership

**Badge text:** "Delivered in partnership with Blue Dog Training (RTO 31193)"
**Badge type:** Accreditation / Partnership disclosure
**Status:** ✅ Verified

**Verification source:** training.gov.au RTO search — Blue Dog Training, RTO 31193
**Verification URL:** https://training.gov.au/Organisation/Details/31193

**Can appear on:**

| Page | Required? | Position |
|------|-----------|----------|
| White Card QLD (`/white-card-qld`) | 🔴 Yes — ASQA compliance | Hero subheading, accreditation section, below CTA, footer |
| White Card WA (`/white-card-wa`) | 🔴 Yes | Same 4 positions |
| White Card TAS (`/white-card-tas`) | 🔴 Yes | Same 4 positions |
| White Card Hub (`/white-card`) | 🔴 Yes | Introduction paragraph, accreditation note |
| Homepage | 🟡 Should | Partner logo bar below hero |
| Accreditation page (`/accreditation`) | 🔴 Yes | Section 1: RTO Partnerships |
| Footer (site-wide) | 🔴 Yes | Accreditation column |

**Cannot appear on:** CPD course pages, Owner Builder course pages, **White Card ACT** (ACT White Card uses AlertForce, not Blue Dog Training), or **White Card NSW** (NSW White Card uses Upskill Institute, not Blue Dog Training)

**Note:** White Card NSW is delivered by Upskill Institute (RTO 45708), so it uses the **Upskill partnership badge (Badge 1.3)**, not the Blue Dog Training badge. The NSW Owner Builder page uses the same Badge 1.3.

**Correct wording (QLD, WA, TAS — Blue Dog Training):**
- Full: "This course is delivered in partnership with Blue Dog Training (RTO 31193), a nationally registered training organisation. Your Statement of Attainment and White Card will be issued by Blue Dog Training."
- Short (hero/badge strip): "Delivered with Blue Dog Training (RTO 31193)"
- Schema: `provider` → `EducationalOrganization` with `identifier: "RTO 31193"`

**White Card ACT uses a different badge — see Badge 1.2 (AlertForce Partnership).**

**Incorrect wording (never use):**
- ❌ "ABE Education (RTO 31193)" — the RTO number belongs to Blue Dog Training
- ❌ "ABE Education is an RTO"
- ❌ "ASQA registered" (without specifying it's the partner, not ABE)

---

### Badge 1.2: AlertForce Partnership

**Badge text:** "Delivered in partnership with AlertForce (RTO 91826)"
**Badge type:** Accreditation / Partnership disclosure
**Status:** ✅ Verified — ACT White Card, Asbestos Awareness, Silica Awareness

**Verification source:** training.gov.au RTO search — AlertForce, RTO 91826
**Verification URL:** https://training.gov.au/Organisation/Details/91826

**Can appear on:**

| Page | Required? | Position |
|------|-----------|----------|
| White Card ACT (`/white-card-act`) | 🔴 Yes — ASQA compliance | Hero subheading, accreditation section, below CTA, footer |
| Asbestos Awareness ACT (when page created) | 🔴 Yes — ASQA compliance | Same 4 positions |
| Silica Awareness ACT (when page created) | 🔴 Yes — ASQA compliance | Same 4 positions |
| White Card Hub (`/white-card`) | 🟡 Should | ACT section reference (alongside Blue Dog for other states) |
| Accreditation page (`/accreditation`) | 🔴 Yes | Section 1: RTO Partnerships |
| Footer (site-wide) | 🔴 Yes | Accreditation column (already present) |

**Cannot appear on:**
- ❌ White Card QLD, WA, TAS pages (these use Blue Dog Training, not AlertForce)
- ❌ Owner Builder or CPD pages (not delivered through AlertForce)

**Correct wording (ACT courses — White Card, Asbestos Awareness, Silica Awareness):**
- Full: "This course is delivered in partnership with AlertForce (RTO 91826), a nationally registered training organisation. Your Statement of Attainment will be issued by AlertForce."
- Short (hero/badge strip): "Delivered with AlertForce (RTO 91826)"
- Schema: `provider` → `EducationalOrganization` with `identifier: "RTO 91826"`

**Incorrect wording (never use on ACT course pages):**
- ❌ "Blue Dog Training (RTO 31193)" — Blue Dog does not deliver ACT courses
- ❌ "ABE Education (RTO 91826)" — the RTO number belongs to AlertForce

---

### Badge 1.3: Upskill Institute Partnership

**Badge text:** "Delivered in partnership with Upskill Institute (RTO 45708)"
**Badge type:** Accreditation / Partnership disclosure
**Status:** ✅ Verified — NSW White Card, NSW Owner Builder (both nationally recognised, RTO-partnered)

**Verification source:** training.gov.au RTO search — Upskill Institute, RTO 45708
**Verification URL:** https://training.gov.au/Organisation/Details/45708

**Can appear on:**

| Page | Required? | Position |
|------|-----------|----------|
| White Card NSW (`/white-card-nsw`) | 🔴 Yes — ASQA compliance | Hero subheading, accreditation section, below CTA, footer |
| NSW Owner Builder (`/nsw-owner-builder-course`) | 🔴 Yes — ASQA compliance (nationally recognised) | Hero subheading, accreditation section, below CTA, footer |
| White Card Hub (`/white-card`) | 🟡 Should | NSW section reference (alongside Blue Dog and AlertForce for other states) |
| Owner Builder Hub (`/owner-builder-courses`) | 🟡 Should | NSW section reference (the other four states are direct ABE delivery) |
| Accreditation page (`/accreditation`) | 🔴 Yes | Section 1: RTO Partnerships |
| Footer (site-wide) | 🔴 Yes | Accreditation column |

**Cannot appear on:**
- ❌ White Card QLD, WA, TAS pages (Blue Dog Training) or White Card ACT (AlertForce)
- ❌ ACT Asbestos Awareness / Silica Awareness pages (AlertForce)
- ❌ QLD, WA, TAS, ACT Owner Builder pages (delivered directly by ABE under state approval — not RTO-partnered)
- ❌ CPD pages (delivered directly by ABE)

**Correct wording:**
- Full (NSW White Card): "This course is delivered in partnership with Upskill Institute (RTO 45708), a nationally registered training organisation. Your Statement of Attainment and White Card will be issued by Upskill Institute."
- ~~Full (NSW Owner Builder)~~ — ⛔ **ON HOLD, do not use.** The Upskill arrangement for NSW Owner Builder is unsigned and the five required units are not on RTO 45708's scope. No badge, no disclosure, no page. See `kb/rules/authority-model.md` → "NSW Owner Builder". NSW **White Card** wording above is unaffected.
- Short (hero/badge strip): "Delivered with Upskill Institute (RTO 45708)"
- Schema: `provider` → `EducationalOrganization` with `identifier: "RTO 45708"`

**Delivery-mode note (NSW White Card):** the NSW White Card is trainer-led virtual classroom (accepted as face-to-face) or in person. Never pair this badge with "self-paced" or "complete online at your own pace" wording — self-paced fully online White Card is restricted to WA and TAS residents.

**Incorrect wording (never use on NSW pages):**
- ❌ "ABE Education (RTO 45708)" — the RTO number belongs to Upskill Institute
- ❌ "Blue Dog Training (RTO 31193)" or "AlertForce (RTO 91826)" — neither delivers NSW courses
- ❌ "ABE Education is an RTO" / "ASQA registered" without naming Upskill as the partner

---

### Badge 1.4: Nationally Recognised Training (NRT) Logo

**Badge text:** NRT logo + "Nationally Recognised Training"
**Badge type:** Accreditation mark
**Status:** ✅ Verified (conditional — may only be displayed on RTO-partnered courses)

**Verification source:** The NRT logo is administered by the Australian Government. Only RTOs and their authorised partners may display it on courses that lead to nationally recognised qualifications.

**Can appear on:**

| Page | Condition |
|------|-----------|
| White Card state pages (all 5) | ✅ — CPCWHS1001 is nationally recognised |
| White Card Hub | ✅ — references nationally recognised courses |
| Homepage partner logo bar | ✅ — ABE delivers nationally recognised courses via partners |
| Accreditation page | ✅ — explaining the NRT framework |

**Cannot appear on:**
- ❌ CPD course pages (CPD courses are state-approved, not nationally accredited qualifications)
- ❌ Owner Builder course pages (Owner Builder courses are state-regulated, not NRT)

**Action required:** Confirm permission from Blue Dog Training to display NRT logo in connection with their courses. The NRT mark usage guidelines require RTO authorisation.

---

## Badge Group 2: Government Regulator Badges

### Badge 2.1: CBOS Tasmania — Owner Builder Approved Provider

**Badge text:** "Official CBOS Tasmania Approved Provider"
**Badge type:** Government approval
**Status:** ✅ Verified

**Verification source:** CBOS Tasmania approved training providers list
**Verification URL:** https://www.cbos.tas.gov.au/topics/licensing-and-registration/licensed-occupations/owner-builder-permit/training-courses

**Can appear on:**

| Page | Position |
|------|----------|
| TAS Owner Builder (`/tas-owner-builder-course`) | Government approval badge section (after hero) |
| Owner Builder Hub (`/owner-builder-courses`) | Tasmania section reference |
| Homepage | Text link in trust section (not logo — see Rule H5) |
| Accreditation page | Section 2: Direct State Approvals |
| Footer | Accreditation column (text reference) |

**Cannot appear on:**
- ❌ White Card pages (CBOS does not regulate White Card / construction induction — that's WorkSafe Tasmania)
- ❌ Non-TAS course pages
- ❌ CPD pages (unless CBOS CPD provider listing is separately verified — see Badge 2.2)

**Correct wording:** "ABE Education is listed by CBOS Tasmania as an approved training provider for Owner Builder permit education."
**Must include:** Verification link to the CBOS page + "Last verified: [Month Year]"

---

### Badge 2.2: CBOS Tasmania — CPD Provider

**Badge text:** "CBOS Tasmania Approved CPD Provider"
**Badge type:** Government approval
**Status:** 🔍 To verify — CBOS listing for CPD courses needs separate confirmation from Owner Builder listing

**Verification source:** CBOS Tasmania CPD provider register (if publicly listed)

**If verified, can appear on:**

| Page | Position |
|------|----------|
| TAS Building CPD (`/cpd-building-tas`) | Government approval badge section |
| TAS Plumbing CPD (`/cpd-plumbing-tas`) | Government approval badge section |
| TAS Electrical CPD (`/cpd-electrical-tas`) | Government approval badge section |
| TAS CPD Bundles (`/cpd-bundles/tas`) | Trust section |
| CPD Hub (`/cpd`) | Tasmania section reference |
| Accreditation page | Section 2: Direct State Approvals |

**Action required:**
1. Search `site:cbos.tas.gov.au "approved CPD provider"` or `"CPD training"`
2. Check if ABE Education appears on a CPD-specific provider list
3. If listed: screenshot, document URL, implement badge
4. If not publicly listed: contact CBOS to confirm approval status and whether a public listing exists

**Correct wording (if verified):** "This course is approved by CBOS Tasmania for CPD point allocation. ABE Education is an approved CPD provider for Tasmania building practitioners under the Building Act 2016."

---

### Badge 2.3: Access Canberra — ACT Owner Builder

**Badge text:** "Approved by Access Canberra"
**Badge type:** Government approval
**Status:** 🔍 To verify — approval reference number and public listing needed

**Verification source:** Access Canberra website
**Expected URL:** https://www.accesscanberra.act.gov.au/ (specific page TBC)

**If verified, can appear on:**

| Page | Position |
|------|----------|
| ACT Owner Builder (`/act-owner-builder-course`) | Government approval badge section |
| Owner Builder Hub (`/owner-builder-courses`) | ACT section reference |
| Accreditation page | Section 2: Direct State Approvals |

**Cannot appear on:**
- ❌ ACT White Card page (ACT White Card is delivered via AlertForce (RTO 91826), not through Access Canberra approval)
- ❌ Non-ACT pages

**Action required:**
1. Search `site:accesscanberra.act.gov.au owner builder approved training`
2. Contact Access Canberra to confirm ABE is an approved provider
3. Obtain approval reference number
4. Document verification URL

**Correct wording (if verified):** "This course meets Access Canberra's requirements for Owner Builder permit applications in the ACT."

---

### Badge 2.4: State WHS Regulators — White Card Recognition

These are **not approval badges**. ABE cannot claim "approved by" any state WHS regulator for White Card training. However, the White Card qualification itself is recognised by these bodies.

| Regulator | State | Status | What you CAN say | What you CANNOT say |
|-----------|-------|--------|-------------------|---------------------|
| SafeWork NSW | NSW | ✅ Factual | "Meets SafeWork NSW requirements for construction induction" | ❌ "SafeWork NSW Approved" |
| WHSQ (Workplace Health and Safety Queensland) | QLD | ✅ Factual | "Meets WHSQ requirements" | ❌ "WHSQ Approved Provider" |
| WorkSafe WA | WA | ✅ Factual | "Recognised by WorkSafe WA" | ❌ "WorkSafe WA Approved" |
| WorkSafe Tasmania | TAS | ✅ Factual | "Meets WorkSafe Tasmania requirements" | ❌ "WorkSafe Tasmania Approved" |
| WorkSafe ACT | ACT | ✅ Factual | "Meets ACT WHS requirements" | ❌ "WorkSafe ACT Approved" |

**Critical compliance note:** "WorkSafe Tasmania Approved" is not a valid claim — WorkSafe doesn't approve individual courses. The CPCWHS1001 unit is nationally recognised through the RTO (Blue Dog Training). State regulators accept it; they don't individually approve each provider.

**Can appear on:** Respective state White Card pages, in the "Why This Course Meets [State] Requirements" section — as factual statements, not badges.

---

## Badge Group 3: Industry & Standards Badges

### Badge 3.1: ASQA Reference

**Badge text:** ASQA logo or "Australian Skills Quality Authority"
**Badge type:** Regulatory body reference
**Status:** ✅ Verified (with conditions)

**What this actually means:** ASQA regulates RTOs. ABE Education is not directly registered with ASQA — Blue Dog Training and AlertForce are. ABE can reference ASQA as the regulatory body that oversees its RTO partners.

**Correct usage:**
- "Our RTO partner, Blue Dog Training (RTO 31193), is registered with the Australian Skills Quality Authority (ASQA)."
- Link to: https://www.asqa.gov.au/
- Can display ASQA logo in the accreditation column of the footer and on the `/accreditation` page

**Incorrect usage:**
- ❌ "ABE Education is ASQA registered"
- ❌ "ASQA Accredited" as a standalone badge on ABE's pages
- ❌ Displaying the ASQA logo without clarifying it applies to the RTO partner

---

### Badge 3.2: AQF (Australian Qualifications Framework) Reference

**Badge text:** "Australian Qualifications Framework"
**Badge type:** Standards reference
**Status:** ✅ Verified (factual reference)

**Can appear on:** White Card pages only (CPCWHS1001 sits within the AQF)
**Usage:** "Your Statement of Attainment meets Australian Qualifications Framework (AQF) standards."

**Cannot appear on:** CPD pages, Owner Builder pages (these are not AQF qualifications)

---

## Badge Group 4: Social Proof Badges

### Badge 4.1: Review Star Aggregate

**Badge text:** "★ 4.9/5 (X,XXX reviews)" (update with real numbers)
**Badge type:** Social proof
**Status:** 🔍 To verify — confirm actual rating and review count from platform data

**Can appear on:**

| Page | Position | Rating scope |
|------|----------|-------------|
| Homepage | Hero proof line | Site-wide aggregate |
| White Card state pages | Hero trust strip | Course-specific if available; site-wide if not |
| Owner Builder state pages | Hero trust strip | Course-specific if available; site-wide if not |
| CPD course pages | Hero trust strip | Site-wide aggregate |
| Reviews page (`/reviews`) | Page header | Site-wide aggregate |

**Rules:**
- Rating and count must exactly match `AggregateRating` in schema markup
- If using site-wide aggregate on a course page, label it: "ABE Education is rated 4.9/5 across all courses"
- If using course-specific rating, label it: "This course is rated 4.9/5 from X reviews"
- Never round up — if the actual rating is 4.87, display 4.8 or 4.87
- Link star rating to `/reviews` page or review platform

**Action required:** Confirm current aggregate rating and total review count from LearnWorlds analytics or review platform.

---

### Badge 4.2: Student Count

**Badge text:** "XX,000+ students certified" (update with real number)
**Badge type:** Social proof / authority
**Status:** 🔍 To verify — confirm actual number from enrolment records

**Can appear on:**

| Page | Position |
|------|----------|
| Homepage | Hero proof line |
| Homepage | Mid-page social proof section |
| About page | Key statistic |

**Rules:**
- Round down to the nearest thousand (never round up)
- Use "certified" only if referring to students who completed courses and received certificates
- Use "enrolled" if the number includes all enrolments regardless of completion
- Update quarterly as the number grows

**Cannot appear on:** Individual course pages (unless course-specific count is available and accurate)

---

### Badge 4.3: Operating History

**Badge text:** "Trusted since 2007"
**Badge type:** Social proof / longevity
**Status:** ✅ Verified — ABE Education has been operating since 2007 (ABN 64 125 455 272)

**Can appear on:**

| Page | Position |
|------|----------|
| Homepage | Mid-page social proof section |
| About page | Key fact |
| Footer | Brand column |
| Accreditation page | Introduction |

**Rules:**
- "Since 2007" must match ABN registration date — verify this is accurate
- Can combine with ABN: "Trusted since 2007 | ABN 64 125 455 272"
- Do not use "established" if ABE originally operated under a different name or structure

---

### Badge 4.4: Pass Rate

**Badge text:** "XX% first-attempt pass rate" (update with real number)
**Badge type:** Outcome metric / social proof
**Status:** 🔍 To verify — confirm actual pass rate data from Blue Dog Training assessment records

**Can appear on:**

| Page | Condition |
|------|-----------|
| White Card state pages | Only if pass rate data is specific to White Card courses |
| Course-specific pages | Only if data is specific to that course |
| Homepage | Only as site-wide average if calculated across all courses |

**Rules:**
- Must be factually accurate and verifiable
- Specify the time period: "95% first-attempt pass rate (2024–2025)" is stronger than an undated claim
- If you cannot verify the number, do not display it
- This is the education-sector equivalent of a money-back guarantee — it directly addresses "Will I pass?" anxiety

---

### Badge 4.5: CBOS Approval Rate

**Badge text:** "98% CBOS course approval rate"
**Badge type:** Outcome metric / authority
**Status:** ✅ Verified — 16 courses assessed, 98% approval rate documented

**Can appear on:**

| Page | Position |
|------|----------|
| TAS CPD pages (all trades) | Trust section |
| TAS CPD bundles | Trust section |
| Accreditation page | CBOS Tasmania section |
| About page | Key statistic |

**Cannot appear on:**
- ❌ White Card pages (CBOS doesn't assess White Card courses)
- ❌ Non-TAS pages
- ❌ Owner Builder pages (unless CBOS also assesses Owner Builder courses — verify separately)

**Correct wording:** "ABE Education has a 98% course approval rate across 16 courses assessed by CBOS Tasmania."

---

## Badge Group 5: Security & Payment Badges

### Badge 5.1: Secure Checkout / SSL

**Badge text:** 🔒 "Secure Checkout" or "256-bit SSL Encryption"
**Badge type:** Security
**Status:** ✅ Available (if site uses HTTPS — which it should)

**Can appear on:** Every page with a payment/enrolment CTA — in the pre-CTA micro trust bar

**Design:** Padlock icon + short text. Do not use a third-party seal (Norton, McAfee) unless ABE actually has an active subscription with that provider. A well-designed custom padlock badge outperforms unrecognised third-party seals (Baymard Institute finding).

---

### Badge 5.2: Payment Method Icons

**Badge text:** Visa / Mastercard / PayPal / Afterpay logos (as applicable)
**Badge type:** Payment security
**Status:** 🔍 To verify — confirm which payment methods LearnWorlds + ABE's payment gateway actually support

**Can appear on:** Pre-CTA micro trust bar on all course and bundle pages

**Rules:**
- Only display payment methods that are genuinely accepted
- Keep in original brand colours (not greyscale) — payment logos need instant recognition
- PayPal carries the strongest trust signal (63% of users say it adds significant security — CXL research)

**Action required:** Confirm full list of accepted payment methods from LearnWorlds payment settings.

---

### Badge 5.3: Money-Back Guarantee

**Badge text:** "100% Money-Back Guarantee" or "30-Day Money-Back Guarantee"
**Badge type:** Risk reversal
**Status:** 🔍 To verify — confirm whether ABE offers a money-back guarantee and the specific terms

**If offered, can appear on:**

| Page | Position |
|------|----------|
| All course pages | Pre-CTA micro trust bar |
| All bundle pages | Pre-CTA micro trust bar |
| Homepage | May reference in social proof section |

**Rules:**
- Guarantee terms must match the Refund Policy page exactly
- Badge must link to `/refund-policy`
- Specify the timeframe: "30-day" is stronger than "money-back guarantee" without a period
- Use shield/checkmark icon, not a seal that implies third-party certification

**Action required:** Confirm guarantee policy terms from ABE's refund policy.

---

## Badge Group 6: Expert & E-E-A-T Badges

### Badge 6.1: Named Expert Reviewer (Warwick Smith)

**Badge text:** "Reviewed by Warwick Smith, RTO Compliance Consultant"
**Badge type:** Expert authority / E-E-A-T
**Status:** 🔍 To verify — permission for public bio use, TAE version confirmation needed

**Can appear on:**

| Page | Position |
|------|----------|
| White Card TAS | Section 9: Expert Profile |
| White Card state pages (all) | Expert reviewer section |
| Owner Builder pages | Expert reviewer section (if Warwick reviews these) |

**Required elements:**
- Full name + professional title
- Credentials: TAE version (TAE40116 or TAE40122 — confirm), CPCWHS1001, CPCCWHS2001
- Experience summary (former CEO of Training Aid Australia, 9 years)
- Link to `/experts/warwick-smith/` author page (to be built)
- Link to LinkedIn: `linkedin.com/in/warwick-a-l-smith/`

**Actions required before displaying:**
1. Confirm TAE version held
2. Obtain Warwick's written permission for public bio use
3. Get a genuine quote for attribution
4. Build `/experts/warwick-smith/` author page with `ProfilePage` + `Person` schema

---

### Badge 6.2: ABN Display

**Badge text:** "ABN 64 125 455 272"
**Badge type:** Business legitimacy
**Status:** ✅ Verified

**Can appear on:**

| Page | Position |
|------|----------|
| Footer (site-wide) | Bottom bar, alongside copyright |
| Contact page | Business details section |
| Accreditation page | Organisation details |
| Homepage | Social proof section (paired with "Since 2007") |

**Why it matters:** Displaying an ABN is a strong Australian trust signal. It proves the business is real, registered, and transparent. Google's Quality Raters look for this as part of "who is responsible for this website" evaluation.

---

## Quick Reference: Badge × Course Matrix

### White Card Pages (All States)

| Badge | NSW | QLD | WA | TAS | ACT |
|-------|-----|-----|----|-----|-----|
| Blue Dog Training (RTO 31193) | ❌ | ✅ | ✅ | ✅ | ❌ |
| AlertForce (RTO 91826) | ❌ | ❌ | ❌ | ❌ | ✅ |
| Upskill Institute (RTO 45708) | ✅ | ❌ | ❌ | ❌ | ❌ |
| NRT Logo | ✅ | ✅ | ✅ | ✅ | ✅ |
| ASQA reference (via delivering RTO) | ✅ | ✅ | ✅ | ✅ | ✅ |
| AQF reference | ✅ | ✅ | ✅ | ✅ | ✅ |
| State regulator recognition text | ✅ SafeWork NSW | ✅ WHSQ | ✅ WorkSafe WA | ✅ WorkSafe TAS | ✅ WorkSafe ACT |
| CBOS badge | ❌ | ❌ | ❌ | ❌ | ❌ |
| Review stars | ✅ | ✅ | ✅ | ✅ | ✅ |
| Expert reviewer (Warwick) | 🔍 | 🔍 | 🔍 | ✅ (benchmark) | 🔍 |
| Secure checkout | ✅ | ✅ | ✅ | ✅ | ✅ |
| Payment icons | ✅ | ✅ | ✅ | ✅ | ✅ |
| Money-back guarantee | 🔍 | 🔍 | 🔍 | 🔍 | 🔍 |
| Pass rate | 🔍 | 🔍 | 🔍 | 🔍 | 🔍 |

### Owner Builder Pages

| Badge | NSW | QLD | WA | TAS | ACT |
|-------|-----|-----|----|-----|-----|
| CBOS Tasmania approval | ❌ | ❌ | ❌ | ✅ | ❌ |
| Access Canberra approval | ❌ | ❌ | ❌ | ❌ | 🔍 |
| Blue Dog Training | ❌ | ❌ | ❌ | ❌ | ❌ |
| Upskill Institute (RTO 45708) | ✅ | ❌ | ❌ | ❌ | ❌ |
| NRT Logo | ✅ | ❌ | ❌ | ❌ | ❌ |
| Review stars | ✅ | ✅ | ✅ | ✅ | ✅ |
| Expert reviewer | 🔍 | 🔍 | 🔍 | 🔍 | 🔍 |
| Secure checkout | ✅ | ✅ | ✅ | ✅ | ✅ |
| Payment icons | ✅ | ✅ | ✅ | ✅ | ✅ |
| Money-back guarantee | 🔍 | 🔍 | 🔍 | 🔍 | 🔍 |
| Operating since 2007 | ✅ | ✅ | ✅ | ✅ | ✅ |

### CPD Course Pages

| Badge | TAS Building | TAS Plumbing | TAS Electrical | WA Real Estate | NSW Building |
|-------|-------------|-------------|----------------|----------------|-------------|
| CBOS Tasmania CPD approval | 🔍 | 🔍 | 🔍 | ❌ | ❌ |
| 98% CBOS approval rate | 🔍 | 🔍 | 🔍 | ❌ | ❌ |
| Blue Dog Training | ❌ | ❌ | ❌ | ❌ | ❌ |
| NRT Logo | ❌ | ❌ | ❌ | ❌ | ❌ |
| Building Act 2016 reference | ✅ | ❌ | ❌ | ❌ | ❌ |
| Review stars | ✅ | ✅ | ✅ | ✅ | ✅ |
| Secure checkout | ✅ | ✅ | ✅ | ✅ | ✅ |
| Payment icons | ✅ | ✅ | ✅ | ✅ | ✅ |
| Money-back guarantee | 🔍 | 🔍 | 🔍 | 🔍 | 🔍 |

### CPD Bundle Pages

| Badge | TAS Building Bundle | TAS Plumbing Bundle | WA Real Estate Bundle | NSW Building Bundle |
|-------|--------------------|--------------------|----------------------|---------------------|
| All CPD badges for included courses | ✅ (inherit) | ✅ (inherit) | ✅ (inherit) | ✅ (inherit) |
| Savings calculation | ✅ | ✅ | ✅ | ✅ |
| Review stars (site-wide) | ✅ | ✅ | ✅ | ✅ |

### Homepage

| Badge | Status |
|-------|--------|
| Blue Dog Training logo + RTO 31193 | ✅ |
| NRT Logo | ✅ |
| ASQA reference | ✅ (via partner context) |
| CBOS Tasmania text link | ✅ |
| Access Canberra text link | 🔍 |
| Review star aggregate | ✅ (site-wide) |
| Student count | 🔍 (verify number) |
| "Since 2007" + ABN | ✅ |
| Government listing text links | ✅ (where verified) |

---

## Actions Required to Complete This Inventory

### High Priority (unlock new badges)

1. **Confirm AlertForce partnership scope** — which specific courses, RTO number, messaging approval
2. **Confirm Upskill Institute partnership scope** — NSW White Card is **confirmed in force** (22 Jul 2026) and CPCWHS1001 is on RTO 45708's scope. NSW Owner Builder is ⛔ **on hold**: partnership still in negotiation, and the five required units are **not** on 45708's scope — both must resolve before any OB badge, messaging or NRT/logo usage is discussed
3. **Verify CBOS CPD provider listing** — search CBOS website for public CPD provider register; contact CBOS if not found
4. **Verify Access Canberra listing** — search for ABE on ACT government approved providers pages
5. **Confirm actual review rating and count** — pull from LearnWorlds or review platform
6. **Confirm student count** — total students who have completed courses and received certificates
7. **Confirm pass rate** — obtain data from Blue Dog Training assessment records
8. **Confirm money-back guarantee terms** — review current refund policy

### Medium Priority (strengthen existing badges)

9. **Warwick Smith permission** — written consent for public bio, confirm TAE version, get genuine quote
10. **NRT logo permission** — confirm Blue Dog Training authorises ABE to display the NRT mark
11. **Payment methods** — confirm full list from LearnWorlds payment gateway settings
12. **Build `/experts/warwick-smith/` author page** — closes the E-E-A-T entity loop
13. **Build `/accreditation` page** — central hub for all trust badge verification

### Ongoing (maintain badge accuracy)

14. **Monthly** — verify all government listing URLs still resolve; update "Last verified" dates
15. **Quarterly** — update review counts, student numbers, pass rates
16. **Annually** — confirm all partnerships still active; check for new government listings

---

*All badges require verifiable sources. If it can't be verified, it can't be displayed.*
