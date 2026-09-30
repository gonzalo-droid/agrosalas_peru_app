# Arquitectura del proyecto — Agrosalas Peru

Documento vivo que describe la arquitectura actual, las decisiones técnicas tomadas y sus trade-offs. Complementa `CLAUDE.md` (que es la guía operativa corta).

---

## 1. Stack

| Capa | Tecnología | Versión | Notas |
|------|-----------|---------|-------|
| Framework | Next.js | 16 (App Router) | Turbopack en dev |
| Lenguaje | TypeScript | 5.x | `strict: true` |
| UI | React | 19 | Server + Client Components |
| Estilos | TailwindCSS | 3.x | Paleta custom `brand-*` y `earth-*` |
| Iconos | lucide-react | 0.474 | Solo los usados se importan |
| Email | Resend + Nodemailer | 4.5 / 8.0 | API route `POST /api/contact` |
| Runtime | Node.js | ≥ 20 | Vercel-compatible |

Tests con `node --test` sobre módulos puros (`npm test`).

---

## 2. Estructura de carpetas

```
src/
├─ proxy.ts                      # Rewrite/redirect de locale (ES sin prefijo, EN bajo /en)
│
├─ app/
│  ├─ globals.css                # Tailwind + clases utilitarias (.btn-primary, .card, …)
│  ├─ robots.ts                  # robots.txt
│  ├─ sitemap.ts                 # Una entrada por idioma con alternates
│  ├─ og/route.tsx               # Imagen OG por idioma (/og?locale=)
│  ├─ api/
│  │  └─ contact/route.ts        # POST — envía email (Nodemailer / Gmail SMTP)
│  └─ [locale]/                  # es | en (SSG)
│     ├─ layout.tsx              # Root layout — <html lang>, <LanguageProvider locale>
│     ├─ page.tsx                # Home (server; generateMetadata)
│     ├─ not-found.tsx           # 404 (client, traducido)
│     ├─ [...rest]/page.tsx      # Catch-all → 404 dentro del locale
│     ├─ about/
│     │  ├─ page.tsx             # Server, generateMetadata
│     │  └─ AboutClient.tsx      # Client, contenido traducible
│     ├─ contact/
│     │  ├─ page.tsx
│     │  ├─ ContactPageClient.tsx
│     │  └─ ContactForm.tsx
│     ├─ catalogo/
│     │  ├─ page.tsx
│     │  ├─ CatalogoHeader.tsx
│     │  ├─ CatalogoClient.tsx   # Filtros + búsqueda + grid
│     │  └─ [id]/
│     │     ├─ page.tsx          # generateMetadata + generateStaticParams
│     │     └─ ProductDetailClient.tsx
│     └─ eventos/
│        ├─ page.tsx
│        ├─ EventsHeader.tsx
│        ├─ EventsListClient.tsx
│        └─ [slug]/
│           ├─ page.tsx
│           └─ EventDetailClient.tsx
│
├─ components/
│  ├─ layout/
│  │  ├─ Navbar.tsx              # Client (scroll state + switcher + menu mobile)
│  │  └─ Footer.tsx
│  ├─ sections/                  # Bloques del home (StatsSection y TestimonialsSection sin usar)
│  │  ├─ HeroSection.tsx
│  │  ├─ ProductsPreview.tsx
│  │  ├─ BenefitsSection.tsx
│  │  ├─ CtaSection.tsx
│  │  ├─ StatsSection.tsx
│  │  └─ TestimonialsSection.tsx
│  ├─ seo/
│  │  └─ JsonLd.tsx
│  └─ ui/
│     ├─ LocaleLink.tsx          # Link interno con prefijo de idioma
│     ├─ LanguageSwitcher.tsx    # Links reales ES / EN a la misma ruta
│     ├─ LanguageSuggestion.tsx  # Aviso "View in English?"
│     ├─ ProductCard.tsx
│     ├─ EventCard.tsx
│     ├─ ShareButton.tsx
│     ├─ Lightbox.tsx
│     └─ WhatsAppButton.tsx
│
├─ data/
│  ├─ products.ts                # Mock data ES (source of truth) + CATEGORIES
│  └─ events.ts                  # Eventos (leer solo vía lib/events.ts)
│
├─ i18n/
│  ├─ config.ts                  # locales, isLocale, stripLocale, localizedPath, resolveLocaleRoute
│  ├─ server.ts                  # resolveLocale(params)
│  ├─ preference.ts              # Helpers de localStorage (preferencia de idioma)
│  ├─ LanguageProvider.tsx       # Contexto por prop + hook useLanguage()
│  ├─ translations.ts            # Diccionario ES + EN, translate(), claves meta.*
│  ├─ productsI18n.ts            # Traducciones EN de productos (por id)
│  └─ eventsI18n.ts              # Traducciones EN de eventos (por slug)
│
├─ lib/
│  ├─ site.ts                    # BASE_URL
│  ├─ seo.ts                     # pageMetadata, alternatesFor, languageAlternates, ogImage
│  ├─ events.ts                  # getEvents, getEventBySlug
│  └─ eventUtils.ts              # Lógica pura de fechas/eventos
│
└─ types/
   └─ index.ts                   # Product, ProductCategory, ContactFormData
```

