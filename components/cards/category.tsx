import Title from "../atoms/Title";
import { CSLPAttribute, Category } from "@/types/types";
import Link from "next/link";
import MediaItem from "../atoms/MediaItem";

interface CategoryCardProps {
  $?: { [key: string]: CSLPAttribute | undefined };
  category: Category;
  loading?: "lazy" | "eager";
}

export default function CategoryCard({
  $,
  category,
  loading = "lazy",
}: CategoryCardProps) {
  const { title, media, url } = category;

  return (
    <li className="text-left relative group">
      <div className="aspect-[293/440] bg-gray-200 mb-4 overflow-hidden">
        {media && (
          <MediaItem
            {...($ && $.media)}
            src={media.url}
            alt={`Category image for ${title}`}
            width={293}
            height={440}
            ratio={293 / 440}
            sizes="100vw, md:20vw"
            loading={loading}
            widths={[267, 480, 700]}
            className="w-full h-auto aspect-[293/440] transition-transform duration-1200 ease-out group-hover:scale-105"
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
    </li>
  );
}
