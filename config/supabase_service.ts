import {createClient} from "@supabase/supabase-js";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_KEY environment variable')
}

export default createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)