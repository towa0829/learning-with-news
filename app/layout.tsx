import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NewsLingo",
  description: "A news-based English learning app that helps you improve your English skills while keeping up with the latest news. Read news articles, save your favorites, and learn new vocabulary with example sentences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJp.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col overflow-x-hidden">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
