---
subject: full-repo audit
date: 2026-08-15
session_type: skills
graded_by: self
---

# Skills review — the full-repo audit, and the ten fixes it authorised

**Session type: `skills`.** Andrey asked for a full audit of the project — dependencies, orphan
pages, contradicting rules, structure, and whether the Claude Code setup, memory and skills are
working — then, having been shown the findings, asked for all of them to be fixed. Both halves ran in
one session. The audit half was read-only; every measurement below was taken before anything changed.

`graded_by: self` — there is no fresh-subagent skills grader (CLAUDE.md rule 10). Mitigated by every
claim here being a measured before/after with the command that produced it, and by four of the ten
fixes being verified against **simulated drift** rather than against passing.

## Pre-flight

`node scripts/system-health.mjs` — **0 failing, 45 warning, 83 ok**. No FAIL, so the session opened
legitimately (rule 1).

## What shipped, measured

| # | Finding | Before | After |
|---|---|---|---|
| 01 | Sitemap advertising `noindex` pages | 2 pages both `noindex,nofollow` and in `sitemap-0.xml` | 0; sitemap 22 → 20 entries, exclusion derived from frontmatter |
| 02 | Checks no automation invoked | 2 of 13 (`check-links`, `check-reflow`) | 0 of 14 |
| 03 | Regulatory claims gating a merge | nothing | `check-claims --strict` + `check-positions --strict` in CI |
| 04 | Handovers with no closure record | 4 of 13 | 0 — 3 stamped, 1 exempt by its own text |
| 05 | Ungraded-page warnings | 6 permanent, unclosable | 0; recorded as `REVIEW_EXEMPT` with reasons |
| 06 | Local branches | 56 (31 "ahead of main") | 2 (`main` + this one) |
| 07 | `.claude/settings.local.json` | 453 grants, 41,497 bytes, 30 mutating one-offs | 83 grants, 2,805 bytes, 0 mutating |
| 08 | Meta length vs `meta-framework.md` | 15 pages over target, unmeasured | same 15, each budgeted, rising now FAILs |
| 09 | Demand items closed by strikethrough | 156 | 158 (+3 struck, −1 un-struck) |
| 10 | Astro | 7.2.0 | 7.2.2 |

`system-health`: **45 warnings → 39**. Build green throughout: 28/28 guardrails, 27 pages, `astro
check` 0 errors, `check-links` 0 failing, `check-reflow` 0 failing, `prose-lint` 16 files,
`check-design-register` 5/5, `npm audit` 0 vulnerabilities.

## The defect, and why it was structural

`/cpd-electrical-tas` and `/cpd-plumbing-tas` rendered `noindex,nofollow` **and** appeared in
`sitemap-0.xml` — a sitemap asking Google to index pages whose own heads refuse it.

The flag lived in MDX frontmatter; the sitemap exclusion lived in a hand-maintained `NOINDEX` array
in `astro.config.mjs`. Both bundles were built on 12 Aug with the flag, and nobody edited the array.
That array's own header comment said **"keep the two in step"** — and had been extended by hand on
1 Aug for this same class of miss. A rule stated in a comment, enforced by nothing, in a file the
page author has no reason to open.

Worse, `cpd-building-tas.mdx:31` told the next author that `noindex` "also drops the page from the
sitemap". That was true only because *that* slug happened to be listed by hand. The document taught
the wrong model, which is this repo's most-recorded repeat risk (mistakes-log row 1) pointed at a
future author rather than a past one.

Two changes, deliberately redundant:

1. `astro.config.mjs` derives `NOINDEX` by reading frontmatter, so the flag is now the single source.
2. `scripts/check-meta.mjs` reads the **built output** the other way round — every `<loc>` in the
   sitemap, opening that page's HTML — so it holds whatever the derivation gets wrong: a route whose
   URL is not its content id, a page noindexed in a layout, a future integration change.

**Verified by reproduction, not by passing.** The config was reverted to the hand-maintained array,
the site rebuilt, and the check produced exactly the two FAILs for exactly the two pages, then the
fix restored and re-verified.

## What was tested against drift rather than against success

Four mechanisms, seven simulated defects, each confirmed to trip before being trusted:

- **Meta ratchet**, all four directions: budget above measured (FAIL, lower it), budget below
  measured (FAIL, regression), no budget line (FAIL, new debt), budget naming a non-indexable page
  (FAIL, delete it).
- **`REVIEW_EXEMPT`**, three directions: an exempt page that has been graded (FAIL), an exempt slug
  that is not a built page (FAIL), and a non-exempt ungraded page still warning.
- **`--strict` semantics** before wiring CI: with a deliberate FAIL present the strict run exits 1
  and the plain run still exits 0, so today's 24 warnings cannot redden the new gate.
