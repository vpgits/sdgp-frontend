/**
 * v0 by Vercel.
 * @see https://v0.dev/t/FRcfYcsseEk
 */
import { Button } from "@/components/ui/button";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { getDocuments } from "@/lib/documents/action";
import { Suspense } from "react";
import Link from "next/link";

type Document = {
  title: string;
  inserted_at: string;
};

// export const revalidate = 0;

export default async function DocumentsTable() {
  const documentsData = await getDocuments();
  const data = await Promise.all([documentsData][0]);
  console.log(data);
  return (
    <>
      <div className="w-full p-8">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">My Documents</h1>
          <Link href="/documents/upload">
            <Button>Upload</Button>
          </Link>
        </header>
        <div className="border shadow-sm rounded-lg">
          <Table>
            <TableHeader>
              <TableRow className=" ">
                <TableHead>File Name</TableHead>
                <TableHead>File Size</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((document: Document) => (
                <TableRow key={document.title} className=" ">
                  <TableCell className="font-medium ">
                    {document.title}
                  </TableCell>
                  <TableCell className="">1.2 MB</TableCell>
                  <TableCell className="">
                    {new Date(document.inserted_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="hidden xl:flex max-w-36 ">
                    <Button className="mx-2 my-2 ">Download</Button>
                    <Button className="mx-2 my-2">Delete</Button>
                    <Button className="mx-2 my-2 ">PreProcess</Button>
                    <Button className="mx-2 my-2 ">Generate</Button>
                  </TableCell>
                  <TableCell>
                    <Button className="block xl:hidden">
                      <Popover>
                        <PopoverTrigger className="">Action</PopoverTrigger>
                        <PopoverContent className="flex flex-col w-32 justify-center">
                          <Button className=" my-2 ">Download</Button>
                          <Button className=" my-2">Delete</Button>
                          <Button className=" my-2 ">PreProcess</Button>
                          <Button className=" my-2 ">Generate</Button>
                        </PopoverContent>
                      </Popover>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
