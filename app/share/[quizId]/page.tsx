import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import QuizShare from "@/components/quizShare/QuizShare";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Summary = {
  summary: string;
  title: string;
};

export default async function Page({ params }: { params: { quizId: string } }) {
  const { quizId } = params;
  const cookieStore = cookies();
  const supabase = createClient<Database>(cookieStore);
  {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      redirect("/login");
    }
  }
  const fetchQuiz = async () => {
    try {
      let { data, error } = await supabase
        .from("share")
        .select("id, summary")
        .eq("id", quizId);
      return data;
    } catch (error: any) {
      throw new Error("Error fetching quiz" + error.message);
    }
  };
  let quizData = await fetchQuiz();
  if (!quizData![0]) {
    redirect("/");
  }
  const summary = quizData![0]?.summary as Summary;

  return (
    <div className="flex justify-center flex-col items-center h-full">
      <Card className="flex justify-center flex-col items-center max-w-xs md:max-w-md text-center">
        <CardHeader>
          <QuizShare quizId={quizId} />
        </CardHeader>
        <CardContent>
          {" "}
          <h1 className="">{summary.title}</h1>
          <p className=" text-sm font-light">{summary.summary}</p>{" "}
        </CardContent>
      </Card>
    </div>
  );
}
