import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogoClient } from "./CatalogoClient";
import { CatalogoHeader } from "./CatalogoHeader";
import { Loader2 } from "lucide-react";
import { resolveLocale } from "@/i18n/server";
import { translate } from "@/i18n/translations";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata({
    locale,
    path: "/catalogo",
    title: translate(locale, "meta.catalog.title"),
    description: translate(locale, "meta.catalog.description"),
  });
}

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
