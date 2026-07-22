#!/usr/bin/env node
/**
 * Claim and figure cross-check — the two gaps system-health could not close.
 *
 * 1. CODE-CLAIM DRIFT. system-health verifies that a path a skill points at exists. It cannot
 *    verify that what a skill SAYS about the build is true. A skill claiming guardrails require
 *    four JSON-LD nodes when they require three passes every check and misleads every run. This is
 *    the repeat risk the mistakes log has recorded three times, so a subset of the highest-value
 *    claims is checked literally: each CLAIM below names a string the docs assert and a pattern
 *    that must be present in the source for the assertion to hold.
 *
 * 2. FIGURE CONTRADICTION. A dollar figure on a page must exist in kb/register/. A page can state
 *    $477.47 while the register says $493.59 and nothing notices, because guardrails check price
 *    parity against frontmatter, not against the register. That is exactly how a superseded fee
 *    ships. Every figure in page content is matched against the register, and anything unmatched
 *    is reported.
 *
 *    Page content is NOT just src/content. On 22 July 2026 the ACT White Card fee went from $42.00
 *    to $47.00 and this check reported nothing, because the ACT page keeps its FAQ and module copy
 *    in src/data/*.ts and only src/content was scanned. QLD keeps facts there too. A figure is
 *    reader-facing wherever it is authored, so both trees are scanned.
 *
 *    A page's own ABE price is excluded. It is an ABE price by definition, it does not belong in
 *    kb/register/, and repeating the warning for every mention of it buried the real finding: on
 *    22 July 2026 the TAS page carried a wrong course price inside a list of ~93 warnings, about 40
 *    of them the price $179 restated. A check nobody reads is worse than no check, because it
 *    confers false confidence.
 *
 *    Three narrow extensions of "its own price", each tied to what the file IS rather than to a
 *    missing field, so none of them widens by accident:
 *      · src/data/*.ts has no frontmatter — a data file inherits the price of the state in its
 *        filename (faqs-act.ts -> the ACT page), falling back to the union only if it names none.
 *      · src/content/hubs/* restates its course pages' prices, which are ABE prices on the hub for
 *        the same reason they are on the course page.
 *      · a total already reconciled by check 3, on the page that reconciled it.
 *    Everything excluded is listed by --verbose. An exclusion nobody can see is a claim to be taken
 *    on trust, and this check exists precisely because a number taken on trust was wrong.
 *
 * 3. DERIVED-TOTAL DRIFT. Checks 1 and 2 can only see figures that are supposed to exist somewhere.
 *    A page total that sums the ABE price and a government fee exists in neither the register nor
 *    the frontmatter, so it could only ever warn, never fail — and a wrong total is a wrong number
 *    in front of a buyer. Each course page's priceRows are reconciled: course fee + government fee
 *    must equal the row marked isTotal, and no figure equal to price + a SUPERSEDED fee may appear.
 *    A mismatch FAILs. Pages whose government fee cannot be identified unambiguously are skipped
 *    and named, because a false FAIL here would cost more than the gap it closes.
 *
 * Both checks skip with a note when their source is absent (running outside the repo).
 * Reporting only — exits 0 unless --strict. Pass --verbose to itemise every excluded figure.
 */

import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const STRICT = process.argv.includes('--strict');
const VERBOSE = process.argv.includes('--verbose');
const fails = [], warns = [], oks = [], skips = [];
const walk = (d, ext, out = []) => {
  if (!existsSync(d)) return out;
  for (const e of readdirSync(d)) {
    const p = join(d, e);
    statSync(p).isDirectory() ? walk(p, ext, out) : (e.endsWith(ext) && out.push(p));
  }
  return out;
};

/* ---- 1. Code-claim drift ------------------------------------------------ */
/* Each entry: what the docs assert, the file that proves or disproves it, and the pattern that
   must appear there. Add an entry whenever a skill starts asserting something about the code. */
