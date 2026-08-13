---
date: 2026-08-12
skill: design-session
subject: JSON-LD graph edges in both course layouts, and metric-matched fallback faces
verdict: Amber
graded_by: self
---

# Design review — schema graph edges and font metric overrides, 2026-08-12

## Verdict

**Amber.** The schema work is complete, measured across all 14 course pages and green on every gate.
The font work is a real, measured reduction in reflow but is **not** a verified fix for the CLS number
that prompted it, and says so in its own comment. Amber rather than Green for two reasons: the session
opened on a **failed pre-flight that I did not see**, and the CLS cause is still unisolated.

## Pre-flight — clean, then broken mid-session by an unrelated commit

`node scripts/system-health.mjs` — **0 failing**, 44 warning, 76 ok (`data/health-log.jsonl`,
`2026-08-12T01:26:49Z`). Re-run at the end of the session: **8 failing** (`02:02:13Z`).

The cause is not this session's work. Commit `1c26fab` ("content(steps): split every step body so the
lead line carries the emphasis") landed on `main` at **11:56:59, while this session was running**, and
changed 14 files under `src/content/`. `check-pipeline.mjs` compares the **git commit time** of a page
source against its `07-verification.md`, so those pages became newer than the verifications that
certify them, exactly as designed. The eight FAILs are correct and are that commit's to close: the
preceding commit `c7c6c43` re-verified five pages for the earlier half of the same edit, and this one
did not.

**Three wrong claims were made in this review before that was checked, and are corrected here rather
than quietly deleted.** They were: that the FAILs predated the session; that `head -60` on the
pre-flight output had hidden them; and that they were an mtime artefact. All three are false. The
first two are refuted by the health log's own `fail:0` at pre-flight. The third is refuted by the
check's source: `gitTime()` is `git log -1 --format=%ct`, and the stat/build/stat test run to "prove"
the mtime theory was measuring a quantity the check never reads.

The real lesson is the one that keeps recurring: I reasoned from a plausible mechanism (mtimes) to a
confident conclusion without reading the checker, and the reasoning survived one test because the test
was built from the same wrong assumption. Read the check before explaining its output.

## What shipped

| Change | File | Was |
|---|---|---|
| `educationalCredentialAwarded` -> `#credential` | `CourseLayout.astro`, `CpdBundleLayout.astro` | absent; credential node floated unattached |
| `author` -> developer Person, gated on authority model | `CourseLayout.astro`, `CpdBundleLayout.astro` | absent |
| `reviewedBy` -> reviewer Person | `CourseLayout.astro`, `CpdBundleLayout.astro` | absent |
| `@id` on every Person, from the expert's own profile canonical | `CourseLayout.astro`, `CpdBundleLayout.astro` | no `@id`; a fresh anonymous node per page |
| `@id` on `provider` Organization | `CourseLayout.astro`, `CpdBundleLayout.astro` | name + url only |
| `dateModified`, parsed from the reviewer's dated entry | `CourseLayout.astro`, `CpdBundleLayout.astro` | no freshness signal in the graph at all |
| `'Archivo Fallback'`, `'DM Sans Fallback'`, `'DM Mono Fallback'` metric-matched faces | `global.css` | stack fell straight to `-apple-system` / `ui-monospace` |

Developer/reviewer attribution is read from the experts collection's own per-course `role`, not matched
on a name: Dominic develops QLD/WA/ACT but **not** TAS, so a name match would have credited him on a
page he had no hand in. TAS correctly ships with no `author` as a result.

## Measured

| | Before | After |
|---|---|---|
| Course pages with a connected graph | **0 of 14** | **14 of 14** |
| Dangling `@id` references | — | **0** |
| Authority-model breaches (ABE person as `author` on an asqa page) | — | **0 of 7 asqa pages** |
| Page reflow, pre-swap vs post-swap doc height @375px | **599px** | **287px** |
| Fallback width gap vs webfont (sample-dependent) | 5–11% sans, **17.6% mono** | ~0.03–4% sans, ~0.02% mono |
| Lighthouse mobile, local build | score 1, CLS 0.0005, LCP 1060 | score 1, CLS 0.0008, LCP 1193–1645 |
| Guardrails / astro check / check-claims | pass | **28 pages pass / 0 errors / 0 failing** |

Mono overrides did **not** move the 287px figure and are not credited with one; they remove a 17.6%
width jump across 259 mono labels on every cold load, which is worth having on its own.

## What was measured and rejected

