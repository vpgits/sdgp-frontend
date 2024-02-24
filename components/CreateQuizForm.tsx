"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "sonner";

import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CreateQuizForm() {
  const router = useRouter();
  const [documentId, setDocumentId] = useState("");
  const [toastMessage, setToastMessage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRapidGenerating, setIsRapidGenerating] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [quizId, setQuizId] = useState("");

  const handleSubmission = async (formData: FormData) => {
    const documentId = formData.get("documentId");
    const numOfQuestions = formData.get("numOfQuestions");
    const remarks = formData.get("remarks");
    try {
      const request = await fetch("/api/documents/quiz", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ documentId, numOfQuestions, remarks }),
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

  const handleRapidSubmission = async (formData: FormData) => {
    const documentId = formData.get("documentId");
    try {
      const request = await fetch("/api/documents/rapid-quiz", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ documentId }),
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

  useEffect(() => {
    if (!isRapidGenerating) return;
    const interval = setInterval(async () => {
      try {
        const response = await fetch(
          `/api/documents/rapid-quiz/status?taskId=${taskId}`
        );
        const { data } = await response.json();
        const task_status = data.task_status;
        const task_result = data.task_result;
        console.log(task_result);
        console.log(task_result.status);
        if (task_result.status !== toastMessage) {
          setToastMessage(task_result.status);
          toast(task_result.status);
        }
        if (task_status === "SUCCESS") {
          toast.success("Quiz generated successfully");
          setIsRapidGenerating(false);
          new Promise((resolve) => setTimeout(resolve, 1000));
          router.push(`/quiz/${quizId}`);
        }
      } catch (error: any) {
        toast.error("Failed to fetch task status:", error);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [taskId, toastMessage, quizId, isRapidGenerating, router]);

  useEffect(() => {
    if (!isGenerating) return;
    const interval = setInterval(async () => {
      try {
        const response = await fetch(
          `/api/documents/quiz/status?taskId=${taskId}`
        );
        const { data } = await response.json();
        const task_status = data.task_status;
        const task_result = data.task_result;
        if (task_result.status !== toastMessage) {
          setToastMessage(task_result.status);
          toast(task_result.status);
        }
        if (task_status === "SUCCESS") {
          setIsGenerating(false);
          new Promise((resolve) => setTimeout(resolve, 1000));
          router.push(`/quiz/${quizId}`);
        }
      } catch (error: any) {
        toast.error("Failed to fetch task status:", error);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [taskId, toastMessage, quizId, isGenerating, router]);

  useEffect(() => {
    const documentId = window.location.pathname.split("/")[2];
    if (!documentId) {
      router.push("/documents");
    }
    setDocumentId(documentId);
  }, [router]);

  return (
    <>
      <div
        className={`w-full h-full flex flex-auto items-center justify-center ${
          isGenerating || isRapidGenerating ? "hover:cursor-none" : ""
        }`}
      >
        <Toaster />
        <Tabs defaultValue="normal" className="w-[400px] h-[500px]">
          <TabsList
            className="grid  grid-cols-2 mx-5"
            aria-disabled={isGenerating || isRapidGenerating}
          >
            <TabsTrigger value="normal">Normal</TabsTrigger>
            <TabsTrigger value="rapid">Rapid</TabsTrigger>
          </TabsList>
          <TabsContent value="normal">
            <Card className=" max-w-md mx-5 ">
              <CardHeader>
                <CardTitle>Create Quiz</CardTitle>
                <CardDescription>
                  Enter the number of questions{" "}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" action={handleSubmission}>
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
                    <Label htmlFor="name">Number of questions</Label>
                    <Input
                      id="numOfQuestions"
                      name="numOfQuestions"
                      placeholder="5"
                      type="number"
                      min="3"
                      max="5"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="file">Remarks</Label>
                    <Input
                      id="remarks"
                      type="text"
                      name="remarks"
                      placeholder="Enter remarks here"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button type="submit" disabled={isGenerating}>
                      Generate
                    </Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Link href={"/documents"}>
                  <Button className="w-full" variant="outline">
                    Go Back
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="rapid">
            <Card className="max-w-md h-[448px] mx-5 flex flex-auto flex-col items-center justify-center">
              <CardHeader>
                <CardTitle>Create Quiz</CardTitle>
                <CardDescription>
                  This is a rapid quiz, you&apos;ll get a random number of
                  questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" action={handleRapidSubmission}>
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
                  <div className="flex flex-col gap-2">
                    <Button type="submit" disabled={isRapidGenerating}>
                      Generate
                    </Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
