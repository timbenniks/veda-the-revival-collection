import Link from "next/link";

interface CtaProps {
  $?: any;
  link: { $?: any; href?: string; title?: string };
  text: string;
}

export default function Cta({ link, text, $ }: CtaProps) {
  return (
    <Link {...($ && $.link)} href={link?.href} title={link?.title}>
      {$ ? <span {...($ && $.text)}>{text}</span> : text}
    </Link>
  );
}
