import { Components, Page, Pdp, Product } from "@/types/types";
import Personalize from "@contentstack/personalize-edge-sdk";
import { getContentstackEndpoints, getRegionForString } from "@timbenniks/contentstack-endpoints";
import { NextRequest } from "next/server";
import type { Metadata } from 'next';

export const contentstackRegion = getRegionForString(
  process.env.NEXT_PUBLIC_CONTENTSTACK_REGION || "eu"
);

export const contentstackEndpoints = getContentstackEndpoints(contentstackRegion, true);

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

type ComponentName = keyof Components;
type ComponentProps<T extends ComponentName> = Components[T];

interface ComponentKV {
  name: ComponentName;
  props: ComponentProps<ComponentName> | null;
}

export function mapComponentsToKV(components: Components[]): ComponentKV[] {
  return components.map((component) => {
    const entries = Object.entries(component) as [ComponentName, any][];

    if (entries.length === 0) {
      return { name: "" as ComponentName, props: null };
    }

    const [name, props] = entries[0];

    return { name, props };
  });
}

export function createOgTags(content: Page | Pdp | Product): Metadata {
  return {
    title: content.title,
    description: content.description,
    openGraph: {
      title: content.title,
      description: content.description,
      url: content.url,
      images: [
        {
          url: 'image' in content && content.image ? content.image.url : 'media' in content && content.media && content.media.length > 0 ? content.media[0].url : '',
          width: 1200,
          height: 630,
          alt: content.title,
        },
      ],
    },
  };
}

export function renderCurrency(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price / 100);
}

export const isPreview = process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === "true";
export const useCloudinary = process.env.NEXT_PUBLIC_CONTENTSTACK_CLOUDINARY === "true";
export const useLyticsDevTools = process.env.NEXT_PUBLIC_CONTENTSTACK_LYTICS_DEVTOOLS === "true";