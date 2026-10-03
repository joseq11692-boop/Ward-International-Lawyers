// Servidor local para revisar el sitio: `npm run serve` → http://localhost:8080
import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../public/', import.meta.url));
const PORT = Number(process.env.PORT) || 8080;
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.webmanifest': 'application/manifest+json', '.json': 'application/json' };

// Aplica las cabeceras globales de public/_headers para probar localmente igual que en producción.
const headers = {};
try {
  const lines = readFileSync(join(ROOT, '_headers'), 'utf8').split('\n');
  for (let i = lines.indexOf('/*') + 1; i < lines.length && lines[i].startsWith('  '); i++) {
    const [k, ...v] = lines[i].trim().split(':');
    if (k !== 'Strict-Transport-Security') headers[k] = v.join(':').trim().replace('; upgrade-insecure-requests', '');
  }
} catch {}

createServer((req, res) => {
  let path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname));
  let file = join(ROOT, path);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!file.startsWith(ROOT) || !existsSync(file)) {
    res.writeHead(404, { ...headers, 'Content-Type': types['.html'] });
    return res.end(readFileSync(join(ROOT, '404.html')));
  }
  res.writeHead(200, { ...headers, 'Content-Type': types[extname(file)] || 'application/octet-stream' });
  res.end(readFileSync(file));
}).listen(PORT, () => console.log(`http://localhost:${PORT}`));
