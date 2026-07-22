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
│       ├── Asbestos Awareness (ALL STATES) → AlertForce (RTO 91826)
│       ├── Silica Awareness (ALL STATES) → AlertForce (RTO 91826)
│       └── NSW Owner Builder → ⛔ ON HOLD — partnership not in force. Do not build.
│                                  See "NSW Owner Builder" below before writing anything.
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
│   │         credentialCategory = "CPD Points"
│   │         No ASQA disclosure needed
│   │         recognizedBy = CONDITIONAL — read the state below. There is no CPD default.
│   │
│   └── Which state? (ABE offers CPD in three, and only three)
│       ├── TAS — building, plumbing, electrical → CBOS Tasmania
│       │         recognizedBy = CBOS Tasmania
│       │         Approval is course-by-course by the Administrator of Occupational
│       │         Licensing, never provider-wide. A provider being listed does not make
│       │         its other courses approved. "CBOS-approved" is accurate per approved course.
│       │
│       ├── NSW — building → Building Commission NSW  (NOT NSW Fair Trading)
│       │         recognizedBy = NONE — omit the node entirely
│       │         NSW runs self-declaration plus audit, with no provider-approval regime.
│       │         Building Commission NSW "cannot and does not endorse any provider of
│       │         training and/or CPD", so asserting recognition claims what the regulator
│       │         disclaims. Say ABE's CPD *meets the NSW CPD criteria* under the
│       │         Home Building Act 1989. 12 points per year, self-declared at renewal.
│       │         (Building Commission NSW took over Fair Trading's building functions on
│       │         1 Dec 2023. Fair Trading still hosts older CPD guideline PDFs — hosting
│       │         a document is not administering the scheme.)
│       │
│       └── WA — real estate → Consumer Protection (LGIRS)
│                 recognizedBy = Consumer Protection (LGIRS)
│                 NOT Building and Energy — that is the WA *owner-builder* pathway.
│                 Both sit inside LGIRS (Department of Local Government, Industry
│                 Regulation and Safety, formed 1 July 2025) but they are different
│                 groups under different rules. Naming the department alone collapses them.
│                 WA DOES run an approved-provider regime, and **ABE Education Pty Ltd is
│                 on the approved list** — Real Estate and Business Agents + Settlement
│                 Agents; Legal Requirements, Ethics or Professional Responsibility,
│                 Professional Skills; delivered Online. Verified 22 Jul 2026 at
│                 consumerprotection.wa.gov.au/approved-cpd-training-providers
│                 (page last updated 17 Jun 2026). "Approved CPD training provider" is
│                 accurate in WA — it is the one CPD state where ABE may say "approved"
│                 of itself rather than of a course.
│
│                 ⚠ THE TRAP: that page opens "The following registered training
│                 organisations deliver CPD activities." ABE is on the list and is NOT an
│                 RTO. The regulator is using "registered training organisation" loosely as
│                 a label for its listed providers; it is not an ASQA registration and
│                 confers none. Never quote that sentence, never let it justify an RTO
│                 claim, and never paraphrase the listing as "ABE is a registered training
│                 organisation". ASQA registration is verifiable only on training.gov.au,
│                 and ABE is not on it.
│                 Settled by the regulator's own approval criteria, which never mention
│                 RTOs: "You must be an approved training provider to deliver CPD training",
│                 open to an organisation or an individual demonstrating relevant expertise
│                 and a strong history in property services subject matter. RTO status is
│                 not required to be approved, so the listing cannot imply it.
│                 (consumerprotection.wa.gov.au/cpd-training-providers-information,
│                 verified 22 Jul 2026)
│
│       ABE offers NO ACT or QLD CPD. Access Canberra and the QBCC do administer CPD in
│       their states, but there is no ABE product — do not build a page for either.
│       NSW *real estate* CPD is a retired product (confirmed 16 Jul 2026), not a gap.
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

**AlertForce (RTO 91826) — ACT White Card, and Asbestos / Silica Awareness in ALL states:**
(The White Card partnership is ACT-only. Asbestos and Silica Awareness are resold nationally —
corrected 23 July 2026, see §"Asbestos and Silica" below.)
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

