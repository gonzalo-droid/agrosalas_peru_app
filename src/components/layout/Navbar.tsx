"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

const NAV_LINKS = [
  { href: "/", labelKey: "nav.home" },
  { href: "/catalogo", labelKey: "nav.catalog" },
  { href: "/about", labelKey: "nav.about" },
  { href: "/contact", labelKey: "nav.contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="container-section h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
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
          <span
            className={`text-xl font-bold transition-colors ${
              scrolled ? "text-gray-900" : "text-white drop-shadow"
            }`}
          >
            Agrosalas<span className="text-brand-500">Peru</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, labelKey }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-brand-600 text-white"
                      : scrolled
                        ? "text-gray-700 hover:text-brand-600 hover:bg-brand-50"
                        : "text-white/90 hover:text-white hover:bg-white/15"
                  }`}
                >
                  {t(labelKey)}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side — Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher scrolled={scrolled} />
          <Link href="/contact" className="btn-primary text-sm py-2">
            {t("nav.quote")}
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher scrolled={scrolled} />
          <button
            onClick={() => setOpen(!open)}
            aria-label={t("nav.menu")}
            className={`p-2 rounded-lg transition-colors ${
              scrolled
                ? "text-gray-700 hover:bg-gray-100"
                : "text-white hover:bg-white/15"
            }`}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-fade-in">
          <ul className="container-section py-4 flex flex-col gap-1">
            {NAV_LINKS.map(({ href, labelKey }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                      active
                        ? "bg-brand-600 text-white"
                        : "text-gray-700 hover:bg-brand-50 hover:text-brand-700"
                    }`}
                  >
                    {t(labelKey)}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2">
              <Link
                href="/contact"
                className="btn-primary w-full justify-center text-sm"
              >
                {t("nav.quote")}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
