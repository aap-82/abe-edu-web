#!/usr/bin/env node
/* check-design-register — DESIGN.md's frontmatter against src/styles/global.css.
 *
 * WHY THIS EXISTS. `DESIGN.md` is canonical for tokens (CLAUDE.md: "DESIGN.md and global.css are
 * canonical for tokens, fonts, class names, components, and the warm palette, and win on any
 * conflict"). But nothing in the repo reads it. Astro does not import it, `guardrails.ts` does not
 * parse it, and `check-claims` verifies prose claims about the build rather than token values. So
 * the one document a generator or a fresh session would trust for "what colour is the page" could
 * disagree with the stylesheet indefinitely, and every gate would stay green while it did.
 *
 * It did. Found by hand on 13 Aug 2026 and fixed the same day, six values were wrong:
 *
 *   --ground              #fbf9f5   absent from the frontmatter entirely, though it is the
 *                                   background of every page on the site and had been since the
 *                                   ground/paper split on 24 Jul 2026 — three weeks green
 *   --paper-chrome        #fbf9f5   recorded as #ffffff, a value that predated the same split
 *   --paper-grey          #f2f3f4   absent (token promoted 12 Aug 2026)
 *   --paper-grey-soft     #f8f9fa   absent (token added 12 Aug 2026)
 *   typography.display              recorded clamp(40px,6.2vw,72px)/600, ships 34-56px at 700
 *   rounded                         had no 3px step, though .capsule, .note.maroon and .ph::after
 *                                   all use one
 *
 * The `--ground` row is the one that shows why a check beats a re-read. Anything generated from the
 * register would have put cards on the same value as the page and lost the card lift the split
 * exists to protect, and nothing would have said so.
 *
 * WHAT IT ASSERTS, in both directions, because only one of them catches a token ADDED to the code:
 *   1. colours    every frontmatter colour resolves to a :root custom property with the same value,
 *                 AND every :root colour property is in the frontmatter (this is the direction that
 *                 --ground failed)
 *   2. typography each role's DECLARED properties match the CSS rule that renders it
 *   3. spacing    both directions against the --s-* scale
 *   4. rounded    every scale step is used somewhere; literal radii outside the scale are reported
 *   5. refs       every {group.token} reference in `components` resolves to a real token
 *
 * SEVERITY. Colour, typography and spacing disagreements FAIL: they are two files stating different
 * values for one fact, and the session type that owns DESIGN.md (design) also owns global.css, so
 * whoever trips this can fix it. That is the condition the banned-CTA ratchet did NOT have, which is
 * why this one is a flat assertion and that one is a budget. Off-scale radii and unused scale steps
 * WARN: a one-off radius is a judgement call, not a contradiction.
 *
 * It starts green. Verified against the repo at the commit that added it.
 *
 * Usage: node scripts/check-design-register.mjs [--strict] [--verbose]
 */

import { readFileSync, existsSync } from 'node:fs';

const STRICT = process.argv.includes('--strict');
const VERBOSE = process.argv.includes('--verbose');
const fails = [], warns = [], oks = [];

const MD = 'DESIGN.md';
const CSS = 'src/styles/global.css';

/* Frontmatter colour name -> CSS custom property, where the two deliberately differ. The register
   uses reader-facing names; the stylesheet uses shorter ones. Every entry here is a real rename, not
   a workaround: an alias map is exactly where a check quietly narrows, so it stays short and each
   line has to be justifiable out loud. */
const ALIAS = new Map([
  ['verify-blue', 'verify'],   // --verify is the lighter of the two verify blues
  ['ok-green', 'ok'],          // retired 20 Jul 2026, still defined, referenced nowhere
]);

/* :root colour properties deliberately absent from the register, with the reason. Anything not
   listed here and not in the frontmatter is a FAIL, which is what makes the reverse direction
   worth running at all. */
const NOT_IN_REGISTER = new Map([
  ['verify-soft', 'an alpha derivative of --verify (the resting underline on a citation link), not a palette entry'],
]);

/* Typography role -> the selector that actually renders it. Verified by following the consumer, not
   by name: `display` is h1.h1 because Hero.astro:45 emits <h1 class="h1">. */
const TYPE_SELECTOR = new Map([
  ['display', 'h1.h1'],
  ['headline', '.h2'],
  ['title', '.h3'],
  ['body', 'body'],
  ['label', '.eyebrow'],
]);

