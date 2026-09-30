import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogoClient } from "./CatalogoClient";
import { CatalogoHeader } from "./CatalogoHeader";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Catálogo de productos",
  description:
    "Catálogo de menestras peruanas en conserva: frijol castilla (blackeye beans), frijol canario, rojo y negro, pallar, gandul, garbanzo y más, con calidad de exportación.",
  alternates: {
    canonical: "https://agrosalasperu.com/catalogo",
  },
  openGraph: {
    title: "Catálogo | Agrosalas Peru",
    description:
      "Menestras peruanas en conserva con calidad de exportación: frijoles, pallares, gandul y garbanzo.",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "Catálogo Agrosalas Peru",
      },
    ],
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
