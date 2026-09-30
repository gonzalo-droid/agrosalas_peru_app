export type ProductCategory = "enlatados" | "conservas" | "congelados";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  shortDescription: string;
  image: string;
  unit: string;
  available: boolean;
  featured?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

export interface CompanyValue {
  icon: string;
  title: string;
  description: string;
}

export interface EventItem {
  slug: string;        // URL /eventos/<slug> y carpeta public/images/event/<slug>/
  title: string;       // ES
  startDate: string;   // "YYYY-MM-DD"
  endDate?: string;    // "YYYY-MM-DD"; ausente = evento de un día
  city: string;
  venue?: string;
  summary: string;     // 1–2 frases: lead del detalle, SEO y texto al compartir
  body: string[];      // párrafos del detalle
  cover: string;       // "" = placeholder
  gallery: string[];
}
