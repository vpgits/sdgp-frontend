"use client";
import React, { useState } from "react";
import { Message, useChat } from "ai/react";
import { IoChatbubbleEllipsesOutline, IoTrashOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useFieldArray, useForm } from "react-hook-form";
import Markdown from "react-markdown";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";

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

const SystemPrompt =
  "You are quizzifyMe. A personal study companion who will help with content related to study material. Refrain from outputting anything non academic. Render all responses in markdown";

export default function Chat(props: { quizData: quizData }) {
  const { quizData } = props || {};
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    reload,
    append,
  } = useChat({});
  const [chatting, setChatting] = useState(false);
  // ...messages.filter((m) => m.role !== "system"),
  const handleInitialChat = (index: number) => {
    setMessages([
      {
        role: "system",
        content: SystemPrompt,
        id: "systemPrompt",
      },
      {
        role: "system",
        content: `User needs help with a MCQ question. The question is ${
          quizData.defaultValues[index].question
        }. ${
          quizData.defaultValues[index].userAnswer === ""
            ? "User hasn't answered the question"
            : `User has given ${quizData.defaultValues[index].userAnswer} as the answer`
        }
        The correct answer is ${
          quizData.defaultValues[index].correct_answer
        } and the incorrect answers are ${quizData.defaultValues[
          index
        ].incorrect_answers.join()}`,
        id: "question",
      },
    ]);
  };
  return (
    <>
      <Drawer>
        <DrawerTrigger className="rounded-full border dark:bg-white bg-slate-900 text-black dark:text-white h-14 w-14 fixed bottom-0 right-0 m-4 z-10 flex justify-center items-center transition-all duration-300">
          <IoChatbubbleEllipsesOutline
            onClick={() => {
              setChatting(true);
            }}
            className="h-10 w-10 ease-in-out transition-all duration-300 dark:text-black text-white"
          />
        </DrawerTrigger>
        <DrawerContent className="text-small md:text-base bottom-4  dark:bg-slate-900 bg-slate-200 rounded-lg h-5/6 m-5 top-10">
          <DrawerHeader className="max-h-72 ">
            <Questions
              quizData={quizData}
              handleInitialChat={handleInitialChat}
              handleClearChat={setMessages}
            />
          </DrawerHeader>
          <div className="overflow-y-scroll m-2">
            {messages
              .filter((message) => {
                return message.role !== "system";
              })
              .map((m) => (
                <ChatBubble key={m.id} message={m.content} role={m.role} />
              ))}
          </div>
          <DrawerFooter className="gap-y-5 p-2">
            <form onSubmit={handleSubmit}>
              <div className="w-full flex flex-auto justify-between gap-2">
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Say something..."
                  className="w-full p-2 border-2 border-black dark:border-white rounded-lg dark:bg-slate-600 bg-slate-300"
                />
                <button
                  className=" min-w-16 border-2 border-black dark:border-white rounded-lg dark:bg-slate-600 bg-slate-300"
                  type="submit"
                >
                  Send
                </button>
              </div>
            </form>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export function ChatBubble(props: { message: string; role: string }) {
  const isUser = props.role === "user";

  return (
    <div
      className={`border p-4 m-4 flex flex-auto flex-col ${
        isUser ? "items-end" : "items-start"
      }`}
    >
      <span
        className={`font-bold ${isUser ? "text-blue-600" : "text-green-600"}`}
      >
        {isUser ? "User: " : "Quizzifyme: "}
      </span>
      <Markdown className={`mt-2 dark:text-white text-black  `}>
        {props.message}
      </Markdown>
    </div>
  );
}

export function QuestionBanner(props: { question: string; key: number }) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
  };

  return (
    <div
      onClick={handleClick}
      className={`border ${selected ? "border-red-500" : ""} max-w-md p-4 m-4`}
    >
      {props.question}
    </div>
  );
}

export function Questions(props: {
  quizData: quizData;
  handleInitialChat: (index: number) => void;
  handleClearChat: (messages: Message[]) => void;
}) {
  const { quizData, handleInitialChat } = props || {};
  const { control, register, handleSubmit, reset, formState } = useForm({
    defaultValues: { ...quizData },
  });
  const { fields } = useFieldArray({
    control,
    name: "defaultValues",
  });
  const handleClick = (index: number) => {
    reset({
      defaultValues: fields.filter((field, i) => i === index),
    });
    handleInitialChat(index);
    handleSubmit(() => {});
  };
  return (
    <>
      <DrawerTitle className="flex flex-auto justify-between m-2">
        <h1 className="text-2xl">Chat with QuizzifyMe</h1>
        <Button
          onClick={() => {
            reset({ defaultValues: quizData.defaultValues });
            props.handleClearChat([]);
          }}
        >
          {" "}
          + New Chat
        </Button>
      </DrawerTitle>
      <form className="max-h-96 overflow-y-auto">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border-2 border-black dark:border-gray-600 gap-y-2  w-full flex items-center p-3 my-2 rounded-lg"
          >
            <input
              {...register(`defaultValues.${index}.question`)}
              id={`defaultValues.${index}.question`}
              defaultValue={quizData.defaultValues[index].question}
              type="radio"
              className="absolute opacity-0 cursor-pointer w-5 h-5"
              onClick={() => {
                if (formState.isSubmitted) {
                  return;
                }
                handleClick(index);
              }}
            />
            <label
              htmlFor={`defaultValues.${index}.question`}
              className="w-full hover:cursor-pointer text-justify"
            >
              <span>{field.question}</span>
            </label>
          </div>
        ))}
      </form>
    </>
  );
}
