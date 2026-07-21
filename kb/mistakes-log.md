# Mistakes log — repeat risks

Read at pre-flight. Written at Stage 9 whenever a run scores Amber or Red.
**Increment "times seen" on an existing entry; never duplicate one.**
An entry not seen in ten consecutive runs moves to Archive, counter intact, revivable.

| # | Risk | Times seen | Last seen | Guard |
|---|---|---|---|---|
| 1 | Documentation describing the build drifted from the code and was trusted over it | 3 | 2026-07-21 | Read `content.config.ts` / `guardrails.ts` before asserting build behaviour |
| 2 | Worked examples existed for one archetype only, so every page inherited that shape | 1 | 2026-07-21 | Each archetype file carries its own worked copy (section 8) |
| 3 | Skill referenced files that were never installed (`assets/`), so stages ran without exemplars | 1 | 2026-07-21 | Repo-first: references resolve by path, or they do not exist |

## Archive
_(none yet)_
