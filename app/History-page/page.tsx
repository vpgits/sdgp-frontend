import Historypage from "@/components/History/History";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { Tables,Database } from "@/types/supabase";

export function generateMetadata(){
  return {
    title: "History | Quizzifyme",
    description: "History",
  };


}

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient<Database>(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  async function getHistory() {
    const { data, error } = await supabase
      .from("quiz")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      console.log(error);
    }
    return data!;
  }


  const historyData:Tables<"quiz">[] = await getHistory();
  console.log(historyData)
  

  revalidatePath("/History-page");

  return (
    <Historypage historyData={historyData}/>
  )
}

