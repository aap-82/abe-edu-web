# ABE SEO Content Engine — Changelog

Skill-wide content changes, moved out of SKILL.md to keep the runtime body lean (progressive disclosure). Per-file versions (e.g. `schema-implementation-guide.md` v1.1) and the `Skill last audited` date in SKILL.md are tracked separately. The expert-fallback files mirror their live Notion source pages — their source-version line records which Notion doc version each snapshot reflects.
## 2026-07-20 — Google Search Central documentation review

A single working session. The trigger was the pending helpful-content spec; once that was applied, successive batches of Google's own documentation were read end-to-end against the skill. Recorded as one dated entry with the passes in the order they happened, because several later passes correct or complete earlier ones — reading them out of order misleads.

**Net effect:** two new reference files (`helpful-content-standard.md`, `crawl-index-controls.md`), one authority-model breach removed from live schema guidance, five factual corrections to existing rules, and one internal contradiction resolved. Three of the corrections were to work done earlier in the same session.

**Corrections to pre-existing skill content:** Course required properties (provider is recommended, not required); VideoObject required properties (three, not seven); Carousel wrongly excluded as inapplicable; `parentOrganization` asserting RTO ownership of ABE; and the `llms.txt` roadmap item contradicting the mythbusting rule.

**Self-corrections made later in the session:** the YMYL hedge ("adjacent" → outright), the IPTC image obligation (Merchant Center policy, not a Search requirement), the PDF `noindex` advice (incomplete — robots.txt cancels it), and the accordion guidance (protects indexing, forfeits deep links).

> **Date note.** Every annotation in this session originally carried 19 July 2026, the date on the source spec, rather than 20 July 2026 when the work was actually done. Corrected across all files. Flagged here rather than quietly fixed, because this session added the rule that dates must reflect real events (`helpful-content-standard.md` §6).

#### 1. Helpful-content standard (the pending spec)

- **New `references/helpful-content-standard.md`.** The engine already carried the "AI search is SEO done well" doctrine, the non-commodity gate and the named-expert gate, but had no concrete guidance on Google's people-first self-assessment. The new file adds: the post-March-2024 position (the helpful-content classifier is folded into core ranking — there is no standalone signal), the requirements restated as self-assessment questions, the **who / how / why** test, the search-engine-first signals to avoid, the ABE **YMYL ruling**, the experience-signal patterns, the anti-pattern list, and a seven-item page checklist. Triggered by the QLD Owner Builder assessment, which found the page clears the trust/expertise bar but *asserts* rather than *shows* first-hand experience.
- **ABE YMYL ruling made explicit.** Owner-builder, CPD and White Card content is **YMYL-adjacent** — it steers legal obligations, significant spending and site-safety decisions. Trust dominates E-E-A-T for YMYL, so `quality-gates.md` §6 trust signals are not optional on these pages, an unsourced or undated regulatory claim is a publish hard blocker (this is the *reason* for the existing rule), and authority-model honesty is a **trust** requirement, not merely a compliance one.
- **Third AI-content governance gate added (Step 4): "shown experience, not asserted."** A page must demonstrate first-hand experience with at least two of — a real walk-through of what happens after enrolling, a measured figure from the platform (never a soft "a few hours" where real data exists), a genuine screenshot of the course environment, or the specific form/artefact the student lodges. An abstract student count is an assertion, not evidence. This closes the defect found on the live QLD page.
- **The "comprehensive" reconciliation recorded.** Google's checklist asks for a "substantial, complete, or comprehensive description of the topic"; ABE house style bans the word. Stated under Step 4 Key numbers and in §4 of the new file: hit the same bar, write it as **thorough, complete coverage**, and never reintroduce the banned word to satisfy the checklist.
- **Step 5.2 gains a Helpful content (people-first) block** — six checks covering reader-question-first coverage, ABE-only added value, ≥2 shown-experience signals, named author *and* independent reviewer, genuine state specificity, and date integrity.
- **Step 6 extended A–O → A–P with Category P (Helpful Content).** Runs the §7 checklist with three hard checks: ≥2 shown experience signals, no §6 anti-pattern present (in particular state-swapped copy and date-freshening), and an explicit answer to "do I need this, and is it legit?". Category P failures are **not** automatic FAIL — H and N remain the only auto-fails — but each must be listed in the verdict with a named fix. (The section heading also still read "Categories A–M" while listing A–O; corrected.)
- **v2 same-day pass — full Google source article read end-to-end.** The first pass was built from a research summary; reading the primary article surfaced one error and nine gaps. **Corrected:** YMYL was defined as "health, finances, safety or major life decisions" — Google's actual wording is health, **financial stability**, safety, or the welfare/well-being of society. On Google's real wording ABE content is **YMYL outright, not YMYL-adjacent**: it governs whether someone may lawfully build, what they must spend, and whether people go home safe. **Added:** §2a the "How" duty for an AI content engine (self-evident automation, background on how and why, and the scaled-content **spam-policy** line — automation to manipulate rankings is a violation, not just a quality issue); the four people-first tests, of which the **search-again test** ("does the reader still need to look elsewhere?") is the sharpest single failure check in the checklist; Google's concrete definition of first-hand experience as having *actually used the thing or been to the place*, which is the primary-source backing for §5; the product-review evidence-of-work pattern; H1/title overselling and stating-unconfirmed-facts as named anti-patterns; spelling/style defects as a quality gate rather than polish; §7 page experience (Core Web Vitals + `abe-readability-audit`) as part of the same bar; §8 Google's own statement that SEO applied to people-first content is a helpful activity — primary-source backing for the engine's "AI search is SEO done well" doctrine; and the E-E-A-T nuance that it is **not itself a ranking factor** and that content need not demonstrate all four dimensions. Google's own method — unaffiliated reviewer, audit the drops — mapped onto ABE's independent-reviewer gate and Step 7.5. Checklist grew 7 → 10 items (Category P now runs **§9**); Step 5.2 gains the search-again and title-accuracy checks; gate 3 in Step 4 now carries the disclosure duty. Sources expanded 4 → 9 with the quality rater guidelines, spam policy, AI-content post, page experience and product-review pages.
- **Date-freshening named as an anti-pattern.** "Updated [Month YYYY]" must reflect a real content update and a per-fact `Verified [date]` a real re-verification. Understating freshness is safe; overstating it is a trust failure. This matters given how heavily ABE leans on both.

#### 2. Schema gallery audit — Carousel wrongly excluded

- **Carousel corrected in `schema-org-opportunities.md` — it was wrongly excluded.** The "not relevant to ABE" list read "Carousel (requires Recipe/Movie/Restaurant)". Google's gallery states the Carousel feature must be combined with Recipe, **Course list**, Restaurant or Movie — Course list is an eligible pairing, so Carousel *is* available to ABE. The exclusion also contradicted `schema-implementation-guide.md`, whose §1 quick-reference already names "Course List carousel" as the hub/catalogue rich result and whose §8 builds the qualifying `ItemList` + `Course` pattern. No new markup required; the carousel is the rendered form of the existing hub ItemList, gated on the §7a minimum of three courses. Hub and catalogue pages should be tested in Rich Results Test rather than assumed ineligible.
- **Gallery audit re-run against the full listing (20 Jul 2026).** Count updated **31 → 25** supported features; ABE uses 7. **FAQ no longer appears in the gallery**, consistent with the withdrawn rich result — `FAQPage` markup stays for AI/LLM visibility but is no longer counted as a rich-result feature.
- **Exclusion reasons sharpened** so the list explains itself rather than asserting: Event excluded because scheduled sessions belong in `CourseInstance` and must not be double-marked; Employer Rating clarified as a job-search employer-review feature, not a course rating; Subscription/Paywalled excluded because the LearnWorlds login wall is not article paywalling; and **Local Business** flagged as an **authority-model breach** rather than a mere mismatch — in-person and virtual-classroom White Card delivery happens at the RTO partner's venue, so marking ABE as the venue would overclaim.

#### 3. Structured-data specs — Course, Video, Organization, Article, image metadata

