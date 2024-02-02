import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DocumentsTable from "@/components/documents/DocumentsTable";

type Document = {
  id: string;
  title: string;
  inserted_at: string;
};

export function generateMetadata() {
  return {
    title: "Documents | QuizzifyMe",
    description: "View your documents",
  };
}

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  async function getDocuments() {
    const { data, error } = await supabase
      .from("documents")
      .select("title, inserted_at, id")
      .order("inserted_at", { ascending: false });

    if (error) {
      console.log(error);
    }
    return data!;
  }

  const documentData: Document[] = await getDocuments();

  revalidatePath("/documents");

  return (
    <div className="w-full p-8">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Documents</h1>
        <Link href="/documents/add">
          <Button>Add Documents</Button>
        </Link>
      </header>
      <div className="border shadow-sm rounded-lg flex flex-auto">
        <DocumentsTable documentData={documentData} />
      </div>
    </div>
  );
}
