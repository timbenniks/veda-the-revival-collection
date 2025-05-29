import type { Metadata } from "next";
import "./globals.css";
import { PersonalizeProvider } from "./providers/PersonalizeProvider";
import { CartProvider } from "@/app/providers/cartContext";
import { Inter } from "next/font/google";
import { LyticsTracking } from "@/components/lytics";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "300", "500", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Veda: The Revival Collection",
  metadataBase: new URL(
    "https://veda-the-revival-collection-production.eu-contentstackapps.com"
  ),
  openGraph: {
    siteName: "Veda: The Revival Collection",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@timbenniks",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <main className="max-w-[1440px] mx-auto">
          <PersonalizeProvider>
            <CartProvider>
              {children}
              <Suspense fallback={null}>
                <LyticsTracking />
              </Suspense>
            </CartProvider>
          </PersonalizeProvider>
        </main>
      </body>
    </html>
  );
}
