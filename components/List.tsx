import Title from "./atoms/Title";
import ProductCard from "./cards/product";
import { List as ListProps } from "@/types/contentstack";

export default function List({ title, reference, $ }: ListProps) {
  return (
    <div className="mx-auto bg-white text-center p-10">
      {title && (
        <Title
          $={$.title}
          text={title}
          theme={"dark"}
          uppercase={true}
          size="lg"
          classes="mb-10"
        />
      )}
      {reference && reference.length && (
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-around">
          {reference.map((item) => (
            <ProductCard key={item.uid} $={item.$} product={item} />
          ))}
        </ul>
      )}
    </div>
  );
}
