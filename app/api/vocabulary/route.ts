import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

function createSupabaseClient(authHeader: string | null) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    authHeader
      ? {
          global: {
            headers: {
              Authorization: authHeader,
            },
          },
        }
      : undefined,
  );
}

async function getAuthedUser(authHeader: string | null) {
  const supabase = createSupabaseClient(authHeader);
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return { user: null, error };
  }

  return { user: data.user, error: null };
}

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  const { user, error } = await getAuthedUser(authHeader);

  if (error || !user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseClient(authHeader);
  const { data, error: queryError } = await supabase
    .from("vocabulary")
    .select("id, user_id, article_id, phrase, meaning, example_sentence, created_at, updated_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (queryError) {
    return NextResponse.json({ message: queryError.message }, { status: 500 });
  }

  return NextResponse.json({ vocabulary: data ?? [] });
}

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");
  const { user, error } = await getAuthedUser(authHeader);

  if (error || !user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const supabase = createSupabaseClient(authHeader);

  const { data, error: upsertError } = await supabase
    .from("vocabulary")
    .upsert(
      {
        user_id: user.id,
        article_id: body.articleId ?? null,
        phrase: body.phrase,
        meaning: body.meaning,
        example_sentence: body.example_sentence ?? body.exampleSentence ?? {},
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,phrase" },
    )
    .select("id, user_id, article_id, phrase, meaning, example_sentence, created_at, updated_at")
    .single();

  if (upsertError) {
    return NextResponse.json({ message: upsertError.message }, { status: 500 });
  }

  return NextResponse.json({ vocabulary: data });
}

export async function DELETE(req: Request) {
  const authHeader = req.headers.get("authorization");
  const { user, error } = await getAuthedUser(authHeader);

  if (error || !user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  if (!body.id) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }

  const supabase = createSupabaseClient(authHeader);
  const { error: deleteError } = await supabase
    .from("vocabulary")
    .delete()
    .eq("id", body.id)
    .eq("user_id", user.id);

  if (deleteError) {
    return NextResponse.json({ message: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Vocabulary deleted successfully" });
}
