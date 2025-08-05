import { Sidebar } from "@/components/Sidebar";
import React from "react";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-red-300 w-full h-full pb-40 py-5">
      <Sidebar />

      <div className="ml-15 mr-7 sm:ml-54">{children}</div>
    </div>
  );
}
