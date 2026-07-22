#!/usr/bin/env node
/**
 * Sync the CPD register from Superhuman Docs (Coda) into kb/register/cpd/tas-courses.json.
 *
 * WHY THIS IS MANUAL AND NOT IN `prebuild`.
 * The build must be hermetic. `check-freshness` and `check-claims` already run on every build
 * and gate publication on this data, so a build that reached over the network for it would
 * fail differently depending on the weather — and would fail entirely in any environment
 * without the token. So: a human runs this, reviews the diff, and commits it. The committed
 * file is what the build reads, every time.
 *
 * AUTH. Needs a Coda API token in CODA_API_TOKEN (coda.io → Account settings → API tokens).
 * Never commit it; never add it to .env in this repo — export it in your shell for the run.
 *
 *   CODA_API_TOKEN=... npm run sync:cpd
 *   CODA_API_TOKEN=... npm run sync:cpd -- --dry-run
 *
 * OUTPUT is a projection, not a second author. The source doc stays the single owner of every
 * figure; this file exists so the build can read them without a network call. The checksum is
 * computed over the payload so a later hand-edit is detectable — see check-claims.
 */

import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { payloadChecksum, REGISTER_PATH, BUNDLE_CATEGORIES } from './lib/cpd-register.mjs';

const DOC_ID = 'wXRzQ7oMrm';
const TABLE_ID = 'grid-_kWHYm22cU';
const SOURCE_NAME = 'TAS CPD Courses';
const DRY_RUN = process.argv.includes('--dry-run');

/** Coda column ids. These are stable per table; if the source doc is rebuilt they change and
 *  this script fails loudly on a missing column rather than writing nulls. */
const COL = {
  course: 'c-BhZdMffBsP',
  bundle: 'c-PikQj-a5p0',
  approvalDate: 'c-btcspakJ85',
  expiryDate: 'c-adqeKKsHk5',
  points: 'c--Vqi1u8NJs',
  submittedDate: 'c-ES_9l0VOD8',
  category: 'c-2Y5a_Gk1pE',
  cbosName: 'c-3sY1qeSqfD',
  status: 'c-dh6rQpiUXy',
  regulator: 'c-Bhzo040Ckc',
  state: 'c-Z8pV-savtE',
};

/** Source `Bundle` select values → the category keys the site uses. Explicit so a renamed
 *  bundle in the source doc fails here, visibly, instead of quietly emptying a bundle page. */
const BUNDLE_MAP = {
  'TAS Builder CPD — 12 Points (2026)': 'building',
  'TAS Plumber CPD 11 pt Bundle': 'plumbing',
  'TAS Electrician CPD - 12 Points (2026)': 'electrical',
};

const STATUS_MAP = {
  Live: 'live',
  Expired: 'expired',
  'Refused Approval': 'refused',
  Unknown: 'unknown',
};

function die(msg) {
  console.error(`\n  FAIL  ${msg}\n`);
  process.exit(1);
}

async function fetchRows(token) {
  const url = `https://coda.io/apis/v1/docs/${DOC_ID}/tables/${TABLE_ID}/rows?limit=200&valueFormat=rich`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) die(`Coda API returned ${res.status} ${res.statusText}. Check CODA_API_TOKEN has access to doc ${DOC_ID}.`);
  const body = await res.json();
  if (body.nextPageLink) die('Source table paginated beyond one page. Raise the limit before trusting this sync.');
  return body.items ?? [];
}

/** Coda rich values arrive as scalars, {name}, or arrays of those. Flatten to plain names. */
function names(v) {
  if (v == null || v === '') return [];
  const arr = Array.isArray(v) ? v : [v];
  return arr.map((x) => (typeof x === 'object' ? x.name : x)).filter(Boolean).map(String);
}

function one(v) {
  return names(v)[0] ?? null;
}

/** Coda dates come through as ISO or dd/mm/yyyy depending on format. Normalise to ISO date. */
function isoDate(v) {
  const s = one(v);
  if (!s) return null;
  const dmy = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(s);
  if (dmy) return `${dmy[3]}-${dmy[2]}-${dmy[1]}`;
  const d = new Date(s);
  return Number.isNaN(+d) ? null : d.toISOString().slice(0, 10);
}

function slug(s) {
  return String(s).toLowerCase().replace(/\s+/g, '-');
}

