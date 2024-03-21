import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { JSX, SVGProps } from "react";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DocumentsTable from "@/components/documents/DocumentsTable";
import LogOut from "@/components/LogOut";

type Document = {
  id: string;
  title: string;
  inserted_at: string;
  file_type: string;
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
    redirect("/login");
  }

  async function getDocuments() {
    const { data, error } = await supabase
      .from("documents")
      .select("title, inserted_at, id, file_type")
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
      <div className=" flex flex-1 item-center justify-center mt-10">
          <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="/profile"
            >
              <PackageIcon className="h-4 w-4" />
              User Documents
            </Link>
            <LogOut /> 
            </div>
    </div>
    
  );
}
function PackageIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      data-testid="geist-icon"
      fill="none"
      height="24"
      shape-rendering="geometricPrecision"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="24"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}
