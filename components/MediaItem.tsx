"use client";

import Image, { ImageLoaderProps, ImageProps } from "next/image";

interface MediaItemProps extends Omit<ImageProps, "loader"> {
  src: string;
  width: number;
  quality?: number;
  fit?: string;
  ratio: number;
}

export default function MediaItem({
  src,
  width,
  quality,
  ratio,
  fit = "crop",
  ...props
}: MediaItemProps) {
  const loader = ({ src, width, quality }: ImageLoaderProps): string => {
    const params = new URLSearchParams();
    const computedHeight = (width / ratio).toFixed(0);

    params.append("height", computedHeight);
    params.append("width", width.toString());
    fit && params.append("fit", fit);
    quality && params.append("quality", quality.toString());

    return `${src}?${params.toString()}`;
  };

  return <Image {...props} loader={loader} src={src} width={width} />;
}
