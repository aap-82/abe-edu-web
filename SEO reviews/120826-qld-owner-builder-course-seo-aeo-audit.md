# QLD Owner Builder Course — SEO & AEO audit

**URL audited:** `https://abe-edu-web.andrey-p-personal.workers.dev/qld-owner-builder-course` (Cloudflare Workers preview)
**Date:** 12 August 2026
**Method:** rendered DOM inspection in Chrome (raw `<script type="application/ld+json">` read directly, not from a markdown fetch), plus robots/sitemap retrieval and a mobile PageSpeed lab run.
**Framework applied:** `sanity:seo-aeo-best-practices` (technical SEO, structured data, EEAT, AEO), cross-checked against the ABE authority model.

---

## Verdict

**Amber.** The content layer is strong and the authority model is correctly expressed. Three things block a clean publish: a failing CLS score, a dead sitemap declaration, and an indexable preview host that duplicates a live production page on the same primary keyword. The structured data is valid but disconnected, which is where most of the remaining upside sits.

---

## Blockers (fix before cutover)

### 1. Cumulative Layout Shift 0.303 (mobile) — threshold is 0.1

Lab run, mobile strategy. The two expert headshots ship with no `width`/`height` attributes:

- `/_astro/dominic-ogburn-portrait.CWpZz0y1.avif`
- `/_astro/warwick-smith-portrait.tBr0k_ka.avif`

Both are `loading="lazy"` and below the fold, so they reserve no space and push content when they arrive. Every other image on the page carries dimensions.

**Fix:** explicit `width`/`height` on both. Worth adding to the `abe-guardrails` build integration as a hard fail, since this is the exact class of defect the integration already catches for alt text.

### 2. Largest Contentful Paint 2.9 s (mobile) — threshold is 2.5 s

Total Blocking Time is 0 ms and First Contentful Paint is 913 ms, so this is not a JavaScript problem. It is the hero image plus font loading. The audit also flagged 607 ms lost to redirects on the request path.

**Fix:** preload the hero AVIF and the display font, and confirm no redirect hop on the production URL after cutover.

### 3. `robots.txt` declares a sitemap that returns 404

The build's `robots.txt` ends with:

```
Sitemap: https://www.abeeducation.edu.au/sitemap-index.xml
```

That URL currently 404s. Production today serves `https://www.abeeducation.edu.au/sitemap.xml`, a LearnWorlds sitemap index pointing at `page-sitemap.xml` (last modified 12 August 2026).

The Astro build does generate a valid `sitemap-index.xml` → `sitemap-0.xml` pair (both return 200 on the preview host, and the URLs inside are already written as production URLs, which is correct). So this resolves itself at cutover, but only if the Astro sitemap replaces the LearnWorlds one at the root. Until then the declared sitemap is dead.

**Fix:** decide which sitemap owns the root post-cutover, and confirm the declaration resolves. Minor addition: `sitemap-0.xml` entries carry no `lastmod`.

### 4. The preview host is fully indexable and duplicates a live page

The workers.dev host serves `<meta name="robots" content="index,follow">` and a `robots.txt` with `Allow: /`. The cross-host canonical to `https://www.abeeducation.edu.au/qld-owner-builder-course` is correct and will usually be honoured, but canonicals are a hint, not a directive.

Meanwhile the canonical target is live and serving different content: H1 `"QLD Owner Builder Course – Study Online, Your Pace"`, against the Astro build's `"The QBCC-required Queensland owner builder course, online."` Both carry the identical title tag. Two indexable pages on the same primary keyword is the cannibalisation scenario the pre-production audit is meant to catch.

*Assumption flagged:* I have taken the production page being the older LearnWorlds version awaiting cutover as intentional. If that is wrong, this is a bigger problem than a preview leak.

#### Fix, cleanest option first

