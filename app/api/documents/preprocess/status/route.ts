import { createClient } from "@/utils/supabase/actions";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  let { data, error } = await supabase.auth.getUser();
  if (error) {
    return new Response(JSON.stringify({ error }));
  }
  let userId = data?.user?.id;
  let { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  if (error) {
    return new Response(JSON.stringify({ error }));
  }
  let access_token = sessionData?.session?.access_token;
  let refresh_token = sessionData?.session?.refresh_token;
  try {
    const url = new URL(request.url);
    const queryParams = new URLSearchParams(url.search);
    const taskId = queryParams.get("taskId");
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", access_token || "");
    headers.append("Refresh-Token", refresh_token || "");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/preprocess/${taskId}`
    );
    const data = await res.json();
    return new Response(JSON.stringify({ data }));
  } catch (error: any) {
    throw new Error("Error getting preprocess status " + error.message);
  }
}
