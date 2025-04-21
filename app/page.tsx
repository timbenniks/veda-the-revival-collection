import { getPage, isPreview } from "@/lib/contentstack";
import LandingPage from "../components/LandingPage";
import PreviewClient from "@/components/PreviewClient";

export default async function Home() {
  const path = "/";
  const variantParam = "";

  if (isPreview) {
    return <PreviewClient path={path} variantParam={variantParam} />;
  } else {
    const page = await getPage(path, variantParam);
    return <LandingPage page={page} />;
  }
}
