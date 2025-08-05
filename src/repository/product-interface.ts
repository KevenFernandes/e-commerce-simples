import { ProducModel } from "@/models/product-model";

export type updateStateProps = {
  idproduto: number;
  nome: string;
  descricao: string;
  preco: string;
  code: string;
  image_url: string;
  ativo: boolean;
};

export interface IProduct {
  findAllProduct(): Promise<ProducModel[]>;
  findAllProduct(): Promise<ProducModel[]>;
  findByIdProduct(id: number): Promise<ProducModel>;
  deleteByIdProduct(id: number): Promise<void>;
}
