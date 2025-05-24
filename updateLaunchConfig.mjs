import fs from "fs";
import path from "path";
import contentstack, { Region } from "@contentstack/delivery-sdk";
import dotenv from "dotenv";

dotenv.config();

async function getAllLinks() {
  const stack = contentstack.stack({
    apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY,
    deliveryToken: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN,
    environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT,
    region: Region[process.env.NEXT_PUBLIC_CONTENTSTACK_REGION],
  });

  const [pages, products, productLines] = await Promise.all([
    stack.contentType("page").entry().only(["url"]).query().find(),
    stack.contentType("product").entry().only(["url"]).query().find(),
    stack.contentType("category").entry().only(["url"]).query().find(),
    stack.contentType("product_line").entry().only(["url"]).query().find(),
  ]);

  const pageUrls = pages.entries?.map((e) => e.url) || [];
  const productUrls = products.entries?.map((e) => e.url) || [];
  const productLineUrls = productLines.entries?.map((e) => e.url) || [];

  return [...pageUrls, ...productUrls, ...productLineUrls, "/products"];
}

async function updateLaunchJson() {
  try {
    const launchData = {
      cache: {
        cachePriming: {
          urls: await getAllLinks(),
        },
      },
    };

    const filePath = path.resolve("./launch.json");
    fs.writeFileSync(filePath, JSON.stringify(launchData, null, 2));

    console.log("launch.json updated successfully!");
  } catch (error) {
    console.error("Error updating launch.json:", error);
  }
}

updateLaunchJson();
