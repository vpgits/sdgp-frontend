"use client";
import { createNewQuiz } from "@/utils/quiz/action";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import QRcode from "qrcode";

export default function QuizShare(params: { quizId: string }) {
  const { quizId } = params;
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);

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
      <div className="flex justify-center p-5">
        {qrCodeData && <img src={qrCodeData} alt="QR Code" />}
      </div>
      <Button
        onClick={() => {
          createNewQuiz(quizId);
        }}
      >
        Start
      </Button>
    </>
  );
}
