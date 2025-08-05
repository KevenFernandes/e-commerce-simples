import { ProducModel } from "@/models/product-model";
import { IProduct, updateStateProps } from "./product-interface";
import { db } from "@/db/drizzle";
import { produtoTable } from "@/db/drizzle/schema";
import { eq } from "drizzle-orm";

export class ProductRespository implements IProduct {
  async findAllProduct(): Promise<ProducModel[]> {
    const products = await db.select().from(produtoTable);

    return products;
  }

  async findAllProductPublic(): Promise<ProducModel[]> {
    const products = await db
      .select()
      .from(produtoTable)
      .where(eq(produtoTable.ativo, true));

    return products;
  }

  async findByIdProduct(id: number): Promise<ProducModel> {
    const data = await db
      .select()
      .from(produtoTable)
      .where(eq(produtoTable.idproduto, id))
      .limit(1);
    const product = data[0];
    return product;
  }

  async updateByIdProduct({
    idproduto,
    nome,
    descricao,
    preco,
    code,
    ativo,
    image_url,
  }: updateStateProps) {
    const data = await db
      .update(produtoTable)
      .set({ nome, descricao, preco: preco.toString(), code, ativo, image_url })
      .where(eq(produtoTable.idproduto, idproduto));
    const produto = data[0];

    if (produto.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  }

  async deleteByIdProduct(idproduto: number): Promise<void> {
    try {
      await db
        .delete(produtoTable)
        .where(eq(produtoTable.idproduto, idproduto));
    } catch (error) {
      console.log("Deu algum problema ao deletar o produto", error);
    }
  }
}

export const productRespository = new ProductRespository();
