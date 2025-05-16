// import { Metadata } from "next";
import { getProduct } from "@/lib/contentstack";
// import { createOgTags, isPreview, getVariantParam } from "@/lib/helpers";
// import Page from "@/components/Page";
// import PreviewClient from "@/components/PreviewClient";

export const revalidate = 60;

// export async function generateMetadata({
//   params,
//   searchParams,
// }: {
//   params: Promise<{ line: string; slug: string }>;
//   searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
// }): Promise<Metadata> {
//   const { slug } = await params;

//   console.log(params);
//   const query = await searchParams;
//   const path = slug ? `/${slug}` : "/";
//   const variantParam = getVariantParam(query);

//   const page = await getPage(path, variantParam);
//   return createOgTags(page);
// }

export default async function Pdp({
  params,
  searchParams,
}: {
  params: Promise<{ line: string; slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { line, slug } = await params;
  const query = await searchParams;
  const path = `/products/${line}/${slug}`;

  // if (isPreview) {
  //   return (
  //     <PreviewClient path={path} variantParam={variantParam} type="page" />
  //   );
  // } else {
  const product = await getProduct(path);
  //   return <Page page={page} />;
  // }
  return <pre>{JSON.stringify({ product, query }, null, 2)}</pre>;
}
