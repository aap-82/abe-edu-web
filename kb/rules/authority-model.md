# Authority Model Decision Engine
**ABE Education's dual-pathway authority structure — the rules that govern every page**
**Sources:** 12-accreditation-approval-structure, 13-authority-model-corrections-summary, 10-unified-2026-seo-strategy

---

## 1. Core Principle

**ABE Education is NOT a Registered Training Organisation (RTO).**

ABE operates through a **dual-pathway authority model**:
- **Pathway 1:** RTO Partnerships → for nationally recognised training
- **Pathway 2:** Direct State Regulator Approvals → for CPD courses and Owner Builder education

This model is **stronger for E-E-A-T** than a single-RTO model because it provides multiple verification sources, state-specific expertise, and partnership transparency.

---

## 2. Provider Decision Tree

```
What type of course is this page about?
│
├── ASQA-accredited course? (White Card, Asbestos Awareness, Silica Awareness, NSW Owner Builder)
│   ├── YES → Provider = Blue Dog Training (RTO 31193), AlertForce (RTO 91826), or Upskill Institute (RTO 45708)
│   │         recognizedBy = ASQA
│   │         credentialCategory = "Statement of Attainment"
│   │         ASQA disclosure REQUIRED in 7 locations
│   │         ABE role = "enrolment partner" only
│   │
│   └── Which RTO? (state-specific)
│       ├── White Card QLD → Blue Dog Training (RTO 31193)
│       ├── White Card WA  → Blue Dog Training (RTO 31193)
│       ├── White Card TAS → Blue Dog Training (RTO 31193)
│       ├── White Card ACT → AlertForce (RTO 91826)
│       ├── White Card NSW → Upskill Institute (RTO 45708)
│       ├── Asbestos Awareness ACT → AlertForce (RTO 91826)
│       ├── Silica Awareness ACT → AlertForce (RTO 91826)
│       └── NSW Owner Builder → Upskill Institute (RTO 45708)
│
├── Owner Builder course?
│   ├── QLD / WA / TAS / ACT → Provider = ABE Education
│   │         recognizedBy = state regulator (see state table below)
│   │         credentialCategory = "Certificate of Completion"
│   │         No ASQA disclosure needed · ABE delivers directly
│   │         ├── TAS → CBOS Tasmania
│   │         ├── WA  → LGIRS — Form 75 owner-builder model (Building and Energy)
│   │         ├── ACT → Access Canberra
│   │         └── QLD → QBCC
│   │
│   └── NSW → nationally recognised qualification — routes to the ASQA-accredited branch above
│             Provider = Upskill Institute (RTO 45708) · recognizedBy = ASQA
│             credentialCategory = "Statement of Attainment"
│             ASQA disclosure REQUIRED · ABE role = "enrolment partner" only
│             (NOT direct ABE delivery; ABE does not develop or deliver NSW OB)
│
├── CPD course?
│   ├── YES → Provider = ABE Education
│   │         recognizedBy = state regulator
│   │         credentialCategory = "CPD Points"
│   │         No ASQA disclosure needed
│   │
│   └── Which state?
│       ├── TAS → CBOS Tasmania (approved CPD provider)
│       ├── ACT → Access Canberra
│       └── Other states → Check approval status
│
└── Bundle?
    └── Follow rules for the DOMINANT course type in the bundle
        (if mixed, follow the most restrictive pathway)
```

---

## 3. Messaging Rules by Course Type

### White Card courses (RTO-partnered)

**Two different RTO partners by state:**

**QLD, WA, TAS — Blue Dog Training (RTO 31193):**
> "This course is delivered in partnership with Blue Dog Training (RTO 31193), a nationally registered training organisation. Your Statement of Attainment and White Card will be issued by Blue Dog Training."

**ACT — AlertForce (RTO 91826) — White Card, Asbestos Awareness, Silica Awareness:**
> "This course is delivered in partnership with AlertForce (RTO 91826), a nationally registered training organisation. Your Statement of Attainment will be issued by AlertForce."

**NSW — Upskill Institute (RTO 45708):**
> "This course is delivered in partnership with Upskill Institute (RTO 45708), a nationally registered training organisation. Your Statement of Attainment and White Card will be issued by Upskill Institute."

Delivery mode in NSW is trainer-led virtual classroom (accepted as face-to-face) or in person — **not** self-paced online (self-paced fully online White Card is restricted to WA and TAS residents; see `online-delivery-policy-by-state.md`). Upskill Institute (RTO 45708) is also ABE's NSW Owner Builder partner.

