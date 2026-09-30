import type { EventItem } from "@/types";

// PLACEHOLDER — reemplazar por eventos reales antes de publicar.
// Imágenes de cada evento: public/images/event/<slug>/cover.jpg y 01.jpg, 02.jpg, …
// No importar este archivo desde páginas o componentes: usar src/lib/events.ts.

const PLACEHOLDER_IMG = "/images/products/placeholder.svg";

export const events: EventItem[] = [
  {
    slug: "ejemplo-feria-proxima",
    title: "Feria internacional de alimentos (ejemplo)",
    startDate: "2027-04-14",
    endDate: "2027-04-16",
    city: "Lima, Perú",
    venue: "Centro de exposiciones (ejemplo)",
    summary:
      "Evento de ejemplo para validar la sección de eventos. Reemplazar por un evento real.",
    body: [
      "Este es un párrafo de ejemplo que describe la participación de Agrosalas Peru en la feria: qué productos se presentaron, a qué mercados apunta y con quiénes se reunió el equipo comercial.",
      "Un segundo párrafo sirve para comprobar que el layout apilado soporta textos largos sin desbalancearse: la portada queda arriba, los datos del evento debajo y el texto a ancho de lectura.",
      "El tercer párrafo completa la prueba de texto extenso. Al reemplazar esta data por un evento real, conviene mantener entre dos y cinco párrafos.",
    ],
    cover: "",
    gallery: [PLACEHOLDER_IMG, PLACEHOLDER_IMG, PLACEHOLDER_IMG, PLACEHOLDER_IMG],
  },
  {
    slug: "ejemplo-feria-pasada",
    title: "Rueda de negocios de exportación (ejemplo)",
    startDate: "2026-03-30",
    endDate: "2026-04-02",
    city: "Barcelona, España",
    summary:
      "Evento pasado de ejemplo, sin galería, para validar la sección de participaciones.",
    body: [
      "Párrafo de ejemplo para un evento pasado. Este evento no tiene galería, así que la sección de fotos no debe mostrarse.",
    ],
    cover: "",
    gallery: [],
  },
];
