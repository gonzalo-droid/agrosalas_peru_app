import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Carlos Mendoza",
    role: "Gerente de Compras — Supermercados del Sur",
    quote:
      "Trabajamos con AgroSalas desde hace 8 años. La consistencia en la calidad de sus enlatados y la puntualidad en los despachos hacen que sean nuestro proveedor preferente.",
    country: "🇵🇪 Lima, Perú",
  },
  {
    name: "María Fernández",
    role: "Directora de Operaciones — Importadora Ibérica S.A.",
    quote:
      "Sus conservas de espárragos y pimientos son simplemente las mejores que hemos importado de Perú. La documentación y certif icaciones siempre en orden. Muy recomendables.",
    country: "🇪🇸 Madrid, España",
  },
  {
    name: "John Kim",
    role: "Procurement Manager — Pacific Foods Inc.",
    quote:
      "AgroSalas' frozen shrimp quality is outstanding. Their IQF process preserves texture and freshness better than any other Peruvian supplier we've worked with.",
    country: "🇺🇸 Miami, USA",
  },
];

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-brand-900 to-brand-800">
      <div className="container-section">
        <div className="text-center mb-14">
          <span className="badge bg-white/10 text-brand-200 border border-white/20 mb-3">
            Testimonios
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-brand-200 max-w-xl mx-auto">
            Más de 200 clientes en todo el mundo confían en la calidad de AgroSalas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ name, role, quote, country }) => (
            <div
              key={name}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 flex flex-col"
            >
              <Quote className="w-8 h-8 text-brand-300 mb-4" />
              <p className="text-white/90 text-sm leading-relaxed mb-6 flex-1 italic">
                &ldquo;{quote}&rdquo;
              </p>
              <div>
                <p className="text-white font-semibold">{name}</p>
                <p className="text-brand-300 text-xs mt-0.5">{role}</p>
                <p className="text-white/50 text-xs mt-1">{country}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
