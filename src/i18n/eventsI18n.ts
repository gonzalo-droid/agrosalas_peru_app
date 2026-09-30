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
const EN: Record<string, EventText> = {
  "ejemplo-feria-proxima": {
    title: "International food fair (sample)",
    summary: "Sample event to validate the events section. Replace with a real event.",
    body: [
      "This is a sample paragraph describing Agrosalas Peru's participation in the fair: which products were showcased, which markets it targets and who the sales team met.",
      "A second paragraph checks that the stacked layout handles long text without becoming unbalanced: the cover stays on top, the event details below and the text at reading width.",
      "The third paragraph completes the long-text test. When replacing this data with a real event, keep between two and five paragraphs.",
    ],
    city: "Lima, Peru",
    venue: "Exhibition center (sample)",
  },
  "ejemplo-feria-pasada": {
    title: "Export business roundtable (sample)",
    summary: "Sample past event, without a gallery, to validate the past participations section.",
    body: [
      "Sample paragraph for a past event. This event has no gallery, so the photo section must not be displayed.",
    ],
    city: "Barcelona, Spain",
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
