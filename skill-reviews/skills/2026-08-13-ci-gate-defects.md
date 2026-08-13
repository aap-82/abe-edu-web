---
date: 2026-08-13
skill: skills-session
subject: the three ci.yml / lhci defects, and a nightly CWV run against the deployed host
verdict: Green
graded_by: self
---

# Skills review — CI gate defects, 2026-08-13

Self-graded; there is no fresh-subagent skills grader. The verification below is measurement and
falsification rather than assessment, which is the stronger claim.

## Verdict

**Green**, with one honest limit: the trigger fix cannot be proven from a working tree. Its proof is
the next push to `main` producing a CI run, and I say so rather than implying I verified it.

## Pre-flight

`node scripts/system-health.mjs`: **0 failing**, 44 warning, 81 ok. Same at close.

## The three defects, each confirmed before being fixed

The handover named these. I did not take them on faith, because the last audit this repo acted on
had a headline metric 4x off and three "blockers" that were already fixed, impossible, or would have
shipped doing nothing.

**1. The gate never ran on `main`.** `on: pull_request:` with no push trigger. Confirmed, and
**broader than the handover stated**: all five steps skip, not just Lighthouse. Type check, build,
redirect-sync, Lighthouse and prose lint were all absent from any commit reaching `main` directly.

Demonstrated on this session's own work rather than argued: `gh run list --commit` returns **zero
runs** for `adb03be`, `65ff82a` and `2870306`, pushed hours earlier. One of them changed
`global.css` and auto-deployed to production. `health.yml`, which does carry a push trigger, ran on
the same push — so the difference is the trigger, not the runner.

**2. It measures `localhost:4321`.** Confirmed in config. The known ~0.0752 CLS demonstrably does
not reproduce there: the gate asserts CLS <= 0.02 on that page and passes.

**3. A permanent false ✘.** Confirmed from the real CI log of the last run (12 Aug):

```
Checking assertions against 6 URL(s), 18 total run(s)
1 result(s) for http://localhost:4321/styleguide :
  ✘  _comment_tbt failure for auditRan assertion
     "_comment_tbt" is not a known audit.
All results processed!
```

**Worse than the handover framed it.** That ✘ was not something a real failure could hide behind, it
was the assertion step's *entire visible output* — there is no "all passed" line — so the gate's only
signal was a failure that was always false. Precisely one of the three `_comment_*` keys causes it:
`_comment_tbt` sat inside `assertions`, while `_comment_url` (in `collect`) and `_comment_styleguide`
(sibling of `assertions`) were never parsed as audits. That sibling position is the fix, and it was
already proven safe by the two keys occupying it.

**Handover correction.** It says the gate "last ran 1 Aug". It last ran **12 Aug**, on the
`design/schema-graph-edges-and-font-metrics` PR. The substance holds; the date does not.

## What shipped

| File | Change |
|---|---|
| `.github/workflows/ci.yml` | `push: branches: [main]` added |
| `.lighthouserc.json` | `_comment_tbt` moved out of `assertions` |
| `.github/workflows/nightly-cwv.yml` | new: Lighthouse against the deployed host, 02:00 AEST |
| `scripts/lhci-deployed-config.mjs` | new: derives the deployed config from `.lighthouserc.json` |
| `scripts/check-claims.mjs` | the new script registered in `CHECK_EXEMPT` |
| `SYSTEM.md` §5 | five moments to six; the push trigger and the nightly documented |

Deliberately **no `paths` filter** on the push trigger. A path filter is the same class of defect as
the missing trigger — a gate that silently does not run — and "docs-only" is what the 12 Aug change
looked like right before it shipped a CSS regression.

## The nightly, and the one real design decision in it

**No second config file.** The obvious implementation is `.lighthouserc.deployed.json`, and it is
wrong: a copy of twelve budget values is a second source of truth, and this repo spent the earlier
half of the same day on what that costs. `lhci-deployed-config.mjs` rewrites only the origin and the
server-start keys, and a guard compares both configs with every severity blanked out, so an edit
that changes a *budget* rather than a *severity* fails generation instead of shipping.

