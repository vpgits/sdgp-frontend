/**
 * v0 by Vercel.
 * @see https://v0.dev/t/JWqPM32ZeTV
 */
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { SubmitButton } from "./AlertDemo";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { create } from "@/lib/actions/addDocumentForm";

export default async function Component() {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

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
              <SubmitButton />
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