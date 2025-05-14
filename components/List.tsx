import { isPreview } from "@/lib/helpers";
import Title from "./atoms/Title";
import ProductCard from "./cards/product";
import CategoryCard from "./cards/category";
import { List as ListProps } from "@/types/types";
import { twMerge } from "tailwind-merge";

export default function List({ title, title_tag, reference, $ }: ListProps) {
  const getGridColumns = () => {
    if (reference.length <= 3) {
      return `md:grid-cols-3`;
    }

    return "md:grid-cols-4";
  };

  return (
    <div className="mx-auto bg-white text-center p-10">
      {title && (
        <Title
          $={$ && $.title}
          text={title}
          theme={"dark"}
          uppercase={true}
          size="lg"
          classes="mb-10 text-2xl"
          as={title_tag || "h3"}
        />
      )}
      {reference && reference.length && (
        <ul
          className={twMerge(
            "grid grid-cols-1",
            getGridColumns(),
            "gap-10 justify-around md:px-24"
          )}
          {...($ && $.reference)}
        >
          {reference.map((item, index) =>
            isPreview ? (
              <div key={item.uid} {...($ && $[`reference__${index}`])}>
                {item?._content_type_uid === "product" && (
                  <ProductCard $={item.$} product={item} />
                )}
                {item?._content_type_uid === "category" && (
                  <CategoryCard $={item.$} category={item} />
                )}
              </div>
            ) : (
              <>
                {item?._content_type_uid === "product" && (
                  <ProductCard key={item.uid} $={item.$} product={item} />
                )}
                {item?._content_type_uid === "category" && (
                  <CategoryCard key={item.uid} $={item.$} category={item} />
                )}
              </>
            )
          )}
        </ul>
      )}
    </div>
  );
}
