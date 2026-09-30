import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { locales } from "@/i18n/config";
import { resolveLocale } from "@/i18n/server";
import { translate } from "@/i18n/translations";
import { BASE_URL } from "@/lib/site";
import { OG_LOCALE, ogImage } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Solo /es y /en; cualquier otro valor del segmento es 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = (key: string) => translate(locale, key);

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: t("meta.default.title"),
      template: "%s | Agrosalas Peru",
    },
    description: t("meta.default.description"),
    keywords: t("meta.keywords").split(",").map((k) => k.trim()),
    authors: [{ name: "Agrosalas Peru" }],
    creator: "Agrosalas Peru",
    openGraph: {
      type: "website",
      siteName: "Agrosalas Peru",
      locale: OG_LOCALE[locale],
      title: t("meta.default.title"),
      description: t("meta.og.description"),
      images: [ogImage(locale)],
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.default.title"),
      description: t("meta.og.description"),
      images: [ogImage(locale).url],
    },
    icons: {
      icon: "/images/favicon.ico",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Agrosalas Peru",
  legalName: "Agrosalas Perú E.I.R.L.",
  url: BASE_URL,
  logo: `${BASE_URL}/images/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+51905600449",
    contactType: "sales",
    availableLanguage: ["Spanish", "English"],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);

  return (
    <html lang={locale} className={inter.variable}>
      <body className="flex flex-col min-h-screen">
        <JsonLd data={organizationSchema} />
        <LanguageProvider locale={locale}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
