"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { localizedPath, locales, stripLocale, type Locale } from "@/i18n/config";
import { savePreference } from "@/i18n/preference";

interface Props {
  scrolled?: boolean;
  variant?: "desktop" | "mobile";
}

const FLAGS: Record<Locale, string> = {
  es: "🇪🇸",
  en: "🇺🇸",
};

export function LanguageSwitcher({ scrolled = true, variant = "desktop" }: Props) {
  const { locale, t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const base = stripLocale(pathname);

  // <a href> real para crawlers y "abrir en pestaña nueva"; clic normal navega conservando ?query.
  const onSelect = (e: MouseEvent<HTMLAnchorElement>, l: Locale) => {
    savePreference(l);
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    if (l !== locale) router.push(localizedPath(base, l) + window.location.search);
  };

  if (variant === "mobile") {
    return (
      <div className="flex items-center gap-2 px-4 py-3">
        <Globe className="w-4 h-4 text-gray-500" />
        <div className="flex gap-1">
          {locales.map((l) => (
            <Link
              key={l}
              href={localizedPath(base, l)}
              hrefLang={l}
              onClick={(e) => onSelect(e, l)}
              aria-current={locale === l ? "true" : undefined}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                locale === l
                  ? "bg-brand-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-brand-50 hover:text-brand-700"
              }`}
              aria-label={`${t("nav.language")}: ${t(`lang.${l}`)}`}
            >
              <span className="text-sm leading-none">{FLAGS[l]}</span>
              {t(`lang.${l}`)}
            </Link>
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
      {locales.map((l) => {
        const active = locale === l;
        return (
          <Link
            key={l}
            href={localizedPath(base, l)}
            hrefLang={l}
            onClick={(e) => onSelect(e, l)}
            aria-current={active ? "true" : undefined}
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
          </Link>
        );
      })}
    </div>
  );
}
