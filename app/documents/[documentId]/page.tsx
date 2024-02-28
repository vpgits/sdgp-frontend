import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: { documentId: string };
};

export async function generateMetadata({ params }: Props) {
  const cookieStore = cookies();
  const supabase = createClient<Database>(cookieStore);
  const { documentId } = params;
  const { data, error } = await supabase
    .from("documents")
    .select("title, summary, file_type, inserted_at")
    .eq("id", documentId);
  let documentTitle = data?.[0].title;
  const jsonString = JSON.stringify(data![0].summary);
  let summary = JSON.parse(jsonString).summary!;
  return {
    title: `${documentTitle} | Quizzifyme`,
    description: "Document",
  };
}

export default async function page({ params }: Props) {
  const cookieStore = cookies();
  const supabase = createClient<Database>(cookieStore);
  const { documentId } = params;

  let documentData, quizData;
  {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      redirect("/login");
    }
  }
  {
    const { data, error } = await supabase
      .from("documents")
      .select("summary, title, inserted_at, id, file_type")
      .eq("id", documentId);
    if (error) {
      console.log(error);
    }
    documentData = data!;
  }
  {
    const { data, error } = await supabase
      .from("quiz")
      .select("id, summary, inserted_at, updated_at")
      .eq("document_id", documentId);
    if (error) {
      console.log(error);
    }
    quizData = data!;
  }

  revalidatePath("/documents");

  return (
    <div className="flex flex-col m-5">
      <h1>Details</h1>
      {documentData.map((doc, index) => {
        const document: any = JSON.parse(JSON.stringify(doc?.summary));
        return (
          <Card key={index} className="m-5 p-5flex flex-auto justify-center text-justify flex-col">
            <CardTitle>{doc?.title}</CardTitle>
            <CardContent>
              <p>System Title: {document.title}</p>
              <p>Summary:{document.summary}</p>
            </CardContent>
          </Card>
        );
      })}
      <h1>Quiz History</h1>
      <pre>{JSON.stringify(quizData, null, 2)}</pre>
    </div>
  );
}
