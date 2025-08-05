import { EnderecoModel } from "@/models/endereco-model";
import { PerfilModel } from "@/models/perfil-model";

export interface IUser {
  findByIdPerfil(id: number): Promise<PerfilModel>;
  findByIdEndereco(id: number): Promise<EnderecoModel>;
}
