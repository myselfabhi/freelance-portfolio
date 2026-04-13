import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import PageLoader from "@/components/PageLoader";
import Navigation from "@/components/Navigation";
import { cn } from "@/lib/utils";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Abhinav Verma | Portfolio",
  description: "Next-level interactive freelance portfolio of Abhinav Verma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={cn(
        inter.variable,
        "font-inter bg-background text-foreground antialiased selection:bg-accent-blue selection:text-white cursor-none"
      )}>
        <PageLoader />
        <CustomCursor />
        <Navigation />
        <div className="noise-overlay" aria-hidden="true" />
        <SmoothScroll>
          <div className="relative z-10">
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
