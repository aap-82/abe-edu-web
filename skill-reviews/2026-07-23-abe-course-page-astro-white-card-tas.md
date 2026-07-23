---
# Machine-readable block. scripts/review-trends.mjs parses this, so keep the keys and
# shapes exactly as they are — prose belongs below the frontmatter, not inside it.
date: 2026-07-23
skill: abe-course-page-astro
subject: white-card-tas
archetype: 2 — Nationally recognised course
verdict: Amber
graded_by: independent
scores:                            # green | amber | red
  correct_and_safe: green          # NON-NEGOTIABLE. red here fails the whole run.
  passed_gates_first_time: amber
  inside_effort_budget: green
  low_rework: green
  taught_us_something: green
metrics:
  turns_to_passed_audit:           # not recorded in the artefacts — see Grader note
  manual_fix_passes: 1             # fixes needed after the skill said "done"
  gate_fails_after_handoff: 0      # checks that failed only after handover
---

# Skill review — white-card-tas, 2026-07-23

## Verdict
**Amber, and a healthy one — it is safe, and it fixed every headline failure of run 1.** The
correct-and-safe veto passes on values I re-measured in `dist/` myself, and Stage 7's self-certification
was honest this time: every word count, marker and schema node it reported matches the built HTML. The
Amber is narrow and sits on one gate — the first Stage-7 subagent declared GREEN having skipped the
three mandated skill-audits, and when they were bolted on afterwards they found a real page-specific
readability defect that needed a fix and a rebuild. A verification that does not cover what it claims is
the same disease as run 1, caught earlier and treated inside the pipeline rather than at grading.

The run did not deploy — `buyUrl` is TBC and the page ships `noindex` — so the outcome block is omitted
per the template. Primary keyword `white card tasmania` (1029 GSC impr, avg pos 22.5); secondaries
`white card tas`, `white card tasmania online`, `white card course tasmania`, `white card training
tasmania`, `tasmania white card`.

## What worked

**Correct-and-safe is clean, and I checked it rather than took Stage 7's word.** In
`dist/white-card-tas/index.html`: `data-authority="asqa-accredited"`; one server-rendered `@graph` of
Course + EducationalOccupationalCredential + BreadcrumbList + Person×2; `recognizedBy` an Organization
named **Blue Dog Training / "RTO 31193" / training.gov.au…/31193**, never ABE; `credentialCategory`
**"Statement of Attainment"** with **zero** occurrences of "Certificate of Completion"; `offers.price`
`"59"` against `$59` on the page. ABE is never asserted to be the RTO — "not a registered training
organisation" ×3, "is not an RTO" ×2, Blue Dog named as RTO 31193 throughout. One H1. `noindex,nofollow`
as intended. Zero "comprehensive". 13 em dashes, all in the JSON-LD credential name and the site-wide
"Authority — page name" citation labels; none in body prose.

**The superseded unit code did not leak, and the run caught that three repo docs carry it.**
`CPCCWHS1001` count in `dist/` is **0**; `CPCWHS1001` is **22**. Stage 1 §C and Stage 3 both flagged
that `abe-new-site-sitemap.md:36`, the `content.config.ts:37` comment and the archetype's own worked copy
still carry the superseded `CPCCWHS1001`, while only `kb/register/` is right — and the page took the
register. This is mistakes-log #1's exact shape (doc drifts from code), handled the correct way: trust
the register, use the right code, log the three stale copies for Andrey rather than silently "fixing"
one to match another.

**The two mistakes-log risks this archetype most invites were both guarded.** #5 (an RTO named for units
it does not hold on scope) — Stage 1 records Blue Dog's CPCWHS1001 scope confirmed **in a browser** at
training.gov.au on 23 Jul 2026, exactly the guard, because WebFetch cannot read that SPA. #10 (page
invisible to its own guardrails) — the page declares `data-authority`, so the JSON-LD and
authority-language checks fire; this was run 1's signature failure and it is fixed.

**Self-certification held under my re-measurement.** I extracted all eight capsules from `dist/`: 40 / 52
/ 51 / 56 / 53 / 19(on-dark) / 49 / 46 words — identical to 07's table, every question-led section
capsule inside 40–60, and the only sub-40 is the TrustBand tagline that 07 honestly marked NOTE. The
eyebrow marker sequence reads a clean **01,02,03,04,05,06,07** with no collision. This is the single most
important contrast with run 1, whose Stage-7 predecessor ticked six capsules green while one was 28 words
and whose markers read 01,01,02…. Here 07 measured the output and reported the measured value.

