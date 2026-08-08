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
this page is wrong. **Andrey's call, and explicitly a WARNING rather than a blocker** — his decision,
28 Jul. It does not hold up publication and it does not gate cutover. The evidence is kept here so it
stays actionable whenever he wants to settle it, not to argue the page should have waited.

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

---

## Re-verification — hero asset swapped, 29 July 2026

The page source changed, so `check-pipeline` §4 would otherwise report this verification as
certifying content that no longer exists. Re-measured and committed with the change.

**Scope: the hero image slot only.** No section added, moved, merged or cut, so `05-components.md`
is unaffected and every other row above stands.

| Check | Measured |
|---|---|
| Asset | `white-card-tas-hero.avif`, **1000 x 1250** native, 4:5, 47,226 B |
| Matches `artefactSpec` `4:5 · ~1000×1250` | yes, exactly. No resize needed |
| Rendered | `width="1000" height="1250" loading="eager" decoding="async"` |
| `sizes` | `(max-width: 800px) 100vw, 640px` — identical to the QLD hero |
| `srcset` | 400w / 800w / 1000w at 12.6 / 30.7 / 41.3 kB |
| Alt length | **120 chars**, inside alt-text-guidelines CR2 (80-125). Was 162, a breach |
| Alt accuracy | describes this frame: person, Hobart, activity, and the PPE actually visible |
| Old asset still referenced in `dist/` | **no** |
| `guardrails` | 20 pages passed |
| Build incl. `postbuild` | **exit 0** |

`loading="eager"` is correct and unchanged: this is the LCP candidate above the fold and must not be
lazy. Intrinsic dimensions on the tag reserve the box, so the swap introduces no layout shift.

**Carried forward, not resolved here:** the shipped frame breaches this slot's own guardrail on
visible screen content. Recorded in full at the foot of `06-image-prompts.md`, including the one
question nobody in this session could answer from the pixels: whether the legible on-screen course
title is ABE's real material or a mock-up. That decision is Andrey's and does not block the swap.

---

## Re-verification — hero aspect ratio, 29 July 2026

`a4a1237` added `artefactRatio: "r45"` to the hero. The page source therefore post-dated this
verification and `check-pipeline` §4 reported it as certifying content that no longer exists.
Re-measured and committed with the fix so the gate ordering is satisfied honestly rather than by
touching the file.

**Scope: the hero image box only.** `a4a1237` added three lines to this page and nothing else, so no
section, capsule, fact or link changed and every row above stands.

### What the change does

`Hero.astro:22` defaults `artefactRatio` to **`r54`**, which is `aspect-ratio: 5/4` — LANDSCAPE.
Every hero artefact on this site is authored 4:5 PORTRAIT (`artefactSpec: 4:5 · ~1000×1250`). Without
the prop, a portrait image was being placed in a landscape box and cropped by `object-fit: cover`.
The fix is one line per page.

### Measured on the built page

| Check | Measured |
|---|---|
| Wrapper class | `ph r45` |
| CSS aspect | `4 / 5` (`.r45{aspect-ratio:4/5}`) |
| Rendered box | **499 x 623**, ratio **0.800** |
| Decoded image | **640 x 800**, ratio **0.800** |
| Distortion | **none** — box ratio equals image ratio to 3 dp |
| `object-fit` | `cover` |
| `loading` | `eager`, correct for an above-the-fold LCP candidate |
| Consistency | identical box (499 x 623) and class to `/qld-owner-builder-course` |

### Measurement note, recorded because it nearly became a false finding

A first pass read `naturalWidth = 0` and `complete = true` on the hero and looked like a broken
image, which would have been alarming given this page shipped a genuinely missing asset the same day.
It was a race: `complete` can be true while the decode is still pending, and the srcset candidate can
still be swapping. Awaiting `img.decode()` returned 640 x 800. **`complete` is not "decoded"** — use
`decode()` before reading intrinsic size, or the measurement lies.

Nothing else on this page changed, and no other row above is re-opened.

### 07b · Hero screen question CLOSED, 29 July 2026

The open item carried above — whether the legible course title on the hero's laptop screen is ABE
Education's real material or a mock-up — is **answered: it is real course material**. The slot's
guardrail is therefore relaxed for this page with a dated note; no change to the image, which remains
the supplied 47,226 B original. Full reasoning, and the remediation that was built and reverted when
the first answer was mistakenly "mock-up", at the foot of `06-image-prompts.md`.

## Re-verification — training.gov.au URL casing, 30 July 2026

**Delta:** the RTO 31193 register links on this page were emitted in two casings,
`/Organisation/Details/` and `/organisation/details/`. The lowercase occurrences were normalised up
to the capitalised form, which is the one every rule file in the repo uses
(`kb/rules/authority-model.md`, `kb/content-source-map.md`, `CLAUDE.md`, `badge-inventory.md`) and the
one a human is instructed to open in a browser. Shipped in #93.

