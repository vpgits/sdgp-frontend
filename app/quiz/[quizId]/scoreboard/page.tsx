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
import { AvatarIcon } from "@radix-ui/react-icons";
import Image from "next/image";

type Props = {
  quizId: Tables<"quiz">["id"];
};

type RawUserMetaData = {
  picture: string;
};

export function generateMetadata() {
  return {
    title: "Quiz Leaderboard | Quizzifyme",
    description: "Quiz Leaderboard",
  };
}

export default async function Component({ params }: { params: Props }) {
  const { quizId } = params;
  const cookieStore = cookies();
  const supabase = createClient<Database>(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

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
  async function mapUsernames() {
    const userIds = scores.map((score) => score.user_id);
    const users = await fetchUsers(userIds);

    return scores.map((score) => {
      const user = users.find((user) => user.id === score.user_id);
      return {
        user_id: user!,
        scores: score.scores,
      };
    });
  }

  async function fetchUsers(userIds: string[]) {
    const { data, error } = await supabase
      .from("user")
      .select(`email, id, raw_user_meta_data`)
      .in("id", userIds);

    if (error) {
      console.error("Error fetching users:", error);
      return [];
    }

    return data;
  }
  let scores = await fetchScores();
  scores = scores.filter((score) => score!.scores != null);
  scores = scores.sort((a, b) => b.scores! - a.scores!);
  const scoreBoardData = await mapUsernames();

  return (
    <div className="flex h-full justify-center items-center">
      <Card className="w-full max-w-3xl border-4 p-4 m-4 min-h-96 flex flex-auto items-center flex-col justify-center">
        <div className="flex justify-center">
          <CardHeader className="text-center">
            <CardTitle>Quiz Leaderboard</CardTitle>
            <CardDescription className="text-gray-700 dark:text-gray-400">
              Top scores of participants.
            </CardDescription>
          </CardHeader>
        </div>
        <CardContent className="p-0 min">
          <div className="flex flex-col gap-2 ">
            {scoreBoardData.length > 0 ? (
              scoreBoardData.map((participant, index) => (
                <div className="flex items-center gap-4" key={index}>
                  <div className="w-8">{index + 1}</div>
                  <div className="flex items-center gap-4 ">
                    {participant.user_id.raw_user_meta_data ? (
                      <Image
                        alt="Avatar"
                        height="40"
                        src={
                          (
                            participant.user_id
                              .raw_user_meta_data as RawUserMetaData
                          ).picture
                        }
                        width="40"
                      />
                    ) : (
                      <AvatarIcon />
                    )}
                    <div className="font-semibold">
                      {participant.user_id.email}
                    </div>
                  </div>
                  <div className="ml-auto font-semibold">
                    {Number(participant.scores).toFixed(2)}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">
                No scores yet! Be the first to take the quiz!
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
