# Keyword Research Module
**For ABE Education SEO Content Engine**

Two operating modes. **Mode B is the default** — search volume, SEO difficulty, CPC and SERP data are pulled live from the Neil Patel connector (Ubersuggest engine) as you work, so no manual export is required. **Mode A** (qualitative, no numbers) is the fallback for when the connector is unavailable. A user-supplied CSV export no longer *triggers* Mode B — it *supplements* the live data with ABE's own Search Console impressions/clicks.

---

## Table of Contents

1. When to trigger
2. Mode A — Qualitative SERP Research (Fallback)
3. Mode B — Data-Enriched Research (Default)
4. Seed Generation
5. Keyword Expansion
6. Intent Classification
7. Clustering and Deduplication
8. State-Variant Mapping
9. Cannibalisation Check
10. Primary/Secondary Assignment
11. Prioritisation Framework
12. Output: Keyword Map
13. ABE-Specific Patterns
14. Maintenance and Review Cycle

---

## 1. When to trigger

| User says or provides | Action |
|---|---|
| "What keywords should I target for [topic]?" | Full keyword research (start at Section 4) |
| "Help me plan a page for [topic]" with no keyword list | Full keyword research before content |
| Topic only (no keywords, no competitors) | Seed generation → expansion → clustering → map |
| Competitor URLs but no keywords | Competitor extraction feeds into expansion (Section 5) |
| Keyword list provided | Skip to Section 7 (clustering) — validate and organise what they gave you |
| GSC/Ahrefs/SEMrush CSV provided | Mode B is already the default (live connector) — import the CSV as a *supplement* (adds ABE's actual GSC impressions/clicks), then run from Section 7 |
| "Which pages should I build next?" | Full research across multiple topics → prioritised build order |

**Do not auto-run keyword research when the user provides a keyword list.** Accept their keywords, validate against cannibalisation rules, and move to content. Offer research only if their list looks thin or has obvious gaps.

**Default data source:** unless the connector is down, all of the above run in **Mode B** — query the Neil Patel connector live for volume/difficulty/CPC as you work the sub-steps. Mode A is the fallback only. See Section 3 for the connector tool map and caveats.

---

## 2. Mode A — Qualitative SERP Research (Fallback)

Uses only the general tools available in the skill: `web_search`, `web_fetch`, Google Drive, Notion. **Use this only when the Neil Patel connector is unavailable** — Mode B (Section 3) is the default.

**What you get:**
- Candidate keyword list from autocomplete, PAA, and competitor headings
- Intent classification per keyword
- Topic clusters
- Cannibalisation flags
- Prioritisation by intent match, AIO potential, and ABE authority

**What you don't get:**
- Search volume numbers
- Keyword difficulty scores
- Click-through rate estimates
- Backlink authority metrics

**When to use:** Only when the connector can't be reached. When you fall back to Mode A, note in the build output that keyword data is **qualitative (no live volume)**, and do **not** invent volume/difficulty numbers.

---

## 3. Mode B — Data-Enriched Research (Default)

Search volume, SEO difficulty (`sd`), CPC, SERP composition, competitor keywords and rank data are queried **live from the Neil Patel connector (Ubersuggest engine)** as you work — no manual export required. This is the default whenever the connector is available.

**What you get live:**
- Search volume and SEO difficulty (`sd`) per keyword — `keyword_overview`, `keyword_metrics`
- CPC and commercial-value signals — `keyword_overview`
- SERP composition and CTR estimates — `serp_analysis`, `estimate_serp_clicks`
- Competitor keywords and top pages — `competitors`, `domain_keywords`, `domain_top_pages`
- ABE's own ranking keywords for the cannibalisation gate — `domain_keywords` (abeeducation.edu.au), `page_keywords`

### Connector tool map (per sub-step)

| Sub-step (section) | Connector tool(s) |
|---|---|
| Seed generation (§4) | `keyword_suggestions`, `google_suggestions` (+ Page Identity Card seeds) |
| Expansion (§5) | `keyword_suggestions` (questions/prepositions/comparisons), `content_ideas` |
| Intent classification (§6) | `keyword_overview` `searchIntent` where present, else classify manually |
| Clustering (§7) | `match_keywords` to group same-page terms |
| State-variant mapping (§8) | `keyword_overview` across capital-city `locId`s; compare per-state demand |
| Cannibalisation check (§9) | `serp_analysis` + `domain_keywords` (abeeducation.edu.au) + `page_keywords` per URL |
| Primary/secondary (§10) | volume + SEO difficulty (`sd`) — bulk from `keyword_suggestions` / `match_keywords`; `keyword_overview` only for trend on key terms |
| Prioritisation (§11) | score = volume ÷ difficulty, weighted by `traffic_value`; rank build order |

Tool names are the short forms; the MCP server prefix is environment-specific, so don't hardcode the UUID.

**Tool ordering & limits.** `keyword_overview` is rate-limited — roughly **3 reports/day** on the current tier, and returns HTTP 403 once the cap is hit. So **lead with `keyword_suggestions` and `match_keywords`**: both return volume, SEO difficulty (`sd`) and CPC in bulk from a single call, which covers most of a keyword map (the searched seed plus dozens of expansions). Reserve `keyword_overview` for the 2-3 keywords you most need month-by-month trend data on (`monthly_searches`). `domain_keywords` may require per-call approval — if it's refused, fall back to `site:abeeducation.edu.au [keyword]` for the cannibalisation check (Section 9). And note `location_suggest` can be fussy with over-specified queries — search the bare city name ("Perth"), not "Perth Western Australia".

### Hard caveats

1. **Australian locations are city-level only** — there is no national `locId`. Use `location_suggest` to get capital-city IDs (e.g. Perth 1000676, Brisbane 1000339) and triangulate across Brisbane/Sydney/Melbourne/Perth/Hobart for a national-ish read. Treat figures as **relative priority**; never quote a single city's number as the national volume.
2. **Modelled volume, not actual traffic.** For pages ABE already ranks for, GSC/Search Console remains the source of truth for actual demand. The connector's value is the demand ABE does **not** yet rank for — the gap a GSC export cannot show. Never present modelled volume as actual traffic.
3. **No regulatory facts.** The connector never sources fees, Act IDs, regulator names, eligibility, or penalties — those stay `.gov.au`-verified and remain the publish hard blocker. The connector supplies demand/competition data only.

### CSV supplement (optional)

A user-supplied CSV export no longer *triggers* Mode B — it *supplements* the live connector data. Its main value is ABE's **actual** Search Console performance (impressions, clicks, current position), which the connector's modelled figures can't provide.

Accepted exports:
- Google Search Console (Performance → Queries)
- Google Keyword Planner
- Ahrefs Keywords Explorer
- SEMrush Keyword Magic Tool
- Any other tool with columns for keyword, volume, difficulty, CTR, or position

**Import workflow:**
1. Read the CSV — identify column names (tools use different headers)
2. Normalise to a standard format:

| Column | Maps from |
|---|---|
| `keyword` | Query (GSC), Keyword (Ahrefs/SEMrush/Planner) |
| `volume` | Avg. monthly searches (Planner), Volume (Ahrefs/SEMrush) |
| `difficulty` | KD (Ahrefs), KD% (SEMrush), Competition (Planner) |
| `position` | Average position (GSC) |
| `clicks` | Clicks (GSC) |
| `impressions` | Impressions (GSC) |
| `ctr` | CTR (GSC) |

3. Flag any missing columns — the module works with partial data
4. Merge with the live connector results — where both exist, GSC **actuals** override modelled volume (GSC is the truth for what ABE already ranks for)
5. Run from Section 7 with the enriched data

**GSC-specific bonus:** GSC data shows what ABE already ranks for. Keywords with impressions but low CTR or position 8–20 are quick-win candidates (see Section 11).

---

## 4. Seed Generation

Seeds come from three sources. Combine all three before expanding. In Mode B, run the combined seed list through `keyword_suggestions` and `google_suggestions` to widen it before expansion.

### 4a. Page Identity Card seeds

Extract from the Page Identity Card (Step 0 output):

| PIC field | Seeds generated |
|---|---|
| Course type | `[course type]`, `[course type] course`, `[course type] training` |
| State | `[course type] [state]`, `[course type] [state abbreviation]` |
| Audience | `[audience] [course type]` (e.g., "owner builder course", "construction worker white card") |
| Provider pathway | RTO courses: `[course type] accredited`, `[course type] RTO`; State-approved: `[course type] approved`, `[course type] licence` |
| Delivery method | `[course type] online`, `[course type] [delivery method]` |

### 4b. Known ABE patterns

ABE's courses follow predictable search patterns. Use these seed templates:

**White Card:**
```
white card [state]
white card course [state]
white card online [state]
white card training [state]
how to get a white card [state]
white card cost [state]
white card requirements [state]
```

**Owner Builder:**
```
owner builder [state]
owner builder course [state]
owner builder licence [state]
owner builder permit [state]
how to become an owner builder [state]
owner builder insurance [state]
owner builder requirements [state]
```

**CPD:**
```
cpd courses [industry] [state]
cpd points [industry] [state]
[industry] cpd online
continuing professional development [industry] [state]
```

### 4c. User-provided seeds

If the user mentions specific terms, topics, or questions their students ask, add these directly to the seed list. Real customer language is high-value.

---

## 5. Keyword Expansion

Run each seed through these four expansion methods. Collect all results into a raw candidate list. In Mode B, `keyword_suggestions` (questions / prepositions / comparisons) and `content_ideas` do most of this expansion directly; the methods below still apply for the qualitative signals the connector doesn't surface (PAA, competitor headings).

### 5a. Autocomplete mining

For each seed, run `web_search` queries and note the autocomplete-style results:

```
web_search: "[seed]"              → note top results, related searches
web_search: "[seed] how"          → informational variants
web_search: "[seed] cost"         → commercial variants  
web_search: "[seed] vs"           → comparison variants
web_search: "[seed] requirements" → eligibility variants
web_search: "[seed] online"       → delivery variants
```

Extract from search results:
- Page titles (H1 patterns)
- Related searches shown at the bottom
- Any "People also search for" suggestions

In Mode B, `google_suggestions` returns this autocomplete layer directly for each seed.

### 5b. People Also Ask (PAA) extraction

For each seed, look for PAA boxes in search results. These are gold for:
- FAQ section headings
- AI Overview citation targets
- Long-tail keyword discovery

Record each PAA question exactly as Google phrases it — these are proven search queries.

### 5c. Competitor heading extraction

If competitor URLs are available (from Step 2 or user-provided):
1. Fetch each competitor page with `web_fetch`
2. Extract all H1, H2, H3 headings
3. Extract FAQ questions
4. Note any topics they cover that the seed list doesn't

This feeds into the existing Keyword Gap Analysis module in Step 2. In Mode B, `domain_keywords` and `domain_top_pages` on a competitor domain surface the terms and pages they actually rank for, which complements raw heading extraction.

### 5d. Regulatory term expansion

For ABE's regulated courses, expand into official terminology:

| Informal term | Regulatory equivalents to check |
|---|---|
| white card | general construction induction card, GIC, CPCWHS1001 |
| owner builder | owner-builder, owner builder permit, owner builder licence |
| cpd | continuing professional development, CPD points, CPD hours |
| licence | license (US spelling appears in searches), permit, registration |

Check both the informal and regulatory terms — searchers use a mix.

---

## 6. Intent Classification

Classify every candidate keyword using this four-type model:

| Intent | Signal words | ABE page type | Priority |
|---|---|---|---|
| **Transactional** | buy, enrol, register, sign up, book, cost, price, how much | Course landing page | 🔴 Highest — direct revenue |
| **Commercial investigation** | best, compare, vs, review, which, top, cheapest | Hub page, comparison page | 🟠 High — pre-purchase |
| **Informational** | how to, what is, do I need, requirements, guide, explained | FAQ section, blog, hub page | 🟡 Medium — awareness |
| **Navigational** | ABE education, [specific course name], login, my account | Homepage, branded page | 🟢 Low — already know us |

**Connector signal (Mode B):** the connector *can* return a `searchIntent` value (`keyword_overview`, or `keyword_metrics` with `metric: search_intent`), but in practice it comes back **null for most AU course terms**. So treat manual classification — the ABE-specific rules and SERP check below — as the **norm**, and use `searchIntent` only as confirmation on the rare occasions it's populated. Do not wait on it or assume it will be present.

**ABE-specific intent rules:**
- "Owner builder course [state]" = transactional (they want to enrol)
- "How to become an owner builder [state]" = informational → commercial (they're researching, then may enrol)
- "Owner builder licence [state]" = ambiguous — could be informational (what is it?) or transactional (how do I get it?). Check SERP: if course pages rank, treat as commercial.
- "White card [state]" = transactional (overwhelmingly purchase-intent based on SERP results)

**SERP intent verification:** When intent is ambiguous, run `web_search` (or `serp_analysis` in Mode B) and check what Google ranks:
- Course/product pages dominating = transactional
- Blog posts and guides dominating = informational
- Mix = commercial investigation
- Brand pages dominating = navigational

---

## 7. Clustering and Deduplication

### 7a. Remove duplicates

Deduplicate the raw candidate list:
- Exact duplicates (same phrase)
- Near-duplicates (singular/plural: "white card course" / "white card courses")
- Spelling variants ("licence" / "license") — keep the Australian spelling as primary, note the variant

### 7b. Cluster by topic

Group keywords that would be served by the same page. A cluster = one page target.

**Connector assist (Mode B):** `match_keywords` groups seed terms by similarity — use it to surface same-page candidates quickly, then apply the clustering rules below to finalise the page targets.

**Clustering rules:**
1. Keywords with the same core topic + same state = one cluster
2. Keywords with the same core topic + different states = separate clusters (one per state page)
3. Broad keywords (no state) = hub page cluster
4. Long-tail questions about a topic = FAQ section within the cluster's page, not separate pages

**Example cluster:**
```
Cluster: Owner Builder Course ACT
├── owner builder course act              [transactional — primary candidate]
├── owner builder course canberra         [transactional — secondary]
├── act owner builder licence             [commercial — secondary]
├── how to become an owner builder act    [informational — H2/FAQ]
├── owner builder course cost act         [transactional — pricing section]
├── owner builder requirements act        [informational — eligibility section]
└── owner builder act online              [transactional — delivery section]
```

### 7c. Identify thin clusters

A cluster with only 1–2 keywords may not justify a standalone page. Options:
- Merge into a parent hub page
- Hold for later when more keywords emerge
- Flag as satellite content opportunity (blog post, FAQ expansion)

Minimum viable cluster: 3+ keywords with at least one transactional or commercial term.

---

## 8. State-Variant Mapping

ABE operates across multiple states. Every keyword needs a state-variant decision.

### Decision matrix

| Keyword pattern | State variants needed? | Why |
|---|---|---|
| `[course] [state]` | ✅ Yes — one page per active state | Different regulators, fees, legislation per state |
| `[course] online` | ❌ No — one national page or hub | Delivery method is the same regardless of state |
| `[course] cost` | ✅ Yes — if fees differ by state | Government fees vary; training fees may not |
| `[course] requirements` | ✅ Yes | Eligibility rules differ by state |
| `how to get a [course]` | ✅ Yes | Process differs by state |
| `[course] vs [other course]` | ❌ No — one national page | Comparison is course-level, not state-level |
| `cpd points [industry] [state]` | ✅ Yes | CPD requirements are state-regulated |

### Active states for each course type

Check the Page Identity Card and `references/page-type-engine.md` for which states ABE currently serves for each course. Don't generate state variants for states ABE doesn't operate in.

### Connector data is city-level (AU caveat)

The Neil Patel connector has **no national `locId`** for Australia — modelled volume is only available per capital city. When you pull per-state demand to inform state-variant decisions:
- Use `location_suggest` to get the capital-city `locId` for each state (e.g. Perth 1000676, Brisbane 1000339). Search the bare city name — "Perth Western Australia" returns nothing.
- Triangulate across Brisbane / Sydney / Melbourne / Perth / Hobart for a national-ish read.
- Treat the numbers as **relative priority between states**, not absolute national volume. Never quote a single city's figure as the national number.

### Cannibalisation risk with state variants

State variants are the highest cannibalisation risk area. Each state page MUST have genuinely unique content (different regulator, fees, legislation, process). If two state pages would have near-identical content, merge them into one page targeting both states or a national page.

See `references/quality-gates.md` Section 1 for the full cannibalisation rules.

---

## 9. Cannibalisation Check

Before finalising any keyword assignment, check for overlap with existing ABE pages.

### Check process

1. For each primary keyword candidate, run `web_search` with `site:abeeducation.edu.au [keyword]`. In Mode B, also run `domain_keywords` (abeeducation.edu.au) and `page_keywords` per URL to see which existing page already ranks for the term, and `serp_analysis` to read the live SERP.
2. If an existing page targets the same keyword:
   - **Same page type, same state:** Do not create a new page. Optimise the existing one.
   - **Same page type, different state:** OK — ensure content is genuinely state-specific.
   - **Different page type (e.g., hub vs course):** OK if they target different intent levels (hub = broad, course = specific).
   - **LearnWorlds `/course/` page:** These should be noindexed. The new clean-URL page replaces it.
3. Check Google Drive and Notion for any planned pages that might conflict.
4. Record all findings in the cannibalisation column of the Keyword Map.

### Cannibalisation flags

| Flag | Meaning | Action |
|---|---|---|
| 🟢 Clear | No existing page targets this keyword | Proceed |
| 🟡 Adjacent | Existing page targets a related keyword | Check internal linking direction is correct |
| 🔴 Conflict | Existing page targets the same keyword | Do not create new page — merge or optimise existing |
| ⚪ Planned | Another planned page targets this keyword | Coordinate — assign one as hub, one as spoke |

---

## 10. Primary/Secondary Assignment

Each cluster gets exactly one primary keyword and 1–5 secondary keywords.

### Selection rules

**Primary keyword:**
- Highest commercial value in the cluster (transactional > commercial > informational)
- Most natural as an H1 component
- If Mode B data available: highest volume among transactional/commercial terms, cross-checked against SEO difficulty (`sd`)
- Must pass cannibalisation check (🟢 Clear)

**Secondary keywords:**
- Support the primary — same topic, different angle
- Feed into H2 headings, FAQ questions, meta description
- Include at least one informational keyword (for AIO targeting)

**Semantic variants:**
- Natural language variations that don't need separate targeting
- Handled by writing naturally — not assigned to specific headings
- Examples: "white card" / "construction induction card", "enrol" / "sign up" / "register"

### Assignment format

```
Cluster: [Name]
  🎯 Primary: [keyword] — [intent] — [cannibalisation flag]
  🔵 Secondary: [keyword] — [intent]
  🔵 Secondary: [keyword] — [intent]
  🔵 Secondary: [keyword] — [intent]
  💭 Semantic: [variant], [variant], [variant]
```

---

## 11. Prioritisation Framework

Once all clusters have primary/secondary assignments, rank them for build order.

### Mode A prioritisation (no volume data)

Score each cluster on five factors, each 1–5:

| Factor | 1 (Low) | 5 (High) |
|---|---|---|
| **Commercial intent** | Purely informational | Direct purchase intent |
| **ABE authority** | New topic, no existing content | Established topic, existing rankings |
| **AIO potential** | No question-format keywords | Multiple PAA questions, answer-capsule ready |
| **Competitive gap** | Strong competitors already rank well | Weak/thin competitors, or no good result exists |
| **State priority** | Low-volume state for ABE | High-volume state (TAS, WA = strong; NSW = high opportunity) |

**Build order:** Total score descending. Ties broken by commercial intent.

### Mode B prioritisation (connector volume/difficulty data)

Add two data-driven factors:

| Factor | Score calculation |
|---|---|
| **Volume score** | Normalise cluster total volume to 1–5 scale |
| **Difficulty score** | Invert difficulty — low `sd` = high score (easier to rank) |

**Weighted formula:**
```
Priority = (Commercial Intent × 3) + (ABE Authority × 2) + (AIO Potential × 2) 
         + (Competitive Gap × 1) + (State Priority × 1) 
         + (Volume Score × 2) + (Difficulty Score × 1)
```

**Data source:** Volume Score and Difficulty Score come from the connector's live `volume` and SEO difficulty (`sd`) figures — pulled in bulk via `keyword_suggestions` / `match_keywords`, with `keyword_overview` reserved for trend data on the 2-3 key terms (it's rate-limited to ~3 reports/day; see Section 3). As a simple sort within a topic, `volume ÷ difficulty` gives the raw opportunity ranking; weight by `traffic_value` to favour clusters with higher commercial upside. Remember the AU city-level caveat (Section 8) — compare states on relative, triangulated figures, never a single city's number as national volume.

### Quick-win identification (requires GSC data — CSV supplement)

Flag keywords where ABE already ranks positions 8–20 with reasonable impressions. These need optimisation, not new pages. This uses ABE's **actual** GSC data (the CSV supplement), not modelled connector volume:

```
Quick Win = Position 8–20 AND Impressions > 50/month AND CTR < 3%
```

The connector's own `seo_opportunities` / rank-tracking outputs (once a project is set up — see SKILL.md Step 7.5) surface a comparable low-hanging-fruit list for tracked terms.

---

## 12. Output: Keyword Map

The final deliverable from keyword research. This feeds into Step 3 (Strategy) and Step 4 (Content Writing).

### Format

```markdown
# Keyword Map: [Topic / Course Type]
Generated: [Date]
Mode: B (connector, default) / A (qualitative fallback)

## Build Priority 1: [Cluster Name]

| Role | Keyword | Intent | Volume | SEO diff (sd) | CPC | Location basis | Cannibalisation | Notes |
|---|---|---|---|---|---|---|---|---|
| 🎯 Primary | [keyword] | Transactional | [vol or —] | [sd or —] | [cpc or —] | [city/cities or —] | 🟢 Clear | H1 candidate |
| 🔵 Secondary | [keyword] | Commercial | [vol or —] | [sd or —] | [cpc or —] | [city/cities or —] | 🟢 Clear | H2: pricing section |
| 🔵 Secondary | [keyword] | Informational | [vol or —] | [sd or —] | [cpc or —] | [city/cities or —] | 🟢 Clear | H2: requirements |
| 🔵 Secondary | [keyword] | Informational | [vol or —] | [sd or —] | [cpc or —] | [city/cities or —] | 🟢 Clear | FAQ question |
| 💭 Semantic | [variants] | — | — | — | — | — | — | Write naturally |

**Page type:** [from PIC]
**Target URL:** [from page-type-engine URL pattern]
**Priority score:** [X/25 or X/35]
**AIO targets:** [list PAA questions this page should answer]
**Quick win?** [Yes/No — requires GSC CSV supplement]
```

### Data columns

- `Volume` — modelled monthly search volume from the connector
- `SEO diff (sd)` — SEO difficulty score (lower = easier to rank)
- `CPC` — cost-per-click, a commercial-value signal
- `Location basis` — which capital city / cities the volume figure is triangulated from (per the Section 8 AU caveat)

In **Mode A** (connector unavailable) all four columns are `—`. Never present modelled volume as ABE's actual traffic — for pages ABE already ranks for, GSC is the source of truth (see Section 3). Connector volume fills the gap for terms ABE does **not** yet rank for.

### Handoff to next step

The Keyword Map output directly populates:
- **Step 3 (Strategy):** Primary + Secondary Keywords field, Search Intent field, Cannibalisation Risk field
- **Step 4 (Content Writing):** H1 keyword, H2 keywords, FAQ questions, meta title keyword positioning
- **Step 5 (Quality Gates):** Cannibalisation check is pre-cleared
- **Step 7.5 (Rank Tracking):** Primary + secondary keywords register in the connector project for post-publish position tracking

---

## 13. ABE-Specific Patterns

### Course type × intent matrix

| Course type | Dominant search intent | Typical primary keyword pattern | Notes |
|---|---|---|---|
| White Card | Transactional | `white card [state]` or `white card course [state]` | Searchers almost always want to enrol |
| Owner Builder | Mixed commercial/informational | `owner builder course [state]` or `owner builder licence [state]` | Research phase is longer — more informational queries |
| CPD | Commercial investigation | `cpd courses [industry] [state]` or `cpd points [industry]` | Often comparing providers |
| Bundles | Transactional | `[bundle name]` or `cpd bundle [state]` | Existing customers or price-shoppers |

### State authority signals

Keywords that include regulator names or legislation references carry high commercial intent even when phrased as questions:

- "access canberra owner builder" = transactional (looking for the approved course)
- "cbos tasmania cpd" = commercial (looking for an approved provider)
- "safework nsw white card" = transactional (looking for a compliant course)

### Seasonal patterns

Some ABE keywords have seasonal spikes. Note these in the Keyword Map for timing content updates:

- Owner Builder: spikes in spring (Sep–Nov) when people plan builds
- White Card: steady year-round with mild dips over Christmas
- CPD: spikes near renewal deadlines (varies by state and industry)

---

## 14. Maintenance and Review Cycle

Keyword maps are not one-and-done. Schedule reviews:

| Trigger | Action |
|---|---|
| New page published | Update map — mark cluster as "live", record actual URL; register the cluster in the connector project for rank tracking (SKILL.md Step 7.5) |
| Quarterly review | Re-run cannibalisation check, refresh PAA questions, re-pull connector volume/difficulty, check for new competitors |
| GSC data available | Merge ABE's actual GSC performance into the map as a supplement — real impressions/clicks/position override modelled connector volume |
| New state launched | Generate state-variant clusters for the new state (remember the city-level `locId` caveat, Section 8) |
| Government fee change | Check if fee-related keywords need updated content (e.g., "white card cost [state]") |
| Regulatory change | Check if new legislation creates new keyword opportunities |
| Competitor enters market | Re-run competitor heading extraction (Section 5c) and `domain_keywords` on the new competitor |
