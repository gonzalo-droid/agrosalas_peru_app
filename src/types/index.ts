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
