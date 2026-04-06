"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Article } from "@/lib/type";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const DetailPage = ({ params }: Props) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadArticle() {
      const { id } = await params;

      if (!id) {
        if (isMounted) {
          setArticle(null);
          setIsLoading(false);
        }
        return;
      }

      const savedArticles = localStorage.getItem("savedArticles");
      const parsedArticles = savedArticles ? (JSON.parse(savedArticles) as Article[]) : [];
      const savedArticle = parsedArticles.find((savedItem) => savedItem.id === id) ?? null;

      if (isMounted) {
        setArticle(savedArticle);
        setIsLoading(false);
      }
    }

   
    loadArticle();


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
    </main>
  );
};

export default DetailPage;
