import GetCurrentSession from "@/lib/getCurrentSession";
import {redirect} from "next/navigation";
import CreateSupabaseServerClient from "@/config/supabase_server";



export default async function Page() {

    const supabase = await CreateSupabaseServerClient();
    const currentSessionData = await GetCurrentSession();

    let { data: user, error } = await supabase
        .from('user')
        .select()
    if (currentSessionData.data.session === null) {
        redirect('/login');
    } else {
        return (
            <div>
                <h1>Logged In</h1>
                <p>{JSON.stringify(currentSessionData)}</p>
                <p>DB</p>
                <p>{JSON.stringify(user)}</p>
                <p>{JSON.stringify(error)}</p>
            </div>
        )
    }
}
