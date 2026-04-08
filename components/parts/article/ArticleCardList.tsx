"use client";
import ArticleCard from "./ArticleCard";
import { useState, useEffect } from "react";
import { Article, Category } from "@/lib/type";

const CategoryList: Category[] = ["business", "entertainment", "general", "health", "science", "sports", "technology"];

type Props = {
  category: Category;
}

const ArticleList = ({ category }: Props) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles(category: Category = "general") {
      const res = await fetch(`/api/article?category=${category}`, {
        cache: "no-store"
      });
      const data = await res.json();
      setArticles(data.articles);
      setLoading(false);
    }
    fetchArticles(category);
  }, [category]);

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