**Schema pattern (substitute RTO name and number per state):**
```json
{
  "@type": "Course",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "[Blue Dog Training OR AlertForce]",
    "identifier": "[RTO 31193 OR RTO 91826]"
  },
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "online",
    "instructor": {
      "@type": "Organization",
      "name": "ABE Education"
    }
  }
}
```

### NSW Owner Builder (RTO-partnered — nationally recognised)

NSW Owner Builder is **not** like the other states' Owner Builder courses. It is a nationally recognised qualification delivered by **Upskill Institute (RTO 45708)**, with ABE as enrolment partner only — so it follows the **RTO-partnered / ASQA** pathway (full ASQA disclosure), not the state-approved Owner Builder pathway.

**Messaging:**
> "This course is delivered in partnership with Upskill Institute (RTO 45708), a nationally registered training organisation. Your Statement of Attainment will be issued by Upskill Institute. ABE Education is your enrolment partner."

**Schema pattern:**
```json
{
  "@type": "Course",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Upskill Institute",
    "identifier": "RTO 45708"
  },
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "instructor": {
      "@type": "Organization",
      "name": "ABE Education"
    }
  }
}
```

### Owner Builder courses (state-approved — QLD, WA, TAS, ACT)

**Approved messaging (example TAS):**
> "This course is approved by CBOS Tasmania for Owner Builder permit applications. ABE Education is listed as an approved training provider on the CBOS Tasmania website."

**Approved messaging (example WA):**
> "This course meets Western Australia's owner-builder training requirement. ABE Education's Certificate of Completion supports your WA Form 75 owner-builder approval application, administered by LGIRS (Department of Local Government, Industry Regulation and Safety)."

**Schema pattern:**
```json
{
  "@type": "Course",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "ABE Education"
  },
  "recognizedBy": {
    "@type": "Organization",
    "name": "CBOS Tasmania",
    "url": "https://cbos.tas.gov.au/"
  }
}
```

### CPD courses (state-approved)

**Approved messaging (example TAS):**
> "This course is approved by CBOS Tasmania for CPD point allocation. ABE Education is an approved CPD provider for Tasmania building practitioners."

**Schema pattern:**
```json
{
  "@type": "Course",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "ABE Education"
  },
  "recognizedBy": {
    "@type": "Organization",
    "name": "Consumer, Building and Occupational Services Tasmania",
    "alternateName": "CBOS Tasmania",
    "url": "https://cbos.tas.gov.au/"
  }
}
```

---

## 4. Prohibited Claims (Hard Failures)

Any of these appearing in content = automatic pre-production FAIL.

| ❌ Prohibited | Why | ✅ Correct alternative |
|---|---|---|
| "ABE Education is an RTO" | ABE is not an RTO | "ABE Education partners with registered training organisations" |
| "ABE Education (RTO 31193)" | RTO 31193 belongs to Blue Dog Training | "Blue Dog Training (RTO 31193)" |
| "ABE Education (RTO 91826)" | RTO 91826 belongs to AlertForce | "AlertForce (RTO 91826)" |
| "RTO 31193" attributed to ABE | Same as above | Always attribute to the RTO partner |
| "ASQA registered" without naming RTO | Implies ABE holds the registration | Name the specific RTO: "Blue Dog Training (RTO 31193)" or "AlertForce (RTO 91826)" |
| "ABE Education delivers training" (for ASQA courses) | ABE is the enrolment partner only | "Training delivered by [RTO Name]" |
| "ABE conducts assessment" | Assessment is exclusively an RTO function | "Assessment conducted by [RTO Name]" |
| "ABE issues qualifications" | Qualification issuance is exclusively an RTO function | "Your Statement of Attainment is issued by [RTO Name]" |
| "Nationally accredited" for QLD/WA/TAS/ACT OB or CPD courses | Those Owner Builder and CPD courses are not ASQA-accredited — **NSW Owner Builder is the exception** (nationally recognised via Upskill Institute RTO 45708) | "State regulator approved" / "Approved by CBOS Tasmania" (for the non-accredited courses) |
| Blue Dog Training on ACT White Card page | ACT White Card is delivered by AlertForce, not Blue Dog | "AlertForce (RTO 91826)" on ACT pages |
| AlertForce on QLD/WA/TAS White Card pages | QLD/WA/TAS White Card is delivered by Blue Dog Training | "Blue Dog Training (RTO 31193)" on QLD/WA/TAS pages |
| "Self-paced" / "fully online at your own pace" White Card to NSW residents | Self-paced fully online White Card is restricted to WA and TAS residents; NSW requires trainer-led virtual classroom or in person | "Live virtual classroom or in-person training delivered by Upskill Institute (RTO 45708)" |
| "ABE Education (RTO 45708)", or ABE delivering/developing NSW Owner Builder | RTO 45708 belongs to Upskill Institute; ABE is enrolment partner only | "Delivered by Upskill Institute (RTO 45708) · Enrolled through ABE Education" |
| `parentOrganization` (or `subOrganization`) linking ABE to any RTO partner in schema markup | Asserts corporate ownership — ABE is an enrolment partner, not a subsidiary, and there are three RTO partners | Give each RTO its own `Organization` node with its own `hasCredential`, and link only at course level via `Course.provider` |

