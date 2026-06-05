# SEO Técnico Completo — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar SEO técnico completo en agrosalasperu.com: sitemap, robots, OG image dinámica, canonical URLs, JSON-LD structured data (Organization + Product + Breadcrumb), y OpenGraph rico por producto.

**Architecture:** Se crea un componente `JsonLd` server-side minimalista, tres nuevos archivos de ruta Next.js (`sitemap.ts`, `robots.ts`, `opengraph-image.tsx`), y se amplía el `metadata` de cada página. No se añaden dependencias externas. La verificación primaria es `npm run build` (TypeScript + generación estática) seguida de inspección visual en dev server.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS (solo para `opengraph-image`). Sin nuevas dependencias npm.

---

## File Map

| Acción | Archivo | Responsabilidad |
|---|---|---|
| Crear | `src/components/seo/JsonLd.tsx` | Renderiza `<script type="application/ld+json">` |
| Crear | `src/app/sitemap.ts` | Genera `/sitemap.xml` |
| Crear | `src/app/robots.ts` | Genera `/robots.txt` |
| Crear | `src/app/opengraph-image.tsx` | OG image dinámica 1200×630 |
| Modificar | `src/app/layout.tsx` | Agrega JsonLd Organization + limpia ref OG image |
| Modificar | `src/app/page.tsx` | Agrega canonical |
| Modificar | `src/app/catalogo/page.tsx` | Agrega canonical + actualiza ref OG image |
| Modificar | `src/app/catalogo/[id]/page.tsx` | Agrega canonical + OG rico + JsonLd Product + Breadcrumb |
| Modificar | `src/app/about/page.tsx` | Agrega canonical |
| Modificar | `src/app/contact/page.tsx` | Agrega canonical |

---

## Task 1: Componente JsonLd

**Files:**
- Create: `src/components/seo/JsonLd.tsx`

- [ ] **Step 1: Crear el componente**

Crear `src/components/seo/JsonLd.tsx` con este contenido exacto:

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

- [ ] **Step 2: Verificar que compila**

```bash
npx tsc --noEmit
```

Resultado esperado: sin errores.

- [ ] **Step 3: Commit**

```bash
git add src/components/seo/JsonLd.tsx
git commit -m "feat(seo): add JsonLd server component"
```

---

## Task 2: Sitemap

**Files:**
- Create: `src/app/sitemap.ts`

- [ ] **Step 1: Crear `src/app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { products } from "@/data/products";

const BASE_URL = "https://agrosalasperu.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const productUrls: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/catalogo/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE_URL}/catalogo`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...productUrls,
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
  ];
}
```

- [ ] **Step 2: Verificar en dev server**

```bash
npm run dev
```

Abrir en el navegador: `http://localhost:3002/sitemap.xml`

Resultado esperado: XML con 17 URLs (home, catálogo, 13 productos, about, contact).

- [ ] **Step 3: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat(seo): add sitemap.xml generation"
```

---

## Task 3: Robots

**Files:**
- Create: `src/app/robots.ts`

- [ ] **Step 1: Crear `src/app/robots.ts`**

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: "https://agrosalasperu.com/sitemap.xml",
  };
}
```

- [ ] **Step 2: Verificar en dev server**

Con el dev server corriendo, abrir: `http://localhost:3002/robots.txt`

Resultado esperado:
```
User-Agent: *
Allow: /
Disallow: /api/

Sitemap: https://agrosalasperu.com/sitemap.xml
```

- [ ] **Step 3: Commit**

```bash
git add src/app/robots.ts
git commit -m "feat(seo): add robots.txt generation"
```

---

## Task 4: OG Image dinámica

**Files:**
- Create: `src/app/opengraph-image.tsx`

- [ ] **Step 1: Crear `src/app/opengraph-image.tsx`**

```tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Agrosalas Peru — Agroindustria del Pacífico";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #166534 0%, #14532d 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-2px",
            marginBottom: 16,
          }}
        >
          Agrosalas Peru
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#bbf7d0",
            fontWeight: 400,
          }}
        >
          Agroindustria del Pacífico
        </div>
      </div>
    ),
    { ...size }
  );
}
```

- [ ] **Step 2: Verificar en dev server**

Abrir: `http://localhost:3002/opengraph-image`

Resultado esperado: imagen PNG 1200×630 con fondo verde oscuro, texto blanco "Agrosalas Peru" y subtítulo en verde claro.

- [ ] **Step 3: Commit**

```bash
git add src/app/opengraph-image.tsx
git commit -m "feat(seo): add dynamic OG image via Next.js ImageResponse"
```

