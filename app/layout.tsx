import type { Metadata } from "next";
import "./globals.css";
import { PersonalizeProvider } from "./providers/PersonalizeProvider";

export const metadata: Metadata = {
  title: "Veda - The Revival Collection",
  description: "Veda - The Revival Collection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PersonalizeProvider>{children}</PersonalizeProvider>
      </body>
    </html>
  );
}
