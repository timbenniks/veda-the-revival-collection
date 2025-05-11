import Link from "next/link";

interface CtaProps {
  $?: any;
  link: { $?: any; href?: string; title?: string };
  text: string;
}

export default function Cta({ link, text, $ }: CtaProps) {
  return (
    <Link
      {...($ && $.link)}
      href={link?.href}
      title={link?.title}
      className="block px-2 py-1 border-b border-black no-underline uppercase hover:bg-black hover:text-white"
    >
      {$ ? <span {...($ && $.text)}>{text}</span> : text}
    </Link>
  );
}
