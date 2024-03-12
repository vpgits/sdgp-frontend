import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { Tables, Database } from "@/types/supabase";

type Props = {
  quizId: Tables<"quiz">["id"];
};

export default async function Component({ params }: { params: Props }) {
  async function fetchScores() {
    let scoreData = [];

    const { data: data1, error: error1 } = await supabase
      .from("quiz")
      .select(`scores, user_id`)
      .eq("id", quizId)
      .order("scores", { ascending: false });

    if (data1) {
      scoreData.push(...data1);
    }

    const { data: data2, error: error2 } = await supabase
      .from("quiz")
      .select(`scores, user_id`)
      .eq("parent_id", quizId)
      .order("scores", { ascending: false });

    if (data2) {
      scoreData.push(...data2);
    }

    return scoreData;
  }

  const scores = await fetchScores();
  console.log(scores);
  const { quizId } = params;
  const cookieStore = cookies();
  const supabase = createClient<Database>(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  const participants = [
    {
      name: "Ella Johnson",
      score: 1000,
    },
    {
      name: "Noah Williams",
      score: 950,
    },
    {
      name: "Ava Brown",
      score: 900,
    },
    {
      name: "Liam Jones",
      score: 850,
    },
    {
      name: "Olivia Garcia",
      score: 800,
    },
    {
      name: "Lucas Rodriguez",
      score: 750,
    },
    {
      name: "Sophia Martinez",
      score: 700,
    },
    {
      name: "Mia Hernandez",
      score: 650,
    },
    {
      name: "Benjamin Lopez",
      score: 600,
    },
    {
      name: "Charlotte Smith",
      score: 550,
    },
  ];

  return (
    <div className="flex h-full justify-center items-center">
      <Card className="w-full max-w-3xl border-4 p-4 m-4">
        <div className="flex justify-center">
          <CardHeader className="text-center">
            <CardTitle>Quiz Leaderboard</CardTitle>
            <CardDescription className="text-gray-700 dark:text-gray-400">
              Top scores of participants.
            </CardDescription>
          </CardHeader>
        </div>
        <CardContent className="p-0">
          <div className="flex flex-col gap-2">
            {participants.map((participant, index) => (
              <div className="flex items-center gap-4" key={index}>
                <div className="w-8">{index + 1}</div>
                <div className="flex items-center gap-4">
                  <img
                    alt="Avatar"
                    className="rounded-full"
                    height="40"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "40/40",
                      objectFit: "cover",
                    }}
                    width="40"
                  />
                  <div className="font-semibold">{participant.name}</div>
                </div>
                <div className="ml-auto font-semibold">{participant.score}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
