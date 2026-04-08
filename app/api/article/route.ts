import { NextRequest, NextResponse } from "next/server";
import { Article } from "@/lib/type";

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get("category") || "general";
  
  const params = new URLSearchParams({
    country: "us",
    category: category,
    pageSize: "10",
    apiKey: process.env.NEWS_API_KEY!,
  });
  
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?${params.toString()}`
  );
  const data = await res.json();

  const articles = data.articles.map((article: Article) => ({
    id: encodeURIComponent(article.url),
    source: article.source,
    author: article.author,
    title: article.title,
    description: article.description,
    url: article.url,
    urlToImage: article.urlToImage,
    publishedAt: article.publishedAt,

  }))

  return NextResponse.json({ articles });
}