import type { EventItem } from "@/types";
import type { Locale } from "./translations";

export type EventText = {
  title: string;
  summary: string;
  body: string[];
  city: string;
  venue?: string;
};

// Indexado por slug. Si falta un evento, se muestra el texto en español.
// Ejemplo de entrada:
//   "expoalimentaria-2026": {
//     title: "Expoalimentaria 2026",
//     summary: "One or two sentences.",
//     body: ["Paragraph 1.", "Paragraph 2."],
//     city: "Lima, Peru",
//     venue: "Jockey Exhibition Center",
//   },
const EN: Record<string, EventText> = {};

export function getEventText(event: EventItem, locale: Locale): EventText {
  if (locale === "en" && EN[event.slug]) return EN[event.slug];
  return {
    title: event.title,
    summary: event.summary,
    body: event.body,
    city: event.city,
    venue: event.venue,
  };
}
