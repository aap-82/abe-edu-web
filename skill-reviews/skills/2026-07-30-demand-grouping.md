---
date: 2026-07-30
skill: demand-split
subject: demand-grouping
verdict: Amber
graded_by: self
---

# Skills review — grouping the demand list, 2026-07-30

## Verdict

**Amber.** The output is now readable and, more importantly, honest: 18 pair lines became 9 groups,
and the section that used to say "no item in this destination has recurred yet" over the top of a
four-times-filed complaint no longer says it. Amber because getting here took **three wrong
implementations**, and the thing that made it right was giving up on the number rather than computing
it better.

## What prompted it

Running `demand-split --write` after the design session. Every destination reported **"Trigger met: 0
— no item has recurred yet"** while the partner blurb had been filed in four separate reviews and the
`VerifiedSources` new-tab decision in four. The 14 design "possible repeats" were really about six
distinct items: four filings of one complaint produce C(4,2) = **six** pair lines, all looking alike.

Two defects, then. The output was unreadable, and the headline was false.

## What shipped

| | Before | After |
|---|---|---|
| Design section | **14 pair lines** | **6 groups** |
| Whole repo | **18 pairs** | **9 groups** |
| Empty-trigger message | "no item has recurred yet" | "none **by exact match**", pointing at the groups |
| Duplication | clustered items also listed under "Recorded once" | listed once |
| `check-claims` CLAIMS | 12 | **13** |

## Three implementations, three wrong answers

The corpus had a hand-counted truth: partner blurb **4**, `VerifiedSources` **4**, `Login` **2**,
`Note.astro` **2**.

1. **Transitive closure (union-find).** Reported **6** for the blurb. `PartnerDisclosure` names two
   unrelated complaints — the duplicate blurb and a heading-level prop — and closure means **one**
   false edge welds two whole clusters. My own code comment claimed a spurious chain would need two
   false pairings; that was wrong, and it was wrong in the direction of over-confidence.
2. **Join if you match half the cluster.** Reported **3**. At a cluster of two, "half" is one link,
   which is transitive closure wearing a different name, so the heading-level pair seeded first and
   took a genuine blurb filing with it.
3. **Join if you match at least two members.** Reported **3** again and split `VerifiedSources` into
   two groups of two. Too strict for items that are genuinely one complaint but variably worded.

Each attempt was confidently wrong in a new way, and each was tuned against this one corpus — which
is exactly what the previous design review warned makes a threshold "a measurement of that corpus,
not a rule". I wrote that sentence yesterday and then spent three iterations doing it anyway.

## The fix was to stop asserting the number

The tool now groups generously (connected components) and labels the group **"N related items"**, not
"N filings", with the caveat stated in the output itself: a group may hold two complaints that name
one component, the `PartnerDisclosure` group does exactly that, and the reader should count.

**Over-grouping with an honest label beats under-splitting with a confident count**, because the first
is a question and the second is a wrong answer that ROADMAP rule 3 would act on. Deciding whether four
items are one complaint or two takes a person seconds; it is the part the heuristic kept getting wrong.

A `CLAIMS` entry now asserts the honest label, so a future edit that reinstates a filing count fails
`check-claims` rather than quietly re-asserting the thing that measured wrong three times.
Negative-tested: renaming the heading back to "filings" produces CLAIM DRIFT and 12/13.

## Demand list
Tag every item: [skills] | [design] | [facts] | [build]

- [skills] The grouping is O(n²) over single-occurrence items per destination. At 53 skills items that
  is ~1,400 comparisons and instant; it is not a problem now and would become one somewhere in the
  low hundreds of items. Recorded so the next person recognises it rather than rediscovers it.
- [skills] `MIN_SHARED_WORDS` and `MIN_OVERLAP` are still hand-tuned against this corpus. They are
  printed with the output, which makes them auditable but not validated. If a future run produces
  groups that are obviously wrong, retune against the hand-counted truth **and record the new counts**
  rather than adjusting until the output looks tidy.
- [design] The `PartnerDisclosure` group holds two distinct complaints. Re-word the four partner-blurb
  filings to match in their source reviews so they merge by key and stop needing a human read.
- [design] `VerifiedSources` / `SourcesFooter` new-tab: **four related filings and still no decision.**
  This is the most-filed undecided item in the repo.

## Output
- [x] **Fix applied** — grouping, the empty-trigger message, the double-listing, and a CLAIM to hold it.
- [x] **`kb/mistakes-log.md`** — not incremented. This is row 24's family (a set-scoped tool
  miscounting), but row 24 is already at 2 and already carries the general lesson; a third tick would
  add a count without adding a rule. The specific lesson — *a heuristic that cannot be validated
  should surface candidates, not assert a number* — is recorded here and in the code comment where
  the next editor will meet it.
- [ ] **Memory written** — not needed; it duplicates the code comment and this review.

## Grader note

`graded_by: self`. The reproducible part is the before/after table and the negative test; the
judgement call is the decision to stop computing a count at all, which is the one worth challenging.
The counter-argument is that a tool which refuses to count leaves the trigger rule dependent on a
human reading the groups every time. I think that is right for free-text complaints and wrong for
anything with a stable key, which is why the fix also tells reviewers to re-word repeat filings so
they merge mechanically next time.