const CLAIMS = [
  { claim: 'authorityModel enum has exactly these three values',
    source: 'content.config.ts',
    must: [/state-approved-direct/, /knowledge-requirement/, /asqa-accredited/] },
  { claim: 'four content collections are exported',
    source: 'content.config.ts',
    must: [/collections\s*=\s*\{[^}]*courses/, /experts/, /partners/, /hubs/] },
  { claim: 'experts collection loads .md, not .mdx',
    source: 'content.config.ts',
    must: [/experts['"]?\s*,?[\s\S]{0,200}pattern:\s*['"]\*\*\/\*\.md['"]/] },
  { claim: 'course pages require Course + EducationalOccupationalCredential + BreadcrumbList',
    source: 'guardrails.ts',
    must: [/'Course',\s*'EducationalOccupationalCredential',\s*'BreadcrumbList'/] },
  { claim: 'non-course pages require only BreadcrumbList',
    source: 'guardrails.ts',
    must: [/isCourse[\s\S]{0,400}BreadcrumbList/] },
  { claim: 'every component needs a styleguide specimen or an exemption',
    source: 'guardrails.ts',
    must: [/SG_EXEMPT/, /styleguide specimen/] },
];
const findSource = (name) => ['.', 'src', 'src/integrations', 'integrations', 'src/lib']
  .map((d) => join(d, name)).find((p) => existsSync(p));

let checked = 0;
for (const c of CLAIMS) {
  const path = findSource(c.source);
  if (!path) { warns.push(`Claim unchecked (${c.source} not found here): ${c.claim}`); continue; }
  const src = readFileSync(path, 'utf8');
  const missing = c.must.filter((re) => !re.test(src));
  checked++;
  if (missing.length) fails.push(`CLAIM DRIFT — docs assert "${c.claim}" but ${path} does not support it (${missing.length} pattern(s) absent). Read the source and correct the docs.`);
}
if (checked) oks.push(`Code claims: ${checked - fails.length}/${checked} verified against source`);

