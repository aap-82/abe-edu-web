# Crawl & Index Controls — head validity, robots rules, canonicals, link qualification

**When to read:** before touching anything in `<head>`, before adding a robots or snippet rule, when triaging a page that won't index or a canonical Google won't honour, and during Step 6 Category I (technical). Pairs with `schema-implementation-guide.md` (what goes in the head) and `page-type-engine.md` §2 (URL rules) and its internal-link map.

**Verified:** 20 July 2026 against Google Search Central (valid page metadata, robots meta / X-Robots-Tag, noindex, robots.txt intro, canonicalisation + troubleshooting, link best practices, qualify outbound links, mobile-first indexing, image sitemaps).

---

## 1. `<head>` validity — the silent schema killer

**The rule:** the `<head>` element may contain only `title`, `meta`, `link`, `script`, `style`, `base`, `noscript` and `template`. **When Google hits an invalid element in the head, it assumes the head has ended and ignores everything after it.** The two that show up in the wild are `<iframe>` and `<img>`.

**Why this is the highest-severity item in this file for ABE.** Nearly everything this skill produces lives in the head: the homepage `@graph`, per-page schema blocks, canonical elements, meta title and description. All of it is injected through the LearnWorlds global and page-level custom-code tabs — the same slots where tracking pixels, chat widgets and third-party embeds get pasted. **A single tracking pixel using `<img>`, or an embed using `<iframe>`, placed above the schema block, makes every tag below it invisible to Google.** Nothing errors. The page looks fine. Rich Results Test simply reports no structured data found, and the canonical silently stops being read.

**Rules:**
- Never allow `<img>` or `<iframe>` in the head. A tracking pixel belongs at the end of `<body>`.
- If a third-party snippet cannot be moved, place it **after** everything Google must see — schema, canonical, meta.
- When schema "disappears" from a page that definitely has it, check head validity **before** debugging the JSON-LD. This is the more likely cause.
- Applies to the Astro build too: anything rendered into `<head>` by a component must be one of the eight permitted elements.

## 2. Canonicals

- **The canonical `link` element is only accepted inside `<head>`.** Unlike robots rules (see §3), placement is not forgiving — which makes §1 a direct threat to it.
- **Use absolute URLs.** Relative paths are supported but discouraged; they cause problems if a staging site is ever crawled.
- **Include a self-referencing canonical** on the canonical page itself. This is what absorbs `?gclid=` and `?utm_*` variants (see `page-type-engine.md` §2).
- **Never use a URL fragment as a canonical.**
- **Don't mix methods with different answers.** One URL in the sitemap and a different one in `rel="canonical"` is worse than either alone. Same for combining the HTML element and the HTTP header — pick one.
- **JavaScript canonicals — the ABE-specific trap.** Google's guidance: set the canonical in the HTML source and don't let JavaScript change it; if you can't set it in the source, leave it out entirely and set it **only** with JavaScript. The LearnWorlds `/home` workaround injects a canonical via JavaScript **to override one LearnWorlds already emits** — which is precisely the "JavaScript changes an existing canonical element" case Google warns against. It may work, but it is the fragile option: verify with URL Inspection which canonical Google actually selected rather than assuming the override took.
- **`rel="canonical"` HTTP header** is the only way to canonicalise non-HTML files (PDF, DOCX) — see the sweep in `quality-gates.md` §2a.
- **Signal strength, strongest first:** redirects → `rel="canonical"` → sitemap inclusion. They stack.
- **A canonical is a hint, not a rule.** Google may pick differently. Check the Google-selected canonical in URL Inspection.
- **Fixing a duplicate cluster takes time.** Google may hold pages in a duplicate cluster for **up to two weeks** after the content is fixed, and pages split out faster when the difference is **clear and significant**. This is the practical answer to "we differentiated the state pages, why hasn't anything changed" — a token rewrite won't split the cluster, and even a real one takes a fortnight to register.

## 3. robots.txt vs `noindex` vs `X-Robots-Tag`

**These are not interchangeable, and combining them wrongly is self-defeating.**

- **robots.txt controls crawling, not indexing.** A URL disallowed in robots.txt can still be indexed if other pages link to it — it just appears without a description. robots.txt is **not** a way to keep a page out of Google, and **not** a canonicalisation tool.
- **`noindex` keeps a page out of results**, via `<meta name="robots">` or the `X-Robots-Tag` HTTP header. Both have the same effect.
- **The trap: `noindex` only works if the page is crawlable.** If a URL is disallowed in robots.txt, Google never fetches it, never sees the `noindex`, and the page can stay in results. **This completes the PDF triage in `quality-gates.md` §2a** — an indexed PDF must be given `X-Robots-Tag: noindex` *and left crawlable*. Blocking it in robots.txt at the same time guarantees the rule is never read.
- **`X-Robots-Tag` is the only option for non-HTML files** — a PDF has no head to put a meta tag in. It can be applied by pattern at the server/Worker level (e.g. all `.pdf`).
- **Robots rules are placement-forgiving** — Google honours robots meta tags in the body as well as the head. Canonicals are not (§2).
- **Conflicting rules: the more restrictive wins.**
- Removal from results after adding `noindex` requires a recrawl, which can take months on low-priority URLs; use URL Inspection to request one for anything urgent.

