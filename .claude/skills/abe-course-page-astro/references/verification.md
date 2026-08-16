# Stage 7 — Pre-deploy verification

## Contents
- 1. Pre-production audit (`references/seo/audit-workflow.md`)  — applies to the built page
- 2. abe-readability-audit  (evidence-based targets)
- 3. final-check (+ ai-detector)  — on the copy
- Hard-blockers (do not deploy if any are true)

Run these on the **built HTML** (`dist/{slug}/index.html`) after Stage 6 and before the Stage 8 deploy.
Fix FAILs by correcting the content or data, never by watering down the components. These mirror the
project "Proof" step: a page does not ship until it passes.

**Start by asking the toolchain what it already knows about this page.** `check-claims`,
`check-pipeline` and `check-links` all take `--slug <slug>` and will show only the findings that name
it, with the repo-wide totals still printed underneath so a filtered run can never be mistaken for a
whole one:

```
node scripts/check-pipeline.mjs --slug {slug}
node scripts/check-claims.mjs   --slug {slug}
node scripts/check-links.mjs    --slug {slug}     # after npm run build
```

Three runs produced page-relevant warnings from these scripts that no page audit ever read, which is
why the flag exists. **Quote the WARN text, never a count** — a warning summarised as a number is a
warning nobody acted on.

**Every audit below is reported run-or-not.** `check-pipeline` FAILs a slug whose `07-verification.md`
does not name all three of `abe-readability-audit`, `final-check` and `ai-detector`. Skipping one
deliberately is fine and passes — say so and why under a "Not run, and why" heading. Silently omitting
one is not: it was done on four separate runs, each time under a GREEN, and the first time it happened
the audits that were skipped would have caught a real defect.

---

## 1. Pre-production audit (`references/seo/audit-workflow.md`)  — applies to the built page

### 1a · Structure & schema
- **One `<h1>`**, carrying the target/GSC primary keyword; every other heading H2/H3. No H6 for
  cosmetic labels (use styled paragraphs — an H6 label is a WCAG 1.3.1 violation).
- **JSON-LD present and valid, zero errors**, server-rendered (not JS-injected): `Course` +
  `EducationalOccupationalCredential` + `BreadcrumbList` + `Person` x2. Schema must be in the
  logged-out DOM (Google's crawler won't see a logged-in tab).
- **`recognizedBy` matches the authority model:** the regulator for state-approved-direct (QLD/QBCC,
  TAS/CBOS); **absent** for knowledge-requirement states (WA/Form 75 — ABE `issuedBy` only). A
  `recognizedBy` on a WA page is a FAIL.
- **`Course.offers.price` equals the on-page price** (and the Hero/PriceCard figure).
- **AggregateRating:** schema uses the exact integer review count; visible copy uses the rounded-floor
  ("7,000+"). No `inLanguage` on an `EducationalOrganization` entity (invalid — Course entities only).
- **Meta**: title <= ~60 chars, description present, `canonical` set, `lang="en-AU"`, breadcrumb
  renders visually and as schema.

### 1b · Authority language (hard regulatory + SEO rule)
- No "RTO", "nationally recognised", "accredited", "Statement of Attainment"; for WA no "approved
  course/provider" and no "permit"/"licence" for the owner-builder step.
- **ASQA disclosure** complete (all required locations) where an accredited course is referenced.

### 1c · E-E-A-T & freshness signals (quality-gates §6, `references/seo/freshness-check.md` for cadence
and per-source verification method)
- **Breadcrumb freshness line present and crawlable HTML** (not in a `<style>` block, comment, or
  schema): `Reviewed by [Name] · DD Mon YYYY` on pages with expert attribution (name anchors to
  `#content-review`), else `Last updated: Month YYYY`.
- **Per-section verification block** on any section citing government facts — one consolidated block
  before the micro-CTA: `✓ VERIFIED · DD Month YYYY …` then `🔗 SOURCES [Authority — page](URL) · …`.
- **Content-review section** (`id="content-review"`) on course/CPD/FAQ/regulatory pages, with named
  developer + reviewer whose `/experts/{name}` profiles exist (Person schema). An attribution without a
  real profile is worse than none.
- **"Last verified: DD Mon YYYY"** beside every trust badge / government-listing reference, within cadence.

### 1d · Government-source citation gate (hard)
- **Every government/legislative/regulatory claim on the rendered page carries a visible citation** —
  fees, penalties, permit thresholds, eligibility, regulator identity, statutory requirements. Internal
  verification is not enough; the source must be visible to the reader.
