---
date: 2026-08-01
skill: skills-session
subject: session-type-gaps
verdict: Green
graded_by: self
---

# Skills review — the session-types table closes three gaps, 2026-08-01

Self-graded: there is no fresh-subagent skills grader (CLAUDE.md session-types rule 10).

## Verdict

**Green.** Three demand items closed, all of them filed by *other* sessions that hit the gap and
could not fix it from where they stood. Documentation only — no script, no schema, no page. Every
check that reads these documents was run after the edit, not asserted: `check-claims` 0 failing,
`system-health` 0 failing, `demand-split --strict` exit 0, `npm run build` exit 0.

The verdict is Green rather than Amber because nothing here is a judgement call dressed as a rule.
Two of the three changes were *requested in the exact form delivered* by the sessions that filed
them, and the third is a ROADMAP entry rather than a build, which is the disciplined outcome for a
candidate whose trigger has fired but whose implementation has a known trap.

## Declaring the session type, because this one changed mid-conversation

**This conversation opened as a design session** ("match ModuleRows to the FAQ accordion"), shipped
that work (`530583c`), and was then directed by Andrey to open a skills session and draft these
changes. CLAUDE.md says the type is declared at the start and does not change mid-session, and that
if the work changes type you end the session and open the right one.

That rule was not followed to the letter: this is the same conversation. It is recorded here rather
than smoothed over, because the same conversation had *already* drifted once — it spent an afternoon
triaging four backlogs and auditing session status, which is neither design nor anything else it had
declared, while citing the session-type rule to decline other work. The drift was named by Andrey
asking "is this a design session?", and the answer was no longer yes.

**What was done to make the change honest rather than silent:** the type was declared out loud
before any edit; the pre-flight was re-run (rule 1, 0 failing); a fresh branch was cut from
`origin/main` rather than continuing on the merged facts branch that happened to be checked out; and
this review exists. What is still irregular: one conversation, two declared types, and a design
review and a skills review filed from it. A demand item below asks whether the rule should permit a
declared, recorded hand-off, because the alternative that actually happened three times today was
*undeclared* drift, which is strictly worse than a documented transition.

## What shipped

`CLAUDE.md` (three edits) and `ROADMAP.md` (one row). No code.

| # | Change | Filed by | Where |
|---|---|---|---|
| 1 | `facts` may write `skill-reviews/facts/**` (its own review only) | facts session | session-types table |
| 2 | **Rule 11** — facts sessions close with a review | facts session | rules list |
| 3 | `public/**` and `.claude/launch.json` assigned to **skills** | skills + design sessions | ownership paragraphs |
| 4 | Session-type path check added as a gated candidate | design session | ROADMAP Phase 3 table |

### 1–2 · Rule 11, and why it needed two clauses rules 9 and 10 do not have

The facts session filed this item and filed its review at `skill-reviews/facts/` **on the assumption
the rule would follow**. That is the right instinct and the wrong order, and it is worth naming: the
convention existed in the tree before it existed in the rules, which is the same drift rule 10 was
written to close for skills sessions, running in the opposite direction.

**No tooling change was required, and this was verified rather than assumed** — the item asserted it
and the assertion was checked independently before the rule was written:

| Reader | Traversal | Facts review | Correct? |
|---|---|---|---|
| `demand-split.mjs` | recursive since 29 Jul | **routes** — 38 reviews scanned, 10 items from that one review | yes, a demand item is a demand item wherever filed |
| `review-trends.mjs` | `skill-reviews/*.md` flat | ignored | yes, a facts review has no run metrics |
| `system-health.mjs:177` | `readdirSync` flat | ignored | yes, a facts session grades no page |

So rule 11 is pure documentation. The asymmetry that rules 9 and 10 had to *establish* was already
built and already correct for a third subdirectory.

**The two extra clauses are not boilerplate.** Rules 9 and 10 ask for measured before/after values;
that framing does not fit facts work, where the "value" is a regulatory position and the interesting
content is the provenance. So rule 11 asks for:

- **(a) Record the reading, not just the figure.** A register diff shows `✅ → ❌` and cannot show
  why. This run is the argument: it read SafeWork NSW's GIT Specific Conditions, found clause 1(q),
  and reversed a position the repo had held since 26 May. Without the review, the next session sees
  a flipped row with no instrument, no clause, no date — and the previous position had itself
  survived because its provenance (industry guides) was recorded only in a §4 footnote nobody read.
- **(b) A reversal names what it contradicts.** A facts session may write `kb/register/**` and
  nothing else, so when its reading overturns something, every *other* home of the old position is
  out of its reach. Here that is `kb/rules/authority-model.md` lines 141/371/390, `badge-inventory.md`,
  the built page, and an MDX comment instructing future sessions not to make this correction. An
  unlisted contradiction is one nobody is assigned to close.

### 3 · The third path-ownership gap, and naming the pattern

