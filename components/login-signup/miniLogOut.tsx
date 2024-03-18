"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function MiniLogOut() {
  const supabase = createClient();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const getSession = async () => {
      const session = await supabase.auth.getSession();
      if (session) {
        setLoggedIn(true);
      }
    };
    getSession();
  }, [supabase.auth, loggedIn]);
  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };
  return (
    <Button
      onClick={() => {
        loggedIn ? logout() : router.push("/login");
      }}
    >
      {loggedIn ? "Log Out" : "Log In"}
    </Button>
  );
}
