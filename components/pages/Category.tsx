import type {
  Category as CategoryProps,
  MegaMenu as MegaMenuProps,
} from "@/types/types";

import List from "@/components/List";
import MediaItem from "@/components/atoms/MediaItem";
import Breadcrumb from "@/components/Breadcrumb";
import MegaMenu from "../MegaMenu";
import Footer from "../Footer";
import SendDataToLytics from "@/components/SendDataToLytics";

export default function Category({
  entry,
  header,
}: {
  entry: CategoryProps;
  header?: MegaMenuProps;
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
          <SendDataToLytics
            data={{
              category: entry.title.toLowerCase(),
            }}
          />

          <div className="md:aspect-[1440/635] relative w-full overflow-hidden bg-white">
            {entry.media?.url && (
              <MediaItem
                {...(entry.$ && entry.$.media)}
                src={entry.media?.url}
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
            uid="category"
            _version={1}
            reference={entry.products || []}
            title={`${entry.title}`}
            title_tag="h2"
            description={entry.description || ""}
            load_first_image_eager={true}
            $={entry.$}
            cslpName="products"
          />
        </>
      )}
      <Footer />
    </>
  );
}
