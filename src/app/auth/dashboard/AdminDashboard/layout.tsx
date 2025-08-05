import { AdminMenu } from "@/components/AdminMenu";
import { ReactNode } from "react";

export default function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen justify-center items-center">
      <AdminMenu />
      {children}
    </div>
  );
}
