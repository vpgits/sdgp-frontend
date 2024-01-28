"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "./ui/card";

type Props = {
  questionData: {
    data: {
      question: string;
      correct_answer: string;
      incorrect_answers: string[];
    };
  };
};

export default function QuizCard({ questionData }: Props) {
  const [answerArray, setAnswerArray] = useState<string[]>([]);
  const [start, setStart] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(10);
  const [score, setScore] = useState<number>(0);
  const [select, setSelect] = useState<string>("");

  useEffect(() => {
    const combinedAnswers = [
      questionData.data.correct_answer,
      ...questionData.data.incorrect_answers,
    ];

    // Shuffle the combined answers
    const shuffledAnswers = combinedAnswers.sort(() => Math.random() - 0.5);

    // Set the shuffled answers to the state
    setAnswerArray(shuffledAnswers);
  }, []);

  useEffect(() => {
    if (start) {
      const intervalId = setInterval(() => {
        if (timer === 0) {
          setStart(false);
          setTimer(0);
          if (select === questionData.data.correct_answer) {
            setScore((score) => score + 10);
          }
        } else {
          setTimer((timer) => timer - 1);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [start, timer]);

  if (answerArray) {
    return (
      <>
        <section className="flex flex-col items-center justify-center py-12 ">
          <div className="max-w-md w-full space-y-8">
            <div className="flex flex-col rounded-md shadow-lg p-5">
              <h3 className="text-lg font-medium text-center m-2">
                {questionData.data.question}
              </h3>
              <div className=" m-5 flex items-center justify-center flex-col h-max">
                {!start && timer !== 0 && (
                  <Button onClick={() => setStart(true)}>Start</Button>
                )}
                {start &&
                  answerArray.map((answer) => (
                    <Card
                      className={`w-full m-2 p-2  border-2  text-justify   rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus: cursor-pointer ${
                        answer === select
                          ? "dark:border-white border-black"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                      onClick={() => setSelect(answer)}
                    >
                      {answer}
                    </Card>
                  ))}
                {timer === 0 &&
                  !start &&
                  answerArray.map((answer) => (
                    <Card
                      className={`w-full m-2 p-2 border-2 text-justify rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 ${
                        answer === questionData.data.correct_answer
                          ? "border-green-600 dark:border-green-500 dark:bg-gray-800"
                          : answer === select &&
                            answer !== questionData.data.correct_answer
                          ? "border-red-600 dark:border-red-500 dark:bg-gray-800"
                          : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                      } hover:cursor-auto`}
                    >
                      {answer}
                    </Card>
                  ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
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
            </div>
          </div>
        </section>
      </>
    );
  }
}
