# Stage 7 — pre-deploy RE-VERIFICATION · `/white-card-tas`

**Re-run 27 July 2026 (this entry).** Supersedes the entry directly below (also dated 27 July, for
the image-only `645b4e7` placement), which now predates two further commits on this page:

- `d17c5a4` content(white-card-tas): confirm RTO contacts, land hero photo
- `b1cb223` content(white-card-tas): replace hero photo, soften CTA copy

**What changed on the page**, per source + commit messages (not assumed):
1. The hero image slot (`hero.artefactImg` / `hero.artefactAlt`), previously the FPO placeholder the
   entry below flags as "genuinely unresolved," now renders a real photo
   (`white-card-tas-hero-online.avif`; `b1cb223` swapped in an updated crop of the same asset). This
   also populates `Course.image` in JSON-LD, previously empty.
2. All four CTA labels/microcopy changed from "Start the course · $59" / "Instant access after
   payment" to "See White Card options" (hero CTA, CTA-band CTA, `SectionWayfinder` CTA, plus the
   sticky-strip CTA shortened to "See options"). Per `b1cb223`'s own commit message, the CTA target
   `/white-card` (the White Card hub) does not exist yet — Wave 3 — so the old copy over-promised a
   direct checkout the page cannot deliver.
3. Blue Dog Training / AlertForce / Upskill Institute partner contact details were confirmed
   (separate partner records; no change to this slug's own RTO contact block, which already carried
   Blue Dog's email/phone).

Measured fresh against `dist/white-card-tas/index.html` (build already green, guardrails 19/19, per
the task brief — not rebuilt in this session).

## Measured grid (27 July 2026, this entry)

| Check | Measured value | Verdict |
|---|---|---|
| H1 count / text | **1** — `<h1 class="h1">White Card Tasmania.</h1>` | PASS |
| JSON-LD `@graph` top-level nodes | Course, EducationalOccupationalCredential, BreadcrumbList, **Person ×1** (`"@type":"Person"` occurs exactly once) | PASS (asqa model: 1 Person, not 2) |
| `Course.creator` | Blue Dog Training, RTO 31193 (Organization) | PASS |
| `EducationalOccupationalCredential.recognizedBy` | Blue Dog Training, RTO 31193 — never ABE | PASS |
| `Course.offers.price` vs on-page price | JSON-LD `"price":"59"` vs **$59** (12 on-page occurrences of "$59") | PASS — reconciles |
| **`Course.image.contentUrl`** (new since last verification) | `https://www.abeeducation.edu.au/_astro/white-card-tas-hero-online.CcaVu0cE.avif` — same-origin, hashed filename, non-empty | PASS — was empty before this change |
| Unit code | `CPCWHS1001` = **25** occurrences; superseded `CPCCWHS1001` = **0** | PASS |
| Em dashes | **13** total — 12 in visible Source-citation labels ("Authority — page name"), 1 inside the JSON-LD `credentialName`/`name` string only ("Statement of Attainment — CPCWHS1001…", not rendered in body prose) | PASS — 0 in visible body prose |
| Banned copy | "comprehensive" = **0**; "Enrol now" / "Enrol today" = **0** anywhere on the page | PASS |
| Reworded CTAs (the 4 flagged in the brief) | "See White Card options" ×4 (hero primary CTA, waynav sticky-mini, CTA-band button, FAQ `SectionWayfinder`) + "See options" ×1 (bottom `ctastrip`) — none reads "Enrol now/today"; none sits inside a `.capsule` or a FAQ `.ans` block | PASS |
| Answer-capsule word counts (7 section capsules, re-measured word-by-word) | **41, 52, 51, 56, 52, 49, 58** — all in the 40–60 band | PASS |
| TrustBand on-dark tagline | 19 words | NOTE — trust-band summary line, not a question-led section capsule (documented, unchanged) |
| `robots` meta | `noindex,nofollow` | NOTE — intentional pre-launch (`noindex: true` in frontmatter), unchanged |
| New hero image alt text | 161 characters, en-AU, matches `hero.artefactAlt` verbatim: *"White Card Tasmania: a Tasmanian resident completing the self-paced online course and video assessment for their construction induction card on a laptop at home."* | PASS — well over the 80-char floor |
| `#your-card` image alt (carried from the entry below, re-confirmed) | 161 characters | PASS |
| Canonical | `https://www.abeeducation.edu.au/white-card-tas`, no trailing slash | PASS |
| CTA destination `/white-card` | Confirmed **absent from `dist/`** (no `dist/white-card/` directory). 4 links carry the literal `href="/white-card"` (breadcrumb crumb, hero primary CTA, waynav sticky-mini, footer nav link) — these would 404 if followed today. The CTA-band button, bottom `ctastrip`, and FAQ `SectionWayfinder` use `href="#enrol"`, an in-page anchor to the hero button, so they scroll rather than 404 | NOTE — a tracked pre-launch/Wave-3 gap, named in `b1cb223`'s own commit message as part of why the page stays `noindex`; not a defect introduced by this change, and the CTA-label softening is the correct interim response to it |
| `<title>` length | 64 characters (guideline ~60) | NOTE — pre-existing, untouched by this change, not on the Hard-blockers list |

## Verdict (27 July 2026, this entry): **GREEN**

No hard-blocker from `verification.md`'s Hard-blockers section is present. Authority model intact
(one Person, RTO credited via `Course.creator` + `recognizedBy`, no ABE-as-RTO claim anywhere). Price
reconciles. Unit code clean (no superseded code). No banned copy, no banned CTA wording, no CTA
inside a capsule or FAQ answer. The new hero photo is wired in with compliant, en-AU alt text and now
populates the previously-empty `Course.image` JSON-LD property. The three NOTEs above (intentional
`noindex`, the `/white-card` hub not existing yet, and the pre-existing 64-character title) are
documented pre-launch/known state, not regressions from this change, and none appears on the
Hard-blockers list. Stop at Stage 8 — no deploy.

**This entry clears the `system-health` FAIL** ("the page changed AFTER its last verification"): this
file's newest dated entry now postdates `src/content/courses/white-card-tas.mdx`'s last edit
(`b1cb223`, 27 Jul 2026).

## 27 July 2026 (earlier same day) — image-only placement (superseded above, kept for the record)

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

---

## Re-verification · 28 July 2026 — published, buyUrl still a placeholder

`check-pipeline` §4 fired correctly: the page changed 1,410 minutes after its last verification. This
section is why that gate exists, and it is the second time in two days it has caught a real
post-verification edit rather than a formality.

**What changed** (Andrey's call, 28 Jul: publish the page, keep the buyUrl placeholder, carry the
missing checkout as a warning rather than a blocker):

| Change | Reason |
|---|---|
| `noindex: true` removed from frontmatter, and the slug dropped from `astro.config.mjs`'s `NOINDEX` array | The two are coupled by design; the config comment says keep them in step. |
| Hero CTA repointed `/white-card` → `#enrol` | `/white-card` is the Wave 3 hub and **does not exist**. On a noindexed page a 404 CTA was survivable; on an indexable one it is not. The sticky bar and CTA band already used `#enrol`, so all three now agree. |
| `White Card TAS` linked in `SiteHeader` | `noindex` had been exempting the page from the orphan guardrail. Without the link the build fails. |

**Re-measured from `dist/white-card-tas/index.html`:**

| Check | Measured | Verdict |
|---|---|---|
| robots meta | **`index,follow`** (was `noindex`) | published |
| Present in `sitemap-0.xml` | **yes** (was excluded) | published |
| `<h1>` count | **1** | PASS |
| Capsule word counts | **41, 52, 51, 56, 54, 19, 49, 59** — seven section capsules inside 40-60, plus the TrustBand's deliberate 19 | PASS |
| Distinct CTA hrefs | **`#enrol`, and nothing else** | see warning |
| CTAs pointing at a 404 | **0** (was 1, the hero at `/white-card`) | FIXED |
| Superseded `CPCCWHS1001` | **0** | PASS |
| Bare "ABE" in reader-facing text | **0** | PASS |
| ASQA Person rule | guardrails 20/20 pages passed, which enforces exactly one Person on an asqa page | PASS |
| `system-health` | 0 failing after this file was written | PASS |

## ⚠️ Two warnings this page now carries into production

**1. It is indexable with no purchase path.** Every CTA is an in-page anchor. This is deliberate and
Andrey's call: the legacy URL holds real equity (`/tas-online-white-card`, 7,092 impressions,
position 11.81) and the page answers the query, so it earns its place ahead of the checkout. It is
nonetheless **the only live page on the site that cannot be bought from**. Wire the real buyUrl and
give the CTAs a destination the moment TAS payment is configured.

