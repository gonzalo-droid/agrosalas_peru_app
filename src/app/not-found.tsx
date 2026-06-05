"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <p className="text-8xl mb-6">🌿</p>
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">{t("nf.title")}</h1>
      <p className="text-xl text-gray-500 mb-8">{t("nf.desc")}</p>
      <Link href="/" className="btn-primary">
        {t("nf.back")}
      </Link>
    </div>
  );
}
