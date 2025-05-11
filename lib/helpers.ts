import { Components, Page } from "@/types/contentstack";
import Personalize from "@contentstack/personalize-edge-sdk";
import { getContentstackEndpoints, getRegionForString } from "@timbenniks/contentstack-endpoints";
import { NextRequest } from "next/server";
import type { Metadata } from 'next';

export const contentstackRregion = getRegionForString(
  process.env.NEXT_PUBLIC_CONTENTSTACK_REGION || "eu"
);

export const contentstackEndpoints = getContentstackEndpoints(contentstackRregion, true);

export async function getPersonalizeInstance({
  request,
  userId,
}: { request?: NextRequest; userId?: string } = {}) {
  const projectUid = process.env
    .NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_UID as string;

  Personalize.setEdgeApiUrl(`https://${contentstackEndpoints.personalizeEdge}` as string);

  const options: { request?: NextRequest; userId?: string } = {
    request,
    userId,
  };

  return await Personalize.init(projectUid, options);
}

export function getVariantParam(searchParams: { [key: string]: string | string[] | undefined }) {
  return decodeURIComponent(searchParams[Personalize.VARIANT_QUERY_PARAM] as string);
}

export function mapComponentsToKV(components: Components[]) {
  return components.map((obj: Components) => {
    const entries = Object.entries(obj);
    const componentNameAndProps = entries && entries[0];

    let name = "";
    let props = null;

    if (componentNameAndProps && componentNameAndProps[0]) {
      name = componentNameAndProps[0];
    }

    if (componentNameAndProps && componentNameAndProps[1]) {
      props = componentNameAndProps[1];
    }

    return { name, props };
  });
}

export function createOgTags(page: Page): Metadata {
  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      url: page.url,
      images: [
        {
          url: page?.image?.url ?? "",
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
  };
}

export const isPreview = process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === "true";