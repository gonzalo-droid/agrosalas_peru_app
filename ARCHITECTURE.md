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

No hay suite de tests configurada.

---

## 2. Estructura de carpetas

```
src/
├─ app/
│  ├─ layout.tsx                 # Root layout — envuelve con <LanguageProvider>
│  ├─ page.tsx                   # Home (server; metadata)
│  ├─ not-found.tsx              # 404 (client, traducido)
│  ├─ about/
│  │  ├─ page.tsx                # Server, metadata
│  │  └─ AboutClient.tsx         # Client, contenido traducible
│  ├─ contact/
│  │  ├─ page.tsx                # Server, metadata
│  │  ├─ ContactPageClient.tsx   # Client, layout + info
│  │  └─ ContactForm.tsx         # Client, formulario
│  ├─ catalogo/
│  │  ├─ page.tsx                # Server, metadata
│  │  ├─ CatalogoHeader.tsx      # Client, hero del catálogo
│  │  ├─ CatalogoClient.tsx      # Client, filtros + búsqueda + grid
│  │  └─ [id]/
│  │     ├─ page.tsx             # Server, generateMetadata + generateStaticParams
│  │     └─ ProductDetailClient.tsx
│  └─ api/
│     └─ contact/route.ts        # POST — envía email via Resend
│
├─ components/
│  ├─ layout/
│  │  ├─ Navbar.tsx              # Client (scroll state + switcher + menu mobile)
│  │  └─ Footer.tsx              # Client (usa traducciones)
│  ├─ sections/                  # Bloques reutilizables del home
│  │  ├─ HeroSection.tsx
│  │  ├─ ProductsPreview.tsx
│  │  ├─ BenefitsSection.tsx
│  │  ├─ CtaSection.tsx
│  │  ├─ StatsSection.tsx        # (no usado, comentado en home)
│  │  └─ TestimonialsSection.tsx # (no usado, comentado en home)
│  └─ ui/
│     ├─ ProductCard.tsx
│     ├─ WhatsAppButton.tsx
│     └─ LanguageSwitcher.tsx    # Toggle ES 🇪🇸 / EN 🇺🇸
│
├─ data/
│  └─ products.ts                # Mock data ES (source of truth) + CATEGORIES
│
├─ i18n/
│  ├─ translations.ts            # Diccionario ES + EN (~160 claves)
│  ├─ LanguageProvider.tsx       # Contexto + hook useLanguage()
│  └─ productsI18n.ts            # Traducciones EN de productos (por id)
│
└─ types/
   └─ index.ts                   # Product, ProductCategory, ContactFormData
```

---

## 3. Patrones arquitectónicos

### 3.1 Server / Client split

- **Página server-first:** cada `page.tsx` se mantiene como server component para preservar `export const metadata` y `generateMetadata`, que son necesarios para SEO y OpenGraph.
- **Wrapper client:** cuando la página tiene texto traducible o estado interactivo, se crea un archivo hermano `*Client.tsx` con `"use client"` y se renderiza desde el `page.tsx`.
- Regla: **nunca** poner `"use client"` en `page.tsx` si exporta metadata.

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

**Custom context cliente con `localStorage`**, no `next-intl` ni locale routing.

### 4.2 Alternativas evaluadas

| Opción | Pros | Contras | Veredicto |
|--------|------|---------|-----------|
| `next-intl` con rutas `/es/...` `/en/...` | SEO ideal, metadata bilingüe, estándar | Refactor grande (middleware, layout por locale, todas las URLs cambian) | Descartada por costo |
| Query string `?lang=en` + server prop | Server-compatible | Prop drilling; invalida caches de Next | Descartada |
| **Context cliente + localStorage** | Mínimo invasivo, preserva `metadata` server-side, URLs estables | Metadata del `<head>` queda en ES; flash-of-ES en primer paint para usuarios EN | **Elegida** |

### 4.3 Implementación

- `LanguageProvider` envuelve el árbol en `layout.tsx`. Inicia en `"es"`, hidrata desde `localStorage["agrosalas_locale"]` en `useEffect`, y sincroniza `document.documentElement.lang`.
- `useLanguage()` expone `{ locale, setLocale, t }`.
- `translations.ts` es un objeto plano con claves tipo `"nav.home"`, `"hero.badge"`, etc. Fallback silencioso: `en → es → key`.
- `getProductText(product, locale)` devuelve `{ name, shortDescription, description, unit }` en el idioma activo; si no hay traducción EN para un producto, devuelve el texto ES original.
- `LanguageSwitcher` muestra 🇪🇸 ES / 🇺🇸 EN, con variantes desktop y mobile adaptadas al estado `scrolled` del navbar.

### 4.4 Agregar texto traducible

1. Agregar key en `es` y `en` dentro de `src/i18n/translations.ts`.
2. En el componente: `const { t } = useLanguage()` + `{t("mi.clave")}`.
3. Si el componente era server, convertirlo a client (o extraer a un `*Client.tsx` hermano).

### 4.5 Agregar producto traducido

1. Agregar el producto en `src/data/products.ts` (texto ES).
2. Agregar su entrada en `src/i18n/productsI18n.ts` bajo la key `EN[product.id]`.

### 4.6 Limitación aceptada

El `<title>` y `description` del `<head>` se mantienen en ES porque Next.js los resuelve en server-side y no tienen acceso al contexto client. Si en el futuro se requiere metadata bilingüe por SEO, la migración correcta es `next-intl` con URL routing.

---

## 5. SEO y metadata

- `layout.tsx` define `metadataBase`, `title.template` (`"%s | Agrosalas Peru"`), OpenGraph y Twitter.
- Cada `page.tsx` server exporta su `metadata` específico.
- `generateMetadata` en `catalogo/[id]/page.tsx` usa los campos ES del producto.
- Imágenes OG en `/public/images/og-image.jpg` (1200×630).
- `robots.txt` y sitemap no configurados actualmente — considerar si hay SEO crítico.

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
| i18n con context cliente | Evita refactor de routing y conserva metadata server |
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
- **Sitemap + robots:** agregar `app/sitemap.ts` y `app/robots.ts`.
- **Analítica:** no instalada.
- **Imágenes faltantes:** varios productos no tienen `image` — usan `placeholder.svg`.
- **Teléfono WhatsApp:** hardcodeado en 3 lugares; extraer a constante compartida.
