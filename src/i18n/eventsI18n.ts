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
const EN: Record<string, EventText> = {
  "expoalimentaria-2026": {
    title: "Expoalimentaria 2026",
    summary:
      "We showcased our ALBA canned line at Expoalimentaria 2026 in Lima, as part of the Lambayeque Regional Government stand, and connected with domestic and international buyers and distributors.",
    body: [
      "From September 23 to 25, 2026, we took part in Expoalimentaria 2026, the international food and beverage fair organized by ADEX in Lima and regarded as one of Latin America's leading showcases for agricultural exports.",
      "We exhibited at the Lambayeque Regional Government stand, alongside other companies from the region. We thank the Regional Government for its support and for bringing the offer of northern Peru to an international showcase.",
      "We presented our ALBA line — \"Naturally healthy! Made with love!\" — featuring canned black beans, red beans, green pigeon peas with coconut, lima beans and chickpeas. Over the three days, visitors got a close look at our products, their packaging and their export-grade quality.",
      "The fair gave us the chance to talk with buyers, distributors and importers interested in Peruvian canned legumes, exchange contacts and open business conversations that we will follow up on. If you visited us at Expoalimentaria, write to us — we'd be glad to continue the conversation.",
    ],
    city: "Lima, Peru",
  },
  "expo-peru-norte-2026": {
    title: "Expo Perú Norte 2026",
    summary:
      "We took part in the Expo Perú Norte 2026 Business Roundtable, organized by PromPerú in Chiclayo, to present our Peruvian canned legumes and open new business opportunities.",
    body: [
      "On March 26, 2026, we took part in the Expo Perú Norte 2026 Business Roundtable, held in Chiclayo and organized by PromPerú with the support of Peru's Ministry of Foreign Trade and Tourism.",
      "Throughout the day we met with buyers and industry companies, presenting our Peruvian canned legumes and our value proposition: export-grade quality, food safety and food innovation. It was a key opportunity to open strategic conversations and expand our network of business contacts.",
      "We thank PromPerú for organizing the event and for creating spaces that help companies from northern Peru reach international markets. We keep growing with purpose.",
    ],
    city: "Chiclayo, Peru",
  },
};

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
