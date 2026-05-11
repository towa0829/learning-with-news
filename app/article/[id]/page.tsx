import type { Metadata } from "next";
import DetailClient from "./DetailClient";

type Props = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "記事詳細",
  description: "英語ニュース記事の詳細を確認し、翻訳やキーワード分析で理解を深められるページ。",
};

export default async function DetailPage({ params }: Props) {
  const resolvedParams = await params;
  return <DetailClient params={resolvedParams} />;
}