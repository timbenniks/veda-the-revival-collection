"use client";

import Image, { ImageLoaderProps, ImageProps } from "next/image";
import { useCloudinary } from "@/lib/helpers";
interface MediaItemProps extends Omit<ImageProps, "loader"> {
  src: string;
  width: number;
  fit?: string;
  ratio: number;
}

export default function MediaItem({
  src,
  width,
  ratio,
  fit = "crop",
  ...props
}: MediaItemProps) {
  const loader = ({ src, width, quality }: ImageLoaderProps): string => {
    const params = new URLSearchParams();
    const computedHeight = (width / ratio).toFixed(0);

    params.append("height", computedHeight);
    params.append("width", width.toString());

    if (fit) {
      params.append("fit", fit);
    }

    if (quality) {
      params.append("quality", "90");
    }

    params.append("auto", "avif");
    params.append("format", "pjpg");

    return `${
      useCloudinary
        ? "https://res.cloudinary.com/dwfcofnrd/image/fetch/q_auto,f_auto/"
        : ""
    }${src}?${params.toString()}`;
  };

  return (
    <>
      {src && (
        <Image
          {...props}
          loader={loader}
          src={src}
          width={width}
          alt={props.alt || ""}
        />
      )}
    </>
  );
}
