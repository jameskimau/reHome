import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import LocalBusinessJsonLd from "@/components/layout/LocalBusinessJsonLd";
import MobileCallBar from "@/components/layout/MobileCallBar";
import { siteConfig } from "@/config/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Used Washers, Fridges & Dryers in ${siteConfig.serviceArea}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: siteConfig.name,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <LocalBusinessJsonLd />
        <Header />
        {/* Bottom padding keeps content clear of the mobile call bar. */}
        <main className="flex-1 pb-20 md:pb-0">{children}</main>
        <Footer />
        <MobileCallBar />
      </body>
    </html>
  );
}
