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
import { execSync } from 'node:child_process';
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
const STALE = args.has('--stale');

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
 * numbered demand list is still a demand list.
 *
 * Expects an item ALREADY COALESCED by joinWrapped() below. Until 29 Jul 2026 this read only the
 * lead line and called dropping the rest "correct", which it is not: a demand item wrapped at 100
 * columns lost everything after the first line, so the handover note rendered half a sentence and
 * repeat detection keyed on a fragment. The dead-Login-anchor item truncated at "is a dead",
 * putting every discriminating word — anchor, site, chrome, page — on a line nothing read, which is
 * why it never paired with the same complaint filed a day earlier.
 */
const ITEM_LINE = /^\s*(?:[-*]|\d+[.)])\s+/;

function parseItem(line) {
  if (!ITEM_LINE.test(line)) return null;              // prose, not a list item: not our business
  const m = line.match(/^\s*(?:[-*]|\d+[.)])\s*(~~)?\s*\[([^\]]*)\]\s*(.+?)\s*$/);
  if (!m) return { kind: 'malformed', text: line.trim() };
  const closed = Boolean(m[1]);
  const tag = m[2].trim().toLowerCase();
  // `- ~~[design] text~~ (fixed in #89)` - drop the closing marker and any note after it.
  const text = (closed ? m[3].replace(/~~.*$/, '') : m[3]).trim();
  if (!text) return { kind: 'malformed', text: line.trim() };
  if (isPlaceholder(text)) return { kind: 'placeholder' };
  return { kind: 'item', closed, destination: DESTINATIONS.includes(tag) ? tag : null, rawTag: tag, text };
}

/**
 * CLOSING AN ITEM. Strike it through in the SOURCE review — `- ~~[design] the thing~~` — optionally
 * followed by a note (`~~ fixed in #89`). It then leaves every future handover note.
 *
 * This convention already existed: one design review had struck a completed item. It "worked" only
 * because the old regex expected `[tag]` immediately after the list marker, so a struck line failed
 * to match and was DISCARDED SILENTLY — the right outcome reached by an accident that would equally
 * have swallowed a live item with a typo in its tag, reporting nothing. Same invisible-loss class as
 * the non-recursive traversal in row 24.
 *
 * So closure is now deliberate and counted, and a line that looks like an item but parses as neither
 * is reported rather than dropped. Without that, "fixed" and "malformed" are the same event to this
 * tool: an item that stops appearing.
 *
 * Every item this session shipped a fix for was still listed as outstanding before this existed:
 * `Note.astro` in three places, the `Login` anchor in four, `prefers-reduced-motion` in four. A list
 * that only grows stops being read, and this one also feeds the repeat counts ROADMAP rule 3 uses.
 */

/**
 * `- [skills] none.` is the ABSENCE of an item, not an item. Reviews write it so a reader can tell
 * "this destination was considered and is empty" from "this destination was forgotten", which is a
 * real distinction and worth keeping in the review.
 *
 * It must not survive into the routing. Six reviews wrote it, so "none." repeated across runs and
 * was promoted to "Trigger met — these have earned action" in both handover-skills.md and
 * handover-facts.md: the tool was reporting the absence of work as the most-repeated work. It also
 * inflated every item count by six.
 *
 * Matched narrowly and anchored. "none of the four states publishes a figure" is a real item and
 * must not be swallowed by a loose test — the failure this guard prevents is a placeholder counted
 * as work, and swallowing a real item would be the worse mistake in the other direction.
 */
const isPlaceholder = (text) =>
  /^(none|n\/?a|nil|nothing)\b[\s.—-]*$/i.test(text.replace(/\*+/g, '').trim());

/**
 * Fold continuation lines back into the item they belong to.
 *
 * A demand item wrapped across several lines is one item. A line that carries no list marker is a
 * continuation of the item above it, exactly as Markdown renders it. Blank lines end an item.
 */