---

## 5. ASQA Disclosure Placement (Accredited Courses Only)

When Page Identity Card shows `ASQA req'd: Yes`, disclosures must appear in **7 locations**. Substitute the correct RTO name and number per state:

- **QLD, WA, TAS:** Blue Dog Training (RTO 31193)
- **ACT:** AlertForce (RTO 91826)
- **NSW White Card:** Upskill Institute (RTO 45708) — nationally recognised; this disclosure framework applies. Trainer-led virtual classroom or in person (never self-paced online).
- **NSW Owner Builder:** Upskill Institute (RTO 45708) — nationally recognised; this disclosure framework applies

1. **Hero inline** (short form): "Training delivered by [RTO Name] (RTO [Number]) · Enrolled through ABE Education"
2. **Near every CTA button**: Full ASQA template paragraph (substitute RTO name/number)
3. **Footer full legal disclosure**: ABE role, RTO role, ABN, Standards reference
4. **Footer copyright bar**: Course code, RTO name + number, ABE ABN
5. **FAQ section**: 3 mandatory questions — Who delivers? Who to contact? How to verify?
6. **About Your Training Provider section**: Clear role separation cards
7. **Terms & Conditions link**: Separate page, linked from course page

---

## 6. Division of Responsibilities

### Blue Dog Training (RTO 31193) provides:
- RTO accreditation and ASQA compliance for **QLD, WA, TAS** White Card (CPCWHS1001) only
- Assessment and certification for White Card
- Statement of Attainment and White Card issuance
- Quality assurance oversight

### AlertForce (RTO 91826) provides:
- RTO accreditation for ACT White Card (CPCWHS1001), Asbestos Awareness, and Silica Awareness
- Assessment and certification for ACT White Card, Asbestos Awareness, and Silica Awareness
- Statement of Attainment issuance for all three courses

### Upskill Institute (RTO 45708) provides:
- RTO accreditation and ASQA compliance for the NSW Owner Builder course (nationally recognised)
- Assessment and certification for the NSW Owner Builder course
- Statement of Attainment issuance for the NSW Owner Builder course

### ABE Education provides:
- Online learning platform (LearnWorlds)
- Course content and materials
- Student support and enrolment
- Online training delivery interface
- Payment processing
- Marketing and student acquisition

---

## 7. Key Regulatory Facts (Verified)

These facts have been verified against primary government sources. Use them with confidence.

| Fact | Value | Source |
|---|---|---|
| CPCWHS1001 elements of competency | **4** (not 5) | training.gov.au |
| White Card access period (ABE) | 3 months from first login | ABE live page |
| $110 administration fee | Apprenticeships only — not White Card | ABE/Blue Dog agreement |
| "Instant" theory access | Incorrect — "within 4 business hours" | ABE live page |
| WA White Card invalidity trigger | Two-year industry absence (Regulation 316(b)) | WA legislation |
| WA Owner Builder fees | $212 residential / $467 commercial | LGIRS (Building and Energy) lgirs.wa.gov.au |
| WA Owner Builder training | NOT ASQA-accredited — any provider can deliver | LGIRS (Building and Energy) confirmation |
| QLD White Card | Issued as GCIT Card via WHSQ | WHSQ |
| QLD White Card delivery | "Connected Real Time Delivery" (Zoom) | WHSQ requirements |
| QLD White Card minimum age | 13+ | WHSQ |
| ABE ABN | 64 125 455 272 | ABR |
| ABE phone | +61-2-9798-5000 | ABE live site |
| ABE canonical URL | `https://www.abeeducation.edu.au/` | Confirmed |
| WHS abbreviation | WHS (not "WH&S") | Legislation |
| SafeWork NSW | "SafeWork" (not "Worksafe") | NSW government |

---

## 8. Why This Model Is Better for E-E-A-T

**Traditional single-RTO model:**
- Single accreditation pathway (ASQA only)
- One verification source
- Limited state-specific signals

**ABE's dual-pathway model:**
- National accreditation via RTO partners ✓
- Direct state regulator approval/recognition (CBOS, Access Canberra, WA LGIRS Form 75) ✓
- Multiple .gov.au verification links ✓
- State-specific expertise demonstrated ✓
- Partnership transparency (trust signal) ✓
- More verifiable credentials across more authorities ✓
