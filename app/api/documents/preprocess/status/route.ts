import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const queryParams = new URLSearchParams(url.search);
  const taskId = queryParams.get("taskId");
  const res = await fetch(`http://localhost:8000/preprocess/${taskId}`);
  const data = await res.json();
  console.log(data);
  if (data.task_status === "SUCCESS") {
    return new NextResponse(JSON.stringify({ status: "SUCCESS" }));
  } else if (data.task_status === "PENDING") {
    return new NextResponse(JSON.stringify({ status: "PENDING" }));
  } else {
    return new NextResponse(JSON.stringify({ status: "FAILURE" }));
  }
}
