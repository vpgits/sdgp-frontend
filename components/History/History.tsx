import React from "react";
import { Button } from "../ui/button";
import { Tables } from "@/types/supabase";
import Link from "next/link";
import MiniDocument from "./MiniDocuments";
import MiniHistory from "./MiniHistory";

export default function Historypage() {
  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between px-6">
        <h1 className="text-2xl font-bold text-center mx-auto">History</h1>
      </header>
      <div className="flex flex-auto flex-col md:flex-row justify-center gap-x-48 md:mx-20 my-5 mx-5 gap-y-5 items-center">
        <MiniDocument />
        <MiniHistory />
      </div>
    </div>
  );
}
