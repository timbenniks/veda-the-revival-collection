import type { Page as PageType } from "@/types/contentstack";
import { ComponentsRenderer } from "./ComponentRenderer";

export default function Page({ page }: { page: PageType }) {
  return (
    <ComponentsRenderer components={page?.components || []} cslp={page.$} />
  );
}
