import type { AstroIntegration } from 'astro';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Publish hard-blockers, checked against the BUILT HTML and failing the build.
 *
 * The manifest schema stops most breaches at authoring time. This is the second
 * net: it audits what actually shipped, so a component change or a stray string
 * cannot quietly reintroduce an RTO claim or a price drift.
 *
 * Add to astro.config.mjs:  integrations: [sitemap(), guardrails()]
 */
const FORBIDDEN_BY_AUTHORITY: Record<string, RegExp[]> = {
  'state-approved-direct': [/\bRTO\b(?!\s*partner)/i, /nationally recognised/i, /statement of attainment/i],
  'knowledge-requirement': [
    /\bRTO\b/i,
    /approved (course|provider)/i,
    /owner[- ]builder (licence|license|permit)/i,
    /recognizedBy/i,
  ],
  'asqa-accredited': [/ABE Education is an RTO/i],
};

// Claims are checked on the page BODY with the disclaimer footer excised, and a
// match is only a breach if it is not negated. "ABE Education is not an RTO" is a
// required disclaimer; "delivered by an RTO" is a hard-blocker. Same words.
const NEGATOR = /\b(not|never|nor|no|isn't|aren't|doesn't)\b/i;

/**
 * The page body: site chrome excised.
 *
 * The site header megamenu legitimately says "Nationally recognised, with our RTO partner
 * Blue Dog Training (RTO 31193)" - a true claim about the White Card, rendered on every page.
 * Auditing it as a claim about THIS course is a false positive. Same for the footer, whose job
 * is to carry the "ABE Education is not an RTO" disclaimer.
 */
function pageBody(html: string): string {
  return html
    .replace(/<header[\s\S]*?<\/header>/gi, ' ')
    .replace(/<footer[\s\S]*?<\/footer>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ');
}

/**
 * A forbidden phrase is only a breach if it is ASSERTED. "Not a nationally recognised
 * qualification or Statement of Attainment" is a required disclaimer; "delivered by an RTO"
 * is a hard-blocker. Look back to the start of the clause, not a fixed character window.
 */
function isAsserted(body: string, at: number): boolean {
  const clause = body.slice(0, at).split(/[.!?;]|<li|<p[ >]|<td/i).pop() ?? '';
  return !NEGATOR.test(clause);
}

function isRedirectStub(html: string): boolean {
  return /http-equiv="refresh"/i.test(html);
}

function walk(dir: string, out: string[] = []): string[] {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (f.endsWith('.html')) out.push(p);
  }
  return out;
}

/** Recursive variant for source files: returns paths relative to `base`. */
function walkExt(dir: string, ext: string, base = dir, out: string[] = []): string[] {
  let entries: string[];
  try { entries = readdirSync(dir); } catch { return out; }
  for (const f of entries) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walkExt(p, ext, base, out);
    else if (f.endsWith(ext)) out.push(p.slice(base.length + 1).replace(/\\/g, '/'));
  }
  return out;
}


/* ---------------------------------------------------------------------------
   SOURCE LINT — the missing-component check.

   A component that does not exist is the one failure the styleguide cannot see:
   the styleguide renders what EXISTS, and is structurally blind to what was
   hand-rolled around it. Before this lint, a page needing a shape with no
   component just reached for raw markup, and the build stayed green. That is how
   the trust-stat row ended up hand-written 12 times and the insurance cross-sell
   copy-pasted across all three state pages.

   The rule: if an MDX body needs structural markup, a component is missing.
   Build it (component + styleguide specimen + tokens). Never inline it.
   --------------------------------------------------------------------------- */

// Structural classes that mean "a component is missing". The value names the component
// that should own the markup, so the error tells the author what to build or reach for.
const OWNED_BY: Record<string, string> = {
  tstat: 'TrustStats', 'trust-stats': 'TrustStats', n: 'TrustStats', l: 'TrustStats',
  attest: 'TrustBand', trust: 'TrustBand',
  zsplit: 'ZSplit (or InsurancePartner)', 'z-body': 'ZSplit', 'z-img': 'ZSplit',
  'btn-secondary': 'InsurancePartner',
};

// Inline utility classes that stay legal in a body: they carry no structure.
const INLINE_OK = new Set(['measure', 'dot', 'btn-link', 'h3', 'e-dot']);

