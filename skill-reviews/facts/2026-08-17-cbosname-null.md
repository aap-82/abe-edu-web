# Facts review — the blank `cbosName` on TAS CPD Cyber Risks and Workplace Safety

**Date:** 17 August 2026
**Session type:** facts (with disclosed crossings into `src/content/**` and `scripts/**`)
**Graded by:** self — no fresh-subagent facts grader exists
**Outcome:** closed, and it grew. The approved name is recorded and independently verified against
CBOS's own approval email; the three bundle pages stop publishing ABE's internal admin title; four
CBOS approval dates are recorded, closing a handover task filed as unactionable; a register-wide
date defect is fixed. **One finding is open and needs Andrey: CBOS has twice put ABE's bundles on
notice in writing (§ "The bundling condition").**

> **Mid-session change of evidence.** The first half of this session concluded the approved name was
> unverifiable from any CBOS record and recorded it on Andrey's confirmation. He then supplied four
> approval letters. Everything below is written in the order it happened, because the sequence is the
> lesson: **"no source exists" was really "nobody had asked ABE for the file".**

---

## The reading, not just the figure

Rule 11(a): the instrument opened, the clause cited, the date, and what was searched for and not
found.

**The question.** `kb/register/cpd/tas-courses.json` held `"cbosName": null` for the row whose
internal `name` is `TAS CPD: Cyber Risks and Workplace Safety (1 pt)` — the only **live** course with
a blank one. `CpdBundleLayout.astro` renders `m.cbosName ?? m.name`, so that row published the
internal LearnWorlds/admin title, prefix and point-count suffix included, into a member list where
the other eleven read cleanly. `/cpd-building-tas` has been indexable since 16 Aug 2026, so this was
live and reader-visible, not a pre-publish issue.

**Instruments opened, in order.**

1. **The source row.** Superhuman Docs `TAS CPD Courses`, `superhuman://docs/wXRzQ7oMrm`, table
   `grid-_kWHYm22cU`, row `i-ZTsJgt-xJj`. Read via `table_rows_read` **and** independently via the
   Coda REST API (`valueFormat=rich`). Both return `CBOS Name` as empty string. **The blank is real,
   not a sync artefact** — that was the first thing worth excluding, because a column-id drift or an
   unhandled rich-value shape would look identical from the repo side.
2. **CBOS, live, in a browser** (it 403s WebFetch and curl). Two pages, both of which could
   plausibly have carried per-course approved names, and neither does:
   - `/cpd/additional-training-resources`, last updated 20 Jul 2026 — **ABE Education is listed**, as
     a `<details>` accordion whose entire body is a prose blurb ending "Visit the ABE Education
     website to find out more". No course names, for ABE or any other provider.
   - `/cpd/events-calendar/upcoming-events` — a diary of dated sessions plus a few always-open online
     courses from other providers. Searched the rendered text for `Cyber`, `ABE`, `WELS`, `Drone`,
     `Email Management`, `Asbestos Basics`, `Water Efficiency`: **0 hits for all seven.** ABE's
     self-paced catalogue is not on the calendar at all.

   This **re-confirms** the 25 Jul 2026 premise correction rather than citing it. It was worth
   re-testing: it is the premise every TAS CPD verification rests on, it was three weeks old, and the
   events calendar was a lead the earlier session had not opened.
3. **The row's own approval evidence.** `Approval Date` is blank; the row is submission-basis,
   submitted 15 Jul 2025. So there is no approval document in the doc to read a name off.
4. **The row's `Course Submission` attachment**, downloaded and read: titled *Cyber Risks and
   Workplace Safety*. **Calibrated before being trusted** — of the five rows carrying a submission
   PDF, four also have a populated `cbosName`, and the PDF title equals `cbosName` exactly in three.
   The fourth fails for an unrelated reason (see "Second finding" below).
5. **Three internal ABE naming sources**, each checked against the register across all 17 rows.

**What I searched for and did not find: any CBOS record naming this course.** There is none, and that
absence is the finding. The approval exists only as correspondence held by ABE.

## Why the convergent internal evidence was not treated as sufficient

