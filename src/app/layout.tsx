import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agrosalasperu.com"),
  title: {
    default: "Agrosalas Peru — Agroindustria del Pacífico",
    template: "%s | Agrosalas Peru",
  },
  description:
    "Agrosalas Peru es una empresa agroindustrial peruana especializada en enlatados, conservas y congelados del mar y del campo, con estándares de calidad para exportación.",
  keywords: [
    "agroindustria peruana",
    "enlatados",
    "conservas",
    "congelados",
    "atún",
    "espárragos",
    "langostinos",
    "exportación",
    "Agrosalas Peru",
  ],
  authors: [{ name: "Agrosalas Peru" }],
  creator: "Agrosalas Peru",
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://agrosalasperu.com",
    siteName: "Agrosalas Peru",
    title: "Agrosalas Peru — Agroindustria del Pacífico",
    description:
      "Enlatados, conservas y congelados peruanos con calidad de exportación.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Agrosalas Peru — Agroindustria del Pacífico",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agrosalas Peru — Agroindustria del Pacífico",
    description:
      "Enlatados, conservas y congelados peruanos con calidad de exportación.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
