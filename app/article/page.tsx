import type { Metadata } from "next";
import ArticleListClient from "./ArticleListClient";

export const metadata: Metadata = {
  title: "記事一覧",
  description: "最新の英語ニュース記事を分野別に閲覧・検索できるページ。気になる記事を読みながら語彙力を高められます。",
};

export default function ArticleListPage() {
  return <ArticleListClient />;
}
