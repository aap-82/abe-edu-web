# 07 · Pre-deploy verification — /white-card-tas

Independent measurement of the **built HTML** `dist/white-card-tas/index.html` (not the MDX source).
Every row records the value read from disk, not a claim from any prior artefact. Measured 23 Jul 2026.

Authority model: **asqa-accredited**. RTO partner: **Blue Dog Training (RTO 31193)**. ABE is NOT an RTO.
Unit code: **CPCWHS1001** (superseded CPCCWHS1001 must be absent). Price $59 / card fee $13.72 / total $72.72.
Page is intentionally **noindex** (buyUrl TBC) — a documented pre-launch state, treated as NOTE.

---

## Measured results

| Check | Measured value | Verdict | Evidence |
|---|---|---|---|
| H1 count | **1** | PASS | one `<h1 class="h1">` |
| H1 text | **"White Card Tasmania."** | PASS | `White Card Tasmania<span class="dot">.</span>` carries primary keyword |
| Section ids present | top, real, accepted, your-card, cost, how-it-works, content-review, faq, rto-partner | PASS | 9 `<section id>`; unided sections = hero(top), At-a-glance, TrustBand, CtaBand |
| Marker sequence | **01,02,03,04,05,06,07** | PASS | `eyebrow-i` values sequential, no gaps/dupes |
| 05 → dist (every plan id rendered) | all present | PASS | real/accepted/your-card/cost/how-it-works/content-review/faq/rto-partner + At-a-glance/TrustBand/CtaBand/ASQA-loc2 note/footer |
| dist → 05 (no stray section) | all traced | PASS | no dist section absent from the 05 table |
| Capsule 1 — At a glance | **40 words** | PASS | in 40–60 |
| Capsule 2 — `real` | **52 words** | PASS | in 40–60 |
| Capsule 3 — `accepted` | **51 words** | PASS | in 40–60 |
| Capsule 4 — `your-card` | **56 words** | PASS | in 40–60 |
| Capsule 5 — `cost` | **53 words** | PASS | in 40–60 |
| Capsule 6 — TrustBand (on-dark) | **19 words** | NOTE | below 40; it is the dark trust-band tagline, not a question-led section capsule — not a hard-blocker |
| Capsule 7 — `how-it-works` | **49 words** | PASS | in 40–60 |
| Capsule 8 — `content-review` | **46 words** | PASS | in 40–60 |
| FAQ has no capsule | correct | PASS | `#faq` opens on H2, no `.capsule` |
| JSON-LD @graph @types | Course, EducationalOccupationalCredential, BreadcrumbList, Person, Person | PASS | single server-rendered `@graph`, 5 nodes |
| Required nodes present | Course + Credential + BreadcrumbList + Person×2 | PASS | all present |
| credential `recognizedBy` | **Blue Dog Training / "RTO 31193" / training.gov.au…/31193** | PASS | not ABE — authority-model correct |
| `Course.offers.price` | **"59"** | PASS | equals on-page $59 (hero, glance, price-card, cta) |
| ABE-as-RTO assertion | **none found** | PASS | every mention pairs with "is not an RTO / not a registered training organisation" |
| "ABE is not an RTO" present | yes (×4: `real` capsule, FAQ, `rto-partner`, footer `.f-asqa`) | PASS | e.g. "ABE Education … is not a registered training organisation" |
| Blue Dog named as RTO 31193 | yes | PASS | hero, capsules, TrustBand attest, rto-partner, footer |
| ASQA loc 1 — hero inline | present | PASS | tick: "Delivered by **Blue Dog Training (RTO 31193)** · Enrolled through ABE Education" |
| ASQA loc 2 — CTA-adjacent full template | present | PASS | `<p class="note">` "ABE Education recruits and markets training on behalf of Blue Dog Training Pty Ltd (RTO 31193)…" — last body block before CtaBand |
| ASQA loc 3 — footer legal disclosure | present | PASS | `.f-auth` "…Blue Dog Training, a nationally recognised Registered Training Organisation (RTO 31193) accredited by the Australian Skills Quality Authority (ASQA)…" |
| ASQA loc 4 — copyright bar (code+RTO+ABN) | present | PASS | "**Course:** CPCWHS1001 … **Training provider:** Blue Dog Training Pty Ltd (RTO 31193). **Enrolment partner:** ABE Education Pty Ltd (ABN 64 125 455 272)." |
| ASQA loc 5 — 3 mandatory FAQ Qs | present | PASS | "Who delivers this training?" / "Who do I contact about a training or assessment problem?" / "How do I verify the RTO?" (first 3 items) |
| ASQA loc 6 — PartnerDisclosure block | present | PASS | `#rto-partner` `.p-disc` with role separation |
| ASQA loc 7 — /terms link | present | PASS | footer Legal `<a href="/terms">Terms</a>` |
| Image alt — logo mark | **len 0 (empty)** | PASS | decorative brand logo, empty alt correct |
| Image alt — Dominic portrait | **120 chars** | PASS | ≥80 |
| Image alt — Warwick portrait | **117 chars** | PASS | ≥80 (copy says "owner builder course" on a White Card page — minor content nit, not an alt-length defect) |
| FPO placeholder images | **2** (hero, your-card) | NOTE | real images not yet supplied — pre-launch placeholders, `.ph` divs |
| Hero CTA href | **/white-card** | NOTE | interim (buyUrl TBC) as planned |
| Sticky (top waynav) CTA href | **/white-card** | NOTE | interim |
| Sticky (bottom `ctastrip`) CTA href | **#enrol** | NOTE | scrolls to hero button (→ /white-card) |
| CtaBand (`cta-end`) CTA href | **#enrol** | NOTE | scrolls to hero button (→ /white-card) |
| "comprehensive" count | **0** | PASS | banned word absent |
| Em dashes (—) count | **13** — all in JSON-LD credential name (1) + source-citation labels (12, "Authority — page name") | PASS | none in running body prose; citation labels are the permitted exception |
| CPCCWHS1001 (superseded) count | **0** | PASS | superseded code absent |
| CPCWHS1001 count | **22** | PASS | correct code present |
| robots meta | `<meta name="robots" content="noindex,nofollow">` | NOTE (expected) | intentional pre-launch noindex |
| Absent from sitemap-0.xml | **0 occurrences** (file present, 1256 B) | PASS | noindex page correctly excluded |
| `[confirm:` markers | **0** | PASS | none left on publish path |

