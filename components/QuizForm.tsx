"use client";
import React, { useEffect, useState } from "react";
import { FieldArrayWithId, useFieldArray, useForm } from "react-hook-form";
import { QuestionData } from "@/types/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

const zodMCQSchema = z.object({
  defaultValues: z.array(
    z.object({
      id: z.string(),
      question: z.string(),
      correctAnswer: z.string(),
      incorrectAnswers: z.array(z.string()),
      userAnswer: z.string(),
    })
  ),
});

type defaultValues = {
  id: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  userAnswer: string;
}[];

type modifiedQuizData = {
  id: string;
  userAnswer: string;
  question: string | undefined;
  correct_answer: string;
  incorrect_answers: string[];
}[];

type fieldType = FieldArrayWithId<
  {
    defaultValues: modifiedQuizData;
  },
  "defaultValues",
  "id"
>;

// const questions = {
//   defaultValues: [
//     {
//       id: "1",
//       question: "What is the capital of France?",
//       correctAnswer: "Paris",
//       incorrectAnswers: ["London", "Berlin", "Rome"],
//       userAnswer: "",
//     },
//     {
//       id: "2",
//       question: "Who is the author of 'Pride and Prejudice'?",
//       correctAnswer: "Jane Austen",
//       incorrectAnswers: [
//         "Charles Dickens",
//         "William Shakespeare",
//         "Emily Bronte",
//       ],
//       userAnswer: "",
//     },
//     {
//       id: "3",
//       question: "What is the largest planet in our solar system?",
//       correctAnswer: "Jupiter",
//       incorrectAnswers: ["Saturn", "Mars", "Neptune"],
//       userAnswer: "",
//     },
//     {
//       id: "4",
//       question: "Which country is known for its tulips?",
//       correctAnswer: "Netherlands",
//       incorrectAnswers: ["Italy", "Japan", "Australia"],
//       userAnswer: "",
//     },
//     {
//       id: "5",
//       question: "What is the chemical symbol for gold?",
//       correctAnswer: "Au",
//       incorrectAnswers: ["Ag", "Cu", "Pt"],
//       userAnswer: "",
//     },
//     {
//       id: "6",
//       question: "Which country is known for its tulips?",
//       correctAnswer: "Netherlands",
//       incorrectAnswers: ["Italy", "Japan", "Australia"],
//       userAnswer: "",
//     },
//     {
//       id: "7",
//       question: "What is the chemical symbol for gold?",
//       correctAnswer: "Au",
//       incorrectAnswers: ["Ag", "Cu", "Pt"],
//       userAnswer: "",
//     },
//   ],
// };

export default function QuizForm(props: { quizData: any }) {
  const { quizData } = props;
  console.log(quizData);
  const [mark, setMark] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [time, setTime] = useState<number>(5 * quizData.defaultValues.length);

  const form = useForm<z.infer<typeof zodMCQSchema>>({
    resolver: zodResolver(zodMCQSchema),
    defaultValues: { ...quizData },
  });
  const { control, handleSubmit, formState } = { ...form };
  const { fields } = useFieldArray({
    control,
    name: "defaultValues",
  });

  const handleSubmitQuiz = (data: z.infer<typeof zodMCQSchema>) => {
    setSubmitted(true);
    if (data.defaultValues) {
      let score = 0;
      data.defaultValues.forEach((question) => {
        if (question.correctAnswer === question.userAnswer) {
          score += 10;
        }
      });
      setMark(score);
    }
  };

  useEffect(() => {
    if (!submitted) {
      const interval = setTimeout(() => {
        setTime((time) => time - 1);
      }, 1000);

      if (time === 0 || submitted) {
        clearInterval(interval);
        form.handleSubmit(handleSubmitQuiz)();
      }
      return () => clearInterval(interval);
    }
  }, [time, form, submitted]);

  return (
    <>
      <div className="z-10 top-0 sticky w-full text-center bg-white dark:bg-slate-950 py-2">
        <div className="flex flex-auto items-center justify-center gap-x-10 gap-y-2 flex-col">
          <h1 className="">
            <span className="gap-x-10 x-5">
              <p>{formState.isSubmitted ? `Score: ${mark}` : ""}</p>
              <p>Time: {time}s </p>
            </span>
          </h1>
          <Progress
            value={100 - (100 * time) / (5 * quizData.defaultValues.length)}
            max={100}
            className={`w-1/2 ${
              time < 10 ? (time == 0 ? "hidden" : "bg-red-500") : "bg-green-500"
            }`}
          />
        </div>
      </div>
      <form onSubmit={handleSubmit(handleSubmitQuiz)} className="pb-5">
        {fields.map((field, index) => (
          <div className="flex flex-auto flex-col mx-10" key={field.id}>
            <ShadCNMCQComponent
              field={field as any}
              index={index as number}
              form={form}
            />
          </div>
        ))}
        <div className="flex justify-center gap-x-10">
          <Button type="submit" disabled={formState.isSubmitted}>
            Submit
          </Button>
          <Button type="reset" disabled={formState.isSubmitted}>
            Clear All
          </Button>
        </div>
      </form>
    </>
  );
}