### Asbestos and Silica Awareness — national resell, in force (23 Jul 2026)

**ABE resells AlertForce's (RTO 91826) Asbestos Awareness and Silica Awareness courses in every
state**, confirmed by Andrey 23 July 2026. This corrects an ACT-only scoping that was recorded in
five places across the kb and skill, which came from the ACT White Card partnership and was never
true of the awareness courses. The White Card partnership with AlertForce **is** ACT-only; do not
re-merge the two.

They are **nationally recognised and carry a course code**, so the ASQA disclosure framework
applies in full: name AlertForce and RTO 91826, "nationally recognised" is accurate, Statement of
Attainment is issued by AlertForce, and ABE is the publisher and enrolment partner, never the RTO.

**⚠ The course codes are UNVERIFIED and must not be written from memory.** Andrey confirmed codes
exist; nobody has yet recorded which. Before any page states one, open
`training.gov.au/Organisation/Details/91826` **in a browser** (WebFetch cannot — the register is a
client-rendered SPA) and confirm the exact code sits on AlertForce's current scope. That is the
step that was skipped for NSW Owner Builder, where the RTO was real, the partnership was assumed,
and none of the five required units was actually on scope.

**Do not confuse these with the TAS CBOS asbestos CPD course.** ABE has both, and they are
different products under different authority models: the CBOS one is a Tasmanian CPD point, these
are nationally recognised credentials. See `kb/register/cbos-tas-reference.md` §A6.

**Not built, and deliberately so (Andrey, 23 July 2026 — park and note).** Recorded here because
the demand is the largest unserved pool in the GSC data and will be rediscovered otherwise:
asbestos and silica carry **7,421 impressions across 77 queries** in the 16-month site-wide
export, at positions 37 to 77, with **one click**. About 6,200 of those impressions are generic
national or interstate (Melbourne-heavy) — previously written off as unaddressable, and
addressable after all now that the resell is known to be national. Against that, the existing
products have sold ~40 units for ~A$3,300 all-time. Revisit after phase 2, once the course codes
are verified.

---

### NSW Owner Builder — ⛔ ON HOLD, NOT IN FORCE (canonical status, 22 Jul 2026)

**This is the single owner of the NSW Owner Builder authority status. Every other file defers to it.**

**Do not build, publish, deploy or write copy for a NSW Owner Builder course page, and do not
state or imply an Upskill Institute arrangement for it, until Andrey confirms both gates below
have closed.** This is a commercial-fact hold, not a wording problem: no rewording makes the
claim publishable while the arrangement does not exist.

**Gate 1 — the partnership is not signed.** Confirmed by Andrey 22 Jul 2026: NSW Owner Builder
is *planned* to be delivered via an Upskill Institute partnership, but that is at the
negotiation stage and is **temporarily on hold**. Until it closes, ABE has no delivering RTO for
this course.

**Gate 2 — the units are not on Upskill's scope, and signing alone will not fix that.** Verified
21 Jul 2026 by reading Upskill's full scope of registration on training.gov.au in a browser
(WebFetch cannot — the register is a client-rendered SPA): **none** of the five units NSW Fair
Trading requires — CPCCWHS2001, CPCCOM2001, CPCCCM1011, CPCCOM1013, CPCCOM1014 — is on RTO
45708's scope. 45708 is a traffic-control / work-safety / first-aid RTO; the only construction
unit it holds is **CPCWHS1001**, the White Card unit. Registration itself is genuine and Current
to 08 Jul 2030, ASQA-managed, no adverse decisions. So even once the deal closes, Upskill must
add these five units to its scope before "nationally recognised" or "Statement of Attainment"
can stand on a NSW Owner Builder page.

**Re-verification when the hold lifts:** open `training.gov.au/Organisation/Details/45708` in a
browser and confirm all five units are listed. About a minute. If they are not, the claim still
fails, whatever the contract says.

**NSW White Card is unaffected and remains live.** That partnership is in place, and CPCWHS1001
*is* on 45708's scope — so it is both commercially and scope-wise sound. Nothing in this hold
touches it. Do not let this entry block White Card work.

