"use server";

import { createClient } from "@/utils/supabase/actions";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { fileTypeFromBuffer } from "file-type";
import { Database } from "@/types/supabase";

export default async function create(formData: FormData) {
  const cookieStore = cookies();
  const supabase = await createClient<Database>(cookieStore);
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const file = formData.get("file") as File;
  const fileBuffer = await file.arrayBuffer();
  const detectedFileType = await fileTypeFromBuffer(fileBuffer);

  if (
    !detectedFileType ||
    !["pdf", "docx", "pptx"].includes(detectedFileType.ext)
  ) {
    throw new Error(
      "Invalid file type. Only PDF, DOCX, and PPTX files are allowed."
    );
  }
  const userId = data?.user?.id;
  let fileUUID = "";
  try {
    {
      const { data, error } = await supabase
        .from("documents")
        .insert([
          { title: formData.get("fileName")! as string, file_type: detectedFileType.ext! },
        ])
        .select();
      if (error)
        throw new Error(
          "Unable to create a new file the file " + error.message
        );
      if (data && data[0]) {
        fileUUID = data[0].id;
      }
    }
    const fileName = `${userId}/${fileUUID}.${detectedFileType.ext}`;
    {
      const { data, error } = await supabase.storage
        .from("pdf")
        .upload(fileName, formData.get("file")! as File);
      if (error) throw new Error("Unable to upload the file " + error.message);
    }
  } catch (e: any) {
    throw new Error("Error getting documents " + e.message);
  }
  revalidatePath("/documents");
  redirect("/documents");
}
// "use server";
// import CreateSupabaseServerClient from "@/config/supabase_server";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import { GetCurrentUserId } from "../getCurrentSession";

// export default async function create(formData: FormData) {
//   const file = formData.get("file") as File;
//   if (file.type !== "application/pdf") throw new Error("File must be a PDF");
//   const supabase = await CreateSupabaseServerClient();
//   const userId = await GetCurrentUserId();
//   let fileUUID = "";
//   try {
//     {
//       const { data, error } = await supabase
//         .from("documents")
//         .insert([{ title: formData.get("fileName") }])
//         .select();
//       if (error)
//         throw new Error(
//           "Unable to create a new file the file " + error.message
//         );
//       if (data && data[0]) {
//         fileUUID = data[0].id;
//       }
//     }
//     const fileName = `${userId}/${fileUUID}.pdf`;
//     {
//       const { data, error } = await supabase.storage
//         .from("pdf")
//         .upload(fileName, formData.get("file") as File);
//       if (error) throw new Error("Unable to upload the file " + error.message);
//     }
//   } catch (e) {
//     console.log(e);
//   }
//   revalidatePath("/documents");
//   redirect("/documents");
// }
