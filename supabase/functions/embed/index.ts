// console.log("Hello from Functions!")


import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { env, pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.5.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'


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
    const { input, document_id } = await req.json();
    console.log(input);

    // Generate the embedding from the user input
    const output = await pipe(input, {
        pooling: 'mean',
        normalize: true,
    });

    // Extract the embedding output

    const embedding = Array.from(output.data);



    // Insert the embedding into the 'embeddings' table in the database

    const { error } = await supabase
        .from('embeddings')
        .insert({ document_id: document_id, embedding: embedding, body: input });

    // Respond to the client based on whether the insertion was successful
    if (error) {
        return new Response(
            JSON.stringify({ error }),
            { headers: { 'Content-Type': 'application/json' } }
        );
    } else {
        return new Response(
            JSON.stringify({ message: 'Embedding added successfully!' }),
            { headers: { 'Content-Type': 'application/json' } }
        );
    }
});