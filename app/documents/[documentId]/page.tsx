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
    .select("title")
    .eq("id", documentId);
  let documentTitle = data?.[0]?.title ?? "Untitled";
  return {
    title: `${documentTitle} | Quizzifyme`,
    description: "Document",
  };
}

export default async function page({ params }: Props) {
  const cookieStore = cookies();
  const supabase = createClient<Database>(cookieStore);
  const { documentId } = params;

  try {
    const [userData, documentData, quizData] = await Promise.all([
      supabase.auth.getUser(),
      supabase
        .from("documents")
        .select("summary, title, inserted_at, id, file_type")
        .eq("id", documentId),
      supabase
        .from("quiz")
        .select("id, summary, inserted_at, updated_at")
        .eq("document_id", documentId),
    ]);

    if (!userData.data?.user) {
      throw new Error("User not authenticated");
    }

    const document = JSON.parse(
      JSON.stringify(documentData?.data?.[0]?.summary ?? {})
    );
    if (!document.title) {
      throw new Error("Document not processed");
    }

    return (
      <div className="flex flex-col m-5">
        <h1>Details</h1>
        <Card className="m-5 p-5 flex flex-auto justify-center text-justify flex-col">
          <CardTitle>{documentData?.data?.[0]?.title ?? "Untitled"}</CardTitle>
          <CardContent>
            <p>System Title: {document.title}</p>
            <p>Summary: {document.summary}</p>
          </CardContent>
        </Card>
        <h1>Quiz History</h1>
        <pre>{JSON.stringify(quizData?.data, null, 2)}</pre>
      </div>
    );
  } catch (error: any) {
    console.error(error);
    // Handle errors here
    return <div>Error: {error.message}</div>;
  }
}
