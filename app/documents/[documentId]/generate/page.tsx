import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import SelectKeyPoint from "@/components/documents/SelectKeyPoint";

export function generateMetadata() {
  return {
    title: "Generate | QuizzifyMe",
    description: "Generate questions",
  };
}

export default async function Generate() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  async function getKeyPoints() {
    const { data, error } = await supabase
      .from("key_points")
      .select("key_point,id")
      .eq("answered", false)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
    }
    return data!;
  }
  const key_points = await getKeyPoints();
  console.log(key_points);
  return (
    <>
      <div className="flex flex-col flex-auto ">
        <SelectKeyPoint key_points={key_points} />
      </div>
    </>
  );
}
