import type { Metadata } from "next";
import "./globals.css";
import { PersonalizeProvider } from "./providers/PersonalizeProvider";
import { Inter } from "next/font/google";
import { LyticsTracking } from "@/components/lytics";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "300", "500", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Veda: The Revival Collection",
  metadataBase: new URL("https://veda.eu-contentstackapps.com"),
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
            {children}
            <LyticsTracking />
          </PersonalizeProvider>
        </main>
      </body>
    </html>
  );
}
