import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import QRcode from "qrcode";


export default async function Page({ params }: { params: { quizId: string } }) {
  const { quizId } = params;
  const cookieStore = cookies();
  const supabase = createClient<Database>(cookieStore);
  {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      redirect("/");
    }
  }
  const fetchQuiz = async () => {
    try {
      let { data, error } = await supabase
        .from("share")
        .select("id")
        .eq("id", quizId);
      return data!;
    } catch (error: any) {
      throw new Error("Error fetching quiz" + error.message);
    }
  };
  let quizData = await fetchQuiz();
  if (quizData === null) {
    redirect("/");
  }

  const generateQRCode = async () => {
    try {
      const qrCodeData = await QRcode.toDataURL(quizId);
      return qrCodeData;
    } catch (error: any) {
      throw new Error("Error generating QR code: " + error.message);
    }
  };

  const qrCodeData = await generateQRCode();

  return (
    <div className="flex justify-center">
      <div>
        <h1>Quiz ID: {quizId}</h1>
          <div className="flex justify-center p-5">
            <img src={qrCodeData} alt="QR Code" />
          </div>
          <div className="grid w-full gap-2">
            <Textarea placeholder="Type your message here." />
            <Button>Send message</Button>
          </div>
      </div>
    </div>
  );
}
