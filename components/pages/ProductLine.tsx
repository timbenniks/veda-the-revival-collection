import type {
  ProductLine as ProductLineProps,
  MegaMenu as megaMenuProps,
} from "@/types/types";

import List from "@/components/List";
import MediaItem from "@/components/atoms/MediaItem";
import Breadcrumb from "@/components/Breadcrumb";
import MegaMenu from "@/components/MegaMenu";

export default function ProductLine({
  entry,
  header,
}: {
  entry: ProductLineProps;
  header?: megaMenuProps;
}) {
  return (
    <>
      {header && (
        <MegaMenu header={header.header} product_lines={header.product_lines} />
      )}
      <Breadcrumb
        links={[
          { title: "Home", url: "/" },
          { title: "Products", url: "/products" },
          { title: entry?.title || "", url: entry?.url || "" },
        ]}
      />
      {entry && (
        <>
          <div className="md:aspect-[1440/635] relative w-full overflow-hidden bg-white">
            {entry.image?.url && (
              <MediaItem
                {...(entry.$ && entry.$.image)}
                src={entry.image?.url}
                width={1440}
                height={635}
                ratio={1440 / 635}
                loading="eager"
                fetchPriority="high"
                sizes="100vw"
                widths={[480, 960, 1440, 1800]}
                alt={entry.title || ""}
                className="h-full w-full object-cover object-center"
              />
            )}
          </div>
          <List
            uid="test"
            _version={1}
            reference={entry.products || []}
            title={`${entry.title}`}
            title_tag="h2"
            description={entry.description}
            load_first_image_eager={true}
            $={entry.$}
            cslpName="products"
          />
        </>
      )}
    </>
  );
}
