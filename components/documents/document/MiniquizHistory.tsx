"use client";
import { Database, Tables } from "@/types/supabase";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ImQuestion } from "react-icons/im";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";

export default function MiniHistory() {
  const supabase = createClient<Database>();
  const [quizData, setQuizData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        let userId: string | undefined;
        const { data, error } = await supabase.auth.getUser();
        if (error || !data?.user) {
          redirect("/login");
          return;
        }
        userId = data?.user?.id;

        const documentId = window.location.pathname.split("/")[2];

        const { data: quiz, error: quizError } = await supabase
          .from("quiz")
          .select("id, summary, inserted_at, scores, parent_id")
          .order("inserted_at", { ascending: false })
          .eq("user_id", userId)
          .eq("document_id", documentId);

        if (quizError) {
          throw new Error("Error fetching quiz" + quizError.message);
        }

        const quizData = quiz || [];

        for (const q of quizData) {
          if (q.parent_id !== null) {
            const { data, error } = await supabase
              .from("quiz")
              .select("summary")
              .eq("id", q.parent_id);

            if (error) {
              throw new Error("Error fetching quiz" + error.message);
            }

            q.summary = data[0]?.summary;
          }
        }

        setQuizData(quizData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching quiz:", error);
        setIsLoading(false);
      }
    };

    fetchQuiz();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Card className="h-[450px] m-2">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0"></CardHeader>
        <p className="text-sm text-muted-foreground ml-5">
          View recently taken quizzes
        </p>
        <CardContent className="overflow-y-scroll h-5/6 scrollbar-hide scrollbar-hide::-webkit-scrollbar ">
          {quizData &&
            quizData?.map((q: any, index: number) => (
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
