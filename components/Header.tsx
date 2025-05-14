import Image from "next/image";
import Link from "next/link";

type HeaderProps = {
  reference?: any;
};

export default function Header({ reference }: HeaderProps) {
  const { $, logo, links } = reference[0];

  return (
    <div className="flex items-center justify-between p-4 bg-[#3B2607] text-white">
      <Link href="/">
        <Image
          {...($ && $.logo)}
          src={logo.url}
          alt="Veda Logo"
          width={69}
          height={26}
        />
      </Link>
      <ul
        className="flex items-center gap-4 font-light uppercase"
        {...($ && $.links)}
      >
        {links.map((link: any, index: number) => {
          const linkItem = link.link;

          return (
            <li key={linkItem._metadata.uid} {...($ && $[`links__${index}`])}>
              <Link
                href={linkItem?.item.href || linkItem?.reference[0]?.url || "#"}
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
    </div>
  );
}
