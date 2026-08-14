---
date: 2026-08-14
skill: skills-session
subject: closing a demand item made mandatory, the fifth path-ownership gap assigned, and a deliberately weak staleness prompt
verdict: Green
graded_by: self
---

# Skills review — the stale handover, and the fifth ownership gap, 2026-08-14

Self-graded; no fresh-subagent skills grader exists.

## Verdict

**Green.** Four items closed, and the one that mattered is fixed by a rule change rather than by the
tool I built alongside it — which is the honest ordering, because the tool turned out to be weak and
this review says so with a number.

## Pre-flight

`node scripts/system-health.mjs`: **0 failing**, 44 warning, 81 ok. Same at close. Governance-doc
references 207/207.

## 1. "May close" became "must close" — the primary fix

The failure, from this morning's facts session: the 1-3 Aug sessions read the TAS, ACT and QLD
delivery rows at their regulators, updated `kb/register/**`, and never struck the items in the 2 Aug
review that asked for exactly that work. Eleven days later `reports/handover-facts.md` still carried
**5 of 12 items already done**, including one that reads as a live compliance risk on an indexable
page. A session was ranked onto that list ahead of a page-blocking bundle item and the unbuilt
homepage.

**The rule already existed and was the wrong strength.** `CLAUDE.md` said a session *may* close an
item it has just fixed. Design and skills had grown the habit; facts never did, and nothing in rules
9/10/11 required it. It now says **MUST**, applies to every session type, names facts explicitly, and
carries this failure as its evidence — including the sentence that matters most: *a stale handover
does not merely waste a session, it misdirects prioritisation, and it does it while looking exactly
like good evidence.*

**I then followed it.** Three items in other sessions' reviews were closed by work done in the last
two days and were still open:

| Item | Filed | Closed by |
|---|---|---|
| `ci.yml` triggers on `pull_request` only | 12 Aug design review | yesterday's push trigger |
| `_comment_*` keys inside `assertions` | 12 Aug design review | yesterday's `_comment_tbt` move |
| `demand-split.mjs` has no staleness signal | **2 Aug** skills review | this session |

The third is the sharpest evidence for the rule: filed twelve days ago, asking in as many words to
"flag items whose named file has changed since filing as candidates for re-checking or closing" —
and its absence is what let this morning's misdirection happen. Two corrections were folded into the
first item's closure: the gate last ran **12 Aug**, not 1 Aug, and the CLS was not a regression the
gate missed but one the localhost gate structurally could not see.

## 2. The staleness prompt, and why it is deliberately quiet

`demand-split --stale` flags open items whose named file has been committed since the item was filed.

**It is weak, and the number is the point: 75 of 83 checkable items flagged on first run.** In a repo
that changes daily, "the file this item names has moved" is true of almost everything and therefore
says almost nothing. Shipping 75 lines of default output would have been noise dressed as a signal —
the `_comment_tbt` failure again, a permanent red that readers learn to skip past. So the default is
one summary line and the list is opt-in behind `--stale`.

It also cannot see the failure that motivated it. Of the five stale facts items, **one named a file
and four were prose** ("read the TAS delivery row at WorkSafe Tasmania" names nothing resolvable).
The tool reports its own coverage on every run — 83 checkable, 132 prose-only, 14 unresolvable — so a
clean run is never read as "nothing is stale". Same reasoning as `check-pipeline` reporting how many
pages it skipped.

Honest summary: it is a hunting aid for when you are already asking "is this still open?", not a
standing report. The rule is the fix.

**SUPERSEDED LATER THE SAME DAY — read section 6.** Everything above describes the first version and
is kept because the reasoning that made it weak is worth seeing. Andrey asked for the item to be
closed rather than parked, which forced the question "is there actually a sharper signal?", and there
was: scoring the item against the commit subjects that touched its file takes 75 down to 15 at ~75%
precision. The judgement "revisit only with a concrete idea" was right; the assumption that no
concrete idea existed was not tested before I wrote it.

## 3. Fifth path-ownership gap — and the default inverted

`PRODUCT.md` and `.impeccable/**` are assigned to **skills**. Both pass the test `CLAUDE.md` already
states: a wrong line risks the repo's own correctness, never the deployment.

