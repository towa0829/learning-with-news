import { NextRequest, NextResponse } from "next/server";
import { Article, GuardianArticle } from "@/lib/type";

// export async function GET(req: NextRequest) {

//   const category = req.nextUrl.searchParams.get("category") || "general";
//   const keyword = req.nextUrl.searchParams.get("keyword");

//   const params = new URLSearchParams({
//     language: "en",
//     pageSize: "10",
//     apiKey: process.env.NEWS_API_KEY!,
//   });

//   if (keyword) {
//     params.set("q", keyword);
//   } else {
//     params.set("category", category || "general");
//   }

//   const res = await fetch(
//     `https://newsapi.org/v2/top-headlines?${params.toString()}`
//   );
//   const data = await res.json();

//   const articles = data.articles.map((article: Article) => ({
//     id: encodeURIComponent(article.url),
//     source: article.source,
//     author: article.author,
//     title: article.title,
//     description: article.description,
//     url: article.url,
//     urlToImage: article.urlToImage,
//     publishedAt: article.publishedAt,

//   }))

//   return NextResponse.json({ articles });
// }

export async function GET(req: NextRequest) {

  // const category = req.nextUrl.searchParams.get("category") || "general";
  // const keyword = req.nextUrl.searchParams.get("keyword");

  // const params = new URLSearchParams({
  //   language: "en",
  //   pageSize: "10",
  //   apiKey: process.env.NEWS_API_KEY!,
  // });

  // if (keyword) {
  //   params.set("q", keyword);
  // } else {
  //   params.set("category", category || "general");
  // }

  // const res = await fetch(
  //   `https://newsapi.org/v2/top-headlines?${params.toString()}`
  // );
  const res = await fetch(
  `https://content.guardianapis.com/search?q=ai&show-fields=bodyText,thumbnail,trailText,byline&api-key=${process.env.GUARDIAN_API_KEY}`
);

const data = await res.json();

const articles: Article[] = data.response.results.map(
  (article: GuardianArticle) => ({
    id: encodeURIComponent(article.id),
    source: {
      id: article.sectionId,
      name: article.sectionName,
    },
    author: article.fields?.byline ?? null,
    title: article.webTitle,
    description: article.fields?.trailText ?? null,
    url: article.webUrl,
    urlToImage: article.fields?.thumbnail ?? null,
    publishedAt: article.webPublicationDate,
    bodyText: article.fields?.bodyText ?? null,
  })
);

return NextResponse.json({ articles });
}