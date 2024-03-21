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
import { createClient } from "@/utils/supabase/client";
import { Database, Tables } from "@/types/supabase";

const supabase = createClient<Database>();

export default function DeleteDocumentsTable() {
  const [documentData, setDocumentData] = useState<Tables<"documents">[]>(); // Provide the required type arguments

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .order("inserted_at", { ascending: false });
    if (error) {
      console.log(error);
    }
    if (data) {
      setDocumentData(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Toaster />
      <Table className="-z-50">
        <TableHeader>
          <TableRow className="items-center justify-center">
            <TableHead>File Name</TableHead>
            <TableHead className="hidden lg:table-cell">File Type</TableHead>
            <TableHead className="hidden lg:table-cell">Upload Date</TableHead>
            <TableHead className="mx-20">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documentData &&
            documentData.map((document, index) => (
              <CustomTableRow document={document} key={index} />
            ))}
        </TableBody>
      </Table>
    </>
  );
}

export function CustomTableRow(props: { document: Tables<"documents"> }) {
  const { document } = props;
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [userId, setUserId] = useState<String>();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log(error);
      }
      if (data) {
        setUserId(data.user?.id);
      }
    };
    fetchUser();
  }, []);

  const handledelete = async () => {
    // console.log(document.id);
    setIsProcessing(true);
    const { data, error } = await supabase.storage
      .from("documents")
      .remove([`${userId}/${document.id}`]);
    if (error) {
      console.log(error);
      setIsProcessing(false);
    } else {
      const { data, error } = await supabase
        .from("documents")
        .delete()
        .eq("id", document.id);
      if (error) {
        setIsProcessing(false);
        console.log(error);
      }
    }

    window.location.reload();
    // const { data, error } = await supabase
    //   .from("documents")
    //   .delete()
    //   .eq("id", "document.id");

    // if (error) {
    //   console.log(error);
    // }
    // if (data) {
    //   console.log(data);
    // }
  };

  return (
    <TableRow key={document.id} className=" -z-10">
      <TableCell className="">{document.title}</TableCell>
      <TableCell className="hidden lg:table-cell">
        {document.file_type}
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        {new Date(document.inserted_at).toLocaleDateString()}
      </TableCell>

      <TableCell className="lg: max-w-36 xs:flex flex-col">
        <Button
          onClick={() => handledelete()}
          className={`mx-2 my-2 min-w-24 `}
        >
          {isProcessing ? "Deleting" : "Delete"}
        </Button>
      </TableCell>
    </TableRow>
  );
}
