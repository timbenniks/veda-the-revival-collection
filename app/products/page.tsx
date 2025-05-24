import { Metadata } from "next";
import AlgoliaSearch from "@/components/AlgoliaSearch";
import { cache } from "react";
import { getHeader } from "@/lib/contentstack";

export const dynamic = "force-dynamic";
export const revalidate = 60;

const getHeaderCached = cache(getHeader);

export async function generateMetadata(): Promise<Metadata> {
  try {
    return {
      title: "Veda Products",
      description: "Find Products",
    };
  } catch (error) {
    console.error("Error generating product metadata:", error);
    return {
      title: "Error",
      description: "An error occurred while loading this product",
    };
  }
}

export default async function ProductLinePage() {
  try {
    const header = await getHeaderCached();

    return <AlgoliaSearch header={header} />;
  } catch (error) {
    console.error("Error loading product:", error);
    throw error;
  }
}
