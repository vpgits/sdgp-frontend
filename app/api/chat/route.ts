import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
// but configure it to point to fireworks.ai
const FIREWORKS_API_KEY = process.env.FIREWORKS_API_KEY;
if (!FIREWORKS_API_KEY) {
  throw new Error("FIREWORKS_API_KEY is required");
}

const fireworks = new OpenAI({
  apiKey: FIREWORKS_API_KEY,
  baseURL: "https://api.fireworks.ai/inference/v1",
});
// IMPORTANT! Set the runtime to edge
export const runtime = "edge";
export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  // Ask Fireworks for a streaming chat completion using Llama 2 70b model
  // @see https://app.fireworks.ai/models/fireworks/llama-v2-70b-chat
  const response = await fireworks.chat.completions.create({
    model: "accounts/fireworks/models/mixtral-8x7b-instruct",
    stream: true,
    max_tokens: 1000,
    messages,
  });
  // Convert the response into a friendly text-stream.
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
