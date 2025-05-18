import { Product as ProductProps } from "@/types/types";

export default function ProductDetails({ product }: { product: ProductProps }) {
  return (
    <>
      dd
      <pre>{JSON.stringify(product, null, 2)}</pre>
    </>
  );
}
