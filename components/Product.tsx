import type {
  Pdp as PdpProps,
  Product as ProductProps,
  Header as Headerprops,
} from "@/types/types";
import ProductDetails from "./ProductDetails";
import { ComponentsRenderer } from "./ComponentRenderer";
import Header from "./Header";
import List from "./List";
import Breadcrumb from "./Breadcrumb";

export default function Page({
  entry,
  contentType,
  header,
}: {
  entry?: ProductProps | PdpProps;
  contentType?: "pdp" | "product";
  header?: Headerprops;
}) {
  const breadcrumbLinks = [{ title: "Home", url: "/" }];

  if (entry && "product_line" in entry && entry.product_line?.[0]) {
    breadcrumbLinks.push({
      title: entry.product_line[0].title,
      url: entry.product_line[0].url || "",
    });
  }

  if (entry?.title && entry?.url) {
    breadcrumbLinks.push({
      title: entry.title,
      url: entry.url || "",
    });
  }

  return (
    <>
      {header && <Header reference={[header]} />}
      <Breadcrumb links={breadcrumbLinks} />
      {entry && (
        <ProductDetails
          product={"product" in entry ? entry.product?.[0] || entry : entry}
        />
      )}

      {contentType === "product" && entry && "product_line" in entry && (
        <>
          <List
            uid="test"
            _version={1}
            reference={entry.product_line?.[0].products || []}
            title={`Explore ${entry.product_line?.[0].title}`}
            title_tag="h2"
            description={entry.product_line?.[0].description}
            load_first_image_eager={true}
            $={entry.$}
          />
        </>
      )}

      {contentType === "pdp" && entry && (
        <>
          {"components" in entry && entry.components && (
            <ComponentsRenderer
              components={entry.components}
              cslp={entry.$}
              cslpWrapper="components"
            />
          )}
        </>
      )}
    </>
  );
}
