import { getPage, isPreview } from "@/lib/contentstack";
import Page from "../components/Page";
import PreviewClient from "@/components/PreviewClient";

export default async function Home() {
  const path = "/";
  const variantParam = "";

  if (isPreview) {
    return (
      <PreviewClient path={path} variantParam={variantParam} type="page" />
    );
  } else {
    const page = await getPage(path, variantParam);
    return <Page page={page} />;
  }
}
