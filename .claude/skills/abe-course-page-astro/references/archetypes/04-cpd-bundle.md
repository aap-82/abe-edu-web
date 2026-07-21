# Archetype 4 — CPD bundle

A packaged set of CPD courses sold to discharge a whole cycle's obligation. The reader is doing
arithmetic, not evaluating courses.

**Build shape (confirmed against the W4 plan).** `/cpd-bundles` is a **hub collection entry**, not a
course. So this archetype is a hub variant: it uses the hub schema and `HubLayout`, and its spokes are
typed references to the CPD course entries. The separate `cpd.bundle` object inside a course entry is
a different thing — a cross-sell block on a single course page, not this page. Read `06-hub.md`
alongside this file for the routing mechanics; this file governs the copy.

## 1 · Reader and arrival state

A licensed practitioner with a cycle closing and a shortfall. They have often already done some CPD
and need to close a gap of a known size.

**Already settled:** the obligation, the deadline, that they will buy something.

**Actually unresolved:** does this bundle cover my whole obligation, does the category mix satisfy the
rules, what does it cost per point, how long will the lot take, and can I do it in the time left.

**The fear is buying a bundle that still leaves them short** — on points or on a required category.

## 2 · Decision order

1. **What does the bundle total?** — points, categories, hours, price. One glance.
2. **Does that discharge my obligation?** — mapped against the requirement, by licence class.
3. **What is in it?** — the course list, scannable.
4. **Value against buying separately.** — honest arithmetic.
5. **Time to complete the lot.**
6. **Act.**
7. **Proof, sources, FAQ.**

## 3 · Required sections

| Section | Why |
|---|---|
| Bundle totals | Points, category split, hours, price. The reason they are here. |
| Obligation mapping | Totals set against the actual requirement, by licence class and jurisdiction. |
| Course list | Each course, its points, its category. |
| Value comparison | Bundle price against the sum of individual prices. State it honestly or omit it. |
| Total time | Realistic, ideally measured from platform data. |
| Who developed and reviewed | Named, dated. |
| Sources | The requirement being discharged. |

## 4 · Forbidden carry-overs

- **Selling each course individually.** They have already decided to buy a set; re-selling components
  slows the arithmetic.
- **Inflated value claims.** Overstated savings are checkable in one click across your own site.
- **Manufactured urgency.** The cycle deadline is real. Use it plainly and add nothing.
- **Implying the bundle satisfies an obligation it only partly satisfies.** State the shortfall.

## 5 · Schema and frontmatter

Hub schema: `BreadcrumbList` + `ItemList` over the spoke courses. **No `Course` node** — a hub is
never a Course itself, and the guardrails only require `BreadcrumbList` on a page with no
`data-authority` attribute. Price and points come from the referenced course entries rather than
being copied, so they cannot drift.

## 6 · Component defaults

FactGrid for totals. A table for the course list with per-course points and category. BundleOffer for
the value line. CpdMatrix where industry x state availability varies.

## 7 · Worked section brief

```
Section: What this bundle covers
Position: 1
Claim: [N] points across [category split], for [price], completed in about
       [hours].
Reader arrives: with a known shortfall, doing subtraction.
Objection defused: "Will this actually finish my cycle or leave me short?"
Facts: [points per course — internal, confirmed]
       [category assignments — verified]
       [requirement being discharged — .gov.au source + date]
Distinctive material (Stage 2): competitors sell bundles without stating the
       category split, which is what practitioners are audited on. Leading with
       the split is the gap.
Carrier: FactGrid + table + VerifiedSources
Fails if: a reader cannot subtract this from their obligation in one read.
```

## 8 · Worked copy

Written from the brief above. All figures are placeholders.

> ### What this bundle covers
>
> [N] points across [category split], for [price], completed in about [hours].
>
> That is [X] points of [category A] and [Y] of [category B]. If your requirement is [total] points
> per cycle, this bundle covers [all of it / all but Z points], and the shortfall is in [category].
>
> Bought separately the same courses come to [sum]. The bundle is [difference] less and you enrol once
> rather than [count] times.
>
> ✓ VERIFIED · 🔗 SOURCES — [regulator] CPD requirements. Verified [date].

**What to notice.** The reader is doing subtraction, so the copy does the subtraction for them and
names the shortfall rather than implying full coverage. Stating "all but Z points" where that is true
is the difference between a bundle a practitioner trusts and one they check twice.

The value comparison is a plain sum. Anything overstated here is checkable in one click across your
own site, so honest arithmetic or none at all.

**Do not transfer.** This is not a place to re-sell the component courses. The purchase decision was
made before arrival; slowing it with individual course merits works against the reader.
