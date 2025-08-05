import { AdminUsersForm } from "@/components/AdminUsersForm";
import { userAdminRepository } from "@/repository/userAdmin-repository";

export default async function UsersAdminPage() {
  const users = await userAdminRepository.findAllUsers();

  return (
    <>
      <AdminUsersForm usersAdmin={users} />
    </>
  );
}
