import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { JsonLd } from "@/components/seo/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agrosalasperu.com"),
  title: {
    default: "Agrosalas Peru — Menestras peruanas en conserva para exportación",
    template: "%s | Agrosalas Peru",
  },
  description:
    "Agrosalas Peru exporta menestras peruanas en conserva: frijol castilla (blackeye beans), frijol canario, frijol rojo, frijol negro, pallar, gandul, garbanzo y más, con calidad de exportación.",
  keywords: [
    "menestras en conserva",
    "frijol castilla en conserva",
    "blackeye beans Peru",
    "frijol canario",
    "pallar",
    "gandul",
    "garbanzo en conserva",
    "exportador de menestras Perú",
    "conservas peruanas",
    "Agrosalas Peru",
  ],
  authors: [{ name: "Agrosalas Peru" }],
  creator: "Agrosalas Peru",
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://agrosalasperu.com",
    siteName: "Agrosalas Peru",
    title: "Agrosalas Peru — Menestras peruanas en conserva para exportación",
    description:
      "Menestras peruanas en conserva con calidad de exportación: frijoles, pallares, gandul y garbanzo.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Agrosalas Peru — Menestras peruanas en conserva para exportación",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agrosalas Peru — Menestras peruanas en conserva para exportación",
    description:
      "Menestras peruanas en conserva con calidad de exportación: frijoles, pallares, gandul y garbanzo.",
    images: ["/opengraph-image"],
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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Agrosalas Peru",
  legalName: "Agrosalas Perú E.I.R.L.",
  url: "https://agrosalasperu.com",
  logo: "https://agrosalasperu.com/images/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+51905600449",
    contactType: "sales",
    availableLanguage: ["Spanish", "English"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="flex flex-col min-h-screen">
        <JsonLd data={organizationSchema} />
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
