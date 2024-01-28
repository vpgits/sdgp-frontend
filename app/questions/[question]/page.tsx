import QuizCard from "@/components/QuizCard";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

type Props = {
  params: {
    question: string;
  };
};

export default async function Page({ params }: Props) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  async function getQuestion() {
    const { data, error } = await supabase
      .from("questions")
      .select("*")
      .eq("id", params.question);
    if (error) {
      console.log(error);
    }
    return data![0];
  }

  const questionData = await getQuestion();

  return (
    <div className="flex flex-auto items-center justify-center h-full">
      <QuizCard questionData={questionData} />
    </div>
  );
}
