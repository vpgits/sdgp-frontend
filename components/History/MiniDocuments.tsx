import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { IoDocumentTextOutline } from "react-icons/io5";

export default async function MiniDocument() {
  const cookieStore = cookies();
  const supabase = createClient<Database>(cookieStore);

  {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      redirect("/login");
    }
  }

  let { data: documents, error } = await supabase
    .from("documents")
    .select("id, summary, inserted_at, title")
    .order("inserted_at", { ascending: false });
  return (
    // <div>
    //   <h1>My Documents</h1>
    //   {documents?.map((d, index) => (
    //     <pre key={index}>{JSON.stringify(d, null, 2)}</pre>
    //   ))}
    // </div>
    <Card className=" h-[600px]">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <Link href={"/documents"}></Link>
      </CardHeader>
      <p className="text-sm text-muted-foreground px-5">
        View recently uploaded documents
      </p>
      <CardContent className="overflow-y-scroll h-5/6 scrollbar-hide scrollbar-hide::-webkit-scrollbar  ">
        {documents?.map((d: any, index) => (
          <Card className="my-5 flex flex-row items-center" key={index}>
            <div className="ml-4">
              <IoDocumentTextOutline className="text-4xl" />
            </div>
            <div className="flex flex-col items-start">
              <Link href={`/documents/${d.id}`}>
                <CardHeader>{d.summary?.title || d.title}</CardHeader>
              </Link>
              <CardContent className="font-mono text-xs text-start">
                <p>{new Date(d.inserted_at).toDateString()}</p>
                <p>{new Date(d.inserted_at).toTimeString()}</p>
              </CardContent>
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