function joinWrapped(lines) {
  const MARKER = /^\s*(?:[-*]|\d+[.)])\s/;
  const out = [];
  for (const line of lines) {
    if (MARKER.test(line)) out.push(line.trimEnd());
    else if (line.trim() && out.length) out[out.length - 1] += ` ${line.trim()}`;
    else if (!line.trim()) out.push('');            // blank line closes the current item
  }
  return out;
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
 * Normalise for repeat detection.
 *
 * CODE SPANS ARE KEPT, not stripped — this was backwards until 29 Jul 2026 and it is what made the
 * detector miss real repeats. `SiteHeader.astro`, `Note.astro`, `--paper-alt`, `PartnerDisclosure`
 * are the most identifying tokens a demand item has; the surrounding prose is the part that varies
 * between two people describing the same defect. Stripping the identifier and keying on the prose
 * keeps exactly the wrong half.
 *
 * Measured on the real corpus: the dead `Login` anchor is filed in two reviews and reduced to
 * `site header dead anchor needs destination` and `dead anchor site chrome every page filed again`
 * — two keys, no repeat detected, while the destination note said "No item has recurred yet". The
 * partner-blurb duplication (three filings) and the VerifiedSources new-tab decision (two) failed
 * the same way. The whole second-occurrence rule in ROADMAP runs on these counts.
 *
 * Identifiers are also SORTED ahead of the prose, so two items that name the same file agree on
 * their key prefix regardless of where in the sentence each mentioned it.
 */
function normalise(text) {
  // Path- and symbol-like tokens from inside code spans, deduped and sorted: the stable half.
  const ids = [...new Set(
    [...text.matchAll(/`([^`]+)`/g)]
      .flatMap((m) => m[1].toLowerCase().match(/[a-z0-9][a-z0-9._/-]*[a-z0-9]/g) ?? [])
      .filter((t) => t.length > 2 && !STOPWORDS.has(t)),
  )].sort();
  const prose = text
    .toLowerCase()
    .replace(/`[^`]*`/g, ' ')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w))
    .slice(0, 6);
  return [...ids, ...prose].join(' ');
}

/** The pre-29-Jul key: prose only, code spans discarded. Kept so a rekeying cannot silently drop a
 *  pairing the old scheme did catch — see the union in the bucketing below. */
