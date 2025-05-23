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
  dimension: {
    width: number;
    height: number;
  };
}

export interface Link {
  title: string;
  href: string;
}

export interface Taxonomy {
  taxonomy_uid: string;
  term_uid?: string;
  max_terms?: number;
  mandatory: boolean;
  non_localizable: boolean;
}

export interface List {
  uid: string;
  $: { [key: string]: CSLPAttribute | undefined; }
  _version: number;
  title?: string;
  title_tag?: "h1" | "h2" | "h3" | "h4";
  description?: string;
  load_first_image_eager: boolean;
  reference: (ProductLine | Product | Category)[];
}

export interface Media {
  uid: string;
  $: { [key: string]: CSLPAttribute | undefined; }
  _version?: number;
  image: File;
  width?: number | null;
  height?: number | null;
  crop?: boolean;
  widths?: number[];
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
  title_tag?: "h1" | "h2" | "h3" | "h4";
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
  uid: string;
  $: { [key: string]: CSLPAttribute | undefined; }
  side_a?: SideA[];
  side_b?: SideB[];
}

export interface RichText {
  uid: string;
  $: { [key: string]: CSLPAttribute | undefined; }
  _version?: number;
  title?: string;
  title_tag?: ("h1" | "h2" | "h3" | "h4") | null;
  content?: any;
  alternative_content?: string;
  ctas?: Ctas[];
}

export interface Links {
  link: {
    label: string;
    item?: Link;
    reference?: (ProductLine | Product | Page | Category)[];
  };
}

export interface Header {
  uid: string;
  $: { [key: string]: CSLPAttribute | undefined; }
  _version?: number;
  title: string;
  logo?: File | null;
  links?: Links[];
}

export interface PageHeader {
  _version?: number;
  reference: Header[];
}

export interface Components {
  header: PageHeader;
  list: List;
  media: Media;
  rich_text: RichText;
  two_column: TwoColumn;
  hero: Hero;
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
  media?: File[] | null;
  _content_type_uid: string;
}

export interface ProductLine {
  uid: string;
  $: { [key: string]: CSLPAttribute | undefined; }
  _version: number;
  title: string;
  url?: string;
  description?: string;
  image?: File | null;
  products?: Product[];
  _content_type_uid: string;
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
  _content_type_uid: string;
}

export interface Pdp {
  uid: string;
  $: { [key: string]: CSLPAttribute | undefined; }
  _version: number;
  title: string;
  url?: string;
  description?: string;
  image?: File | null;
  product?: Product[];
  components?: Components[];
  _content_type_uid: string;
}