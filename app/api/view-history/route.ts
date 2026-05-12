import { supabase } from "@/lib/supabase/client";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const { userId, articleId } = await req.json();

  await supabase.from("view_history").insert({
    user_id: userId,
    article_id: articleId,
    viewed_at: new Date().toISOString(),
  });

  return NextResponse.json({ message: "View history saved successfully" });

}