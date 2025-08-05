import { PerfilModel } from "@/models/perfil-model";
import { IUser } from "./user-interface";
import { db } from "@/db/drizzle";
import { enderecoTable, perfilUsuarioTable } from "@/db/drizzle/schema";
import { eq } from "drizzle-orm";
import { EnderecoModel } from "@/models/endereco-model";

class UserRepository implements IUser {
  async findByIdPerfil(id: number): Promise<PerfilModel> {
    const data = await db
      .select({
        nome: perfilUsuarioTable.nome,
        email: perfilUsuarioTable.email,
        cpf: perfilUsuarioTable.cpf,
        telefone: perfilUsuarioTable.telefone,
      })
      .from(perfilUsuarioTable)
      .where(eq(perfilUsuarioTable.id_usuario, id));

    const perfilUser = data[0];

    if (!perfilUser) {
      return {
        nome: "",
        email: "",
        cpf: "",
        telefone: "",
      };
    }

    const { nome, email, cpf, telefone } = perfilUser;

    return { nome, email, cpf, telefone };
  }

  async findByIdEndereco(id: number): Promise<EnderecoModel> {
    try {
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
        .where(eq(enderecoTable.id_perfil, id));

      if (!data[0]) {
        return {
          rua: "",
          bairro: "",
          cidade: "",
          complemento: "",
          estado: "",
          cep: "",
        };
      }

      const { rua, bairro, cidade, complemento, estado, cep } = data[0];
      return { rua, bairro, cidade, complemento, estado, cep };
    } catch (error) {
      console.log(error);
      return {
        rua: "",
        bairro: "",
        cidade: "",
        complemento: "",
        estado: "",
        cep: "",
      };
    }
  }
}

export const userRepository: IUser = new UserRepository();
