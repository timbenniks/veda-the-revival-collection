import { isPreview } from "@/lib/helpers";
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
          as="h2"
        />
      )}
      {reference && reference.length && (
        <ul
          className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-around"
          {...($ && $.reference)}
        >
          {reference.map((item, index) =>
            isPreview ? (
              <div key={item.uid} {...($ && $[`reference__${index}`])}>
                <ProductCard $={item.$} product={item} />
              </div>
            ) : (
              <ProductCard key={item.uid} $={item.$} product={item} />
            )
          )}
        </ul>
      )}
    </div>
  );
}
