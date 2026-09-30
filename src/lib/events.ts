import type { EventItem } from "@/types";
import { events } from "@/data/events";
import { assertUniqueSlugs } from "@/lib/eventUtils";

// Único punto que conoce el origen de los eventos. Cuando exista un panel
// administrativo, solo cambia el cuerpo de estas funciones.

export async function getEvents(): Promise<EventItem[]> {
  assertUniqueSlugs(events);
  return events;
}

export async function getEventBySlug(slug: string): Promise<EventItem | undefined> {
  return (await getEvents()).find((e) => e.slug === slug);
}
