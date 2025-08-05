import { usuarioTable } from "@/db/drizzle/schema";
import { AdminUserProps, IUseAdmin, RoleProps } from "./userAdmin-interface";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";

class UserAdminRepository implements IUseAdmin {
  async findAllUsers(): Promise<AdminUserProps[]> {
    const data = await db
      .select({
        idusuario: usuarioTable.idusuario,
        username: usuarioTable.username,
        role: usuarioTable.role,
      })
      .from(usuarioTable);

    return data;
  }

  async changeRoleUser(id: number, role: RoleProps): Promise<void> {
    if (!role) return;
    // TODO: talvez pegar o nome do perfil também pode ser interessante

    try {
      await db
        .update(usuarioTable)
        .set({ role: role })
        .where(eq(usuarioTable.idusuario, id));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error ao modificar usuário", error);
      } else {
        console.log("Error desconhecido", error);
      }
    }
  }
}

export const userAdminRepository = new UserAdminRepository();