**Deterministic assertions fail; timing assertions warn.** This is the substantive call, and it is
measured, not preferred.

| Severity | Assertions | Why |
|---|---|---|
| `error` | `cumulative-layout-shift`, `performance-budget`, `render-blocking-resources` | properties of the artefact: same build, same answer, whoever measures. CLS is also the exact defect this nightly exists for |
| `warn` | `categories:performance`, `largest-contentful-paint`, `total-blocking-time` | properties of the environment |

The evidence for the split, measured against the deployed host:

| Probe | LCP runs (`/qld-owner-builder-course`) | median |
|---|---|---|
| first | 3967 / 3617 / 2447 ms | 2447 |
| second, unchanged site | 3857 / 3220 / 3634 ms | 3220 |

A 1.5x spread within a probe, and a median that moves 2447 to 3220 between two probes of a site that
did not change, is the measuring machine talking. There is no runner baseline for the deployed host,
so any number set here would be invented — and this repo has twice already had to raise a budget
that flapped on the runner (styleguide LCP 1800 to 2200, TBT 50 to 100), both times *after* it had
blocked merges without catching a defect. Shipping these three as errors would mean a nightly red
from night one on numbers nobody can defend, which trains readers to ignore it: the same failure as
the false ✘ this session removed.

The promotion trigger is written into the script and is real: two weeks of nightly runs, p95 per URL
**from the runner**, budget set above it, assertion moved out of `TIMING_ASSERTIONS`.

## Verification

- **lhci run against the fixed config.** Before: one result, the bogus `_comment_tbt`. After: only
  real audits. The fix is proven by running the tool, not by reading the JSON.
- **A trap avoided, recorded because it nearly became a false finding.** That first local run
  reported perf 0.98 and TBT 142.5 as failures. They were not real: something was already listening
  on `[::1]:4321` — the IPv6-only bind that is the Astro dev-server signature — so lhci's own
  `npm run preview` timed out and it measured a **dev server**. Checked the CI log: zero timeout
  warnings there, so the artefact is local-only. I nearly reported two regressions that were a
  stray process.
- **Exit-code proof of the severity split.** Same deployed probe, softened config: exit **0**, with
  CLS / byte budget / blocking-resource count enforced as errors and passing, and the timing numbers
  still printed as warnings. The nightly starts green while remaining informative.
- **Generator guards falsified**, not assumed: no argument, a path, a query string, a non-http
  scheme and a non-URL are all rejected; the workers.dev origin, the post-cutover
  `www.abeeducation.edu.au` and a localhost origin are all accepted.
- **Registration.** `check-claims` reports 13 checks and **7** utility scripts exempt, up from 6.
  Governance references 204/204. Build green, 28 pages passed guardrails. `npm run check` 0 errors.

## What I could not verify

**The push trigger.** No working-tree check can prove a GitHub event binding. The proof is the next
push to `main` producing a run of `CI`. Related and worth expecting: **that first run may well be
red**, because the gate has not run against `main` since 12 Aug and two design changes have landed
directly since. A red there is the gate working, not a new break.

**The nightly's first real run**, for the same reason — and its numbers will differ from the probes
above, because those came from a contended dev machine rather than a clean runner. That is precisely
why the timing assertions warn.

## Addendum — the nightly's first real run, and what it found

Triggered manually via `workflow_dispatch` immediately after merge (run `31696624045`) rather than
waiting for 02:00. **It failed, correctly, on its first run**, and found more than the one defect it
was built for.

| URL | CLS | vs 0.02 | previously known? |
|---|---|---|---|
| `/cpd` | **0.5622** | 28x | **no** |
| `/qld-owner-builder-course` | 0.0748 | 3.7x | yes (~0.0752) |
| `/reviews` | 0.0581 | 2.9x | **no** |

