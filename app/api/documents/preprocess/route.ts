import { createClient } from "@/utils/supabase/actions";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  let userId, access_token, refresh_token;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      return new NextResponse(JSON.stringify({ error }));
    }
    userId = data?.user?.id;
  }
  {
    const { data, error } = await supabase.auth.getSession();
    access_token = data?.session?.access_token;
    refresh_token = data?.session?.refresh_token;
  }
  try {
    const url = new URL(request.url);
    const queryParams = new URLSearchParams(url.search);
    const documentId = queryParams.get("documentId");
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", access_token || "");
    headers.append("Refresh-Token", refresh_token || "");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/preprocess/`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          path: `${userId}/${documentId}`,
          user_id: userId,
          document_id: documentId,
        }),
      }
    );
    const data = await res.json();
    const taskId = data.task_id;
    return new NextResponse(JSON.stringify({ taskId }));
  } catch (error: any) {
    throw new Error("Error getting documents " + error.message);
  }
}