**Existing pages.** `src/content/courses/owner-builder-nsw-course.mdx` and its `-w` variant
still carry the full nationally-recognised / RTO 45708 claim. Both are pre-cutover and not
indexed. Their copy was deliberately left unchanged pending Andrey's call, because correcting it
means either naming a real delivering RTO or pulling the nationally-recognised claim, and that
is a commercial decision. **Neither may ship at cutover in its current form.**

**Messaging, once and only once both gates close:**
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

### CPD courses — three states, and **not** one authority model

CPD is not a single pathway. TAS approves courses; NSW approves nothing and audits instead; WA is a
different regulator inside the same department as the WA owner-builder pathway. Copying one state's
CPD wording to another is the failure this section exists to prevent.

| | **TAS** — building, plumbing, electrical | **NSW** — building | **WA** — real estate |
|---|---|---|---|
| Regulator | CBOS Tasmania | Building Commission NSW | Consumer Protection (LGIRS) |
| Model | Course-by-course approval | Self-declaration + audit | Approved **provider** list |
| `recognizedBy` | CBOS Tasmania | **omit — none** | Consumer Protection (LGIRS) |
| May ABE say "approved"? | Yes, per approved course | **No** | Yes — of ABE itself |

Note how the three differ in *what* is approved: TAS approves the **course**, WA approves the
**provider**, NSW approves **nothing**. "Approved" without saying what was approved is wrong in at
least one state whichever one you mean.

**TAS messaging:**
> "This course is approved by CBOS Tasmania for CPD point allocation. ABE Education is listed as a CPD provider with CBOS, and each course is individually approved for points."

**NSW messaging** (note what it does *not* say):
> "ABE Education's CPD meets the NSW CPD criteria for builders and swimming pool builders, administered by Building Commission NSW under the Home Building Act 1989. Builders self-declare 12 points each year at renewal and keep their own records."

Never "Building Commission NSW-approved", "NSW Fair Trading-approved", "endorsed" or "mandated
provider" for NSW. The regulator states it "cannot and does not endorse any provider of training
and/or CPD" — there is no approval to claim.

**WA messaging:**
> "ABE Education is an approved CPD training provider for Western Australia's property industry, listed by Consumer Protection for Real Estate and Business Agents and for Settlement Agents. CPD points can be earned only through an approved provider, and ABE's activities are delivered online."

Name **Consumer Protection**, not LGIRS alone and never Building and Energy. Do not repeat the
regulator's "registered training organisations" framing in any form — see the trap in §2 and the
prohibited-claims table below.

**Schema — WA:**
```json
{
  "@type": "Course",
  "provider": { "@type": "EducationalOrganization", "name": "ABE Education" },
  "recognizedBy": {
    "@type": "Organization",
    "name": "Consumer Protection",
    "parentOrganization": "Department of Local Government, Industry Regulation and Safety",
    "url": "https://www.consumerprotection.wa.gov.au/"
  }
}
```
(`parentOrganization` is fine here — it describes the *regulator's* own department, not ABE's
relationship to an RTO. The prohibition below is on linking **ABE** to an RTO partner.)

**Schema — TAS (the only CPD state with a `recognizedBy`):**
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