Five internal records call it *Cyber Risks and Workplace Safety*: the submission PDF, `Courses Main
Database`.`Course Title`, the Bundle Fact Sheet listing, the ABE website page title, and the
Certificate of Completion filename. That is a lot of agreement, and it does not establish the
approved name — **they agree because they share a marketing origin, not because any of them witnessed
the approval.**

Measured against the register, each generalisable instrument is individually wrong somewhere:

| Instrument | Where it disagrees with `cbosName` |
|---|---|
| Strip `TAS CPD:` / `(1 pt)` off `name` | `TAS WELS Essentials: Your Path to Water Efficiency Mastery` → **`Understanding Water Efficiency Labelling WELS`** |
| `Courses Main Database`.`Course Title` | `The Role of Drones` vs **`The Role of Drones In Building, Plumbing & Electrical Work`**; `AS NZS 3000 2018 Wiring Rules` vs **`AS/NZS 3000:2018 Wiring Rules`** |
| `Bundles` / Bundle Fact Sheet listings | `Compliance and Innovations in Wet Area Waterproofing` vs **`Compliance, Solutions and Driving Innovation For Wet Area Waterproofing`** |

The prompt supplied the first counter-example. I looked for the others rather than accepting the one
I was handed, and the `Course Title` column was the genuinely tempting instrument — a field literally
named for the title, matching `cbosName` on 9 of 18 rows. It is wrong on Drones. Had I stopped at
"five sources agree", I would have recorded a defensible-sounding guess.

**So the value was asked, not inferred.** Put to Andrey with the gap, the evidence, and the reason the
evidence was insufficient. He confirmed on 17 Aug 2026 from the CBOS approval correspondence:
**`Cyber Risks and Workplace Safety`**. The confirmation is the verification; the register now records
a fact, not a consensus of marketing copy.

> **The blank was an omission, not a signal.** The opposite reading was available and would have been
> a much worse outcome: this row has no `Approval Date`, so a blank `CBOS Name` could be read as "never
> approved", which would make its `live` status and its place in a published bundle the real problem.
> Checked before concluding — **nine other live courses also have a blank `Approval Date` and all nine
> carry a `cbosName`.** The two fields do not track each other, so the blank says nothing about
> approval.

## What was changed, and where

`kb/register/cpd/tas-courses.json` is a generated projection whose checksum `check-claims` verifies, so
a hand-edit forks the register. The change was made at source and synced.

1. **Source doc**, row `i-ZTsJgt-xJj`, `CBOS Name` ← `Cyber Risks and Workplace Safety`. Read back from
   the REST API to confirm it took.
2. **`npm run sync:cpd`.** Register diff is exactly three lines: the one `cbosName`, plus `syncedAt`
   and `checksum`. Nothing else moved.
3. **`kb/register/cbos-tas-reference.md`** — A4 extended with the re-confirmation and the two
   unreliable-instrument findings; **A4b** added recording this course's approved name and the search
   that did not answer it; **A4c** added for the second finding below; footer re-verification line
   updated. Frontmatter `verified:` deliberately **not** bumped — I re-read A4's sources, not A1/A2's
   points tables, and bumping would reset a 365d cadence on sections nobody re-read.

### Disclosed crossing — `src/content/cpd-bundles/*.mdx` (build-owned)

`memberInfo` is keyed by **display name**, and the schema comment says a missing key "renders
name-only rather than a guess" — it fails silently, with no build error. Changing `cbosName` therefore
strips the blurb and the measured 47-minute figure off three pages unless the keys move with it. I
renamed the key in all three bundle MDX files in the same change.

This is a `facts` session writing a `build`-owned path. Recorded here and in the commit message per
CLAUDE.md. The alternative — land the register fix and leave three pages regressed for a later
session — is worse, and the coupling is invisible from either side alone, which is the actual lesson:
**a register value and the page copy keyed to it are one change, not two.**

## Verification — measured on the rendered output

Per the standing rule that I assert the property a reader perceives, not the input I edited. Built
with `npm run build`, then read `dist/`:

