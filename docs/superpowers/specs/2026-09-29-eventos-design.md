# Sección de Eventos — Design Spec

**Fecha:** 2026-09-29
**Objetivo:** Agregar una sección `/eventos` que muestre los eventos (ferias, ruedas de negocio, etc.) en los que Agrosalas participó o participará: una lista de cards y una página de detalle por evento con más información y galería de fotos.

**Alcance v1:** data estática en el repo. La data se lee a través de una capa de acceso (`src/lib/events.ts`) para que en una versión futura pueda venir de un panel administrativo sin tocar páginas ni componentes.

---

## Contexto

- El catálogo ya implementa el patrón lista + detalle que se reutiliza aquí: `ProductCard` → `/catalogo/[id]` (SSG con `generateStaticParams`, `generateMetadata`, canonical, botón compartir).
- i18n es client-side (`LanguageProvider`, `t()`); el texto de producto en inglés vive aparte en `productsI18n.ts`, indexado por id, con fallback a español.
- Estilos: clases de `globals.css` (`.card`, `.badge`, `.container-section`, `.section-padding`, `.btn-*`), paletas `brand-*` y `earth-*`, íconos `lucide-react`.
- `public/images/event/` **aún no existe**; se crea con esta feature.

---

## Decisiones

| Tema | Decisión |
|---|---|
| Ruta | `/eventos` (lista) y `/eventos/[slug]` (detalle) |
| Menú | Ítem "Eventos" en Navbar y Footer, entre Catálogo y Nosotros |
| Idioma | Bilingüe ES/EN; EN en archivo aparte con fallback a ES |
| Campos extra | Lugar (ciudad + recinto opcional) y rango de fechas |
| Alcance temporal | Próximos y pasados, separados automáticamente por fecha |
| Home | Sin preview en el Home en v1 |
| Detalle | Botón compartir + "Otros eventos" (hasta 3) |
| Galería | Grilla de miniaturas + lightbox propio, sin librerías |
| Layout detalle | Banner de portada arriba y todo apilado debajo (opción C) |
| Imágenes | Una carpeta por evento: `public/images/event/<slug>/` |
| SEO | `metadata`/`generateMetadata`, canonical y sitemap (como el resto del sitio). Sin JSON-LD `Event` en v1 |
| Data inicial | 2 eventos de ejemplo marcados como placeholder, a reemplazar por eventos reales |

---

## Modelo de datos

```ts
// src/types/index.ts
export interface EventItem {
  slug: string;        // URL /eventos/<slug> y nombre de la carpeta de imágenes
  title: string;       // ES
  startDate: string;   // "YYYY-MM-DD"
  endDate?: string;    // "YYYY-MM-DD"; ausente = evento de un día
  city: string;        // "Lima, Perú"
  venue?: string;      // "Centro de Exposiciones Jockey"
  summary: string;     // 1–2 frases; lead del detalle, description de SEO y texto al compartir
  body: string[];      // párrafos del detalle
  cover: string;       // "/images/event/<slug>/cover.jpg"
  gallery: string[];   // ["/images/event/<slug>/01.jpg", ...]; puede estar vacío
}
```

**Inglés** — `src/i18n/eventsI18n.ts`:

```ts
type EventText = Pick<EventItem, "title" | "summary" | "body" | "city"> & { venue?: string };
const EN: Record<string, EventText> = { /* indexado por slug */ };
export function getEventText(event: EventItem, locale: Locale): EventText; // fallback a ES
```

**Imágenes** — `public/images/event/<slug>/cover.jpg` + `01.jpg`, `02.jpg`, … Portada horizontal, idealmente ≥1600 px de ancho. Si `cover` está vacío se usa un placeholder (mismo criterio que `ProductCard`).

---

## Capa de acceso — `src/lib/events.ts`

Único punto que conoce el origen de la data. Las páginas nunca importan `src/data/events.ts` directamente.

```ts
export async function getEvents(): Promise<EventItem[]>;
export async function getEventBySlug(slug: string): Promise<EventItem | undefined>;
export function splitEvents(events: EventItem[], today: string): { upcoming: EventItem[]; past: EventItem[] };
```