**The audit's stated CLS cause is wrong, and its fix would have shipped doing nothing.** The 12 Aug
SEO/AEO audit named two expert headshots lacking `width`/`height`. They do lack them. They do not
cause shift: `.ph.r45` pins them by `aspect-ratio` plus a fixed width, and both render **132x165
before and after load** despite different intrinsic ratios (640x640 and 1086x1448). CLS delta from
forcing them to load: **0**. This is the `feedback_self_certification_fails` pattern caught before
shipping rather than after.

**My own first hypothesis was also wrong.** I proposed the font swap reflowing the header and page bar
as the mechanism pushing the hero image. Tested at 375px: header (67px), page bar (101px) and hero image
top (224px) are **identical** across webfont, new fallback and old fallback. The causal story I had
already written into `global.css` was corrected in place before commit rather than left to become
folklore.

**Environment noise nearly produced a false regression.** One local Lighthouse run reported score 0.84,
CLS 0.0777, LCP 3266. Two repeat runs in the same environment: score 1, CLS 0.0008, LCP 1193/1645.
Twenty-one Chrome and twenty Node processes were live (`reference_astro_singleton_daemon`,
`feedback_local_perf_testing`). A single perf run is not a result.

## Still open — the CLS cause is NOT isolated

Deployed mobile lab, three runs: **0.0752 / 0.0752 / 0.0797**, against this repo's own 0.02 gate, with
**99.3% attributed to the hero image** every time. The same build measures 0.0005–0.0008 locally, so the
trigger is network-timing dependent. The deployed hero-image hash matches the local build exactly, so
this is current `main`, not a stale deploy. The audit's figure of 0.303 was not reproducible in any run.

The hero image is not itself faulty: `width="1000" height="1250"`, `loading="eager"`,
`fetchpriority="high"`, correct `aspect-ratio`. Something above it moves on a cold networked load and
it is the largest element in view, so it scores the shift. **Re-measure on the deployed host after the
next deploy before crediting or blaming the font overrides.**

## How this reached main

`.github/workflows/ci.yml` triggers on **`pull_request` only**. The Lighthouse gate — which asserts
CLS <= 0.02 and LCP <= 1800 on `/qld-owner-builder-course` itself — last ran **1 Aug 2026**. The 11 and
12 Aug hero and accordion commits went straight to `main` and never ran it. A gate that cannot see
direct pushes did not fail; it was simply never asked. `.github/**` is deliberately unassigned platform
configuration per CLAUDE.md, so this is reported, not changed.

## Demand list

Tag every item: [skills] | [design] | [facts] | [build]

