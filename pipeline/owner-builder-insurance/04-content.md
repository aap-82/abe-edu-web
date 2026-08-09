# 04 · Extended content — `/owner-builder-insurance`

Written one section at a time from `03-briefs.md`. Derived figures (none on this page — no
`{placeholder}` needed; every figure here is a fixed regulatory fact, not something the layout
computes) are written as literals since there is nothing for the layout to derive.

> **Superseded in part, 8 August 2026 — read the built page for the copy that shipped.**
> `src/pages/owner-builder-insurance.astro` is the source of truth for this page's wording; this
> file records how it was arrived at. Stage 7's independent audit changed six things after this
> draft was written, and they are listed here rather than silently re-edited into the prose below,
> so the reason each one changed stays readable:
> 1. **Section 5's WA "$10,000 fine" and ACT "rectification order after sale" were cut**, not
>    reworded. Both were added after this draft, neither had a row in `01-source-map.md` §C, and
>    the WA source read for this run explicitly declines to state an owner-builder penalty. A
>    `VerifiedSources` block now closes section 5, which previously had none.
> 2. **Capsule 2 gained the Tasmanian $5 million qualifier** it had dropped — it is the only
>    mandatory insurance named anywhere on the page, so ending on "no scheme at all" understated it.
> 3. **Capsule 7 now opens with Warwick Smith by name**, answering the "Who" its H2 asks rather
>    than opening on process.
> 4. **Section 7's `VerifiedSources` `facts` string was rewritten** — it named Warwick Smith and
>    listed Warwick Smith as its only source, so the component's conditional joiner rendered
>    "...training sector against Warwick Smith".
> 5. **"close to 20 years" became "close to twenty years"** in the section 6 body, matching the
>    capsule 120 words above it and CLAUDE.md's spell-out-durations-in-prose rule.
> 6. **Section 7's H2 is "Who reviews this page?"**, not "Who checks this page?".

---

## H1
Owner builder insurance: what's actually compulsory, by state

## Section 1 — What insurance does an owner builder actually need?
`id="what-you-need"` · marker `01`

**Answer capsule** (48 words)

> An owner builder normally deals with three covers: contract works insurance and public liability
> insurance, both sensible from the day work starts, and home warranty or indemnity insurance, the
> only one of the three that is ever a legal requirement, and only in some states and some
> circumstances.

Contract works insurance covers the build itself against fire, storm, theft and accidental damage
while it's underway. Public liability covers you if the build injures someone or damages someone
else's property. Neither is a government mandate in most states — Tasmania is the exception, where a
minimum $5 million of public and construction liability cover is a condition of the owner-builder
permit itself. Either way, both are the kind of cover no one should start a build without.

Home warranty or indemnity insurance is different. It protects a *future buyer* of the property
against defective or incomplete work, and whether an owner builder needs it — or can even get it —
depends entirely on which state the build is in. The next section answers that state by state.

## Section 2 — Is home warranty/indemnity insurance compulsory for an owner builder?
`id="compulsory"` · marker `02`

**Answer capsule** (57 words)

> No home warranty scheme in any state ABE Education serves requires an owner builder to insure
> their own labour. Queensland and the ACT exclude owner builders by law, Western Australia and
> New South Wales attach an obligation only if you sell, and Tasmania has no scheme at all, though
> it does require $5 million of liability cover.

That's worth stating plainly, because it isn't what most insurance pages imply. A page selling cover
has no reason to tell a reader they might not need to buy it — this one does, because ABE refers
rather than sells.

| State | Warranty/indemnity cover compulsory? | What actually applies |
|---|---|---|
| Queensland | No | Owner builders are excluded from the Queensland Home Warranty Scheme by law. |
| Western Australia | Only if you plan to sell within 7 years | Home indemnity insurance is required before settlement if you sell within 7 years of the building permit being granted, for work valued over $20,000. |
| Australian Capital Territory | No | The ACT's statutory warranty — the same one the $12,000 threshold triggers for licensed builders — expressly excludes work carried out by a licensed owner-builder. |
| Tasmania | No warranty scheme — but liability cover is mandatory | No home warranty scheme exists in Tasmania. Separately, at least $5 million public/construction liability insurance is a permit condition from day one — not optional, and not the same kind of cover. |
| New South Wales | Not for your own labour | You're not required to hold Home Building Compensation cover for work you do yourself, though a consumer-warning disclosure applies if you sell within 7 years and 6 months of your permit, and any trade you contract must hold cover for work over $20,000. |

<Note variant="caution">
The New South Wales figures above, and Tasmania's $5 million liability figure, are corroborated by
search results citing the primary regulator rather than a direct read of the source document itself
— both the SIRA page and the CBOS PDF returned an access error on this check. Treat those two
figures as reliable but not yet independently confirmed at source; the Queensland, Western Australian
and ACT figures above were read directly.
</Note>

<VerifiedSources
  date="8 August 2026"
  facts="the compulsory/optional status in every state"
  sources={[
    { label: 'QBCC — About Owner-building', href: 'https://www.qbcc.qld.gov.au/home-owner-hub/owner-build/about-owner-building' },
    { label: 'wa.gov.au — Home indemnity insurance, a reminder about your obligations', href: 'https://www.wa.gov.au/government/announcements/home-indemnity-insurance-reminder-about-your-obligations' },
    { label: 'ACT Planning — Statutory warranties', href: 'https://www.planning.act.gov.au/community/build-or-renovate/before-you-start/building-contracts/statutory-warranties' },
    { label: 'CBOS — Fact Sheet, Owner Builder Work (PDF)', href: 'https://www.cbos.tas.gov.au/__data/assets/pdf_file/0006/404970/Fact-Sheet-Owner-Builder-Work.pdf' },
    { label: 'SIRA — Information for owner-builders', href: 'https://www.sira.nsw.gov.au/home-building-compensation/home-building-compensation-for-homeowners/information-for-owner-builders' },
  ]}
