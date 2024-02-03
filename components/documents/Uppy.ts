import React, { useEffect, useState } from "react";
import Uppy from "@uppy/core";
import Dashboard from "@uppy/dashboard";
import CreateSupabaseBrowserClient from "@/config/supabase_client";
import Tus from "@uppy/tus";
import CreateSupabaseServerClient from "@/config/supabase_server";
import GetCurrentSession from "@/lib/getCurrentSession";

const createUppyInstance = async () => {
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const SUPABASE_PROJECT_ID = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID;
  if (!SUPABASE_ANON_KEY || !SUPABASE_PROJECT_ID)
    throw new Error("Missing env vars");
  const STORAGE_BUCKET = "pdf";

  const session = await GetCurrentSession();

  console.log("session", session);
  if (session.error) throw new Error(session.error.message);
  let folder: string = "";
  let access_token: string = "";
  let refresh_token: string = "";
  if (session && session.data.session) {
    folder = session.data.session.user.id.toString();
    access_token = session.data.session.access_token.toString();
    refresh_token = session.data.session.refresh_token.toString();
  }
  // Fetch and log the current session

  // supabase.auth
  //   .getSession()
  //   .then((session) => {
  //     if (session.data.session && session.data.session.user.id !== null) {
  //       folder = session.data.session.user.id;
  //       access_token = session.data.session.access_token.toString();
  //       refresh_token = session.data.session.refresh_token.toString();
  //     }
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching session:", error);
  //   });

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
      .replace(/[^0-9a-zA-Z!-_.*'()]/g, "") // Keep only alphanumeric characters, !, -, _, ., *, ', (, and )
      .substring(0, 25); // Limit the length
    safeFileName += file.name.substring(file.name.lastIndexOf("."));
    const supabaseMetadata = {
      bucketName: STORAGE_BUCKET,
      objectName: folder
        ? `${folder}/${encodeURIComponent(safeFileName)}`
        : null,
      contentType: file.type,
    };

    file.meta = {
      ...file.meta,
      ...supabaseMetadata,
    };

    console.log("file added", safeFileName);
  });

  uppy.on("complete", (result) => {
    console.log(
      "Upload complete! We’ve uploaded these files:",
      result.successful
    );
  });
  uppy.on("error", (error) => {
    throw new Error(error.message);
  });
  return uppy;
};

export default createUppyInstance;
