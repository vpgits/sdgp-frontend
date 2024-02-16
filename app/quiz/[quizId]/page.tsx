import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Database, Tables } from "@/types/supabase";
import React from "react";

import QuizForm from "@/components/QuizForm";

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
    try {
      let { data, error } = await supabase
        .from("questions")
        .select("data")
        .eq("quiz_id", quizId);
      return data!;
    } catch (error: any) {
      throw new Error("Error fetching quiz" + error.message);
    }
  };

  let quizData = await fetchQuiz();

  let modifiedQuizData = quizData.map((data, index) => ({
    ...data.data,
    userAnswer: "",
    id: index,
  }));

  let data = {
    defaultValues: modifiedQuizData,
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <QuizForm quizData={data} />
      </div>
    </>
  );
}