**Option A — remove the preview host (preferred).** The indexable URL exists only because `wrangler.jsonc` carries `workers_dev: true`. Once the build has a custom domain, set it to `false` and the problem disappears with no code:

```jsonc
{
  "workers_dev": false
}
```

**Option B — keep the preview URL, make it uncrawlable.** A `public/_headers` file will not do this on its own, because `_headers` rules match by path and would apply to production as well. It needs a small Worker in front of the assets binding, matching on hostname:

```jsonc
// wrangler.jsonc
{
  "main": "src/worker.ts",
  "assets": { "directory": "./dist", "binding": "ASSETS" }
}
```

```js
// src/worker.ts
export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const isPreview = url.hostname.endsWith('.workers.dev')

    if (isPreview && url.pathname === '/robots.txt') {
      return new Response('User-agent: *\nDisallow: /\n', {
        headers: { 'content-type': 'text/plain' },
      })
    }

    const response = await env.ASSETS.fetch(request)
    if (!isPreview) return response

    const headers = new Headers(response.headers)
    headers.set('X-Robots-Tag', 'noindex, nofollow')
    return new Response(response.body, { status: response.status, headers })
  },
}
```

Serving `Disallow: /` matters alongside the header: a blanket `Disallow` alone would stop crawlers reading the `noindex`, so the header is what does the work and the robots rule reduces crawl waste on a host that is not the canonical one.

*Not applied, and untested.* The Astro repo is not in a folder connected to this session, so this is a specification rather than a change. Worth a local `wrangler dev` run against both hostnames before deploying. The `abe-guardrails` integration will not catch a regression here, since it audits built HTML and this is a response-header concern.

---

## Structured data

One `application/ld+json` block, an `@graph` with five nodes. Verified from the rendered DOM, not inferred.

| Node | Status |
|---|---|
| `Course` | Present. `offers.price` `"179"` AUD, matches the on-page $179. `hasCourseInstance` with `courseMode: online`, `courseWorkload: PT4H`. |
| `EducationalOccupationalCredential` | Present. `credentialCategory: "Certificate of Completion"`, `recognizedBy` the QBCC as a `GovernmentOrganization`. Correct for the state-approved-direct authority model. |
| `BreadcrumbList` | Present. |
| `Person` ×2 | Dominic Ogburn and Warwick Smith, both with `jobTitle`, `image` and `sameAs`. |

No authority-model breach: nothing in the graph claims RTO status, accreditation or a Statement of Attainment.

### The graph is disconnected (highest-value fix)

`Course` has no edge to any other node. Specifically:

- no `educationalCredentialAwarded` pointing at `#credential`, so the credential node floats unattached
- no `author`, `reviewedBy` or `contributor` pointing at either `Person`

Both experts are structurally orphans. The E-E-A-T signal is fully present in prose ("Reviewed by Warwick Smith on 2 June 2026") but a machine reading the graph cannot tell that these people have anything to do with this course. Connecting them is a few lines of frontmatter and is the single best structured-data return available here.

### Missing freshness signals

No `dateModified` or `datePublished` anywhere in the graph, despite the page carrying visible verification dates throughout (24 June, 14 July, 19 July 2026) and a named review date. Recency is one of the few signals answer engines weight explicitly, and right now it is expressed only in prose.

### Other schema gaps

- **No `teaches` or `about` on `Course`.** `teaches` is the natural home for the 18-module outcomes and is directly extractable.
- **No `FAQPage` node** for the eight Q&A pairs. Worth adding for machine-readable Q&A, but note honestly: Google restricted FAQ rich results to government and health sites in 2023, so this will not produce a rich result. The benefit is AEO extraction, not SERP real estate.
- **`provider` is a stub** (name and url only). No `sameAs`, no logo, no `@id` tying it to a site-wide Organization node.

---

## Metadata

Clean. Nothing to fix except the social images.

