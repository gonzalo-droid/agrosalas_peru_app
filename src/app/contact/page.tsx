import type { Metadata } from "next";
import { ContactPageClient } from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos para solicitar cotizaciones, información sobre nuestros productos o resolver cualquier consulta. Respondemos en menos de 24 horas.",
};

export default function ContactoPage() {
  return <ContactPageClient />;
}
