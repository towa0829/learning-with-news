import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { Vocabulary } from "@/lib/type";

type RequestBody = {
  title?: string;
  description?: string;
  bodyText?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RequestBody;
    const title = body.title?.trim();
    const description = body.description?.trim();
    const bodyText = body.bodyText?.trim();

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
You are an English learning assistant.

Analyze the following English news article and generate learning content for Japanese English learners.

【Requirements】

- Summarize the article in approximately 200 English words
- The summary must be easier to read than the original article while preserving the core meaning
- Highlight important English vocabulary and phrases by wrapping them with <strong> tags
- Only wrap educationally valuable vocabulary or expressions for english learners
- Do NOT wrap proper nouns unless they are important learning expressions
- Keep the original word order and natural sentence flow
- Use semantic HTML only
- Return clean HTML without markdown or code blocks
- translatedBodyText must be a natural Japanese translation of the summarizedBodyTextHTML content
- keywords must appear in the same order as they first appear in the summary
- Extract 5 to 10 important vocabulary items
- Prioritize:
  - useful vocabulary
  - phrasal verbs
  - idioms
  - academic/business/news expressions
- Avoid extracting only names of people or places
- Every keyword must include:
  - Japanese meaning
  - short English example sentence
  - Japanese translation of the example
- Return ONLY valid JSON
- Do not include explanations
- Do not include markdown
- Do not include code fences

【Article】

Title:
${title}

Description:
${description}

Body:
${bodyText}

【Output Format】

{
  "summarizedBodyTextHTML": "<p>HTML summary with <strong>important vocabulary</strong></p>",

  "translatedTitle": "自然な日本語タイトル",

  "translatedDescription": "自然な日本語説明文",

  "translatedBodyText": "要約本文の自然な日本語訳",

  "keywords": [
    {
      "phrase": "important phrase",
      "meaning": "日本語の意味",
      "example_sentence": {
        "en": "Example sentence in English.",
        "ja": "日本語訳。"
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
        summarizedBodyTextHTML: bodyText,
        translatedTitle: title,
        translatedDescription: description,
        translatedBodyText: bodyText,
        keywords: [],
      });
    }

    try {
      const parsed = JSON.parse(content) as {
        summarizedBodyTextHTML: string;
        translatedTitle?: string;
        translatedDescription?: string;
        translatedBodyText?: string;
        keywords?: Array<Vocabulary>;
      };

      return NextResponse.json({
        summarizedBodyTextHTML: parsed.summarizedBodyTextHTML ?? bodyText,
        translatedTitle: parsed.translatedTitle ?? title,
        translatedDescription: parsed.translatedDescription ?? description,
        translatedBodyText: parsed.translatedBodyText ?? bodyText,
        keywords: parsed.keywords ?? [],
      });
    } catch {
      return NextResponse.json({
        summarizedBodyTextHTML: bodyText,
        translatedTitle: title,
        translatedDescription: description,
        translatedBodyText: bodyText,
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