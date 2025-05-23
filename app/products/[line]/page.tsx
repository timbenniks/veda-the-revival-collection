import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHeader, getProductLine } from "@/lib/contentstack";
import { createOgTags, isPreview } from "@/lib/helpers";
import PreviewClient from "@/components/pages/PreviewClient";
import ProductLine from "@/components/pages/ProductLine";

export const revalidate = 60;

interface ProductParams {
  line: string;
  slug: string;
}

interface ProductLinePageProps {
  params: Promise<ProductParams>;
}

export async function generateMetadata({
  params,
}: ProductLinePageProps): Promise<Metadata> {
  try {
    const { line } = await params;
    const path = `/products/${line}`;
    const entry = await getProductLine(path);

    if (!entry) {
      return {
        title: "Product line Not Found",
        description: "The requested product line could not be found",
      };
    }

    return createOgTags(entry);
  } catch (error) {
    console.error("Error generating product metadata:", error);
    return {
      title: "Error",
      description: "An error occurred while loading this product",
    };
  }
}

export default async function ProductLinePage({
  params,
}: ProductLinePageProps) {
  try {
    const { line } = await params;
    const path = `/products/${line}`;

    if (isPreview) {
      return <PreviewClient path={path} type="productLine" />;
    }

    const entry = await getProductLine(path);

    if (!entry) {
      return notFound();
    }

    const header = await getHeader();

    return <ProductLine entry={entry} header={header} />;
  } catch (error) {
    console.error("Error loading product:", error);
    throw error;
  }
}