- **Consolidated Sources section** at page end pairs each authority/instrument with its official URL +
  date verified. Sources must be primary (the instrument / fee schedule / register) or acceptable
  secondary (a guide on the issuing authority's own `.gov.au` domain) — never aggregators/directories
  (incl. ABLIS, business.gov.au), blogs, competitor/RTO pages, ABE's own pages, or archives/caches.
- **No `[confirm: …]` / `[TO VERIFY]` tags left** on a publish path.

### 1e · Cannibalisation & indexation (quality-gates §1)
- **No other ABE page targets the same primary keyword** (GSC / inventory check).
- **No LearnWorlds path emitted as a same-origin link or in JSON-LD**; `sitemap-index.xml` emitted.
  `/course/*`, `/program/*` and `/payment` are served by LearnWorlds on today's apex and are blocked
  in *its* robots.txt, not in this repo's `public/robots.txt` — so the old form of this row,
  "`robots.txt` blocks `/course/` and `/program/`", asked for something this build cannot assert or
  verify, and an independent audit correctly reported it as failing. What this build controls is
  whether it *advertises* those URLs: a `/program/*` CTA or `ItemList` entry becomes a dead link the
  moment the Astro build owns the apex. `node scripts/check-links.mjs` reports each one as a WARN.
  Treat any such path as an open blocker inherited from the `learn.` subdomain decision, and record
  it rather than guessing. Matches SKILL.md stage 7 (e); the two were out of step until 28 Jul 2026.
- **Internal links point up (spoke→hub) and down (hub→spoke), never sideways** between competing
  same-level pages. Cross-category links to non-competing pages are fine.
- **State content is genuinely state-specific** — regulator name + URL, fees, application process,
  legislation, eligibility. Generic copy with the state name swapped is a thin-content / cannibalisation FAIL.

### 1f · Banned-copy checks (quality-gates §2)
- No the word **"comprehensive"** (user preference).
- No passive/generic CTAs — **"Enrol now" / "Enrol today" are banned**; use benefit-led first-person wording.
  **Mechanical since 1 Aug 2026** — `BANNED_CTA_BUDGET` in `src/integrations/guardrails.ts` fails the
  build on any new occurrence in the page body. Do not hand-check this row and do not raise a budget:
  four owner builder pages carry a measured debt of 5 each, and the only legal direction is down.
- **No CTA inside an answer capsule or FAQ answer** (blocks AI extraction).
- **No "verified" alongside a Trustpilot reference** (Blue Dog solicitation flag).
- **Images:** content images have descriptive alt >= 80 chars; decorative images `aria-hidden` + empty alt.
  Full alt-writing method (what to describe, what to omit, the en-AU + >=80-char rule in context):
  `references/seo/alt-text-guidelines.md`.
- **OG/Twitter meta** emitted (template default).

---

## 2. abe-readability-audit  (evidence-based targets)

Score against these. Where a token or layout differs from them, that is a **candidate** finding — check
it against the design register before filing it, per the gate immediately below. (This line read "that
is a finding, not a precedent" until 12 Aug 2026. The intent was "a divergence is not licence to keep
diverging", but read cold it instructs a run to file every token difference it measures, and the
register caveat that walks it back sits 50 lines further down. Three runs did exactly what the opening
line said.)

### 2a · Check the design register BEFORE filing a design-owned finding — mandatory

**Do this first, for every WARN or FAIL in this section that names a token, selector or component.**

```
grep -rn "<token-or-selector>" skill-reviews/design/
```

If the register already has a dated position, **the register wins and there is no finding.** Say so and
move on. A settled question re-filed as new is not a harmless duplicate: it is a `[design]` item someone
must open, re-measure and re-close, and it makes the demand list read as though the design system is
failing when it is holding.

If the register is silent, file normally. If the register's position looks *wrong*, that is still not a
Stage 7 finding — it is a `[design]` item saying so, naming the review it disagrees with, because rule 7
makes register changes an exclusive session's work and a build session cannot make one.

**Why this is a mandatory step and not a suggestion.** It has cost three runs the identical mistake on
the identical finding, inside four days:

| Finding filed as new | What the register already said |
|---|---|
| Disabled `.nav-l.soon` "About" nav item at 2.68:1 (`SiteHeader.astro`) — filed as a live sitewide `[design]` FAIL by `white-card-qld`, the White Card hub rebuild, and `white-card-act`, three times in four days | `skill-reviews/design/2026-07-30-measure-contrast-and-tap-targets.md`, 30 Jul 2026: this exact token/selector is **exempt** under WCAG 1.4.3, text inside an inactive UI component |
| A "12px label floor" breach | `skill-reviews/design/2026-08-01-type-floor-and-tap-targets.md` had already superseded it with a deliberate **11px** Label-token floor, swept sitewide |

Filed as a `[skills]` demand item on 3 Aug (`white-card-qld`), again on 4 Aug (`white-card-act`, tagged
THIRD SIGHTING), and carried to the 11 Aug handover as item 4. Added here 12 Aug 2026.

- **Measure:** 45–75 characters per line, **60–66 ideal**; flag anything consistently >75. Mobile 30–45 CPL.
- **Body size:** 16–18px, **16px is the floor**. Meaningful text >= 12px.
- **Leading:** 1.4–1.6× body (tighter 1.0–1.3 for large display); paragraph spacing ~2× font size.
- **Single column** for all running prose; grids stack to one column on mobile.
- **Left-aligned, unjustified** body — never justified, centred, or right-aligned running text.
- **Contrast (WCAG AA):** 4.5:1 normal / 3:1 large text; 3:1 for non-text/UI. Aim for an even, soft tone,
  not maximal contrast. **Off-black ink on off-white ground (ABE hard rule)** — pure `#000` text or pure
  `#fff` ground is a FAIL.
- **Chunk lists to ~7 items** (ABE hard rule); group/split longer flat runs.
- **Answer-first (inverted pyramid):** the direct answer leads the page and each section; question-led
  headings. Flag sections that bury the answer under preamble.
- **CTAs:** one primary CTA per view; repeated above the fold, after every 2–3 persuasive sections, and
  at the end; **sticky CTA on long/mobile pages**. Buttons >= 44px tap target and AA contrast.
- **Trust signals beside the claim and near the CTA** (ABE hard rule) — not only top or footer.
- **Accessibility (WCAG 2.2):** tap targets >= 24px AA (44–48px ideal on mobile); layout survives text
  spacing (line 1.5 / para 2× / letter 0.12em / word 0.16em); reflow at 320px with no horizontal scroll;
  200% resize; one H1, headings in order; visible focus ring; meaningful link text; reduced-motion honoured.

**Where those scripts live.** `audit_static.py`, `audit_render.py` and `contrast_check.py` ship **with
the `abe-readability-audit` skill, which is a plugin skill and is not in this repo.** Do not look for
them in `scripts/` — that directory is `.mjs` only and has never held a `.py` file. (Written here as
bare, repo-shaped paths until 29 Jul 2026, which sent runs hunting for files this repo does not have.)

**Run them with `py`, not `python`.** On this machine `python` and `python3` resolve to the Microsoft
Store shim and fail; `py` is Python 3.14 with playwright installed. An earlier run recorded "no Python
on the machine" and skipped both scripts on that basis, which was wrong.

**`audit_render.py` produces confident false FAILs in two specific ways. Both bit on 30 July 2026 and
both look entirely plausible, so check for them before believing any of its findings.**

1. **Serve `dist/` over HTTP and pass it a URL.** The script defaults a bare path to `file://`, and this
   site's stylesheet is a **root-absolute** `/_astro/…` href, which over `file://` resolves to the
   filesystem root and never loads. It then measures a completely **unstyled** page and reports
   nonsense that reads as real: 158 CPL, white-on-white text, `a.btn-primary` at 185×17px. Every one an
   artefact. It already accepts a URL (`if "://" not in target`), so:
   ```
   npm run build
   py -m http.server 8899 --bind 127.0.0.1     # from inside dist/
   py <skill>/scripts/audit_render.py http://127.0.0.1:8899/{slug}/
   ```
2. **It resolves a background colour from the immediate parent only.** Any text on a `bg-dark` section
   therefore reports **1:1**, because the immediate parent is a transparent `.wrap` and the dark
   background sits one level further up. On `/white-card-wa` it reported `p.capsule.on-dark` at 1:1 when
   the real ratio against `section.sec.bg-dark` (`rgb(26,26,26)`) is about **15:1**.
   **Verify every contrast FAIL by walking the computed-style ancestor chain** before reporting it — a
   1:1 on visible, legible text is the signature of this bug, not of a defect.

The general rule both cases teach: this script measures a *render*, so confirm the render is the one you
meant before trusting a number from it.

**Register caveat:** they were written for the design-rules HTML register (`.t-*` tokens,
Archivo/Public Sans/Source Serif). This template uses the homepage-style component register, so they
will flag register/token differences that are **not** defects here. Read them at the **principles**
level (contrast, measure, hierarchy, placement), not as a token pass/fail. `audit_render.py` needs
Chromium; if unavailable, do the static + manual review.

---

## 3. final-check (+ ai-detector)  — on the copy

Run all six `final-check` checks on the page copy:
1. **Contradictions** — no conflicting facts, dates, names, or claims. **Read each piece of summary
   furniture against the data it summarises, explicitly and one at a time:** every hero tick, the answer
   capsule, the sticky bar, the meta description, each section's opening capsule — against the table,
   FactGrid, PriceCard or list further down that states the same thing in detail. Summary furniture is
   written early, from the brief; the detail is written later, from the sources. When a source moves the
   detail, the summary is what silently keeps the old position.

   **This rule already existed and a page shipped through it anyway**, which is why it now carries a
   worked example. `/owner-builder-insurance` shipped 10 Aug 2026 saying, in a hero tick *and* in its
   answer capsule, "No state requires you to insure your own labour under a home warranty scheme". Its
   own Western Australia row, on the same page, says home indemnity insurance **is** required before
   settlement if you sell within seven years. The capsule then half-corrected itself in its second
   sentence, so an absolute claim and its own refutation sat in the same 55 words. Two further defects
   rode along: "no state" asserted a position on SA and VIC when only five states were verified and
   sourced, and the capsule grouped NSW with WA when the page's own NSW row says the opposite. Found on
   12 Aug only because another page linked to it and the link's one-line description had to restate the
   claim.

   **No script can do this for you and none is planned.** Nothing in the repo compares two prose
   statements on one page for agreement; both sentences above were individually well-formed, correctly
   scoped in tone, and carried no banned CTA and no authority-model keyword. `check-claims`,
   `check-links`, `check-reflow` and all 26 guardrails passed the wrong version and the right one
   identically. This is a reading a person performs or nobody does.

   A useful forcing move: **restate the page's central claim in one sentence, as if writing the link
   description another page would use**, then go and find the row that proves it. That is precisely what
   surfaced the defect above, and it is cheap.
2. **Duplicate/repeated information** — no redundant sections or restated facts (incl. eyebrow/heading/lede).
3. **Logical flow** — ideas progress; transitions clear; conclusions follow.
4. **Logical grouping** — related content clustered; nothing sitting in the wrong section.
5. **Australian English** — spelling and vocabulary (`-ise`, `defence`, `licence` noun / `license` verb,
   double-L, no American vocab).
6. **AI-writing patterns** — no "delve/leverage/comprehensive/robust", no formulaic openers, no robotic
   over-hedging; human voice.

Then **`ai-detector`** where human-authored content is required.

---

## Hard-blockers (do not deploy if any are true)
- No H1, more than one H1, or an H1 without the target keyword.
- Schema missing/invalid (non-zero errors), or `recognizedBy` present on a WA (knowledge-requirement) page.
- On-page price != `Course.offers.price`.
- Any RTO / "accredited" / (WA) "approved course" / "permit" authority-model breach.
- A government/legislative claim with **no visible source** on the page, or the **Consolidated Sources**
  section missing.
- **A regulatory claim in summary furniture that the page's own detail contradicts or narrows** — a hero
  tick, capsule, sticky bar or meta description saying one thing where the table, FactGrid or list below
  says another (§3 check 1). A page that states two positions on the same regulatory question has no
  correct reading, and the summary is the part most readers act on. Equally blocking: a claim scoped
  wider than the evidence, e.g. "no state" on a page that verified and sourced five of them.
- An unresolved government fact, or a `[confirm: LW]` / `[TO VERIFY]` left open on a publish path.
- A government fee past its re-verify cadence (e.g. 1 July) not re-checked.
- The primary keyword is already targeted by an existing ABE page (cannibalisation).
- A banned CTA ("Enrol now/today"), a CTA inside an answer/FAQ block, or the word "comprehensive".
- Pure-black ink or pure-white ground; body text below AA contrast; a primary CTA button below 44px.
