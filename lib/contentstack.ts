import contentstack, { QueryOperation } from "@contentstack/delivery-sdk"
import ContentstackLivePreview, { IStackSdk } from "@contentstack/live-preview-utils";
import { Page, Product, ProductLine, Category } from "../types/contentstack";
import Personalize from "@contentstack/personalize-edge-sdk";
import { contentstackEndpoints, contentstackRregion } from "./helpers";

export const stack = contentstack.stack({
  apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string,
  deliveryToken: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN as string,
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT as string,
  region: contentstackRregion,
  live_preview: {
    enable: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === 'true',
    preview_token: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN,
    host: contentstackEndpoints.preview,
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
      host: contentstackEndpoints.application
    },
    editButton: {
      enable: true,
      exclude: ["outsideLivePreviewPortal"]
    },
  });
}

export async function getPage(url: string, variantParam?: string): Promise<Page> {
  const pageQuery = await stack
    .contentType("page")
    .entry()
    .includeReference(['components.list.reference.product'])

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
    'image',
    'components.hero._metadata',
    'components.hero.title',
    'components.hero.description',
    'components.hero.image',
    'components.hero.video',
    'components.hero.ctas',
    'components.hero.design',
    'components.list._metadata',
    'components.list.title',
    'components.list.reference'
  ])

  const result = await pageQuery
    .query()
    .where('url', QueryOperation.EQUALS, url)
    .find<Page>();

  if (result.entries) {
    const entry = result.entries[0] as Page

    if (process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === 'true') {
      contentstack.Utils.addEditableTags(entry, 'page', true);
    }

    return entry
  }
  else {
    throw new Error(`Page not found for url: ${url}`);
  }
}

export async function getProduct(url: string): Promise<Product> {
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

  const result = await productQuery
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

export async function getProductLine(url: string): Promise<ProductLine> {
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
    'products.media',
    'products.category.title',
    'products.category.url',
  ])

  const result = await productQuery
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

export async function getCategory(url: string): Promise<Category> {
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
    'products.media',
    'products.product_line.title',
    'products.product_line.url',
  ])

  const result = await productQuery
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