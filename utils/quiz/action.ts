"use server";

import { createClient } from "@/utils/supabase/actions";
import { cookies } from "next/headers";
import { Database, Tables } from "@/types/supabase";
import { redirect } from "next/navigation";

export async function handleFormUpload(
  userData: any,
  quizId: string,
  score: number
) {
  const cookieStore = cookies();
  const supabase = createClient<Database>(cookieStore);
  {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      redirect("/login");
    }
  }
  const handleUpload = async () => {
    try {
      let { data, error } = await supabase
        .from("quiz")
        .update({ results: userData, scores: score })
        .eq("id", quizId)
        .select();
      console.log(data, error);
      if (error) {
        throw new Error("Error uploading quiz" + error.message);
      }
    } catch (error: any) {
      throw new Error("Error uploading quiz" + error.message);
    }
  };
  await handleUpload();
}

export async function handleShare(quizId: string) {
  const cookieStore = cookies();
  const supabase = createClient<Database>(cookieStore);
  {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      redirect("/login");
    }
  }

  try {
    const { data } = await supabase.from("share").select("id").eq("id", quizId);
    if (!data![0]) {
      const { data } = await supabase
        .from("quiz")
        .select("summary")
        .eq("id", quizId);
      let { error } = await supabase
        .from("share")
        .insert([{ id: quizId, summary: data![0].summary }])
        .select();
      if (error) {
        throw new Error("Error sharing quiz" + error.message);
      }
    }
  } catch (error: any) {
    throw new Error("Error sharing quiz" + error.message);
  }
  redirect(`/share/${quizId}`);
}

export async function createNewQuiz(quizId: string) {
  const cookieStore = cookies();
  const supabase = createClient<Database>(cookieStore);
  let newQuizId: string;
  {
    const { error } = await supabase.auth.getUser();
    if (error) {
      redirect("/login");
    }
  }
  try {
    const { data, error } = await supabase
      .from("quiz")
      .insert([{ parent_id: quizId }])
      .select();
    if (error) {
      throw new Error("Error creating quiz" + error.message);
    }
    newQuizId = data![0].id;
  } catch (error: any) {
    throw new Error("Error creating quiz" + error.message);
  }
  redirect(`/quiz/${newQuizId}`);
}
