import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ImQuestion } from "react-icons/im";
import Link from "next/link";

export default async function MiniHistory() {
  const cookieStore = cookies();
  const supabase = createClient<Database>(cookieStore);

  {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      redirect("/login");
    }
  }

  let { data: quiz, error } = await supabase
    .from("quiz")
    .select("id, summary, inserted_at, scores, parent_id")
    .order("inserted_at", { ascending: false });
  return (
    <div >
      <Card className="p-5">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0"></CardHeader>
        <p className="text-sm text-muted-foreground ">
          View recently taken quizzes
        </p>
        <CardContent className=" max-h-72 overflow-y-auto md:max-h-fit">
          {quiz?.map((q: any, index) => (
            <Card className="my-5 flex flex-row items-center" key={index}>
              <div className="ml-4">
                <ImQuestion className="text-4xl" />
              </div>
              <div className="flex flex-col items-start">
                <Link href={`/quiz/${q.id}`}>
                  <CardHeader>{q.summary?.title}</CardHeader>
                </Link>
                <CardContent className="font-mono text-xs text-start">
                  <p>Score: {new Number(q.scores).toFixed(2)}</p>
                  <p>{new Date(q.inserted_at).toDateString()}</p>
                  <p>{new Date(q.inserted_at).toTimeString()}</p>
                </CardContent>
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
