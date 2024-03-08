import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function MiniHistory() {
  const cookieStore = cookies();
  const supabase = createClient<Database>(cookieStore);

  {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      redirect("/login");
    }
  }

  let { data: quiz, error } = await supabase
    .from("quiz")
    .select("id, summary, inserted_at, scores, parent_id")
    .order("inserted_at", { ascending: false })
    .range(0, 4);
  return (
    <div>
      <h1>History</h1>
      {quiz?.map((q, index) => (
        <pre key={index}>{JSON.stringify(q, null, 2)}</pre>
      ))}
    </div>
  );
}
