"use server";

import { verifySession } from "@/libs/dal/dal";
import { CreateProductSchema } from "@/libs/product/definitions";
import { productRespository } from "@/repository/product-repository";
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
  message?: string[] | undefined;
};

export async function updateProductAction(
  prevState: StateProps,
  formData: FormData
): Promise<StateProps> {
  const isAuthenticated = await verifySession();

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      message: ["Dados inválidos"],
    };
  }

  const idproduto = formData.get("idproduto");
  if (!idproduto) {
    return {
      formState: prevState.formState,
      message: ["Erro ao capturar o id"],
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
      message: ["Faça o login antes de salvar o produto"],
    };
  }

  if (!validatedFields.success) {
    return {
      formState: prevState.formState,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { nome, code, descricao, preco, ativo, image_url } =
    validatedFields.data;

  const isUpdated = await productRespository.updateByIdProduct({
    idproduto: Number(idproduto),
    nome,
    code,
    descricao,
    preco: preco.toString(),
    ativo,
    image_url,
  });

  revalidateTag("products");

  if (!isUpdated) {
    return {
      formState: prevState.formState,
      message: ["Erro ao atualizar o produto"],
    };
  }

  return {
    formState: prevState.formState,
    message: ["Produto atualizado com sucesso!"],
  };
}
