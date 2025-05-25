import type {
  Page as PageProps,
  MegaMenu as MegaMenuProps,
} from "@/types/types";

import { ComponentsRenderer } from "@/components/ComponentRenderer";
import MegaMenu from "../MegaMenu";
import Footer from "../Footer";

export default function Page({
  page,
  header,
}: {
  page: PageProps;
  header?: MegaMenuProps;
}) {
  const components = page?.components || [];
  return (
    <>
      {header && (
        <MegaMenu header={header.header} product_lines={header.product_lines} />
      )}
      {components && (
        <ComponentsRenderer
          components={components}
          cslp={page.$}
          cslpWrapper="components"
        />
      )}
      <Footer />
    </>
  );
}
