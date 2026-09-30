import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { getEvents } from "@/lib/events";
import { localizedPath, locales } from "@/i18n/config";
import { absoluteUrl, languageAlternates } from "@/lib/seo";

type Freq = MetadataRoute.Sitemap[number]["changeFrequency"];

// Una entrada por idioma; cada una declara todas las versiones (hreflang).
function entries(path: string, changeFrequency: Freq, priority: number): MetadataRoute.Sitemap {
  const languages = languageAlternates(path);
  return locales.map((l) => ({
    url: absoluteUrl(localizedPath(path, l)),
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const events = await getEvents();

  return [
    ...entries("/", "monthly", 1.0),
    ...entries("/catalogo", "weekly", 0.9),
    ...products.flatMap((p) => entries(`/catalogo/${p.id}`, "monthly", 0.8)),
    ...entries("/eventos", "monthly", 0.7),
    ...events.flatMap((e) => entries(`/eventos/${e.slug}`, "yearly", 0.6)),
    ...entries("/about", "yearly", 0.7),
    ...entries("/contact", "yearly", 0.7),
  ];
}
