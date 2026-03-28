import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export function CtaSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-section">
        <div className="bg-gradient-to-r from-brand-600 to-brand-700 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/10 rounded-full" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              ¿Listo para hacer tu pedido?
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8 text-lg">
              Contáctanos hoy y recibe una cotización personalizada para tu negocio.
              Atendemos distribuidores, supermercados y restaurantes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contacto" className="btn-outline-white text-base px-8 py-4">
                Enviar consulta
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+905600449"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors font-medium"
              >
                <Phone className="w-5 h-5" />
                +51 905 600 449
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
