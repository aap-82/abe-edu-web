#!/usr/bin/env node
// Prose lint (W0-6): fails a PR on an em dash or the banned word "comprehensive" in
// src/content/**/*.mdx prose. mistakes-log M2 saw this slip through review three times,
// so it becomes a build step instead of a style-guide line.
//
// "Labels and data" (URLs, citation labels, codes, dates) are excepted via the ALLOWLIST
// below, checked by YAML field name in frontmatter. Reader-facing copy - subhead,
// description, ticks, step bodies, expert bios, disclaimersHtml - is not exempt and is
// always checked. The MDX body is handled separately: JSX prop expressions ({...}) are
// stripped wholesale, since real body prose is JSX text content between tags, and every
// component prop in this codebase is structured data, not paragraph prose.
//
// Line numbers are always computed against the original file text by absolute character
// offset, never by re-deriving from a substring - that offset math is where this kind of
// script quietly goes wrong.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const CONTENT_DIR = join(ROOT, 'src/content');

// Frontmatter YAML keys that carry labels/data, not prose. Extend this list rather than
// weakening the checks below if a new non-prose field trips a false positive.
const ALLOWLIST = new Set([
  'href', 'url', 'item', 'canonical', 'sectionId', 'code', 'state', 'authorityModel',
  'credentialCategory', 'priceNumber', 'price', 'courseWorkload', 'rtoNumber', 'unitCode',
  'unitName', 'credential', 'verified', 'date', 'jobTitle', 'linkedin', 'ogImage', 'src',
  'alt', 'artefactImg', 'artefactRatio', 'artefactSpec', 'label', 'credentialName', 'name',
  'n', 'microcopy',
]);

const EM_DASH = /—/g;
const COMPREHENSIVE = /\bcomprehensive\b/gi;

function walkMdx(dir, out = []) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walkMdx(p, out);
    else if (f.endsWith('.mdx')) out.push(p);
  }
  return out;
}

// Strip balanced {...} JS expressions from the MDX body (component props): depth-counted
// rather than a regex, since a prop can itself contain a nested object literal. Output is
// the same length as the input with expressions blanked to spaces, so every remaining
// character's absolute offset in the original file is unchanged.
function stripExpressions(text) {
  let depth = 0;
  let out = '';
  for (const ch of text) {
    if (ch === '{') { depth++; out += ch === '\n' ? '\n' : ' '; continue; }
    if (ch === '}') { if (depth > 0) depth--; out += ' '; continue; }
    out += depth > 0 && ch !== '\n' ? ' ' : ch;
  }
  return out;
}

function lineAt(fullText, absoluteIndex) {
  return fullText.slice(0, absoluteIndex).split('\n').length;
}

function context(text, index, len) {
  const start = Math.max(0, index - 40);
  const end = Math.min(text.length, index + len + 40);
  return text.slice(start, end).replace(/\s+/g, ' ').trim();
}

// Scans `text` for banned patterns and reports against `fullSrc` using `baseOffset`
// (text's starting index within fullSrc) to recover the true file line number.
function checkText(fails, rel, fullSrc, baseOffset, text, source) {
  for (const m of text.matchAll(EM_DASH)) {
    fails.push(`${rel}:${lineAt(fullSrc, baseOffset + m.index)}: em dash in ${source} - "...${context(text, m.index, 1)}...". House style is no em dashes; use a comma, full stop, or parentheses.`);
  }
  for (const m of text.matchAll(COMPREHENSIVE)) {
    fails.push(`${rel}:${lineAt(fullSrc, baseOffset + m.index)}: banned word "comprehensive" in ${source} - "...${context(text, m.index, m[0].length)}...".`);
  }
}

// Matches `key: "value"` / `key: 'value'` pairs (block or flow YAML - not line-anchored,
// so it also finds pairs inside `{ ... }` flow mappings) and bare `- "value"` list items
// (e.g. hero.ticks). Quote-aware: stops at the first unescaped matching quote.
const KV_PAIR = /(\w+):\s*(["'])((?:(?!\2)[^\\]|\\.)*)\2/g;
const LIST_ITEM = /^[ \t]*-[ \t]+(["'])((?:(?!\1)[^\\]|\\.)*)\1[ \t]*$/gm;

function checkFrontmatter(fails, rel, fullSrc, frontmatter, frontmatterOffset) {
  for (const m of frontmatter.matchAll(KV_PAIR)) {
    const [, key, , value] = m;
    if (ALLOWLIST.has(key)) continue;
    const valueIndex = m.index + m[0].lastIndexOf(value);
    checkText(fails, rel, fullSrc, frontmatterOffset + valueIndex, value, `frontmatter.${key}`);
  }
  for (const m of frontmatter.matchAll(LIST_ITEM)) {
    const value = m[2];
    const valueIndex = m.index + m[0].indexOf(value);
    checkText(fails, rel, fullSrc, frontmatterOffset + valueIndex, value, 'frontmatter list item');
  }
}

let files;
try {
  files = walkMdx(CONTENT_DIR);
} catch {
  files = [];
}

const fails = [];

for (const file of files) {
  const rel = file.slice(ROOT.length + 1).replace(/\\/g, '/');
  const src = readFileSync(file, 'utf8');

  // First two `---` fences delimit frontmatter; everything after is the MDX body.
  const fenceRe = /^---$/m;
  const first = src.match(fenceRe);
  if (!first) continue;
  const secondSearchStart = first.index + first[0].length;
  const rest = src.slice(secondSearchStart);
  const second = rest.match(fenceRe);
  if (!second) continue;

  const frontmatterOffset = first.index + first[0].length;
  const frontmatter = rest.slice(0, second.index);
  const bodyOffset = secondSearchStart + second.index + second[0].length;
  const body = src.slice(bodyOffset);

  checkFrontmatter(fails, rel, src, frontmatter, frontmatterOffset);
  checkText(fails, rel, src, bodyOffset, stripExpressions(body), 'body');
}

if (fails.length) {
  console.error(`Prose lint: ${fails.length} issue(s) found.\n`);
  for (const f of fails) console.error(`  ${f}`);
  process.exit(1);
}

console.log(`Prose lint: ${files.length} file(s) passed.`);