function normaliseProseOnly(text) {
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
    const parsed = joinWrapped(demandSection(body)).map(parseItem).filter(Boolean);
    reviews.push({
      file,
      date: meta.date || file.slice(0, 10),
      verdict: meta.verdict || 'unrecorded',
      gradedBy: meta.graded_by || 'unrecorded',
      items: parsed.filter((p) => p.kind === 'item' && !p.closed),
      closed: parsed.filter((p) => p.kind === 'item' && p.closed),
      malformed: parsed.filter((p) => p.kind === 'malformed'),
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

/* SELF-DECLARED REPEATS. The exact-key counter reads 0 on this corpus while the SiteHeader
   ownership complaint has been filed three times, and the second filing opens with the literal
   words "SECOND SIGHTING". A human had already done the counting, in the item text, and the tool
   still printed "None". That is the counter failing on the one case where the evidence needed no
   inference at all.
   So a filing that STATES its own recurrence is taken at its word. This is not a fuzzy match and
   does not weaken the near-miss caution below it: the near-miss logic guesses whether two items are
   one complaint, whereas this reads an assertion the filing session made deliberately. Getting it
   wrong requires a session to have written "second occurrence" about something that is not one.
   `time` is deliberately NOT a matched noun - "the second time the page shipped" is about the page,
   not about the filing - and the verb forms are kept narrow for the same reason. */
const ORDINAL_WORDS = { second: 2, third: 3, fourth: 4, fifth: 5, sixth: 6, seventh: 7, eighth: 8, ninth: 9 };
/* ONLY THE LEAD COUNTS. A declaration is a flag a session raises about its own filing, and every
   true one on this corpus is written up front - "SECOND SIGHTING - ...", "(second sighting)",
   "Third filing of this shape today". Deeper in the body the same words are doing something else,
   and two cases here proved it: one item ends "...the stranded-work row rather than a fourth
   instance of it", which is a NEGATION, and another says "the same shape as mistakes-log #1's 4th
   sighting", which counts a DIFFERENT thing. Matching the whole item promoted both, so the tool
   claimed a session had declared four occurrences in the exact sentence where it declared none.
   A window is used rather than a negation blacklist because "rather than", "not a", "no longer" and
   "instead of" is an open set, and the next phrasing that slips through would be silent. */
const LEAD_CHARS = 200;
/** Scans the WHOLE of whatever it is given. Callers pass the window; the window is not baked in. */
function declarationIn(s) {
  const ord = s.match(
    /\b(second|third|fourth|fifth|sixth|seventh|eighth|ninth|2nd|3rd|4th|5th|6th|7th|8th|9th)\s+(?:consecutive\s+)?(?:sighting|occurrence|filing|instance)\b/i,
  );
  if (ord) {
    const k = ord[1].toLowerCase();
    return ORDINAL_WORDS[k] ?? Number(k[0]);
  }
  // `second occurrence` needs no clause of its own — the ordinal pattern above already covers it.
  if (/\b(?:filed|seen|raised|reported|hit)\s+(?:again|twice)\b/i.test(s)) return 2;
  return null;
}
export function selfDeclaredCount(text) {
  return declarationIn(text.slice(0, LEAD_CHARS));
}

/* The same phrases BELOW the lead are not promoted, for the reasons above, but they are not dropped
   either. `demand-split.mjs`'s own header-count item declares "as the second sighting" in its last
   clause, and its twin does not cluster with it — so with a lead-only rule and nothing else, a
   session that had counted to two would be invisible in both mechanisms at once.
   This file already holds the answer to that tension at the near-miss note: an unseen repeat is
   worse than a flagged one, because the first is invisible and the second is a question. The
   distinction is WHERE it goes. "Trigger met" asserts and is acted on, so it takes only the
   high-confidence lead match; a body match is a question, so it goes with the other questions. */
export function bodyDeclaredCount(text) {
  return declarationIn(text.slice(LEAD_CHARS));
}

function render(destination, entries, reviews, mistakes, closedCount = 0) {
  const now = new Date().toISOString().slice(0, 10);
  const lines = [];
  lines.push(`# Handover — ${destination}`);
  lines.push('');
  lines.push(`Generated ${now} by \`scripts/demand-split.mjs\`. Derived view — do not edit.`);
  lines.push(`Owner: ${OWNER[destination]}`);
  lines.push('');
  lines.push(`Sources: ${reviews.length} review${reviews.length === 1 ? '' : 's'} in \`${REVIEW_DIR}/\`.`);
  const openCount = entries.length;
  lines.push(`**${openCount} open · ${closedCount} closed.** Close an item by striking it through in the`);
  lines.push('source review — `- ~~[' + destination + '] the thing~~` — and it leaves this note for good.');
  lines.push('');

  if (!entries.length) {
    lines.push('No open items routed to this destination. Nothing to do.');
    lines.push('');
    return lines.join('\n');
  }

  const triggered = entries.filter((e) => e.count >= 2);
  const single = entries.filter((e) => e.count < 2);

  /* The trigger section is RENDERED further down, after clustering, because a self-declared repeat
     promotes itself and its cluster into it. Computing the split here and printing it there is
     deliberate: the section must still appear ABOVE "Related items" in the output, since a reader
     who has a fired trigger should not have to scroll past the maybes to reach it. */

  /* NEAR MISSES. Two single-occurrence items that name the same file or component are probably one
     complaint written twice, but "probably" is not a count, and a detector that silently promoted
     them would be guessing at the exact gate — ROADMAP rule 3 — where guessing is most expensive.
     So they are surfaced for a person to confirm or reject, and are NOT counted as triggered.
     A repeat the tool cannot see is worse than one it flags and gets wrong: the first is invisible,
     the second is a question. */
  const idsOf = (t) => new Set(
    [...t.matchAll(/`([^`]+)`/g)]
      .flatMap((m) => m[1].toLowerCase().match(/[a-z0-9][a-z0-9._/-]*\.(?:astro|ts|mjs|mdx|css|json|md)|[a-z0-9-]{4,}/g) ?? [])
      .filter((x) => !STOPWORDS.has(x)),
  );
  const wordsOf = (t) => new Set(
    t.toLowerCase().replace(/`[^`]*`/g, ' ').replace(/[^a-z0-9 ]+/g, ' ')
      .split(/\s+/).filter((w) => w.length > 3 && !STOPWORDS.has(w)),
  );
  /* A shared identifier ALONE is not evidence. `global.css` and `PartnerDisclosure` appear in many
     unrelated items, so pairing on identity alone produced 30+ pairs here, nearly all spurious — and
     a check that produces more noise than signal is a defect in the check, not a finding (SYSTEM.md
     §5, the 93-warning lesson). Requiring shared PROSE as well is what separates "two items about
     the same file" from "two items about the same defect": the two partner-blurb filings share
     `blurb renders twice asqa page`, while the `.note` max-width item and the reduced-motion guard
     share only the filename. The threshold is printed with the output so the next reader can see
     whether it is still earning its place rather than taking it on trust. */
  /* An ABSOLUTE word count does not survive a change in item length, and item length just changed:
     coalescing wrapped items roughly doubled the average item, and a fixed threshold of 3 went from
     4 pairs to 26 overnight without a single new repeat existing. Long items share words by chance.
     So the test is a RATIO against the shorter item — what fraction of the smaller item's content
     the two have in common — with a small absolute floor so two three-word items cannot pair on one
     coincidence. Both numbers are printed with the output. */
  const MIN_SHARED_WORDS = 3;
  const MIN_OVERLAP = 0.35;
  const related = (a, b) => {
    const shared = [...idsOf(a.text)].filter((x) => idsOf(b.text).has(x));
    if (!shared.length) return null;
    const wa = wordsOf(a.text), wb = wordsOf(b.text);
    const words = [...wa].filter((w) => wb.has(w));
    if (words.length < MIN_SHARED_WORDS) return null;
    if (words.length / Math.min(wa.size, wb.size) < MIN_OVERLAP) return null;
    return { shared, words };
  };

  /* CLUSTERS, not pairs. Emitting every related pair is O(n^2) in the filings of one complaint: the
     partner blurb reached four filings and rendered as SIX identical-looking pair lines, and the
     VerifiedSources decision another three, so eighteen "possible repeats" were really about six
     distinct items. Correct and unreadable, which for a derived view is the same as wrong - the
     reader has to deduplicate by eye, and the number that actually decides anything (how many times
     has this been filed?) never appears.
     GROUPS ARE RELATED ITEMS, NOT A FILING COUNT, and that distinction is the whole design.

     Three partition heuristics were tried against a corpus whose true answer was known by hand
     (partner blurb 4, VerifiedSources 4, Login 2, Note.astro 2). Transitive closure reported 6 for
     the blurb, because one false edge welds two clusters and `PartnerDisclosure` names both the
     duplicate-blurb complaint and a separate heading-level one. Requiring a joiner to match half the
     cluster reported 3, then requiring two matches reported 3 again and split VerifiedSources in
     half. Each attempt was confidently wrong in a new way, and each was tuned against this one
     corpus - which is precisely what the previous review warned makes a threshold a measurement of
     its corpus rather than a rule.

     So the tool stops asserting a number it cannot derive. It groups items that name the same thing
     and says so; whether four items are one complaint or two is a reading a person does in seconds
     and a heuristic keeps getting wrong. Over-grouping with an honest label beats under-splitting
     with a confident count, because the first is a question and the second is a wrong answer that
     ROADMAP rule 3 would act on. */
  const rel = single.map(() => new Map());
  for (let i = 0; i < single.length; i++) {
    for (let j = i + 1; j < single.length; j++) {
      const r = related(single[i], single[j]);
      if (!r) continue;
      rel[i].set(j, r); rel[j].set(i, r);
    }
  }
  // Connected components. Deliberately generous: see the note above for why grouping too widely and
  // labelling it honestly beats splitting too finely and labelling it a count.
  const seen = new Set();
  const clusters = [];
  for (let s = 0; s < single.length; s++) {
    if (seen.has(s) || rel[s].size === 0) continue;
    const members = [], queue = [s];
    seen.add(s);
    while (queue.length) {
      const cur = queue.shift();
      members.push(cur);
      for (const nb of rel[cur].keys()) if (!seen.has(nb)) { seen.add(nb); queue.push(nb); }
    }
    if (members.length < 2) continue;
    const shared = new Set(), words = new Set();
    for (const a of members) for (const b of members) {
      const r = rel[a].get(b); if (!r) continue;
      r.shared.forEach((x) => shared.add(x)); r.words.forEach((w) => words.add(w));
    }
    clusters.push({ items: members.sort((a, b) => a - b).map((i) => single[i]), shared, words });
  }
  clusters.sort((a, b) => b.items.length - a.items.length);

  /* PROMOTION. A cluster holding a self-declared repeat is a fired trigger, not a maybe: one of its
     members has already asserted the count. The whole cluster is promoted, because its other members
     are the occasions being counted and a reader acting on the trigger needs to see them together.
     A self-declared item with no cluster still fires on its own - the assertion does not need a
     partner to be true, and requiring one would have kept the SiteHeader item invisible for the
     three days its two filings sat too differently worded to pair. */
  const inAnyCluster = new Set(clusters.flatMap((c) => c.items));
  const promotedClusters = clusters.filter((c) => c.items.some((e) => selfDeclaredCount(e.text)));
  const promotedSet = new Set(promotedClusters);
  const promotedLone = single.filter((e) => selfDeclaredCount(e.text) && !inAnyCluster.has(e));
  const openClusters = clusters.filter((c) => !promotedSet.has(c));
  const anyTrigger = triggered.length || promotedClusters.length || promotedLone.length;

  lines.push('## Trigger met (seen twice or more)');
  lines.push('');
  if (anyTrigger) {
    lines.push('These have earned action. Everything else is recorded, not actioned.');
    lines.push('');
    for (const e of triggered) {
      lines.push(`- **${e.text}**`);
      lines.push(`  - seen ${e.count}x — ${e.runs.join(', ')}`);
      if (e.mistakeCount) lines.push(`  - mistakes-log: times seen ${e.mistakeCount}`);
    }
    for (const c of promotedClusters) {
      const declared = Math.max(...c.items.map((e) => selfDeclaredCount(e.text) ?? 0));
      const ids = [...c.shared].sort().map((s) => `\`${s}\``).join(', ');
      lines.push(`- **Self-declared repeat — ${ids}**`);
      lines.push(`  - declared ${declared}x by the filing session; ${c.items.length} related item(s) grouped here`);
      for (const it of c.items) lines.push(`    - ${it.text.slice(0, 150)} _(${it.runs[0]})_`);
    }
    /* The item text is NOT interpolated into a bold span here. Demand items conventionally open with
       their own `**lead**`, so wrapping one in bold toggles the emphasis off mid-sentence and the
       line renders inside out. Cluster members below are list children for the same reason. */
    for (const e of promotedLone) {
      lines.push(`- **Self-declared repeat — declared ${selfDeclaredCount(e.text)}x by the filing session, no related item paired with it**`);
      lines.push(`    - ${e.text.slice(0, 150)} _(${e.runs[0]})_`);
    }
  } else {
    /* "None" here means none by EXACT KEY or self-declaration, which is not the same as "nothing has
       recurred" and must not be written as if it were. On this corpus the exact-key count was 0 for
       every destination while the partner blurb had been filed four times and the VerifiedSources
       decision four times. Saying "no item has recurred yet" over the top of that is the counter
       failing at its job in the most confident possible voice. Clusters below carry the real answer. */
    lines.push('None **by exact match or self-declaration**. Two sessions describing one defect rarely');
    lines.push('word it the same, so on this corpus that is the normal case rather than good news — read');
    lines.push('"Related items" below, which is where recurrence actually shows up.');
  }
  lines.push('');

  if (openClusters.length) {
    lines.push('## Related items — read each group and count it yourself');
    lines.push('');
    lines.push('Items that never merged by key because they were worded differently, grouped where they');
    lines.push(`name the same thing AND share >= ${MIN_SHARED_WORDS} content words being >= ${Math.round(MIN_OVERLAP * 100)}% of the shorter item.`);
    lines.push('');
    lines.push('**A group is not a filing count.** Grouping is deliberately generous, so a group may hold');
    lines.push('two different complaints that happen to name one component — the `PartnerDisclosure`');
    lines.push('group has done exactly that. Three partition heuristics were tried against a corpus whose');
    lines.push('true answer was known by hand, and each returned a confidently wrong number, so the tool');
    lines.push('no longer asserts one. Read the group; deciding whether four items are one complaint or');
    lines.push('two takes seconds and is the part a heuristic keeps getting wrong.');
    lines.push('');
    lines.push('**If they are one complaint, the trigger has fired** (ROADMAP rule 3). Re-word them to');
    lines.push('match in the SOURCE reviews so the count becomes mechanical next time — not here; this');
    lines.push('file is derived.');
    lines.push('');
    for (const c of openClusters) {
      const ids = [...c.shared].sort().map((s) => `\`${s}\``).join(', ');
      lines.push(`### ${c.items.length} related items — ${ids}`);
      lines.push(`shared wording: ${[...c.words].slice(0, 8).join(', ')}`);
      lines.push('');
      for (const it of c.items) lines.push(`- ${it.text.slice(0, 120)} _(${it.runs[0]})_`);
      lines.push('');
    }
  }

  /* Declarations found below the lead. Not promoted and not counted — the two known false positives
     both sat here — but printed, because the alternative is a session that counted to two being
     invisible in both mechanisms at once. Anything already promoted or clustered is excluded, so
     this section only ever holds signals nothing else surfaced. */
  const shownAbove = new Set([...clusters.flatMap((c) => c.items), ...promotedLone]);
  const bodyDeclared = single.filter((e) => !shownAbove.has(e) && bodyDeclaredCount(e.text));
  if (bodyDeclared.length) {
    lines.push('## Declared a repeat further down the item — confirm or reject');
    lines.push('');
    lines.push('These say "second sighting", "third filing" or similar somewhere after the opening');
    lines.push(`${LEAD_CHARS} characters. That position is not trusted as a count: the two false positives found`);
    lines.push('when the whole item was matched were both there, one a negation ("rather than a fourth');
    lines.push('instance of it") and one counting a different thing. Nothing here has been counted or');
    lines.push('grouped, and none of it appears above. Read the item; if the declaration means what it');
    lines.push('says, the trigger has fired and the wording belongs in the lead next time.');
    lines.push('');
    for (const e of bodyDeclared) {
      lines.push(`- says **${bodyDeclaredCount(e.text)}x** — ${e.text.slice(0, 150)} _(${e.runs[0]})_`);
    }
    lines.push('');
  }

  // Anything in a cluster is already listed above with its filing count, and so is a lone
  // self-declared repeat promoted into the trigger section. Listing either here as well would
  // restore the double-reading the clustering was built to remove.
  const clustered = new Set(clusters.flatMap((c) => c.items));
  const promotedLoneSet = new Set(promotedLone);
  const trulySingle = single.filter((e) => !clustered.has(e) && !promotedLoneSet.has(e));

  lines.push('## Recorded once (no action yet)');
  lines.push('');
  if (trulySingle.length) {
    for (const e of trulySingle) lines.push(`- ${e.text} _(${e.runs[0]})_`);
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

/**
 * Merge one item into `bucket`, keyed by normalise()/normaliseProseOnly() so near-duplicate
 * filings collapse into one entry. Factored out of the open-item loop so the SAME grouping rule
 * can be applied to closed items too — see the header-units fix below for why that matters.
 *
 * Two keys per item, and a match on EITHER merges. The identifier-led key catches the repeats the
 * prose-only key missed; keeping the prose-only key alongside it means the rekeying can only ever
 * add pairings, never silently drop one the old scheme caught. A change to how a set is keyed is
 * the same hazard as a change to how it is traversed (mistakes-log row 24) — both quietly alter
 * what the counts are counting.
 */
function bucketItem(bucket, item, runLabel, mistakes) {
  const key = normalise(item.text) || item.text.toLowerCase();
  const altKey = normaliseProseOnly(item.text) || item.text.toLowerCase();
  const existing = bucket.get(key) ?? bucket.get(altKey);
  if (existing) {
    existing.count += 1;
    existing.runs.push(runLabel);
    existing.keys.add(key);
    existing.keys.add(altKey);
    for (const k of existing.keys) bucket.set(k, existing);   // both keys reach the merged entry
  } else {
    const entry = {
      text: item.text,
      count: 1,
      runs: [runLabel],
      keys: new Set([key, altKey]),
      mistakeCount: mistakes.get(key) || mistakes.get(altKey) || 0,
    };
    bucket.set(key, entry);
    bucket.set(altKey, entry);
  }
}

/* ---- stale-item detection -------------------------------------------------
 *
 * WHY. On 14 Aug 2026 a facts session was sent at "read the TAS delivery row at WorkSafe Tasmania,
 * /white-card-tas is live and indexable" — a real-sounding compliance risk that had been closed
 * eleven days earlier. Five of the twelve items in reports/handover-facts.md were in that state:
 * the 1-3 Aug sessions did the work, updated kb/register/**, and never struck the items in the
 * reviews that filed them. This tool can only see strikethroughs, so completed work stays visible
 * as outstanding, and the derived handover is precisely what a session reads to choose what to do.
 * It did not waste a session, it MISDIRECTED one: facts was ranked above a page-blocking item and
 * the unbuilt homepage on the strength of an item that was already answered.
 *
 * WHAT THIS CATCHES, AND WHAT IT CANNOT. An item that names a file in backticks can be checked:
 * if that file was committed AFTER the item was filed, the item may already be done. An item
 * written as prose ("read the TAS delivery row at WorkSafe Tasmania") names no file and is
 * invisible here. Of the five real cases, ONE named a file. So this is a backstop covering a
 * minority of the failure, and it prints its own coverage rather than letting a clean run read as
 * "nothing is stale" — the same reason check-pipeline now reports how many pages it skipped.
 *
 * AND IT IS DELIBERATELY A PROMPT, NOT A FILTER. Measured on this corpus the first time it ran:
 * **75 of 86 checkable items flagged.** In a repo that changes daily, "the file this item names has
 * moved since it was filed" is true of almost everything and therefore says almost nothing. Shipping
 * that as 75 lines of default output would have been noise dressed as a signal, which is the
 * `_comment_tbt` failure again — a permanent red that readers learn to skip. So the default is one
 * summary line and `--stale` prints the list. Its honest value is as a hunting aid when you are
 * already asking "is this still open?", not as a standing report.
 *
 * The primary fix is the rule, not this: CLAUDE.md now REQUIRES a session to close the items its
 * work closes, where it previously only permitted it. */
function gitCommitTime(file) {
  try {
    const out = execSync(`git log -1 --format=%ct -- "${file}"`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    return out ? Number(out) * 1000 : null;
  } catch { return null; }
}

let repoIndex = null;
function repoFileFor(basename) {
  if (!repoIndex) {
    repoIndex = new Map();
    try {
      for (const p of execSync('git ls-files', { encoding: 'utf8', maxBuffer: 1 << 24 }).split('\n')) {
        const b = p.split('/').pop();
        if (!b) continue;
        // First match wins; ambiguous basenames are skipped rather than guessed at.
        if (repoIndex.has(b)) repoIndex.set(b, null); else repoIndex.set(b, p);
      }
    } catch { /* not a git checkout; detection is simply unavailable */ }
  }
  return repoIndex.get(basename) ?? null;
}

/** Backticked tokens that look like a file: a basename with a known extension, `:line` stripped. */
const FILE_TOKEN = /`([^`\s]+\.(?:mjs|ts|astro|md|mdx|json|css|yml|yaml|js))(?::\d+)?`/g;
function namedFiles(text) {
  return [...new Set([...text.matchAll(FILE_TOKEN)].map((m) => m[1].split('/').pop()))];
}

function staleReport(buckets) {
  const rows = [];
  let named = 0, proseOnly = 0, unresolved = 0;
  for (const destination of DESTINATIONS) {
    for (const entry of new Set(buckets.get(destination).values())) {
      const filed = entry.runs.map((r) => r.slice(0, 10)).sort()[0];
      const filedMs = Date.parse(filed);
      const files = namedFiles(entry.text);
      if (!files.length) { proseOnly++; continue; }
      let sawOne = false;
      for (const base of files) {
        const p = repoFileFor(base);
        if (!p) { continue; }
        sawOne = true;
        const t = gitCommitTime(p);
        if (t && Number.isFinite(filedMs) && t > filedMs + 86400000) {
          rows.push({ destination, filed, file: p, text: entry.text.slice(0, 90) });
        }
      }
      sawOne ? named++ : unresolved++;
    }
  }
  return { rows, named, proseOnly, unresolved };
}

async function main() {
  const reviews = await loadReviews();
  const mistakes = await loadMistakes();

  if (!reviews.length) {
    console.log(`demand-split: no reviews found in ${REVIEW_DIR}/ — nothing to derive.`);
    return 0;
  }

  const buckets = new Map(DESTINATIONS.map((d) => [d, new Map()]));
  /* CLOSED bucket, third sighting of the fix (filed 30 Jul, 1 Aug, 2 Aug —
     skill-reviews/skills/2026-08-02-self-declared-repeats.md): the header printed
     "N open · M closed" with `openCount` deduplicated by near-miss key and `closedCount` a raw sum
     of struck lines, so the same complaint filed and closed three times read as 3 closed against
     1-if-still-open — two different units in one sentence. Bucketing closed items the SAME way as
     open ones makes both halves count "distinct complaints", not "distinct complaints" vs "filed
     lines". A complaint that was filed, closed, then filed again later still counts once in EACH
     bucket, correctly, because the two buckets are kept separate rather than merged into one. */
  const closedBuckets = new Map(DESTINATIONS.map((d) => [d, new Map()]));
  const unrouted = [];

  for (const review of reviews) {
    const runLabel = `${review.date} ${review.file}`;
    for (const item of review.items) {
      if (!item.destination) {
        unrouted.push({ ...item, run: runLabel });
        continue;
      }
      bucketItem(buckets.get(item.destination), item, runLabel, mistakes);
    }
    // Closed items with no valid destination tag are excluded from every closedCount, same as
    // before this fix — reporting THOSE as a separate "unrouted closed" class is a different gap,
    // not the units mismatch this pass closes, so it is left alone rather than folded in silently.
    for (const item of review.closed) {
      if (!item.destination) continue;
      bucketItem(closedBuckets.get(item.destination), item, runLabel, mistakes);
    }
  }

  if (WRITE) await mkdir(OUT_DIR, { recursive: true });

  for (const destination of DESTINATIONS) {
    // An entry is stored under both of its keys, so dedupe by object identity before listing —
    // otherwise every item renders twice and the counts read as double what they are.
    const entries = [...new Set(buckets.get(destination).values())].sort(
      (a, b) => b.count - a.count || a.text.localeCompare(b.text),
    );
    const closedCount = new Set(closedBuckets.get(destination).values()).size;
    const note = render(destination, entries, reviews, mistakes, closedCount);
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
  }

  /* A line inside a demand list that starts like an item and parses as neither an item nor a
     deliberate closure. Reported, never dropped: silence is how a live item disappears through a
     typo in its tag, and the tool cannot tell that from a fix. Zero on this corpus, which is the
     point - it fires only when something is actually wrong. */
  const malformed = reviews.flatMap((r) => r.malformed.map((m) => ({ ...m, run: `${r.date} ${r.file}` })));
  if (malformed.length) {
    console.log(`\ndemand-split: ${malformed.length} MALFORMED line${malformed.length === 1 ? '' : 's'} in a demand list — looks like an item, parses as neither an item nor a closure:`);
    for (const m of malformed) console.log(`  ${m.text.slice(0, 100)}  (${m.run})`);
  }

  const closedTotal = reviews.reduce((n, r) => n + r.closed.length, 0);
  if (closedTotal) console.log(`\ndemand-split: ${closedTotal} item(s) closed by strikethrough and excluded.`);

  /* Possibly-already-done items. Never asserts closure — it asserts that the file an item names has
     moved since the item was filed, which is a reason to check before starting, not a reason to
     skip. The coverage line is not decoration: most items name no file and cannot be checked here
     at all, and a clean run must not be read as "nothing is stale". */
  const stale = staleReport(buckets);
  const byDest = new Map(DESTINATIONS.map((d) => [d, 0]));
  for (const r of stale.rows) byDest.set(r.destination, byDest.get(r.destination) + 1);
  console.log(`\ndemand-split: stale prompt — ${stale.rows.length} of ${stale.named} file-naming item(s) name a file that has changed since filing (${DESTINATIONS.map((d) => `${d} ${byDest.get(d)}`).join(', ')}).`);
  console.log(`  ${stale.proseOnly} item(s) name no file and CANNOT be checked this way; ${stale.unresolved} name a file that does not resolve.`);
  console.log('  This is a PROMPT, not a filter: in an active repo most named files have moved, so a flag here is weak evidence on its own. Run --stale to list them.');
  if (STALE) {
    for (const r of stale.rows.sort((a, b) => a.destination.localeCompare(b.destination) || a.filed.localeCompare(b.filed))) {
      console.log(`  [${r.destination}] filed ${r.filed}, ${r.file} changed since — ${r.text}`);
    }
  }

  if (STRICT && (unrouted.length || malformed.length)) return 1;

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
