"use server";

import { db } from "@/db/drizzle";
import { enderecoTable } from "@/db/drizzle/schema";
import { getUser } from "@/libs/dal/dal";
import { EnderecoFormSchema } from "@/libs/endereco/definition";
import { eq } from "drizzle-orm";

export async function enderecoAction(
  state: EnderecoFormSchema,
  formData: FormData
) {
  if (!(formData instanceof FormData)) {
    return {
      message: "Dados inválidos",
    };
  }

  const validatedFields = EnderecoFormSchema.safeParse({
    rua: formData.get("rua"),
    bairro: formData.get("bairro"),
    cidade: formData.get("cidade"),
    complemento: formData.get("complemento"),
    estado: formData.get("estado"),
    cep: formData.get("cep"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const user = await getUser();
  const { rua, bairro, cidade, complemento, estado, cep } =
    validatedFields.data;
  const id_perfil = user?.idusuario;

  if (!id_perfil) {
    return {
      message: "Usuário não encontrado",
    };
  }

  const data = await db
    .select({
      rua: enderecoTable.rua,
      bairro: enderecoTable.bairro,
      cidade: enderecoTable.cidade,
      complemento: enderecoTable.complemento,
      estado: enderecoTable.estado,
      cep: enderecoTable.cep,
    })
    .from(enderecoTable)
    .where(eq(enderecoTable.id_perfil, id_perfil));

  if (data[0]) {
    try {
      await db
        .update(enderecoTable)
        .set({
          rua: rua,
          bairro: bairro,
          cidade: cidade,
          complemento: complemento,
          estado: estado,
          cep: cep,
        })
        .where(eq(enderecoTable.id_perfil, id_perfil));

      return {
        message: "Endereço alterado com sucesso",
        success: true,
      };
    } catch (error) {
      console.log(error);
      return {
        message: "Não foi possível alterar seu endereço",
        success: false,
      };
    }
  }

  const newData = await db
    .insert(enderecoTable)
    .values({ rua, bairro, cidade, complemento, estado, cep, id_perfil })
    .$returningId();

  if (!newData[0]) {
    return {
      message: "Algo deu errado criação do endereco",
      success: false,
    };
  } else {
    return {
      message: "Endereço criado com sucesso!",
      success: true,
    };
  }
}
