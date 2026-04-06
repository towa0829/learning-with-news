import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const targetUrl = searchParams.get("url")

  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&language=en&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`
  )

  const data = await res.json()

  const article = data.articles.find(
    (item: any) => item.url === targetUrl
  )

  if (!article) {
    return NextResponse.json(
      { message: "not found" },
      { status: 404 }
    )
  }

  return NextResponse.json({
    id: encodeURIComponent(article.url),
    title: article.title,
    description: article.description,
    image: article.urlToImage,
    publishedAt: article.publishedAt,
    url: article.url
  })
}