Seven Google structured-data specs read in full (Course, Breadcrumb, Video, Organization, Local Business, Q&A, Image metadata, Article). Two factual errors corrected, several gaps closed.

- **Course required properties were wrong.** §7a claimed Google requires `name`, `description` **and** `provider`. The spec requires only `name` and `description`; **`provider` is recommended**. Corrected so a missing `provider` isn't triaged as a hard validation failure.
- **Carousel markup confirmed mandatory.** The Course technical guidelines require both three marked-up courses **and** Carousel/`ItemList` markup on a summary or all-in-one page. Course-list eligibility depends on the hub ItemList — this both confirms and strengthens the earlier Carousel correction. Course list is also **English-only**.
- **VideoObject required properties were overstated.** The template listed seven required properties; Google requires **three** (`name`, `thumbnailUrl`, `uploadDate`). `publisher` isn't a Google-supported VideoObject property at all. `contentUrl` noted as preferred over `embedUrl`.
- **Key moments (`Clip` / `SeekToAction`) documented as an unused opportunity** for course preview and module videos, with the mandatory gates recorded: minimum 30-second duration, deep-linkable URLs, video watchable on the marked-up page, and no two clips sharing a start time.
- **Breadcrumb availability recorded as desktop-only**; noted that Google supports multiple `BreadcrumbList` trails per page, so ABE's one-canonical-path rule is a deliberate cannibalisation choice rather than a platform limit.
- **Organization notes added:** no required properties; homepage or About page only, not every page; most-specific subtype. Flagged that **`vatID` and `naics` are EU/North-American schemes irrelevant to an Australian business** — `taxID` carrying the ABN is the realistic identifier, and `iso6523Code` only applies if ABE actually holds a DUNS, GLN or LEI. Supersedes the earlier blanket advice to add `iso6523Code`.
- **Article author markup best practices added** and scoped to every `author` field in the skill, not just Article: one author per entry, never merged; `author.name` carries the name only (job titles to `jobTitle`, not smuggled into the name); `Person` vs `Organization` used correctly, never `Thing`; `url`/`sameAs` pointing at the existing ProfilePage `@id`. ABE's expert entities should be audited against this.
- **Image metadata spec detail added**, including the requirement set (`contentUrl` plus one of creator/creditText/copyrightNotice/license), `license` as the Licensable-badge gate, per-instance repetition for structured data vs once-per-file for IPTC, and structured data winning on conflict. **Tied to the helpful-content standard:** the IPTC Digital Source Type values (`trainedAlgorithmicMedia` and friends) and C2PA support are the enforcement mechanism for §2a's disclosure duty — with the ruling that declaring a generated image makes it honest but never satisfies §5's requirement for a genuine course-environment screenshot.
- **Q&A exclusion upgraded from assumed to confirmed** — the spec names a self-written FAQ page with no user-submitted answers as an explicitly invalid use case, which is ABE's exact situation.

#### 4. Authority-model fix — `parentOrganization` in the homepage @graph

- **`parentOrganization` removed from ABE's homepage schema.** Confirmed with Andrey that **Blue Dog Training is not ABE's parent company**. The homepage `@graph` had ABE's `EducationalOrganization` node carrying `parentOrganization` → Blue Dog Training (with `hasCredential` RTO 31193 and `recognizedBy` ASQA). The intent was sound — keep the RTO credential off ABE's node — but `parentOrganization` asserts **corporate ownership**, telling Google that ABE is a subsidiary of an RTO. That is the exact overclaim `authority-model.md` exists to prevent, stated in the most prominent schema block on the site. It was also wrong about the partnership itself: ABE has **three** RTO partners (Blue Dog 31193, AlertForce 91826, Upskill 45708), so promoting one to parent misrepresents the other two.
- **Correct pattern recorded in `seo-strategy.md` §2 and `schema-implementation-guide.md` §3:** ABE's node carries no `parentOrganization` and no `subOrganization` (the reverse makes the same claim); each RTO partner gets a standalone `Organization` node with its own `hasCredential` and `recognizedBy`; the relationship is expressed only at course level through `Course.provider` per the existing provider decision tree, which is accurate — the RTO provides the course, it does not own the company. Noted that schema.org has no clean "delivery partner" predicate and that `memberOf` / `affiliation` must not be used as substitutes.
- **Added to the `authority-model.md` prohibited-claims table** (automatic pre-production FAIL): `parentOrganization` or `subOrganization` linking ABE to any RTO partner in schema markup.
- **Flagged as a live-site defect, not just a skill defect.** Wherever this @graph is deployed through the LearnWorlds global head slot, the published markup is currently making the ownership claim and needs correcting at source.

#### 5. AI features, generative-AI content guidance, title links

Six further Google docs read (AI features and your website, the generative-AI optimisation guide, generative-AI content guidance, title links, maintaining SEO, developer get-started). The engine's existing mythbusting block held up against the primary source with no corrections needed — but the pass found one internal contradiction and several gaps.

- **Contradiction resolved — `llms.txt`.** `seo-strategy.md` Tier 3 listed "llms.txt file" as roadmap item 20 while `SKILL.md` correctly said not to build one for Google. Item struck, with the reason recorded: Google Search ignores these files, so creating one neither helps nor harms. Keep one only if a non-Google service consumes it.
- **Fourth AI-content governance gate added — auto-generated metadata.** Google's generative-AI content guidance extends the accuracy/quality/relevance standard explicitly to automatically generated **`<title>` elements, meta descriptions, structured data and alt text** — the four artefacts this engine produces on every run. A hallucinated fee in a meta description or a schema property contradicting the visible page is a content defect of the same class as a wrong body fact.
- **"Structured data must match the visible text"** added to the schema technical rules, flagged as carrying extra force for auto-generated markup where nothing forces the two to agree, and as a trust failure (not just a manual-action risk) on YMYL pages.
- **Google's own title-rewrite triggers added to `meta-framework.md`** as a primary-source table beside the existing third-party rewrite-rate data. Two matter for ABE specifically: **obsolete `<title>`** (visible heading updated year to year, title left behind — a live risk on dated fee and "Updated [Month YYYY]" pages) and **micro-boilerplate** (a subset of pages sharing a title with the distinguishing detail missing — the title-level twin of the state-swapped-copy anti-pattern). Also recorded that Google states there is **no character limit** on `<title>`; the 51–60 targets are third-party display heuristics and must not be cited as a Google rule.
- **Two Search Console facts recorded:** generative-AI eligibility is **not automatic** — a site must be included in Search generative AI features in Search Console beyond being indexed and snippet-eligible; and the **Generative AI performance report** is the proper measurement surface, with AI Overviews and AI Mode also rolling into the standard Performance report under "Web".
- **Third-party tooling caveat added:** no third-party tool has access to Google's internal ranking or AI systems. Directly relevant to the keyword and visibility tooling in this workflow — treat those numbers as directional and let Search Console be the source of truth for ABE's own performance.
- **Quality Rater Guidelines §4.6.5 and §4.6.6** cited in `helpful-content-standard.md` §2a as the practical descriptions of scaled content abuse and of low-effort/low-originality main content. Added **the fan-out trap**: generating a page per query variation is named by Google as violating the scaled-content policy when done to influence rankings or AI responses — the exact temptation an SEO engine faces.
- **Precision correction to this skill's own 19 Jul image-metadata entry.** The IPTC `TrainedAlgorithmicMedia` requirement was stated as a flat obligation. It is a **Merchant Center policy** ("must"); for Google Search generally the guidance is only to *consider* adding creation background and image metadata. ABE runs no Merchant Center feeds, so the strict form doesn't bind. ABE's declaration rule is retained but relabelled as a **house rule stricter than Search requires**, so nobody cites it as a Google requirement.

#### 6. Indexable file types — non-HTML cannibalisation

Two further Google docs read (crawling/indexing topic overview, file types indexable by Google). The crawling overview is a table of contents and yielded nothing beyond pointers. The file-type list exposed one real gap.

