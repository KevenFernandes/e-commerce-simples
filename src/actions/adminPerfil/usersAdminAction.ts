"use server";

import { verifySession } from "@/libs/dal/dal";
import { userAdminRepository } from "@/repository/userAdmin-repository";

type UpdatedProps = {
  idusuario: number;
  role: "admin" | "client";
};

type StateProps = {
  errors?: string[];
  success?: boolean;
  updated?: UpdatedProps;
};

export async function userAdminAction(
  prevState: StateProps,
  formData: FormData
): Promise<StateProps> {
  const isAuthenticated = verifySession();
  if (!isAuthenticated) {
    return {
      errors: ["Você não está logado, verifique seu login"],
      success: false,
    };
  }
  if (!(formData instanceof FormData)) {
    return {
      errors: ["Dados inválidos e nao reconhecidos"],
      success: false,
    };
  }

  const role = formData.get("role");
  const idusuario = formData.get("idusuario");

  if (role === "admin" || role === "client") {
    try {
      await userAdminRepository.changeRoleUser(Number(idusuario), role);
      const updated: UpdatedProps = {
        idusuario: Number(idusuario),
        role: role,
      };
      return {
        success: true,
        updated: updated,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error na mudança de role", error);
      }
      console.log("Error desconhecido", error);

      return { errors: ["Erro ao mudar a role"], success: false };
    }
  } else {
    return {
      errors: ["Role inválida"],
      success: false,
    };
  }
}