Two sessions hit unassigned paths on the same day and both had to cross a boundary to finish: a
skills session edited `public/robots.txt` to record why it carries no `Disallow`; a design session
added a `dist-static-auto` entry to `.claude/launch.json` because the pinned-port entry made it
impossible for a second session to verify anything at all.

This is the **third** time this exact shape has been found and patched — after `content.config.ts`
(25 Jul) and `SYSTEM.md`/`handover/**` (29 Jul). Three instances is past the point where patching a
fourth is the right response, so the paragraph now states the generating rule: **a path goes
unassigned when it is *infrastructure for* the work rather than *part of* the work.** That is why it
keeps happening — such a path belongs to every session's needs and no session's remit, which is the
precise condition under which a table built by listing deliverables will omit it.

It also draws the line against the deliberately-unassigned list, because "config" was doing too much
work in both directions: `public/**` is build output configuration that ships with every page and
changes with the content; `wrangler.jsonc` and `astro.config.mjs` decide how the whole site is
served. **The test recorded: does getting it wrong break one page's correctness (assignable), or the
deployment itself (human decision)?**

### 4 · The path check: ROADMAP candidate, not a script

The design session filed "nothing checks a commit's touched paths against the declaring session's
may-write list". It was tempting to build it in this session — it is genuinely mechanical, perhaps
forty lines. It was not built, for two reasons.

