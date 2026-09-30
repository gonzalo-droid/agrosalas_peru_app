import type { Metadata } from "next";
import { getEvents } from "@/lib/events";
import { splitEvents, todayInLima } from "@/lib/eventUtils";
import { EventsHeader } from "./EventsHeader";
import { EventsListClient } from "./EventsListClient";
import { resolveLocale } from "@/i18n/server";
import { translate } from "@/i18n/translations";
import { pageMetadata } from "@/lib/seo";

// Recalcula próximos/pasados una vez al día sin necesidad de un nuevo deploy.
export const revalidate = 86400;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata({
    locale,
    path: "/eventos",
    title: translate(locale, "meta.events.title"),
    description: translate(locale, "meta.events.description"),
  });
}

export default async function EventosPage() {
  const { upcoming, past } = splitEvents(await getEvents(), todayInLima());

  return (
    <>
      <EventsHeader />
      <EventsListClient upcoming={upcoming} past={past} />
    </>
  );
}