/>

## Section 3 — What does cover include and exclude?
`id="cover"` · marker `03`

**Answer capsule** (46 words)

> Contract works and public liability cover the build and third parties while work is underway.
> Home warranty or indemnity insurance, where it applies, covers a future buyer against your
> defective or incomplete work. It has never covered your own losses, and none of it is
> retrospective.

<CanCant
  canTitle="What these covers protect"
  can={[
    "Contract works cover for fire, storm, theft and accidental damage during the build",
    "Public liability cover if the build injures someone or damages a neighbouring property",
    "A future buyer's claim against defective or incomplete owner-builder work, where a warranty scheme applies",
  ]}
  cantTitle="What they don't cover"
  cant={[
    "Your own financial loss if the build goes over budget or a trade does poor work",
    "Any cover once you've sold to someone who takes the property with full knowledge of the owner-builder history",
    "A replacement for holding the right cover before work starts — none of these are retrospective",
  ]}
/>

## Section 4 — When must cover be in place?
`id="timing"` · marker `04`

**Answer capsule** (48 words)

> Contract works and public liability cover need to be in place before work starts, because
> nothing covers a loss that has already happened. Home warranty or indemnity insurance, where it
> applies, is a resale obligation instead: Western Australia requires it before settlement, New
> South Wales requires a disclosure.

<Note variant="caution">
These are two different clocks. Arranging contract works and public liability cover is urgent from
the day you start; the home warranty timing only matters if and when you decide to sell. Don't let
"I'm not selling any time soon" become a reason to delay the cover you need from day one.
</Note>

## Section 5 — What happens if you don't hold the required cover?
`id="consequences"` · marker `05`

**Answer capsule** (47 words)

> In most of these states the consequence lands at resale rather than during the build. Western
> Australia lets a buyer withdraw before settlement, New South Wales lets a buyer void the
> contract of sale, and Queensland requires written disclosure to a buyer within six years of
> completion.

| State | Stated consequence |
|---|---|
| Western Australia | Fines reported up to $10,000; a purchaser can withdraw before settlement if the insurance isn't provided. |
| New South Wales | A purchaser can void the contract of sale before settlement if the required consumer warning is missing. |
| Queensland | Written disclosure to a prospective buyer is required if selling within 6 years of completion. |
| ACT | No warranty scheme applies, so there is no scheme-based consequence — liability for defective work sits with the owner builder directly either way. |
| Tasmania | No warranty-scheme consequence (none exists), but the $5 million liability cover is checked at permit stage — it isn't something to sort out later. |

## Section 6 — How to arrange cover
`id="arrange"` · marker `06`

**Answer capsule** (42 words)

> Through a licensed broker, not through ABE Education. We are a training provider, not an
> insurer, and we cannot give you insurance advice. What we can do is introduce you to the broker
> our students have used for close to twenty years.

<InsurancePartner
  heading="Cover for your build, through our partner"
  paras={[
    "Contract works and public liability cover are worth arranging before work starts, whatever state you're building in. Home warranty or indemnity insurance, where it applies to you, is worth confirming against the table above before you assume either way.",
    "ABE Education is not a licensed insurance provider. We work with our insurance partner InsuranceTek Pty Ltd, whose principal broker Mark Adams has helped ABE Education students for close to 20 years. We can introduce you for a quote and advice tailored to your project.",
  ]}
  cta={{ href: "#quote", label: "Get an owner builder insurance quote" }}
  imgDesc="An owner-builder home mid-construction, framing up with plans visible on site, a general shot not tied to one state."
  imgSpec="5:4 · warm tone · ~1000×800"
/>

## Section 7 — Sources
`id="content-review"` · marker `07`

**Answer capsule** (49 words)

> Warwick Smith, an independent compliance and currency reviewer, checks this page for regulatory
> currency. Every state position on it is read against the regulator that sets it, and dated.
> Where a figure could not be confirmed at its source, the page says so rather than presenting it
> as settled.

Standard reviewer block (Warwick Smith only — see `01-source-map.md` §D on the authority-model
question) plus a Sources list carrying all seven rows from `01-source-map.md` §B, each with its URL
and 8 August 2026 verified date, and the NSW row's sourcing caveat repeated rather than dropped.

---

## Cold reread (content-craft.md's seven checks, run before Stage 5)

1. **Brief's fail condition** — Section 2 passes: a reader in QLD/ACT/TAS (the three non-compulsory,
   no-condition states) is told plainly they aren't obliged to buy. Section 1 passes: the three-cover
   breakdown makes which is legally required unambiguous.
2. **Delete test on the research finding** — deleting the "no state requires it" framing from Section
   2's capsule would leave a section with nothing distinctive left; it can't be deleted without the
   section collapsing, so it's spent, not decorative.
3. **First-sentence test** — every capsule leads with the answer (No / a definition / a state-by-state
   qualification), matching the heading's question shape per content-craft.md's table.
4. **Anywhere test** — no sentence here is genuric provider boilerplate ("we understand insurance can
   be confusing" was drafted once for Section 1 and cut).
5. **Fact-to-meaning** — every regulatory row in the tables is paired with what it means for the
   reader's next action, not left as a bare figure.
6. **Archetype's forbidden carry-overs** — no enrolment CTA, no recommended level of cover, no
   scare-copy framing on Section 5, NSW caveat kept intact in both Section 2 and Section 7.
7. **Sources** — every state-specific claim traces to a `01-source-map.md` row; nothing stated here
   that isn't in that ledger.
