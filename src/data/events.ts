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
    slug: "expoalimentaria-2026",
    title: "Expoalimentaria 2026",
    startDate: "2026-08-24",
    endDate: "2026-08-26",
    city: "Lima, Perú",
    summary:
      "Presentamos nuestra línea de conservas ALBA en Expoalimentaria 2026, en Lima, como parte del stand del Gobierno Regional de Lambayeque, y conectamos con compradores y distribuidores nacionales e internacionales.",
    body: [
      "Del 24 al 26 de agosto de 2026 participamos en Expoalimentaria 2026, la feria internacional de alimentos y bebidas organizada por ADEX en Lima y considerada una de las vitrinas más importantes de Latinoamérica para la agroexportación.",
      "Estuvimos presentes en el stand del Gobierno Regional de Lambayeque, junto a otras empresas de la región. Agradecemos al Gobierno Regional por su respaldo y por llevar la oferta del norte del Perú a una vitrina internacional.",
      "Exhibimos nuestra línea ALBA —«¡Naturalmente saludable! ¡Hecho con amor!»—, con frijol negro, frijol rojo, gandul verde con coco, pallar y garbanzo en conserva. Durante los tres días recibimos a visitantes que conocieron de cerca nuestros productos, su presentación y su calidad de exportación.",
      "La feria nos permitió conversar con compradores, distribuidores e importadores interesados en las menestras peruanas en conserva, intercambiar contactos y abrir conversaciones comerciales a las que daremos seguimiento. Si nos visitaste en Expoalimentaria, escríbenos: será un gusto continuar la conversación.",
    ],
    cover: "/images/event/expoalimentaria-2026/cover.jpg",
    gallery: [
      "/images/event/expoalimentaria-2026/01.jpg",
      "/images/event/expoalimentaria-2026/02.jpg",
      "/images/event/expoalimentaria-2026/03.jpg",
      "/images/event/expoalimentaria-2026/04.jpg",
      "/images/event/expoalimentaria-2026/05.jpg",
    ],
  },
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
