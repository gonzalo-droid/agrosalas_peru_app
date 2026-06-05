"use client";

import { Suspense } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { useLanguage } from "@/i18n/LanguageProvider";

const CONTACT_INFO = [
  {
    icon: Phone,
    labelKey: "contact.phoneLabel",
    value: "+51 905 600 449",
    href: "tel:+905600449",
  },
  {
    icon: Mail,
    labelKey: "contact.emailLabel",
    value: "ventas@agrosalasperu.com",
    href: "mailto:ventas@agrosalasperu.com",
  },
  {
    icon: MapPin,
    labelKey: "contact.addressLabel",
    value: "Camino Rural a Chonto S/N - (Fdo Mi Chelita) SALAS-LAMBAYEQUE-LAMBAYEQUE",
    href: "https://maps.app.goo.gl/k7ijGFZQdVBH3VYA9",
  },
  {
    icon: Clock,
    labelKey: "contact.hoursLabel",
    valueKey: "contact.hoursValue",
    href: null,
  },
];

export function ContactPageClient() {
  const { t } = useLanguage();

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-br from-brand-800 to-brand-700 pt-32 pb-20">
        <div className="container-section text-center">
          <span className="badge bg-white/10 text-brand-100 border border-white/20 mb-4">
            {t("contact.headerBadge")}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            {t("contact.headerTitle")}
          </h1>
          <p className="text-brand-200 max-w-xl mx-auto text-lg">
            {t("contact.headerDesc")}
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="section-padding bg-gray-50">
        <div className="container-section">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact info */}
            <div className="lg:col-span-1 space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {t("contact.infoTitle")}
              </h2>

              {CONTACT_INFO.map(({ icon: Icon, labelKey, value, valueKey, href }) => {
                const displayValue = valueKey ? t(valueKey) : value;
                return (
                  <div
                    key={labelKey}
                    className="flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm"
                  >
                    <div className="shrink-0 w-11 h-11 bg-brand-100 text-brand-700 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium mb-0.5">
                        {t(labelKey)}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-gray-800 hover:text-brand-600 transition-colors"
                        >
                          {displayValue}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-gray-800">
                          {displayValue}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/905600449?text=Hola%2C%20me%20interesa%20información%20sobre%20sus%20productos."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-5 bg-[#25D366] text-white rounded-2xl font-semibold hover:bg-[#20ba59] transition-colors"
              >
                <span className="text-2xl">💬</span>
                <div>
                  <p className="text-sm font-bold">{t("contact.waTitle")}</p>
                  <p className="text-xs text-white/80">{t("contact.waSubtitle")}</p>
                </div>
              </a>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  {t("contact.formTitle")}
                </h2>
                <Suspense fallback={null}>
                  <ContactForm />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
