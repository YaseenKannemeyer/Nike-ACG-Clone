import ProductCard from "./ProductCard";
import type { Product } from "@/types";

interface Props {
  products: Product[];
  category?: string;
}

export default function ProductList({ products, category }: Props) {
  const filtered = category
    ? products.filter((p) => p.category === category)
    : products;

  if (filtered.length === 0) {
    return (
      <div className="py-16 text-center text-white/30 text-sm">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
      {filtered.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
