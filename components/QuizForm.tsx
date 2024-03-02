"use client";
import React, { useEffect, useRef, useState } from "react";
import { FieldArrayWithId, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import Chat from "./chat";
import { handleFormUpload, handleShare } from "@/utils/quiz/action";
import { useTimer } from "react-timer-hook";
import Link from "next/link";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const zodMCQSchema = z.object({
  defaultValues: z.array(
    z.object({
      id: z.string(),
      question: z.string(),
      correct_answer: z.string(),
      incorrect_answers: z.array(z.string()),
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

type quizData = {
  defaultValues: modifiedQuizData;
};

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

export default function QuizForm(props: {
  quizData: quizData;
  quizId: string;
  saveData: quizData;
  score: number;
}) {
  const { quizData, quizId, saveData, score } = props;
  const [mark, setMark] = useState<number>(score);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [userData, setUserData] = useState(null);
  const time: Date = new Date();
  const initialTime: Date = time;
  time.setSeconds(time.getSeconds() + 45 * quizData.defaultValues.length);

  const form = useForm<z.infer<typeof zodMCQSchema>>({
    resolver: zodResolver(zodMCQSchema),
    defaultValues: saveData! ? saveData : quizData,
  });
  const submitRef = useRef(form);
  const { control, handleSubmit, formState } = { ...form };
  const { fields } = useFieldArray({
    control,
    name: "defaultValues",
  });

  //download button
  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input!, { scrollY: -window.scrollY }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 1.0); // Change format to JPEG for better compression
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height); // Use JPEG format
      pdf.save(`${quizId}.pdf`); // Pass compression options
    });
  };

  const pdfRef = useRef<HTMLFormElement | null>(null);

  const handleSubmitQuiz = async (data: any) => {
    if (data.defaultValues) {
      let score = 0;
      data.defaultValues.forEach((question: any) => {
        if (question.correct_answer === question.userAnswer) {
          score += 10;
        }
      });
      score = (score * 10) / data.defaultValues.length;
      setMark(score);
      setUserData(data);
      handleFormUpload(data, quizId, score);
      setSubmitted(true);
    }
  };

  return (
    <>
      <div className=" top-14 fixed w-full rounded-full text-center bg-white dark:bg-slate-950 py-1 flex flex-auto items-center justify-evenly gap-x-5">
        {!saveData && (
          <Timer
            form={form}
            expiryTimestamp={time}
            handleSubmitQuiz={handleSubmitQuiz}
          />
        )}

        {(formState.isSubmitted || saveData) && (
          <>
            <h2 className="text-xl md:font-xl font-bold">Score: {mark}</h2>
            <div className="flex gap-x-2 items-end">
              {" "}
              <Button
                onClick={() => {
                  handleShare(quizId);
                }}
              >
                Share
              </Button>
              <Button onClick={downloadPDF}>Download</Button>
            </div>
          </>
        )}
      </div>

      {submitted && <Chat quizData={userData!} />}
      <form
        onSubmit={handleSubmit(handleSubmitQuiz)}
        className="pb-5"
        ref={pdfRef}
      >
        {fields.map((field, index) => (
          <div
            className="flex flex-auto flex-col md:mx-16 mx-5 my-1 px-5 dark:bg-slate-950"
            key={field.id}
          >
            <ShadCNMCQComponent
              field={field as any}
              index={index as number}
              form={form}
              save={saveData ? true : false}
            />
          </div>
        ))}
        {!form.formState.isSubmitted && !saveData && (
          <div className="flex justify-center gap-x-10">
            <Button type="submit" disabled={formState.isSubmitted}>
              Submit
            </Button>
            <Button type="reset" disabled={formState.isSubmitted}>
              Clear All
            </Button>
            {/* <Button disabled={!formState.isSubmitted} onClick={() => window.print()}> */}
          </div>
        )}
      </form>
    </>
  );
}

export function ShadCNMCQComponent({
  field,
  index,
  form,
  save,
}: {
  field: fieldType;
  index: number;
  form: ReturnType<typeof useForm<z.infer<typeof zodMCQSchema>>>;
  save: boolean;
}) {
  const { formState, register } = form;
  const [answers, setAnswers] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState<string>(field.userAnswer);

  useEffect(() => {
    setAnswers(
      [field.correct_answer, ...field.incorrect_answers].sort(
        () => Math.random() - 0.5
      )
    );
  }, [field.correct_answer, field.incorrect_answers]);

  return (
    <div key={field.id} className="my-5">
      <Label key={`defaultValues.${index}.id`}>{field.question}</Label>
      <div
        key={`${field.id}.answers`}
        className="flex flex-col items-center justify-center mt-2"
      >
        {answers.map((answer, answerIndex) => (
          <div
            key={`answer-${answerIndex}`}
            className={`border-2 border-black dark:border-gray-600 gap-y-2  w-full flex items-center p-3 my-2 rounded-lg  ${
              (formState.isSubmitted || save) && userAnswer == answer
                ? userAnswer === field.correct_answer
                  ? "bg-green-500 bg-opacity-70"
                  : `bg-red-500 bg-opacity-70`
                : userAnswer === answer
                ? "bg-slate-200 dark:bg-slate-700 "
                : ""
            } ${
              (formState.isSubmitted || save) && answer === field.correct_answer
                ? "bg-green-500 bg-opacity-70"
                : ""
            } `}
          >
            <input
              className="w-4 h-4 mr-4 absolute opacity-0 cursor-pointer"
              type="radio"
              id={`defaultValues.${index}.answer-${answerIndex}`}
              {...register(`defaultValues.${index}.userAnswer`)}
              disabled={formState.isSubmitted || save}
              onChange={() => setUserAnswer(answer)}
              value={answer}
            />
            <Label
              htmlFor={`defaultValues.${index}.answer-${answerIndex}`}
              className={`w-full hover:cursor-pointer text-justify`}
            >
              <span>{answer}</span>
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Timer(props: {
  expiryTimestamp: Date;
  form: ReturnType<typeof useForm<z.infer<typeof zodMCQSchema>>>;
  handleSubmitQuiz: (userData: quizData) => Promise<void>;
}) {
  const { form, expiryTimestamp, handleSubmitQuiz } = props;
  const { formState, handleSubmit } = form;

  const handleError = (error: any) => {
    console.log("error");
    console.log(error);
  };

  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      console.log("onExpire");
      handleSubmit(handleSubmitQuiz, handleError)();
    },
  });

  if (formState.isSubmitted) {
    return;
  }
  return (
    <div className="text-center flex justify-center flex-col items-center">
      <span>
        {days !== 0 && `${days} ${days === 1 ? "Day" : "Days"}`}
        {hours !== 0 && ` ${hours} ${hours === 1 ? "Hour" : "Hours"}`}
        {minutes !== 0 && ` ${minutes} ${minutes === 1 ? "Minute" : "Minutes"}`}
        {seconds !== 0 && ` ${seconds} ${seconds === 1 ? "Second" : "Seconds"}`}
      </span>
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
