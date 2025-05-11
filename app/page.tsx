import { Metadata } from "next";
import { getPage } from "@/lib/contentstack";
import { createOgTags, isPreview, getVariantParam } from "@/lib/helpers";
import Page from "@/components/Page";
import PreviewClient from "@/components/PreviewClient";

export const revalidate = 60;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const query = await searchParams;
  const path = slug ? slug : "/";
  const variantParam = getVariantParam(query);

  const page = await getPage(path, variantParam);
  return createOgTags(page);
}

export default async function Home({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const path = slug ? slug : "/";
  const variantParam = getVariantParam(query);

  if (isPreview) {
    return (
      <PreviewClient path={path} variantParam={variantParam} type="page" />
    );
  } else {
    const page = await getPage(path, variantParam);
    return <Page page={page} />;
  }
}
