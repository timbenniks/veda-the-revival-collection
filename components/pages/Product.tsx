import type {
  Pdp as PdpProps,
  Product as ProductProps,
  MegaMenu as MegaMenuProps,
} from "@/types/types";
import ProductDetails from "@/components/ProductDetails";
import { ComponentsRenderer } from "@/components/ComponentRenderer";
import List from "@/components/List";
import Breadcrumb from "@/components/Breadcrumb";
import MegaMenu from "../MegaMenu";
import Footer from "../Footer";
import JstagSender from "@/components/JstagSender";

export default function Page({
  entry,
  contentType,
  header,
}: {
  entry?: ProductProps | PdpProps;
  contentType?: "pdp" | "product";
  header?: MegaMenuProps;
}) {
  const breadcrumbLinks = [
    { title: "Home", url: "/" },
    { title: "Products", url: "/products" },
  ];

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
      {header && (
        <MegaMenu header={header.header} product_lines={header.product_lines} />
      )}

      <JstagSender
        data={{
          category:
            entry && "category" in entry && Array.isArray(entry.category)
              ? entry.category?.[0]?.title?.toLowerCase()
              : undefined,
        }}
      />

      <Breadcrumb links={breadcrumbLinks} />
      {entry && (
        <>
          <ProductDetails
            product={"product" in entry ? entry.product?.[0] || entry : entry}
          />
        </>
      )}

      {contentType === "product" && entry && "product_line" in entry && (
        <>
          <List
            uid="product_line"
            _version={1}
            reference={entry.product_line?.[0].products || []}
            title={`Explore ${entry.product_line?.[0].title}`}
            title_tag="h2"
            description={entry.product_line?.[0].description}
            load_first_image_eager={true}
            $={entry.$}
          />

          <List
            uid="category"
            _version={1}
            reference={entry.category?.[0].products || []}
            title={`More ${entry.category?.[0].title}`}
            title_tag="h2"
            description={entry.category?.[0].description}
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

      <Footer />
    </>
  );
}
