import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

type Props = {
  params: Promise<{ id:string}>;
}

export async function GET(
  request: Request,
  { params }: Props
) {
  try {
    const { id } = await params;
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("id", decodeURIComponent(id))
      .single();

    if (error || !data) {
      return NextResponse.json(
        { found: false },
        { status: 200 }
      );
    }

    
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { found: false },
      { status: 500 }
    );
  }
}