| Check | Before | After |
|---|---|---|
| `TAS CPD: Cyber Risks...` in `/cpd-building-tas` | row 4 of 12 | **0 occurrences** |
| same, `/cpd-electrical-tas` | row 3 of 11 | **0 occurrences** |
| same, `/cpd-plumbing-tas` | row 5 of 12 | **0 occurrences** |
| Rendered card, `/cpd-building-tas` | — | `Cyber Risks and Workplace Safety \| Protecting client data and site systems from common threats. \| 1 CPD point \| 47 min average` |
| JSON-LD `ItemList` course name | internal title | `"name":"Cyber Risks and Workplace Safety"` |

Both the visible card **and** the structured data were checked — the internal title was in the
JSON-LD too, and a grep that only cleared the visible copy would have left it in the schema.

`node scripts/check-claims.mjs --strict`: `CPD register: checksum matches, 17 rows` — the change went
through sync, not a hand-edit. All three bundle point claims still `claim <= pool` (building 12/12,
electrical 11/11, plumbing 12/12). Build green: `0 failing`.

## The approval letters (supplied mid-session, 17 Aug 2026)

Andrey put four CBOS approval emails in `gov approvals/CBOS/`. They are the instrument this session
had just finished concluding did not exist in readable form.

**They verify the name independently.** The Cyber Risks letter is titled *CPD Application - Cyber
Risks and Workplace Safety*, its embedded application form reads "Training or event title: Cyber
Risks and Workplace Safety", and CBOS replies "this training has been approved for 1 CPD point" on
15 Aug 2025. So the value recorded earlier on Andrey's word now stands on the primary record. Both
routes reached the same string — but only the second one could have *failed*, which is the point.

**They also carry four approval dates**, all previously blank:

| Course | Approval date | Was | Now |
|---|---|---|---|
| Cyber Risks and Workplace Safety | 15 Aug 2025 | submission-basis | `approval`, expires 15 Aug 2027 |
| WHS Compliance and Legislation | 10 Sep 2025 | submission-basis | `approval`, expires 10 Sep 2027 |
| Plumbing Essentials | 12 Sep 2025 | submission-basis | `approval`, expires 12 Sep 2027 |
| Fire Risk Awareness For All Trades | 20 Nov 2025 | submission-basis | `approval`, expires 20 Nov 2027 |

Every expiry moved **later**, so nothing had been over-claimed on the strength of the estimates.
`check-freshness` `SOFT-DATE` fell from 10 live courses to **6**.

**This closes `HANDOVER-facts-cpd-tas.md` Task A step 3**, recorded on 25 Jul 2026 as "not actionable
— there is nothing to read". It was actionable; the letters sit in ABE's mailbox and nobody had asked.
The 25 Jul session verified honestly that CBOS publishes no public register and then generalised one
step too far, from *"the regulator publishes nothing"* to *"the fact is unobtainable"*. Recorded in
A4 as a correction, because the same over-generalisation is available for the six courses still on
submission-basis: **their dates are unrecorded, not unobtainable.**

**Plumbing Essentials is scoped**: "approved for 1 CPD point **for plumbers and gas-fitters**". The
register's `categories: ["plumbing","gas-fitting"]` already matches exactly, and it is bundled only
into plumbing — checked rather than assumed, since a licence-class limit is precisely the kind of
condition that gets flattened when copy is written later.

### Writing a date-picker cell fails silently on ISO input

The first write of all four approval dates used `"2025-08-15"`. The tool returned a normal success
payload with the full table schema, and **nothing was written** — all four cells still empty, all four
expiry formulas unchanged. `"15/08/2025"`, matching the column's `DAY_MONTH_YEAR` format, works.

Caught only because the write was read back. A success-shaped response from a write that did nothing
is the exact failure mode that a self-certifying session ships. Read back every source-doc write.

## The bundling condition — OPEN, needs Andrey

The most consequential thing in the letters is not a date. **CBOS has twice, in writing, put ABE's
bundles on notice.** Cyber Risks approval, 15 Aug 2025:

