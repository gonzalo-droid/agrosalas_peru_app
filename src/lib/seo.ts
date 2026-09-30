import type { Metadata } from "next";
import { defaultLocale, localizedPath, locales, type Locale } from "@/i18n/config";
import { translate } from "@/i18n/translations";
import { BASE_URL } from "./site";

export const OG_LOCALE: Record<Locale, string> = { es: "es_PE", en: "en_US" };

export type OgImage = { url: string; width?: number; height?: number; alt?: string };

/** "/" → "https://agrosalasperu.com"; "/en/catalogo" → "https://agrosalasperu.com/en/catalogo". */
export function absoluteUrl(path: string): string {
  return path === "/" ? BASE_URL : `${BASE_URL}${path}`;
}

/** URL absoluta de `path` en cada idioma + x-default (español). */
export function languageAlternates(path: string): Record<Locale | "x-default", string> {
  const entries = locales.map((l) => [l, absoluteUrl(localizedPath(path, l))] as const);
  return {
    ...(Object.fromEntries(entries) as Record<Locale, string>),
    "x-default": absoluteUrl(localizedPath(path, defaultLocale)),
  };
}

/** Canonical propio + hreflang hacia todas las versiones. */
export function alternatesFor(path: string, locale: Locale) {
  return {
    canonical: absoluteUrl(localizedPath(path, locale)),
    languages: languageAlternates(path),
  };
}

export function ogImage(locale: Locale): OgImage {
  return {
    url: `/og?locale=${locale}`,
    width: 1200,
    height: 630,
    alt: translate(locale, "meta.default.title"),
  };
}

type PageMetaInput = {
  locale: Locale;
  /** Ruta interna sin prefijo de idioma: "/", "/catalogo/garbanzo". */
  path: string;
  /** Sin la marca: el template del layout agrega " | Agrosalas Peru". */
  title: string;
  description: string;
  images?: OgImage[];
  /** true = no aplicar el template (home). */
  absoluteTitle?: boolean;
};

export function pageMetadata({
  locale,
  path,
  title,
  description,
  images,
  absoluteTitle = false,
}: PageMetaInput): Metadata {
  const ogImages = images ?? [ogImage(locale)];
  const fullTitle = absoluteTitle ? title : `${title} | Agrosalas Peru`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: alternatesFor(path, locale),
    openGraph: {
      type: "website",
      siteName: "Agrosalas Peru",
      locale: OG_LOCALE[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      url: absoluteUrl(localizedPath(path, locale)),
      title: fullTitle,
      description,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ogImages.map((i) => i.url),
    },
  };
}
