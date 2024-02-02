"use client";
import React, { useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Toaster, toast } from "sonner";
import { Button } from "../ui/button";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

type Document = {
  id: string;
  title: string;
  inserted_at: string;
};

type Props = {
  documentData: Document[];
};

export default function DocumentsTable({ documentData }: Props) {
  const router = useRouter();
  const documentIdRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleProcess = async (documentId: string) => {
    setIsProcessing(true);
    try {
      const preprocessUrl = new URL(
        `api/documents/preprocess`,
        window.location.origin
      );
      preprocessUrl.search = new URLSearchParams({ documentId }).toString();
      const response = await fetch(preprocessUrl.toString());
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      let taskId = data.taskId;
      let taskStatus = "PENDING";

      while (taskStatus !== "SUCCESS" && taskStatus !== "FAILURE") {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const statusUrl = new URL(
          `api/documents/preprocess/status`,
          window.location.origin
        );
        statusUrl.search = new URLSearchParams({ taskId }).toString();

        const taskResponse = await fetch(statusUrl.toString());
        if (!taskResponse.ok) {
          throw new Error(`HTTP error! status: ${taskResponse.status}`);
        }
        const taskData = await taskResponse.json();
        taskStatus = taskData.status;
        toast(taskStatus);
      }
    } catch (error: any) {
      toast(error.message, {
        action: {
          label: "Retry",
          onClick: () => handleProcess(documentId),
        },
      });
      throw new Error(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleQuiz = async (documentId: string) => {
    let quizId;
    try {
      const quizUrl = new URL(`api/documents/quiz`, window.location.origin);
      quizUrl.search = new URLSearchParams({ documentId }).toString();

      const response = await fetch(quizUrl.toString());
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      quizId = data.quizId;
    } catch (error: any) {
      throw new Error(error.message);
    }
    router.push(`/quiz/${quizId}`);
  };
  const data = documentData;
  return (
    <>
      <Toaster expand={true} />
      <Table className="">
        <TableHeader>
          <TableRow className="items-center justify-center">
            <TableHead>File Name</TableHead>
            <TableHead className="hidden lg:table-cell">File Size</TableHead>
            <TableHead className="hidden lg:table-cell">Upload Date</TableHead>
            <TableHead className="mx-20">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((document: Document) => (
            <TableRow key={document.id} className="">
              <TableCell className="">{document.title}</TableCell>
              <TableCell className="hidden lg:table-cell">1.2 MB</TableCell>
              <TableCell className="hidden lg:table-cell">
                {new Date(document.inserted_at).toLocaleDateString()}
              </TableCell>

              <TableCell className="lg: max-w-36 xs:flex flex-col">
                {/* Other buttons */}
                <Button
                  className={`mx-2 my-2 min-w-32`}
                  onClick={() =>
                    toast.promise(handleProcess(document.id), {
                      loading: "Loading...",
                      success: (data) => `${data} toast has been added`,
                      error: "Error",
                    })
                  }
                >
                  {isProcessing ? "Processing..." : "Process"}
                </Button>
                <Link href={`/documents/${document.id}/generate`}>
                  <Button className={`mx-2 my-2 min-w-32 `}>
                    {isGenerating ? "Generating..." : "Generate"}
                  </Button>{" "}
                </Link>
                <Button
                  onClick={() => handleQuiz(document.id)}
                  className={`mx-2 my-2 min-w-32 `}
                >
                  Quiz
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