- Son `async` aunque hoy lean un array, para que el cambio a una fuente remota no cambie las firmas.
- **Próximo** = `(endDate ?? startDate) >= today`, comparando strings `YYYY-MM-DD`. Un evento en curso cuenta como próximo.
- `today` se calcula en el servidor en zona `America/Lima` (`Intl.DateTimeFormat("en-CA", { timeZone: "America/Lima" })`).
- Orden: próximos por `startDate` ascendente (el más cercano primero); pasados por `startDate` descendente (el más reciente primero).
- Validación: si hay slugs duplicados, `getEvents()` lanza un error con el slug repetido (el build falla).

---

## Rutas y componentes

```
src/app/eventos/
  page.tsx                  server — metadata, revalidate, getEvents + splitEvents
  EventsHeader.tsx          client — header traducido (patrón CatalogoHeader)
  EventsListClient.tsx      client — secciones Próximos / Participaciones
  [slug]/page.tsx           server — generateStaticParams, generateMetadata, notFound
  [slug]/EventDetailClient.tsx  client — detalle traducido
src/components/ui/
  EventCard.tsx             client — card de la lista y de "Otros eventos"
  Lightbox.tsx              client — visor de galería
  ShareButton.tsx           client — extraído de ProductDetailClient
src/lib/formatEventDate.ts  formato de rango de fechas por locale
```

### Lista `/eventos`

- `page.tsx` exporta `revalidate = 86400`: la separación próximos/pasados se recalcula una vez al día en el servidor. Así el paso de "próximo" a "pasado" no depende de un nuevo deploy ni del reloj del navegador, y se evitan errores de hidratación.
- Header: badge, título y bajada traducidos, con el mismo degradado del catálogo.
- **Próximos eventos:** se renderiza solo si hay alguno.
- **Participaciones:** los eventos pasados.
- Grilla de cards: 1 columna en móvil, 2 en `sm`, 3 en `lg`.
- Sin eventos: mensaje "Pronto publicaremos nuestros eventos" (`events.empty`).
- Sin filtros ni paginación en v1.

### `EventCard`

- `<Link href="/eventos/<slug>">` con clase `.card`, estados de focus y hover como `ProductCard`.
- Imagen de portada `aspect-[4/3]`, `object-cover`, zoom al hover.
- Badge "Próximo" (`earth-*`) sobre la imagen, solo si el evento es próximo. La card recibe `isUpcoming` como prop; no calcula fechas.
- Título (`line-clamp-2`), fecha con ícono `Calendar`, ciudad con ícono `MapPin`.

### Detalle `/eventos/[slug]` — layout apilado (opción C)

1. **Header** (degradado brand): link "← Volver a eventos", badge "Próximo" si corresponde, título en `h1`.
2. **Banner de portada** a lo ancho del contenedor: `aspect-video` en móvil, `md:aspect-[21/9]`, `object-cover`, `priority`, esquinas redondeadas.
3. **Fila de metadatos**: tarjetas Fecha (`Calendar`) y Lugar (`MapPin`: ciudad y recinto) y el `ShareButton`. En móvil se apilan.
4. **Texto** con ancho de lectura (`max-w-3xl`): `summary` como lead (texto más grande) y luego cada párrafo de `body`. La altura crece con el contenido sin afectar al resto del layout.
5. **Galería**: grilla de miniaturas cuadradas (2 columnas en móvil, 3 en `sm`, 4 en `lg`). Click → abre el `Lightbox` en ese índice. La sección no se renderiza si `gallery` está vacío.
6. **Otros eventos**: hasta 3 `EventCard`, excluido el actual; primero los próximos y luego los más recientes.

- `generateStaticParams` a partir de `getEvents()`; slug inexistente → `notFound()`.
- `generateMetadata`: título `<title> — Agrosalas Peru`, description = `summary`, canonical `https://agrosalasperu.com/eventos/<slug>`, OG/Twitter con la portada (o `/opengraph-image` si no hay portada).
- El detalle también exporta `revalidate = 86400` para que el badge "Próximo" se actualice.

### `Lightbox`