- **New `quality-gates.md` §2a — non-HTML cannibalisation sweep.** Every cannibalisation check in this skill assumed the competing document was another HTML page. Google indexes the text of most document formats (PDF, DOC/DOCX, XLS/XLSX, PPT/PPTX, ODT/ODS/ODP, RTF, EPUB, TXT, CSV, XML, SVG), so a handbook, fee guide, checklist or sample certificate published as a PDF competes with the HTML page written for the same query. Added `filetype:` sweep queries to run against the live index, plus triage rules — `noindex` via **`X-Robots-Tag` HTTP header** (a `<meta>` robots tag cannot be applied to a PDF), 301 where the file has inbound links, or keep-and-cover where the document is genuinely useful standalone.
- **Documents flagged as a date-integrity blind spot.** Downloadables sit outside every freshness check in the skill — a PDF stating a superseded fee stays wrong indefinitely and nobody re-reads it during a content refresh. Any fee or eligibility rule living in a downloadable now needs a freshness-registry entry like any other regulatory fact. This connects the file-type finding to the date-freshening anti-pattern in `helpful-content-standard.md` §6.
- **Added to the Known Site-Wide Issues table** as *Unaudited*, alongside the existing unresolved legacy `.cfm` cannibalisation entry — the `inurl:.cfm` sweep in §2a also diagnoses that one.
- **Serving note for the Astro/Cloudflare stack:** Google determines file type from the **`Content-Type` HTTP header**, using the extension only as fallback when the header is missing or incorrect — so a Worker serving documents with a generic Content-Type can cause mis-parsing.

#### 7. URL structure

Google's URL structure guidance read against `page-type-engine.md` §2. The existing rules (hyphens not underscores, lowercase, no special characters, no trailing slash, state codes) all hold — nothing to correct. Five additions covering what the rules assume but don't state.

- **Lowercase reframed as a server rule, not an authoring convention.** Google's URL handling is case sensitive — `/apple` and `/APPLE` are distinct URLs with their own content. Authoring in lowercase doesn't prevent both resolving and splitting signals; case needs normalising at the edge, the same way `trailingSlash: 'never'` is enforced rather than assumed.
- **Tracking parameters named as the live duplicate-URL risk.** The "no special characters" rule governs authored URLs, but ABE's paid traffic arrives on `?gclid=` and `?utm_*`. Google names referral parameters, sorting parameters and session IDs as causes of URL proliferation. Recorded that the self-referencing `rel=canonical` is what contains this and should be treated as load-bearing, and that campaign URLs must never enter a sitemap or internal link.
- **Fragment rule recorded, with the distinction that matters:** Google generally doesn't support fragments serving different content, but fragments as anchors within one page are fine — which is why hash-fragment schema `@id` values and Google's own all-in-one Course `ItemList` example (`/courses#course-name`) are both legitimate. Noted so neither gets "corrected" by mistake.
- **Root-relative links required over parent-relative** — a misplaced `../../` on a page not returning a proper 404 can generate infinite bogus URL spaces. Flagged for Astro components that render at varying route depths.
- **Explicit ruling: ABE is not a multi-regional site.** State subdirectories are topical segmentation within one country, not geotargeting. Google's multi-regional URL guidance and `hreflang` do not apply — recorded to stop anyone reaching for them because the site is organised by state.

#### 8. Crawl & index controls (new reference file)

Nine Google docs read (valid page metadata, robots meta/X-Robots-Tag, noindex, robots.txt, canonicalisation + troubleshooting, link best practices, outbound link qualification, mobile-first indexing, image sitemaps). New file **`references/crawl-index-controls.md`** — the skill had no coverage of head validity, robots rules, snippet controls or link qualification.

