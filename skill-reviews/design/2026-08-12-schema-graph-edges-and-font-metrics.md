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

- [skills] `.github/workflows/ci.yml` triggers on `pull_request` only, so the Lighthouse CLS/LCP gate has not run since 1 Aug 2026 while design work merged directly to `main` on 11 and 12 Aug. A ~0.075 CLS regression is live on the deployed host and no gate saw it. Platform config is unassigned by CLAUDE.md, so this needs a human decision, not a session.
- [design] `img.ph` in the hero accounts for 99.3% of a stable 0.0752–0.0797 CLS on the deployed host but 0.0005 locally. Cause unisolated; font reflow was tested and ruled out at 375px. Needs a throttled cold-load trace against the deployed host.
- ~~[build] `1c26fab` put `check-pipeline.mjs` into 8 FAIL by changing content without re-running Stage 7~~ **seven closed in this session** (`cpd-building-tas`, `cpd-electrical-tas`, `cpd-plumbing-tas`, `white-card-act`, `white-card-qld`, `white-card-tas`, `white-card-wa`), each with a dated re-verification entry naming the exact lines that changed. The eighth is below and is deliberately still open.
- [facts] **`wa-owner-builder-course.mdx` gained an unverified regulatory claim in `1c26fab` and is a publish hard-blocker.** The step body was rewritten from "If the building work is valued over $20,000 ... you need owner-builder approval" to add a second sentence: **"Below that threshold, no approval is required."** That sentence is new, is not in `kb/register/`, and is not entailed by what is. `eligibility-by-state.md:17` establishes only that approval is *required above* $20,000 — a requirement's threshold is not a blanket exemption below it, which is the `feedback_conditional_permission` failure exactly. `eligibility-by-state.md:74` records a second, separate WA trigger (Class 10a under $50,000, "separate from, and additional to, the $20,000 general approval trigger"), so other conditions demonstrably exist below $20,000. The same row warns "the bound is 'less than', not 'up to'" — and the new sentence's "below that threshold" leaves work valued at *exactly* $20,000 covered by neither sentence. Either revert the sentence or verify it against Building and Energy in a facts session. Its Stage-7 verification was deliberately NOT written.
- [build] Five pages touched by `1c26fab` — `act-owner-builder-course`, `qld-owner-builder-course`, `tas-owner-builder-course`, `owner-builder-nsw-course`, `owner-builder-nsw-course-w` — have **no `07-` artefact at all**, so `check-pipeline` §4 `continue`s past them silently. The check cannot distinguish "verified and current" from "never verified", so the five most-visited owner builder pages are exempt from the gate by absence.
- [build] `src/content/experts/dominic-ogburn.md` has no `courses` entry for `tas-owner-builder-course`, so that page ships with no `author` edge while the other three owner builder pages have one. Either he developed it and the record is incomplete, or he did not and the page should not list him as an expert.
- [build] No page on the site sets `ogImage`, so every social share of every page renders a blank card. `BaseLayout` already supports the prop and already upgrades `twitter:card` to `summary_large_image` when it is set — only a 1200x630 JPG/PNG asset and the frontmatter line are missing.
- [build] `Course.teaches` and a `FAQPage` node are absent. Both need content-layer data (`src/data/faqs*`, module outlines) that the layout cannot reach, so they are build work, not design.
- [skills] `provider` carries `@id` but no `sameAs`: ABE Education's verified profile URLs are recorded nowhere in the repo. Inventing them on the node whose job is establishing who ABE Education is would be a fabricated identity claim, so this needs Andrey to supply the real URLs.
- [skills] The `isoDate` helper is duplicated verbatim in `CourseLayout.astro` and `CpdBundleLayout.astro`. A shared module belongs in `src/lib/`, which no session type owns — the fifth path-ownership gap, same shape as `content.config.ts` and `public/**` before it.
- [skills] `sitemap-0.xml` entries carry no `lastmod`.
