"use client";
import { createNewQuiz } from "@/utils/quiz/action";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import QRcode from "qrcode";
import Image from "next/image";

export default function QuizShare(params: { quizId: string }) {
  const { quizId } = params;
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  
  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const data = await QRcode.toDataURL(window.location.href);
        setQrCodeData(data); // Set the generated QR code data to qrCodeData state
      } catch (error: any) {
        throw new Error("Error generating QR code: " + error.message);
      }
    };
    generateQRCode(); // Call the generateQRCode function
  }, []);

  return (
    <>
      <div className="flex justify-center p-2">
        {qrCodeData && <Image src={qrCodeData} alt="QR Code" height={200} width={200} />}
      </div>
      <Button
        className="hover:bg-white hover:text-black hover:dark:bg-black hover:dark:text-white"
        onClick={() => {
          setLoading(true);
          createNewQuiz(quizId);
        }}
      >
        {loading ? "Creating Quiz..." : "Start"}
      </Button>
    </>
  );
}
