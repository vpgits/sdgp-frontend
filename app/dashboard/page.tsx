import React from "react";
import Dashboard from "@/components/dashboard/Dashboard";

export function generateMetadata() {
  return {
    title: "Dashboard | Quizzifyme",
    description: "Dashboard",
  };

}

export default function page() {
  return <Dashboard />;
}
