import type { Product as ProductProps } from "@/types/types";
import ProductDetails from "./ProductDetails";

export default function Page({ product }: { product: ProductProps }) {
  return <ProductDetails product={product} />;
}