> ABE Education must ensure if the approved courses are bundled, the bundles contain a reasonable
> amount of CPD which is directly relevant to a practitioners licence requirements … **The CPD bundle
> cannot be all business/WHS related.** The Administrator may withdraw approval of training courses if
> it is deemed that the course/s no longer meet/s the CPD framework …

And again in the Fire Risk approval, 20 Nov 2025: "Please ensure your CPD bundles includes some CPD
content which is directly relevant to the prescribed work the practitioners are licensed for."

Three months apart, unprompted, in approvals ABE did not ask for advice on. Composition today:

| Bundle | Live | Plausibly prescribed-work technical |
|---|---|---|
| Plumbing | 12 | 2 — Plumbing Essentials, WELS |
| Electrical | 11 | 2 — AS/NZS 3000:2018 Wiring Rules, Solar Energy |
| Building | 12 | arguably 0 — its technical members are plumbing and electrical content |

**The builder bundle drifted there by attrition, not decision**: its one clearly builder-technical
course, *Wet Area Waterproofing*, expired and dropped out. No one chose that.

Recorded in A4e as fact plus composition, and explicitly **not** concluded — "a reasonable amount" is
CBOS's judgement, and the fix (add approved trade-technical courses, or raise it with CBOS) is
commercial. Flagged rather than filed, because a demand-list item is the wrong home for a condition
whose stated sanction is withdrawal of approval.

## Second finding — every register date was one day early (FIXED)

Found while confirming the blank cell was not a sync artefact, which is why the sync's other outputs
were being diffed against source at all.

**16 of 17 rows** carry `submittedAt` / `approvedAt` / `expiresAt` **one calendar day earlier than the
source doc** (the 17th has no dates). Same direction, same magnitude — systematic, not editorial.

**Cause, reproduced exactly.** Coda returns AEST midnight (`2025-07-15T00:00:00.000+10:00`);
`isoDate()` in `scripts/sync-cpd-register.mjs` does `new Date(s).toISOString().slice(0, 10)`, which
converts to UTC first and lands on the previous day. That input yields `2025-07-14`, which is what the
register holds. `generated.syncedAt` has the same bug — this session's sync stamped `2026-08-16` while
running on 17 Aug.

**Filed as debt, then fixed within the session — and the reversal is the interesting part.** The first
decision was to route it: it fails safe (an expiry one day early retires a course early), `scripts/**`
is skills-owned, and re-syncing rewrites 16 rows, which is how two findings become one unreviewable
diff. All still true.

What overtook it: the four approval dates from the letters went through the same `isoDate()` and the
register recorded **all four one day earlier than the regulator's own email**. A cosmetic-looking
off-by-one stopped being cosmetic the moment a verified regulatory figure passed through it. A
register that exists to own verified figures cannot ship dates that disagree with the instrument they
were read from, so shipping it as debt was no longer available.

**Fix** (`scripts/sync-cpd-register.mjs`, disclosed crossing into skills-owned `scripts/**`):
`isoDate()` now takes the calendar date as written via a leading `YYYY-MM-DD` match before falling
back to `new Date()`; `syncedAt` uses a new `todayLocal()` instead of the UTC date. Both paths keep
their prior behaviour for inputs they already handled.

**Verified across the whole file, not just the four rows I touched**: re-synced, then diffed every
date field of all 17 rows against the Coda REST API — **39 fields compared, 0 mismatches**.
`syncedAt` now stamps `2026-08-17` (it had stamped `2026-08-16` while running after midnight AEST on
the 17th, the same bug in miniature).

**The source doc was correct throughout. Never "fix" a projection bug by editing the source** — noted
in A4c because that is the tempting wrong move for whoever meets this next.

## Third finding — a mis-filed submission attachment

The `Course Submission` PDF on *A Practical Guide to Smart Home Integration & Energy Efficiency* (row
`i-Tbx26Fq8Ia`) is the **Wet Area Waterproofing** submission: named
`Compliance and Innovations in Wet Area Waterproofing.pdf`, 460 occurrences of "waterproof", 0 of
"smart home". It is the only one of the five whose filename does not match its row.

