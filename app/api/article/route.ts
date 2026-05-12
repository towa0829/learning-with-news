import { NextRequest, NextResponse } from "next/server";
import { Article, GuardianArticle } from "@/lib/type";

export async function GET(req: NextRequest) {
  try {
    const category = req.nextUrl.searchParams.get("category") || "general";
    const keyword = req.nextUrl.searchParams.get("keyword")?.trim();

    const params = new URLSearchParams({
      "show-fields": "bodyText,thumbnail,trailText,byline",
      "page-size": "10",
      "order-by": "newest",
      "api-key": process.env.GUARDIAN_API_KEY || "",
    });

    if (keyword) {
      params.set("q", keyword);
    }

    if (!keyword && category && category !== "general") {
      params.set("section", category);
    }

    const res = await fetch(
      `https://content.guardianapis.com/search?${params.toString()}`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: `Guardian API error: ${res.status}`, detail: text },
        { status: 502 },
      );
    }

    const data = await res.json();

    const articles: Article[] = (data?.response?.results ?? []).map(
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
      }),
    );

    return NextResponse.json({ articles });
  } catch (error) {
    console.error("/api/article GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 },
    );
  }
}
