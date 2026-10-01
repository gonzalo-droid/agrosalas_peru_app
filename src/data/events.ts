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

export const events: EventItem[] = [
  {
    slug: "expo-peru-norte-2026",
    title: "Expo Perú Norte 2026",
    startDate: "2026-03-26",
    city: "Chiclayo, Perú",
    summary:
      "Participamos en la Rueda de Negocios de la Expo Perú Norte 2026, organizada por PromPerú en Chiclayo, para presentar nuestras menestras peruanas en conserva y abrir nuevas oportunidades comerciales.",
    body: [
      "El 26 de marzo de 2026 participamos en la Rueda de Negocios de la Expo Perú Norte 2026, realizada en Chiclayo y organizada por PromPerú con el respaldo del Ministerio de Comercio Exterior y Turismo.",
      "Durante la jornada sostuvimos reuniones con compradores y empresas del sector, en las que presentamos nuestras menestras peruanas en conserva y nuestra propuesta de valor: calidad de exportación, inocuidad e innovación alimentaria. Fue una oportunidad clave para abrir diálogos estratégicos y ampliar nuestra red de contactos comerciales.",
      "Agradecemos a PromPerú por la organización y por impulsar espacios que proyectan a las empresas del norte del Perú hacia los mercados internacionales. Seguimos creciendo con propósito.",
    ],
    cover: "/images/event/expo-peru-norte-2026/cover.jpg",
    gallery: [
      "/images/event/expo-peru-norte-2026/01.jpg",
      "/images/event/expo-peru-norte-2026/02.jpg",
    ],
  },
];
