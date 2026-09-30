"use client";

import { createContext, useContext, useMemo } from "react";
import { localizedPath, type Locale } from "./config";
import { translate } from "./translations";

type Ctx = {
  locale: Locale;
  t: (key: string) => string;
  /** Ruta interna ("/catalogo") → ruta pública en el idioma actual ("/en/catalogo"). */
  href: (path: string) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const value = useMemo<Ctx>(
    () => ({
      locale,
      t: (key) => translate(locale, key),
      href: (path) => localizedPath(path, locale),
    }),
    [locale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
