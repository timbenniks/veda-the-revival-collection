"use client";

import { useState, useEffect } from "react";
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
      throw new Error("Invalid type");
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
  const [contentType, setContentType] = useState<
    "product" | "pdp" | undefined
  >();

  const [header, setHeader] = useState<HeaderProps>();

  const getContent = async () => {
    const data = await getPreviewData(type, path, variantParam);

    if ("contentType" in data) {
      const headerContent = await getHeader();
      setHeader(headerContent);
      setContentType(data.contentType);
      setContent(data.entry);
    } else {
      setContent(data);
    }
  };

  useEffect(() => {
    initLivePreview();
    ContentstackLivePreview.onEntryChange(getContent);
  }, [path]);

  if (!content) {
    return (
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
  }

  if (type === "page") {
    return <Page page={content as PageProps} />;
  } else if (type === "productOrPdp") {
    return (
      <Product
        entry={content as ProductProps | PdpProps}
        contentType={contentType}
        header={header}
      />
    );
  } else {
    return <p>TODO: add code for category and product_line</p>;
  }
}
