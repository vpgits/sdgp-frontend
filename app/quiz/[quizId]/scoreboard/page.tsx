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
    let id: String;
    const { data: data1, error: error1 } = await supabase
      .from("quiz")
      .select(`parent_id`)
      .eq("id", quizId)
      .single();
    if (data1!.parent_id) {
      id = data1!.parent_id;
    } else {
      id = quizId;
    }

    const { data: data2, error: error2 } = await supabase
      .from("quiz")
      .select(`scores, user_id, parent_id`)
      .eq("parent_id", id)
      .order("scores", { ascending: false })
      .range(0, 9);
    if (data2 != null) {
      scoreData.push(...data2!);
    }
    const { data: data3, error: error3 } = await supabase
      .from("quiz")
      .select(`scores, user_id, parent_id`)
      .eq("id", id)
      .single();
    scoreData.push(data3);
    return scoreData;
  }

  async function mapUsernames(scores: any[]) {
    const userIdsSet = new Set(scores.map((score) => score!.user_id));
    const users = await fetchUsers(userIdsSet);

    return scores.map((score) => {
      const user = users.find((user: any) => user.id === score!.user_id);
      return {
        user_id: user!,
        scores: score!.scores,
      };
    });
  }
  const fetchUser = async (userId: string) => {
    const { data, error } = await supabase
      .from("user")
      .select(`email, id, raw_user_meta_data`)
      .eq("id", userId)
      .single();
    if (error) {
      console.log(error);
    }
    return data;
  };

  async function fetchUsers(userIds: Set<string>) {
    const userData: any[] = [];
    const userIdsArray = Array.from(userIds); // Convert Set to Array

    for (const userId of userIdsArray) {
      // Iterate over the Array
      const data = await fetchUser(userId);

      userData.push(data);
    }
    return userData;
  }

  let scores = await fetchScores();
  scores = scores.sort((a, b) => b!.scores! - a!.scores!);
  const scoreBoardData = await mapUsernames(scores!);

  return (
    <div className="flex h-full justify-center items-center">
      <Card className="w-full max-w-3xl border-4 md:p-4 m-4 min-h-96 flex flex-auto items-center flex-col justify-center">
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
            {scoreBoardData && scoreBoardData.length > 0 ? (
              scoreBoardData.map((participant, index) => (
                <div className="flex items-center w-full" key={index}>
                  {/* Number */}
                  <span className="mr-2">{index + 1}</span>

                  {/* Profile Picture */}
                  <div className="mr-2">
                    {participant.user_id.raw_user_meta_data ? (
                      <div className="rounded-full overflow-hidden">
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
                      </div>
                    ) : (
                      <AvatarIcon />
                    )}
                  </div>

                  {/* Email */}
                  <span className="flex-grow mr-2">
                    {participant.user_id.email}
                  </span>

                  {/* Score */}
                  <span className="ml-auto">
                    {Math.round(participant.scores)}
                  </span>
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
