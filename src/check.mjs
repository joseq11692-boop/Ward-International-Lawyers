// Verifica el sitio generado: enlaces internos, imágenes, títulos, descripciones, H1 y JSON-LD.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../public/', import.meta.url));
const files = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); } })(ROOT);

const errors = [];
const titles = new Map();
const resolves = (href) => {
  const path = decodeURIComponent(href.split('#')[0].split('?')[0]);
  const f = join(ROOT, path);
  return existsSync(f) && (statSync(f).isFile() || existsSync(join(f, 'index.html')));
};
for (const file of files) {
  const rel = '/' + relative(ROOT, file);
  const html = readFileSync(file, 'utf8');
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (!title) errors.push(`${rel}: sin <title>`);
  else if (titles.has(title)) errors.push(`${rel}: título duplicado con ${titles.get(title)}`);
  else titles.set(title, rel);
  if (!desc) errors.push(`${rel}: sin meta description`);
  else if (desc.length > 170) errors.push(`${rel}: description larga (${desc.length})`);
  if (!rel.endsWith('404.html') && h1 !== 1) errors.push(`${rel}: ${h1} H1`);
  for (const m of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) if (!resolves(m[1])) errors.push(`${rel}: enlace roto ${m[1]}`);
  for (const m of html.matchAll(/srcset="([^"]*)"/g)) for (const part of m[1].split(',')) { const u = part.trim().split(' ')[0]; if (u.startsWith('/') && !resolves(u)) errors.push(`${rel}: imagen rota ${u}`); }
  for (const m of html.matchAll(/<img [^>]*>/g)) if (!/ alt="/.test(m[0])) errors.push(`${rel}: <img> sin alt`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { try { JSON.parse(m[1]); } catch { errors.push(`${rel}: JSON-LD inválido`); } }
  for (const m of html.matchAll(/hreflang="[a-z-]+" href="https:\/\/wardintlawyers\.com(\/[^"]*)"/g)) if (!resolves(m[1])) errors.push(`${rel}: hreflang roto ${m[1]}`);
}
console.log(`${files.length} páginas revisadas`);
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('✓ Sin errores');