**Warnings were surfaced, not buried.** 07 carries a verbatim "WARNs/FAILs naming this slug" block: the
one FAIL is the self-referential missing-07 artefact, the one WARN is the process no-Stage-9 note, and
`check-claims`'s three warnings are correctly attributed to CPD register rows, not this slug. Run 1 was
dinged for reporting "0 failing" while page-relevant WARNs went unread; this run quotes and triages them.

**Stage 5 and Stage 6 artefacts exist and are substantive.** `05-components.md` is a real brief-to-section
map (both directions), and it records the component prop contracts and six named deviations from the
briefs. `06-image-prompts.md` gives a paste-ready prompt, filename, ratio and ≥80-char en-AU alt for each
of the two FPO slots. Both were missing on run 1 and both were called out as the reason a section can
vanish undetected. Their presence here is why `check-pipeline` could assert section parity at all.

## What didn't

**1 · The first Stage-7 pass certified GREEN without running the three skill-audits it is required to
run.** 07 §7b is explicit: readability-audit, final-check and ai-detector were "added after the initial
Stage 7 subagent, which had omitted them." A verification that omits three of its mandated checks and
still returns GREEN is not a pass; it is run 1's self-certification failure in a milder form. It was
caught and remedied, but only because someone noticed the omission, not because the gate enforced it.

**2 · The audits, once run, found a real page-specific defect that had shipped into the first build.**
The ASQA location-2 `Note` rendered full-width — 1273px at 15px, ≈135 characters per line, roughly double
the readable measure. It was wrapped in `<div class="measure">` (now ≈64 CPL) and rebuilt. That is a
genuine post-"done" fix: the first Stage 7 said GREEN, the page had a measurable readability defect, and
it took a second pass to find it. Charged to gate 2 as one manual fix pass.

**3 · A shared-component alt text shipped a factually wrong line into `dist/`.** Warwick Smith's portrait
alt reads "independent compliance and currency reviewer **for the ABE owner builder course**" on a White
Card page. 07 spotted it and waved it through as a "minor copy nit". It is minor, and it is not an
authority or alt-length defect, but it is a false statement about what was reviewed, sitting in the final
build unfixed. The alt-length guard (≥80 chars) passed and the semantic error rode straight through it.

**4 · The archetype-2 ASQA branch under-renders the core trust section, and this run was the first to
find out.** 05 deviation 1 (FRICTION, logged): `CourseLayout` auto-renders the `rto-partner`
PartnerDisclosure card with no H2, capsule or sources, so the archetype's strongest move — the "check us
on training.gov.au, we'd rather you did" trust copy — had to be authored as a *separate* `#real` section.
The run handled it well and recorded the split, but the layout branch for archetype 2's defining section
had never been exercised before and does not carry what the archetype says that section must carry.

**5 · Required frontmatter fields are owner-builder-shaped and meaningless here.** 05 deviation 2:
`becomeSteps` is required by the course schema but is an owner-builder concept with no archetype-2
meaning, set `[]` and unused; the lodgement flow had to be mapped onto the generic `howItWorksSteps`. A
required field that every non-owner-builder page must stub empty is schema debt.

## Demand list
What was painful, as evidence for structural decisions.

- **Stage 7 must enumerate the three skill-audits as required rows and fail GREEN if any is absent.** The
  first subagent skipped readability, final-check and ai-detector and still certified. The audits are not
  optional colour; one of them found the only page-specific defect in the build. The checklist should
  make their omission a hard FAIL, not something a human notices afterwards.
- **The archetype-2 ASQA branch needs a real core-section path, or the skill must prescribe the split.**
  The layout's `rto-partner` card cannot carry an H2/capsule/sources, so archetype 2's most important
  section is only rendered if the author knows to hand-build a second `#real` section. This branch was
  unexercised until now; it should either render the trust section properly or the skill should document
  the split as the required pattern rather than leaving it to be rediscovered.
- **`CPCCWHS1001` lives in three repo docs while only the register is right — grep for it and fail the
  build.** `abe-new-site-sitemap.md:36`, the `content.config.ts:37` comment and the archetype worked copy
  all carry the superseded code. This run dodged the landmine by trusting the register; the next run that
  trusts any of those three docs ships a superseded unit code on a nationally-recognised page. A repo-wide
  check for `CPCCWHS1001` outside `Archive` would convert a per-run act of vigilance into a gate.
