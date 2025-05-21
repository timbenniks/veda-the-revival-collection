import { Product as ProductProps } from "@/types/types";
import Title from "./atoms/Title";
import MediaItem from "./atoms/MediaItem";
import Link from "next/link";
import { isPreview } from "@/lib/helpers";
import React from "react";

export default function ProductDetails({ product }: { product: ProductProps }) {
  const { title, description, media, price, product_line, taxonomies, $ } =
    product;

  console.log($);

  const materials = taxonomies
    ?.filter((taxonomy) => taxonomy?.taxonomy_uid === "materials")
    .map((taxonomy) => taxonomy?.term_uid);

  function renderCurrency(price: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price / 100);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="order-1 lg:order-2">
        <article className="text-center p-8 lg:px-36 lg:sticky lg:top-[50vh] lg:-translate-y-2/4">
          {product_line && product_line[0] && (
            <p
              className="text-xs uppercase font-light"
              {...($ && $.product_line)}
            >
              <Link href={product_line[0]?.url || "#"}>
                {product_line[0]?.title}
              </Link>
            </p>
          )}
          {title && (
            <Title
              $={$ && $.title}
              text={title}
              uppercase={true}
              size="lg"
              classes="mb-4"
            />
          )}
          {materials && (
            <ul
              className="flex space-between justify-center space-x-4 mb-4"
              {...($ && $.taxonomies)}
            >
              {materials.map((material, index) => {
                return (
                  <li key={`material--${index}`} className="text-xs font-light">
                    {material}
                  </li>
                );
              })}
            </ul>
          )}

          {description && (
            <p className="font-light mb-8" {...($ && $.description)}>
              {description}
            </p>
          )}
          <div className="flex justify-around mb-4 px-12 items-center">
            <button className="block px-2 py-1 border-b border-black no-underline uppercase bg-black text-white hover:text-black hover:bg-white cursor-pointer">
              BUY NOW
            </button>
            {price && (
              <p className="font-bold text-sm">
                {isPreview ? (
                  <span {...($ && $.price)}>{price}</span>
                ) : (
                  renderCurrency(price)
                )}
              </p>
            )}
          </div>
        </article>
      </div>

      <div
        className="order-2 lg:order-1"
        {...($ && $.media)}
        {...($ && $.media__parent)}
      >
        {media &&
          media.map((item, index) => (
            <React.Fragment key={`media--${index}`}>
              {item.content_type === "video/mp4" ? (
                <video
                  {...($ && $[`media__${index}`])}
                  autoPlay
                  loop
                  muted
                  playsInline
                  src={item?.url}
                  className=""
                />
              ) : (
                <MediaItem
                  {...($ && $[`media__${index}`])}
                  src={item?.url}
                  width={720}
                  height={720}
                  ratio={720 / 720}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  sizes="50vw"
                  widths={[480, 960, 1440]}
                  alt={title || item.title || ""}
                  className="aspect-square"
                />
              )}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}
