"use client";
import React, { useEffect, useState } from "react";
import { Database, Tables, QuizInstance } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import QuizCard from "./QuizCard copy";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Quiz(params: {
  quizInstances: Tables<"quizInstance">[];
  quizId: Tables<"quiz">["id"];
}) {
  const [quizInstances, setQuizInstances] = useState<Tables<"quizInstance">[]>(
    params.quizInstances
  );
  const [currentQuestionData, setCurrentQuestionData] =
    useState<Tables<"questions">>();
  const [currentQuestion, setCurrentQuestion] =
    useState<Tables<"quizInstance">>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [end, setEnd] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const supabase = createClient<Database>();
  const router = useRouter();
  let fetching: boolean = true;

  useEffect(() => {
    const fetchAuthUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        router.push("/login");
      }
    };
    fetchAuthUser();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("supabase_realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "quizInstance" },
        (payload) => {
          console.log(payload);
          setQuizInstances((current) => [
            ...current,
            payload.new as QuizInstance,
          ]);
        }
      )
      .subscribe();
    supabase
      .from("quiz")
      .select("generating")
      .eq("id", params.quizId)
      .then(({ data, error }) => {
        if (error) throw new Error(error.message);
        fetching = data[0].generating!;
      });
    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  useEffect(() => {
    const fetchQuestionData = async () => {
      if (!currentQuestion) return;
      const questionId: number = currentQuestion?.question_id!;
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("id", questionId)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      setCurrentQuestionData(data);
    };
    fetchQuestionData();
  }, [currentQuestion, supabase]);

  const onNextHandler = (arg: boolean) => {
    setCurrentQuestionIndex((current) => current + 1);
    if (arg) {
      setScore((score) => score + 10);
    }
    // Implement the logic to save the question as answered after debugging
    if (currentQuestionIndex === quizInstances.length - 1 && !fetching) {
      return onEndHandler();
    }
    setCurrentQuestion(quizInstances[currentQuestionIndex + 1]);
  };

  const onEndHandler = async () => {
    console.log("end");
    setEnd(true);
  };
  useEffect(() => {
    setCurrentQuestion(quizInstances[currentQuestionIndex]);
  }),
    [];

  return (
    <>
      {currentQuestion && currentQuestionData ? (
        <QuizCard
          question={currentQuestionData}
          onNextHandler={(arg: boolean) => onNextHandler(arg)}
        />
      ) : (
        !end && (
          <div className="flex flex-col items-center justify-center py-2 max-w-md w-full space-y-8 ">
            <div> Loading ... </div>
            <Button onClick={onEndHandler}>End Quiz</Button>
          </div>
        )
      )}
      {end && (
        <div className="flex flex-col items-center justify-center py-2 max-w-md w-full space-y-8 ">
          <h2 className="text-xl font-bold">Quiz Ended</h2>
          <h2>
            Score is {score}/{quizInstances.length * 10}
          </h2>
          <Link href={"/"}>
            <Button>Back to Homepage</Button>
          </Link>
        </div>
      )}
    </>
  );
}
