import type { Metadata } from "next";
import { AboutClient } from "./AboutClient";
import { resolveLocale } from "@/i18n/server";
import { translate } from "@/i18n/translations";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata({
    locale,
    path: "/about",
    title: translate(locale, "meta.about.title"),
    description: translate(locale, "meta.about.description"),
  });
}

export default function NosotrosPage() {
  return <AboutClient />;
}
