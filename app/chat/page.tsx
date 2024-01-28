import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Error from "./error";
import Loading from "./loading";
import { Suspense } from "react";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  let { data: questions, error } = await supabase.from("questions").select("*");
  if (error) {
    Error();
  }
  if (!questions) {
    Loading;
  } else {
    return (
      <>
      <Suspense fallback={<Loading />}> 
        <div>
          <h1>Questions</h1>
          <p>{JSON.stringify(questions)}</p>
          <p>{JSON.stringify(error)}</p>
        </div>
        </Suspense>
      </>
    );
  }
}
