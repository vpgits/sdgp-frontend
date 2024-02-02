"use client";
import React, { useEffect, useState } from "react";
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import createUppyInstance from "@/components/documents/Uppy";

export default function UploadCard() {
  const [uppy, setUppy] = useState<Uppy | null>(null);

  useEffect(() => {
    // Define an async IIFE inside useEffect
    (async () => {
      const instance = await createUppyInstance();
      setUppy(instance);

      // Ensure to close the Uppy instance when the component unmounts
      return () => instance.close();
    })();
  }, []);

  // Only render the Dashboard if it's mounted in the browser
  return (
    <>
      <div className="flex flex-col items-center justify-center mx-2">
        {uppy && (
          <Dashboard
            uppy={uppy}
            className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mt-32"
          />
        )}
      </div>
    </>
  );
}
