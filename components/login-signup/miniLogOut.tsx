"use client";
import React from "react";
import { Button } from "../ui/button";
import { logout } from "@/app/login/action";

export default function MiniLogOut() {
  return (
    <Button onClick={logout} className="">
      Log Out
    </Button>
  );
}
