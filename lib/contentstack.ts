import contentstack, { QueryOperation } from "@contentstack/delivery-sdk"
import ContentstackLivePreview, { IStackSdk } from "@contentstack/live-preview-utils";
import { getContentstackEndpoints, getRegionForString } from "@timbenniks/contentstack-endpoints";
import { Page, Product, ProductLine, Category } from "../types/contentstack";
import Personalize from "@contentstack/personalize-edge-sdk";

const region = getRegionForString(process.env.NEXT_PUBLIC_CONTENTSTACK_REGION as string)
const endpoints = getContentstackEndpoints(region, true)

export const stack = contentstack.stack({
  apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string,
  deliveryToken: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN as string,
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT as string,
  region,
  live_preview: {
    enable: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === 'true',
    preview_token: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN,
    host: endpoints.preview,
  }
});

export function initLivePreview() {
  ContentstackLivePreview.init({
    ssr: false,
    enable: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === 'true',
    mode: "builder",
    stackSdk: stack.config as IStackSdk,
    stackDetails: {
      apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string,
      environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT as string,
    },
    clientUrlParams: {
      host: endpoints.application
    },
    editButton: {
      enable: true,
      exclude: ["outsideLivePreviewPortal"]
    },
  });
}

export const isPreview = process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === "true";

export async function getPage(url: string, variantParam?: string) {
  let result;

  const pageQuery = await stack
    .contentType("page")
    .entry()

  if (variantParam) {
    const variantAlias = Personalize.variantParamToVariantAliases(variantParam).join(',');

    pageQuery.addParams({ include_dimension: true });
    pageQuery.addParams({ include_applied_variants: true });
    pageQuery.variants(variantAlias);
  }

  pageQuery.only([
    'uid',
    'url',
    'title',
    'description',
    'image.url',
    'components.hero._metadata',
    'components.hero.title',
    'components.hero.description',
    'components.hero.image.url',
    'components.hero.video.url',
    'components.hero.cta',
    'components.hero.design',
  ])

  result = await pageQuery
    .query()
    .where('url', QueryOperation.EQUALS, url)
    .find<Page>();

  if (result.entries) {
    const entry = result.entries[0] as Page

    if (process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === 'true') {
      contentstack.Utils.addEditableTags(entry, 'Page', true);
    }

    return entry
  }
  else {
    throw new Error(`Page not found for url: ${url}`);
  }
}

export async function getProduct(url: string) {
  let result;

  const productQuery = await stack
    .contentType("product")
    .entry()
    .includeReference(['category', 'product_line'])

  productQuery.only([
    'uid',
    'url',
    'title',
    'short_description',
    'description',
    'price',
    'taxonomies.term_uid',
    'media.url',
    'category.title',
    'category.url',
    'product_line.title',
    'product_line.url',
  ])

  result = await productQuery
    .query()
    .where('url', QueryOperation.EQUALS, url)
    .find<Product>();

  if (result.entries) {
    const entry = result.entries[0] as Product

    if (process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === 'true') {
      contentstack.Utils.addEditableTags(entry, 'product', true);
    }

    return entry
  }
  else {
    throw new Error(`Product not found for url: ${url}`);
  }
}

export async function getProductLine(url: string) {
  let result;

  const productQuery = await stack
    .contentType("product_line")
    .entry()
    .includeReference(['products', 'products.category'])

  productQuery.only([
    'uid',
    'url',
    'title',
    'description',
    'products.uid',
    'products.title',
    'products.short_description',
    'products.price',
    'products.taxonomies.term_uid',
    'products.media.url',
    'products.category.title',
    'products.category.url',
  ])

  result = await productQuery
    .query()
    .where('url', QueryOperation.EQUALS, url)
    .find<ProductLine>();

  if (result.entries) {
    const entry = result.entries[0] as ProductLine

    if (process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === 'true') {
      contentstack.Utils.addEditableTags(entry, 'product_line', true);
    }

    return entry
  }
  else {
    throw new Error(`ProductLine not found for url: ${url}`);
  }
}

export async function getCategory(url: string) {
  let result;

  const productQuery = await stack
    .contentType("category")
    .entry()
    .includeReference(['products', 'products.product_line'])

  productQuery.only([
    'uid',
    'url',
    'title',
    'description',
    'products.uid',
    'products.title',
    'products.short_description',
    'products.price',
    'products.taxonomies.term_uid',
    'products.media.url',
    'products.product_line.title',
    'products.product_line.url',
  ])

  result = await productQuery
    .query()
    .where('url', QueryOperation.EQUALS, url)
    .find<Category>();

  if (result.entries) {
    const entry = result.entries[0] as Category

    if (process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === 'true') {
      contentstack.Utils.addEditableTags(entry, 'category', true);
    }

    return entry
  }
  else {
    throw new Error(`Category not found for url: ${url}`);
  }
}