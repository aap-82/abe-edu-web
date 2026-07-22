# Owner Builder Eligibility by State

Per-state eligibility and permit-trigger facts for ABE's owner builder course pages (NSW, QLD, WA, TAS, ACT). Use for course-page "Do I need a permit?" and eligibility sections.

**Verified:** 26 May 2026 against state regulator pages (Service NSW / Building Commission NSW, QBCC) and current cross-state guides. **Re-verify:** annually, and before publishing any dollar figure in body copy. **Thresholds are reviewed periodically by each regulator and do change** — treat the figures below as current-as-at the verified date, not permanent.

Regulator names and remits are in `regulator-roles-by-state.md`. ABE develops and delivers the owner builder course directly in **QLD, WA, TAS and ACT**. The **NSW** Owner Builder course is delivered by ABE's RTO partner **Upskill Institute (RTO 45708)**, with ABE as enrolment partner only.

---

## 1. Eligibility & permit-trigger matrix

| State | Permit required for residential work above | Approved owner-builder course required? | Permit frequency limit |
|---|---|---|---|
| **NSW** | $10,000 (incl. labour + materials), where the work needs development consent/CDC | Yes — **if work is valued over $20,000**. Between $10k–$20k a permit is needed but the course is not. | One permit per 5 years (exceptions: same land, or special circumstances via Form 7) |
| **QLD** | $11,000 (total value, incl. GST; labour + materials) | Yes — QBCC-approved course, before applying | One permit per 6 years (exemptions in exceptional circumstances; barred if a permit was cancelled in the last 3 years) |
| **WA** | $20,000 (called **Owner Builder Approval**) | Yes — approved owner-builder course (WA uses a knowledge-requirement model; certificate supports the **Form 75** application) | Not formally restricted; repeat applications attract additional scrutiny |
| **TAS** | ≈ $5,000 (⚠️ sources vary — some cite higher; **verify with CBOS**) | Yes — a **Tasmanian-approved** course, completed within the last 12 months. **Not required for Class 10a/10b** buildings (sheds, garages, fences). | Two permits per 10-year period (strictest in Australia) |
| **ACT** | $12,000 | Yes — approved owner-builder course | Verify current limit with Access Canberra |

---

## 2. Common eligibility criteria (most states)

- **Natural person, not a company** in most states (QLD allows a company applicant with all directors' details; leaseholders may apply with the owner's written permission).
- **At least 18 years old.**
- **Own the land** (or be purchasing it, or hold a qualifying lease — NSW accepts a lease of at least 3 years).
- **Intend to occupy the completed dwelling as your principal place of residence** — investment/commercial builds are generally excluded. (NSW and QLD both test this; the stated residency-intention period varies by source — confirm the current wording with the regulator before quoting a specific number of months.)
- **You take on the licensed builder's responsibilities** — site safety as principal contractor under WHS law, coordinating licensed trades, statutory warranties, and building compliance. The permit is not a trade licence: plumbing, electrical, gasfitting and similar still require separately licensed tradespeople.

---

## 3. Per-state notes

