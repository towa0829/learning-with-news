import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Decode the URL-encoded article ID
    const { id } = await params;
    const decodedId = decodeURIComponent(id);
    const res = await fetch(
      `https://content.guardianapis.com/${decodedId}?api-key=${process.env.GUARDIAN_API_KEY}&show-fields=bodyText,trailText,thumbnail,byline`
    );

    if (!res.ok) {
      return NextResponse.json(
        { message: "not found" },
        { status: 404 }
      );
    }

    const json = await res.json();
    const content = json.response.content;

    return NextResponse.json({
      id: content.id,
      source: {
        id: content.sectionId,
        name: content.sectionName,
      },
      author: content.fields?.byline ?? null,
      title: content.webTitle,
      description: content.fields?.trailText ?? null,
      url: content.webUrl,
      urlToImage: content.fields?.thumbnail ?? null,
      publishedAt: content.webPublicationDate,
      bodyText: content.fields?.bodyText ?? null,
    });
  } catch (e) {
    return NextResponse.json(
      { message: "error" },
      { status: 500 }
    );
  }
}