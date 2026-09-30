import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEventBySlug, getEvents } from "@/lib/events";
import { isUpcoming, pickOtherEvents, todayInLima } from "@/lib/eventUtils";
import { EventDetailClient } from "./EventDetailClient";
import { getEventText } from "@/i18n/eventsI18n";
import { resolveLocale } from "@/i18n/server";
import { translate } from "@/i18n/translations";
import { pageMetadata } from "@/lib/seo";

// Actualiza el badge "Próximo" y "Otros eventos" una vez al día.
export const revalidate = 86400;

interface Params {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return (await getEvents()).map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) return { title: translate(locale, "meta.eventNotFound") };

  const text = getEventText(event, locale);

  return pageMetadata({
    locale,
    path: `/eventos/${event.slug}`,
    title: text.title,
    description: text.summary,
    images: event.cover.trim() ? [{ url: event.cover, alt: text.title }] : undefined,
  });
}

export default async function EventDetailPage({ params }: Params) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) notFound();

  const today = todayInLima();
  const others = pickOtherEvents(await getEvents(), event.slug, today).map((e) => ({
    event: e,
    isUpcoming: isUpcoming(e, today),
  }));

  return (
    <EventDetailClient
      event={event}
      isUpcoming={isUpcoming(event, today)}
      others={others}
    />
  );
}
