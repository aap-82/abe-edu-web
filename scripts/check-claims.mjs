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
import { slugArg, bySlug, slugNote } from './lib/slug-filter.mjs';

const STRICT = process.argv.includes('--strict');
const VERBOSE = process.argv.includes('--verbose');
const SLUG = slugArg();
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
  // Asserts the COUNT, not just that the named ones are present. The presence-only form of this
  // claim read "four content collections" for as long as there were five: `cpdBundles` was added
  // and every pattern still matched, so the checker certified a false claim as verified. A claim
  // about a set has to constrain the whole set or it cannot detect an addition.
  { claim: 'exactly five content collections are exported: courses, experts, partners, hubs, cpdBundles',
    source: 'content.config.ts',
    // Order-insensitive, count-strict: exactly five members, each from the named set. A sixth
    // collection or a removed one fails; reordering them does not, because a reorder is harmless
    // and a claim that cries wolf on harmless edits stops being read (see the 93-warning lesson
    // in ROADMAP's recording policy).
    must: [/collections\s*=\s*\{(?:\s*(?:courses|experts|partners|hubs|cpdBundles)\s*,?){5}\s*\}/] },
  // The Person-count rule is authority-model conditional and is the single most drift-prone claim
  // in the skill: SKILL.md asserted an unconditional "Person x2" in three places while the build
  // had required exactly 1 on asqa-accredited pages since the White Card run. Nothing checked it,
  // so a builder following the skill produced a guaranteed build failure on every ASQA page, and
  // the Stage 7 audit line would have certified a CORRECT page as wrong.
  { claim: 'asqa-accredited pages require exactly 1 Person node; all other models require exactly 2',
    source: 'guardrails.ts',
    must: [/exactly 1 Person node/, /exactly 2 Person nodes/] },
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
  // One destination per session type, and the template must name all FOUR. The three-value form of
  // this claim was true and useless: `build` was missing from the destination list entirely, so two
  // correctly-tagged items in a design review reported UNROUTED with no valid tag available. Same
  // lesson as the five-collections claim above — a claim about a set has to constrain the whole set.
  { claim: 'skill-review template carries the [skills]|[design]|[facts]|[build] demand-list destination legend',
    source: 'skill-reviews/_TEMPLATE.md',
    must: [/\[skills\]/, /\[design\]/, /\[facts\]/, /\[build\]/] },
  // CLAUDE.md tells the reader demand-split derives reports/handover-<dest>.md. It writes exactly
  // that and not handover/, which are hand-written session notes. The two were conflated in CLAUDE.md
  // until 29 Jul 2026, sending a reader to regenerate files nothing regenerates.
  { claim: 'demand-split writes the derived view to reports/, not to handover/',
    source: 'scripts/demand-split.mjs',
    must: [/OUT_DIR\s*=\s*'reports'/, /handover-\$\{destination\}\.md/] },
  // Routing descends into skill-reviews/design/; the trend and coverage scans deliberately do not.
  // Ten design reviews were invisible to routing until this was fixed, so the repeat counts that
  // decide what gets built were computed from a partial set.
  { claim: 'demand routing is recursive over skill-reviews/, so design/ reviews are routed',
    source: 'scripts/demand-split.mjs',
    must: [/async function walkReviews/, /withFileTypes:\s*true/] },
  // Three properties of the repeat counter that ROADMAP rule 3 depends on, each of which was false
  // until 29 Jul 2026 and each of which fails silently — a miscounted repeat looks exactly like a
  // correct one. Asserted together because they are one mechanism: what counts as an item, how much
  // of it is read, and how two phrasings of it are matched.
  { claim: 'demand-split ignores none/n-a placeholders, coalesces wrapped items, and keeps code spans in the repeat key',
    source: 'scripts/demand-split.mjs',
    must: [/isPlaceholder/, /function joinWrapped/, /joinWrapped\(demandSection\(body\)\)/, /const ids = \[\.\.\.new Set\(/] },
  // The grouping must never call a group a count. Three partition heuristics were tried against a
  // corpus whose true answer was known by hand and each returned a different wrong number, so the
  // output says "related items" and tells the reader to count. A future edit that reinstates a
  // filing count would be re-asserting the thing that was measured wrong three times, which is
  // exactly the drift a CLAIM exists to catch.
  { claim: 'demand-split labels groups as related items, never as a filing count',
    source: 'scripts/demand-split.mjs',
    must: [/related items — /, /A group is not a filing count/] },
  // Closure is deliberate and counted, and a line that parses as neither an item nor a closure is
  // REPORTED. Before 30 Jul a struck line merely failed the item regex and vanished, which is the
  // right outcome by the wrong route: a typo in a tag vanished identically, and the tool could not
  // tell "fixed" from "lost". Both halves are asserted together because either alone restores that.
  { claim: 'demand-split treats strikethrough as a counted closure and reports malformed item lines',
    source: 'scripts/demand-split.mjs',
    must: [/kind: 'malformed'/, /closed by strikethrough and excluded/, /MALFORMED line/] },
  // CLAUDE.md states check-freshness "warns without blocking" on register staleness. That is true of
  // register staleness and false in general: a live, expired, still-sold CPD course exits 1 without
  // --strict. The doc asserted the general form until 29 Jul 2026.
  // The pattern must distinguish the TWO exits, or it cannot detect the drift it exists to catch:
  // register staleness exits only `if (STRICT)`, the expired-course path exits unconditionally. A
  // bare /process\.exit\(1\)/ matches both and would certify the claim even if the unconditional one
  // were made conditional — the "certifies its own staleness" failure of row 1's eighth sighting.
  // So: assert the STRICT-guarded exit exists AND that a bare exit follows the expiry FAIL message.
  { claim: 'check-freshness blocks the build on an expired live CPD course, independently of --strict',
    source: 'scripts/check-freshness.mjs',
    must: [/if \(STRICT\) process\.exit\(1\)/, /approval that has expired[\s\S]{0,600}?\n\s*process\.exit\(1\);/] },
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

  /* States where the register itself says there is NO government card fee.
     WHY THIS EXISTS. `govRows` matches a row's amount against dollar figures scraped from
     kb/register/. Where a state charges nothing, the register says so in words ("there is no
     separate government card fee"), never as "$0.00" — so a page carrying an honest $0.00 row
     matched zero figures, the reconciliation was skipped, and the gate that exists to stop a
     wrong total reaching a buyer was inert on exactly the pages whose total is easiest to get
     wrong. Found by an independent Stage 7 audit of /white-card-wa, where it had been warning
     harmlessly for the life of the page.
     DERIVED, NOT COPIED. The state list is read out of the register text every run, so this
     cannot become a second copy of a register fact: if the register stops saying it, the
     exemption disappears with it. Clauses are split on ; as well as . because the register
     states the fee-free and fee-charging states in one semicolon-separated sentence, and
     splitting on full stops alone would sweep every state into the exemption. */
  const noGovFeeStates = new Set();
  for (const clause of registerText.split(/[.;]/)) {
    if (!/no separate government card fee/i.test(clause)) continue;
    for (const [, st] of clause.matchAll(/\b(ACT|NSW|QLD|TAS|WA)\b/g)) noGovFeeStates.add(st.toLowerCase());
  }
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

    /* CPD BUNDLES HAVE A DIFFERENT SHAPE and were being judged by the course model, which
       permanently reported "0 price, 0 government" and skipped them. On a course page the total is
       price + government fee. On a bundle there IS no government fee and the total IS the price;
       the other row is an RRP contrast ("the same twelve bought individually"), not a component.
       Left as a warning it excused the one page whose arithmetic is most worth checking, since the
       whole pitch is a saving. Checked here rather than excluded: `<BundleOffer>` reconciliation
       further down only reads the cross-sell COMPONENT, never a bundle page's own priceRows, so
       skipping these files would have left $1,188.00 checked by nothing at all. */
    if (f.replace(/\\/g, '/').includes('src/content/cpd-bundles/')) {
      const rrp = (fm.match(/^rrp:\s*["']\$?([\d,]+(?:\.\d{2})?)["']/m) || [])[1];
      const single = (fm.match(/^singleCoursePrice:\s*["']\$?([\d,]+(?:\.\d{2})?)["']/m) || [])[1];
      if (!totalRow) { warns.push(`Bundle total not reconciled in ${f} — no isTotal row.`); continue; }
      if (cents(norm(totalRow.amount)) !== cents(price)) {
        fails.push(`WRONG BUNDLE TOTAL in ${f} — "${totalRow.label}" states $${totalRow.amount} but the bundle price is $${price}. A bundle's total IS its price.`);
        continue;
      }
      if (rrp && !parts.some((r) => cents(norm(r.amount)) === cents(norm(rrp)))) {
        fails.push(`RRP ROW MISMATCH in ${f} — frontmatter rrp is $${rrp} but no priceRow states it. The saving is the pitch; the two must agree.`);
        continue;
      }
      // "N enrolments at $X each" is only true if the RRP divides exactly by the single price.
      if (rrp && single && cents(norm(rrp)) % cents(norm(single)) !== 0) {
        fails.push(`RRP IS NOT A WHOLE MULTIPLE in ${f} — $${rrp} does not divide by the single-course price $${single}, so the "N courses at $${single} each" claim cannot be true.`);
        continue;
      }
      validatedTotals.set(f, new Set([norm(totalRow.amount), ...(rrp ? [norm(rrp)] : [])]));
      reconciled++;
      continue;
    }
    // A $0.00 row counts as the government row only where the register says that state charges
    // nothing. Not accepted blanket: a page understating a real fee as $0.00 is a defect this
    // check must still catch, so the exemption is tied to the state the register cleared.
    const zeroIsGov = noGovFeeStates.has(stateOf(f));
    const govRows = parts.filter((r) => registerFigures.has(norm(r.amount))
      || (zeroIsGov && cents(norm(r.amount)) === 0));
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
      const pool = cpd.liveTotal(reg, cat);         // the sold set's real points — any size is a valid bundle
      const published = cpd.bundlePoints(reg, cat); // what the page publishes for this bundle

      // The only invariant a bundle must satisfy is that it never publishes more points than its
      // live pool actually delivers. Pool size itself is never a defect: CBOS approves each course
      // on its own and ABE bundles whatever selection it chooses, so 12 points is a common builder's
      // year, not a required bundle size. A pool above 12 is not "surplus to prune" and a pool below
      // 12 is not a "shortfall" — the earlier pool-must-equal-12 check encoded a bundle model ABE
      // does not use, and flagged legitimate bundles as broken.
      if (published > pool) {
        fails.push(
          `CPD ${cat}: the page would publish ${published} points but the live pool holds only ${pool}. ` +
          `A bundle may be any size, but it must never claim more points than its pool delivers — ` +
          `fix the source doc or the derivation, never the claim.`
        );
      } else {
        oks.push(`CPD ${cat}: publishes ${published} pts within a live pool of ${pool} (of ${tagged} tagged) — claim <= pool`);
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

/* ---- 5. Superseded White Card unit code --------------------------------- */
/* CPC + CWHS1001 (double C) is the RETIRED White Card unit. The current national code is
   CPCWHS1001, verified at training.gov.au and re-confirmed on Blue Dog's scope 23 Jul 2026.
   The retired code was found live on two indexed pages (a QLD bundle tile, an FAQ answer, and
   AlertForce's scopeNote rendering on /accreditation) plus four docs, while only kb/register/
   had it right - mistakes-log #1's sixth sighting. This turns that per-run act of vigilance
   into a gate.

   ALLOWED only where the line explains the code is retired: the register files say the current
   code "supersedes and is equivalent to the earlier" one, and the mistakes log, pipeline
   artefacts and skill reviews describe the finding. Those records are what make the code's
   status knowable, so a blind find-and-replace would destroy exactly the evidence. A line
   counts as explanatory when it mentions supersede / retired / earlier / old / former /
   replaced / deprecated.

   The literal is assembled at runtime so this file does not itself trip the scan (same reason
   as #7 in the mistakes log: never write the token a machine scans for). */
const RETIRED_UNIT = 'CPC' + 'CWHS1001';
const EXPLAINS_RETIRED = /supersed|retired|earlier|\bold\b|former|replaced|deprecat/i;
const unitHits = [];
for (const dir of ['src', 'new site', '.claude/skills']) {
  for (const ext of ['.md', '.mdx', '.ts', '.astro', '.mjs']) {
    for (const f of walk(dir, ext)) {
      const text = readFileSync(f, 'utf8');
      if (!text.includes(RETIRED_UNIT)) continue;
      text.split('\n').forEach((line, i) => {
        if (line.includes(RETIRED_UNIT) && !EXPLAINS_RETIRED.test(line)) unitHits.push(`${f}:${i + 1}`);
      });
    }
  }
}
if (unitHits.length) {
  fails.push(`Superseded White Card unit ${RETIRED_UNIT} presented as current in ${unitHits.length} place(s): ${unitHits.slice(0, 6).join(', ')}${unitHits.length > 6 ? ' ...' : ''}. The current code is CPCWHS1001 (kb/register/legislation-references-tas.md). Only a line that says the code is superseded may mention it.`);
} else {
  oks.push(`Superseded White Card unit ${RETIRED_UNIT} is not presented as current in src/, new site/ or the skill`);
}


/* ---- 6. Company name in full ------------------------------------------- */
/* The company is "ABE Education" in anything a reader sees. Bare "ABE" reads as an initialism
   to decode, competes with the other three-letter training brands, and left the site
   contradicting its own footer, which has always said "ABE Education is not a Registered
   Training Organisation". 133 bare occurrences were expanded on 24 Jul 2026; without a gate
   the next page written would reintroduce them.

   Scope is reader-facing source only: page content, page data and components. Internal files
   (kb/, pipeline/, comments in scripts) keep the short form, because nobody reads them as copy.

   EXEMPT, by path:
     SiteHeader.astro  the logotype - "ABE" is the mark, with "Education" folded in beside it
     styleguide.astro  an internal, noindex component library, not customer copy
   A comment line is exempt too: a comment explaining the rule must be able to name what it bans. */
const BARE_ABE = /\bABE\b(?! Education)/;
const NAME_EXEMPT_PATHS = ['SiteHeader.astro', 'styleguide.astro'];
const isComment = (l) => /^\s*(\/\/|\*|\/\*|#|<!--)/.test(l);
const nameHits = [];
for (const dir of ['src/content', 'src/pages', 'src/data', 'src/components']) {
  for (const ext of ['.md', '.mdx', '.ts', '.astro']) {
    for (const f of walk(dir, ext)) {
      if (NAME_EXEMPT_PATHS.some((x) => f.endsWith(x))) continue;
      readFileSync(f, 'utf8').split('\n').forEach((line, i) => {
        if (BARE_ABE.test(line) && !isComment(line)) nameHits.push(`${f}:${i + 1}`);
      });
    }
  }
}
if (nameHits.length) {
  fails.push(`Bare "ABE" in reader-facing content in ${nameHits.length} place(s): ${nameHits.slice(0, 6).join(', ')}${nameHits.length > 6 ? ' ...' : ''}. The company is "ABE Education" everywhere a reader can see it (CLAUDE.md house style). Only the SiteHeader logotype and the styleguide are exempt.`);
} else {
  oks.push('Company name: no bare "ABE" in reader-facing content');
}

/* ---- 8. The skill must not teach what the skill bans -------------------- */
/* `verification.md` §1f bans "Enrol now" / "Enrol today" as a publish hard-blocker, and
   `content-formatting-guidelines.md` §S5 gave "Ready to get started? Enrol now" as its worked
   example of a good micro-CTA. `seo-content-reference.md` closed a worked meta description with
   "Enrol today." Both were found on 1 Aug 2026, the day the build-side guardrail
   (BANNED_CTA_BUDGET in src/integrations/guardrails.ts) went in, and they are the most likely
   reason 21 banned CTAs reached four live pages: an author following the worked example was
   breaching the rule by doing so.

   A rule and its own worked example drifting apart is mistakes-log #1's family seen from the
   inside - not documentation drifting from code, but one document drifting from another in the
   same skill. The build-side guardrail cannot see this: it reads dist/, and a reference doc is
   never built. So it needs its own gate, on the source of the copy rather than the copy.

   ALLOWED where the line states the ban rather than demonstrating it. A doc must be able to name
   what it forbids - that is exactly what meta-framework.md's banned/replacement table does, and
   what quality-gates.md item 11 does. A line counts as explanatory when it mentions ban / never /
   avoid / instead / no / not / weak / wrong / forbid / blocker / replace / bad, or carries the
   "❌" marker meta-framework.md uses for its don't-column.

   The first run of this check flagged 10 lines and only 3 were the defect it was written for, so
   the exemptions below were widened against those 10 by hand rather than tuned until the output
   looked tidy. The other 7 split two ways: 4 legitimately catalogue the ban (the ❌/✅ table,
   quality-gates 11, verification 1f and its blocker list, SKILL.md stage 7) and 3 were real drift
   of a milder kind - trust-bar-guidelines.md used "Enrol Now" three times as the *generic name of
   the enrol button*, which normalises the banned label without recommending it, and those were
   reworded rather than exempted.

   The literals are assembled at runtime so this file does not itself trip the scan (mistakes-log
   #7: never write the token a machine scans for). */
const BANNED_CTAS = ['Enrol ' + 'now', 'Enrol ' + 'today'];
const EXPLAINS_BANNED = /\bban|never|avoid|instead|\bno\b|\bnot\b|weak|wrong|forbid|blocker|replace|\bbad\b|❌/i;
const EXPLAIN_WINDOW = 4;
const ctaDocHits = [];
for (const f of walk('.claude/skills', '.md')) {
  const lines = readFileSync(f, 'utf8').split('\n');
  lines.forEach((line, i) => {
    if (!BANNED_CTAS.some((p) => line.toLowerCase().includes(p.toLowerCase()))) return;
    // The explanation rarely sits on the offending line. A don't-column is labelled by its table
    // header; a deliberately-weak sample is labelled by the critique underneath it. Reading only
    // the line flagged all four of those as defects on the first run. So the window is the block,
    // not the line - which is also why EXPLAIN_WINDOW is small: a ban stated nine lines away is
    // not labelling this example, it is a different paragraph.
    const near = lines.slice(Math.max(0, i - EXPLAIN_WINDOW), i + EXPLAIN_WINDOW + 1).join('\n');
    if (EXPLAINS_BANNED.test(near)) return;
    ctaDocHits.push(`${f}:${i + 1}`);
  });
}
if (ctaDocHits.length) {
  fails.push(`Skill reference docs demonstrate a banned CTA in ${ctaDocHits.length} place(s): ${ctaDocHits.slice(0, 6).join(', ')}${ctaDocHits.length > 6 ? ' ...' : ''}. "Enrol now"/"Enrol today" is a publish hard-blocker (verification.md 1f) - a worked example must not use one. Rewrite it benefit-led and first-person, or say on the same line that the phrase is banned.`);
} else {
  oks.push(`Skill docs: no banned CTA demonstrated in a worked example (${BANNED_CTAS.length} phrase(s) scanned)`);
}

/* ---- 7. SYSTEM.md §5 names every check that exists ---------------------- */
/* WHY THIS EXISTS. SYSTEM.md is the standing design reference, and its §5 is the list of how the
   system knows it is working. On 29 July 2026 that list named five checks while eleven were
   running. Absent from it: `check-assets` (a prebuild gate that had caught a real untracked-hero
   404 two commits earlier), `check-redirect-targets`, `check-shipped`, `check-pipeline`,
   `prose-lint` and `check-links`.

   Nothing could have caught it. `system-health` resolves the paths a SKILL points at; §1 above
   checks a hand-curated list of claims about the code. Neither reads SYSTEM.md, so the document
   describing the check system had no check of its own — SYSTEM.md §2's "every recorded thing has
   a reader" failing on SYSTEM.md. The mistakes log had recorded "documentation describing the
   build drifted from the code and was trusted over it" eight times before this one; this is that
   risk landing on the document meant to explain the rules.

   BOTH DIRECTIONS, because a claim about a set has to constrain the whole set or it cannot
   detect an addition — the same lesson as the five-collections claim in §1:
     forward   a check script not named in §5 fails   catches a check added, doc not updated
     reverse   a name in §5 with no script fails      catches a check renamed or deleted

   Exempt scripts are generators and utilities, not checks. Exempt means "need not be named",
   not "may not be named": §5 currently names all four so its list is exhaustive, and the reverse
   direction still holds them to existing. */
const CHECK_EXEMPT = new Map([
  ['generate-redirects', 'generator — the only writer of public/_redirects'],
  ['demand-split',       'derived view — renders handover notes from demand lists'],
  ['health-log-dedupe',  'log maintenance — collapses identical health records'],
  ['sync-cpd-register',  'manual data sync, kept outside prebuild so the build stays hermetic'],
  ['page-status',        'derived view — per-page build status for the status board; gates nothing, always exits 0'],
  ['status-board',       'derived view — renders page-status JSON into reports/status-board.html'],
  ['lhci-deployed-config', 'CI wiring — rewrites .lighthouserc.json onto the deployed origin for the nightly CWV run; asserts nothing itself'],
]);
/* A backticked token in §5 that is lowercase and hyphenated is read as a script reference. Every
   such token in §5 today is one. Add a term here only if §5 ever needs to backtick a hyphenated
   word that is not a script, so the exception is visible rather than loosening the pattern. */
const NOT_A_SCRIPT_REF = new Set([]);

if (!existsSync('SYSTEM.md')) {
  warns.push('SYSTEM.md not found — its §5 check list is unverified. Run this from the repo root.');
} else {
  const s5 = (readFileSync('SYSTEM.md', 'utf8').match(/\n## 5\.[\s\S]*?(?=\n## |\s*$)/) || [])[0];
  if (!s5) {
    fails.push('SYSTEM.md has no "## 5." section, so its check list cannot be verified. If the section was renumbered, update the selector in scripts/check-claims.mjs §7 to match.');
  } else {
    const scripts = readdirSync('scripts').filter((f) => f.endsWith('.mjs')).map((f) => f.slice(0, -4));
    const named = new Set([...s5.matchAll(/`([^`]+)`/g)]
      .map((m) => m[1].trim().replace(/\.mjs$/, ''))
      .filter((t) => /^[a-z][a-z0-9]*(?:-[a-z0-9]+)+$/.test(t) && !NOT_A_SCRIPT_REF.has(t)));

    const missing = scripts.filter((s) => !CHECK_EXEMPT.has(s) && !named.has(s));
    const dangling = [...named].filter((t) => !scripts.includes(t));

    if (missing.length) {
      fails.push(`SYSTEM.md §5 does not name ${missing.length} check(s) that run: ${missing.join(', ')}. §5 is the standing list of how the system knows it is working, so a check missing from it is invisible to every session that reads the document instead of scripts/. Name it there, or add it to CHECK_EXEMPT in scripts/check-claims.mjs with a reason if it is not a check.`);
    }
    if (dangling.length) {
      fails.push(`SYSTEM.md §5 names ${dangling.length} script(s) that do not exist: ${dangling.join(', ')}. A pointer at nothing is the failure mode this system is most prone to (SYSTEM.md §2). Fix the name, delete the line, or add the term to NOT_A_SCRIPT_REF if it is not a script reference.`);
    }
    if (!missing.length && !dangling.length) {
      oks.push(`SYSTEM.md §5: names all ${scripts.length - CHECK_EXEMPT.size} check(s) that run, ${CHECK_EXEMPT.size} utility script(s) exempt`);
    }
  }
}


let slugShown = 0;
for (const [l, xs] of [['FAIL', fails], ['WARN', warns], ['OK', oks]]) {
  const keep = bySlug(xs, SLUG);
  slugShown += keep.length;
  for (const m of keep) console.log(`  ${l.padEnd(5)} ${m}`);
}
if (SLUG) console.log(slugNote(SLUG, slugShown, fails.length + warns.length + oks.length));

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
