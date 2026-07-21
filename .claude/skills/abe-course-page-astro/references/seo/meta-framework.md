# Meta Title & Description Framework
**Evidence-based rules for meta titles and descriptions — education provider specific**
**Source:** Meta_Titles_and_Descriptions_for_Education_Providers__The_2026_SEO_Playbook

> **Canonical source.** This file is the single source of truth for meta title, meta description, and H1 length / character / position targets and the title rewrite rules. `SKILL.md` (the "Key numbers" table) and `seo-content-reference.md` carry quick-reference mirrors of these figures. When any of these targets changes, edit it **here first**, then update those two mirrors so they don't drift.

---

## 1. Meta Title Rules

### Length and positioning

| Parameter | Value | Evidence |
|---|---|---|
| Sweet spot length | 51–55 characters | Lowest rewrite rate (~40%) — Zyppy Feb 2026 |
| Maximum length | 60 characters | 90% display correctly — Moz |
| Pixel width (desktop) | ~600px | Google display limit |
| Mobile safe zone | First 40–45 characters (~475px) | Reliable display all devices |
| Keyword position | Within first 40–45 characters | Front-loading improves ranking — Moz, Screaming Frog |
| CTR sweet spot | 40–60 characters | ~8.9% higher CTR — Backlinko (5M results) |

### Rewrite prevention

Google rewrites 61–76% of title tags. Key triggers and prevention:

| Trigger | Rewrite rate | Prevention |
|---|---|---|
| Pipe separators `|` | 41% rewritten | Use dashes `–` instead (19.7% rewrite rate) |
| Square brackets `[ ]` | 77.6% changed, 32.9% stripped | Use parentheses instead (19.7% removal) |
| Title < 5 chars | 96% rewritten | Always exceed 50 chars |
| Title > 70 chars | ~100% rewritten | Stay under 60 chars |
| Brand name in title | Removed in 63% of modifications | Place brand at end, after dash |
| Title ≠ H1 | Higher rewrite rate | Match `<title>` to H1 in meaning |
| Segmented titles | Higher rewrite rate | Write as one continuous sentence |
| Keyword stuffing | Triggers rewrite | Use primary keyword once |

### Google's own stated rewrite triggers (primary source, added 20 July 2026)

The table above is drawn from third-party rewrite-rate studies — useful, but correlational. Google's title-link
documentation names the conditions it actually rewrites for. These are causal and should be checked first:

| Google-named issue | What it means | ABE relevance |
|---|---|---|
| **Half-empty `<title>`** | Title is just a separator plus the site name | Catch in templating — a missing variable produces exactly this |
| **Obsolete `<title>`** | Page reused year to year, visible heading updated, `<title>` not | **High risk for ABE.** Dated fee, eligibility and "Updated [Month YYYY]" pages — if the H1 says one year and the title another, Google takes the visible one and rewrites |
| **Inaccurate `<title>`** | Title doesn't reflect what the page is actually about | Ties to the helpful-content anti-pattern on overselling titles |
| **Micro-boilerplate** | A *subset* of pages share one title, with the distinguishing detail missing | **The title-level twin of state-swapped copy.** If the state is only in the H1 and not the title, ABE's state pages are the textbook case |
| **No clear main title** | Several headings share the same visual weight, so the main one is ambiguous | Overlaps `abe-readability-audit` — the H1 must be visually dominant and the first visible `<h1>` |
| **Language / script mismatch** | Title language differs from body language | Not an ABE risk (English throughout) |
| **Site-name duplication** | Brand repeated where Google already shows the site name | Consistent with placing the brand last |

**On length:** Google states there is **no limit** on `<title>`; the title link is truncated to fit device width.
The 51–60 character targets above are display and rewrite-rate heuristics from third-party research, not a Google
rule — keep using them, but don't cite them as a Google limit.

**Sources Google draws title links from** (so a mismatch anywhere can override the `<title>`): the `<title>`
element, the main visual title, heading elements, `og:title`, other large/prominent styled text, on-page text,
anchor text on the page, links pointing to the page, and `WebSite` structured data.

### Formulas by page type

**Course detail pages:**
```
[Course Name] [State] Online – ABE Education
```
Example: `White Card Tasmania Online – ABE Education` (44 chars)

With USP:
```
[Course Name] [State] – [USP] – ABE Education
```
Example: `White Card Tasmania – Same-Day Certificate – ABE Education` (57 chars)

**Hub/category pages:**
```
[Category] Training Online – [Year] – ABE Education
```
Example: `CPD Courses for Builders Online – 2026 – ABE Education` (53 chars)

**Bundle pages:**
```
[Bundle Name] – [Points] CPD Points – ABE Education
```
Example: `TAS Building CPD Bundle – 20 Points – ABE Education` (51 chars)

**FAQ/informational pages:**
```
[Question or Topic] – [Year] Guide – ABE Education
```
Example: `How to Get Your White Card – 2026 Guide – ABE Education` (55 chars)

**Expert profile pages:**
```
[Name] – [Role] – ABE Education
```
Example: `Warwick Smith – RTO Compliance Consultant – ABE Education` (56 chars)

**Homepage (brand first — only exception):**
```
ABE Education – Online Construction Training Australia
```

### High-impact modifiers (ranked by effectiveness)

