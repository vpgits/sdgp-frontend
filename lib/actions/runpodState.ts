"use server";
import "dotenv/config";

export default async function checkRunpodState() {
  const RUNPOD_WORKER_ID = process.env.RUNPOD_WORKER_ID;
  const RUNPOD_API_KEY = process.env.RUNPOD_API_KEY;
  if (!RUNPOD_WORKER_ID || !RUNPOD_API_KEY) {
    throw new Error("Missing environment variables");
  }
  const url = `https://api.runpod.ai/v2/${RUNPOD_WORKER_ID}/health`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${RUNPOD_API_KEY}`,
  };
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json()!;
  const workers = data?.workers;
  return workers;
}
