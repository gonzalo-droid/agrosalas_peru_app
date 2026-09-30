import type { Metadata } from "next";
import { HeroSection }      from "@/components/sections/HeroSection";
import { StatsSection }     from "@/components/sections/StatsSection";
import { ProductsPreview }  from "@/components/sections/ProductsPreview";
import { BenefitsSection }  from "@/components/sections/BenefitsSection";
// import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CtaSection }       from "@/components/sections/CtaSection";
import { resolveLocale } from "@/i18n/server";
import { translate } from "@/i18n/translations";
import { pageMetadata } from "@/lib/seo";

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

export default function HomePage() {
  return (
    <>
      <HeroSection />
      {/* <StatsSection /> */}
      <ProductsPreview />
      <BenefitsSection />
      {/* <TestimonialsSection /> */}
      <CtaSection />
    </>
  );
}
