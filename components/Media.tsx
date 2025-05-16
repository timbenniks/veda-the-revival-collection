import MediaItem from "./atoms/MediaItem";
import { Media as MediaProps } from "@/types/types";

export default function Media({ image, width, height, widths, $ }: MediaProps) {
  return (
    <>
      <MediaItem
        {...($ && $.image)}
        src={image?.url}
        alt={image?.title || ""}
        width={width || 500}
        height={height || 500}
        ratio={(width || 500) / (height || 500)}
        loading="lazy"
        fit={"crop"}
        sizes="100vw,lg:50vw"
        widths={widths || [480, 680, 960, 1200, 1440, 1800]}
      />
    </>
  );
}
