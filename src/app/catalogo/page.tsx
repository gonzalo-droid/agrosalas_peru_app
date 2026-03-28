import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogoClient } from "./CatalogoClient";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Catálogo de productos",
  description:
    "Explora nuestro catálogo completo de enlatados, conservas y congelados peruanos con calidad de exportación.",
  openGraph: {
    title: "Catálogo | AgroSalas",
    description:
      "Enlatados, conservas y congelados del mar y el campo peruano.",
  },
};

export default function CatalogoPage() {
  return (
    <>
      {/* Page header */}
      <div className="bg-gradient-to-br from-brand-800 to-brand-700 pt-32 pb-16">
        <div className="container-section text-center">
          <span className="badge bg-white/10 text-brand-100 border border-white/20 mb-4">
            Catálogo 2025
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Nuestros productos
          </h1>
          <p className="text-brand-200 max-w-xl mx-auto text-lg">
            Enlatados, conservas y congelados con calidad de exportación,
            directamente del mar y el campo peruano.
          </p>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="flex justify-center items-center py-32">
            <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
          </div>
        }
      >
        <CatalogoClient />
      </Suspense>
    </>
  );
}
