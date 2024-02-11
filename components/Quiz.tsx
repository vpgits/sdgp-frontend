import React, { useEffect, useState } from "react";
import { Database, Tables, QuizInstance, QuestionData } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";
import QuizCard from "./QuizCard copy";
import { Button } from "./ui/button";
import Link from "next/link";
import UseQuizStore from "@/lib/context/quizCOntext";
import Loading from "@/app/chat/loading";

export default function Quiz() {
  const { currentQuestion, currentQuestionIndex, start, end } = UseQuizStore();


  const startQuiz = () => {
    UseQuizStore.setState({ currentQuestion: UseQuizStore.getState().quizData[currentQuestionIndex]});
  }
  
  return (
    <>
      {start && currentQuestion ? (
        <QuizCard />

      ) : (
        <Loading />
        //   !end && (
        //     <div className="flex flex-col items-center justify-center py-2 max-w-md w-full space-y-8 ">
        //       <div> Loading ... </div>
        //       <Button onClick={onEndHandler}>End Quiz</Button>
        //     </div>
        //   )
        // )}
        // {end && (
        //   <div className="flex flex-col items-center justify-center py-2 max-w-md w-full space-y-8 ">
        //     <h2 className="text-xl font-bold">Quiz Ended</h2>
        //     <h2>
        //       Score is {score}/{questions.length * 10}
        //     </h2>
        //     <Link href={"/"}>
        //       <Button>Back to Homepage</Button>
        //     </Link>
        //   </div>
      )}
    </>
  );
}
