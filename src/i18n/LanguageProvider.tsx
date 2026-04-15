"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { translations, type Locale } from "./translations";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "agrosalas_locale";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    const saved = typeof window !== "undefined"
      ? (localStorage.getItem(STORAGE_KEY) as Locale | null)
      : null;
    if (saved === "es" || saved === "en") {
      setLocaleState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.lang = l;
    }
  }, []);

  const t = useCallback(
    (key: string) => translations[locale][key] ?? translations.es[key] ?? key,
    [locale],
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
