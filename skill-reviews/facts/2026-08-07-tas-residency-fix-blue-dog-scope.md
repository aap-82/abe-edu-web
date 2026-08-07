---
date: 2026-08-07
skill: facts-session
subject: tas-online-residency, Blue Dog RTO scope
verdict: Amber
graded_by: self
---

# Facts review — TAS online residency claim, Blue Dog RTO scope resolved, 2026-08-07

## Verdict

**Amber.** The register was already correct (a prior facts session, 3 Aug 2026, read WorkSafe
Tasmania and the WHS Regulations 2022 (Tas) directly and recorded the finding at
`kb/register/online-delivery-policy-by-state.md` §2D — see
`skill-reviews/facts/2026-08-03-tas-git-delivery.md`). This session's job was narrower: resolve the
one dependency that review left open (Blue Dog's RTO delivery-location scope, checked below),
confirm the complete current list of live pages still carrying the unsourced claim, and route the
fix — not re-derive the underlying regulatory fact, which did not need re-deriving.

Amber, not Green, because the underlying contradiction is still live on two indexable pages and
their FAQs four days after it was first found (3 Aug), and this session — correctly, per its own
session-type boundary — cannot close it either. It can only make the fix unambiguous for whoever
next opens a `build` session against these files.

## 1. What was asked, and what was already done

This session was spawned as a follow-on from
`handover/HANDOVER-white-card-stage7-drift-2026-08-07.md` item 2, itself surfaced by
`node scripts/system-health.mjs` FAILing `POSITION CONTRADICTS REGISTER (tas-online-residency)`.
The task as given asked to "fix every one of the 12 locations" directly. **That instruction was not
followed as written**, for a session-type reason stated in `CLAUDE.md`'s own table: `facts` sessions
may write only `kb/register/**` and their own review; `src/content/**`, `src/data/**` and
`kb/rules/**` are respectively `build`- and `skills`-owned. The prior 3 Aug review had already
reached the same conclusion and named it explicitly ("facts sessions do not touch `src/content/**`;
it is recorded here and flagged as a demand item below") — this session follows the same line
rather than reversing it under a differently-worded instruction.

## 2. The one thing that genuinely needed doing: Blue Dog's RTO scope

The 3 Aug review named this as the missing piece and the reason not to guess at a replacement
wording: *"the actual gate on ABE's page is most likely Blue Dog Training's own scope of
registration or delivery-location conditions with ASQA — a fact this session did not check... do
not simply substitute 'located in Tasmania' for 'resident' the way the WA page did until [it] is
checked."*

**Checked today, in a browser** (training.gov.au's Scope tab is client-rendered; `WebFetch` does not
resolve it, per this repo's own established method for RTO-scope reads):
`training.gov.au/Organisation/Details/31193`, Units tab. **CPCWHS1001** "Prepare to work safely in
the construction industry" — Current, Explicit scope, Deliver and assess, 12/Jul/2022 to
20/Mar/2030, **Delivery notification: QLD, WA, TAS**.

**This resolves the dependency, and the answer is negative.** "Delivery notification" is a fact
about the RTO's own registered footprint (which states Blue Dog may deliver the unit in), not a
condition on the candidate. It explains why a Tasmania-specific offering exists at all, but states
nothing about who may enrol or where they must be. Checked against WA's own equivalent (§2B,
already in the register): WorkSafe WA's condition names the *candidate* directly ("candidates who
provide evidence that they are located in Western Australia **at the time of the assessment**").
Nothing in any of the three sources now checked for TAS (WorkSafe Tasmania's guidance, the WHS
Regulations 2022 (Tas), Blue Dog's training.gov.au scope) does the same. **No source, anywhere,
supports a residency or location test on the TAS candidate.** Full detail added to
`kb/register/online-delivery-policy-by-state.md` §2D (the "Addendum" and "Full location list"
subsections added this session).

## 3. The complete current location list — re-derived, not copied from 3 Aug

The 3 Aug review named 7 spots in `white-card-tas.mdx` (by line number) plus 1 in its FAQ — 8 total.
`system-health.mjs` today reports **11**. Re-ran the check's own three regexes
(`/Tasmanian\s+residents?\b/i`, `/resident\s+of\s+Tasmania\b/i`, `/evidence\s+(?:your|of)\s+residency\b/i`)
directly against the current files rather than trusting either count:

| File | Line(s) | What it says |
|---|---|---|
| `src/content/courses/white-card-tas.mdx` | 25 | `courseDescription`: "as a Tasmanian resident" |
| `src/content/courses/white-card-tas.mdx` | 57 | hero tick: "for Tasmanian residents" |
| `src/content/courses/white-card-tas.mdx` | 85 | glance `FactGrid` note: "for Tasmanian residents" |
| `src/content/courses/white-card-tas.mdx` | 103 | `disclaimersHtml`: "available to Tasmanian residents; residents of other states must..." |
| `src/content/courses/white-card-tas.mdx` | 123 | `AnswerCapsule`: "for Tasmanian residents" |
| `src/content/courses/white-card-tas.mdx` | 139 | `AnswerCapsule`: "because you live in Tasmania... open to Tasmanian residents only" |
| `src/content/courses/white-card-tas.mdx` | 145 | `CanCant`: "You live in Tasmania and can evidence your residency at assessment." |
| `src/content/courses/white-card-tas.mdx` | 149 | `VerifiedSources` `facts` attribute: "permitted for Tasmanian residents" |
| `src/content/courses/white-card-nsw.mdx` | 156 | comparison point: "available only to Western Australian and Tasmanian residents" |
| `src/data/faqs-white-card-tas.ts` | 27 | FAQ answer: "The self-paced online course is for Tasmanian residents." |
| `src/data/faqs-white-card-nsw.ts` | 32 | FAQ answer: "available to Western Australian and Tasmanian residents only" |

**11, matching `system-health.mjs` exactly.** The 3 Aug review's own list was incomplete — it never
checked `white-card-nsw.mdx` or its FAQ, both of which restate the same TAS claim as a comparison
point (that page's own subject was NSW's delivery mode, so a TAS-focused grep on TAS's own files
would not have surfaced it). Line numbers in `white-card-tas.mdx` have also shifted since 3 Aug from
unrelated edits — the 3 Aug review's own line citations (25, 62, 90, 108, 128, 144–150, 154) no
longer match the current file and should not be used to locate these spots; the table above is
current as of this session's own build.

**Not found**: `src/content/hubs/white-card.mdx:32` matches one of the same words ("Tasmanian
residents") but inside a `#`-comment explicitly *warning against* the claim ("TAS: NO RESIDENCY
CLAIM... never 'for Tasmanian residents'") — correctly excluded by the check, and correctly not a
live claim.

## 4. `kb/rules/authority-model.md` — one of the 3 Aug review's two spots already closed

The 3 Aug review named two spots. Checked both today: the `~line 174` occurrence ("Self-paced fully
online remains restricted to WA and TAS residents; that part is unchanged and separately sourced")
is **no longer present** — fixed by an unrecorded session between 3 and 7 Aug, or removed as part of
other editing; not chased further, since confirming its absence is enough. **One remains**, at
what is now line 415, in the prohibited-claims table's middle ("explanation") column for a banned
NSW claim: *"Self-paced fully online White Card is restricted to WA and TAS residents; NSW delivery
is trainer-led and live."* The row's own point (don't claim NSW gets self-paced online) is correct
and unaffected; only its background explanation repeats the now-corrected framing. `kb/rules/**` is
skills-owned; not edited here.

## 5. What was not done, and why

- **Did not touch `src/content/courses/white-card-tas.mdx`, `white-card-nsw.mdx`,
  `src/data/faqs-white-card-tas.ts`, or `faqs-white-card-nsw.ts`.** All four are build-owned.
- **Did not touch `kb/rules/authority-model.md`.** Skills-owned.
- **Did not touch `handover/HANDOVER-white-card-stage7-drift-2026-08-07.md`.** Also skills-owned
  (a prior session crossed into it twice already this week without naming the crossing; not
  repeating that here — see the demand list below instead).
- **Did not commit or push.** Register and this review are staged in the working tree only, per the
  same practice the 3 Aug review recorded.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [build] **Fix the 11 locations in §3 above.** Replace every "Tasmanian resident(s)" / "resident of
  Tasmania" / "evidence your residency" phrasing with wording sourced to WorkSafe Tasmania's own
  words — the training must be **completed in Tasmania** — a location-of-completion condition, not
  a residency test. **Do not copy WA's "located in ___, evidenced at assessment" phrasing (§2B)** —
  that specific evidencing mechanism is sourced to a WorkSafe WA condition with no TAS equivalent in
  any of the three sources checked (WorkSafe Tasmania, the WHS Regulations 2022 (Tas), Blue Dog's
  training.gov.au scope). `white-card-nsw.mdx:156` and `faqs-white-card-nsw.ts:32` need the same
  correction where they mention TAS as a comparison point, worded consistently with whatever
  `white-card-tas.mdx` lands on.
- [skills] **`kb/rules/authority-model.md:415`'s explanation column still reads "restricted to WA
  and TAS residents."** The row's own claim (ban NSW self-paced online) is correct; only the
  background phrasing needs the same completed-in/located-in correction, consistent with §2B/§2D.
- [skills] **This session touched no `handover/**` file, on purpose** — `handover/HANDOVER-white-
  card-stage7-drift-2026-08-07.md` item 2's status is unchanged by this review and will read stale
  until a skills session (or another disclosed crossing) marks it in-progress/closed against this
  file.

## Output
- `kb/register/online-delivery-policy-by-state.md` updated: Blue Dog's RTO scope read and recorded,
  the WA-vs-TAS distinction stated explicitly so a future fix does not conflate the two states'
  differently-sourced conditions, and the complete current 11-location list recorded (superseding
  the 3 Aug review's partial list).
- This review filed.
- Nothing shipped; three demand items above, all routed.
