// AddDocument.tsx
import AddDocumentCard from "@/components/documents/CreateDocument";
import React from "react";

// Remove the export of generateMetadata
// export function generateMetadata() {
//   return {
//     title: "Add Document | QuizzifyMe",
//     description: "Add a document",
//   };
// }

export default function AddDocument() {
  return (
    <div className="flex flex-auto items-center justify-center h-full">
      <AddDocumentCard />
    </div>
  );
}
