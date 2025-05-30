import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage, getHeader } from "@/lib/contentstack";
import { createOgTags, isPreview, getVariantParam } from "@/lib/helpers";
import Page from "@/components/pages/Page";
import PreviewClient from "@/components/pages/PreviewClient";
import { cache } from "react";

export const revalidate = 60;

interface PageParams {
  slug?: string[];
}

interface SlugPageProps {
  params: Promise<PageParams>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const getHeaderCached = cache(getHeader);
const getPageCached = cache(getPage);

export async function generateMetadata({
  params,
  searchParams,
}: SlugPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const query = await searchParams;
    const path = slug ? `/${slug.join("/")}` : "/";
    const variantParam = getVariantParam(query);
    const page = await getPageCached(path, variantParam);

    if (!page) {
      return {
        title: "Page Not Found",
        description: "The requested page could not be found",
      };
    }

    return createOgTags(page);
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error",
      description: "An error occurred while loading this page",
    };
  }
}

export default async function SlugPage({
  params,
  searchParams,
}: SlugPageProps) {
  try {
    const { slug } = await params;
    const query = await searchParams;
    const path = slug ? `/${slug.join("/")}` : "/";
    const variantParam = getVariantParam(query);

    if (isPreview) {
      return (
        <PreviewClient path={path} variantParam={variantParam} type="page" />
      );
    }

    const page = await getPageCached(path, variantParam);

    if (!page) {
      return notFound();
    }

    const header = await getHeaderCached();

    return <Page page={page} header={header} />;
  } catch (error) {
    console.error("Error loading page:", error);
    throw error;
  }
}
