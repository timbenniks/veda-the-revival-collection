import type { Page as PageProps } from "@/types/types";
import { ComponentsRenderer } from "./ComponentRenderer";

export default function Page({ page }: { page: PageProps }) {
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
