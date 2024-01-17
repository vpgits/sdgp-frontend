//write a function that fetches data from the supabase js client, and returns it as a json stringify

import CreateSupabaseServerClient from "@/config/supabase_server";

export default async function Page(){
    const supabase = await CreateSupabaseServerClient();

    let { data: questions, error } = await supabase
        .from('chat')
        .select('*')
    return (
        <div>
            <h1>Questions</h1>
            <p>{JSON.stringify(questions)}</p>
            <p>{JSON.stringify(error)}</p>
        </div>
    )
}