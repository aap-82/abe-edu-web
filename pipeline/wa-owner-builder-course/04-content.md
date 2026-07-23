# 04 · Content — /wa-owner-builder-course (click-recovery pass)

Written from `03-briefs.md` S4-S6. This is an audit of a live page, so Stage 4's job is small and
surgical: three changes, one of which turned out not to be needed. Capsules elsewhere on the page are
unchanged and were not re-drafted.

---

## S4 · Meta description — REWRITTEN

**Before**
> WA-specific owner builder course, online and self-paced. Your certificate supports your Form 75
> approval. $179, same-day certificate, reviewed for currency.

**After** (**149 characters, measured from the built `<meta>` tag**)
> In WA it is an owner-builder approval, not a licence, and you lodge Form 75. This WA-specific course
> gives the knowledge the Board accepts, for $179.

> WARNING - Corrected. The first version ran to **171 characters** and this artefact claimed "154", a
> length estimated rather than measured, which would have truncated in the SERP. Caught by reading the
> built meta tag. This is the FOURTH instance in this run of asserting something checkable without
> checking it (see 01-source-map.md sections H and I, and S5 below). Now measured: 149.

**Why.** The old description sells only the course. The recovery cluster (`owner builder licence wa`
644 impr, `owner builder permit wa` 289, `form 75 owner builder` 110, all at ~0% CTR) is asking a
*regulatory* question, and the snippet gave them no reason to prefer ABE over wa.gov.au sitting at
position 3. The new one answers the question in the first clause, names Form 75, and still carries the
price. **The `title` is untouched** — 5.19% CTR at position 3.38 on the primary term is not something
to gamble on a lower-position cluster.

Voice check: Australian English, no em dashes, no "comprehensive", answer-first.

---

## S5 · Quotable answers — NO CHANGE NEEDED (brief's premise was wrong)

The brief assumed the FAQ answers needed rewriting so their first sentence could stand alone for
People Also Ask. **They already do.** Read verbatim from `src/data/faqs-wa.ts`:

> **Is it a licence, a permit, or an approval?**
> "**An approval.** WA issues owner-builder approval, granted by the Building Services Board through
> Building and Energy. …"

> **Is the certificate accepted for my Form 75 owner-builder approval?**
> "**Yes.** WA does not prescribe a specific course. The Building Services Board accepts a WA-specific
> owner-builder course completed within the last two years, plus a White Card, as evidence of
> sufficient knowledge. …"

And the `#licence` capsule opens *"In Western Australia it is an owner-builder approval, granted by the
Building Services Board through Building and Energy."* All three are complete, liftable answers whose
question wording already matches the queries verbatim.

**No edit made.** Writing one would have been change for its own sake on a live page.

**This is the third time in this run that a finding assumed a deficiency without checking it** (see
`01-source-map.md` §H and §I). The first two reached a *proposal*; this one was caught before any edit.
The pattern is now the run's most consistent signal and is logged as `mistakes-log` #18.

---

## S6 · Perth locality — ADDED

`owner builder course perth` carries 570 impressions at position 4.36, and `Perth` appeared **zero
times** across the page, the FAQ and the module data. One natural sentence added to `#course`:

> "The course is online, so you can do it from anywhere in the state, Perth or regional WA, and the
> same Form 75 process applies wherever you build."

It states something true and useful (delivery reach, uniform process) rather than placing a keyword.
**No locality section or page** — that would cannibalise the canonical page for the same intent.

---

## S7 · DEFECT FOUND AND FIXED — review date inconsistency (introduced by this run)

The review date was updated to 20 June 2026 in three places in the MDX earlier this session **and
shipped**, but `src/data/faqs-wa.ts` still read *"independently reviewed for currency on 4 June 2026"*.
The live page therefore contradicted itself on the date of its own currency review.

**Cause:** the date was changed where it was *known* to appear rather than everywhere it *does* appear;
no repo-wide grep was run before committing. Same family as #18 — acting on a partial view of the
surface.

**Fixed:** all four occurrences now read 20 June 2026 (verified by repo-wide grep across `.mdx`, `.ts`,
`.astro`).

**Standing note:** 20 June still precedes the "Course v2.0, 27 Jun 2026" module label by seven days.
Left as-is on Andrey's instruction; flagged, not reconciled.

---

## 4a · Cold reread

| Item | Check | Result |
|---|---|---|
| S4 meta | Answers the regulatory question in the first clause; price retained; **149 chars, measured from dist** | ✅ |
| S4 risk | `title` unchanged, so the primary term's 5.19% CTR is not exposed | ✅ |
| S5 | Verified against the source file before editing; no edit warranted | ✅ |
| S6 | One true sentence, no keyword stuffing, no new section | ✅ |
| S7 | Repo-wide grep confirms four consistent occurrences | ✅ |
| Voice | Australian English, no em dashes in new copy, no "comprehensive" | ✅ |
| Authority | No new regulatory claim made; approval/licence language unchanged and correct | ✅ |
| Sources | No new government fact introduced, so no new VerifiedSources needed | ✅ |

**Net Stage 4 output: two content changes (S4, S6), one defect fix (S7), one brief correctly abandoned
after checking (S5).**