- ~~[skills] `.github/workflows/ci.yml` triggers on `pull_request` only, so the Lighthouse CLS/LCP gate has not run since 1 Aug 2026 while design work merged directly to `main` on 11 and 12 Aug. A ~0.075 CLS regression is live on the deployed host and no gate saw it. Platform config is unassigned by CLAUDE.md, so this needs a human decision, not a session.~~ fixed 13 Aug 2026 on Andrey's decision: `push: branches: [main]` added, and it was broader than filed — **all five steps** were absent on a direct push, not only Lighthouse. Two corrections to this item: the gate last ran **12 Aug**, not 1 Aug, and the ~0.075 CLS was not a regression the gate missed but a defect the localhost gate structurally **could not see**, which is why the nightly deployed-host run was built alongside. Both now green; CLS on `/cpd` went 0.5622 → 0.0012. See `skill-reviews/skills/2026-08-13-ci-gate-defects.md`.
- ~~[design] `img.ph` in the hero accounts for ~99% of the deployed CLS and **survived the font-metrics fix**, measured on the PR #117 branch preview: 0.0747 -> 0.0735, noise. The overrides' entire CLS effect was removing the page bar's `time` shift (0.0005 -> 0.0000), two orders of magnitude below the problem. **The new evidence is intermittency** — the hero shift was absent in 1 of 3 runs and identical (0.0735, final rect top 206, 308x385) in the other 2, on one unchanged build. A fixed-size element with correct `width`/`height`, correct `aspect-ratio` and inlined CSS that shifts only sometimes is a load-order race, not a sizing bug. Three static explanations have now each been measured and each been wrong (headshots, font metrics, header/page-bar reflow); the next step is a captured trace on a deployed host with the shift present, not a fourth hypothesis from inspection.~~ **cause found and fixed 13 Aug 2026.** The captured trace this item asked for was taken, via the Lighthouse `layout-shifts` audit on the deployed host, and it pointed at `.hero .wrap`: below 1100px the template collapses to one column while `.z-img` and `.howtrack` keep `grid-column:2`, which creates an implicit second column and leaves `1fr` with nothing. The hero text column measured **0px wide** on the deployed /cpd at 390px. CLS 0.5622 -> 0.0012, verified by a nightly run against the deployed host. **Two of this item's conclusions were wrong and are worth naming.** The intermittency was not a property of the site: on a clean CI runner /qld-owner-builder-course returned 0.07476670159705483 on three consecutive runs, identical to sixteen decimal places, so the variance was a contended local machine. And "three static explanations have each been wrong, therefore it is a load-order race" was an inference the evidence never supported - the fourth static explanation was the right one. The instruction to capture a trace rather than guess again was correct, and following it is what found this.
- ~~[build] `1c26fab` put `check-pipeline.mjs` into 8 FAIL by changing content without re-running Stage 7~~ **seven closed in this session** (`cpd-building-tas`, `cpd-electrical-tas`, `cpd-plumbing-tas`, `white-card-act`, `white-card-qld`, `white-card-tas`, `white-card-wa`), each with a dated re-verification entry naming the exact lines that changed. The eighth is below and is deliberately still open.
- ~~[facts] **`wa-owner-builder-course.mdx` gained an unverified regulatory claim in `1c26fab` and is a publish hard-blocker.**~~ **Closed in this session by reverting the added sentence** on Andrey's instruction, rather than by verifying it — no new fact was invented to clear a gate. The finding is left readable below because it is the reason the revert happened. The step body was rewritten from "If the building work is valued over $20,000 ... you need owner-builder approval" to add a second sentence: **"Below that threshold, no approval is required."** That sentence is new, is not in `kb/register/`, and is not entailed by what is. `eligibility-by-state.md:17` establishes only that approval is *required above* $20,000 — a requirement's threshold is not a blanket exemption below it, which is the `feedback_conditional_permission` failure exactly. `eligibility-by-state.md:74` records a second, separate WA trigger (Class 10a under $50,000, "separate from, and additional to, the $20,000 general approval trigger"), so other conditions demonstrably exist below $20,000. The same row warns "the bound is 'less than', not 'up to'" — and the new sentence's "below that threshold" leaves work valued at *exactly* $20,000 covered by neither sentence. Either revert the sentence or verify it against Building and Energy in a facts session. Its Stage-7 verification was deliberately NOT written.
- [build] Five pages touched by `1c26fab` — `act-owner-builder-course`, `qld-owner-builder-course`, `tas-owner-builder-course`, `owner-builder-nsw-course`, `owner-builder-nsw-course-w` — have **no `07-` artefact at all**, so `check-pipeline` §4 `continue`s past them silently. The check cannot distinguish "verified and current" from "never verified", so the five most-visited owner builder pages are exempt from the gate by absence.
- [build] `src/content/experts/dominic-ogburn.md` has no `courses` entry for `tas-owner-builder-course`, so that page ships with no `author` edge while the other three owner builder pages have one. Either he developed it and the record is incomplete, or he did not and the page should not list him as an expert.
- [build] No page on the site sets `ogImage`, so every social share of every page renders a blank card. `BaseLayout` already supports the prop and already upgrades `twitter:card` to `summary_large_image` when it is set — only a 1200x630 JPG/PNG asset and the frontmatter line are missing.
- [build] `Course.teaches` and a `FAQPage` node are absent. Both need content-layer data (`src/data/faqs*`, module outlines) that the layout cannot reach, so they are build work, not design.
- [skills] `provider` carries `@id` but no `sameAs`: ABE Education's verified profile URLs are recorded nowhere in the repo. Inventing them on the node whose job is establishing who ABE Education is would be a fabricated identity claim, so this needs Andrey to supply the real URLs.
- [skills] The `isoDate` helper is duplicated verbatim in `CourseLayout.astro` and `CpdBundleLayout.astro`. A shared module belongs in `src/lib/`, which no session type owns — the fifth path-ownership gap, same shape as `content.config.ts` and `public/**` before it.
- [skills] `sitemap-0.xml` entries carry no `lastmod`.
- ~~[skills] `.lighthouserc.json` documents itself with `_comment_*` keys **inside the `assertions` objects**, and lhci parses every key there as an audit name. PR #117's run printed `✘ _comment_tbt failure for auditRan assertion` on an otherwise passing gate. It did not fail the build, which is the problem: a permanent false ✘ is noise a real assertion failure can hide behind. Move the comments outside the `assertions` object, or into `_comment` keys at the matrix level where lhci does not read them.~~ fixed 13 Aug 2026, exactly as this item proposed: `_comment_tbt` moved out of the `assertions` object to the matrix level, beside `_comment_styleguide` and `_comment_url`, which were already there and had never been parsed as audits. One refinement to the diagnosis - it was not noise a real failure could hide behind, it was the assertion step's **entire visible output**, since lhci prints no "all passed" line. Verified on the real CI run after the fix: zero occurrences of `_comment_tbt` in the log, and the block now reads only "Checking assertions against 6 URL(s), 18 total run(s) / All results processed!".
- ~~[build] `white-card-qld.mdx:135` carries an em dash in `disclaimersHtml`, against house style~~ **fixed in `0d64474`** (punctuation only; the disclosure's claims, unit code, RTO name/number and ABN all unchanged, verified in the built HTML). Recorded because of how it was found: introduced by `6405efe` on **3 Aug 2026** and never gated, because CI runs on `pull_request` only and nothing ran between 1 Aug and PR #117. This is the SECOND defect the same trigger gap let through, alongside the CLS regression — evidence for the first `[skills]` item above, not an independent finding.

## Ship record

PR [#117](https://github.com/aap-82/abe-edu-web/pull/117), branch `design/schema-graph-edges-and-font-metrics`, five commits:

| Commit | What |
|---|---|
| `7a81b8c` | Graph edges + `@id`s + `dateModified` (both layouts), metric-matched fallback faces |
| `da2be1a` | Seven Stage-7 re-verifications |
| `24b76bc` | WA unverified-claim revert + its Stage-7 entry |
| `2cee1e9` | Recorded that the font overrides do NOT fix the hero CLS |
| `0d64474` | prose-lint em dash + Stage-7 addendum |

**CI green on `0d64474`** — Lighthouse + prose lint ✅, Workers Builds ✅. Not merged: merging is the
deploy, and that is Andrey's gate.

**The gate passing is itself a finding.** Lighthouse CI ran 6 URLs x 3 runs and raised no CLS or LCP
failure, while the deployed build carries a reproducible ~0.074 hero shift. It measures
`localhost:4321` via `npm run preview`, where this page reports ~0.0005. So the gate is not only dark
on direct pushes (the `[skills]` item above) — **it is blind to this class of defect even when it
runs.** A green tick on that assertion is not evidence the hero issue is absent.

## Session close

| Item | Disposition |
|---|---|
| Session type declared | **design**, at the start, unchanged |
| Boundary crossings | **3**, all on Andrey's direct instruction after being named: `pipeline/**` (x2), `src/content/**` (x2). Disclosed in each Stage-7 entry and in the commit messages |
| Design review filed | this file (rule 9) |
| `graded_by` | **self** — there is no fresh-subagent design grader (CLAUDE.md rule 9 permits this with a stated reason) |
| Demand list | 13 items, 4 struck closed in-session |
| Memory written | **yes** — 3 files added/updated under `~/.claude/projects/C--dev-abe-web/memory/`, indexed in `MEMORY.md` |
| `kb/mistakes-log.md` | **NOT updated** — skills-owned, and this session is design. Two entries are owed, listed below |
| Handover views | regenerated via `demand-split.mjs --write` (derived, gitignored) |
| Left undeployed | yes. PR green and waiting |

**Owed to `kb/mistakes-log.md`, for a skills session** (design may not write it):
1. **A commit message described a change as mechanical when it was a rewrite.** `1c26fab` says "split
   every step body"; it re-worded sentences and added a regulatory claim to a WA page. The prior
   commit's verification wording ("character for character") would have been false if copied forward.
   This is the "documentation describing the build drifted from the code and was trusted over it" row,
   which already stands at 10 sightings — and here the drifted description was a commit message, which
   is the one artefact a reviewer trusts most and can least easily check.
2. **I explained a check's output from a plausible mechanism without reading the check.** I attributed
   8 Stage-7 FAILs to filesystem mtimes, then built a stat/build/stat test from the same assumption and
   read its pass as confirmation. `check-pipeline.mjs` compares **git commit times**. The test could
   never have falsified the theory because it measured a quantity the check does not read. Sibling of
   the `feedback_self_certification_fails` lesson, one level up: not measuring the wrong end of my own
   fix, but measuring the wrong quantity entirely to explain someone else's failure.
