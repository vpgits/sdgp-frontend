"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/actions";
import { Database } from "@/types/supabase";

export async function Login(formData: FormData) {
  //formData: FormData
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error(error);
  } else {
    revalidatePath("/", "layout");
  }
  let errorData = JSON.parse(JSON.stringify(error));
  return { data, errorData };
}

export async function signup(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient<Database>(cookieStore);

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const signUpData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { data, error } = await supabase.auth.signUp(signUpData);

  if (error) {
    console.error(error);
  } else {
    revalidatePath("/", "layout");
  }
  let errorData = JSON.parse(JSON.stringify(error));
  return { data, errorData };
}

export async function logOut() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
  } else {
    revalidatePath("/", "layout");
  }
  let errorData = JSON.parse(JSON.stringify(error));
  return { errorData };
}
