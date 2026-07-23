# 01 · Source map + fact ledger + live-page audit — /wa-owner-builder-course

**Page:** WA owner builder course · **Archetype:** 01 state-approval course *(shape)* ·
**Authority model:** knowledge-requirement (Form 75 / Building Services Board)
**Run type:** AUDIT-AND-REBUILD of a LIVE, INDEXED page. Nothing ships without a human go-ahead.
**Audited:** 23 July 2026 (Phase 3 evidence run 3).

> This run closes the authority-model set: run 1 state-approved-direct, run 2 asqa-accredited,
> run 3 knowledge-requirement. The distinguishing schema fact for knowledge-requirement is a
> credential with **no `recognizedBy`** (no regulator, no RTO). The page has no `regulator` block
> and correctly emits no `recognizedBy` — confirmed at Stage 7.

---

## A · Authority-model audit — CLEAN (the headline)

Unlike run 2 (which found an ABE person wrongly credited as developer of an RTO course), the WA
page's knowledge-requirement language is **exemplary and correct throughout**:

| Check | Page | Verdict |
|---|---|---|
| "supports your Form 75 approval", not "approved course" | hero, subhead, disclaimer, TrustBand | ✅ |
| No "WA-approved course/provider" | disclaimer: "WA prescribes no owner-builder course and does not run an approved-provider scheme" | ✅ |
| "approval", not "licence"/"permit" for the OB step | whole `#licence` section clarifies approval vs licence vs permit | ✅ |
| No `recognizedBy` in schema | no `regulator` block → layout emits none | ✅ (verify Stage 7) |
| ABE not an RTO | disclaimer + TrustBand attestation | ✅ |
| **Dominic credited as developer** | `experts: [dominic-ogburn, warwick-smith]` | ✅ **CORRECT here** — knowledge-requirement courses ABE develops itself; the asqa developer-ban does NOT apply. Confirms the run-2 fix draws the right line. |

**Finding: the authority model is not where this page's defects are.** The value of this run is
fact **freshness and completeness**, below.

---

## B · Government / authoritative sources

| # | Source | URL | Holds | Verified |
|---|---|---|---|---|
| S1 | WA — Owner-builder approval (Building and Energy) | wa.gov.au/organisation/service-delivery/owner-builder-approval | approval process, sufficient-knowledge criteria, who can apply | 22 Jul 2026 (register); page cites 7 Jul |
| S2 | Form 75 — Approval, Owner-builder (PDF) | wa.gov.au/media/50162/download | the application form | 7 Jul 2026 |
| S3 | BSB — Sufficient knowledge policy (PDF) | wa.gov.au/.../bsb_policy_...owner-builder.pdf | the knowledge-requirement policy | Board-approved 10 Sep 2024 |
| S4 | LGIRS Building and Energy fees | wa.gov.au/.../building-and-energy-fees | $212 residential / $467 industrial-commercial approval fee | **22 Jul 2026, FY26-27** (register) |
| S5 | Building Act 2011 (WA) | legislation.wa.gov.au/.../law_a146968.html | $20,000 threshold; building classes | register |
| S6 | Building Services (Registration) Act 2011 (WA) | legislation.wa.gov.au/.../law_a146913.html | approval (BSB); s45(2) 6-year rule + Form 76 waiver; s99 $25,000 penalty | register |
| S7 | Home Building Contracts Act 1991 (WA) | legislation.wa.gov.au/.../law_a306.html | 7-year resale restriction | register |
| S8 | Work Health and Safety Act 2020 (WA) | legislation.wa.gov.au/.../law_a147087.html | PCBU duties | 7 Jul 2026 |

Registers consulted (single owner — no second copy made): `state-fees-register.md` §1 (WA row),
`eligibility-by-state.md` (WA + the $50,000 Class 10a row), `legislation-references-wa.md`.

---

## C · Fact ledger

### Regulatory (verified against register/source)

