import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function MiniDocument() {
  const cookieStore = cookies();
  const supabase = createClient<Database>(cookieStore);

  {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      redirect("/login");
    }
  }

  let { data: documents, error } = await supabase
    .from("documents")
    .select("id, summary, inserted_at, title")
    .order("inserted_at", { ascending: false })
    .range(0, 4);
  return (
    <div>
      <h1>My Documents</h1>
      {documents?.map((d, index) => (
        <pre key={index}>{JSON.stringify(d, null, 2)}</pre>
      ))}
    </div>
  );
}
