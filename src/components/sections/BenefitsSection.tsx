"use client";

import { ShieldCheck, Leaf, Globe2, Award, Truck, HeartHandshake } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

const BENEFITS = [
  { icon: ShieldCheck,    titleKey: "benefit.quality.title",        descKey: "benefit.quality.desc"        },
  { icon: Leaf,           titleKey: "benefit.sustainability.title", descKey: "benefit.sustainability.desc" },
  { icon: Globe2,         titleKey: "benefit.global.title",         descKey: "benefit.global.desc"         },
  { icon: Award,          titleKey: "benefit.experience.title",     descKey: "benefit.experience.desc"     },
  { icon: Truck,          titleKey: "benefit.logistics.title",      descKey: "benefit.logistics.desc"      },
  { icon: HeartHandshake, titleKey: "benefit.support.title",        descKey: "benefit.support.desc"        },
];

export function BenefitsSection() {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-white">
      <div className="container-section">
        <div className="text-center mb-14">
          <span className="badge bg-brand-100 text-brand-700 mb-3">
            {t("benefits.badge")}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            {t("benefits.title")}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            {t("benefits.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {BENEFITS.map(({ icon: Icon, titleKey, descKey }) => (
            <div
              key={titleKey}
              className="flex gap-5 p-6 rounded-2xl border border-gray-100 hover:border-brand-200 hover:bg-brand-50/50 transition-all duration-200"
            >
              <div className="shrink-0 w-12 h-12 bg-brand-100 text-brand-700 rounded-xl flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{t(titleKey)}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{t(descKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