// PAID OFF. These were the raw <section class="sec"><div class="wrap"> wrappers and the
// hand-written <span class="eyebrow-i">01</span> markers - a second marker mechanism
// competing with Section's `marker` prop. ZSection owns them now, so they are structural
// classes like any other: seeing one in a body means a component was bypassed.
const SECTION_OWNED = ['sec', 'wrap', 'eyebrow', 'eyebrow-i', 'h2', 'bg-alt', 'bg-warm', 'bg-dark', 'on-dark', 'trust'];
for (const c of SECTION_OWNED) OWNED_BY[c] = 'Section or ZSection';

// Components with no styleguide specimen. Each needs a reason.
const SG_EXEMPT: Record<string, string> = {
  StickyCta: 'fixed overlay; would pin itself over the styleguide. Described by name instead.',
};

/* Components that exist but have no specimen YET.

   SG_EXEMPT is permanent and structural: StickyCta will never have a specimen because it
   would pin itself over the page. SG_PENDING is the opposite - a component that SHOULD be
   documented and is not yet, because it is still being drafted.

   This mirrors the `[confirm: ...]` convention for facts: legal while drafting, a publish
   hard-blocker at the gate. The TAS page carried eight stranded `[confirm:]` markers until
   the build started refusing them, so the expiry below is not optional decoration - it is
   the part that stops this list becoming a graveyard.

   Three exits, all failures:
     used on an indexable page  -> fail. Draft shapes stay on noindex variants.
     used in a second file      -> fail. Two uses is the promotion rule; it is real now.
     older than PENDING_MAX_DAYS-> fail. Draft state is temporary by definition.  */
const SG_PENDING: Record<string, { added: string; owner: string; why: string }> = {
  // CpdPointsLede: {
  //   added: '2026-07-21',
  //   owner: 'Andrey',
  //   why: 'points-first opening for the CPD archetype; no existing component carries it',
  // },
};

const PENDING_MAX_DAYS = 30;

// The YAML frontmatter block of an MDX file, or '' if it has none.
function frontmatterOf(src: string): string {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? m[1] : '';
}


/* ---------------------------------------------------------------------------
   INLINE-STYLE RATCHET for hand-built .astro pages.

   MDX bodies are held to zero inline styles (rule 1 below). Hand-built pages are
   not, because 36 of them already exist across cpd.astro (23), cpd-tas.astro (8),
   404.astro (3) and styleguide.astro (2), and failing the build on all of them
   would either block every page ticket or force a component pass nobody scheduled.

   A plain warning would be worse than useless: 36 lines of noise on every build is
   noise you learn to scroll past. So this is a ratchet instead. Each file gets its
   current count as a budget, and it can only go down:

     over budget   -> fail. New inline style; build the component instead.
     under budget  -> fail. Debt was paid; lower the number so it cannot creep back.
     new file      -> budget 0. Pages written from here on start clean.

   The "under budget" case is what makes this converge rather than rot. When
   cpd.astro and cpd-tas.astro convert to hub collection entries in Wave B3 their
   entries go to 0 and then disappear, and this table shrinks to the two chrome
   pages that legitimately need a handful.
   --------------------------------------------------------------------------- */
const INLINE_STYLE_BUDGET: Record<string, number> = {
  // 23 -> 22 (HubCard took the "coming soon" span) -> 3 (ComparisonTable took the
  // hand-rolled table, which was 19 of them on its own th/td). The 3 left are margin and
  // max-width nudges, not structure. Converts to a hub entry in B3, expected to reach 0.
  'cpd.astro': 3,
  'cpd-tas.astro': 5,       // 8 -> 5 when BundleCard took over the bundle chooser
  '404.astro': 3,           // standalone chrome, duplicates BaseLayout's font block
  'styleguide.astro': 2,    // internal page, never published
};

