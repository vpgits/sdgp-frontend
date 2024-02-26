"use server";

import { createClient } from "@/utils/supabase/actions";
import { cookies } from "next/headers";
import { Database, Tables } from "@/types/supabase";
import { redirect } from "next/navigation";

export async function handleFormUpload(userData: any, quizId: string) {
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
        .update({ results: userData })
        .eq("id", quizId)
        .select();
      if (error) {
        throw new Error("Error uploading quiz" + error.message);
      }
    } catch (error: any) {
      throw new Error("Error uploading quiz" + error.message);
    }
  };
  await handleUpload();
}
