"use server";
import CreateSupabaseServerClient from "@/config/supabase_server";

export default async function GetCurrentSession(){
    const supabase = await  CreateSupabaseServerClient()
    return supabase.auth.getSession();
}