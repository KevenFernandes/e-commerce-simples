"use server";

import { db } from "@/db/drizzle";
import { perfilUsuarioTable } from "@/db/drizzle/schema";
import { getUser } from "@/libs/dal/dal";
import { PerfilFormSchema, PerfilFormState } from "@/libs/perfil/definitions";
import { eq } from "drizzle-orm";

export async function perfilAction(state: PerfilFormState, formData: FormData) {
  if (!(formData instanceof FormData)) {
    return {
      message: "Dados inválidos",
      success: false,
    };
  }

  const validatedFields = PerfilFormSchema.safeParse({
    nome: formData.get("nome"),
    email: formData.get("email"),
    cpf: formData.get("cpf"),
    telefone: formData.get("telefone"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const user = await getUser();

  const { nome, email, cpf, telefone } = validatedFields.data;
  const id_usuario = user?.idusuario;

  if (!id_usuario) {
    return { message: "Não foi possível criar seu perfil", success: false };
  }

  const isUser = await db
    .select({
      id_usuario: perfilUsuarioTable.id_usuario,
      nome: perfilUsuarioTable.nome,
      email: perfilUsuarioTable.email,
      cpf: perfilUsuarioTable.cpf,
      telefone: perfilUsuarioTable.telefone,
    })
    .from(perfilUsuarioTable)
    .where(eq(perfilUsuarioTable.id_usuario, id_usuario));

  if (isUser[0].id_usuario) {
    try {
      await db
        .update(perfilUsuarioTable)
        .set({
          nome: nome,
          email: email,
          cpf: cpf,
          telefone: telefone,
        })
        .where(eq(perfilUsuarioTable.id_usuario, id_usuario));

      return {
        message: "Perfil alterado com sucesso",
        success: true,
      };
    } catch (error) {
      console.log(error);
      return {
        message: "Não foi possível alterar seu perfil",
        success: false,
      };
    }
  }

  const data = await db
    .insert(perfilUsuarioTable)
    .values({ nome, email, cpf, telefone, id_usuario })
    .$returningId();

  const idPerfil = data[0];

  if (!idPerfil) {
    return {
      message: "Não encontramos o usuário logado",
      success: false,
    };
  } else {
    return {
      message: "Perfil criado com sucesso",
      success: true,
    };
  }
}
