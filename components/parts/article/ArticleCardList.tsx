"use client";
import ArticleCard from "./ArticleCard";
import { useState, useEffect } from "react";
import { Article } from "@/lib/type";

const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      const res = await fetch("/api/article",
        { cache: "no-store" }
      );
      const data = await res.json();
      setArticles(data.articles);
      setLoading(false);
    }
    fetchArticles();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (articles.length === 0) {
    return <p>No articles found.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  )
}

export default ArticleList
