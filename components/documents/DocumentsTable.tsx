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
  const [isSuccess, setIsSuccess] = useState(false);
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
  }, [document.id, supabase]);

  const handleQuiz = async (documentId: string) => {
    router.push(`/documents/${documentId}/quiz`);
  };

  const fetchProcessStatus = async () => {
    const interval = setInterval(async () => {
      if (!isProcessing) {
        clearInterval(interval);
        return;
      }
      try {
        const response = await fetch(
          `/api/documents/preprocess/status?taskId=${taskId}`
        );
        const { data } = await response.json();
        const task_status = data.task_status;
        const task_result = data.task_result;

        setToastMessage(task_result.status);

        if (task_status === "SUCCESS") {
          setIsProcessing(false);
          setIsSuccess(true);
          clearInterval(interval);
        }
      } catch (error: any) {
        toast.error(`Failed to fetch task :${error.message}`);
        clearInterval(interval);
        return;
      }
    }, 1000);
  };

  useEffect(() => {
    if (isProcessing) {
      fetchProcessStatus();
    }
  }, [isProcessing]);

  useEffect(() => {
    if (!isProcessing && !isSuccess) return;

    const rapidQuizPromise = () =>
      new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          if (isSuccess) {
            resolve("Document processed successfully");
            setTimeout(() => {
              toast.dismiss();
              isQuizReady(true);
            }, 2000);
          } else if (!isProcessing) {
            reject();
          }
        }, 1000); // Adjust the timeout duration as needed

        return () => clearTimeout(timeout);
      });

    toast.promise(rapidQuizPromise(), {
      loading: toastMessage,
      success: "Document processed successfully",
      error: "Failed to process the document",
    });
  }, [isProcessing, isSuccess, toastMessage]);

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
          className={`mx-2 my-2 w-28`}
          onClick={() => {
            handleProcess(document.id);
          }}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing" : "Process"}
        </Button>

        <Button
          onClick={() => handleQuiz(document.id)}
          className={`mx-2 my-2 min-w-28 `}
          disabled={!quizReady}
        >
          Quiz
        </Button>
      </TableCell>
    </TableRow>
  );
}
