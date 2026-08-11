---
date: 2026-08-12
skill: skills-session
subject: Stage 7 gains a design-register gate and a summary-vs-detail reading
verdict: Green
graded_by: self
---

# Skills review — two Stage 7 reading steps, 2026-08-12

## Verdict

**Green.** Both items shipped as *reading steps a person performs*, not as scripts, because neither
failure is mechanisable. The more useful finding was not either item: it was that Stage 7's own
opening line had been **instructing** the first failure for weeks.

## Pre-flight

`node scripts/system-health.mjs` — **0 failing**, 40 warning, 70 ok.

## What shipped

| Change | File | Was |
|---|---|---|
| §2a, a mandatory design-register gate before filing any design-owned finding | `references/verification.md` | absent |
| §2's opening line rewritten | `references/verification.md` | "where a token or layout differs, **that is a finding**, not a precedent" |
| §3 check 1 expanded: read summary furniture against the data it summarises | `references/verification.md` | one line, "no conflicting facts, dates, names, or claims" |
| Hard-blocker for a regulatory claim its own detail contradicts or narrows | `references/verification.md` | 10 blockers |
| Checks 4 and 5 mirrored into the Stage 7 summary | `SKILL.md` §7 | "**Three** checks that exist because they were missed" |

Measured:

| | Before | After |
|---|---|---|
| `verification.md` | 194 lines | **258** |
| Hard-blockers | 10 | **11** |
| `SKILL.md` §7 checks | 3 | **5** |
| Demand items closed | — | **3** (two filings of item 4, one filed today) |
| `demand-split --strict` | — | **0 unrouted, 0 malformed, exit 0**, 118 closed |

## The actual finding: the checklist was teaching the mistake

Item 4 had been filed three times and read, each time, as "Stage 7 is missing a step". It was missing
a step. It was also **actively instructing the failure**, in the first line a run reads before scoring
the readability audit:

> Score against these; where a token or layout differs, that is a finding, not a precedent.

The intent was "a divergence is not licence to keep diverging". Read cold by a run about to file, it
says: token differs → file it. The caveat that walks it back ("they will flag register/token
differences that are **not** defects here") sits **50 lines further down**, after the whole bullet list
and two long script-bug notes. Three runs did exactly what the opening line said, and all three were
then criticised for it.

This is the rule-vs-worked-example shape again — the fourth time in this repo that a documented rule
kept getting breached because *the guidance itself taught the breach*. Adding a step without touching
that line would have left the instruction and the prohibition sitting 50 lines apart, which is how it
got to a third sighting. **When adding a rule against a repeated behaviour, grep the guidance for
something that asks for it first.**

## Why neither shipped as a script

Both were tempting to mechanise and both would have been wrong to.

**The register gate** is a `grep` a person runs and then *judges*: the register may be silent, may be
settled, or may be settled and wrong — and the third case is a `[design]` item disagreeing with a named
review, not a Stage 7 finding, because rule 7 makes register changes an exclusive session's work. A
script can find the token; it cannot make that call.

**The summary-vs-detail read** cannot be scripted at all with anything here. Nothing compares two prose
statements on one page for agreement. `/owner-builder-insurance` proved it on 10 Aug: 26/26 guardrails,
`check-claims`, `check-links` and `check-reflow` all passed **the wrong version and the right one
identically**, because both sentences were individually well-formed, correctly scoped in tone, and
carried no banned CTA or authority keyword.

So §3 check 1 now carries the forcing move that actually found it, which costs nothing: **restate the
page's central claim in one sentence, as if writing the link description another page would use, then
go and find the row that proves it.** That is literally how the defect surfaced — by cross-linking the
page from the owner builder hub and having to summarise its claim in a `ResourceLink` `desc`.

## A defect I introduced, in the section warning about it

The first draft of §2a opened "It has cost **four** runs the identical mistake" while its own table two
lines below said "**three** times in four days". A summary statement contradicting the detail directly
beneath it — the exact defect §3 check 1 now exists to catch, committed inside the change that adds it.

Caught by re-reading my own numbers against the source reviews before committing, which is the check
working, but it is worth recording that the author of a rule is not exempt from it and did not notice
while writing. Corrected to "three runs ... inside four days", verified consistent in both places.

## Gates

| Check | Result |
|---|---|
| `check-claims` | 0 failing; SYSTEM.md §5 still names all 12 checks |
| `system-health` | **0 failing**, 40 warning, 70 ok |
| `demand-split --strict` | 0 unrouted, 0 malformed, **exit 0** |
| Numbers in new prose re-read against source reviews | 1 contradiction found and fixed |

No build or component change, so no build/reflow gate applies — this session touched documentation
only.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [skills] **Three git worktrees hold stale copies of the skill files.**
  `.claude/worktrees/abe-course-page-astro-audit-ac4c80` and `.claude/worktrees/jovial-raman-b8212c`
  both carry a **191-line** `references/verification.md` against main's 258 — older even than the
  194-line version this session started from, so they are stale by more than today's edit. A fourth
  worktree sits in the scratchpad on `skills/close-fixed-and-two-guards`. A run started in one gets
  pre-12-Aug Stage 7 guidance with none of the checks above, and nothing warns it. Not removed here:
  worktree cleanup is its own decision, and on Windows a live node PID can hold the folder open. Worth
  deciding whether they are still wanted, and if so whether the skill should assert it is running from
  the repo root.
- [skills] **`SKILL.md` §7 and `references/verification.md` have now drifted apart twice** — the file
  itself records the 28 Jul 2026 fix ("Matches SKILL.md stage 7 (e); the two were out of step until
  28 Jul 2026"), and this session had to hand-mirror two checks and a count between them. Second
  occurrence, so ROADMAP rule 3's trigger is met. The cheap version is not a script but a single line
  in each file naming the other as its mirror, so the next editor knows before rather than after.
- [design] Unchanged and still open from 11 Aug: `.faq summary` is the only remaining holder of the
  undocumented Archivo 600 18px (`global.css:1000`). Either/or with `.mr-title` now at 22px; adding an
  18px step to DESIGN.md §3 is a register change and therefore an exclusive session (rule 7).

## Grader note

`graded_by: self` — there is no fresh-subagent skills grader (rule 10). Mitigated by every figure being
a count taken from the files after the edit rather than an intent, by the demand-item closures being
verified through `demand-split --strict` rather than asserted, and by the one contradiction I
introduced being recorded above rather than quietly fixed.
