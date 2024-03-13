import CreateQuizForm from "@/components/CreateQuizForm";
import { createClient } from "@/utils/supabase/actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function generateMetadata() {
  return {
    title: "Create Quiz | Quizzifyme",
    description: "Create a quiz from your document",
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
    <>
      <div className="h-full flex items-center flex-auto">
        <CreateQuizForm />
      </div>
    </>
  );
}
