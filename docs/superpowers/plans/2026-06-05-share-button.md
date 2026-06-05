# Botón Compartir en Detalle de Producto — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar un botón de ícono de compartir en la página de detalle de producto que usa la Web Share API nativa en mobile y copia el link en desktop.

**Architecture:** Dos cambios quirúrgicos: agregar las claves de traducción `detail.share` al diccionario ES/EN, y añadir el botón directamente en `ProductDetailClient.tsx` con estado `copied` y función `handleShare`. Sin componentes nuevos (YAGNI). El botón vive en la fila de CTAs existente como tercer elemento solo-ícono.

**Tech Stack:** React `useState`, Web Share API (`navigator.share`), Clipboard API (`navigator.clipboard`), Lucide React (`Share2`, `Check`), i18n propio del proyecto.

---

## File Map

| Acción | Archivo | Cambio |
|---|---|---|
| Modificar | `src/i18n/translations.ts` | Agregar `"detail.share"` en ES y EN |
| Modificar | `src/app/catalogo/[id]/ProductDetailClient.tsx` | Imports, estado, función `handleShare`, botón |

---

## Task 1: Traducciones

**Files:**
- Modify: `src/i18n/translations.ts:103-105` (ES) y `:284-286` (EN)

- [ ] **Step 1: Agregar clave ES**

En `src/i18n/translations.ts`, dentro del objeto `es`, después de la línea `"detail.whatsappCta": "WhatsApp",` (línea 103), agregar:

```ts
  "detail.share": "Compartir",
```

El bloque quedará así:
```ts
  "detail.quoteCta": "Solicitar cotización",
  "detail.whatsappCta": "WhatsApp",
  "detail.share": "Compartir",
  "detail.related": "Productos relacionados",
```

- [ ] **Step 2: Agregar clave EN**

En el mismo archivo, dentro del objeto `en`, después de la línea `"detail.whatsappCta": "WhatsApp",` (alrededor de línea 284), agregar:

```ts
  "detail.share": "Share",
```

El bloque quedará así:
```ts
  "detail.quoteCta": "Request a quote",
  "detail.whatsappCta": "WhatsApp",
  "detail.share": "Share",
  "detail.related": "Related products",
```

- [ ] **Step 3: Verificar TypeScript**

```bash
npx tsc --noEmit
```

Resultado esperado: sin errores.

- [ ] **Step 4: Commit**

```bash
git add src/i18n/translations.ts
git commit -m "feat(share): add detail.share translation keys"
```

---

## Task 2: Botón de compartir en ProductDetailClient

**Files:**
- Modify: `src/app/catalogo/[id]/ProductDetailClient.tsx`

- [ ] **Step 1: Actualizar imports de Lucide**

En la línea 5, cambiar:

```tsx
import { ArrowLeft, CheckCircle2, FileText, Package } from "lucide-react";
```

Por:

```tsx
import { ArrowLeft, Check, CheckCircle2, FileText, Package, Share2 } from "lucide-react";
```

- [ ] **Step 2: Agregar estado `copied` y función `handleShare`**

Dentro de `ProductDetailClient`, después de la declaración de `whatsappHref` (alrededor de línea 37), agregar:

```tsx
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({
        title: text.name,
        text: text.shortDescription,
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
```

- [ ] **Step 3: Agregar import de `useState`**

Verificar que `useState` esté importado de React. La línea 1 ya tiene `"use client"` pero el archivo no importa React explícitamente — en Next.js 16 con JSX transform no es necesario. Sin embargo `useState` sí debe importarse:

Agregar al inicio del archivo (después de `"use client";`):

```tsx
import { useState } from "react";
```

- [ ] **Step 4: Agregar el botón en la fila de CTAs**

Localizar el bloque de CTAs (alrededor de línea 138):

```tsx
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <Link href={contactHref} className="btn-primary flex-1 justify-center">
                  {t("detail.quoteCta")}
                </Link>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex-1 justify-center"
                >
                  {t("detail.whatsappCta")}
                </a>
              </div>
```

Reemplazarlo por:

```tsx
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <Link href={contactHref} className="btn-primary flex-1 justify-center">
                  {t("detail.quoteCta")}
                </Link>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex-1 justify-center"
                >
                  {t("detail.whatsappCta")}
                </a>
                <button
                  onClick={handleShare}
                  className="btn-outline-white shrink-0 px-4 justify-center"
                  aria-label={t("detail.share")}
                >
                  {copied ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
                </button>
              </div>
```

- [ ] **Step 5: Verificar TypeScript**

```bash
npx tsc --noEmit
```

Resultado esperado: sin errores.

- [ ] **Step 6: Verificar en dev server**

```bash
npm run dev
```

Abrir `http://localhost:3002/catalogo/frejol-rojo`.

Verificar:
- El botón de ícono `Share2` aparece a la derecha de "WhatsApp" en la fila de CTAs
- En desktop: al hacer clic, la URL se copia y el ícono cambia a `Check` por ~2 segundos, luego vuelve a `Share2`
- En mobile (o con DevTools → modo responsive): al hacer clic, abre el menú nativo de compartir del dispositivo

- [ ] **Step 7: Commit**

```bash
git add src/app/catalogo/\[id\]/ProductDetailClient.tsx
git commit -m "feat(share): add Web Share API button to product detail page"
```
