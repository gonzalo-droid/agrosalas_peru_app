import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEventBySlug, getEvents } from "@/lib/events";
import { isUpcoming, pickOtherEvents, todayInLima } from "@/lib/eventUtils";
import { EventDetailClient } from "./EventDetailClient";

const BASE_URL = "https://agrosalasperu.com";

// Actualiza el badge "Próximo" y "Otros eventos" una vez al día.
export const revalidate = 86400;

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return (await getEvents()).map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) return { title: "Evento no encontrado" };

  const url = `${BASE_URL}/eventos/${event.slug}`;
  const images = event.cover.trim()
    ? [{ url: event.cover, alt: event.title }]
    : [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Agrosalas Peru" }];

  return {
    // El template del layout agrega " | Agrosalas Peru".
    title: event.title,
    description: event.summary,
    alternates: { canonical: url },
    openGraph: {
      title: `${event.title} | Agrosalas Peru`,
      description: event.summary,
      url,
      siteName: "Agrosalas Peru",
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${event.title} | Agrosalas Peru`,
      description: event.summary,
      images: images.map((i) => i.url),
    },
  };
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
