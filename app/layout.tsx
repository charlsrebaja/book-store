import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
  viewportFit: "cover",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#2b2b2b" },
  ],
};

export const metadata: Metadata = {
  title: "Readify - Your Online Bookstore",
  description:
    "Discover and purchase your favorite books online with Readify, the premier digital bookstore.",
  keywords: ["books", "bookstore", "online shopping", "e-commerce"],
  icons: {
    icon: "/images/icons/bookl-logo1.png",
    apple: "/images/icons/bookl-logo1.png",
  },
  // ✅ CRITICAL: Force no-cache for HTML - prevents stale CSS
  other: {
    "cache-control": "no-cache, no-store, must-revalidate, max-age=0, public",
    pragma: "no-cache",
    expires: "0",
    "surrogate-control": "no-store",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-white text-darkBlue antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
