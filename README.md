# Ward International Lawyers — sitio web

Sitio estático, multilingüe (español, inglés y alemán) y optimizado para Google, construido a partir del contenido de [wardintlawyers.com](https://wardintlawyers.com/).

## Qué incluye

- **69 páginas** (23 por idioma): portada, 10 áreas de práctica con página propia, corresponsalía para firmas extranjeras, equipo, perfil de cada socio, 5 guías con índice, contacto y privacidad.
  - Litigios complejos y derecho corporativo son las áreas destacadas.
- **SEO técnico completo**:
  - Título y descripción únicos por página, URL canónica y `hreflang` entre idiomas.
  - Sitemap con alternativas por idioma, `robots.txt` y `llms.txt` para buscadores con IA.
  - Datos estructurados (Schema.org): `LegalService`, `Person`, `Service`, `FAQPage`, `Article`, `ItemList` y `BreadcrumbList`.
  - Títulos ajustados para que Google no los corte.
  - Imagen propia para compartir en redes en cada página e idioma (LinkedIn, WhatsApp, Facebook).
- **Conversión**:
  - Barra fija en el celular (Llamar / WhatsApp / Consulta) y botón flotante de WhatsApp.
  - Teléfonos y correos clicables.
  - Mensajes de WhatsApp que indican el área según la página (por ejemplo, "consulta sobre litigios complejos").
  - Formulario que envía la consulta por WhatsApp o por correo, con el mensaje ya redactado.
- **Velocidad**: sin WordPress ni plugins. Imágenes WebP responsivas, tipografías alojadas en el propio sitio, CSS en línea y JS de 8 KB.
  - Lighthouse (móvil): Rendimiento 98–100, Accesibilidad 100, Buenas prácticas 100, SEO 100.
  - La portada pesa unos 160 KB, frente a 3,5 MB del sitio actual.
- **Seguridad**: política de seguridad de contenido (CSP), HSTS y demás cabeceras, en `.htaccess` y `_headers`.
- **Control de calidad**: GitHub Actions genera y verifica el sitio en cada cambio.
- **Medición**: eventos de conversión (clics en WhatsApp, teléfono, correo y formulario) listos para Google Analytics 4, con banner de consentimiento.

## Estructura

```
src/
  config.mjs        Datos de la firma: teléfonos, WhatsApp, dirección, redes, Analytics, rutas
  content/es.mjs    Textos en español
  content/en.mjs    Textos en inglés
  content/de.mjs    Textos en alemán
  assets/           CSS, JS, imágenes y tipografías
  build.mjs         Generador del sitio
  og.mjs            Generador de imágenes para redes (requiere ImageMagick)
  check.mjs         Verificador (enlaces rotos, títulos, H1, JSON-LD)
  serve.mjs         Servidor local para revisar
public/             Sitio generado: ESTO es lo que se sube al hosting
```

## Cómo editar

1. Cambie textos en `src/content/*.mjs` o datos de contacto en `src/config.mjs`.
2. Ejecute:
   ```bash
   npm run build   # genera public/
   npm run check   # verifica que no haya errores
   npm run serve   # abre http://localhost:8080 para revisar
   ```
3. Si cambió títulos de páginas, regenere las imágenes para redes con `npm run og` (requiere ImageMagick) y vuelva a ejecutar `npm run build`.
4. Suba los cambios, incluida la carpeta `public/`. La verificación automática de GitHub falla si `public/` no está actualizada.

Solo requiere Node.js 18 o superior; no hay dependencias que instalar.

## Activar Google Analytics y el formulario por correo

En `src/config.mjs`:

- `gaId: 'G-XXXXXXX'`: activa Google Analytics 4 y el banner de cookies.
- `formEndpoint: 'https://formspree.io/f/xxxx'`: el formulario se envía por correo en lugar de abrir WhatsApp. Sirve Formspree, Web3Forms o similar.

## Publicación

**Opción A: hosting actual (Apache).** Haga un respaldo completo del WordPress y luego suba el contenido de `public/` (incluido `.htaccess`) a la raíz del dominio. El `.htaccess` ya incluye:
- HTTPS y redirección de `www` a la versión sin `www`.
- Compresión y caché.
- Cabeceras de seguridad.
- Redirecciones 301 de las URLs antiguas de WordPress (`/home/`, sitemaps de Yoast).

**Opción B: Cloudflare Pages o Netlify (gratis, más rápido).** Conecte este repositorio con:
- Comando de build: `npm run build`
- Carpeta de publicación: `public`

Los archivos `_headers` y `_redirects` ya están incluidos.

## Después de publicar

Los textos para el Perfil de Empresa en Google (descripción, servicios, preguntas y directorios) están listos para copiar en [`docs/perfil-de-google.md`](docs/perfil-de-google.md).

1. **Google Search Console**: verifique el dominio y envíe `https://wardintlawyers.com/sitemap.xml`.
2. **Perfil de Empresa en Google** (Google Maps):
   - Use exactamente el mismo nombre, dirección y teléfono del sitio.
   - Categoría principal: *Abogado* o *Bufete de abogados*.
   - Enlace al sitio web.
3. **Reseñas en Google**: pida a clientes satisfechos que dejen una reseña. Es el factor más importante para aparecer en el mapa.
4. **Directorios legales**: registre la firma en directorios como Martindale, Lawyers.com y Legal 500. Incluya el enlace al sitio.
5. **Contenido**: publique una guía nueva al mes, en los tres idiomas, sobre lo que preguntan sus clientes.
