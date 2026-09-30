"use client";

import Image from "next/image";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { Calendar, MapPin } from "lucide-react";
import type { EventItem } from "@/types";
import { useLanguage } from "@/i18n/LanguageProvider";
import { getEventText } from "@/i18n/eventsI18n";
import { coverOrPlaceholder, formatEventDate } from "@/lib/eventUtils";

interface Props {
  event: EventItem;
  isUpcoming: boolean;
}

export function EventCard({ event, isUpcoming }: Props) {
  const { t, locale } = useLanguage();
  const text = getEventText(event, locale);

  return (
    <LocaleLink
      href={`/eventos/${event.slug}`}
      className="card group flex flex-col focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
    >
      <div className="relative aspect-[4/3] bg-gradient-to-br from-brand-50 to-brand-100 overflow-hidden">
        <Image
          src={coverOrPlaceholder(event.cover)}
          alt={text.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {isUpcoming && (
          <span className="badge bg-earth-100 text-earth-800 absolute top-3 left-3">
            {t("events.upcomingBadge")}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col gap-2 flex-1">
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
}
