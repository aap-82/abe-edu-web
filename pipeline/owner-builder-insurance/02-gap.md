# 02 · Keyword grounding + competitor gap — `/owner-builder-insurance`

**No GSC export usable** — this is a new URL with no historical ranking data, and the site-wide
export cannot isolate demand for a page that doesn't exist yet. Neil Patel connector used as the
primary demand layer per Stage 2's own instruction ("run whether or not a GSC export exists").
AU is city-level only; queried Brisbane (QLD, `locId 1000339`) as the primary triangulation point,
since QLD is where the compulsory/optional distinction is sharpest (owner builders statutorily
excluded from a scheme that visibly exists) and where ABE already has the deepest owner-builder
presence.

## A · Keyword volumes (Brisbane-normalised — relative priority, not national volume)

| Keyword | Volume | CPC | SD | Read |
|---|---|---|---|---|
| owner builder insurance | 50/mo | $20.22 | 31 | **Primary keyword.** Real commercial intent (high CPC for 50/mo volume) — brokers are bidding on this. |
| owner builder construction insurance | 10/mo | $24.28 | 24 | Secondary — contract-works angle |
| owner builder warranty insurance | 10/mo | $13.46 | 14 | Secondary — the compulsory/optional question, almost verbatim |
| owner builder public liability insurance | 10/mo | $0 | 31 | Long-tail, no ad competition |
| qbcc owner builder insurance | 10/mo | — | — | QLD-specific long-tail — confirms QBCC exclusion is a live search behind this query |
| hbcf owner builder | 10/mo | — | — | NSW-specific long-tail — confirms the NSW HBCF question (§E of `01-source-map.md`) is a real, searched question, not a research tangent |
| owner builder home warranty insurance / owner builder indemnity insurance | 10/mo each | — | — | Both point at the same compulsory-status question from different wording |

**Read:** low absolute volume, real commercial intent, and — notably — several state-specific
long-tails (`qbcc owner builder insurance`, `hbcf owner builder`, `owner builder warranty insurance
victoria`) confirming readers are searching *per state*, not just generically. A page that answers
per-state, in one place, serves a query pattern no single-state broker page does.

## B · SERP composition (Brisbane, "owner builder insurance")

| Position | Domain | Type |
|---|---|---|
| 1 | coverforce.com.au | insurance broker — sells cover |
| 2 | buildsafe.com.au | insurance broker — sells cover |
| 3 | **nsw.gov.au** | government — process page |
| 4 | consumer.vic.gov.au | government — VIC (ABE has no VIC product; informational only) |
| 5 | aobis.com.au | insurance broker |
| 6 | ownerbuildercentre.com.au | insurance broker |
| 7 | clearlakeinsurance.com.au | insurance broker |
| 8 | **qbcc.qld.gov.au** | government — the exact source in `01-source-map.md` S1 |
| 9 | constructionlawyerbrisbane.com.au | legal content |
| 10 | reddit.com (r/AusRenovation) | forum thread titled "Owner builder NSW - insurance requirements" |

**Read:** the SERP is a genuine mix of broker sales pages and single-state government pages — nothing
multi-state, nothing that answers "is it even compulsory" up front. A Reddit thread ranking at #10
for an insurance-requirements question is itself a gap signal: real searchers are unsatisfied enough
with the broker/gov results to ask a forum.

## C · Competitor coverage matrix (top two organic, headings fetched)

| Topic | Coverforce (#1) | BuildSafe (#2) | ABE gap? |
|---|---|---|---|
| "Is this even compulsory in my state?" | Not asked — assumes the reader is buying | Not asked — assumes the reader is buying | **Yes — the whole page** |
| Coverage / exclusions | Yes, product-feature framing (tool cover, liability tiers) | Yes, product-feature framing | ABE frames exclusions as reader-risk ("the gap people assume is covered"), not a feature list |
| State-by-state comparison | No — single national product | No — single national product | **Yes** |
| Timing (when it must be in place) | Implied via "12-month standard coverage" | Not addressed | **Yes — explicit timing section, archetype 9 §3** |
| Consequences of not holding it | Not addressed (they're selling cover, not explaining absence) | Not addressed | **Yes** |
| Referral/commission disclosure | No — they are the insurer/broker, not a referrer | No | N/A — ABE's disclosure obligation is different in kind, not a gap to fill from competitors |

**Distinctive material for Stage 3:** every competitor on this SERP sells insurance and therefore has
a structural reason never to tell a reader "you don't need this." ABE refers rather than sells, so it
is the only page on this SERP that can say so — and, per §A of `01-source-map.md`, saying so is
*true* in every state ABE serves. That is the section-3 "distinctive material" for the compulsory/
optional section, almost verbatim from archetype 9's own worked example.

## Primary + secondary keywords (for Stage 3)

- **Primary:** owner builder insurance
- **Secondary:** owner builder warranty insurance, owner builder construction insurance, owner
  builder public liability insurance, plus the four state-specific long-tails as FAQ material
  (qbcc owner builder insurance, hbcf owner builder, home indemnity insurance, owner builder home
  warranty insurance).
