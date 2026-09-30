"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { localizedPath, stripLocale, type Locale } from "@/i18n/config";
import { dismissHint, isHintDismissed, readPreference, savePreference } from "@/i18n/preference";

// Escrito en el idioma sugerido: es el que el visitante entiende.
const COPY: Record<Locale, { text: string; close: string }> = {
  en: { text: "View this page in English", close: "Close" },
  es: { text: "Ver esta página en español", close: "Cerrar" },
};

function browserLocale(): Locale {
  return navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
}

/** Sugiere el otro idioma sin redirigir. Solo en cliente: no aparece en el HTML indexado. */
export function LanguageSuggestion() {
  const { locale } = useLanguage();
  const pathname = usePathname();
  const [suggested, setSuggested] = useState<Locale | null>(null);

  useEffect(() => {
    if (isHintDismissed()) {
      setSuggested(null);
      return;
    }
    const preferred = readPreference() ?? browserLocale();
    setSuggested(preferred === locale ? null : preferred);
  }, [locale]);

  if (!suggested) return null;

  const copy = COPY[suggested];

  return (
    <div
      role="region"
      aria-label={copy.text}
      className="fixed z-40 bottom-24 left-4 right-4 sm:bottom-6 sm:right-auto sm:max-w-xs card flex items-center gap-3 px-4 py-3 shadow-lg animate-fade-in"
    >
      <Globe className="w-4 h-4 text-brand-600 shrink-0" aria-hidden="true" />
      <Link
        href={localizedPath(stripLocale(pathname), suggested)}
        hrefLang={suggested}
        lang={suggested}
        onClick={() => savePreference(suggested)}
        className="flex-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
      >
        {copy.text} →
      </Link>
      <button
        type="button"
        onClick={() => {
          dismissHint();
          setSuggested(null);
        }}
        aria-label={copy.close}
        className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
