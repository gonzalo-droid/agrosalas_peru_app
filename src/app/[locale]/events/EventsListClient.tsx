"use client";

import type { EventItem } from "@/types";
import { useLanguage } from "@/i18n/LanguageProvider";
import { EventCard } from "@/components/ui/EventCard";

interface Props {
  upcoming: EventItem[];
  past: EventItem[];
}

export function EventsListClient({ upcoming, past }: Props) {
  const { t } = useLanguage();

  if (upcoming.length === 0 && past.length === 0) {
    return (
      <section className="section-padding bg-gray-50">
        <p className="container-section text-center text-gray-500 py-16">
          {t("events.empty")}
        </p>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-section space-y-16">
        {upcoming.length > 0 && (
          <EventGroup title={t("events.upcoming")} events={upcoming} isUpcoming />
        )}
        {past.length > 0 && (
          <EventGroup title={t("events.past")} events={past} isUpcoming={false} />
        )}
      </div>
    </section>
  );
}

function EventGroup({
  title,
  events,
  isUpcoming,
}: {
  title: string;
  events: EventItem[];
  isUpcoming: boolean;
}) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((e) => (
          <EventCard key={e.slug} event={e} isUpcoming={isUpcoming} />
        ))}
      </div>
    </div>
  );
}
