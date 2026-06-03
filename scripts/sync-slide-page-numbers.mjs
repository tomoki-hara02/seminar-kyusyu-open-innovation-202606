import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = path.join(root, 'src/config/seminarSlides.ts');
const seminarDir = path.join(root, 'src/components/slides/seminar');

const registry = fs.readFileSync(registryPath, 'utf8');
const ids = [...registry.matchAll(/id: '([^']+)'/g)].map((m) => m[1]);
const pageById = Object.fromEntries(ids.map((id, i) => [id, i + 1]));

let noteIdx = 0;
const updatedRegistry = registry.replace(/note: '([^']*)'/g, (_, content) => {
  noteIdx += 1;
  const desc = content.replace(/^p\d+[a-z]*:\s*/, '');
  return `note: 'p${noteIdx}:${desc}'`;
});
if (noteIdx !== ids.length) {
  console.warn(`note count ${noteIdx} !== slide count ${ids.length}`);
}
fs.writeFileSync(registryPath, updatedRegistry);

for (const file of fs.readdirSync(seminarDir)) {
  if (!file.endsWith('.tsx')) continue;
  const id = file.replace(/\.tsx$/, '');
  const p = pageById[id];
  if (!p) {
    console.warn('no registry entry for', file);
    continue;
  }
  const filePath = path.join(seminarDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const replaced = content.replace(/^(\s*\* )p[\da-z]*[^:]*:/m, `$1p${p}:`);
  if (replaced === content) {
    console.warn('no header p-line updated:', file);
  } else {
    fs.writeFileSync(filePath, replaced);
  }
}

console.log('Updated', ids.length, 'slides (p1–p' + ids.length + ')');
