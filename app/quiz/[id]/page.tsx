/**
 * v0 by Vercel.
 * @see https://v0.dev/t/nIIH4ZfVQyq
 */
import QuizCard from "@/components/QuizCard";
import { Button } from "@/components/ui/button";
import CreateSupabaseServerClient from "@/config/supabase_server";
import GetCurrentSession from "@/lib/getCurrentSession";
import NotFound from "./not-found";

type Props = {
  id: string;
};

export async function generateMetadata({ params }: { params: Props }) {
  const supabase = await CreateSupabaseServerClient();
  const { data, error } = await supabase
    .from("questions")
    .select()
    .eq("id", params.id);
return data && data[0] && data[0].data ? {
    title: data[0].data.question,
    description: data[0].data.correct_answer,
    image: data[0].data.incorrect_answers[0],
} : "No Question Found"
}

export default async function Component({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await CreateSupabaseServerClient();
  const { data, error } = await supabase
    .from("questions")
    .select()
    .eq("id", params.id);
  return (
    <>
      {data && data[0] && data[0].data ? (
        <QuizCard {...data[0].data} />
      ) : NotFound()}
    </>
  );
}
