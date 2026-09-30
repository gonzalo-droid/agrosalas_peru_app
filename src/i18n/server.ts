import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./config";

/** Lee el segmento [locale]; cualquier valor desconocido es 404. */
export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}
