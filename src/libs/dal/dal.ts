"use server";

import { cookies } from "next/headers";
import { cache } from "react";
import { decrypt } from "../login/session";
import { redirect } from "next/navigation";
import { db } from "@/db/drizzle";
import { usuarioTable } from "@/db/drizzle/schema";
import { eq } from "drizzle-orm";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.username) {
    redirect("/auth/login");
  }

  return { isAuth: true, username: session.username, role: session.role };
});

export const getUser = cache(async () => {
  const session = await verifySession();

  if (!session) return null;

  try {
    const data = await db
      .select({ idusuario: usuarioTable.idusuario })
      .from(usuarioTable)
      .where(eq(usuarioTable.username, session.username.toString()))
      .limit(1);

    const user = data[0];

    return user;
  } catch (error) {
    console.log("erro na busca de dados", error);
    return null;
  }
});
