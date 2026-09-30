import type { Metadata } from "next";
import { ContactPageClient } from "./ContactPageClient";
import { resolveLocale } from "@/i18n/server";
import { translate } from "@/i18n/translations";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata({
    locale,
    path: "/contact",
    title: translate(locale, "meta.contact.title"),
    description: translate(locale, "meta.contact.description"),
  });
}

export default function ContactoPage() {
  return <ContactPageClient />;
}