---

## 3. Patrones arquitectónicos

### 3.1 Server / Client split

- **Página server-first:** cada `page.tsx` se mantiene como server component para preservar `generateMetadata`, necesario para SEO y OpenGraph.
- **Wrapper client:** cuando la página tiene texto traducible o estado interactivo, se crea un archivo hermano `*Client.tsx` con `"use client"` y se renderiza desde el `page.tsx`.
- Regla: **nunca** poner `"use client"` en `page.tsx` si exporta metadata (las páginas viven en `src/app/[locale]/`).

### 3.2 Sistema de estilos

- Tailwind como única fuente de clases utilitarias.
- Clases reutilizables centralizadas en `src/app/globals.css` bajo `@layer components`:
  - `.btn-primary`, `.btn-secondary`, `.btn-outline-white`
  - `.card`, `.badge`, `.badge-{enlatados|conservas|congelados}`
  - `.container-section`, `.section-padding`
- Paleta custom en `tailwind.config.ts`: `brand-*` (verde corporativo) y `earth-*` (amarillo/tierra).

### 3.3 Navbar transparente

`Navbar.tsx` cambia de transparente a opaco cuando `window.scrollY > 20`. Es client component obligatoriamente (usa `useState` + `useEffect` + `usePathname`). El `LanguageSwitcher` recibe el estado `scrolled` para adaptar sus colores al fondo.

### 3.4 Datos del catálogo

- `products.ts` es la única fuente; los productos son ES por defecto (legado).
- Los filtros de categoría se tipan con `ProductCategory = "enlatados" | "conservas" | "congelados"`.
- `CATEGORIES` exporta un array `[{ value, label }]` usado por `CatalogoClient`; el `label` se ignora en runtime (se traduce via `t("category.<value>")`), se mantiene por compatibilidad.
- `generateStaticParams` en la página de detalle pre-renderiza las rutas en build.

### 3.5 Formulario de contacto

- **Client:** `ContactForm.tsx` maneja estado local (idle/loading/success/error) y envía JSON a `/api/contact`.
- **Subject interno:** claves (`quote | info | wholesale | export | other`) en lugar de strings traducidos. El label se resuelve con `t(\`subject.${key}\`)` para mostrar y para el payload enviado al servidor.
- **Backward compatibility:** `parseSubjectParam()` reconoce tanto las keys nuevas como los strings ES antiguos que pudieran quedar en URLs compartidas.
- **API:** `route.ts` valida, llama a Resend, responde en JSON. Lee `RESEND_API_KEY`, `CONTACT_EMAIL`, `FROM_EMAIL` desde `.env.local`.

---

## 4. Internacionalización (i18n)

### 4.1 Decisión

**Rutas por idioma con `app/[locale]/` + `proxy.ts`**: español sin prefijo (URLs históricas intactas) e inglés bajo `/en`, ambos renderizados en servidor (SSG). Reemplaza al context cliente + `localStorage` (2026-06), que dejaba el inglés fuera del índice de Google. Spec: `docs/superpowers/specs/2026-09-30-i18n-routing-design.md`.

### 4.2 Alternativas evaluadas

| Opción | Pros | Contras | Veredicto |
|--------|------|---------|-----------|
| `next-intl` con rutas `/es/...` `/en/...` | SEO ideal, metadata bilingüe, estándar | Refactor grande (middleware, layout por locale, todas las URLs cambian) | Descartada por costo |
| Query string `?lang=en` + server prop | Server-compatible | Prop drilling; invalida caches de Next | Descartada |
| **Context cliente + localStorage** | Mínimo invasivo, preserva `metadata` server-side, URLs estables | Metadata del `<head>` queda en ES; flash-of-ES en primer paint para usuarios EN | Reemplazada (2026-09) |
| **`[locale]` + proxy (rewrite)** | HTML en inglés indexable, un solo árbol de páginas, sin dependencias | Proxy obligatorio (Vercel / `next start`) | **Elegida (2026-09)** |
| Dos árboles con route groups | 100% estático, sin proxy | Cada página duplicada | Descartada |
| `next-intl` | Estándar, resuelve routing y hreflang | Dependencia + migrar diccionarios | Descartada |

### 4.3 Implementación

