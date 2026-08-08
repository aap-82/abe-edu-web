# 01 · Source map + fact ledger — `/owner-builder-insurance`

**Page:** Owner builder insurance (W2-6, one of two service pages under the `/insurances` hub) ·
**Archetype:** 09 insurance type · **Recipe:** C (support/prose page — no `Course` node) ·
**Run type:** NEW page. Nothing ships without a human go-ahead.
**Researched:** 8 August 2026.

> Scoped from the migration plan's own note that Recipe C pages carry "no per-page regulatory facts
> beyond links" — that undersold this archetype in practice. Archetype 9's own required sections
> (`references/archetypes/09-insurance-type.md`) mandate a per-jurisdiction compulsory/optional
> determination, sourced and dated, same standard as a course page. Corrected mid-Stage-1, with
> Andrey's go-ahead, rather than shipped light and wrong.

---

## A · The headline finding (why this page is worth building)

**In every one of the five states ABE serves, an owner builder is NOT required or eligible to hold
government-backed statutory home *warranty/indemnity* insurance for the work they do themselves —
Tasmania is the one exception worth stating precisely, not eliding: TAS has no warranty scheme
either, but does mandate at least $5 million of public/construction liability insurance as a
condition of the permit itself, a different insurance type entirely.** Archetype 9's own worked
example calls this out as "the trust-earning gap" — broker pages imply cover is universally
compulsory; this page can tell a reader plainly that the *warranty* scheme does not cover their own
labour in any state they might build in, which is exactly why arranging private cover (through ABE's
insurance partner) is the only real protection available. This is a
genuine differentiator, not a assumed angle — see the per-state table in §C.

---

## B · Government / authoritative sources

| # | State | Source | URL | Holds | Verified |
|---|---|---|---|---|---|
| S1 | QLD | QBCC — About Owner-building | qbcc.qld.gov.au/home-owner-hub/owner-build/about-owner-building | owner builders excluded/ineligible for the Home Warranty Scheme; 6-year resale disclosure | 8 Aug 2026 (direct fetch, quoted) |
| S2 | QLD | QBCC — Queensland Home Warranty Scheme | qbcc.qld.gov.au/home-owner-hub/queensland-home-warranty-scheme | what the scheme covers, and that it is a contract-with-a-licensed-contractor scheme | 8 Aug 2026 |
| S3 | WA | wa.gov.au — Home indemnity insurance reminder about your obligations | wa.gov.au/government/announcements/home-indemnity-insurance-reminder-about-your-obligations | **direct quote**: "Owner-builders must obtain HII if they wish to sell their property within seven years from the time the building permit was granted" | 8 Aug 2026 (direct fetch, quoted) |
| S4 | WA | wa.gov.au — Home indemnity insurance fact sheet | wa.gov.au/government/publications/home-indemnity-insurance-fact-sheet | $20,000 work-value threshold; insurance obtained before accepting payment/commencing work (applies to the *licensed-builder* case; owner-builder timing is S3) | 8 Aug 2026 (direct fetch) |
| S5 | ACT | ACT Planning — Statutory warranties | planning.act.gov.au/community/build-or-renovate/before-you-start/building-contracts/statutory-warranties | **direct quote**: "The statutory warranty does not apply to work carried out by or for the Territory or the Commonwealth, or by a licensed owner–builder"; $12,000 threshold applies to licensed builders only | 8 Aug 2026 (direct fetch, quoted) |
| S6 | TAS | `kb/register/cbos-tas-reference.md` §B4 (already in-register) | cbos.tas.gov.au (Fact Sheet — Owner Builder Work) | "No mandatory home warranty insurance scheme exists in Tasmania for building work (including owner builder)" — **but** TAS owner builders must hold public/construction liability insurance of not less than $5 million, same as a licensed builder | in-register, carries `[VERIFY AT BUILD]`; re-corroborated 8 Aug 2026 via WebSearch citing the same CBOS Fact Sheet PDF, direct `WebFetch` on the PDF returned 403 |
| S7 | NSW | SIRA — Information for owner-builders | sira.nsw.gov.au/home-building-compensation/home-building-compensation-for-homeowners/information-for-owner-builders | owner builders not required to hold Home Building Compensation cover for their own work; contracted trades need cover for work > $20,000; resale consumer-warning disclosure | **8 Aug 2026 — NOT a direct primary fetch.** Two independent WebSearch AI summaries agree and both cite this SIRA URL by name, but `WebFetch` returned 403 (bot-blocked) and a browser navigation attempt timed out. See §E. |

Registers consulted first (single owner — no second copy made): `kb/content-source-map.md`,
`kb/register/eligibility-by-state.md`, `kb/register/cbos-tas-reference.md` §A6.

