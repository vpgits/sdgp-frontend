"use client";
//https://supabase.com/docs/guides/auth/server-side/creating-a-client
import { createBrowserClient } from '@supabase/ssr'

export default function CreateSupabaseBrowserClient () {
     return  createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}