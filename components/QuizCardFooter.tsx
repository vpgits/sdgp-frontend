import React from "react";
import { Button } from "./ui/button";
import UseQuizStore from "@/lib/context/quizCOntext";

export default function QuizCardFooter() {
  const {
    timer,
    score,
    pauseTimer,
    pauseTicking,
    resumeTicking,
    nextQuestion,
    currentQuestionIndex,
    quizData,
  } = UseQuizStore();

  return (
    <>
      <div className="flex flex-auto items-center justify-center gap-x-20">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Timer: {timer}s
          </h2>
        </div>
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Score: {score}
          </h2>
        </div>
        {!pauseTimer ? (
          <Button
            onClick={() => {
              pauseTicking();
            }}
          >
            Submit
          </Button>
        ) : (
          <Button
            onClick={() => {
              nextQuestion();
              resumeTicking();
            }}
          >
            {currentQuestionIndex < quizData.length - 1 ? "Next" : "Finish"}
          </Button>
        )}
      </div>
    </>
  );
}
