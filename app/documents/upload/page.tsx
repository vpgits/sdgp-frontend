"use client";
import React, { useEffect, useState } from "react";
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import Tus from "@uppy/tus";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import GetCurrentSession from "@/lib/getCurrentSession";
import { createBrowserClient } from "@supabase/ssr";
import CreateSupabaseBrowserClient from "@/config/supabase_client";
// import "@uppy/webcam/dist/style.min.css";

export default function page() {
  const [folder, setFolder] = useState("");
  const [access_token, setAccess_token] = useState("");
  const [refresh_token, setRefresh_token] = useState("");
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const SUPABASE_PROJECT_ID = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID;
  if (!SUPABASE_ANON_KEY || !SUPABASE_PROJECT_ID)
    throw new Error("Missing env vars");
  const STORAGE_BUCKET = "pdf";
  const supabase = CreateSupabaseBrowserClient();
  useEffect(() => {
    // Fetch and log the current session
    supabase.auth
      .getSession()
      .then((session) => {
        if (session.data.session && session.data.session.user.id !== null) {
          setFolder(session.data.session.user.id);
          setAccess_token(session.data.session.access_token.toString());
          setRefresh_token(session.data.session.refresh_token.toString());
        }
      })
      .catch((error) => {
        console.error("Error fetching session:", error);
      });
  }, []);

  const supabaseStorageURL = `https://${SUPABASE_PROJECT_ID}.supabase.co/storage/v1/upload/resumable`;

  const uppy = new Uppy();
  uppy.use(Tus, {
    endpoint: supabaseStorageURL,
    headers: {
      authorization: `Bearer ${access_token}`,
      refresh_token: `Bearer ${refresh_token}`,
      apikey: SUPABASE_ANON_KEY,
    },
    uploadDataDuringCreation: true,
    chunkSize: 6 * 1024 * 1024,
    allowedMetaFields: [
      "bucketName",
      "objectName",
      "contentType",
      "cacheControl",
    ],
  });
  uppy.on("file-added", (file) => {
    let safeFileName = file.name
      .replace(/[·,:]/g, "") // Remove special characters like ·, :, and ,
      .replace(/\s/g, "_") // Replace spaces with underscores
      .substring(0, 10); // Limit the length
    safeFileName += file.name.substring(file.name.lastIndexOf("."));
    const supabaseMetadata = {
      bucketName: STORAGE_BUCKET,
      objectName: folder
        ? `${folder}/${safeFileName}}`
        :null,
      contentType: file.type,
    };

    file.meta = {
      ...file.meta,
      ...supabaseMetadata,
    };

    console.log("file added", safeFileName);
  });

  //     // Add the file extension

  //     const supabaseMetadata = {
  //       bucketName: STORAGE_BUCKET,
  //       objectName: folder
  //         ? `${folder}/${encodeURIComponent(safeFileName)}`
  //         : encodeURIComponent(safeFileName),
  //       contentType: file.type,
  //     };
  //     console.log("file added", supabaseMetadata);
  //   });

  uppy.on("complete", (result) => {
    console.log(
      "Upload complete! We’ve uploaded these files:",
      result.successful
    );
  });
  return (
    <>
      <div className="flex flex-col items-center justify-between mb-6">
        <div>page</div>
        <Dashboard uppy={uppy} />
      </div>
    </>
  );
}
