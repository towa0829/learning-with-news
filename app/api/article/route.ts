import { NextRequest, NextResponse } from "next/server";
import { Article } from "@/lib/type";
import { encode } from "punycode";

export async function GET(req: NextRequest) {
  const res = await fetch(
  `https://newsapi.org/v2/top-headlines?country=us&language=en&pageSize=8&apiKey=${process.env.NEWS_API_KEY}`
  );
  const data = await res.json();

  const articles = data.articles.map((article: Article) => ({
    id: encodeURIComponent(article.title), 
    title: article.title,
    description: article.description,
    url: article.url,
    urlToImage: article.urlToImage,
    publishedAt: article.publishedAt,
    content: article.content,
  }))

  return NextResponse.json({articles});
}