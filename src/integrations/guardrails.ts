import type { AstroIntegration } from 'astro';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Publish hard-blockers, checked against the BUILT HTML and failing the build.
 *
 * ⚠️ NOT WIRED INTO astro.config.mjs YET. Two known false-positives must be fixed
 * before it can gate the real build, or it will fail on correct pages:
 *   1. The forbidden-claim regexes are string-blind. "ABE Education is not an RTO"
 *      and "not a nationally recognised qualification" are correct disclaimers but
 *      trip /\bRTO\b/ and /nationally recognised/. Fix: run the regexes over the
 *      page body with SourcesFooter + disclaimer blocks excised, or make them
 *      negation-aware.
 *   2. Check 6 fails on any [confirm: ...] marker; the live TAS page still ships
 *      those. Scope it to the manifest-driven /preview pages first.
 * When both are handled, enable with:  integrations: [sitemap(...), guardrails()]
 */
const FORBIDDEN_BY_AUTHORITY: Record<string, RegExp[]> = {
  'state-approved-direct': [/\bRTO\b(?!\s*partner)/i, /nationally recognised/i, /statement of attainment/i],
  'knowledge-requirement': [/\bRTO\b/i, /approved (course|provider)/i, /owner[- ]builder (licence|license|permit)/i, /recognizedBy/i],
  'asqa-accredited': [/ABE Education is an RTO/i],
};

function walk(dir: string, out: string[] = []): string[] {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (f.endsWith('.html')) out.push(p);
  }
  return out;
}

export default function guardrails(): AstroIntegration {
  return {
    name: 'abe-guardrails',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const files = walk(new URL(dir).pathname);
        const fails: string[] = [];

        for (const file of files) {
          const html = readFileSync(file, 'utf8');
          const name = file.split('/').slice(-2).join('/');

          const h1s = html.match(/<h1[\s>]/gi) ?? [];
          if (h1s.length !== 1) fails.push(`${name}: ${h1s.length} H1 tags, expected exactly 1.`);

          const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
          if (!ld) {
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
              if (types.filter((t: string) => t === 'Person').length !== 2) fails.push(`${name}: JSON-LD needs exactly 2 Person nodes (developer + reviewer).`);

              const course = (graph['@graph'] ?? []).find((n: any) => n['@type'] === 'Course');
              const price = course?.offers?.price;
              if (price && !html.includes('$' + price)) fails.push(`${name}: Course.offers.price ($${price}) does not appear in the rendered page.`);
            }
          }

          const model = html.match(/data-authority="([^"]+)"/)?.[1];
          if (!model) {
            fails.push(`${name}: no data-authority attribute; cannot check the authority model.`);
          } else {
            for (const re of FORBIDDEN_BY_AUTHORITY[model] ?? []) {
              const hit = html.match(re);
              if (hit) fails.push(`${name}: forbidden for ${model}: "${hit[0]}".`);
            }
          }

          for (const [, alt] of html.matchAll(/<img[^>]*\salt="([^"]*)"/gi)) {
            if (alt.length < 80) fails.push(`${name}: alt text under 80 chars: "${alt.slice(0, 50)}...".`);
          }

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
