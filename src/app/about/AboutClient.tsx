"use client";

import { Target, Eye, Heart, Users } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

const VALUES = [
  { icon: Heart,  titleKey: "value.quality.title",      descKey: "value.quality.desc"      },
  { icon: Users,  titleKey: "value.people.title",       descKey: "value.people.desc"       },
  { icon: Target, titleKey: "value.innovation.title",   descKey: "value.innovation.desc"   },
  { icon: Eye,    titleKey: "value.transparency.title", descKey: "value.transparency.desc" },
];

export function AboutClient() {
  const { t } = useLanguage();

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-br from-brand-800 to-brand-700 pt-32 pb-20">
        <div className="container-section text-center">
          <span className="badge bg-white/10 text-brand-100 border border-white/20 mb-4">
            {t("about.headerBadge")}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            {t("about.headerTitle")}
          </h1>
          <p className="text-brand-200 max-w-2xl mx-auto text-lg">
            {t("about.headerDesc")}
          </p>
        </div>
      </div>

      {/* Misión y Visión */}
      <section className="section-padding bg-white">
        <div className="container-section grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-brand-50 rounded-3xl p-10 border border-brand-100">
            <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
              {t("about.missionTitle")}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {t("about.missionDesc")}
            </p>
          </div>

          <div className="bg-earth-50 rounded-3xl p-10 border border-earth-100">
            <div className="w-12 h-12 bg-earth-600 rounded-2xl flex items-center justify-center mb-6">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
              {t("about.visionTitle")}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {t("about.visionDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="section-padding bg-gray-50">
        <div className="container-section">
          <div className="text-center mb-14">
            <span className="badge bg-brand-100 text-brand-700 mb-3">
              {t("about.valuesBadge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              {t("about.valuesTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VALUES.map(({ icon: Icon, titleKey, descKey }) => (
              <div
                key={titleKey}
                className="flex gap-5 p-7 bg-white rounded-2xl border border-gray-100 hover:border-brand-200 hover:shadow-md transition-all"
              >
                <div className="shrink-0 w-12 h-12 bg-brand-100 text-brand-700 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{t(titleKey)}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{t(descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
