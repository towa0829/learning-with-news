import { supabase } from "@/lib/supabase/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { article, analysis} = await req.json();

  const { error } = await supabase.from("articles").upsert({
    id: article.id,
    title: article.title,
    description: article.description,
    url: article.url,
    image_url: article.urlToImage,
    source: article.source?.name ?? "guardian",
    author: article.author,
    section: article.section,
    published_at: article.publishedAt,

    summarized_body_text_html: analysis.summarizedBodyTextHTML,
    translated_title: analysis.translatedTitle,
    translated_description: analysis.translatedDescription,
    translated_body_text: analysis.translatedBodyText,
  });

  if(error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ message: "Article saved successfully" });
}
