# i18n indexable (rutas `/en`) — Design Spec

**Fecha:** 2026-09-30
**Objetivo:** Que Google indexe la versión en inglés del sitio. Hoy el inglés existe solo en el navegador (se aplica tras la hidratación), así que para Google el sitio es únicamente español: una URL por página, metadata y JSON-LD en español. Los compradores objetivo son importadores extranjeros que buscan en inglés ("canned blackeye beans supplier Peru").

**Alcance:** todas las páginas actuales (home, catálogo, detalle de producto, nosotros, contacto, 404) + Eventos, que se implementa en paralelo en otro worktree. Esta feature se implementa **después** de que Eventos esté mergeado en `master`.

---

## Contexto

- Next.js 16 App Router, desplegado en **Vercel**.
- i18n actual: `LanguageProvider` (`src/i18n/LanguageProvider.tsx`) guarda el locale en `useState` + `localStorage` (`agrosalas_locale`); SSR siempre en español. 16 componentes consumen `useLanguage()` (`t`, `locale`, `setLocale`).
- Diccionarios en `src/i18n/translations.ts` (~250 claves ES/EN, fallback EN → ES → clave). Texto de producto EN en `src/i18n/productsI18n.ts` vía `getProductText(product, locale)` (función pura).
- `BASE_URL` está hardcodeado en 4 lugares: `layout.tsx`, `sitemap.ts`, `robots.ts`, `catalogo/[id]/page.tsx`.
- Links internos con `next/link` y rutas absolutas (`/catalogo`, `/contact`, …) en Navbar, Footer, Hero, CTA, ProductsPreview, ProductCard, ProductDetailClient, not-found.
- No hay suite de tests. Node local: v26 (ejecuta TypeScript de forma nativa).

---

## Decisiones

| Tema | Decisión |
|---|---|
| URLs | Español en la raíz **sin prefijo** (URLs actuales intactas); inglés bajo `/en` con los **mismos slugs** (`/en/catalogo/frijol-castilla`) |
| Slugs traducidos | No |
| Detección de idioma | **Sin redirección automática.** Aviso discreto sugiriendo el otro idioma |
| Implementación | Un solo árbol `app/[locale]/` + `proxy.ts` (rewrite), sin librerías |
| `/es/...` explícito | Redirect 308 a la URL sin prefijo |
| Render | SSG para ambos idiomas; contenido en inglés presente en el HTML inicial |
| Tests | `node --test` sobre helpers puros, sin dependencias nuevas |

Enfoques descartados: dos árboles con route groups (cada página duplicada, crece con Eventos y blog) y `next-intl` (dependencia + migración de diccionarios; excesivo para 2 idiomas).

---

## 1. Routing y proxy

### Estructura

```
src/
  proxy.ts                        ← nuevo; ejecuta resolveLocaleRoute()
  i18n/config.ts                  ← nuevo; locales, defaultLocale, helpers puros
  lib/site.ts                     ← nuevo; BASE_URL
  lib/seo.ts                      ← nuevo; alternatesFor()
  app/
    api/contact/route.ts          ← sin cambios
    sitemap.ts, robots.ts         ← se quedan en la raíz
    [locale]/
      layout.tsx                  ← layout raíz: <html lang={locale}>
      page.tsx                    ← home
      not-found.tsx
      [...rest]/page.tsx          ← catch-all → notFound()
      opengraph-image.tsx
      catalogo/page.tsx, catalogo/[id]/page.tsx
      about/page.tsx, contact/page.tsx
      eventos/…                   ← migrado desde app/eventos tras el merge
```

`src/app/layout.tsx` y `src/app/not-found.tsx` desaparecen (su contenido pasa a `[locale]/`). Los `*Client.tsx` co-ubicados se mueven junto a su `page.tsx`.

### `[locale]/layout.tsx`

- `generateStaticParams()` → `[{ locale: "es" }, { locale: "en" }]`; `export const dynamicParams = false`.
- Valida `locale` con `isLocale()`; si no es válido → `notFound()`.
- Renderiza `<html lang={locale}>`, Organization JSON-LD, `LanguageProvider locale={locale}`, Navbar, Footer, WhatsAppButton y `LanguageSuggestion`.
- `generateMetadata` con `metadataBase`, `title.template` y defaults por idioma.

### `src/i18n/config.ts` (sin imports de Next, testeable)

```ts
export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";
export function isLocale(v: string): v is Locale;
export function localizedPath(path: string, locale: Locale): string; // ("/catalogo","en") → "/en/catalogo"; ("/","en") → "/en"; ("/catalogo","es") → "/catalogo"
export function stripLocale(pathname: string): string;             // "/en/catalogo" → "/catalogo"; "/en" → "/"; "/catalogo" → "/catalogo"
export type RouteDecision =
  | { type: "next" }
  | { type: "rewrite"; path: string }
  | { type: "redirect"; path: string };
export function resolveLocaleRoute(pathname: string): RouteDecision;
```

