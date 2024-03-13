"use client";
import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Database } from "@/types/supabase";

type Document = {
  id: string;
  title: string;
  inserted_at: string;
  file_type: string;
};

type Props = {
  documentData: Document[];
};

export default function DocumentsTable({ documentData }: Props) {
  const data = documentData!;
  return (
    <>
      <Toaster />
      <Table className="">
        <TableHeader>
          <TableRow className="items-center justify-center">
            <TableHead>File Name</TableHead>
            <TableHead className="hidden lg:table-cell">File Type</TableHead>
            <TableHead className="hidden lg:table-cell">Upload Date</TableHead>
            <TableHead className="mx-20">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((document: Document, index) => (
            <CustomTableRow document={document} key={index} />
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export function CustomTableRow(props: { document: Document }) {
  const { document } = props;
  const [isProcessing, setIsProcessing] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const router = useRouter();
  const [quizReady, isQuizReady] = useState(false);
  const supabase = createClient<Database>();

  useEffect(() => {
    const handleQuizState = async () => {
      const { data, error } = await supabase
        .from("documents")
        .select("data")
        .eq("id", document.id);

      if (error) {
        throw new Error(error.message);
      }
      if (data[0].data != null) {
        isQuizReady(true);
      }
    };
    handleQuizState();
  }, [document.id]);

  const handleQuiz = async (documentId: string) => {
    let quizId;
    // try {
    //   const quizUrl = new URL(`api/documents/quiz`, window.location.origin);
    //   quizUrl.search = new URLSearchParams({ documentId }).toString();

    //   const response = await fetch(quizUrl.toString());
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }
    //   const data = await response.json();
    //   quizId = data.quizId;
    // } catch (error: any) {
    //   throw new Error(error.message);
    // }
    // router.push(`/quiz/${quizId}`);
    router.push(`/documents/${documentId}/quiz`);
  };
  const handleProcess = async (documentId: string) => {
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
      setTaskId(data.taskId);
      setIsProcessing(true);
      new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error: any) {
      toast(error.message, {
        action: {
          label: "Retry",
          onClick: () => handleProcess(documentId),
        },
      });
      throw new Error(error.message);
    }
  };

  // useEffect(() => {
  //   if (!isProcessing) return;
  //   const interval = setInterval(async () => {
  //     try {
  //       const response = await fetch(
  //         `/api/documents/preprocess/status?taskId=${taskId}`
  //       );
  //       const { data } = await response.json();
  //       const task_status = data.task_status;
  //       const task_result = data.task_result;
  //       if (task_result.status !== toastMessage && task_status !== "SUCCESS") {
  //         setToastMessage(task_result.status);
  //         toast(task_result.status);
  //       }
  //       if (task_status === "SUCCESS" && isProcessing) {
  //         setIsProcessing(false);
  //         toast.success(task_result.message);
  //         clearInterval(interval);
  //         return;
  //       }
  //     } catch (error: any) {
  //       toast.error(`Failed to fetch task :${error.message}`);
  //       clearInterval(interval);
  //       return;
  //     }
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [isProcessing, toastMessage, taskId]);

  const fetchProcessStatus = async () => {
    return new Promise((resolve, reject) => {
      const interval = setInterval(async () => {
        try {
          const response = await fetch(
            `/api/documents/preprocess/status?taskId=${taskId}`
          );
          const { data } = await response.json();
          const task_status = data.task_status;
          const task_result = data.task_result;
          setToastMessage(task_result.status);

          if (task_status === "SUCCESS" && isProcessing) {
            setIsProcessing(false);
            resolve(task_result.message);
          }
        } catch (error: any) {
          toast.error(`Failed to fetch task :${error.message}`);
          reject(error.message);
        }
      }, 1000);
      return () => clearInterval(interval);
    });
  };

  useEffect(() => {
    if (!isProcessing) {
      return;
    }
    toast.promise(fetchProcessStatus(), {
      loading: toastMessage,
      success: "Document processed successfully",
      error: "Failed to process the document",
    });
  });

  return (
    <TableRow key={document.id} className="">
      <TableCell className="">
        {quizReady ? (
          <Link href={`/documents/${document.id}`}>{document.title}</Link>
        ) : (
          document.title
        )}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {document.file_type}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {new Date(document.inserted_at).toLocaleDateString()}
      </TableCell>

      <TableCell className="lg: max-w-36 xs:flex flex-col">
        <Button
          className={`mx-2 my-2 min-w-24`}
          onClick={() => handleProcess(document.id)}
          disabled={isProcessing}
        >
          Process
        </Button>
        <Button
          onClick={() => handleQuiz(document.id)}
          className={`mx-2 my-2 min-w-24 `}
          disabled={!quizReady}
        >
          Quiz
        </Button>
      </TableCell>
    </TableRow>
  );
}
