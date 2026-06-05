"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

const WA_LINKS: Record<string, string> = {
  es: "https://wa.me/905600449?text=Hola%2C%20me%20interesa%20obtener%20información%20sobre%20sus%20productos.",
  en: "https://wa.me/905600449?text=Hello%2C%20I%27m%20interested%20in%20learning%20more%20about%20your%20products.",
};

export function WhatsAppButton() {
  const { t, locale } = useLanguage();

  return (
    <Link
      href={WA_LINKS[locale] ?? WA_LINKS.es}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("wa.aria")}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold pl-4 pr-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group"
    >
      <MessageCircle className="w-5 h-5 shrink-0" />
      <span className="text-sm hidden sm:block">{t("wa.help")}</span>
    </Link>
  );
}
