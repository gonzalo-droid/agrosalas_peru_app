// Sin imports de runtime: lo usan proxy.ts, componentes y los tests de Node.

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** "/en/catalogo" → "/catalogo"; "/es" → "/"; "/catalogo" → "/catalogo". */
export function stripLocale(pathname: string): string {
  for (const l of locales) {
    if (pathname === `/${l}`) return "/";
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname;
}

/** Ruta interna → ruta pública en `locale`. El español no lleva prefijo. Conserva ?query y #hash. */
export function localizedPath(path: string, locale: Locale): string {
  const cut = path.search(/[?#]/);
  const pathname = cut === -1 ? path : path.slice(0, cut);
  const suffix = cut === -1 ? "" : path.slice(cut);
  const base = stripLocale(pathname);

  if (locale === defaultLocale) return base + suffix;
  return (base === "/" ? `/${locale}` : `/${locale}${base}`) + suffix;
}

export type RouteDecision =
  | { type: "next" }
  | { type: "rewrite"; path: string }
  | { type: "redirect"; path: string };

// Rutas que no pertenecen al árbol [locale].
const PASSTHROUGH = ["/api", "/og", "/images", "/_next"];

export function resolveLocaleRoute(pathname: string): RouteDecision {
  if (PASSTHROUGH.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return { type: "next" };
  }
  // sitemap.xml, robots.txt, favicon.ico y cualquier archivo estático.
  const last = pathname.slice(pathname.lastIndexOf("/") + 1);
  if (last.includes(".")) return { type: "next" };

  for (const l of locales) {
    if (pathname !== `/${l}` && !pathname.startsWith(`/${l}/`)) continue;
    return l === defaultLocale
      ? { type: "redirect", path: stripLocale(pathname) }
      : { type: "next" };
  }

  return {
    type: "rewrite",
    path: pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`,
  };
}
