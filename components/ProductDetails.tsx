import { Product as ProductProps } from "@/types/types";

export default function ProductDetails({ product }: { product: ProductProps }) {
  return (
    <>
      {product.price ? (
        <h1>{product.price}</h1>
      ) : (
        <h1>no price for this product</h1>
      )}
    </>
  );
}