This is why the submission-PDF instrument calibrated at 3 of 4 rather than 4 of 4 — the exception is a
filing error, not a naming rule. Worth keeping because it nearly read the other way: a
"submission title ≠ CBOS name" counter-example would have discredited the one instrument that turned
out to be reliable.

## The `null cbosName` check — decided

**Yes. A live course with a blank `cbosName` should warn, not fall back silently.** The silent
fallback published an internal admin string on an indexable page and nothing caught it — not the
build, not `check-claims`, not `check-freshness`. `grep -rn cbosName` across `scripts/` returns
nothing: **no check has ever looked at this field.**

Spec, routed to `skills`:

- In `check-claims.mjs`, beside the existing CPD register checks: for every course with
  `status === 'live'` that is tagged to at least one bundle, a null/empty `cbosName` is reported.
- **WARN, not FAIL.** A facts session cannot clear a FAIL — only the approval correspondence can — so
  a hard failure would redden builds for the one session type unable to fix it. This is the
  ratchet-not-a-flat-FAIL shape.
- Message names the course and says the page will publish the internal `name` instead, because the
  consequence is the part that makes it actionable.
- Count today is **0**. The check ships already satisfied, which is the right time to add one.

The `?? m.name` fallback in `CpdBundleLayout.astro` is a separate, `design`-owned question and is
routed separately: rendering *something* is defensible, rendering the **admin title** is not.

## Demand list

Tag every item: [skills] | [design] | [facts] | [build]

- ~~[skills] `scripts/sync-cpd-register.mjs` — `isoDate()` shifts every AEST-midnight date back one
  day (`new Date(s).toISOString()` converts to UTC first). **16 of 17 register rows are one day
  early**, and `generated.syncedAt` too.~~ fixed in this session once the same bug corrupted four
  CBOS approval dates; 39 date fields across 17 rows verified against source, 0 mismatches. A4c.
- [facts] **CBOS's bundling condition (A4e) is open and belongs to Andrey, not to a session.** Two
  approval letters require ABE's bundles to carry CPD "directly relevant to the prescribed work",
  state that a bundle "cannot be all business/WHS related", and name withdrawal of approval as the
  sanction. Builder bundle currently has arguably zero builder-technical members after *Wet Area
  Waterproofing* expired. Needs a commercial decision or a conversation with CBOS — do not soften it
  in page copy meanwhile.
- [facts] Six live courses remain submission-basis (`check-freshness` `SOFT-DATE 6`). Their approval
  letters most likely exist in ABE's mailbox, as these four did. **Ask before recording another date
  as unobtainable** — that inference is what A4 got wrong on 25 Jul 2026.
- [skills] `scripts/sync-cpd-register.mjs` — the sync accepts a source-doc date silently. Writing an
  ISO string to a `DAY_MONTH_YEAR` Coda date column returns a success payload and writes nothing;
  only `dd/mm/yyyy` takes. Worth a note in the script header for the next person editing dates at
  source by API.
- [skills] `check-claims.mjs` — add the live-course-with-blank-`cbosName` WARN specified above. No
  check has ever read this field; a blank one published an internal admin title to an indexable page.
- [design] `CpdBundleLayout.astro:107-108` — `m.cbosName ?? m.name` silently substitutes the internal
  LearnWorlds/admin title, including its `TAS CPD:` prefix and `(1 pt)` suffix, into reader-facing
  member cards **and** the JSON-LD `ItemList`. Decide what a missing approved name should render;
  the internal title is the one option that is wrong.
- [facts] `TAS CPD Courses` row `i-Tbx26Fq8Ia` (*Smart Home Integration*) has the Wet Area
  Waterproofing submission PDF attached. Source-doc filing error; replace with the correct submission
  when someone is next in the doc with the files to hand.
- [build] `src/content/cpd-bundles/*.mdx` — `memberInfo` is keyed by display name, so any future
  `cbosName` change silently drops that member's blurb and minutes (schema comment: "A missing key
  renders name-only"). Three files carry the same keys. Worth keying on the register row `id` instead,
  which does not change when a name is corrected.