**NSW** — Owner-builder permits are administered by **Building Commission NSW** under the *Home Building Act 1989* (it took over NSW Fair Trading's building functions in 2023); applied for via Service NSW. Over $20,000 the applicant must complete the required units of competency (or hold approved equivalent qualifications/experience). Resale disclosure obligations run for 7.5 years; penalties for working without a required permit are significant.

**QLD** — QBCC owner-builder permit; threshold is assessed on total project value (labour + materials combined), not materials alone. A title notation is recorded for 7 years and resale must be disclosed within 6 years. The 6-year rule can be waived only in exceptional circumstances (serious medical condition or severe financial hardship).

**WA** — Highest threshold in Australia ($20,000); WA calls it an **Owner Builder Approval** rather than a permit. WA uses a knowledge-requirement model — ABE's Certificate of Completion supports the applicant's **Form 75** rather than ABE being an "approved provider". (Regulator name is in flux — see the WA note in `regulator-roles-by-state.md`.)

**WA — how "sufficient knowledge" is satisfied** (verified 22 Jul 2026 at the Building and Energy owner-builder approval page, last updated 9 Jul 2026): approval issues only where the applicant has sufficient knowledge of an owner-builder's duties. At least one applicant must hold a **general construction induction card (White Card or blue card)** *and* either hold current or previous WA Building Practitioners registration, be a WA-registered architect / building surveyor / building engineer, **or** have completed **owner-builder training with Western Australian specific content within the previous 24 months**. Where several people own the land, only one need demonstrate the knowledge. There is **no prescribed course and no approved-provider scheme** — the page carries no provider list. The 24-month currency and the White Card prerequisite were already stated correctly on `/wa-owner-builder-course` and in `faqs-wa.ts`; they are recorded here so the register, not the page, is the source.

**TAS** — Lowest threshold and strictest frequency limit (two permits per decade). The approved Tasmanian course must be current (completed within 12 months) and is **not** required for Class 10a/10b structures. Applications are lodged at a Service Tasmania shop; CBOS administers the permit. (Permit fees by building class belong in the fees register, not here.)

**ACT** — Owner-builder licences are issued by the Construction Occupations Registrar through Access Canberra; home warranty insurance applies above $12,000, with resale disclosure within 6 years.

---

## 3a. Other regulatory thresholds stated on course pages

Thresholds that are not permit triggers but are stated in page copy, and so need an owner and a date
like any other government figure.

| Threshold | State | What it triggers | Status |
|---|---|---|---|
| **$150,000** (excluding GST) | QLD | The **QLeave portable long service leave levy**, imposed on the total direct and indirect cost of building and construction work costing $150,000 or more. Owner builders are exempt from paying but must still notify QLeave and quote the permit number. Under the *Building and Construction Industry (Portable Long Service Leave) Act 1991*. | ✅ Verified 22 Jul 2026 against QBCC's QLeave levy page (issuing authority), which states the figure and the GST exclusion. Stated in `src/data/modules.ts`. |
| **$50,000** | WA | **Class 10a** threshold. As of **1 July 2026**, constructing a Class 10a building (a non-habitable building such as a private garage, carport or shed) valued at **less than $50,000** does not have to be carried out by a registered building contractor, and a homeowner may build one without obtaining owner-builder approval. Building permit requirements and the building standards still apply at any value. Separate from, and additional to, the $20,000 general approval trigger. | ✅ **Verified 22 Jul 2026** against Building and Energy, "Building or renovating your home" (page last updated 20 Jul 2026): "As of 1 July 2026, the construction of Class 10a buildings valued at less than $50,000 do not need to be carried out by a registered building contractor in Western Australia" and "a homeowner can build a Class 10a building on their own without obtaining owner-builder approval if the work is valued at less than $50,000". ⚠️ **The bound is "less than", not "up to".** At exactly $50,000 the exemption does not apply. Do not write "up to $50,000". |

The $50,000 row is deliberately recorded as a gap rather than omitted. It is already on a live page,
so a silent absence from this register would read as "not a government figure" rather than "not yet
checked".

---

## 4. Sources & verification

- NSW: service.nsw.gov.au (apply for an owner-builder permit); fairtrading.nsw.gov.au (owner-builder permits)
- QLD: qbcc.qld.gov.au (about owner building / apply / rules for previous owner builders)
- WA: wa.gov.au (Owner Builder Approval, Form 75) — confirm current regulator name
- TAS: cbos.tas.gov.au (owner-builder permit) — **confirm the current threshold**
- ACT: accesscanberra / planning.act.gov.au (construction licences)
- QLD (QLeave levy threshold, §3a): https://www.qbcc.qld.gov.au/resources/qleave-levy — verified 22 Jul 2026
- WA (Class 10a $50,000 threshold, §3a): https://www.wa.gov.au/organisation/building-and-energy/building-or-renovating-your-home — verified 22 Jul 2026, page last updated 20 Jul 2026. Note the owner-builder approval page itself (`/organisation/service-delivery/owner-builder-approval`) does **not** carry this figure — it states only the $20,000 general trigger, which is why an earlier check recorded the $50,000 as unverified.

Always confirm the current dollar threshold, course requirement and frequency rule against the regulator before publishing them on a course page. Where this file flags a figure as uncertain (TAS threshold, residency-intention period), do not state a precise number in body copy until verified.
