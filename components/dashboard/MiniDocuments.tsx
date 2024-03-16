import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { IoDocumentTextOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { LuBrainCircuit } from "react-icons/lu";
import html2canvas from "html2canvas";

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
    .order("inserted_at", { ascending: false })
    .range(0, 3);
  return (
    <div className=" min-w-[300px] min-h-[550px] p-2 rounded-lg border dark:border-slate-600 border-slate-400 flex flex-col justify-center flex-auto items-center ">
      <div className="flex flex-row items-center justify-between my-2">
        <Link href={"/documents"}>
          <span className="flex flex-row gap-x-5">
            {" "}
            <Button className="text-2xl  hover:bg-white hover:text-black hover:shadow-lg   dark:hover:bg-black dark:hover:text-white dark:bg-white">
              <LuBrainCircuit className="text-2xl" />
            </Button>
            <h1 className="text-3xl font-semibold">My Documents</h1>
          </span>
        </Link>
      </div>
      <p className="text-sm text-muted-foreground">
        View recently uploaded documents
      </p>
      <div className="max-h-72 overflow-y-auto md:max-h-fit">
        {documents ? (
          documents?.map((d, index) => (
            <>
              <hr />
              <div className="mt-2 flex flex-row items-center" key={index}>
                <div className="mr-4">
                  <IoDocumentTextOutline className="text-3xl" />
                </div>
                <div className="flex flex-col items-start">
                  <Link href={`/documents/${d.id}`}>
                    <div className="hover:underline">
                      {(d.summary as any)?.title || d.title}
                    </div>
                  </Link>
                  <div className="font-mono text-xs text-start">
                    <p>{new Date(d.inserted_at).toDateString()}</p>
                    <p>{new Date(d.inserted_at).toTimeString()}</p>
                  </div>
                </div>
              </div>
            </>
          ))
        ) : (
          <h2>You haven't uploaded any documents yet</h2>
        )}
        <hr />
      </div>
    </div>
  );
}
