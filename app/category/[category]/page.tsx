import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHeader, getCategory } from "@/lib/contentstack";
import { createOgTags, isPreview } from "@/lib/helpers";
import PreviewClient from "@/components/pages/PreviewClient";
import Category from "@/components/pages/Category";
import { cache } from "react";

export const revalidate = 60;

interface CategoryParams {
  category: string;
}

interface CategoryPageProps {
  params: Promise<CategoryParams>;
}

const getHeaderCached = cache(getHeader);
const getCategoryCached = cache(getCategory);

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  try {
    const { category } = await params;
    const path = `/category/${category}`;
    const entry = await getCategoryCached(path);

    if (!entry) {
      return {
        title: "Category Not Found",
        description: "The requested category could not be found",
      };
    }

    return createOgTags(entry);
  } catch (error) {
    console.error("Error generating category metadata:", error);
    return {
      title: "Error",
      description: "An error occurred while loading this category",
    };
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  try {
    const { category } = await params;
    const path = `/category/${category}`;

    if (isPreview) {
      return <PreviewClient path={path} type="category" />;
    }

    const entry = await getCategoryCached(path);

    if (!entry) {
      return notFound();
    }

    const header = await getHeaderCached();

    return <Category entry={entry} header={header} />;
  } catch (error) {
    console.error("Error loading category:", error);
    throw error;
  }
}
