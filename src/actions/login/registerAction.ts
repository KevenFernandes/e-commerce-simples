"use server";

import { db } from "@/db/drizzle";
import { usuarioTable } from "@/db/drizzle/schema";
import { hashPassword } from "@/libs/login/manage";
import {
  RegisterUserSchema,
  RegisterUserState,
} from "@/libs/register/definitions";

export async function registerAction(
  state: RegisterUserState,
  formData: FormData
) {
  const allowRegiste = Boolean(Number(process.env.ALLOW_REGISTER));

  if (!allowRegiste) {
    return {
      message: "Não foi possível fazer o Cadastro agora.",
    };
  }

  if (!(formData instanceof FormData)) {
    return {
      message: "Dados inválidos",
    };
  }

  const validatedFields = RegisterUserSchema.safeParse({
    username: formData.get("user"),
    pass: formData.get("pass"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, pass } = validatedFields.data;
  const password = await hashPassword(pass);

  const data = await db
    .insert(usuarioTable)
    .values({ username, password })
    .$returningId();

  const idUser = data[0];

  if (!idUser) {
    return {
      message: "Ocorreu um error ao criar Sua Conta",
    };
  }

  return {
    message: "Registro feito com sucesso!",
  };
}
