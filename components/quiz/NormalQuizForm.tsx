"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import React, { Dispatch, SetStateAction } from "react";
const normalFormZodSchema = z.object({
  documentId: z.string().readonly(),
  numOfQuestions: z
    .number()
    .int({ message: "Number of questions must be an integer" })
    .min(3, { message: "Number of questions must be at least 3" })
    .max(20, { message: "Number of questions must be at most 20" }),
  remarks: z.string().min(5, {
    message:
      "Remarks must be at least 5 characters, Enter something related to the document",
  }),
  defaultModel: z.string(),
});

export default function NormalForm({
  form,
  setTaskId,
  setIsGenerating,
  setQuizId,
  isGenerating,
  toast,
}: {
  form: ReturnType<typeof useForm<z.infer<typeof normalFormZodSchema>>>;
  setTaskId: Dispatch<SetStateAction<string>>;
  setIsGenerating: Dispatch<SetStateAction<boolean>>;
  setQuizId: Dispatch<SetStateAction<string>>;
  isGenerating: boolean;
  toast: any;
}) {
  const { register, handleSubmit, control } = form;
  const handleNormalSubmission = async (
    formData: z.infer<typeof normalFormZodSchema>
  ) => {
    const { documentId, numOfQuestions, remarks, defaultModel } = formData;
    try {
      const request = await fetch("/api/documents/quiz", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          documentId,
          numOfQuestions,
          remarks,
          defaultModel,
        }),
      });
      const response = await request.json();
      const taskId = response.taskId;
      const quizId = response.quizId;
      setTaskId(taskId);
      setIsGenerating(true);
      setQuizId(quizId);
    } catch (error: any) {
      toast("Error getting documents " + error.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleNormalSubmission)}
      className="space-y-4 items-center flex flex-auto flex-col"
    >
      <div>
        <label htmlFor="documentId">Document ID</label>
        <input
          {...register("documentId")}
          id="documentId"
          type="text"
          readOnly
          value={form.getValues("documentId")}
          className="rounded-lg p-2 border-gray-600 bg-inherit border"
          disabled
        />
        <small>This is your document ID</small>
      </div>

      <div>
        <label htmlFor="numOfQuestions">Number of Questions</label>
        <input
          {...register("numOfQuestions", { valueAsNumber: true })}
          id="numOfQuestions"
          type="number"
          min={3}
          max={20}
          placeholder={"3"}
          className="rounded-lg p-2 border-gray-600 bg-inherit border w-full"
          disabled={isGenerating}
        />
        <small>
          This is the number of questions you want. Enter a value between 3 and
          20
        </small>
      </div>

      <div>
        <label htmlFor="remarks">Remarks</label>
        <input
          {...register("remarks")}
          id="remarks"
          type="text"
          placeholder="Enter remarks about the doc"
          className=" rounded-lg p-2 border-gray-600 bg-inherit border"
          disabled={isGenerating}
        />
        {form.formState.errors.remarks && (
          <small className="text-red-500">
            {form.formState.errors.remarks.message}
          </small>
        )}
      </div>
      <div>
        <label htmlFor="defaultModel">Model</label>
        <select
          {...register("defaultModel")}
          id="defaultModel"
          className=" w-full py-2 px-3 border border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
          disabled={isGenerating}
        >
          <option value="default" className="bg-inherit">
            QuizzifyMe Model
          </option>
          <option value="openai" className="bg-inherit">
            Mixtral
          </option>
        </select>

        <small>
          Select a Model. Quizzify is the model made by us, Mixtral is a SOTA
          Model
        </small>
      </div>
      <button
        type="submit"
        disabled={isGenerating}
        className="px-6 py-2 text-base font-medium text-white bg-black border border-transparent rounded-lg shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white disabled:bg-gray-400 disabled:cursor-not-allowed dark:text-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-500"
      >
        Generate
      </button>
    </form>
  );
}
