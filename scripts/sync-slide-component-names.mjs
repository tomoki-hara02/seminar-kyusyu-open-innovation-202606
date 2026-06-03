import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const seminarDir = path.join(root, 'src/components/slides/seminar');
const registryPath = path.join(root, 'src/config/seminarSlides.ts');

function idToComponentName(id) {
  const numMatch = id.match(/^([0-9]+)/);
  const suffixMatch = id.match(/^[0-9]+[a-z]*-(.+)$/);
  if (!numMatch || !suffixMatch) throw new Error(`invalid id: ${id}`);
  const pascal = suffixMatch[1]
    .split('-')
    .map((part) => (/^\d+$/.test(part) ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join('');
  return `Slide${numMatch[1]}${pascal}`;
}

let registry = fs.readFileSync(registryPath, 'utf8');
const orderedIds = [...registry.matchAll(/id: '([^']+)'/g)].map((m) => m[1]);

for (const id of orderedIds) {
  const expected = idToComponentName(id);
  const filePath = path.join(seminarDir, `${id}.tsx`);
  if (!fs.existsSync(filePath)) {
    console.warn('missing', filePath);
    continue;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  const m = content.match(/export default function (Slide\w+)/);
  if (m && m[1] !== expected) {
    content = content.replace(
      /export default function Slide\w+/,
      `export default function ${expected}`
    );
    fs.writeFileSync(filePath, content);
    console.log(`${id}: ${m[1]} -> ${expected}`);
  }
}

const importStart = registry.indexOf('import Slide');
const importEnd = registry.indexOf('/**', importStart);
const before = registry.slice(0, importStart);
const after = registry.slice(importEnd);

const imports = orderedIds
  .map((id) => `import ${idToComponentName(id)} from '@/components/slides/seminar/${id}';`)
  .join('\n');

registry = before + imports + '\n\n' + after;

let compIdx = 0;
registry = registry.replace(/Component: Slide\w+,/g, () => {
  const comp = idToComponentName(orderedIds[compIdx++]);
  return `Component: ${comp},`;
});

fs.writeFileSync(registryPath, registry);
console.log('Done:', orderedIds.length, 'slides');