**Why this needs no re-verification of any fact.** Nothing about a claim changed — no figure, no
wording, no source, no authority statement. The only change is the casing of a URL path already
verified on this page. **Both casings were opened in a browser on 30 July 2026**: each resolves, each
preserves its own casing, both serve the same National Training Register record for Blue Dog Training
Pty Ltd (RTO 31193), and neither redirects to the other. So the destination is unchanged and the
citation still points where it did.

**Measured after the change** (`dist/white-card-tas/index.html`): `/Organisation/Details/31193` ×9,
`/organisation/details/31193` ×0, total unchanged at 9. JSON-LD `Organization.url` now carries the
capitalised form. The unit URL `training/details/CPCWHS1001/unitdetails` is deliberately untouched —
it mixes lowercase route words with an uppercase unit code, which is an identifier.

**This note exists because the edit tripped `check-pipeline` §4** (gate ordering, mistakes-log #19):
the page source became newer than its verification, which is exactly the invariant that check
protects, and it fired correctly. Recording the delta rather than re-running Stage 7 wholesale is the
same treatment the hero-asset and aspect-ratio deltas above received.

## Re-verification — becomeSteps stub removed, 30 July 2026

**Delta:** the `becomeSteps: []` line was deleted from the frontmatter. **No rendered output changed
and no claim was touched** - the field was always empty and this page never read it.

**Checked before deleting, not after:** `becomeSteps` is `z.array(step).optional()` in
`src/content.config.ts`, so an absent key validates. Its only consumer is
`<Stepper steps={frontmatter.becomeSteps} />`, which the six owner-builder pages render explicitly and
neither White Card page does: white-card-tas draws its Stepper from `howItWorksSteps`, and
white-card-wa renders no Stepper at all. Grepped across `src/**` for any other reader and found none.

**Why it existed:** the field was required when these pages were built, so both carried an empty array
to satisfy Zod. Making it optional was itself filed as a demand item on the second occurrence, landed,
and left these two stubs behind as dead frontmatter.

**Measured after:** build green at 20 pages, guardrails passed, `astro check` 0 errors,
`check-claims` 0 failing, `prose-lint` 10 files passed.

## Re-verification — step bodies re-authored as bullet lists, 31 July 2026

**Delta:** three of the four `howItWorksSteps` bodies changed from prose strings to arrays of points,
which `Stepper.astro` now renders as a bulleted list with maroon discs. The fourth ("Your RTO
partner, Blue Dog Training (RTO 31193), issues the nationally recognised Statement of Attainment for
CPCWHS1001") stays prose deliberately: it is one indivisible statement, and it is also the page's
ASQA-disclosure sentence, which should not be broken across bullets.

**No claim, figure or authority statement changed.** Carried across verbatim: the `$13.72` Service
Tasmania fee, the `60 days` lodgement window, `CPCWHS1001`, `Blue Dog Training (RTO 31193)` as the
issuing RTO, and WorkSafe Tasmania as the card issuer. ABE Education is still the publisher and never
the RTO.

**One clause was reworded rather than split.** "Take your Statement of Attainment, your ID and the
$13.72 fee to a Service Tasmania centre, in person, within 60 days of the date on the Statement"
became two bullets, the second reading "It must be lodged in person, within 60 days of the date on
the Statement." The word "lodged" was added so the bullet stands alone as a sentence; the in-person
requirement and the 60-day window are unchanged and still sit together, which matters because
splitting them would let a reader take the deadline without the in-person condition.

**Measured after:** build green at 20 pages, guardrails passed, `astro check` 0 errors,
`check-claims` 0 failing / 0 warning, `prose-lint` 10 files passed, `check-pipeline` 0 failing.

## Re-verification · 7 August 2026 — Stage 7 currency restored (breadcrumb-only change)

**Why this exists.** `check-pipeline` §4 FAILed: this page's content was last committed 4 Aug 2026
(`7ea0300`, "build /white-card hub (W3-6)"), which postdates every entry above, so this file no
longer certified the current page. Found and reported in
`handover/HANDOVER-white-card-stage7-drift-2026-08-07.md`, not by any check running at the time the
drift was introduced — the gap sat unnoticed for 3 days.

**Scope: exactly one change, confirmed by diff before re-verifying**
(`git show 7ea0300 -- src/content/courses/white-card-tas.mdx`). The middle "White Card" breadcrumb
entry was restored, now that `/white-card` (W3-6) exists — the same edit, for the same reason, on
all four White Card spokes. No copy, price, regulatory claim, section or schema field beyond the
`breadcrumb` array changed.

## Measured

| Check | Measured value |
|---|---|
| `breadcrumb[]` length | **3** (was 2) — Home, White Card, White Card Tasmania |
| Visible crumb nav (`nav.crumbs` in `dist/`) | `Home -> /`, `White Card -> /white-card` |
| `/white-card` resolves in `dist/` | yes — `dist/white-card/index.html` exists, built 4 Aug, unaffected by anything since |
| `BreadcrumbList` JSON-LD | 3 items: Home, `White Card -> https://www.abeeducation.edu.au/white-card`, White Card Tasmania |
| Section/capsule conformance | unchanged — **8 sections** match the plan, **8 capsules** match `04-content.md` |
| `guardrails` | 24 pages passed |
| `check-pipeline` §4 (this slug) | clears once this file is committed with the page |

**Not re-run: the three mandated skill-audits, the full authority-language/schema/ASQA sweep, and
the citation gate.** None of their inputs changed — confirmed by `git show`, not assumed. A
breadcrumb restoration cannot introduce an RTO claim, a wrong price, or a missing disclosure, so
re-running checks against provably unchanged inputs would measure nothing new. This is the light
re-verify the drift's actual severity earned, named as such rather than dressed up as a full pass.

## Ship decision

**Merge-ready.** The only change since the last full verification is confirmed cosmetic-structural
(one breadcrumb array entry), the middle crumb now resolves instead of pointing at what was then an
unbuilt hub, and every measured value above holds. This entry closes the verification's currency —
3 days later than it should have, and recorded as such rather than backdated.
Rendered on the built page: 1 stepper, 3 bulleted step lists, 1 kept as a paragraph.

## Re-verification · 7 August 2026 — TAS residency wording corrected, 8 spots

**Why this exists.** A build-session task (`skill-reviews/facts/2026-08-07-tas-residency-fix-
blue-dog-scope.md` named the locations; the fix itself is this page's own content commit) replaced
every "Tasmanian resident(s)" / "resident of Tasmania" / "evidence your residency" occurrence with
wording sourced to WorkSafe Tasmania's own words — the training must be **completed in Tasmania**
— per `kb/register/online-delivery-policy-by-state.md` §2D. That's a page-source change, which
`check-pipeline` §4 correctly flags as making this file stale again.

**Scope: 8 wording-only edits, no structural change.** `courseDescription`, a hero tick, the
`glance` note, `disclaimersHtml`, two `AnswerCapsule`s, the `CanCant` can/cant pair, and the
`VerifiedSources` `facts` attribute. No section added, moved or removed; no schema field changed;
no price, RTO, or government-fee figure touched.

## Measured

| Check | Measured value |
|---|---|
| "Tasmanian resident(s)" / "resident of" / "evidence your residency" | **0** occurrences (was 8) |
| Answer capsule word counts (the two edited) | **41** and **45** words — both inside the 40-60 band |
| "comprehensive" / banned CTA ("Enrol now"/"today") | 0 / 0, unchanged |
| `guardrails` | 24 pages passed |
| `check-claims` | 0 failing |
| `check-positions` (`tas-online-residency`) | **OK — no contradiction found** (was FAIL, 11 places sitewide) |

**Not re-run: the three mandated skill-audits, the full schema/ASQA sweep.** None of their inputs
changed — this is a wording substitution inside already-verified fields, not new copy, a new
section, or a new claim category. The underlying regulatory position was verified at source by the
facts session named above, not re-derived here.

## Ship decision

**Merge-ready.** Closes the Stage 7 currency gap this page's own content fix opened.

## Re-verification · 8 August 2026 — hero CTA microcopy overclaim fixed

**Why this exists.** `Hero.astro:36` falls back to `'Pay by card or 4 interest-free payments with
Afterpay'` whenever a page's `cta.microcopy` is unset. This page's `cta:` block never set one, so
that default rendered under the hero CTA even though this page has **no working `buyUrl`** — every
CTA is the in-page `#enrol` anchor (see the standing warning in `ROADMAP.md`'s Current state
section). Filed against `white-card-act`'s own build
(`skill-reviews/2026-08-04-abe-course-page-astro-white-card-act.md`) but never backported here.
That's a page-source change, which `check-pipeline` §4 correctly flags as making this file stale
again.

**Scope: one field, one line.** `cta.microcopy` set to `"One-off payment. No hidden fees."`,
matching the already-safe pattern live on `white-card-act` and `white-card-nsw`. No section added,
moved or removed; no schema field, price, or regulatory claim touched; the `ctaBand.cta.microcopy`
("Statement of Attainment issued by Blue Dog Training") was already correct and is unchanged.

## Measured

| Check | Measured value |
|---|---|
| "Afterpay" / "Pay by card" in `dist/white-card-tas/index.html` | **0** occurrences (was 1, in the hero `cta-note`) |
| Hero `cta-note` text | `"One-off payment. No hidden fees."` |
| `guardrails` | 24 pages passed |
| `check-claims` | 0 failing |
| `check-pipeline` §4 (this slug) | clears once this file is committed with the page |

**Not re-run: the three mandated skill-audits, the full schema/ASQA sweep.** None of their inputs
changed — this is a one-line microcopy substitution correcting a false payment-method claim, not
new copy, a new section, or a new regulatory claim.

## Ship decision

**Merge-ready.** Closes the Stage 7 currency gap this page's own content fix opened.
