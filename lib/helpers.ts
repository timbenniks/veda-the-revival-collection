import Personalize from "@contentstack/personalize-edge-sdk";
import type { Sdk } from "@contentstack/personalize-edge-sdk/dist/sdk";
import { getContentstackEndpoints, getRegionForString } from "@timbenniks/contentstack-endpoints";
import { NextRequest } from "next/server";

let personalizeSdkInstance: Sdk | null = null;

export async function getPersonalizeInstance({
  request,
  userId,
}: { request?: NextRequest; userId?: string } = {}) {
  const region = getRegionForString(
    process.env.NEXT_PUBLIC_CONTENTSTACK_REGION as string
  );

  const endpoints = getContentstackEndpoints(region);
  const projectUid = process.env
    .NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_UID as string;

  Personalize.setEdgeApiUrl(endpoints.personalizeEdge as string);

  const options: { request?: NextRequest; userId?: string } = {
    request,
    userId,
  };

  return await Personalize.init(projectUid, options);
}

export function useGetVariantParam(searchParams: { [key: string]: string | string[] | undefined }) {
  return decodeURIComponent(searchParams[Personalize.VARIANT_QUERY_PARAM] as string);
}

export type ComponentEntry = any

export function mapComponentsToKV(components: ComponentEntry[]) {
  return components.map((obj: any) => {
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

export function createOgTags(page: any) {
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