import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { quizId: string } }) {
  const { quizId } = params;
  const cookieStore = cookies();
  const supabase = createClient<Database>(cookieStore);
  {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      redirect("/");
    }
  }
const fetchQuiz = async () => {
    try {
        let { data, error } = await supabase
            .from("share")
            .select("id")
            .eq("id", quizId);
        return data!;
    } catch (error: any) {
        throw new Error("Error fetching quiz" + error.message);
    }
};
let quizData = await fetchQuiz();
if (quizData === null) {
    redirect("/");
}

  return (
    <div>
      <h1>Quiz ID: {quizId}</h1>
    </div>
  );
}
