"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import LLMState from "../LLMState";
import NormalForm from "./NormalQuizForm";
import RapidQuizForm from "./RapidQuizForm";

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

const rapidFormZodSchema = z.object({
  documentId: z.string().readonly(),
  defaultModel: z.string(),
});

export default function CreateQuizForm() {
  const supabase = createClient<Database>();
  const router = useRouter();
  const [documentId, setDocumentId] = useState("");
  const [toastMessage, setToastMessage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRapidGenerating, setIsRapidGenerating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [quizId, setQuizId] = useState("");

  let normalForm: UseFormReturn<z.infer<typeof normalFormZodSchema>>;
  let rapidForm: UseFormReturn<z.infer<typeof rapidFormZodSchema>>;

  normalForm = useForm<z.infer<typeof normalFormZodSchema>>({
    // resolver: zodResolver(normalFormZodSchema),
    defaultValues: {
      documentId: documentId!,
      numOfQuestions: 3,
      remarks: "",
      defaultModel: "default",
    },
  });
  rapidForm = useForm<z.infer<typeof rapidFormZodSchema>>({
    resolver: zodResolver(rapidFormZodSchema),
    defaultValues: {
      documentId: documentId!,
      defaultModel: "default",
    },
  });

  useEffect(() => {
    const documentId = window.location.pathname.split("/")[2];
    if (!documentId) {
      router.push("/documents");
    }
    const doesDocumentExist = async () => {
      const { data, error } = await supabase
        .from("documents")
        .select("id")
        .eq("id", documentId);
      if (error) {
        router.push("/documents");
      }
      if (data!.length === 0 || data === null) {
        router.push("/documents");
      }
    };
    setDocumentId(documentId);
    normalForm.reset({ ...normalForm.getValues(), documentId: documentId });
    rapidForm.reset({ ...rapidForm.getValues(), documentId: documentId });
    doesDocumentExist();
  }, [documentId, normalForm, rapidForm, router, supabase]);

  // useEffect(() => {
  //   if (!isRapidGenerating) return;
  //   const interval = setInterval(async () => {
  //     try {
  //       const response = await fetch(
  //         `/api/documents/rapid-quiz/status?taskId=${taskId}`
  //       );
  //       const { data } = await response.json();
  //       const task_status = data.task_status;
  //       const task_result = data.task_result;
  //       console.log(task_result);
  //       console.log(task_result.status);
  //       if (task_result.status !== toastMessage) {
  //         setToastMessage(task_result.status);
  //         toast(task_result.status);
  //       }
  //       if (task_status === "SUCCESS") {
  //         toast.success("Quiz generated successfully");
  //         setIsRapidGenerating(false);
  //         new Promise((resolve) => setTimeout(resolve, 1000));
  //         router.push(`/quiz/${quizId}`);
  //       }
  //     } catch (error: any) {
  //       toast.error("Failed to fetch task status:", error);
  //     }
  //   }, 2000);

  //   return () => clearInterval(interval);
  // }, [taskId, toastMessage, quizId, isRapidGenerating, router]);

  // const fetchRapidTaskStatus = () => {
  //   const interval = setInterval(async () => {
  //     if (!isRapidGenerating) return;
  //     try {
  //       const response = await fetch(
  //         `/api/documents/rapid-quiz/status?taskId=${taskId}`
  //       );
  //       const { data } = await response.json();
  //       const task_status = data.task_status;
  //       const task_result = data.task_result;

  //       setToastMessage(task_result.status);
  //       console.log(task_result.status);
  //       if (task_status === "SUCCESS") {
  //         setIsRapidGenerating(false);
  //         setIsSuccess(true);
  //         // router.push(`/quiz/${quizId}`);
  //       }
  //     } catch (error: any) {
  //       console.log(error);
  //       toast.error("Failed to fetch task status:", error);
  //     }
  //   }, 2000);
  //   return () => clearInterval(interval);
  // };

  // const rapidQuizPromise = () => {
  //   return new Promise((resolve, reject) => {
  //     if (isRapidGenerating) {
  //       const interval = setTimeout(() => {
  //         if (isSuccess) {
  //           resolve("Quiz Generated Successfully");
  //           clearInterval(interval);
  //         }
  //       }, 1000);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   if (!isRapidGenerating) return;
  //   console.log("Inside the useEffect for fetchRapidTaskStatus");
  //   fetchRapidTaskStatus();
  // }, [isRapidGenerating]);

  // useEffect(() => {
  //   if (!isRapidGenerating) {
  //     return;
  //   }
  //   toast.promise(rapidQuizPromise(), {
  //     loading: toastMessage,
  //     success: "Quiz generated successfully",
  //     error: "Failed to generate quiz",
  //   });
  // }, [isRapidGenerating]);

  const fetchRapidTaskStatus = () => {
    const interval = setInterval(async () => {
      if (!isRapidGenerating) {
        clearInterval(interval);
        return;
      }
      try {
        const response = await fetch(
          `/api/documents/rapid-quiz/status?taskId=${taskId}`
        );
        const { data } = await response.json();
        const task_status = data.task_status;
        const task_result = data.task_result;

        setToastMessage(task_result.status);
        if (task_status === "SUCCESS") {
          setIsRapidGenerating(false);
          setIsSuccess(true);
          clearInterval(interval); // Clear the interval after a successful task
        }
      } catch (error: any) {
        console.log(error);
        toast.error("Failed to fetch task status:", error);
      }
    }, 2000);
  };

  useEffect(() => {
    if (isRapidGenerating) {
      fetchRapidTaskStatus();
    }
  }, [isRapidGenerating]);

  useEffect(() => {
    if (!isRapidGenerating && !isSuccess) return;

    const rapidQuizPromise = () =>
      new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          if (isSuccess) {
            resolve("Quiz Generated Successfully");
          } else if (!isRapidGenerating) {
            reject("Failed to generate quiz");
          }
        }, 1000); // Adjust the timeout duration as needed

        return () => clearTimeout(timeout);
      });

    toast.promise(rapidQuizPromise(), {
      loading: toastMessage,
      success: "Quiz generated successfully",
      error: "Failed to generate quiz",
    });
  }, [isRapidGenerating, isSuccess, toastMessage]);

  const fetchTaskStatus = () => {
    const interval = setInterval(async () => {
      if (!isGenerating) return;
      try {
        const response = await fetch(
          `/api/documents/quiz/status?taskId=${taskId}`
        );
        const { data } = await response.json();
        const task_status = data.task_status;
        const task_result = data.task_result;

        setToastMessage(task_result.status);
        if (task_status === "SUCCESS") {
          setIsRapidGenerating(false);
          setIsSuccess(true);
        }
      } catch (error: any) {
        console.log(error);
        toast.error("Failed to fetch task status:", error);
      }
    }, 2000);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (isGenerating) {
      fetchTaskStatus();
    }
  }, [isGenerating]);

  useEffect(() => {
    if (isSuccess) {
      const redirectTimeout = setTimeout(() => {
        router.push(`/quiz/${quizId}`);
      }, 1000);

      return () => clearTimeout(redirectTimeout);
    }
  }, [isSuccess, quizId, router]);

  useEffect(() => {
    if (!isGenerating && !isSuccess) {
      return;
    }
    const normalQuizPromise = () =>
      new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          if (isSuccess) {
            resolve("Quiz Generated Successfully");
          } else if (!isGenerating) {
            reject("Failed to generate quiz");
          }
        }, 1000); // Adjust the timeout duration as needed

        return () => clearTimeout(timeout);
      });
    toast.promise(normalQuizPromise(), {
      loading: toastMessage,
      success: "Quiz generated successfully",
      error: "Failed to generate quiz",
    });
  }, [isGenerating, isSuccess, toastMessage]);

  // useEffect(() => {
  //   if (!isGenerating) return;
  //   const interval = setInterval(async () => {
  //     try {
  //       const response = await fetch(
  //         `/api/documents/quiz/status?taskId=${taskId}`
  //       );
  //       const { data } = await response.json();
  //       const task_status = data.task_status;
  //       const task_result = data.task_result;
  //       if (task_result.status !== toastMessage) {
  //         setToastMessage(task_result.status);
  //         toast(task_result.status);
  //       }
  //       if (task_status === "SUCCESS") {
  //         setIsGenerating(false);
  //         new Promise((resolve) => setTimeout(resolve, 1000));
  //         router.push(`/quiz/${quizId}`);
  //       }
  //     } catch (error: any) {
  //       toast.error("Failed to fetch task status:", error);
  //     }
  //   }, 2000);

  //   return () => clearInterval(interval);
  // }, [taskId, toastMessage, quizId, isGenerating, router]);

  return (
    <>
      <div
        className={` w-full max-h-fit flex flex-auto items-center justify-center flex-col mb-10`}
      >
        <LLMState />
        <Toaster />
        <Tabs
          defaultValue="normal"
          className="w-[350px] flex flex-auto items-center flex-col"
        >
          <TabsList className="flex flex-auto flex-row gap-x-2 mx-5">
            <TabsTrigger
              value="normal"
              disabled={isGenerating || isRapidGenerating}
            >
              Normal
            </TabsTrigger>
            <TabsTrigger
              value="rapid"
              disabled={isGenerating || isRapidGenerating}
            >
              Rapid
            </TabsTrigger>
          </TabsList>
          <TabsContent value="normal">
            {" "}
            {
              <Card className=" max-w-md mx-5   ">
                <CardHeader>
                  <CardTitle>Create Quiz</CardTitle>
                  <CardDescription>
                    Enter the number of questions{" "}
                  </CardDescription>
                </CardHeader>
                <CardContent className="">
                  {documentId && (
                    <NormalForm
                      form={normalForm!}
                      setTaskId={setTaskId}
                      setIsGenerating={setIsGenerating}
                      setQuizId={setQuizId}
                      isGenerating={isGenerating}
                      toast={toast}
                    />
                  )}
                </CardContent>
              </Card>
            }
          </TabsContent>
          <TabsContent value="rapid" className="mb-10">
            <Card className="mx-5 max-w-md flex flex-auto flex-col items-center justify-center py-5">
              <CardHeader>
                <CardTitle>Create Quiz</CardTitle>
                <CardDescription>
                  This is a rapid quiz, you&apos;ll get a random number of
                  questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RapidQuizForm
                  form={rapidForm!}
                  setTaskId={setTaskId}
                  setIsRapidGenerating={setIsRapidGenerating}
                  setQuizId={setQuizId}
                  isRapidGenerating={isRapidGenerating}
                  toast={toast}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

{
  /* <form
className="space-y-4"
action={handleRapidSubmissionAction}
>
<div className="space-y-2">
  <Label htmlFor="documentId">Document ID</Label>
  <Input
    id="documentId"
    name="documentId"
    value={documentId}
    required
    readOnly
    type="text"
  />
</div>
<div className="space-y-2">
  <Label htmlFor="model">Model</Label>
  <Select name="model" required>
    <SelectTrigger>
      <SelectValue placeholder="Select Model" />
    </SelectTrigger>
    <SelectContent position="popper">
      <SelectItem value="default">
        QuizzifyMe Model
      </SelectItem>
      <SelectItem value="openai">Mixtral</SelectItem>
    </SelectContent>
  </Select>
</div>
<div className="flex flex-col gap-2">
  <Button type="submit" disabled={isRapidGenerating}>
    Generate
  </Button>
</div>
</form> */
}
