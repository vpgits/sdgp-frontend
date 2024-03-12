import React from "react";
import { Button } from "../ui/button";
import { Tables } from "@/types/supabase";
import Link from "next/link";
import MiniDocument from "../dashboard/MiniDocuments";
import MiniHistory from "../dashboard/MiniHistory";

export default function Historypage(params: { historyData: Tables<"quiz">[] }) {
  const historyz = params.historyData;
  console.log(historyz);

  return (
    <div className="flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <h1 className="text-2xl font-bold">History</h1>
        <Button variant="outline">Mark All as Read</Button>
      </header>
      <MiniDocument/>
      <MiniHistory />
    </div>
  );
}
