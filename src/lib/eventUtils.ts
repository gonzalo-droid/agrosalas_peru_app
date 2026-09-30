import type { EventItem } from "@/types";
import type { Locale } from "@/i18n/translations";

// Solo imports de tipos: este módulo se testea con `node --test` sin resolver alias.

const MONTHS: Record<Locale, string[]> = {
  es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "set", "oct", "nov", "dic"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

export const EVENT_PLACEHOLDER = "/images/products/placeholder.svg";

function parseDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m, d };
}

export function formatEventDate(start: string, end: string | undefined, locale: Locale): string {
  const M = MONTHS[locale];
  const a = parseDate(start);
  const b = end && end !== start ? parseDate(end) : null;

  if (locale === "es") {
    if (!b) return `${a.d} ${M[a.m - 1]} ${a.y}`;
    if (a.y === b.y && a.m === b.m) return `${a.d}–${b.d} ${M[a.m - 1]} ${a.y}`;
    if (a.y === b.y) return `${a.d} ${M[a.m - 1]} – ${b.d} ${M[b.m - 1]} ${a.y}`;
    return `${a.d} ${M[a.m - 1]} ${a.y} – ${b.d} ${M[b.m - 1]} ${b.y}`;
  }

  if (!b) return `${M[a.m - 1]} ${a.d}, ${a.y}`;
  if (a.y === b.y && a.m === b.m) return `${M[a.m - 1]} ${a.d}–${b.d}, ${a.y}`;
  if (a.y === b.y) return `${M[a.m - 1]} ${a.d} – ${M[b.m - 1]} ${b.d}, ${a.y}`;
  return `${M[a.m - 1]} ${a.d}, ${a.y} – ${M[b.m - 1]} ${b.d}, ${b.y}`;
}

export function isUpcoming(
  event: Pick<EventItem, "startDate" | "endDate">,
  today: string,
): boolean {
  return (event.endDate ?? event.startDate) >= today;
}

export function splitEvents(events: EventItem[], today: string) {
  const upcoming = events
    .filter((e) => isUpcoming(e, today))
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
  const past = events
    .filter((e) => !isUpcoming(e, today))
    .sort((a, b) => b.startDate.localeCompare(a.startDate));
  return { upcoming, past };
}

export function pickOtherEvents(
  events: EventItem[],
  currentSlug: string,
  today: string,
  limit = 3,
): EventItem[] {
  const { upcoming, past } = splitEvents(
    events.filter((e) => e.slug !== currentSlug),
    today,
  );
  return [...upcoming, ...past].slice(0, limit);
}

export function todayInLima(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Lima",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function coverOrPlaceholder(src: string): string {
  return src.trim() ? src : EVENT_PLACEHOLDER;
}

export function assertUniqueSlugs(events: EventItem[]): void {
  const seen = new Set<string>();
  for (const e of events) {
    if (seen.has(e.slug)) throw new Error(`Evento con slug duplicado: "${e.slug}"`);
    seen.add(e.slug);
  }
}
