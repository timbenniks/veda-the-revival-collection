import type { Page as PageType, Pdp } from "@/types/types";
import { ComponentsRenderer } from "./ComponentRenderer";

export default function Page({ page }: { page: PageType | Pdp }) {
  const components = page?.components || [];
  return (
    <>
      {components && (
        <ComponentsRenderer
          components={components}
          cslp={page.$}
          cslpWrapper="components"
        />
      )}
    </>
  );
}
