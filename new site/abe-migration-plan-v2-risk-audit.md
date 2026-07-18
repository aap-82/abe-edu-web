# Migration plan v2 — missed-risk audit against official Google guidance

**Prepared:** 16 July 2026. Audits `abe-website-migration-plan-v2.md`, `wave0-closeout-spec.md`, `redirect-map-v1.csv` and the implementation runbook against Google Search Central documentation and documented real-world migrations. Australian English.

**Verdict:** the plan's spine is confirmed by Google's own site-move guidance — permanent one-to-one redirects kept long-term, a single swap rather than a staggered move, URL mapping before the move, no Change of Address for a same-domain migration, and no `AggregateRating` from Google Business Profile reviews. But the audit found **11 findings, 3 of them high-severity** — and two of the high ones are contradictions inside the plan's own documents, not just omissions.

---

## 1. What official guidance confirms (approach validated)

| Plan element | Google's position | Verdict |
|---|---|---|
| Permanent server-side 301s, kept indefinitely | "Keep redirects for at least 1 year"; "consider keeping redirects indefinitely" ([site-move doc](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)) | ✓ plan exceeds the minimum |
| Full rebuild, one swap (Andrey's cutover decision) | Small/medium sites should move "simultaneously for better detection"; Google has separately warned staggered migrations make assessment harder ([SER](https://www.seroundtable.com/google-https-migrate-all-24515.html), [Stan Ventures](https://www.stanventures.com/news/why-staggered-site-migrations-can-hurt-seo-outcomes-google-explains-6298/)) | ✓ decision validated |
| No Change of Address filing | The tool applies to domain moves only | ✓ plan already corrected this |
| Per-URL redirect map authored before the move | "Map URLs beforehand… test redirects… update internal links and canonicals" — and Mueller: "track the individual URLs, so that you have a clear map" ([SEJ](https://www.searchenginejournal.com/googles-mueller-on-keys-to-a-successful-site-migration/398150/)) | ✓ redirect-map-v1.csv does exactly this |
| One-to-one relevant redirects, never mass-to-homepage | Explicit in the site-move doc; confirmed by soft-404 case evidence (below) | ✓ map is per-URL to nearest relevant target |
| No `AggregateRating` from GBP | Review-snippet doc: pages of an entity that controls reviews about itself are "ineligible for star review feature", **including embedded third-party widgets** ([review snippet doc](https://developers.google.com/search/docs/appearance/structured-data/review-snippet)) | ✓ the hard rule holds, verified verbatim |
| CWV work worth doing | "Core Web Vitals are used by our ranking systems" ([page experience doc](https://developers.google.com/search/docs/appearance/page-experience)) | ✓ but see R9 on framing |

---

## 2. Missed risks

### HIGH

**R1 — The robots.txt block on `/course/` and `/program/` contradicts the plan's own 301s.**
Plan v2 §8.1 keeps the player URLs robots-blocked at cutover, while `redirect-map-v1.csv` 301s those same paths to learn.*. Google is explicit: old URLs must **remain crawlable so Google can follow the redirects** — a blocked URL's redirect is never seen, so the ~229 player URLs (some carrying clicks, e.g. `/course/qld-owner-builder-education` 33 clicks) would linger indexed on the old paths indefinitely, transfer nothing, and flood GSC with "indexed though blocked" noise. **Fix:** at cutover the marketing host's robots.txt must NOT disallow `/course/`, `/program/`, `/bundle/`; the crawl-control decision moves to the learn.* host (see R6). *(Amend: plan §8.1 gate line; runbook 8.1 checkbox; the robots line inherited from the skill/v1.)*

**R2 — The trailing-slash decision quietly changes 100% of URLs, including the equity core.**
Every live equity URL is slash-less (`/wa-owner-builder-course`). The Wave 0 spec chose trailing-slash canonicals, which turns even the "rebuild same slug — no redirect needed" category A pages into *different URLs* in Google's eyes — so nothing survives the migration URL-identical, and the top six owner-builder URLs (≈⅔ of all clicks) take a redirect hop and re-canonicalisation they do not need to take. Verified against Cloudflare's docs: `html_handling: "drop-trailing-slash"` serves `/page` with a **200 directly** from `page/index.html` ([html-handling doc](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/)) — so slash-less canonicals cost one config line plus Astro `trailingSlash: 'never'`, not a build change. **Fix (recommended): flip the decision** — no-slash canonicals sitewide; canonical tags, sitemap, JSON-LD `@id`s and internal links all slash-less. Result: every category A URL is byte-identical to its live counterpart (zero redirects on the equity core), and the migration surface roughly halves. Note: slash-variant requests get a Cloudflare 307, acceptable since that variant was never the canonical or externally linked form. *(Amend: Wave 0 spec §3, W0-5, plan §4 mechanics line — reversing the earlier trailing-slash amendment.)*

**R3 — The staging site can be indexed before cutover.**
`abe-edu-web.andrey-p-personal.workers.dev` is publicly crawlable for the weeks the site is being built. If Google indexes it, the new content exists in the index as duplicate/competing pages on the wrong host before launch — and at cutover the "new" pages look like content that moved from workers.dev. Google's own troubleshooting anticipates the reverse trap too: "Don't forget to remove any noindex or robots.txt blocks that were only needed for the migration." **Fix:** serve `X-Robots-Tag: noindex` only on the workers.dev host now (a minimal Worker script with `run_worker_first`, since `_headers` cannot vary by hostname); check whether workers.dev URLs are already indexed; at cutover set `workers_dev: false` so the staging host disappears, and add "remove migration-only noindex" as an explicit runbook step. *(Amend: new Wave 0 ticket; runbook 8.2 step.)*

### MEDIUM

**R4 — Content-rewrite relevance risk on the pages that already rank.**
The plan rebuilds platform, design, URLs *and content* in one move. Rankings are query-specific: the WA page's 878 clicks are won by its current content answering ~dozens of specific queries, and Mueller's guidance on preserving topical relevance applies to content as much as redirect targets. A full rewrite can rank better — or drop queries the old copy happened to answer. **Fix (cheap):** add a *query-coverage parity gate* to Recipe A for every category A/B page: every query with clicks > 0 in the GSC export for that page must be explicitly covered (a heading, an answer capsule or body copy) in the new page, and title intent stays continuous. This converts the GSC export from a keyword source into a non-regression checklist. *(Amend: runbook Recipe A step 2.)*

**R5 — The 11 retire-301s will likely be treated as soft 404s, not equity transfers.**
Documented case evidence ([GSQI case study](https://www.gsqi.com/marketing-blog/redirects-less-relevant-pages-soft-404s/)) and Mueller's public statements: a 301 to a less-relevant page is processed as a soft 404 — the old page is dropped, nothing transfers. The retired NSW RE CPD set (~15k impressions) will mostly evaporate rather than flow to `/cpd-nsw`. That is acceptable (the products are gone) but the plan should not silently count that equity. **Fix:** note in the map and plan that retire-row equity is expected to be lost, not transferred; keep the 301s anyway (better user experience than a 404, and harmless). *(Amend: plan §4 category D note.)*

**R6 — learn.* is a brand-new host with no indexation strategy decided.**
Moving LearnWorlds to `learn.abeeducation.edu.au` creates a new host that Google crawls fresh: it needs GSC coverage (confirm the property is a **domain property**, which covers subdomains; if it is URL-prefix on www, add one), and a deliberate decision on whether learn.* course pages should be indexable at all — they overlap the new marketing pages and will otherwise compete as near-duplicates. The "Product snippets" appearance (281 clicks) also re-homes to learn.*. **Fix:** extend the LearnWorlds support ticket to ask what per-page canonical or noindex control the platform offers on a subdomain; decide indexable-vs-noindex for learn.* before cutover; verify GSC property type now. *(Amend: runbook 8.2 step 1 + new pre-launch gate.)*

**R7 — Redirect verification is spot-check only; the failure mode that kills migrations is the unverified map.**
The named disasters below are almost all "redirects wrong at scale, found too late". Our inventory is small enough to verify exhaustively: 321 LW export URLs + 298 GSC URLs. **Fix:** a scripted full-inventory check as a blocking Wave 6 gate — every URL must return 200 (category A) or a single-hop 301 to its exact mapped target (B/D/E); output stored as the cutover evidence. One Python/curl loop; an hour of work. *(Amend: runbook 8.1 gate.)*

### LOW / framing

**R8 — Optional: temporary legacy-URL sitemap.** Google monitors the old sitemap to track a move; keeping a temporary sitemap of old URLs for a few weeks post-cutover speeds redirect discovery, then remove it. *(Optional 8.2 step.)*

**R9 — CWV goal framing.** Google explicitly: "trying to get a perfect score just for SEO reasons may not be the best use of your time", and "Google Search always seeks to show the most relevant content, even if the page experience is sub-par". Keep Lighthouse 100 as the *engineering budget* (nearly free on static Astro) but the SEO success metric is all-green CrUX at p75 — and no content-quality hour should ever be traded for perf past green. *(Amend: plan §2 Goal 1, one sentence.)*

**R10 — The "10–30% dip, 2–4 weeks" figure is folklore, not Google.** Google's actual wording: temporary fluctuations; "a small to medium-sized website can take a few weeks for most pages to move". Keep the 4-week monitored window; drop the invented percentage so post-launch panic thresholds are set against Google's framing, not a made-up number. *(Amend: plan §5 Wave 6 + §8 risk 1.)*

**R11 — Measurement continuity through the Zaraz switch.** Swapping gtag → Zaraz at the same instant as the platform swap risks a conversion-signal gap that starves Google Ads bidding and muddies the before/after SEO read. **Fix:** stand up Zaraz + GA4 + Ads conversions on staging and validate event parity *before* cutover. *(Amend: new pre-launch gate.)*

---

## 3. Real-life examples — what to avoid and what works

**Avoid** ([documented failures](https://totally.digital/insights/seo-migration-failures-examples-of-traffic-declines-from-ignoring-seo/)):
- **LoveCrafts (2019):** rebrand consolidation lost ~99% of UK visibility — wildcard redirects to the homepage plus lost content: precisely the soft-404 trap in R5, at fatal scale.
- **WooCommerce → Woo.com (2023):** ~90% traffic loss, rolled back after 5 months. A domain change, which ABE is *not* doing — the plan's same-host decision avoids this entire class of failure.
- **Today's Closeout (2024, Volusion → BigCommerce replatform):** near-total deindexing within 2 months from 15,000+ mis-redirected URLs — the unverified-map failure R7 exists to prevent. ABE's inventory (~370 URLs) is small enough to verify to zero.
- **GSQI's 2016 CMS-migration clients:** soft-404 spikes and rapid ranking loss from redirecting removed pages to less-relevant category pages — Google confirmed the treatment publicly.

**What works** (the pattern across zero-loss migrations, e.g. the checklist-driven cases in the sources): keep URLs identical wherever possible (R2), one-to-one redirects only to equivalent content (map ✓), full-crawl verification before and after cutover (R7), all internal links and canonicals updated to final URLs — Mueller: the details people forget are "the rel canonical… the links in the navigation, or in the footer" — and a single decisive cutover with monitoring, not a staggered drip.

---

## 4. Amendment list — **all 11 applied 16 Jul** to plan v2, the Wave 0 spec, the runbook and the sitemap

| # | Document | Change |
|---|---|---|
| 1 | Plan §8.1 + runbook 8.1 | Remove the robots-block gate for `/course/`, `/program/`, `/bundle/` on the marketing host; crawlability required for the 301s |
| 2 | Wave 0 spec §3, W0-5, plan §4 | Flip canonical form to **no-slash** (`html_handling: "drop-trailing-slash"` + Astro `trailingSlash: 'never'`); category A URLs become byte-identical |
| 3 | New W0-10 + runbook 8.2 | `X-Robots-Tag: noindex` on workers.dev now; check current indexation; `workers_dev: false` + remove migration noindex at cutover |
| 4 | Runbook Recipe A | Add query-coverage parity gate for category A/B pages (GSC queries with clicks > 0 must be covered in the new copy) |
| 5 | Plan §4 category D | Note: retire-row equity expected to soft-404 away, not transfer |
| 6 | LW ticket + pre-launch gates | learn.* indexation strategy (canonical/noindex capability) decided pre-cutover; confirm GSC domain property |
| 7 | Runbook 8.1 | Full-inventory scripted redirect verification (all ~370 URLs) as a blocking gate |
| 8 | Runbook 8.2 (optional) | Temporary legacy-URL sitemap post-cutover |
| 9 | Plan §2 Goal 1 | Reframe: Lighthouse 100 = engineering budget; SEO metric = all-green CrUX at p75 |
| 10 | Plan §5/§8 | Replace "10–30% dip" folklore with Google's "temporary fluctuations / a few weeks" framing |
| 11 | Pre-launch gates | Zaraz/GA4/Ads conversion parity validated on staging before cutover |

## Sources

Official: [Site moves with URL changes](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) · [Redirects](https://developers.google.com/search/docs/crawling-indexing/301-redirects) · [Page experience](https://developers.google.com/search/docs/appearance/page-experience) · [Review snippet structured data](https://developers.google.com/search/docs/appearance/structured-data/review-snippet) · [Cloudflare HTML handling](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/)
Mueller / Google statements: [SEJ — keys to a successful migration](https://www.searchenginejournal.com/googles-mueller-on-keys-to-a-successful-site-migration/398150/) · [SER — migrate the whole site at once](https://www.seroundtable.com/google-https-migrate-all-24515.html) · [Stan Ventures — staggered migrations hurt](https://www.stanventures.com/news/why-staggered-site-migrations-can-hurt-seo-outcomes-google-explains-6298/) · [The SEM Post — keep 301s at least a year](http://www.thesempost.com/leave-301-redirects-place-least-year/)
Case evidence: [GSQI — redirects to less-relevant pages are soft 404s](https://www.gsqi.com/marketing-blog/redirects-less-relevant-pages-soft-404s/) · [Totally Digital — migration failures](https://totally.digital/insights/seo-migration-failures-examples-of-traffic-declines-from-ignoring-seo/)
