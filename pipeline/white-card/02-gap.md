# Stage 2 — Competitor keyword / content-gap analysis — `/white-card` hub

## Source order followed
No GSC per-query export exists for this hub (the site-wide export has page-level clicks/impressions
only, already cited in `01-source-map.md`; it cannot break `/white-card`'s 11,227 impressions down by
query — this is the R4 gap `CLAUDE.md` already names). Connector (Neil Patel/SearchFit, AU city-level
via Sydney `locId 1000286`) is therefore the primary demand source for this stage, per the skill's own
fallback order.

## Demand signal

`match_keywords(["white card course"], locId: 1000286)` returned **zero** connector suggestions — the
term is specific enough that the engine has no bulk-suggestion data for it, not that demand is zero
(the broad-match call below shows real volume on close variants).

`match_keywords(["white card"], global, limit 40)` returned a noisy set: the primary term carries
49,500/mo volume, but the suggestion list mixes genuine AU construction-training queries with
unrelated senses (playing cards, credit cards, Pokemon/MTG cards, board games). **Recommendation:
do not target bare "white card" as the hub's primary keyword** — the volume is not addressable AU
construction-training demand, and Google's own SERP for it would not resemble the AU-specific result
below.

Filtered to genuine AU construction-training intent, the state-modifier pattern is the real finding:

| Keyword | Volume/mo | Intent |
|---|---|---|
| white card course | n/a (see above) | generic |
| queensland white card | 5,400 | state-modified |
| white card new south wales | 5,400 | state-modified |
| white card in victoria | 5,400 | state-modified (VIC — not a spoke) |
| white card western australia | 4,400 | state-modified |
| national white card courses brisbane | 3,600 | city-modified (QLD) |
| how to get white card | 3,600 | process/how-to |
| what is white card australia | (in suggestion set, vol not itemised) | definitional |
| nsw white card | (in suggestion set) | state-modified, short form |
| white card course online | (in suggestion set) | delivery-mode intent |
| white card near me | (in suggestion set) | local intent |
| brisbane white card | (in suggestion set) | city-modified |

**Finding: readers genuinely search by state.** Four of the top filtered terms are state-modified
(QLD/NSW/VIC/WA all carry 4,400-5,400/mo each). This is independent confirmation — not an assumption —
that a hub routing by state is the right shape for this query space, before any content is drafted.
No TAS-specific or ACT-specific modifier term surfaced in this pass; noted as a gap in the connector's
own coverage, not evidence those states carry no demand (TAS's own spoke page already carries GSC
history — `/tas-online-white-card`, 35 clicks / 7,873 impressions, cited in `01-source-map.md`).

## SERP analysis — `white card australia` (Sydney locId, 4 Aug 2026)

| Pos | Domain | Page | Type |
|---|---|---|---|
| 1 | safework.nsw.gov.au | White cards | regulator |
| 1 | — | (AI overview) | SERP feature |
| 2 | eot.edu.au | White Card - Construction Induction - Online Course | national training provider |
| 3 | movingtoaustralia.co.nz | White Card Australia \| Courses & Costs | migration/info blog |
| 4 | worksafe.vic.gov.au | Construction induction training (white card) | regulator (VIC) |
| 5 | asqa.gov.au | Construction Induction (White) card | regulator info |
| 6 | australiawhitecard.com.au | White Card Course Australia \| Get Your White Card Online | national training provider |
| 7 | safework.sa.gov.au | White card | regulator (SA) |
| 8 | nationalcourses.edu.au | White Card Course | national training provider |
| 9 | nwcc.edu.au | White Card \| Construction Induction \| 50,000+ Cards Issued | national training provider |
| 10 | tt.edu.au | What is a White Card? | info article |
| local pack | nswwhitecard.com | NSW White Card | local provider |

## Coverage matrix and the gap

Two page types occupy the top 10, and **neither is a state-routing comparison hub**:

1. **Regulator pages** (SafeWork NSW, WorkSafe VIC, ASQA, SafeWork SA) — authoritative on what a white
   card is and each state's own rule, but none compares states side by side or sells/routes to a
   purchase path. Not a competitor ABE can "beat" on content — a hub should cite these, not compete
   with them, which the existing `footerSources` list already does for WA/TAS/NSW/QLD.
2. **National training-provider pages** (eot.edu.au, australiawhitecard.com.au, nationalcourses.edu.au,
   nwcc.edu.au) — sell a white card course generically, "Australia-wide," without surfacing that
   delivery mode genuinely differs by state (self-paced online in WA/TAS vs a live trainer session
   required in NSW/QLD). None publishes a real per-state comparison table (price / delivery mode /
   government fee / RTO). This is the gap: a reader comparing WA against NSW on any of these
   competitor pages cannot see the delivery-mode difference that actually changes what buying the
   course involves, without reading two separate pages and inferring it themselves.

**Gap ABE can win:** a hub that states the delivery-mode split explicitly, up front, before the reader
picks a state, backed by a genuine four-column comparison table. This confirms the archetype-6 (hub)
selection already made for this page — the gap analysis validates it rather than proposing a
different shape.

**Secondary gap:** "how to get white card" (process intent, 3,600/mo) and "what is white card
australia" (definitional intent) are both covered today by `tt.edu.au`'s "What is a White Card?" and
various providers' explainer sections, not by a hub-level page that then routes onward. The FAQ
(`Which state's White Card course do I need?`, `Is my White Card valid in other states once I have
it?`) already answers the definitional/portability doubt; Stage 3 should confirm the process
("how do I actually get one") doubt is answered too, since no existing FAQ question names it directly.

## What this does NOT change
- No new regulatory fact. Every figure in the comparison table still traces to the spoke pages per
  `01-source-map.md` — this stage is demand/competition grounding only, never a `.gov.au` fact.
- Does not reopen the archetype decision (hub, confirmed 4 Aug 2026) — the SERP gap supports it.
