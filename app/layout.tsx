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
  title: {
    default: "NewsLingo",
    template: "%s | NewsLingo",
  },
  description: "最新ニュースを教材に英語を学べる学習アプリ。政治・経済・テクノロジー・文化など幅広い分野の記事を読み、AIによる語彙分析と単語保存で実践的な英語力を効率よく伸ばせます。",
  keywords: [
    "英語学習",
    "ニュース英語",
    "語彙学習",
    "英語リーディング",
    "NewsLingo",
  ],
  openGraph: {
    title: "NewsLingo",
    description: "最新ニュースと多様な分野の記事で、語彙力と読解力を伸ばせる英語学習アプリ。",
    locale: "ja_JP",
    type: "website",
  },
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
