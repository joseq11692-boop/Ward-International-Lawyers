// Genera el sitio estático en /public. Uso: `npm run build`.
import { createHash } from 'node:crypto';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { guideKeys, people, practiceKeys, practiceNames, routes, site } from './config.mjs';
import de from './content/de.mjs';
import en from './content/en.mjs';
import es from './content/es.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src');
const OUT = join(ROOT, 'public');
const content = { es, en, de };
const BUILD_DATE = site.updated;
// Mensaje de WhatsApp de la página actual (incluye el área para calificar la consulta).
let WA_MSG = '';
function setWa(lang, area) {
  const ui = content[lang].ui;
  const name = practiceNames[lang][area] || '';
  WA_MSG = area ? ui.waArea.replace('{area}', lang === 'de' ? name : name.toLowerCase()) : ui.waMessage;
}


// ---------- utilidades ----------
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const url = (key, lang) => '/' + routes[key][lang];
const abs = (key, lang) => site.url + url(key, lang);
const waLink = (msg) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
const json = (o) => JSON.stringify(o).replace(/</g, '\\u003c');
const slug = (t) => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ß/g, 'ss').replace(/<[^>]+>/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const images = {
  hero: { base: 'panama-city', widths: [768, 1280, 1600], w: 1600, h: 960 },
  justice: { base: 'justice', widths: [640, 1280], w: 1280, h: 810 },
  earth: { base: 'earth', widths: [800, 1600], w: 1600, h: 1065 },
  'john-ward': { base: 'john-ward', widths: [400, 800], w: 800, h: 1000 },
  'jose-quiel': { base: 'jose-quiel', widths: [400, 800], w: 800, h: 1000 },
  'karina-serrano': { base: 'karina-serrano', widths: [360], w: 360, h: 300 },
};
const srcset = (k) => images[k].widths.map((w) => `/assets/img/${images[k].base}-${w}.webp ${w}w`).join(', ');
const imgSrc = (k, w) => `/assets/img/${images[k].base}-${w || images[k].widths.at(-1)}.webp`;
function img(k, alt, { sizes = '100vw', eager = false, cls = '' } = {}) {
  const i = images[k];
  return `<img src="${imgSrc(k)}" srcset="${srcset(k)}" sizes="${sizes}" width="${i.w}" height="${i.h}" alt="${esc(alt)}"${cls ? ` class="${cls}"` : ''} ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}

const icon = {
  wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.43-9.43a9.37 9.37 0 0 1 9.42 9.44c0 5.2-4.23 9.43-9.43 9.43M20.08 3.9A11.3 11.3 0 0 0 12.05.6C5.8.6.7 5.7.7 11.95c0 2 .52 3.95 1.52 5.67L.6 23.4l5.92-1.55a11.3 11.3 0 0 0 5.42 1.38h.01c6.25 0 11.34-5.09 11.35-11.35 0-3.03-1.18-5.88-3.32-8.02"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.4" r="1" fill="currentColor" stroke="none"/></svg>',
};

// ---------- datos estructurados ----------
function firmSchema(lang) {
  const c = content[lang];
  return {
    '@type': 'LegalService',
    '@id': site.url + '/#firm',
    name: site.name,
    url: abs('home', lang),
    logo: site.url + '/assets/img/icon-512.png',
    image: site.url + '/assets/img/og-image.jpg',
    description: c.pages.home.description,
    telephone: site.phone.e164,
    email: site.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    areaServed: [{ '@type': 'Country', name: 'Panama' }, 'Worldwide'],
    knowsLanguage: ['es', 'en', 'de'],
    founder: [{ '@id': site.url + '/#john' }, { '@id': site.url + '/#jose' }],
    sameAs: Object.values(site.social),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: c.ui.nav.practice,
      itemListElement: practiceKeys.map((k) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: practiceNames[lang][k], url: abs(k, lang) },
      })),
    },
  };
}

function personSchema(key, lang) {
  const p = people[key];
  const c = content[lang].pages[key];
  const alumni = key === 'jose'
    ? ['Universidad Católica Santa María la Antigua', 'University of Louisville', 'Universitat Politècnica de Catalunya', 'Il·lustre Col·legi de l’Advocacia de Barcelona', 'Universidad Interamericana de Panamá']
    : [];
  return {
    '@type': 'Person',
    '@id': site.url + '/#' + key,
    name: p.name,
    jobTitle: c.role.split('·')[0].trim(),
    description: c.description,
    url: abs(key, lang),
    image: site.url + imgSrc(p.img, 800),
    email: p.email,
    telephone: p.phone.e164,
    worksFor: { '@id': site.url + '/#firm' },
    knowsLanguage: p.langs,
    memberOf: { '@type': 'Organization', name: 'Colegio Nacional de Abogados de Panamá' },
    ...(alumni.length ? { alumniOf: alumni.map((name) => ({ '@type': 'EducationalOrganization', name })) } : {}),
    sameAs: [p.linkedin],
  };
}

function breadcrumbSchema(trail) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: site.url + t.href })),
  };
}

// ---------- piezas de layout ----------
function header(lang, key) {
  const c = content[lang];
  const ui = c.ui;
  const navItem = (k, label) => `<li><a href="${url(k, lang)}"${k === key ? ' aria-current="page"' : ''}>${esc(label)}</a></li>`;
  const langLinks = site.langs.map((l) => `<a href="${url(key || 'home', l)}" hreflang="${l}" lang="${l}"${l === lang ? ' aria-current="true"' : ''}>${l.toUpperCase()}</a>`).join('');
  return `<a class="skip" href="#main">${esc(ui.skip)}</a>
<div class="topbar"><div class="wrap">
  <div class="topbar-info">
    <a href="tel:${site.phone.e164}" data-loc="topbar">${esc(site.phone.display)}</a>
    <a href="mailto:${site.email}" data-loc="topbar">${site.email}</a>
    <span>Costa del Este · Financial Park</span>
  </div>
  <nav class="lang-switch" aria-label="Language">${langLinks}</nav>
</div></div>
<header class="site-header"><div class="wrap">
  <a class="brand" href="${url('home', lang)}">
    <img src="/assets/img/logo-96.webp" width="48" height="48" alt="">
    <span class="brand-name">WARD<small>INTERNATIONAL LAWYERS</small></span>
  </a>
  <button class="nav-toggle" aria-controls="nav" aria-expanded="false" aria-label="${esc(ui.menu)}"><span></span><span></span><span></span></button>
  <nav class="nav" id="nav" aria-label="${esc(ui.menu)}">
    <ul>
      <li class="has-sub">
        <button class="nav-link" aria-expanded="false">${esc(ui.nav.practice)}</button>
        <ul class="sub">
          ${practiceKeys.map((k) => navItem(k, practiceNames[lang][k])).join('')}
          ${navItem('practice', ui.allPractice)}
        </ul>
      </li>
      ${navItem('cocounsel', ui.nav.cocounsel)}
      ${navItem('team', ui.nav.team)}
      ${navItem('guides', ui.nav.guides)}
      ${navItem('contact', ui.nav.contact)}
    </ul>
    <a class="btn btn-gold" href="${url('contact', lang)}#consulta">${esc(ui.ctaConsult)}</a>
    <div class="nav-mobile-extra">
      <a href="tel:${site.phone.e164}" data-loc="menu">${esc(site.phone.display)}</a>
      <div class="lang-switch">${langLinks}</div>
    </div>
  </nav>
</div></header>`;
}

function footer(lang) {
  const c = content[lang];
  const ui = c.ui;
  const year = BUILD_DATE.slice(0, 4);
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div>
        <a class="brand" href="${url('home', lang)}"><img src="/assets/img/logo-96.webp" width="48" height="48" alt="" loading="lazy"><span class="brand-name">WARD<small>INTERNATIONAL LAWYERS</small></span></a>
        <p style="margin-top:20px">${esc(ui.footerAbout)}</p>
        <div class="social">
          <a href="${site.social.linkedin}" rel="noopener" target="_blank" aria-label="LinkedIn">${icon.linkedin}</a>
          <a href="${site.social.facebook}" rel="noopener" target="_blank" aria-label="Facebook">${icon.facebook}</a>
          <a href="${site.social.instagram}" rel="noopener" target="_blank" aria-label="Instagram">${icon.instagram}</a>
        </div>
      </div>
      <div>
        <h2>${esc(ui.footerPractice)}</h2>
        <ul>${practiceKeys.map((k) => `<li><a href="${url(k, lang)}">${esc(practiceNames[lang][k])}</a></li>`).join('')}</ul>
      </div>
      <div>
        <h2>${esc(ui.footerFirm)}</h2>
        <ul>
          <li><a href="${url('team', lang)}">${esc(ui.nav.team)}</a></li>
          <li><a href="${url('john', lang)}">John Ward</a></li>
          <li><a href="${url('jose', lang)}">Jose Quiel</a></li>
          <li><a href="${url('guides', lang)}">${esc(ui.nav.guides)}</a></li>
          <li><a href="${url('contact', lang)}">${esc(ui.nav.contact)}</a></li>
          <li><a href="${url('privacy', lang)}">${esc(ui.privacy)}</a></li>
        </ul>
      </div>
      <div>
        <h2>${esc(ui.footerContact)}</h2>
        <ul>
          <li><a href="${waLink(WA_MSG)}" rel="noopener" target="_blank" data-loc="footer">WhatsApp ${esc(site.phone.display)}</a></li>
          <li><a href="tel:${site.phone.e164}" data-loc="footer">${esc(site.phone.display)}</a> · <a href="tel:${site.phone2.e164}" data-loc="footer">${esc(site.phone2.display)}</a></li>
          <li><a href="mailto:${site.email}" data-loc="footer">${site.email}</a></li>
          <li>${esc(site.address.street)}, ${esc(site.address.locality)}</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>${esc(ui.disclaimer)}</p>
      <p>© ${year} ${site.name}. ${esc(ui.rights)}</p>
    </div>
  </div>
</footer>
<nav class="mobile-bar" aria-label="${esc(ui.footerContact)}">
  <a href="tel:${site.phone.e164}" data-loc="mobile-bar">${icon.phone}<span>${esc(ui.ctaCall)}</span></a>
  <a class="wa" href="${waLink(WA_MSG)}" rel="noopener" target="_blank" data-loc="mobile-bar">${icon.wa}<span>${esc(ui.whatsappShort)}</span></a>
  <a class="consult" href="${url('contact', lang)}#consulta">${icon.cal}<span>${esc(ui.consultShort)}</span></a>
</nav>
<a class="wa-float" href="${waLink(WA_MSG)}" rel="noopener" target="_blank" aria-label="${esc(ui.ctaWhatsapp)}" data-loc="float">${icon.wa}</a>
<div class="notice" id="lang-notice" role="dialog" aria-label="Language" aria-live="polite"><p></p><div class="notice-actions"><a class="btn btn-gold" data-go href="#"></a><button class="btn btn-line" data-dismiss type="button"></button></div></div>
${site.gaId ? `<div class="notice" id="cookie-notice" role="dialog" aria-label="Cookies" aria-live="polite"><p>${esc(ui.cookies.text)} <a href="${url('privacy', lang)}">${esc(ui.privacy)}</a></p><div class="notice-actions"><button class="btn btn-gold" data-consent="yes" type="button">${esc(ui.cookies.accept)}</button><button class="btn btn-line" data-consent="no" type="button">${esc(ui.cookies.reject)}</button></div></div>` : ''}`;
}

function crumbs(lang, trail) {
  return `<ol class="crumbs">${trail.map((t, i) => (i === trail.length - 1 ? `<li aria-current="page">${esc(t.name)}</li>` : `<li><a href="${t.href}">${esc(t.name)}</a></li>`)).join('')}</ol>`;
}

function ctaButtons(lang) {
  const ui = content[lang].ui;
  return `<div class="btn-row">
    <a class="btn btn-gold" href="${url('contact', lang)}#consulta">${icon.cal}${esc(ui.ctaConsult)}</a>
    <a class="btn btn-wa" href="${waLink(WA_MSG)}" rel="noopener" target="_blank" data-loc="hero">${icon.wa}${esc(ui.ctaWhatsapp)}</a>
  </div>`;
}

function finalCta(lang) {
  const ui = content[lang].ui;
  const h = content[lang].pages.home;
  return `<section class="section cta"><div class="wrap">
    <h2>${esc(h.finalTitle)}</h2>
    <p>${esc(h.finalText)}</p>
    <div class="btn-row">
      <a class="btn btn-wa" href="${waLink(WA_MSG)}" rel="noopener" target="_blank" data-loc="final-cta">${icon.wa}${esc(ui.ctaWhatsapp)}</a>
      <a class="btn btn-ghost" href="tel:${site.phone.e164}" data-loc="final-cta">${icon.phone}${esc(site.phone.display)}</a>
    </div>
    <small>${esc(ui.form.confidential)} · ${esc(ui.trust[1])}</small>
  </div></section>`;
}

function personCard(key, lang) {
  const p = people[key];
  const c = content[lang];
  const pg = c.pages[key];
  const langs = p.langs.map((l) => c.ui.langNames[l]).join(' · ');
  return `<article class="person">
    ${img(p.img, p.name, { sizes: '(max-width:560px) 100vw, 200px' })}
    <div class="person-body">
      <div class="person-role">${esc(c.ui.partner)}</div>
      <h3><a href="${url(key, lang)}" style="text-decoration:none">${esc(p.name)}</a></h3>
      <p>${esc(pg.role.split('·')[1]?.trim() || '')}</p>
      <p class="langs"><strong>${esc(c.ui.languages)}:</strong> ${esc(langs)}</p>
      <a class="link-arrow" href="${url(key, lang)}">${esc(c.ui.viewProfile)}</a>
    </div>
  </article>`;
}

function practiceCard(k, lang) {
  const c = content[lang];
  return `<a class="card" href="${url(k, lang)}"><h3>${esc(practiceNames[lang][k])}</h3><p>${esc(c.pages[k].short)}</p><span class="more">${esc(c.ui.learnMore)}</span></a>`;
}

function guideCard(k, lang) {
  const c = content[lang];
  const g = c.pages[k];
  return `<a class="card" href="${url(k, lang)}"><span class="eyebrow" style="margin-bottom:12px">${esc(practiceNames[lang][g.practice])}</span><h3>${esc(g.h1)}</h3><p>${esc(g.lead)}</p><span class="more">${esc(c.ui.readGuide)} · ${g.minutes} ${esc(c.ui.minRead)}</span></a>`;
}

function stepsSection(lang, dark = true) {
  const ui = content[lang].ui;
  return `<section class="section ${dark ? 'dark' : 'section-cream'}"><div class="wrap">
    <div class="section-head"><h2>${esc(ui.howWeWork)}</h2></div>
    <ol class="steps">${ui.steps.map((s) => `<li><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p></li>`).join('')}</ol>
  </div></section>`;
}

// ---------- documento ----------
let CSS = '';
let JS_PATH = '';

// Google muestra el nombre del sitio aparte: si el título es largo, se omite la marca para no truncar las palabras clave.
const SUFFIX = ' | ' + site.name;
const fitTitle = (t) => (t.length > 62 && t.endsWith(SUFFIX) ? t.slice(0, -SUFFIX.length) : t);

function page({ lang, key, title, description, body, schema = [], ogType = 'website', preloadHero = false, noindex = false, path }) {
  const c = content[lang];
  title = fitTitle(title);
  const ogImage = key && existsSync(join(SRC, `assets/og/${lang}-${key}.jpg`)) ? `${site.url}/assets/og/${lang}-${key}.jpg` : `${site.url}/assets/img/og-image.jpg`;
  const canonical = path ? site.url + path : abs(key, lang);
  const alternates = key
    ? site.langs.map((l) => `<link rel="alternate" hreflang="${l}" href="${abs(key, l)}">`).join('\n') + `\n<link rel="alternate" hreflang="x-default" href="${abs(key, site.defaultLang)}">`
    : '';
  const cfg = {
    lang,
    wa: site.whatsapp,
    waMessage: WA_MSG,
    gaId: site.gaId,
    formEndpoint: site.formEndpoint,
    email: site.email,
    alternates: key ? Object.fromEntries(site.langs.map((l) => [l, url(key, l)])) : null,
    langSuggest: Object.fromEntries(site.langs.map((l) => [l, content[l].ui.langSuggest])),
    labels: { ...c.ui.form },
  };
  const graph = { '@context': 'https://schema.org', '@graph': [firmSchema(lang), ...schema] };
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<link rel="canonical" href="${canonical}">
${alternates}
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="${site.name}">
<meta property="og:locale" content="${c.locale}">
${site.langs.filter((l) => l !== lang).map((l) => `<meta property="og:locale:alternate" content="${content[l].locale}">`).join('\n')}
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:alt" content="${esc(title)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0F1F35">
<meta name="format-detection" content="telephone=no">
<link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/cormorant-garamond-latin.woff2" as="font" type="font/woff2" crossorigin>
${preloadHero ? `<link rel="preload" as="image" type="image/webp" imagesrcset="${srcset('hero')}" imagesizes="100vw" fetchpriority="high">` : ''}
<style>${CSS}</style>
<script type="application/ld+json">${json(graph)}</script>
</head>
<body>
${header(lang, key)}
<main id="main">
${body}
</main>
${footer(lang)}
<script id="cfg" type="application/json">${json(cfg)}</script>
<script src="${JS_PATH}" defer></script>
</body>
</html>
`;
}

// ---------- plantillas de página ----------
function renderHome(lang) {
  setWa(lang, null);
  const c = content[lang];
  const h = c.pages.home;
  const ui = c.ui;
  const others = practiceKeys.filter((k) => !['litigation', 'corporate'].includes(k));
  const body = `
<section class="hero">
  <div class="hero-media">${img('hero', '', { eager: true })}</div>
  <div class="wrap">
    <span class="eyebrow">${esc(h.eyebrow)}</span>
    <h1>${esc(h.h1)}</h1>
    <p class="lead">${esc(h.lead)}</p>
    ${ctaButtons(lang)}
    <ul class="trust">${ui.trust.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
  </div>
</section>

<section class="section section-cream"><div class="wrap">
  <div class="section-head"><span class="eyebrow">${esc(ui.nav.practice)}</span><h2>${esc(h.featuredTitle)}</h2><p class="lead">${esc(h.featuredLead)}</p></div>
  <div class="grid-2">
    ${h.featured.map((f) => `<article class="feature"><h3>${esc(f.title)}</h3><p>${esc(f.text)}</p><ul>${f.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul><a class="link-arrow" href="${url(f.key, lang)}">${esc(ui.learnMore)}</a></article>`).join('')}
  </div>
  <h3 style="margin:clamp(48px,6vw,72px) 0 24px">${esc(h.moreTitle)}</h3>
  <div class="grid-3">${others.map((k) => practiceCard(k, lang)).join('')}<a class="card" href="${url('practice', lang)}" style="background:var(--navy);border-color:var(--navy)"><h3 style="color:#fff">${esc(ui.allPractice)}</h3><p style="color:rgba(255,255,255,.75)">${esc(c.pages.practice.lead)}</p><span class="more" style="color:var(--gold-2)">${esc(ui.learnMore)}</span></a></div>
</div></section>

<section class="section dark"><div class="wrap">
  <div class="section-head"><span class="eyebrow">Ward International Lawyers</span><h2>${esc(h.whyTitle)}</h2><p class="lead">${esc(h.whyLead)}</p></div>
  <div class="grid-4">${h.why.map((w, i) => `<div class="why"><span class="num">0${i + 1}</span><h3>${esc(w.t)}</h3><p>${esc(w.d)}</p></div>`).join('')}</div>
</div></section>

<section class="section"><div class="wrap band">
  <div>
    <span class="eyebrow">${esc(c.pages.cocounsel.eyebrow)}</span>
    <h2>${esc(h.cocounselTitle)}</h2>
    <p class="lead">${esc(h.cocounselText)}</p>
    <div class="btn-row"><a class="btn btn-line" href="${url('cocounsel', lang)}">${esc(h.cocounselCta)}</a></div>
  </div>
  <div class="band-media">${img('earth', '', { sizes: '(max-width:860px) 100vw, 45vw' })}</div>
</div></section>

${lang !== 'de' ? `<section class="de-band" lang="de"><div class="wrap"><div><strong>${esc(h.germanTitle)}</strong><p>${esc(h.germanText)}</p></div><a class="btn btn-gold" href="${url('home', 'de')}" hreflang="de">${esc(h.germanCta)}</a></div></section>` : ''}

<section class="section"><div class="wrap">
  <div class="section-head"><span class="eyebrow">${esc(ui.nav.team)}</span><h2>${esc(h.teamTitle)}</h2><p class="lead">${esc(h.teamLead)}</p></div>
  <div class="grid-2">${personCard('john', lang)}${personCard('jose', lang)}</div>
</div></section>

${stepsSection(lang, false)}

<section class="section"><div class="wrap">
  <div class="section-head"><span class="eyebrow">${esc(ui.nav.guides)}</span><h2>${esc(h.guidesTitle)}</h2></div>
  <div class="grid-3">${guideKeys.slice(0, 3).map((k) => guideCard(k, lang)).join('')}</div>
  <p style="margin-top:32px"><a class="link-arrow" href="${url('guides', lang)}">${esc(c.pages.guides.h1)}</a></p>
</div></section>

${finalCta(lang)}`;
  return page({
    lang, key: 'home', title: h.title, description: h.description, body, preloadHero: true,
    schema: [
      { '@type': 'WebSite', '@id': site.url + '/#website', url: site.url + '/', name: site.name, inLanguage: site.langs, publisher: { '@id': site.url + '/#firm' } },
      personSchema('john', lang), personSchema('jose', lang),
    ],
  });
}

function pageHero(lang, trail, p, { cta = true, extra = '' } = {}) {
  return `<section class="page-hero"><div class="wrap">
    ${crumbs(lang, trail)}
    ${p.eyebrow ? `<span class="eyebrow">${esc(p.eyebrow)}</span>` : ''}
    <h1>${esc(p.h1)}</h1>
    ${p.lead ? `<p class="lead">${esc(p.lead)}</p>` : ''}
    ${extra}
    ${cta ? ctaButtons(lang) : ''}
  </div></section>`;
}

function renderPractice(lang) {
  setWa(lang, null);
  const c = content[lang];
  const p = c.pages.practice;
  const trail = [{ name: c.ui.home, href: url('home', lang) }, { name: p.eyebrow, href: url('practice', lang) }];
  const body = `${pageHero(lang, trail, p)}
<section class="section section-cream"><div class="wrap">
  <div class="grid-3">${practiceKeys.map((k) => practiceCard(k, lang)).join('')}</div>
</div></section>
${stepsSection(lang)}
${finalCta(lang)}`;
  return page({ lang, key: 'practice', title: p.title, description: p.description, body, schema: [breadcrumbSchema(trail)] });
}

function renderService(key, lang) {
  setWa(lang, key);
  const c = content[lang];
  const ui = c.ui;
  const p = c.pages[key];
  const trail = [
    { name: ui.home, href: url('home', lang) },
    { name: ui.nav.practice, href: url('practice', lang) },
    { name: practiceNames[lang][key], href: url(key, lang) },
  ];
  const lead = people[p.leads[0]];
  const aside = p.image
    ? `<div class="media">${img(p.image, '', { sizes: '(max-width:900px) 100vw, 40vw' })}</div>`
    : `<aside class="form" style="padding:28px">
        <div style="display:flex;gap:16px;align-items:center;margin-bottom:16px">
          <img src="${imgSrc(lead.img, 400)}" width="72" height="90" alt="${esc(lead.name)}" loading="lazy" style="width:72px;height:90px;object-fit:cover;border-radius:3px">
          <div><div class="person-role" style="margin:0">${esc(ui.leadBy)}</div><strong style="font:600 1.3rem/1.2 var(--serif)">${esc(lead.name)}</strong></div>
        </div>
        <a class="btn btn-wa" href="${waLink(WA_MSG)}" rel="noopener" target="_blank" data-loc="service-aside" style="width:100%;margin-bottom:10px">${icon.wa}${esc(ui.ctaWhatsapp)}</a>
        <a class="btn btn-line" href="tel:${site.phone.e164}" data-loc="service-aside" style="width:100%">${icon.phone}${esc(site.phone.display)}</a>
      </aside>`;
  const body = `${pageHero(lang, trail, p)}
<section class="section"><div class="wrap service-intro">
  <div>${p.intro.map((t) => `<p>${esc(t)}</p>`).join('')}</div>
  ${aside}
</div></section>

<section class="section section-cream"><div class="wrap">
  <div class="section-head"><span class="eyebrow">${esc(ui.whatWeDo)}</span><h2>${esc(practiceNames[lang][key])}</h2></div>
  <div class="grid-3">${p.offerings.map((o) => `<div class="offer"><h3>${esc(o.t)}</h3><p>${esc(o.d)}</p></div>`).join('')}</div>
</div></section>

${(p.sections || []).map((s) => `<section class="section"><div class="wrap narrow"><h2>${esc(s.h)}</h2>${s.p.map((t) => `<p class="lead">${esc(t)}</p>`).join('')}</div></section>`).join('')}

${stepsSection(lang)}

<section class="section"><div class="wrap">
  <div class="section-head"><span class="eyebrow">${esc(ui.nav.team)}</span><h2>${esc(ui.leadBy)}</h2></div>
  <div class="grid-2">${p.leads.map((k) => personCard(k, lang)).join('')}</div>
</div></section>

<section class="section section-cream"><div class="wrap narrow">
  <h2>${esc(ui.faqTitle)}</h2>
  <div class="faq">${p.faqs.map((f, i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}</div>
</div></section>

${guideKeys.some((g) => c.pages[g].practice === key) ? `<section class="section"><div class="wrap">
  <div class="section-head"><span class="eyebrow">${esc(ui.nav.guides)}</span><h2>${esc(ui.relatedGuides)}</h2></div>
  <div class="grid-3">${guideKeys.filter((g) => c.pages[g].practice === key).map((g) => guideCard(g, lang)).join('')}</div>
</div></section>` : ''}

<section class="section"><div class="wrap">
  <div class="section-head"><h2>${esc(ui.related)}</h2></div>
  <div class="grid-3">${p.related.map((k) => practiceCard(k, lang)).join('')}</div>
</div></section>

${finalCta(lang)}`;
  return page({
    lang, key, title: p.title, description: p.description, body,
    schema: [
      breadcrumbSchema(trail),
      {
        '@type': 'Service',
        name: practiceNames[lang][key],
        serviceType: practiceNames[lang][key],
        description: p.description,
        url: abs(key, lang),
        provider: { '@id': site.url + '/#firm' },
        areaServed: { '@type': 'Country', name: 'Panama' },
        availableLanguage: ['es', 'en', 'de'],
      },
      {
        '@type': 'FAQPage',
        mainEntity: p.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  });
}

function renderTeam(lang) {
  setWa(lang, null);
  const c = content[lang];
  const p = c.pages.team;
  const k = people.karina;
  const trail = [{ name: c.ui.home, href: url('home', lang) }, { name: p.eyebrow, href: url('team', lang) }];
  const body = `${pageHero(lang, trail, p)}
<section class="section section-cream"><div class="wrap">
  <div class="grid-2">${personCard('john', lang)}${personCard('jose', lang)}</div>
  <article class="person" style="margin-top:clamp(20px,3vw,32px)">
    ${img('karina-serrano', k.name, { sizes: '(max-width:560px) 100vw, 200px' })}
    <div class="person-body">
      <div class="person-role">${esc(c.ui.assistant)}</div>
      <h3>${esc(k.name)}</h3>
      <p>${esc(c.pages.karina.bio)}</p>
      <p class="langs"><a href="tel:${k.phone.e164}" data-loc="team">${esc(k.phone.display)}</a> · <a href="mailto:${k.email}" data-loc="team">${k.email}</a></p>
    </div>
  </article>
</div></section>
${finalCta(lang)}`;
  return page({ lang, key: 'team', title: p.title, description: p.description, body, schema: [breadcrumbSchema(trail), personSchema('john', lang), personSchema('jose', lang)] });
}

function renderPerson(key, lang) {
  setWa(lang, null);
  const c = content[lang];
  const ui = c.ui;
  const p = c.pages[key];
  const person = people[key];
  const trail = [{ name: ui.home, href: url('home', lang) }, { name: ui.nav.team, href: url('team', lang) }, { name: person.name, href: url(key, lang) }];
  const langs = person.langs.map((l) => `<li>${esc(ui.langNames[l])}${p.langLevels[l] ? ` (${esc(p.langLevels[l])})` : ''}</li>`).join('');
  const body = `${pageHero(lang, trail, { eyebrow: ui.partner, h1: person.name, lead: p.role.split('·')[1]?.trim() }, { cta: false })}
<section class="section"><div class="wrap profile">
  <aside class="profile-aside">
    ${img(person.img, person.name, { sizes: '(max-width:900px) 100vw, 380px', eager: true })}
    <div class="contact-box">
      <h2>${esc(ui.directContact)}</h2>
      <a href="${waLink(WA_MSG)}" rel="noopener" target="_blank" data-loc="profile">${icon.wa}WhatsApp</a>
      <a href="tel:${person.phone.e164}" data-loc="profile">${icon.phone}${esc(person.phone.display)}</a>
      <a href="mailto:${person.email}" data-loc="profile">${icon.mail}${person.email}</a>
      <a href="${person.linkedin}" rel="noopener" target="_blank">${icon.linkedin}LinkedIn</a>
    </div>
  </aside>
  <div>
    <span class="eyebrow">${esc(p.role)}</span>
    <div class="prose">${p.bio.map((t) => `<p>${esc(t)}</p>`).join('')}</div>
    <div class="facts">
      <div><h2>${esc(ui.practiceAreas)}</h2><ul>${p.areas.map((a) => `<li>${esc(a)}</li>`).join('')}</ul></div>
      <div><h2>${esc(ui.languages)}</h2><ul>${langs}</ul></div>
      <div><h2>${esc(ui.education)}</h2><ul>${p.education.map((a) => `<li>${esc(a)}</li>`).join('')}</ul></div>
      <div><h2>${esc(ui.associations)}</h2><ul>${p.associations.map((a) => `<li>${esc(a)}</li>`).join('')}</ul></div>
    </div>
    ${ctaButtons(lang)}
  </div>
</div></section>
${finalCta(lang)}`;
  return page({ lang, key, title: p.title, description: p.description, body, ogType: 'profile', schema: [breadcrumbSchema(trail), personSchema(key, lang)] });
}

function renderGuides(lang) {
  setWa(lang, null);
  const c = content[lang];
  const p = c.pages.guides;
  const trail = [{ name: c.ui.home, href: url('home', lang) }, { name: p.eyebrow, href: url('guides', lang) }];
  const body = `${pageHero(lang, trail, p, { cta: false })}
<section class="section section-cream"><div class="wrap"><div class="grid-3">${guideKeys.map((k) => guideCard(k, lang)).join('')}</div></div></section>
${finalCta(lang)}`;
  return page({
    lang, key: 'guides', title: p.title, description: p.description, body,
    schema: [breadcrumbSchema(trail), { '@type': 'ItemList', itemListElement: guideKeys.map((k, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(k, lang), name: c.pages[k].h1 })) }],
  });
}

function renderArticle(key, lang) {
  setWa(lang, content[lang].pages[key].practice);
  const c = content[lang];
  const ui = c.ui;
  const g = c.pages[key];
  const author = people[g.author];
  const date = new Intl.DateTimeFormat(c.locale.replace('_', '-'), { dateStyle: 'long' }).format(new Date(g.date + 'T12:00:00Z'));
  const trail = [{ name: ui.home, href: url('home', lang) }, { name: ui.nav.guides, href: url('guides', lang) }, { name: g.h1, href: url(key, lang) }];
  const meta = `<div class="meta"><span>${esc(ui.by)} <a href="${url(g.author, lang)}">${esc(author.name)}</a></span><span>${esc(ui.updated)}: <time datetime="${g.date}">${esc(date)}</time></span><span>${g.minutes} ${esc(ui.minRead)}</span></div>`;
  const toc = [];
  const prose = g.body.replace(/<h2>(.*?)<\/h2>/g, (_, t) => {
    const id = slug(t);
    toc.push(`<li><a href="#${id}">${t}</a></li>`);
    return `<h2 id="${id}">${t}</h2>`;
  });
  const body = `${pageHero(lang, trail, { eyebrow: practiceNames[lang][g.practice], h1: g.h1, lead: g.lead }, { cta: false, extra: meta })}
<article class="section"><div class="wrap narrow">
  <nav class="toc" aria-label="${esc(ui.toc)}"><strong>${esc(ui.toc)}</strong><ul>${toc.join('')}</ul></nav>
  <div class="prose">${prose}</div>
  <div class="author-box">
    <img src="${imgSrc(author.img, 400)}" width="84" height="84" alt="${esc(author.name)}" loading="lazy">
    <div><strong>${esc(author.name)}</strong><p>${esc(c.pages[g.author].role)}</p><a class="link-arrow" href="${url(g.author, lang)}">${esc(ui.viewProfile)}</a></div>
  </div>
  <p style="margin-top:40px;font-size:.9rem;color:var(--muted)">${esc(ui.disclaimer)}</p>
  <div class="btn-row"><a class="btn btn-line" href="${url(g.practice, lang)}">${esc(practiceNames[lang][g.practice])} →</a></div>
</div></article>
${finalCta(lang)}`;
  return page({
    lang, key, title: g.title, description: g.description, body, ogType: 'article',
    schema: [
      breadcrumbSchema(trail),
      {
        '@type': 'Article',
        headline: g.h1,
        description: g.description,
        inLanguage: lang,
        datePublished: g.date,
        wordCount: g.body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length,
        dateModified: g.date,
        mainEntityOfPage: abs(key, lang),
        image: `${site.url}/assets/og/${lang}-${key}.jpg`,
        author: { '@id': site.url + '/#' + g.author, '@type': 'Person', name: author.name, url: abs(g.author, lang) },
        publisher: { '@id': site.url + '/#firm' },
      },
    ],
  });
}

function renderContact(lang) {
  setWa(lang, null);
  const c = content[lang];
  const ui = c.ui;
  const f = ui.form;
  const p = c.pages.contact;
  const trail = [{ name: ui.home, href: url('home', lang) }, { name: p.eyebrow, href: url('contact', lang) }];
  const body = `${pageHero(lang, trail, p, { cta: false })}
<section class="section"><div class="wrap contact-grid">
  <div>
    <ul class="contact-list">
      <li>${icon.wa}<div><strong>WhatsApp</strong><a href="${waLink(WA_MSG)}" rel="noopener" target="_blank" data-loc="contact">${esc(site.phone.display)}</a></div></li>
      <li>${icon.phone}<div><strong>${esc(ui.phones)}</strong><a href="tel:${site.phone.e164}" data-loc="contact">${esc(site.phone.display)}</a><br><a href="tel:${site.phone2.e164}" data-loc="contact">${esc(site.phone2.display)}</a></div></li>
      <li>${icon.mail}<div><strong>${esc(ui.email)}</strong><a href="mailto:${people.john.email}" data-loc="contact">${people.john.email}</a><br><a href="mailto:${people.jose.email}" data-loc="contact">${people.jose.email}</a></div></li>
      <li>${icon.pin}<div><strong>${esc(ui.office)}</strong>${esc(site.address.street)}<br>${esc(site.address.locality)}<br><a href="${site.mapsUrl}" rel="noopener" target="_blank" class="link-arrow" style="margin-top:8px">${esc(ui.openMaps)}</a></div></li>
    </ul>
    <iframe class="map" src="${site.mapsEmbed}" title="${esc(ui.office)} — Financial Park, Costa del Este" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </div>
  <form class="form" id="contact-form" novalidate>
    <span id="consulta"></span>
    <h2>${esc(f.title)}</h2>
    <p class="lock">${icon.lock}${esc(f.confidential)}</p>
    <p style="color:var(--muted);font-size:.95rem">${esc(f.intro)}</p>
    <div class="field"><label for="f-name">${esc(f.name)} *</label><input id="f-name" name="name" autocomplete="name" required></div>
    <div class="field-row">
      <div class="field"><label for="f-email">${esc(f.email)} *</label><input id="f-email" name="email" type="email" autocomplete="email" required></div>
      <div class="field"><label for="f-phone">${esc(f.phone)}</label><input id="f-phone" name="phone" type="tel" autocomplete="tel"></div>
    </div>
    <div class="field-row">
      <div class="field"><label for="f-country">${esc(f.country)}</label><input id="f-country" name="country" autocomplete="country-name"></div>
      <div class="field"><label for="f-area">${esc(f.area)}</label><select id="f-area" name="area"><option value="">${esc(f.areaPlaceholder)}</option>${practiceKeys.map((k) => `<option value="${k}">${esc(practiceNames[lang][k])}</option>`).join('')}<option value="other">${esc(f.other)}</option></select></div>
    </div>
    <div class="field"><label for="f-msg">${esc(f.message)} *</label><textarea id="f-msg" name="message" required></textarea></div>
    <input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
    <label class="check"><input type="checkbox" name="consent" required><span>${f.consent.replace('{privacy}', url('privacy', lang))}</span></label>
    <button class="btn ${site.formEndpoint ? 'btn-gold' : 'btn-wa'}" type="submit">${site.formEndpoint ? esc(f.submit) : icon.wa + esc(f.submitWa)}</button>
    ${site.formEndpoint ? '' : `<button class="btn btn-line" type="button" data-action="email" style="margin-top:10px">${icon.mail}${esc(f.submitEmail)}</button><p class="form-note">${esc(f.waNote)}</p>`}
    <p class="form-status" role="status" aria-live="polite"></p>
  </form>
</div></section>
${stepsSection(lang)}`;
  return page({
    lang, key: 'contact', title: p.title, description: p.description, body,
    schema: [breadcrumbSchema(trail), { '@type': 'ContactPage', name: p.h1, url: abs('contact', lang), about: { '@id': site.url + '/#firm' } }],
  });
}

function renderPrivacy(lang) {
  setWa(lang, null);
  const c = content[lang];
  const p = c.pages.privacy;
  const trail = [{ name: c.ui.home, href: url('home', lang) }, { name: p.h1, href: url('privacy', lang) }];
  const body = `${pageHero(lang, trail, p, { cta: false })}
<section class="section"><div class="wrap narrow prose">${p.body}</div></section>`;
  return page({ lang, key: 'privacy', title: p.title, description: p.description, body, schema: [breadcrumbSchema(trail)] });
}

function render404() {
  setWa('es', null);
  const lang = 'es';
  const body = `<section class="notfound"><div class="wrap">
    <div class="num">404</div>
    ${site.langs.map((l) => `<div lang="${l}" style="margin-top:24px"><h1 style="font-size:clamp(1.6rem,3vw,2.2rem)">${esc(content[l].ui.notFound.title)}</h1><p>${esc(content[l].ui.notFound.text)} <a class="link-arrow" href="${url('home', l)}">${esc(content[l].ui.notFound.back)}</a></p></div>`).join('')}
  </div></section>`;
  return page({ lang, key: null, title: '404 | ' + site.name, description: content.es.ui.notFound.text, body, noindex: true, path: '/404.html' });
}

// ---------- archivos auxiliares ----------
function sitemap(keys) {
  const entries = keys.flatMap((k) => site.langs.map((l) => `  <url>
    <loc>${abs(k, l)}</loc>
    <lastmod>${BUILD_DATE}</lastmod>
${site.langs.map((a) => `    <xhtml:link rel="alternate" hreflang="${a}" href="${abs(k, a)}"/>`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(k, site.defaultLang)}"/>
  </url>`));
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;
}

function llmsTxt() {
  const c = content.en;
  return `# ${site.name}

> ${c.pages.home.description}

Panamanian law firm in Costa del Este, Panama City (Financial Park, 17th floor). Core practices: complex litigation and corporate law / international business. Also: local counsel for foreign law firms, maritime law and ship registration, immigration and relocation, labor law for companies, real estate and condominium (horizontal property) law. Languages: Spanish, English, German.

Contact: WhatsApp/phone ${site.phone.display}, ${site.email}.

## Practice areas
${practiceKeys.map((k) => `- [${practiceNames.en[k]}](${abs(k, 'en')}): ${c.pages[k].short}`).join('\n')}

## Attorneys
- [John Robert Ward Ábrego](${abs('john', 'en')}): ${c.pages.john.role}. Languages: Spanish, German, English, Italian (basic).
- [Jose Alberto Quiel](${abs('jose', 'en')}): ${c.pages.jose.role}. Languages: Spanish, English.

## Guides
${guideKeys.map((k) => `- [${c.pages[k].h1}](${abs(k, 'en')})`).join('\n')}

## Other languages
- Español: ${abs('home', 'es')}
- Deutsch: ${abs('home', 'de')}
`;
}

// Política de seguridad de contenido: solo se permite lo que el sitio usa de verdad.
const formOrigin = site.formEndpoint ? new URL(site.formEndpoint).origin : '';
const csp = [
  "default-src 'self'",
  `script-src 'self'${site.gaId ? ' https://www.googletagmanager.com' : ''}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data:${site.gaId ? ' https://*.google-analytics.com https://*.googletagmanager.com' : ''}`,
  "font-src 'self'",
  `connect-src 'self'${site.gaId ? ' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com' : ''}${formOrigin ? ' ' + formOrigin : ''}`,
  'frame-src https://www.google.com',
  `form-action 'self'${formOrigin ? ' ' + formOrigin : ''}`,
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  'upgrade-insecure-requests',
].join('; ');

const htaccess = `# Generado por src/build.mjs — Apache
Options -Indexes
DirectoryIndex index.html
ErrorDocument 404 /404.html

<IfModule mod_rewrite.c>
RewriteEngine On
# HTTPS y dominio sin www
RewriteCond %{HTTPS} off [OR]
RewriteCond %{HTTP_HOST} ^www\\. [NC]
RewriteRule ^ https://wardintlawyers.com%{REQUEST_URI} [L,R=301]
# URLs antiguas de WordPress
RewriteRule ^home/?$ / [L,R=301]
RewriteRule ^(wp-login\\.php|xmlrpc\\.php|wp-admin.*)$ - [G,L]
RewriteRule ^(feed|comments/feed)/?$ / [L,R=301]
RewriteRule ^(page-sitemap\\.xml|sitemap_index\\.xml)$ /sitemap.xml [L,R=301]
</IfModule>

<IfModule mod_headers.c>
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
Header always set X-Content-Type-Options "nosniff"
Header always set X-Frame-Options "SAMEORIGIN"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
Header always set Content-Security-Policy "${csp}"
Header always set Cross-Origin-Opener-Policy "same-origin"
<FilesMatch "\\.(html|xml|txt)$">
Header set Cache-Control "public, max-age=600, must-revalidate"
</FilesMatch>
<FilesMatch "\\.(js|woff2)$">
Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>
<FilesMatch "\\.(webp|png|jpg|svg|ico|webmanifest)$">
Header set Cache-Control "public, max-age=2592000"
</FilesMatch>
</IfModule>

<IfModule mod_brotli.c>
AddOutputFilterByType BROTLI_COMPRESS text/html text/css application/javascript application/json image/svg+xml text/xml application/xml text/plain application/manifest+json
</IfModule>
<IfModule mod_deflate.c>
AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml text/xml application/xml text/plain application/manifest+json
</IfModule>
<IfModule mod_mime.c>
AddType application/manifest+json .webmanifest
AddType font/woff2 .woff2
AddType image/webp .webp
</IfModule>
`;

const netlifyHeaders = `/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: ${csp}
  Cross-Origin-Opener-Policy: same-origin
/assets/*.js
  Cache-Control: public, max-age=31536000, immutable
/assets/fonts/*
  Cache-Control: public, max-age=31536000, immutable
/assets/img/*
  Cache-Control: public, max-age=2592000
`;

const redirects = `/home/ / 301
/home / 301
/page-sitemap.xml /sitemap.xml 301
/sitemap_index.xml /sitemap.xml 301
`;

// ---------- build ----------
function write(rel, html) {
  const file = join(OUT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

function minifyCss(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s*\n\s*/g, '').replace(/\s*([{}:;,>])\s*/g, '$1').replace(/;}/g, '}').trim();
}

function build() {
  rmSync(OUT, { recursive: true, force: true });
  mkdirSync(join(OUT, 'assets'), { recursive: true });
  cpSync(join(SRC, 'assets/img'), join(OUT, 'assets/img'), { recursive: true });
  cpSync(join(SRC, 'assets/fonts'), join(OUT, 'assets/fonts'), { recursive: true });
  cpSync(join(SRC, 'assets/og'), join(OUT, 'assets/og'), { recursive: true });

  CSS = minifyCss(readFileSync(join(SRC, 'assets/styles.css'), 'utf8'));
  const js = readFileSync(join(SRC, 'assets/main.js'), 'utf8');
  const hash = createHash('sha256').update(js).digest('hex').slice(0, 10);
  JS_PATH = `/assets/main.${hash}.js`;
  writeFileSync(join(OUT, JS_PATH), js);

  for (const lang of site.langs) {
    const pages = [];
    pages.push(['home', renderHome(lang)]);
    pages.push(['practice', renderPractice(lang)]);
    for (const k of practiceKeys) pages.push([k, renderService(k, lang)]);
    pages.push(['team', renderTeam(lang)]);
    pages.push(['john', renderPerson('john', lang)]);
    pages.push(['jose', renderPerson('jose', lang)]);
    pages.push(['guides', renderGuides(lang)]);
    for (const k of guideKeys) pages.push([k, renderArticle(k, lang)]);
    pages.push(['contact', renderContact(lang)]);
    pages.push(['privacy', renderPrivacy(lang)]);
    for (const [k, html] of pages) write(routes[k][lang] + 'index.html', html);
  }
  write('404.html', render404());

  const keys = Object.keys(routes);
  write('sitemap.xml', sitemap(keys));
  write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
  write('llms.txt', llmsTxt());
  write('.htaccess', htaccess);
  write('_headers', netlifyHeaders);
  write('_redirects', redirects);
  write('site.webmanifest', JSON.stringify({
    name: site.name, short_name: 'Ward Lawyers', start_url: '/', display: 'standalone',
    background_color: '#0F1F35', theme_color: '#0F1F35',
    icons: [{ src: '/assets/img/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/assets/img/icon-512.png', sizes: '512x512', type: 'image/png' }],
  }, null, 2));

  console.log(`✓ ${keys.length * site.langs.length} páginas generadas en public/ (${site.langs.join(', ')})`);
}

build();