1. **"Online"** — massive search volume, signals delivery mode
2. **Location/state names** — critical for local intent
3. **Current year ("2026")** — signals freshness, +5–15% CTR
4. **"Accredited" / "Nationally Recognised"** — trust differentiator in VET
5. **"Certificate"** — signals outcome, matches transactional intent
6. **Price** — powerful differentiator in competitive markets

### Eight mistakes to avoid

1. ❌ Keyword stuffing: "White Card | White Card Course | White Card Training"
2. ❌ Omitting location entirely
3. ❌ Unit codes without common names (CPCWHS1001 without "White Card")
4. ❌ Generic titles: "Course Details | ABE Education"
5. ❌ Duplicate titles across pages
6. ❌ Brand name first (except homepage)
7. ❌ Missing year/freshness signal
8. ❌ Intent mismatch (informational title on transactional page)

---

## 2. Meta Description Rules

### Length and structure

| Parameter | Value |
|---|---|
> **What Google actually says about meta descriptions (added 20 July 2026).**
> - **There is no length limit.** The snippet is truncated to fit device width, exactly as with `<title>`. The
>   150–160 figure below is a display heuristic, not a Google rule.
> - **The description is not the snippet.** Snippets are built *primarily from page content*, and Google uses the
>   meta description only when it describes the page better than the on-page text. Different queries produce
>   different snippets for the same page — so a description is a strong suggestion, never a guarantee.
> - **Programmatic generation is explicitly encouraged** by Google for sites where hand-writing every description
>   isn't practical — provided the output is **human-readable and diverse**, and built from page-specific data.
>   This validates how this engine works; it does not license templated sameness. Identical or near-identical
>   descriptions across pages are called out as unhelpful, which is the state-swap anti-pattern in another form.
> - **Descriptions need not be sentences.** Google endorses packing in structured, clearly separated facts. For an
>   ABE course page that legitimately means price, duration, state, approval body and outcome — often more useful
>   to a searcher than a marketing sentence.
> - **Keyword strings are counterproductive** — they give no sense of the page and are *less likely to be displayed*.

| Desktop length | 150–160 characters |
| Mobile safe zone | First 120 characters must contain core message |
| With keyword | +5.8% more clicks vs pages without — Backlinko |
| Direct ranking impact | None (confirmed John Mueller, April 2022) |
| Indirect impact | CTR, bounce rate, engagement signals |

### AI Overview interaction

- Meta descriptions are NOT pulled verbatim into AI Overviews
- AI synthesises from page body text
- BUT semantic alignment between description and query topics increases citation probability
- Low-relevance descriptions: ~4.1 citations avg
- High-relevance descriptions: substantially more citations
- **Takeaway:** Write descriptions that accurately summarise page content using natural query language

### ABE-specific description rules

**Outcome-focused CTAs only.** Never use passive generic CTAs.

| ❌ Passive/generic | ✅ Outcome-focused |
|---|---|
| "Enrol now" | "Get your certificate today" |
| "Enrol today" | "Get it done today" |
| "Sign up" | "Start your training today" |
| "Learn more" | "Get your White Card this week" |
| "Click here" | "Complete your CPD points online" |

**Regulatory positioning in mobile safe zone:**
- "Form 75 ready" / "meets WA owner-builder requirements" and similar compliant regulatory terms within first 120 characters
- State regulator name within first 120 characters for state-specific pages
- RTO partnership disclosure can extend beyond 120 chars (secondary info)

### Formula by page type

**Course pages:**
```
[What you get] in [timeframe]. [Course name] [state] [delivery]. [Trust signal]. [Outcome CTA].
```
Example: `Get your White Card in one day. Nationally recognised online training for Tasmania. Delivered with Blue Dog Training (RTO 31193). Get certified today.` (157 chars)

**Hub pages:**
```
[Category overview]. [State/scope]. [Key differentiator]. [Outcome CTA].
```
Example: `White Card training for all Australian states. 100% online, same-day digital certificate. Nationally recognised with Blue Dog Training. Choose your state.` (157 chars)

**Bundle pages:**
```
[What's included] for [audience]. [Savings signal]. [Regulator approval]. [Outcome CTA].
```
Example: `All 20 CPD points for TAS building practitioners in one bundle. Save $XX vs individual courses. CBOS Tasmania approved. Complete your renewal today.` (152 chars)

**FAQ pages:**
```
[Scope of answers]. [Number of topics]. [Freshness signal]. [Action CTA].
```

---

## 3. H1 Rules (Summary)

| Rule | Detail |
|---|---|
| Length | 50–60 characters |
| Relationship to title | Match in meaning; can differ in phrasing |
| Keyword | Include primary keyword |
| Uniqueness | Must be unique across entire site |
| Position | Inside `<main>`, not `<header>` |
| Count | Exactly one per page |
| Format | Never skip levels (H1 → H2 → H3) |

### H1 ↔ Title alignment examples

| Meta title | H1 |
|---|---|
| `White Card Tasmania Online – ABE Education` | `White Card Tasmania – Nationally Recognised Online Training` |
| `TAS Building CPD Bundle – 20 Points – ABE Education` | `TAS Building CPD Bundle – Complete Your 20 Points Online` |
| `Owner Builder WA – Form 75 Ready – ABE Education` | `WA Owner Builder Permit Course – Form 75 Ready` |
