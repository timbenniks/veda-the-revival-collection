import { Category, Product, ProductLine } from "@/types/contentstack";
import Title from "./atoms/Title";
import ProductCard from "./cards/product";

interface ListProps {
  $?: any;
  title: string;
  reference: Product[];
}

export default function List({ title, reference, $ }: ListProps) {
  return (
    <div className="mx-auto bg-white text-center p-10">
      <Title
        $={$.title}
        text={title}
        theme={"dark"}
        uppercase={true}
        size="lg"
        classes="mb-10"
      />
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-around">
        {reference.map((item) => (
          <ProductCard key={item.uid} $={item.$} product={item} />
        ))}
      </ul>
    </div>
  );
}
