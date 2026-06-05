"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

interface Props {
  scrolled?: boolean;
  variant?: "desktop" | "mobile";
}

const FLAGS: Record<"es" | "en", string> = {
  es: "🇪🇸",
  en: "🇺🇸",
};

export function LanguageSwitcher({ scrolled = true, variant = "desktop" }: Props) {
  const { locale, setLocale, t } = useLanguage();

  if (variant === "mobile") {
    return (
      <div className="flex items-center gap-2 px-4 py-3">
        <Globe className="w-4 h-4 text-gray-500" />
        <div className="flex gap-1">
          {(["es", "en"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLocale(l)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                locale === l
                  ? "bg-brand-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-brand-50 hover:text-brand-700"
              }`}
              aria-label={`${t("nav.language")}: ${t(`lang.${l}`)}`}
            >
              <span className="text-sm leading-none">{FLAGS[l]}</span>
              {t(`lang.${l}`)}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center rounded-lg border overflow-hidden text-xs font-semibold ${
        scrolled
          ? "border-gray-200 bg-white/60"
          : "border-white/30 bg-white/10 backdrop-blur-sm"
      }`}
    >
      {(["es", "en"] as const).map((l) => {
        const active = locale === l;
        return (
          <button
            key={l}
            onClick={() => setLocale(l)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 transition-colors ${
              active
                ? "bg-brand-600 text-white"
                : scrolled
                  ? "text-gray-600 hover:text-brand-700 hover:bg-brand-50"
                  : "text-white/90 hover:text-white hover:bg-white/15"
            }`}
            aria-label={`${t("nav.language")}: ${t(`lang.${l}`)}`}
          >
            <span className="text-sm leading-none">{FLAGS[l]}</span>
            {t(`lang.${l}`)}
          </button>
        );
      })}
    </div>
  );
}
