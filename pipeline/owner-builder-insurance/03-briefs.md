# 03 · Archetype selection + section briefs — `/owner-builder-insurance`

## 3a · Archetype

**Archetype 9 — insurance type**, adapted for a small cluster rather than one named cover.
`references/archetypes/09-insurance-type.md` is written for a page about one cover; this page's
existing source material (the live `InsurancePartner` blocks on `qld/tas/wa-owner-builder-course.mdx`)
already treats an owner builder's insurance needs as a small, related cluster — home warranty/
indemnity (the one with real state-by-state legal variation), contract works, and public liability
(materially uniform advice across states: recommended, rarely government-mandated). Applying
archetype 9's decision order to the cluster, with the compulsory/optional question answered per cover
rather than assuming one, keeps the archetype's spirit (answer the decisive question, disclose the
referral) without forcing three separate cover-specific pages the keyword data (§A of `02-gap.md`,
50/mo on the umbrella term versus 10/mo on any single-cover term) doesn't support building yet.
**Flagged as an editorial decision, not asked** — a reasonable synthesis of the archetype file and
the existing live pattern, not a fork into a materially different output.

No `Course` node. Schema: `Article` (or `Service`) + `BreadcrumbList` + `Person` (Warwick, reviewer
only — this is not ABE-developed content in the course sense, and no product is being sold).

## 3b · Section briefs

### Section: What insurance does an owner builder actually need?
Position: 1 (the plain-language definition, decision-order step 1)
Claim: an owner builder normally needs to think about three covers — contract works, public
liability, and home warranty/indemnity insurance — and only the third one varies by state and law.
Reader arrives: having been told generically "you need insurance" with no breakdown of what that
covers or why.
Objection defused: "which of these do I actually have to buy, versus what's just sensible?"
Facts that prove it: the three-cover breakdown itself, sourced to the existing partner relationship
and the per-state research in `01-source-map.md`.
Distinctive material: none of the competitor pages in `02-gap.md` §C separate "must-have" from
"strongly recommended" — they present a single bundled product.
Carrier: AnswerCapsule
Fails if: a reader still can't tell which cover is legally required versus optional after reading it.

### Section: Is home warranty/indemnity insurance compulsory for an owner builder?
Position: 2 (the decisive question — decision-order step 2)
Claim: no state ABE serves requires an owner builder to insure their own labour under a government
warranty scheme — QLD and ACT exclude them by statute, TAS has no scheme, WA and NSW only attach an
obligation if the owner builder later sells within 7 (WA) / 7.5 (NSW) years.
Reader arrives: having seen a broker page imply this is universally compulsory, or having seen a
government page for one state and wondering if it generalises.
Objection defused: "am I being upsold something I don't legally need?" (archetype 9's own framing)
Facts that prove it: `01-source-map.md` §C, all five rows, each sourced and dated 8 Aug 2026 (NSW
flagged as corroborated-not-fetched — state that caveat on the page, not just in the artefact).
Distinctive material: this is the whole reason the page is worth building — see `01-source-map.md`
§A.
Carrier: AnswerCapsule + a five-row state comparison table + VerifiedSources
Fails if: a reader in a non-compulsory state (four of the five) still can't tell they aren't obliged
to buy this specific cover.

### Section: What does cover include and exclude?
Position: 3
Claim: contract works and public liability cover the build and third parties; home warranty/
indemnity (where it applies) covers a future buyer against the owner builder's own defective or
incomplete work — not the owner builder's own losses.
Reader arrives: assuming one policy covers everything.
Objection defused: "if I have insurance, aren't I covered either way?"
Facts that prove it: general insurance-category facts, not state-specific — no new sourcing needed
beyond what a licensed broker would state generically; do not invent numeric limits ABE hasn't
confirmed with the partner.
Distinctive material: exclusions lead over inclusions, per archetype 9 §8's worked-copy note — the
reader's real risk is assuming cover exists where it doesn't.
Carrier: CanCant
Fails if: it reads as a feature list rather than naming what's excluded.

### Section: When must cover be in place?
Position: 4
Claim: contract works and public liability should be arranged before work starts (there's no cover
for a loss before the policy exists); home warranty/indemnity, where it applies, is a resale-time
obligation (WA: before settlement if selling within 7 years; NSW: a consumer-warning disclosure if
selling within 7.5 years; QLD: written notice if selling within 6 years) — not a start-of-build one.
Reader arrives: not realising the warranty timing is different from the works-insurance timing.
Objection defused: "I don't have immediate plans to sell, so can I leave this until later?" — no, for
works/liability cover; the warranty-side answer depends on the state and is conditional, not urgent
if there's no resale in view.
Facts that prove it: `01-source-map.md` §C's "Trigger / basis" column.
Distinctive material: this is the timing trap archetype 9 §6 names by name.
Carrier: Note (variant="caution") + the same comparison table referenced, not duplicated
Fails if: a reader conflates "get contract works cover now" with "the warranty obligation is now" —
they are not the same clock.

### Section: What happens if you don't hold the required cover?
Position: 5
Claim: the consequence is state-specific and mostly resale-side (a disclosure failure or an inability
to insure a defect claim against you), not a build-time penalty in most states — stated factually,
not as scare copy.
Reader arrives: primed by broker marketing to expect a generic "you'll be fined" message.
Objection defused: none new — this section's job is accuracy, not persuasion.
Facts that prove it: `01-source-map.md` §C's "Consequence if not held" column (WA fines up to $10,000
per third-party sourcing — flag as third-party-sourced since the direct wa.gov.au fetch didn't
independently confirm the figure; NSW/QLD disclosure and contract-voidability consequences).
Distinctive material: none — this is the "state the consequence and stop" instruction from archetype
9 §8, and the whole section exists so the page doesn't need scare copy elsewhere.
Carrier: table (reused) + one paragraph
Fails if: it reads as a warning trying to sell something.

### Section: How to arrange cover
Position: 6
Claim: ABE Education is not a licensed insurance provider; cover is arranged through ABE's partner,
InsuranceTek Pty Ltd (principal broker Mark Adams), on a referral basis.
Reader arrives: ready to act, needing a next step.
Objection defused: "is ABE just upselling me here?" — disclosed plainly, per archetype 9 §4's ban on
undisclosed referral relationships.
Facts that prove it: the existing, already-shipped `InsurancePartner` copy on three course pages —
same relationship, same wording, not a new claim.
Distinctive material: none needed — this section's job is the plain disclosure.
Carrier: InsurancePartner
Fails if: the referral relationship isn't stated in the body text itself (a footer disclaimer alone
doesn't satisfy archetype 9 §4).

### Section: Sources
Position: 7
Claim: every state's compulsory/optional position is sourced and dated.
Carrier: VerifiedSources + page-foot Sources block, all seven source rows from `01-source-map.md` §B,
NSW's caveat stated plainly rather than presented as equal-strength evidence.

## Forbidden carry-overs (archetype 9 §4, restated for this run)
- No enrolment CTA anywhere — the only action this page asks for is an insurance quote request.
- No recommended level of cover, no product comparison, no "best" claim between insurers.
- No scare-copy framing on the consequences section.
- State the NSW figures with their sourcing caveat intact — do not silently present them as
  equal-strength to the four directly-quoted states.
