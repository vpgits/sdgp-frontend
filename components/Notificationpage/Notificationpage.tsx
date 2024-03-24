import React from "react";
import { Button } from "../ui/button";
import { Tables } from "@/types/supabase";

export default function Notificationpage(params: {
  notificationData: Tables<"notification">[];
}) {
  const notifications = params.notificationData;

  return (
    <div className="flex flex-col">
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-auto justify-between">
          <h1 className="text-2xl font-bold mx-auto -mt-6">Notifications</h1>
          {/* <Button variant="outline">Mark All as Read</Button> */}
        </div>

        {notifications.map((notification, index) => (
          <div
            className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            key={index}
          >
            <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
            <div className="grid gap-1">
              <p className="text-sm font-medium">{notification.title}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {notification["description"]}
              </p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
