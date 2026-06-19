import "./globals.css";

export const metadata = {
  title: "Stitch | Mini Vlog Journal",
  description:
    "A mobile-first Stitch prototype for multi-video mini vlogs, journal playback, and shared memory flows.",
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