- **The check-pipeline capsule format contract is undocumented and load-bearing.** Stage 4 had to write
  capsules in the exact `**Answer capsule**` + blockquote shape that `check-pipeline.mjs` diffs against
  the built page, and that contract lives only in the script. Put it in the skill or 05, the same argument
  that put component prop contracts into 05 after run 1.
- **`becomeSteps` should be optional in the course schema.** Every archetype-2 page must stub it `[]`; a
  required field with no meaning outside owner builder is schema debt that each run pays again.

## Compare to run 1 (cpd-building-tas, Amber)
Run 1's four headline failures, each judged against this run:

1. **Self-certification didn't work (Stage 7 ticked 5 rows the HTML failed) → FIXED.** I re-measured the
   capsule word counts, marker sequence and schema nodes in `dist/`; every one matches 07's reported
   value. 07 reports measured values, not intent.
2. **Checks fired warnings nobody read → FIXED.** 07 has a verbatim per-slug WARN/FAIL block that quotes
   and triages each; the only FAIL is the self-referential missing-07, and the CPD warnings are correctly
   attributed elsewhere.
3. **Page invisible to its own guardrails (no declared authority) → FIXED.** `data-authority=
   "asqa-accredited"` is present, so the authority and JSON-LD checks fire. Mistakes-log #10's guard held.
4. **05/06 artefacts missing → FIXED.** Both exist and are substantive; `check-pipeline` could assert
   section parity because 05 is a real map.

What did *not* fully clear: the deeper theme under run 1's #1 — **a verification that does not verify what
it claims.** It recurred in a smaller, contained form (the first Stage-7 subagent skipped its three
audits and still said GREEN), and it was caught and fixed inside the pipeline rather than at grading. That
is progress, not resolution, and it is why gate 2 is Amber rather than Green.

## Output — every Amber or Red needs at least one
- [x] Fix applied — none by this grader; the review is the artefact. Items below are specs.
- [ ] Memory written
- [x] Skill-change spec for the improvement pass (below)
- [x] `kb/mistakes-log.md` entry to increment (below)

**Skill-change spec.**
- Stage 7's checklist lists readability-audit, final-check and ai-detector as required rows; a Stage-7
  report missing any of the three is a FAIL, not a GREEN. The audits run before the verdict, not after it.
- Add a repo-wide `CPCCWHS1001`-outside-Archive check to the build, so a superseded unit code in any doc
  fails loudly rather than waiting for a run to trust the wrong file.
- Archetype 2: either the ASQA/PartnerDisclosure layout branch renders the core trust section with its
  H2/capsule/sources, or the skill documents the mandatory `#real` + `#rto-partner` split so it is a
  prescribed pattern, not a per-run rediscovery.
- Document the `check-pipeline.mjs` capsule format contract in the skill (or 05), and make `becomeSteps`
  optional in the course schema.

**`kb/mistakes-log.md`.** Increment #1 ("Documentation describing the build drifted from the code")
last-seen to 2026-07-23 as a *near-miss*: three repo docs (`sitemap:36`, `content.config.ts:37` comment,
archetype worked copy) carry the superseded `CPCCWHS1001` while only the register is right; this run
trusted the register, but the drift remains live for the next run. Consider a new entry: *"A required
verification step was skipped and the gate still returned GREEN — the first Stage-7 subagent omitted its
three mandated skill-audits, and a page-specific readability defect survived into the first build until
they were run."* Guard: a verification names every check it is required to run and cannot pass with any of
them unrun; absence of a check is a FAIL, not a silent skip.

## Grader note
Graded independently from the seven pipeline artefacts, `dist/white-card-tas/index.html`,
`white-card-tas.mdx`, `faqs-white-card-tas.ts`, and direct greps/word-counts of the built HTML
(CPCCWHS1001=0, CPCWHS1001=22, `data-authority`, `recognizedBy`, `credentialCategory`, `offers.price`,
Certificate-of-Completion=0, marker sequence, all eight capsule word counts, em-dash placement). No
account of the run from the agent that did it.

`turns_to_passed_audit` is left empty: the artefacts carry no turn count and an independent grader has no
transcript; a filled number would be invented. `manual_fix_passes` is **1** — the ASQA-Note readability
fix and rebuild that followed the first Stage-7 GREEN, once the omitted audits were run.
`gate_fails_after_handoff` is **0**: I re-checked every load-bearing correct-and-safe and structural item
in the final `dist/` and each passes; the one readability defect was found and fixed before deploy, and
the Warwick alt-text error is a content nit no gate tests, not a gate failure.
