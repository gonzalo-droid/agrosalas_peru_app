import type { Metadata } from "next";
import { HeroSection }      from "@/components/sections/HeroSection";
import { StatsSection }     from "@/components/sections/StatsSection";
import { ProductsPreview }  from "@/components/sections/ProductsPreview";
import { BenefitsSection }  from "@/components/sections/BenefitsSection";
// import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CtaSection }       from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Agrosalas Peru — Menestras peruanas en conserva para exportación",
  description:
    "Empresa agroindustrial peruana que exporta menestras en conserva —frijol castilla, canario, rojo y negro, pallar, gandul y garbanzo— con más de 4 años de experiencia y calidad de exportación.",
  alternates: {
    canonical: "https://agrosalasperu.com",
  },
};

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
