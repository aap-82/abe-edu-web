## ASQA Compliance Reference (Accredited Courses Only)

This section applies when the content is for an **accredited course** delivered by an RTO partner. Skip this section entirely for non-accredited content such as CPD courses or the Owner Builder courses.

> ⛔ **NSW Owner Builder was going to be the one Owner Builder exception. It is on hold and not in force** — the Upskill partnership is unsigned and the five required units are not on RTO 45708's scope. Do not apply this framework to a NSW Owner Builder page, and do not build one. `kb/rules/authority-model.md` → "NSW Owner Builder" is the canonical status. **NSW White Card is unaffected and live** — this framework applies to it normally.

> **Core principle:** ABE Education is the enrolment partner, not the training provider. The RTO delivers training, conducts assessment, and issues qualifications. Every page for an accredited course must make this distinction unmistakably clear.

### Which RTO partner? (check before writing any disclosure)

| Course | States | RTO Partner |
|---|---|---|
| White Card (CPCWHS1001) | QLD, WA, TAS | Blue Dog Training Pty Ltd (RTO 31193) |
| White Card (CPCWHS1001) | NSW | Upskill Institute Pty Ltd (RTO 45708) |
| White Card (CPCWHS1001) | ACT | AlertForce Pty Ltd (RTO 91826) |
| Asbestos Awareness | **All states** | AlertForce Pty Ltd (RTO 91826) |
| Silica Awareness | **All states** | AlertForce Pty Ltd (RTO 91826) |
| ~~Owner Builder (nationally recognised)~~ | ~~NSW~~ | ⛔ **ON HOLD — no RTO partner in force.** Intended: Upskill Institute Pty Ltd (RTO 45708). Unsigned, and the five units are not on its scope. Do not use. |

**Rule:** Always substitute the correct RTO name and number for the state. Never use Blue Dog wording on an ACT page or AlertForce wording on a QLD/WA/TAS page.

### Approved Disclosure Wording

There are **7 per-course-page disclosure locations** (numbered 1–7 below). The **sitewide compliance footer** is a separate, sitewide requirement that appears on all pages and is **not** counted among the 7.

#### Per-course-page disclosures (substitute [RTO Name] and [RTO Number])

**1. Hero Inline (Short Form)**
> Training delivered by [RTO Name] (RTO [Number]) · Enrolled through ABE Education

Blue Dog example: `Training delivered by Blue Dog Training (RTO 31193) · Enrolled through ABE Education`
AlertForce example: `Training delivered by AlertForce (RTO 91826) · Enrolled through ABE Education`

**2. Near Every CTA Button (ASQA Template)**
> ABE Education recruits and markets training on behalf of [RTO Name] Pty Ltd (RTO [Number]). [RTO Name] Pty Ltd is the Registered Training Organisation responsible for delivering this qualification and issuing certification. All training and assessment is conducted in accordance with the Standards for Registered Training Organisations 2025. [RTO Name] Pty Ltd can be verified on the national register at training.gov.au using RTO Code [Number].

**3. Per-Course Footer Legal Disclosure**
> This website is operated by ABE Education (ABN 64 125 455 272) as an authorised third-party enrolment partner. [Course name] ([course code]) is delivered by [RTO Name], a nationally recognised Registered Training Organisation (RTO [Number]) accredited by the Australian Skills Quality Authority (ASQA).
>
> ABE Education provides enrolment services, payment processing, and student support. [RTO Name] delivers all training and assessment, issues qualifications, and maintains student records in accordance with the Standards for Registered Training Organisations 2025. ABE Education does not deliver training, conduct assessments, or issue qualifications.

**4. Per-Course Footer Copyright Bar**
> Course: [Course Code] — [Course Name]
> Training Provider: [RTO Name] Pty Ltd (RTO [Number])
> Enrolment Partner: ABE Education Pty Ltd (ABN 64 125 455 272)

#### Sitewide compliance footer (used on all pages including non-course pages)

**Sitewide Footer Disclosure** *(sitewide — appears on all pages including non-course pages; separate from the 7 per-course-page locations)*
> ABE Education Pty Ltd (ABN 64 125 455 272) is not a Registered Training Organisation (RTO). Nationally recognised qualifications — including White Card (CPCWHS1001), Asbestos Awareness, and Silica Awareness training, and the NSW Owner Builder course — are delivered in partnership with Blue Dog Training Pty Ltd (RTO 31193) for QLD, WA and TAS, AlertForce Pty Ltd (RTO 91826) for ACT, and Upskill Institute Pty Ltd (RTO 45708) for the NSW White Card and NSW Owner Builder. All are registered training organisations regulated by the Australian Skills Quality Authority (ASQA). The QLD, WA, TAS and ACT Owner Builder courses and all CPD courses are delivered directly by ABE Education under state government approvals.

**5. FAQ (3 Mandatory Questions)**
The FAQ section must include these three questions (wording may be adapted to match the page tone):
- "Who delivers this training?" — answer must name the specific RTO for that state, its number, and ASQA accreditation
- "Who do I contact about training issues?" — answer must distinguish ABE (enrolment/payment) from the RTO (training/assessment)
- "How do I verify this RTO?" — answer must reference training.gov.au and the correct RTO code for that state

**6. About Your Training Provider Section**
A dedicated section (or equivalent role cards) must clearly separate ABE Education's role (enrolment partner) from the RTO's role (training delivery, assessment, certification). On pages covering multiple states, name both RTOs with their state assignments.

**7. Terms & Conditions Clause**
Separate T&Cs page — not on the course page itself, but the course page must link to it.

### Key Prohibitions

| ❌ Prohibited Wording | Why |
|---|---|
| "ABE Education delivers training" | ABE is the enrolment partner only — the RTO delivers training |
| "ABE Education (RTO 31193)" | The RTO number belongs to Blue Dog Training, not ABE |
| "ABE Education (RTO 91826)" | The RTO number belongs to AlertForce, not ABE |
| "ASQA registered" without specifying the RTO | Implies ABE holds the registration |
| "ABE Education is the enrolled learning platform" | Misleading — corrected in earlier reviews |
| Any claim that ABE conducts assessment or issues qualifications | These are exclusively RTO functions |
| Crediting an ABE person (e.g. the ABE course developer) as the developer/author of the accredited course | The RTO **develops, owns and delivers** the accredited course under the Standards for RTOs. ABE develops nothing here. Name the RTO as the developer (an Organization), and an ABE **reviewer** only. This holds for every asqa-accredited page — resold national units (White Card, asbestos, silica) and any ABE course delivered through an RTO's scope (NSW owner builder). Enforced at build: an asqa page must carry exactly **one** Person node (the reviewer) and credit the RTO via `Course.creator` + the credential's `recognizedBy`; a Person titled "developer" FAILS the build. |
| Blue Dog Training on ACT course pages | ACT courses are delivered by AlertForce |
| AlertForce on QLD/WA/TAS course pages | QLD/WA/TAS courses are delivered by Blue Dog Training |

---