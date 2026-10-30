"use client";

import Image from "next/image";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import type { EventItem } from "@/types";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { useLanguage } from "@/i18n/LanguageProvider";
import { getEventText } from "@/i18n/eventsI18n";
import { coverOrPlaceholder, formatEventDate } from "@/lib/eventUtils";

interface Props {
  events: EventItem[];
  /** Slugs de los eventos próximos; se calcula en el servidor (hora de Lima). */
  upcomingSlugs: string[];
}

export function EventsPreview({ events, upcomingSlugs }: Props) {
  const { t, locale } = useLanguage();
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

        {/* Tarjetas horizontales centradas: con 1 o 2 eventos la fila no queda cargada a un lado. */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {events.map((event) => {
            const text = getEventText(event, locale);
            const upcoming = upcomingSlugs.includes(event.slug);
            return (
              <LocaleLink
                key={event.slug}
                href={`/events/${event.slug}`}
                className="card group flex w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
              >
                <div className="relative w-2/5 shrink-0 min-h-[9rem] bg-gradient-to-br from-brand-50 to-brand-100 overflow-hidden">
                  <Image
                    src={coverOrPlaceholder(event.cover)}
                    alt={text.title}
                    fill
                    sizes="(max-width: 640px) 40vw, (max-width: 1024px) 20vw, 15vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="p-5 flex flex-col justify-center gap-2 min-w-0">
                  {upcoming && (
                    <span className="badge bg-earth-100 text-earth-800 self-start">
                      {t("events.upcomingBadge")}
                    </span>
                  )}
                  <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-brand-700 transition-colors">
                    {text.title}
                  </h3>
                  <p className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4 text-brand-600 shrink-0" />
                    {formatEventDate(event.startDate, event.endDate, locale)}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
                    {text.city}
                  </p>
                </div>
              </LocaleLink>
            );
          })}
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
