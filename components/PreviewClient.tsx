"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import ContentstackLivePreview from "@contentstack/live-preview-utils";

import {
  getHeader,
  getPage,
  getProduct,
  initLivePreview,
} from "../lib/contentstack";

import type {
  Page as PageProps,
  Product as ProductProps,
  Pdp as PdpProps,
  Header as HeaderProps,
} from "@/types/types";

import Page from "./Page";
import Product from "./Product";

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <Image
      src="/images/veda.svg"
      width={69}
      height={26}
      alt="Veda Logo"
      className="mb-2"
      priority={true}
    />
    <p className="text-xs font-light">loading preview</p>
  </div>
);

function getPreviewData(
  type: "page" | "productOrPdp",
  path: string,
  variantParam?: string
) {
  switch (type) {
    case "page":
      return getPage(path, variantParam);
    case "productOrPdp":
      return getProduct(path, variantParam);
    default:
      throw new Error(`Invalid type: ${type}`);
  }
}

export interface PreviewClientProps {
  type: "page" | "productOrPdp";
  path: string;
  variantParam?: string;
}

export default function PreviewClient({
  type,
  path,
  variantParam,
}: PreviewClientProps) {
  const [content, setContent] = useState<PageProps | ProductProps | PdpProps>();
  const [contentType, setContentType] = useState<"product" | "pdp">();
  const [header, setHeader] = useState<HeaderProps>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getContent = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getPreviewData(type, path, variantParam);

      if ("contentType" in data) {
        const headerContent = await getHeader();
        setHeader(headerContent);
        setContentType(data.contentType);
        setContent(data.entry);
      } else {
        setContent(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load content");
      console.error("Error loading content:", err);
    } finally {
      setIsLoading(false);
    }
  }, [type, path, variantParam]);

  useEffect(() => {
    initLivePreview();
    ContentstackLivePreview.onEntryChange(getContent);
  }, [path]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <div className="text-red-600 p-4">Error: {error}</div>;
  }

  if (!content) {
    return <div className="p-4">No content found for this path.</div>;
  }

  switch (type) {
    case "page":
      return <Page page={content as PageProps} />;
    case "productOrPdp":
      return (
        <Product
          entry={content as ProductProps | PdpProps}
          contentType={contentType}
          header={header}
        />
      );
    default:
      return null;
  }
}
