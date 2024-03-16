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
  let userId: string;
  {
    const { data, error } = await supabase.auth.getUser()!;
    userId = data.user?.id!;
  }

  {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      redirect("/login");
    }
  }

  let { data: quiz, error } = await supabase
    .from("quiz")
    .select("id, summary, inserted_at, scores, parent_id")
    .order("inserted_at", { ascending: false })
    .eq("user_id", userId);

  await Promise.all(
    quiz!.map(async (q) => {
      let parent_id: string;
      let quizData: any;
      if (q.parent_id !== null) {
        console.log(q.parent_id);
        parent_id = q.parent_id;

        const { data, error } = await supabase
          .from("quiz")
          .select("summary")
          .eq("id", parent_id);
        if (error) {
          throw new Error("Error fetching quiz" + error.message);
        }
        quizData = data[0].summary!;
        q.summary = quizData;
      }
    })
  );
  return (
    <div>
      <Card className="h-[600px]">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0"></CardHeader>
        <p className="text-sm text-muted-foreground ml-5">
          View recently taken quizzes
        </p>
        <CardContent className="overflow-y-scroll h-5/6 scrollbar-hide scrollbar-hide::-webkit-scrollbar ">
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