| Fact | Page value | Register | Verdict |
|---|---|---|---|
| OB approval trigger | over $20,000 | $20,000 | ✅ |
| OB approval fee (residential) | $212 | **$212, current FY26-27 (22 Jul 2026)** | ✅ figure correct |
| OB approval fee (ind-commercial) | $467 | **$467, current FY26-27** | ✅ figure correct |
| Class 10a exemption | "under $50,000" no approval | "**less than** $50,000", as of 1 Jul 2026 | ✅ ("under" = "less than"; page avoids the "up to" error the register warns against) |
| One approval per 6 years | "one approval every six years" | s45(2), 6 years, **waiver via Form 76** | ✅ figure; ⚠️ Form 76 waiver not stated (minor gap) |
| False-info penalty | $25,000 | s99, up to $25,000 | ✅ |
| 7-year resale restriction | footer-sourced | Home Building Contracts Act / BSR Act | ⚠️ verify it is stated in body, not only cited |
| White Card unit | CPCWHS1001 | CPCWHS1001 | ✅ |
| Regulator names | Building Services Board via Building and Energy | same | ✅ (register notes name "in flux" — currently correct) |
| **Approval validity** | **omitted** | **valid 6 months; building-permit application must follow within 6 months or it lapses** | ⛔ **MISSING on the page** |
| **Processing time** | "around six weeks" | **not in the register** | ⚠️ **UNVERIFIED — source it at S1 or mark as an estimate** |

### Internal (already on the live page — confirmed by being live; no new unknowns)

| Fact | Value |
|---|---|
| Course price | $179 |
| Pass mark / attempts | 80% / up to 3 |
| Structure | Introduction + 12 modules |
| Certificate | same-day Certificate of Completion |
| White Card bundle | +$99, $278 together |
| Developer / reviewer | Dominic Ogburn (dev, correct here) / Warwick Smith (reviewer) |

---

## D · Audit findings (the run's output — NOT fixed yet; live page, human gate)

