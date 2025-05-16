import contentstack, { QueryOperation } from "@contentstack/delivery-sdk"
import ContentstackLivePreview, { IStackSdk } from "@contentstack/live-preview-utils";
import { Page, Product, ProductLine, Category, Pdp } from "@/types/types";
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
  const pageQuery = stack
    .contentType("page")
    .entry()

  if (variantParam) {
    const variantAlias = Personalize.variantParamToVariantAliases(variantParam).join(',');

    pageQuery.addParams({ include_dimension: true });
    pageQuery.addParams({ include_applied_variants: true });
    pageQuery.addParams({ include_all: true });
    pageQuery.addParams({ include_all_depth: 2 });
    pageQuery.variants(variantAlias);
  }

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

export async function getProduct(url: string, variantParam?: string) {
  const pdpQuery = stack
    .contentType("pdp")
    .entry()
    .includeReference(['product'])

  if (variantParam) {
    const variantAlias = Personalize.variantParamToVariantAliases(variantParam).join(',');

    pdpQuery.addParams({ include_dimension: true });
    pdpQuery.addParams({ include_applied_variants: true });
    pdpQuery.addParams({ include_all: true });
    pdpQuery.addParams({ include_all_depth: 2 });
    pdpQuery.variants(variantAlias);
  }

  const pdp = await pdpQuery
    .query()
    .where('url', QueryOperation.EQUALS, url)
    .find<Pdp>();

  const product = await stack
    .contentType("product")
    .entry()
    .includeReference(['category', 'product_line'])
    .query()
    .where('url', QueryOperation.EQUALS, url)
    .find<Product>();

  if (pdp && pdp.entries && pdp.entries.length) {
    if (process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === 'true') {
      contentstack.Utils.addEditableTags(pdp.entries[0], 'pdp', true);
    }

    return pdp
  }
  else if (product && product.entries && product.entries.length) {
    if (process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === 'true') {
      contentstack.Utils.addEditableTags(product.entries[0], 'product', true);
    }

    return product
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