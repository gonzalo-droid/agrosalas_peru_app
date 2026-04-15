import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "frijol-castilla",
    name: "Frijol Castilla",
    category: "conservas",
    shortDescription:
      "Frijol castilla peruano cocido y conservado en salmuera.",
    description:
      "Frijol Castilla en presentación conserva de 425 gr x 24 latas. Es un producto versátil, conocido internacionalmente como Blackeye Beans, adecuado para distintas preparaciones alimenticias y de uso comercial.",
    image: "",
    unit: "Conserva 425 gr",
    available: true,
  },
  {
    id: "frejol-rojo",
    name: "Frijol Rojo",
    category: "conservas",
    shortDescription:
      "Frejol Rojo en conserva, práctico y listo para múltiples recetas.",
    description:
      "Frejol Rojo en presentación conserva de 425 gr x 24 latas. Conocido en inglés como Light Red Kidney, es una opción ideal para platos nutritivos, con buen rendimiento y facilidad de almacenamiento.",
    image: "/images/products/frejol-rojo.png",
    unit: "Conserva 425g",
    available: true,
  },
  {
    id: "frijol-canario",
    name: "Frijol Canario",
    category: "conservas",
    shortDescription:
      "Frijol Canario en conserva, de textura suave y excelente para preparaciones tradicionales.",
    description:
      "Frijol Canario en presentación conserva de 425 gr x 24 latas. También conocido como Canary Bean, destaca por su sabor agradable y su uso frecuente en recetas caseras e industriales.",
    image: "",
    unit: "Conserva 425g",
    available: true,
  },

  {
    id: "frijol-negro",
    name: "Frijol Negro",
    category: "conservas",
    shortDescription: "Frijol negro cocido en salmuera, listo para usar.",
    description:
      "Frijol negro seleccionado, cocido y conservado en salmuera natural. Rico en proteínas, fibra y antioxidantes. Ideal para sopas, arroces y guisos.",
    image: "/images/products/frejol-negro.png",
    unit: "Conserva 425g",
    available: true,
  },

  {
    id: "gandul-agua-sal",
    name: "Gandul en Agua y Sal",
    category: "conservas",
    shortDescription: "Granos de gandul cocidos y conservados en agua con sal.",
    description:
      "Granos de gandul seleccionados, cocidos en su punto justo y conservados en agua con sal natural. Listos para usar, ideales para guisos, sopas y ensaladas.",
    image: "",
    unit: "Conserva 425g",
    available: true,
    featured: true,
  },
  {
    id: "gandul-coco",
    name: "Gandul con Coco",
    category: "conservas",
    shortDescription:
      "Gandul cocido en leche de coco, sabor tropical y cremoso.",
    description:
      "Granos de gandul cocinados en leche de coco natural, con un sabor suave y aromático. Perfecto como acompañamiento o base para preparaciones caribeñas y tropicales.",
    image: "",
    unit: "Conserva 425g",
    available: true,
    featured: true,
  },
  {
    id: "gandul-seco",
    name: "Gandul Seco",
    category: "conservas",
    shortDescription:
      "Granos de gandul secos seleccionados, listos para cocinar.",
    description:
      "Gandul seco de alta calidad, cultivado y secado de forma natural. Excelente fuente de proteína vegetal. Ideal para sopas, guisos y potajes tradicionales.",
    image: "",
    unit: "Conserva 425g",
    available: true,
    featured: true,
  },

  {
    id: "pallar-americano",
    name: "Pallar Americano",
    category: "conservas",
    shortDescription:
      "Pallar Americano en conserva, ideal para recetas nutritivas y de buen rendimiento.",
    description:
      "Pallar peruano de primera selección, cocido en su punto y conservado en salmuera natural. Listo para usar en guisos, ensaladas y platos tradicionales.",
    image: "/images/products/pallar.png",
    unit: "Conserva 425g",
    available: true,
    featured: true,
  },
  {
    id: "pallar-bebe",
    name: "Pallar Bebé",
    category: "conservas",
    shortDescription: "Pallar bebé peruano en salmuera, tierno y nutritivo.",
    description:
      "Pallar bebé de pequeño calibre, cosechado tierno y conservado en salmuera. De sabor suave y textura cremosa, ideal para ensaladas, guarniciones y cremas.",
    image: "",
    unit: "Conserva 425g",
    available: true,
  },

  {
    id: "pallar-salmuera",
    name: "Pallar en Salmuera",
    category: "conservas",
    shortDescription: "Pallar peruano cocido y conservado en salmuera natural.",
    description:
      "Pallar peruano de primera selección, cocido en su punto y conservado en salmuera natural. Listo para usar en guisos, ensaladas y platos tradicionales.",
    image: "",
    unit: "Conserva 425g",
    available: true,
    featured: true,
  },

  {
    id: "pimiento-morron",
    name: "Pimiento Morrón",
    category: "conservas",
    shortDescription:
      "Pimiento Morrón en conserva, ideal para complementar diversas recetas.",
    description:
      "Pimiento Morrón en presentación conserva de 290 gr. Conocido en inglés como Bell Pepper, es un producto práctico para uso gastronómico, con buen aprovechamiento y facilidad de almacenamiento.",
    image: "/images/products/pimiento-morron.png",
    unit: "Conserva 290g",
    available: true,
  },
  {
    id: "zarandaja",
    name: "Zarandaja",
    category: "conservas",
    shortDescription:
      "Zarandaja en conserva, una legumbre versátil y lista para su uso.",
    description:
      "Zarandaja en presentación conserva de 425 gr x 24 latas. Conocida también como Frijol Zarandaja o Val Bean, es una opción práctica para distintas preparaciones culinarias y abastecimiento comercial.",
    image: "",
    unit: "Conserva 425g",
    available: true,
  },
  {
    id: "garbanzo",
    name: "Garbanzo",
    category: "conservas",
    shortDescription: "Garbanzo cocido en salmuera, versátil y nutritivo.",
    description:
      "Garbanzo seleccionado, cocido y conservado en salmuera natural. Alto contenido en proteínas y fibra. Perfecto para hummus, ensaladas, guisos y sopas.",
    image: "/images/products/garbanzo.png",
    unit: "Conserva 425g",
    available: true,
  },
];

export const CATEGORIES = [
  { value: "all", label: "Todos los productos" },
  //  { value: "enlatados",  label: "Enlatados"           },
  { value: "conservas", label: "Conservas" },
  // { value: "congelados", label: "Congelados"          },
] as const;
