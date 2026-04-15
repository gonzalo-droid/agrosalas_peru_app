import type { Metadata } from "next";
import { AboutClient } from "./AboutClient";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce la historia, misión, visión y valores de Agrosalas Peru, empresa agroindustrial peruana con más de 4 años de trayectoria.",
};

export default function NosotrosPage() {
  return <AboutClient />;
}
