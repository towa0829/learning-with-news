import type { Metadata } from "next";
import VocabularyListClient from "./VocabularyListClient";

export const metadata: Metadata = {
  title: "単語帳",
  description: "保存した英単語やフレーズを一覧で確認できるページ。復習しながら語彙を定着できます。",
};

export default function VocabularyListPage() {
  return <VocabularyListClient />;
}
