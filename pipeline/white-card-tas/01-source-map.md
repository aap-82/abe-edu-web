# 01 · Source map + fact ledger — /white-card-tas

**Page:** TAS White Card (construction induction card), unit CPCWHS1001
**Archetype:** 02 nationally-recognised-course · **Authority model:** asqa-accredited
**Regulator (card):** WorkSafe Tasmania via Service Tasmania · **RTO partner:** Blue Dog Training (RTO 31193)
**Built:** 23 July 2026 (Phase 3 evidence run 2)

> **Ship state: noindex.** `buyUrl` is TBC (not yet issued). The page builds noindex, as
> `/cpd-building-tas` did, and cannot go public until the buy URL resolves and is verified.

---

## A · Government / authoritative sources

| # | Source | URL | Holds | Class | Verified |
|---|---|---|---|---|---|
| S1 | National Training Register — Blue Dog Training (RTO 31193) scope | training.gov.au/Organisation/Details/31193 | RTO 31193 **Current** (reg. to 20 Mar 2030); **CPCWHS1001 on scope, Explicit, "Deliver and assess", 12 Jul 2022–20 Mar 2030, states QLD/WA/TAS** | primary / structure | **23 Jul 2026, in a browser** (WebFetch cannot read this SPA) |
| S2 | Unit CPCWHS1001 *Prepare to work safely in the construction industry* | training.gov.au/Training/Details/CPCWHS1001 | The nationally recognised unit; supersedes and is equivalent to CPCCWHS1001 | primary | via register, 26 May 2026 (kb legislation-references-tas.md:22) |
| S3 | Apply for a white card — Service Tasmania | service.tas.gov.au/services/working-in-tasmania/occupational-licences-and-certificates/apply-for-a-white-card | Lodge in person within 60 days of SOA; **$13.72** application fee; ID rules; issuing body | primary | 22 Jul 2026 (fee), 27 May 2026 (process) — kb card-lodgement-process-tas.md |
| S4 | White cards (construction induction) — WorkSafe Tasmania | worksafe.tas.gov.au/topics/licensing-permits-and-registration/white-cards-construction-induction | WorkSafe TAS issues the card; card voided after 2 yrs out of industry; min age 14 to apply | primary | 27 May 2026 |
| S5 | Construction Induction Card Application form (PDF) | worksafe.tas.gov.au/__data/.../Construction-Induction-Card-Application.pdf | The official lodgement form; SOA must show name, RTO number, issue date, unit code | primary / structure | 27 May 2026 |
| S6 | Online delivery policy (post-2019) | kb register (industry/regulator guides) | Self-paced fully online White Card permitted **for TAS + WA residents only**; must evidence residency; PPE demonstration must be supervised in real time | primary / compliance | 26 May 2026 |
| S7 | *Work Health and Safety Act 2012* (Tas) | legislation.tas.gov.au | The WHS statute behind construction induction; regulator WorkSafe Tasmania | background | 26 May 2026 |

**Registers consulted (no second copy made here):** `kb/register/card-lodgement-process-tas.md`,
`kb/register/state-fees-register.md` §2, `kb/register/online-delivery-policy-by-state.md`,
`kb/register/legislation-references-tas.md` §2, `kb/rules/asqa-disclosure-framework.md`,
`kb/rules/authority-model.md` §5–6, `kb/register/ppe-requirements.md`.

---

## B · Fact ledger (closed before Stage 2)

### Regulatory (verified against source — never asked, never defaulted)

