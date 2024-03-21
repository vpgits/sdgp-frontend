import Notificationpage from "@/components/Notificationpage/Notificationpage";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { Tables, Database } from "@/types/supabase";


export function generateMetadata() {
  return {
    title: "Notification | Quizzifyme",
    description: "Notification",
  };
}

export default async function Page() {
  
  const cookieStore = cookies();
  const supabase = createClient<Database>(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  async function getNotification() {
    const { data, error } = await supabase
      .from("notification")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
    }
    return data!;
  }

  const notificationData: Tables<"notification">[] = await getNotification();

  revalidatePath("/notification-page");

  return <Notificationpage notificationData={notificationData} />;
  

}