- Props: `images: string[]`, `index: number | null`, `onClose()`, `onIndexChange(i)`, `alt(i)`.
- Overlay de pantalla completa (`fixed inset-0`, fondo oscuro), imagen `object-contain` con `next/image`.
- Controles: anterior / siguiente (circulares), contador "N / total", botón cerrar.
- Teclado: `←` `→` navegan, `Esc` cierra. Swipe horizontal en táctil (umbral ~50 px con touch events).
- Bloquea el scroll del `body` mientras está abierto; al cerrar devuelve el foco a la miniatura que lo abrió.
- Accesibilidad: `role="dialog"`, `aria-modal="true"`, botones con `aria-label` traducidos, `alt` = "<título> — foto N".

### `ShareButton` (refactor)

- Se extrae la lógica actual de `ProductDetailClient` (Web Share API, fallback a portapapeles, manejo de `AbortError`, estado `copied` por 2 s) a `src/components/ui/ShareButton.tsx`.
- Props: `title`, `text`, `className?`. La URL sale de `window.location.href`.
- `ProductDetailClient` pasa a usar el componente sin cambiar su comportamiento ni su apariencia.

### `formatEventDate(start, end, locale)`

- `Intl.DateTimeFormat` con `timeZone: "UTC"` sobre fechas `YYYY-MM-DD` parseadas como UTC, para evitar que la fecha se corra un día.
- Locales: `es-PE` y `en-US`.
- Un día: "12 may 2026" / "May 12, 2026".
- Mismo mes: "12–14 may 2026" / "May 12–14, 2026".
- Distinto mes: "30 abr – 2 may 2026" / "Apr 30 – May 2, 2026".
- Distinto año: "30 dic 2026 – 2 ene 2027" / "Dec 30, 2026 – Jan 2, 2027".
- Se implementa con `formatRange` cuando esté disponible, con un fallback manual que produzca los formatos de arriba.

---

## Navegación, i18n y SEO

- `NAV_LINKS` en `Navbar.tsx` y `Footer.tsx`: `{ href: "/eventos", labelKey: "nav.events" }` entre Catálogo y Nosotros.
- Claves nuevas en ambos diccionarios de `translations.ts`: `nav.events`, `events.headerBadge`, `events.headerTitle`, `events.headerDesc`, `events.upcoming`, `events.past`, `events.upcomingBadge`, `events.empty`, `events.back`, `events.date`, `events.place`, `events.gallery`, `events.others`, `events.lightbox.prev`, `events.lightbox.next`, `events.lightbox.close`, `events.photo`.
- `sitemap.ts`: `/eventos` (`changeFrequency: "monthly"`, `priority: 0.7`) y cada `/eventos/<slug>` (`yearly`, `0.6`).
- Metadata de la lista: título "Eventos", description corta y canonical `https://agrosalasperu.com/eventos`.

---

## Data inicial

`src/data/events.ts` arranca con 2 eventos de ejemplo, uno próximo y uno pasado, con un comentario `// PLACEHOLDER — reemplazar por eventos reales` y portada placeholder. Sirven para validar la separación próximos/pasados, el formato de rangos y la galería vacía y con fotos. Se reemplazan por eventos reales antes de publicar.

---

## Fuera de alcance (v1)

- Panel administrativo o fuente remota de datos (la capa `src/lib/events.ts` lo deja preparado).
- Preview de eventos en el Home.
- Filtros por año o tipo, y paginación.
- JSON-LD `Event`.
- Productos exhibidos por evento.

---

## Verificación

No hay suite de tests configurada. Se verifica con:

1. `npm run build`: compila y lista `/eventos` y cada `/eventos/<slug>`.
2. `npx eslint src`: sin errores nuevos.
3. Revisión manual en el navegador (desktop y 375 px):
   - La lista separa próximos y pasados en el orden correcto; la sección de próximos no aparece si está vacía.
   - El detalle con texto largo mantiene el layout; la galería abre el lightbox en la foto correcta.
   - Lightbox: flechas, `Esc`, swipe, contador, scroll del body bloqueado, foco devuelto.
   - El cambio ES ↔ EN traduce UI, contenido y fechas; si falta la traducción EN, se muestra ES.
   - Un slug inexistente devuelve 404.
   - El botón compartir funciona igual en producto y en evento.