---

## Task 5: Canonical URLs + limpieza OG image en layout y páginas estáticas

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/catalogo/page.tsx`
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/contact/page.tsx`

- [ ] **Step 1: Actualizar `src/app/layout.tsx`**

Reemplazar el bloque `images` en `openGraph` y `twitter` para apuntar a `/opengraph-image`:

```ts
export const metadata: Metadata = {
  metadataBase: new URL("https://agrosalasperu.com"),
  title: {
    default: "Agrosalas Peru — Agroindustria del Pacífico",
    template: "%s | Agrosalas Peru",
  },
  description:
    "Agrosalas Peru es una empresa agroindustrial peruana especializada en enlatados, conservas y congelados del mar y del campo, con estándares de calidad para exportación.",
  keywords: [
    "agroindustria peruana",
    "enlatados",
    "conservas",
    "congelados",
    "atún",
    "espárragos",
    "langostinos",
    "exportación",
    "Agrosalas Peru",
  ],
  authors: [{ name: "Agrosalas Peru" }],
  creator: "Agrosalas Peru",
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://agrosalasperu.com",
    siteName: "Agrosalas Peru",
    title: "Agrosalas Peru — Agroindustria del Pacífico",
    description:
      "Enlatados, conservas y congelados peruanos con calidad de exportación.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Agrosalas Peru — Agroindustria del Pacífico",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agrosalas Peru — Agroindustria del Pacífico",
    description:
      "Enlatados, conservas y congelados peruanos con calidad de exportación.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/images/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};
```

- [ ] **Step 2: Actualizar `src/app/page.tsx`** — agregar canonical:

```ts
export const metadata: Metadata = {
  title: "Agrosalas Peru — Agroindustria del Pacífico",
  description:
    "Somos una empresa agroindustrial peruana especializada en enlatados, conservas y congelados con más de 4 años de experiencia y calidad de exportación.",
  alternates: {
    canonical: "https://agrosalasperu.com",
  },
};
```

- [ ] **Step 3: Actualizar `src/app/catalogo/page.tsx`** — agregar canonical y actualizar imagen OG:

```ts
export const metadata: Metadata = {
  title: "Catálogo de productos",
  description:
    "Explora nuestro catálogo completo de enlatados, conservas y congelados peruanos con calidad de exportación.",
  alternates: {
    canonical: "https://agrosalasperu.com/catalogo",
  },
  openGraph: {
    title: "Catálogo | Agrosalas Peru",
    description:
      "Enlatados, conservas y congelados del mar y el campo peruano.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Catálogo Agrosalas Peru",
      },
    ],
  },
};
```

- [ ] **Step 4: Actualizar `src/app/about/page.tsx`** — agregar canonical:

```ts
export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce la historia, misión, visión y valores de Agrosalas Peru, empresa agroindustrial peruana con más de 4 años de trayectoria.",
  alternates: {
    canonical: "https://agrosalasperu.com/about",
  },
};
```

- [ ] **Step 5: Actualizar `src/app/contact/page.tsx`** — agregar canonical:

```ts
export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos para solicitar cotizaciones, información sobre nuestros productos o resolver cualquier consulta. Respondemos en menos de 24 horas.",
  alternates: {
    canonical: "https://agrosalasperu.com/contact",
  },
};
```

- [ ] **Step 6: Verificar compilación**

```bash
npx tsc --noEmit
```

Resultado esperado: sin errores.

- [ ] **Step 7: Commit**

```bash
git add src/app/layout.tsx src/app/page.tsx src/app/catalogo/page.tsx src/app/about/page.tsx src/app/contact/page.tsx
git commit -m "feat(seo): add canonical URLs and fix OG image references"
```

---

## Task 6: Organization JSON-LD en el layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Agregar Organization JSON-LD al layout**

Importar el componente y añadirlo al JSX del layout. El archivo `src/app/layout.tsx` ya fue modificado en Task 5. Añadir el import y el componente:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { JsonLd } from "@/components/seo/JsonLd";

