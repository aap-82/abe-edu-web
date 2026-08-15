---
date: 2026-08-15
skill: facts-session
subject: TAS and ACT owner-builder permit triggers — both recorded as dollar thresholds, neither is one
verdict: Amber
graded_by: self
reason_for_self_grade: There is no fresh-subagent facts grader (rule 11), and rule 4 forbids the
  obvious substitute — a second session cannot re-verify a figure without reading the source itself.
  Every reading below names the instrument, the URL, the page's own last-updated date, and quotes the
  sentence relied on.
---

# Facts review — TAS and ACT owner-builder triggers, 2026-08-15

## Verdict

**Amber.** Two long-open register questions are resolved, and the answer in both cases is that **the
question was malformed**: neither state gates the owner-builder step on a dollar figure. Amber, not
Green, because the reversal exposed a live page making a specific attribution this session could not
verify, and because the `$12,000`'s actual subject is still unknown — I removed a wrong claim without
being able to replace it with a right one.

## Why this session existed

Andrey asked for the Jordan gap from the `/owner-builder-courses` critique: *"the page never answers
'do I actually need this?' Only the QLD card names a trigger."* That is `build` work, and it was
blocked on `eligibility-by-state.md`'s TAS row reading `≈ $5,000 (⚠️ sources vary — verify with
CBOS)`. Pulling that thread found ACT unverified too, so the blocker was two figures, not one.

## The readings

### TAS — `cbos.tas.gov.au`, two pages, read in full in a real browser

**Instrument 1:** "Owner builder - restrictions, home projects and farmers",
`/topics/licensing-and-registration/licensed-occupations/owner-builder-permit/restrictions`,
**page's own last-updated: 04 Nov 2022**.

**Searched for and NOT found: any dollar figure. The page contains none.** What it contains instead:

> "An Owner Builder Permit will only be issued for work on a residential building (detached dwelling
> or a conjoined unit). Permission won't be issued for any work on commercial buildings."

The exemptions are stated by **size and kind**, never by value — "a shed, garage or carport up to 18m2,
or up to 36m2 if prefabricated", "a porch or veranda up to 9m2, or a deck up to 1m high", a temporary
swimming pool up to 9m2 on conditions, and "maintenance or repairs on a dwelling using similar
materials as those replaced". Class 7b farm sheds need no permit; over 200m² a building surveyor and a
Certificate of Likely Compliance are required.

**Instrument 2 (corroboration, because one page's silence is not evidence):** "Categories of building
work", `/topics/technical-regulation/building-standards/permit-authorities/categories-of-work`,
**last updated 15 Nov 2022**. This is positive evidence of the model, not absence of a number:

> "The *Building Act 2016* takes a risk-based approach to building approval."

Its risk table lists **"Owner builder work" under High risk (Permit work)** — "An application to
council for a Building Permit". Programmatically confirmed the page carries **zero `$` figures**.

**Conclusion: there is no dollar permit trigger in Tasmania.** Owner builder work is permit work
whatever it is worth; what removes the requirement is the structure's size and kind.

**Also captured, corroborating a position the repo already holds:** "Applicants can live outside
Tasmania" and "Owner builders don't have to live in their residence."

### ACT — `planning.act.gov.au`, "Construction licences"

> "An owner-builder licence allows the licensee to undertake work on a specific building approval
> where the work relates to a Class 1, Class 2 or Class 10a building."

> "You must have either: completed an owner–builder course (within the last 5 years), or hold an
> active Class A, B or C builder licence in the ACT."

Owner builders "cannot undertake specialist building work such as demolition [or] swimming pool
construction". **No dollar threshold for the owner-builder licence anywhere in the document.** The
five-year course currency is now sourced, which it was not before.

### What I could not read, stated as a limit on the finding

- **`cbos.tas.gov.au` and `accesscanberra.act.gov.au` return 403 to both WebFetch and curl**, and the
  Access Canberra builders page redirects to a Digital Canberra login. The CBOS readings were done in
  a real browser. Recorded in the register's source list so a future session reads a user-agent block
  as what it is rather than as a dead link.
- **A web-search summary asserted Tasmania's monetary threshold "was abolished as it had been wrongly
  interpreted". I did not verify that and have not recorded it.** A search summary is not a source
  read. It is noted here only as a lead worth chasing in the Fact Sheet PDF, which 403s.
- **The `$12,000` was not read at source.** I removed it as a trigger because it is demonstrably not
  one; I cannot say what it is.

## What changed in `kb/register/`

| File | Was | Is |
|---|---|---|
| `eligibility-by-state.md` TAS row | `≈ $5,000 (⚠️ sources vary — verify with CBOS)` | No dollar trigger; risk-category based, size exemptions listed ✅ |
| `eligibility-by-state.md` ACT row | `$12,000` | No dollar trigger; building approval on Class 1/2/10a ✅; course within 5 years ✅ |
| `eligibility-by-state.md` TAS prose | "Lowest threshold and strictest frequency limit" | "Lowest threshold in Australia" named as wrong; model described |
| `eligibility-by-state.md` ACT prose | "$12,000" as insurance, silently contradicting the table | Contradiction named; `$12,000` marked UNVERIFIED as to subject |
| `eligibility-by-state.md` sources | "TAS — **confirm the current threshold**" | Both CBOS URLs with dates + the 403 note; question marked resolved |
| `cbos-tas-reference.md` B1 | `[VERIFY AT BUILD]`, sources conflict | Resolved; the $5,000/$20,000 distinction preserved as the lesson |
| `cbos-tas-reference.md` footer | Open item: "owner-builder permit dollar threshold (B1)" | Struck, dated |
| `legislation-references-act.md` §1 | "threshold **$12,000**" *and* "insurance applies above $12,000" in one sentence | Trigger verified and stated; `$12,000` removed as a trigger, subject marked UNVERIFIED |

## The reversal, and what still carries the old position (rule 11b)

**The direction of this error is the finding.** `kb/register/**` is designated the single owner of
every verified figure, and here **the register was wrong while the pages built from it were right**:

- `tas-owner-builder-course.mdx:173` already says "Not a dollar test: Tasmania sets the trigger by the
  type of building work, not a single dollar figure" — **correct, and it matches the reading exactly.**
- `tas-owner-builder-course.mdx:184` already separates the `$20,000` as the *residential building
  contract* line under the RBWCDR Act 2016 — **the exact separation B1's caution demanded.**
- `act-owner-builder-course.mdx:129` already says "Not a dollar test" — **correct on the trigger.**

So nothing needs correcting *down* to the pages. But two consequences need someone assigned:

1. **`act-owner-builder-course.mdx:129` makes an attribution the register cannot support.** It states
   the `$12,000` "is the residential building insurance threshold for licensed builders". That may
   well be right — it is one of the two candidates — but it is a live regulatory claim on a published
   page with no verified register entry behind it, which is the situation rule 4 exists to prevent.
   Either verify it or soften it. `build`/`facts`, listed below.
2. **The hub compares states on an axis two of them do not have.** `/owner-builder-courses` shows
   `$11,000` for QLD and nothing for the others, which reads as missing data. It is not missing — TAS
   and ACT have no such number. This is why the Jordan gap could not be closed by filling in a table.

## Demand list

Tag every item: [skills] | [design] | [facts] | [build]

- [build] `owner-builder-courses.mdx` — the Jordan gap ("do I actually need this?") is now UNBLOCKED
  and the answer is **not** four dollar figures. QLD $11,000 incl. GST and WA $20,000 are value
  triggers; **TAS and ACT are not** (TAS: risk category — owner builder work is permit work whatever
  its value, exempt only by structure size; ACT: any work needing building approval on Class 1/2/10a).
  Write the trigger in each state's own shape. Both spoke pages already carry a "Not a dollar test"
  Note that can be echoed. Do not add a threshold column to the comparison table — it would present
  two states as having missing data when they have a different rule.
- [facts] `legislation-references-act.md` / `eligibility-by-state.md` — **what is the ACT `$12,000`?**
  Two candidates: home warranty / residential building insurance, or the value at which a *builder's*
  licence is needed for alterations or additions to an existing residence. `act-owner-builder-course.mdx:129`
  already asserts the first on a live page. `accesscanberra.act.gov.au` 403s to WebFetch and its
  builders page hits a login — use a real browser.
- [facts] `eligibility-by-state.md` ACT — resale disclosure "within 6 years" is carried over and was
  never verified. Unrelated to the trigger, but it is in the same sentence that just proved unreliable.
- [facts] `cbos-tas-reference.md` — chase the "monetary threshold was abolished" lead in
  `Fact_Sheet_-_Builders_changes_under_Building_Act.PDF`. Not needed for the current finding, which
  stands on two live pages, but it would date the change and explain where "≈ $5,000" came from.
- [skills] `eligibility-by-state.md` §1's column is headed "Permit required for residential work
  **above**", which **presumes the answer is a dollar amount**. Two of five rows had a number invented
  or mis-attributed into it. A table whose header encodes an assumption will get filled in even when
  the assumption is false — the column needs to allow a non-monetary trigger, or be split.
- [skills] Nothing in the repo flags a register figure that a **page contradicts**. Here the pages were
  right and the register wrong for months, in both directions on the same fact, and no check saw it.
  `check-claims.mjs` reads pages against rules; the inverse read would have caught this.
