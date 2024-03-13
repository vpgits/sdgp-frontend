import React from "react";
import { Button } from "../ui/button";
import { Tables } from "@/types/supabase";
import Link from "next/link";
import MiniDocument from "../dashboard/MiniDocuments";
import MiniHistory from "../dashboard/MiniHistory";

export default function Historypage() {
  return (
    <div className="flex flex-col">
      <header className="flex items-center justify-between px-6">
        <h1 className="text-2xl font-bold">History</h1>
      </header>
      <div className="flex flex-auto flex-col md:flex-row justify-center gap-x-48 md:mx-20 my-5 mx-5 gap-y-5 md:max-h-full">
        <MiniDocument />
        <MiniHistory />
      </div>
    </div>
  );
}
