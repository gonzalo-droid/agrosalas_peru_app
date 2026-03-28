import { ShieldCheck, Leaf, Globe2, Award, Truck, HeartHandshake } from "lucide-react";

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Calidad garantizada",
    description:
      "Certificados ISO 22000, HACCP y BRC Food. Cada lote pasa por rigurosos controles de calidad antes de salir al mercado.",
  },
  {
    icon: Leaf,
    title: "Sostenibilidad",
    description:
      "Trabajamos con pesca responsable y agricultura sostenible, cuidando los recursos naturales para las próximas generaciones.",
  },
  {
    icon: Globe2,
    title: "Alcance global",
    description:
      "Exportamos a más de 15 países en América, Europa y Asia, con logística especializada para productos perecederos.",
  },
  {
    icon: Award,
    title: "25 años de experiencia",
    description:
      "Más de dos décadas perfeccionando nuestros procesos y construyendo relaciones duraderas con clientes y proveedores.",
  },
  {
    icon: Truck,
    title: "Cadena de frío continua",
    description:
      "Tecnología IQF y cadena de frío desde la captura hasta la entrega, garantizando la frescura y seguridad alimentaria.",
  },
  {
    icon: HeartHandshake,
    title: "Soporte personalizado",
    description:
      "Equipo comercial dedicado para asesorarte en la selección de productos, volúmenes y condiciones de compra.",
  },
];

export function BenefitsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-section">
        <div className="text-center mb-14">
          <span className="badge bg-brand-100 text-brand-700 mb-3">
            ¿Por qué elegirnos?
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Comprometidos con la excelencia
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Cada proceso en Agrosalas Peru está diseñado para ofrecerte el mejor
            producto, con el mejor servicio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {BENEFITS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex gap-5 p-6 rounded-2xl border border-gray-100 hover:border-brand-200 hover:bg-brand-50/50 transition-all duration-200"
            >
              <div className="shrink-0 w-12 h-12 bg-brand-100 text-brand-700 rounded-xl flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
