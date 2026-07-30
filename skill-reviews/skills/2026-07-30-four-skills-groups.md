---
date: 2026-07-30
skill: skills-session
subject: four-skills-groups
verdict: Green
graded_by: self
---

# Skills review — four groups off the skills list, 2026-07-30

## Verdict

**Green.** Ten item instances closed across four groups, and the skills destination has its **first
closures ever**: 61 open → **52 open · 10 closed**. Two of the four groups needed no code at all — one
was already fixed, one was a documentation gap wearing a defect's clothes.

## 1 · `becomeSteps` — already fixed, closed not re-fixed

Both filings asked for `becomeSteps` to be optional. `src/content.config.ts:166` already reads
`z.array(step).optional()`, shipped earlier in the day. Verified before closing rather than assumed.

The two `[]` stubs remain in `white-card-tas.mdx:102` and `white-card-wa.mdx:128`. Harmless now the
field is optional, and removing them is `src/content/**` — already filed as a separate `[build]` item,
left there rather than crossed into.

## 2 · Archetype 2's core section — prescribed, not re-architected

The real finding of the four. `CourseLayout` renders `#rto-partner` automatically from `partnerRto`,
but that block is a **`PartnerDisclosure` card**: no H2, no answer capsule, no sources, because it is a
*disclosure*. So archetype 2's defining question — *is this qualification real, and who stands behind
it* — is answered by no section unless the author hand-builds a separate `#real`.

Both live pages do exactly that and it works. What was missing was any statement that it is required:
`grep -i "rto-partner|#real|split"` on the archetype file returned **zero matches**, which is why it
was filed twice, verbatim, by two runs.

Both filings offered "render it properly **or** prescribe the split". **Prescribed**, in
`references/archetypes/02-nationally-recognised-course.md` §3, with the working MDX shape from the live
pages, why both parts are required and not redundant, and why not to make `#rto-partner` carry the H2
instead — it renders in two placements on pages whose heading order differs, and the split is what lets
the disclosure sit high for compliance while the section sits where the reader asks the question.

Re-architecting the layout would have been the larger, riskier answer to a problem whose evidence is
that two pages already solved it. Evidence before structure.

**Worth noting what no check would have caught:** a page with only the disclosure has no section on its
own core claim, and `check-pipeline` stays green, because the brief and the page agree — the section was
never briefed. That is recorded in the archetype text.

## 3 · Two stale pipeline artefacts — pointers, not deletions

`05-components.md` carried the `VerifiedSources` joiner rule that has since moved **into the component**
(a render-time regex an author cannot get wrong). `06-image-prompts.md` carried an open `[design]`
question about decorative maroon in three places, which `design/2026-07-29-maroon-in-illustration.md`
answered by admitting line-art illustration as a maroon role in DESIGN.md.

Each file now opens with a dated pointer at the decision that closed it. **The original text is kept.**
Deleting it would destroy the run's record of the question being raised, which is the `CPCCWHS1001`
lesson — eleven mentions were deliberately left in place there for exactly this reason, because the
records are what make a status knowable.

`pipeline/**` is normally build's. The filing item nominated "a build **or skills** session", which is
the filing session's own routing call, and the run is complete rather than live. Noted rather than
assumed.

## 4 · `audit_render.py` — two traps that produce confident false FAILs

Both documented in `references/verification.md`, where Stage 7 will meet them before running the script:

1. **Pass it an HTTP URL.** It defaults a bare path to `file://`, and this site's stylesheet is a
   root-absolute `/_astro/…` href, which over `file://` never loads. It then measures an **unstyled**
   page and reports 158 CPL, white-on-white text and `btn-primary` at 185×17px — all artefacts, all
   entirely plausible. The `npm run build` → `py -m http.server` → URL sequence is written out.
2. **It resolves background from the immediate parent only**, so any text on a `bg-dark` section reports
   **1:1**. On `/white-card-wa` it called `p.capsule.on-dark` 1:1 where the real ratio is about 15:1.
   A 1:1 on visibly legible text is the signature of this bug, not of a defect.

**And a third item corrected rather than closed.** An earlier filing said the scripts "cannot run here:
no Python on the machine". That is **false** — `python` and `python3` hit the Microsoft Store shim, but
**`py` is Python 3.14 with playwright installed**. That item had been standing since 28 July telling
future runs not to bother. Struck with the correction, and the `py` invocation is now in
`verification.md`.

## Measured

| | Before | After |
|---|---|---|
| Skills handover | **61 open · 0 closed** | **52 open · 10 closed** |
| Groups on the skills list | 4 | **0** |
| Archetype 02 mentions of the split | 0 | prescribed in §3 |
| `audit_render.py` traps documented | 0 | 2, plus the `py` fix |
| Skill references | 83/83 | 83/83 |

`check-claims` 0/0/11 · build green at 20 pages · `demand-split --strict` exit 0 · `system-health`
0 failing.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- ~~[build] The two `becomeSteps: []` stubs can go now the field is optional
  (`white-card-tas.mdx:102`, `white-card-wa.mdx:128`). Carried, not new.~~ fixed in the 30 Jul 2026
  build session, together with the older filing of the same item in
  `2026-07-29-system-audit.md`.
- [skills] Archetype 2's two-part trust section is now prescribed but nothing enforces it. A page with
  `partnerRto` and no `#real`-shaped section passes every gate, because the missing section was never
  briefed so brief-to-page conformance agrees. Mechanically detectable: an `asqa-accredited` page whose
  section set contains no capsule answering the "is this real" question. First filing.
- [skills] Three of these four groups were documentation gaps, not code defects, and each was filed
  twice as though it were a defect. That is not waste — the second filing is what made them visible —
  but it suggests a demand item could usefully say whether the fix is expected to be code or a rule.

## Output
- [x] **Fix applied** — archetype 02 prescribes the split; `verification.md` carries both
  `audit_render.py` traps and the `py` invocation; two pipeline artefacts carry dated pointers;
  10 item instances closed.
- [x] **`kb/mistakes-log.md`** — not incremented. The `py` correction is the only new lesson and it is
  a machine fact, not a repeat risk; it belongs in `verification.md`, where it now is.
- [ ] **Memory written** — not needed; all four resolutions live in files a run reads.

## Grader note

`graded_by: self`. Reproducible: the handover header counts, and `grep -i "rto-partner" ` on the
archetype file before and after. The judgement call worth challenging is §2 — I prescribed the split
rather than fixing the layout, and the counter-argument is that a documented trap is still a trap a
future run can walk into, where a layout that rendered the section properly could not be got wrong. My
answer is that two pages already implement the split correctly and the layout change would touch every
archetype-2 page's heading order, which is a larger risk than the one being removed.