| Element | Value | Verdict |
|---|---|---|
| Title | "Owner Builder Course QLD - QBCC-Required, Online $179" (53 chars) | Pass. Keyword leads, price included. |
| Meta description | 149 chars | Pass. |
| Canonical | `https://www.abeeducation.edu.au/qld-owner-builder-course` | Pass. |
| `lang` | `en-AU` | Pass. |
| Headings | 1 × H1, 13 × H2, 24 × H3, question-led | Pass. |
| `og:image` | **absent** | Fail. |
| `twitter:image` | **absent** | Fail. |
| `twitter:card` | `summary` | Should be `summary_large_image` once an image exists. |

**No Open Graph or Twitter image means every share of this page, on every platform, renders a blank card.** The hero AVIF already exists and is referenced in the `Course` schema. This is the cheapest visible win on the page. Serve a JPG or PNG fallback at 1200×630, since AVIF support in social scrapers is inconsistent.

One image carries an empty `alt`: the ABE Education logo SVG. That is correct for a decorative mark, but the project's ≥80-character alt rule would fail it. Worth writing a decorative exemption into the guardrail rather than padding the logo with prose.

---

## AEO readiness

**Strong, and this is the part of the page that will win citations.**

- 2,635 words, answer-first, with question-led H2s and H3s that match real query phrasing ("Do you need an owner builder permit?", "What will you pay in total?").
- Five government hosts cited inline: `qbcc.qld.gov.au`, `legislation.qld.gov.au`, `qleave.qld.gov.au`, `worksafe.qld.gov.au`, `ncc.abcb.gov.au`. Primary sources with visible verification dates is precisely what the EEAT and AEO references ask for.
- Static Astro output means every word, including collapsed content, is in the initial HTML. AI crawlers that do not execute JavaScript still read the whole page. Verified directly.

Two things to watch:

1. **Fourteen `<details>` elements** (six module groups, eight FAQ answers). All indexable, but Google does not lift collapsed text into a snippet by default. Your eight FAQ answers are the most extractable content on the page and currently sit in the least snippet-eligible container. Consider leaving the first one or two open, and mirror them into `FAQPage` schema so the pairs are machine-readable regardless of the disclosure state.
2. **The price and the permit fee are the highest-intent facts on the page** ($179 course, $493.59 QBCC permit, $303 bundle). Confirm each appears in a short, self-contained sentence near its heading, so it can be lifted as a passage without surrounding context.

---

## Prioritised actions

| # | Action | Effort | Impact |
|---|---|---|---|
| 1 | Add `width`/`height` to both expert headshots | Trivial | Fixes CLS 0.303 → passing |
| 2 | Add `og:image` + `twitter:image` (1200×630 JPG/PNG), switch card to `summary_large_image` | Trivial | Every social share currently blank |
| 3 | Set `workers_dev: false`, or add the hostname-matched `noindex` Worker (§4) | Trivial | Removes cannibalisation risk |
| 4 | Connect the graph: `educationalCredentialAwarded`, `author`, `reviewedBy` | Small | Machine-links E-E-A-T to the course |
| 5 | Add `dateModified` / `datePublished` to `Course` | Small | Freshness signal for answer engines |
| 6 | Preload hero image and display font | Small | LCP 2.9 s → under 2.5 s |
| 7 | Resolve the sitemap declaration at cutover | Small | Declared sitemap currently 404s |
| 8 | Add `teaches` and a `FAQPage` node | Medium | AEO extraction, not rich results |
| 9 | Add `sameAs` and `@id` to the provider Organization | Small | Entity consolidation |

---

## Caveats

- Core Web Vitals figures are from a single mobile **lab** run, not field CrUX data. Treat as directional and confirm against real-user data after cutover.
- The audit covers the preview deployment. Behaviour on the production host (redirects, headers, caching) is unverified.
- No regulatory facts were re-verified in this pass. This audit covers structure, metadata, schema and extractability only. The verification dates shown on the page were read, not re-checked against source.
