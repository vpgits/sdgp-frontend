'use server'
import { createClient } from "@/utils/supabase/actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function create(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  console.log(formData);
  const request = await fetch("/api/documents/quiz", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ formData }),
  });
  //   const request = await fetch("/api/documents/quiz", {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     method: "POST",
  //     body: JSON.stringify({ formData }),
  //   });
  //   console.log(request);
  //   const response = await request.json();
  //   console.log(response);
}
