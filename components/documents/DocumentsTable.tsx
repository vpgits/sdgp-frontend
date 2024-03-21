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
//import supabase from "@/utils/supabase/client";

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

  //const handledelete = async (documentId: string) => {
   
//const { data,error } = await supabase
//.from('documents')
//.delete()
//.eq('id', 'document.id')
 
//if (error) {
 // console.log(error)
 // }
  //if (data) {
   // console.log(data)
 // }
//};
  
  useEffect(() => {
    if (!isProcessing) return;
    const interval = setInterval(async () => {
      try {
        const response = await fetch(
          `/api/documents/preprocess/status?taskId=${taskId}`
        );
        const { data } = await response.json();
        const task_status = data.task_status;
        const task_result = data.task_result;
        if (task_result.status !== toastMessage && task_status !== "SUCCESS") {
          setToastMessage(task_result.status);
          toast(task_result.status);
        }
        if (task_status === "SUCCESS" && isProcessing) {
          setIsProcessing(false);
          toast.success(task_result.message);
          clearInterval(interval);
          return;
        }
      } catch (error: any) {
        toast.error(`Failed to fetch task :${error.message}`);
        clearInterval(interval);
        return;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isProcessing, toastMessage, taskId]);

  return (
    <TableRow key={document.id} className="">
      <TableCell className="">{document.title}</TableCell>
      <TableCell className="hidden lg:table-cell">
        {document.file_type}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {new Date(document.inserted_at).toLocaleDateString()}
      </TableCell>

      <TableCell className="lg: max-w-36 xs:flex flex-col">
        <Button
          //onClick={() => handledelete(document.id)}
          className={`mx-2 my-2 min-w-24 `}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}
