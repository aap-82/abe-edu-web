---
date: 2026-08-07
skill: skills-session
subject: kb/rules/authority-model.md stale TAS residency explanation
verdict: Green
graded_by: self
---

# Skills review — authority-model.md's last stale TAS residency line, 2026-08-07

## Verdict

**Green.** One-line correction, confirmed as the only remaining occurrence in the file before
closing.

## What shipped

`kb/rules/authority-model.md:415`, a row in the prohibited-claims reference table, had its
explanation column rewritten from "Self-paced fully online White Card is restricted to WA and TAS
residents; NSW delivery is trainer-led and live" to "Self-paced fully online White Card is
permitted for candidates located in WA (evidenced at assessment) and for training completed in
Tasmania; NSW delivery is trainer-led and live." The row's own banned-claim and
correct-alternative columns were unchanged — only the background explanation was stale, and only
for the reason a facts session (`skill-reviews/facts/2026-08-07-tas-residency-fix-blue-dog-scope.md`)
found: no source supports a residency test for TAS, only a training-completion-location condition
(WorkSafe Tasmania's own words). WA's own condition is genuinely different — sourced to a
WorkSafe WA instrument that names the candidate directly and requires evidence at assessment — and
that distinction is now stated explicitly in the same sentence rather than flattened into one
"WA and TAS residents" phrase.

## Measured, not assumed

- **A second occurrence the same facts review named (~line 174, "Self-paced fully online remains
  restricted to WA and TAS residents; that part is unchanged and separately sourced") was checked
  first, not assumed fixed on the review's own say-so: confirmed absent.** Grepped the whole file
  for that phrase before touching anything — it had already been corrected by an earlier,
  unrecorded session between 3 and 7 Aug. Not chased further; confirming its absence was the task.
- **Full-file grep for `Tasmanian resident|TAS resident|resident of Tasmania` after the fix: zero
  matches.** Line 415 was the only remaining occurrence in the entire file, matching what the
  facts session's own review said to expect.

## What worked

Checking the ~174 claim before editing line 415, rather than editing 415 and reporting "both
fixed" on the strength of the facts review's own account. The review was right, but it was a
claim from a different session about this file's state days later — worth one grep to confirm
rather than carry forward unchecked, the same discipline `kb/mistakes-log.md` row 1 already names
for documentation-vs-code drift generally.

## What didn't

Nothing found. Correctly scoped, single-line fix.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [skills] none.

## Output
N/A — Green, nothing further to route.
