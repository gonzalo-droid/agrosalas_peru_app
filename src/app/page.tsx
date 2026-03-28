import type { Metadata } from "next";
import { HeroSection }      from "@/components/sections/HeroSection";
import { StatsSection }     from "@/components/sections/StatsSection";
import { ProductsPreview }  from "@/components/sections/ProductsPreview";
import { BenefitsSection }  from "@/components/sections/BenefitsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CtaSection }       from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "AgroSalas — Agroindustria del Pacífico",
  description:
    "Somos una empresa agroindustrial peruana especializada en enlatados, conservas y congelados con más de 25 años de experiencia y calidad de exportación.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ProductsPreview />
      <BenefitsSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
