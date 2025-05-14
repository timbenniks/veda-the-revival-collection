import type { Page as PageType } from "@/types/types";
import { ComponentsRenderer } from "./ComponentRenderer";

export default function Page({ page }: { page: PageType }) {
  const components = page?.components || [];
  return (
    <>
      {/* <pre>{JSON.stringify(page, null, 2)}</pre> */}
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
