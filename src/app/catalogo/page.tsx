import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogoClient } from "./CatalogoClient";
import { CatalogoHeader } from "./CatalogoHeader";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Catálogo de productos",
  description:
    "Explora nuestro catálogo completo de enlatados, conservas y congelados peruanos con calidad de exportación.",
  openGraph: {
    title: "Catálogo | Agrosalas Peru",
    description:
      "Enlatados, conservas y congelados del mar y el campo peruano.",
  },
};

export default function CatalogoPage() {
  return (
    <>
      <CatalogoHeader />

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
