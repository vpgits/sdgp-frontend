import AddDocumentCard from "@/components/documents/CreateDocument";
import React from "react";

export function generateMetadata() {
  return {
    title: "Add Document | QuizzifyMe",
    description: "Add a document",
  };
}

export default function AddDocument() {
  return (
    <div className="flex flex-auto items-center justify-center h-screen -mt-10">
      <AddDocumentCard />
    </div>
  );
}
