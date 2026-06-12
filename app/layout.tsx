import { CookieBanner } from "@/components/layout/cookie-banner";
import { DemoBanner } from "@/components/layout/demo-banner";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TheListingHub - Investment Classifieds",
    template: "%s | TheListingHub",
  },
  description:
    "Buy, sell, and raise passive CRE investments. Browse syndicated private equity opportunities and connect with LPs and GPs.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  openGraph: {
    title: "TheListingHub - Investment Classifieds",
    description:
      "Connect with passive CRE investment opportunities, sponsors, and syndicated capital raises.",
    type: "website",
    siteName: "TheListingHub",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full min-w-0 flex-col">
        <DemoBanner />
        <Header />
        <main className="relative z-0 flex-1 min-w-0">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
