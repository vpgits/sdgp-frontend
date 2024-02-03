//https://supabase.com/docs/guides/auth/server-side/email-based-auth-with-pkce-flow-for-ssr

// import { createServerClient, type CookieOptions } from '@supabase/ssr'
// import { type EmailOtpType } from '@supabase/supabase-js'
// import { cookies } from 'next/headers'
// import { NextResponse } from 'next/server'

// export async function GET(request: Request) {
//     const { searchParams } = new URL(request.url)
//     const token_hash = searchParams.get('token_hash')
//     const type = searchParams.get('type') as EmailOtpType | null
//     const next = searchParams.get('next') ?? '/'

//     if (token_hash && type) {
//         const cookieStore = cookies()
//         const supabase = createServerClient(
//             process.env.NEXT_PUBLIC_SUPABASE_URL!,
//             process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//             {
//                 cookies: {
//                     get(name: string) {
//                         return cookieStore.get(name)?.value
//                     },
//                     set(name: string, value: string, options: CookieOptions) {
//                         cookieStore.set({ name, value, ...options })
//                     },
//                     remove(name: string, options: CookieOptions) {
//                         cookieStore.delete({ name, ...options })
//                     },
//                 },
//             }
//         )

//         const { error } = await supabase.auth.verifyOtp({
//             type,
//             token_hash,
//         })
//         if (!error) {
//             return NextResponse.redirect(next)
//         }
//     }

//     // return the user to an error page with some instructions
//     return NextResponse.redirect('/auth/auth-code-error')
// }

import { type EmailOtpType } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/actions";

export async function GET(request: NextRequest) {
  const cookieStore = cookies();

  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;
  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");

  if (token_hash && type) {
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      redirectTo.searchParams.delete("next");
      return NextResponse.redirect(redirectTo);
    }
  }

  // return the user to an error page with some instructions
  redirectTo.pathname = "/error";
  return NextResponse.redirect(redirectTo);
}
