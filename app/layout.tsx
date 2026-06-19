import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Stitch | AI Memory Vlogs",
  description:
    "A premium prototype for Stitch, an AI product that turns camera rolls into cinematic stories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
