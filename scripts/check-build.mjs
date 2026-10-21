import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(process.argv[2] || 'dist');
const base = `/${(process.argv[3] || process.env.BASE_PATH || '/personal_website/').replace(/^\/+|\/+$/g, '')}`.replace(/\/$/, '');
const files = [];
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const name = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(name);
    else files.push(name);
  }
}
await walk(root);
const errors = [];
let checkedLinks = 0;
const htmlFiles = files.filter(name => name.endsWith('.html'));
const documents = new Map(await Promise.all(htmlFiles.map(async name => [name, await readFile(name, 'utf8')])));

for (const [filename, html] of documents) {
  const relative = path.relative(root, filename).split(path.sep).join('/');
  const pagePath = `${base}/${relative.replace(/index\.html$/, '')}`;
  const h1Count = [...html.matchAll(/<h1(?:\s|>)/g)].length;
  if (h1Count !== 1) errors.push(`${relative}: expected one h1, found ${h1Count}`);
  if (!html.includes('id="main"')) errors.push(`${relative}: missing main target`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  if (new Set(ids).size !== ids.length) errors.push(`${relative}: duplicate IDs`);
  if (/Your first note|private\/schooling|C:\\Users|PROFILE_BRIEF|PROJECT_BRIEFS/.test(html)) errors.push(`${relative}: private/draft source material leaked`);
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const value = match[1].replaceAll('&amp;', '&');
    if (/^(https?:|mailto:|tel:|data:)/.test(value)) continue;
    const url = new URL(value, `https://build.test${pagePath}`);
    if (base && url.pathname !== base && !url.pathname.startsWith(`${base}/`)) {
      errors.push(`${relative}: link escapes base path: ${value}`);
      continue;
    }
    let target = path.join(root, decodeURIComponent(url.pathname.slice(base.length)));
    if (target.endsWith(path.sep) || !path.extname(target)) target = path.join(target, 'index.html');
    checkedLinks++;
    try { await stat(target); }
    catch { errors.push(`${relative}: missing link/asset: ${value}`); continue; }
    if (url.hash && target.endsWith('.html')) {
      const targetHtml = documents.get(target) || await readFile(target, 'utf8');
      if (!targetHtml.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`)) errors.push(`${relative}: missing anchor: ${value}`);
    }
  }
}
const forbidden = files.filter(name => /\.(pdf|docx|py|ps1|md)$/i.test(name) || /[/\\](recovery|node_modules)[/\\]/.test(name));
if (forbidden.length) errors.push(`Unintended source files in output: ${forbidden.join(', ')}`);
if (files.some(name => /notes[/\\]first-note/.test(name))) errors.push('Draft note has a public route');
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`PASS: ${htmlFiles.length} pages, ${checkedLinks} internal links/assets, valid anchors, draft excluded, no research/PDF/source archives in output. Base: ${base || '/'}`);
