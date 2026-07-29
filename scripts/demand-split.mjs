#!/usr/bin/env node
/**
 * demand-split.mjs — derive handover notes from Stage 9 demand lists.
 *
 * Reads every review in skill-reviews/, pulls the "## Demand list" section,
 * routes each item by its [destination] tag, counts repeats across runs, and
 * renders one note per destination.
 *
 * The notes are a derived view (recording policy layer 3). They are regenerable,
 * never a source, and must never be hand-edited.
 *
 * RECURSIVE over skill-reviews/ since 29 Jul 2026 — see walkReviews() for why, and for why
 * review-trends.mjs and system-health's review coverage are right to stay flat.
 *
 *   node scripts/demand-split.mjs             print to stdout
 *   node scripts/demand-split.mjs --write     write reports/handover-<dest>.md
 *   node scripts/demand-split.mjs --strict    exit 1 on UNROUTED items
 *
 * Never blocks a build. Exits 0 unless --strict and something is unrouted.
 */

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const REVIEW_DIR = 'skill-reviews';
const MISTAKES_LOG = 'kb/mistakes-log.md';   // repointed to kb/ (Task 0, assumption 1)
const OUT_DIR = 'reports';
/* One destination per session type. There are FOUR session types and this list carried THREE until
   29 Jul 2026, so an item that was page work had nowhere to go: the `landmarks-and-carriers` design
   review tagged two items `[build]` — correctly, they edit `src/content/courses/*.mdx` — and both
   were reported UNROUTED with no valid tag they could have used instead. That is not a new mechanism
   earned by a second occurrence; it is the same off-by-one as row 1's eighth sighting, where a claim
   about a set ("four content collections") failed to constrain the whole set. A destination list
   that omits one of the four types cannot route the work of that type. */
const DESTINATIONS = ['skills', 'design', 'facts', 'build'];

const OWNER = {
  skills: 'skills session — .claude/skills/**, scripts/**, kb/rules/**, CLAUDE.md, SYSTEM.md, ROADMAP.md, handover/**',
  design: 'design session — src/components/**, src/styles/**, styleguide',
  facts: 'facts session — kb/register/** only, source read in that session',
  build: 'build session — pipeline/{slug}/, src/content/**; read at Stage 0 for the page being built',
};

const args = new Set(process.argv.slice(2));
const WRITE = args.has('--write');
const STRICT = args.has('--strict');

/** Split simple `key: value` frontmatter from a markdown body. */
function splitFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: raw };
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
  }
  return { meta, body: m[2] };
}

/** Pull the lines under a `## Demand list` heading, stopping at the next heading. */
function demandSection(body) {
  const lines = body.split(/\r?\n/);
  const start = lines.findIndex((l) => /^#{1,6}\s*demand list\b/i.test(l));
  if (start === -1) return [];
  const out = [];
  for (const line of lines.slice(start + 1)) {
    if (/^#{1,6}\s/.test(line)) break;
    out.push(line);
  }
  return out;
}

/**
 * `- [skills] text` -> { destination, text }. Unrecognised tags route to null.
 * Accepts unordered (`-`/`*`) and ordered (`1.`/`1)`) markers: real reviews use both, and a
 * numbered demand list is still a demand list. Only the lead line of a wrapped item is parsed;
 * continuation lines have no marker and are correctly ignored.
 */
function parseItem(line) {
  const m = line.match(/^\s*(?:[-*]|\d+[.)])\s*\[([^\]]*)\]\s*(.+?)\s*$/);
  if (!m) return null;
  const tag = m[1].trim().toLowerCase();
  const text = m[2].trim();
  if (!text) return null;
  return { destination: DESTINATIONS.includes(tag) ? tag : null, rawTag: tag, text };
}

/**
 * Filler words only. Negations ("not", "no", "never") stay in — dropping them
 * would merge an item with its opposite.
 */
const STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'been', 'but', 'by', 'for', 'from',
  'had', 'has', 'have', 'in', 'into', 'is', 'it', 'its', 'of', 'on', 'or', 'so',
  'than', 'that', 'the', 'their', 'then', 'there', 'these', 'this', 'to', 'was',
  'were', 'when', 'which', 'will', 'with', 'we', 'our',
]);

/**
 * Normalise for repeat detection: lowercase, drop code spans, punctuation and
 * filler, keep order, cap the key so a long tail cannot split two phrasings of
 * the same complaint into separate items.
 */
function normalise(text) {
  return text
    .toLowerCase()
    .replace(/`[^`]*`/g, ' ')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w))
    .slice(0, 10)
    .join(' ');
}

/**
 * RECURSIVE, deliberately — see the note at the top of this file.
 *
 * `readdir` without `withFileTypes` returns a subdirectory as a bare name, which `.endsWith('.md')`
 * then silently drops. That is how `skill-reviews/design/` came to be invisible here: ten reviews
 * and roughly thirty-five demand items reached no handover note and were counted in no repeat
 * tally, so the second-occurrence rule that governs what gets built was being computed from a
 * partial set. Several items sat at two and three occurrences without ever surfacing as triggers.
 *
 * The subdirectory itself is not the mistake — `review-trends.mjs` and `system-health`'s review
 * coverage are right to stay flat, because a design review has no run metrics and grades no page.
 * Routing is the exception: a demand item is a demand item wherever it was filed.
 */
async function walkReviews(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.isDirectory()) out.push(...await walkReviews(path.join(dir, e.name)));
    else if (e.name.endsWith('.md') && !e.name.startsWith('_')) out.push(path.join(dir, e.name));
  }
  return out;
}

async function loadReviews() {
  if (!existsSync(REVIEW_DIR)) return [];
  const files = (await walkReviews(REVIEW_DIR))
    .map((p) => path.relative(REVIEW_DIR, p))
    .sort();

  const reviews = [];
  for (const file of files) {
    const raw = await readFile(path.join(REVIEW_DIR, file), 'utf8');
    const { meta, body } = splitFrontmatter(raw);
    const items = demandSection(body).map(parseItem).filter(Boolean);
    reviews.push({
      file,
      date: meta.date || file.slice(0, 10),
      verdict: meta.verdict || 'unrecorded',
      gradedBy: meta.graded_by || 'unrecorded',
      items,
    });
  }
  return reviews;
}

/** Repeat risks already tracked in the mistakes log, keyed by normalised title. */
async function loadMistakes() {
  if (!existsSync(MISTAKES_LOG)) return new Map();
  const raw = await readFile(MISTAKES_LOG, 'utf8');
  const seen = new Map();
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^\s*[-*|]\s*(.+?)\s*(?:\|.*)?$/);
    const times = line.match(/times seen\s*[:=|]?\s*(\d+)/i);
    if (m && times) seen.set(normalise(m[1]), Number(times[1]));
  }
  return seen;
}

function render(destination, entries, reviews, mistakes) {
  const now = new Date().toISOString().slice(0, 10);
  const lines = [];
  lines.push(`# Handover — ${destination}`);
  lines.push('');
  lines.push(`Generated ${now} by \`scripts/demand-split.mjs\`. Derived view — do not edit.`);
  lines.push(`Owner: ${OWNER[destination]}`);
  lines.push('');
  lines.push(`Sources: ${reviews.length} review${reviews.length === 1 ? '' : 's'} in \`${REVIEW_DIR}/\`.`);
  lines.push('');

  if (!entries.length) {
    lines.push('No items routed to this destination. Nothing to do.');
    lines.push('');
    return lines.join('\n');
  }

  const triggered = entries.filter((e) => e.count >= 2);
  const single = entries.filter((e) => e.count < 2);

  lines.push('## Trigger met (seen twice or more)');
  lines.push('');
  if (triggered.length) {
    lines.push('These have earned action. Everything else is recorded, not actioned.');
    lines.push('');
    for (const e of triggered) {
      lines.push(`- **${e.text}**`);
      lines.push(`  - seen ${e.count}x — ${e.runs.join(', ')}`);
      if (e.mistakeCount) lines.push(`  - mistakes-log: times seen ${e.mistakeCount}`);
    }
  } else {
    lines.push('None. No item in this destination has recurred yet.');
  }
  lines.push('');

  lines.push('## Recorded once (no action yet)');
  lines.push('');
  if (single.length) {
    for (const e of single) lines.push(`- ${e.text} _(${e.runs[0]})_`);
  } else {
    lines.push('None.');
  }
  lines.push('');

  lines.push('## Before you start');
  lines.push('');
  lines.push('1. `node scripts/system-health.mjs` — pre-flight, and again before merge.');
  lines.push('2. Own branch. Nothing outside this destination in this session.');
  if (destination === 'design') {
    lines.push('3. Styleguide specimen for any new or changed component, or the build fails.');
    lines.push('4. Token or design-register edits are exclusive — nothing else in that session.');
  }
  if (destination === 'facts') {
    lines.push('3. No figure enters the register without a source read in this session.');
    lines.push('4. Mark UNVERIFIED rather than carrying a figure across.');
  }
  if (destination === 'skills') {
    lines.push('3. When a doc starts asserting something about the build, add it to CLAIMS.');
  }
  lines.push('');
  return lines.join('\n');
}

