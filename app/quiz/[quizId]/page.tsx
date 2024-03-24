import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Database, Tables } from "@/types/supabase";
import React from "react";

import QuizForm from "@/components/QuizForm";

type Props = {
  quizId: Tables<"quiz">["id"];
};
// type modifiedQuizData = {
//   id: string;
//   userAnswer: string;
//   question: string | undefined;
//   correct_answer: string;
//   incorrect_answers: string[];
// }[];

type questionData = {
  question: string | undefined;
  correct_answer: string;
  incorrect_answers: string[];
};

type modifiedQuizData = {
  id: string;
  userAnswer: string;
  question: string | undefined;
  correct_answer: string;
  incorrect_answers: string[];
}[];

type quizData = {
  defaultValues: modifiedQuizData;
};

export function generateMetadata() {
  return {
    title: "Quiz | Quizzifyme",
    description: "Quiz",
  };
}

export default async function Page({ params }: { params: Props }) {
  const { quizId } = params;
  let parentQuizId: string | undefined;

  const cookieStore = cookies();
  const supabase = createClient<Database>(cookieStore);

  let userData, score;

  {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      redirect("/");
    }
  }

  {
    const { data, error } = await supabase
      .from("quiz")
      .select("parent_id")
      .eq("id", quizId);
    if (error) {
      throw new Error("Error fetching quiz" + error.message);
    }
    if (data![0].parent_id !== null) {
      parentQuizId = data![0].parent_id;
    }
  }

  const fetchQuiz = async () => {
    try {
      let { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("quiz_id", parentQuizId ? parentQuizId : quizId);
      return data!;
    } catch (error: any) {
      throw new Error("Error fetching quiz" + error.message);
    }
  };

  let quizData = await fetchQuiz();

  {
    const { data } = await supabase
      .from("quiz")
      .select("results, scores, summary")
      .eq("id", quizId);
    const { results, scores, summary } = data?.[0] ?? {};
    if (scores !== null) {
      userData = results as quizData;
      score = scores as number;
    }
  }

  let modifiedQuizData = quizData.map((data, index) => {
    if (data.data === undefined) throw new Error("Error fetching quiz");
    const questionData = data.data as questionData;
    return {
      ...questionData,
      userAnswer: "",
      id: index.toString(),
    };
  });

  let data = {
    defaultValues: modifiedQuizData,
  };

  return (
    <>
      <div className="h-screen flex flex-auto  justify-center">
        <QuizForm
          quizData={data}
          quizId={quizId}
          saveData={userData!}
          score={score!}
        />
      </div>
    </>
  );
}

// function isQuestionData(object: any): object is modifiedQuizData {
//   return (
//     object &&
//     typeof object.question === "string" &&
//     typeof object.correct_answer === "string" &&
//     Array.isArray(object.incorrect_answers)
//   );
// }
