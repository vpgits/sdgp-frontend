import React from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/actions";
import { redirect } from "next/navigation";

export function generateMetadata() {
  return {
    title: "Dashboard | Quizzifyme",
    description: "Dashboard",
  };
}

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  return (
    <div className="flex flex-auto h-full justify-center">
      <Dashboard userData={data?.user} />
    </div>
  );
}
