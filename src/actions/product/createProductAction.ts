"use server";

import { verifySession } from "@/libs/dal/dal";
import { CreateProductSchema } from "@/libs/product/definitions";
import { db } from "@/db/drizzle";
import { produtoTable } from "@/db/drizzle/schema";
import { revalidateTag } from "next/cache";

type StateProps = {
  formState: {
    idproduto?: number;
    nome: string;
    code: string;
    preco: string;
    descricao: string;
    ativo: boolean;
    image_url: string;
  };
  errors?:
    | {
        nome?: string[] | undefined;
        code?: string[] | undefined;
        preco?: string[] | undefined;
        descricao?: string[] | undefined;
        ativo?: string[] | undefined;
        image_url?: string[] | undefined;
      }
    | string[];
  message?: string[];
};

export async function createProductAction(
  prevState: StateProps,
  formData: FormData
) {
  const isAuthenticated = await verifySession();

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ["Dados inválidos"],
    };
  }

  const validatedFields = CreateProductSchema.safeParse({
    nome: formData.get("nome"),
    code: formData.get("code"),
    preco: formData.get("preco"),
    descricao: formData.get("descricao"),
    ativo: formData.get("ativo"),
    image_url: formData.get("image_url"),
  });

  if (!isAuthenticated) {
    return {
      formState: prevState.formState,
      message: ["Faça o login antes de salvar"],
    };
  }

  if (!validatedFields.success) {
    return {
      formState: prevState.formState,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { nome, code, preco, descricao, ativo, image_url } =
    validatedFields.data;

  /* 
    O "preco" ta tipado como decimal, porém ele foi 
    projetado para ser usado como string devido a 
    grande quantidade de caracteres após a virgula.
  */

  const data = await db
    .insert(produtoTable)
    .values({
      nome,
      preco: preco.toString(),
      descricao,
      code,
      ativo,
      image_url,
    })
    .$returningId();

  const idProduto = data[0];

  if (!idProduto) {
    return {
      formState: prevState.formState,
      message: ["Não foi possível criar o produto"],
    };
  }

  revalidateTag("products");

  return {
    formState: prevState.formState,
    erro: [],
    message: ["Produto criado com sucesso"],
  };
}