/* ---- 2. Figure contradiction -------------------------------------------- */
const REGISTER = 'kb/register';
if (!existsSync(REGISTER)) warns.push('kb/register not found — figure cross-check skipped');
else {
  // Compare figures by value, not by spelling. A page writing "$47" and a register writing
  // "$47.00" are the same fee, and string-matching them reported registered figures as missing —
  // noise in exactly the check that has to stay trustworthy to be read at all.
  const norm = (s) => Number(String(s).replace(/,/g, '')).toFixed(2);

  // Not every file under kb/register/ is a source of truth for a figure on a page. These two are
  // commercial snapshots — competitor prices, and ABE's own sales and search performance. Their
  // numbers are evidence for deciding WHAT to build, never provenance for a government fee.
  //
  // Left in the corpus they quietly weaken the check that matters most: a page could state a wrong
  // fee and pass because some unrelated revenue total happens to carry the same digits. The
  // exclusion is by filename rather than by heuristic, so it cannot widen on its own — the same
  // discipline the "its own price" exclusions above follow.
  const NON_REGULATORY = new Set(['competitor-pricing-snapshot.md', 'demand-and-revenue-snapshot.md']);
  const registerText = walk(REGISTER, '.md')
    .filter((f) => !NON_REGULATORY.has(f.replace(/\\/g, '/').split('/').pop()))
    .map((f) => readFileSync(f, 'utf8')).join('\n');
  const registerFigures = new Set([...registerText.matchAll(/\$([\d,]+(?:\.\d{2})?)/g)].map((m) => norm(m[1])));
  // Figures the register explicitly marks as superseded must never appear in content.
  const superseded = new Set([...registerText.matchAll(/supersedes?\s+\$([\d,]+(?:\.\d{2})?)|\$([\d,]+(?:\.\d{2})?)[^.\n]{0,80}must not be published/gi)]
    .map((m) => m[1] ?? m[2]).filter(Boolean).map(norm));

  // A figure the register marks UNVERIFIED is recorded, not blessed. Left in the matched set, the
  // act of writing an unverified figure down would silence the warning saying it is unverified —
  // turning the register into a way to launder a figure nobody has checked.
  //
  // Only the FIRST figure on the line counts: the row's subject. An UNVERIFIED row routinely cites
  // verified figures while explaining itself (the WA $50,000 row cites the verified $20,000 approval
  // trigger), and taking every figure on the line stripped $20,000 from the register and produced 40
  // false warnings on a correct figure. Register convention: state the row's own figure first.
  // Case-SENSITIVE, and a whole word: UNVERIFIED is a deliberate marker, not any use of the word.
  // A register routinely discusses verification in prose - the sentence recording *why* the WA
  // $50,000 was once unverified is not itself a claim that it still is - and matching case
  // -insensitively made writing that history re-flag the figure the history was about.
  const unverified = new Set([...registerText.matchAll(/^.*\bUNVERIFIED\b.*$/gm)]
    .map((line) => line[0].match(/\$([\d,]+(?:\.\d{2})?)/)).filter(Boolean).map((m) => norm(m[1])));
  for (const u of unverified) registerFigures.delete(u);

  const pageFiles = [...walk('src/content', '.mdx'), ...walk('src/content', '.md')];
  const dataFiles = walk('src/data', '.ts');        // ACT and QLD author page copy here, not in MDX
  const contentFiles = [...pageFiles, ...dataFiles];

  // An ABE price is not a government figure and never belongs in kb/register/, so a page's own
  // price is not a finding. Prices come from frontmatter, which src/data/*.ts has none of, so a
  // data file inherits the price of the state named in its filename (faqs-act.ts -> the ACT page).
  // A data file naming no state falls back to the union of every course price; the figure would
  // have to be a government fee exactly equal to an ABE price to be masked, and such a fee would
  // be in the register anyway, so it would never have reached this branch.
  const frontmatter = (src) => (src.match(/^---\r?\n([\s\S]*?)\r?\n---/) || [])[1] || '';
  // `rrp` joins these for the same reason `priceWas` did: on a CPD bundle it is the sum of the
  // component courses' ABE prices (12 x $99 = $1,188), so it is an ABE commercial figure by
  // construction and could never be in kb/register/. Left out, every bundle page reports its own
  // rrp as an unverified government figure — and a warning that is always wrong is how a warning
  // list stops being read.
  const priceFields = [/^price:\s*["']?\$?([\d,]+(?:\.\d{2})?)/m, /^priceNumber:\s*["']?\$?([\d,]+(?:\.\d{2})?)/m,
                       /^priceWas:\s*["']?\$?([\d,]+(?:\.\d{2})?)/m, /^salePrice:\s*["']?\$?([\d,]+(?:\.\d{2})?)/m,
                       /^rrp:\s*["']?\$?([\d,]+(?:\.\d{2})?)/m,
                       /^singleCoursePrice:\s*["']?\$?([\d,]+(?:\.\d{2})?)/m];
  const pricesIn = (src) => {
    const fm = frontmatter(src), out = new Set();
    for (const re of priceFields) { const m = fm.match(re); if (m) out.add(norm(m[1])); }
    return out;
  };
  const stateOf = (p) => (p.replace(/\\/g, '/').split('/').pop().match(/(?:^|[-_])(act|nsw|qld|tas|wa)(?=[-_.])/i) || [])[1]?.toLowerCase();

  const pricesByState = new Map(), allPrices = new Set();
  for (const f of pageFiles) {
    const ps = pricesIn(readFileSync(f, 'utf8'));
    if (!ps.size) continue;
    for (const v of ps) allPrices.add(v);
    const st = stateOf(f);
    if (st) pricesByState.set(st, new Set([...(pricesByState.get(st) || []), ...ps]));
  }
  // Hubs get the same fallback: a hub restates its course pages' prices, which are ABE prices there
  // for exactly the reason they are ABE prices on the course page.
  //
  // Scoped to hubs by collection, NOT to "any page with no price field". Both readings excuse the
  // same six figures today, but the loose one also silently covers experts and partners, and would
  // pick up every future collection that happens to carry no price. Tie the exemption to what a hub
  // IS, so it cannot widen on its own.
  const isUnder = (f, dir) => f.replace(/\\/g, '/').includes(`src/content/${dir}/`);
  const priceSourceFor = (f, src) => {
    if (f.replace(/\\/g, '/').includes('src/data/')) {
      const st = stateOf(f), byState = st && pricesByState.get(st);
      return byState
        ? { set: byState, label: `${st.toUpperCase()} course price` }
        : { set: allPrices, label: 'any ABE course price (file names no state)' };
    }
    if (isUnder(f, 'hubs')) return { set: allPrices, label: 'any ABE course price (hub restates its course pages)' };
    return { set: pricesIn(src), label: 'this page\'s own price' };
  };

  /* ---- 3. Derived-total drift ------------------------------------------- */
  /* Runs before the figure scan so a total this proves correct is not then reported as an
     unregistered figure. A reconciled total is arithmetic on two checked numbers, not a third
     fact needing its own source.

     Scoped per file, not globally: a total is only excused on the page that proved it. Every
     total currently lives only on its own course page, so this costs nothing, and it keeps the
     exclusion from quietly excusing the same number somewhere it was never reconciled. */
  const cents = (v) => Math.round(Number(v) * 100);
  const rowRe = /^\s*-\s*\{(.+)\}\s*$/;
  const validatedTotals = new Map();   // file -> totals proven on that file
  let reconciled = 0;
  for (const f of pageFiles) {
    const src = readFileSync(f, 'utf8'), fm = frontmatter(src);
    const price = [...pricesIn(src)][0];
    const block = fm.match(/^priceRows:\s*\r?\n([\s\S]*?)(?=^\S)/m);
    if (!price || !block) continue;                   // not a priced course page

    const rows = block[1].split(/\r?\n/).map((l) => l.match(rowRe)).filter(Boolean).map((m) => ({
      amount: (m[1].match(/amount:\s*["']\$?([\d,]+(?:\.\d{2})?)["']/) || [])[1],
      isTotal: /isTotal:\s*true/.test(m[1]),
      label: (m[1].match(/label:\s*["']([^"']*)["']/) || [])[1] ?? '',
    })).filter((r) => r.amount);

    const totalRow = rows.find((r) => r.isTotal);
    const parts = rows.filter((r) => !r.isTotal);
    const govRows = parts.filter((r) => registerFigures.has(norm(r.amount)));
    const priceRows = parts.filter((r) => norm(r.amount) === price);

    if (!totalRow || govRows.length !== 1 || priceRows.length !== 1) {
      warns.push(`Total not reconciled in ${f} — need exactly one course-fee row and one government-fee row present in kb/register/, plus an isTotal row (found ${priceRows.length} price, ${govRows.length} government, ${totalRow ? 1 : 0} total). Skipped rather than guessed.`);
      continue;
    }

    const expect = cents(price) + cents(norm(govRows[0].amount));
    if (cents(norm(totalRow.amount)) !== expect) {
      fails.push(`WRONG TOTAL in ${f} — "${totalRow.label}" states $${totalRow.amount} but the course fee $${priceRows[0].amount} plus the government fee $${govRows[0].amount} is $${(expect / 100).toFixed(2)}. A published total is wrong; correct the figure, not this check.`);
      continue;
    }
    // A total built on a fee the register has replaced is wrong even though it sums correctly.
    for (const old of superseded) {
      const stale = ((cents(price) + cents(old)) / 100).toFixed(2);
      if (new RegExp(`\\$${stale.replace('.', '\\.')}\\b`).test(src))
        fails.push(`STALE TOTAL in ${f} — $${stale} is the course fee $${price} plus the SUPERSEDED fee $${old}. Recompute it from the current register figure.`);
    }
    validatedTotals.set(f, new Set([...(validatedTotals.get(f) || []), norm(totalRow.amount)]));
    reconciled++;
  }
  if (reconciled) oks.push(`Totals: ${reconciled} course page total(s) reconcile with price + register fee`);

  /* Bundle offers. <BundleOffer> sells an ABE course plus ABE's White Card at an ABE price: every
     figure in it is commercial, none belongs in kb/register/, and the six of them were the bulk of
     the remaining warnings. Reconciled rather than muted, for the same reason as the page total
     above - the arithmetic is the only thing that can go wrong here, so check it instead of
     agreeing not to look. Bundle figures live in the MDX body, not frontmatter, so they are parsed
     from the component call. */
  const bundleFigures = new Map();
  let bundles = 0;
  for (const f of pageFiles) {
    const src = readFileSync(f, 'utf8');
    for (const call of src.match(/<BundleOffer[\s\S]*?\/>/g) ?? []) {
      const items = [...call.matchAll(/price:\s*['"]\$?([\d,]+(?:\.\d{2})?)['"]/g)].map((m) => m[1]);
      const total = (call.match(/total=['"]\$?([\d,]+(?:\.\d{2})?)['"]/) || [])[1];
      if (items.length < 2 || !total) {
        warns.push(`Bundle not reconciled in ${f} — a <BundleOffer> needs at least two item prices and a total to check (found ${items.length} item(s), total ${total ? `$${total}` : 'absent'}). Skipped rather than guessed.`);
        continue;
      }
      const sum = items.reduce((a, v) => a + cents(norm(v)), 0);
      if (sum !== cents(norm(total))) {
        fails.push(`WRONG BUNDLE TOTAL in ${f} — items ${items.map((v) => `$${v}`).join(' + ')} sum to $${(sum / 100).toFixed(2)} but the bundle states $${total}. Correct the figure, not this check.`);
        continue;
      }
      bundleFigures.set(f, new Set([...(bundleFigures.get(f) || []), ...items.map(norm), norm(total)]));
      // The FAQ copy for a state restates its bundle total in prose, and src/data/*.ts has no
      // frontmatter to own it. Same shape as a government figure: one owner, and every restatement
      // checked against it. The owner here is the BundleOffer, because that is the actual offer.
      const st = stateOf(f);
      if (st) for (const d of dataFiles.filter((x) => stateOf(x) === st))
        bundleFigures.set(d, new Set([...(bundleFigures.get(d) || []), ...items.map(norm), norm(total)]));
      bundles++;
    }
  }
  if (bundles) oks.push(`Bundles: ${bundles} bundle offer(s) reconcile (ABE commercial prices, not register figures)`);

  if (!contentFiles.length) warns.push('No page files found in src/content or src/data — figure cross-check skipped (run from the repo root)');
  else {
    let seen = 0, bad = 0;
    for (const f of contentFiles) {
      const src = readFileSync(f, 'utf8');
      const { set: mine, label } = priceSourceFor(f, src);
      for (const m of src.matchAll(/\$([\d,]+(?:\.\d{2})?)/g)) {
        const fig = norm(m[1]);
        if (Number(fig) < 20) continue;               // small numbers are rarely regulator fees
        // "$179," in prose captures the trailing comma. Harmless for matching (norm strips it) but
        // it reaches the message, where "$179," reads like a different figure from "$179".
        const raw = m[1].replace(/,+$/, '');
        if (mine.has(fig)) { skips.push({ f, fig: raw, why: label }); continue; }
        if (validatedTotals.get(f)?.has(fig)) { skips.push({ f, fig: raw, why: 'total reconciled by the sum check' }); continue; }
        if (bundleFigures.get(f)?.has(fig)) { skips.push({ f, fig: raw, why: 'ABE bundle price, reconciled by the bundle check' }); continue; }
        seen++;
        if (superseded.has(fig)) { bad++; fails.push(`SUPERSEDED FIGURE $${raw} in ${f} — the register marks this as replaced. Do not publish it.`); }
        else if (unverified.has(fig)) { bad++; warns.push(`UNVERIFIED FIGURE $${raw} in ${f} — kb/register/ records this figure but marks it UNVERIFIED, so it is published without a source. Verify it or remove it.`); }
        else if (!registerFigures.has(fig)) { bad++; warns.push(`Figure $${raw} in ${f} does not appear anywhere in kb/register/. Either it is an ABE price (fine, ignore) or it is an unverified government figure (not fine).`); }
      }
    }
    oks.push(`Figures: ${seen - bad}/${seen} page figures match the register (${skips.length} excluded — run with --verbose to list them)`);
  }
}

// ---------------------------------------------------------------------------------------
// 3. CPD REGISTER INTEGRITY.
//
// The register is a generated projection of a doc ABE maintains elsewhere, so the failure mode
// is not a stale figure but a forked one: someone edits the JSON directly, the site and the
// source doc disagree, and both look authoritative. The checksum makes that visible.
//
// The derived counts are re-stated here rather than trusted, because every published points
// figure depends on the live-only filter. Getting that wrong is how the Electrical bundle came
// to advertise 12 points with one of its courses three months expired.
// ---------------------------------------------------------------------------------------
{
  const cpd = await import('./lib/cpd-register.mjs');
  if (cpd.registerExists()) {
    const reg = cpd.readRegister();

    if (!cpd.checksumMatches(reg)) {
      fails.push(
        `CPD register checksum does not match its payload — ${cpd.REGISTER_PATH} has been hand-edited. ` +
        `That forks it from the source doc it is generated from. Re-run \`npm run sync:cpd\`; if the change ` +
        `was intentional, make it in the source doc first.`
      );
    } else {
      oks.push(`CPD register: checksum matches, ${reg.courses.length} rows from ${reg.generated.sourceName} (synced ${reg.generated.syncedAt})`);
    }

    for (const cat of cpd.BUNDLE_CATEGORIES) {
      const tagged = cpd.taggedMembers(reg, cat).length;
      const live = cpd.liveTotal(reg, cat);
      const published = cpd.bundlePoints(reg, cat);

      if (live > cpd.POINTS_CAP) {
        warns.push(
          `CPD ${cat}: ${live} live courses against a ${cpd.POINTS_CAP}-point cap, so ${live - cpd.POINTS_CAP} is surplus and the sold set is ambiguous. ` +
          `Prune it in the source doc so the sold set is unambiguous.`
        );
      } else if (live < cpd.POINTS_CAP) {
        warns.push(
          `CPD ${cat}: ${published} points, short of the ${cpd.POINTS_CAP} a 12-point licence needs. ` +
          `The page must disclose the shortfall rather than imply full coverage.`
        );
      } else {
        oks.push(`CPD ${cat}: ${published} points from ${live} live course(s) of ${tagged} tagged`);
      }

      // The WHS-cap check that stood here has been REMOVED, 23 July 2026. It warned when a
      // bundle carried more than four WHS points, on the basis of cbos-tas-reference.md A3.
      // A3 was false: the Occupational Licensing (Continuing Professional Development)
      // Determination 2018 caps delivery channels, not subjects, and endorsed on-line courses
      // carry no annual cap. There is nothing to check.
      //
      // Worth remembering as a check that encoded a wrong fact and then lent it authority:
      // it ran green for a day telling us the cap was merely "unchecked", which read as a
      // gap in our data rather than as a claim nobody had verified.
    }
  }
}

for (const [l, xs] of [['FAIL', fails], ['WARN', warns], ['OK', oks]]) for (const m of xs) console.log(`  ${l.padEnd(5)} ${m}`);

// An exclusion nobody can see is a claim to be taken on trust. --verbose itemises every figure the
// scan chose not to report, and why, so the exclusion rules can be audited rather than believed.
if (VERBOSE && skips.length) {
  console.log(`\n  Excluded from the figure scan — ${skips.length} figure(s):`);
  const byFile = new Map();
  for (const s of skips) byFile.set(s.f, [...(byFile.get(s.f) || []), s]);
  for (const [f, xs] of byFile) {
    console.log(`\n    ${f}`);
    const byReason = new Map();
    for (const s of xs) {
      const counts = byReason.get(s.why) ?? new Map();
      counts.set(s.fig, (counts.get(s.fig) ?? 0) + 1);
      byReason.set(s.why, counts);
    }
    for (const [why, counts] of byReason) {
      const figs = [...counts].map(([fig, n]) => (n > 1 ? `$${fig} ×${n}` : `$${fig}`));
      console.log(`      ${figs.join(', ')}  — ${why}`);
    }
  }
}
console.log(`\n  ${fails.length} failing, ${warns.length} warning, ${oks.length} ok${VERBOSE || !skips.length ? '' : `, ${skips.length} excluded`}`);
if (fails.length && STRICT) process.exit(1);