function mapRow(row) {
  const v = row.values ?? {};
  const status = STATUS_MAP[one(v[COL.status])] ?? 'unknown';

  const bundles = names(v[COL.bundle]).map((label) => {
    const key = BUNDLE_MAP[label];
    if (!key) die(`Unmapped bundle "${label}" on row "${one(v[COL.course])}". Add it to BUNDLE_MAP, or rename it back.`);
    return key;
  });

  const approvedAt = isoDate(v[COL.approvalDate]);
  const submittedAt = isoDate(v[COL.submittedDate]);
  const expiresAt = isoDate(v[COL.expiryDate]);

  // Mirrors the source doc's own formula: approval + 2 years, else submission + 2 years.
  // Recorded rather than recomputed, so the site cannot disagree with the register — but the
  // BASIS is recorded too, because "expires 2027" off a submission date is an estimate of an
  // approval that may never have been granted.
  const expiryBasis = approvedAt ? 'approval' : submittedAt ? 'submission' : 'none';

  return {
    id: row.id,
    name: one(v[COL.course]),
    cbosName: one(v[COL.cbosName]),
    state: one(v[COL.state]),
    regulator: one(v[COL.regulator]) ?? 'CBOS',
    status,
    points: Number(one(v[COL.points]) ?? 0),
    categories: names(v[COL.category]).map(slug),
    bundles,
    submittedAt,
    approvedAt,
    expiresAt,
    expiryBasis,
    // Not in this table. Lives in ABE Courses (superhuman://docs/RKb5xYIogI, Keystone Study
    // Area). Preserved across syncs so a manual backfill is not wiped by the next run.
    studyArea: null,
  };
}

const token = process.env.CODA_API_TOKEN;
if (!token) {
  die(
    'CODA_API_TOKEN is not set.\n' +
    '        Get one at coda.io → Account settings → API tokens, then:\n' +
    '          CODA_API_TOKEN=... npm run sync:cpd\n' +
    '        The build does NOT need this — it reads the committed JSON.'
  );
}

const rows = await fetchRows(token);
if (!rows.length) die('Source table returned zero rows. Refusing to overwrite the register with nothing.');

const courses = rows.map(mapRow);

// Carry forward any studyArea that was backfilled by hand, keyed on row id.
if (existsSync(REGISTER_PATH)) {
  const prev = JSON.parse(readFileSync(REGISTER_PATH, 'utf8'));
  const prior = new Map((prev.courses ?? []).map((c) => [c.id, c.studyArea]));
  for (const c of courses) if (prior.get(c.id) != null) c.studyArea = prior.get(c.id);
}

const reg = {
  _readme: existsSync(REGISTER_PATH)
    ? JSON.parse(readFileSync(REGISTER_PATH, 'utf8'))._readme
    : ['GENERATED FILE — DO NOT EDIT BY HAND. Regenerate with `npm run sync:cpd`.'],
  generated: {
    source: `superhuman://docs/${DOC_ID}`,
    sourceName: SOURCE_NAME,
    table: TABLE_ID,
    syncedAt: new Date().toISOString().slice(0, 10),
    rowCount: courses.length,
    checksum: 'sha256:PENDING',
  },
  bundleMap: BUNDLE_MAP,
  courses,
};
reg.generated.checksum = payloadChecksum(reg);

// Report what changed in the terms that matter, so a sync that silently drops a bundle to
// zero is obvious in the terminal rather than discovered on a page.
console.log(`\n  CPD register — ${courses.length} rows from ${SOURCE_NAME}\n`);
for (const cat of BUNDLE_CATEGORIES) {
  const tagged = courses.filter((c) => c.bundles.includes(cat));
  const live = tagged.filter((c) => c.status === 'live');
  console.log(`    ${cat.padEnd(11)} ${String(live.length).padStart(2)} live of ${String(tagged.length).padStart(2)} tagged`);
}
const unclassified = courses.filter((c) => c.status === 'live' && c.studyArea == null).length;
if (unclassified) console.log(`\n    ${unclassified} live course(s) have no studyArea — the WHS cap cannot be checked until these are set.`);

if (DRY_RUN) {
  console.log('\n  --dry-run: nothing written.\n');
  process.exit(0);
}

mkdirSync(dirname(REGISTER_PATH), { recursive: true });
writeFileSync(REGISTER_PATH, JSON.stringify(reg, null, 2) + '\n', 'utf8');
console.log(`\n  Wrote ${REGISTER_PATH}. Review the diff before committing.\n`);
