import CreateSupabaseServerClient from "@/config/supabase_server";

export function getDocuments(): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const supabase = await CreateSupabaseServerClient();
            const { data, error } = await supabase.from("documents").select("title, inserted_at").order('inserted_at', { ascending: false });
            if (error) throw new Error("Error getting documents " + error.message);
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
}
