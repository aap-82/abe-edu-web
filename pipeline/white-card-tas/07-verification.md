# Stage 7 — pre-deploy RE-VERIFICATION · `/white-card-tas`

**Re-run 27 July 2026.** Supersedes the 25 July run below, which now predates the page source. One
commit touched this page after that verification:

- `645b4e7` content(white-card): place the Service Tasmania lodgement image in `#your-card`

An image-only placement (Task 2 of `handover/HANDOVER-images-astro-assets.md`): no prose, price,
authority-model or structural change. Measured fresh against `dist/white-card-tas/index.html`
(rebuilt today, guardrails 19/19 pass) rather than assumed from the diff, per the project's
measure-don't-assume rule.

**What changed on the page:** the `#your-card` ZSection's image slot, previously an FPO placeholder,
now renders the real image (`white-card-tas-service-tasmania.avif`, migrated to
`src/assets/images/`, served same-origin/hashed via the Task-1 resolver). `imgAlt` matches the
existing `imgDesc` exactly: *"A person handing a Statement of Attainment and identity documents
across a Service Tasmania counter to lodge a construction induction card application in person."*

**Correction to this file's own prior verdict.** The 25 July run below states "two FPO image
placeholders await real photos". **That is now one.** Measured in the built HTML: the `#your-card`
slot is a real `<img>` (confirmed above); the **hero** slot (ratio r54, no `artefactImg` set) is
still the FPO div, label "Image placeholder", desc *"A Tasmanian construction worker in hi-vis and a
white hard hat on a residential build site, holding a construction induction White Card, natural
daylight"* — genuinely unresolved, not in scope of this session's image migration. One placeholder
remains, not two. [same repeat-risk class as the 25 July Person×2 correction: a page-foot claim
outlived the change that invalidated it]

**Every other measured invariant is unchanged** (re-measured, not assumed): H1 = 1; canonical =
`https://www.abeeducation.edu.au/white-card-tas`; robots = `noindex,nofollow` (NOTE, intentional
pre-launch, unchanged); em dashes = 13, all in Source-citation labels; JSON-LD `@graph` = Course +
CourseInstance + EducationalOccupationalCredential + BreadcrumbList + **Person ×1** + Organization
×3 (RTO + provider + creator, expected for asqa); `Course.offers.price` = **59**; CPCWHS1001 = 25,
superseded CPCCWHS1001 = 0; `comprehensive` = 0. `check-claims` and guardrails both pass (19/19).

## 25 July run (superseded above, kept for the record)

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

## Verdict: **GREEN** (re-verified against current `dist/`, 25 July state — see the 27 July update above)

Authority model correct (one Person, RTO credited, no ABE-as-RTO), no superseded code, price grid
reconciles, structure clean. NOTES: intentional `noindex` + interim CTA targets are the documented
pre-launch state (buyUrl swap + noindex removal are the coupled ship blocker, human-triggered); two FPO
image placeholders await real photos ([superseded 27 July](#) — one of the two, `#your-card`, is now a
real image; the hero remains FPO); TrustBand on-dark tagline is 19 words by design. Stop at Stage 8 —
no deploy.

## Verdict (27 July): **GREEN**, current

All invariants re-measured and unchanged; the image-only commit above is the only delta. **One** FPO
placeholder remains (the hero — not in scope this session), not two. Stop at Stage 8 — no deploy.
