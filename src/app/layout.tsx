import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import PageLoader from "@/components/PageLoader";
import Navigation from "@/components/Navigation";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import SectionDots from "@/components/SectionDots";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s · ${SITE.shortTitle}`,
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.author, url: SITE.url }],
  creator: SITE.author,
  publisher: SITE.author,
  applicationName: SITE.name,
  generator: "Next.js",
  category: "technology",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  // Icons are auto-detected from file conventions:
  //   src/app/favicon.ico        → <link rel="icon">
  //   src/app/apple-icon.tsx     → <link rel="apple-touch-icon">
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    // OG image is generated dynamically from app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    creator: SITE.twitter,
    // Twitter image inherits from app/opengraph-image.tsx (no twitter-image.tsx defined)
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add real values when you have them:
    // google: "",
    // yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={cn(
          inter.variable,
          "font-inter bg-background text-foreground antialiased selection:bg-accent-purple/40 selection:text-white cursor-none"
        )}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-full focus:text-sm focus:font-bold"
        >
          Skip to content
        </a>
        <PageLoader />
        <CustomCursor />
        <ScrollProgressBar />
        <Navigation />
        <SectionDots />
        <div className="noise-overlay" aria-hidden="true" />
        <SmoothScroll>
          <div id="main" className="relative z-10">{children}</div>
        </SmoothScroll>
      </body>
    </html>
  );
}
