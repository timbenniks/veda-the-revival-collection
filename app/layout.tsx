import type { Metadata } from "next";
import "./globals.css";
import { PersonalizeProvider } from "./providers/PersonalizeProvider";

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
    <html lang="en">
      <body>
        <main>
          <PersonalizeProvider>{children}</PersonalizeProvider>
        </main>
      </body>
    </html>
  );
}