`/owner-builder-courses`, `/experts/dominic-ogburn` and `/styleguide` passed CLS. Every timing
assertion behaved as designed: warnings, no failure, numbers recorded. The run failed on CLS alone,
which is exactly the severity split working.

**The same CI run measured these six URLs on localhost and passed CLS on all of them.** That is the
justification for this workflow, demonstrated within hours of building it.

### Root cause, from the trace `global.css` asked for

The comment at the top of `src/styles/global.css` ends: *"Do not propose a fourth explanation from
inspection. Capture a trace on a deployed host with the shift present and read what actually
moves."* Done, via the Lighthouse `layout-shifts` audit on all three failing reports:

- **The shifting element is the hero image itself**, `<img class="ph r54 ph-img">` on `/cpd` and
  `/reviews`, `ph r45 ph-img` on `/qld-owner-builder-course`. It carries essentially the whole score.
- **The web-font shift event scores 0.0000** on all three. The metric-matched fallback faces added
  12 Aug are doing their job, and are not the cause. That closes one of the open hypotheses.
- **It is not intermittent.** `/qld` returned `0.07476670159705483` on all three runs, identical to
  sixteen decimal places, and `/cpd` returned 0.5622 twice and 0.5664 once. The intermittency in the
  earlier record ("absent entirely in run 1") was a contended local machine, not the site.
- **It is not one page's hero.** Three pages, two aspect ratios, one component.

Two corrections to the standing record follow from that, and both are design-owned so this review
files them rather than making them: `global.css`'s comment says the hero image is "not itself
faulty ... being moved by something above it", and characterises the defect as intermittent and as a
load-order race. On a clean runner it is deterministic and attributed to the image element. The
load-order-race hypothesis may still be right about the *mechanism*; the "intermittent" and "moved by
something above it" framings are now contradicted by measurement.

## Addendum 2 — `health.yml` audited: one root cause, two symptoms

Asked whether the health commit is set up correctly, because it appeared to slow deployment and to
create constant diff. Audited both claims by measurement.

**It does not slow the deployment.** The commit carries the skip marker, and Workers Builds records
those builds as `skipped` (`fea34aa4`, `f4009eac`, `e7402a2`, all outcome `skipped`). `health.yml`
also runs in parallel with Workers Builds, not ahead of it. Nothing waits on it.

**It does create constant diff, and here is the mechanism.**

`check-pipeline.mjs` reads `dist/{slug}/index.html`. `dist/` is gitignored (`.gitignore:2`), and
`health.yml` deliberately runs no `npm ci` and no build. So in CI every `dist`-dependent branch hits
`if (!plan || !existsSync(built)) continue;` and **25 assertions silently vanish** — 18 OK and 7
WARN, verified by diffing the CI log against a local run with path separators normalised: 25 lines
only-local, **0 lines only-CI**, and every one of the 25 is `check-pipeline` section or capsule
conformance.

That makes CI records **systematically** different from local ones: `0/37/63` against `0/44/81`.
`health-log-dedupe` compares only the last record with the one before it, so an alternating
CI/local sequence can never dedupe. Measured over the last 60 records: **26 of 59 consecutive pairs
cross the CI/local boundary**, and every crossing is a guaranteed non-duplicate and therefore a
guaranteed commit. 13 CI records in that window, 13 commits.

The comment at `health.yml:58` states that installing dependencies "would add a minute to every run
and change nothing". **It changes 25 assertions.** That is the repo's most-sighted repeat risk,
documentation describing the build drifting from the code, at its eleventh sighting.

**The blind spot is the worse half.** Brief-to-page conformance is the check whose entire job is
catching a briefed section dissolving into a neighbour, and it is the one that silently stops
running in CI. A set-scoped check reporting nothing is its least trustworthy output, and this one
reports nothing without saying so.

## Demand list

Tag every item: [skills] | [design] | [facts] | [build]