---

## C · Fact ledger — compulsory/optional by state (archetype 9's decisive question)

| State | Compulsory for the owner builder's own work? | Trigger / basis | Consequence if not held | Source |
|---|---|---|---|---|
| QLD | **No** — statutorily excluded from the QLD Home Warranty Scheme | n/a | No insurer to claim against for the owner builder's own defective/incomplete work; must give a prospective buyer written notice if selling within 6 years of completion | S1 |
| WA | **Conditional** — only if the owner builder intends to sell within 7 years of the building permit being granted, and the work is valued over $20,000 | resale within 7 years | Fines (third-party sources cite up to $10,000); purchaser can withdraw before settlement if not provided | S3, S4 |
| ACT | **No** — the statutory warranty (which is what the $12,000 threshold triggers) expressly excludes work by a licensed owner-builder | n/a | Liability sits with the owner builder directly, and survives a sale — no insurer stands behind the work | S5 |
| TAS | **No home warranty scheme** — but public/construction liability insurance of at least $5 million **is** mandatory for the permit itself, same requirement as a licensed builder | permit condition, in force from the start of work | No warranty-scheme consequence (none exists); the $5m liability cover is a permit precondition, not optional | S6 |
| NSW | **No** for the owner builder's own labour; **yes for any contracted trade** doing work over $20,000 (the trade's obligation, not the owner builder's) | resale within 7 years and 6 months of the permit (per §E's sourcing caveat) | Consumer-warning disclosure required in the contract of sale; purchaser can void the contract before settlement if omitted | S7 (see caveat) |

**Reading across all five:** no state requires an owner builder to insure their own labour under a
government scheme. WA and NSW attach a *resale disclosure/insurance* obligation, QLD and NSW attach
a *resale written-notice* obligation, ACT and TAS attach neither. The reader's actual exposure —
across every state — is that nothing government-backed covers defects in their own work if they
sell, which is the case for the partner referral, not upsell copy.

### Internal facts (ABE-controlled — none needed for Stage 1's unknowns gate)

No price, pass mark, module list or LearnWorlds fact applies — this is a referral/lead-gen page, not
a purchasable ABE product. The one internal fact this page states is the partner relationship, already
live and unchanged across three shipped pages:

| Fact | Value | Source |
|---|---|---|
| Partner | InsuranceTek Pty Ltd | `qld/tas/wa-owner-builder-course.mdx`'s existing `InsurancePartner` blocks |
| Principal broker | Mark Adams | same |
| Relationship length | "close to 20 years" helping ABE students | same |
| Commercial disclosure | ABE Education is not a licensed insurance provider; referral relationship | same, and archetype 9 §4 mandates disclosing it plainly in the body |

---

## D · Authority-model note

Archetype 9 carries **no authority model in the course-page sense** — no `Course` node, no
`recognizedBy`, no RTO. `guardrails.ts`'s authority-language checks are built around the `courses`
collection; confirm at Stage 6 whether this page's collection (likely `pages` or a new one — TBD at
Stage 5/6) is in scope for those checks at all, and route the finding to a `[skills]` item if not.

## E · Open item for a facts session — NSW figure needs a primary-source read

**Not resolved here, flagged rather than guessed.** The NSW $20,000 contracted-trade threshold and
the "7 years and 6 months" resale-disclosure window are corroborated by two independent WebSearch
summaries, both naming `sira.nsw.gov.au/.../information-for-owner-builders` as their source, and the
core fact (owner builders don't need HBC cover for their own work) matches the pattern in QLD/ACT/TAS.
But this build session could not get a direct primary-source read: `WebFetch` on the SIRA URL
returned HTTP 403, a guessed NSW Fair Trading redirect chain landed on a page with no detail, and a
browser `navigate` attempt to the SIRA URL timed out. Per the standing rule ("no figure enters
`kb/register/` without a source read in that session"), **this page states the NSW position using
the two-source-corroborated figures below Stage 1's own bar, but a facts session should do a proper
browser read of the SIRA page and write the confirmed figures into `kb/register/` (there is no
existing register row for insurance-by-state) before this page's next Stage 7 re-verification.**
Filed as a `[facts]` item in this run's demand list.

## Ship decision (Stage 1 only)

**Proceeds to Stage 2** on Andrey's go-ahead (asked and given, 8 Aug 2026) to do the live per-state
verification rather than build on the lighter Recipe C assumption. QLD/WA/ACT/TAS rest on
direct-quoted or already-verified sources; NSW rests on corroborated-but-unfetched sourcing, recorded
as such above rather than presented as equal-strength evidence.
