"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Article } from "@/lib/type";
import { LuSparkles } from "react-icons/lu";
import { MdGTranslate } from "react-icons/md";
import { MdOutlineExitToApp } from "react-icons/md";
import Keyword from "@/components/parts/article/KeyWord";

type Props = {
  params: Promise<{ id: string }>;
};

const DetailClient = ({ params }: Props) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

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
        if (isMounted) setAnalysis(data);
      }
    }

    loadAndAnalyze();

    return () => {
      isMounted = false;
    };
  }, [params]);

  if (isLoading) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-2xl font-bold sm:text-3xl">Loading...</h1>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-2xl font-bold sm:text-3xl">Article not found</h1>
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
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link href="/article" className="text-blue-600 hover:underline">
        &larr; Back to articles
      </Link>
      <p className="mt-4 text-sm text-muted-foreground">
        {article.publishedAt.slice(0, 10)}
      </p>
      <p className="mb-4 text-sm text-muted-foreground">
        {article.author} from {article.source.name}
      </p>
      <img
        src={article.urlToImage || "/no-image.png"}
        alt={article.title}
        className="relative z-20 aspect-video w-full object-cover"
      />
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm sm:gap-4">
        {analysis?.keywords?.length > 0 && (
          <p className="flex items-center gap-1 rounded-2xl bg-green-100 px-2 py-1 text-green-600"><LuSparkles />{analysis.keywords.length} difficult words found</p>
        )}
        {analysis && (
          <Button onClick={() => setIsOpen((prev) => !prev)} className="bg-blue-600 text-white hover:bg-blue-700">
            <MdGTranslate />
            {isOpen ? "Hide" : "Show"} Translation
          </Button>
        )}
        <Button className="bg-black text-white hover:bg-gray-800">
          <Link href={article.url} target="_blank" rel="noopener noreferrer" className="text-white flex items-center gap-1">
            View Original<MdOutlineExitToApp className="w-7 h-7 mt-0.5" />
          </Link>
        </Button>
      </div>
      <h1 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl">{article.title}</h1>
      <p className="mt-4 text-base text-muted-foreground sm:text-lg">{article.description}</p>

      {analysis && isOpen && (
        <div className="mt-8 rounded-3xl border border-gray-300 bg-white p-4 text-sm sm:text-base">
          <h2 className="mb-2 text-lg font-semibold sm:text-xl">Japanese Translation</h2>
          <p className="text-muted-foreground">{analysis.translatedTitle}</p>
          <p className="text-muted-foreground">{analysis.translatedDescription}</p>
          <div className="mt-4 list-disc list-inside">
            <h2 className="mb-2 text-lg font-semibold sm:text-xl">Keywords</h2>
            {analysis.keywords?.map((item: any, idx: number) => (
              <Keyword key={idx} item={item} />
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-500 text-right">Translated with AI assistance</p>
        </div>
      )}
    </main>
  );
};

export default DetailClient;