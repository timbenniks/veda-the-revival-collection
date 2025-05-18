import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHeader, getProduct } from "@/lib/contentstack";
import { createOgTags, isPreview, getVariantParam } from "@/lib/helpers";
import Product from "@/components/Product";
import PreviewClient from "@/components/PreviewClient";

export const revalidate = 60;

interface ProductParams {
  line: string;
  slug: string;
}

interface ProductPageProps {
  params: Promise<ProductParams>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({
  params,
  searchParams,
}: ProductPageProps): Promise<Metadata> {
  try {
    const { line, slug } = await params;
    const query = await searchParams;
    const path = `/products/${line}/${slug}`;
    const variantParam = getVariantParam(query);

    const response = await getProduct(path, variantParam);

    if (!response || !response.entry) {
      return {
        title: "Product Not Found",
        description: "The requested product could not be found",
      };
    }

    return createOgTags(response.entry);
  } catch (error) {
    console.error("Error generating product metadata:", error);
    return {
      title: "Error",
      description: "An error occurred while loading this product",
    };
  }
}

export default async function ProductPage({
  params,
  searchParams,
}: ProductPageProps) {
  try {
    const { line, slug } = await params;
    const query = await searchParams;
    const path = `/products/${line}/${slug}`;
    const variantParam = getVariantParam(query);

    if (isPreview) {
      return (
        <PreviewClient
          path={path}
          variantParam={variantParam}
          type="productOrPdp"
        />
      );
    }

    const response = await getProduct(path, variantParam);

    if (!response || !response.entry) {
      return notFound();
    }

    const { entry, contentType } = response;
    const header = await getHeader();

    return <Product entry={entry} contentType={contentType} header={header} />;
  } catch (error) {
    console.error("Error loading product:", error);
    throw error;
  }
}
