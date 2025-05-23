import type {
  Category as CategoryProps,
  Header as Headerprops,
} from "@/types/types";

import Header from "@/components/Header";
import List from "@/components/List";
import MediaItem from "@/components/atoms/MediaItem";
import Breadcrumb from "@/components/Breadcrumb";

export default function Category({
  entry,
  header,
}: {
  entry: CategoryProps;
  header?: Headerprops;
}) {
  return (
    <>
      {header && <Header reference={[header]} />}
      <Breadcrumb
        links={[
          { title: "Home", url: "/" },
          { title: "Categories", url: "/categories" },
          { title: entry?.title || "", url: entry?.url || "" },
        ]}
      />
      {entry && (
        <>
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
    </>
  );
}
