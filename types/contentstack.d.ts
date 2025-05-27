type BuildTuple<T, N extends number, R extends T[] = []> = R["length"] extends N
  ? R
  : BuildTuple<T, N, [...R, T]>;

type TuplePrefixes<T extends any[]> = T extends [any, ...infer Rest]
  ? T | TuplePrefixes<Rest extends any[] ? Rest : []>
  : [];

type MaxTuple<T, N extends number> = TuplePrefixes<BuildTuple<T, N>>;

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

export interface JSONRTENode {
  type: string;
  uid: string;
  _version: number;
  attrs: Record<string, any>;
  children?: JSONRTENode[];
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  src?: string;
  alt?: string;
  href?: string;
  target?: string;
  embed?: {
    type: string;
    uid: string;
    _version: number;
    attrs: Record<string, any>;
  };
}

export interface SystemFields {
  uid?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
  _content_type_uid?: string;
  tags?: string[];
  ACL?: any[];
  _version?: number;
  _in_progress?: boolean;
  locale?: string;
  publish_details?: PublishDetails;
  title?: string;
}

export interface Cards {
  card: Card;
}

export interface List {
  /** Version */
  _version: number;
  title?: string;
  title_tag?: ("h1" | "h2" | "h3" | "h4") | null;
  description?: string;
  load_first_image_eager: boolean;
  reference?: (ProductLine | Product | Category)[];
  cards?: Cards[];
}

export interface SideA {
  list: List;
  media: Media;
  rich_text: RichText;
}

export interface SideB {
  list: List;
  media: Media;
  rich_text: RichText;
}

export interface TwoColumn {
  /** Version */
  _version: number;
  side_a?: SideA[];
  side_b?: SideB[];
}

export interface Card {
  /** Version */
  _version: number;
  title?: string;
  description?: string;
  image?: File | null;
  link?: Link;
}

export interface Media {
  /** Version */
  _version: number;
  image: File;
  width?: number | null;
  height?: number | null;
  crop: boolean;
  widths?: number[] | null;
}

export interface Ctas {
  cta: {
    text?: string;
    link?: Link;
  };
}

export interface RichText {
  /** Version */
  _version: number;
  title?: string;
  title_tag?: ("h1" | "h2" | "h3" | "h4") | null;
  content?: {
    type: string;
    uid: string;
    _version: number;
    attrs: Record<string, any>;
    children: JSONRTENode[];
  };
  alternative_content?: string;
  ctas?: Ctas[];
}

export interface PageHeader {
  /** Version */
  _version: number;
  reference: Header[];
}

export interface Ctas {
  cta: {
    text?: string;
    link?: Link;
  };
}

export interface Hero {
  /** Version */
  _version: number;
  title?: string;
  title_tag?: ("h1" | "h2" | "h3" | "h4") | null;
  description?: string;
  ctas?: Ctas[];
  image?: File | null;
  video?: File | null;
  design?: {
    copy_location: "left" | "right";
    overlay_opacity: number;
    theme: "dark" | "light";
  };
}

export interface Components {
  header: PageHeader;
  list: List;
  media: Media;
  richt_text: RichText;
  two_column: TwoColumn;
  hero: Hero;
}

export interface Pdp extends SystemFields {
  /** Version */
  _version: number;
  title: string;
  url?: string;
  description?: string;
  image?: File | null;
  product?: Product[];
  components?: Components[];
}

export interface Links {
  link: {
    label: string;
    item?: Link;
    reference?: (ProductLine | Product | Page | Category)[];
    featured_product?: Product[];
    show_product_lines: boolean;
    show_all_products_links: boolean;
  };
}

export interface Header extends SystemFields {
  /** Version */
  _version: number;
  title: string;
  logo?: File | null;
  links?: Links[];
}

export interface Components1 {
  hero: Hero;
  list: List;
  two_column: TwoColumn;
  rich_text: RichText;
}

export interface Page extends SystemFields {
  /** Version */
  _version: number;
  title: string;
  url?: string;
  description?: string;
  image?: File | null;
  components?: Components1[];
}

export interface Category extends SystemFields {
  /** Version */
  _version: number;
  title: string;
  url?: string;
  description?: string;
  media?: File | null;
  products?: Product[];
  taxonomies?: Taxonomy[];
}

export interface ProductLine extends SystemFields {
  /** Version */
  _version: number;
  title: string;
  url?: string;
  description?: string;
  image?: File | null;
  products?: Product[];
  taxonomies?: Taxonomy[];
}

export interface Product extends SystemFields {
  /** Version */
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
