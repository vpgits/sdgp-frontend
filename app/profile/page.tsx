import { redirect } from "next/navigation";
import Profile from "@/components/Profile";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const revalidate = 0;

export default async function Page() {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);
  let { data: user, error } = await supabase.from("user").select();
  console.log(user, error);
  if (user === null) {
    redirect("/login");
  } else {
    return (
      <div>
        <h1>Logged In</h1>
        <pre>{JSON.stringify(user)}</pre>
        <p>DB</p>
        <p>{JSON.stringify(user)}</p>
        <p>{JSON.stringify(error)}</p>
        <Profile user={user} />
      </div>
    );
  }
}
