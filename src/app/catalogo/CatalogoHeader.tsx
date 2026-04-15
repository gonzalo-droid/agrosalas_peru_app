"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

export function CatalogoHeader() {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-br from-brand-800 to-brand-700 pt-32 pb-16">
      <div className="container-section text-center">
        <span className="badge bg-white/10 text-brand-100 border border-white/20 mb-4">
          {t("catalog.headerBadge")}
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          {t("catalog.headerTitle")}
        </h1>
        <p className="text-brand-200 max-w-xl mx-auto text-lg">
          {t("catalog.headerDesc")}
        </p>
      </div>
    </div>
  );
}
