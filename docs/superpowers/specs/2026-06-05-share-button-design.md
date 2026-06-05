# Botón Compartir en Detalle de Producto — Design Spec

**Fecha:** 2026-06-05  
**Objetivo:** Agregar un botón de ícono para compartir el producto en la página de detalle, usando la Web Share API nativa con fallback a copiar link.

---

## Contexto

- **Archivo afectado:** `src/app/catalogo/[id]/ProductDetailClient.tsx`
- Las OG tags por producto ya están configuradas (imagen, título, descripción) desde la implementación SEO previa
- El proyecto usa Lucide para íconos y tiene `.btn-outline-white` en `globals.css`
- Las traducciones viven en `src/i18n/translations.ts`

---

## Comportamiento

El botón invoca `handleShare` al hacer clic:

1. Si `navigator.share` está disponible → `navigator.share({ title, text, url })`
   - `title`: nombre del producto (localizado)
   - `text`: shortDescription del producto (localizado)
   - `url`: `window.location.href`
2. Si no está disponible → `navigator.clipboard.writeText(window.location.href)`
   - Activa `copied = true` por 2 segundos, luego resetea

**Estado:** `const [copied, setCopied] = useState(false)`

---

## Visual

Tercer botón en la fila de CTAs existente (`flex flex-col sm:flex-row gap-3 mt-auto`):

```tsx
<button
  onClick={handleShare}
  className="btn-outline-white shrink-0 sm:w-auto px-4"
  aria-label={t("detail.share")}
>
  {copied ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
</button>
```

- Ícono `Share2` en estado normal, `Check` durante 2s tras copiar
- `shrink-0` para no estirarse como los botones de texto
- En mobile (flex-col): debajo de los dos CTAs principales
- En sm+: alineado a la derecha en la misma fila

---

## Archivos a modificar

| Archivo | Cambio |
|---|---|
| `src/app/catalogo/[id]/ProductDetailClient.tsx` | Agregar imports `Share2`, `Check`; estado `copied`; función `handleShare`; botón en CTAs |
| `src/i18n/translations.ts` | Agregar `"detail.share"` en ES e EN |

---

## Fuera de alcance

- Opciones adicionales (LinkedIn, Twitter, etc.)
- Componente `ShareButton` extraído (YAGNI — una sola página lo usa)
- Tooltip en posición absoluta (el cambio de ícono Share2→Check es suficiente feedback)