The more useful change is what came with it. Four previous sessions each reasoned from scratch to the
same answer (`content.config.ts`, `SYSTEM.md`/`handover/**`, `public/**`/`launch.json`,
`guardrails.ts`/`.gitignore`), and a fifth doing it again is a pattern that should be stated rather
than re-derived. **An unassigned path now belongs to skills by default** unless it is content
(`build`), visual (`design`), a verified figure (`facts`), or on the deliberately-unassigned platform
list. That converts a recurring judgement call into a lookup.

## 4. `DEPLOYED_ORIGIN` written into the cutover runbook

Step **6b** of `new site/abe-migration-implementation-plan.md` §8.2, beside the existing
`workers_dev: false` step, with its verification: run the workflow manually and confirm the report
URLs name the production host. Miss it and the nightly passes green forever against a preview host
nobody visits while the real site goes unmeasured — a gate silently measuring the wrong thing, which
is the exact class the 13 Aug work existed to close. A reminder living only in a demand list is a
reminder nobody reads at cutover.

## 5. The mistakes-log row split by surface

Row 1 had reached **11 sightings** and had become a category rather than a failure: "documentation
drifted from the code" gives a reader nothing to check. Split into three rows by **surface**, because
each has a different guard and three of the surfaces now have mechanical checks while two cannot.

| Row | Surface | Sightings | Guard |
|---|---|---|---|
| **1** (kept) | a **description** of the work trusted instead of the work — commit message, verification tick, code comment | 4 | none possible; read the diff, read the code beside the comment |
| **27** (new) | a **standing or governance document** describing the build | 9 | `check-claims` §6, §7 and CLAIMS; governance-doc references; `check-design-register` |
| **28** (new) | a **derived report** describing a state that has moved | 1 | the must-close rule above, plus `--stale` |

**Nothing renumbered, nothing deleted.** Row 1 is cited in nine places, several by ordinal
("`#1`'s 4th sighting", "row 1, tenth sighting"), so it keeps its id and the full eleven-sighting
narrative is preserved verbatim in a new "Row 1 history" section, with a table mapping every sighting
to the row that now owns it. Table integrity checked: 28 rows, all five cells, no stray pipes in the
preserved prose.

**Why row 1 kept the unguardable surface** rather than the biggest one: it is the only surface where
no check is possible even in principle, so it is the one that most needs a human to remember it. The
guarded surfaces are better served by naming their checks, which row 27 does.

Three sightings were added in the same pass, which is the argument for splitting rather than
archiving — the counters move again. Two are today's code comments (`global.css`'s hero-CLS block
describing a fixed defect as an open race, `ModuleRows.astro` asserting "Open takes NO tint" against
its own CSS) and one is the derived-handover failure.

The 7th sighting is the one that justifies the whole exercise: `DESIGN.md` carrying a stale hex in
July, and on 13 Aug the same surface produced **six** wrong values including `--ground`. A row saying
"documentation drifted" gave nobody a reason to check that surface. `check-design-register` does.

## 6. The staleness prompt sharpened from useless to usable

The earlier version flagged **75 of 83** and was a prompt in name only. It now scores each candidate
against the subjects of the commits that touched its named file since filing, and reports only those
sharing **2 or more distinctive words**. That is 75 → **15**, and on its first sharpened run it found
a real one immediately: `check-links.mjs`'s stale `/white-card` `PLANNED` entry, filed **twice** on
4 Aug, fixed 7 Aug in a session dedicated to it, and left open for a further seven days. Both are now
struck, verified first — `/white-card` is genuinely gone from the map.

**I measured the wrong population first, and that is the part worth recording.** A scratch experiment
over raw single review lines gave a clean cliff (32 at 0 shared words, 32 at 1, 4 above) and I nearly
shipped the threshold on it. The implementation scored 17, not 4, because `joinWrapped` merges an
item's continuation lines — real entries are several times longer than the lines I sampled, so they
carry many more words. Re-measured on the actual bucket entries: **0:17, 1:20, 2:9, 3:6, 4:2**. No
cliff at all. The comment in the code now carries those numbers and not the experiment's, because a
threshold justified by a measurement of something else is the exact failure this session's other half
is about.

**Precision is roughly 75%, stated rather than implied.** The top eight were inspected: six genuine
closures, two coincidences (`CourseLayout.astro`'s hardcoded `courseMode` matching a commit that
merely shipped a White Card page). Raising the bar to 3 was tried and does not help — 8 candidates at
the same ~75%, losing recall for nothing. So the output says "check each and strike it if closed" and
never asserts closure.

