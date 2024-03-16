import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { ImQuestion } from "react-icons/im";
import Link from "next/link";
import { Button } from "../ui/button";
import { FaHistory } from "react-icons/fa";

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
    .order("inserted_at", { ascending: false })
    .range(0, 4);

    quiz?.filter((q) => q.parent_id === null);
  return (
    <div className="min-w-48 min-h-[500px] p-2 rounded-lg border dark:border-slate-600 border-slate-400 flex flex-col justify-center flex-auto items-center ">
      <div className="flex flex-row items-center justify-between my-2">
        <Link href={"/history"}>
          <span className="flex flex-row gap-x-5">
            <Button className="text-2xl  hover:bg-white hover:text-black hover:shadow-lg   dark:hover:bg-black dark:hover:text-white dark:bg-white">
              <FaHistory className="text-2xl" />
            </Button>
            <h1 className="text-3xl font-semibold">History</h1>
          </span>
        </Link>
      </div>
      <p className="text-sm text-muted-foreground">
        View recently taken quizzes
      </p>
      <div className="">
        {quiz?.map((q, index) => (
          <div className="my-2 flex flex-row items-center" key={index}>
            <div className="mr-4 ml-1">
              <ImQuestion className="text-3xl" />
            </div>
            <div className="flex flex-col items-start">
              <Link href={`/quiz/${q.id}`}>
                <div>{(q.summary as any)?.title}</div>
              </Link>
              <div className="font-mono text-xs text-start">
                <p>Score: {new Number(q.scores).toFixed(2)}</p>
                <p>{new Date(q.inserted_at).toDateString()}</p>
                <p>{new Date(q.inserted_at).toTimeString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
