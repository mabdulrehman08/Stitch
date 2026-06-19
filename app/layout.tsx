import Link from "next/link";

import "./globals.css";

const navItems = [
  { href: "/", label: "Demo" },
  { href: "/features", label: "Features" },
  { href: "/reviews", label: "Reviews" },
];

export const metadata = {
  title: "Stitch | Hiring Demo",
  description:
    "A clean Stitch-style hiring demo with multi-clip uploads, roadmap thinking, and review-ready product flows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
                  S
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-950">Stitch</p>
                  <p className="text-xs text-slate-500">Hiring demo</p>
                </div>
              </Link>

              <nav className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-slate-950"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>

          {children}
        </div>
      </body>
    </html>
  );
}
