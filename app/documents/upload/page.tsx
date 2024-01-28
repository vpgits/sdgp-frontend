import UploadCard from "@/components/documents/UploadCard";
import Header from "@/components/header";

export function generateMetadata() {
  return {
    title: "Upload | QuizzifyMe",
    description: "Upload a document",
  };
}

export default function Upload() {
  return (
    <div className="flex flex-col items-center justify-center">
      <UploadCard />
    </div>
  );
}
