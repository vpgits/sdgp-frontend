// console.log("Hello from Functions!")

import {serve} from 'https://deno.land/std@0.168.0/http/server.ts'
import {env, pipeline} from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.5.0'
import {createClient} from 'https://esm.sh/@supabase/supabase-js@2'

// Configuration for Deno runtime
env.useBrowserCache = false;
env.allowLocalModels = false;

const pipe = await pipeline(
    'feature-extraction',
    'Supabase/gte-small',
);

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");

if (!supabaseAnonKey || !supabaseUrl) {
    throw new Error("Supabase URL or Anon Key not found in environment variables");
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);


Deno.serve(async (req) => {
    // Extract input string from JSON body
    const {input} = await req.json();
    console.log(input);

    // Generate the embedding from the user input
    const output = await pipe(input, {
        pooling: 'mean',
        normalize: true,
    });

    // Extract the embedding output

    const embedding = Array.from(output.data);

    return new Response(
        JSON.stringify({"embedding": embedding}),
        {headers: {'Content-Type': 'application/json'}}
    );

});