const PROP = new Map([
  ['fontSize', 'font-size'], ['fontWeight', 'font-weight'],
  ['lineHeight', 'line-height'], ['letterSpacing', 'letter-spacing'],
  ['fontFamily', 'font-family'],
]);

if (!existsSync(MD)) { console.log(`  FAIL  ${MD} not found. Run this from the repo root.`); process.exit(STRICT ? 1 : 0); }
if (!existsSync(CSS)) { console.log(`  FAIL  ${CSS} not found. Run this from the repo root.`); process.exit(STRICT ? 1 : 0); }

/* ---- parse ------------------------------------------------------------- */

const mdRaw = readFileSync(MD, 'utf8');
const fmMatch = mdRaw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
if (!fmMatch) { console.log(`  FAIL  ${MD} has no YAML frontmatter, so it declares no tokens. The register is the frontmatter; prose is context.`); process.exit(STRICT ? 1 : 0); }

/* Two-level indentation reader. Deliberately not a YAML library: the frontmatter shape is fixed by
   the DESIGN.md spec (flat scalar groups plus one nested level for typography and components), and a
   dependency for twenty lines of parsing is a worse trade than the parsing. */
function parseFrontmatter(src) {
  const groups = {};
  let group = null, sub = null;
  for (const line of src.split(/\r?\n/)) {
    if (!line.trim() || /^\s*#/.test(line)) continue;
    let m;
    if ((m = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/))) { group = m[1]; sub = null; groups[group] = m[2].trim() || {}; continue; }
    if (typeof groups[group] !== 'object') continue;
    if ((m = line.match(/^ {2}"?([\w-]+)"?:\s*(.*)$/))) {
      const [, k, v] = m;
      if (v.trim() === '') { sub = k; groups[group][k] = {}; }
      else { sub = null; groups[group][k] = v.trim().replace(/^["']|["']$/g, ''); }
      continue;
    }
    if (sub && (m = line.match(/^ {4}"?([\w-]+)"?:\s*(.*)$/))) {
      groups[group][sub][m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
    }
  }
  return groups;
}
const fm = parseFrontmatter(fmMatch[1]);

const cssRaw = readFileSync(CSS, 'utf8');
const css = cssRaw.replace(/\/\*[\s\S]*?\*\//g, '');   // comments carry example values; strip first

/* The FIRST :root block only. A later one exists inside @media(max-width:900px) and overrides a
   sticky-chrome height; base declarations are the canonical ones and a responsive override is not a
   second opinion about a token's value. */
const rootBlock = (css.match(/:root\s*\{([\s\S]*?)\}/) || [])[1] || '';
const root = new Map();
for (const m of rootBlock.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) root.set(m[1], m[2].trim());

/* var(--x) indirection: --paper-chrome:var(--ground). Depth-capped so a cycle cannot hang the run. */
function resolve(v, depth = 0) {
  const m = String(v).match(/^var\(\s*--([\w-]+)\s*\)$/);
  if (!m || depth > 8) return String(v).trim();
  return root.has(m[1]) ? resolve(root.get(m[1]), depth + 1) : String(v).trim();
}

const isColour = (v) => /^(#[0-9a-f]{3,8}|rgba?\(|hsla?\(|oklch\()/i.test(resolve(v));
const norm = (v) => String(v).toLowerCase().replace(/\s+/g, '').replace(/(^|[^0-9a-z])0\./g, '$1.');

function ruleFor(selector) {
  const esc = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const m = css.match(new RegExp(`(?:^|[};])\\s*${esc}\\s*\\{([^}]*)\\}`, 'm'));
  if (!m) return null;
  const decls = new Map();
  for (const d of m[1].split(';')) {
    const i = d.indexOf(':');
    if (i > 0) decls.set(d.slice(0, i).trim(), d.slice(i + 1).trim());
  }
  return decls;
}

/* ---- 1. colours, both directions --------------------------------------- */

const fmColours = fm.colors && typeof fm.colors === 'object' ? fm.colors : {};
const fmColourNames = Object.keys(fmColours);

if (fmColourNames.length === 0) {
  fails.push(`${MD} frontmatter declares no \`colors\`, so this check compared nothing. A zero from a set-scoped check is its least trustworthy output, so this is a FAIL rather than a silent pass — either the frontmatter lost its palette or parseFrontmatter() no longer matches its shape.`);
} else {
  let matched = 0;
  for (const name of fmColourNames) {
    const prop = ALIAS.get(name) ?? name;
    if (!root.has(prop)) {
      fails.push(`\`${MD}\` declares colour \`${name}\` (${fmColours[name]}) but \`--${prop}\` is not defined in ${CSS}'s :root. Either the token was deleted from the stylesheet and the register still advertises it, or the two names have diverged and ALIAS in scripts/check-design-register.mjs needs the mapping.`);
      continue;
    }
    const actual = resolve(root.get(prop));
    if (norm(actual) === norm(fmColours[name])) { matched++; if (VERBOSE) oks.push(`colour ${name} = ${actual}`); }
    else fails.push(`Colour \`${name}\`: \`${MD}\` says ${fmColours[name]}, \`--${prop}\` in ${CSS} is ${actual}. DESIGN.md is canonical for tokens, so these must not disagree; correct whichever one is wrong rather than leaving a reader to pick.`);
  }

  const rootColours = [...root.keys()].filter((k) => isColour(root.get(k)));
  const known = new Set(fmColourNames.map((n) => ALIAS.get(n) ?? n));
  const unrecorded = rootColours.filter((k) => !known.has(k) && !NOT_IN_REGISTER.has(k));
  if (unrecorded.length) {
    fails.push(`${unrecorded.length} colour token(s) in ${CSS}'s :root are absent from \`${MD}\`'s frontmatter: ${unrecorded.map((k) => `--${k} (${resolve(root.get(k))})`).join(', ')}. This is the direction that matters: a token ADDED to the stylesheet and never recorded is invisible to anything reading the register, which is how --ground went three weeks describing the wrong page background. Add it to the frontmatter, or to NOT_IN_REGISTER in scripts/check-design-register.mjs with a reason.`);
  }
  if (!unrecorded.length && matched === fmColourNames.length) {
    oks.push(`Colours: ${matched}/${fmColourNames.length} in ${MD} match :root, and all ${rootColours.length} :root colour token(s) are recorded (${NOT_IN_REGISTER.size} deliberately exempt)`);
  }
}

/* ---- 2. typography ------------------------------------------------------ */

const fmType = fm.typography && typeof fm.typography === 'object' ? fm.typography : {};
const typeRoles = Object.keys(fmType);

if (typeRoles.length === 0) {
  fails.push(`${MD} frontmatter declares no \`typography\` roles, so nothing was compared. See the colours note above on why an empty set fails rather than passes.`);
} else {
  let compared = 0, undeclared = 0, unmapped = 0;
  for (const role of typeRoles) {
    const selector = TYPE_SELECTOR.get(role);
    if (!selector) { unmapped++; warns.push(`Typography role \`${role}\` has no selector in TYPE_SELECTOR (scripts/check-design-register.mjs), so its values are unverified. Map it to the rule that renders it, following the consumer rather than the name.`); continue; }
    const decls = ruleFor(selector);
    if (!decls) { fails.push(`Typography role \`${role}\` maps to selector \`${selector}\`, which does not exist in ${CSS}. The rule was renamed or removed and the mapping did not follow.`); continue; }
    for (const [key, cssProp] of PROP) {
      if (!(key in fmType[role])) continue;
      if (!decls.has(cssProp)) { undeclared++; continue; }   // inherited or defaulted; absence is not disagreement
      let want = fmType[role][key], got = resolve(decls.get(cssProp));
      if (key === 'fontFamily') {
        /* Primary face only. The CSS stacks carry metric-matched fallback faces ('Archivo Fallback'
           and siblings) that the register's stacks omit; that divergence is separately filed and is
           not what this check is for. Comparing the first family asserts the thing that matters,
           which typeface renders, and says so rather than pretending to compare the whole stack. */
        const first = (s) => String(s).split(',')[0].trim().replace(/^["']|["']$/g, '');
        want = first(want); got = first(got);
      }
      compared++;
      if (norm(want) !== norm(got)) {
        fails.push(`Typography \`${role}.${key}\`: \`${MD}\` says ${fmType[role][key]}, \`${selector}\` in ${CSS} says ${decls.get(cssProp)}. The register is what a generator or a fresh session reads; a wrong display size there produces a hero at the wrong scale with every gate green.`);
      }
    }
  }
  if (!fails.some((f) => f.startsWith('Typography'))) {
    oks.push(`Typography: ${compared} declared propert(ies) across ${typeRoles.length - unmapped} role(s) match their rendering rule (${undeclared} not declared on the selector, so not compared; font stacks compared on the primary face only)`);
  }
}

/* ---- 3. spacing, both directions --------------------------------------- */

const fmSpace = fm.spacing && typeof fm.spacing === 'object' ? fm.spacing : {};
const spaceKeys = Object.keys(fmSpace);
if (spaceKeys.length === 0) {
  warns.push(`${MD} frontmatter declares no \`spacing\` scale, so the --s-* tokens are unverified.`);
} else {
  let ok = 0;
  for (const k of spaceKeys) {
    const prop = `s-${k}`;
    if (!root.has(prop)) { fails.push(`Spacing step \`${k}\` (${fmSpace[k]}) in \`${MD}\` has no \`--${prop}\` in ${CSS}.`); continue; }
    const actual = resolve(root.get(prop));
    if (norm(actual) === norm(fmSpace[k])) ok++;
    else fails.push(`Spacing \`${k}\`: \`${MD}\` says ${fmSpace[k]}, \`--${prop}\` is ${actual}.`);
  }
  const rootSpace = [...root.keys()].filter((k) => /^s-/.test(k));
  const missing = rootSpace.filter((k) => !spaceKeys.includes(k.slice(2)));
  if (missing.length) fails.push(`${missing.length} spacing token(s) in ${CSS} are absent from \`${MD}\`: ${missing.map((k) => `--${k}`).join(', ')}.`);
  else if (ok === spaceKeys.length) oks.push(`Spacing: ${ok}/${spaceKeys.length} step(s) match --s-*, and every --s-* token is recorded`);
}

/* ---- 4. rounded --------------------------------------------------------- */

const fmRound = fm.rounded && typeof fm.rounded === 'object' ? fm.rounded : {};
const roundVals = new Set(Object.values(fmRound).map(norm));
if (roundVals.size === 0) {
  warns.push(`${MD} frontmatter declares no \`rounded\` scale.`);
} else {
  /* There are no --radius-* custom properties; radii are literal in the stylesheet, so the scale is
     checked by use rather than by definition. px only: 50% and pill radii are shapes, not steps. */
  const used = new Map();
  for (const m of css.matchAll(/border-radius\s*:\s*(\d+px)/g)) used.set(norm(m[1]), (used.get(norm(m[1])) ?? 0) + 1);
  const unused = [...roundVals].filter((v) => !used.has(v));
  const offScale = [...used.keys()].filter((v) => !roundVals.has(v));
  if (unused.length) warns.push(`Rounded step(s) declared in \`${MD}\` but used nowhere in ${CSS}: ${unused.join(', ')}. A scale step with no consumer is either dead or a rule nobody followed.`);
  if (offScale.length) warns.push(`Literal border-radius value(s) in ${CSS} outside the \`rounded\` scale: ${offScale.map((v) => `${v} (${used.get(v)}x)`).join(', ')}. A one-off radius may be deliberate, so this warns rather than fails, but the scale should either absorb it or the rule should use a step.`);
  if (!unused.length && !offScale.length) oks.push(`Rounded: all ${roundVals.size} step(s) used, no off-scale literal radii`);
  else if (!unused.length) oks.push(`Rounded: all ${roundVals.size} step(s) in the scale are used in ${CSS}`);
}

/* ---- 5. component token references -------------------------------------- */

const fmComp = fm.components && typeof fm.components === 'object' ? fm.components : {};
const refs = [];
for (const [name, props] of Object.entries(fmComp)) {
  if (typeof props !== 'object') continue;
  for (const [prop, val] of Object.entries(props)) {
    const m = String(val).match(/^\{([\w-]+)\.([\w-]+)\}$/);
    if (m) refs.push({ name, prop, group: m[1], token: m[2], raw: val });
  }
}
const dangling = refs.filter((r) => !(fm[r.group] && typeof fm[r.group] === 'object' && r.token in fm[r.group]));
if (dangling.length) {
  fails.push(`${dangling.length} component token reference(s) in \`${MD}\` point at nothing: ${dangling.map((r) => `${r.name}.${r.prop} -> ${r.raw}`).join(', ')}. A renamed primitive silently breaks every component that referenced it, and the DESIGN.md spec's whole point is that components compose from primitives.`);
} else if (refs.length) {
  oks.push(`Component refs: ${refs.length}/${refs.length} {group.token} reference(s) across ${Object.keys(fmComp).length} component(s) resolve`);
}

/* ---- report -------------------------------------------------------------- */

for (const [l, xs] of [['FAIL', fails], ['WARN', warns], ['OK', oks]]) {
  for (const m of xs) console.log(`  ${l.padEnd(5)} ${m}`);
}
console.log(`\n  ${fails.length} failing, ${warns.length} warning, ${oks.length} ok`);
if (fails.length && STRICT) process.exit(1);
