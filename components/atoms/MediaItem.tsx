"use client";

import Image, { ImageLoaderProps, ImageProps } from "next/image";
import { useCloudinary } from "@/lib/helpers";

interface MediaItemProps extends Omit<ImageProps, "loader"> {
  src: string;
  width: number;
  fit?: string;
  ratio: number;
  cloudName?: string;
}

export default function MediaItem({
  src,
  width,
  ratio,
  fit = "crop",
  cloudName = "dwfcofnrd",
  ...props
}: MediaItemProps) {
  const loader = ({ src, width, quality }: ImageLoaderProps): string => {
    const computedHeight = Math.round(width / ratio);

    if (useCloudinary) {
      const encodedSrc = encodeURIComponent(src);
      const transformations = `w_${width},h_${computedHeight},c_thumb`;

      return `https://res.cloudinary.com/${cloudName}/image/fetch/f_auto,q_auto/${transformations}/${encodedSrc}`;
    } else {
      const params = new URLSearchParams();
      params.append("height", computedHeight.toString());
      params.append("width", width.toString());

      if (fit) {
        params.append("fit", fit);
      }

      if (quality) {
        params.append("quality", "90");
      }

      params.append("auto", "avif");
      params.append("format", "pjpg");

      return `${src}?${params.toString()}`;
    }
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
