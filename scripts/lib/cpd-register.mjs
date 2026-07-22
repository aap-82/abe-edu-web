/**
 * Filesystem and integrity layer over the CPD register, for Node scripts.
 *
 * The derivation rules themselves live in `cpd-derive.mjs` and are re-exported here, so a
 * script and a page cannot disagree about what a bundle is worth — see the note in that file.
 * This module adds only what a browser bundle must never contain: reading the file, and the
 * checksum that proves nobody hand-edited it.
 */

import { createHash } from 'node:crypto';
import { readFileSync, existsSync } from 'node:fs';

export * from './cpd-derive.mjs';

export const REGISTER_PATH = 'kb/register/cpd/tas-courses.json';

export function registerExists(root = '.') {
  return existsSync(`${root}/${REGISTER_PATH}`);
}

export function readRegister(root = '.') {
  return JSON.parse(readFileSync(`${root}/${REGISTER_PATH}`, 'utf8'));
}

/**
 * Deterministic serialisation of the payload only — `generated` is excluded so re-syncing
 * without a data change does not churn the checksum, and `_readme` is excluded so the notes
 * can be improved without looking like tampering. Keys are sorted so formatting differences
 * never register as data differences.
 */
function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map((k) => `${JSON.stringify(k)}:${canonical(value[k])}`).join(',')}}`;
  }
  return JSON.stringify(value ?? null);
}

export function payloadChecksum(reg) {
  const payload = { bundleMap: reg.bundleMap, courses: reg.courses };
  return 'sha256:' + createHash('sha256').update(canonical(payload)).digest('hex');
}

export function checksumMatches(reg) {
  return reg?.generated?.checksum === payloadChecksum(reg);
}