**ROADMAP is explicit that Phase 3 candidates carry their own trigger and must not be built ahead of
it**, and the candidate table has an established idiom for a newly-earned entry ("not on the original
candidate list; earned by the run"). The honest record is three crossings across two sessions in one
day, which is past the rule-3 threshold — so the row is marked authorised, and the decision to spend
the work is left where ROADMAP puts it rather than taken by the session that happens to be open.

**And the implementation has a known trap that wants deciding before code.** Several paths are
deliberately unassigned, so a naive check goes red on work no session may fix. The row therefore
carries the instruction to build it advisory rather than as a flat FAIL — the ratchet lesson, applied
before the mistake rather than after it. Building it today as a FAIL would have reddened the trunk
for `worker/`, `wrangler.jsonc` and `.github/**` edits that are correct.

The row also records the part worth keeping: **an edit arriving via cherry-pick, merge, revert or
rebase is still an edit by the session that runs it.** That is the case a human check misses, because
the paths scroll past in tool output instead of being typed — which is exactly how `3d9cc44` put
`scripts/check-redirect-targets.mjs` into a design session unflagged.

## Measured

Every check that reads the edited documents, run after the edit:

| Check | Before | After |
|---|---|---|
| `check-claims` | 0 failing, 11 ok | **0 failing, 12 ok** |
| `system-health` | 0 failing, 44 ok | **0 failing, 44 ok** |
| `demand-split --strict` | exit 0, 0 UNROUTED | **exit 0, 0 UNROUTED** |
| `npm run build` | exit 0 | **exit 0** |
| SYSTEM.md §5 reconciliation | names all 10 checks, 4 exempt | **unchanged — no script added** |
| Demand items closed | — | **3** (one each from design, skills, facts) |

The §5 row is the meaningful negative: adding a script would have obliged a §5 entry or a
`CHECK_EXEMPT` line in `check-claims.mjs`, and the check that enforces that is itself one of the ten.
Shipping documentation only means that contract is untouched.

## Demand list

Tag every item: [skills] | [design] | [facts] | [build]

- [skills] **The session-type rule has no legal way to hand off, so drift is the only exit.** "The
  type is declared at the start and does not change mid-session. If the work changes type, end the
  session and open the right one" assumes ending a session is available. In practice, three times
  today, the work changed type inside one conversation and the rule was simply broken — twice
  silently (design → backlog triage; design → `scripts/` via cherry-pick) and once explicitly
  (design → skills, this session). A rule that is only ever complied with by accident should either
  gain a **declared hand-off** — re-declare, re-run pre-flight, cut a fresh branch, file both
  reviews, as this session did — or say plainly that the conversation must stop, in which case
  something has to make stopping the easy path. The current wording gets neither.
- [skills] **Three of the four session types now have a "closes with a review" rule, written one at
  a time.** Rules 9, 10 and 11 were added on 29 Jul, 29 Jul and 1 Aug, each after a session type was
  found closing with no record. `build` has Stage 9 and is covered. The set is now complete, so the
  three rules could collapse into one rule with a per-type table — three near-identical paragraphs
  invite the drift they exist to prevent, and rule 11 already had to restate the subdirectory logic
  a third time.
- ~~[skills] **`kb/rules/authority-model.md` lines 141/371/390 and `badge-inventory.md:141` still
  state the reversed NSW delivery position.** Skills-owned, filed by the facts session, and *not*
  fixed here — this session was drafting the session-types rules and folding an unrelated content
  correction into that commit would be exactly the boundary sloppiness the work is about. Named so it
  is not lost: it is the highest-priority open skills item, because a rule doc contradicting the
  register is the shape that put the wrong position on a page in the first place.~~ Fixed in **#112**,
  in this same session but as a separate commit, which is what the item asked for. See the addendum
  below — the resolution is not the one the item anticipated.
- [design] **`.claude/launch.json` now has an owner, and the `dist-static` entry still has the
  defect.** The pinned `-l 4325` remains; `dist-static-auto` was added beside it rather than fixing
  it, to avoid disturbing a running session. Now that ownership is settled, decide whether the two
  entries collapse into one.

---

## Addendum — the NSW delivery notes, and closing the session record

This session continued past the review above and shipped a second commit (**#112**). Recorded here
rather than as a separate review, because it is the same session and rule 10 asks for *one* review
per skills session — a second file would have made the session look like two.

### What happened, in the order it happened

The item struck above asked for the reversed NSW delivery position to be corrected in the two
skills-owned files. I began doing exactly that: three edits to `authority-model.md` and one to
`badge-inventory.md`, all stating **in person only** on the strength of SafeWork NSW's GIT Specific
Conditions cl. 1(q).

**Andrey then said to record it as confirmed by him, and that the course is delivered by Zoom.**

That is a materially different instruction, and the edits were stopped mid-flight rather than
continued or quietly reversed. What was put to him was the distinction, not the conclusion: **a page
may act on a verbal clearance and may not cite a regulator for it** — so "record it as confirmed by
Andrey" is writable, and "SafeWork NSW approves virtual classroom" is not, because the regulator's
published conditions say otherwise. He chose the attributed version.

### What shipped

Every affected file now holds **two facts apart** with an explicit rule against merging them:

1. **What ABE Education sells** — trainer-led virtual classroom over Zoom via Upskill (RTO 45708),
   live, never self-paced. Sourced to **Andrey, 1 Aug 2026**.
2. **What the regulator's conditions say** — SW08319 cl. 1(q) does not provide for Connected
   delivery. Sourced to the documents.
3. **The attribution rule** — state the mode, attribute it to ABE Education or Upskill, **never to
   SafeWork NSW**; no regulator badge or `VerifiedSources` attestation over the delivery claim.

| file | treatment |
|---|---|
| `kb/rules/authority-model.md` | NSW block carries both; prohibited-claims table now bans *attributing the mode to the regulator* rather than banning the mode |
| `badge-inventory.md` | mode restored, plus the regulator-badge prohibition |
| `changelog.md` | two historical entries left **unedited**, with dated superseded notes attached |

The changelog treatment is the one judgement call worth defending: a changelog records what was
believed at the time, so rewriting it would falsify the record. One of the attached notes also
corrects a factual error *inside* the old entry, which claimed `online-delivery-policy-by-state.md`
was "already correct" — true when written, false once §2 was reversed.

### Measured

`npm run build` exit 0 (21 pages, guardrails pass) · `check-claims` 0 failing · `system-health`
0 failing · `demand-split --strict` exit 0. Merge state verified **by content diff against
`origin/main`, not by PR status** — `gh pr view` is stale in both directions on this repo and it
squash-merges, so ancestry checks report merged work as stranded.

### The session's own record, closed

This conversation ran as **two declared types**: design (ModuleRows FAQ parity, shipped `530583c`,
reviewed at `skill-reviews/design/2026-08-01-modulerows-faq-parity.md`) and then skills (this
review). The transition was declared, pre-flight re-run, and a fresh branch cut — but it is still one
conversation, which rule 3 of the session-types section does not provide for. That is filed as the
first demand item above and is the honest headline of the day: **the rule was broken three times, and
only the third was declared.**

### Demand list — addendum items

- [build] **`src/content/courses/white-card-nsw.mdx:6` still states the permission outright** — "Trainer-led
  CONNECTED DELIVERY (live video) is permitted for GIT in NSW" — and instructs future sessions not to
  correct it. The `#online` `VerifiedSources` block still attests the acceptance to SafeWork NSW.
  **This is now the last place the banned merge survives**, and it is build-owned, so neither this
  session nor a facts session could touch it. Rewrite the comment to state ABE's position with
  Andrey's attribution, and narrow the attestation to the self-paced prohibition, which is the part
  it can actually quote.
- [facts] **`kb/register/online-delivery-policy-by-state.md` §2A records the documentary reading but
  not the operational confirmation.** Its analysis is correct and should stand; what it lacks is
  Andrey's 1 Aug confirmation recorded beside it, so the register shows both what the documents say
  and what ABE does. Register-owned, and rule 4 means the facts session that adds it must read the
  source itself rather than carrying this review's summary.
- [skills] **Nothing prevents a regulator attestation over a business-owner fact.** The attribution
  rule now exists in prose in three files and is enforced by nobody. `VerifiedSources` takes a
  `facts` string and a source list; a check could flag a page whose delivery-mode claim sits inside a
  block citing a regulator, which is mechanically detectable in `dist/`. First filing — recorded, not
  built, per rule 3.