**Schema — NSW:** identical, minus the `recognizedBy` node. Same shape as the WA owner-builder
knowledge-requirement model: the credential is real, the endorsement is not.

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
| "Nationally accredited" for QLD/WA/TAS/ACT OB or CPD courses | Those Owner Builder and CPD courses are not ASQA-accredited. NSW Owner Builder was the intended exception, but that arrangement is **on hold and not in force** — see the NSW Owner Builder status block above | "State regulator approved" / "Approved by CBOS Tasmania" (for the non-accredited courses) |
| "Nationally recognised" / "Statement of Attainment" / any RTO attribution on a **NSW Owner Builder** page | The Upskill partnership is unsigned and the five required units are not on RTO 45708's scope — the claim is unpublishable on both counts | Nothing. Do not build the page. See the NSW Owner Builder status block above |
| Blue Dog Training on ACT White Card page | ACT White Card is delivered by AlertForce, not Blue Dog | "AlertForce (RTO 91826)" on ACT pages |
| AlertForce on QLD/WA/TAS White Card pages | QLD/WA/TAS White Card is delivered by Blue Dog Training | "Blue Dog Training (RTO 31193)" on QLD/WA/TAS pages |
| "Self-paced" / "fully online at your own pace" White Card to NSW residents | Self-paced fully online White Card is restricted to WA and TAS residents; NSW requires trainer-led virtual classroom or in person | "Live virtual classroom or in-person training delivered by Upskill Institute (RTO 45708)" |
| "ABE Education (RTO 45708)", or ABE delivering/developing NSW Owner Builder | RTO 45708 belongs to Upskill Institute; ABE is enrolment partner only | "Delivered by Upskill Institute (RTO 45708) · Enrolled through ABE Education" |
| "NSW Fair Trading" as the NSW building CPD regulator | Building Commission NSW took over Fair Trading's building functions on 1 Dec 2023; Fair Trading retains general consumer matters only | "Building Commission NSW" |
| "Building Commission NSW-approved / endorsed CPD", "approved CPD provider" or "mandated provider" for NSW | NSW has no provider-approval regime; the regulator states it "cannot and does not endorse any provider of training and/or CPD" | "Meets the NSW CPD criteria administered by Building Commission NSW under the *Home Building Act 1989*" |
| `recognizedBy` on a NSW building CPD course | Asserts a recognition the regulator explicitly disclaims | Omit the node — as with the WA owner-builder knowledge-requirement model |
| Quoting "the following registered training organisations deliver CPD activities" from the WA approved-provider page, or paraphrasing ABE's listing as ABE being a registered training organisation | The regulator uses that phrase loosely as a label for everyone on its list. ABE appears on it and is **not** an RTO; the listing confers approval as a CPD provider, not ASQA registration | "ABE Education is an approved CPD training provider listed by Consumer Protection" — say what was approved, and by whom |
| "Approved" with no object, on any CPD page | TAS approves the course, WA approves the provider, NSW approves nothing — a bare "approved" is wrong in at least one state | "This course is approved by CBOS" (TAS) / "ABE is an approved CPD training provider" (WA) |
| "LGIRS" alone, or "Building and Energy", as the WA **real estate** CPD regulator | Real estate CPD sits with Consumer Protection; Building and Energy is the owner-builder pathway. Both are groups inside LGIRS, under different rules | "Consumer Protection (LGIRS)" |
| Any ACT or QLD CPD page, or NSW **real estate** CPD | ABE offers CPD in TAS, NSW and WA only; NSW real estate CPD was retired 16 Jul 2026 | Build only TAS, NSW building, WA real estate |
| `parentOrganization` (or `subOrganization`) linking ABE to any RTO partner in schema markup | Asserts corporate ownership — ABE is an enrolment partner, not a subsidiary, and there are three RTO partners | Give each RTO its own `Organization` node with its own `hasCredential`, and link only at course level via `Course.provider` |

---

## 5. ASQA Disclosure Placement (Accredited Courses Only)

When Page Identity Card shows `ASQA req'd: Yes`, disclosures must appear in **7 locations**. Substitute the correct RTO name and number per state:

- **QLD, WA, TAS:** Blue Dog Training (RTO 31193)
- **ACT:** AlertForce (RTO 91826)
- **NSW White Card:** Upskill Institute (RTO 45708) — nationally recognised; this disclosure framework applies. Trainer-led virtual classroom or in person (never self-paced online).
- **NSW Owner Builder:** ⛔ **ON HOLD — no RTO.** The Upskill arrangement is not in force and the five units are not on 45708's scope. This framework does not apply to a page that must not be built. See the NSW Owner Builder status block above.

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
- RTO accreditation for ACT White Card (CPCWHS1001), and for Asbestos Awareness and Silica
  Awareness **in every state** — the White Card partnership is ACT-only, the awareness courses
  are not
- Assessment and certification for the same
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
