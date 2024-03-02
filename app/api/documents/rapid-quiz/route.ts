import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/actions";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  let userId, access_token, refresh_token, quizId;
  const cookieStore = cookies();
  const supabase = createClient<Database>(cookieStore);
  {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      return new NextResponse(JSON.stringify({ error }));
    }
    userId = data?.user?.id;
  }
  {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return new NextResponse(JSON.stringify({ error }));
    }
    access_token = data?.session?.access_token;
    refresh_token = data?.session?.refresh_token;
  }
  const body = await request.json();
  const documentId: string = body.documentId;
  const defaultModel: boolean = body.defaultModel;
  try {
    {
      const { data, error } = await supabase
        .from("quiz")
        .insert([
          {
            document_id: documentId,
            user_id: userId,
            default_model: defaultModel,
          },
        ])
        .select();
      quizId = data![0].id;
      if (error) {
        return new NextResponse(JSON.stringify({ error }));
      }
    }
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", access_token || "");
    headers.append("Refresh-Token", refresh_token || "");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/rapid-quiz/`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          quiz_id: quizId,
          default_model: defaultModel || true,
        }),
      }
    );
    if (!res.ok) {
      throw new Error("Failed to submit quiz");
    }
    const data = await res.json();
    console.log(data);
    const taskId = data.task_id;
    return new NextResponse(JSON.stringify({ taskId, quizId }));
  } catch (error: any) {
    throw new Error("Error getting documents " + error.message);
  }
}
