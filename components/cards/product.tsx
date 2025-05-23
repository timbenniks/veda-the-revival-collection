import Title from "../atoms/Title";
import { CSLPAttribute, Product } from "@/types/types";
import Link from "next/link";
import MediaItem from "../atoms/MediaItem";

interface ProductCardProps {
  $?: { [key: string]: CSLPAttribute | undefined };
  product: Product;
  loading?: "lazy" | "eager";
}

export default function ProductCard({
  $,
  product,
  loading = "lazy",
}: ProductCardProps) {
  const { title, short_description, media, url } = product;

  return (
    <li className="text-left relative group">
      <div className="aspect-square bg-gray-200 mb-4 overflow-hidden">
        {media && media[0] && (
          <MediaItem
            {...($ && $.media)}
            src={media[0].url}
            alt={`Product image for ${title}`}
            width={300}
            height={300}
            ratio={1}
            loading={loading}
            sizes="100vw, md:20vw"
            widths={[267, 480, 700]}
            className="w-full h-auto aspect-square transition-transform duration-1200 ease-out group-hover:scale-105"
          />
        )}
      </div>

      {url && (
        <Link href={url} title={`link to ${title}`} rel="noopener">
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

      {short_description && (
        <p className="font-light line-clamp-2" {...($ && $.short_description)}>
          {short_description}
        </p>
      )}
    </li>
  );
}
