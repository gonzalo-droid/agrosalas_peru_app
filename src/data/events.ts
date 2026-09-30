import type { EventItem } from "@/types";

// Eventos en los que participa Agrosalas. Lista vacía → /eventos muestra "Pronto publicaremos nuestros eventos".
// Imágenes de cada evento: public/images/event/<slug>/cover.jpg y 01.jpg, 02.jpg, …
// Texto en inglés: src/i18n/eventsI18n.ts, con el mismo slug.
// No importar este archivo desde páginas o componentes: usar src/lib/events.ts.
//
// Ejemplo de entrada:
//   {
//     slug: "expoalimentaria-2026",
//     title: "Expoalimentaria 2026",
//     startDate: "2026-09-23",
//     endDate: "2026-09-25",                  // opcional; sin endDate = un solo día
//     city: "Lima, Perú",
//     venue: "Centro de Exposiciones Jockey", // opcional
//     summary: "Una o dos frases.",
//     body: ["Párrafo 1.", "Párrafo 2."],
//     cover: "/images/event/expoalimentaria-2026/cover.jpg",
//     gallery: ["/images/event/expoalimentaria-2026/01.jpg"],
//   },

export const events: EventItem[] = [];