`Locale` pasa a definirse aquí; `translations.ts` lo re-exporta para no romper imports existentes.

### `resolveLocaleRoute` / `proxy.ts`

| Pathname | Decisión |
|---|---|
| `/en` o `/en/...` | `next` |
| `/es` o `/es/...` | `redirect` (308) a `stripLocale(pathname)` |
| cualquier otro | `rewrite` a `/es` + pathname (`/` → `/es`) |

- `proxy.ts` conserva el query string en rewrite y redirect (el catálogo usa `?categoria=`).
- `matcher` excluye: `api`, `_next`, `images`, `sitemap.xml`, `robots.txt`, `favicon.ico` y cualquier ruta con extensión de archivo.
- El proxy **nunca** lee `Accept-Language` ni cookies: Googlebot y usuarios ven lo mismo.

---

## 2. Provider, links y selector

### `LanguageProvider`

- Recibe `locale` como prop desde el layout. Se eliminan `useState`, el `useEffect` de `localStorage` y las escrituras a `document.documentElement.lang`.
- Contexto: `{ locale, t, href }`. `href(path) = localizedPath(path, locale)`. **Se elimina `setLocale`.**
- Los consumidores de `useLanguage()` no cambian (salvo `LanguageSwitcher`).

### Traducción en servidor

- `translate(locale, key)` en `translations.ts`: función pura con el fallback actual (EN → ES → clave). El provider la usa para `t`.
- Nuevas claves `meta.*` en ES y EN: `meta.default.title`, `meta.default.description`, `meta.keywords` (lista separada por comas), `meta.home.*`, `meta.catalog.*`, `meta.about.*`, `meta.contact.*`, `meta.notFound.title`, `meta.og.tagline`, `meta.priceRange` ("A consultar" / "On request"), `meta.breadcrumb.home`, `meta.breadcrumb.catalog`.
- Textos EN orientados a búsqueda de importadores, p. ej. título por defecto "Agrosalas Peru — Peruvian Canned Legumes for Export"; keywords: canned blackeye beans, canary beans, Peruvian lima beans, pigeon peas, canned chickpeas, Peruvian legumes exporter.

### Links internos

- Nuevo `src/components/ui/LocaleLink.tsx` (client): envuelve `next/link` y aplica `href()` a rutas internas que empiezan con `/`.
- Reemplaza los `<Link href="/…">` internos en Navbar, Footer, HeroSection, CtaSection, ProductsPreview, ProductCard, ProductDetailClient (relacionados/volver) y not-found. Anclas (`#stats`), `tel:`, `mailto:` y `https:` no cambian.
- Navbar/Footer: `NAV_LINKS` sigue con rutas sin prefijo; el estado activo compara `stripLocale(pathname) === href`.

### `LanguageSwitcher`

- Pasa de `<button>` a `<Link>` hacia `localizedPath(stripLocale(pathname), l)`, preservando el query string actual.
- `onClick` guarda la preferencia en `localStorage["agrosalas_locale"]` (try/catch). La preferencia ya no determina el idioma renderizado; solo alimenta `LanguageSuggestion`.

### Sin cambios

Mensajes prellenados de WhatsApp por idioma (ya dependen de `locale`), Web Share, filtro de catálogo con `useSearchParams` (sigue envuelto en `<Suspense>`); su `router.replace` usa `usePathname()`, que devuelve la URL visible (con `/en`), así que no requiere cambios.

---

## 3. SEO y aviso de idioma

### `src/lib/site.ts`

`export const BASE_URL = "https://agrosalasperu.com";` — única fuente; reemplaza las 4 copias.

### `src/lib/seo.ts`

```ts
alternatesFor(path: string, locale: Locale): Metadata["alternates"]
// alternatesFor("/catalogo/garbanzo", "en") →
// { canonical: "https://agrosalasperu.com/en/catalogo/garbanzo",
//   languages: { es: ".../catalogo/garbanzo", en: ".../en/catalogo/garbanzo", "x-default": ".../catalogo/garbanzo" } }
```

Cada página usa `generateMetadata({ params })` con `translate()` + `alternatesFor()`. Cada versión es canónica de sí misma y declara la otra como alternate.

### Open Graph

- `openGraph.locale`: `es_PE` / `en_US`; `alternateLocale`: el otro. `openGraph.url` localizada.
- `[locale]/opengraph-image.tsx` muestra `meta.og.tagline` del idioma.

### JSON-LD

