"use client";

import { ArrowRight } from "lucide-react";
import type { EventItem } from "@/types";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { EventCard } from "@/components/ui/EventCard";
import { useLanguage } from "@/i18n/LanguageProvider";

interface Props {
  events: EventItem[];
  /** Slugs de los eventos próximos; se calcula en el servidor (hora de Lima). */
  upcomingSlugs: string[];
}

export function EventsPreview({ events, upcomingSlugs }: Props) {
  const { t } = useLanguage();
  if (events.length === 0) return null;

  return (
    <section className="section-padding bg-white">
      <div className="container-section">
        <div className="text-center mb-12">
          <span className="badge bg-brand-100 text-brand-700 mb-3">
            {t("events.homeBadge")}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            {t("events.homeTitle")}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">{t("events.homeDesc")}</p>
        </div>

        {/* Flex centrado: con 1 o 2 eventos la fila no queda cargada a un lado. */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {events.map((event) => (
            <div
              key={event.slug}
              className="flex w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              <EventCard event={event} isUpcoming={upcomingSlugs.includes(event.slug)} />
            </div>
          ))}
        </div>

        <div className="text-center">
          <LocaleLink href="/events" className="btn-primary">
            {t("events.viewAll")}
            <ArrowRight className="w-4 h-4" />
          </LocaleLink>
        </div>
      </div>
    </section>
  );
}
