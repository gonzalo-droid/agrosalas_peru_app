import type { Metadata } from "next";
import { Target, Eye, Heart, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce la historia, misión, visión y valores de Agrosalas Peru, empresa agroindustrial peruana con más de 25 años de trayectoria.",
};

const VALUES = [
  {
    icon: Heart,
    title: "Calidad",
    description:
      "Cada producto que sale de nuestras plantas lleva el sello de calidad que nos ha caracterizado por años. No aceptamos nada menos que lo mejor.",
  },
  {
    icon: Users,
    title: "Personas primero",
    description:
      "Valoramos a nuestros colaboradores, proveedores y clientes como los pilares de nuestro negocio. Las relaciones duraderas son nuestra mayor fortaleza.",
  },
  {
    icon: Target,
    title: "Innovación constante",
    description:
      "Invertimos continuamente en tecnología y capacitación para ofrecer procesos más eficientes y productos que superen las expectativas del mercado.",
  },
  {
    icon: Eye,
    title: "Transparencia",
    description:
      "Operamos con honestidad en cada interacción: con nuestros clientes, proveedores y con el entorno donde trabajamos.",
  },
];

const TIMELINE = [
  { year: "1999", event: "Fundación de Agrosalas Peru por la familia Salas en Lima, Perú." },
  { year: "2003", event: "Primera planta de procesamiento de enlatados con capacidad para 500 TM/mes." },
  { year: "2008", event: "Certificación HACCP y primer contrato de exportación a Chile y Ecuador." },
  { year: "2012", event: "Apertura de planta de congelados IQF y expansión a conservas vegetales." },
  { year: "2016", event: "Certificación ISO 22000 y BRC Food. Inicio de exportaciones a Europa." },
  { year: "2020", event: "Modernización tecnológica de plantas y expansión a mercados asiáticos." },
  { year: "2024", event: "Lanzamiento de línea premium y alianzas estratégicas en 15 países." },
];

const TEAM = [
  { name: "Roberto Salas Vargas",  role: "Fundador & CEO",               initials: "RS" },
  { name: "Ana Lucía Salas",       role: "Directora Comercial",           initials: "AS" },
  { name: "Ing. Jorge Ramos",      role: "Director de Operaciones",       initials: "JR" },
  { name: "Dra. Patricia Vega",    role: "Gerente de Calidad & Inocuidad", initials: "PV" },
  { name: "Luis Herrera",          role: "Gerente de Exportaciones",      initials: "LH" },
  { name: "Carmen Díaz",           role: "Gerente de Recursos Humanos",   initials: "CD" },
];

export default function NosotrosPage() {
  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-br from-brand-800 to-brand-700 pt-32 pb-20">
        <div className="container-section text-center">
          <span className="badge bg-white/10 text-brand-100 border border-white/20 mb-4">
            Nuestra historia
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Cultivando confianza
          </h1>
          <p className="text-brand-200 max-w-2xl mx-auto text-lg">
            Somos una empresa agroindustrial familiar que nació en 2021 con el propósito de llevar conservas de legumbres saludables y de calidad desde el Perú al mundo.
          </p>
        </div>
      </div>

      {/* Misión y Visión */}
      <section className="section-padding bg-white">
        <div className="container-section grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-brand-50 rounded-3xl p-10 border border-brand-100">
            <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Nuestra misión</h2>
            <p className="text-gray-600 leading-relaxed">
              Ser una empresa líder en la agroexportación de conservas de legumbres sanas y saludables, impulsando la innovación continua en nuestros productos y procesos, garantizando calidad e inocuidad, y proyectándonos al desarrollo de productos deshidratados y congelados.
            </p>
          </div>

          <div className="bg-earth-50 rounded-3xl p-10 border border-earth-100">
            <div className="w-12 h-12 bg-earth-600 rounded-2xl flex items-center justify-center mb-6">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Nuestra visión</h2>
            <p className="text-gray-600 leading-relaxed">
              Desarrollar y comercializar, junto a nuestros clientes y proveedores, alimentos de alta calidad para la agroexportación y el mercado local, logrando un crecimiento sostenido de la empresa, generando valor para nuestros accionistas, bienestar para nuestros colaboradores y contribuyendo al desarrollo y la imagen del Perú, con una proyección de diversificación hacia productos deshidratados y congelados.
            </p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="section-padding bg-gray-50">
        <div className="container-section">
          <div className="text-center mb-14">
            <span className="badge bg-brand-100 text-brand-700 mb-3">Valores corporativos</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Lo que nos define
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex gap-5 p-7 bg-white rounded-2xl border border-gray-100 hover:border-brand-200 hover:shadow-md transition-all"
              >
                <div className="shrink-0 w-12 h-12 bg-brand-100 text-brand-700 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Historia / Timeline */}
      
      {/*
      <section className="section-padding bg-white">
        <div className="container-section max-w-3xl">
          <div className="text-center mb-14">
            <span className="badge bg-brand-100 text-brand-700 mb-3">Historia</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Nuestro camino
            </h2>
          </div>

          <div className="relative">
         
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-brand-100" />

            <div className="space-y-8">
              {TIMELINE.map(({ year, event }) => (
                <div key={year} className="flex gap-6 relative">
                  <div className="shrink-0 w-12 h-12 bg-brand-600 text-white rounded-full flex items-center justify-center text-xs font-bold z-10">
                    {year.slice(2)}
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5 flex-1 border border-gray-100">
                    <span className="text-xs font-bold text-brand-600 mb-1 block">{year}</span>
                    <p className="text-gray-700 text-sm leading-relaxed">{event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
     */}

      {/* Equipo */}
      {/*
      <section className="section-padding bg-gray-50">
        <div className="container-section">
          <div className="text-center mb-14">
            <span className="badge bg-brand-100 text-brand-700 mb-3">Nuestro equipo</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Las personas detrás de Agrosalas Peru
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto mt-4">
              Un equipo apasionado y comprometido que hace posible llevar la
              calidad peruana al mundo cada día.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {TEAM.map(({ name, role, initials }) => (
              <div key={name} className="text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl flex items-center justify-center text-white text-xl font-bold mb-3 shadow-md">
                  {initials}
                </div>
                <p className="text-sm font-bold text-gray-900">{name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}
    </>
  );
}