**2. The page states $59; a live checkout charges A$39.** Unresolved, and now on an indexable page.
`/payment?product_id=white-card-tas&type=course` renders a working order for "White Card TAS" at
**A$39**, and LearnWorlds corroborates it exactly (A$117 across 3 payments). Checked against WA as a
control, where A$5,155 over 60 payments averages A$85.92 against a $99 list — so discounting exists
and an average alone proves nothing; the TAS figure is the **list price at checkout**, not an
average. `$59` appears on **12 surfaces** here, and the cost section derives from it: $59 + $13.72 =
$72.72 today, $52.72 at the real price. Either the $39 product is legacy and should be retired, or
this page is wrong. **Andrey's call, and it should be settled before cutover.**

**Nothing in the repo can catch this.** `check-claims` reconciles `priceRows` internally and
validates government figures against `kb/register/`, but an ABE commercial price has no register
owner and no check compares it to the live product. Filed `[skills]`.

### Addendum · breadcrumb crumb removed, same day

Applied after merging `origin/main`, which brought commit `923a49b` — an independent Stage 7 run on
`/white-card-wa` that returned **FAIL with four publish hard-blockers** and superseded that page's
"merge-ready" verdict. One of its findings applies here identically and was not caught by this
page's own audit:

**The middle "White Card" crumb pointed at `/white-card`, which is not built.** It rendered as a
visible link to a 404 *and* as a `BreadcrumbList` ListItem naming a URL that does not resolve, which
Google treats as an invalid rich result. `check-links` does not catch it, because `/white-card` sits
legitimately in its PLANNED list, so the link reads as "not built yet" rather than "broken".

It mattered more here than it did on WA: this page became **indexable the same day**, and an invalid
breadcrumb on a noindexed page costs nothing while on an indexable one it costs a rich result.

**Re-measured:** visible crumb `Home / White Card Tasmania`; `BreadcrumbList` two items, both
resolving; zero crumb or CTA links to `/white-card` (the one remaining is the footer's Courses
column, sitewide chrome that every page carries). Restore the middle crumb when W3-6 ships.
