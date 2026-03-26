export interface ProductColor {
  name: string;
  hex: string;
  image: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  category: "Shoes" | "Clothing" | "Equipment" | string;
  colors: ProductColor[];
  created_at?: string;
}

export type FilterCategory =
  | "All"
  | "Shoes"
  | "Hoodies"
  | "Accessories"
  | "T-Shirts"
  | "Pants"
  | "Hats"
  | "Bags"
  | "Watches"
  | "Jewelry";

export interface FilterState {
  category: FilterCategory;
  sort: string;
  gender: string[];
  price: string[];
  sale: boolean;
  colors: string[];
  height: string[];
  collection: string[];
}