- **Head validity — the highest-severity finding.** Only `title`, `meta`, `link`, `script`, `style`, `base`, `noscript` and `template` are valid in `<head>`, and **Google stops reading the head at the first invalid element**, ignoring everything after it. `<img>` and `<iframe>` are the ones that appear in practice. ABE injects the homepage `@graph`, per-page schema, canonicals and meta through LearnWorlds custom-code slots — the same slots third-party tracking pixels and embeds get pasted into. One `<img>` pixel above a schema block makes that block and the canonical below it invisible, with no error and no validation failure. Added as a warning in `SKILL.md` beside the deploy notes, with the rule that this is checked **first** when schema goes missing.
- **Snippet controls now gate AI Overviews — previously undocumented.** `nosnippet` prevents content being used as a direct input for AI Overviews and AI Mode; `max-snippet:[n]` limits how much may be used. Given that AI-features visibility is an explicit goal of this skill, recorded an ABE ruling: never set `nosnippet` or a restrictive `max-snippet` on course, hub or expert pages, and treat either as the first suspect on a page underperforming in AI Overviews. Also recorded the **structured-data exemption** — snippet limits don't restrict schema used for rich results, and schema stays usable even inside a `data-nosnippet` element (except article `description` values).
- **Completed the PDF triage added earlier today.** The `X-Robots-Tag: noindex` advice was incomplete: `noindex` is only seen if the file remains **crawlable**. Disallowing the same file in robots.txt means Google never fetches it, never reads the header, and it can stay indexed — the two controls cancel out. Also noted the `rel="canonical"` HTTP header as the only canonical method available for non-HTML files.
- **Canonical caveats, including one specific to ABE.** The canonical element is only accepted **inside `<head>`** (unlike robots rules, which Google honours in the body too) — so the head-validity finding is a direct threat to it. Google's JavaScript guidance is to set the canonical in HTML source and not let JS change it, or set it *only* with JS — the LearnWorlds `/home` workaround injects a canonical via JavaScript **to override one LearnWorlds already emits**, which is the exact case Google warns against. Flagged as fragile-but-workable, to be verified via URL Inspection rather than assumed.
- **Duplicate-cluster timing recorded:** Google may hold pages in a duplicate cluster for **up to two weeks** after content is fixed, and they split out faster when the difference is clear and significant. This is the practical answer to "we differentiated the state pages, why hasn't anything moved" — and it means a token rewrite won't split a cluster at all.
- **`.gov.au` links must not be nofollowed.** Google states that linking out builds trustworthiness, that citing sources is the model case, and that `nofollow` is for sources you don't trust. ABE's government citations underpin the trust model in `helpful-content-standard.md` §3, so nofollowing them works directly against the E-E-A-T they exist to create. Added an instruction to audit for blanket "nofollow all external links" platform settings.
- **Anchor-text additions** to the existing rules in `page-type-engine.md`: the out-of-context test, don't chain adjacent links, keyword stuffing in anchors is a spam-policy issue, every page should be linked from at least one other page, and — connecting `alt-text-guidelines.md` to the internal-link map — **for image links the `alt` attribute *is* the anchor text**, so a linked badge or card image with empty alt is an empty link.
- **Mobile-first parity:** indexing runs on the mobile page. **Accordions and tabs are explicitly endorsed** by Google as the way to condense rather than remove content, which confirms ABE's FAQ accordion pattern is safe. Content lazy-loaded behind a tap is effectively unindexed. Structured data, titles, descriptions, headings and alt text must be equivalent on mobile.
- **Image sitemap tags deprecated:** only `<image:image>` and `<image:loc>` survive — `<image:caption>`, `<image:title>`, `<image:license>` and `<image:geo_location>` were removed from the spec.
- **Confirmed ignored by Google** (don't spend effort): meta keywords, the HTML `lang` attribute, `rel="next"`/`rel="prev"`, `noarchive`, `nocache`, `nositelinkssearchbox`.

#### 9. Snippets, page experience, interstitials

Four Google docs read (control your snippets, understanding page experience, avoid intrusive interstitials, Core Web Vitals). **No corrections needed on Core Web Vitals** — `seo-strategy.md` §13 already carries the right metrics and thresholds (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1) and `freshness-check.md` already records that INP replaced FID. Four additions.

- **Qualified yesterday's accordion finding — new §7a in `crawl-index-controls.md`.** Yesterday's entry recorded that Google endorses accordions and tabs over removing content on mobile. True, but incomplete: the snippets documentation asks that content be **immediately visible and not hidden behind an expandable section or tabbed interface** to be eligible for "Read more" deep links. Both statements are Google's and they don't cancel out — **collapsing protects indexing but costs deep-link eligibility**. Recorded as a per-section decision rather than a site-wide one: keep FAQ and long compliance detail collapsed; keep the section answering the page's primary question (eligibility, fees, what the course is) expanded, since that is what a deep link would target. Also recorded: don't force scroll position on load, and don't strip the hash fragment from the URL, which breaks deep linking.
- **New §7b — interstitials and dialogs**, previously uncovered anywhere in the skill. Banners rather than full-page interstitials; never obscure the whole page; and the sharp one — **never redirect users to a separate page for consent or input, because redirecting all URLs to a single consent page removes every page but that one from search results.** Legally mandatory interstitials are exempt but should overlay rather than redirect so the content underneath still indexes.
- **New §7c — page-experience calibration**, recorded to guard against over-investment as much as neglect. There is no single page-experience signal; Core Web Vitals *are* used by ranking systems, but other page-experience aspects don't directly raise rankings; and Google states that chasing a perfect score purely for SEO may not be the best use of time. Evaluation is generally page-specific. Google's own self-assessment list ends with "main content easily distinguishable from other content", which overlaps directly with `abe-readability-audit`.
- **Meta description reality check added to `meta-framework.md`.** Four points: there is **no length limit** (the 150–160 figure is a display heuristic, not a Google rule — the same correction already made for `<title>`); **the description is not the snippet**, since snippets are built primarily from page content and vary by query, making the description a suggestion rather than a guarantee; **programmatic generation is explicitly encouraged** by Google where hand-writing isn't practical, provided output is human-readable and diverse — validating how this engine works while explicitly not licensing templated sameness, which Google calls out as unhelpful; and **descriptions need not be sentences** — Google endorses packing in clearly separated structured facts, which for an ABE course page means price, duration, state, approval body and outcome.

#### 10. Skill audit — integrity, duplication, wiring

Ran as automated checks across all 36 reference files plus SKILL.md, not a read-through.

**Clean, verified by check:** no orphaned files (every reference file is linked from SKILL.md or another reference); no genuinely dangling references (the two flagged were a *proposed* future file in a note and a historical eval filename in this changelog); reference count of 35 confirmed accurate; all cross-file `§` section pointers resolve except one historical changelog pointer to `freshness-check.md` §7, which was restructured into named sections — left as a period record; the banned word "comprehensive" appears only in rules forbidding it; the apparent US spellings are all schema.org property names (`recognizedBy`, `Organization`) and must not be "corrected"; no unbalanced code fences, no encoding damage.

**Defects found and fixed:**
- **Duplicated content — the `parentOrganization` correction had been pasted verbatim into both `schema-implementation-guide.md` §3 and `seo-strategy.md` §2** (six near-identical sentences). The schema guide now holds the canonical explanation; `seo-strategy.md` carries a short summary and an explicit "do not restate them here" pointer. Cross-file duplicated sentences dropped 17 → 9.
- **The `Skill content last updated` line in SKILL.md had grown to 6,098 characters on a single line**, having been prepended once per pass through the session. Collapsed to 507 characters with the detail delegated to this changelog, which is where it belongs.
- **FAQ rich-result deprecation was stated three inconsistent ways** across `seo-strategy.md`, `schema-org-opportunities.md` and `schema-implementation-guide.md` — "Aug 2023", "May 2026" and "restricted since Aug 2023". These are two real events being reported as one: restricted to government/health sites **Aug 2023**, then **fully deprecated May 2026** (Rich Results Test support removed June 2026, Search Console API Aug 2026). Reconciled to the full timeline in both stale locations, pointing at `freshness-check.md` as the canonical record.

**Remaining duplication is deliberate and was left alone:** the RTO disclosure wording repeated in `authority-model.md` and `badge-inventory.md` (must be verbatim identical to be compliant), the shared caution line across the five state legislation files (each must be standalone-readable), and the no-regulatory-facts connector rule stated in both SKILL.md and `keyword-research.md` (a hard blocker worth repeating).

**Deliberately not changed — flagged for a decision.** The `Skill last audited` date remains **2026-07-10**. Today's work was a documentation review against primary sources, not the formal freshness-audit workflow, which has a defined process of re-checking registry entries live and updating their `Last verified` dates. Advancing the audit date on the back of this session would assert a verification that didn't happen in that form — the same date-integrity failure this session added a rule against. The registry entries covering the sources actually read today are, however, genuine candidates for re-dating through the proper workflow.

#### 11. Freshness audit — Full tier, partial completion

Run at **Full** tier (all 32 registry entries / 40 URLs). **Completed live: 2 of 40 sources.** Reported honestly rather than marked complete — see coverage note below.

**Live-verified (web_fetch, 2026-07-20):**
- **1.3 FAQPage** 🔴 — source page last updated 2026-05-08. No drift on substance, but **two pieces of guidance the skill did not carry**:
  - **Repetitive FAQ markup:** Google requires that where the same question *and* answer appear on multiple pages, **only one instance is marked up for the entire site**. ABE state course pages carry overlapping FAQs (eligibility, fees, delivery mode), so this is a **likely live breach**. Added to `schema-implementation-guide.md` §14 with the triage: genuinely state-specific answers aren't repetitive and may each keep markup; word-for-word identical answers must be marked up once only.
  - **Collapsed FAQ answers are explicitly valid** — "question visible, answer behind an expandable section" is a valid use case in Google's own list. This settles the FAQ half of the accordion trade-off recorded earlier today in `crawl-index-controls.md` §7a: FAQ answers may be collapsed freely; the deep-link trade-off applies only to non-FAQ primary content.
  - Deprecation date sharpened from "May 2026" to **7 May 2026**, and confirmed that rich-result eligibility remains limited to authoritative **government or health** sites — meaning ABE was never eligible and lost nothing.
- **2.4 Featured snippets** — source page last updated 2025-12-10. ✅ No drift. Confirmed featured snippets can't be requested or marked up; opt-out is `nosnippet` (all) or progressively lower `max-snippet` (featured only, not guaranteed); they also appear inside People Also Ask; and **clicking one auto-scrolls to the exact section without annotation**, reinforcing the deep-link guidance in `crawl-index-controls.md` §7a.

**Coverage note — why 2 of 40.** Each `web_fetch` of a Google Search Central page returns the full site navigation (~8k tokens) alongside the content, so a 40-source Full run does not fit in a single session's context. Fetching is also gated: URLs must surface in a search result before they can be fetched, adding a search per source. The remaining 38 are **not** verified and their `Last verified` dates were left at 2026-05-26 rather than advanced — advancing them would assert verification that didn't happen.

**Mitigating context:** the bulk of registry Sections 1–4 (structured data specs, helpful content, AI features, title links, snippets, page experience, Core Web Vitals, crawling/indexing, URL structure, robots rules, canonicalisation, links, mobile-first) was read end-to-end earlier the same day from primary Google documentation supplied by the user. That is genuine verification of content, but not a registry-workflow verification with a fetch timestamp, so those entries are also left un-advanced.

**Recommended next step:** run the remaining 38 in batches of ~6 per session, prioritising 🔴 entries not covered today — spam policies, Quality Rater Guidelines, Search Essentials, site names, and Sections 5 (schema.org vocabulary) and 6 (Bing), none of which this session touched at all.

**`Skill last audited` left at 2026-07-10** — a partial run must not advance it.

#### 12. Three more Google docs — traffic-drop debugging, GA+GSC, Google Trends

Genuine gap, not a correction: the skill built and optimised pages but had **no diagnostic workflow at all** for
what happens after publish when something goes wrong. Search Console was named only as "source of truth" in
passing, with no procedure attached. Added **`SKILL.md` Step 7.6 — Diagnosing a Traffic Drop**, positioned after
the existing Step 7.5 (which tracks new-page rank gains, not drops on existing pages — a genuinely different
diagnostic direction).

Step 7.6 covers: shaping the drop with a 16-month date range before diagnosing (rules out seasonality); reading
impressions-vs-clicks shape to route straight to title/snippet work when impressions hold but clicks fall; the
small-vs-large position-drop distinction (small = do nothing, it's normal fluctuation); Google's own cause
checklist in the order it recommends checking them (algorithmic update, technical, security, spam, seasonality,
site move); when to bring in Google Analytics and the eight named causes of a GSC/GA discrepancy (timezone is the
one most likely to bite ABE, since GSC is fixed to Pacific Time against an Australian property); and Google
Trends as context only — with an explicit rule against letting a rising term justify a page ABE wouldn't
otherwise write, tying back to the search-engine-first anti-pattern in `helpful-content-standard.md` §2.

Cross-referenced throughout to existing skill sections rather than restating them: `meta-framework.md` for the
impressions-held/clicks-dropped case, `crawl-index-controls.md` §1/§3 for the noindex/technical-fault case and §2
for the canonical-URL discrepancy cause, and `quality-gates.md` §2a for the PDF-in-GSC-but-not-GA case.

**Registry additions** — three new entries (4.6, 4.7, 4.8), all live-verified 2026-07-20, backing the new step.
Registry count 32 → 35.

#### 13. Freshness audit batch 2 — spam policies, Search Essentials, site names

Continuation of the Full-tier run. **4 more sources verified live** (3 fetched/searched fresh + 1 newly added
entry), bringing the running total to 9 of 40. Prioritised as agreed: 🔴 entries the earlier passes hadn't
touched.

- **3.3 Spam policies** 🔴 — source last updated 2026-05-15 UTC. **Scope expansion found:** the top-level
  definition of spam now explicitly names "attempting to manipulate generative AI responses in Google Search"
  alongside manipulating rankings, effective 15 May 2026. Not a new policy item — a scope change to the
  definition itself, meaning every existing category (scaled content abuse, hidden text, cloaking, etc.) now
  covers AI Overview/AI Mode manipulation as directly as classic rankings. Wired into `helpful-content-standard.md`
  §2a. Independently, **accordions/tabs are named as an explicit non-violation** of hidden-text/link abuse —
  third confirmation this session (after the FAQ registry entry and `crawl-index-controls.md` §7a) that collapsed
  content is safe. Site reputation abuse and thin affiliation formally defined for the first time; ruled
  out-of-scope for ABE (no third-party content hosting, no affiliate program) and deliberately not added to the
  active rule set.
- **3.4 Search Essentials** 🟢 — no drift. Three-part framework (technical requirements / spam policies / key best
  practices) confirmed unchanged.
- **New 3.7 Site names** — not previously in the registry or the skill at all. **Finding relevant to ABE's
  architecture:** Google supports only one site name per domain/subdomain, with no subdirectory-level site names.
  ABE's state-subdirectory structure can never get a distinct Google-shown "site name" per state — not a defect,
  since this has never been attempted, but recorded so it isn't mistaken for an implementation gap later.

**Coverage running total:** 9 of 40 (1.3, 2.4, 3.3, 3.4, 3.7, 4.6, 4.7, 4.8, plus this batch). Registry entries
32 → 36. Remaining priority for the next batch: Quality Rater Guidelines (🔴, large PDF — target sections rather
than reading end-to-end), Section 5 (schema.org vocabulary, 3 URLs), Section 6 (Bing, 1 URL), and the 3.5/3.6
trust-signal entries.

**`Skill last audited` still held at 2026-07-10** — coverage remains partial.

#### 14. Freshness audit batch 3 — QRG, schema.org vocabulary, Bing

Continuation of the Full-tier run. **6 more sources checked**, bringing the running total to **13 of 40**
(1.3, 2.4, 3.2, 3.3, 3.4, 3.7, 4.6, 4.7, 4.8, 5.1, 5.2, 5.3, 6.1). Own bug caught and fixed mid-batch: an earlier
insertion had duplicated the entire 3.6 entry verbatim — removed.

- **3.2 Quality Rater Guidelines** 🔴 — **verified via secondary reporting of Google's own changelog, not a direct
  PDF fetch** (flagged as lower-confidence than the live-fetch entries). YMYL formally expanded 11 Sept 2025 to
  add a **Government, Civics & Society** category (elections, civic institutions). **Ruled out of scope for
  ABE** — this concerns elections/civics, not building regulation, and doesn't broaden ABE's existing
  financial-stability/safety YMYL classification. Google's own statement confirmed: "no changes to the overall
  guidance provided to search quality raters" — the update was definitions and examples only, so
  `authority-model.md`'s E-E-A-T pathway logic needs no revision.
- **3.3 Spam policies** 🔴 — already covered and applied in batch 2 (AI-response manipulation now explicit in the
  spam definition; accordions confirmed non-violation a second time).
- **3.4 Search Essentials** — no drift, three-part framework confirmed.
- **5.1 Schema.org vocabulary** — current release confirmed **v30.0, 2026-03-19**. New type `WorkBasedProgram`
  found (apprenticeship-specific) and ruled not applicable to ABE's short-course offerings.
- **5.2 Education-specific types** — no drift on any of the six types. `educationalProgramMode` confirmed current
  and already correctly present in `schema-org-opportunities.md` §1.
- **5.3 Person and credentials** — no drift. `hasCredential`, `credentialCategory`, `competencyRequired`,
  `recognizedBy` all match current `authority-model.md` implementation exactly.
- **6.1 Bing** — **search-verified only, primary Bing docs not fetched — explicitly flagged as the lowest-confidence
  entry in this registry.** Two findings, both held to a higher bar before touching the skill: Bing reportedly
  relies on structured data more directly than Google (consistent with, and now a confirmed rationale for, the
  skill's existing complete-rather-than-minimal schema practice — no change made). A possible new **Bing
  Webmaster Tools "AI Visibility Insights"** feature (Citation Share, Topics, Intents) was reported by multiple
  secondary sources but **not added to the skill** — the claim needs primary-source confirmation before it earns
  a place in `SKILL.md` Step 7.6, and the bar for adding a new measurement surface should be higher than for
  confirming an existing rule.

**Coverage running total: 13 of 40.** Remaining unchecked: 1.1, 1.2, 1.4–1.9 (8 structured-data entries), 2.1,
2.2, 2.3, 2.5, 2.6, 2.7 (6 appearance entries), 3.1, 3.5, 3.6 (3 content-quality entries), 4.1–4.5 (5 technical
entries). All of Section 1 (structured data hub through validator) and most of Section 2 remain, despite being
adjacent to material already read from primary sources in the earlier documentation-review passes — worth a
targeted batch that fetches only what wasn't covered there.

**`Skill last audited` still held at 2026-07-10.**

#### 15. Freshness audit batch 4 — Course info, sitelinks deprecation, image/helpful-content re-confirm

Running total now **18 of 40** (added 1.1, 1.8, 1.9, 2.6, 3.1 this batch as checked; 2.5 explicitly flagged as
still outstanding rather than guessed at).

- **1.1 Structured data hub** 🔴 — the significant finding of this batch. **"Course info" is a second, distinct
  Course-type rich result** (richer carousel: ratings, price, enrolment, syllabus, outcomes) that the skill had
  never named, launched Nov 2023 and confirmed still live. Cross-checked against ABE's actual templates in
  `schema-implementation-guide.md`: **already mostly implemented** — `CourseInstance`, `Offer`, `AggregateRating`,
  `totalHistoricalEnrollment`, `educationalLevel`, `teaches` are all present. Genuinely missing: `syllabusSections`
  and `financialAidEligible`. Added as new §0 in `schema-org-opportunities.md` with the action to verify Course-info
  eligibility specifically in Rich Results Test rather than assume it from property presence. Also caught and
  recorded a **secondary-source error**: one search result claimed Course Info was retired in June 2025; Google's
  own live documentation contradicts this. The seven actually retired are Book Actions (later reinstated), Claim
  Review, Estimated Salary, Learning Video, Special Announcement, Vehicle Listing, Practice Problems.
- **1.8 Logo/sitelinks** — sitelinks searchbox deprecation confirmed still in effect (retired 21 Nov 2024, no
  ranking impact, no error from leftover markup). Confirmed `WebSite` structured data for site names is a separate,
  still-fully-supported feature — no ABE action needed.
- **1.9 Schema validator** — not independently re-checked; both tools were used live elsewhere in this session,
  which confirms availability as a side effect rather than a deliberate check.
- **2.6 Image SEO** — re-confirmed against the image metadata document read in full earlier this session (not a
  fresh fetch of this specific URL). No drift; alignment with `alt-text-guidelines.md` and the IPTC digital-source
  work already wired in confirmed.
- **3.1 Helpful content guidance** — the **highest-confidence entry in the registry**. This is the primary source
  read in full at the start of the session, which is what `helpful-content-standard.md` was rewritten from. No
  further drift.
- **2.5 Visual elements gallery** — explicitly **not checked** this batch. Flagged in the registry rather than left
  silently stale, so it isn't mistaken for a pass.

**Coverage running total: 18 of 40.** Remaining: 1.2, 1.4, 1.5, 1.6, 1.7 (structured-data types largely covered by
earlier full-document reads this session but not yet cross-checked against the registry specifically), 2.1, 2.2,
2.3, 2.5, 2.7 (appearance), 3.5 (trust signals — 3.6 already checked), 4.1–4.5 (technical — also largely covered by
earlier reads, same caveat).

**`Skill last audited` still held at 2026-07-10.**

#### 16. Freshness audit batch 5 — remaining structured-data entries closed via full-document reads; own error fixed

Running total: **30 of 36 registry entries now dated 2026-07-20** (registry entries ≠ raw URL count of 40; several
entries share a source URL, which is why this looks ahead of the "X of 40" figure used in earlier batches — see
note below).

- **Own inconsistency caught and fixed: 3.6 Trust bars.** The batch-3 changelog claimed "3.6 already checked" but
  the registry date was never actually updated. Fixed — 3.6 shares its source URL exactly with 3.1
  (creating-helpful-content), which was read in full at the session's start, so it's now closed on that basis.
- **Six entries closed via full primary-source document reads already done earlier this session, not fresh
  fetches** — 2.1 Title links, 2.2 Snippets, 2.3 AI features, 4.1 Canonicalisation, 4.2 Robots.txt, 4.4 Page
  experience/CWV. Each entry's Source URL was checked against what was actually read earlier in the session and
  matched exactly before closing. No drift found on any of the six.
- **1.2 Course, 1.4 BreadcrumbList, 1.6 Q&A** — no drift, confirmed search-verified or via the 1.1/earlier
  full-document work.
- **1.5 Article** — no drift, and **reinforced**: multiple independent 2026 sources describe Article schema as now
  the most important type for AI Overview citation following the FAQ/HowTo removals. Strengthens the existing
  Article-schema opportunity in `schema-org-opportunities.md` — worth prioritising over any further FAQ investment
  if ABE builds a resources/guides section.
- **1.7 Organization** — no drift; this is the entry underlying the `parentOrganization` fix made earlier this
  session, so no further schema change needed beyond that.

**Coverage note on the "X of 40" figure.** Earlier batches tracked progress against 40 raw source URLs. Several
registry entries share one URL (e.g. 1.2 and 1.1 both reference Course documentation), so **30 of 36 registry
entries** is the more accurate figure going forward — recorded here to avoid a false regression appearing in the
next batch's count.

**Remaining: 2.5 Visual elements gallery, 2.7 Keyword/SERP-feature strategy, 3.5 Trust signals and badges, 4.3
Sitemaps, 4.5 Mobile-friendly content, and 6.1 Bing (already search-verified in batch 3 but flagged there as
lower-confidence — a primary-source fetch would upgrade it).**

**`Skill last audited` still held at 2026-07-10.**

### 2026-07-12 (later)

- **Created `cbos-tas-reference.md`** — it was indexed in SKILL.md but did not exist on disk (a dangling reference, same failure class as `course-page-structure.md`). Built from CBOS + Service Tasmania sources: CPD points-by-licence table, the multi-licence "highest single requirement, not the sum" cap, the 4-point WHS cap, the course-approval gate, and Owner Builder permit trigger/course requirement/frequency/insurance/application path. Three items flagged `[VERIFY AT BUILD]` (OB permit dollar threshold, liability figure, plumber/gas per-module points).
- **Wired in `seo-strategy.md`** (previously orphaned — condensed from 2026 SEO Strategy v2.1, Mar 2026) as **background/supporting only**: its Core Web Vitals (§13) and implementation roadmap (§15) are the unique value. Explicitly subordinated to `schema-implementation-guide.md` for all schema/JSON-LD so the two cannot drift into competing sources.
- Reference-count summary corrected 32 -> 33 SEO reference files.

### 2026-07-12

- **Neil Patel (Ubersuggest) connector wired in as the default Step 2 Mode B data source.** Live search volume, SEO difficulty (`sd`), CPC, SERP composition, competitor keywords, backlinks, technical audits and rank tracking are now queried from the connector, so the engine no longer waits on a manual GSC/Ahrefs/SEMrush CSV to run data-enriched. `SKILL.md` gains a "Live Data Sources — Keyword & Competitive Data" block (tool-per-step map, hard caveats, graceful degradation) mirroring the Notion Experts block; the Step 1 intake table now makes Mode B the default and reframes a user CSV as a *supplement* (it adds ABE's actual GSC impressions/clicks) rather than the trigger; Step 2 Phase 1 names the live source. `keyword-research.md` rewritten accordingly: Mode B is the default and Mode A the connector-down fallback, each of the eight sub-steps is mapped to its connector tool, and the Keyword Map (§12) gains `Volume`, `SEO difficulty (sd)`, `CPC` and `Location basis` columns.
- **Three hard caveats baked in.** (1) **Australian locations are city-level only** — there is no national `locId`; use `location_suggest` for the capital-city ID (e.g. Perth 1000676, searched as bare "Perth") and triangulate across capitals. Figures are relative priority, never a single city's number quoted as national volume. (2) **Modelled volume is not actual traffic** — GSC remains the source of truth for pages ABE already ranks for; the connector's value is the demand ABE does *not* yet rank for, which a GSC export cannot show. (3) **No regulatory facts from the connector** — fees, Act IDs, regulator names, eligibility and penalties stay `.gov.au`-verified and remain the publish hard blocker. The connector supplies demand/competition data only.
- **New Step 7.5 — post-publish rank tracking.** After a page ships, register its primary + secondary keywords and its SERP rivals in a connector project (`create_project`, `add_project_keywords`, `add_project_competitors`) and read `project_position_info` / `seo_opportunities` on the freshness cadence. Complements GSC rather than replacing it; new low-difficulty terms feed back into a future Step 2, subject to the Step 5 cannibalisation gate.
- **Operational limits recorded after a live WA White Card test run.** `keyword_overview` is rate-limited to roughly **3 reports/day** (HTTP 403 after), so `keyword_suggestions` / `match_keywords` are now the default workhorses — both return volume + `sd` + CPC in bulk from one call — with `keyword_overview` reserved for month-by-month trend on 2–3 key terms. `domain_keywords` may require per-call approval, so the `site:abeeducation.edu.au` fallback for the cannibalisation gate is retained. `searchIntent` returns **null for most AU course terms**, so manual intent classification is the norm, not the fallback; `location_suggest` fails on over-specified queries ("Perth Western Australia" returns nothing; "Perth" resolves).
- **`references/course-page-structure.md` created — it was a dangling reference.** `SKILL.md` has been indexing and instructing "read `references/course-page-structure.md`" (Step 4 + Step 6, course pages) but **the file did not exist** in the skill. Built it from `COURSE-PAGE-CONTENT-TEMPLATE.md` v1.13 (17 Jun 2026): the rule-of-the-template, the arc, the hero element stack, the ten content sections (job / reader's question / role in the arc / what each carries), the unnumbered moments, the non-negotiable sourcing rules, and an authority-gated variation table (Owner Builder / White Card / CPD / Bundles).
- **Section count corrected: eight → ten.** The `SKILL.md` Reference Files index described the course page as "the eight content sections". The template has carried **ten** since v1.7/v1.8 added §3 *From the regulator* and §7 *What else your build needs*; the index was never updated. Anything downstream that inherited "eight" should be corrected — `abe-course-page-astro` has been.
- **`abe-course-page-astro` brought into line (companion skill).** Its Stage 2 keyword grounding was still "GSC export, else infer from competitors and note it as a known gap" — a gap the connector now closes. Stage 2 re-ordered to GSC actuals → connector gap-demand → competitor inference only if the connector is down. Stage 1 now reads this skill's verified register **first** (via `content-source-map.md`) and only goes live for what the register does not cover or where the cadence has lapsed, writing newly verified facts back. Stage 3 now pulls `course-page-structure.md` as an explicit must-have skeleton before layering competitor topics and gaps. Stage 7 points at Step 7.5 for rank tracking. The engine is now stated there as a **dependency, not an option**.


### 2026-05-30

- **NSW White Card confirmed live and reconciled skill-wide.** Andrey confirmed the NSW White Card is offered via the Upskill Institute (RTO 45708) partnership. Eight files were updated from "ABE does not offer White Card in NSW / page does not exist" to the live position: `authority-model.md` (decision tree, NSW disclosure block, prohibited-claims table, §5 placement), `online-delivery-policy-by-state.md` (NSW now a bold ABE state; §3 intro and the must-not-self-paced bullet), `regulator-roles-by-state.md` §4, `competitor-pricing-snapshot.md` (scope + price-driver note), `state-fees-register.md` (scope, WC intro, new NSW row, note), `penalties-by-state.md` (scope), `badge-inventory.md` (Blue Dog "cannot appear on" + NSW badge note), and `seo-content-reference.md` (all-states meta example de-attributed from a single RTO).
- **Compliance guardrail preserved.** NSW delivery is recorded as trainer-led virtual classroom (accepted as face-to-face) or in person — **never** self-paced online, which remains restricted to WA and TAS residents. The prohibited-claims table now forbids self-paced/at-your-own-pace wording on NSW pages.
- **Reference-file count corrected.** SKILL.md summary updated 27 → 31 to match the four backlog files built 2026-05-27 (`state-fees-register`, `card-lodgement-process-tas`, `penalties-by-state`, `competitor-pricing-snapshot`).
- **Follow-ups completed (same day):** added the **Upskill Institute partnership badge** (Badge 1.3) to `badge-inventory.md`, covering both NSW White Card and NSW Owner Builder, and corrected the White Card and Owner Builder badge matrices (Blue Dog was wrongly shown for all five states; NSW OB now flagged NRT). Confirmed the **NSW White Card fee position** against official sources — no separate government fee for the initial card (RTO course fee only); replacement card $42 (SafeWork NSW 2025–26). `state-fees-register.md` NSW row pinned with inline Service NSW + SafeWork NSW source links; the ⚠️ is cleared.
- **NSW Owner Builder RTO confirmed:** Andrey confirmed Upskill Institute (RTO 45708) is the NSW Owner Builder RTO, superseding the earlier AlertForce attribution.
- **CTA / accent colour corrected.** `seo-content-reference.md` Design rules wrongly named **Safety Gold #E8B00F** as the accent colour for primary CTAs; corrected to **Heritage Maroon #800000** (10.95:1 contrast, passes AA/AAA), consistent with `SKILL.md`. Standardised the #800000 name skill-wide from "Burgundy" to **Heritage Maroon** (the design-system name). Safety Gold is retained only as a decorative checkmark/highlight colour in `trust-bar-guidelines.md` and in the SKILL.md WCAG warning against using it for text.
- **Fees register fully pinned.** The last ⚠️ cell — **WA owner-builder approval (Form 75)** — was confirmed against the LGIRS Building and Energy fee schedule (updated 5 Feb 2026): **$212.00** residential / **$467.00** industrial/commercial (non-refundable, GST not payable), superseding the stale 2013 $145/$444 figures. `state-fees-register.md` §1 WA row, §4 backlog, and the Verified line updated; no ⚠️ cells remain.
- **Source citation enforced in output.** Citing government/legislative sources in the rendered page is now a **hard publish blocker**, not a soft flag, and applies to all such factual claims (permit thresholds, eligibility rules, regulator identity, statutory requirements) — not only fees/penalties. `quality-gates.md` §4 gains two hard blockers (visible citation on every government/legislative claim; consolidated Sources section), §6.7 broadened to non-numeric claims plus a new page-level **Sources list** spec; `content-formatting-guidelines.md` adds rule SC6 and a 14th pre-publish self-check; `SKILL.md` adds a Sourcing & citation block to the 2026 checklist. The gate defines a two-tier source hierarchy so it doesn't over-trigger: **primary** (the Act/regulation/determination or the regulator's official fee schedule/register — required for a specific statutory provision or exact figure) and **acceptable secondary** (an explanatory guide, fact sheet, or FAQ published by the issuing authority on its own domain). Aggregators/directories (incl. ABLIS), blogs, competitor and ABE pages, Wikipedia, and archives never satisfy the gate.
- **Full skill audit (no contradictions found, structure tightened).** End-to-end audit for contradictions, duplication, best-practice alignment, workflow logic, reference usage, and output completeness. Result: factual surface clean (RTO numbers, ASQA 7-location count, owner-builder slugs, colours, citation rules all consistent). Fixes applied: (1) one residual contradiction corrected — `competitor-pricing-snapshot.md` still said ABE "does not offer" the NSW White Card; updated to the live Upskill position. (2) Changelog moved out of `SKILL.md` into `references/changelog.md` (progressive disclosure; trims the runtime body). (3) The 13 state/regulatory data files (fees, penalties, eligibility, legislation, regulator roles, PPE, delivery, lodgement, competitor pricing) — previously reachable only via `content-source-map.md` — are now listed in a "State & regulatory data files" subsection of SKILL.md's Reference Files index. (4) Tables of contents added to the six reference files over 300 lines that lacked one (badge-inventory, trust-bar-guidelines, freshness-check, page-type-engine, quality-gates, schema-org-opportunities). Note: SKILL.md remains ~640 lines (over the ~500 soft ideal) but retains a clear step/pointer hierarchy; the Notion live-data section and Step 5.2 checklist are the candidates if further slimming is wanted.
- **Eval set added (`evals/`).** First regression harness for the skill: `evals/evals.json` — 6 realistic prompts, 38 verifiable expectations — covering the NSW White Card build (Upskill RTO 45708; ABE ≠ RTO; never self-paced; 7-location ASQA; citations + Sources list; provider-correct schema), QLD Owner Builder (ABE-direct under QBCC, no ASQA, Dominic from Notion, fee cited), ACT White Card (AlertForce RTO 91826; classroom delivery; no Blue Dog badge), keyword research from a topic, standalone schema audit, and a pre-production trap on a deliberately flawed draft (`evals/files/draft-nsw-whitecard-flawed.md`) that must catch ABE-as-RTO, self-paced-NSW wording, an uncited government fee, and a missing Sources list. `evals/README.md` documents coverage, how to run (with-skill vs baseline via the skill-creator harness), and maintenance. Rationale: the skill's facts change most sessions, so the compliance invariants needed a tripwire.
- **Single canonical home for repeated numbers (drift-proofing).** The meta title/description/H1 targets and the readability limits appeared, identically, in several files. Declared owners and pointed the mirrors at them: `meta-framework.md` owns meta title / description / H1 length, position, and rewrite rules; `content-formatting-guidelines.md` owns paragraph / sentence / list / words-between-headings / answer-capsule / FAQ-answer limits; `alt-text-guidelines.md` owns alt-text length. The quick-reference copies in `SKILL.md` ("Key numbers") and `seo-content-reference.md` (the §1 numbers table and the §3 Meta Titles section) now carry "mirror, not source of truth — edit the owner first" notes. No figures changed; this only fixes *where* a future edit lands so the copies can't silently diverge.
- **Eval set refined after the first measured run (iteration-1 baseline recorded).** First skill-creator harness run (Notion live, web available): with-skill **37/38 = 97.4%** vs no-skill baseline **16/38 = 42.1%** (+55.3 pp; macro +52.7 pp). Regression gate (eval 6) passed — caught all four seeded faults. Two refinements applied off the back of it, recorded in `evals/README.md` run history: (1) eval 1's meta-title expectation re-specified to the real standard (≤60 hard limit; ~45–60 passes; 51–55 ideal) — the old 51–60 floor failed a serviceable 50-char title by coding a style preference as a gate; (2) eval 4 tightened 5 → 6 expectations with ABE-specific checks (canonical `/tas-owner-builder-course` slug + cannibalisation; ABE-direct/CBOS/no-ASQA authority; scope discipline) because the baseline scored 4/5 there, i.e. the old assertions tested generic keyword-research competence, not skill value. A TAS-OB *delivery-mode* expectation was deliberately **not** added — self-paced vs virtual-classroom is a White Card rule, not an Owner Builder one. Set is now 6 cases / 39 expectations.
- **Stray NSW White Card "not offered" cell fixed in `page-type-engine.md`.** The course-availability matrix (the gate the skill checks before building a state page) still marked **White Card · NSW = "❌ Not offered"** and left NSW out of the RTO-partner column — a survivor of the original eight-file reconciliation and the later audit (which had caught the same error in `competitor-pricing-snapshot.md`). Left unfixed, it would have blocked the NSW White Card page from being built/maintained. Corrected NSW to ✅ and added **NSW: Upskill Institute (RTO 45708)** to the partner column. Repo-wide sweep confirms no remaining "NSW White Card not offered" statement; Upskill (RTO 45708) is now consistent across 13 reference files. Delivery mode unchanged (already correct in `online-delivery-policy-by-state.md`: NSW = trainer-led virtual classroom accepted as face-to-face, or in person; never self-paced).
- **Per-run freshness checks made cache-first (less friction).** Previously every high-volatility output was meant to live-`web_fetch` its source from `freshness-check.md` — heavy enough to get skipped. Now per-run checks are **cache-first**: read the cached guidance in `freshness-check.md` and produce from it, with a live fetch only when (a) the `Skill last audited` date is **more than 60 days** old, (b) the user asks to verify currency or the output is unusually high-stakes, (c) a 🔴 High-volatility entry's exact current value is depended on, or (d) the cached entry is marked stale/missing. The periodic audit mode is now explicitly the real freshness mechanism; the per-run check is its lightweight cache-staleness backstop. Updated `SKILL.md` (Freshness Mechanism + the session-start nudge: 60-day → per-run live-fetch mode, 90-day → recommend a full audit) and `freshness-check.md` §7 (cache-first protocol) and §8 (frequency table; 90 → 60).


### 2026-05-28

- **NSW White Card added to the ASQA RTO-partner framework.** New row in the `asqa-disclosure-framework.md` RTO-partner table — White Card (CPCWHS1001), NSW, delivered by Upskill Institute Pty Ltd (RTO 45708). Upskill is the RTO-delivery partner for the NSW White Card; SafeWork NSW remains the White Card *scheme* regulator (unchanged in `regulator-roles-by-state.md`, `government-listings.md`, and `legislation-references-nsw.md`).
- **Sitewide compliance footer updated.** The verbatim footer disclosure now names Upskill Institute (RTO 45708) "for the NSW White Card and NSW Owner Builder" (previously NSW Owner Builder only).
- *Provenance:* discovered during the `/white-card-nsw-online` page build and Warwick Smith's 18 May 2026 currency review. Recorded here against the skill as a skill-wide RTO-partner rule.


### 2026-05-27

- **NSW builder licensing → Building Commission NSW.** Standardised on Building Commission NSW as the body that issues and administers NSW builder and contractor licences under the *Home Building Act 1989*. Affects `regulator-roles-by-state.md`, `page-type-engine.md`, and the expert-fallback files. Building/CPD functions transferred from NSW Fair Trading on 1 December 2023; general consumer matters remain with NSW Fair Trading.
- **Dominic Ogburn — Builder's Licence schema.** Person-schema `recognizedBy` for Licence 369417C now resolves to Building Commission NSW; the credential-usage matrix records the Fair Trading → Building Commission NSW transfer. The 2005 Minister's Award `recognizedBy` stays NSW Fair Trading (historical and correct). `expert-fallback/dominic-ogburn.md` source line bumped to mirror Notion doc v1.13.
- **ASQA disclosure count standardised to 7.** Resolves the prior 7-vs-8 discrepancy: 7 per-course-page disclosure locations (Hero, CTA, Footer legal, Footer copyright, FAQ, About, T&Cs), with the sitewide compliance footer recorded as a separate sitewide requirement that is not one of the 7. Consistent across `asqa-disclosure-framework.md`, `authority-model.md` §5, `SKILL.md`, and `quality-gates.md`.
- **Owner-builder slugs — verified consistent (no skill change).** All five state landing pages use the state-first form (`/{state}-owner-builder-course`). The corresponding fix to Notion's Courses Developed URL Map (ACT and QLD) was Notion-side; the skill files already matched.
- *Provenance:* these changes were initially logged on Dominic Ogburn's Notion expert profile (doc v1.13). Recorded here against the skill, which is the correct home for skill-wide rules.
- **Two backlog reference files built.** `kb/register/state-fees-register.md` (government Owner Builder and White Card fees across ABE's states) and `kb/register/card-lodgement-process-tas.md` (Service Tasmania White Card lodgement workflow). Verified anchors: NSW owner-builder permit $224 (FY25–26), ACT owner builder licence $309.07/$230.82 (DI2025-166), TAS White Card $13.37 (1 Jul 2025). Remaining fee cells (QLD/WA/TAS owner builder, ACT/QLD/WA White Card) are flagged ⚠️ with official sources in the register's §4 backlog. `content-source-map.md` updated to v1.1 marking both as built.
- **Verification pass on the fees register — 5 of 6 ⚠️ cells pinned.** QLD owner builder permit **$477.47** (FY25–26, QBCC official form); TAS owner builder permit **$458.40** (Class 1a) / **$229.20** (Class 10a/10b/8) (1 Jul 2025); ACT GCIC card **$42.00** (FY25–26); QLD and WA White Card confirmed RTO-issued with no separate government card fee. Only WA owner-builder approval fee remains ⚠️ (LGIRS schedule renders dynamically; needs a direct LGIRS confirmation). White Card table issuance note corrected — RTO-issued in QLD/WA, regulator-issued in TAS/ACT.
- **Third backlog reference file built.** `kb/register/penalties-by-state.md` (WHS penalties for ABE's White Card states + NSW context). Anchored to Safe Work Australia's maximum-monetary-penalties page and the Aug 2025 cross-jurisdictional table. Verified anchors: penalty unit values (NSW $123.31; QLD $161.30 → $172.70 from 1 Jul 2026), model industrial-manslaughter max ($20,441,000 body corporate / 20 yrs), and NSW Category 1 worked figures ($1.11M / $2.32M / $11.15M). White Card-specific offence framed properly with the Cat 1–3 escalation note. Owner-builder no-permit penalties scoped out (building law, not WHS). `content-source-map.md` updated to v1.2 marking it built.
- **Fourth (final) backlog reference file built.** `kb/register/competitor-pricing-snapshot.md` (Owner Builder and White Card competitor list-price snapshot across ABE's states; refresh quarterly). The §7 register of recommended internal resources is now fully ✅. Also reconciled the §6 templated name `competitor-pricing-[state].md` to the concrete `competitor-pricing-snapshot.md`; the `legislation-references-[state].md` templated name was left as-is because the actual files are genuinely per-state (NSW/QLD/WA/TAS/ACT). `content-source-map.md` bumped to v1.3.
- **Consistency audit run across the skill.** Ten checks: no use of "comprehensive" (only forbidding mentions), no Australian-English violations in the new files, no ABE-as-RTO claims (all such phrases appear in "never say" guidance), RTO partner numbers consistent (Blue Dog 31193, AlertForce 91826, Upskill 45708), ASQA disclosure count consistently 7 per-course-page locations + sitewide footer separate, NSW Fair Trading mentions all historical/contextual (paired with Building Commission NSW), all four new files carry Verified/Re-verify + Sources blocks per house style, owner-builder slugs all state-first across all five states. No fixes required from the audit.
