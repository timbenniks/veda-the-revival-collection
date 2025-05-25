import Link from "next/link";
import { Cta as CtaPropsBase } from "@/types/types";
import { twMerge } from "tailwind-merge";

type CtaProps = CtaPropsBase & {
  theme?: "light" | "dark";
};

export default function Cta({ link, text, $, theme }: CtaProps) {
  return (
    <Link
      {...($ && $.link)}
      href={link?.href || "#"}
      title={link?.title}
      className={twMerge(
        "block px-2 py-1 no-underline uppercase",
        theme === "light"
          ? "text-black bg-white hover:bg-black hover:text-white"
          : "text-white bg-black hover:bg-white hover:text-black"
      )}
    >
      {$ ? <span {...($ && $.text)}>{text}</span> : text}
    </Link>
  );
}
