import type { Metadata } from "next";
import { HeroSection }      from "@/components/sections/HeroSection";
import { StatsSection }     from "@/components/sections/StatsSection";
import { ProductsPreview }  from "@/components/sections/ProductsPreview";
import { BenefitsSection }  from "@/components/sections/BenefitsSection";
import { EventsPreview }    from "@/components/sections/EventsPreview";
// import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CtaSection }       from "@/components/sections/CtaSection";
import { resolveLocale } from "@/i18n/server";
import { translate } from "@/i18n/translations";
import { pageMetadata } from "@/lib/seo";
import { getEvents } from "@/lib/events";
import { splitEvents, todayInLima } from "@/lib/eventUtils";

// Recalcula qué eventos son próximos una vez al día, como /events.
export const revalidate = 86400;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata({
    locale,
    path: "/",
    title: translate(locale, "meta.default.title"),
    description: translate(locale, "meta.home.description"),
    absoluteTitle: true,
  });
}

export default async function HomePage() {
  // Próximos primero, luego los más recientes; máximo 3 tarjetas.
  const { upcoming, past } = splitEvents(await getEvents(), todayInLima());
  const homeEvents = [...upcoming, ...past].slice(0, 3);

  return (
    <>
      <HeroSection />
      {/* <StatsSection /> */}
      <ProductsPreview />
      <BenefitsSection />
      <EventsPreview
        events={homeEvents}
        upcomingSlugs={upcoming.map((e) => e.slug)}
      />
      {/* <TestimonialsSection /> */}
      <CtaSection />
    </>
  );
}