- `i18n/config.ts`: `locales`, `isLocale`, `stripLocale`, `localizedPath` y `resolveLocaleRoute()` (lógica pura del proxy, con tests).
- `src/proxy.ts`: reescribe URLs sin prefijo a `/es/...`, deja pasar `/en/...` y redirige `/es/...` (308) a la URL sin prefijo. No usa `Accept-Language`.
- `LanguageProvider` recibe el locale por prop desde `[locale]/layout.tsx` y expone `{ locale, t, href }`; en servidor se usa `resolveLocale(params)` + `translate()`.
- `LocaleLink` antepone el prefijo de idioma a los links internos. `LanguageSwitcher` usa links reales a la misma ruta (conserva `?query`) en el otro idioma. `LanguageSuggestion` sugiere inglés según la preferencia guardada en `localStorage`, sin decidir el render.
- `lib/seo.ts` (`pageMetadata`, `alternatesFor`, `languageAlternates`): canonical por idioma + `hreflang` es/en/x-default. El sitemap emite una entrada por idioma con `alternates`.
- Imagen OG por idioma en la ruta `/og?locale=`.

### 4.4 Agregar texto traducible

1. Agregar key en `es` y `en` dentro de `src/i18n/translations.ts`.
2. En el componente: `const { t } = useLanguage()` + `{t("mi.clave")}`.
3. Si el componente era server, convertirlo a client (o extraer a un `*Client.tsx` hermano) o, en servidor, usar `translate(locale, key)`.

### 4.5 Agregar producto traducido

1. Agregar el producto en `src/data/products.ts` (texto ES).
2. Agregar su entrada en `src/i18n/productsI18n.ts` bajo la key `EN[product.id]`.

---

## 5. SEO y metadata

- `layout.tsx` define `metadataBase`, `title.template` (`"%s | Agrosalas Peru"`), OpenGraph y Twitter.
- Cada `page.tsx` server exporta `generateMetadata` vía `pageMetadata()` (`lib/seo.ts`), con canonical y `hreflang` por idioma; el texto viene de las claves `meta.*`.
- `generateMetadata` en `catalogo/[id]/page.tsx` usa el texto del producto en el idioma de la URL.
- Imagen OG por defecto: ruta `src/app/og/route.tsx` (`/og?locale=`).
- `sitemap.ts` y `robots.ts` existen; la URL base vive solo en `src/lib/site.ts`.

---

## 6. Integraciones externas

| Servicio | Uso | Config |
|---------|-----|--------|
| Resend | Email transaccional desde el form de contacto | `RESEND_API_KEY`, `CONTACT_EMAIL`, `FROM_EMAIL` en `.env.local` |
| WhatsApp | CTA flotante + botón en hero/contacto/detalle | Número hardcodeado `+905600449` en `WhatsAppButton.tsx`, `contact/page.tsx`, `ProductDetailClient.tsx` |
| Instagram / LinkedIn / Facebook | Links en footer | Hardcodeados |
| Google Maps | Link a la dirección | Hardcodeado en `ContactPageClient.tsx` |

---

## 7. Decisiones técnicas — resumen

| Decisión | Motivación |
|----------|-----------|
| App Router (Next 16) en vez de Pages Router | Server components + metadata API + streaming |
| Turbopack en dev | Rebuilds más rápidos |
| Tailwind sobre CSS Modules | Velocidad de iteración y tamaño final |
| Sin libs de UI (shadcn, Radix, MUI) | Diseño custom, dependencias mínimas |
| Mock data en `products.ts` | No hay CMS aún; suficiente para el catálogo actual (~13 SKUs) |
| i18n con rutas [locale] + proxy | Inglés indexable sin duplicar páginas ni agregar dependencias |
| Subject del form como key | Desacopla display de value enviado; permite traducir sin romper el backend |
| Resend | Email simple, sin infraestructura propia |
| Static params para páginas de producto | Build-time generation → CDN |

---

## 8. Comandos

```bash
npm run dev      # Dev server (Turbopack) — suele quedar en :3002 si :3000 está ocupado
npm run build    # Build producción + type-check
npm run start    # Serve del build
npm run lint     # ESLint via next lint
```

---

## 9. Roadmap / deuda técnica

- **Tests:** no hay. Candidatos iniciales: lógica de filtros en `CatalogoClient`, `parseSubjectParam`, validación del API route.
- **Metadata bilingüe:** requiere migrar a `next-intl` con routing por locale.
- **CMS:** si el catálogo crece, migrar `products.ts` a Sanity/Contentful/Payload.
- **Analítica:** no instalada.
- **Imágenes faltantes:** varios productos no tienen `image` — usan `placeholder.svg`.
- **Teléfono WhatsApp:** hardcodeado en 3 lugares; extraer a constante compartida.