- [skills] `nightly-cwv.yml` timing assertions are `warn` pending a runner baseline. After two weeks
  of runs (from ~27 Aug 2026), take p95 per URL from the runner, set budgets above it, and move those
  three out of `TIMING_ASSERTIONS` in `scripts/lhci-deployed-config.mjs`. Until then the nightly
  cannot fail on a timing regression, which is a known and deliberate gap, not an oversight.
- [skills] `nightly-cwv.yml` names the preview host in `env.DEPLOYED_ORIGIN`. **At cutover this must
  change to `https://www.abeeducation.edu.au`** or the nightly silently keeps measuring a preview
  host nobody visits. It is one line and it is the only place the host appears; add it to the cutover
  runbook rather than trusting it to be remembered.
- [design] `.ph.ph-img` shifts on the deployed host on every page that has a hero image, and the
  nightly's first run measured it at **0.5622 on `/cpd`** (28x the 0.02 budget), 0.0748 on
  `/qld-owner-builder-course` and 0.0581 on `/reviews`, deterministic across three runs each. The
  Lighthouse `layout-shifts` audit attributes it to the `<img class="ph ... ph-img">` element itself,
  with the web-font shift event at 0.0000. Highest-value open defect on the site: it is on three
  indexable pages, a reader sees it, and CLS is a ranking signal. `/cpd` first, since it is an order
  of magnitude worse than the others and may be a different fault.
- [design] `src/styles/global.css`'s hero-CLS comment now contains two claims the deployed trace
  contradicts: that the shift is intermittent, and that the image is "not itself faulty ... being
  moved by something above it". On a clean runner it is deterministic to sixteen decimal places and
  attributed to the image element. The comment explicitly asked for this trace, so the answer belongs
  in it. Do not delete the load-order-race hypothesis, which may still describe the mechanism;
  correct the two framings that were measured and found wrong.
- [skills] The nightly measures six URLs, one per template, inherited from the PR gate's list. Two of
  the three CLS failures (`/cpd`, `/reviews`) were unknown before it ran, which means the URL list is
  now doing discovery rather than regression-watching, and there are 24 built pages. Worth deciding
  whether the deployed run should cover more than one URL per template, given a per-page fault has
  now been found that the template exemplar did not predict.
- ~~[skills] `health.yml` runs `system-health` without building, so `check-pipeline`'s 25
  `dist/`-dependent assertions silently no-op in CI (18 OK, 7 WARN; measured by diffing the CI log
  against a local run, 0 lines CI-only). Two consequences from one cause: brief-to-page conformance
  is **unenforced in CI**, and CI records are permanently `0/37/63` against local `0/44/81`, which
  defeats `health-log-dedupe` — it compares only the last two records, and 26 of the last 59
  consecutive pairs cross the CI/local boundary, so nearly every push commits a health record. Fix
  is `npm ci && npm run build` before `system-health` in `health.yml`, which closes the blind spot
  and makes the dedupe start working. Cost is roughly a minute per push, against `health.yml:58`'s
  claim that installing "would change nothing" — it changes 25 assertions, and that comment should
  go with the fix.~~ done 13 Aug 2026: `npm ci` + `npm run build` added to `health.yml`, the wrong
  comment replaced with the measurement, and `SYSTEM.md` §5 now records that `check-pipeline` needs
  a built `dist/`. Verified by the next CI health record matching local.
- [skills] `check-pipeline.mjs` should say so when `dist/` is absent instead of returning quietly.
  Every page hits `if (!plan || !existsSync(built)) continue;` and the script still prints a summary
  line, so an environment where it checked nothing is indistinguishable from one where everything
  passed. One WARN naming the count of pages skipped for want of a built page would have made the
  gap above visible the first time it happened rather than a month later. Same shape as the
  set-scoped-tools lesson already in the mistakes log.
- [skills] `check-claims` §7 requires every `scripts/*.mjs` to be named in SYSTEM.md §5 or exempted,
  and the exempt list is now 7 of 20. That is a third of the directory exempt from the rule, each for
  a good reason individually. Worth one look at whether "is it a check" is still the right axis, or
  whether utilities want their own §5 paragraph so they are documented rather than merely excused.
