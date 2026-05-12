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

        // Directly query Supabase for view_history and articles (no API proxy)
        const { data: vhData, error: vhError } = await supabase
          .from("view_history")
          .select("article_id, viewed_at")
          .eq("user_id", user.id)
          .order("viewed_at", { ascending: false });

        if (vhError) {
          console.error("Failed to load view-history from Supabase:", vhError.message);
          setArticles([]);
          setLoading(false);
          return;
        }

        const articleIds: string[] = Array.from(new Set((vhData ?? []).map((r: any) => r.article_id)));

        if (articleIds.length === 0) {
          setArticles([]);
          setLoading(false);
          return;
        }

        const { data: articlesData, error: articlesError } = await supabase
          .from("articles")
          .select("*")
          .in("id", articleIds);

        if (articlesError) {
          console.error("Failed to load articles from Supabase:", articlesError.message);
          setArticles([]);
          setLoading(false);
          return;
        }

        // Map DB rows to frontend `Article` shape and preserve order
        const mapRowToArticle = (row: any): Article => ({
          id: row.id,
          source: { name: row.source ?? "" },
          author: row.author ?? null,
          title: row.title,
          description: row.description ?? null,
          url: row.url,
          urlToImage: row.image_url ?? row.imageUrl ?? null,
          publishedAt: row.published_at ? new Date(row.published_at).toISOString() : new Date().toISOString(),
          bodyText: row.summarized_body_text_html ?? row.bodyText ?? null,
          translatedTitle: row.translated_title ?? row.translatedTitle ?? null,
          translated_description: row.translated_description ?? row.translatedDescription ?? null,
          translatedBodyText: row.translated_body_text ?? row.translatedBodyText ?? null,
          keywords: row.keywords ?? null,
        });

        const ordered: Article[] = articleIds
          .map((id) => (articlesData ?? []).find((a: any) => a.id === id))
          .filter(Boolean)
          .map(mapRowToArticle) as Article[];

        setArticles(ordered);
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
