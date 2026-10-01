import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEventBySlug, getEvents } from "@/lib/events";
import { isUpcoming, pickOtherEvents, todayInLima } from "@/lib/eventUtils";
import { EventDetailClient } from "./EventDetailClient";
import { getEventText } from "@/i18n/eventsI18n";
import { resolveLocale } from "@/i18n/server";
import { translate } from "@/i18n/translations";
import { JsonLd } from "@/components/seo/JsonLd";
import { localizedPath } from "@/i18n/config";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

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
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) notFound();

  const today = todayInLima();
  const others = pickOtherEvents(await getEvents(), event.slug, today).map((e) => ({
    event: e,
    isUpcoming: isUpcoming(e, today),
  }));

  const text = getEventText(event, locale);
  const url = (path: string) => absoluteUrl(localizedPath(path, locale));
  const images = [event.cover, ...event.gallery]
    .filter((src) => src.trim())
    .map((src) => absoluteUrl(src));

  // `city` se guarda como "Ciudad, País"; todos los eventos son presenciales.
  const [locality, country] = text.city.split(",").map((part) => part.trim());

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: text.title,
    description: text.summary,
    startDate: event.startDate,
    endDate: event.endDate ?? event.startDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    inLanguage: locale,
    url: url(`/eventos/${event.slug}`),
    ...(images.length > 0 && { image: images }),
    location: {
      "@type": "Place",
      name: text.venue ?? text.city,
      address: {
        "@type": "PostalAddress",
        addressLocality: locality,
        ...(country && { addressCountry: country }),
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: translate(locale, "meta.breadcrumb.home"), item: url("/") },
      { "@type": "ListItem", position: 2, name: translate(locale, "meta.breadcrumb.events"), item: url("/eventos") },
      { "@type": "ListItem", position: 3, name: text.title, item: url(`/eventos/${event.slug}`) },
    ],
  };

  return (
    <>
      <JsonLd data={eventSchema} />
      <JsonLd data={breadcrumbSchema} />
      <EventDetailClient
        event={event}
        isUpcoming={isUpcoming(event, today)}
        others={others}
      />
    </>
  );
}
