import type { Product } from "@/types";

export const products: Product[] = [
  // ENLATADOS
  {
    id: "atun-en-agua-170g",
    name: "Atún en Agua",
    category: "enlatados",
    shortDescription: "Atún de primera calidad en agua, sin conservantes artificiales.",
    description:
      "Nuestro atún en agua es capturado en las costas del Pacífico Sur y procesado el mismo día para garantizar máxima frescura. Rico en proteínas y omega-3, ideal para ensaladas y preparaciones saludables.",
    image: "/images/products/atun-agua.jpg",
    unit: "Lata 170g",
    available: true,
    featured: true,
  },
  {
    id: "atun-en-aceite-170g",
    name: "Atún en Aceite de Oliva",
    category: "enlatados",
    shortDescription: "Atún premium conservado en aceite de oliva extra virgen.",
    description:
      "Atún seleccionado preservado en aceite de oliva extra virgen importado. Sabor intenso y textura suave, perfecto para antipastos y platillos mediterráneos.",
    image: "/images/products/atun-aceite.jpg",
    unit: "Lata 170g",
    available: true,
    featured: true,
  },
  {
    id: "sardinas-tomate-425g",
    name: "Sardinas en Salsa de Tomate",
    category: "enlatados",
    shortDescription: "Sardinas frescas en salsa de tomate natural artesanal.",
    description:
      "Sardinas del Pacífico procesadas en salsa de tomate elaborada con tomates frescos nacionales. Alta fuente de calcio y omega-3. Sin gluten.",
    image: "/images/products/sardinas-tomate.jpg",
    unit: "Lata 425g",
    available: true,
  },
  {
    id: "caballa-aceite-425g",
    name: "Caballa en Aceite Vegetal",
    category: "enlatados",
    shortDescription: "Caballa del Pacífico en aceite vegetal refinado.",
    description:
      "Caballa seleccionada del Pacífico, procesada y conservada en aceite vegetal de alta calidad. Excelente fuente de proteínas y ácidos grasos esenciales.",
    image: "/images/products/caballa-aceite.jpg",
    unit: "Lata 425g",
    available: true,
  },
  // CONSERVAS
  {
    id: "esparragos-blancos-conserva",
    name: "Espárragos Blancos en Conserva",
    category: "conservas",
    shortDescription: "Espárragos blancos peruanos de exportación en salmuera.",
    description:
      "Espárragos blancos de los valles de Ica y La Libertad, cosechados en su punto óptimo y conservados en salmuera natural. Producto de exportación con estándar internacional.",
    image: "/images/products/esparragos-blancos.jpg",
    unit: "Frasco 370ml",
    available: true,
    featured: true,
  },
  {
    id: "pimiento-morrón-conserva",
    name: "Pimiento Morrón en Conserva",
    category: "conservas",
    shortDescription: "Pimientos morrones asados y pelados en aceite de girasol.",
    description:
      "Pimientos morrones rojos y amarillos cultivados en la costa peruana, asados artesanalmente, pelados y conservados en aceite de girasol. Listos para usar.",
    image: "/images/products/pimiento-morron.jpg",
    unit: "Frasco 370ml",
    available: true,
  },
  {
    id: "alcachofa-conserva",
    name: "Alcachofa en Conserva",
    category: "conservas",
    shortDescription: "Corazones de alcachofa peruana en aceite de oliva.",
    description:
      "Corazones de alcachofa peruana de primera selección, conservados en aceite de oliva con hierbas aromáticas. Producto gourmet listo para servir.",
    image: "/images/products/alcachofa.jpg",
    unit: "Frasco 250ml",
    available: true,
    featured: true,
  },
  {
    id: "aceitunas-negras-conserva",
    name: "Aceitunas Negras en Conserva",
    category: "conservas",
    shortDescription: "Aceitunas negras de Tacna en salmuera artesanal.",
    description:
      "Aceitunas negras de los olivares de Tacna y Moquegua, curadas en salmuera siguiendo métodos tradicionales. Sabor intenso y consistencia firme.",
    image: "/images/products/aceitunas-negras.jpg",
    unit: "Frasco 500ml",
    available: true,
  },
  // CONGELADOS
  {
    id: "langostinos-congelados",
    name: "Langostinos Congelados IQF",
    category: "congelados",
    shortDescription: "Langostinos del Pacífico congelados individualmente (IQF).",
    description:
      "Langostinos frescos del litoral peruano, pelados, desvenados y congelados individualmente mediante tecnología IQF para preservar textura y sabor. Calibre 21/25.",
    image: "/images/products/langostinos.jpg",
    unit: "Bolsa 1kg",
    available: true,
    featured: true,
  },
  {
    id: "filete-merluza-congelado",
    name: "Filete de Merluza Congelado",
    category: "congelados",
    shortDescription: "Filetes de merluza sin espinas, listos para cocinar.",
    description:
      "Filetes de merluza del Pacífico Sur, sin espinas y con piel removida. Congelados en cadena de frío continua desde la captura. Ideal para frituras, al horno y a la plancha.",
    image: "/images/products/filete-merluza.jpg",
    unit: "Bolsa 1kg",
    available: true,
  },
  {
    id: "pota-anillas-congelada",
    name: "Anillas de Pota Congelada",
    category: "congelados",
    shortDescription: "Anillas de pota gigante del Pacífico Sur, limpias y congeladas.",
    description:
      "Pota (calamar gigante) capturada en las costas peruanas, procesada en anillas y congelada al instante. Perfecta para paellas, ceviches calientes y mariscos.",
    image: "/images/products/pota-anillas.jpg",
    unit: "Bolsa 1kg",
    available: true,
  },
  {
    id: "pulpo-congelado",
    name: "Pulpo Congelado Entero",
    category: "congelados",
    shortDescription: "Pulpo entero limpio del Pacífico, precocido y congelado.",
    description:
      "Pulpo del Pacífico capturado artesanalmente, limpiado, precocido para ablandar sus fibras y congelado para preservar su calidad. Listo para marinar y terminar al grill.",
    image: "/images/products/pulpo.jpg",
    unit: "Unidad ~1-1.5kg",
    available: true,
    featured: true,
  },
];

export const CATEGORIES = [
  { value: "all",        label: "Todos los productos" },
  { value: "enlatados",  label: "Enlatados"           },
  { value: "conservas",  label: "Conservas"           },
  { value: "congelados", label: "Congelados"          },
] as const;