---

## Check-script output

| Script | Result |
|---|---|
| `check-claims.mjs` | no line names white-card-tas. Summary: **0 failing, 3 warning, 6 ok, 127 excluded** (the 3 warnings are CPD-register items, not this slug). Figures 150/150 match register. |
| `check-freshness.mjs` | no line names white-card-tas (warnings are CPD STALE-TAG/SOFT-DATE/NO-WHS items). |
| `check-pipeline.mjs` | see WARNs section — 1 FAIL (self-referential 07), 2 OK for this slug. |
| `system-health.mjs` | final tallies **1 failing, 14 warning, 14 ok**. The 1 failing is the self-referential missing-07 for this slug; plus a Stage-9 WARN. |

## WARNs / FAILs naming this slug (verbatim)

```
  FAIL  white-card-tas: missing artefact(s) — 07 (pre-deploy verification)
  OK    white-card-tas: 8 section(s) match the plan
  OK    white-card-tas: 8 capsule(s) match 04-content.md (figures normalised)
  WARN  No Stage-9 review for "white-card-tas" — that run was never seen by the learning loop
```

- The **FAIL** is `missing artefact 07` — this file, which did not exist when the scripts ran. **Expected / self-referential, not a defect.** It resolves once this artefact is on disk.
- The **WARN** (no Stage-9 review) is a process/learning-loop note, not a built-HTML defect.

---

## Verdict: **GREEN**

Every correct-and-safe veto passes on measured values:
- **Authority model intact.** No assertion that ABE is an RTO / delivers / assesses / issues the credential — every mention is paired with an explicit "not an RTO" disclaimer. Blue Dog Training is named as the RTO with number 31193 throughout, and the JSON-LD `recognizedBy` is Blue Dog / RTO 31193, never ABE.
- **No leaked superseded code.** CPCCWHS1001 count = 0; CPCWHS1001 count = 22.
- **All 7 ASQA disclosure locations present** and measured in the HTML.
- **Regulatory facts correct on-page:** $59 course, $13.72 card fee, $72.72 total; `Course.offers.price` = "59" equals the on-page price.
- Structure clean: exactly one H1, markers 01–07 sequential, section map conforms both directions, no `[confirm:` left, no "comprehensive", no em dashes in body prose.

**NOTES (not fails):** intentional `noindex` + interim `/white-card` / `#enrol` CTA targets are the documented pre-launch state — the buyUrl swap and `noindex` removal are the coupled ship blocker. TrustBand on-dark tagline is 19 words (below the 40–60 section-capsule target, but it is a trust-band summary line, not a section answer capsule). Two FPO image placeholders (hero, your-card) await real photos. Warwick's portrait alt text references "owner builder course" on a White Card page — a minor copy nit, not an alt-length or authority defect.

The only script FAIL for this slug is the self-referential missing-07 artefact, now written.

---

## 7b · Skill audits (abe-readability-audit, final-check, ai-detector) — added after the initial Stage 7 subagent, which had omitted them

