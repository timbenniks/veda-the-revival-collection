import { Page } from "@/types/contentstack";
import { ComponentsRenderer } from "./ComponentRenderer";

export default function LandingPage({ page }: { page: Page }) {
  return (
    <main className="max-w-(--breakpoint-md) mx-auto">
      {page?.title ? (
        <h1 className="text-4xl font-bold mb-4" {...(page?.$ && page?.$.title)}>
          {page?.title}
        </h1>
      ) : null}

      <ComponentsRenderer components={page?.components || []} cslp={page.$} />
    </main>
  );
}
