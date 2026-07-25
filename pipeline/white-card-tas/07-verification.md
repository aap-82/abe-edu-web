# Stage 7 — pre-deploy RE-VERIFICATION · `/white-card-tas`

**Re-run 25 July 2026.** Supersedes the 23 July run (commit `e3a0398`), which now predates the page source.
One commit touched this page after that verification:

- `1c4bc4a` content: house-style and content-quality pass across course pages

A single house-style/content pass, no structural change — so this is a light re-run focused on where a
prose pass can drift (capsule word counts, authority language), plus a re-confirm of the invariants.
Measured against `dist/white-card-tas/index.html`, rebuilt today (build green, 19 pages pass guardrails).
Every value is read from the built HTML.

Authority model: **asqa-accredited**. RTO partner: **Blue Dog Training (RTO 31193)**. ABE is NOT an RTO.
Unit: **CPCWHS1001** (superseded CPCCWHS1001 must be absent). $59 course / $13.72 card fee / $72.72 total.

## Correction to the handover

The handover's Task 2 said this page "correctly carries Person ×2". **That is wrong, and the built HTML
proves it: the page carries exactly ONE Person node (Warwick Smith, the reviewer).** That is the *correct*
asqa state, not a defect — CLAUDE.md's authority model and §7c of the 23 Jul run both require exactly one
Person on an asqa page (the RTO develops and owns the course, so no ABE person is its developer; the RTO is
credited via `Course.creator` + `recognizedBy`), and `guardrails.ts` now *fails* an asqa page that carries
two. `experts: ["warwick-smith"]` in frontmatter confirms one. This is measured, not inferred — recording
it here so the drift in the handover (and in the old 07's top table, which read "Person ×2") does not get
trusted over the code again. [repeat risk: docs drifted from code, trusted over it]

## Re-checks

1. **Capsule word counts** (the house-style pass could have moved them). Measured: capsules **41, 52, 51,
   56, 54, 49, 59** words — all seven section capsules in the 40–60 band. The eighth `.capsule` is the
   TrustBand on-dark tagline at **19 words**, which is a trust-band summary line, not a question-led section
   capsule (documented NOTE, unchanged from 23 Jul). **PASS.**
2. **Authority model intact.**
   - `authorityModel` / `data-authority` = **asqa-accredited**. **PASS.**
   - Unit **CPCWHS1001** present (25×); superseded **CPCCWHS1001** absent (0). **PASS.**
   - **One** Person node (Warwick). `Course.creator` = **Blue Dog Training**. `recognizedBy` = **Blue Dog
     Training** (RTO 31193), never ABE. **PASS** — authority-model correct for asqa.
   - "ABE … is not a registered training organisation" present (4×); no ABE-as-RTO / delivers / assesses /
     issues assertion. Blue Dog named as RTO 31193 throughout (39×). **PASS.**
3. **noindex** = `noindex,nofollow`, intentional pre-launch (buyUrl TBC; interim CTA → `/white-card` /
   `#enrol`). Recorded as **NOTE**, not a regression — unchanged from 23 Jul. **PASS/NOTE.**
4. **Price grid.** `Course.offers.price` = **59** = on-page $59 (15×). Card fee **$13.72** (11×), total
   **$72.72** (2×). PriceCard rows reconcile: $59 course + $13.72 government card fee = $72.72 total. **PASS.**

## Measured grid (invariants re-confirmed)

| Check | Measured value | Verdict |
|---|---|---|
| H1 count / text | **1** — "White Card Tasmania." (`<span class="dot">`) carries keyword | PASS |
| Question-led H2s | 7 question-form + FAQ H2 + TrustBand H2 + CtaBand H2 | PASS |
| Answer capsules 40–60 | 41/52/51/56/54/49/59 (+19-word on-dark trust tagline, NOTE) | PASS |
| JSON-LD `@graph` | Course + EducationalOccupationalCredential + BreadcrumbList + **Person ×1** | PASS |
| `Course.creator` | Blue Dog Training (RTO) | PASS (asqa: RTO develops) |
| `recognizedBy` | Blue Dog Training / RTO 31193 | PASS (not ABE) |
| `Course.offers.price` | **59** = $59 | PASS |
| Canonical, no-slash | `https://www.abeeducation.edu.au/white-card-tas` | PASS |
| CPCWHS1001 / CPCCWHS1001 | 25 / **0** | PASS |
| Banned copy | "comprehensive" = 0 | PASS |
| Em dashes | 13 total, **all in Source-citation labels** ("Authority — page name"); none in body prose | PASS |
| `check-claims` | 0 failing; no line names this slug | PASS |
| robots | `noindex,nofollow` | NOTE (intentional pre-launch) |

## Not re-run, and why

- `abe-readability-audit`, `final-check`, `ai-detector`: the 23 Jul run applied all three (§7b) against the
  same structure; `1c4bc4a` was a prose/house-style pass with no structural change, and the measured grid +
  guardrails + `check-claims` cover the delta. The prior findings (one page-specific Note-width fix, the
  rest shared-chrome items logged for a site-wide pass) still stand.

## Verdict: **GREEN** (re-verified against current `dist/`)

Authority model correct (one Person, RTO credited, no ABE-as-RTO), no superseded code, price grid
reconciles, structure clean. NOTES: intentional `noindex` + interim CTA targets are the documented
pre-launch state (buyUrl swap + noindex removal are the coupled ship blocker, human-triggered); two FPO
image placeholders await real photos; TrustBand on-dark tagline is 19 words by design. Stop at Stage 8 —
no deploy.
