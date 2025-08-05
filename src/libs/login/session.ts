"use server";

import "server-only";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SECRET_KEY;
const encondeKey = new TextEncoder().encode(secretKey);

type SessioPayload = {
  username: string;
  expiresAt: Date;
  role: RoleProps;
};

type RoleProps = "admin" | "client";

export async function encrypt(payload: SessioPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(encondeKey);
}

export async function decrypt(session: string | undefined = "") {
  if (!session) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(session, encondeKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Erro ao verificar Sessão!", error);
    return null;
  }
}

export async function createSession(username: string, role: RoleProps) {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt({ username, expiresAt, role });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "strict",
    path: "/",
  });
}

export async function updateSession() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const newExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const cookiesStore = await cookies();
  cookiesStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: newExpires,
    sameSite: "strict",
    path: "/",
  });
}

export async function deleteSession() {
  const cookiesStore = await cookies();
  cookiesStore.delete("session");
}