## 7. `check-claims` §7 widened, and it caught a live drift on the first run

`CHECK_EXEMPT` meant "exempt from being named", so 7 of 20 scripts were excused rather than described.
It is now a **classification** — check or utility — and every script must appear in §5 either way.

**The demand item's premise turned out to be wrong**, and the check found something better than what
was filed. The utilities *were* documented: §5 has a paragraph giving each a one-line purpose. But it
opened "**Six** scripts in `scripts/` are not checks" while seven existed — `lhci-deployed-config`,
added the day before, described in the nightly paragraph and never added to the list. Naming was
satisfied and the sentence was still false.

So the check now also verifies the **stated count** against `CHECK_EXEMPT.size`. That is row 27's own
8th-sighting lesson applied to the check that lesson produced: *a claim about a set must constrain the
whole set, or it certifies its own staleness*. Membership was constrained; the count was not.
Falsified by reverting the word to "Six" — 1 failing — then restored.

## Verification

`system-health` 0 failing / **45** warning / 81 ok — one more than at pre-flight, and the increase is
the split working: a single vague 11x row became a 4x and a 9x row that each name a surface.
`check-claims` 0 failing, SYSTEM.md §5 `check-claims` 0 failing, SYSTEM.md §5
still names all 13 checks with 7 utilities exempt. Governance-doc references 207/207 resolve.
`demand-split` runs clean, routes 229 tagged items, 0 unrouted, and the new section prints one
summary line by default and 75 rows under `--stale`.

## Demand list

Tag every item: [skills] | [design] | [facts] | [build]

- ~~[skills] The staleness prompt flags **75 of 83** checkable items, which means it is barely
  discriminating. A sharper signal probably exists — commits that touch the named file *and* mention
  the item's subject, or a diff against the register's own "verified" dates — but it was not obvious
  in one session and a wrong heuristic here is worse than a blunt one, because a filter that quietly
  drops a live item is the failure this whole thread is about. Revisit only with a concrete idea, not
  on principle.~~ sharpened 14 Aug 2026 and the item is answered: scoring against the subjects of commits that touched the named file since filing takes 75 down to 15 at roughly 75% precision, and it found a real closure on its first run (check-links PLANNED, filed twice on 4 Aug, fixed 7 Aug, open ever since). The concrete idea this item asked for turned out to exist. Threshold measured on the tool own data after a first measurement of the wrong population; see section 6.
- ~~[skills] `check-claims` §7 exempts **7 of 20** scripts as "not a check". A third of the directory
  excused rather than documented. Worth deciding whether utilities want their own short paragraph in
  SYSTEM.md §5 so they are described somewhere, rather than only named in a list of things the rule
  does not apply to. Unchanged this session; noted twice now.~~ widened 14 Aug 2026. CHECK_EXEMPT is now a classification rather than an exemption from documentation, so every script must be named in §5 either way. The premise was wrong in a useful direction: the utilities were already described, but §5 said Six when there were seven, so the check now verifies the stated count too. See section 7.
- ~~[skills] The mistakes-log row "Documentation describing the build drifted from the code and was
  trusted over it" is at **11 sightings** and did not move this session despite two more instances
  (the `global.css` hero comment, the ModuleRows parity block). At 11 it no longer identifies a
  specific failure anyone can act on. Either split it by surface — prose, code comment, register
  cross-reference, derived report — or retire it in favour of the per-surface checks that now exist.~~ **split 14 Aug 2026, by surface, as this item proposed.** Row 1 keeps its id and the unguardable surface (a description of the work trusted instead of the work: commit message, verification tick, code comment) at 4 sightings. Row 27 takes standing/governance documents at 9, and names the five checks that now guard it. Row 28 takes derived reports at 1. Nothing renumbered, nothing deleted: row 1 is cited in nine places, several by ordinal, so the eleven-sighting narrative is preserved verbatim in a new "Row 1 history" section with a sighting-to-row map. `system-health` now reads 4x and 9x where it read 11x, which is one more warning and two actionable ones.
- [facts] Unchanged and still open: Blue Dog's scope of registration for CPCWHS1001, WorkSafe WA's
  "Terms and Conditions 2022" document, and the legal effect of training.gov.au's "Delivery
  notification" field. None blocks a published claim.
