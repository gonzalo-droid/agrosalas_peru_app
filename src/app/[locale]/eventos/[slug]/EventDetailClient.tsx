"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import type { EventItem } from "@/types";
import { useLanguage } from "@/i18n/LanguageProvider";
import { getEventText } from "@/i18n/eventsI18n";
import { coverOrPlaceholder, formatEventDate } from "@/lib/eventUtils";
import { ShareButton } from "@/components/ui/ShareButton";
import { EventCard } from "@/components/ui/EventCard";
import { Lightbox } from "@/components/ui/Lightbox";

interface Props {
  event: EventItem;
  isUpcoming: boolean;
  others: { event: EventItem; isUpcoming: boolean }[];
}

export function EventDetailClient({ event, isUpcoming, others }: Props) {
  const { t, locale } = useLanguage();
  const text = getEventText(event, locale);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const openerIndex = useRef<number | null>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const photoAlt = useCallback(
    (i: number) => `${text.title} — ${t("events.photo")} ${i + 1}`,
    [text.title, t],
  );

  const openLightbox = (i: number) => {
    openerIndex.current = i;
    setLightboxIndex(i);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    const i = openerIndex.current;
    if (i !== null) thumbRefs.current[i]?.focus();
  }, []);

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-br from-brand-800 to-brand-700 pt-32 pb-12">
        <div className="container-section">
          <Link
            href="/eventos"
            className="inline-flex items-center gap-2 text-brand-100 hover:text-white text-sm font-medium mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("events.back")}
          </Link>
          {isUpcoming && (
            <span className="badge bg-earth-100 text-earth-800 mb-3 block w-fit">
              {t("events.upcomingBadge")}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">{text.title}</h1>
        </div>
      </div>

      <section className="section-padding bg-gray-50">
        <div className="container-section">
          {/* Banner */}
          <div className="relative aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden bg-gradient-to-br from-brand-50 to-brand-100 shadow-md">
            <Image
              src={coverOrPlaceholder(event.cover)}
              alt={text.title}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
              priority
            />
          </div>

          {/* Meta */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <MetaCard icon={<Calendar className="w-5 h-5" />} label={t("events.date")}>
              {formatEventDate(event.startDate, event.endDate, locale)}
            </MetaCard>
            <MetaCard icon={<MapPin className="w-5 h-5" />} label={t("events.place")}>
              {text.city}
              {text.venue && (
                <span className="block font-normal text-gray-500">{text.venue}</span>
              )}
            </MetaCard>
            <ShareButton
              title={text.title}
              text={text.summary}
              className="btn-secondary justify-center sm:ml-auto"
            />
          </div>

          {/* Texto */}
          <div className="mt-10 max-w-3xl">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              {text.summary}
            </p>
            <div className="space-y-4">
              {text.body.map((paragraph, i) => (
                <p key={i} className="text-gray-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Galería */}
          {event.gallery.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6">
                {t("events.gallery")}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {event.gallery.map((src, i) => (
                  <button
                    key={`${src}-${i}`}
                    ref={(el) => {
                      thumbRefs.current[i] = el;
                    }}
                    type="button"
                    onClick={() => openLightbox(i)}
                    aria-label={photoAlt(i)}
                    className="group relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-brand-50 to-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                  >
                    <Image
                      src={src}
                      alt={photoAlt(i)}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Otros eventos */}
          {others.length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8">
                {t("events.others")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {others.map((o) => (
                  <EventCard key={o.event.slug} event={o.event} isUpcoming={o.isUpcoming} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Lightbox
        images={event.gallery}
        index={lightboxIndex}
        onClose={closeLightbox}
        onIndexChange={setLightboxIndex}
        alt={photoAlt}
      />
    </>
  );
}

function MetaCard({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm sm:min-w-56">
      <div className="shrink-0 w-11 h-11 bg-brand-100 text-brand-700 rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-400 font-medium mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-gray-800">{children}</p>
      </div>
    </div>
  );
}