| Fact | Value | Source | Verified |
|---|---|---|---|
| Unit code | **CPCWHS1001** *Prepare to work safely in the construction industry* | S2 | 26 May 2026 |
| Unit is nationally recognised | Yes | S1, S2 | 23 Jul 2026 |
| RTO partner delivers & assesses | Blue Dog Training Pty Ltd, **RTO 31193**, holds CPCWHS1001 on scope for TAS | **S1** | **23 Jul 2026** |
| Delivery mode permitted (TAS residents) | Self-paced fully online **permitted for TAS residents only**; must evidence TAS residency | S6 | 26 May 2026 |
| Assessment includes | Supervised PPE demonstration (real-time), part of the video assessment | S6, ppe-requirements.md | 26 May 2026 |
| Card issued by | **WorkSafe Tasmania via Service Tasmania** — NOT ABE, NOT the RTO | S3, S4 | 27 May 2026 |
| Government card fee | **$13.72** (new + replacement), paid at Service Tasmania | S3 | 22 Jul 2026 |
| Lodgement | In person at a Service Tasmania centre, within **60 days** of the SOA | S3 | 27 May 2026 |
| Card validity | No expiry date; voided if out of the construction industry **2 consecutive years** | S4 | 27 May 2026 |
| Min age to apply for card | 14 | S4 | 27 May 2026 |
| Interstate recognition | A current interstate white card is recognised nationally; no TAS card needed | S4 | 27 May 2026 |
| Legislation | *Work Health and Safety Act 2012* (Tas); regulator WorkSafe Tasmania | S7 | 26 May 2026 |

### Internal (confirmed by Andrey, 23 Jul 2026 — not researchable)

| Fact | Value | Confirmed |
|---|---|---|
| Course price (to ABE) | **$59** | 23 Jul 2026 |
| Delivery/mode | Self-paced online | 23 Jul 2026 |
| Assessment format | **Video assessment + online questions** | 23 Jul 2026 |
| buyUrl | **TBC — not yet issued.** Page ships noindex until resolved | 23 Jul 2026 |
| Course developer (Person #1) | Dominic Ogburn | CLAUDE.md standing |
| Independent reviewer (Person #2) | Warwick Smith (compliance/currency) | CLAUDE.md standing |
| ABE entity | ABE Education Pty Ltd, ABN 64 125 455 272 | asqa-disclosure-framework.md |

**Two-cost structure (must be explicit on the page):** $59 course fee to ABE **plus** $13.72
government card fee to Service Tasmania. Students otherwise read $59 as the whole cost.

---

## C · Discrepancies and cautions found (logged, not silently fixed)

1. **Sitemap carries a superseded unit code.** `new site/abe-new-site-sitemap.md:36` lists TAS White
   Card as **CPCCWHS1001**. The register (S2, legislation-references-tas.md:22) has **CPCWHS1001**,
   verified against training.gov.au and explicitly noted as superseding CPCCWHS1001. **The register
   wins; the page uses CPCWHS1001.** The sitemap line should be corrected separately (not a page-build
   task; flagged for Andrey).

2. **authority-model.md §408 is imprecise for TAS.** It lists "White Card issuance" under Blue Dog's
   responsibilities for QLD/WA/TAS. That is true for QLD/WA (the RTO issues the card) but **NOT for
   TAS**, where WorkSafe Tasmania issues the card via Service Tasmania (S3, S4; state-fees-register
   §34 confirms the split). The page must state the TAS-specific process. Register wording flagged for
   tightening (non-blocking).

3. **Minor register date-label mismatch.** `card-lodgement-process-tas.md` §5 says fees "last updated
   1 July 2025"; its own header and `state-fees-register.md` §39 say "1 July 2026". **The fee agrees at
   $13.72 in all three**, so this is a stale label, not a figure conflict. Flagged for cleanup.

4. **Authority-language trap carried over from run 1's regulator.** CBOS owns owner builder and CPD;
   **WorkSafe Tasmania owns the White Card.** Never attribute the White Card to CBOS. (This run
   follows a CBOS-saturated build — the trap is live.)

5. **"ABE delivers training" is prohibited.** ABE is the enrolment partner and platform; **Blue Dog
   delivers and assesses**. ABE provides LearnWorlds, content and support; the SOA, assessment and
   national recognition are Blue Dog's. See asqa-disclosure-framework.md Key Prohibitions.

---

## D · Unknowns gate — CLOSED

Every internal fact is answered (§B). The one outstanding item, `buyUrl`, is a known TBC handled by
shipping noindex — it is not an unresolved regulatory fact and does not block the build, only the
public launch. No `[confirm:]` markers are needed: every regulatory fact above has a source + date.

**Gate status: closed. Stage 2 may begin.**
