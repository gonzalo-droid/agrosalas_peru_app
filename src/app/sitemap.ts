import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { getEvents } from "@/lib/events";

const BASE_URL = "https://agrosalasperu.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productUrls: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/catalogo/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const eventUrls: MetadataRoute.Sitemap = (await getEvents()).map((e) => ({
    url: `${BASE_URL}/eventos/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE_URL}/catalogo`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...productUrls,
    { url: `${BASE_URL}/eventos`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ...eventUrls,
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
  ];
}
