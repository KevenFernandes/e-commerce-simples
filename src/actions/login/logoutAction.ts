"use server";

import { deleteSession } from "@/libs/login/session";
import { redirect } from "next/navigation";

export async function logout() {
  await deleteSession();
  redirect("/");
}
