import type { Page as PageType } from "@/types/contentstack";
import { ComponentsRenderer } from "./ComponentRenderer";

export default function Page({ page }: { page: PageType }) {
  const components = page?.components || [];
  return (
    <>
      {components ? (
        <ComponentsRenderer
          components={page?.components || []}
          cslp={page.$}
          cslpWrapper="components"
        />
      ) : null}
    </>
  );
}
