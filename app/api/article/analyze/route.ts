import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { Vocabulary } from "@/lib/type";

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
以下の英語ニュース記事を日本語に翻訳し，英語学習に役立つ重要語句を抽出してください．

【要件】
- タイトルと説明文を自然な日本語に翻訳する
- keywordsは記事内に登場した順番で並べる
- keywordsには英語学習上重要な語句のみを5〜10個抽出する
- 固有名詞のみの抽出は避ける
- 熟語や頻出表現を優先する
- keywordsには意味と簡単な例文を必ずつける
- 必ずJSONのみを出力し，説明文やコードブロックは付けない

【記事】
タイトル: ${title}
説明: ${description}

【出力形式】
{
  "translatedTitle": "翻訳されたタイトル",
  "translatedDescription": "翻訳された説明",
  "keywords": [
    {
      "phrase": "重要語句（英語）",
      "meaning": "日本語の意味",
      "example_sentence": {
        "en": "英語の例文",
        "ja": "日本語の例文"
      } 
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
        keywords?: Array<Vocabulary>;
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