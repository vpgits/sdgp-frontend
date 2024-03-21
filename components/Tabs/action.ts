"use server";

import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/actions";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function handleChangeUserData(formData: FormData) {
  console.log(formData);
  const id = formData.get("id")! as string;
  const fname = formData.get("fname")! as string;
  const lname = formData.get("lname")! as string;
  const phone = formData.get("phone")! as string;
  const address = formData.get("address")! as string;
  const city = formData.get("city")! as string;
  const state = formData.get("state")! as string;
  const cookieStore = cookies();
  const supabase = createClient<Database>(cookieStore);
  const { data, error } = await supabase
    .from("user")
    .update({ fname: fname,lname: lname, phone: phone, address: address,city: city,state: state})
    .eq("id", id);
  if (error) {
    throw new Error("Error updating user data " + error);
  }
  revalidatePath("/profile", "layout");
}
