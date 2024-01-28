"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import create from "@/lib/actions/addDocumentForm";

export default function AddDocumentForm() {
  return (
    <div className="w-full max-w-md flex flex-col  ">
      <Card className="w-full max-w-md mx-6">
        <CardHeader>
          <CardTitle>Upload Document</CardTitle>
          <CardDescription>Choose a file and give it a name.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" action={create}>
            <div className="space-y-2">
              <Label htmlFor="name">File Name</Label>
              <Input
                id="name"
                name="fileName"
                placeholder="Enter file name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="file">Select File</Label>
              <Input
                id="file"
                type="file"
                accept="application/pdf"
                name="file"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Button type="submit">Add Document</Button>
              <Button variant="outline" type="reset">
                Clear Inputs
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
    </div>
  );
}


