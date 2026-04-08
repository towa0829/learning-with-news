"use client";
import ArticleCard from "./ArticleCard";
import { useState, useEffect } from "react";
import { Article, Category } from "@/lib/type";

const CategoryList: Category[] = ["business", "entertainment", "general", "health", "science", "sports", "technology"];

type Props = {
  category: Category;
  keyword: string;
}

const ArticleList = ({ category, keyword = "" }: Props) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);

      const params = new URLSearchParams();
      if (keyword?.trim()) {
        params.set("keyword", keyword.trim());
      } else {
        params.set("category", category);
      }

      const res = await fetch(`/api/article?${params.toString()}`, {
        cache: "no-store",
      });
      const data = await res.json();
      setArticles(data.articles);
      setLoading(false);
    }

    fetchArticles();
  }, [category, keyword]);

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
