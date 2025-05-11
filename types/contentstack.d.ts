type BuildTuple<T, N extends number, R extends T[] = []> = R["length"] extends N
  ? R
  : BuildTuple<T, N, [...R, T]>;

type TuplePrefixes<T extends any[]> = T extends [any, ...infer Rest]
  ? T | TuplePrefixes<Rest extends any[] ? Rest : []>
  : [];

type MaxTuple<T, N extends number> = TuplePrefixes<BuildTuple<T, N>>;

export interface CSLPAttribute {
  "data-cslp": string;
}

export interface PublishDetails {
  environment: string;
  locale: string;
  time: string;
  user: string;
}

export interface File {
  uid: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  content_type: string;
  file_size: string;
  tags: string[];
  filename: string;
  url: string;
  ACL: any[] | object;
  is_dir: boolean;
  parent_uid: string;
  _version: number;
  title: string;
  _metadata?: object;
  publish_details: PublishDetails;
}

export interface Link {
  title: string;
  href: string;
}

export interface Taxonomy {
  taxonomy_uid: string;
  max_terms?: number;
  mandatory: boolean;
  non_localizable: boolean;
}

export interface List {
  uid: string;
  $: { [key: string]: CSLPAttribute | undefined; }
  _version: number;
  title?: string;
  reference: (ProductLine | Product | Category)[];
}

export type Cta = {
  $: { [key: string]: CSLPAttribute | undefined; }
  text?: string;
  link?: Link;
};
export interface Ctas {
  cta: Cta
}

export interface Hero {
  uid: string;
  $: { [key: string]: CSLPAttribute | undefined; }
  _version: number;
  title?: string;
  description?: string;
  ctas?: Ctas[];
  image?: File | null;
  video?: File | null;
  design: {
    copy_location: "left" | "right";
    overlay_opacity: number;
    theme: "dark" | "light";
  };
}

export interface Components {
  hero: Hero;
  list: List;
}

export interface Page {
  uid: string;
  $: { [key: string]: CSLPAttribute | undefined; }
  _version: number;
  title: string;
  url?: string;
  description?: string;
  image?: File | null;
  components?: Components[];
}

export interface Category {
  uid: string;
  $: { [key: string]: CSLPAttribute | undefined; }
  _version: number;
  title: string;
  url?: string;
  description?: string;
  products?: Product[];
}

export interface ProductLine {
  uid: string;
  $: { [key: string]: CSLPAttribute | undefined; }
  _version: number;
  title: string;
  url?: string;
  description?: string;
  products?: Product[];
}

export interface Product {
  uid: string;
  $: { [key: string]: CSLPAttribute | undefined; }
  _version: number;
  title: string;
  url?: string;
  short_description?: string;
  description?: string;
  price?: number | null;
  category?: Category[];
  product_line?: ProductLine[];
  media?: File[] | null;
  taxonomies?: Taxonomy[];
}
