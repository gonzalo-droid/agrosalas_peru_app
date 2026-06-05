import type { Metadata } from "next";
import { AboutClient } from "./AboutClient";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce la historia, misión, visión y valores de Agrosalas Peru, empresa agroindustrial peruana con más de 4 años de trayectoria.",
  alternates: {
    canonical: "https://agrosalasperu.com/about",
  },
};

export default function NosotrosPage() {
  return <AboutClient />;
}
