"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import React, { Dispatch, SetStateAction } from "react";

const rapidFormZodSchema = z.object({
  documentId: z.string().readonly(),
  defaultModel: z.string(),
});

export default function RapidQuizForm({
  form,
  setTaskId,
  setIsRapidGenerating,
  setQuizId,
  isGenerating,
  toast,
}: {
  form: ReturnType<typeof useForm<z.infer<typeof rapidFormZodSchema>>>;
  setTaskId: Dispatch<SetStateAction<string>>;
  setIsRapidGenerating: Dispatch<SetStateAction<boolean>>;
  setQuizId: Dispatch<SetStateAction<string>>;
  isGenerating: boolean;
  toast: any;
}) {
  const { register, handleSubmit, control } = form;
  const handleRapidSubmission = async (
    formData: z.infer<typeof rapidFormZodSchema>
  ) => {
    const { documentId, defaultModel } = formData;
    try {
      const request = await fetch("/api/documents/rapid-quiz", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ documentId, defaultModel }),
      });
      const response = await request.json();
      const taskId = response.taskId;
      const quizId = response.quizId;
      setTaskId(taskId);
      setIsRapidGenerating(true);
      setQuizId(quizId);
    } catch (error: any) {
      toast("Error getting documents " + error.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleRapidSubmission)}
      className="space-y-4  items-center flex flex-auto flex-col"
    >
      <div>
        <label htmlFor="documentId">Document ID</label>
        <input
          {...register("documentId")}
          id="documentId"
          type="text"
          readOnly
          value={form.getValues("documentId")}
          className="rounded-lg p-2 border-gray-600 bg-inherit border w-full"
          disabled
        />
        <small>This is your document ID</small>
      </div>
      <div>
        <label htmlFor="defaultModel">Model</label>
        <select
          {...register("defaultModel")}
          id="defaultModel"
          className=" w-full py-2 px-3 border border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
          disabled={isGenerating}
        >
          <option value="default" className="bg-inherit w-full">
            QuizzifyMe Model
          </option>
          <option value="openai" className="bg-inherit w-full">
            Mixtral
          </option>
        </select>
        <p>
          Select a Model. Quizzify is the model made by us, Mixtral is a SOTA
          Model
        </p>
      </div>
      <button
        type="submit"
        disabled={isGenerating}
        className={`px-6 py-2 text-base font-medium text-white bg-black border border-transparent rounded-lg shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white disabled:bg-gray-400 disabled:cursor-not-allowed dark:text-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-500`}
      >
        Generate
      </button>
    </form>
  );
}
