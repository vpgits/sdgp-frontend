"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "./ui/card";
import { Tables } from "@/types/supabase";
import UseQuizStore from "@/lib/context/quizCOntext";
import QuizCardFooter from "./QuizCardFooter";

export default function QuizCard() {
  let isShuffled = false;
  const {
    sessionData,
    currentQuestion,
    currentQuestionIndex,
    timer,
    pauseTimer,
    selectedAnswer,
    updateSelectedAnswer,
  } = UseQuizStore();

  const questionData = currentQuestion.data!;
  let answerArray = [] as string[];

  const shuffleAnswers = () => {
    const combinedAnswers = [
      questionData.correct_answer,
      ...questionData.incorrect_answers,
    ];
    answerArray = combinedAnswers.sort(() => Math.random() - 0.5);
    isShuffled = true;
  };

  shuffleAnswers();

  return (
    <>
      <section className="flex flex-col items-center justify-center py-2 ">
        <div className="max-w-md w-full space-y-8">
          <div className="flex flex-col rounded-md shadow-lg p-5">
            <h3 className="text-lg font-medium text-center m-2">
              {questionData.question}
            </h3>
            <div className=" m-5 flex items-center justify-center flex-col h-max">
              {!pauseTimer &&
                answerArray.map((answer) => (
                  <Card
                    key={answer}
                    className={`w-full m-2 p-2  border-2  text-justify   rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus: cursor-pointer ${
                      answer === selectedAnswer
                        ? "dark:border-white border-black"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                    onClick={() => updateSelectedAnswer(answer)}
                  >
                    {answer}
                  </Card>
                ))}
              {timer === 0 &&
                pauseTimer &&
                answerArray.map((answer) => (
                  <Card
                    key={answer}
                    className={`w-full m-2 p-2 border-2 text-justify rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 ${
                      answer === questionData.correct_answer
                        ? "border-green-600 dark:border-green-500 dark:bg-gray-800"
                        : answer === selectedAnswer &&
                          answer !== questionData.correct_answer
                        ? "border-red-600 dark:border-red-500 dark:bg-gray-800"
                        : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                    } hover:cursor-auto`}
                  >
                    {answer}
                  </Card>
                ))}
            </div>
            <QuizCardFooter />
          </div>
        </div>
      </section>
    </>
  );
}
