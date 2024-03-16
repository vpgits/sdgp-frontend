import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { Tables, Database } from "@/types/supabase";
import Link from "next/link";
import { Button } from "../ui/button";
import { IoIosNotifications } from "react-icons/io";

export default async function MiniNotifications() {
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
      .order("created_at", { ascending: false })
      .range(0, 4);

    if (error) {
      console.log(error);
    }
    return data!;
  }

  const notificationData: Tables<"notification">[] = await getNotification();
  return (
    <div className="min-w-48 min-h-[500px] p-2 rounded-lg border dark:border-slate-600 border-slate-400 flex flex-col justify-center flex-auto items-center ">
      <div className="flex flex-row items-center justify-between my-2">
        <Link href={"/notifications"}>
          <span className="flex flex-row gap-x-5">
            <Button className="text-2xl  hover:bg-white hover:text-black hover:shadow-lg   dark:hover:bg-black dark:hover:text-white dark:bg-white">
              <IoIosNotifications className="text-2xl" />
            </Button>
            <h1 className="text-3xl font-semibold">Notifications</h1>
          </span>
        </Link>
      </div>
      <p className="text-sm text-muted-foreground">
        View your recent notifications
      </p>
      <div className="max-h-72 overflow-y-auto md:max-h-fit">
        {notificationData?.map((n, index) => (
          <div className="mt-2 flex flex-row items-center" key={index}>
            <div className="mr-4">
              {/* <IoDocumentTextOutline className="text-3xl" /> */}
            </div>
            <div className="flex flex-col items-start">
              <Link href={`/documents/${n.id}`}>
                <div>{n.title}</div>
              </Link>
              <p>{n.description}</p>
              <div className="font-mono text-xs text-start">
                <p>{new Date(n.created_at).toDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
