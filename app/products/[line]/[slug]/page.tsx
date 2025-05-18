import { Metadata } from "next";
import { getHeader, getProduct } from "@/lib/contentstack";
import { createOgTags, isPreview, getVariantParam } from "@/lib/helpers";
import Product from "@/components/Product";
import PreviewClient from "@/components/PreviewClient";

export const revalidate = 60;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ line: string; slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const { line, slug } = await params;
  const query = await searchParams;
  const variantParam = getVariantParam(query);
  const path = `/products/${line}/${slug}`;
  const { entry } = await getProduct(path, variantParam);
  return createOgTags(entry);
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ line: string; slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { line, slug } = await params;
  const query = await searchParams;
  const variantParam = getVariantParam(query);
  const path = `/products/${line}/${slug}`;

  if (isPreview) {
    return (
      <PreviewClient
        path={path}
        variantParam={variantParam}
        type="productOrPdp"
      />
    );
  } else {
    const { entry, contentType } = await getProduct(path, variantParam);
    const header = await getHeader();
    return <Product entry={entry} contentType={contentType} header={header} />;
  }
}
