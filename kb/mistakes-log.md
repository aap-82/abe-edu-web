# Mistakes log — repeat risks

Read at pre-flight. Written at Stage 9 whenever a run scores Amber or Red.
**Increment "times seen" on an existing entry; never duplicate one.**
An entry not seen in ten consecutive runs moves to Archive, counter intact, revivable.

| # | Risk | Times seen | Last seen | Guard |
|---|---|---|---|---|
| 1 | Documentation describing the build drifted from the code and was trusted over it | 3 | 2026-07-21 | Read `content.config.ts` / `guardrails.ts` before asserting build behaviour |
| 2 | Worked examples existed for one archetype only, so every page inherited that shape | 1 | 2026-07-21 | Each archetype file carries its own worked copy (section 8) |
| 3 | Skill referenced files that were never installed (`assets/`), so stages ran without exemplars | 1 | 2026-07-21 | Repo-first: references resolve by path, or they do not exist |
| 4 | A commercial arrangement was recorded as settled fact across the reference set on one confirmation, then reconciled site-wide — so an unsigned partnership read as live in ~8 files | 1 | 2026-07-22 | A partner arrangement is a **dated status**, not a fact: name who confirmed it and when, keep one canonical owner (`authority-model.md`), and have every other file point at it rather than restate it |
| 5 | An RTO was named as delivering units it does not hold on scope — registration was checked, scope was not | 1 | 2026-07-22 | Being a current RTO is not evidence it can deliver *your* units. Open `training.gov.au/Organisation/Details/{rto}` **in a browser** (WebFetch cannot — client-rendered SPA) and confirm every unit code is listed, before any "nationally recognised" claim |
| 6 | Two pages disagreed on an ABE price, and the disagreement was "resolved" by editing one to match the other without asking which was right — twice, in opposite directions | 2 | 2026-07-23 | A price is an internal fact, so **ask**; do not infer the correct value from whichever page looks more authoritative. A green build proves the two now agree, not that they agree on the right number |
| 7 | A figure quoted inside a comment or an anecdote was scanned as a live page figure | 1 | 2026-07-23 | `check-claims` reads comment text. Never write a price into a comment, a changelog line or a worked example in a file that a run reads — describe it instead |
| 8 | A control token written into prose was obeyed as a control token — a commit message *describing* the CI skip marker skipped CI for the whole PR | 1 | 2026-07-23 | Same family as #7, and the general rule: anything a machine scans for, do not quote. Skip markers, `[confirm: ...]`, `$` figures. Describe them in words, or the description becomes the instruction |

## Archive
_(none yet)_
