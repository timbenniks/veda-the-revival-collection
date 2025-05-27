import Title from "../atoms/Title";
import { CSLPAttribute, Card as CardProps } from "@/types/types";
import Link from "next/link";
import MediaItem from "../atoms/MediaItem";
import { ElementType } from "react";

interface StaticCardProps {
  $?: { [key: string]: CSLPAttribute | undefined };
  card: CardProps;
  loading?: "lazy" | "eager";
  algolia?: boolean;
  as?: ElementType;
}

export default function StaticCard({
  $,
  card,
  loading = "lazy",
  as: Component = "li",
}: StaticCardProps) {
  const { title, description, link, image } = card;

  return (
    <Component className="text-left relative group">
      <div className="aspect-square bg-[#e9e9e9] mb-4 overflow-hidden">
        {image && (
          <MediaItem
            {...($ && $.media)}
            src={image.url}
            alt={`Product image for ${title}`}
            width={300}
            height={300}
            ratio={1}
            loading={loading}
            sizes="50vw, md:20vw"
            widths={[150, 267, 480, 700]}
            className="w-full h-auto aspect-square transition-transform duration-1200 ease-out group-hover:scale-105"
          />
        )}
      </div>

      {link && (
        <Link href={link.href} title={`link to ${link.title}`} rel="noopener">
          <span className="absolute inset-0 z-10" aria-hidden="true"></span>
        </Link>
      )}

      {title && (
        <Title
          $={$ && $?.title}
          text={title}
          theme={"dark"}
          uppercase={true}
          size="sm"
          classes="mb-2"
          weight="medium"
          as="h3"
        />
      )}

      {description && (
        <p className="font-light line-clamp-2" {...($ && $.description)}>
          {description}
        </p>
      )}
    </Component>
  );
}
