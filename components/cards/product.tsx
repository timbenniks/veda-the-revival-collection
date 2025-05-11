import Title from "../atoms/Title";
import { Product } from "@/types/contentstack";

interface ProductCardProps {
  $?: any;
  product: Product;
}

export default function ProductCard({ $, product }: ProductCardProps) {
  return (
    <li className="">
      <Title
        $={$.title}
        text={product.title}
        theme={"dark"}
        uppercase={true}
        size="sm"
        classes="mb-2"
        weight="medium"
      />
    </li>
  );
}
