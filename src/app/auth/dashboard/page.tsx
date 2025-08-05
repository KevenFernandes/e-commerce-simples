import { verifySession } from "@/libs/dal/dal";
import { redirect } from "next/navigation";
import AdminDashboard from "./AdminDashboard/page";
import UserDashboard from "./UserDashboard/page";
import UserDashboardLayout from "./UserDashboard/layout";

export default async function Dashboard() {
  const session = await verifySession();
  const userRole = session?.role;

  if (userRole === "admin") {
    return <AdminDashboard />;
  } else if (userRole === "client") {
    return (
      <UserDashboardLayout>
        <UserDashboard />
      </UserDashboardLayout>
    );
  } else {
    redirect("/auth/login");
  }
}