function lintSource(logger: { warn: (m: string) => void }): string[] {
  const fails: string[] = [];
  const root = process.cwd();

  // 1 - MDX bodies: no inline styles, no structural classes.
  //
  // Walks all of src/content recursively, not just courses/. Until this changed, hub and
  // guide MDX got none of these checks while prose-lint.mjs already walked the whole tree -
  // two gates with different blast radii over the same files, which is how hub content
  // would have drifted from the discipline course content is held to.
  const contentRoot = join(root, 'src/content');
  for (const rel of walkExt(contentRoot, '.mdx')) {
    const f = rel;                        // e.g. "courses/qld-owner-builder-course.mdx"
    const src = readFileSync(join(contentRoot, rel), 'utf8');
    const body = src.split(/^---$/m).slice(2).join('---');

    for (const m of body.matchAll(/style="([^"]*)"/g)) {
      fails.push(`${f}: inline style="${m[1]}" in the body. Spacing and type belong to a component, not a page.`);
    }
    // Markers must be unique and sequential in document order. There is now ONE marker
    // mechanism (the `marker` prop on Section / ZSection), so this is checkable.
    const markers = [...body.matchAll(/\bmarker="(\d+)"/g)].map((m) => m[1]);
    markers.forEach((m, i) => {
      const expected = String(i + 1).padStart(2, '0');
      if (m !== expected) fails.push(`${f}: section marker "${m}" is out of sequence - expected "${expected}".`);
    });

    // Price parity: one figure, stated once in frontmatter, present in the body, and equal
    // to the number that goes into Course.offers.price.
    const fm = src.split(/^---$/m)[1] ?? '';
    const price = fm.match(/^price:\s*"([^"]+)"/m)?.[1];
    const priceNumber = fm.match(/^priceNumber:\s*"([^"]+)"/m)?.[1];
    if (price && priceNumber && price.replace(/[^0-9.]/g, '') !== priceNumber) {
      fails.push(`${f}: priceNumber "${priceNumber}" does not match price "${price}".`);
    }
    if (price && !src.includes(price)) {
      fails.push(`${f}: the price ${price} never appears on the page.`);
    }

    for (const m of body.matchAll(/class="([^"]+)"/g)) {
      for (const cls of m[1].split(/\s+/)) {
        if (INLINE_OK.has(cls)) continue;
          if (OWNED_BY[cls]) {
          fails.push(`${f}: raw .${cls} in the body - that markup belongs to ${OWNED_BY[cls]}. A component is missing, or an existing one was bypassed.`);
        } else {
          fails.push(`${f}: unknown class .${cls} in the body. If this is a new shape, build it as a component with a styleguide specimen.`);
        }
      }
    }
  }
  // 2 - every component must have a styleguide specimen, a permanent exemption, or a dated
  //     pending entry. See SG_PENDING for what pending permits and how it expires.
  const sg = readFileSync(join(root, 'src/pages/styleguide.astro'), 'utf8');
  // contentRoot is already declared by rule 1 above (same value); reused rather than shadowed.
  const pagesDir = join(root, 'src/pages');
  const mdxRel = walkExt(contentRoot, '.mdx');
  const astroRel = walkExt(pagesDir, '.astro');
  const pendingReport: string[] = [];

  for (const f of readdirSync(join(root, 'src/components'))) {
    const name = f.replace('.astro', '');
    if (SG_EXEMPT[name]) continue;
    if (sg.includes(`components/${f}`)) continue;

    const pending = SG_PENDING[name];
    if (!pending) {
      fails.push(
        `${name} has no styleguide specimen. The library must show every component it carries. ` +
        `If this shape is still being drafted, add a dated SG_PENDING entry rather than leaving it undocumented.`
      );
      continue;
    }

    // Where is it actually used?
    const used = new RegExp(`<${name}[\\s/>]`);
    const inMdx = mdxRel.filter((r) => used.test(readFileSync(join(contentRoot, r), 'utf8')));
    const inAstro = astroRel.filter((r) => used.test(readFileSync(join(pagesDir, r), 'utf8')))
      // the styleguide and preview pages are internal and never published
      .filter((r) => !/(styleguide|preview)\.astro$/.test(r));

    // Exit 1 - indexable pages. A pending component is a draft; drafts live on noindex
    // variants, which are already out of the sitemap and exempt from the orphan check.
    // ^-anchored, multiline: `noindex` must be a real YAML key at the start of its line, not a
    // mention inside a frontmatter COMMENT. The patch's original /\bnoindex:\s*true\b/ matched
    // this page's own comment block ("It is `noindex: true`, excluded from the sitemap..."),
    // so an indexable page read as noindex and exit 1 silently never fired.
    const indexable = inMdx.filter((r) => !/^noindex:\s*true\b/m.test(frontmatterOf(readFileSync(join(contentRoot, r), 'utf8'))));
    for (const r of indexable) {
      fails.push(
        `${name} is pending a styleguide specimen but is used on the indexable page src/content/${r}. ` +
        `Give it a specimen, or set noindex: true on that page while the shape is still a draft.`
      );
    }
    for (const r of inAstro) {
      fails.push(
        `${name} is pending a styleguide specimen but is used in the hand-built page src/pages/${r}, ` +
        `which cannot be marked noindex. Give it a specimen before using it there.`
      );
    }

    // Exit 2 - second use. The promotion rule: the same shape twice is a component,
    // and a component in two places is one that will be copy-pasted into a third.
    const useCount = inMdx.length + inAstro.length;
    if (useCount > 1) {
      fails.push(
        `${name} is pending a styleguide specimen but is used in ${useCount} files ` +
        `(${[...inMdx, ...inAstro].join(', ')}). Two uses means the shape is real. Build the specimen.`
      );
    }

    // Exit 3 - expiry.
    const addedMs = Date.parse(pending.added);
    if (Number.isNaN(addedMs)) {
      fails.push(`${name}: SG_PENDING.added ("${pending.added}") is not a parseable date. Use YYYY-MM-DD.`);
    } else {
      const days = Math.floor((Date.now() - addedMs) / 86_400_000);
      if (days > PENDING_MAX_DAYS) {
        fails.push(
          `${name} has been pending a styleguide specimen for ${days} days (limit ${PENDING_MAX_DAYS}, owner ${pending.owner}). ` +
          `Build the specimen, or delete the component if the shape was abandoned.`
        );
      } else {
        pendingReport.push(`${name} - ${days}d of ${PENDING_MAX_DAYS}, owner ${pending.owner}, ${useCount} use(s). ${pending.why}`);
      }
    }
  }

  // The register, printed once. A pending list nobody sees is an allowance, not a queue.
  if (pendingReport.length) {
    logger.warn(`ABE guardrails: ${pendingReport.length} component(s) pending a styleguide specimen:`);
    for (const line of pendingReport) logger.warn(`  - ${line}`);
  }

  // 3 - inline-style ratchet on hand-built .astro pages (see INLINE_STYLE_BUDGET above).
  const pagesRoot = join(root, 'src/pages');
  for (const rel of walkExt(pagesRoot, '.astro')) {
    const base = rel.split('/').pop()!;
    const count = (readFileSync(join(pagesRoot, rel), 'utf8').match(/style="/g) ?? []).length;
    const budget = INLINE_STYLE_BUDGET[base] ?? 0;
    if (count > budget) {
      fails.push(
        `${rel}: ${count} inline style="" attribute(s), budget ${budget}. Spacing and type belong to a component. ` +
        `If this shape is genuinely new, build the component and give it a styleguide specimen.`
      );
    } else if (count < budget) {
      fails.push(
        `${rel}: ${count} inline style="" attribute(s) but the budget is still ${budget}. ` +
        `Lower it to ${count} in INLINE_STYLE_BUDGET so the debt cannot creep back.`
      );
    }
  }

  // 4 - hub bijection. A hub renders only if a page stub calls getEntry('hubs', '<id>'),
  //     and nothing else references the collection. Both directions fail silently without
  //     this: a hub MDX with no stub renders nowhere and the build stays green, and a stub
  //     naming an id that does not exist throws an opaque render error instead of naming
  //     the file. This is the assert the per-hub-stub routing decision depends on.
  const hubDir = join(root, 'src/content/hubs');
  const hubIds = walkExt(hubDir, '.mdx').map((f) => f.replace(/\.mdx$/, ''));
  const stubbed = new Map<string, string>();
  for (const rel of walkExt(pagesRoot, '.astro')) {
    const src = readFileSync(join(pagesRoot, rel), 'utf8');
    // The id may be written inline or hoisted to a const. Matching only the inline form
    // made this assert silently stop working the moment a stub was written the other way,
    // which is exactly the kind of quiet failure it exists to prevent - so it resolves both.
    for (const m of src.matchAll(/getEntry\(\s*['"]hubs['"]\s*,\s*(?:['"]([^'"]+)['"]|([A-Za-z_$][\w$]*))\s*\)/g)) {
      let id: string | undefined = m[1];
      if (!id && m[2]) {
        id = src.match(new RegExp(`\\b(?:const|let|var)\\s+${m[2]}\\s*=\\s*['"]([^'"]+)['"]`))?.[1];
        if (!id) {
          fails.push(`${rel}: getEntry('hubs', ${m[2]}) - cannot resolve ${m[2]} to a literal in this file, so the hub route cannot be verified. Assign it with a plain const.`);
          continue;
        }
      }
      if (id) stubbed.set(id, rel);
    }
  }
  for (const id of hubIds) {
    if (!stubbed.has(id)) {
      fails.push(`hubs/${id}.mdx has no route. Add src/pages/${id}.astro calling getEntry('hubs', '${id}'), or the page renders nowhere.`);
    }
  }
  for (const [id, rel] of stubbed) {
    if (!hubIds.includes(id)) {
      fails.push(`${rel} renders getEntry('hubs', '${id}') but src/content/hubs/${id}.mdx does not exist.`);
    }
  }

  // 5 - no collection may be empty. src/content/hubs sat empty for a full wave while the
  //     build stayed green and Recipe B described hubs as though they shipped.
  for (const [name, ext] of [['courses', '.mdx'], ['hubs', '.mdx'], ['experts', '.md'], ['partners', '.md']] as const) {
    if (walkExt(join(root, 'src/content', name), ext).length === 0) {
      fails.push(`src/content/${name} has no ${ext} entries. An empty collection builds green and renders nothing.`);
    }
  }

  // 6 - canonical URLs must be unique. `canonical` is an unconstrained z.string().url() in
  //     courses, hubs AND experts, so nothing at the schema level stops two pages declaring
  //     the same one - which is a self-inflicted duplicate-content signal on a site whose
  //     whole migration thesis is URL preservation.
  const seen = new Map<string, string>();
  const canonicalSources: Array<[string, string]> = [
    ...walkExt(contentRoot, '.mdx').map((r) => [`src/content/${r}`, readFileSync(join(contentRoot, r), 'utf8')] as [string, string]),
    ...walkExt(contentRoot, '.md').map((r) => [`src/content/${r}`, readFileSync(join(contentRoot, r), 'utf8')] as [string, string]),
    ...walkExt(pagesRoot, '.astro').map((r) => [`src/pages/${r}`, readFileSync(join(pagesRoot, r), 'utf8')] as [string, string]),
  ];
  for (const [where, src] of canonicalSources) {
    const m = src.match(/^\s*(?:const\s+)?canonical\s*[:=]\s*['"]([^'"]+)['"]/m);
    if (!m) continue;
    const prev = seen.get(m[1]);
    if (prev) fails.push(`duplicate canonical ${m[1]} declared in both ${prev} and ${where}.`);
    else seen.set(m[1], where);
  }

  return fails;
}

export default function guardrails(): AstroIntegration {
  return {
    name: 'abe-guardrails',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const files = walk(fileURLToPath(dir)); // fileURLToPath, not URL.pathname: Windows-safe
        const fails: string[] = lintSource(logger);

        for (const rawFile of files) {
          const file = rawFile.replace(/\\/g, '/'); // normalise Windows backslashes so the path checks below fire
          const html = readFileSync(file, 'utf8');
          const name = file.split('/').slice(-2).join('/');
          if (isRedirectStub(html)) continue;                     // Astro redirect stubs carry no content
          if (/\/(styleguide|preview)\//.test(file)) continue;      // internal, noindex, never published

          // 1 - exactly one H1
          const h1s = html.match(/<h1[\s>]/gi) ?? [];
          if (h1s.length !== 1) fails.push(`${name}: ${h1s.length} H1 tags, expected exactly 1.`);

          // A page carrying data-authority is a COURSE page and gets the full audit.
          // Everything else (hubs like /cpd) gets only the checks that apply to any page.
          const model = html.match(/data-authority="([^"]+)"/)?.[1];
          const isCourse = !!model;
          const body = pageBody(html);

          // 2 - valid, server-rendered JSON-LD with the four required node types
          const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
          if (!isCourse) {
            // Hub page: only require a BreadcrumbList, then fall through to the shared checks.
            if (ld && !/"BreadcrumbList"/.test(ld[1])) fails.push(`${name}: hub page JSON-LD missing BreadcrumbList.`);
          } else if (!ld) {
            fails.push(`${name}: no server-rendered JSON-LD.`);
          } else {
            let graph: any;
            try {
              graph = JSON.parse(ld[1]);
            } catch {
              fails.push(`${name}: JSON-LD does not parse.`);
            }
            if (graph) {
              const types = (graph['@graph'] ?? []).map((n: any) => n['@type']);
              for (const req of ['Course', 'EducationalOccupationalCredential', 'BreadcrumbList']) {
                if (!types.includes(req)) fails.push(`${name}: JSON-LD missing ${req}.`);
              }
              if (types.filter((t: string) => t === 'Person').length !== 2) {
                fails.push(`${name}: JSON-LD needs exactly 2 Person nodes (developer + reviewer).`);
              }

              // 3 - price parity: Course.offers.price must appear on the page
              const course = (graph['@graph'] ?? []).find((n: any) => n['@type'] === 'Course');
              const price = course?.offers?.price;
              if (price && !body.includes('$' + price)) {
                fails.push(`${name}: Course.offers.price ($${price}) does not appear in the rendered page.`);
              }
            }
          }

          // 4 - authority model: asserted forbidden claims in the page body
          if (isCourse) {
            const body_ = body;
            for (const re of FORBIDDEN_BY_AUTHORITY[model!] ?? []) {
              const g = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');
              for (const m of body_.matchAll(g)) {
                if (isAsserted(body_, m.index)) {
                  const ctx = body_.slice(Math.max(0, m.index - 40), m.index + m[0].length);
                  fails.push(`${name}: asserted claim forbidden for ${model}: "...${ctx.replace(/\s+/g, ' ')}...".`);
                }
              }
            }
          }

          // 5 - image alt text >= 80 characters
          for (const [, alt] of body.matchAll(/<img[^>]*\salt="([^"]*)"/gi)) {
            if (alt.length < 80) fails.push(`${name}: content image alt under 80 chars: "${alt.slice(0, 60)}".`);
          }

          // 6 - every in-page anchor resolves. Catches a nav.sectionId that no section
          //     carries, and a SectionWayfinder pointing at a heading that was renamed.
          const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
          for (const [, a] of body.matchAll(/href="#([^"]+)"/g)) {
            if (!ids.has(a)) fails.push(`${name}: link to #${a} but no element on the page carries that id.`);
          }
          // Site chrome is shared across page types, so an anchor it carries may not exist on
          // every page. Reported, not failed - the fix is a content decision, not a build fix.
          const chrome = html.replace(pageBody(html), ' ');
          for (const [, a] of chrome.matchAll(/href="#([^"]+)"/g)) {
            if (!ids.has(a)) logger.warn(`${name}: site chrome links to #${a}, which does not exist on this page.`);
          }

          // 7 - unresolved facts must never ship
          if (/\[confirm:/i.test(html)) fails.push(`${name}: unresolved [confirm: ...] marker in the output.`);

          // 7b - no VISIBLE link may hardcode our own production origin.
          //
          // This is the third bug in one week caused by the preview host differing from the
          // production host, after the staging noindex and the breadcrumb trail. An <a> to
          // https://www.abeeducation.edu.au/x navigates OFF the preview Worker to the real
          // domain, which until cutover is still the LearnWorlds site and has none of these
          // pages - so the link 404s for anyone testing, and breaks `npm run dev` the same
          // way. Post-cutover it still forces a cross-origin navigation for no reason.
          //
          // NO allowlist. There was one briefly, for five nav destinations that existed only
          // on the legacy site. Those are inert now (`soon`), which is the honest answer: a
          // greyed label says "not yet" truthfully, where a link to the old site said "here it
          // is" and 404d on the preview. An allowlist would also have rotted - nothing forced
          // an entry out when its page shipped.
          //
          // Only <a href> is checked. Canonical, OG/Twitter meta and the JSON-LD @id / item
          // / url fields are all REQUIRED to be absolute and are left alone: this reads
          // anchors only, not the whole document.
          for (const [, href] of html.matchAll(/<a\b[^>]*\shref="(https?:\/\/(?:www\.)?abeeducation\.edu\.au[^"]*)"/gi)) {
            const path = href.replace(/^https?:\/\/(?:www\.)?abeeducation\.edu\.au/i, '') || '/';
            fails.push(`${name}: <a> links to the production origin (${href}). Use the path "${path}" if that page exists in this build, or render the item inert (soon: true) if it does not. Nothing in this build should link to the live domain.`);
          }

          // 7c - QBCC approval claims must carry the approved course code.
          //
          // Not a style rule. ABE's QLD owner builder approval is INTERIM and NON-EXCLUSIVE
          // (QBCC letter, Cameron Byram, 25 May 2026), and two of its eight conditions bind
          // this site directly:
          //
          //   condition 2 - all references to 10274NAT must be removed. That is the code the
          //                 material was reviewed AGAINST, not the code it now carries.
          //   condition 4 - any reference to QBCC approval must include the approved course
          //                 code, NONACCABE QBCC Owner Builder Course.
          //
          // Condition 7 lets the QBCC suspend or withdraw approval over "misleading
          // representations", which is what makes a bare "QBCC-approved" badge a commercial
          // risk rather than a wording preference. From 1 Jan 2027 the QBCC accepts permit
          // applications only where the completion carries the NONACC prefix.
          //
          // Enforced per CLAIM, by proximity - deliberately not per page. A per-page check
          // reads as the obvious implementation and is worthless here: SiteHeader's nav
          // carries "QBCC-approved: the NONACCABE course" into every page in the build, so
          // "does this page mention NONACCABE anywhere" is true on all 16 pages no matter
          // what the body copy says. Verified by stripping the code from the hub's own copy
          // and watching a page-level check pass it.
          //
          // So each claim must carry the code within its own window. 200 chars either side,
          // which is wide enough to survive the markup between a claim and its code (the QLD
          // capsule puts the code ~40 chars ahead of the claim, inside tags) and tight enough
          // that a claim cannot borrow the nav's copy from the top of the document.
          if (/10274/.test(html)) {
            fails.push(`${name}: references 10274NAT, the superseded course code. QBCC approval condition 2 requires every reference to it to be removed. The approved code is NONACCABE QBCC Owner Builder Course.`);
          }
          const CLAIM = /QBCC[- ]approved|approved by the QBCC/gi;
          for (const m of html.matchAll(CLAIM)) {
            const at = m.index ?? 0;
            const window = html.slice(Math.max(0, at - 200), at + m[0].length + 200);
            if (!/NONACC/i.test(window)) {
              const snippet = html.slice(Math.max(0, at - 60), at + 60).replace(/\s+/g, ' ');
              fails.push(`${name}: claims QBCC approval without the course code beside it ("...${snippet}..."). QBCC approval condition 4 requires any reference to QBCC approval to include "NONACCABE QBCC Owner Builder Course", or "NONACCABE" where space is tight. The approval covers the reviewed course material only, never ABE Education as an organisation.`);
            }
          }
        }

        // 8 - orphan pages. A page can build, pass every check above, and still be
        //     unreachable because nothing links to it. SiteHeader's nav is a hand-maintained
        //     HTML string, so a new page is linked only if someone remembered - and with ~30
        //     pages still to build, "someone remembered" is not a mechanism. Checks that each
        //     page is linked from at least one OTHER page, which is broader than "is in the
        //     nav": /experts/dominic-ogburn is legitimately reached from /experts, not chrome.
        const linked = new Set<string>();
        const built = new Map<string, string>();
        for (const rawFile of files) {
          const file = rawFile.replace(/\\/g, '/');
          const html = readFileSync(file, 'utf8');
          const path = '/' + (file.split('/dist/')[1] ?? '').replace(/index\.html$/, '').replace(/\.html$/, '').replace(/\/$/, '');
          // A noindexed page is deliberately unreachable - a content variant must not be linked
          // from anywhere, or it competes with the page it is a variant OF. Read the rendered
          // robots tag rather than keeping a list: the exemption then tracks the page's actual
          // output, and un-setting `noindex` re-arms the orphan check automatically.
          const isNoindex = /<meta name="robots" content="noindex/i.test(html);
          if (!isRedirectStub(html) && !isNoindex) built.set(path === '/' ? '/' : path, file.split('/').slice(-2).join('/'));
          for (const [, href] of html.matchAll(/href="(\/[^"#?]*)/g)) {
            linked.add(href.replace(/\/$/, '') || '/');
          }
        }
        // 404 is served by not_found_handling, never linked. /styleguide is internal.
        const ORPHAN_OK = new Set(['/404', '/styleguide', '/']);
        for (const [path, name] of built) {
          if (ORPHAN_OK.has(path)) continue;
          if (!linked.has(path)) {
            fails.push(`${name}: nothing links to ${path}. Add it to the nav, a hub, or a parent page, or it is unreachable and uncrawlable.`);
          }
        }

        if (fails.length) {
          for (const f of fails) logger.error(f);
          throw new Error(`ABE guardrails: ${fails.length} publish hard-blocker(s). Build stopped.`);
        }
        logger.info(`ABE guardrails: ${files.length} page(s) passed.`);
      },
    },
  };
}
