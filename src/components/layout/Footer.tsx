"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

const NAV_LINKS = [
  { href: "/",         labelKey: "nav.home"    },
  { href: "/catalogo", labelKey: "nav.catalog" },
  { href: "/about",    labelKey: "nav.about"   },
  { href: "/contact",  labelKey: "nav.contact" },
];

const CATEGORIES = [
  { href: "/catalogo?categoria=conservas", labelKey: "category.conservas" },
];

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-section py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-white/95 rounded-lg flex items-center justify-center transition-colors">
                <Image
                  src="/images/logo.png"
                  alt="Agrosalas Peru"
                  width={140}
                  height={56}
                  className="h-12 w-auto object-contain"
                  priority
                />
              </div>
              <span className="text-xl font-bold text-white">
                Agrosalas<span className="text-brand-400">Peru</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 mb-6">
              {t("footer.tagline")}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 bg-gray-800 hover:bg-brand-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/agrosalasperusrl/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 bg-gray-800 hover:bg-brand-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/agrosalas-per%C3%BA-s-r-l/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 bg-gray-800 hover:bg-brand-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {t("footer.navigation")}
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ href, labelKey }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm hover:text-brand-400 transition-colors"
                  >
                    {t(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {t("footer.products")}
            </h3>
            <ul className="space-y-2">
              {CATEGORIES.map(({ href, labelKey }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm hover:text-brand-400 transition-colors"
                  >
                    {t(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {t("footer.contact")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-brand-400 shrink-0" />
                <span>Camino Rural a Chonto S/N - (Fdo Mi Chelita) SALAS-LAMBAYEQUE-LAMBAYEQUE</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <a href="tel:+905600449" className="hover:text-brand-400 transition-colors">
                  +51 905 600 449
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <a
                  href="mailto:ventas@agrosalasperu.com"
                  className="hover:text-brand-400 transition-colors"
                >
                  ventas@agrosalasperu.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container-section py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>© {year} {t("footer.copyright")}</span>
          <span>{t("footer.madeIn")}</span>
        </div>
      </div>
    </footer>
  );
}
