// Datos centrales de la firma. Cambie aquí y ejecute `npm run build`.
export const site = {
  url: 'https://wardintlawyers.com',
  name: 'Ward International Lawyers',
  legalName: 'Ward International Lawyers',
  defaultLang: 'es',
  // Fecha de la última actualización de contenido (sitemap y pie de página).
  updated: '2026-10-03',
  langs: ['es', 'en', 'de'],

  phone: { display: '(507) 6505-4281', e164: '+50765054281' },
  phone2: { display: '(507) 6698-9569', e164: '+50766989569' },
  whatsapp: '50765054281',
  email: 'jward@wardintlawyers.com',

  address: {
    street: 'Boulevard Costa del Este y Ave. La Rotonda, Edificio Financial Park, Piso 17',
    locality: 'Costa del Este, Ciudad de Panamá',
    region: 'Panamá',
    country: 'PA',
  },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Financial+Park+Costa+del+Este+Panama',
  mapsEmbed: 'https://www.google.com/maps?q=Financial+Park,+Costa+del+Este,+Panam%C3%A1&output=embed',

  social: {
    linkedin: 'https://www.linkedin.com/company/ward-international-lawyers',
    facebook: 'https://www.facebook.com/Ward-International-Lawyers-106178641652589/',
    instagram: 'https://www.instagram.com/wardintlawyers/',
  },

  // ID de Google Analytics 4 (ej. 'G-XXXXXXX'). Vacío = sin analítica ni banner de cookies.
  gaId: '',
  // Endpoint opcional para el formulario (Formspree, Web3Forms, etc.).
  // Vacío = el formulario abre WhatsApp con el mensaje ya redactado.
  formEndpoint: '',
};

export const people = {
  john: {
    name: 'John Robert Ward Ábrego',
    short: 'John Ward',
    email: 'jward@wardintlawyers.com',
    phone: { display: '(507) 6505-4281', e164: '+50765054281' },
    linkedin: 'https://www.linkedin.com/in/john-ward-973774132',
    img: 'john-ward',
    langs: ['es', 'de', 'en', 'it'],
  },
  jose: {
    name: 'Jose Alberto Quiel',
    short: 'Jose Quiel',
    email: 'jquiel@wardintlawyers.com',
    phone: { display: '(507) 6412-1022', e164: '+50764121022' },
    linkedin: 'https://www.linkedin.com/in/jose-quiel-6834a744',
    img: 'jose-quiel',
    langs: ['es', 'en'],
  },
  karina: {
    name: 'Karina Y. Serrano Álvarez',
    short: 'Karina Serrano',
    email: 'kserrano@wardintlawyers.com',
    phone: { display: '(507) 6137-4538', e164: '+50761374538' },
    img: 'karina-serrano',
  },
};

// Orden y rutas de todas las páginas, por idioma.
export const routes = {
  home: { es: '', en: 'en/', de: 'de/' },
  practice: { es: 'areas-de-practica/', en: 'en/practice-areas/', de: 'de/rechtsgebiete/' },
  litigation: { es: 'litigios-complejos/', en: 'en/complex-litigation/', de: 'de/prozessfuehrung/' },
  corporate: { es: 'derecho-corporativo/', en: 'en/corporate-law/', de: 'de/gesellschaftsrecht/' },
  cocounsel: { es: 'corresponsal-para-firmas-extranjeras/', en: 'en/panama-co-counsel/', de: 'de/korrespondenzkanzlei-panama/' },
  maritime: { es: 'derecho-maritimo/', en: 'en/maritime-law/', de: 'de/seerecht/' },
  immigration: { es: 'migracion-y-reubicacion/', en: 'en/immigration-relocation/', de: 'de/einwanderung-umzug/' },
  labor: { es: 'derecho-laboral/', en: 'en/labor-law/', de: 'de/arbeitsrecht/' },
  realestate: { es: 'bienes-raices-propiedad-horizontal/', en: 'en/real-estate/', de: 'de/immobilienrecht/' },
  team: { es: 'equipo/', en: 'en/team/', de: 'de/team/' },
  john: { es: 'equipo/john-ward/', en: 'en/team/john-ward/', de: 'de/team/john-ward/' },
  jose: { es: 'equipo/jose-quiel/', en: 'en/team/jose-quiel/', de: 'de/team/jose-quiel/' },
  guides: { es: 'guias/', en: 'en/insights/', de: 'de/ratgeber/' },
  guideCompany: {
    es: 'guias/como-constituir-una-sociedad-anonima-en-panama/',
    en: 'en/insights/how-to-incorporate-a-company-in-panama/',
    de: 'de/ratgeber/firmengruendung-in-panama/',
  },
  guideLitigation: {
    es: 'guias/litigar-en-panama-empresa-extranjera/',
    en: 'en/insights/litigation-in-panama-for-foreign-companies/',
    de: 'de/ratgeber/prozessfuehrung-in-panama-fuer-auslaendische-unternehmen/',
  },
  guideDebt: {
    es: 'guias/como-cobrar-una-deuda-en-panama/',
    en: 'en/insights/debt-collection-in-panama/',
    de: 'de/ratgeber/forderungseinzug-in-panama/',
  },
  guideFoundation: {
    es: 'guias/fundacion-de-interes-privado-en-panama/',
    en: 'en/insights/panama-private-interest-foundation/',
    de: 'de/ratgeber/privatstiftung-in-panama/',
  },
  guideShip: {
    es: 'guias/abanderamiento-de-buques-en-panama/',
    en: 'en/insights/panama-ship-registration/',
    de: 'de/ratgeber/schiffsregistrierung-in-panama/',
  },
  contact: { es: 'contacto/', en: 'en/contact/', de: 'de/kontakt/' },
  privacy: { es: 'privacidad/', en: 'en/privacy/', de: 'de/datenschutz/' },
};

export const practiceKeys = ['litigation', 'corporate', 'cocounsel', 'maritime', 'immigration', 'labor', 'realestate'];
export const guideKeys = ['guideDebt', 'guideCompany', 'guideLitigation', 'guideFoundation', 'guideShip'];

// Nombres cortos de cada área, para menús, formularios y tarjetas.
export const practiceNames = {
  es: { litigation: 'Litigios complejos', corporate: 'Derecho corporativo', cocounsel: 'Corresponsalía para firmas', maritime: 'Derecho marítimo', immigration: 'Migración y reubicación', labor: 'Derecho laboral', realestate: 'Bienes raíces' },
  en: { litigation: 'Complex litigation', corporate: 'Corporate law', cocounsel: 'Local counsel for law firms', maritime: 'Maritime law', immigration: 'Immigration & relocation', labor: 'Labor law', realestate: 'Real estate' },
  de: { litigation: 'Prozessführung', corporate: 'Gesellschaftsrecht', cocounsel: 'Korrespondenzkanzlei', maritime: 'Seerecht', immigration: 'Einwanderung & Umzug', labor: 'Arbeitsrecht', realestate: 'Immobilienrecht' },
};
