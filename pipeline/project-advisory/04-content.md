# 04 · Extended content — `/project-advisory`

Written one section at a time from `03-briefs.md`. No `{placeholder}` figures: nothing on this page
is computed by the layout.

**Capsules are in the `**Answer capsule** (N words)` + blockquote form that `check-pipeline.mjs:160`
actually parses.** The `/owner-builder-insurance` run used `<AnswerCapsule>` JSX here and the check
read zero capsules from the artefact, reporting all seven page capsules as orphans.

---

## H1
The Project Advisory Pack

## Meta title
Project Advisory Pack - Owner Builder Budget & Contract Tools $89

## Meta description
Three downloadable tools for running an owner builder project: an automated budget estimator with
built-in contingency, a contracts calculator, and a written guide. $89, one payment.

---

## Section 1 — What is the Project Advisory Pack?
`id="what"` · marker 01

**Answer capsule** (47 words)

> Three downloadable tools for the money side of an owner builder project: an automated budget
> estimator, a contracts calculator, and a written guide to running the build. It is not a course and
> it is not required by any regulator. One payment of $89.00, yours to keep.

Body: it arrives as files you download, not a login or a schedule. Most people buy it once they have
their approval and are about to start pricing trades, which is the point at which a budget stops
being a rough number and starts being a set of commitments.

FactGrid, four cells:
- Price / **$89.00** / One payment, GST-free. Nothing recurring.
- Format / **Download** / Excel files and a written guide, yours to keep.
- Inside / **3 tools** / Budget estimator, contracts calculator, written guide.
- Required? / **No** / Voluntary. No regulator requires it.

## Section 2 — What is actually in it?
`id="inside"` · marker 02

**Answer capsule** (49 words)

> The pack holds three files. The Project Budget Estimator is an Excel spreadsheet that adds a 20%
> contingency to every trade cost as you enter it. The Project Contracts Calculator follows contract
> values, progress claims and what you still owe. The written guide covers efficiency, contracts and
> scoping trades.

TopicGrid, one card per component:

- **01 · Project Budget Estimator** — An automated Excel spreadsheet. Enter each trade activity and
  what you expect it to cost, and it applies a **20% contingency** as you go rather than leaving you
  to remember it. It holds the quotes you collect, tracks progress claims as they are paid, and shows
  what is still outstanding against each trade.
- **02 · Project Contracts Calculator** — Follows the contract side of the same money: what each
  trade is contracted for, what has been drawn against it, what remains, and what is owing right now.
  This is the part a static budget cannot do, because it changes every time you pay someone.
- **03 · The written guide** — 56 pages. Energy and water efficiency taken past the state minimum
  rating, sustainable design, solar, efficient lighting and air conditioning, and water management
  including pools. It also sets out contract terms in plain English and how to scope a trade so the
  quotes you get back can actually be compared.

## Section 3 — Why not just use a free template?
`id="why-paid"` · marker 03

**Answer capsule** (50 words)

> A free template gives you an estimate. This follows the money: the contingency is applied for you
> rather than left to remember, and the contracts calculator tracks progress claims and what is still
> owed as the build runs. If you only need a one-off estimate, a free spreadsheet will do.

CanCant:

*What the pack does*
- Applies the 20% contingency to every trade cost automatically, so the allowance cannot be forgotten
- Tracks progress claims and outstanding amounts as the build runs, not just at the start
- Explains contract terms in plain English, so you know what you are signing
- Shows how to scope a trade so competing quotes are genuinely comparable

*What a free template leaves to you*
- Knowing that a contingency is needed, and choosing the rate yourself
- Updating the numbers by hand every time a trade is paid
- Working out the contract language on your own, or paying someone to
- Comparing quotes that were written to different scopes

Body: this is a real line, not a sales one. If your build is small and you want a number to take to
the bank, a free spreadsheet is enough and there is no reason to spend $89 on this.

## Section 4 — Who it is for, and who it is not for
`id="who"` · marker 04

**Answer capsule** (47 words)

> It suits an owner builder who is running their own trades, money and contracts on a real project.
> It is not for you if a licensed builder is handling the budget and the trade contracts. No
> regulator requires it, and no owner builder approval depends on it.

Note (caution), the hard rule from `01-source-map.md` §B:

> **This is not part of your owner builder requirement.** Your state's approved course, your White
> Card and your insurances are separate obligations, and none of them is satisfied by anything in
> this pack. It is a set of tools for running the project, bought because you want them.

## Section 5 — What it costs
`id="cost"` · marker 05

**Answer capsule** (48 words)

> $89.00, paid once. There is nothing recurring, no renewal and no subscription. You download the
> files and keep them, so they stay usable across a whole build and any project after it. The price
> is GST-free, and there is no government fee attached to anything in the pack.

PriceCard:
- Project Advisory Pack / Paid once to ABE Education, GST-free / **$89.00**
- Ongoing costs / There are none. No renewal, no subscription / **$0.00**
- Total / What you pay, in full / **$89.00** *(isTotal)*

Foot: The files are yours to keep and use on any project. There is no expiry and nothing to renew.

## Section 6 — Who made it
`id="content-review"` · marker 06

**Answer capsule** (48 words)

> This pack is ABE Education's own product, sold directly rather than through a partner. Dominic
> Ogburn, a licensed NSW builder with more than 40 years in Australian construction, is the developer
> behind the state owner builder courses it sits alongside. ABE Education has trained owner builders
> since 2007.

Body: deliberately short, and deliberately **not** the two-expert review block the course pages
carry. Those pages carry a compliance and currency review because they state government facts that go
stale. This page states none, so importing that language would claim a kind of scrutiny the product
does not need and has not had.

---

## Cold reread (content-craft.md's seven checks)

1. **Fail conditions.** §1 passes (capsule says "not a course" in sentence two). §3 passes (tells a
   reader a free spreadsheet will do). §4 passes (states plainly that no regulator requires it).
2. **Delete test.** Remove Stage 2's "the market wants free" finding and §3 disappears entirely — it
   exists only because of that research. Spent, not decorative.
3. **First-sentence test.** Every capsule opens on the answer, matched to its heading type: "What
   is..." gets a definition, "Why not..." gets the comparison, "Who..." gets the person.
4. **Anywhere test.** No provider boilerplate. The strongest candidate for deletion was "helps you
   save money and ensure your project is a success", lifted from the legacy sales page, and it is cut.
5. **Fact to meaning.** The 20% contingency is stated *and* explained as the thing free templates
   leave to memory. The 56 pages are stated with what is in them, not as a page count alone.
6. **Forbidden carry-overs.** No regulatory claim, no course language, no certificate, no free-bait
   hook, no banned CTA, no "comprehensive", "ABE Education" never bare.
7. **Sources.** No Sources block, and that is correct: zero government facts. The one number that
   could be checked against reality is "56 pages", and its provenance is flagged in
   `01-source-map.md` §D rather than dressed as a verified figure.
