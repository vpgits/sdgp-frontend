"use client";
import CreateSupabaseBrowserClient from "@/config/supabase_client";
import { useRouter} from "next/navigation";

const supabase =  CreateSupabaseBrowserClient();


export default function Login() {
    const router = useRouter();
    const signUpNewUser = async ()=> {
        const { data, error } = await supabase.auth.signUp({
            email: 'example@email.com',
            password: 'example-password',
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`
            }
        })
        console.log(data, error);
    }

    const signIn =  async ()=>{

        const { data, error } = await supabase.auth.signInWithPassword({
            email: 'superuser@sdgp',
            password: 'password'
        })
        console.log(data, error);
        if (!error){
            router.push('/profile')
        }
    }

    const signOut = async ()=>{
        const { error } = await supabase.auth.signOut();
        console.log(error);
    }

    return (
        <div>
            <button onClick={signIn}>Sign In</button>
            <br></br>
            <button onClick={signOut}>Sign Out</button>
        </div>
    )
}

