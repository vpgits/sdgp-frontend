import { createClient } from "@/utils/supabase/actions";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Database } from "@/types/supabase";

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
  let { documentId, numOfQuestions, remarks, defaultModel } = body;
  if (defaultModel === "default") {
    defaultModel = true;
  } else {
    defaultModel = false;
  }

  if (
    documentId === null ||
    numOfQuestions === null ||
    remarks === null ||
    defaultModel == null
  ) {
    throw new Error("Invalid request");
  }

  try {
    {
      const { data, error } = await supabase
        .from("quiz")
        .insert([
          {
            document_id: documentId,
            user_id: userId,
            num_of_questions: numOfQuestions,
            remarks: remarks,
            default_model: defaultModel || true,
            generating: true,
          },
        ])
        .select();
      if (error) {
        return new NextResponse(JSON.stringify({ error }));
      }
      quizId = data[0].id;
    }
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", access_token || "");
    headers.append("Refresh-Token", refresh_token || "");

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/quiz/`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        quiz_id: quizId,
        default_model: defaultModel,
      }),
    });
    const data = await res.json();
    const taskId = data.task_id;
    return new NextResponse(JSON.stringify({ taskId, quizId }));
  } catch (error: any) {
    throw new Error("Error getting documents " + error.message);
  }
}
