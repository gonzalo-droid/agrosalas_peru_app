import type { Product } from "@/types";
import type { Locale } from "./translations";

type ProductText = {
  name: string;
  shortDescription: string;
  description: string;
  unit: string;
  alsoKnownAs?: string[];
  about?: string;
  uses?: string[];
};

const EN: Record<string, ProductText> = {
  "frijol-castilla": {
    name: "Castilla Bean (Blackeye)",
    shortDescription:
      "Peruvian castilla bean, cooked and preserved in brine.",
    description:
      "Castilla Bean in a 425 g can x 24 cans presentation. A versatile product, internationally known as Blackeye Beans, suitable for a wide range of food preparations and commercial use.",
    unit: "Canned 425 g",
    alsoKnownAs: [
      "Black-eyed pea",
      "Cowpea",
      "Castilla bean",
      "Frijol carita",
    ],
    about:
      "A cream-colored bean with a distinctive black spot, the “eye”. Originally from Africa, it is grown on Peru’s northern coast, where it thrives in the warm, dry climate. It has a thin skin, a smooth texture and a slightly earthy flavor that takes on seasonings well.",
    uses: [
      "Cold salads with onion, tomato and lime",
      "Hoppin’ John and Texas caviar (Southern US)",
      "Stews and bean dishes served with rice",
      "Acarajé and bean fritters (Brazil, West Africa)",
    ],
  },
  "frijol-rojo": {
    name: "Red Kidney Bean",
    shortDescription:
      "Red Kidney Bean in a can, practical and ready for multiple recipes.",
    description:
      "Red Kidney Bean in a 425 g can x 24 cans presentation. Known as Light Red Kidney, it's an ideal option for nutritious dishes, with great yield and easy storage.",
    unit: "Canned 425 g",
    alsoKnownAs: [
      "Light red kidney bean",
      "Habichuela roja",
      "Red bean",
    ],
    about:
      "A kidney-shaped, light red bean with a firm skin that keeps the grain whole during cooking. It is one of the most widely eaten legumes in the Spanish-speaking Caribbean and the United States, and provides plant protein, fiber and iron.",
    uses: [
      "Habichuelas guisadas (Puerto Rico, Dominican Republic)",
      "Chili con carne",
      "Red beans and rice (Louisiana)",
      "Salads and grain bowls",
    ],
  },
  "frijol-canario": {
    name: "Canary Bean",
    shortDescription:
      "Canary Bean in a can, with a smooth texture, excellent for traditional dishes.",
    description:
      "Canary Bean in a 425 g can x 24 cans presentation. Also known as Canary Bean, it stands out for its pleasant flavor and its frequent use in home and industrial recipes.",
    unit: "Canned 425 g",
    alsoKnownAs: [
      "Peruano bean",
      "Mayocoba bean",
      "Canary bean",
      "Frijol peruano",
    ],
    about:
      "A pale yellow bean typical of Peru’s coast and Andean valleys. In Mexico and the United States it is sold as “Peruano” or “Mayocoba” bean. It cooks up very creamy with a mild flavor, which makes it the favorite bean for Peruvian bean dishes.",
    uses: [
      "Beans with seco stew or rice (Peru)",
      "Tacu tacu (Peruvian rice and bean patty)",
      "Refried beans (Mexico)",
      "Soups and creamy purées",
    ],
  },
  "frijol-negro": {
    name: "Black Bean",
    shortDescription: "Black beans cooked in brine, ready to use.",
    description:
      "Selected black beans, cooked and preserved in natural brine. Rich in protein, fiber and antioxidants. Ideal for soups, rice dishes and stews.",
    unit: "Canned 425 g",
    alsoKnownAs: [
      "Black turtle bean",
      "Black bean",
      "Caraota negra",
      "Habichuela negra",
    ],
    about:
      "A small bean with a glossy black skin and white flesh, an intense flavor and a firm texture. It is a staple in Cuban, Venezuelan, Brazilian, Mexican and Central American cooking. Its dark color comes from anthocyanins, the same antioxidants found in grapes and blueberries.",
    uses: [
      "Moros y cristianos (Cuba)",
      "Feijoada (Brazil)",
      "Pabellón criollo (Venezuela)",
      "Black bean soup, burritos and tacos",
    ],
  },
  "gandul-agua-sal": {
    name: "Pigeon Peas in Water and Salt",
    shortDescription:
      "Pigeon peas cooked and preserved in salted water.",
    description:
      "Selected pigeon peas, cooked to the right point and preserved in naturally salted water. Ready to use, ideal for stews, soups and salads.",
    unit: "Canned 425 g",
    alsoKnownAs: [
      "Green pigeon peas",
      "Gandules",
      "Gungo peas",
      "Toor",
    ],
    about:
      "Pigeon pea is a shrub legume native to India that has adapted very well to northern Peru, in Piura and Lambayeque. It is harvested green, while the grain is tender, and packed in salted water to keep its color and its characteristic, slightly sweet and herbal flavor.",
    uses: [
      "Arroz con gandules (Puerto Rico)",
      "Sancocho and pigeon pea soup",
      "Salads",
      "Stews with pork or chicken",
    ],
  },
  "gandul-coco": {
    name: "Pigeon Peas with Coconut",
    shortDescription:
      "Pigeon peas cooked in coconut milk, with a creamy tropical flavor.",
    description:
      "Pigeon peas cooked in natural coconut milk, with a smooth and aromatic taste. Perfect as a side dish or base for Caribbean and tropical recipes.",
    unit: "Canned 425 g",
    alsoKnownAs: [
      "Pigeon peas with coconut",
      "Guandules con coco",
      "Gandules con coco",
    ],
    about:
      "Green pigeon peas cooked in coconut milk, a classic pairing in Caribbean cooking. The coconut adds creaminess and a sweet aroma that complements the herbal flavor of the peas. It comes ready to heat and serve.",
    uses: [
      "Moro de guandules con coco (Dominican Republic)",
      "Rice with pigeon peas and coconut (Panama, Colombian Caribbean)",
      "Side dish for fish and seafood",
      "Base for tropical stews",
    ],
  },
  "gandul-seco": {
    name: "Dry Pigeon Peas",
    shortDescription:
      "Selected dry pigeon peas, ready to cook.",
    description:
      "High-quality dry pigeon peas, grown and sun-dried naturally. Excellent source of plant protein. Ideal for soups, stews and traditional dishes.",
    unit: "Canned 425 g",
    alsoKnownAs: [
      "Dry pigeon peas",
      "Mature pigeon peas",
      "Toor",
      "Arhar",
    ],
    about:
      "Pigeon peas harvested once the grain is mature and dry, darker in color and more intense in flavor than green pigeon peas. They are rich in plant protein, and in India they are the base of dal, one of the country’s most eaten dishes.",
    uses: [
      "Toor dal and sambar (India)",
      "Soups and pottages",
      "Stews served with rice",
      "Bean dishes from northern Peruvian cooking",
    ],
  },
  "pallar-americano": {
    name: "American Lima Bean",
    shortDescription:
      "American Lima Bean in a can, ideal for nutritious recipes with great yield.",
    description:
      "First-selection Peruvian lima bean, cooked to the right point and preserved in natural brine. Ready to use in stews, salads and traditional dishes.",
    unit: "Canned 425 g",
    alsoKnownAs: [
      "Lima bean",
      "Butter bean",
      "Pallar",
    ],
    about:
      "The lima bean was domesticated in Peru thousands of years ago: it appears in archaeological remains on the coast and in Moche pottery. It is a large, flat, cream-colored bean with a buttery texture when cooked, grown mainly in Ica and on the northern coast.",
    uses: [
      "Stewed lima beans with rice (Peru)",
      "Lima bean salad",
      "Succotash (US)",
      "Purées and creamy soups",
    ],
  },
  "pallar-bebe": {
    name: "Baby Lima Bean",
    shortDescription: "Peruvian baby lima bean in brine, tender and nutritious.",
    description:
      "Small-caliber baby lima bean, harvested young and preserved in brine. Mild flavor and creamy texture — ideal for salads, sides and creamy dishes.",
    unit: "Canned 425 g",
    alsoKnownAs: [
      "Baby lima bean",
      "Small lima bean",
      "Baby butter bean",
    ],
    about:
      "A small-seeded lima bean variety with a thin skin. It cooks faster than the large lima bean and turns tender and creamy, with a mild, slightly sweet flavor. It is the form most used in salads and side dishes.",
    uses: [
      "Cold and warm salads",
      "Side dish for meat and fish",
      "Succotash and vegetable soups",
      "Creamy soups and spreads",
    ],
  },
  "pallar-salmuera": {
    name: "Lima Bean in Brine",
    shortDescription:
      "Peruvian lima bean cooked and preserved in natural brine.",
    description:
      "First-selection Peruvian lima bean, cooked to the right point and preserved in natural brine. Ready to use in stews, salads and traditional dishes.",
    unit: "Canned 425 g",
    alsoKnownAs: [
      "Lima beans in brine",
      "Butter beans",
      "Garrofó",
    ],
    about:
      "Large lima beans packed in brine, ready to use. Lima beans from Ica, Peru’s best-known growing area, hold a designation of origin recognized by INDECOPI. In Spain a lima bean variety, garrofó, is an ingredient of Valencian paella.",
    uses: [
      "Valencian paella (garrofó)",
      "Stewed lima beans (Peru)",
      "Mediterranean salads",
      "Baked butter beans in tomato sauce (UK)",
    ],
  },
  "pimiento-morron": {
    name: "Bell Pepper",
    shortDescription:
      "Canned Bell Pepper, ideal to complement a wide range of recipes.",
    description:
      "Bell Pepper in a 290 g can presentation. Known as Bell Pepper, it's a practical product for gastronomic use, with great yield and easy storage.",
    unit: "Canned 290 g",
    alsoKnownAs: [
      "Roasted red pepper",
      "Pimiento",
      "Red bell pepper",
    ],
    about:
      "A thick-fleshed red pepper with a sweet flavor and no heat. It is preserved whole or in strips to keep its bright color and meaty texture. It is a common ingredient in Spanish, Latin American and Mediterranean cooking, both for flavor and as a garnish.",
    uses: [
      "Arroz con pollo and paella",
      "Salads and antipasti",
      "Romesco sauce and creamy soups",
      "Pizzas, sandwiches and stuffed olives",
    ],
  },
  "zarandaja": {
    name: "Zarandaja (Val Bean)",
    shortDescription:
      "Zarandaja in a can — a versatile legume ready to use.",
    description:
      "Zarandaja in a 425 g can x 24 cans presentation. Also known as Val Bean, it's a practical option for a range of culinary preparations and commercial supply.",
    unit: "Canned 425 g",
    alsoKnownAs: [
      "Hyacinth bean",
      "Lablab bean",
      "Val bean",
      "Zarandaja",
    ],
    about:
      "A traditional legume from northern Peru, especially Piura and Lambayeque, where it is also called cancate. It is a small bean with a mild flavor and firm texture, little known outside the region and India, where it is called “val”. Its limited international supply makes it a distinctive product.",
    uses: [
      "Zarandaja beans with rice (Piura, Lambayeque)",
      "Side for goat stew and ceviche",
      "Cold salads",
      "Val curry (India)",
    ],
  },
  "garbanzo": {
    name: "Chickpea",
    shortDescription: "Chickpea cooked in brine, versatile and nutritious.",
    description:
      "Selected chickpea, cooked and preserved in natural brine. High in protein and fiber. Perfect for hummus, salads, stews and soups.",
    unit: "Canned 425 g",
    alsoKnownAs: [
      "Chickpea",
      "Garbanzo bean",
      "Chana",
    ],
    about:
      "One of the oldest cultivated legumes, native to the Middle East. Its round, beige grain has a nutty flavor and holds its shape when cooked. It is high in protein and fiber and is the base of dishes from Mediterranean, Middle Eastern, Indian and Latin American cooking.",
    uses: [
      "Hummus and falafel",
      "Spanish cocido and stews",
      "Chana masala (India)",
      "Salads and roasted chickpeas",
    ],
  },
};

export function getProductText(product: Product, locale: Locale): ProductText {
  const es: ProductText = {
    name: product.name,
    shortDescription: product.shortDescription,
    description: product.description,
    unit: product.unit,
    alsoKnownAs: product.alsoKnownAs,
    about: product.about,
    uses: product.uses,
  };
  const en = locale === "en" ? EN[product.id] : undefined;
  if (!en) return es;
  // Campo por campo: lo que falte en inglés cae al español.
  return {
    ...en,
    alsoKnownAs: en.alsoKnownAs ?? es.alsoKnownAs,
    about: en.about ?? es.about,
    uses: en.uses ?? es.uses,
  };
}
