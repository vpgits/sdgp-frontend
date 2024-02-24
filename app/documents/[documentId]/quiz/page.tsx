import CreateQuizForm from "@/components/CreateQuizForm";

export function generateMetadata() {
  return {
    title: "Create Quiz | Quizzifyme",
    description: "Create a quiz from your document",
    image: "/images/quiz.png",
    url: "https://quizzifyme.com/documents/[documentId]/quiz",
  };
}

export default function Page() {
  // const handleGenerate = async () => {
  //   let quizId;
  //   try {
  //     const quizUrl = new URL(`api/documents/quiz`, window.location.origin);
  //     const documentId = window.location.pathname.split("/")[2];
  //     quizUrl.search = new URLSearchParams({ documentId }).toString();

  //     const response = await fetch(quizUrl.toString());
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     quizId = data.quizId;
  //   } catch (error: any) {
  //     throw new Error(error.message);
  //   }
  //   router.push(`/quiz/${quizId}`);
  // };

  return (
    <div className="h-full">
      <CreateQuizForm />
    </div>
  );
}
