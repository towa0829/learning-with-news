import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

type RequestBody = {
  title?: string;
  description?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RequestBody;
    const title = body.title?.trim();
    const description = body.description?.trim();

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        translatedTitle: title,
        translatedDescription: description,
        keywords: [],
      });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
      以下のニュース記事を日本語にし翻訳し、重要語句とその意味をリストにしてください。
      なお、keywordsは出た順で並べてください。
      タイトル: ${title}
      説明: ${description}

      出力形式は以下のJSON形式でお願いします。
      {
        "translatedTitle": "翻訳されたタイトル",
        "translatedDescription": "翻訳された説明",
        "keywords": [
          {
            "phrase": "重要語句(英語)",
            "meaning": "意味"
          }
        ]
      }
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      return NextResponse.json({
        translatedTitle: title,
        translatedDescription: description,
        keywords: [],
      });
    }

    try {
      const parsed = JSON.parse(content) as {
        translatedTitle?: string;
        translatedDescription?: string;
        keywords?: Array<{ phrase: string; meaning: string }>;
      };

      return NextResponse.json({
        translatedTitle: parsed.translatedTitle ?? title,
        translatedDescription: parsed.translatedDescription ?? description,
        keywords: parsed.keywords ?? [],
      });
    } catch {
      return NextResponse.json({
        translatedTitle: title,
        translatedDescription: description,
        keywords: [],
      });
    }
  } catch {
    return NextResponse.json(
      { error: "Failed to analyze article" },
      { status: 500 }
    );
  }
}