## 4. Snippet controls now gate AI Overviews — read before using any of them

This is a lever the skill has never documented, and getting it wrong quietly costs AI visibility.

- **`nosnippet`** suppresses the text snippet **and prevents the content being used as a direct input for AI Overviews and AI Mode.**
- **`max-snippet:[n]`** caps snippet length **and correspondingly limits how much content may feed AI Overviews and AI Mode.**
- **`data-nosnippet`** excludes specific `<span>`, `<div>` or `<section>` regions from snippets. Useful for boilerplate disclaimers; do not wrap primary content in it.

**ABE ruling:** given that AI-features visibility is an explicit goal of this skill, **do not set `nosnippet` or a restrictive `max-snippet` on any course, hub or expert page.** If either is ever found on a page underperforming in AI Overviews, treat it as the first suspect. `max-snippet:-1` (Google chooses) is the safe permissive value.

**The structured-data exemption:** snippet limits do **not** restrict structured data used for rich results, and structured data stays usable even inside a `data-nosnippet` element — the exception being `description` values in article-type markup, which `max-snippet` does govern. So schema remains a route for making information available where snippets are constrained.

- `max-image-preview:large` is the permissive setting for image previews; `standard` or `none` restricts them.
- `unavailable_after:[date]` drops a page from results after a date — potentially useful for a genuinely expiring offer, never for evergreen course pages.

## 5. Link qualification — and the `.gov.au` rule

- **`rel="sponsored"`** for paid links and advertisements. **`rel="ugc"`** for user-generated content. **`rel="nofollow"`** only where the others don't apply and you'd rather not be associated with the target.
- **Do not `nofollow` ABE's government source links.** Google states plainly that linking out builds trustworthiness, that citing sources is the model case, and that `nofollow` is for sources you **don't trust** — not a default for all external links. ABE's `.gov.au` citations are the backbone of the trust model in `helpful-content-standard.md` §3; nofollowing them works against the E-E-A-T they exist to establish. Audit for a blanket "nofollow all external links" setting, which some platforms apply by default.
- To stop Google fetching an internal link, use robots.txt `disallow` rather than `nofollow`.
- Links must be `<a href="...">` to be crawlable. `<span href>`, `onclick` handlers, `routerLink` and `href="javascript:...."` are not reliably parsed. JavaScript-inserted links are fine **if** they render as real anchors.

## 6. Anchor text — additions to the rules in `page-type-engine.md`

Those rules (descriptive, keyword-rich, varied, state-name included) hold. Google adds:

- **The out-of-context test.** Read the anchor text alone. If you can't tell what the target page is about, it isn't descriptive enough.
- **Don't chain links.** Adjacent links are hard to tell apart and each one loses its surrounding context. Space them out with real sentence context.
- **Concise, not stuffed.** Google names keyword stuffing in anchor text as a spam-policy issue. Ask whether the reader needs those words to understand the next page.
- **For image links, the `alt` attribute is the anchor text.** An image link with empty alt is an empty link. This connects `alt-text-guidelines.md` directly to the internal-link map — badge and card images that link somewhere need alt text written as anchor text, not as decoration.
- **Every page worth having should be linked from at least one other page.** There is no ideal number of links per page.
- `title` is only a fallback when the anchor is otherwise empty — don't rely on it.

## 7. Mobile-first indexing — what's indexed is the mobile page

Google indexes and ranks from the **mobile** version. Responsive design (one URL, one HTML) is Google's recommended configuration and the one ABE uses, which means most of the separate-URL guidance doesn't apply — but the parity principles still bite:

- **Accordions and tabs are explicitly endorsed *for indexing*.** Google advises moving content into accordions or
  tabs rather than removing it on mobile. ABE's FAQ accordion pattern is safe: the content is indexed.
- **But there is a trade-off — see §7a.** Collapsed content is indexed, yet it is disqualified from "Read more"
  deep links. Both statements are Google's; neither cancels the other.
- **Don't lazy-load primary content behind an interaction.** Google won't swipe, click or type to reveal content. Anything that only loads on tap is effectively not indexed.
- Structured data, titles, meta descriptions, headings and alt text must be **equivalent** on mobile — a mobile-only omission is an indexing omission.
- Don't block resources (CSS, JS, images) needed to render the page.
- Inline SVG caveat: Google supports SVG, but **cannot index a `.jpg` referenced inside an `<image>` tag within an inline SVG**.

## 7a. "Read more" deep links — the accordion trade-off

A "Read more" deep link is a link inside a snippet that drops the user at a specific section of the page. To be
eligible, Google asks that:

