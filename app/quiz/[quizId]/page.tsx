import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Database, Tables } from "@/types/supabase";
import React from "react";
import Quiz from "@/components/Quiz";
type Props = {
  quizId: Tables<"quiz">["id"];
};

export default async function Page({ params }: { params: Props }) {
  const { quizId } = params;
  const cookieStore = cookies();
  const supabase = createClient<Database>(cookieStore);
  {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      redirect("/");
    }
  }
  const fetchQuiz = async () => {
    let { data, error } = await supabase
      .from("quizInstance")
      .select("*")
      .eq("quizId", quizId);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  const data = await fetchQuiz();

  return (
    <>
      <div className="flex flex-auto items-center justify-center h-full">
        <Quiz quizInstances={data!} quizId={quizId} />
      </div>
    </>
  );
}
