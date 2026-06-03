/**
 * 投影順に合わせて seminar スライドを 01〜NN にリネーム（番号の重複なし）。
 * 実行: node scripts/renumber-seminar-files.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const registryPath = path.join(root, 'src/config/seminarSlides.ts');
const seminarDir = path.join(root, 'src/components/slides/seminar');
const tmpDir = path.join(seminarDir, '__renumber_tmp__');

function suffixFromId(id) {
  const m = id.match(/^[0-9]+[a-z]*-(.+)$/);
  if (!m) throw new Error(`cannot parse slide id suffix: ${id}`);
  return m[1];
}

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

function parseRegistryOrder() {
  const registry = fs.readFileSync(registryPath, 'utf8');
  const ids = [...registry.matchAll(/id: '([^']+)'/g)].map((m) => m[1]);
  return ids;
}

function buildRenames(ids) {
  const renames = [];
  const used = new Set();
  for (let i = 0; i < ids.length; i++) {
    const oldId = ids[i];
    const page = i + 1;
    const newId = `${String(page).padStart(2, '0')}-${suffixFromId(oldId)}`;
    if (used.has(newId)) throw new Error(`duplicate new id: ${newId}`);
    used.add(newId);
    if (oldId !== newId) {
      renames.push({ oldId, newId, page });
    }
  }
  return renames;
}

function renameFiles(renames) {
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  for (const { oldId, newId } of renames) {
    const src = path.join(seminarDir, `${oldId}.tsx`);
    if (!fs.existsSync(src)) throw new Error(`missing file: ${src}`);
    fs.renameSync(src, path.join(tmpDir, `${newId}.tsx`));
  }

  for (const { newId } of renames) {
    fs.renameSync(path.join(tmpDir, `${newId}.tsx`), path.join(seminarDir, `${newId}.tsx`));
  }

  if (fs.existsSync(tmpDir) && fs.readdirSync(tmpDir).length === 0) {
    fs.rmdirSync(tmpDir);
  }
}

function updateComponentInFile(filePath, oldName, newName) {
  if (oldName === newName) return;
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(
    new RegExp(`export default function ${oldName}\\b`, 'g'),
    `export default function ${newName}`
  );
  fs.writeFileSync(filePath, content);
}

function updateSeminarSlidesRegistry(oldIds, newIds) {
  let content = fs.readFileSync(registryPath, 'utf8');

  for (let i = 0; i < oldIds.length; i++) {
    const oldId = oldIds[i];
    const newId = newIds[i];
    const oldComp = idToComponentName(oldId);
    const newComp = idToComponentName(newId);

    content = content.replaceAll(
      `from '@/components/slides/seminar/${oldId}'`,
      `from '@/components/slides/seminar/${newId}'`
    );
    content = content.replaceAll(`import ${oldComp} `, `import ${newComp} `);
    content = content.replaceAll(`id: '${oldId}'`, `id: '${newId}'`);
    content = content.replaceAll(`Component: ${oldComp},`, `Component: ${newComp},`);
  }

  content = content.replace(
    /各エントリの `id` はファイル名と揃える（[^）]+）/,
    `各エントリの \`id\` はファイル名と揃える（\`01-title\` 〜 \`${String(newIds.length).padStart(2, '0')}-...\`、番号重複なし）`
  );
  content = content.replace(
    /ファイル名・id の先頭2桁が投影順[^\n]+/,
    `ファイル名・\`id\` の先頭2桁が投影順（01〜${String(newIds.length).padStart(2, '0')}）と一致（\`npm run renumber:seminar-files\` で再採番）`
  );

  fs.writeFileSync(registryPath, content);
}

function replaceReferences(renames) {
  const map = Object.fromEntries(renames.map((r) => [r.oldId, r.newId]));
  const walk = (dir) => {
    for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, name.name);
      if (name.isDirectory()) {
        if (name.name === 'node_modules' || name.name === '.git' || name.name === '__renumber_tmp__')
          continue;
        walk(p);
      } else if (/\.(tsx?|md|mjs|json)$/.test(name.name)) {
        let text = fs.readFileSync(p, 'utf8');
        let changed = false;
        for (const [oldId, newId] of Object.entries(map)) {
          const oldComp = idToComponentName(oldId);
          const newComp = idToComponentName(newId);
          if (text.includes(oldId)) {
            text = text.split(oldId).join(newId);
            changed = true;
          }
          if (oldComp !== newComp && text.includes(oldComp)) {
            text = text.split(oldComp).join(newComp);
            changed = true;
          }
        }
        if (changed) fs.writeFileSync(p, text);
      }
    }
  };
  walk(path.join(root, 'src'));
  walk(path.join(root, 'scripts'));
}

// ── main ─────────────────────────────────────────────────────────────────────
const ids = parseRegistryOrder();
const renames = buildRenames(ids);
const newIds = ids.map((oldId, i) => `${String(i + 1).padStart(2, '0')}-${suffixFromId(oldId)}`);

console.log(`Renaming ${renames.length} / ${ids.length} files...`);
renames.forEach((r) => console.log(`  ${r.oldId} -> ${r.newId}`));

renameFiles(renames);

for (let i = 0; i < ids.length; i++) {
  const oldId = ids[i];
  const newId = newIds[i];
  const oldComp = idToComponentName(oldId);
  const newComp = idToComponentName(newId);
  const filePath = path.join(seminarDir, `${newId}.tsx`);
  updateComponentInFile(filePath, oldComp, newComp);
}

updateSeminarSlidesRegistry(ids, newIds);

// 参照置換（regenerate 後もコメント内の旧ファイル名など）
replaceReferences(renames);

// note / ヘッダ p 番号を再同期
import { spawnSync } from 'child_process';
spawnSync('node', ['scripts/sync-slide-page-numbers.mjs'], { cwd: root, stdio: 'inherit' });
spawnSync('node', ['scripts/sync-slide-component-names.mjs'], { cwd: root, stdio: 'inherit' });

console.log('Done. Total slides:', newIds.length);