export function ShadCNMCQComponent({
  field,
  index,
  form,
}: {
  field: fieldType;
  index: number;
  form: ReturnType<typeof useForm<z.infer<typeof zodMCQSchema>>>;
}) {
  const { formState, register } = form;
  const [answers, setAnswers] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState<string>("");

  useEffect(() => {
    setAnswers(
      [field.correct_answer, ...field.incorrect_answers].sort(
        () => Math.random() - 0.5
      )
    );
  }, [field.correct_answer, field.incorrect_answers]);

  return (
    <div key={field.id} className="my-5">
      <label key={`defaultValues.${index}.id`}>{field.question}</label>
      <div
        key={`${field.id}.answers`}
        className="flex flex-col items-center justify-center mt-2"
      >
        {answers.map((answer, answerIndex) => (
          <div
            key={`answer-${answerIndex}`}
            className={`border-2 border-black dark:border-gray-600 gap-y-2  w-full flex items-center p-3 my-2 rounded-lg  ${
              formState.isSubmitted && userAnswer == answer
                ? userAnswer === field.correct_answer
                  ? "bg-green-500 bg-opacity-70"
                  : `bg-red-500 bg-opacity-70`
                : userAnswer === answer
                ? "bg-slate-200 dark:bg-slate-700 "
                : ""
            } ${
              formState.isSubmitted && answer === field.correct_answer
                ? "bg-green-500 bg-opacity-70"
                : ""
            } `}
          >
            <input
              className="w-4 h-4 mr-4"
              type="radio"
              id={`defaultValues.${index}.answer-${answerIndex}`}
              {...register(`defaultValues.${index}.userAnswer`)}
              disabled={formState.isSubmitted}
              onChange={() => setUserAnswer(answer)}
              value={answer}
            />
            <label
              htmlFor={`defaultValues.${index}.answer-${answerIndex}`}
              className={`w-full hover:cursor-pointer text-justify`}
            >
              <span>{answer}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

// export function MCQComponent({
//   field,
//   index,
//   form,
// }: {
//   field: fieldType;
//   index: number;
//   form: ReturnType<typeof useForm<z.infer<typeof zodMCQSchema>>>;
// }) {
//   const { register, formState, watch } = form;
//   const [answers, setAnswers] = useState<string[]>([]);
//   const [userAnswer, setUserAnswer] = useState<string>("");
//   useEffect(() => {
//     setAnswers(
//       [field.correctAnswer, ...field.incorrectAnswers].sort(
//         () => Math.random() - 0.5
//       )
//     );
//   }, [field]);
//   return (
//     <div key={field.id}>
//       <label key={`defaultValues.${index}.id`}>{field.question}</label>
//       <div key={`${field.id}.answers`}>
//         {answers.map((answer, answerIndex) => (
//           <div key={`answer-${answerIndex}`}>
//             <input
//               type="radio"
//               id={`defaultValues.${index}.answer-${answerIndex}`}
//               {...register(`defaultValues.${index}.userAnswer`)}
//               disabled={formState.isSubmitted}
//               value={answer}
//             />
//             <label
//               htmlFor={`defaultValues.${index}.answer-${answerIndex}`}
//               className={``}
//             >
//               {answer}
//             </label>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export function ShadCNMCQComponent({
//   field,
//   index,
//   form,
// }: {
//   field: fieldType;
//   index: number;
//   form: ReturnType<typeof useForm<z.infer<typeof zodMCQSchema>>>;
// }) {
//   const [answers, setAnswers] = useState<string[]>([]);
//   const { register, formState, watch, control } = form;
//   useEffect(() => {
//     setAnswers(
//       [field.correctAnswer, ...field.incorrectAnswers].sort(
//         () => Math.random() - 0.5
//       )
//     );
//   }, []);
//   console.log(answers);

//   return (
//     <RadioGroup name={field.id} defaultValue={field.userAnswer}>
//       <div className="flex items-center space-x-2">
//         <RadioGroupItem value="option-one" id="option-one" />
//         <Label htmlFor="option-one">Option One</Label>
//       </div>
//     </RadioGroup>
//   );
// }

{
  /* <FormField
          control={control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */
}

{
  /* <label
                    key={field.id} // important to include key with field's id
                    {...register(`defaultValues.${index}.question`)}
                  >
                    {field.question}
                  </label>
                  <input
                    type="radio"
                    {...register(`defaultValues.${index}`)}
                    defaultValue={field.correctAnswer}
                  />
                  {field.incorrectAnswers.map((answer, answerIndex) => (
                    <input
                      key={answerIndex} // important to include key with answer's index
                      type="radio"
                      {...register(`defaultValues.${index}`)}
                      defaultValue={answer}
                    />
                  ))} */
}
