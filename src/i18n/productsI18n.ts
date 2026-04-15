import type { Product } from "@/types";
import type { Locale } from "./translations";

type ProductText = {
  name: string;
  shortDescription: string;
  description: string;
  unit: string;
};

const EN: Record<string, ProductText> = {
  "frijol-castilla": {
    name: "Castilla Bean (Blackeye)",
    shortDescription:
      "Peruvian castilla bean, cooked and preserved in brine.",
    description:
      "Castilla Bean in a 425 g can x 24 cans presentation. A versatile product, internationally known as Blackeye Beans, suitable for a wide range of food preparations and commercial use.",
    unit: "Canned 425 g",
  },
  "frejol-rojo": {
    name: "Red Kidney Bean",
    shortDescription:
      "Red Kidney Bean in a can, practical and ready for multiple recipes.",
    description:
      "Red Kidney Bean in a 425 g can x 24 cans presentation. Known as Light Red Kidney, it's an ideal option for nutritious dishes, with great yield and easy storage.",
    unit: "Canned 425 g",
  },
  "frijol-canario": {
    name: "Canary Bean",
    shortDescription:
      "Canary Bean in a can, with a smooth texture, excellent for traditional dishes.",
    description:
      "Canary Bean in a 425 g can x 24 cans presentation. Also known as Canary Bean, it stands out for its pleasant flavor and its frequent use in home and industrial recipes.",
    unit: "Canned 425 g",
  },
  "frijol-negro": {
    name: "Black Bean",
    shortDescription: "Black beans cooked in brine, ready to use.",
    description:
      "Selected black beans, cooked and preserved in natural brine. Rich in protein, fiber and antioxidants. Ideal for soups, rice dishes and stews.",
    unit: "Canned 425 g",
  },
  "gandul-agua-sal": {
    name: "Pigeon Peas in Water and Salt",
    shortDescription:
      "Pigeon peas cooked and preserved in salted water.",
    description:
      "Selected pigeon peas, cooked to the right point and preserved in naturally salted water. Ready to use, ideal for stews, soups and salads.",
    unit: "Canned 425 g",
  },
  "gandul-coco": {
    name: "Pigeon Peas with Coconut",
    shortDescription:
      "Pigeon peas cooked in coconut milk, with a creamy tropical flavor.",
    description:
      "Pigeon peas cooked in natural coconut milk, with a smooth and aromatic taste. Perfect as a side dish or base for Caribbean and tropical recipes.",
    unit: "Canned 425 g",
  },
  "gandul-seco": {
    name: "Dry Pigeon Peas",
    shortDescription:
      "Selected dry pigeon peas, ready to cook.",
    description:
      "High-quality dry pigeon peas, grown and sun-dried naturally. Excellent source of plant protein. Ideal for soups, stews and traditional dishes.",
    unit: "Canned 425 g",
  },
  "pallar-americano": {
    name: "American Lima Bean",
    shortDescription:
      "American Lima Bean in a can, ideal for nutritious recipes with great yield.",
    description:
      "First-selection Peruvian lima bean, cooked to the right point and preserved in natural brine. Ready to use in stews, salads and traditional dishes.",
    unit: "Canned 425 g",
  },
  "pallar-bebe": {
    name: "Baby Lima Bean",
    shortDescription: "Peruvian baby lima bean in brine, tender and nutritious.",
    description:
      "Small-caliber baby lima bean, harvested young and preserved in brine. Mild flavor and creamy texture — ideal for salads, sides and creamy dishes.",
    unit: "Canned 425 g",
  },
  "pallar-salmuera": {
    name: "Lima Bean in Brine",
    shortDescription:
      "Peruvian lima bean cooked and preserved in natural brine.",
    description:
      "First-selection Peruvian lima bean, cooked to the right point and preserved in natural brine. Ready to use in stews, salads and traditional dishes.",
    unit: "Canned 425 g",
  },
  "pimiento-morron": {
    name: "Bell Pepper",
    shortDescription:
      "Canned Bell Pepper, ideal to complement a wide range of recipes.",
    description:
      "Bell Pepper in a 290 g can presentation. Known as Bell Pepper, it's a practical product for gastronomic use, with great yield and easy storage.",
    unit: "Canned 290 g",
  },
  "zarandaja": {
    name: "Zarandaja (Val Bean)",
    shortDescription:
      "Zarandaja in a can — a versatile legume ready to use.",
    description:
      "Zarandaja in a 425 g can x 24 cans presentation. Also known as Val Bean, it's a practical option for a range of culinary preparations and commercial supply.",
    unit: "Canned 425 g",
  },
  "garbanzo": {
    name: "Chickpea",
    shortDescription: "Chickpea cooked in brine, versatile and nutritious.",
    description:
      "Selected chickpea, cooked and preserved in natural brine. High in protein and fiber. Perfect for hummus, salads, stews and soups.",
    unit: "Canned 425 g",
  },
};

export function getProductText(product: Product, locale: Locale): ProductText {
  if (locale === "en" && EN[product.id]) return EN[product.id];
  return {
    name: product.name,
    shortDescription: product.shortDescription,
    description: product.description,
    unit: product.unit,
  };
}
