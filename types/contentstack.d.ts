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
  ACL: any[];
  is_dir: boolean;
  parent_uid: string;
  _version: number;
  title: string;
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

export interface Media {
  /** Version */
  _version?: 9;
  image: File;
  width?: number | null;
  height?: number | null;
  crop?: boolean;
  widths?: string[];
}

export interface List {
  /** Version */
  _version?: 6;
  title?: string;
  title_tag?: ("h1" | "h2" | "h3" | "h4") | null;
  load_first_image_eager?: boolean;
  reference: (ProductLine | Product | Category)[];
}

export interface Ctas {
  cta: {
    text?: string;
    link?: Link;
  };
}

export interface RichText {
  /** Version */
  _version?: 18;
  title?: string;
  title_tag?: ("h1" | "h2" | "h3" | "h4") | null;
  content?: any;
  alternative_content?: string;
  ctas?: Ctas[];
}

export interface PageHeader {
  /** Version */
  _version?: 2;
  reference: Header[];
}

export interface Hero {
  /** Version */
  _version?: 19;
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
  _version?: 12;
  side_a?: SideA[];
  side_b?: SideB[];
}

export interface Links {
  link: {
    label: string;
    item?: Link;
    reference?: (ProductLine | Product | Page | Category)[];
  };
}

export interface Header {
  /** Version */
  _version?: 9;
  title: string;
  logo?: File | null;
  links?: Links[];
}

export interface Components {
  hero: Hero;
  list: List;
  two_column: TwoColumn;
  rich_text: RichText;
  header: PageHeader;
}

export interface Page {
  /** Version */
  _version?: 9;
  title: string;
  url?: string;
  description?: string;
  image?: File | null;
  components?: Components[];
}

export interface Category {
  /** Version */
  _version?: 5;
  title: string;
  url?: string;
  description?: string;
  media?: File | null;
  products?: Product[];
}

export interface ProductLine {
  /** Version */
  _version?: 7;
  title: string;
  url?: string;
  description?: string;
  products?: Product[];
}

export interface Product {
  /** Version */
  _version?: 13;
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
