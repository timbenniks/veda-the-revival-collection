"use client";

import { useMemo, ImgHTMLAttributes } from "react";
import { useCloudinary } from "@/lib/helpers";

const BREAKPOINTS: Record<string, number> = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

/**
 * Parse shorthand sizes string (e.g. "100vw, sm:50vw, lg:30vw")
 * into a CSS sizes attribute:
 *   (min-width: 1024px) 30vw,
 *   (min-width: 640px) 50vw,
 *   100vw
 */
function parseSizes(shorthand: string = ""): string {
  if (!shorthand || typeof shorthand !== "string") {
    return "100vw";
  }

  const breakpointRules: Array<{ min: number; value: string }> = [];
  let defaultValue = "";

  for (const part of shorthand.split(",")) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    if (trimmed.includes(":")) {
      const [breakpoint, value] = trimmed.split(":").map((s) => s.trim());
      const min = BREAKPOINTS[breakpoint];

      if (min) {
        breakpointRules.push({ min, value });
      } else {
        console.warn(`Unknown breakpoint key: ${breakpoint}`);
      }
    } else {
      defaultValue = trimmed;
    }
  }

  breakpointRules.sort((a, b) => b.min - a.min);

  const mediaQueries = breakpointRules.map(
    ({ min, value }) => `(min-width: ${min}px) ${value}`
  );

  if (defaultValue) {
    mediaQueries.push(defaultValue);
  }

  return mediaQueries.join(", ");
}

export interface MediaItemProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> {
  src: string;
  alt: string;
  width: number;
  ratio: number;
  fit?: string;
  cloudName?: string;
  widths?: number[];
  sizes?: string;
}

export default function MediaItem({
  src,
  width,
  ratio,
  alt,
  fit = "crop",
  cloudName = "dwfcofnrd",
  widths = [320, 640, 960, 1280, 1600, 1920],
  sizes = "100vw",
  ...props
}: MediaItemProps) {
  const sizesAttr = useMemo(() => parseSizes(sizes), [sizes]);
  const height = useMemo(() => Math.round(width / ratio), [width, ratio]);

  const loader = useMemo(() => {
    return ({ src, width }: { src: string; width: number }): string => {
      const imageHeight = Math.round(width / ratio);

      if (useCloudinary) {
        const encoded = encodeURIComponent(src);
        const transformation = `w_${width},h_${imageHeight},c_thumb`;
        return `https://res.cloudinary.com/${cloudName}/image/fetch/f_auto,q_auto/${transformation}/${encoded}`;
        //  return `https://res.cloudinary.com/${cloudName}/image/fetch/f_auto,q_auto/${
        //   fit ? `${fit}/` : ""
        // }${transformation}/${encoded}`;
      } else {
        const params = new URLSearchParams();
        params.append("width", width.toString());
        params.append("height", imageHeight.toString());
        params.append("quality", "90");
        params.append("auto", "avif");
        params.append("format", "pjpg");

        if (fit) {
          params.append("fit", fit || "crop");
        }

        return `${src}?${params.toString()}`;
      }
    };
  }, [ratio, fit, cloudName]);

  const srcSet = useMemo(
    () => widths.map((w) => `${loader({ src, width: w })} ${w}w`).join(", "),
    [loader, src, widths]
  );

  return (
    <img
      src={loader({ src, width })}
      width={width}
      height={height}
      sizes={sizesAttr}
      srcSet={srcSet}
      alt={alt}
      {...props}
    />
  );
}