async function main() {
  const reviews = await loadReviews();
  const mistakes = await loadMistakes();

  if (!reviews.length) {
    console.log(`demand-split: no reviews found in ${REVIEW_DIR}/ — nothing to derive.`);
    return 0;
  }

  const buckets = new Map(DESTINATIONS.map((d) => [d, new Map()]));
  const unrouted = [];

  for (const review of reviews) {
    const runLabel = `${review.date} ${review.file}`;
    for (const item of review.items) {
      if (!item.destination) {
        unrouted.push({ ...item, run: runLabel });
        continue;
      }
      const key = normalise(item.text) || item.text.toLowerCase();
      const bucket = buckets.get(item.destination);
      const existing = bucket.get(key);
      if (existing) {
        existing.count += 1;
        existing.runs.push(runLabel);
      } else {
        bucket.set(key, {
          text: item.text,
          count: 1,
          runs: [runLabel],
          mistakeCount: mistakes.get(key) || 0,
        });
      }
    }
  }

  if (WRITE) await mkdir(OUT_DIR, { recursive: true });

  for (const destination of DESTINATIONS) {
    const entries = [...buckets.get(destination).values()].sort(
      (a, b) => b.count - a.count || a.text.localeCompare(b.text),
    );
    const note = render(destination, entries, reviews, mistakes);
    if (WRITE) {
      const out = path.join(OUT_DIR, `handover-${destination}.md`);
      await writeFile(out, note, 'utf8');
      console.log(`demand-split: wrote ${out} (${entries.length} item${entries.length === 1 ? '' : 's'})`);
    } else {
      console.log(note);
      console.log('---');
    }
  }

  if (unrouted.length) {
    console.log(`\ndemand-split: ${unrouted.length} UNROUTED item${unrouted.length === 1 ? '' : 's'} — add a valid [destination] tag:`);
    for (const u of unrouted) console.log(`  - [${u.rawTag}] ${u.text}  (${u.run})`);
    if (STRICT) return 1;
  }

  const selfGraded = reviews.filter((r) => r.gradedBy === 'self');
  if (selfGraded.length) {
    console.log(`\ndemand-split: ${selfGraded.length} self-graded review${selfGraded.length === 1 ? '' : 's'} included — weight accordingly.`);
  }

  return 0;
}

main()
  .then((code) => process.exit(code))
  .catch((err) => {
    console.error(`demand-split: ${err.message}`);
    process.exit(0); // never block
  });
