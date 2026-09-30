import type { Metadata } from "next";
import { getEvents } from "@/lib/events";
import { splitEvents, todayInLima } from "@/lib/eventUtils";
import { EventsHeader } from "./EventsHeader";
import { EventsListClient } from "./EventsListClient";

// Recalcula próximos/pasados una vez al día sin necesidad de un nuevo deploy.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Eventos",
  description:
    "Ferias y encuentros comerciales donde Agrosalas Peru presenta sus conservas de menestras peruanas.",
  alternates: {
    canonical: "https://agrosalasperu.com/eventos",
  },
  openGraph: {
    title: "Eventos | Agrosalas Peru",
    description: "Ferias y encuentros comerciales donde presentamos nuestras conservas.",
    images: [
      { url: "/og", width: 1200, height: 630, alt: "Eventos Agrosalas Peru" },
    ],
  },
};

export default async function EventosPage() {
  const { upcoming, past } = splitEvents(await getEvents(), todayInLima());

  return (
    <>
      <EventsHeader />
      <EventsListClient upcoming={upcoming} past={past} />
    </>
  );
}
