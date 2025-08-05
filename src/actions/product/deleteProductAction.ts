"use server";

import { verifySession } from "@/libs/dal/dal";
import { productRespository } from "@/repository/product-repository";
import { revalidateTag } from "next/cache";

export async function deleteProductAction(id: number) {
  const isAuthenticated = await verifySession();

  if (!isAuthenticated) {
    return {
      error: "Usuário não logado, por favor faça o login",
    };
  }

  if (!id) {
    return {
      error: "ID do produto inválido",
    };
  }

  try {
    await productRespository.deleteByIdProduct(id);
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }
    return {
      error: "Error desconhecido",
    };
  }

  revalidateTag("products");

  return {
    error: "",
  };
}
