#!/usr/bin/env node
/**
 * Renders one 1200x630 social share card per INDEXABLE page in dist/, to public/og/{slug}.png.
 *
 * WHY THIS EXISTS. Measured 16 Aug 2026: 0 of 25 built pages emitted an `og:image`, so every share
 * of every page - LinkedIn, Facebook, Slack, iMessage - rendered a blank card. `BaseLayout` had
 * supported the prop since W0 and upgraded `twitter:card` to `summary_large_image` whenever it was
 * set; nothing ever set it. The gap was an asset, not a mechanism.
 *
 * WHY PLAYWRIGHT RATHER THAN AN IMAGE LIBRARY. The brand faces (Archivo, DM Sans) are loaded from
 * the Google Fonts CDN and there is no font file anywhere in this repo, so an SVG rasterised by
 * sharp or resvg would substitute whatever the generating machine had installed - Arial on Windows,
 * DejaVu on the CI runner - and bake that substitution into a committed asset. A headless browser
 * loads the real faces and the real tokens, which is the difference between a card that looks like
 * the site and one that merely says the same words. Playwright is already a dependency (check-reflow).
 *
 * NOT WIRED INTO THE BUILD, DELIBERATELY, and for the same reasons check-reflow is not: it needs a
 * browser and a built dist/, and it writes into public/, which is a build INPUT. Running it inside
 * the build would have the build mutate its own source. Run it by hand after adding or retitling a
 * page:
 *
 *   npm run build && node scripts/generate-og-cards.mjs
 *
 * `check-og-cards.mjs` is the gate that catches a page whose card was never generated, so forgetting
 * this step is loud rather than silent - a 404 og:image is worse than none, because the card renders
 * blank AND the crawler logs a miss.
 */
import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { createServer } from 'node:http';

const DIST = 'dist';
const OUT = join('public', 'og');
const W = 1200;
const H = 630;

const strip = (s) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const decode = (s) =>
  s.replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d))
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, ' ');

/**
 * The card's headline is the page's H1, not its <title>. The <title> is written for a SERP - it
 * carries the state, the price and a separator, and it is truncated at ~60 chars by a budget that
 * has nothing to do with a 1200x630 canvas. The H1 is the promise the page actually makes, and it
 * is what a reader who clicked the share is about to see at the top of the page.
 */
function extract(html) {
  const robots = html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i)?.[1] ?? '';
  if (/noindex/i.test(robots)) return null;

  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1];
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  const headline = decode(strip(h1 ?? title ?? ''));
  if (!headline) return null;

  // The hero eyebrow where the page has one ("Tasmania • CBOS-approved"), already written as a short
  // qualifier and exactly what a card wants above the headline. Falls back to the brand rather than
  // inventing a category.
  //
  // Cannot be matched to the first `</span>`: the eyebrow CONTAINS `<span class="e-dot">•</span>`
  // separators, so a non-greedy match stops inside it and yields "Tasmania" where the page says
  // "Tasmania • CBOS-approved" - which drops the credibility half of the line. Verified on the first
  // run's output before this was fixed. Take a bounded window instead, cut at the eyebrow's known
  // siblings, then strip tags.
  const raw = html.match(/class="eyebrow"[^>]*>([\s\S]{0,240})/i)?.[1] ?? '';
  const cut = raw.split(/<span class="updated"|<\/div>|<h1/i)[0];
  const eyebrow = decode(strip(cut)) || 'ABE Education';
  return { headline, eyebrow };
}

/** Long headlines shrink rather than overflow. Measured against the real faces, not guessed. */
const sizeFor = (n) => (n <= 48 ? 74 : n <= 72 ? 64 : n <= 104 ? 54 : 46);

const card = ({ headline, eyebrow }) => `<!doctype html>
<html lang="en-AU"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:${W}px;height:${H}px;background:#fbf9f5;color:#1a1a1a;
       font-family:'DM Sans',sans-serif;display:flex;flex-direction:column;
       justify-content:space-between;padding:72px 80px;position:relative}
  /* The maroon bar is the site's own action colour, used here as a masthead rule rather than as a
     control - the one place the palette allows it outside actions. */
  body::before{content:'';position:absolute;top:0;left:0;right:0;height:14px;background:#800000}
  .eyebrow{font-family:'DM Sans',sans-serif;font-size:22px;font-weight:500;letter-spacing:.08em;
           text-transform:uppercase;color:#6e6e6e}
  h1{font-family:'Archivo',sans-serif;font-weight:700;font-size:${sizeFor(headline.length)}px;
     line-height:1.14;letter-spacing:-.015em;max-width:22ch;color:#1a1a1a}
  .foot{display:flex;align-items:baseline;justify-content:space-between;
        border-top:1px solid #d4d6da;padding-top:24px}
  .brand{font-family:'Archivo',sans-serif;font-weight:700;font-size:30px;color:#800000}
  .url{font-size:22px;color:#4a4a4a}
</style></head>
<body>
  <div class="eyebrow">${eyebrow}</div>
  <h1>${headline}</h1>
  <div class="foot"><span class="brand">ABE Education</span><span class="url">abeeducation.edu.au</span></div>
</body></html>`;

async function main() {
  if (!existsSync(DIST)) {
    console.log('generate-og-cards: no dist/ - run `npm run build` first.');
    process.exit(1);
  }

  let chromium;
  try { ({ chromium } = await import('playwright')); }
  catch {
    console.log('generate-og-cards: playwright not installed - skipping rather than failing.\n  npm i -D playwright && npx playwright install chromium');
    return;
  }

  const entries = await readdir(DIST, { withFileTypes: true });
  const slugs = entries
    .filter((d) => d.isDirectory() && existsSync(join(DIST, d.name, 'index.html')))
    .map((d) => d.name)
    .sort();

  const jobs = [];
  for (const slug of slugs) {
    const html = await readFile(join(DIST, slug, 'index.html'), 'utf8');
    const data = extract(html);
    if (data) jobs.push({ slug, ...data });
  }

  if (!jobs.length) {
    console.log('generate-og-cards: no indexable pages found.');
    return;
  }

  // Served over HTTP rather than opened as file://, because a file:// page is treated as an opaque
  // origin and the webfont request is blocked - which silently produces cards in a fallback face.
  // check-reflow hit the same class of problem with a root-absolute stylesheet over file://.
  const pages = new Map(jobs.map((j) => [`/${j.slug}`, card(j)]));
  const server = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(pages.get(req.url) ?? '<!doctype html><title>404</title>');
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const port = server.address().port;

  let browser;
  try { browser = await chromium.launch(); }
  catch (e) {
    server.close();
    console.log('generate-og-cards: chromium not available - skipping rather than failing.\n  npx playwright install chromium\n  (' + String(e).split('\n')[0] + ')');
    return;
  }

  await mkdir(OUT, { recursive: true });
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });

  for (const job of jobs) {
    await page.goto(`http://127.0.0.1:${port}/${job.slug}`, { waitUntil: 'networkidle' });
    // Fonts must be resolved before the shot or the card ships in the fallback face and nothing
    // about the image says so. This is the whole reason for using a browser.
    await page.evaluate(() => document.fonts.ready);
    const buf = await page.screenshot({ type: 'png' });
    await writeFile(join(OUT, `${job.slug}.png`), buf);
    console.log(`  ${job.slug}.png  ${String(Math.round(buf.length / 1024)).padStart(4)}KB  ${job.headline.slice(0, 58)}`);
  }

  await browser.close();
  server.close();
  console.log(`\ngenerate-og-cards: wrote ${jobs.length} card(s) to ${OUT}/`);
}

main();
