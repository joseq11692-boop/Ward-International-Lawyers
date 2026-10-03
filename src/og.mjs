// Genera las imágenes para compartir en redes (1200×630) de cada página e idioma.
// Requiere ImageMagick. Uso: `npm run og` (solo cuando cambian títulos; el resultado se versiona).
import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { guideKeys, people, practiceKeys, practiceNames, routes, site } from './config.mjs';
import de from './content/de.mjs';
import en from './content/en.mjs';
import es from './content/es.mjs';

const SRC = fileURLToPath(new URL('.', import.meta.url));
const OG = join(SRC, 'og');
const OUT = join(SRC, 'assets/og');
const content = { es, en, de };
const serif = join(OG, 'fonts/CormorantGaramond-SemiBold.ttf');
const sans = join(OG, 'fonts/Inter-SemiBold.ttf');

function card(key, lang) {
  const c = content[lang];
  const p = c.pages[key];
  if (people[key]) return { eyebrow: c.ui.partner, title: people[key].name, sub: p.role.split('·')[1]?.trim() || '' };
  if (practiceKeys.includes(key)) return { eyebrow: c.ui.nav.practice, title: p.h1, sub: '' };
  if (guideKeys.includes(key)) return { eyebrow: `${c.ui.nav.guides} · ${practiceNames[lang][p.practice]}`, title: p.h1, sub: '' };
  return { eyebrow: p.eyebrow || site.name, title: p.h1, sub: '' };
}

function render({ eyebrow, title, sub }, file) {
  const size = title.length < 34 ? 78 : title.length < 60 ? 66 : 56;
  execFileSync('convert', [
    join(OG, 'background.jpg'), '-resize', '1200x630^', '-gravity', 'center', '-extent', '1200x630', '-blur', '0x1.2',
    '(', '-size', '630x1200', 'gradient:rgba(10,20,34,0.97)-rgba(10,20,34,0.62)', '-rotate', '-90', ')', '-composite',
    '-gravity', 'northwest',
    '-fill', '#C9A23A', '-draw', 'rectangle 80,116 128,117',
    '-font', sans, '-pointsize', '20', '-kerning', '3', '-fill', '#E3C46E', '-annotate', '+148+104', eyebrow.toUpperCase(),
    '(', '-size', '900x300', '-background', 'none', '-font', serif, '-pointsize', String(size), '-interline-spacing', '-6', '-fill', '#FFFFFF', '-kerning', '0', `caption:${title}`, ')',
    '-geometry', '+78+150', '-composite',
    ...(sub ? ['-font', sans, '-pointsize', '26', '-kerning', '0', '-fill', '#C9D1DC', '-annotate', '+80+440', sub] : []),
    '-fill', 'rgba(255,255,255,0.18)', '-draw', 'rectangle 80,510 1120,511',
    '(', join(OG, 'logo.png'), '-resize', '64x64', ')', '-geometry', '+80+532', '-composite',
    '-font', sans, '-pointsize', '22', '-kerning', '4', '-fill', '#FFFFFF', '-annotate', '+162+540', 'WARD INTERNATIONAL LAWYERS',
    '-pointsize', '18', '-kerning', '1', '-fill', '#AEB8C6', '-annotate', '+162+572', 'wardintlawyers.com  ·  Español · English · Deutsch',
    '-strip', '-quality', '74', '-sampling-factor', '4:2:0', file,
  ]);
}

mkdirSync(OUT, { recursive: true });
let n = 0;
for (const lang of site.langs) {
  for (const key of Object.keys(routes)) {
    render(card(key, lang), join(OUT, `${lang}-${key}.jpg`));
    n++;
  }
}
console.log(`✓ ${n} imágenes en src/assets/og/`);
