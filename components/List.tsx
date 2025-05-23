import { isPreview } from "@/lib/helpers";
import Title from "./atoms/Title";
import ProductCard from "./cards/product";
import CategoryCard from "./cards/category";
import { List as BaseListProps } from "@/types/types";
import { twMerge } from "tailwind-merge";
import React from "react";

interface ListProps extends BaseListProps {
  cslpName?: string;
}

// @TODO: add modular block for custom static cards, add references, or add add query.
export default function List({
  title,
  title_tag,
  description,
  reference,
  load_first_image_eager,
  $,
  cslpName = "reference",
}: ListProps) {
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
          classes="mb-2 text-2xl"
          as={title_tag || "h3"}
        />
      )}

      {description && (
        <p
          {...($ && $.description)}
          className="font-light text-center mb-8 max-w-prose mx-auto"
        >
          {description}
        </p>
      )}

      {reference && reference.length && (
        <ul
          className={twMerge(
            "mt-8 grid grid-cols-1",
            getGridColumns(),
            "gap-10 justify-around md:px-24"
          )}
          {...($ && $[cslpName])}
        >
          {reference.map((item, index) =>
            isPreview ? (
              <div key={item.uid} {...($ && $[`${cslpName}__${index}`])}>
                {item?._content_type_uid === "product" && (
                  <ProductCard
                    $={item.$}
                    product={item}
                    loading={
                      index === 0 && load_first_image_eager ? "eager" : "lazy"
                    }
                  />
                )}
                {item?._content_type_uid === "category" && (
                  <CategoryCard
                    $={item.$}
                    category={item}
                    loading={
                      index === 0 && load_first_image_eager ? "eager" : "lazy"
                    }
                  />
                )}
              </div>
            ) : (
              <React.Fragment key={item.uid}>
                {item?._content_type_uid === "product" && (
                  <ProductCard
                    key={item.uid}
                    $={item.$}
                    product={item}
                    loading={
                      index === 0 && load_first_image_eager ? "eager" : "lazy"
                    }
                  />
                )}
                {item?._content_type_uid === "category" && (
                  <CategoryCard
                    key={item.uid}
                    $={item.$}
                    category={item}
                    loading={
                      index === 0 && load_first_image_eager ? "eager" : "lazy"
                    }
                  />
                )}
              </React.Fragment>
            )
          )}
        </ul>
      )}
    </div>
  );
}
