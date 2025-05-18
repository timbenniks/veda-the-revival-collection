import { Metadata } from "next";
import { getProduct } from "@/lib/contentstack";
import { createOgTags, getVariantParam } from "@/lib/helpers";
import Product from "@/components/Product";
// import PreviewClient from "@/components/PreviewClient";

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
  const product = await getProduct(path, variantParam);
  return createOgTags(product);
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

  // if (isPreview) {
  //   return (
  //     <PreviewClient path={path} variantParam={variantParam} type="page" />
  //   );
  // } else {
  const product = await getProduct(path, variantParam);
  return <Product product={product} />;
  // }
}
