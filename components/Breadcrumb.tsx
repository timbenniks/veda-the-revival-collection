import Link from "next/link";

interface BreadcrumbLink {
  title: string;
  url: string;
}

interface BreadcrumbProps {
  links: BreadcrumbLink[];
}

export default function Breadcrumb({ links }: BreadcrumbProps) {
  return (
    <nav className="bg-white p-3 text-xs uppercase">
      <ol
        className="flex flex-wrap items-center"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {links.map((link, index) => (
          <li
            key={index}
            className="flex items-center"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            {index === links.length - 1 ? (
              <>
                <span className="font-light" itemProp="name">
                  {link.title}
                </span>
                <meta itemProp="position" content={String(index + 1)} />
              </>
            ) : (
              <>
                <Link href={link.url} className="underline" itemProp="item">
                  <span itemProp="name">{link.title}</span>
                </Link>
                <meta itemProp="position" content={String(index + 1)} />
                <span className="mx-2">/</span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
