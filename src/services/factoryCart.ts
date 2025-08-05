"use server";

import { getUser, verifySession } from "@/libs/dal/dal";
import { CartService } from "@/repository/cart-interface";
import { CartRepository } from "@/repository/cart-repository";

import { redirect } from "next/navigation";

type isLoginProps = {
  isLogin: boolean;
  userId?: number;
  role?: unknown;
};

async function existLogin(): Promise<isLoginProps> {
  const userId = await getUser();
  const session = await verifySession();
  const role = session?.role;

  if (userId) {
    return { isLogin: true, userId: userId.idusuario, role: role };
  }
  return { isLogin: false };
}

export async function getCartService(): Promise<CartService> {
  const { isLogin, userId, role } = await existLogin();

  if (!isLogin || !userId) redirect("/auth/login");
  if (role === "admin") redirect("/auth/dashboard/AdminDashboard");

  return new CartRepository(userId);
}
