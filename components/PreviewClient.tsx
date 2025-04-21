"use client";
import { useState, useEffect } from "react";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import { getPage, initLivePreview } from "../lib/contentstack";
import Landingpage from "./LandingPage";
import { Page } from "@/types/contentstack";

export interface PreviewClientProps {
  path: string;
  variantParam?: string;
}

export default function PreviewClient({
  path,
  variantParam,
}: PreviewClientProps) {
  const [page, setPage] = useState<Page>();

  const getContent = async () => {
    const data = await getPage(path, variantParam);
    setPage(data);
  };

  useEffect(() => {
    initLivePreview();
    ContentstackLivePreview.onEntryChange(getContent);
  }, [path]);

  if (!page) return <p>Loading preview…</p>;

  return <Landingpage page={page} />;
}
