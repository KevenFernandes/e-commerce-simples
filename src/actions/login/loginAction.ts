"use server";

import { db } from "@/db/drizzle";
import { usuarioTable } from "@/db/drizzle/schema";
import { LoginFormSchema, LoginState } from "@/libs/login/definitions";
import { verifyPassword } from "@/libs/login/manage";
import { createSession } from "@/libs/login/session";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function loginAction(state: LoginState, formData: FormData) {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));
  if (!allowLogin) {
    return {
      message: "Login temporariamente desativado.",
    };
  }

  // TODO: Verificar sessao!

  await new Promise((resolve) => setTimeout(resolve, 5000));

  if (!(formData instanceof FormData)) {
    return {
      message: "Dados inválidos.",
    };
  }

  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get("user"),
    pass: formData.get("pass"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, pass } = validatedFields.data;

  const data = await db
    .select({
      username: usuarioTable.username,
      password: usuarioTable.password,
      role: usuarioTable.role,
    })
    .from(usuarioTable)
    .where(eq(usuarioTable.username, username))
    .limit(1);

  const user = data[0];

  if (!user) {
    return {
      message: "Usuário ou senha inválidos",
    };
  }

  const isValidPass = await verifyPassword(pass, user.password);

  if (!isValidPass) {
    return {
      message: "Usuário ou senha inválidos",
    };
  }

  if (user.role === null) user.role = "client";

  await createSession(user.username, user.role);
  redirect("/auth/dashboard");
}
