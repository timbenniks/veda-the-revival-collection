import { getPage } from "@/lib/contentstack";
import Page from "../components/Page";
import PreviewClient from "@/components/PreviewClient";
import { Metadata } from "next";
import { createOgTags, isPreview } from "@/lib/helpers";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const path = "/" + (params.slug ?? []).join("/");
  const variantParam = "";
  const page = await getPage(path, variantParam);
  return createOgTags(page);
}

export default async function Home({ params }: { params: { slug: string[] } }) {
  const path = "/" + (params.slug ?? []).join("/");
  const variantParam = "";

  if (isPreview) {
    return (
      <PreviewClient path={path} variantParam={variantParam} type="page" />
    );
  } else {
    const page = await getPage(path, variantParam);
    return <Page page={page} />;
  }
}
