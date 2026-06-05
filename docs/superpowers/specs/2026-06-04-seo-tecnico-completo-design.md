# SEO Técnico Completo — Agrosalas Peru

**Fecha:** 2026-06-04  
**Objetivo:** Implementar SEO técnico completo (Opción B) para posicionar agrosalasperu.com en búsquedas B2B de compradores locales e internacionales.

---

## Contexto

- **Sitio:** Next.js 16 App Router, live en `https://agrosalasperu.com`
- **Mercado objetivo:** Compradores B2B internacionales (importadores/distribuidores) y mercado local peruano
- **i18n:** Bilingüe ES/EN pero client-side only — misma URL para ambos idiomas, por lo tanto no aplica hreflang
- **Productos:** 13 productos en `src/data/products.ts`, todos en categoría `conservas`
- **Rutas:** `/`, `/catalogo`, `/catalogo/[id]`, `/about`, `/contact`

---

## Estado actual

| Elemento | Estado |
|---|---|
| `metadataBase` + OpenGraph base | ✅ |
| Titles/descriptions por página | ✅ |
| `generateMetadata` dinámico en productos | ✅ |
| `generateStaticParams` (SSG) | ✅ |
| `sitemap.xml` | ❌ |
| `robots.txt` | ❌ |
| Imagen OG funcional | ❌ (referenciada pero archivo no existe) |
| JSON-LD (Organization, Product, Breadcrumb) | ❌ |
| OpenGraph rico por producto | ❌ |
| Canonical URLs | ❌ |

---

## Sección 1: Archivos técnicos base

### `src/app/sitemap.ts`

Next.js genera `/sitemap.xml` en build. Estructura:

```
/ — priority 1.0, changeFrequency: "monthly"
/catalogo — priority 0.9, changeFrequency: "weekly"
/catalogo/[id] × 13 — priority 0.8, changeFrequency: "monthly"
/about — priority 0.7, changeFrequency: "yearly"
/contact — priority 0.7, changeFrequency: "yearly"
```

`lastModified` usa `new Date()` en build time. Las URLs de productos se generan iterando `products` desde `src/data/products.ts`.

### `src/app/robots.ts`

```
User-Agent: *
Allow: /
Disallow: /api/
Sitemap: https://agrosalasperu.com/sitemap.xml
```

### `src/app/opengraph-image.tsx`

Imagen OG dinámica generada por Next.js (1200×630 px). Muestra:
- Logo o nombre "Agrosalas Peru" en tipografía prominente
- Tagline: "Agroindustria del Pacífico"
- Fondo con color `brand-*` del proyecto

Elimina la dependencia del archivo físico `/public/images/og-image.jpg` que actualmente no existe. Las referencias a `/images/og-image.jpg` en `layout.tsx` y `catalogo/page.tsx` se actualizarán para apuntar a `/opengraph-image`.

---

## Sección 2: Canonical URLs

Se agrega `alternates.canonical` al objeto `metadata` de cada página para evitar indexación de duplicados por query params (ej. `/catalogo?categoria=conservas`).

| Archivo | Canonical |
|---|---|
| `layout.tsx` | No se agrega aquí (se define por página) |
| `page.tsx` (home) | `https://agrosalasperu.com` |
| `catalogo/page.tsx` | `https://agrosalasperu.com/catalogo` |
| `about/page.tsx` | `https://agrosalasperu.com/about` |
| `contact/page.tsx` | `https://agrosalasperu.com/contact` |
| `catalogo/[id]/page.tsx` | `https://agrosalasperu.com/catalogo/${id}` (dinámico en `generateMetadata`) |

---

## Sección 3: JSON-LD Structured Data

### Componente `JsonLd`

Nuevo componente server en `src/components/seo/JsonLd.tsx`:

```tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

Se renderiza dentro del JSX de cada página (no en `<head>` explícito — Next.js lo coloca correctamente).

### Schema 1: Organization (en `layout.tsx`)

Presente en todas las páginas via el layout raíz.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Agrosalas Peru",
  "url": "https://agrosalasperu.com",
  "logo": "https://agrosalasperu.com/images/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+905600449",
    "contactType": "sales",
    "availableLanguage": ["Spanish", "English"]
  }
}
```

### Schema 2: Product (en `catalogo/[id]/page.tsx`)

Generado dinámicamente desde los datos del producto. Productos sin imagen usan solo `name` y `description` sin el campo `image`.

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Frijol Rojo",
  "description": "Frejol Rojo en presentación conserva...",
  "image": "https://agrosalasperu.com/images/products/frejol-rojo.png",
  "brand": {
    "@type": "Brand",
    "name": "Agrosalas Peru"
  },
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "USD",
    "seller": {
      "@type": "Organization",
      "name": "Agrosalas Peru"
    }
  }
}
```

### Schema 3: BreadcrumbList (en `catalogo/[id]/page.tsx`)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://agrosalasperu.com" },
    { "@type": "ListItem", "position": 2, "name": "Catálogo", "item": "https://agrosalasperu.com/catalogo" },
    { "@type": "ListItem", "position": 3, "name": "Frijol Rojo", "item": "https://agrosalasperu.com/catalogo/frejol-rojo" }
  ]
}
```

---

## Sección 4: OpenGraph rico por producto

Se amplía `generateMetadata` en `catalogo/[id]/page.tsx` para incluir OpenGraph completo:

```ts
openGraph: {
  title: `${product.name} — Agrosalas Peru`,
  description: product.shortDescription,
  url: `https://agrosalasperu.com/catalogo/${product.id}`,
  siteName: "Agrosalas Peru",
  type: "website",
  images: product.image
    ? [{ url: product.image, width: 800, height: 800, alt: product.name }]
    : [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Agrosalas Peru" }],
},
twitter: {
  card: "summary_large_image",
  title: `${product.name} — Agrosalas Peru`,
  description: product.shortDescription,
  images: product.image ? [product.image] : ["/opengraph-image"],
},
```

Cuando un producto tiene `image: ""`, cae al OG image global hasta que se agregue la foto real.

---

## Archivos a crear / modificar

| Acción | Archivo |
|---|---|
| Crear | `src/app/sitemap.ts` |
| Crear | `src/app/robots.ts` |
| Crear | `src/app/opengraph-image.tsx` |
| Crear | `src/components/seo/JsonLd.tsx` |
| Modificar | `src/app/layout.tsx` — agregar `JsonLd` Organization |
| Modificar | `src/app/page.tsx` — agregar canonical |
| Modificar | `src/app/catalogo/page.tsx` — agregar canonical, actualizar ref OG image |
| Modificar | `src/app/catalogo/[id]/page.tsx` — agregar canonical, OG rico, JsonLd Product + Breadcrumb |
| Modificar | `src/app/about/page.tsx` — agregar canonical |
| Modificar | `src/app/contact/page.tsx` — agregar canonical |

---

## Fuera de alcance

- Reescritura de contenido/keywords (Opción C — iteración futura)
- hreflang (no aplica hasta que i18n tenga URLs separadas)
- Google Search Console verification (se hace directamente en GSC sin tocar código)
- Imágenes faltantes de productos (se agregan al `public/` por separado cuando estén disponibles)
