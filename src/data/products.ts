import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "gandul-agua-sal",
    name: "Gandul en Agua y Sal",
    category: "conservas",
    shortDescription: "Granos de gandul cocidos y conservados en agua con sal.",
    description:
      "Granos de gandul seleccionados, cocidos en su punto justo y conservados en agua con sal natural. Listos para usar, ideales para guisos, sopas y ensaladas.",
    image: "/images/products/gandul-agua-sal.jpg",
    unit: "Conserva 400g",
    available: true,
    featured: true,
  },
  {
    id: "gandul-coco",
    name: "Gandul en Coco",
    category: "conservas",
    shortDescription: "Gandul cocido en leche de coco, sabor tropical y cremoso.",
    description:
      "Granos de gandul cocinados en leche de coco natural, con un sabor suave y aromático. Perfecto como acompañamiento o base para preparaciones caribeñas y tropicales.",
    image: "/images/products/gandul-coco.jpg",
    unit: "Conserva 400g",
    available: true,
    featured: true,
  },
  {
    id: "gandul-seco",
    name: "Gandul Seco",
    category: "conservas",
    shortDescription: "Granos de gandul secos seleccionados, listos para cocinar.",
    description:
      "Gandul seco de alta calidad, cultivado y secado de forma natural. Excelente fuente de proteína vegetal. Ideal para sopas, guisos y potajes tradicionales.",
    image: "/images/products/gandul-seco.jpg",
    unit: "Conserva 400g",
    available: true,
    featured: true,
  },
  {
    id: "pallar-salmuera",
    name: "Pallar en Salmuera",
    category: "conservas",
    shortDescription: "Pallar peruano cocido y conservado en salmuera natural.",
    description:
      "Pallar peruano de primera selección, cocido en su punto y conservado en salmuera natural. Listo para usar en guisos, ensaladas y platos tradicionales.",
    image: "/images/products/pallar-salmuera.jpg",
    unit: "Conserva 400g",
    available: true,
    featured: true,
  },
  {
    id: "frijol-negro",
    name: "Frijol Negro",
    category: "conservas",
    shortDescription: "Frijol negro cocido en salmuera, listo para usar.",
    description:
      "Frijol negro seleccionado, cocido y conservado en salmuera natural. Rico en proteínas, fibra y antioxidantes. Ideal para sopas, arroces y guisos.",
    image: "/images/products/frijol-negro.jpg",
    unit: "Conserva 400g",
    available: true,
  },
  {
    id: "frijol-rojo",
    name: "Frijol Rojo",
    category: "conservas",
    shortDescription: "Frijol rojo cocido en salmuera, suave y nutritivo.",
    description:
      "Frijol rojo de calidad seleccionada, cocido y conservado en salmuera. Fuente de proteína vegetal y hierro. Perfecto para guisos, potajes y ensaladas.",
    image: "/images/products/frijol-rojo.jpg",
    unit: "Conserva 400g",
    available: true,
  },
  {
    id: "frijol-castilla",
    name: "Frijol Castilla",
    category: "conservas",
    shortDescription: "Frijol castilla peruano cocido y conservado en salmuera.",
    description:
      "Frijol castilla cultivado en la costa peruana, cocido y conservado en salmuera natural. Textura suave y sabor delicado, ideal para seco de frejoles y otros platos tradicionales.",
    image: "/images/products/frijol-castilla.jpg",
    unit: "Conserva 400g",
    available: true,
  },
  {
    id: "pallar-bebe",
    name: "Pallar Bebé",
    category: "conservas",
    shortDescription: "Pallar bebé peruano en salmuera, tierno y nutritivo.",
    description:
      "Pallar bebé de pequeño calibre, cosechado tierno y conservado en salmuera. De sabor suave y textura cremosa, ideal para ensaladas, guarniciones y cremas.",
    image: "/images/products/pallar-bebe.jpg",
    unit: "Conserva 400g",
    available: true,
  },
  {
    id: "garbanzo",
    name: "Garbanzo",
    category: "conservas",
    shortDescription: "Garbanzo cocido en salmuera, versátil y nutritivo.",
    description:
      "Garbanzo seleccionado, cocido y conservado en salmuera natural. Alto contenido en proteínas y fibra. Perfecto para hummus, ensaladas, guisos y sopas.",
    image: "/images/products/garbanzo.jpg",
    unit: "Conserva 400g",
    available: true,
  }
];

export const CATEGORIES = [
  { value: "all",        label: "Todos los productos" },
  //  { value: "enlatados",  label: "Enlatados"           },
  { value: "conservas",  label: "Conservas"           },
  // { value: "congelados", label: "Congelados"          },
] as const;