1. **Fee provenance drift (freshness).** Page footer: "Building and Energy fees ($212 / $467) …
   2025-26 fee · confirmed 8 Jul 2026". The register was re-verified **22 Jul 2026** with explicit
   **FY26-27** status and the caveat that LGIRS still heads its table "2025-2026" and has published
   no 2026-27 schedule (taken as current on Andrey's confirmation). **The figures are correct; the
   page's provenance label is behind the register.** Bring the page to the register's dated status.

2. **Missing fact: the 6-month approval validity window (completeness).** The register states the
   approval lapses if a building-permit application does not follow within six months. The page never
   says this. It is material (an applicant could let approval lapse). Add it.

3. **Unverified "around six weeks" processing time (provenance gap).** On the page's `becomeSteps`,
   not in the register, not obviously at the cited source. Verify at S1 or reword as an explicit
   estimate. A regulatory-adjacent figure with no source is a Stage-1 gap.

4. **Reviewer date predates the content version (E-E-A-T / currency).** `reviewedBy` = 4 June 2026,
   but the modules are "v2.0, 27 Jun 2026" and "updated June 2026". The independent currency review
   pre-dates the content it vouches for by three weeks. Either re-review the v2.0 content or reconcile
   the dates. A currency claim that pre-dates its content is weak evidence.

5. **(minor) Form 76 waiver** to the one-per-6-years rule is in the register, not on the page.

**Severity:** none is an authority-model breach or a wrong live figure (so no `correct_and_safe`
emergency). #1 and #2 are the substantive ones; #3 and #4 are provenance/currency hygiene.

---

## E · Unknowns gate — CLOSED (no user questions)

Every **internal** fact is already on the live page and confirmed by being published (price, pass
mark, modules, certificate, bundle, reviewer). No internal fact is missing, so there is nothing to
ask. The open items in §D are **regulatory verification** (source the processing time; refresh the
fee provenance) and **editorial** (add the 6-month window; reconcile the review date) — all resolved
by the register/source or a rebuild decision, none by asking the user for an unresearchable fact.

**Gate status: closed. Stage 2 may begin.**

---

## F · Source verification (wa.gov.au, read in browser 23 July 2026; page last updated 9 Jul 2026)

Three of the §D findings are now resolved at the primary source, and a **new finding (#6)** emerged.

### F1 · Processing time — the claim is unsupported AND the source warns of delays

**No processing figure exists anywhere on the page** (a regex for weeks / business days / working days
returns nothing). Instead the page carries a standing notice:

> "We are currently experiencing a high volume of owner-builder approval applications. Our team is
> diligently working to ensure each application is processed as soon as possible. We apologise for any
> delays…"

The live ABE page states **"Processing takes around six weeks."** That figure is not on the source, is
not in the register, and the source is actively signalling the opposite. **Verdict: remove the figure
or reword to reflect the source.** Finding #3 upgraded from "unverified" to "unsupported and
counter-indicated".

### F2 · Approval validity — CONFIRMED, and the register's one-liner is incomplete

Verbatim: *"If no application for building permit is made, an owner-builder approval expires **6 months**
after its date of issue. If an application for building permit is made within 6 months of the approval's
issue, and a permit is not granted, the owner-builder approval expires when the application for building
permit is refused. If the building permit is granted, the owner-builder approval remains valid for the
duration of the building permit. Building permits are valid for two years."*

Three branches, not one. The register records only branch 1. **Write the fuller rule back to
`state-fees-register.md`** (register is the single owner) and state it on the page.

### F3 · NEW FINDING #6 — the six-year rule is stated imprecisely on the live page

Verbatim: *"The six-year limit between applications for owner-builder approvals **starts when a building
permit is granted**. If an owner-builder approval is issued but **not used**, because a building permit
was never issued, the person or people named on the approval **may apply for a new owner-builder
approval**. When a building permit is granted…, [they] must wait six years from the date the building
permit was issued…"*

The live page says: *"you can hold only one approval every six years."* That is **imprecise in a way
that could mislead**: the six-year clock runs from the **building permit being granted**, not from the
approval, and an approval that was never used (no permit) does **not** start the clock — you may apply
again. Someone who took an approval and did not build would read the current page as barred for six
years when they are not.

**Severity:** the highest-value finding of this audit. Not a wrong fee, but a rule stated in a way that
overstates a restriction on the reader. Correct it.

### F4 · Also confirmed in passing
- The **24-month** owner-builder training currency window (matches the register and the page).
- Regulator contact, if ever needed: 1300 489 099 / ownerbuilders@lgirs.wa.gov.au.

---

## G · Findings, re-ranked after source verification

| # | Finding | Status |
|---|---|---|
| 6 | **Six-year rule stated imprecisely** (clock starts at building-permit grant; unused approval does not bar reapplication) | **NEW — highest value** |
| 2 | 6-month approval validity omitted (and the fuller 3-branch rule now known) | confirmed at source |
| 3 | "Around six weeks" processing — **unsupported and counter-indicated** by the source | upgraded |
| 1 | Fee provenance behind the register (figures correct) | register-resolved |
| 4 | Reviewer date (4 Jun) predates content v2.0 (27 Jun) | **internal — must ask** |
| 5 | Form 76 waiver not mentioned | minor |

---

## H · CORRECTION to this audit — finding #2 was overstated (self-caught 23 Jul 2026)

**Finding #2 claimed the six-month approval validity was "MISSING on the page". That was wrong.**
The `#become` section already carried a caution Note: *"Mind the six-month clock. Your owner-builder
approval lapses if you do not apply for a building permit within six months, so line the steps up
before you lodge."*

**How the false finding happened.** The MDX was read in two chunks (lines 1-90 and 90-219) and the
`#become` section sits at ~line 246, outside both; the greps used to fill the gap searched for fee and
rule keywords, not for the existing Note. The audit then asserted an absence it had not actually
checked for. **An audit that reports a fact "missing" without having read the whole page is making the
same class of claim this pipeline exists to prevent — an assertion from partial evidence.** It was
caught only by reading the proposed diff, where the existing Note appeared as an unchanged context line
directly beneath a duplicate one this run had just added.

**Corrected finding #2:** the six-month rule was **present but incomplete** — the existing Note covered
only branch 1 (no permit application → lapses). The source's fuller rule adds branch 2 (application
made, permit refused → expires on refusal) and branch 3 (permit granted → valid for the permit's
duration; permits run two years). The fix applied is therefore an **enrichment of the existing Note**,
not a new one, and the duplicate Note this run briefly introduced has been removed.

**Standing lesson for the audit stage:** read the whole artefact before asserting an absence. A
"missing fact" finding requires a whole-file read, not a keyword grep — greps prove presence, never
absence.

---

## I · CORRECTION 2 — finding #3 was also wrong, same root cause (Andrey caught it, 23 Jul 2026)

**Finding #3 claimed the "around six weeks" processing time was "unsupported and counter-indicated by
the source". That was false.** The source has a whole section on it:

> **Time frame for application processing** — "The Licensing team aims to determine owner-builder
> approval applications as quickly and efficiently as possible. While many applications are processed
> promptly **(approximately within six weeks)**, actual timeframes may vary depending on the volume of
> applications received and the completeness of each submission."

**The live page was right. My "fix" replaced a true, sourced fact with a false statement**
("Building and Energy publishes no processing time"), and wrote that falsehood into
`state-fees-register.md` — where it would have misled every future run. Both are now corrected.

**Proven root cause.** The extraction regex was `\b\d+\s*(weeks|business days|working days)\b` — it
requires **digits**. The source spells the number in **words** ("six weeks"), so the pattern could never
match. Re-tested at source: `digitsRegexWouldMatch: false`, word-based regex matches `["six weeks"]`
immediately. I then reported "no processing figure exists anywhere on the page" — an assertion of
absence derived from a pattern that was structurally incapable of finding it.

**This is the SAME error as Correction 1, made twice in one audit — and the second instance happened
after §H had already written the lesson down.** Writing "greps prove presence, never absence" did not
stop me doing it again ninety minutes later, because the lesson was recorded as prose rather than as a
method change. That is the finding worth keeping.

**Method change (not just a lesson).** Before any "fact X is missing / unsupported" finding:
1. **Read the whole artefact**, expanded (accordions open), not a keyword slice.
2. **Never assert absence from a single regex.** If a pattern returns nothing, that is a hypothesis, not
   a result — re-query with a different shape (digits AND spelled-out words, synonyms, the section
   heading) before concluding absence.
3. **Prefer positive confirmation.** Find the section that WOULD contain the fact ("Time frame for
   application processing") and read it, rather than searching the page for the value.
4. An absence finding that would **remove or contradict live published content** gets a second,
   differently-shaped check before it is proposed.

**Corrected finding #3:** the page's six-week figure is **correct and sourced**. The improvement is to
carry the source's caveat (timeframes vary with volume and completeness), which the original stated
flatly. That is now what the proposal does.

### Findings table, re-corrected

| # | Finding | Final status |
|---|---|---|
| 6 | Six-year rule stated imprecisely (clock starts at permit grant) | ✅ REAL — the audit's one genuine content win |
| 1 | Fee provenance behind the register (figures correct) | ✅ REAL (minor) |
| 2 | Six-month validity | ⚠️ OVERSTATED — was present; enriched with branches 2 and 3 |
| 3 | "Around six weeks" processing | ❌ **FALSE FINDING** — the page was right; caveat added |
| 4 | Reviewer date predates content v2.0 | ⏳ open, internal, awaiting Andrey |
| 5 | Form 76 waiver | ✅ REAL (minor) |

**Audit accuracy: 3 real, 1 overstated, 1 false, 1 open.** An audit that produces a false finding on a
live page is worse than no audit, because it proposes removing correct content. Recorded here at full
severity rather than quietly amended.

---

## J · Form 75 read directly (primary source, 23 Jul 2026) — Andrey supplied it

Form 75 is the instrument the applicant signs, and reading it beat every secondary source used above.
Extracted from `new site/reference/owner-builder_approval_form75.pdf` (10pp).

### J1 · Finding #6 CONFIRMED at the highest authority (page 1)
> An applicant must *"not have been granted a building permit as an owner-builder within the last six
> years (or must have applied to the Building Services Board to waive this requirement; see page 9)"*.

The six-year clock runs from the **building permit being granted** — exactly the correction this run
proposed. The audit's one real content win is now backed by the form itself, not just the web page.

### J2 · CORRECTION 3 — my own proposed wording for branch 3 was wrong (page 2)
Form 75: *"An owner-builder approval expires six months after it is granted unless the approval holder
applies for a building permit within this time. If the owner-builder applies for a building permit and
the permit is refused, the owner-builder approval expires when the building permit is refused. **If the
building permit is issued the owner-builder approval expires when the building is complete.**"*

The wa.gov.au web page frames branch 3 as *"remains valid for the duration of the building permit …
permits are valid for two years"*. **These are not the same claim**, and my proposed Note had used the
web page's framing, importing a "two years" figure the Form does not make. Corrected to the Form's
wording. **Rule: where the form and the guidance page differ, the form wins** — it is what the
applicant signs. Recorded in `state-fees-register.md`.

### J3 · NEW FINDING #7 — the page names one pathway and sells it; there are four (page 5)
> *"There are four broad means by which applicants can demonstrate they possess sufficient knowledge …
> to meet the requirements of section 43(2)(b)(ii) of the Building Services (Registrations) Act."*

1. WA-relevant owner-builder course, **no more than two years** old, **plus** a white/blue card for
   *Prepare to work safely in the construction industry*.
2. **Current registration as a WA Building Practitioner** — *no card required*.
3. Current registration in the building industry not prescribed under s43(3)(b) (registered architects,
   building surveyors, building engineers) **plus** the card.
4. One of those registrations held **within the last five years** **plus** the card.

**Only pathway 1 needs ABE's course.** The live page said the course pathway was "the most common
pathway" without naming the others, so a registered builder, architect, surveyor or engineer reading it
would not learn they can skip the purchase entirely. That is precisely the "say the unhelpful thing"
principle in `PRODUCT.md` — telling the reader who does not need the course that they do not. Fix
applied: the four pathways are now stated, with "you may not need this course at all" and a direction to
put a registration number on the form instead.

### J4 · Also captured from the form
- **Home indemnity insurance**: owed to the purchaser if the dwelling is sold **within seven years of
  the building permit being issued** (Home Building Contracts Act 1991) — the clock runs from the
  permit, and the duty is to provide insurance, not a bare prohibition on selling.
- Certificate of Title / contract to purchase must be **dated within the last three months**.
- **SAT review** of a refusal or condition must be sought **within 28 days** (not on the page; minor).
- The form itself publishes **no** processing time (the six weeks lives on the guidance page, §I).

### J5 · Findings table, final

| # | Finding | Final status |
|---|---|---|
| 6 | Six-year rule runs from the building permit | ✅ REAL, confirmed by Form 75 p1 — the audit's best result |
| 7 | Four knowledge pathways; page named only the one it sells | ✅ **REAL, new — found only by reading the form** |
| 1 | Fee provenance behind the register | ✅ REAL (minor) |
| 5 | Form 76 waiver | ✅ REAL (minor) |
| 2 | Six-month validity | ⚠️ overstated (present); enriched, then re-corrected to the Form's branch-3 wording |
| 3 | "Around six weeks" | ❌ FALSE finding; page was right, caveat added |
| 4 | Reviewer date vs content v2.0 | ⏳ open, internal, awaiting Andrey |

**Method lesson (third of the run).** Three of my errors this audit came from reading *about* the
requirement (register, guidance page) instead of reading the *instrument* (Form 75). The form was in
the repo the whole time at `new site/reference/`. **Read the primary instrument first when one exists** —
it settled finding #6, corrected my own wording, and produced the only finding no secondary source had.
