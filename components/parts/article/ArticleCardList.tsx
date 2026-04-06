"use client";
import ArticleCard from "./ArticleCard";
import { useState, useEffect } from "react";
import { Article } from "@/lib/type";

const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      const res = await fetch("/api/article");
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
    <div>
      {articles.map((article, index) => (
        <ArticleCard key={article.id} article={article} priority={index === 0} />
      ))}
    </div>
  )
}

export default ArticleList
