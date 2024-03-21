"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/actions";


export async function add(formData: FormData) {
   

    //const { error } = await supabase.auth.signInWithPassword(data);

    // const { data, error } = await supabase.auth.signInWithPassword({
    //   email: "superuser@sdgp",
    //   password: "password",
    // });

    //if (error) {
     // redirect("/error");
    //}

    //revalidatePath("/dashboard", "layout");
 // redirect("/dashboard");
}

export async function signup(formData: FormData) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    const { error } = await supabase.auth.signUp(data);

    if (error) {
        redirect("/error");
    }

    // revalidatePath("/login-signup", "layout");
    redirect("/login");
}

export async function logout() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signOut();

    if (error) {
        redirect("/error");
    }

    revalidatePath("/", "layout");
    redirect("/");
}