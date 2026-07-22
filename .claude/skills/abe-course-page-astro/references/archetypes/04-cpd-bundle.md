# Archetype 4 — CPD bundle

A packaged set of CPD courses sold to discharge a whole cycle's obligation. The reader is doing
arithmetic, not evaluating courses.

**Build shape (revised 23 July 2026 — supersedes the hub-variant reading).** A bundle is its own
collection, `cpdBundles`, rendered by `CpdBundleLayout` from a per-page route stub. It is **not** a
hub variant: a hub indexes pages, and this one is the product, sold at a price, at
`/cpd-{category}-{state}` — `/cpd-building-tas`, `/cpd-plumbing-tas`, `/cpd-electrical-tas`. The
earlier `/cpd-bundles` and `/cpd-bundles-tas` pages were dropped from the IA.

**Do not add it to `src/pages/[slug]/index.astro`.** Two layouts behind one page file pull both
component graphs into the same Rollup entry, which previously leaked scoped stylesheets across
pages — see the note in `owner-builder-courses.astro`. Use a route stub per bundle.

**The points figure is DERIVED and must never be authored.** `CpdBundleLayout` counts it from
`kb/register/cpd/tas-courses.json` — courses with `status: 'live'` only, capped at 12 — via
`scripts/lib/cpd-derive.mjs`. The `cpdBundles` schema has no `points` field on purpose. Expired and
refused courses stay tagged to their bundles in the source register, so an unfiltered count
overstates every one of them; that is how the Electrical bundle advertised 12 points for three
months after one of its courses had expired.

The separate `cpd.bundle` object inside a *course* entry is a different thing — a cross-sell block
on a single course page, not this page.

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
- **Resolving an unknown in the direction that favours the sale.** Where a figure the coverage claim
  depends on cannot be computed, **the claim in the H1, the meta title, the meta description and the
  hero is capped at what is verifiable.** A page that states a cap in its body while claiming full coverage
  in its headline has resolved its own ambiguity toward the purchase. A code path that renders
  nothing when a figure is `null` is a claim by omission: the honest output for an unknown is to say
  it is unknown, in the place the claim is made.

## 5 · Schema and frontmatter

`Course` + `offers` + `BreadcrumbList`, with the member courses as `hasPart`. A bundle **is** a
purchasable course here, unlike a hub, so the `Course` node is correct and the offer is real.
`offers.price` must equal the on-page price. `hasPart` is built from the live member list, so it
cannot drift from the points figure — both are counted from the same filtered set.

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

---

## Worked example of the rule above, and its opposite

This rule came from `/cpd-building-tas`, where it was applied and then **had to be unwound**, which
is the more useful half of the lesson.

The page capped every coverage claim because the register said CBOS limits WHS points to four a
year and the classification needed to compute the split was missing. Correct behaviour on the facts
as known. But the register entry was **false** — the Occupational Licensing (CPD) Determination 2018
caps delivery channels, not subjects, and endorsed online courses carry no annual cap at all. The
claims were then restored.

**Two things to take from it.**

1. **Capping an unknown is right, and it is not free.** The capped page told a buyer their safety
   points might not count when they counted in full. Erring toward caution is still erring when the
   underlying fact is wrong.
2. **Before a regulatory fact justifies a whole section, read it at source.** The cap was not merely
   unverified — it was contradicted by the instrument, and nobody had opened the instrument. A claim
   that earns its own section, caps a headline, or drives a build check has become load-bearing, and
   load-bearing claims get read at the primary source regardless of what the register's cadence says.
