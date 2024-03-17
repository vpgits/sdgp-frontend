import { redirect } from "next/navigation";
import Profile from "@/components/Profile";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const revalidate = 0;

export function generateMetadata() {
  return {
    title: "Profile | Quizzifyme",
    description: "Profile",
  };
}

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  let { data: user, error } = await supabase.from("user").select();
  if (user === null) {
    redirect("/login");
  }

  let sessionData = null;
  if (
    (user as any)[0]?.id === "eafe255e-27c0-457b-a6e1-cc321a174389" ||
    (user as any)[0]?.id === "7aacc2d5-2086-4fea-a3e7-e8a82ad5c71b"
  ) {
    sessionData = await supabase.auth.getSession();
  }
  return (
    <div>
      <h1>Logged In</h1>
      <pre>{(JSON.stringify(user , null, 2))}</pre>
      <pre>{JSON.stringify(sessionData, null, 2)}</pre>
      <Profile user={user} />
    </div>
  );
}