- **The content is immediately visible to a human — not hidden behind an expandable section or tabbed interface.**
- JavaScript does not control scroll position on load (don't force the user to the top).
- If History API calls or `window.location.hash` changes run on load, **the hash fragment is not stripped from the
  URL** — removing it breaks deep linking.

**The tension, stated plainly.** §7 says Google endorses accordions over removing content. This section says
collapsed content can't earn a deep link. Both are true and they are not in conflict: **collapsing protects
indexing, but costs deep-link eligibility.** So the choice is per-section, not site-wide:

- **Keep collapsed:** FAQ blocks, long compliance detail, repeat-visitor reference material. Deep links matter
  little and the space saving is real.
- **Keep expanded:** the section that answers the page's primary question — eligibility, fees, what the course
  actually is. That is the section a deep link would target, and hiding it forfeits the placement.

**FAQ content is settled — collapsing is safe.** Verified live 20 July 2026: Google's FAQ documentation lists "question visible, answer behind an expandable section" as an explicitly *valid* use case. So the trade-off above applies to **non-FAQ primary content** — eligibility, fees, what the course is. FAQ answers may be collapsed without penalty.

This also sharpens `abe-readability-audit` territory: an accordion is not a free way to shorten a page.

## 7b. Interstitials and dialogs

Not previously covered anywhere in this skill, and relevant to any promo modal, newsletter prompt or consent
dialog on ABE pages.

- **Use a banner, not a full-page interstitial.** Banners take a small fraction of the screen and let users and
  crawlers reach content immediately.
- **Never obscure the whole page.** Intrusive overlays make it harder for Google to understand the content and can
  hurt search performance.
- **Never redirect users to a separate page for consent or input.** Google is explicit about the consequence:
  redirecting all URLs to a single consent page **removes every page but that one from search results**, because
  Googlebot can only fetch the one page.
- **Legally mandatory interstitials are exempt** — but should still *overlay* the content rather than redirect, so
  Google can index what's underneath.
- Excessive or intrusive ads and interstitials are named directly in the page-experience self-assessment (§7c).

## 7c. Page experience — calibration

Worth recording because it guards against over-investment as much as neglect.

- **There is no single "page experience signal".** Core ranking looks at a variety of signals.
- **Core Web Vitals *are* used by ranking systems** (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 — thresholds already in
  `seo-strategy.md` §13).
- **Other page-experience aspects don't directly raise rankings.** They make the site more satisfying, which aligns
  with what ranking systems reward — but they are not levers in themselves.
- **Google says chasing a perfect score purely for SEO may not be the best use of time.** Good CWV, then stop; the
  remaining effort belongs in content.
- **Evaluation is generally page-specific**, with some site-wide assessments.
- Google's own self-assessment questions: good Core Web Vitals; served securely; displays well on mobile; no
  excessive ads interfering with main content; no intrusive interstitials; **main content easily distinguishable
  from everything else** — that last one overlapping directly with `abe-readability-audit`.

## 8. Smaller items worth knowing

- **Image sitemaps:** only `<image:image>` and `<image:loc>` remain. `<image:caption>`, `<image:title>`, `<image:license>` and `<image:geo_location>` were **removed from the spec** — if any exist in an ABE sitemap they are dead weight. Image sitemaps are worth having only for images Google may not otherwise discover (e.g. JavaScript-loaded).
- **Ignored entirely by Google:** the `meta` keywords tag, the HTML `lang` attribute (language is detected from the text), `rel="next"` / `rel="prev"`, `noarchive`, `nocache`, `nositelinkssearchbox`. Don't spend effort on any of them.
- **Meta tag letter case doesn't matter** — except `google-site-verification`, which must match exactly.
- **Avoid JavaScript-injected meta tags** where possible; test thoroughly where unavoidable (see the canonical caveat in §2).
- **`meta refresh` is not a redirect** — use a server-side 301.
- **Duplicate content is normal and not a spam violation.** Region, device, protocol and site-function variants all produce it. It becomes a problem when it confuses users or fragments measurement, not because it attracts a penalty.

## Sources
- [Use valid HTML to specify page metadata](https://developers.google.com/search/docs/crawling-indexing/valid-page-metadata)
- [Robots meta tag, data-nosnippet, and X-Robots-Tag specifications](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)
- [Block Search indexing with noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
- [Introduction to robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
- [How to specify a canonical URL](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [What is canonicalization](https://developers.google.com/search/docs/crawling-indexing/canonicalization)
- [Fix canonicalization issues](https://developers.google.com/search/docs/crawling-indexing/canonicalization-troubleshooting)
- [Link best practices for Google](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
- [Qualify your outbound links to Google](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links)
- [Mobile site and mobile-first indexing best practices](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing)
- [Image sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps)
- [meta tags and attributes that Google supports](https://developers.google.com/search/docs/crawling-indexing/special-tags)
