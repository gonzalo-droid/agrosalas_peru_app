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
    image: "/images/products/frijol-castilla.png",
    unit: "Conserva 425 gr",
    available: true,
    scientificName: "Vigna unguiculata",
    alsoKnownAs: [
      "Black-eyed pea",
      "Cowpea",
      "Frijol de ojo negro",
      "Frijol carita",
    ],
    about:
      "Legumbre de grano color crema con una mancha negra característica, el «ojo». Es de origen africano y se cultiva en la costa norte del Perú, donde se adapta bien al clima cálido y seco. Tiene piel delgada, textura suave y un sabor ligeramente terroso que absorbe bien los aliños.",
    uses: [
      "Ensaladas frías con cebolla, tomate y limón",
      "Hoppin’ John y Texas caviar (sur de EE. UU.)",
      "Guisos y menestras con arroz",
      "Acarajé y frituras de frijol (Brasil, África occidental)",
    ],
  },
  {
    id: "frijol-rojo",
    name: "Frijol Rojo",
    category: "conservas",
    shortDescription:
      "Frijol Rojo en conserva, práctico y listo para múltiples recetas.",
    description:
      "Frijol Rojo en presentación conserva de 425 gr x 24 latas. Conocido en inglés como Light Red Kidney, es una opción ideal para platos nutritivos, con buen rendimiento y facilidad de almacenamiento.",
    image: "/images/products/frijol-rojo.png",
    unit: "Conserva 425g",
    available: true,
    scientificName: "Phaseolus vulgaris",
    alsoKnownAs: [
      "Light red kidney bean",
      "Habichuela roja",
      "Poroto rojo",
      "Frijol riñón",
    ],
    about:
      "Frijol de forma arriñonada y color rojo claro, de piel firme que mantiene el grano entero durante la cocción. Es una de las legumbres más consumidas en el Caribe hispano y en Estados Unidos, y aporta proteína vegetal, fibra y hierro.",
    uses: [
      "Habichuelas guisadas (Puerto Rico, República Dominicana)",
      "Chili con carne",
      "Red beans and rice (Luisiana)",
      "Ensaladas y bowls",
    ],
  },
  {
    id: "frijol-canario",
    name: "Frijol Canario",
    category: "conservas",
    shortDescription:
      "Frijol Canario en conserva, de textura suave y excelente para preparaciones tradicionales.",
    description:
      "Frijol Canario en presentación conserva de 425 gr x 24 latas. También conocido como Canary Bean, destaca por su sabor agradable y su uso frecuente en recetas caseras e industriales.",
    image: "/images/products/frijol-canario.png",
    unit: "Conserva 425g",
    available: true,
    scientificName: "Phaseolus vulgaris",
    alsoKnownAs: [
      "Peruano bean",
      "Mayocoba",
      "Frijol peruano",
      "Canary bean",
    ],
    about:
      "Frijol de color amarillo pálido, típico de la costa y los valles interandinos del Perú. En México y Estados Unidos se vende como «frijol peruano» o «mayocoba». Al cocinarse queda muy cremoso y de sabor suave, por eso es el frijol preferido para los platos peruanos de menestra.",
    uses: [
      "Frejoles con seco o con arroz (Perú)",
      "Tacu tacu",
      "Frijoles refritos (México)",
      "Sopas y cremas",
    ],
  },

  {
    id: "frijol-negro",
    name: "Frijol Negro",
    category: "conservas",
    shortDescription: "Frijol negro cocido en salmuera, listo para usar.",
    description:
      "Frijol negro seleccionado, cocido y conservado en salmuera natural. Rico en proteínas, fibra y antioxidantes. Ideal para sopas, arroces y guisos.",
    image: "/images/products/frijol-negro.png",
    unit: "Conserva 425g",
    available: true,
    scientificName: "Phaseolus vulgaris",
    alsoKnownAs: [
      "Black turtle bean",
      "Habichuela negra",
      "Caraota negra",
      "Poroto negro",
    ],
    about:
      "Frijol pequeño de piel negra brillante y pulpa blanca, con sabor intenso y textura firme. Es básico en las cocinas de Cuba, Venezuela, Brasil, México y Centroamérica. Su color oscuro se debe a antocianinas, los mismos antioxidantes de las uvas y los arándanos.",
    uses: [
      "Moros y cristianos (Cuba)",
      "Feijoada (Brasil)",
      "Pabellón criollo (Venezuela)",
      "Sopa de frijol negro, burritos y tacos",
    ],
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
    scientificName: "Cajanus cajan",
    alsoKnownAs: [
      "Pigeon pea",
      "Green pigeon peas",
      "Gandules",
      "Guandú",
      "Frijol de palo",
    ],
    about:
      "El gandul es una leguminosa arbustiva originaria de la India que se adaptó muy bien al norte del Perú, en Piura y Lambayeque. Se cosecha en verde, cuando el grano está tierno, y se conserva en agua con sal para mantener su color y su sabor característico, ligeramente dulce y herbáceo.",
    uses: [
      "Arroz con gandules (Puerto Rico)",
      "Sancocho y sopa de gandules",
      "Ensaladas",
      "Guisos con cerdo o pollo",
    ],
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
    scientificName: "Cajanus cajan",
    alsoKnownAs: [
      "Pigeon peas with coconut",
      "Guandules con coco",
      "Gandules con coco",
    ],
    about:
      "Gandul verde cocido en leche de coco, una combinación clásica de las cocinas del Caribe. El coco le da cremosidad y un aroma dulce que acompaña bien al sabor herbáceo del grano. Llega listo para calentar y servir.",
    uses: [
      "Moro de guandules con coco (República Dominicana)",
      "Arroz con guandú y coco (Panamá, Caribe colombiano)",
      "Acompañamiento de pescados y mariscos",
      "Base para guisos tropicales",
    ],
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
    image: "/images/products/gandul-seco.png",
    unit: "Conserva 425g",
    available: true,
    scientificName: "Cajanus cajan",
    alsoKnownAs: [
      "Dry pigeon peas",
      "Gandul maduro",
      "Toor dal",
      "Guandú seco",
    ],
    about:
      "Gandul cosechado con el grano ya maduro y seco, de color más oscuro y sabor más intenso que el gandul verde. Es muy rico en proteína vegetal y en la India es la base del dal, uno de los platos más consumidos del país.",
    uses: [
      "Toor dal y sambar (India)",
      "Sopas y potajes",
      "Guisos con arroz",
      "Menestras de la cocina norteña peruana",
    ],
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
    image: "/images/products/pallar-americano.png",
    unit: "Conserva 425g",
    available: true,
    scientificName: "Phaseolus lunatus",
    alsoKnownAs: [
      "Lima bean",
      "Butter bean",
      "Frijol lima",
      "Garrofó",
    ],
    about:
      "El pallar se domesticó en el Perú hace miles de años: aparece en restos arqueológicos de la costa y en la cerámica moche. Es un grano grande, plano y de color crema, de textura mantecosa al cocinarse, que se cultiva sobre todo en Ica y en la costa norte.",
    uses: [
      "Pallares guisados con arroz (Perú)",
      "Ensalada de pallares",
      "Succotash (EE. UU.)",
      "Purés y cremas",
    ],
    featured: true,
  },
  {
    id: "pallar-bebe",
    name: "Pallar Bebé",
    category: "conservas",
    shortDescription: "Pallar bebé peruano en salmuera, tierno y nutritivo.",
    description:
      "Pallar bebé de pequeño calibre, cosechado tierno y conservado en salmuera. De sabor suave y textura cremosa, ideal para ensaladas, guarniciones y cremas.",
    image: "/images/products/pallar-bebe.png",
    unit: "Conserva 425g",
    available: true,
    scientificName: "Phaseolus lunatus",
    alsoKnownAs: [
      "Baby lima bean",
      "Pallar pequeño",
      "Frijol lima bebé",
    ],
    about:
      "Variedad de pallar de grano pequeño y piel fina. Se cocina más rápido que el pallar grande y queda tierno y cremoso, con un sabor suave y algo dulce. Es la presentación más usada en ensaladas y guarniciones.",
    uses: [
      "Ensaladas frías y templadas",
      "Guarnición de carnes y pescados",
      "Succotash y sopas de verduras",
      "Cremas y untables",
    ],
  },

  {
    id: "pallar-salmuera",
    name: "Pallar en Salmuera",
    category: "conservas",
    shortDescription: "Pallar peruano cocido y conservado en salmuera natural.",
    description:
      "Pallar peruano de primera selección, cocido en su punto y conservado en salmuera natural. Listo para usar en guisos, ensaladas y platos tradicionales.",
    image: "/images/products/pallar-salmuera.png",
    unit: "Conserva 425g",
    available: true,
    scientificName: "Phaseolus lunatus",
    alsoKnownAs: [
      "Lima beans in brine",
      "Butter beans",
      "Garrofó",
      "Frijol lima",
    ],
    about:
      "Pallar grande conservado en salmuera, listo para usar. El pallar de Ica, la zona productora más conocida del Perú, cuenta con denominación de origen reconocida por INDECOPI. En España una variedad de pallar, el garrofó, es ingrediente de la paella valenciana.",
    uses: [
      "Paella valenciana (garrofó)",
      "Pallares guisados (Perú)",
      "Ensaladas mediterráneas",
      "Butter beans al horno con tomate (Reino Unido)",
    ],
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
    scientificName: "Capsicum annuum",
    alsoKnownAs: [
      "Roasted red pepper",
      "Pimiento rojo",
      "Pimiento asado",
      "Bell pepper",
    ],
    about:
      "Pimiento rojo de pulpa gruesa y sabor dulce, sin picor. Se conserva en tiras o entero para mantener su color intenso y su textura carnosa. Es un ingrediente habitual en la cocina española, latinoamericana y mediterránea, tanto para dar sabor como para decorar.",
    uses: [
      "Arroz con pollo y paella",
      "Ensaladas y antipastos",
      "Salsa romesco y cremas",
      "Pizzas, sándwiches y rellenos de aceitunas",
    ],
  },
  {
    id: "zarandaja",
    name: "Zarandaja",
    category: "conservas",
    shortDescription:
      "Zarandaja en conserva, una legumbre versátil y lista para su uso.",
    description:
      "Zarandaja en presentación conserva de 425 gr x 24 latas. Conocida también como Frijol Zarandaja o Val Bean, es una opción práctica para distintas preparaciones culinarias y abastecimiento comercial.",
    image: "/images/products/zarandaja.png",
    unit: "Conserva 425g",
    available: true,
    scientificName: "Lablab purpureus",
    alsoKnownAs: [
      "Hyacinth bean",
      "Lablab bean",
      "Val bean",
      "Frijol zarandaja",
      "Cancate",
    ],
    about:
      "Legumbre tradicional del norte del Perú, sobre todo de Piura y Lambayeque, donde también se le llama cancate. Es un grano pequeño, de sabor suave y textura firme, poco conocido fuera de la región y de la India, donde se le llama «val». Su escasa oferta internacional la vuelve un producto diferencial.",
    uses: [
      "Menestra de zarandaja con arroz (Piura, Lambayeque)",
      "Acompañamiento de seco de cabrito y cebiche",
      "Ensaladas frías",
      "Curry de val (India)",
    ],
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
    scientificName: "Cicer arietinum",
    alsoKnownAs: [
      "Chickpea",
      "Garbanzo bean",
      "Chana",
    ],
    about:
      "Una de las legumbres más antiguas que se cultivan, originaria de Medio Oriente. Su grano redondo, de color beige y sabor a nuez, mantiene su forma al cocinarse. Es alto en proteína y fibra y es la base de platos de la cocina mediterránea, árabe, india y latinoamericana.",
    uses: [
      "Hummus y falafel",
      "Cocido y potajes (España)",
      "Chana masala (India)",
      "Ensaladas y garbanzos tostados",
    ],
  },
];

export const CATEGORIES = [
  { value: "all", label: "Todos los productos" },
  //  { value: "enlatados",  label: "Enlatados"           },
  { value: "conservas", label: "Conservas" },
  // { value: "congelados", label: "Congelados"          },
] as const;
