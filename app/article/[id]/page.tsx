"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Article } from "@/lib/type";

type Props = {
  params: Promise<{ id: string }>;
};

const DetailPage = ({ params }: Props) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [analysis, setAnalysis] = useState<any>(null); // 翻訳＋重要語句
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadAndAnalyze() {
      const { id } = await params;

      if (!id) {
        if (isMounted) setIsLoading(false);
        return;
      }

      const savedArticles = localStorage.getItem("savedArticles");
      const parsedArticles = savedArticles ? (JSON.parse(savedArticles) as Article[]) : [];
      const savedArticle = parsedArticles.find((item) => item.id === id) ?? null;

      if (!isMounted) return;

      setArticle(savedArticle);
      setIsLoading(false);

      if (savedArticle) {
        const res = await fetch("/api/article/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: savedArticle.title,
            description: savedArticle.description,
          }),
        });
        let data;
        try {
          data = await res.json();
        } catch (err) {
          console.error("Failed to parse JSON:", err);
          data = { error: "Invalid JSON response" };
        }
        if (isMounted) setAnalysis(data); // analysis に保存
      }
    }

    loadAndAnalyze();

    return () => {
      isMounted = false;
    };
  }, [params]);

  if (isLoading) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-3xl font-bold">Article not found</h1>
        <p className="mt-4 text-muted-foreground">
          The article is not saved in local storage yet.
        </p>
        <Link href="/article" className="mt-6 inline-block text-blue-600">
          Back to articles
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <Link href="/article" className="text-blue-600 hover:underline">
        &larr; Back to articles
      </Link>
      <p className="mt-4 text-sm text-muted-foreground">
        {article.publishedAt.slice(0, 10)}
      </p>
      <p className="mb-4 text-sm text-muted-foreground">
        {article.author} from {article.source.name}
      </p>
      <Image
        src={article.urlToImage}
        alt={article.title}
        width={800}
        height={600}
        className="mt-3 h-auto w-full rounded-xl object-cover"
      />
      <h1 className="mt-3 text-3xl font-bold leading-tight">{article.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{article.description}</p>

      {analysis && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">翻訳 & 重要語句</h2>
          <p><strong>タイトル翻訳:</strong> {analysis.translatedTitle}</p>
          <p><strong>本文翻訳:</strong> {analysis.translatedDescription}</p>
          <ul className="mt-2 list-disc list-inside">
            {analysis.keyPhrases?.map((item: any, idx: number) => (
              <li key={idx}>
                <strong>{item.phrase}:</strong> {item.meaning}
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
};

export default DetailPage;