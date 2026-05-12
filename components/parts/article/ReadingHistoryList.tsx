"use client";
import ArticleCard from "./ArticleCard";
import { useState, useEffect } from "react";
import { Article } from "@/lib/type";
import { supabase } from "@/lib/supabase/client";

const ReadingHistoryList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("view_history")
          .select(`viewed_at,
              articles (*)
            `)
          .eq("user_id", user.id)
          .order("viewed_at", { ascending: false });

        if (error) {
          console.error(error);
          setLoading(false);
          return;
        }

        const formattedArticles = (data ?? [])
          .map((item: any): Article | null => {
            const article = item.articles?.[0];

            if (!article) return null;

            return {
              id: article.id,
              title: article.title,
              description: article.description,
              url: article.url,
              urlToImage: article.image_url,
              publishedAt: article.published_at,
              author: article.author,
              bodyText: null,
              source: {
                name: article.source,
              },
            };
          })
          .filter((article): article is Article => article !== null);

        setArticles(formattedArticles);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadArticles();
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

export default ReadingHistoryList
