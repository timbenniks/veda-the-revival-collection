import Image from "next/image";
import Link from "next/link";
import { MegaMenu as MegaMenuProps } from "@/types/types";

export default function Header({ header, product_lines }: MegaMenuProps) {
  const { $, logo, links } = header;

  const megaMenuStrcuture = links?.map((link: any) => {
    return {
      label: link.link.label,
      url: link.link.item?.href || link.link.reference[0]?.url || "#",
      show_product_lines: link.link.show_product_lines,
      show_all_products_links: link.link.show_all_products_links,
      featured_product: link.link.featured_product[0],
      product_lines,
    };
  });

  return (
    <>
      {/* <pre>{JSON.stringify(megaMenuStrcuture, null, 2)}</pre> */}
      <div className="sticky top-0 z-50">
        <div className="header flex items-center justify-between p-4 bg-[#3b2607]/90 text-white">
          {logo && (
            <Link href="/">
              <Image
                {...($ && $.logo)}
                src={logo.url}
                alt="Veda Logo"
                width={69}
                height={26}
                loading="eager"
                priority={true}
              />
            </Link>
          )}

          {links && (
            <ul
              className="flex items-center gap-4 font-light uppercase"
              {...($ && $.links)}
            >
              {links.map((link: any, index: number) => {
                const linkItem = link.link;

                return (
                  <li
                    key={linkItem._metadata.uid}
                    {...($ && $[`links__${index}`])}
                  >
                    <Link
                      href={
                        linkItem?.item.href ||
                        linkItem?.reference[0]?.url ||
                        "#"
                      }
                      className="no-underline"
                    >
                      {$ ? (
                        <span {...(linkItem.$ && linkItem.$.label)}>
                          {linkItem.label}
                        </span>
                      ) : (
                        linkItem.label
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
