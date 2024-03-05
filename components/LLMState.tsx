"use client";

import checkRunpodState from "@/lib/actions/runpodState";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { MdOutlineExpandMore } from "react-icons/md";

export default function LLMState() {
  const [lLMState, setLLMState] = useState(null);
  const [details, SetDetails] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const workerState = await checkRunpodState();
      setLLMState(workerState);
    };

    fetchData();

    const interval = setInterval(fetchData, 30000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Card className="m-2 p-4 text-center text-sm fixed right-2 bottom-2">
      <CardHeader
        className="p-0 font-bold hover:cursor-pointer hover:underline"
        onClick={() => {
          if (details) {
            SetDetails(false);
          } else {
            SetDetails(true);
          }
        }}
      >
        LLM State
      </CardHeader>
      <CardContent className="p-0 flex-col flex flex-auto font-light ">
        {" "}
        {lLMState && details && (
          <div>
            <p>Idle: {(lLMState as any).idle}</p>
            <p>Ready: {(lLMState as any).ready}</p>
            <p>Running: {(lLMState as any).running}</p>
            <p>Throttled: {(lLMState as any).throttled}</p>
          </div>
        )}{" "}
        {/* Fix: Added closing parenthesis */}
        {details && <p>Checking...</p>}
      </CardContent>
    </Card>
  );
}
