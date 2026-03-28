"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Leaf } from "lucide-react";

const NAV_LINKS = [
  { href: "/",          label: "Inicio"    },
  { href: "/catalogo",  label: "Catálogo"  },
  { href: "/nosotros",  label: "Nosotros"  },
  { href: "/contacto",  label: "Contacto"  },
];

export function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname              = usePathname();

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
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-brand-600 rounded-lg flex items-center justify-center group-hover:bg-brand-700 transition-colors">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span
            className={`text-xl font-bold transition-colors ${
              scrolled ? "text-gray-900" : "text-white drop-shadow"
            }`}
          >
            Agro<span className="text-brand-500">Salas</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => {
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
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA Desktop */}
        <div className="hidden md:block">
          <Link href="/contacto" className="btn-primary text-sm py-2">
            Solicitar cotización
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
          className={`md:hidden p-2 rounded-lg transition-colors ${
            scrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/15"
          }`}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-fade-in">
          <ul className="container-section py-4 flex flex-col gap-1">
            {NAV_LINKS.map(({ href, label }) => {
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
                    {label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2">
              <Link href="/contacto" className="btn-primary w-full justify-center text-sm">
                Solicitar cotización
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