- **Product:** `name`/`description` desde `getProductText(product, locale)`; `priceRange` desde `meta.priceRange`; `url` localizada.
- **BreadcrumbList:** nombres (`meta.breadcrumb.*`) y URLs localizados.
- **Organization:** idéntico en ambos idiomas (name, legalName, url, logo, contactPoint).

### Sitemap

- Para cada ruta (home, catálogo, cada producto, nosotros, contacto, eventos y cada evento) se emiten dos entradas (ES y EN), cada una con `alternates.languages: { es, en, "x-default" }`.
- `robots.ts` solo cambia para usar `BASE_URL`.

### `LanguageSuggestion` (client)

- Montado en `[locale]/layout.tsx`. Devuelve `null` en SSR y hasta después del mount (no aparece en el HTML indexado, no causa layout shift).
- Idioma preferido = `localStorage["agrosalas_locale"]` si existe; si no, `navigator.language` (`es-*` → `es`, cualquier otro → `en`).
- Se muestra si `preferido !== locale` de la página **y** `localStorage["agrosalas_locale_hint"] !== "dismissed"`.
- Texto en el idioma **sugerido** (hardcodeado en el componente, no vía `t()`): en página ES → "View this page in English →"; en página EN → "Ver esta página en español →".
- Link a `localizedPath(stripLocale(pathname), sugerido)` que guarda la preferencia; botón × con `aria-label` que guarda `agrosalas_locale_hint = "dismissed"`.
- Si `localStorage` lanza error, el aviso no se muestra.
- Posición: fija abajo a la izquierda (`left-4 bottom-4`, `max-w-xs`); en móvil `left-4 right-20` para no tapar el botón de WhatsApp. Estilo con `.card` y paleta `brand-*`.

---

## 4. Verificación, integración y despliegue

### Tests automáticos

- `tests/i18n.test.ts` y `tests/seo.test.ts`, ejecutados con `node --test` (script `npm test`). Cubren `localizedPath`, `stripLocale`, `isLocale`, `resolveLocaleRoute` (tabla completa de la sección 1, incluidos `/`, `/en`, `/es`, `/english`, `/en-us`) y `alternatesFor`.
- Los módulos testeados no importan alias `@/` ni `next/*` (para que Node los ejecute sin bundler); `tests/` se excluye del `tsconfig` si hace falta.

### Criterios de aceptación (`npm run build && npm run start` + `curl`, y luego contra el Preview de Vercel)

| Petición | Esperado |
|---|---|
| `GET /` | 200, `<html lang="es">`, título ES |
| `GET /en` | 200, `<html lang="en">`, título y contenido EN en el HTML inicial |
| `GET /en/catalogo/frijol-castilla` | canonical `/en/...`, `hreflang` es/en/x-default, JSON-LD EN |
| `GET /catalogo?categoria=conservas` | 200, query preservado |
| `GET /es/catalogo` | 308 → `/catalogo` |
| `GET /en/no-existe`, `/xx/catalogo` | 404 localizado |
| `GET /sitemap.xml` | cada URL en ES y EN con `xhtml:link` alternates |
| `GET /api/contact` (POST), `/images/logo.png`, `/robots.txt` | no pasan por el proxy, responden como hoy |

Manual en navegador: selector de idioma (mantiene la página y el query), navegación dentro de `/en`, aviso de idioma (forzando idioma del navegador), vista móvil 375px. `npm run build` y `npx eslint src` sin errores nuevos.

### Integración con Eventos

Primera tarea del plan: mover `app/eventos/` a `app/[locale]/eventos/`, usar `generateMetadata` + `alternatesFor`, `LocaleLink`, y agregar sus URLs al sitemap con alternates. Su texto EN ya tiene fallback a ES; solo cambia de dónde obtiene `locale`.

El blog futuro nace dentro de `[locale]/`; si cada post existe en uno o ambos idiomas se decide en su propio spec.

### Documentación

- `CLAUDE.md`: sección i18n, "Adding a new page" (dentro de `[locale]/`, claves `meta.*`, `alternatesFor`, sitemap con alternates), nota de `BASE_URL`, comando `npm test`.
- `ARCHITECTURE.md`: sección de i18n.

### Despliegue

1. Rama `feat/i18n-routing` → Preview de Vercel → criterios de aceptación contra la URL del preview.
2. Merge a `master` → producción.
3. (Gonzalo) Google Search Console: reenviar sitemap, solicitar indexación de `/en` y 2–3 productos EN.

---

## Fuera de alcance

- Mensajes de error de `api/contact` en inglés (hoy devuelve textos ES).
- Slugs traducidos.
- Testimonios y cifras del home.
- Idiomas adicionales (la estructura los admite agregando a `locales`).