### abe-readability-audit
- **Static lint (`audit_static.py`):** 0 FAIL, 4 FLAG. All four flags are the parser-vs-token-register
  limitation the skill documents (body size, ground, ink are CSS-variable tokens it cannot resolve) plus
  sub-12px text in **shared chrome** (header rail, pagebar, bundle-tile classes), not this page's body.
- **Render probe (`audit_render.py`):** 5 FAIL. Triaged:
  - **Page-specific and FIXED:** the ASQA location-2 `Note` rendered full-width (1273px @ 15px ≈ 135 CPL).
    Wrapped in `<div class="measure">`; now 480px @ 15px ≈ **64 CPL**. Rebuilt green.
  - **Probe false positive:** TrustBand "1:1 white-on-white" — the section is `bg-dark` rgb(26,26,26)
    with white text (~15:1). The probe measured the capsule's own rgba(255,255,255,0.06) overlay, not the
    composited dark bg. Not a defect.
  - **Shared chrome / template-wide (NOT introduced here, present on every ABE page incl. live ones;
    a site-wide component/token pass, logged for Stage 9 — condition 1, not fixed mid-run):**
    burger button overflow at 320px (324px) + tap target 40×20px (SiteHeader); low-contrast small labels
    in header nav ("On this page", "About" 2.5–2.8:1), footer "Sources" (3.81:1) and SectionWayfinder
    "Next" (2.81:1); and full-width prose in PriceCard `foot`, SectionWayfinder and the footer legal
    disclosure (~1144px). Mobile measure passes (~42 CPL at 390px).

### final-check — 6/6 PASS
- Contradictions: none (SoA-from-Blue-Dog vs card-from-WorkSafe-Tasmania is a correct distinction; all
  figures $59/$13.72/$72.72, CPCWHS1001, RTO 31193 consistent).
- Duplicate/repeated: RTO number and "verify on training.gov.au" repeat heavily, but this is ASQA-mandated
  (the 7 disclosure locations each name the RTO) and the answer-first capsule/body pattern; intentional.
- Logical flow / grouping: follow archetype-2 decision order (real → accepted → your-card → cost →
  how-it-works → proof → FAQ). PASS.
- Australian English: PASS. "color"/"center"/"organiz" appear 0× in visible text (CSS/attrs only);
  `licences`/`licensed` correct; no US vocab.
- AI-writing patterns: none.
- **Em dashes:** 12 in visible text, **all in source-citation labels** ("Authority — Page name" in
  VerifiedSources/footerSources) — the site-wide citation convention, identical on tas-owner-builder and
  every course page; **none in body prose.** Classified PASS-with-note, not a body-copy violation.

### ai-detector — no AI tells, house-voice
- Zero indicators across the full set (no furthermore/moreover/additionally, no "it's worth noting", no
  meta-commentary, no enthusiasm words). Sentence openers varied (top "the" ≈ 8% of 142 sentences); "you"
  ×10 is the house second-person voice. Strong human/domain markers: concrete figures, named objections,
  the "say the unhelpful thing" move. **No rewrite needed.**

**Stage 7 verdict unchanged: GREEN.** One page-specific readability defect (ASQA Note width) was found and
fixed; everything else is either a probe artefact or a pre-existing shared-component issue affecting all
ABE pages, logged for a site-wide pass.

---

## 7c · Post-grading authority correction (23 July 2026)

After Stage 9, Andrey identified an authority-model breach neither the guardrails nor the independent
grader caught: the page credited **Dominic Ogburn as the course developer**. On an asqa-accredited
page the RTO develops and owns the accredited course; ABE develops nothing and no ABE person is its
developer. This was a genuine `correct_and_safe` defect that shipped into `dist/` — the checks tested
"ABE is not an RTO" language, not *who developed the course*, so it was a blind spot in the authority
audit itself, not a slip.

**Fixed and now guarded:**
- Page `experts:` reduced to the reviewer (Warwick Smith); `#content-review` copy rewritten to credit
  Blue Dog Training as developer/owner/deliverer and ABE as publisher only.
- `CourseLayout` emits `Course.creator` = the RTO Organization for asqa pages.
- `guardrails.ts`: an asqa page must carry exactly **one** Person (the reviewer), credit the RTO via
  `recognizedBy`, and **fails on any Person titled "developer"**. The new guard immediately caught the
  same breach on both NSW owner builder pages (now fixed the same way; both are on-hold/noindexed).
- Rules updated: `authority-model.md` §6, `asqa-disclosure-framework.md` prohibitions, CLAUDE.md
  E-E-A-T, the archetype-02 required-sections table, the shared Dominic record note. `mistakes-log.md` #16.

Verified in `dist/`: all three asqa pages now carry 1 Person (Warwick) and `Course.creator` = the RTO
(Blue Dog / Upskill / Upskill); no "developed by Dominic" survives on any asqa page (it remains, correctly,
on the state-approved-direct owner-builder/CPD pages ABE does develop).