- **The sitemap guard**, by reproducing the live defect as above.

## Two things the audit itself got wrong, corrected here

Recorded because the audit was the instrument, and an instrument's errors matter more than its
findings.

**1. It counted absent status headers instead of opening the files.** The audit reported four
handovers "with no closure record", repeating a line in CLAUDE.md. `HANDOVER-status-board.md` opens:
*"Unlike the other files in `handover/`, this one does not close with a `## Status:` line. It
describes a recurring task, so it stays open by design."* It was exempt, and said so. Reading an
artefact and finding X absent cannot distinguish an oversight from a deliberate withdrawal — the
same failure as four sessions filing a `robots.txt` `Disallow` against a rule withdrawn twelve days
earlier. CLAUDE.md now records the exemption so the fifth reader does not re-derive it.

**2. It nearly reported two used images as unused.** A basename grep across `--include=*.astro,*.mdx,*.ts`
returned zero hits for both expert portraits. They are referenced from `src/content/experts/*.md` —
`.md`, not in the glob. Caught by noticing the build log processing a file the check called unused.
Same family as row 24: a set-scoped tool that cannot see part of its own set.

## Judgement calls, stated

- **Finding 08 was not fixed the obvious way.** Editing 14 pages' meta would be `src/content/**`,
  build-owned, one page per session. So the target was mechanised instead of the copy edited. The
  debt is unchanged and now visible and can only shrink.
- **Deleting 55 branches used content evidence, not ancestry.** The repo squash-merges, so "commits
  not in main" is the expected state of a merged branch and proves nothing. Each branch's added
  lines were searched for in `main`, and every branch either had none outstanding or a merged PR.
  The one branch with neither (`design/close-dead-items-and-overflow-tap-sweep`) was traced to PRs
  #107 and #108 by commit subject, and a sampled "missing" line was found present in `main` at the
  same line number.
- **`check-meta` collapses its 22 warnings to one line** unless run with `--verbose`. It reports on
  every build, and 22 near-identical lines about work it cannot authorise anyone to do would bury
  the FAILs — SYSTEM.md's own rule about the figure check at 93 warnings.

## Disclosed crossing

`astro.config.mjs`, `package.json`, `package-lock.json` and `.github/workflows/ci.yml` are
**deliberately unassigned** by CLAUDE.md's session-type table: platform and deploy configuration,
"its own decision with a human in it". This session edited all four.

Andrey was shown the audit findings and instructed that all of them be fixed, which is the same
shape as the 4 Aug `SiteHeader.astro` crossing and the QLD build session's before it: named, then
instructed, then recorded here rather than left in the transcript. Three of the ten findings could
not have been fixed at all otherwise — the sitemap defect, the CI gates and the Astro patch.

`kb/mistakes-log.md` and `kb/register/**` are separate: the log is skills-owned and was edited; **no
register file was touched**, and no figure was verified or recorded in this session (rule 4).

## Demand list

Tag every item: [skills] | [design] | [facts] | [build]

- [build] `CourseLayout.astro:148` still hardcodes `hasCourseInstance.courseMode: 'online'` for every
  course, including the ACT face-to-face White Card. Filed 4 Aug, verified still open today; it is a
  structured-data claim that contradicts the page for at least one product.
- [design] `.faq summary` remains the only holder of the undocumented Archivo 600 18px
  (`global.css:1268`), and DESIGN.md §3 still has no 18px step. Third carry. Closing it is a register
  change and therefore an exclusive session (rule 7), which is plausibly why it keeps being carried
  rather than done — worth scheduling *as* that session rather than hoping it fits inside another.
- [design] The min-content trap (`minmax(0, 1fr)`) is now named in three components' comments and
  nowhere in `DESIGN.md` §7. Filed 11 Aug, still open. Register edit, exclusive session.
- [skills] **`check-meta`'s BUDGET will rot in the one direction it cannot see.** It catches a length
  rising and a length falling, but a page deleted and rebuilt under a new slug simply loses its
  budget line and re-enters as new debt at whatever length it has. The `not an indexable built page`
  FAIL catches the old line; nothing catches the new page inheriting nothing.
- [skills] `demand-split` reports 13 open items naming a file that no longer resolves, and 133 that
  name no file at all and cannot be checked by any tool. The second number is the interesting one:
  the demand-list format rule asks for the subject in backticks in the lead, and roughly half the
  corpus predates it.
- [facts] `kb/register/cpd/tas-courses.json` still records which courses are *eligible* for a
  category, never which are *sold*, so `/cpd-plumbing-tas` renders 13 rows for a 12-course bundle.
  Unchanged; re-stated here because closing `HANDOVER-facts-cpd-tas.md`'s superseded half made it the
  only live item in that file.
