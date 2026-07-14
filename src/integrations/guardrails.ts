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

function lintSource(logger: { warn: (m: string) => void }): string[] {
  const fails: string[] = [];
  const root = process.cwd();

  // 1 - MDX bodies: no inline styles, no structural classes.
  const dir = join(root, 'src/content/courses');
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.mdx'))) {
    const src = readFileSync(join(dir, f), 'utf8');
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
  // 2 - every component must have a styleguide specimen, or a stated reason not to.
  const sg = readFileSync(join(root, 'src/pages/styleguide.astro'), 'utf8');
  for (const f of readdirSync(join(root, 'src/components'))) {
    const name = f.replace('.astro', '');
    if (SG_EXEMPT[name]) continue;
    if (!sg.includes(`components/${f}`)) {
      fails.push(`${name} has no styleguide specimen. The library must show every component it carries.`);
    }
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
