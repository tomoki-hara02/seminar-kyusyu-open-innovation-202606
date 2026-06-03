import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = path.join(root, 'src/config/seminarSlides.ts');
const seminarDir = path.join(root, 'src/components/slides/seminar');

const registry = fs.readFileSync(registryPath, 'utf8');
const ids = [...registry.matchAll(/id: '([^']+)'/g)].map((m) => m[1]);
const notes = [...registry.matchAll(/note: '([^']*)'/g)].map((m) => m[1]);
const rulesTocs = [...registry.matchAll(/rulesToc: '([^']+)'/g)].map((m) => m[1]);

const files = fs
  .readdirSync(seminarDir)
  .filter((f) => f.endsWith('.tsx'))
  .map((f) => f.replace(/\.tsx$/, ''));

const dup = new Map();
for (const id of ids) {
  const p = id.split('-')[0];
  dup.set(p, (dup.get(p) || 0) + 1);
}
const dups = [...dup.entries()].filter(([, c]) => c > 1);

let noteBad = 0;
for (let i = 0; i < ids.length; i++) {
  const exp = `p${i + 1}:`;
  if (!notes[i]?.startsWith(exp)) {
    noteBad++;
    console.log('note mismatch', i + 1, ids[i], notes[i]?.slice(0, 60));
  }
  const prefix = ids[i].split('-')[0];
  const expPrefix = String(i + 1).padStart(2, '0');
  if (prefix !== expPrefix) {
    console.log('id prefix mismatch', i + 1, ids[i]);
  }
}

const orphanFiles = files.filter((f) => !ids.includes(f));
const orphanIds = ids.filter((id) => !files.includes(id));

const rulesMap = new Map();
ids.forEach((id, index) => {
  const m = registry.indexOf(`id: '${id}'`);
  const slice = registry.slice(m, m + 500);
  const rt = slice.match(/rulesToc: '([^']+)'/);
  if (rt && !rulesMap.has(rt[1])) rulesMap.set(rt[1], { index, id });
});

console.log('--- audit ---');
console.log('slides', ids.length, 'files', files.length);
console.log('duplicate numeric prefix', dups.length ? dups : 'none');
console.log('note mismatches', noteBad);
console.log('orphan files', orphanFiles.length);
console.log('orphan registry', orphanIds.length);
console.log('rulesToc keys', rulesMap.size);

const cardIds = [
  '1', '1-1', '1-2', '1-3', '2', '2-1', '2-2', '3', '3-1', '3-2', '3-3', '3-4',
  '4', '4-1', '4-2', '4-3', '4-4', '4-5', '4-6', '5', '5-1', '5-2', '5-3', '5-4', '5-5',
  '6', '6-1', '7', '7-1', '7-2', '7-3',
];
for (const cid of cardIds) {
  if (!rulesMap.has(cid)) console.log('missing rulesToc jump:', cid);
}
