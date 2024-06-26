"use client";
import { logOut } from "@/app/login/action";
import React, { SVGProps } from "react";

export default function LogOut() {
  return (
    <div
      className="flex items-center gap-3 rounded-lg  ml-3 text-red-500 transition-all hover:text-red-900 dark:text-red-400 dark:hover:text-red-50 hover:cursor-pointer"
      style={{
        order: 1,
      }}
      onClick={logOut}
    >
      <LogOutIcon className="h-4 w-4 ml-1" />
      Log Out
    </div>
  );
}
function LogOutIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}
