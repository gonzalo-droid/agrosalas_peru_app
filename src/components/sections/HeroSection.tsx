"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700" />

      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-brand-600/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-earth-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container-section text-center py-32">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block badge bg-brand-500/30 text-brand-200 border border-brand-400/40 mb-6">
            {t("hero.badge")}
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
            {t("hero.title")}{" "}
            <span className="text-earth-300">{t("hero.titleAccent")}</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t("hero.description")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/catalogo" className="btn-primary text-base px-8 py-4">
              {t("hero.ctaCatalog")}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="btn-outline-white text-base px-8 py-4">
              {t("hero.ctaQuote")}
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#stats"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
        aria-label={t("hero.scroll")}
      >
        <ChevronDown className="w-8 h-8" />
      </a>
    </section>
  );
}
