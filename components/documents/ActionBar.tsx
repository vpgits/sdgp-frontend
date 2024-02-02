"use client";

import { useState } from "react";
import { TableCell } from "../ui/table";
import { Button } from "../ui/button";
import { Toaster, toast } from "sonner";

export default function ActionBar({
  documentId,
  title,
  inserted_at,
}: {
  documentId: string;
  title: string;
  inserted_at: string;
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleProcess = async () => {
    setIsProcessing(true);
    try {
      const preprocessUrl = new URL(
        `api/documents/preprocess`,
        window.location.origin
      );
      preprocessUrl.search = new URLSearchParams({ documentId }).toString();
      const response = await fetch(preprocessUrl.toString());
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      let taskId = data.taskId;
      let taskStatus = "PENDING";

      while (taskStatus !== "SUCCESS" && taskStatus !== "FAILURE") {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const statusUrl = new URL(
          `api/documents/preprocess/status`,
          window.location.origin
        );
        statusUrl.search = new URLSearchParams({ taskId }).toString();

        const taskResponse = await fetch(statusUrl.toString());
        if (!taskResponse.ok) {
          throw new Error(`HTTP error! status: ${taskResponse.status}`);
        }
        const taskData = await taskResponse.json();
        taskStatus = taskData.status;
      }
    } catch (error: any) {
      toast(error.message, {
        action: {
          label: "Retry",
          onClick: () => handleProcess(),
        },
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>

    </>
  );
}