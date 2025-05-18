import type {
  Pdp as PdpProps,
  Product as ProductProps,
  Header as Headerprops,
} from "@/types/types";
import ProductDetails from "./ProductDetails";
import { ComponentsRenderer } from "./ComponentRenderer";
import Header from "./Header";

export default function Page({
  entry,
  contentType,
  header,
}: {
  entry?: ProductProps | PdpProps;
  contentType?: "pdp" | "product";
  header?: Headerprops;
}) {
  return (
    <>
      {header && <Header reference={[header]} />}

      {entry && (
        <ProductDetails
          product={"product" in entry ? entry.product?.[0] || entry : entry}
        />
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
