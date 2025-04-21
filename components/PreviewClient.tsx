"use client";

import { useState, useEffect } from "react";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import {
  getPage,
  getCategory,
  getProduct,
  getProductLine,
  initLivePreview,
} from "../lib/contentstack";
import Page from "./Page";
import type { Page as PageType } from "@/types/contentstack";

export interface PreviewClientProps {
  path: string;
  variantParam?: string;
  type: "page" | "product" | "category" | "product_line";
}

function getPreviewData(type: string, path: string, variantParam?: string) {
  switch (type) {
    case "page":
      return getPage(path, variantParam);
    case "product":
      return getProduct(path);
    case "category":
      return getCategory(path);
    case "product_line":
      return getProductLine(path);
    default:
      throw new Error("Invalid type");
  }
}

export default function PreviewClient({
  path,
  variantParam,
  type,
}: PreviewClientProps) {
  const [page, setPage] = useState<PageType>();

  const getContent = async () => {
    const data = await getPreviewData(type, path, variantParam);
    setPage(data);
  };

  useEffect(() => {
    initLivePreview();
    ContentstackLivePreview.onEntryChange(getContent);
  }, [path]);

  if (!page) {
    return <p>Loading preview…</p>;
  }

  return <Page page={page} />;
}
