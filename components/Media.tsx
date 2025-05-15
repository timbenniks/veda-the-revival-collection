import MediaItem from "./atoms/MediaItem";

type MediaProps = {
  image: any;
  width: number;
  height: number;
  $?: any;
};

export default function Media({ image, width, height, $ }: MediaProps) {
  return (
    <>
      <MediaItem
        {...($ && $.image)}
        src={image?.url}
        alt={image?.title || ""}
        width={width}
        height={height}
        ratio={width / height}
        loading="lazy"
        fit={"crop"}
        sizes="100vw,lg:50vw"
        widths={[480, 680, 960, 1200, 1440, 1800]}
      />
    </>
  );
}
