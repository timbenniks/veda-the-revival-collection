import contentstack, { QueryOperation, BaseEntry } from "@contentstack/delivery-sdk"
import ContentstackLivePreview, { IStackSdk } from "@contentstack/live-preview-utils";
import { Page, Product, ProductLine, Category, Pdp, Header } from "@/types/types";
import Personalize from "@contentstack/personalize-edge-sdk";
import { contentstackEndpoints, contentstackRegion } from "./helpers";

export const stack = contentstack.stack({
  apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string,
  deliveryToken: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN as string,
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT as string,
  region: contentstackRegion,
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

export async function getProduct(url: string, variantParam?: string): Promise<{ entry: Pdp | Product, contentType: "pdp" | "product" }> {
  const pdpQuery = stack
    .contentType("pdp")
    .entry()
    .includeReference(['product']);

  const productQuery = stack
    .contentType("product")
    .entry()
    .includeReference(['category', 'product_line']);

  if (variantParam) {
    const variantAlias = Personalize.variantParamToVariantAliases(variantParam).join(',');
    const variantParams = {
      include_dimension: true,
      include_applied_variants: true,
      include_all: true,
      include_all_depth: 2
    };

    [pdpQuery, productQuery].forEach(query => {
      Object.entries(variantParams).forEach(([key, value]) => {
        query.addParams({ [key]: value });
      });

      query.variants(variantAlias);
    });
  }

  const [pdpResult, productResult] = await Promise.all([
    pdpQuery.query().where('url', QueryOperation.EQUALS, url).find<Pdp>(),
    productQuery.query().where('url', QueryOperation.EQUALS, url).find<Product>()
  ]);

  let entry = null;
  let contentType: "pdp" | "product" = "pdp";

  if (pdpResult?.entries?.length) {
    entry = pdpResult.entries[0];
    contentType = 'pdp';
  }
  else if (productResult?.entries?.length) {
    entry = productResult.entries[0];
    contentType = 'product';
  }

  if (entry && process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === 'true' && contentType) {
    contentstack.Utils.addEditableTags(entry, contentType, true);
  }

  if (entry) {
    return {
      entry,
      contentType
    }
  } else {
    throw new Error(`The product info was not found for url: ${url}`);
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

export async function getHeader(): Promise<Header> {
  const header = await stack
    .contentType("header")
    .entry("bltb3e6ba1550869339")
    .includeReference(['links.link.reference.product', 'links.link.reference.product_line', 'links.link.reference.page', 'links.link.reference.category'])
    .fetch<Header>()

  if (header) {
    if (process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === 'true') {
      contentstack.Utils.addEditableTags(header, 'header', true);
    }

    return header
  }
  else {
    throw new Error(`Header not found for uid: bltb3e6ba1550869339`);
  }
}

interface LinkEntry extends BaseEntry {
  url: string
}

export async function getAllLinks(): Promise<string[]> {
  const [pages, products, productLines] = await Promise.all([
    stack
      .contentType('page')
      .entry()
      .only(['url'])
      .query()
      .find<LinkEntry>(),

    stack
      .contentType('product')
      .entry()
      .only(['url'])
      .query()
      .find<LinkEntry>(),

    stack
      .contentType('product_line')
      .entry()
      .only(['url'])
      .query()
      .find<LinkEntry>(),

    stack
      .contentType('category')
      .entry()
      .only(['url'])
      .query()
      .find<LinkEntry>(),
  ])

  const pageUrls = pages.entries?.map(e => e.url) || []
  const productUrls = products.entries?.map(e => e.url) || []
  const productLineUrls = productLines.entries?.map(e => e.url) || []

  return [...pageUrls, ...productUrls, ...productLineUrls]
}