// ... (inter y metadata sin cambios)

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Agrosalas Peru",
  url: "https://agrosalasperu.com",
  logo: "https://agrosalasperu.com/images/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+905600449",
    contactType: "sales",
    availableLanguage: ["Spanish", "English"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="flex flex-col min-h-screen">
        <JsonLd data={organizationSchema} />
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verificar en dev server**

Con el dev server corriendo, abrir `http://localhost:3002` y ver el código fuente de la página (Ctrl+U / Cmd+U).

Buscar `application/ld+json` en el HTML. Resultado esperado: bloque JSON con `"@type": "Organization"` visible en el source.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(seo): add Organization JSON-LD schema to root layout"
```

---

## Task 7: OpenGraph rico + Product JSON-LD + Breadcrumb en páginas de producto

**Files:**
- Modify: `src/app/catalogo/[id]/page.tsx`

- [ ] **Step 1: Reemplazar `src/app/catalogo/[id]/page.tsx`** con el contenido completo siguiente:

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { ProductDetailClient } from "./ProductDetailClient";
import { JsonLd } from "@/components/seo/JsonLd";

const BASE_URL = "https://agrosalasperu.com";

interface Params {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) return { title: "Producto no encontrado" };

  const ogImage = product.image
    ? [{ url: product.image, width: 800, height: 800, alt: product.name }]
    : [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Agrosalas Peru" }];

  return {
    title: `${product.name} — Agrosalas Peru`,
    description: product.shortDescription,
    alternates: {
      canonical: `${BASE_URL}/catalogo/${product.id}`,
    },
    openGraph: {
      title: `${product.name} — Agrosalas Peru`,
      description: product.shortDescription,
      url: `${BASE_URL}/catalogo/${product.id}`,
      siteName: "Agrosalas Peru",
      type: "website",
      images: ogImage,
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — Agrosalas Peru`,
      description: product.shortDescription,
      images: product.image ? [product.image] : ["/opengraph-image"],
    },
  };
}

export default async function ProductDetailPage({ params }: Params) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    ...(product.image && { image: `${BASE_URL}${product.image}` }),
    brand: {
      "@type": "Brand",
      name: "Agrosalas Peru",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      seller: {
        "@type": "Organization",
        name: "Agrosalas Peru",
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Catálogo",
        item: `${BASE_URL}/catalogo`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${BASE_URL}/catalogo/${product.id}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ProductDetailClient product={product} related={related} />
    </>
  );
}
```

- [ ] **Step 2: Verificar compilación TypeScript**

```bash
npx tsc --noEmit
```

Resultado esperado: sin errores.

- [ ] **Step 3: Verificar JSON-LD en dev server**

Con el dev server corriendo, abrir cualquier producto, por ejemplo: `http://localhost:3002/catalogo/frejol-rojo`

Ver el código fuente (Cmd+U / Ctrl+U). Buscar `application/ld+json`.

Resultado esperado: dos bloques JSON-LD, uno con `"@type": "Product"` y otro con `"@type": "BreadcrumbList"`.

- [ ] **Step 4: Verificar OG tags**

En el mismo código fuente, buscar `og:image`. 

Para `frejol-rojo` (tiene imagen): debe apuntar a `/images/products/frejol-rojo.png`.  
Para `frijol-castilla` (sin imagen): debe apuntar a `/opengraph-image`.

- [ ] **Step 5: Commit**

```bash
git add src/app/catalogo/\[id\]/page.tsx
git commit -m "feat(seo): add rich OG, Product schema, and Breadcrumb JSON-LD to product pages"
```

---

## Task 8: Build final y verificación completa

- [ ] **Step 1: Build de producción**

```bash
npm run build
```

Resultado esperado: build exitoso sin errores TypeScript ni warnings de Next.js relacionados con metadata. Se generarán los 13 archivos de producto como rutas estáticas.

- [ ] **Step 2: Verificar sitemap completo**

```bash
npm run start
```

Abrir `http://localhost:3000/sitemap.xml`. Contar las URLs: deben ser 17 (1 home + 1 catálogo + 13 productos + 1 about + 1 contact).

- [ ] **Step 3: Verificar robots.txt**

Abrir `http://localhost:3000/robots.txt`. Verificar que incluye `Disallow: /api/` y la línea `Sitemap:`.

- [ ] **Step 4: Commit final si hay cambios pendientes**

```bash
git status
```

Si no hay cambios sin commitear, el plan está completo.

---

## Verificación post-deploy (manual, fuera del código)

Una vez desplegado en producción:

1. **Google Rich Results Test:** Ir a `https://search.google.com/test/rich-results` y pegar una URL de producto (ej. `https://agrosalasperu.com/catalogo/frejol-rojo`). Debe detectar `Product` y `BreadcrumbList`.

2. **Open Graph Debugger (Facebook):** `https://developers.facebook.com/tools/debug/` — pegar la URL home para verificar que la OG image dinámica se renderiza correctamente.

3. **Google Search Console:** Enviar el sitemap en `https://search.google.com/search-console` → Sitemaps → `https://agrosalasperu.com/sitemap.xml`.
